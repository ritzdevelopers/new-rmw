#!/usr/bin/env node
/**
 * Regenerates sitemaps from curated sources only (no Next.js route auto-discovery).
 * Writes fresh robots.txt + sitemap index every run.
 *
 * Usage: npm run generate:sitemap
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { siteUrl } = require("../next-sitemap.blog-sources");
const { getRobotsPolicies } = require("../next-sitemap.exclusions");

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");

const SITEMAP_OUTPUT_FILES = [
  "sitemap.xml",
  "sitemap-0.xml",
  "page-sitemap.xml",
  "post-sitemap.xml",
  "images-sitemap.xml",
  "robots.txt",
];

/** Curated configs only — main config auto-discovers /test, /admin, etc. from .next */
const SITEMAP_CONFIGS = [
  "next-sitemap.page.config.js",
  "next-sitemap.post.config.js",
  "next-sitemap.images.config.js",
];

function loadEnvFile(filename) {
  const envPath = path.join(ROOT, filename);
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }

  console.log(`[generate-sitemap] Loaded env from ${filename}`);
}

function removeOldSitemapFiles() {
  for (const file of SITEMAP_OUTPUT_FILES) {
    const filePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`[generate-sitemap] Removed old ${file}`);
    }
  }
}

function runSitemapGeneration() {
  for (const config of SITEMAP_CONFIGS) {
    console.log(`[generate-sitemap] Running ${config}...`);
    execSync(`npx next-sitemap --config ${config}`, {
      stdio: "inherit",
      env: process.env,
      cwd: ROOT,
    });
  }
}

function writeRobotsTxt() {
  const lines = [];

  for (const policy of getRobotsPolicies()) {
    lines.push(`User-agent: ${policy.userAgent}`);

    if (policy.allow) {
      lines.push(`Allow: ${policy.allow}`);
    }

    if (policy.disallow) {
      const rules = Array.isArray(policy.disallow)
        ? policy.disallow
        : [policy.disallow];
      for (const rule of rules) {
        lines.push(`Disallow: ${rule}`);
      }
    }

    lines.push("");
  }

  lines.push(`Sitemap: ${siteUrl}/sitemap.xml`);

  fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), `${lines.join("\n")}\n`, "utf8");
  console.log("[generate-sitemap] Wrote robots.txt");
}

function writeSitemapIndex() {
  const lastmod = new Date().toISOString();
  const childSitemaps = [
    "page-sitemap.xml",
    "post-sitemap.xml",
    "images-sitemap.xml",
  ];

  const body = childSitemaps
    .map(
      (file) =>
        `  <sitemap>\n    <loc>${siteUrl}/${file}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml, "utf8");
  console.log("[generate-sitemap] Wrote sitemap.xml index");
}

function main() {
  loadEnvFile(".env.local");
  loadEnvFile(".env");

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  removeOldSitemapFiles();
  runSitemapGeneration();
  writeSitemapIndex();
  writeRobotsTxt();

  console.log("[generate-sitemap] Done — curated sitemaps + robots.txt in public/");
}

main();
