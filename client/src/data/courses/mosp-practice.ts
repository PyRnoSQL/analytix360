import type { Block, Lesson } from "../../lms/types";

// Practice labs for the MOSP course: four graded exercises per module, from beginner to
// expert. Each lesson is added at the end of the module with the same id (see registry.ts).

const INTRO: Block = { type: "p", text: "Four exercises of increasing difficulty, from beginner to expert. Each one uses a different workplace situation. Take your time: every answer is checked, and the explanations appear after you check." };

const PARTS = ["Input", "Processing", "Memory", "Storage", "Output"];
const SAFE = ["Safe", "Phishing"];
const NAME = (date: string, ext: string, v: number) => `^${date}_[A-Za-z0-9À-ÿ][A-Za-z0-9À-ÿ-]*_v${v}\\.${ext}$`;

export const MOSP_PRACTICE: Record<string, Lesson> = {
  "mosp-m1": {
    id: "mosp-m1-practice", title: "Practice lab: computer basics and safe working", minutes: 30,
    objectives: ["Recognise what each part of a computer does", "Convert between storage units", "Name files so they sort by date", "Spot phishing and weak passwords"],
    blocks: [
      INTRO,
      { type: "h", text: "Exercise 1: The parts of a computer" },
      { type: "form", id: "mosp-pr-parts", level: "beginner", title: "What does each part do?",
        task: "Choose the job of each part: input, processing, memory, storage or output.",
        hint: "Input gives the computer data, processing works on it, memory holds what is open, storage keeps files when the power is off, output shows the result.",
        fields: [
          { kind: "select", label: "Keyboard", options: PARTS, answer: 0 },
          { kind: "select", label: "Processor (CPU)", options: PARTS, answer: 1 },
          { kind: "select", label: "RAM", options: PARTS, answer: 2, explain: "RAM is emptied at shutdown. It is the short-term workspace for open programs." },
          { kind: "select", label: "SSD", options: PARTS, answer: 3, explain: "The SSD keeps Windows and your files when the computer is off." },
          { kind: "select", label: "Monitor", options: PARTS, answer: 4 },
          { kind: "select", label: "Webcam", options: PARTS, answer: 0, explain: "A webcam sends images into the computer, so it is an input device." },
        ] },
      { type: "h", text: "Exercise 2: Storage sizes" },
      { type: "form", id: "mosp-pr-units", level: "intermediate", title: "How much fits?",
        task: "Use the rule of thumb from the lesson: 1 GB is about 1 000 MB. Type numbers without units.",
        hint: "Multiply GB by 1 000 to get MB. For the photos, divide the MB available by the size of one photo.",
        fields: [
          { kind: "text", label: "How many MB are there in 2 GB?", accept: ["2000", "2048"], placeholder: "MB", mono: true, explain: "2 × 1 000 = 2 000 MB (2 048 if you count 1 024 MB per GB)." },
          { kind: "text", label: "A phone photo is about 4 MB. How many photos fit on a 32 GB USB drive?", accept: ["8000", "8192"], placeholder: "photos", mono: true, explain: "32 GB ≈ 32 000 MB, and 32 000 ÷ 4 = 8 000 photos." },
          { kind: "select", label: "A laptop is sold as \"8 GB / 256 GB\". Which figure is the RAM?", options: ["8 GB", "256 GB"], answer: 0, explain: "The smaller figure is the RAM. The 256 GB is the storage (SSD)." },
          { kind: "select", label: "Which is larger: 750 MB or 0.5 GB?", options: ["750 MB", "0.5 GB", "They are equal"], answer: 0, explain: "0.5 GB is about 500 MB, so 750 MB is larger." },
        ] },
      { type: "h", text: "Exercise 3: Rename the files" },
      { type: "form", id: "mosp-pr-names", level: "advanced", title: "Apply the naming convention",
        task: "Rename each file with the pattern date_subject_version.extension: the date as year-month-day, a subject with hyphens instead of spaces, and v followed by the version number.",
        hint: "Example: 2026-03-15_Rapport-activites-T1_v1.docx. No spaces, no brackets, the date first so the files sort themselves.",
        fields: [
          { kind: "text", label: "\"Budget 2026 final.xlsx\", prepared on 12 January 2026, third version", pattern: NAME("2026-01-12", "xlsx", 3), example: "2026-01-12_Budget-2026_v3.xlsx", placeholder: "2026-…", mono: true },
          { kind: "text", label: "\"contrat client (copie).pdf\", signed on 5 February 2026, first version", pattern: NAME("2026-02-05", "pdf", 1), example: "2026-02-05_Contrat-client_v1.pdf", placeholder: "2026-…", mono: true },
          { kind: "text", label: "\"presentation OK OK.pptx\", for the board meeting of 20 April 2026, second version", pattern: NAME("2026-04-20", "pptx", 2), example: "2026-04-20_Presentation-Direction_v2.pptx", placeholder: "2026-…", mono: true },
          { kind: "select", label: "Which of these names will sort correctly by date in File Explorer?", options: ["15-03-2026_Rapport_v1.docx", "2026-03-15_Rapport_v1.docx", "Rapport 15 mars.docx", "Rapport_v1 (2026).docx"], answer: 1, explain: "Only year-month-day sorts in date order, because File Explorer sorts names letter by letter." },
        ] },
      { type: "h", text: "Exercise 4: Security check" },
      { type: "form", id: "mosp-pr-phishing", level: "expert", title: "Safe or phishing?",
        task: "Decide whether each message is safe or a phishing attempt, then answer the two security questions.",
        hint: "Look for urgency, a request for a code or password, a sender address that does not match the company, and attachments you did not expect.",
        fields: [
          { kind: "select", label: "SMS: \"MoMo: you have received 25 000 FCFA from JEAN N. New balance: 61 500 FCFA.\" It asks for nothing.", options: SAFE, answer: 0, explain: "A plain notification that asks for no action or code is normal." },
          { kind: "select", label: "E-mail from support@micros0ft-security.com: \"Your mailbox will be deleted in 24 hours. Click here to confirm your password.\"", options: SAFE, answer: 1, explain: "Urgency, a password request and a fake address with a zero instead of an o." },
          { kind: "select", label: "SMS: \"Transfer sent to you by mistake. Please send back the code you have just received.\"", options: SAFE, answer: 1, explain: "Nobody legitimate ever asks for a one-time code. Sending it lets a thief take your account." },
          { kind: "select", label: "E-mail from your colleague's usual company address, with the Monday meeting agenda you asked her for as a .docx attachment.", options: SAFE, answer: 0, explain: "Known sender, expected document, normal format." },
          { kind: "select", label: "E-mail from an unknown sender: \"Unpaid invoice, pay today to avoid penalties\", with Facture_impayee.zip attached.", options: SAFE, answer: 1, explain: "Unknown sender, pressure and a compressed attachment: a classic way to deliver malware." },
          { kind: "select", label: "Which Windows setting helps you notice a file called Facture.pdf.exe?", options: ["Show file name extensions", "Dark mode", "Night light", "Tablet mode"], answer: 0, explain: "With extensions visible you see the real .exe ending. Turn it on in File Explorer › View › Show." },
          { kind: "select", label: "Which password is the strongest and easiest to remember?", options: ["P@ssw0rd1", "Awa1990", "mango-taxi-river-lamp", "123456789"], answer: 2, explain: "A passphrase of four unrelated words is long, hard to guess and easy to remember." },
        ] },
    ],
  },
  "mosp-m2": {
    id: "mosp-m2-practice", title: "Practice lab: formatting Word documents", minutes: 35,
    objectives: ["Apply character and paragraph formatting", "Structure a document with heading styles and lists", "Choose the right Word feature for a layout problem", "Produce a complete formatted letter"],
    blocks: [
      INTRO,
      { type: "h", text: "Exercise 1: A notice for the office" },
      { type: "doc", id: "mosp-pr-notice", level: "beginner", title: "Format a notice",
        task: "Make the title **bold** and **centred**, then make the date **bold**.",
        hint: "Select the first line, click Bold, then Center. Select the date and click Bold.",
        html: "<p>Water cut notice</p><p>The water supply will be cut on Saturday 18 April 2026 from 8:00 to 14:00 for maintenance work on the building tank.</p><p>Please store enough water for the day. Thank you for your understanding.</p><p>The Administration</p>",
        checks: [
          { kind: "bold", text: "Water cut notice" },
          { kind: "align", text: "Water cut notice", value: "center" },
          { kind: "bold", text: "Saturday 18 April 2026" },
        ] },
      { type: "h", text: "Exercise 2: A meeting agenda" },
      { type: "doc", id: "mosp-pr-agenda", level: "intermediate", title: "Structure an agenda",
        task: "Make the first line a **Heading 1**, make \"Items to discuss\" a **Heading 2**, and turn the four agenda items into a **numbered list**.",
        hint: "Use the Styles menu for the two headings. Select the four item lines together before clicking Numbering.",
        html: "<p>Management committee: 30 April 2026</p><p>Venue: meeting room B, 10:00 to 12:00.</p><p>Items to discuss</p><p>Approval of the March minutes</p><p>First-quarter sales results</p><p>New leave policy</p><p>Any other business</p>",
        checks: [
          { kind: "heading", level: 1, text: "Management committee" },
          { kind: "heading", level: 2, text: "Items to discuss" },
          { kind: "list", ordered: true, min: 4 },
        ] },
      { type: "h", text: "Exercise 3: The right feature for the job" },
      { type: "form", id: "mosp-pr-features", level: "advanced", title: "Choose the right Word feature",
        task: "Answer each workplace question. Type shortcuts as keys joined with +, for example Ctrl + B.",
        hint: "All the answers are in lessons 1 to 3 of this module: Save As, non-breaking spaces, paragraph spacing, heading styles, page numbers and section breaks.",
        fields: [
          { kind: "text", label: "Which key opens Save As, so you can save a copy under a new name or as a PDF?", accept: ["F12"], placeholder: "Key", mono: true },
          { kind: "select", label: "An amount such as 350 000 FCFA keeps breaking across two lines. Which shortcut inserts a space that never breaks?", options: ["Ctrl + Space", "Shift + Space", "Ctrl + Shift + Space", "Alt + Space"], answer: 2 },
          { kind: "select", label: "You want 12 pt of space after every paragraph of a report. What is the professional way?", options: ["Press Enter twice after each paragraph", "Layout › Paragraph › Spacing After", "Insert › Blank Page", "Add spaces at the end of each line"], answer: 1, explain: "Set spacing once in the paragraph settings. Empty paragraphs move around when the text changes." },
          { kind: "text", label: "Which shortcut applies the Heading 2 style?", accept: ["Ctrl+Alt+2", "Alt+Ctrl+2"], placeholder: "Ctrl + …", mono: true },
          { kind: "select", label: "Where do you add \"Page X of Y\" numbering to a report?", options: ["Home › Paragraph › Numbering", "Insert › Page Number › Bottom of Page", "Layout › Line Numbers", "View › Navigation Pane"], answer: 1 },
          { kind: "select", label: "Page 3 of a portrait report holds a wide table and must be landscape. What do you insert before and after it?", options: ["A page break (Ctrl + Enter)", "A Next Page section break", "A column break", "An empty table row"], answer: 1, explain: "Orientation belongs to a section. Section breaks let one page change orientation without affecting the others." },
        ] },
      { type: "h", text: "Exercise 4: An invitation letter" },
      { type: "doc", id: "mosp-pr-letter", level: "expert", title: "Produce a complete letter",
        task: "Format the whole letter: title in **Heading 1** and **centred**, place and date **right-aligned**, main paragraph **justified**, fee **bold**, \"Agenda\" as a **Heading 2**, and the agenda as a **numbered list**.",
        hint: "Work from top to bottom. Click inside a paragraph before choosing an alignment; select all agenda lines before clicking Numbering.",
        html: "<p>Invitation</p><p>Douala, 20 April 2026</p><p>Dear member, we are pleased to invite you to the annual general meeting of the association, which will take place on Saturday 16 May 2026 at 9:00 in the conference hall of the Chamber of Commerce. The meeting will review the accounts of the past year and elect the new board.</p><p>The participation fee, which covers lunch and documents, is 15 000 FCFA, payable on arrival.</p><p>Agenda</p><p>Welcome and adoption of the agenda</p><p>Activity and financial reports</p><p>Election of the new board</p><p>Questions from members</p><p>The Secretary General</p>",
        checks: [
          { kind: "heading", level: 1, text: "Invitation" },
          { kind: "align", text: "Invitation", value: "center" },
          { kind: "align", text: "Douala, 20 April 2026", value: "right" },
          { kind: "align", text: "annual general meeting", value: "justify" },
          { kind: "bold", text: "15 000 FCFA" },
          { kind: "heading", level: 2, text: "Agenda" },
          { kind: "list", ordered: true, min: 4 },
        ] },
    ],
  },
};
