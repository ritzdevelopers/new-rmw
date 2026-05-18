const { siteUrl, toIsoOrNull } = require("./next-sitemap.blog-sources");
const { fetchServiceSitemapEntries } = require("./next-sitemap.service-sources");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  outDir: "./public",
  sitemapBaseFileName: "page-sitemap",
  generateIndexSitemap: false,
  generateRobotsTxt: false,

  /** Only service URLs from DB; no Next-discovered routes. */
  transform: async () => null,

  additionalPaths: async (config) => {
    const entries = await fetchServiceSitemapEntries();
    const items = [];
    const fallbackLastmod = new Date().toISOString();

    for (const { path, lastmod } of entries) {
      const transformed = await config.transform(config, path);

      items.push({
        ...transformed,
        loc: `${siteUrl}${path}`,
        lastmod: toIsoOrNull(lastmod) || fallbackLastmod,
        changefreq: "weekly",
        priority: 0.8,
      });
    }

    console.log(`[next-sitemap:page-sitemap] Service URLs: ${items.length}`);
    return items;
  },
};
