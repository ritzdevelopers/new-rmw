const { siteUrl, ROBOTS_POLICIES } = require("./next-sitemap.shared");

/**
 * Robots.txt only — no URL sitemap (page/post/images configs handle those).
 * Run last in postbuild after finalize-sitemaps.mjs writes sitemap.xml.
 *
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl,
  outDir: "./public",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  transform: async () => null,
  additionalPaths: async () => [],
  robotsTxtOptions: {
    policies: ROBOTS_POLICIES,
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
};
