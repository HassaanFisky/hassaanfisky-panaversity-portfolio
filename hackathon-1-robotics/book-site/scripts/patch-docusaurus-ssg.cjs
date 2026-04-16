#!/usr/bin/env node
// Patches @docusaurus/core/lib/ssg/ssgNodeRequire.js with two fixes:
//
// Fix 1 — require.resolveWeak:
//   Docusaurus's route map (ComponentCreator) calls require.resolveWeak()
//   for every page/doc route. The eval() SSG context receives a custom require
//   (ssgNodeRequire) that's missing this method. Stubbing it to return the
//   resolved path is safe — the value is only used for client prefetch hints.
//
// Fix 2 — CSS file requires:
//   The server bundle may require() CSS files (e.g. infima CSS). Node.js
//   cannot parse CSS as JavaScript. Returning an empty object for CSS requires
//   is safe — CSS has no server-side effect in SSG.

const fs = require("fs");
const path = require("path");

const target = path.join(
  __dirname,
  "..",
  "node_modules",
  "@docusaurus",
  "core",
  "lib",
  "ssg",
  "ssgNodeRequire.js"
);

if (!fs.existsSync(target)) {
  console.log("[patch-docusaurus-ssg] ssgNodeRequire.js not found — skipping");
  process.exit(0);
}

let src = fs.readFileSync(target, "utf-8");
let changed = false;

// ── Fix 1: resolveWeak ───────────────────────────────────────────────────────
const ANCHOR_MAIN = "ssgRequireFunction.main = realRequire.main;";
const PATCH_WEAK = `    ssgRequireFunction.resolveWeak = (id) => {
        try { return realRequire.resolve(id); } catch (_) { return undefined; }
    };`;

if (!src.includes("resolveWeak")) {
  if (!src.includes(ANCHOR_MAIN)) {
    console.error("[patch-docusaurus-ssg] Fix1 anchor not found — manual fix required");
    process.exit(1);
  }
  src = src.replace(ANCHOR_MAIN, `${ANCHOR_MAIN}\n${PATCH_WEAK}`);
  changed = true;
  console.log("[patch-docusaurus-ssg] Fix 1 applied: resolveWeak polyfill");
} else {
  console.log("[patch-docusaurus-ssg] Fix 1 already present: resolveWeak");
}

// ── Fix 2: CSS file guard ────────────────────────────────────────────────────
const ANCHOR_CSS = "    const ssgRequireFunction = (id) => {";
const PATCH_CSS = `    const CSS_RE = /\\.css(?:\\?.*)?$/;
    const ssgRequireFunction = (id) => {
        if (CSS_RE.test(id)) { return {}; } // CSS can't be parsed by Node.js`;
const ORIGINAL_FUNC_LINE = "    const ssgRequireFunction = (id) => {\n        const module = realRequire(id);";

if (!src.includes("CSS_RE")) {
  if (!src.includes(ANCHOR_CSS)) {
    console.error("[patch-docusaurus-ssg] Fix2 anchor not found — manual fix required");
    process.exit(1);
  }
  src = src.replace(
    ORIGINAL_FUNC_LINE,
    `    const CSS_RE = /\\.css(?:\\?.*)?$/;\n    const ssgRequireFunction = (id) => {\n        if (CSS_RE.test(id)) { return {}; } // CSS can't be parsed by Node.js\n        const module = realRequire(id);`
  );
  changed = true;
  console.log("[patch-docusaurus-ssg] Fix 2 applied: CSS file guard");
} else {
  console.log("[patch-docusaurus-ssg] Fix 2 already present: CSS file guard");
}

if (changed) {
  fs.writeFileSync(target, src, "utf-8");
}

console.log("[patch-docusaurus-ssg] done");
