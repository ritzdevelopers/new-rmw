const mysql = require("mysql2/promise");
const mongoose = require("mongoose");

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

async function fetchBlogRecordsFromApi() {
  for (const endpoint of BLOG_API_CANDIDATES) {
    try {
      console.log(`[next-sitemap] Fetching blogs from: ${endpoint}`);
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!response.ok) continue;

      const payload = await response.json();
      const records = Array.isArray(payload) ? payload : payload?.blogs || payload?.data || [];

      if (Array.isArray(records)) return records;
    } catch (error) {
      console.error(`[next-sitemap] API fetch failed`, error);
    }
  }
  return [];
}

async function fetchBlogRecordsFromMySQL() {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const port = Number(process.env.DATABASE_PORT || 3306);

  if (!host || !user || !database) return [];

  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password, database, port });
    const [rows] = await connection.execute(
      "SELECT slug, created_at FROM blogs WHERE category_id != 1 AND status = 1 ORDER BY id DESC"
    );
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error("[next-sitemap] MySQL failed", error);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

async function fetchBlogRecordsFromMongo() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) return [];

  let conn;
  try {
    conn = await mongoose.createConnection(mongoUrl).asPromise();
    const docs = await conn.collection("ritzblogmodels").find(
      { blogStatus: true },
      { projection: { blogSlug: 1, createdAt: 1, updatedAt: 1 } }
    ).toArray();

    return Array.isArray(docs) ? docs : [];
  } catch (error) {
    console.error("[next-sitemap] Mongo failed", error);
    return [];
  } finally {
    if (conn) await conn.close();
  }
}

async function fetchBlogRecords() {
  const apiRecords = await fetchBlogRecordsFromApi();
  const mysqlRecords = await fetchBlogRecordsFromMySQL();
  const mongoRecords = await fetchBlogRecordsFromMongo();

  /** Dedupe by slug; MySQL (published) wins over API/Mongo duplicates */
  const bySlug = new Map();

  const addRecord = (blog, source) => {
    const slug = pickBlogSlug(blog);
    const path = safeToPath(slug);
    if (!path) return;

    const key = path.replace(/^\/+/, "").toLowerCase();
    const existing = bySlug.get(key);
    if (!existing || source === "mysql") {
      bySlug.set(key, blog);
    }
  };

  for (const blog of Array.isArray(apiRecords) ? apiRecords : []) {
    addRecord(blog, "api");
  }
  for (const blog of Array.isArray(mongoRecords) ? mongoRecords : []) {
    addRecord(blog, "mongo");
  }
  for (const blog of Array.isArray(mysqlRecords) ? mysqlRecords : []) {
    addRecord(blog, "mysql");
  }

  const merged = Array.from(bySlug.values());

  if (merged.length === 0) {
    console.warn("[next-sitemap] No blog records found from API/MySQL/Mongo.");
  } else {
    console.log(
      `[next-sitemap] Source counts -> API: ${Array.isArray(apiRecords) ? apiRecords.length : 0}, MySQL: ${Array.isArray(mysqlRecords) ? mysqlRecords.length : 0}, Mongo: ${Array.isArray(mongoRecords) ? mongoRecords.length : 0}, Deduped: ${merged.length}`
    );
  }

  return merged;
}

module.exports = {
  siteUrl,
  STATIC_PAGE_SLUGS,
  safeToPath,
  pickBlogSlug,
  pickBlogLastmod,
  toIsoOrNull,
  fetchBlogRecords,
};
