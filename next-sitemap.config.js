const { siteUrl, ROBOTS_POLICIES } = require("./next-sitemap.shared");

/**
 * Legacy robots.txt config (next-sitemap requires .next/build-manifest).
 * postbuild uses scripts/generate-robots.mjs instead — edit ROBOTS_POLICIES in next-sitemap.shared.js.
 * Run manually only if needed: node scripts/generate-robots.mjs
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
