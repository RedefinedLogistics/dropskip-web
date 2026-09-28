/**
 * Generates /robots.txt.
 *
 * /api/ is disallowed because those routes exist for the site's own forms and
 * have nothing a crawler should index. /thank-you is excluded for the same
 * reason it is missing from the sitemap: it is a post-submission page.
 */
const SITE = "https://dropskip.ai";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
