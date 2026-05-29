const { siteUrl, toIsoOrNull } = require("./next-sitemap.blog-sources");
const { fetchServiceSitemapEntries } = require("./next-sitemap.service-sources");
const { getStaticPagePaths } = require("./next-sitemap.static-page-paths");
const { isExcludedSitemapPath, filterSitemapItems } = require("./next-sitemap.exclusions");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  outDir: "./public",
  sitemapBaseFileName: "page-sitemap",
  generateIndexSitemap: false,
  generateRobotsTxt: false,

  /** Static list + DB services; no other Next-discovered routes. */
  transform: async () => null,

  additionalPaths: async (config) => {
    /** @type {Map<string, string|null>} */
    const uniquePaths = new Map();

    const staticPaths = getStaticPagePaths();
    for (const path of staticPaths) {
      if (!isExcludedSitemapPath(path)) {
        uniquePaths.set(path, null);
      }
    }

    for (const { path, lastmod } of await fetchServiceSitemapEntries()) {
      if (isExcludedSitemapPath(path)) continue;

      if (!uniquePaths.has(path)) {
        uniquePaths.set(path, lastmod);
      } else if (lastmod) {
        const prev = uniquePaths.get(path);
        if (!prev || new Date(lastmod) > new Date(prev)) {
          uniquePaths.set(path, lastmod);
        }
      }
    }

    const items = [];
    const fallbackLastmod = new Date().toISOString();

    for (const [path, lastmod] of uniquePaths.entries()) {
      const transformed = await config.transform(config, path);

      items.push({
        ...transformed,
        loc: `${siteUrl}${path}`,
        lastmod: toIsoOrNull(lastmod) || fallbackLastmod,
        changefreq: "weekly",
        priority: 0.8,
      });
    }

    const filtered = filterSitemapItems(items);
    console.log(
      `[next-sitemap:page-sitemap] URLs: ${filtered.length} (${staticPaths.length} static + DB services, deduped)`
    );
    return filtered;
  },
};
