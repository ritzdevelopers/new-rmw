const siteUrl = "https://ritzmediaworld.com";
const mysql = require("mysql2/promise");
const mongoose = require("mongoose");

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
  const apiRecords = await fetchBlogRecordsFromApi();
  if (Array.isArray(apiRecords) && apiRecords.length > 0) {
    return apiRecords;
  }

  const mysqlRecords = await fetchBlogRecordsFromMySQL();
  if (Array.isArray(mysqlRecords) && mysqlRecords.length > 0) {
    return mysqlRecords;
  }

  const mongoRecords = await fetchBlogRecordsFromMongo();
  if (Array.isArray(mongoRecords) && mongoRecords.length > 0) {
    return mongoRecords;
  }

  console.warn("[next-sitemap] No blog records found from API/MySQL/Mongo. Continuing with static routes only.");
  return [];
}

async function fetchBlogRecordsFromApi() {
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

  console.warn("[next-sitemap] Could not fetch blogs from API candidates.");
  return [];
}

async function fetchBlogRecordsFromMySQL() {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const port = Number(process.env.DATABASE_PORT || 3306);

  if (!host || !user || !database) {
    console.warn("[next-sitemap] MySQL fallback skipped: missing DATABASE_* env values.");
    return [];
  }

  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password, database, port });
    const [rows] = await connection.execute(
      "SELECT slug, created_at FROM blogs WHERE category_id != 1 AND status = 1 ORDER BY id DESC, created_at DESC"
    );
    const records = Array.isArray(rows) ? rows : [];
    console.log(`[next-sitemap] MySQL fallback success. Records: ${records.length}`);
    return records;
  } catch (error) {
    console.error("[next-sitemap] MySQL fallback failed", error);
    return [];
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (_error) {
        // ignore close errors
      }
    }
  }
}

async function fetchBlogRecordsFromMongo() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    console.warn("[next-sitemap] Mongo fallback skipped: missing MONGO_URL env value.");
    return [];
  }

  let conn;
  try {
    conn = await mongoose.createConnection(mongoUrl).asPromise();
    const docs = await conn.collection("ritzblogmodels").find(
      { blogStatus: true },
      { projection: { blogSlug: 1, createdAt: 1, updatedAt: 1 } }
    ).toArray();
    const records = Array.isArray(docs) ? docs : [];
    console.log(`[next-sitemap] Mongo fallback success. Records: ${records.length}`);
    return records;
  } catch (error) {
    console.error("[next-sitemap] Mongo fallback failed", error);
    return [];
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (_error) {
        // ignore close errors
      }
    }
  }
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
