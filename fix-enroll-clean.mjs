import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const ep = "client/src/pages/training/TrainingEnrollPage.tsx";

// Step 1: Restore clean version from git
execSync("git checkout -- " + ep);
console.log("1. Restored clean TrainingEnrollPage.tsx from git");

// Step 2: Read the clean file
let f = readFileSync(ep, "utf-8");

// Step 3: Verify MOSP is not already there
if (f.includes('"mosp"')) {
  console.log("MOSP already present — skipping.");
  process.exit(0);
}

// Step 4: Find the COURSES array end
// Search for "const COURSES" then find "= [", then bracket-match to the end
const varMatch = f.match(/const\s+COURSES\b/);
if (!varMatch) { console.error("Cannot find const COURSES"); process.exit(1); }

const varIdx = f.indexOf(varMatch[0]);
const eqBracket = f.indexOf("= [", varIdx);
if (eqBracket === -1) { console.error("Cannot find = ["); process.exit(1); }

// Find the [ that starts the array value
const openIdx = f.indexOf("[", eqBracket);
let depth = 0, closeIdx = -1;
let inStr = false, strCh = "";

for (let i = openIdx; i < f.length; i++) {
  const c = f[i];
  const prev = i > 0 ? f[i - 1] : "";

  // Handle string literals
  if (inStr) {
    if (c === strCh && prev !== "\\") inStr = false;
    continue;
  }
  if (c === '"' || c === "'" || c === "`") { inStr = true; strCh = c; continue; }

  // Skip single-line comments
  if (c === "/" && f[i + 1] === "/") {
    const nl = f.indexOf("\n", i);
    if (nl !== -1) i = nl;
    continue;
  }

  // Count brackets
  if (c === "[") depth++;
  if (c === "]") {
    depth--;
    if (depth === 0) { closeIdx = i; break; }
  }
}

if (closeIdx === -1) { console.error("Cannot find end of COURSES array"); process.exit(1); }

// Step 5: Detect line ending style
const lineEnd = f.includes("\r\n") ? "\r\n" : "\n";

// Step 6: Build MOSP entry
const mosp = [
  "  {",
  '    id: "mosp",',
  '    title: "Microsoft Office Suite Professional",',
  '    acronym: "MOSP",',
  '    category: "Professional Office Suite",',
  '    catColor: "#D97706",',
  '    level: "Associate",',
  '    duration: "10 weeks",',
  '    modules: 8,',
  '    contactHours: 80,',
  '    standardPrice: 350000,',
  '    bootcampPrice: 200000,',
  '    description: "Complete mastery of Microsoft Office for professional productivity - Word, Excel, PowerPoint, and Outlook."',
  "  }"
].join(lineEnd);

// Step 7: Insert before the closing ]
// Add comma after last entry, then MOSP, then close
const before = f.slice(0, closeIdx).trimEnd();
const after = f.slice(closeIdx);

// Ensure trailing comma after the last existing entry
const insertStr = (before.endsWith(",") ? "" : ",") + lineEnd + mosp + lineEnd;

f = before + insertStr + after;

writeFileSync(ep, f, "utf-8");
console.log("2. MOSP inserted into TrainingEnrollPage.tsx");
console.log("Done. Run: npm run build");
