const { siteUrl, toIsoOrNull } = require("./next-sitemap.blog-sources");
const { fetchImageSitemapEntries } = require("./next-sitemap.image-sources");
const { isExcludedSitemapPath, filterSitemapItems } = require("./next-sitemap.exclusions");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  outDir: "./public",
  sitemapBaseFileName: "images-sitemap",
  generateIndexSitemap: false,
  generateRobotsTxt: false,

  transform: async () => null,

  additionalPaths: async (config) => {
    const entries = await fetchImageSitemapEntries();
    const items = [];
    const fallbackLastmod = new Date().toISOString();

    for (const entry of entries) {
      if (!entry.images?.length || isExcludedSitemapPath(entry.path)) continue;

      const imageObjects = entry.images
        .map(({ url, title }) => {
          try {
            return { loc: new URL(url), title: title || undefined };
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      if (!imageObjects.length) continue;

      const transformed = await config.transform(config, entry.path);

      items.push({
        ...transformed,
        loc: `${siteUrl}${entry.path}`,
        lastmod: toIsoOrNull(entry.lastmod) || fallbackLastmod,
        changefreq: "weekly",
        priority: 0.6,
        images: imageObjects,
      });
    }

    const filtered = filterSitemapItems(items);
    console.log(`[next-sitemap:images-sitemap] Page URLs with image entries: ${filtered.length}`);
    return filtered;
  },
};
