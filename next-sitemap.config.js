/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ritzmediaworld.com', // change this
  generateRobotsTxt: true,
  outDir: './public',
  alternateRefs: [
    {
      href: 'https://ritzmediaworld.com',
      hreflang: 'en',
    },
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }
  },
}
