import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { siteUrl, SITEMAP_INDEX_FILES } = require("../next-sitemap.shared.js");

const publicDir = path.join(process.cwd(), "public");
const lastmod = new Date().toISOString();

/** Drop legacy .html2 routes from sitemap-0 (canonical pages use .html). */
const SITEMAP_0_EXCLUDE_LOC = /\/contact\.html2|\/work\.html2/;

function stripExcludedUrlsFromSitemap0() {
  const filePath = path.join(publicDir, "sitemap-0.xml");
  if (!fs.existsSync(filePath)) return;

  const xml = fs.readFileSync(filePath, "utf8");
  const filtered = xml
    .split("\n")
    .filter((line) => !SITEMAP_0_EXCLUDE_LOC.test(line))
    .join("\n");

  if (filtered !== xml) {
    fs.writeFileSync(filePath, filtered);
    console.log(
      "[finalize-sitemaps] Removed contact.html2 and work.html2 from sitemap-0.xml"
    );
  }
}

stripExcludedUrlsFromSitemap0();

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_INDEX_FILES.map(
  (file) => `  <sitemap>
    <loc>${siteUrl}/${file}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
).join("\n")}
</sitemapindex>
`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapIndex);

console.log(
  `[finalize-sitemaps] Wrote sitemap index with ${SITEMAP_INDEX_FILES.length} entries`
);
