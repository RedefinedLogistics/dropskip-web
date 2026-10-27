import { getBlogs } from "@/lib/strapi";

/**
 * Generates /sitemap.xml.
 *
 * The blog entries come from the CMS and are refreshed with it, so a newly
 * published post appears here without a redeploy. If Strapi is unreachable
 * during a build, getBlogs() gives an empty list so the deploy still succeeds;
 * on a live revalidation it throws, and the last good sitemap keeps serving.
 *
 * /thank-you is deliberately absent: it is the post-submission page and has
 * nothing to offer a search result.
 */
const SITE = "https://dropskip.ai";

const PAGES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/product", changeFrequency: "monthly", priority: 0.9 },
  { path: "/why-dropskip", changeFrequency: "monthly", priority: 0.9 },
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
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
