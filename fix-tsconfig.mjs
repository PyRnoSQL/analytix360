// fix-tsconfig.mjs — run from the analytix360 root:  node fix-tsconfig.mjs
// Makes client/tsconfig*.json valid on TypeScript 5, 6 and 7:
//   removes "ignoreDeprecations" and "baseUrl", and makes "paths" entries start with "./".
// Shows every change. All-or-nothing: writes nothing unless every file is understood.
import { readFileSync, writeFileSync, readdirSync } from "fs";

const fail = (m) => { console.error("STOPPED, nothing written: " + m); process.exit(1); };
const files = readdirSync("client").filter((f) => /^tsconfig.*\.json$/.test(f)).map((f) => "client/" + f);
if (!files.length) fail("no client/tsconfig*.json found (run from the analytix360 folder)");

const out = {};
for (const file of files) {
  const src = readFileSync(file, "utf-8");
  const eol = src.includes("\r\n") ? "\r\n" : "\n";
  const bu = src.match(/"baseUrl"\s*:\s*"([^"]*)"/);
  const baseUrl = bu ? bu[1] : null;
  const lines = src.split(/\r?\n/);
  const kept = [];
  let inPaths = false, depth = 0, changed = false;
  for (const line of lines) {
    const bm = line.match(/^\s*"baseUrl"\s*:\s*"([^"]*)"\s*,?\s*(\/\/.*)?$/);
    if (bm) { changed = true; console.log(`${file}: removed ${line.trim()}`); continue; }
    if (/^\s*"ignoreDeprecations"\s*:/.test(line)) {
      if (!/^\s*"ignoreDeprecations"\s*:\s*"[^"]*"\s*,?\s*(\/\/.*)?$/.test(line)) fail(`${file}: unexpected ignoreDeprecations line: ${line.trim()}`);
      changed = true; console.log(`${file}: removed ${line.trim()}`); continue;
    }
    if (/^\s*"paths"\s*:/.test(line)) { inPaths = true; depth = 0; }
    let l = line;
    if (inPaths) {
      // prefix each mapped path with the old baseUrl (default ".") so it stays relative to this file
      const base = (baseUrl ?? ".").replace(/\/$/, "");
      const prefix = base === "." ? "./" : base.startsWith(".") ? base + "/" : "./" + base + "/";
      l = l.replace(/\[([^\]]*)\]/g, (arr) => arr.replace(/"(?!\.{1,2}\/)([^"]+)"/g, (_m, p) => { changed = true; return `"${prefix}${p}"`; }));
      depth += (l.match(/\{/g) || []).length - (l.match(/\}/g) || []).length;
      if (depth <= 0 && /\}/.test(l)) inPaths = false;
      if (l !== line) console.log(`${file}: ${line.trim()}  ->  ${l.trim()}`);
    }
    kept.push(l);
  }
  if (changed) out[file] = kept.join(eol);
}
if (!Object.keys(out).length) { console.log("Nothing to change: no baseUrl or ignoreDeprecations found."); process.exit(0); }
for (const [f, c] of Object.entries(out)) writeFileSync(f, c, "utf-8");
console.log("OK updated " + Object.keys(out).join(", "));
