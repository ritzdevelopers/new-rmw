/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: "https://www.ritzmediaworld.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  autoLastmod: true,
  exclude: ["/admin", "/admin/sign-in"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/sign-in"],
      },
    ],
  },
};
