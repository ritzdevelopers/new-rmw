const mysql = require("mysql2/promise");

function safeSegment(slugOrPath) {
  if (typeof slugOrPath !== "string") return null;
  const cleaned = slugOrPath.trim().replace(/^\/+|\/+$/g, "");
  if (!cleaned) return null;
  return cleaned;
}

async function fetchServiceSitemapEntries() {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const port = Number(process.env.DATABASE_PORT || 3306);

  if (!host || !user || !database) {
    console.warn("[next-sitemap] Skipping service URLs (database env incomplete).");
    return [];
  }

  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password, database, port });

    const [secondRows] = await connection.execute(
      "SELECT link FROM services WHERE link IS NOT NULL AND TRIM(link) <> '' ORDER BY id ASC"
    );

    const [thirdRows] = await connection.execute(
      `SELECT services.link AS second_link, service_second.link AS third_link
       FROM service_second
       INNER JOIN services ON service_second.service_id = services.id
       WHERE services.link IS NOT NULL AND TRIM(services.link) <> ''
         AND service_second.link IS NOT NULL AND TRIM(service_second.link) <> ''`
    );

    const paths = new Map();

    for (const row of secondRows) {
      const seg = safeSegment(row.link);
      if (!seg) continue;
      paths.set(`/services/${seg}`, null);
    }

    for (const row of thirdRows) {
      const s = safeSegment(row.second_link);
      const t = safeSegment(row.third_link);
      if (!s || !t) continue;
      paths.set(`/services/${s}/${t}`, null);
    }

    const secondCount = secondRows.length;
    const thirdPairCount = thirdRows.length;
    console.log(
      `[next-sitemap] Services: ${secondCount} second-level rows, ${thirdPairCount} third-level rows → ${paths.size} unique /services URLs`
    );

    return Array.from(paths.entries()).map(([path, lastmod]) => ({ path, lastmod }));
  } catch (error) {
    console.error("[next-sitemap] Service URL fetch failed", error);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

module.exports = {
  fetchServiceSitemapEntries,
};
