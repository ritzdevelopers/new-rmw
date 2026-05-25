/** True when path under /blogs/ is a static file (image, font, etc.), not a post slug. */
export function isBlogStaticAssetPath(path: string): boolean {
  const segment = path.replace(/^\/+/, "").split(/[?#]/)[0];
  return /\.(jpe?g|png|gif|webp|svg|avif|ico|mp4|webm|pdf|woff2?|ttf|css|js)$/i.test(
    segment
  );
}

/** Collapse repeated legacy segments: /blogs/blogs/... -> /blogs/... */
function collapseDuplicateBlogSegments(pathname: string): string {
  let p = pathname.replace(/\/+$/, "") || "/";
  let prev = "";
  while (prev !== p) {
    prev = p;
    p = p
      .replace(/\/blogs\/blogs\//gi, "/blogs/")
      .replace(/\/blog\/blogs\//gi, "/blogs/")
      .replace(/\/blogs\/blog\//gi, "/blogs/")
      .replace(/\/blogs2\/blogs2\//gi, "/blogs2/")
      .replace(/\/blog2\/blog2\//gi, "/blog2/");
  }
  return p;
}

/**
 * Returns redirect target for legacy blog URL paths, or null to keep as-is.
 * - /blogs/blogs/40, /blogs/60 -> /blogs (pagination)
 * - /blogs/my-post, /blogs2/my-post, /blog2/my-post -> /my-post
 * - /blogs/image.jpg, /blogs2/image.jpg -> null (static asset)
 */
export function getLegacyBlogRedirectPath(pathname: string): string | null {
  const normalized = collapseDuplicateBlogSegments(pathname);

  if (normalized === "/blogs") return null;

  if (normalized === "/blogs2" || normalized === "/blog2") {
    return "/blogs";
  }

  // Legacy pagination: /blogs/blogs/40, /blogs/40
  if (/^\/blogs\/blogs\/\d+$/i.test(normalized)) {
    return "/blogs";
  }
  if (/^\/blogs\/\d+$/i.test(normalized)) {
    return "/blogs";
  }

  if (normalized.startsWith("/blogs/")) {
    const rest = normalized.slice("/blogs/".length);
    if (!rest) return null;
    if (isBlogStaticAssetPath(rest)) return null;
    return `/${rest}`;
  }

  if (normalized.startsWith("/blog/")) {
    const rest = normalized.slice("/blog/".length);
    if (!rest) return null;
    if (/^\d+$/.test(rest.split("/")[0]) && !rest.includes("/")) {
      return "/blogs";
    }
    if (isBlogStaticAssetPath(rest)) return null;
    return `/${rest}`;
  }

  if (normalized.startsWith("/blogs2/")) {
    const rest = normalized.slice("/blogs2/".length);
    if (!rest) return "/blogs";
    if (isBlogStaticAssetPath(rest)) return null;
    return `/${rest}`;
  }

  if (normalized.startsWith("/blog2/")) {
    const rest = normalized.slice("/blog2/".length);
    if (!rest) return "/blogs";
    if (isBlogStaticAssetPath(rest)) return null;
    return `/${rest}`;
  }

  return null;
}

/**
 * Rewrites legacy blog post URLs in href attributes.
 */
export function rewriteLegacyBlogPostHref(href: string): string | null {
  if (!href || typeof href !== "string") return null;
  const h = href.trim();

  try {
    if (/^https?:\/\//i.test(h)) {
      const u = new URL(h);
      if (!/^(?:www\.)?ritzmediaworld\.com$/i.test(u.hostname)) return null;
      const dest = getLegacyBlogRedirectPath(u.pathname);
      if (!dest) return null;
      return `${u.origin}${dest}${u.search}${u.hash}`;
    }
  } catch {
    return null;
  }

  const pathOnly = h.split(/[?#]/)[0];
  const suffix = h.slice(pathOnly.length);
  const dest = getLegacyBlogRedirectPath(pathOnly);
  if (!dest) return null;
  return `${dest}${suffix}`;
}
