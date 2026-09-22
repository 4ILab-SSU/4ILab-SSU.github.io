#!/usr/bin/env node
/**
 * Lightweight content validator for the 4ILab website.
 * Runs in CI (and locally with `node scripts/validate.js`) BEFORE Jekyll so that a
 * typo in a YAML/BibTeX file gives a clear message instead of a cryptic build error.
 *
 * Checks:
 *   - every _data/*.yml file parses
 *   - members.yml: required fields, photo files exist (warning only)
 *   - papers.bib: balanced braces, unique keys, required fields, known `abbr` badges
 *   - _news/*.md: front matter has a date
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
let errors = 0;
let warnings = 0;
const fail = (msg) => {
  errors++;
  console.error("  ✖ " + msg);
};
const warn = (msg) => {
  warnings++;
  console.warn("  ⚠ " + msg);
};

// YAML parsing is required: never report success after skipping these checks.
let yaml = null;
try {
  yaml = require("js-yaml");
} catch (_) {
  console.error("Missing js-yaml. Run `npm ci` before validating content.");
  process.exit(1);
}

function loadYaml(file, text = fs.readFileSync(file, "utf8")) {
  if (text.includes("\t")) fail(`${path.relative(root, file)}: contains a TAB character — YAML must use spaces`);
  try {
    return yaml.load(text);
  } catch (e) {
    fail(`${path.relative(root, file)}: YAML parse error — ${e.message.split("\n")[0]}`);
    return null;
  }
}

console.log("Validating _data/*.yml");
loadYaml(path.join(root, "_config.yml"));
const dataDir = path.join(root, "_data");
const data = {};
for (const f of fs.readdirSync(dataDir).filter((f) => f.endsWith(".yml"))) {
  data[f.replace(/\.yml$/, "")] = loadYaml(path.join(dataDir, f));
}

// --- members.yml
if (data.members) {
  console.log("Validating _data/members.yml");
  const seen = new Set();
  for (const g of data.members.groups || []) {
    if (!g.title || !g.id) fail(`members.yml: a group is missing "title" or "id"`);
    for (const m of g.members || []) {
      if (!m.name) fail(`members.yml (${g.title}): member without "name"`);
      if (!m.role) fail(`members.yml: ${m.name} has no "role"`);
      if (seen.has(m.name)) warn(`members.yml: "${m.name}" appears more than once`);
      seen.add(m.name);
      if (m.photo && !fs.existsSync(path.join(root, "assets/img/members", m.photo)))
        warn(`members.yml: photo assets/img/members/${m.photo} for ${m.name} not found (a placeholder avatar will be shown)`);
      if (m.since && !/^\d{4}\.\d{2}$/.test(String(m.since))) warn(`members.yml: ${m.name} "since" should look like "2025.03" (quoted)`);
    }
  }
}

// --- venues / bib
const venues = data.venues ? Object.keys(data.venues) : [];
const bibFile = path.join(root, "_bibliography/papers.bib");
if (fs.existsSync(bibFile)) {
  console.log("Validating _bibliography/papers.bib");
  const bib = fs.readFileSync(bibFile, "utf8").replace(/^---\n---\n/, "");
  const open = (bib.match(/{/g) || []).length;
  const close = (bib.match(/}/g) || []).length;
  if (open !== close) fail(`papers.bib: unbalanced braces ({: ${open}, }: ${close}) — check the last entry you edited`);

  const keys = new Set();
  const entryRe = /@(\w+)\s*{\s*([^,\s]+)\s*,([\s\S]*?)\n}\s*(?=\n%|\n@|\s*$)/g;
  let m;
  let count = 0;
  while ((m = entryRe.exec(bib))) {
    count++;
    const [, type, key, body] = m;
    if (keys.has(key)) fail(`papers.bib: duplicate key "${key}"`);
    keys.add(key);
    const field = (name) => {
      const r = new RegExp(`^\\s*${name}\\s*=\\s*[{"]`, "m");
      return r.test(body);
    };
    for (const req of ["title", "author", "year"]) if (!field(req)) fail(`papers.bib [${key}]: missing "${req}"`);
    if (type.toLowerCase() === "article" && !field("journal")) fail(`papers.bib [${key}]: @article needs "journal"`);
    if (type.toLowerCase() === "inproceedings" && !field("booktitle")) fail(`papers.bib [${key}]: @inproceedings needs "booktitle"`);
    const abbr = body.match(/^\s*abbr\s*=\s*{([^}]*)}/m);
    if (abbr && venues.length && !venues.includes(abbr[1].trim()))
      warn(`papers.bib [${key}]: abbr "${abbr[1]}" is not defined in _data/venues.yml (badge will be grey)`);
  }
  console.log(`  ${count} bibliography entries`);
}

// --- news
const newsDir = path.join(root, "_news");
if (fs.existsSync(newsDir)) {
  console.log("Validating _news/*.md");
  for (const f of fs.readdirSync(newsDir).filter((f) => f.endsWith(".md"))) {
    const text = fs.readFileSync(path.join(newsDir, f), "utf8");
    const frontMatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!frontMatter) {
      fail(`_news/${f}: missing or unclosed front matter`);
    } else {
      const metadata = loadYaml(path.join(newsDir, f), frontMatter[1]);
      if (!metadata || !metadata.date || Number.isNaN(Date.parse(String(metadata.date))))
        fail(`_news/${f}: front matter needs a valid "date: YYYY-MM-DD ..."`);
    }
    if (!/^\d{4}-\d{2}-\d{2}-/.test(f)) warn(`_news/${f}: file name should start with YYYY-MM-DD-`);
  }
}

console.log(errors ? `\n${errors} error(s), ${warnings} warning(s)` : `\nOK — ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
