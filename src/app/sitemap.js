import { getBlogs } from "@/lib/strapi";

/**
 * Generates /sitemap.xml.
 *
 * The blog entries come from the CMS. getBlogs() already answers with an empty
 * list when Strapi is unreachable, so a deploy that happens while the CMS is
 * down still produces a valid sitemap of the marketing pages rather than
 * failing the build.
 *
 * /thank-you is deliberately absent: it is the post-submission page and has
 * nothing to offer a search result.
 */
const SITE = "https://dropskip.ai";

const PAGES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/product", changeFrequency: "monthly", priority: 0.9 },
  { path: "/inventory-planning", changeFrequency: "monthly", priority: 0.9 },
  { path: "/shopify", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/book-demo", changeFrequency: "yearly", priority: 0.6 },
];

export default async function sitemap() {
  const now = new Date();

  const staticEntries = PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const blogs = await getBlogs();
  const postEntries = blogs.map((post) => ({
    url: `${SITE}/blogs/${post.slug}`,
    lastModified: post.publishedDate ? new Date(post.publishedDate) : now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
