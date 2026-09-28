import { readFileSync, writeFileSync } from "fs";

// ── AcademyPage.tsx ──
const ap = "client/src/pages/public/AcademyPage.tsx";
let a = readFileSync(ap, "utf-8");
if (a.includes('"mosp"')) { console.log("MOSP already in AcademyPage"); }
else {
  const ci = a.indexOf("const CATEGORIES");
  const eq = a.indexOf("= [", ci);       // skip past Category[] type annotation
  if (eq === -1) { console.error("Cannot find CATEGORIES = ["); process.exit(1); }
  let depth = 0, end = -1, inStr = false, sc = "";
  for (let j = eq + 2; j < a.length; j++) {
    const c = a[j], p = j > 0 ? a[j-1] : "";
    if (inStr) { if (c === sc && p !== "\\") inStr = false; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = true; sc = c; continue; }
    if (c === "/" && a[j+1] === "/") { j = a.indexOf("\n", j); continue; }
    if (c === "[") depth++;
    if (c === "]") { depth--; if (depth === 0) { end = j; break; } }
  }
  if (end === -1) { console.error("Cannot find end of CATEGORIES"); process.exit(1); }
  const mosp = `,
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
          { id: "mosp-m2", number: 2, title: "Microsoft Word - Document Creation & Formatting", hours: 10, price: 0, topics: ["Document creation, saving, and file formats (DOCX, PDF)", "Text formatting: fonts, paragraphs, spacing, alignment", "Styles and themes for consistent document design", "Headers, footers, page numbers, and sections", "Bullet lists, numbered lists, and multilevel lists", "Inserting images, shapes, and text boxes", "Spelling, grammar, and proofing tools", "Printing and page layout configuration"] },
          { id: "mosp-m3", number: 3, title: "Microsoft Word - Advanced Document Production", hours: 10, price: 0, topics: ["Table creation, formatting, and data organization", "Mail merge for letters, labels, and envelopes", "Track Changes and collaborative reviewing", "Table of Contents and document references", "Templates and form creation", "Long document management: sections, columns, breaks", "Macros introduction for repetitive tasks", "Professional report and proposal formatting"] },
          { id: "mosp-m4", number: 4, title: "Microsoft Excel - Spreadsheet Fundamentals", hours: 12, price: 0, topics: ["Workbook and worksheet navigation and management", "Data entry, cell formatting, and number formats", "Essential formulas: SUM, AVERAGE, COUNT, MIN, MAX", "Cell references: relative, absolute ($), and mixed", "Sorting and filtering data", "Basic charts: column, bar, line, and pie", "Conditional formatting for data visualization", "Page setup and print areas for reporting"] },
          { id: "mosp-m5", number: 5, title: "Microsoft Excel - Advanced Data Analysis", hours: 12, price: 0, topics: ["Logical functions: IF, AND, OR, nested IF, IFS", "Lookup functions: VLOOKUP, HLOOKUP, INDEX-MATCH", "Text functions: CONCATENATE, LEFT, RIGHT, MID, TRIM", "Date and time functions for business calculations", "PivotTables for dynamic data summarization", "PivotCharts and slicers for interactive dashboards", "Data validation and drop-down lists", "What-If Analysis: Goal Seek, Scenario Manager, Data Tables", "Protecting worksheets and workbooks"] },
          { id: "mosp-m6", number: 6, title: "Microsoft PowerPoint - Professional Presentations", hours: 10, price: 0, topics: ["Slide creation, layouts, and design themes", "Text formatting, bullet hierarchy, and content structure", "Inserting and formatting images, icons, and SmartArt", "Animations and slide transitions for engagement", "Speaker notes and presenter view", "Embedding charts, tables, and Excel data", "Slide Master for consistent branding", "Exporting to PDF and video formats", "Delivering effective presentations: storytelling with slides"] },
          { id: "mosp-m7", number: 7, title: "Microsoft Outlook - Professional Communication & Organization", hours: 8, price: 0, topics: ["Email composition, formatting, and signatures", "Managing inbox: folders, categories, and rules", "Calendar management: appointments, meetings, and invitations", "Contacts and address book organization", "Tasks and to-do list management", "Email etiquette and professional communication best practices", "Attachments, OneDrive sharing, and large file handling", "Out-of-office replies and delegation"] },
          { id: "mosp-m8", number: 8, title: "Integrated Office Skills & Capstone Project", hours: 10, price: 0, topics: ["Cross-application workflows: Excel data to Word reports to PowerPoint presentations", "Mail merge with Excel data sources", "Embedding and linking Office documents", "Collaboration tools: co-authoring, comments, sharing", "OneDrive and SharePoint basics for team productivity", "Capstone: Build a complete business deliverable package (report + analysis + presentation + professional email)", "Portfolio preparation and skills demonstration"] }
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
  a = a.slice(0, end) + mosp + "\n" + a.slice(end);
  writeFileSync(ap, a, "utf-8");
  console.log("OK AcademyPage.tsx");
}

// ── TrainingEnrollPage.tsx ──
const ep = "client/src/pages/training/TrainingEnrollPage.tsx";
let e = readFileSync(ep, "utf-8");
if (e.includes('"mosp"')) { console.log("MOSP already in TrainingEnrollPage"); }
else {
  // Find the courses/programs array
  const match = e.match(/const\s+(COURSES|programs|PROGRAMS|trainingPrograms)\s*/);
  if (!match) { console.error("Cannot find programs array"); process.exit(1); }
  const vi = e.indexOf(match[0]);
  const eq2 = e.indexOf("= [", vi);
  if (eq2 === -1) { console.error("Cannot find = [ for programs"); process.exit(1); }
  let d2 = 0, e2 = -1, inS = false, sC = "";
  for (let j = eq2 + 2; j < e.length; j++) {
    const c = e[j], p = j > 0 ? e[j-1] : "";
    if (inS) { if (c === sC && p !== "\\") inS = false; continue; }
    if (c === '"' || c === "'" || c === '`') { inS = true; sC = c; continue; }
    if (c === "/" && e[j+1] === "/") { j = e.indexOf("\n", j); continue; }
    if (c === "[") d2++;
    if (c === "]") { d2--; if (d2 === 0) { e2 = j; break; } }
  }
  if (e2 === -1) { console.error("Cannot find end of programs array"); process.exit(1); }
  const mospE = `,
  {
    id: "mosp",
    title: "Microsoft Office Suite Professional",
    acronym: "MOSP",
    category: "Professional Office Suite",
    level: "Associate",
    duration: "10 weeks",
    contactHours: 80,
    description: "Complete mastery of Microsoft Office for professional productivity - Word, Excel, PowerPoint, and Outlook.",
    modules: [
      { id: "mosp-m1", number: 1, title: "Computer Fundamentals & Digital Workspace", hours: 8 },
      { id: "mosp-m2", number: 2, title: "Microsoft Word - Document Creation & Formatting", hours: 10 },
      { id: "mosp-m3", number: 3, title: "Microsoft Word - Advanced Document Production", hours: 10 },
      { id: "mosp-m4", number: 4, title: "Microsoft Excel - Spreadsheet Fundamentals", hours: 12 },
      { id: "mosp-m5", number: 5, title: "Microsoft Excel - Advanced Data Analysis", hours: 12 },
      { id: "mosp-m6", number: 6, title: "Microsoft PowerPoint - Professional Presentations", hours: 10 },
      { id: "mosp-m7", number: 7, title: "Microsoft Outlook - Professional Communication & Organization", hours: 8 },
      { id: "mosp-m8", number: 8, title: "Integrated Office Skills & Capstone Project", hours: 10 }
    ],
    pricing: {
      standard: { amount: 350000, currency: "XAF", label: "Standard Track (10 weeks)" },
      bootcamp: { amount: 200000, currency: "XAF", label: "Bootcamp Intensive (5 weeks)" }
    }
  }`;
  e = e.slice(0, e2) + mospE + "\n" + e.slice(e2);
  writeFileSync(ep, e, "utf-8");
  console.log("OK TrainingEnrollPage.tsx");
}
