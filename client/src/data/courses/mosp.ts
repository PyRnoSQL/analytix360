import type { CourseModule, LmsCourse, Lesson } from "../../lms/types";

// Microsoft Office Suite Professional (MOSP)
// Original Analytix Engineering material, aligned to the Microsoft Office Specialist
// (Microsoft 365 Apps) exam objectives: MO-110 Word, MO-210 Excel, MO-310 PowerPoint,
// and MO-400 Outlook.

const MS = "Microsoft Support";
const LEARN = "Microsoft Learn";

const outline = (id: string, titles: string[]): Lesson[] =>
  titles.map((title, i) => ({ id: `${id}-l${i + 1}`, title, minutes: 20, objectives: [], blocks: [] }));

// ─────────────────────────────── MODULE 1 ───────────────────────────────

const m1: CourseModule = {
  id: "mosp-m1",
  number: 1,
  title: "Computer Fundamentals & Digital Workspace",
  summary: "Understand the machine you work on, organise your files like a professional, and keep your work safe in the cloud and online.",
  hours: 8,
  lessons: [
    {
      id: "mosp-m1-l1",
      title: "Inside your computer: hardware, software and the operating system",
      minutes: 15,
      objectives: [
        "Name the main hardware parts of a computer and what each one does",
        "Tell the difference between the operating system and applications",
        "Read your computer's specifications and judge whether it can run Microsoft 365",
      ],
      blocks: [
        { type: "p", text: "Every task in this program, from typing a memo to building a sales dashboard, runs on the same foundation: a computer made of **hardware** that is controlled by **software**. Knowing how these fit together helps you choose the right equipment, work faster, and explain problems clearly to IT support." },
        { type: "h", text: "The four jobs of hardware" },
        { type: "table", head: ["Job", "Main parts", "What it means for you"], rows: [
          ["Input", "Keyboard, mouse, touchpad, scanner, webcam", "How you give the computer instructions and data"],
          ["Processing", "CPU (processor)", "The \"brain\". A faster CPU opens files and recalculates spreadsheets quicker"],
          ["Memory", "RAM", "Short-term workspace for open programs. With too little, the computer slows down when many windows are open"],
          ["Storage", "SSD or hard disk (HDD), USB drive, cloud", "Where files are kept when the computer is off. An SSD starts Windows and opens files much faster than an HDD"],
        ] },
        { type: "callout", tone: "key", title: "RAM is not storage", text: "RAM is emptied every time you shut down; storage keeps your files. \"My computer has 8 GB\" usually refers to RAM, while \"256 GB\" usually refers to storage. When buying a laptop for office work, aim for at least 8 GB of RAM and an SSD." },
        { type: "figure", id: "mosp-m1-l1-fig", title: "Inside a desktop computer", art: "computer", hotspots: [
          { x: 27, y: 32, label: "Monitor (output)", text: "Shows what the computer is doing. Screen size is measured diagonally in inches; 22–24 inches is comfortable for office work." },
          { x: 25, y: 84, label: "Keyboard (input)", text: "Your main input device. Learning shortcuts on it saves more time than any hardware upgrade." },
          { x: 51, y: 86, label: "Mouse (input)", text: "Points, clicks and selects. Right-click opens context menus with the most useful commands for what you clicked." },
          { x: 69, y: 26, label: "Processor (CPU)", text: "Carries out every instruction. Its speed decides how fast files open and spreadsheets recalculate." },
          { x: 81, y: 30, label: "Memory (RAM)", text: "Short-term workspace for open programs, emptied at shutdown. 8 GB is the practical minimum for Office work." },
          { x: 77, y: 55, label: "Storage (SSD)", text: "Keeps files and Windows when the power is off. An SSD is several times faster than an old hard disk." },
          { x: 70, y: 80, label: "Power supply", text: "Converts mains power for the components. In areas with frequent cuts, an inverter or UPS protects it and your unsaved work." },
        ] },
        { type: "h", text: "Software: the operating system and applications" },
        { type: "p", text: "The **operating system** (Windows, macOS, Linux, or Android on phones) manages the hardware, files, and security. **Applications** such as Word, Excel, Chrome, or your accounting software run on top of it. When Word \"freezes\", the problem is usually the application, not Windows itself." },
        { type: "h", text: "Storage units you will meet every day" },
        { type: "table", head: ["Unit", "Roughly equal to", "Typical example"], rows: [
          ["1 KB (kilobyte)", "1,000 bytes", "A short text file"],
          ["1 MB (megabyte)", "1,000 KB", "A photo from a phone, a 20-page Word report with images"],
          ["1 GB (gigabyte)", "1,000 MB", "About 250 phone photos or a 1-hour HD video"],
          ["1 TB (terabyte)", "1,000 GB", "An external backup drive"],
        ] },
        { type: "h", text: "Check your own computer" },
        { type: "path", items: ["Start", "Settings", "System", "About"], note: "Shows the processor, installed RAM, Windows edition and version." },
        { type: "steps", title: "Find your specifications", items: [
          "Press the Windows key and type **About**, then open **About your PC**.",
          "Note the **Processor** and **Installed RAM** lines.",
          "Scroll to **Windows specifications** and note the edition (Home or Pro) and version.",
          "Open File Explorer (`Win + E`), select **This PC** and check how much free space your C: drive has.",
        ] },
        { type: "check", id: "mosp-m1-l1-c1", question: "A colleague says her laptop becomes very slow when Word, Excel, Teams and 15 browser tabs are open at the same time. Which upgrade will help most?", options: ["A larger hard disk", "More RAM", "A new keyboard", "A brighter screen"], answer: 1, explain: "Open programs live in RAM. When RAM is full, Windows swaps data to the disk, which is much slower. More RAM lets more programs stay open without slowing down." },
        { type: "callout", tone: "workplace", title: "In the workplace", text: "When you report a problem to IT, give the facts they need: the device name, what you were doing, the exact error message (take a screenshot with `Win + Shift + S`), and what you already tried. You will be helped faster." },
        { type: "task", id: "mosp-m1-l1-t1", title: "Practice", items: [
          "Write down your computer's processor, RAM and free disk space",
          "Take a screenshot of the About page with Win + Shift + S and paste it into a new Word document",
          "Decide whether your computer meets the minimum for Office work: 8 GB RAM and an SSD",
        ] },
        { type: "links", items: [
          { label: "Keyboard shortcuts in Windows", url: "https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec", source: MS },
        ] },
      ],
    },
    {
      id: "mosp-m1-l2",
      title: "Working fast in Windows: files, folders and shortcuts",
      minutes: 20,
      objectives: [
        "Organise work into a clear folder structure",
        "Name files so they sort correctly and are easy to find",
        "Use the Windows shortcuts professionals use every day",
      ],
      blocks: [
        { type: "p", text: "Most time lost at work is time spent looking for things. A clear folder structure and a consistent naming convention mean you, and anyone who takes over your work, can find any file in seconds." },
        { type: "h", text: "File Explorer and file paths" },
        { type: "p", text: "Open File Explorer with `Win + E`. Every file has a **path** that describes where it lives, for example `C:\\Users\\Awa\\Documents\\2026\\Invoices`. Reading paths helps you understand where a file was saved and explain it to others." },
        { type: "h", text: "A folder structure that scales" },
        { type: "code", text: "Documents\n└── 2026\n    ├── 01_Administration\n    ├── 02_Clients\n    │   ├── MINSANTE\n    │   └── Afriland\n    ├── 03_Finance\n    │   ├── Invoices\n    │   └── Receipts\n    └── 04_Training" },
        { type: "callout", tone: "tip", title: "Number your top-level folders", text: "Prefixes like 01_, 02_ keep folders in the order you choose instead of alphabetical order." },
        { type: "h", text: "Name files so they sort themselves" },
        { type: "p", text: "Use the pattern **date_subject_version**, with the date written year-month-day. Files named this way sort in date order automatically." },
        { type: "table", head: ["Avoid", "Use instead"], rows: [
          ["rapport final.docx", "2026-03-15_Rapport-activites-T1_v1.docx"],
          ["facture (2) nouvelle.xlsx", "2026-03-02_Facture_AE-2026-014.xlsx"],
          ["presentation OK OK.pptx", "2026-04-10_Presentation-Direction_v3.pptx"],
        ] },
        { type: "callout", tone: "warning", title: "Show file extensions", text: "Turn on extensions so you can see whether a file is .docx, .pdf or .exe. Criminals disguise malware as \"Facture.pdf.exe\". In Windows 11: File Explorer › View › Show › File name extensions." },
        { type: "h", text: "The shortcuts professionals use daily" },
        { type: "shortcuts", items: [
          { keys: ["Win", "E"], action: "Open File Explorer" },
          { keys: ["Ctrl", "C"], action: "Copy" },
          { keys: ["Ctrl", "X"], action: "Cut" },
          { keys: ["Ctrl", "V"], action: "Paste" },
          { keys: ["Ctrl", "Z"], action: "Undo" },
          { keys: ["F2"], action: "Rename the selected file" },
          { keys: ["Ctrl", "Shift", "N"], action: "New folder (in File Explorer)" },
          { keys: ["Alt", "Tab"], action: "Switch between open windows" },
          { keys: ["Win", "D"], action: "Show the desktop" },
          { keys: ["Win", "L"], action: "Lock the computer when you step away" },
          { keys: ["Win", "Shift", "S"], action: "Screenshot of part of the screen" },
          { keys: ["Win", "V"], action: "Clipboard history (turn it on the first time)" },
        ] },
        { type: "keys", id: "mosp-m1-l2-keys", title: "Practise the everyday shortcuts", items: [
          { keys: ["Ctrl", "C"], action: "Copy" },
          { keys: ["Ctrl", "X"], action: "Cut" },
          { keys: ["Ctrl", "V"], action: "Paste" },
          { keys: ["Ctrl", "Z"], action: "Undo" },
          { keys: ["F2"], action: "Rename the selected file" },
        ] },
        { type: "h", text: "Deleting, recovering and compressing" },
        { type: "list", items: [
          "`Delete` sends a file to the **Recycle Bin**, where it can be restored.",
          "`Shift + Delete` deletes permanently. Use it only when you are sure.",
          "To send many files by e-mail, right-click them and choose **Compress to ZIP file** (Windows 11) or **Send to › Compressed (zipped) folder** (Windows 10).",
        ] },
        { type: "check", id: "mosp-m1-l2-c1", question: "Which file name will sort correctly by date and tell a colleague exactly what the file contains?", options: ["Rapport mars final.docx", "15-03-2026 rapport.docx", "2026-03-15_Rapport-activites-T1_v2.docx", "rapport_v2_FINAL_ok.docx"], answer: 2, explain: "Year-month-day dates sort in true date order, and the subject and version make the content clear. Day-month-year dates sort by day, so 15 March would appear before 2 January." },
        { type: "callout", tone: "workplace", title: "In the workplace", text: "Press `Win + L` every time you leave your desk. An unlocked computer in an open office gives anyone access to your e-mail, client files and payment platforms." },
        { type: "task", id: "mosp-m1-l2-t1", title: "Practice", items: [
          "Create the numbered 2026 folder structure shown above in your Documents folder",
          "Rename three of your existing files using the date_subject_version pattern",
          "Turn on file name extensions in File Explorer",
          "Compress one folder into a ZIP file",
        ] },
        { type: "links", items: [
          { label: "Keyboard shortcuts in Windows", url: "https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec", source: MS },
        ] },
      ],
    },
    {
      id: "mosp-m1-l3",
      title: "Cloud storage and staying safe online",
      minutes: 20,
      objectives: [
        "Save, sync and share files with OneDrive",
        "Apply the 3-2-1 backup rule",
        "Recognise phishing and protect your accounts with strong passwords and two-step verification",
      ],
      blocks: [
        { type: "p", text: "A laptop can be stolen, dropped, or hit by a power surge. Files saved only on that laptop are lost with it. Cloud storage keeps a copy online and lets you open your work from any device." },
        { type: "h", text: "How OneDrive works" },
        { type: "list", items: [
          "Files in your **OneDrive** folder are copied to the cloud automatically (**sync**). A green tick means the file is safe online.",
          "When you save an Office file to OneDrive, **AutoSave** switches on and saves every few seconds.",
          "**Version history** lets you go back to an earlier version: right-click the file › Version history.",
          "**Share** sends a link instead of an attachment, so everyone works on the same file instead of copies.",
        ] },
        { type: "steps", title: "Share a file safely", items: [
          "In File Explorer or on onedrive.com, right-click the file and choose **Share**.",
          "Open the link settings and choose who can use it: specific people is the safest option.",
          "Untick **Allow editing** if the person only needs to read.",
          "Enter the person's e-mail address and send.",
        ] },
        { type: "callout", tone: "key", title: "The 3-2-1 backup rule", text: "Keep **3** copies of important files, on **2** different types of storage (for example laptop and external drive), with **1** copy off-site (the cloud). A fire or theft then cannot destroy all copies at once." },
        { type: "h", text: "Passwords and two-step verification" },
        { type: "list", items: [
          "Use a **passphrase** of at least 12 characters, such as four unrelated words. It is longer and easier to remember than `P@ssw0rd1`.",
          "Use a different password for each important account. A password manager remembers them for you.",
          "Turn on **two-step verification** for e-mail and Microsoft accounts, for example with the Microsoft Authenticator app. A stolen password alone is then not enough.",
        ] },
        { type: "h", text: "Recognise phishing" },
        { type: "table", head: ["Warning sign", "Example"], rows: [
          ["Urgency or threats", "\"Your account will be closed in 24 hours\""],
          ["A request for a code or PIN", "\"We sent you a code by mistake, please send it back\""],
          ["A sender address that does not match", "support@micros0ft-security.com"],
          ["An unexpected attachment", "Facture_impayee.zip from an unknown sender"],
        ] },
        { type: "callout", tone: "warning", title: "Never share a one-time code", text: "No bank, mobile money operator or Microsoft employee will ever ask for your PIN or verification code. Anyone who asks for it by SMS, call or WhatsApp is attempting fraud." },
        { type: "check", id: "mosp-m1-l3-c1", question: "You receive an SMS: \"Transfer sent to you by error. Please send back the confirmation code you just received.\" What should you do?", options: ["Send the code quickly to be polite", "Call the number to check", "Ignore it and never share the code; report it to your operator", "Forward the code to a colleague to check"], answer: 2, explain: "The code is what the fraudster needs to take over your account or confirm a transaction. Legitimate reversals never require your code." },
        { type: "h", text: "Keep your computer healthy" },
        { type: "list", items: [
          "Install updates: Start › Settings › Windows Update.",
          "Keep **Windows Security** (antivirus) switched on.",
          "Scan USB drives that come from a print shop or cyber café before opening files on them.",
          "Avoid logging in to sensitive accounts on public Wi-Fi without a VPN.",
        ] },
        { type: "task", id: "mosp-m1-l3-t1", title: "Practice", items: [
          "Save one work file to your OneDrive folder and check for the green tick",
          "Share it with a colleague as view-only",
          "Turn on two-step verification for your main e-mail account",
          "Run Windows Update",
        ] },
        { type: "links", items: [
          { label: "Keyboard shortcuts for OneDrive for work or school", url: "https://support.microsoft.com/en-us/office/keyboard-shortcuts-for-onedrive-for-work-or-school-1a7d5346-79b6-435f-90b3-e34fd6fdfea4", source: MS },
        ] },
      ],
    },
  ],
  quiz: {
    id: "mosp-m1-quiz",
    title: "Module 1 Quiz",
    passPct: 70,
    questions: [
      { id: "q1", question: "Which component temporarily holds the programs and files you have open?", options: ["SSD", "RAM", "CPU", "Monitor"], answer: 1, explain: "RAM is the computer's short-term working memory. It is emptied when the computer shuts down." },
      { id: "q2", question: "Which of these is an operating system?", options: ["Microsoft Excel", "Google Chrome", "Windows 11", "OneDrive"], answer: 2, explain: "Windows manages the hardware, files and security. Excel, Chrome and OneDrive are applications that run on it." },
      { id: "q3", question: "What does Win + L do?", options: ["Opens File Explorer", "Locks the computer", "Logs out of Microsoft 365", "Opens the language settings"], answer: 1, explain: "Win + L locks the screen immediately. Use it whenever you leave your desk." },
      { id: "q4", question: "Which date format makes files sort in true date order?", options: ["15-03-2026", "March 15 2026", "2026-03-15", "15/03/26"], answer: 2, explain: "Year-month-day sorts correctly because the most significant part comes first." },
      { id: "q5", question: "A file deleted with Shift + Delete…", options: ["Goes to the Recycle Bin", "Is deleted permanently", "Is moved to OneDrive", "Is compressed"], answer: 1, explain: "Shift + Delete bypasses the Recycle Bin, so the file cannot be restored from there." },
      { id: "q6", question: "The 3-2-1 backup rule means:", options: ["3 passwords, 2 devices, 1 account", "3 copies, 2 types of storage, 1 copy off-site", "Back up every 3 days, keep 2 weeks, 1 cloud", "3 folders, 2 subfolders, 1 archive"], answer: 1, explain: "Three copies on two kinds of storage with one off-site protects you against theft, fire and hardware failure." },
      { id: "q7", question: "Why should you turn on file name extensions?", options: ["To make files smaller", "To see a file's real type, such as .exe disguised as a PDF", "To sync files to OneDrive", "To sort files by date"], answer: 1, explain: "Malware is often named like \"Facture.pdf.exe\". With extensions visible, the real .exe type shows." },
      { id: "q8", question: "What is the main advantage of sharing a OneDrive link instead of an attachment?", options: ["The file becomes smaller", "Everyone works on the same up-to-date file", "The file is converted to PDF", "It removes the need for passwords"], answer: 1, explain: "A link points to one file, so there are no conflicting copies. You can also control whether people can view or edit." },
    ],
  },
};

// ─────────────────────────────── MODULE 2 ───────────────────────────────

const m2: CourseModule = {
  id: "mosp-m2",
  number: 2,
  title: "Microsoft Word — Document Creation & Formatting",
  summary: "Create, save and share documents, format text and paragraphs professionally, and structure long documents with styles.",
  hours: 10,
  lessons: [
    {
      id: "mosp-m2-l1",
      title: "Create, save and share your first professional document",
      minutes: 18,
      objectives: [
        "Start a document from a blank page or a template",
        "Set up the page for A4 paper and the right margins",
        "Save as Word or PDF and share it with colleagues",
      ],
      blocks: [
        { type: "p", text: "Word is the tool for letters, reports, memos, CVs and proposals. Good documents start with good setup: the right paper size, a clear file name and a saved location you can find again." },
        { type: "figure", id: "mosp-m2-l1-fig", title: "Tour of the Word window", art: "word", hotspots: [
          { x: 50, y: 4, label: "Title bar", text: "Shows the file name. The AutoSave switch on the left turns on when the file is saved to OneDrive." },
          { x: 17, y: 12, label: "Ribbon tabs", text: "Commands are grouped by task: File, Home, Insert, Layout, References, Review, View." },
          { x: 30, y: 21, label: "Font group", text: "Character formatting: font, size, bold, italic, underline, colour." },
          { x: 53, y: 21, label: "Paragraph group", text: "Alignment, line spacing, bullets and numbering, and Show/Hide ¶." },
          { x: 83, y: 21, label: "Styles gallery", text: "Normal, Heading 1, Heading 2… Using styles gives your document a structure Word understands." },
          { x: 50, y: 32, label: "Ruler", text: "Shows margins, indents and tab stops. Turn it on with View › Ruler." },
          { x: 20, y: 96, label: "Status bar", text: "Page count, word count and the proofing language. Click the language to change it for a French or English passage." },
          { x: 86, y: 96, label: "Zoom", text: "Changes only how the page looks on screen, never the printed size." },
        ] },
        { type: "h", text: "Start from a blank page or a template" },
        { type: "path", items: ["File", "New"], note: "Pick Blank document, or search templates such as \"report\", \"letter\" or \"CV\"." },
        { type: "callout", tone: "workplace", title: "Check the paper size", text: "Cameroon, Africa and Europe use **A4** paper. Some copies of Word default to US **Letter**, which prints with odd margins on A4. Fix it once per document: Layout › Size › A4." },
        { type: "path", items: ["Layout", "Size", "A4"] },
        { type: "path", items: ["Layout", "Margins", "Normal (2.54 cm)"] },
        { type: "h", text: "Save it where you can find it" },
        { type: "steps", items: [
          "Press `F12` (Save As) or go to File › Save As.",
          "Choose **OneDrive** so AutoSave protects your work, or a folder on This PC.",
          "Name the file with the date_subject_version pattern from Module 1.",
          "Keep the type **Word Document (.docx)**.",
        ] },
        { type: "h", text: "Word, PDF or template?" },
        { type: "table", head: ["Format", "Use it when"], rows: [
          [".docx", "The document is still being written or others need to edit it"],
          [".pdf", "The document is final: invoices, signed letters, reports sent to clients. Everyone sees the same layout"],
          [".dotx", "You want a reusable template, for example your company letterhead"],
        ] },
        { type: "path", items: ["File", "Export", "Create PDF/XPS"], note: "Or File › Save As and choose PDF as the file type." },
        { type: "shortcuts", items: [
          { keys: ["Ctrl", "N"], action: "New blank document" },
          { keys: ["Ctrl", "S"], action: "Save" },
          { keys: ["F12"], action: "Save As" },
          { keys: ["Ctrl", "P"], action: "Print and print preview" },
          { keys: ["Ctrl", "Z"], action: "Undo" },
          { keys: ["Ctrl", "Y"], action: "Redo or repeat the last action" },
        ] },
        { type: "h", text: "Share for review" },
        { type: "p", text: "Select **Share** in the top-right corner to send a link. Colleagues can open the document in their browser, add comments and edit at the same time as you. Module 3 covers reviewing with comments and Track Changes." },
        { type: "check", id: "mosp-m2-l1-c1", question: "You must send a signed quotation to a client and make sure the layout does not change on their computer. Which format should you send?", options: [".docx", ".pdf", ".dotx", ".txt"], answer: 1, explain: "A PDF looks the same on every device and is not easily edited, which is what you want for a final, signed document." },
        { type: "task", id: "mosp-m2-l1-t1", title: "Practice", items: [
          "Create a new document from the \"Business letter\" template",
          "Set the paper size to A4 and the margins to Normal",
          "Save it to OneDrive with a date_subject_version name",
          "Export a PDF copy",
        ] },
        { type: "links", items: [
          { label: "Keyboard shortcuts in Word", url: "https://support.microsoft.com/en-us/accessibility/word/keyboard-shortcuts-in-word", source: MS },
          { label: "Exam MO-110: Microsoft Word (Microsoft 365 Apps)", url: "https://learn.microsoft.com/en-us/credentials/certifications/exams/mo-110/", source: LEARN },
        ] },
      ],
    },
    {
      id: "mosp-m2-l2",
      title: "Formatting text and paragraphs like a professional",
      minutes: 22,
      objectives: [
        "Apply character formatting and paragraph formatting with the ribbon and shortcuts",
        "Control spacing with Space Before and After instead of empty lines",
        "Copy formatting with the Format Painter and reveal hidden marks with Show/Hide",
      ],
      blocks: [
        { type: "p", text: "Word has two levels of formatting. **Character formatting** (font, size, bold, colour) applies to selected letters. **Paragraph formatting** (alignment, line spacing, indents, spacing before and after) applies to the whole paragraph the cursor is in." },
        { type: "shortcuts", title: "Character formatting", items: [
          { keys: ["Ctrl", "B"], action: "Bold" },
          { keys: ["Ctrl", "I"], action: "Italic" },
          { keys: ["Ctrl", "U"], action: "Underline" },
          { keys: ["Ctrl", "Shift", ">"], action: "Increase font size" },
          { keys: ["Ctrl", "Shift", "<"], action: "Decrease font size" },
          { keys: ["Ctrl", "Space"], action: "Remove character formatting" },
        ] },
        { type: "shortcuts", title: "Paragraph formatting", items: [
          { keys: ["Ctrl", "L"], action: "Align left" },
          { keys: ["Ctrl", "E"], action: "Center" },
          { keys: ["Ctrl", "R"], action: "Align right" },
          { keys: ["Ctrl", "J"], action: "Justify" },
          { keys: ["Ctrl", "1"], action: "Single line spacing" },
          { keys: ["Ctrl", "5"], action: "1.5 line spacing" },
          { keys: ["Ctrl", "Q"], action: "Remove paragraph formatting" },
        ] },
        { type: "keys", id: "mosp-m2-l2-keys", title: "Practise the formatting shortcuts", items: [
          { keys: ["Ctrl", "B"], action: "Bold" },
          { keys: ["Ctrl", "I"], action: "Italic" },
          { keys: ["Ctrl", "U"], action: "Underline" },
          { keys: ["Ctrl", "E"], action: "Center" },
          { keys: ["Ctrl", "J"], action: "Justify" },
          { keys: ["Ctrl", "L"], action: "Align left" },
        ] },
        { type: "h", text: "Stop pressing Enter twice" },
        { type: "p", text: "Empty paragraphs create uneven gaps and move around when text changes. Set the gap once instead:" },
        { type: "path", items: ["Layout", "Paragraph", "Spacing Before / After"], note: "For example 0 pt before and 8 pt after for body text." },
        { type: "path", items: ["Home", "Paragraph", "Line and Paragraph Spacing"] },
        { type: "h", text: "See what is really on the page" },
        { type: "p", text: "Turn on **Show/Hide ¶** with `Ctrl + Shift + 8` or Home › Paragraph › ¶. Word shows paragraph marks, spaces (dots), tabs (arrows) and page breaks. It is the fastest way to find why a layout misbehaves." },
        { type: "h", text: "Copy formatting in two clicks" },
        { type: "steps", title: "Format Painter", items: [
          "Click inside text that already has the formatting you want.",
          "Click **Home › Format Painter** once to apply it to one selection, or **double-click** it to keep it on for several selections.",
          "Drag over the text to format. Press `Esc` to turn the painter off.",
        ] },
        { type: "callout", tone: "workplace", title: "French punctuation and amounts", text: "French typography puts a space before : ; ? ! and inside « guillemets », and amounts are written 350 000 FCFA. Use a **non-breaking space** (`Ctrl + Shift + Space`) so Word never splits \"350 000\" or leaves a lone \"?\" at the start of a line." },
        { type: "doc", id: "mosp-m2-l2-doc", title: "Format a staff memo", task: "Make the first line a **Heading 1** and centre it, make the date **bold**, and turn the three schedule lines into a **bulleted list**.",
          hint: "Click in the first line and choose Heading 1 in Styles, then use Center. Select the three lines before clicking Bullets.",
          html: "<p>Staff memo: new working hours</p><p>From Monday 6 April 2026, the office opens at 7:30 and closes at 16:30.</p><p>What changes for you:</p><p>Arrival from 7:30</p><p>Lunch break from 12:00 to 13:00</p><p>Departure from 16:30</p><p>Thank you for your cooperation.</p><p>The Administration</p>",
          checks: [
            { kind: "heading", level: 1, text: "Staff memo" },
            { kind: "align", text: "Staff memo", value: "center" },
            { kind: "bold", text: "Monday 6 April 2026" },
            { kind: "list", ordered: false, min: 3 },
          ] },
        { type: "check", id: "mosp-m2-l2-c1", question: "You want 12 pt of space after every paragraph in a report. What is the professional way to do it?", options: ["Press Enter twice after every paragraph", "Set Spacing After to 12 pt for the paragraphs", "Increase the font size of the empty lines", "Insert a table with empty rows"], answer: 1, explain: "Spacing After keeps gaps identical and moves with the text. Empty paragraphs create inconsistent gaps and blank lines at the top of pages." },
        { type: "task", id: "mosp-m2-l2-t1", title: "Practice", items: [
          "Type a one-page memo with a title and three paragraphs",
          "Justify the body text and set 1.15 line spacing with 8 pt after",
          "Turn on Show/Hide ¶ and remove any empty paragraphs",
          "Use the Format Painter to copy the title formatting to a second heading",
          "Write an amount such as 350 000 FCFA with a non-breaking space",
        ] },
        { type: "links", items: [
          { label: "Keyboard shortcuts in Word", url: "https://support.microsoft.com/en-us/accessibility/word/keyboard-shortcuts-in-word", source: MS },
        ] },
      ],
    },
    {
      id: "mosp-m2-l3",
      title: "Styles, lists and page layout",
      minutes: 25,
      objectives: [
        "Structure a document with Heading styles and navigate it with the Navigation Pane",
        "Create bulleted, numbered and multilevel lists",
        "Add headers, footers and page numbers, and mix portrait and landscape pages",
      ],
      blocks: [
        { type: "p", text: "Styles are named sets of formatting. When your headings use **Heading 1** and **Heading 2** instead of manual bold text, Word understands the document's structure: you can jump between sections, reorder them, and generate a table of contents automatically (Module 3)." },
        { type: "shortcuts", items: [
          { keys: ["Ctrl", "Alt", "1"], action: "Apply Heading 1" },
          { keys: ["Ctrl", "Alt", "2"], action: "Apply Heading 2" },
          { keys: ["Ctrl", "Shift", "N"], action: "Apply Normal style" },
        ] },
        { type: "path", items: ["View", "Show", "Navigation Pane"], note: "Lists every heading. Click to jump, drag to move a whole section." },
        { type: "steps", title: "Change a style for the whole document", items: [
          "On Home › Styles, right-click **Heading 1** and choose **Modify**.",
          "Change the font, size and colour, for example your company colour.",
          "Click OK. Every Heading 1 in the document updates at once.",
        ] },
        { type: "h", text: "Lists" },
        { type: "list", items: [
          "Bullets for items in no particular order: Home › Paragraph › Bullets.",
          "Numbering for steps or ranked items: Home › Paragraph › Numbering.",
          "**Multilevel lists** for numbered sections such as 1, 1.1, 1.1.1: Home › Paragraph › Multilevel List. Press `Tab` to demote an item and `Shift + Tab` to promote it.",
          "To start a list again at 1, right-click the number and choose **Restart at 1**.",
        ] },
        { type: "h", text: "Headers, footers and page numbers" },
        { type: "path", items: ["Insert", "Page Number", "Bottom of Page"], note: "Choose \"Page X of Y\" for reports." },
        { type: "p", text: "Double-click the top or bottom margin to edit the header or footer, for example to add the company name and document reference. Double-click the body to return." },
        { type: "h", text: "One landscape page inside a portrait report" },
        { type: "steps", items: [
          "Put the cursor just before the wide table.",
          "Go to **Layout › Breaks › Next Page** to start a new section.",
          "Set **Layout › Orientation › Landscape** for that section only.",
          "After the table, insert another Next Page section break and switch back to Portrait.",
        ] },
        { type: "callout", tone: "workplace", title: "Bilingual documents", text: "When one document mixes French and English, select the French passages and set Review › Language › Set Proofing Language › French (France). The spelling checker then checks each part in the right language." },
        { type: "check", id: "mosp-m2-l3-c1", question: "Why should report headings use the Heading styles rather than manual bold text?", options: ["Heading styles print faster", "Word can build the Navigation Pane and an automatic table of contents from them", "Bold text cannot be changed later", "Heading styles use less disk space"], answer: 1, explain: "Heading styles give the document a structure Word can read: navigation, moving sections, and automatic tables of contents all depend on them." },
        { type: "task", id: "mosp-m2-l3-t1", title: "Practice", items: [
          "Build a 3-page report with at least three Heading 1 and four Heading 2 sections",
          "Open the Navigation Pane and drag one section to a new position",
          "Add a multilevel numbered list",
          "Insert \"Page X of Y\" in the footer",
          "Make page 2 landscape using section breaks",
        ] },
        { type: "links", items: [
          { label: "Exam MO-110: Microsoft Word (Microsoft 365 Apps)", url: "https://learn.microsoft.com/en-us/credentials/certifications/exams/mo-110/", source: LEARN },
          { label: "Keyboard shortcuts in Microsoft 365", url: "https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-microsoft-365-e765366f-24fc-4054-870d-39b214f223fd", source: MS },
        ] },
      ],
    },
  ],
  quiz: {
    id: "mosp-m2-quiz",
    title: "Module 2 Quiz",
    passPct: 70,
    questions: [
      { id: "q1", question: "Which keyboard shortcut opens Save As in Word?", options: ["Ctrl + S", "F12", "Ctrl + A", "F7"], answer: 1, explain: "F12 opens Save As. Ctrl + S saves the current file." },
      { id: "q2", question: "Where do you change the paper size to A4?", options: ["Home › Font", "Insert › Page", "Layout › Size", "View › Zoom"], answer: 2, explain: "Page setup options such as Size, Margins and Orientation are on the Layout tab." },
      { id: "q3", question: "Which is paragraph formatting rather than character formatting?", options: ["Bold", "Font colour", "Line spacing", "Italic"], answer: 2, explain: "Line spacing applies to the whole paragraph. Bold, colour and italic apply to selected characters." },
      { id: "q4", question: "What does double-clicking the Format Painter do?", options: ["Copies formatting to the clipboard", "Keeps the painter on so you can format several selections", "Removes all formatting", "Applies the Normal style"], answer: 1, explain: "A single click formats one selection. A double-click keeps it active until you press Esc." },
      { id: "q5", question: "Which shortcut inserts a non-breaking space?", options: ["Ctrl + Space", "Shift + Space", "Ctrl + Shift + Space", "Alt + Space"], answer: 2, explain: "Ctrl + Shift + Space keeps two words or numbers together on one line, as in 350 000 FCFA." },
      { id: "q6", question: "Which feature lists all headings and lets you drag sections to reorder them?", options: ["Format Painter", "Navigation Pane", "Track Changes", "Print Preview"], answer: 1, explain: "The Navigation Pane (View › Navigation Pane) is built from Heading styles." },
      { id: "q7", question: "To make only one page landscape in a portrait document, you need to:", options: ["Rotate the paper in the printer", "Insert Next Page section breaks before and after it", "Use a page break (Ctrl + Enter)", "Change the style to Heading 1"], answer: 1, explain: "Orientation is set per section, so the landscape page needs its own section." },
      { id: "q8", question: "Which format is best for a final invoice sent to a client?", options: [".docx", ".dotx", ".pdf", ".txt"], answer: 2, explain: "A PDF keeps its layout on every device and is not easily modified." },
    ],
  },
};

// ─────────────────────────── MODULES 3–8 (outline) ───────────────────────────

const coming = (n: number, title: string, summary: string, hours: number, lessons: string[]): CourseModule => ({
  id: `mosp-m${n}`, number: n, title, summary, hours, lessons: outline(`mosp-m${n}`, lessons), comingSoon: true,
});

export const MOSP_COURSE: LmsCourse = {
  id: "mosp",
  code: "MOSP",
  title: "Microsoft Office Suite Professional",
  subtitle: "Word, Excel, PowerPoint and Outlook for professional productivity",
  accent: "#F4A340",
  hours: 80,
  certification: "Prepares for Microsoft Office Specialist: Associate (Microsoft 365 Apps)",
  introVideo: {
    en: { src: "/media/mosp-intro-en.mp4", poster: "/media/mosp-intro-en.jpg" },
    fr: { src: "/media/mosp-intro-fr.mp4", poster: "/media/mosp-intro-fr.jpg" },
  },
  modules: [
    m1,
    m2,
    coming(3, "Microsoft Word — Advanced Document Production", "Tables, mail merge, Track Changes, tables of contents and templates.", 10, [
      "Tables that organise data", "Mail merge for letters and labels", "Reviewing with comments and Track Changes", "Tables of contents, captions and templates"]),
    coming(4, "Microsoft Excel — Spreadsheet Fundamentals", "Workbooks, formulas, cell references, sorting, filtering and charts.", 12, [
      "Your first workbook", "Formulas and cell references", "Sort, filter and format data", "Charts and printing"]),
    coming(5, "Microsoft Excel — Advanced Data Analysis", "Logical and lookup functions, PivotTables, dashboards and What-If analysis.", 12, [
      "IF, AND, OR and IFS", "XLOOKUP, VLOOKUP and INDEX-MATCH", "PivotTables and PivotCharts", "What-If analysis and protection"]),
    coming(6, "Microsoft PowerPoint — Professional Presentations", "Design, Slide Master, visuals, animation and delivery.", 10, [
      "Designing clear slides", "Slide Master and branding", "Charts, SmartArt and media", "Rehearsing and delivering"]),
    coming(7, "Microsoft Outlook — Professional Communication & Organization", "E-mail, calendar, contacts, tasks and inbox management.", 8, [
      "Professional e-mail", "Inbox rules and folders", "Calendar and meetings", "Tasks and contacts"]),
    coming(8, "Integrated Office Skills & Capstone Project", "Combine Word, Excel, PowerPoint and Outlook in one professional deliverable.", 10, [
      "Linking Excel data into Word and PowerPoint", "Collaboration in OneDrive and SharePoint", "Capstone: the business deliverable package"]),
  ],
};
