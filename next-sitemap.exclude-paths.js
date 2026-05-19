 
const NEXT_SITEMAP_EXCLUDE_PATTERNS = [
  "/admin",
  "/admin/*",
  "/_backup",
  "/_backup/*",
  "/404",
  "/404/*",
  "/category2",
  "/category2/*",
  "/contact.html2",
  "/contact.html2/*",
  "/components",
  "/components/*",
  "/backup-page",
  "/backup-page/*",
  "/tst",
  "/test",
  "/tst/*",
  "/tags2",
  "/tags2/*",
  "/work.html2",
  "/work.html2/*",
  "/web-development2",
  "/web-development2/*",
];

function normalizeSitemapPublicPath(raw) {
  if (typeof raw !== "string") return "";
  let s = raw.trim();
  if (!s) return "";
  if (!s.startsWith("/")) s = `/${s}`;
  if (s.length > 1) s = s.replace(/\/+$/, "");
  return s;
}

/** Use for URLs built manually (blogs, MySQL paths, extras) — mirrors `NEXT_SITEMAP_EXCLUDE_PATTERNS`. */
function shouldExcludeFromSitemap(path) {
  const p = normalizeSitemapPublicPath(path);
  if (!p) return false;

  if (p === "/admin" || p.startsWith("/admin/")) return true;
  if (p === "/_backup" || p.startsWith("/_backup/")) return true;
  if (p === "/404" || p.startsWith("/404/")) return true;
  if (p === "/category2" || p.startsWith("/category2/")) return true;
  if (p === "/contact.html2" || p.startsWith("/contact.html2/")) return true;
  if (p === "/components" || p.startsWith("/components/")) return true;
  if (p === "/backup-page" || p.startsWith("/backup-page/")) return true;
  if (p === "/tst" || p.startsWith("/tst/")) return true;
  if (p === "/tags2" || p.startsWith("/tags2/")) return true;
  if (p === "/work.html2" || p.startsWith("/work.html2/")) return true;
  if (p === "/web-development2" || p.startsWith("/web-development2/")) return true;

  return false;
}

module.exports = {
  NEXT_SITEMAP_EXCLUDE_PATTERNS,
  shouldExcludeFromSitemap,
};
