const { siteUrl } = require("./next-sitemap.blog-sources");

/** Sitemap index entries written after sub-sitemaps are generated. */
const SITEMAP_INDEX_FILES = [
  "sitemap-0.xml",
  "page-sitemap.xml",
  "post-sitemap.xml",
  "images-sitemap.xml",
];

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
};
