/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://ritzmediaworld.com/",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin", "/admin/sign-in"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
    ],
  },
};

module.exports = config;
