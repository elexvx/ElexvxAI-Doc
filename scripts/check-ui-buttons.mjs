import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const EXTENSIONS = new Set([".astro", ".md", ".mdx", ".tsx", ".ts"]);

function collectFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      out.push(...collectFiles(fullPath));
      continue;
    }
    const idx = entry.lastIndexOf(".");
    const ext = idx >= 0 ? entry.slice(idx) : "";
    if (EXTENSIONS.has(ext)) out.push(fullPath);
  }
  return out;
}

const files = collectFiles(join(root, "src"));

const bannedClassPatterns = [/(?<![\w-])icon-btn(?![\w-])/, /(?<![\w-])copy-page-btn(?![\w-])/];
const failures = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  for (const pattern of bannedClassPatterns) {
    if (pattern.test(source)) {
      failures.push(`${file}: contains banned class pattern "${pattern.source}"`);
    }
  }
}

if (failures.length > 0) {
  console.error("UI button rule violations:");
  failures.forEach((entry) => console.error(`- ${entry}`));
  process.exit(1);
}

console.log("UI button rules passed.");
