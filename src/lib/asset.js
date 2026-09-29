/**
 * A same-site path with the site's basePath in front.
 *
 * Next adds basePath to <Link>, router.push() and /_next assets by itself, but
 * not to plain strings: <Image src="/logo.png">, the icon and Open Graph URLs
 * in metadata, or fetch("/api/contact"). Without the prefix, a site served
 * from a sub-path (see NEXT_BASE_PATH in next.config.mjs) requests those at
 * the domain root, so images break and forms post to the wrong server. With no
 * basePath this returns the path unchanged.
 */
export const asset = (path) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
