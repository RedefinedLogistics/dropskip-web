/**
 * Serves Strapi's uploaded images from the website's own origin.
 *
 * STRAPI_URL is often an address only this server can reach (in Docker Swarm
 * it is http://dropskip-cms:1337), so the browser cannot load
 * `${STRAPI_URL}/uploads/...` itself, and the Next image optimiser refuses it:
 * the host is not in the build-time allow-list and resolves to a private IP.
 * Fetching the file here, at request time, sidesteps both, and needs no
 * separate public CMS address. src/lib/strapi.js points blog images at this
 * route.
 */

const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/$/, "");

// Strapi names uploads like photo_a1b2c3d4e5.avif; anything else is refused,
// which also rules out ../ traversal to other CMS paths.
const SAFE_SEGMENT = /^[\w-][\w.-]*$/;

export async function GET(_request, { params }) {
  const { path } = await params;

  if (!STRAPI_URL || !path?.length || !path.every((segment) => SAFE_SEGMENT.test(segment))) {
    return new Response("Not found", { status: 404 });
  }

  let upstream;
  try {
    upstream = await fetch(`${STRAPI_URL}/uploads/${path.join("/")}`, { cache: "no-store" });
  } catch (error) {
    console.error(`[cms-media] could not reach Strapi at ${STRAPI_URL}:`, error.message);
    return new Response("CMS unavailable", { status: 502 });
  }

  const type = upstream.headers.get("content-type") ?? "";
  if (!upstream.ok || !type.startsWith("image/")) {
    return new Response("Not found", { status: upstream.ok ? 404 : upstream.status });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": type,
      ...(upstream.headers.get("content-length")
        ? { "Content-Length": upstream.headers.get("content-length") }
        : {}),
      // Strapi gives every upload a unique hashed name, and replacing an image
      // creates a new name, so a file at a given URL never changes.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
