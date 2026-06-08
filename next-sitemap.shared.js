const { siteUrl } = require("./next-sitemap.blog-sources");

/** One ISO timestamp per Node process — used as lastmod for all URLs in a sitemap run. */
let sitemapBuildLastmod = null;

function getSitemapBuildLastmod() {
  if (!sitemapBuildLastmod) {
    sitemapBuildLastmod = new Date().toISOString();
  }
  return sitemapBuildLastmod;
}

/** Sitemap index entries written after sub-sitemaps are generated. */
const SITEMAP_INDEX_FILES = [
  "sitemap-0.xml",
  "page-sitemap.xml",
  "post-sitemap.xml",
  "images-sitemap.xml",
];

/** Paths that must never appear in any sitemap file. */
const EXCLUDED_SITEMAP_PATHS = new Set([]);

function isExcludedSitemapPath(path) {
  if (typeof path !== "string") return false;
  let normalized = path.trim();
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  normalized = normalized.replace(/\/+$/, "") || "/";
  return EXCLUDED_SITEMAP_PATHS.has(normalized);
}

/** Custom robots.txt policies (also used on production). */
const ROBOTS_POLICIES = [
  { userAgent: "*", disallow: ["/admin/"] },
  { userAgent: "ChatGPT-User", allow: "/" },
  { userAgent: "OAI-SearchBot", allow: "/" },
  { userAgent: "GPTBot", allow: "/" },
  { userAgent: "Google-Extended", allow: "/" },
  { userAgent: "Bingbot", allow: "/" },
];

module.exports = {
  siteUrl,
  SITEMAP_INDEX_FILES,
  ROBOTS_POLICIES,
  EXCLUDED_SITEMAP_PATHS,
  isExcludedSitemapPath,
  getSitemapBuildLastmod,
};
