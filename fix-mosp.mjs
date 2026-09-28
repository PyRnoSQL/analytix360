import { readFileSync, writeFileSync } from "fs";

// Fix 1: AcademyPage — remove pricing block (not in Program type)
const ap = "client/src/pages/public/AcademyPage.tsx";
let a = readFileSync(ap, "utf-8");
// Remove the pricing object from MOSP program
a = a.replace(/,\s*pricing:\s*\{\s*standard:\s*\{[^}]+\},\s*bootcamp:\s*\{[^}]+\}\s*\}/g, "");
writeFileSync(ap, a, "utf-8");
console.log("OK AcademyPage — removed pricing");

// Fix 2: TrainingEnrollPage — fix MOSP entry shape
const ep = "client/src/pages/training/TrainingEnrollPage.tsx";
let e = readFileSync(ep, "utf-8");

// Replace the MOSP modules array with a number, add standardPrice/bootcampPrice/catColor, remove pricing
const oldMosp = e.match(/\{\s*id:\s*"mosp"[\s\S]*?pricing:\s*\{[\s\S]*?\}\s*\}/);
if (oldMosp) {
  const replacement = `{
    id: "mosp",
    title: "Microsoft Office Suite Professional",
    acronym: "MOSP",
    category: "Professional Office Suite",
    catColor: "#D97706",
    level: "Associate",
    duration: "10 weeks",
    modules: 8,
    contactHours: 80,
    standardPrice: 350000,
    bootcampPrice: 200000,
    description: "Complete mastery of Microsoft Office for professional productivity - Word, Excel, PowerPoint, and Outlook."
  }`;
  e = e.replace(oldMosp[0], replacement);
  writeFileSync(ep, e, "utf-8");
  console.log("OK TrainingEnrollPage — fixed MOSP shape");
} else {
  console.error("Could not find MOSP block in TrainingEnrollPage");
}
