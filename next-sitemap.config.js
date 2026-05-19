const {
  siteUrl,
  STATIC_PAGE_SLUGS,
  safeToPath,
  pickBlogSlug,
  pickBlogLastmod,
  toIsoOrNull,
  fetchBlogRecords,
} = require("./next-sitemap.blog-sources");
const { fetchServiceSitemapEntries } = require("./next-sitemap.service-sources");
const {
  NEXT_SITEMAP_EXCLUDE_PATTERNS,
  shouldExcludeFromSitemap,
} = require("./next-sitemap.exclude-paths");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  outDir: "./public",
  exclude: NEXT_SITEMAP_EXCLUDE_PATTERNS,

  transform: async (config, path) => {
    if (shouldExcludeFromSitemap(path)) return null;
    return {
      loc: `${siteUrl}${path}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.7,
    };
  },

  additionalPaths: async (config) => {
    const records = await fetchBlogRecords();
    const uniquePaths = new Map();

    for (const blog of records) {
      const rawSlug = pickBlogSlug(blog);
      const blogPath = safeToPath(rawSlug);

      if (!blogPath) continue;
      if (shouldExcludeFromSitemap(blogPath)) continue;

      const normalized = blogPath.replace(/^\/+/, "");
      if (STATIC_PAGE_SLUGS.has(normalized)) continue;

      uniquePaths.set(blogPath, pickBlogLastmod(blog));
    }

    const blogPathCount = uniquePaths.size;

    for (const { path: servicePath, lastmod: serviceLastmod } of await fetchServiceSitemapEntries()) {
      if (shouldExcludeFromSitemap(servicePath)) continue;
      if (!uniquePaths.has(servicePath)) {
        uniquePaths.set(servicePath, serviceLastmod);
      }
    }

    const items = [];

    for (const [path, lastmod] of uniquePaths.entries()) {
      const transformed = await config.transform(config, path);

      items.push({
        ...transformed,
        loc: `${siteUrl}${path}`,
        lastmod: toIsoOrNull(lastmod) || transformed.lastmod,
        changefreq: "weekly",
        priority: 0.8,
      });
    }

    console.log(
      `[next-sitemap] Blogs added: ${blogPathCount}, total additional paths (blogs + services): ${items.length}`
    );
    return items;
  },
};
