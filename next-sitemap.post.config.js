const {
  siteUrl,
  STATIC_PAGE_SLUGS,
  safeToPath,
  pickBlogSlug,
  fetchBlogRecords,
} = require("./next-sitemap.blog-sources");
const { getSitemapBuildLastmod } = require("./next-sitemap.shared");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  outDir: "./public",
  sitemapBaseFileName: "post-sitemap",
  generateIndexSitemap: false,
  generateRobotsTxt: false,

  /** Drop every Next-discovered route; blogs come only from `additionalPaths`. */
  transform: async () => null,

  additionalPaths: async (config) => {
    const buildLastmod = getSitemapBuildLastmod();
    const records = await fetchBlogRecords();
    const uniquePaths = new Set();

    for (const blog of records) {
      const rawSlug = pickBlogSlug(blog);
      const blogPath = safeToPath(rawSlug);

      if (!blogPath) continue;

      const normalized = blogPath.replace(/^\/+/, "");
      if (STATIC_PAGE_SLUGS.has(normalized)) continue;

      uniquePaths.add(blogPath);
    }

    const items = [];

    for (const path of uniquePaths) {
      const transformed = await config.transform(config, path);

      items.push({
        ...transformed,
        loc: `${siteUrl}${path}`,
        lastmod: buildLastmod,
        changefreq: "weekly",
        priority: 0.8,
      });
    }

    console.log(`[next-sitemap:post-sitemap] Blog URLs: ${items.length}`);
    return items;
  },
};
