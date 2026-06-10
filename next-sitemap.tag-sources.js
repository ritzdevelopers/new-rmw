const mysql = require("mysql2/promise");
const mongoose = require("mongoose");

/**
 * Mirrors /tags/[keyword] slug generation (Section2 blog tags):
 * lowercase, trim, spaces → hyphens, strip quotes.
 */
function keywordToTagSlug(keyword) {
  if (typeof keyword !== "string") return null;

  const cleaned = keyword
    .replace(/['",]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!cleaned) return null;

  const slug = cleaned.replace(/\s+/g, "-");
  return slug || null;
}

function collectTagSlugsFromMetaKeywords(raw) {
  if (typeof raw !== "string" || !raw.trim()) return [];

  const slugs = [];
  for (const part of raw.split(",")) {
    const slug = keywordToTagSlug(part);
    if (slug) slugs.push(slug);
  }
  return slugs;
}

async function fetchTagSlugsFromMySQL() {
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
      `SELECT meta_keywords
       FROM blogs
       WHERE meta_keywords IS NOT NULL
         AND TRIM(meta_keywords) <> ''
         AND (status = 1 OR status = 'active')
       ORDER BY id DESC`
    );

    const slugs = new Set();
    for (const row of rows) {
      for (const slug of collectTagSlugsFromMetaKeywords(row.meta_keywords)) {
        slugs.add(slug);
      }
    }

    return [...slugs];
  } catch (error) {
    console.error("[next-sitemap] Tag URL MySQL fetch failed", error);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

async function fetchTagSlugsFromMongo() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) return [];

  let conn;
  try {
    conn = await mongoose.createConnection(mongoUrl).asPromise();
    const docs = await conn
      .collection("ritzblogmodels")
      .find(
        { blogStatus: true, metaKeywords: { $exists: true, $ne: "" } },
        { projection: { metaKeywords: 1 } }
      )
      .toArray();

    const slugs = new Set();
    for (const doc of docs) {
      for (const slug of collectTagSlugsFromMetaKeywords(doc.metaKeywords)) {
        slugs.add(slug);
      }
    }

    return [...slugs];
  } catch (error) {
    console.error("[next-sitemap] Tag URL Mongo fetch failed", error);
    return [];
  } finally {
    if (conn) await conn.close();
  }
}

/** @returns {string[]} deduplicated /tags/{slug} paths */
async function fetchTagSitemapEntries() {
  const [mysqlSlugs, mongoSlugs] = await Promise.all([
    fetchTagSlugsFromMySQL(),
    fetchTagSlugsFromMongo(),
  ]);

  const paths = new Set();
  for (const slug of [...mysqlSlugs, ...mongoSlugs]) {
    paths.add(`/tags/${slug}`);
  }

  const entries = [...paths].sort();
  console.log(
    `[next-sitemap] Tags: MySQL ${mysqlSlugs.length}, Mongo ${mongoSlugs.length} → ${entries.length} unique /tags URLs`
  );

  return entries;
}

module.exports = {
  keywordToTagSlug,
  collectTagSlugsFromMetaKeywords,
  fetchTagSitemapEntries,
};
