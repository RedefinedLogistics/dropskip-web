/**
 * Strapi data layer. Every call to the CMS in this app goes through here.
 *
 * Server-only: STRAPI_URL and STRAPI_TOKEN are never exposed to the browser.
 * The contact form posts to /api/contact, which calls createInquiry() here, so
 * the CMS URL and token stay on the server too.
 */

const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
const REVALIDATE = Number(process.env.STRAPI_REVALIDATE ?? 60);

export const strapiConfigured = Boolean(STRAPI_URL);

/** Absolute URL for a media file, which Strapi returns as a relative path. */
const mediaUrl = (url) => (!url ? null : url.startsWith("http") ? url : `${STRAPI_URL}${url}`);

async function strapiFetch(path, init = {}) {
  if (!STRAPI_URL) throw new Error("STRAPI_URL is not set");

  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      ...init.headers,
    },
    // Reads are cached and revalidated; writes always go straight through.
    next: init.method && init.method !== "GET" ? undefined : { revalidate: REVALIDATE },
    cache: init.method && init.method !== "GET" ? "no-store" : undefined,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    const error = new Error(`Strapi ${res.status} ${res.statusText} for ${path}`);
    error.status = res.status;
    error.detail = detail;
    throw error;
  }

  return res.json();
}

/* ------------------------------------------------------------------ blogs -- */

/** Strapi Blocks -> the inline nodes <RichText> renders. */
function fromStrapiChildren(children = []) {
  return children.flatMap((child) => {
    if (child.type === "link") {
      return [
        {
          type: "link",
          href: child.url,
          text: (child.children ?? []).map((c) => c.text ?? "").join(""),
        },
      ];
    }
    const text = child.text ?? "";
    if (!text) return [];
    if (child.bold) return [{ type: "strong", text }];
    if (child.italic) return [{ type: "em", text }];
    if (child.code) return [{ type: "code", text }];
    return [{ type: "text", text }];
  });
}

const PSEUDO_HEADING_MAX = 120;

/**
 * A paragraph that is entirely bold and short enough to be a title, e.g.
 * "3 smartest moves to optimize your supply chain". Long bold passages are
 * emphasis and stay paragraphs.
 */
function isPseudoHeading(content) {
  return (
    content.every((node) => node.type === "strong") &&
    content.reduce((total, node) => total + node.text.length, 0) <= PSEUDO_HEADING_MAX
  );
}

/** Strapi Blocks -> the block shape the post page already renders. */
function fromStrapiBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];

  return blocks.flatMap((block) => {
    if (block.type === "heading") {
      return [
        {
          type: block.level >= 3 ? "h3" : "h2",
          content: fromStrapiChildren(block.children),
        },
      ];
    }
    if (block.type === "list") {
      return [
        {
          type: "list",
          items: (block.children ?? []).map((item) => fromStrapiChildren(item.children)),
        },
      ];
    }
    if (block.type === "paragraph") {
      const content = fromStrapiChildren(block.children);
      if (!content.length) return [];

      // Writers habitually mark a section heading by bolding a short line
      // rather than reaching for the Heading block. Rendered literally that
      // gives an article with no hierarchy at all, so a short, entirely bold
      // paragraph is promoted to a heading.
      if (isPseudoHeading(content)) {
        const text = content
          .map((node) => node.text)
          .join("")
          // A trailing colon reads as a lead-in to a paragraph, not as a
          // heading, and is an artefact of how the line was written.
          .replace(/\s*:\s*$/, "");

        return [{ type: "h2", content: [{ type: "text", text }] }];
      }

      return [{ type: "p", content }];
    }
    if (block.type === "quote") {
      return [{ type: "p", content: fromStrapiChildren(block.children) }];
    }
    return [];
  });
}

/**
 * The opening of the article, trimmed to a sentence or so. It stands in for a
 * search description when a post has no SEO Description: without it the page
 * would go out with an empty <meta description> and blank link previews.
 */
function openingOf(body, limit = 160) {
  const text =
    body
      .find((block) => block.type === "p")
      ?.content.map((node) => node.text ?? "")
      .join("")
      .trim() ?? "";

  if (text.length <= limit) return text;
  // Cut on a word boundary rather than mid-word.
  return `${text.slice(0, text.lastIndexOf(" ", limit)).trim()}\u2026`;
}

/** One Strapi entry -> the post shape the existing components expect. */
function normalise(entry) {
  // Strapi 5 returns fields flat; Strapi 4 nests them under `attributes`.
  const a = entry.attributes ?? entry;
  const image = a.featuredImage?.data?.attributes ?? a.featuredImage ?? null;
  const body = fromStrapiBlocks(a.content);

  return {
    slug: a.slug,
    title: a.title,
    author: a.author ?? "DropSkip",
    date: (a.publishedDate ?? a.publishedAt ?? "").slice(0, 10),
    readTime: a.readTime ?? "3 min read",
    cover: a.cover ?? "trend",
    tags: (a.tags ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    seoTitle: a.seoTitle || a.title,
    seoDescription: a.seoDescription || openingOf(body),
    image: image?.url
      ? {
          url: mediaUrl(image.url),
          alt: image.alternativeText ?? a.title,
          width: image.width ?? 1200,
          height: image.height ?? 630,
        }
      : null,
    body,
  };
}

const byDateDesc = (a, b) => b.date.localeCompare(a.date);

/**
 * Published blogs, newest first.
 *
 * Returns an empty list rather than throwing when the CMS is unreachable: a
 * production build on Vercel should not fail because Strapi is briefly down,
 * and the already-rendered pages keep serving until the next revalidation.
 */
export async function getBlogs() {
  if (!STRAPI_URL) {
    console.warn("[strapi] STRAPI_URL is not set; the blog will be empty.");
    return [];
  }

  try {
    const json = await strapiFetch(
      // Strapi returns only published entries by default, so unpublishing in
      // the admin panel takes a post off the site.
      "/blogs?populate=featuredImage&sort=publishedDate:desc&pagination[pageSize]=100",
    );
    return (json.data ?? [])
      .map(normalise)
      .filter((blog) => blog.slug && blog.title)
      .sort(byDateDesc);
  } catch (error) {
    console.error(`[strapi] could not load blogs: ${error.message}`);
    return [];
  }
}

export async function getBlogBySlug(slug) {
  if (!STRAPI_URL) return null;

  try {
    const json = await strapiFetch(
      `/blogs?populate=featuredImage&filters[slug][$eq]=${encodeURIComponent(slug)}` +
        "&pagination[pageSize]=1",
    );
    const entry = (json.data ?? [])[0];
    return entry ? normalise(entry) : null;
  } catch (error) {
    console.error(`[strapi] could not load blog "${slug}": ${error.message}`);
    return null;
  }
}

/* -------------------------------------------------------------- inquiries -- */

/**
 * Stores a contact form submission in Strapi, which then sends the SES
 * notification from its own lifecycle. Throws on failure so the API route can
 * tell the visitor something went wrong.
 */
export async function createInquiry(payload) {
  const json = await strapiFetch("/inquiries", {
    method: "POST",
    body: JSON.stringify({ data: payload }),
  });
  return json?.data ?? null;
}
