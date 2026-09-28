/**
 * add-mosp.mjs
 *
 * Run from the analytix360 root:
 *   node add-mosp.mjs
 *
 * This script adds the MOSP (Microsoft Office Suite Professional) program
 * to both AcademyPage.tsx and TrainingEnrollPage.tsx.
 */

import { readFileSync, writeFileSync } from "fs";

// ============================================================
// 1. AcademyPage.tsx — Add MOSP category + program
// ============================================================

const academyPath = "client/src/pages/public/AcademyPage.tsx";
let academy = readFileSync(academyPath, "utf-8");

// Check if MOSP already exists
if (academy.includes('"mosp"')) {
  console.log("✓ MOSP already exists in AcademyPage.tsx — skipping.");
} else {
  // --- Step A: Add the MOSP category to the CATEGORIES array ---
  // Find the last category closing (the MEAL & Impact Evaluation category ends with "]," then "}," then "];" )
  // We insert a new category BEFORE the final "];" that closes the CATEGORIES array.

  const categoriesEndMarker = /(\n\s*\}\s*,?\s*\n)(\s*\];?\s*\n)/;
  // More robust: find the line with the MEAL category's closing, then the array end

  // Strategy: Find "Professional Office Suite" — if not found, insert it.
  // Find the CATEGORIES array end: the final "];"
  // We need to find the closing of the last category object and insert before the array-closing "];"

  // Let's find the pattern: the last "},\n];" or "}\n];" in the CATEGORIES array
  // The CATEGORIES array ends with "];". Find the last occurrence of "];" that closes it.

  // Safer approach: find where MEAL category ends and insert after it
  const mealProgramsEnd = academy.indexOf('"MEAL & Impact Evaluation"');

  if (mealProgramsEnd === -1) {
    // Try alternate: look for the last category by finding the pattern
    // Let's just find the closing "];" of CATEGORIES
    console.log("Warning: Could not find MEAL category. Looking for CATEGORIES array end...");
  }

  // Find the CATEGORIES array declaration
  const catStart = academy.indexOf("const CATEGORIES");
  if (catStart === -1) {
    console.error("ERROR: Could not find 'const CATEGORIES' in AcademyPage.tsx");
    process.exit(1);
  }

  // Find the matching end of the CATEGORIES array
  // We need to find the "];" that closes this array
  // Count brackets from catStart
  let bracketCount = 0;
  let foundStart = false;
  let catEnd = -1;
  for (let i = catStart; i < academy.length; i++) {
    if (academy[i] === "[" && !isInString(academy, i)) {
      bracketCount++;
      foundStart = true;
    } else if (academy[i] === "]" && !isInString(academy, i)) {
      bracketCount--;
      if (foundStart && bracketCount === 0) {
        catEnd = i;
        break;
      }
    }
  }

  if (catEnd === -1) {
    console.error("ERROR: Could not find end of CATEGORIES array");
    process.exit(1);
  }

  // Insert the new category before the closing "]"
  // First, ensure there's a comma after the last category
  const beforeEnd = academy.substring(catStart, catEnd).trimEnd();
  const needsComma = !beforeEnd.endsWith(",");

  const mospCategory = `${needsComma ? "," : ""}
  {
    name: "Professional Office Suite",
    icon: Layers,
    color: "#D97706",
    description: "Master the essential Microsoft Office applications used in every professional environment. From document creation and data analysis to presentations and email management — build the digital skills employers demand across all industries.",
    programs: [
      {
        id: "mosp",
        title: "Microsoft Office Suite Professional",
        acronym: "MOSP",
        subtitle: "Complete mastery of Microsoft Office for professional productivity",
        level: "Associate" as const,
        badge: "Silver" as const,
        duration: "10 weeks",
        contactHours: 80,
        delivery: "Online + Hybrid",
        targetAudience: "Professionals, students, administrative staff, entrepreneurs, job seekers, and anyone needing to master Microsoft Office for workplace productivity",
        prerequisites: "Basic computer literacy (file management, web browsing, typing)",
        alignment: "Microsoft Office Specialist (MOS) certification competencies and industry-standard productivity benchmarks",
        assessment: "Practical skills assessment per module (70% pass) + Capstone integrated project",
        description: "The MOSP program builds confident, efficient professionals who can leverage the full Microsoft Office suite to create polished documents, analyze data, deliver compelling presentations, and manage professional communications — skills required in virtually every modern workplace.",
        modules: [
          { id: "mosp-m1", number: 1, title: "Computer Fundamentals & Digital Workspace", hours: 8, price: 0, topics: ["Computer hardware and software concepts", "Operating system navigation (Windows file management, shortcuts, settings)", "Cloud storage and file organization (OneDrive, Google Drive)", "Internet safety, password management, and digital hygiene", "Keyboard proficiency and typing efficiency", "Installing and updating software", "Troubleshooting common computer issues"] },
          { id: "mosp-m2", number: 2, title: "Microsoft Word — Document Creation & Formatting", hours: 10, price: 0, topics: ["Document creation, saving, and file formats (DOCX, PDF)", "Text formatting: fonts, paragraphs, spacing, alignment", "Styles and themes for consistent document design", "Headers, footers, page numbers, and sections", "Bullet lists, numbered lists, and multilevel lists", "Inserting images, shapes, and text boxes", "Spelling, grammar, and proofing tools", "Printing and page layout configuration"] },
          { id: "mosp-m3", number: 3, title: "Microsoft Word — Advanced Document Production", hours: 10, price: 0, topics: ["Table creation, formatting, and data organization", "Mail merge for letters, labels, and envelopes", "Track Changes and collaborative reviewing", "Table of Contents and document references", "Templates and form creation", "Long document management: sections, columns, breaks", "Macros introduction for repetitive tasks", "Professional report and proposal formatting"] },
          { id: "mosp-m4", number: 4, title: "Microsoft Excel — Spreadsheet Fundamentals", hours: 12, price: 0, topics: ["Workbook and worksheet navigation and management", "Data entry, cell formatting, and number formats", "Essential formulas: SUM, AVERAGE, COUNT, MIN, MAX", "Cell references: relative, absolute ($), and mixed", "Sorting and filtering data", "Basic charts: column, bar, line, and pie", "Conditional formatting for data visualization", "Page setup and print areas for reporting"] },
          { id: "mosp-m5", number: 5, title: "Microsoft Excel — Advanced Data Analysis", hours: 12, price: 0, topics: ["Logical functions: IF, AND, OR, nested IF, IFS", "Lookup functions: VLOOKUP, HLOOKUP, INDEX-MATCH", "Text functions: CONCATENATE, LEFT, RIGHT, MID, TRIM", "Date and time functions for business calculations", "PivotTables for dynamic data summarization", "PivotCharts and slicers for interactive dashboards", "Data validation and drop-down lists", "What-If Analysis: Goal Seek, Scenario Manager, Data Tables", "Protecting worksheets and workbooks"] },
          { id: "mosp-m6", number: 6, title: "Microsoft PowerPoint — Professional Presentations", hours: 10, price: 0, topics: ["Slide creation, layouts, and design themes", "Text formatting, bullet hierarchy, and content structure", "Inserting and formatting images, icons, and SmartArt", "Animations and slide transitions for engagement", "Speaker notes and presenter view", "Embedding charts, tables, and Excel data", "Slide Master for consistent branding", "Exporting to PDF and video formats", "Delivering effective presentations: storytelling with slides"] },
          { id: "mosp-m7", number: 7, title: "Microsoft Outlook — Professional Communication & Organization", hours: 8, price: 0, topics: ["Email composition, formatting, and signatures", "Managing inbox: folders, categories, and rules", "Calendar management: appointments, meetings, and invitations", "Contacts and address book organization", "Tasks and to-do list management", "Email etiquette and professional communication best practices", "Attachments, OneDrive sharing, and large file handling", "Out-of-office replies and delegation"] },
          { id: "mosp-m8", number: 8, title: "Integrated Office Skills & Capstone Project", hours: 10, price: 0, topics: ["Cross-application workflows: Excel data → Word reports → PowerPoint presentations", "Mail merge with Excel data sources", "Embedding and linking Office documents", "Collaboration tools: co-authoring, comments, sharing", "OneDrive and SharePoint basics for team productivity", "Capstone: Build a complete business deliverable package (report + analysis + presentation + professional email)", "Portfolio preparation and skills demonstration"] }
        ],
        capstone: { title: "Professional Business Deliverable Package", tasks: [
          "Create a formatted business report in Word with table of contents and references",
          "Build an Excel workbook with data analysis, PivotTables, and dashboard charts",
          "Design a professional PowerPoint presentation summarizing key findings",
          "Draft professional Outlook emails with the deliverables for stakeholder distribution",
          "Demonstrate cross-application integration (Excel charts in Word and PowerPoint)"
        ]},
        pricing: {
          standard: { amount: 350000, currency: "XAF", label: "Standard Track (10 weeks)" },
          bootcamp: { amount: 200000, currency: "XAF", label: "Bootcamp Intensive (5 weeks)" }
        }
      }
    ]
  }`;

  academy = academy.substring(0, catEnd) + mospCategory + "\n" + academy.substring(catEnd);

  writeFileSync(academyPath, academy, "utf-8");
  console.log("✓ MOSP category and program added to AcademyPage.tsx");
}


// ============================================================
// 2. TrainingEnrollPage.tsx — Add MOSP to enrollment programs
// ============================================================

const enrollPath = "client/src/pages/training/TrainingEnrollPage.tsx";
let enroll = readFileSync(enrollPath, "utf-8");

if (enroll.includes('"mosp"')) {
  console.log("✓ MOSP already exists in TrainingEnrollPage.tsx — skipping.");
} else {
  // Find the programs array — look for the pattern of program objects
  // We need to find where to insert. Look for the last program entry.

  // Strategy: Find "category:" entries to understand the structure,
  // then find the array that holds them and insert before its end.

  // The programs are in an array, likely called something like "programs" or "PROGRAMS"
  // Let's search for the pattern

  const programsPatterns = [
    "const programs",
    "const PROGRAMS",
    "const trainingPrograms",
    "const TRAINING_PROGRAMS",
    "const enrollmentPrograms"
  ];

  let programsVarName = null;
  let programsStart = -1;

  for (const pattern of programsPatterns) {
    const idx = enroll.indexOf(pattern);
    if (idx !== -1) {
      programsVarName = pattern;
      programsStart = idx;
      break;
    }
  }

  if (programsStart === -1) {
    // Try to find any array that contains program objects with "id:" and "category:"
    const match = enroll.match(/const\s+(\w+)\s*(?::\s*\w+(?:<[^>]+>)?\[\])?\s*=\s*\[[\s\S]*?id:\s*"das"/);
    if (match) {
      programsStart = enroll.indexOf(match[0]);
      programsVarName = match[0].match(/const\s+(\w+)/)[0];
    }
  }

  if (programsStart === -1) {
    console.error("ERROR: Could not find programs array in TrainingEnrollPage.tsx");
    console.log("Searching for 'category:' to understand file structure...");
    const lines = enroll.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("category:") && lines[i].includes('"')) {
        console.log(`  Line ${i + 1}: ${lines[i].trim()}`);
      }
    }
    process.exit(1);
  }

  console.log(`Found programs array at: "${programsVarName}" (position ${programsStart})`);

  // Find the end of this array
  let bCount = 0;
  let fStart = false;
  let arrEnd = -1;
  for (let i = programsStart; i < enroll.length; i++) {
    if (enroll[i] === "[" && !isInString(enroll, i)) {
      bCount++;
      fStart = true;
    } else if (enroll[i] === "]" && !isInString(enroll, i)) {
      bCount--;
      if (fStart && bCount === 0) {
        arrEnd = i;
        break;
      }
    }
  }

  if (arrEnd === -1) {
    console.error("ERROR: Could not find end of programs array");
    process.exit(1);
  }

  // Check if we need a comma
  const beforeArrEnd = enroll.substring(programsStart, arrEnd).trimEnd();
  const needsCommaEnroll = !beforeArrEnd.endsWith(",");

  const mospEnrollEntry = `${needsCommaEnroll ? "," : ""}
  {
    id: "mosp",
    title: "Microsoft Office Suite Professional",
    acronym: "MOSP",
    category: "Professional Office Suite",
    level: "Associate",
    duration: "10 weeks",
    contactHours: 80,
    description: "Complete mastery of Microsoft Office for professional productivity — Word, Excel, PowerPoint, and Outlook.",
    modules: [
      { id: "mosp-m1", number: 1, title: "Computer Fundamentals & Digital Workspace", hours: 8 },
      { id: "mosp-m2", number: 2, title: "Microsoft Word — Document Creation & Formatting", hours: 10 },
      { id: "mosp-m3", number: 3, title: "Microsoft Word — Advanced Document Production", hours: 10 },
      { id: "mosp-m4", number: 4, title: "Microsoft Excel — Spreadsheet Fundamentals", hours: 12 },
      { id: "mosp-m5", number: 5, title: "Microsoft Excel — Advanced Data Analysis", hours: 12 },
      { id: "mosp-m6", number: 6, title: "Microsoft PowerPoint — Professional Presentations", hours: 10 },
      { id: "mosp-m7", number: 7, title: "Microsoft Outlook — Professional Communication & Organization", hours: 8 },
      { id: "mosp-m8", number: 8, title: "Integrated Office Skills & Capstone Project", hours: 10 }
    ],
    pricing: {
      standard: { amount: 350000, currency: "XAF", label: "Standard Track (10 weeks)" },
      bootcamp: { amount: 200000, currency: "XAF", label: "Bootcamp Intensive (5 weeks)" }
    }
  }`;

  enroll = enroll.substring(0, arrEnd) + mospEnrollEntry + "\n" + enroll.substring(arrEnd);

  writeFileSync(enrollPath, enroll, "utf-8");
  console.log("✓ MOSP program added to TrainingEnrollPage.tsx");
}

console.log("\nDone! Now run: npm run build");
console.log("If build passes: git add -A && git commit -m \"Add MOSP program\" && git push");

// ============================================================
// Helper: rough check if position is inside a string literal
// ============================================================
function isInString(src, pos) {
  // Simple heuristic: count unescaped quotes before this position on the same line
  let lineStart = src.lastIndexOf("\n", pos) + 1;
  let line = src.substring(lineStart, pos);

  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const prev = i > 0 ? line[i - 1] : "";

    if (prev === "\\") continue;

    if (ch === '"' && !inSingle && !inTemplate) inDouble = !inDouble;
    else if (ch === "'" && !inDouble && !inTemplate) inSingle = !inSingle;
    else if (ch === "`" && !inDouble && !inSingle) inTemplate = !inTemplate;
  }

  return inSingle || inDouble || inTemplate;
}
