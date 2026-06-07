import path from "path";
import { createRequire } from "module";

export type RegenerateBlogSitemapsResult = {
  ok: boolean;
  blogCount: number;
  error?: string;
};

const require = createRequire(path.join(process.cwd(), "package.json"));

const { regenerateBlogSitemaps } = require("../../next-sitemap.regenerate-blogs.js") as {
  regenerateBlogSitemaps: () => Promise<RegenerateBlogSitemapsResult>;
};

export { regenerateBlogSitemaps };
