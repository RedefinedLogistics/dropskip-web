/** @type {import('next').NextConfig} */

/**
 * next/image refuses any host that is not listed here, so Strapi's uploads have
 * to be declared. The production CMS is derived from STRAPI_URL; localhost is
 * always allowed so local development works even before that variable is set.
 *
 * Note: changes to this file only take effect when the dev server restarts.
 */
/** True when the CMS is on this machine, which is normal in development. */
function strapiIsLocal() {
  if (!process.env.STRAPI_URL) return true;
  try {
    const { hostname } = new URL(process.env.STRAPI_URL);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function strapiImagePatterns() {
  const patterns = [
    { protocol: "http", hostname: "localhost", pathname: "/uploads/**" },
    { protocol: "http", hostname: "127.0.0.1", pathname: "/uploads/**" },
  ];

  if (!process.env.STRAPI_URL) return patterns;

  try {
    const { protocol, hostname } = new URL(process.env.STRAPI_URL);
    // Already covered by the localhost entries above, which match any port.
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      patterns.push({
        protocol: protocol.replace(":", ""),
        hostname,
        pathname: "/uploads/**",
      });
    }
  } catch {
    console.warn(`[next.config] STRAPI_URL is not a valid URL: ${process.env.STRAPI_URL}`);
  }

  return patterns;
}

const nextConfig = {
  // Hide the floating Next.js dev-tools badge in the corner during `next dev`.
  // It never appears in a production build.
  devIndicators: false,

  // Next 16 writes AGENTS.md and CLAUDE.md into the project on dev start.
  // Nothing here needs them, and the README is the one place the structure is
  // explained, so they stay out of the repo.
  agentRules: false,

  images: {
    remotePatterns: strapiImagePatterns(),

    // The image optimiser refuses hosts that resolve to a private IP, which is
    // a sensible guard against SSRF — but in development the CMS *is* on
    // localhost, so optimisation would fail for every featured image. This is
    // enabled only while STRAPI_URL points at this machine; with a real CMS
    // domain in production the guard stays on.
    dangerouslyAllowLocalIP: strapiIsLocal(),
  },

  // The blog moved from /blog/all and /blog/:slug to /blogs and /blogs/:slug.
  // Permanent redirects keep old links and any indexed URLs working.
  async redirects() {
    return [
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/blog/all", destination: "/blogs", permanent: true },
      { source: "/blog/:slug", destination: "/blogs/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
