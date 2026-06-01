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
const { fetchCategorySitemapEntries } = require("./next-sitemap.category-sources");

/** Paths that must never appear in sitemap-0.xml (admin, internal, legacy). */
const EXCLUDED_PATHS = [
  "/admin",
  "/admin/*",
  "/api/*",
  "/test",
  "/_backup",
  "/backup-page",
  "/404/*",
  "/slug_img",
  "/contactUs-page",
  "/blogs_old",
  "/about.html2",
  "/about.html3",
  "/contact.html2",
  "/contact.html2/*",
  "/work.html2",
  "/work.html2/*",
  "/blogTst",
  "/discussion-forum",
];

/**
 * Generates sitemap-0.xml: Next.js build routes + blogs, services, and categories.
 * Requires `next build` output in .next. Run first in postbuild.
 *
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl,
  outDir: "./public",
  sitemapBaseFileName: "sitemap",
  generateIndexSitemap: true,
  generateRobotsTxt: false,
  exclude: EXCLUDED_PATHS,

  transform: async (config, path) => ({
    loc: `${siteUrl}${path}`,
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.7,
  }),

  additionalPaths: async (config) => {
    const uniquePaths = new Map();

    for (const path of await fetchCategorySitemapEntries()) {
      uniquePaths.set(path, null);
    }

    const records = await fetchBlogRecords();
    let blogPathCount = 0;

    for (const blog of records) {
      const rawSlug = pickBlogSlug(blog);
      const blogPath = safeToPath(rawSlug);

      if (!blogPath) continue;

      const normalized = blogPath.replace(/^\/+/, "");
      if (STATIC_PAGE_SLUGS.has(normalized)) continue;

      if (!uniquePaths.has(blogPath)) blogPathCount++;
      uniquePaths.set(blogPath, pickBlogLastmod(blog));
    }

    for (const { path: servicePath, lastmod: serviceLastmod } of await fetchServiceSitemapEntries()) {
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
        priority: path.startsWith("/category/") ? 0.7 : 0.8,
      });
    }

    console.log(
      `[next-sitemap:sitemap-0] Categories + blogs (${blogPathCount}) + services → ${items.length} additional paths`
    );
    return items;
  },
};
