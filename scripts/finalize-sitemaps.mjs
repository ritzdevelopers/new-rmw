import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { siteUrl, SITEMAP_INDEX_FILES } = require("../next-sitemap.shared.js");

const publicDir = path.join(process.cwd(), "public");
const lastmod = new Date().toISOString();

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
