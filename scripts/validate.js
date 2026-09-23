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

// --- bilingual copy and translated news
if (data.i18n) {
  for (const lang of ["en", "ko"]) {
    if (!data.i18n[lang] || typeof data.i18n[lang] !== "object") fail(`i18n.yml: missing ${lang} dictionary`);
    for (const [key, value] of Object.entries(data.i18n[lang] || {})) {
      if (!key.trim() || typeof value !== "string" || !value.trim()) fail(`i18n.yml (${lang}): translations must be non-empty strings`);
    }
  }
}
for (const [name, body] of Object.entries(data.news_ko || {})) {
  if (!fs.existsSync(path.join(root, "_news", name))) fail(`news_ko.yml: no source news file "${name}"`);
  if (typeof body !== "string" || !body.trim()) fail(`news_ko.yml: empty Korean news "${name}"`);
}

// --- conferences.yml
if (data.conferences) {
  console.log("Validating _data/conferences.yml");
  const validDate = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  if (!validDate(data.conferences.checked_on)) fail("conferences.yml: checked_on must be a quoted YYYY-MM-DD date");
  const ids = new Set();
  for (const conference of data.conferences.conferences || []) {
    const label = `conferences.yml (${conference.name || "unnamed"})`;
    if (!conference.id || !/^[a-z0-9-]+$/.test(conference.id) || ids.has(conference.id)) fail(`${label}: missing, invalid or duplicate id`);
    ids.add(conference.id);
    if (!conference.name || !/^https:\/\//.test(conference.source || "")) fail(`${label}: name and official HTTPS source required`);
    if (!Array.isArray(conference.events)) { fail(`${label}: events must be a list (use [] for TBA)`); continue; }
    for (const event of conference.events) {
      if (!validDate(event.date)) fail(`${label}: invalid event date; use quoted YYYY-MM-DD`);
      if (event.end_date && (!validDate(event.end_date) || event.end_date < event.date)) fail(`${label}: invalid end_date or date range`);
      if (!event.label || !["deadline", "notification", "registration", "conference"].includes(event.type)) fail(`${label}: event needs label and valid type`);
      if (event.zone && event.zone !== "AoE") fail(`${label}: zone must be AoE or omitted`);
    }
  }
}

// --- photo locations and album links
if (data.photo_places) {
  for (const [id, place] of Object.entries(data.photo_places)) {
    if (!place.name || !Number.isFinite(place.lat) || Math.abs(place.lat) > 90 || !Number.isFinite(place.lng) || Math.abs(place.lng) > 180)
      fail(`photo_places.yml (${id}): name and valid numeric lat/lng required`);
  }
}
for (const album of data.photos || []) {
  if (album.place && !data.photo_places?.[album.place]) fail(`photos.yml (${album.date}): unknown place "${album.place}"`);
  for (const photo of album.images || []) {
    if (!fs.existsSync(path.join(root, "assets/img/photos", photo))) fail(`photos.yml: missing image "${photo}"`);
  }
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
