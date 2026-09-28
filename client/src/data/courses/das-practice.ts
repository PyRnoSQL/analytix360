import type { Block } from "../../lms/types";

// Practice labs for the DAS course: three graded exercises per module (beginner,
// intermediate, advanced). Every exercise has its own dataset with a different mix of
// data types (dates, times, decimals, yes/no flags, categories, missing values).
// Each set is attached to the module that contains most of its "anchors" (lesson headings).

export interface PracticeSet { key: string; title: string; anchors: string[]; objectives: string[]; blocks: Block[] }

type Cell = string | number | null;
const lit = (v: Cell) => (v === null ? "NULL" : typeof v === "number" ? String(v) : `'${v.replace(/'/g, "''")}'`);
const table = (ddl: string, name: string, rows: Cell[][]) =>
  ddl + "\n" + rows.map((r) => `INSERT INTO ${name} VALUES (${r.map(lit).join(", ")});`).join("\n");
const dict = (rows: [string, string, string][]): Block =>
  ({ type: "table", head: ["Column", "Type", "Example"], rows: rows.map(([c, t, e]) => [`\`${c}\``, t, `\`${e}\``]) });

// Files used by the Python exercises
const FARMS_CSV = "farm_id,region,rainfall_mm,fertilizer_kg_ha,irrigated,yield_t_ha\nF01,Ouest,1850.5,120,True,3.53\nF02,Ouest,1720.0,80,False,2.4\nF03,Centre,1560.0,150,True,3.72\nF04,Centre,1480.5,60,False,2.33\nF05,Nord,910.0,40,False,1.66\nF06,Nord,980.5,100,True,2.86\nF07,Littoral,2950.0,90,False,3.06\nF08,Littoral,3100.5,130,True,4.11\nF09,Adamaoua,1400.0,20,False,1.79\nF10,Adamaoua,1520.0,70,False,2.3\nF11,Est,1650.0,110,True,3.11\nF12,Est,1590.5,50,False,2.21";
const DELIVERIES_CSV = "parcel_id,courier,picked_up,delivered,fragile\nPX-1001,Colis Sûr,2026-06-01 08:45,2026-06-02 05:15,False\nPX-1002,Rapide Express,2026-06-01 08:30,2026-06-01 22:30,False\nPX-1003,Colis Sûr,2026-06-01 14:25,2026-06-02 16:25,True\nPX-1004,Rapide Express,2026-06-01 14:10,2026-06-02 06:40,False\nPX-1005,Colis Sûr,2026-06-02 09:20,2026-06-03 03:35,False\nPX-1006,Rapide Express,2026-06-02 09:05,2026-06-03 04:05,True\nPX-1007,Colis Sûr,2026-06-02 16:55,2026-06-03 22:55,False\nPX-1008,Rapide Express,2026-06-02 16:40,2026-06-03 04:55,False\nPX-1009,Colis Sûr,2026-06-03 08:10,2026-06-04 06:40,True\nPX-1010,Rapide Express,2026-06-03 07:55,2026-06-04 01:25,False\nPX-1011,Colis Sûr,2026-06-03 11:35,2026-06-04 12:20,False\nPX-1012,Rapide Express,2026-06-03 11:20,2026-06-04 03:05,True";
const POSTS_CSV = "post_id,platform,posted_at,format,impressions,engagements,boosted\n1,TikTok,2026-08-03 09:00,video,52000,2860,True\n2,Facebook,2026-08-05 14:00,image,30000,1350,True\n3,WhatsApp Status,2026-08-07 10:00,image,9000,540,False\n4,LinkedIn,2026-08-09 15:00,text,6000,270,False\n5,TikTok,2026-08-11 11:00,video,48000,2400,True\n6,Facebook,2026-08-13 16:00,video,26000,1300,True\n7,WhatsApp Status,2026-08-15 12:00,video,7000,455,False\n8,LinkedIn,2026-08-17 17:00,image,5000,260,False\n9,TikTok,2026-08-19 13:00,video,1500,210,False\n10,Facebook,2026-08-21 09:00,text,22000,990,True\n11,WhatsApp Status,2026-08-23 14:00,text,8000,480,False\n12,LinkedIn,2026-08-25 10:00,text,4000,176,False";
const STOCK_CSV = "date,facility,item,received,used,unit_cost,cold_chain\n2026-04-02,CSI Bonamoussadi,Paracetamol 500 mg,1200,340,15.5,False\n2026-04-02,CSI Bonamoussadi,BCG vaccine,200,,850.0,True\n2026-04-09,CMA Nkolndongo,Paracetamol 500 mg,,410,15.5,False\n2026-04-09,CMA Nkolndongo,BCG vaccine,150,95,850.0,True\n2026-04-16,CSI Bonamoussadi,ORS sachets,500,260,120.0,False\n2026-04-16,CMA Nkolndongo,ORS sachets,300,310,120.0,False\n2026-05-07,CSI Bonamoussadi,Paracetamol 500 mg,,520,15.5,False\n2026-05-07,CMA Nkolndongo,BCG vaccine,100,140,850.0,True\n2026-05-14,CSI Bonamoussadi,BCG vaccine,,60,850.0,True\n2026-05-14,CMA Nkolndongo,ORS sachets,400,180,120.0,False";

// ── Datasets ──────────────────────────────────────────────────────────────
const MOMO_SQL = table(
  "CREATE TABLE momo_tx (tx_id INTEGER PRIMARY KEY, tx_time TEXT, operator TEXT, tx_type TEXT, amount INTEGER, fee REAL, success INTEGER);", "momo_tx", [
    [1, "2026-05-04 08:12", "MTN", "transfer", 25000, 250, 1], [2, "2026-05-04 09:47", "Orange", "withdrawal", 150000, 1500, 1],
    [3, "2026-05-04 11:03", "MTN", "deposit", 50000, 0, 1], [4, "2026-05-04 12:30", "Orange", "transfer", 7500, 75, 0],
    [5, "2026-05-04 14:55", "MTN", "withdrawal", 300000, 2700, 0], [6, "2026-05-05 07:40", "Orange", "deposit", 20000, 0, 1],
    [7, "2026-05-05 10:15", "MTN", "transfer", 120000, 1200, 1], [8, "2026-05-05 13:22", "Orange", "transfer", 45000, 450, 0],
    [9, "2026-05-05 16:08", "MTN", "withdrawal", 80000, 800, 1], [10, "2026-05-05 18:31", "Orange", "withdrawal", 200000, 1800, 1],
    [11, "2026-05-06 08:05", "MTN", "transfer", 15000, 150, 0], [12, "2026-05-06 09:50", "Orange", "deposit", 100000, 0, 1],
  ]);

const BUS_SQL = table(
  "CREATE TABLE bus_trips (trip_id INTEGER PRIMARY KEY, route TEXT, departure TEXT, arrival TEXT, seats INTEGER, sold INTEGER, price INTEGER);", "bus_trips", [
    [1, "Douala-Yaounde", "2026-06-01 06:00", "2026-06-01 10:05", 70, 68, 6000], [2, "Douala-Yaounde", "2026-06-01 13:00", "2026-06-01 17:40", 70, 49, 6000],
    [3, "Yaounde-Bafoussam", "2026-06-01 07:30", "2026-06-01 12:15", 30, 30, 5000], [4, "Douala-Bafoussam", "2026-06-01 08:00", "2026-06-01 13:20", 55, 31, 5500],
    [5, "Yaounde-Douala", "2026-06-02 06:30", "2026-06-02 10:20", 70, 70, 6000], [6, "Yaounde-Ngaoundere", "2026-06-02 18:00", "2026-06-03 07:30", 45, 29, 15000],
    [7, "Douala-Kribi", "2026-06-02 09:00", "2026-06-02 12:10", 30, 17, 4000], [8, "Bafoussam-Douala", "2026-06-02 15:00", "2026-06-02 20:05", 55, 44, 5500],
  ]);

const SUPPLIERS_SQL = table(
  "CREATE TABLE suppliers (supplier_id INTEGER PRIMARY KEY, name TEXT, city TEXT, phone TEXT, registered TEXT, active TEXT);", "suppliers", [
    [1, "Ets Kamga & Fils", "Douala", "+237 677 12 34 56", "2021-03-15", "Y"], [2, "SOCAPRO", " douala", "677123457", "2019-11-02", "Y"],
    [3, "Boulangerie Mballa", "YAOUNDE", "+237 699 45 67 89", "2023-06-20", "N"], [4, "Agro Plus Sarl", "Yaounde ", null, "2022-01-10", "Y"],
    [5, "Ndongo Transport", "Bafoussam", "+237 655 98 76 54", "2020-08-30", null], [6, "Cam Emballages", "DOUALA ", "+237 690 11 22 33", "2024-02-14", "Y"],
    [7, "Tchatchoua Services", "bafoussam", "651234567", "2018-05-05", "N"], [8, "Fokou Distribution", "Douala", null, "2025-09-01", "Y"],
    [9, "Mefire Import", "yaounde", "+237 670 00 11 22", "2024-07-19", "Y"],
  ]);

const EXAMS_SQL = table(
  "CREATE TABLE exam_results (student_id TEXT, school TEXT, gender TEXT, birth_date TEXT, score REAL, absent INTEGER);", "exam_results", [
    ["S01", "College Horizon", "F", "2009-02-11", 14.5, 0], ["S02", "College Horizon", "M", "2008-11-30", 9, 0],
    ["S03", "College Horizon", "F", "2009-06-05", null, 1], ["S04", "College Horizon", "M", "2009-01-19", 11.25, 0],
    ["S05", "College Baobab", "F", "2008-09-14", 16, 0], ["S06", "College Baobab", "M", "2009-03-22", 7.5, 0],
    ["S07", "College Baobab", "F", "2009-07-08", 12, 0], ["S08", "College Soleil", "M", "2008-12-01", 8.75, 0],
    ["S09", "College Soleil", "F", "2009-04-17", 10, 0], ["S10", "College Soleil", "M", "2009-05-29", null, 1],
    ["S11", "College Soleil", "F", "2008-10-03", 13.5, 0], ["S12", "College Baobab", "M", "2009-08-25", 9.5, 0],
  ]);

const LOANS_SQL = table(
  "CREATE TABLE loans (loan_id INTEGER PRIMARY KEY, sector TEXT, amount INTEGER, monthly_income REAL, has_guarantor INTEGER, disbursed TEXT, repaid INTEGER);", "loans", [
    [1, "Commerce", 500000, 120000, 1, "2025-01-10", 1], [2, "Agriculture", 300000, 95000, 0, "2025-02-03", 0],
    [3, "Commerce", 800000, 210000, 1, "2025-02-20", 1], [4, "Transport", 1500000, 450000, 0, "2025-03-05", 1],
    [5, "Agriculture", 250000, 80000, 1, "2025-03-18", 1], [6, "Services", 600000, 175000, 0, "2025-04-02", 0],
    [7, "Commerce", 400000, 140000, 0, "2025-04-25", 0], [8, "Transport", 2000000, 520000, 1, "2025-05-12", 1],
    [9, "Services", 700000, 260000, 1, "2025-06-01", 1], [10, "Agriculture", 350000, 110000, 1, "2025-06-15", 0],
    [11, "Commerce", 900000, 390000, 0, "2025-07-07", 1], [12, "Services", 1200000, 410000, 0, "2025-08-19", 0],
    [13, "Transport", 1000000, 300000, 1, "2026-01-10", null], [14, "Commerce", 450000, 130000, 0, "2026-02-02", null],
  ]);

const ORDERS_SQL = table(
  "CREATE TABLE orders (order_id INTEGER PRIMARY KEY, order_ts TEXT, channel TEXT, status TEXT, amount INTEGER, delivery_days REAL);", "orders", [
    [1, "2026-07-01 09:14", "Web", "delivered", 45000, 2.5], [2, "2026-07-01 11:02", "WhatsApp", "delivered", 18000, 1],
    [3, "2026-07-02 15:40", "Store", "delivered", 32000, 0], [4, "2026-07-03 08:55", "Web", "cancelled", 27000, null],
    [5, "2026-07-03 19:21", "WhatsApp", "delivered", 64000, 1.5], [6, "2026-07-04 10:10", "Web", "returned", 51000, 3],
    [7, "2026-07-05 13:33", "Store", "delivered", 12500, 0], [8, "2026-07-05 21:47", "WhatsApp", "cancelled", 9000, null],
    [9, "2026-07-06 07:58", "Web", "delivered", 88000, 2], [10, "2026-07-07 12:12", "WhatsApp", "delivered", 23500, 0.5],
    [11, "2026-07-08 16:45", "Web", "delivered", 39000, 3.5], [12, "2026-07-09 09:30", "Store", "returned", 15000, 0],
    [13, "2026-07-10 18:05", "WhatsApp", "delivered", 41000, 1], [14, "2026-07-11 14:20", "Web", "cancelled", 56000, null],
  ]);

const STAR_SQL = [
  table("CREATE TABLE dim_product (product_id INTEGER PRIMARY KEY, product TEXT, category TEXT);", "dim_product", [
    [1, "Laptop 14 inch", "IT"], [2, "Laser printer", "IT"], [3, "Office chair", "Furniture"], [4, "Desk", "Furniture"], [5, "A4 paper (box)", "Supplies"]]),
  table("CREATE TABLE dim_branch (branch_id INTEGER PRIMARY KEY, city TEXT, opened TEXT);", "dim_branch", [
    [1, "Douala", "2018-03-01"], [2, "Yaounde", "2020-09-15"], [3, "Garoua", "2025-11-02"]]),
  table("CREATE TABLE fact_sales (date_key INTEGER, product_id INTEGER, branch_id INTEGER, qty INTEGER, unit_price REAL);", "fact_sales", [
    [20260112, 1, 1, 3, 385000], [20260120, 5, 1, 40, 3250.5], [20260203, 3, 2, 6, 78500], [20260215, 1, 2, 2, 385000],
    [20260228, 2, 1, 1, 145000], [20260305, 4, 3, 4, 120000], [20260318, 5, 2, 25, 3250.5], [20260329, 3, 1, 10, 78500],
    [20260402, 1, 3, 1, 385000], [20260410, 5, 3, 60, 3250.5]]),
].join("\n");

const HR_SQL = table(
  "CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, full_name TEXT, department TEXT, email TEXT, hire_date TEXT, salary INTEGER, manager_id INTEGER);", "employees", [
    [1, "Grace Ekane", "Finance", "g.ekane@example.cm", "2019-04-01", 850000, null], [2, "Paul Nana", "Finance", "p.nana@example.cm", "2021-09-13", 520000, 1],
    [3, "Aicha Bello", "Sales", "a.bello@example.cm", "2020-02-17", 610000, 1], [4, "Jean Mbarga", "Sales", null, "2022-06-06", 430000, 3],
    [5, "Clarisse Fouda", "Sales", "a.bello@example.cm", "2023-01-09", 415000, 3], [6, "Eric Tabi", "IT", "e.tabi@example.cm", "2027-03-01", 700000, 9],
    [7, "Linda Ayuk", "IT", "l.ayuk@example.cm", "2024-11-18", -650000, 1], [8, "Samuel Etoa", "HR", "s.etoa@example.cm", "2018-07-23", 560000, 1],
  ]);

const INTRO: Block = { type: "p", text: "Three exercises of increasing difficulty, from beginner to advanced. Each one uses a different dataset with its own mix of data types, so start by reading the data dictionary: most errors in real projects come from a column that is not the type you expected." };
const PLOT_SETUP = "import matplotlib\nmatplotlib.use(\"Agg\")\nimport matplotlib.pyplot as plt\nfrom matplotlib.ticker import PercentFormatter";

// ── Practice sets ─────────────────────────────────────────────────────────
export const DAS_PRACTICE: PracticeSet[] = [
  {
    key: "foundations", title: "Practice lab: querying and summarising data",
    anchors: ["The Analytics Lifecycle", "Framing Business Questions as Analytical Problems", "Overview of the Analytics Toolchain"],
    objectives: ["Filter rows on a yes/no flag stored as a number", "Count and average with conditions in a spreadsheet", "Calculate durations and rates from date-times and whole numbers"],
    blocks: [
      INTRO,
      { type: "h", text: "Exercise 1: Mobile money transactions" },
      dict([["tx_time", "Date and time (text)", "2026-05-04 08:12"], ["operator", "Text (category)", "MTN"], ["amount", "Whole number (FCFA)", "150000"], ["fee", "Decimal number (FCFA)", "1500.0"], ["success", "Yes/no flag (1 = yes, 0 = no)", "0"]]),
      { type: "sql", id: "das-pr-momo", level: "beginner", title: "Find the failed transfers", setup: MOMO_SQL,
        task: "List the transactions that **failed**, largest amount first. Columns: `tx_id`, `tx_time`, `operator`, `amount`.",
        starter: "SELECT *\nFROM momo_tx\n-- keep only the failed transactions\n",
        solution: "SELECT tx_id, tx_time, operator, amount\nFROM momo_tx\nWHERE success = 0\nORDER BY amount DESC;",
        hint: "The yes/no column is stored as a number: 1 means yes and 0 means no. Name the four columns after SELECT, then add WHERE and ORDER BY … DESC." },
      { type: "h", text: "Exercise 2: Customer satisfaction survey" },
      dict([["Respondent", "Text (ID)", "R01"], ["City", "Text (category)", "Douala"], ["Age", "Whole number", "34"], ["Satisfied", "Yes/No text", "Yes"], ["Score /10", "Decimal number", "8.5"]]),
      { type: "sheet", id: "das-pr-survey", level: "intermediate", title: "Summarise a satisfaction survey",
        task: "Fill **H2:H5**: the number of satisfied respondents, their share of all respondents, the average score in Douala and the average age of satisfied respondents.",
        data: [["Respondent", "City", "Age", "Satisfied", "Score /10", null, "Measure", "Result"],
          ["R01", "Douala", 34, "Yes", 8.5, null, "Satisfied (count)", null], ["R02", "Yaoundé", 27, "No", 4, null, "Satisfied (share)", null],
          ["R03", "Douala", 45, "Yes", 9, null, "Avg score, Douala", null], ["R04", "Garoua", 52, "No", 5.5, null, "Avg age, satisfied", null],
          ["R05", "Yaoundé", 31, "Yes", 7.5], ["R06", "Douala", 23, "No", 3.5], ["R07", "Bafoussam", 38, "Yes", 8], ["R08", "Yaoundé", 41, "Yes", 6.5]],
        editable: ["H2", "H3", "H4", "H5"],
        checks: [{ cell: "H2", equals: 5 }, { cell: "H3", equals: 0.625, tol: 0.001 }, { cell: "H4", equals: 7, tol: 0.01 }, { cell: "H5", equals: 37.8, tol: 0.01 }],
        hint: "Text answers are counted with COUNTIF(D2:D9,\"Yes\"). The share divides that by COUNTA(D2:D9). For averages with a condition use AVERAGEIF(range to test, condition, range to average).",
        solution: { H2: "=COUNTIF(D2:D9,\"Yes\")", H3: "=COUNTIF(D2:D9,\"Yes\")/COUNTA(D2:D9)", H4: "=AVERAGEIF(B2:B9,\"Douala\",E2:E9)", H5: "=AVERAGEIF(D2:D9,\"Yes\",C2:C9)" } },
      { type: "h", text: "Exercise 3: Intercity bus trips" },
      dict([["departure", "Date and time (text)", "2026-06-02 18:00"], ["arrival", "Date and time (text)", "2026-06-03 07:30"], ["seats", "Whole number", "45"], ["sold", "Whole number", "29"], ["price", "Whole number (FCFA)", "15000"]]),
      { type: "sql", id: "das-pr-bus", level: "advanced", title: "Occupancy and journey time", setup: BUS_SQL,
        task: "For every trip that left **less than 80% full**, show the occupancy in % (one decimal), the journey time in minutes and the ticket revenue, emptiest trip first. Columns: `route`, `occupancy`, `duration_min`, `revenue`.",
        starter: "SELECT route, sold, seats, departure, arrival\nFROM bus_trips;\n-- occupancy = sold / seats, duration from the two date-times\n",
        solution: "SELECT route,\n  ROUND(100.0 * sold / seats, 1) AS occupancy,\n  CAST(ROUND((julianday(arrival) - julianday(departure)) * 24 * 60) AS INTEGER) AS duration_min,\n  sold * price AS revenue\nFROM bus_trips\nWHERE 100.0 * sold / seats < 80\nORDER BY occupancy;",
        hint: "sold / seats divides two whole numbers, so SQL returns 0: multiply by 100.0 first. For minutes, use (julianday(arrival) - julianday(departure)) * 24 * 60. One trip arrives the next day." },
    ],
  },
  {
    key: "preparation", title: "Practice lab: cleaning messy data",
    anchors: ["Data Cleaning Techniques", "Data Transformation and Reshaping", "Python/pandas for Data Preparation"],
    objectives: ["Standardise text typed by hand before grouping", "Convert numbers stored as text into real numbers", "Fill missing values and aggregate by month in pandas"],
    blocks: [
      INTRO,
      { type: "h", text: "Exercise 1: Supplier register" },
      dict([["name", "Text", "Ets Kamga & Fils"], ["city", "Text typed by hand", " douala"], ["phone", "Text (may be empty)", "+237 677 12 34 56"], ["registered", "Date (text)", "2021-03-15"], ["active", "Y/N text (may be empty)", "Y"]]),
      { type: "sql", id: "das-pr-suppliers", level: "beginner", title: "Count suppliers per city", setup: SUPPLIERS_SQL,
        task: "The city names were typed by hand. Count the suppliers per city after removing extra spaces and writing every city in **capital letters**, most suppliers first. Columns: `city`, `suppliers`.",
        starter: "SELECT city, COUNT(*) AS suppliers\nFROM suppliers\nGROUP BY city;",
        solution: "SELECT UPPER(TRIM(city)) AS city, COUNT(*) AS suppliers\nFROM suppliers\nGROUP BY UPPER(TRIM(city))\nORDER BY suppliers DESC;",
        hint: "Run the starter first: \"Douala\", \" douala\" and \"DOUALA \" are counted separately. TRIM removes the spaces and UPPER fixes the case. Use the same expression in SELECT and GROUP BY." },
      { type: "h", text: "Exercise 2: Invoice export" },
      dict([["Invoice ref", "Text code (branch-year-number)", "DLA-2026-0142"], ["Amount (text)", "Number stored as text", "1 250 000 FCFA"], ["Year", "Whole number (to calculate)", "2026"], ["Amount", "Whole number (to calculate)", "1250000"]]),
      { type: "sheet", id: "das-pr-invoices", level: "intermediate", title: "Turn text into numbers",
        task: "An accounting export stored numbers as text. Fill **C2:C5** with the year taken from the reference, **D2:D5** with the amount as a real number, then **D6** with the total for 2026.",
        data: [["Invoice ref", "Amount (text)", "Year", "Amount"], ["DLA-2026-0142", "1 250 000 FCFA", null, null], ["YDE-2025-0550", "76 000 FCFA", null, null],
          ["BFM-2026-0013", "2 300 000 FCFA", null, null], ["DLA-2025-0981", "415 500 FCFA", null, null], [null, null, "Total 2026", null]],
        editable: ["C2", "C3", "C4", "C5", "D2", "D3", "D4", "D5", "D6"],
        checks: [{ cell: "C2", equals: 2026 }, { cell: "C3", equals: 2025 }, { cell: "C4", equals: 2026 }, { cell: "C5", equals: 2025 },
          { cell: "D2", equals: 1250000 }, { cell: "D3", equals: 76000 }, { cell: "D4", equals: 2300000 }, { cell: "D5", equals: 415500 }, { cell: "D6", equals: 3550000 }],
        hint: "MID(A2,5,4) takes 4 characters from position 5, but the result is still text: wrap it in VALUE(). For the amount, drop the last 5 characters (\" FCFA\") with LEFT(B2,LEN(B2)-5), then VALUE(). D6 is a SUMIF on the year column.",
        solution: { C2: "=VALUE(MID(A2,5,4))", C3: "=VALUE(MID(A3,5,4))", C4: "=VALUE(MID(A4,5,4))", C5: "=VALUE(MID(A5,5,4))",
          D2: "=VALUE(LEFT(B2,LEN(B2)-5))", D3: "=VALUE(LEFT(B3,LEN(B3)-5))", D4: "=VALUE(LEFT(B4,LEN(B4)-5))", D5: "=VALUE(LEFT(B5,LEN(B5)-5))", D6: "=SUMIF(C2:C5,2026,D2:D5)" } },
      { type: "h", text: "Exercise 3: Health facility stock" },
      dict([["date", "Date", "2026-04-02"], ["received", "Decimal number (may be empty)", "1200.0"], ["used", "Decimal number (may be empty)", "340.0"], ["unit_cost", "Decimal number (FCFA)", "850.0"], ["cold_chain", "True/False", "True"]]),
      { type: "python", id: "das-pr-stock", level: "advanced", title: "Stock value of cold-chain items",
        task: "Replace the missing quantities with 0, add a `month` column and a `net_value` column (received minus used, times unit cost), then total the net value per month for **cold-chain items only**. Keep the print line.",
        packages: ["pandas"], files: [{ name: "stock.csv", content: STOCK_CSV }], expect: "Cold-chain net value, May: -85000",
        cells: ["import pandas as pd\ndf = pd.read_csv(\"stock.csv\", parse_dates=[\"date\"])\ndf.dtypes", "df.isna().sum()",
          "# 1. Replace missing received/used with 0\n\n# 2. Add 'month' (text such as 2026-04) and 'net_value'\n\n# 3. Cold-chain items only, total net_value per month\nresult = ...\n\nprint(\"Cold-chain net value, May:\", int(result[\"2026-05\"]))\nresult"],
        solution: "df[[\"received\", \"used\"]] = df[[\"received\", \"used\"]].fillna(0)\ndf[\"month\"] = df[\"date\"].dt.strftime(\"%Y-%m\")\ndf[\"net_value\"] = (df[\"received\"] - df[\"used\"]) * df[\"unit_cost\"]\nresult = df[df[\"cold_chain\"]].groupby(\"month\")[\"net_value\"].sum()\n\nprint(\"Cold-chain net value, May:\", int(result[\"2026-05\"]))\nresult",
        hint: "fillna(0) on the two quantity columns; dt.strftime(\"%Y-%m\") gives the month; cold_chain is already True/False, so df[df[\"cold_chain\"]] keeps the cold-chain rows. Without fillna, one May row is silently dropped and the total is wrong." },
    ],
  },
  {
    key: "statistics", title: "Practice lab: statistics for business decisions",
    anchors: ["Descriptive Statistics in a Business Context", "Hypothesis Testing for Business Decisions", "Correlation and Regression Analysis"],
    objectives: ["Compare two groups in an A/B test", "Compute a t statistic from date-time differences", "Measure relationships with correlation and a fitted line"],
    blocks: [
      INTRO,
      { type: "h", text: "Exercise 1: SMS campaign A/B test" },
      dict([["Group", "Text (A or B)", "B"], ["Message", "Text", "Promo + customer name"], ["SMS sent", "Whole number", "2350"], ["Purchases", "Whole number", "141"], ["Conversion", "Percentage (to calculate)", "6.0%"]]),
      { type: "sheet", id: "das-pr-abtest", level: "beginner", title: "Which SMS works better?",
        task: "Fill **E2:E3** with each group's conversion rate (purchases divided by SMS sent), **E4** with the difference B minus A, and **E5** with the letter of the winning group.",
        data: [["Group", "Message", "SMS sent", "Purchases", "Conversion"], ["A", "Standard promo", 2400, 96, null], ["B", "Promo + customer name", 2350, 141, null],
          [null, null, null, "Uplift (B − A)", null], [null, null, null, "Winner", null]],
        editable: ["E2", "E3", "E4", "E5"],
        checks: [{ cell: "E2", equals: 0.04, tol: 0.0005 }, { cell: "E3", equals: 0.06, tol: 0.0005 }, { cell: "E4", equals: 0.02, tol: 0.0005 }, { cell: "E5", equals: "B" }],
        hint: "E2 is =D2/C2. The winner uses IF: =IF(E3>E2,\"B\",\"A\").",
        solution: { E2: "=D2/C2", E3: "=D3/C3", E4: "=E3-E2", E5: "=IF(E3>E2,\"B\",\"A\")" } },
      { type: "h", text: "Exercise 2: Courier delivery times" },
      dict([["parcel_id", "Text (ID)", "PX-1001"], ["courier", "Text (category)", "Rapide Express"], ["picked_up", "Date and time", "2026-06-01 08:30"], ["delivered", "Date and time", "2026-06-01 22:30"], ["fragile", "True/False", "False"]]),
      { type: "python", id: "das-pr-couriers", level: "intermediate", title: "Is one courier really faster?",
        task: "Compute each delivery time in hours from the two date-times, then the Welch t statistic comparing the two couriers. Keep the print line.",
        packages: ["pandas"], files: [{ name: "deliveries.csv", content: DELIVERIES_CSV }], expect: "t = 3.97",
        cells: ["import pandas as pd\nimport numpy as np\ndf = pd.read_csv(\"deliveries.csv\", parse_dates=[\"picked_up\", \"delivered\"])\ndf.dtypes",
          "# 1. Delivery time in hours\ndf[\"hours\"] = ...\n\n# 2. Mean, standard deviation and count per courier\nstats = df.groupby(\"courier\")[\"hours\"].agg([\"mean\", \"std\", \"count\"])\na, b = stats.iloc[0], stats.iloc[1]\n\n# 3. Welch t = (mean_a - mean_b) / sqrt(std_a² / n_a + std_b² / n_b)\nt = ...\n\nprint(f\"t = {t:.2f}\")\nstats"],
        solution: "df[\"hours\"] = (df[\"delivered\"] - df[\"picked_up\"]).dt.total_seconds() / 3600\n\nstats = df.groupby(\"courier\")[\"hours\"].agg([\"mean\", \"std\", \"count\"])\na, b = stats.iloc[0], stats.iloc[1]\n\nt = (a[\"mean\"] - b[\"mean\"]) / np.sqrt(a[\"std\"] ** 2 / a[\"count\"] + b[\"std\"] ** 2 / b[\"count\"])\n\nprint(f\"t = {t:.2f}\")\nstats",
        hint: "Subtracting two date-times gives a duration: .dt.total_seconds() / 3600 turns it into hours. With about 10 degrees of freedom, a t above 2.2 means the difference is unlikely to be chance (p < 0.05)." },
      { type: "h", text: "Exercise 3: Farm yields" },
      dict([["region", "Text (category)", "Ouest"], ["rainfall_mm", "Decimal number", "1850.5"], ["fertilizer_kg_ha", "Whole number", "120"], ["irrigated", "True/False", "True"], ["yield_t_ha", "Decimal number", "3.53"]]),
      { type: "python", id: "das-pr-farms", level: "advanced", title: "What drives maize yield?",
        task: "Find which variables move most closely with `yield_t_ha`, then fit a straight line of yield on fertilizer with numpy. Keep the print line.",
        packages: ["pandas"], files: [{ name: "farms.csv", content: FARMS_CSV }], expect: "Slope: 1.87",
        cells: ["import pandas as pd\nimport numpy as np\ndf = pd.read_csv(\"farms.csv\")\ndf.dtypes", "df.describe()",
          "# 1. Correlation of every numeric column with yield_t_ha, strongest first\ncorr = ...\n\n# 2. Straight line: yield_t_ha = slope * fertilizer_kg_ha + intercept\nslope, intercept = ...\n\nprint(f\"Slope: {slope * 100:.2f} t/ha per extra 100 kg of fertilizer\")\ncorr"],
        solution: "corr = df.corr(numeric_only=True)[\"yield_t_ha\"].drop(\"yield_t_ha\").sort_values(ascending=False)\nslope, intercept = np.polyfit(df[\"fertilizer_kg_ha\"], df[\"yield_t_ha\"], 1)\n\nprint(f\"Slope: {slope * 100:.2f} t/ha per extra 100 kg of fertilizer\")\ncorr",
        hint: "df.corr(numeric_only=True) skips the text columns; True/False counts as 1/0. np.polyfit(x, y, 1) returns the slope and the intercept. A strong correlation still does not prove that fertilizer causes the yield." },
    ],
  },
  {
    key: "exploration", title: "Practice lab: exploring data and preparing predictions",
    anchors: ["Exploratory Data Analysis Techniques", "Introductory Predictive Models"],
    objectives: ["Summarise a column that has missing values", "Compare groups with counts, averages and rates", "Build risk bands and repayment rates while excluding unfinished cases"],
    blocks: [
      INTRO,
      { type: "h", text: "Exercise 1: Hospital waiting times" },
      dict([["Patient", "Text (ID)", "P-001"], ["Arrival", "Time (text)", "07:45"], ["Triage", "Text (category)", "Urgent"], ["Wait (min)", "Decimal number (may be empty)", "37.5"]]),
      { type: "sheet", id: "das-pr-waits", level: "beginner", title: "Waiting time statistics",
        task: "One patient left before being seen, so the wait is empty. Fill **G2:G5** with the mean wait, the median wait, the number of patients with a recorded wait and the mean wait of urgent patients.",
        data: [["Patient", "Arrival", "Triage", "Wait (min)", null, "Measure", "Value"],
          ["P-001", "07:45", "Urgent", 5.5, null, "Mean wait", null], ["P-002", "08:10", "Normal", 42, null, "Median wait", null],
          ["P-003", "08:25", "Normal", 37.5, null, "Patients with a wait", null], ["P-004", "08:40", "Urgent", 8, null, "Mean wait, urgent", null],
          ["P-005", "09:05", "Normal", null], ["P-006", "09:20", "Normal", 55], ["P-007", "09:50", "Urgent", 12.5], ["P-008", "10:15", "Normal", 28]],
        editable: ["G2", "G3", "G4", "G5"],
        checks: [{ cell: "G2", equals: 26.9286, tol: 0.01 }, { cell: "G3", equals: 28 }, { cell: "G4", equals: 7 }, { cell: "G5", equals: 8.6667, tol: 0.01 }],
        hint: "AVERAGE, MEDIAN and COUNT skip empty cells, which is what you want here. For urgent patients: AVERAGEIF(C2:C9,\"Urgent\",D2:D9).",
        solution: { G2: "=AVERAGE(D2:D9)", G3: "=MEDIAN(D2:D9)", G4: "=COUNT(D2:D9)", G5: "=AVERAGEIF(C2:C9,\"Urgent\",D2:D9)" } },
      { type: "h", text: "Exercise 2: Exam results" },
      dict([["student_id", "Text (ID)", "S01"], ["gender", "Text (F or M)", "F"], ["birth_date", "Date (text)", "2009-02-11"], ["score", "Decimal number out of 20 (may be empty)", "11.25"], ["absent", "Yes/no flag (1 = yes, 0 = no)", "1"]]),
      { type: "sql", id: "das-pr-exams", level: "intermediate", title: "Compare schools fairly", setup: EXAMS_SQL,
        task: "For each school, count the students who **sat** the exam, their average score (2 decimals) and the pass rate in % (1 decimal; a pass is 10/20 or more). Absent students must not count. Best average first. Columns: `school`, `candidates`, `avg_score`, `pass_rate`.",
        starter: "SELECT school, COUNT(*) AS candidates, AVG(score) AS avg_score\nFROM exam_results\nGROUP BY school;",
        solution: "SELECT school,\n  COUNT(*) AS candidates,\n  ROUND(AVG(score), 2) AS avg_score,\n  ROUND(100.0 * SUM(CASE WHEN score >= 10 THEN 1 ELSE 0 END) / COUNT(*), 1) AS pass_rate\nFROM exam_results\nWHERE absent = 0\nGROUP BY school\nORDER BY avg_score DESC;",
        hint: "Filter absent students with WHERE absent = 0 before grouping. Count passes with SUM(CASE WHEN score >= 10 THEN 1 ELSE 0 END), multiply by 100.0 and divide by COUNT(*)." },
      { type: "h", text: "Exercise 3: Microfinance loans" },
      dict([["monthly_income", "Decimal number (FCFA)", "175000.0"], ["has_guarantor", "Yes/no flag (1 = yes, 0 = no)", "1"], ["disbursed", "Date (text)", "2025-04-02"], ["repaid", "Yes/no flag, empty while the loan is running", "NULL"]]),
      { type: "sql", id: "das-pr-loans", level: "advanced", title: "Repayment rate by risk band", setup: LOANS_SQL,
        task: "Using **finished loans only**, show the repayment rate in % (1 decimal) for each income band and guarantor status. Bands: Low below 150 000, Middle up to 399 999, High from 400 000. Sort by band (Low, Middle, High), then guarantor. Columns: `income_band`, `has_guarantor`, `loans`, `repay_rate`.",
        starter: "SELECT monthly_income, has_guarantor, repaid\nFROM loans;\n-- build the bands with CASE WHEN … END\n",
        solution: "SELECT\n  CASE WHEN monthly_income < 150000 THEN 'Low'\n       WHEN monthly_income < 400000 THEN 'Middle'\n       ELSE 'High' END AS income_band,\n  has_guarantor,\n  COUNT(*) AS loans,\n  ROUND(100.0 * AVG(repaid), 1) AS repay_rate\nFROM loans\nWHERE repaid IS NOT NULL\nGROUP BY income_band, has_guarantor\nORDER BY CASE income_band WHEN 'Low' THEN 1 WHEN 'Middle' THEN 2 ELSE 3 END, has_guarantor;",
        hint: "A running loan has repaid = NULL: use WHERE repaid IS NOT NULL (= NULL never matches). The average of a 1/0 column is a rate. Sorting the text alphabetically would put High first, so sort with a CASE that numbers the bands." },
    ],
  },
  {
    key: "visualisation", title: "Practice lab: preparing data for charts and dashboards",
    anchors: ["Principles of Effective Data Visualization", "Dashboard Design and Development", "Data Storytelling for Executives"],
    objectives: ["Compute month-over-month change before charting a trend", "Build a KPI table for a dashboard from order statuses", "Rank categories with the right rate and highlight the finding in a chart"],
    blocks: [
      INTRO,
      { type: "h", text: "Exercise 1: Hotel electricity use" },
      dict([["Month", "Text", "Jan"], ["kWh", "Decimal number", "1985.25"], ["Change", "Percentage (to calculate)", "-7.0%"]]),
      { type: "sheet", id: "das-pr-energy", level: "beginner", title: "Month-over-month change",
        task: "Before charting the trend, fill **C3:C7** with the change from the previous month, as a share (for example −0.07), and **B8** with the total for the half-year.",
        data: [["Month", "kWh", "Change"], ["Jan", 1840.5, null], ["Feb", 1712, null], ["Mar", 1985.25, null], ["Apr", 2210, null], ["May", 2105.75, null], ["Jun", 1950, null], ["Total", null, null]],
        editable: ["C3", "C4", "C5", "C6", "C7", "B8"],
        checks: [{ cell: "C3", equals: -0.0698, tol: 0.001 }, { cell: "C4", equals: 0.1596, tol: 0.001 }, { cell: "C5", equals: 0.1132, tol: 0.001 },
          { cell: "C6", equals: -0.0472, tol: 0.001 }, { cell: "C7", equals: -0.074, tol: 0.001 }, { cell: "B8", equals: 11803.5 }],
        hint: "Change = (this month − previous month) / previous month. C3 is =(B3-B2)/B2. B8 is =SUM(B2:B7).",
        solution: { C3: "=(B3-B2)/B2", C4: "=(B4-B3)/B3", C5: "=(B5-B4)/B4", C6: "=(B6-B5)/B5", C7: "=(B7-B6)/B6", B8: "=SUM(B2:B7)" } },
      { type: "h", text: "Exercise 2: Online shop orders" },
      dict([["order_ts", "Date and time (text)", "2026-07-03 19:21"], ["channel", "Text (category)", "WhatsApp"], ["status", "Text (delivered, cancelled, returned)", "cancelled"], ["amount", "Whole number (FCFA)", "64000"], ["delivery_days", "Decimal number (may be empty)", "1.5"]]),
      { type: "sql", id: "das-pr-orders", level: "intermediate", title: "KPI table for a sales dashboard", setup: ORDERS_SQL,
        task: "Per channel, show the number of orders, the revenue from **delivered** orders only, the cancellation rate in % (1 decimal) and the average delivery time in days (1 decimal; empty values are ignored). Highest revenue first. Columns: `channel`, `orders`, `revenue`, `cancel_rate`, `avg_days`.",
        starter: "SELECT channel, COUNT(*) AS orders, SUM(amount) AS revenue\nFROM orders\nGROUP BY channel;",
        solution: "SELECT channel,\n  COUNT(*) AS orders,\n  SUM(CASE WHEN status = 'delivered' THEN amount ELSE 0 END) AS revenue,\n  ROUND(100.0 * SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 1) AS cancel_rate,\n  ROUND(AVG(delivery_days), 1) AS avg_days\nFROM orders\nGROUP BY channel\nORDER BY revenue DESC;",
        hint: "Put the condition inside the sum: SUM(CASE WHEN status = 'delivered' THEN amount ELSE 0 END). Do not filter with WHERE, or the cancelled orders disappear from the rate. AVG already ignores NULL." },
      { type: "h", text: "Exercise 3: Social media campaign" },
      dict([["platform", "Text (category)", "WhatsApp Status"], ["posted_at", "Date and time", "2026-08-07 10:00"], ["format", "Text (video, image, text)", "image"], ["impressions", "Whole number", "9000"], ["engagements", "Whole number", "540"], ["boosted", "True/False", "False"]]),
      { type: "python", id: "das-pr-social", level: "advanced", title: "Which platform engages best?",
        task: "Compute the engagement rate per platform (total engagements divided by total impressions), draw a sorted horizontal bar chart that highlights the best platform, and give it a title that states the finding. Keep the print line.",
        packages: ["pandas", "matplotlib"], files: [{ name: "posts.csv", content: POSTS_CSV }], expect: "Best platform: WhatsApp Status (6.1%)",
        cells: [`import pandas as pd\n${PLOT_SETUP}\ndf = pd.read_csv("posts.csv", parse_dates=["posted_at"])\ndf.head()`,
          "# 1. Engagement rate per platform = total engagements / total impressions (sorted)\nrate = ...\n\n# 2. Horizontal bars: best platform in #3987e5, the others in #9AA3B5, a title that states the finding\n\nbest = rate.idxmax()\nprint(f\"Best platform: {best} ({rate.max():.1%})\")"],
        solution: "g = df.groupby(\"platform\")[[\"engagements\", \"impressions\"]].sum()\nrate = (g[\"engagements\"] / g[\"impressions\"]).sort_values()\n\ncolors = [\"#3987e5\" if p == rate.idxmax() else \"#9AA3B5\" for p in rate.index]\nax = rate.plot(kind=\"barh\", color=colors, figsize=(7, 3.5))\nax.xaxis.set_major_formatter(PercentFormatter(1.0))\nax.set_title(f\"{rate.idxmax()} earns the highest engagement rate\")\nax.set_xlabel(\"Engagement rate\")\nax.set_ylabel(\"\")\nplt.tight_layout()\n\nbest = rate.idxmax()\nprint(f\"Best platform: {best} ({rate.max():.1%})\")",
        hint: "Sum first, then divide. Averaging the rate of each post gives a different winner, because one small TikTok post with a very high rate weighs as much as a post seen 50 000 times." },
    ],
  },
  {
    key: "bi", title: "Practice lab: KPIs, data models and data quality",
    anchors: ["Designing KPI Frameworks", "BI Architecture: Source to Dashboard", "Governance of Self-Service BI"],
    objectives: ["Look up targets from a reference table", "Query a star schema with a numeric date key", "Audit a dataset against quality rules before certifying it"],
    blocks: [
      INTRO,
      { type: "h", text: "Exercise 1: Branch targets" },
      dict([["Branch", "Text code", "DLA"], ["Actual (M FCFA)", "Decimal number", "182.4"], ["Target", "Looked up from another table", "200"], ["% of target", "Percentage (to calculate)", "91.2%"]]),
      { type: "sheet", id: "das-pr-targets", level: "beginner", title: "Look up targets with VLOOKUP",
        task: "The targets are in a separate table (F:G) in a different order. Fill **C2:C5** with each branch's target using VLOOKUP, then **D2:D5** with the actual as a share of target.",
        data: [["Branch", "Actual (M FCFA)", "Target", "% of target", null, "Code", "Target"],
          ["DLA", 182.4, null, null, null, "YDE", 140], ["YDE", 150, null, null, null, "GRA", 40], ["BFM", 61.75, null, null, null, "DLA", 200], ["GRA", 38.2, null, null, null, "BFM", 75]],
        editable: ["C2", "C3", "C4", "C5", "D2", "D3", "D4", "D5"],
        checks: [{ cell: "C2", equals: 200 }, { cell: "C3", equals: 140 }, { cell: "C4", equals: 75 }, { cell: "C5", equals: 40 },
          { cell: "D2", equals: 0.912, tol: 0.001 }, { cell: "D3", equals: 1.0714, tol: 0.001 }, { cell: "D4", equals: 0.8233, tol: 0.001 }, { cell: "D5", equals: 0.955, tol: 0.001 }],
        hint: "=VLOOKUP(A2,$F$2:$G$5,2,FALSE) looks for DLA in column F and returns column 2 of that table. FALSE asks for an exact match. Then D2 is =B2/C2.",
        solution: { C2: "=VLOOKUP(A2,$F$2:$G$5,2,FALSE)", C3: "=VLOOKUP(A3,$F$2:$G$5,2,FALSE)", C4: "=VLOOKUP(A4,$F$2:$G$5,2,FALSE)", C5: "=VLOOKUP(A5,$F$2:$G$5,2,FALSE)",
          D2: "=B2/C2", D3: "=B3/C3", D4: "=B4/C4", D5: "=B5/C5" } },
      { type: "h", text: "Exercise 2: Sales star schema" },
      dict([["fact_sales.date_key", "Date as a number (YYYYMMDD)", "20260318"], ["fact_sales.qty", "Whole number", "25"], ["fact_sales.unit_price", "Decimal number (FCFA)", "3250.5"], ["dim_product.category", "Text (category)", "Supplies"], ["dim_branch.opened", "Date (text)", "2020-09-15"]]),
      { type: "sql", id: "das-pr-star", level: "intermediate", title: "Revenue from a star schema", setup: STAR_SQL,
        task: "Show the Q1 2026 revenue (quantity times unit price, rounded to whole FCFA) for each product category and branch city, highest first. Columns: `category`, `city`, `revenue`.",
        starter: "SELECT *\nFROM fact_sales f\n-- join dim_product and dim_branch\n",
        solution: "SELECT p.category, b.city, ROUND(SUM(f.qty * f.unit_price)) AS revenue\nFROM fact_sales f\nJOIN dim_product p ON p.product_id = f.product_id\nJOIN dim_branch b ON b.branch_id = f.branch_id\nWHERE f.date_key BETWEEN 20260101 AND 20260331\nGROUP BY p.category, b.city\nORDER BY revenue DESC;",
        hint: "Join the fact table to both dimensions on their IDs. The date is a number such as 20260318, so Q1 is BETWEEN 20260101 AND 20260331. Two April rows must not count." },
      { type: "h", text: "Exercise 3: HR dataset audit" },
      dict([["email", "Text (may be empty)", "a.bello@example.cm"], ["hire_date", "Date (text)", "2023-01-09"], ["salary", "Whole number (FCFA)", "415000"], ["manager_id", "Whole number, refers to emp_id (may be empty)", "3"]]),
      { type: "sql", id: "das-pr-audit", level: "advanced", title: "Audit data quality before certifying", setup: HR_SQL,
        task: "List every problem, one row per problem: a missing email, an email used twice, a hire date after 2026-09-30, a salary of 0 or less, or a manager that does not exist. Use exactly these labels: `missing email`, `duplicate email`, `future hire date`, `invalid salary`, `unknown manager`. Sort by employee, then issue. Columns: `emp_id`, `issue`.",
        starter: "SELECT emp_id, 'missing email' AS issue\nFROM employees\nWHERE email IS NULL\n-- add the other rules with UNION ALL\n",
        solution: "SELECT emp_id, 'missing email' AS issue FROM employees WHERE email IS NULL\nUNION ALL\nSELECT emp_id, 'duplicate email' FROM employees\n  WHERE email IN (SELECT email FROM employees GROUP BY email HAVING COUNT(*) > 1)\nUNION ALL\nSELECT emp_id, 'future hire date' FROM employees WHERE hire_date > '2026-09-30'\nUNION ALL\nSELECT emp_id, 'invalid salary' FROM employees WHERE salary <= 0\nUNION ALL\nSELECT e.emp_id, 'unknown manager' FROM employees e\n  LEFT JOIN employees m ON m.emp_id = e.manager_id\n  WHERE e.manager_id IS NOT NULL AND m.emp_id IS NULL\nORDER BY emp_id, issue;",
        hint: "Write one small SELECT per rule and stack them with UNION ALL. Duplicates: email IN (SELECT email … GROUP BY email HAVING COUNT(*) > 1). Unknown manager: join the table to itself with LEFT JOIN and keep rows where no manager was found. Dates stored as YYYY-MM-DD text can be compared as text." },
    ],
  },
];
