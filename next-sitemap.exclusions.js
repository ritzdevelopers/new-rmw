/**
 * Paths excluded from sitemaps and disallowed in robots.txt.
 * Admin routes, API routes, dev/test pages, and staging URLs.
 */

const { getStaticPagePaths } = require("./next-sitemap.static-page-paths");

/** Staging / duplicate page slugs (first URL segment) */
const TEST_AND_STAGING_SLUGS = [
  "work.html2",
  "about.html2",
  "about.html3",
  "web-development2",
  "contact.html2",
  "career2",
  "tags2",
  "category2",
  "blogs_old",
  "blogs2",
  "blog2",
  "celebrity-endorsements2",
  "print-advertising2",
];

/** Dev, internal, or non-public app routes */
const BLOCKED_PAGE_SLUGS = [
  "test",
  "backup-page",
  "_backup",
  "slug_img",
  "contactUs-page",
  "blogTst",
  "not-found",
  "all-ritz-blogs",
  "contact-us",
  "new-home",
  "404",
];

/** Prefixes that block entire subtrees */
const DISALLOW_PREFIXES = ["/admin", "/api"];

function normalizePathForCheck(path) {
  if (path == null) return "";
  let p = String(path).trim();
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/+$/, "") || "/";
  return p;
}

function getFirstSegment(path) {
  const normalized = normalizePathForCheck(path);
  const segments = normalized.replace(/^\/+/, "").split("/").filter(Boolean);
  return segments[0] || "";
}

function isStaticPagePath(path) {
  const normalized = normalizePathForCheck(path);
  return getStaticPagePaths().includes(normalized);
}

function isBlockedSlug(slug) {
  if (!slug || typeof slug !== "string") return true;

  const normalized = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!normalized) return true;

  if (TEST_AND_STAGING_SLUGS.includes(normalized)) return true;
  if (BLOCKED_PAGE_SLUGS.includes(normalized)) return true;

  if (/^(test|backup|demo|staging|tmp|draft)(-|_|$)/i.test(normalized)) {
    return true;
  }

  return false;
}

function isExcludedSitemapPath(path) {
  const normalized = normalizePathForCheck(path);

  if (normalized === "/") return false;

  if (isStaticPagePath(normalized)) return false;

  if (normalized.startsWith("/services/") || normalized === "/services") {
    return false;
  }

  for (const prefix of DISALLOW_PREFIXES) {
    if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
      return true;
    }
  }

  const firstSegment = getFirstSegment(normalized);
  if (!firstSegment) return false;

  if (isBlockedSlug(firstSegment)) return true;

  return TEST_AND_STAGING_SLUGS.some(
    (slug) => normalized === `/${slug}` || normalized.startsWith(`/${slug}/`)
  );
}

function getExcludeList() {
  const paths = ["/admin", "/admin/*", "/api", "/api/*", "/test", "/test/*"];

  for (const slug of [...TEST_AND_STAGING_SLUGS, ...BLOCKED_PAGE_SLUGS]) {
    paths.push(`/${slug}`);
    paths.push(`/${slug}/*`);
  }

  return paths;
}

function getRobotsDisallowPaths() {
  const paths = ["/admin/"];

  for (const slug of [...TEST_AND_STAGING_SLUGS, ...BLOCKED_PAGE_SLUGS]) {
    paths.push(`/${slug}/`);
  }

  paths.push("/test/");

  return [...new Set(paths)];
}

function getRobotsPolicies() {
  const disallow = getRobotsDisallowPaths();

  return [
    { userAgent: "*", disallow },
    { userAgent: "ChatGPT-User", allow: "/" },
    { userAgent: "OAI-SearchBot", allow: "/" },
    { userAgent: "GPTBot", allow: "/" },
    { userAgent: "Google-Extended", allow: "/" },
    { userAgent: "Bingbot", allow: "/" },
  ];
}

function filterSitemapItems(items) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => {
    const loc = item?.loc;
    if (!loc) return false;
    try {
      const pathname = new URL(loc).pathname;
      return !isExcludedSitemapPath(pathname);
    } catch {
      return !isExcludedSitemapPath(loc);
    }
  });
}

module.exports = {
  TEST_AND_STAGING_SLUGS,
  BLOCKED_PAGE_SLUGS,
  DISALLOW_PREFIXES,
  isBlockedSlug,
  isExcludedSitemapPath,
  getExcludeList,
  getRobotsDisallowPaths,
  getRobotsPolicies,
  filterSitemapItems,
};
