const siteUrl = "https://ritzmediaworld.com";

const BLOG_API_CANDIDATES = [
  process.env.SITEMAP_BLOGS_API_URL,
  `${siteUrl}/api/get_all_blogs`,
  `${siteUrl}/api/all_blogs`,
].filter(Boolean);

const STATIC_PAGE_SLUGS = new Set([
  "blogs",
  "contact-us",
  "about.html",
  "new-home",
  "tags2",
  "category2",
]);

function safeToPath(slugOrPath) {
  if (typeof slugOrPath !== "string") return null;
  const cleaned = slugOrPath.trim().replace(/^\/+|\/+$/g, "");
  if (!cleaned) return null;
  return `/${cleaned}`;
}

function pickBlogSlug(blog) {
  if (!blog || typeof blog !== "object") return null;
  return blog.slug || blog.blogSlug || blog.link || null;
}

function pickBlogLastmod(blog) {
  if (!blog || typeof blog !== "object") return null;
  return blog.updated_at || blog.updatedAt || blog.created_at || blog.createdAt || null;
}

function toIsoOrNull(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

async function fetchBlogRecords() {
  for (const endpoint of BLOG_API_CANDIDATES) {
    try {
      console.log(`[next-sitemap] Fetching blogs from: ${endpoint}`);
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        console.warn(`[next-sitemap] Blog API responded with status ${response.status}: ${endpoint}`);
        continue;
      }

      const payload = await response.json();
      const records = Array.isArray(payload) ? payload : payload?.blogs || payload?.data || [];

      if (!Array.isArray(records)) {
        console.warn(`[next-sitemap] Unexpected blog payload shape from ${endpoint}`);
        continue;
      }

      console.log(`[next-sitemap] Blog API success from ${endpoint}. Records: ${records.length}`);
      return records;
    } catch (error) {
      console.error(`[next-sitemap] Failed blog fetch from ${endpoint}`, error);
    }
  }

  console.warn("[next-sitemap] Could not fetch blogs from any API candidate. Continuing with static routes only.");
  return [];
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  outDir: "./public",
  alternateRefs: [
    {
      href: siteUrl,
      hreflang: "en",
    },
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.7,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => {
    const records = await fetchBlogRecords();
    const uniquePaths = new Map();
    let missingSlugCount = 0;

    for (const blog of records) {
      const rawSlug = pickBlogSlug(blog);
      const blogPath = safeToPath(rawSlug);

      if (!blogPath) {
        missingSlugCount += 1;
        continue;
      }

      const normalizedSlug = blogPath.replace(/^\/+/, "");
      if (STATIC_PAGE_SLUGS.has(normalizedSlug)) continue;
      uniquePaths.set(blogPath, pickBlogLastmod(blog));
    }

    const items = [];
    for (const [path, lastmod] of uniquePaths.entries()) {
      const transformed = await config.transform(config, path);
      items.push({
        ...transformed,
        loc: path,
        lastmod: toIsoOrNull(lastmod) || transformed?.lastmod,
        changefreq: "weekly",
        priority: 0.8,
      });
    }

    console.log(
      `[next-sitemap] Dynamic blog sitemap paths generated: ${items.length}. Missing slug rows skipped: ${missingSlugCount}.`
    );

    return items;
  },
};
