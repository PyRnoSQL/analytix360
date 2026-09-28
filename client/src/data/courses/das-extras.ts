import type { Block } from "../../lms/types";

// Interactive additions for the DAS lessons in das.ts, matched by each lesson's <h2> heading.
// The original lesson text stays as written; these add objectives, a quick check,
// a practice task and workplace notes around it.

export interface LessonExtras { objectives: string[]; blocks: Block[] }

// ── Sample data shared by the labs (sales in FCFA; one amount is missing on purpose) ──
const SALES_ROWS: [number, string, string, string, number | null][] = [
  [1, "2026-01-08", "Littoral", "Rice 25 kg", 1250000], [2, "2026-01-15", "Centre", "Cooking oil 5 L", 980000],
  [3, "2026-01-22", "Ouest", "Rice 25 kg", 420000], [4, "2026-02-03", "Littoral", "Sugar 50 kg", 760000],
  [5, "2026-02-11", "Centre", "Rice 25 kg", 310000], [6, "2026-02-19", "Ouest", "Cooking oil 5 L", 505000],
  [7, "2026-03-02", "Littoral", "Cooking oil 5 L", 390000], [8, "2026-03-09", "Centre", "Sugar 50 kg", 845000],
  [9, "2026-03-17", "Nord", "Rice 25 kg", 610000], [10, "2026-03-24", "Nord", "Sugar 50 kg", null],
  [11, "2026-04-06", "Littoral", "Rice 25 kg", 1120000], [12, "2026-04-14", "Ouest", "Sugar 50 kg", 275000],
];
const SALES_SQL = "CREATE TABLE sales (id INTEGER PRIMARY KEY, sale_date TEXT, region TEXT, product TEXT, amount INTEGER);\n" +
  SALES_ROWS.map(([id, d, r, pr, a]) => `INSERT INTO sales VALUES (${id}, '${d}', '${r}', '${pr}', ${a ?? "NULL"});`).join("\n");
const REGIONS_SQL = "CREATE TABLE regions (region TEXT PRIMARY KEY, manager TEXT, target INTEGER);\n" +
  "INSERT INTO regions VALUES ('Littoral', 'A. Ngo Bassa', 3000000);\nINSERT INTO regions VALUES ('Centre', 'P. Fotso', 2000000);\n" +
  "INSERT INTO regions VALUES ('Ouest', 'M. Atangana', 1500000);\nINSERT INTO regions VALUES ('Nord', 'H. Bello', 1000000);";
const SALES_CSV = "id,sale_date,region,product,amount\n" + SALES_ROWS.map(([id, d, r, pr, a]) => `${id},${d},${r},${pr},${a ?? ""}`).join("\n");


const PANDAS = { label: "pandas user guide", url: "https://pandas.pydata.org/docs/user_guide/index.html", source: "pandas.pydata.org" };
const POWERBI = { label: "Power BI documentation", url: "https://learn.microsoft.com/en-us/power-bi/", source: "Microsoft Learn" };
const POSTGRES = { label: "PostgreSQL tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html", source: "postgresql.org" };

export const DAS_EXTRAS: Record<string, LessonExtras> = {
  "The Analytics Lifecycle": {
    objectives: [
      "Name the four types of analytics and the question each one answers",
      "Place a real report or project on the analytics maturity curve",
      "Explain why moving up the curve creates more value for decision-makers",
    ],
    blocks: [
      { type: "check", id: "das-x-lifecycle", question: "A telecom operator builds a model that estimates which subscribers are likely to leave next month. Which type of analytics is this?", options: ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"], answer: 2, explain: "Estimating what will happen next month is predictive. It would become prescriptive if the model also recommended which retention offer to send each subscriber." },
      { type: "callout", tone: "workplace", title: "In the workplace", text: "Most ministries and companies in Cameroon still work mainly at the descriptive level: monthly reports and activity summaries. Adding one diagnostic question to each report (\"why did this change?\") is the quickest way to show the value of analytics to your managers." },
      { type: "task", id: "das-t-lifecycle", title: "Practice", items: [
        "List three reports your organisation produces today",
        "Classify each one as descriptive, diagnostic, predictive or prescriptive",
        "For one of them, write the diagnostic question it should answer next",
      ] },
    ],
  },
  "Framing Business Questions as Analytical Problems": {
    objectives: [
      "Turn a vague request into a specific, measurable analytical question",
      "Define the metric, data and time period before touching any data",
      "Link every analysis to the decision it supports",
    ],
    blocks: [
      { type: "check", id: "das-x-framing", question: "Your director says: \"Sales are bad in the regions.\" Which is the best analytical translation?", options: ["\"Are sales bad?\"", "\"Which regions had the largest drop in monthly revenue in FCFA between Q1 and Q2 2026, and which product lines drove it?\"", "\"Let's build a dashboard of everything\"", "\"How can we sell more?\""], answer: 1, explain: "It is specific (regions, product lines), measurable (revenue in FCFA), time-bound (Q1 to Q2 2026) and leads to action (focus on the lines that drove the drop)." },
      { type: "task", id: "das-t-framing", title: "Practice", items: [
        "Pick one vague question you have heard at work this month",
        "Rewrite it using the SMART framework",
        "Write down the metric, the data source and the decision the answer enables",
      ] },
    ],
  },
  "Overview of the Analytics Toolchain": {
    objectives: [
      "Describe what spreadsheets, SQL, BI tools and Python are each best at",
      "Choose the right tool for a given task and data size",
      "Plan how the tools hand work to each other in one project",
    ],
    blocks: [
      { type: "check", id: "das-x-toolchain", question: "You must share a weekly view of sales by branch that managers can filter themselves. Which tool fits best?", options: ["A Python script sent by e-mail", "A Power BI or Tableau dashboard", "A long SQL query", "A printed Excel table"], answer: 1, explain: "Interactive BI dashboards let non-technical managers filter and explore on their own, and they refresh automatically from the data source." },
      { type: "callout", tone: "tip", title: "One project, several tools", text: "A typical flow is SQL to extract the data, Python or Power Query to clean it, and Power BI to present it. You rarely use just one tool from start to finish." },
      { type: "sql", id: "das-lab-sql-select", title: "Your first query", task: "List every sale in the **Littoral** region, largest amount first.",
        setup: SALES_SQL, starter: "SELECT *\nFROM sales\n-- add a WHERE clause and an ORDER BY\n", solution: "SELECT *\nFROM sales\nWHERE region = 'Littoral'\nORDER BY amount DESC;",
        hint: "Text values go in single quotes: WHERE region = 'Littoral'. Sort with ORDER BY amount DESC." },
      { type: "task", id: "das-t-toolchain", title: "Practice", items: [
        "Install or open Excel, a SQL client and Python (Anaconda or VS Code) on your computer",
        "Note which tools your organisation already has licences for",
        "Map one recurring report to the tools you would use at each step",
      ] },
      { type: "links", items: [POWERBI, PANDAS] },
    ],
  },
  "Data Cleaning Techniques": {
    objectives: [
      "Detect and treat missing values, duplicates and outliers",
      "Apply the same cleaning steps in Excel and in SQL",
      "Keep a cleaning log so your results can be checked",
    ],
    blocks: [
      { type: "check", id: "das-x-cleaning", question: "A health district dataset has 3 rows for the same patient visit, identical except for the entry time. What should you do first?", options: ["Delete the whole column", "Keep one row per visit using a rule you document, such as the earliest entry", "Average all three rows", "Leave them; duplicates never affect results"], answer: 1, explain: "Duplicates inflate counts such as visits or cases. Decide which row to keep, apply the rule consistently, and record it in your cleaning log." },
      { type: "callout", tone: "workplace", title: "In the workplace", text: "Data entered by hand in districts and branches often mixes \"Douala\", \"DOUALA\" and \"Dla\". Standardise text values (TRIM, UPPER, a lookup table of correct names) before counting by location." },
      { type: "sql", id: "das-lab-sql-clean", title: "Totals despite a missing value", task: "Show the **total sales per region**, counting the missing amount as 0, from the highest total to the lowest.",
        setup: SALES_SQL, starter: "SELECT region, SUM(amount) AS total\nFROM sales\nGROUP BY region;", solution: "SELECT region, SUM(COALESCE(amount, 0)) AS total\nFROM sales\nGROUP BY region\nORDER BY total DESC;",
        hint: "Wrap the column in COALESCE(amount, 0), then add ORDER BY total DESC." },
      { type: "task", id: "das-t-cleaning", title: "Practice", items: [
        "Open a real or sample dataset and count missing values per column",
        "Remove duplicates using Excel's Remove Duplicates or ROW_NUMBER() in SQL",
        "Flag outliers with the IQR rule and decide whether to keep them",
        "Write a five-line cleaning log describing what you changed",
      ] },
    ],
  },
  "Data Transformation and Reshaping": {
    objectives: [
      "Filter, sort, aggregate, pivot and join data for analysis",
      "Convert text dates and numbers into proper data types",
      "Record transformations in Power Query so they can be refreshed",
    ],
    blocks: [
      { type: "check", id: "das-x-reshape", question: "You receive monthly sales with one column per month (Jan, Feb, Mar…). To chart the trend, you should first:", options: ["Delete all months except the last", "Unpivot the month columns into rows (Month, Sales)", "Sort by product name", "Convert the file to PDF"], answer: 1, explain: "Charts and time analysis need long format: one row per product per month. Unpivot in Power Query or use pandas.melt()." },
      { type: "sheet", id: "das-lab-sheet-sumif", title: "Totals per region with SUMIF", task: "Fill **E2:E4** with each region's total using SUMIF, and **E5** with the grand total.",
        data: [["Region", "Sales (FCFA)", null, "Region", "Total"], ["Littoral", 1250000, null, "Littoral", null], ["Centre", 980000, null, "Centre", null], ["Ouest", 420000, null, "Ouest", null],
          ["Littoral", 760000, null, "All regions", null], ["Centre", 310000, null, null, null], ["Ouest", 505000, null, null, null], ["Littoral", 390000, null, null, null], ["Centre", 845000, null, null, null]],
        editable: ["E2", "E3", "E4", "E5"],
        checks: [{ cell: "E2", equals: 2400000 }, { cell: "E3", equals: 2135000 }, { cell: "E4", equals: 925000 }, { cell: "E5", equals: 5460000 }],
        hint: "In E2 type =SUMIF($A$2:$A$9,D2,$B$2:$B$9), then adapt it for E3 and E4. E5 is a plain =SUM(B2:B9).",
        solution: { E2: "=SUMIF($A$2:$A$9,D2,$B$2:$B$9)", E3: "=SUMIF($A$2:$A$9,D3,$B$2:$B$9)", E4: "=SUMIF($A$2:$A$9,D4,$B$2:$B$9)", E5: "=SUM(B2:B9)" } },
      { type: "task", id: "das-t-reshape", title: "Practice", items: [
        "Load a wide monthly table into Power Query (Data › Get & Transform)",
        "Unpivot the month columns and set the correct data types",
        "Close & Load, then refresh after adding a new month to the source",
      ] },
    ],
  },
  "Python/pandas for Data Preparation": {
    objectives: [
      "Load, inspect and clean a dataset with pandas",
      "Create new columns and aggregate by group",
      "Explain why scripted cleaning is more reliable than manual steps",
    ],
    blocks: [
      { type: "check", id: "das-x-pandas", question: "Which pandas command shows column types and missing values in one view?", options: ["df.head()", "df.info()", "df.plot()", "df.to_csv()"], answer: 1, explain: "df.info() lists each column with its non-null count and data type, which is the fastest first check of a new dataset." },
      { type: "python", id: "das-lab-py-pandas", title: "pandas in action", task: "Run the three cells. Then change the last cell to show the **average** amount per region instead of the total.",
        packages: ["pandas"], files: [{ name: "sales.csv", content: SALES_CSV }],
        cells: ["import pandas as pd\ndf = pd.read_csv(\"sales.csv\")\ndf.head()", "df.info()", "# Total sales per region, largest first\ndf.groupby(\"region\")[\"amount\"].sum().sort_values(ascending=False)"],
        hint: "Replace .sum() with .mean(). Missing values are skipped automatically.",
        solution: "# Average sale per region, largest first\ndf.groupby(\"region\")[\"amount\"].mean().round(0).sort_values(ascending=False)" },
      { type: "task", id: "das-t-pandas", title: "Practice", items: [
        "Load a CSV file with pd.read_csv and run df.info() and df.describe()",
        "Fill or drop missing values and remove duplicate IDs",
        "Group by month and compute total, average and count of sales",
      ] },
      { type: "links", items: [PANDAS] },
    ],
  },
  "Descriptive Statistics in a Business Context": {
    objectives: [
      "Choose between mean, median and mode for a given business measure",
      "Describe spread with range, standard deviation and IQR",
      "Recognise normal and skewed distributions in real data",
    ],
    blocks: [
      { type: "check", id: "das-x-descriptive", question: "Monthly mobile money transfers per customer range from 500 FCFA to 12 000 000 FCFA, with most customers near 40 000 FCFA. Which figure best describes a typical customer?", options: ["The mean", "The median", "The range", "The maximum"], answer: 1, explain: "A few very large senders pull the mean upwards. The median is not affected by extreme values, so it represents the typical customer better." },
      { type: "explorer", id: "das-lab-dist", kind: "distribution" },
      { type: "sheet", id: "das-lab-sheet-stats", title: "Mean, median and the outlier", task: "Ten baskets from a Douala shop, one of them a wholesale order. Fill **E2:E4** with the mean, the median and the maximum.",
        data: [["Basket", "Amount (FCFA)", null, "Measure", "Value"], [1, 12500, null, "Mean", null], [2, 18000, null, "Median", null], [3, 22000, null, "Maximum", null], [4, 15500], [5, 30000], [6, 9500], [7, 26000], [8, 14000], [9, 21000], [10, 185000]],
        editable: ["E2", "E3", "E4"],
        checks: [{ cell: "E2", equals: 35350 }, { cell: "E3", equals: 19500 }, { cell: "E4", equals: 185000 }],
        hint: "=AVERAGE(B2:B11), =MEDIAN(B2:B11) and =MAX(B2:B11). Compare the mean and the median: which one describes a typical basket?",
        solution: { E2: "=AVERAGE(B2:B11)", E3: "=MEDIAN(B2:B11)", E4: "=MAX(B2:B11)" } },
      { type: "task", id: "das-t-descriptive", title: "Practice", items: [
        "Compute mean, median, standard deviation and quartiles for one numeric column",
        "Draw a histogram and describe its shape in one sentence",
        "Explain to a non-technical colleague why you reported the median",
      ] },
    ],
  },
  "Exploratory Data Analysis Techniques": {
    objectives: [
      "Run a structured EDA checklist on a new dataset",
      "Spot patterns, anomalies and relationships with charts",
      "Turn EDA findings into hypotheses to test",
    ],
    blocks: [
      { type: "check", id: "das-x-eda", question: "During EDA you notice sales spike every year in December and in the month before school starts. What should you record?", options: ["Nothing, spikes are noise", "A seasonal pattern to include in forecasts and to test further", "An error to delete", "A reason to stop the analysis"], answer: 1, explain: "Repeating spikes at the same time each year are seasonality. EDA is where you notice them; later analysis confirms and models them." },
      { type: "python", id: "das-lab-py-eda", title: "A first EDA pass", task: "Run the cells to summarise the data and draw a histogram of sale amounts.",
        packages: ["pandas", "matplotlib"], files: [{ name: "sales.csv", content: SALES_CSV }],
        cells: ["import pandas as pd\ndf = pd.read_csv(\"sales.csv\")\ndf.isnull().sum()", "df[\"amount\"].describe()",
          "import matplotlib\nmatplotlib.use(\"Agg\")\nimport matplotlib.pyplot as plt\nax = df[\"amount\"].plot(kind=\"hist\", bins=6, title=\"Sale amounts (FCFA)\", color=\"#3987e5\")\nax.set_xlabel(\"FCFA\")\nplt.tight_layout()"],
        hint: "The first cell counts missing values per column: you should find one in amount." },
      { type: "task", id: "das-t-eda", title: "Practice", items: [
        "Check shape, types and missing values of a dataset",
        "Plot histograms of every numeric column and a correlation heatmap",
        "Write three hypotheses your EDA suggests",
      ] },
    ],
  },
  "Correlation and Regression Analysis": {
    objectives: [
      "Interpret the strength and direction of a correlation",
      "Fit and read a simple linear regression",
      "Avoid confusing correlation with causation",
    ],
    blocks: [
      { type: "check", id: "das-x-regression", question: "A regression of monthly revenue (in million FCFA) on advertising spend (in million FCFA) gives a slope of 3.2. What does it mean?", options: ["Advertising causes all revenue", "Each extra million FCFA of advertising is associated with about 3.2 million FCFA more revenue", "Revenue is 3.2 times advertising", "The model is 3.2% accurate"], answer: 1, explain: "The slope is the expected change in Y for one unit of X. It shows association; proving causation needs an experiment or more careful design." },
      { type: "explorer", id: "das-lab-corr", kind: "correlation" },
      { type: "task", id: "das-t-regression", title: "Practice", items: [
        "Draw a scatter plot of two related business variables",
        "Add a trendline in Excel and display R²",
        "Fit the same model in Python with statsmodels and compare",
      ] },
    ],
  },
  "Hypothesis Testing for Business Decisions": {
    objectives: [
      "State null and alternative hypotheses for a business question",
      "Interpret a p-value against a significance level",
      "Pick the right test: t-test, chi-square or ANOVA",
    ],
    blocks: [
      { type: "check", id: "das-x-hypothesis", question: "You compare average basket size in two Douala supermarkets. The t-test gives p = 0.21. At α = 0.05, what do you conclude?", options: ["The stores are proven identical", "There is not enough evidence of a difference", "Store A is better", "The test failed"], answer: 1, explain: "p is above 0.05, so you cannot reject the null hypothesis. That is not proof the stores are identical, only that the data does not show a clear difference." },
      { type: "task", id: "das-t-hypothesis", title: "Practice", items: [
        "Write H₀ and H₁ for a comparison you care about at work",
        "Run a t-test in Excel (T.TEST) or Python (scipy.stats.ttest_ind)",
        "Write a two-sentence conclusion a manager can understand",
      ] },
    ],
  },
  "Introductory Predictive Models": {
    objectives: [
      "Choose linear or logistic regression for a prediction task",
      "Evaluate models with the right metrics",
      "Present predictions with their uncertainty",
    ],
    blocks: [
      { type: "check", id: "das-x-predictive", question: "A microfinance institution wants to predict whether a loan will be repaid (yes or no). Which model fits?", options: ["Linear regression", "Logistic regression", "A pie chart", "A moving average"], answer: 1, explain: "The outcome is binary, so logistic regression, which predicts a probability of repayment, is the right starting point." },
      { type: "callout", tone: "warning", title: "Fairness matters", text: "Models that decide on credit or benefits can reproduce bias hidden in past data. Check results by region, gender and age group before anyone relies on them." },
      { type: "task", id: "das-t-predictive", title: "Practice", items: [
        "Split a dataset into training and test sets",
        "Fit a linear or logistic regression with scikit-learn",
        "Report the right metric (R² or AUC) and one sentence on uncertainty",
      ] },
    ],
  },
  "Principles of Effective Data Visualization": {
    objectives: [
      "Choose the chart that matches the message",
      "Write chart titles that state the insight",
      "Use colour to highlight instead of decorate",
    ],
    blocks: [
      { type: "check", id: "das-x-viz", question: "Which title is most useful for a chart of quarterly revenue?", options: ["\"Revenue chart\"", "\"Q1–Q4 data\"", "\"Revenue grew 18% in Q4, driven by the Littoral region\"", "\"Figure 3\""], answer: 2, explain: "A title that states the finding tells the reader what to see before they study the chart." },
      { type: "chart", id: "das-lab-chart-trend", title: "Monthly revenue, January to June 2026", unit: "M FCFA", kinds: ["bar", "line", "pie"], best: "line",
        question: "Switch between the chart types. Which one shows how revenue changed month by month?",
        explain: "A line connects the months in order, so the upward trend is visible at a glance. A pie hides the order of time completely.",
        data: [{ label: "Jan", value: 42 }, { label: "Feb", value: 45 }, { label: "Mar", value: 51 }, { label: "Apr", value: 49 }, { label: "May", value: 58 }, { label: "Jun", value: 64 }] },
      { type: "task", id: "das-t-viz", title: "Practice", items: [
        "Take one existing chart from a report at work",
        "Rewrite its title as an insight",
        "Remove 3D effects and extra colours, keeping one accent colour for the key message",
      ] },
    ],
  },
  "Dashboard Design and Development": {
    objectives: [
      "Plan a dashboard around its audience and decisions",
      "Lay out KPIs, trends and details in a clear hierarchy",
      "Build interactive pages with measures and slicers in Power BI",
    ],
    blocks: [
      { type: "check", id: "das-x-dashboard", question: "A regional director has 30 seconds to check performance. What belongs in the top-left of the dashboard?", options: ["A detailed transaction table", "The single most important KPI with its trend versus target", "The company logo", "Filter instructions"], answer: 1, explain: "Readers scan from the top-left. Put the one number that answers \"are we on track?\" there, with its comparison to target." },
      { type: "chart", id: "das-lab-chart-regions", title: "Sales by region, Q1 2026", unit: "M FCFA", kinds: ["pie", "bar"], best: "bar",
        question: "Which chart lets a director compare the five regions most accurately?",
        explain: "Bars share one baseline, so lengths are easy to compare. Angles in a pie are hard to judge, especially for similar values like Littoral and Centre.",
        data: [{ label: "Littoral", value: 24 }, { label: "Centre", value: 21.4 }, { label: "Ouest", value: 9.3 }, { label: "Nord", value: 6.1 }, { label: "Est", value: 3.2 }] },
      { type: "task", id: "das-t-dashboard", title: "Practice", items: [
        "Sketch a one-page dashboard on paper: 3–5 KPIs, 2 trend charts, 1 detail table",
        "Build it in Power BI with at least two DAX measures and one slicer",
        "Ask a colleague to find one answer in it within 30 seconds",
      ] },
      { type: "links", items: [POWERBI] },
    ],
  },
  "Data Storytelling for Executives": {
    objectives: [
      "Structure a presentation with Situation, Complication, Resolution",
      "Lead with the finding and the recommendation",
      "Fit the message to a short executive time slot",
    ],
    blocks: [
      { type: "check", id: "das-x-story", question: "You have 5 minutes with the Director General. What should your first slide say?", options: ["Your data sources and methodology", "The key finding and what you recommend", "A thank-you note", "The full list of charts"], answer: 1, explain: "Executives want the answer first. Keep methodology in an appendix for anyone who asks." },
      { type: "slide", id: "das-lab-slide", title: "Fix a crowded executive slide", task: "Rewrite this slide for the Director General: a title that **states the finding** in 10 words or fewer, and **no more than 3 bullets** of 12 words or fewer.",
        slide: { title: "Analysis of the evolution of the customer acquisition cost over the last three quarters of the year 2025", bullets: [
          "We looked at the data from the CRM system and the marketing budget spreadsheet provided by finance",
          "The customer acquisition cost increased in the first quarter compared with the previous period of the year",
          "It also increased in the second quarter and again in the third quarter",
          "Paid search is the channel where most of the budget is currently being spent",
          "Email re-engagement campaigns seem to be performing better according to our regression model",
          "We think that there may be an opportunity to reduce costs if we change the allocation",
          "Next steps would need to be discussed with the marketing and finance teams",
        ] },
        rules: { maxBullets: 3, maxWords: 12, titleMaxWords: 10 },
        hint: "Try a title such as \"Customer acquisition cost rose three quarters in a row\" and keep only the finding, the evidence and the recommendation." },
      { type: "task", id: "das-t-story", title: "Practice", items: [
        "Write one Situation, Complication and Resolution sentence for a recent analysis",
        "Build a three-slide version: finding, evidence, recommendation",
        "Rehearse it in under 3 minutes",
      ] },
    ],
  },
  "Designing KPI Frameworks": {
    objectives: [
      "Build KPIs at strategic, tactical and operational levels",
      "Test each KPI against clear quality criteria",
      "Avoid vanity metrics and KPIs without targets",
    ],
    blocks: [
      { type: "check", id: "das-x-kpi", question: "Which is the better KPI for a customer service team?", options: ["Number of website visits", "Share of complaints resolved within 48 hours, against a 90% target", "Number of meetings held", "Total e-mails sent"], answer: 1, explain: "It is actionable by the team, measurable, has a target and links to customer satisfaction. The others are activity or vanity measures." },
      { type: "sheet", id: "das-lab-sheet-kpi", title: "KPI status with IF", task: "Fill **D2:D4** with the share of complaints resolved within 48 hours, then **E2:E4** with `On track` when it is at least 90%, otherwise `Below target`.",
        data: [["Branch", "Complaints", "Resolved < 48 h", "% resolved", "Status"], ["Douala", 120, 112, null, null], ["Yaoundé", 95, 81, null, null], ["Bafoussam", 60, 57, null, null]],
        editable: ["D2", "D3", "D4", "E2", "E3", "E4"],
        checks: [{ cell: "D2", equals: 0.9333, tol: 0.001 }, { cell: "D3", equals: 0.8526, tol: 0.001 }, { cell: "D4", equals: 0.95, tol: 0.001 },
          { cell: "E2", equals: "On track" }, { cell: "E3", equals: "Below target" }, { cell: "E4", equals: "On track" }],
        hint: "D2 is =C2/B2. E2 is =IF(D2>=0.9,\"On track\",\"Below target\"). Copy the pattern to rows 3 and 4.",
        solution: { D2: "=C2/B2", D3: "=C3/B3", D4: "=C4/B4", E2: "=IF(D2>=0.9,\"On track\",\"Below target\")", E3: "=IF(D3>=0.9,\"On track\",\"Below target\")", E4: "=IF(D4>=0.9,\"On track\",\"Below target\")" } },
      { type: "task", id: "das-t-kpi", title: "Practice", items: [
        "List 5 KPIs for your department",
        "Give each one a definition, data source, frequency and target",
        "Remove any that the team cannot influence",
      ] },
    ],
  },
  "BI Architecture: Source to Dashboard": {
    objectives: [
      "Describe each layer of the BI stack",
      "Explain why a data warehouse and semantic layer matter",
      "Trace one dashboard number back to its source system",
    ],
    blocks: [
      { type: "check", id: "das-x-bi", question: "Two departments report different revenue totals for the same month. Which BI layer is designed to prevent this?", options: ["The dashboard colours", "The semantic layer with shared metric definitions", "The printer settings", "The source systems"], answer: 1, explain: "The semantic layer defines each metric once, so every report calculates revenue the same way." },
      { type: "sql", id: "das-lab-sql-join", title: "Join sales to regional targets", task: "For each region, show the **manager**, the **total sales** and the **target**, ordered by region name.",
        setup: SALES_SQL + "\n" + REGIONS_SQL, starter: "SELECT r.region, r.manager, r.target\nFROM regions r\n-- join the sales table and add the total\n",
        solution: "SELECT r.region, r.manager, SUM(s.amount) AS total_sales, r.target\nFROM regions r\nJOIN sales s ON s.region = r.region\nGROUP BY r.region, r.manager, r.target\nORDER BY r.region;",
        hint: "JOIN sales s ON s.region = r.region, then SUM(s.amount) with GROUP BY on the other three columns." },
      { type: "task", id: "das-t-bi", title: "Practice", items: [
        "Draw your organisation's data flow from source systems to reports",
        "Mark where data is copied by hand",
        "Propose where a warehouse or shared definitions would remove errors",
      ] },
      { type: "links", items: [POSTGRES, POWERBI] },
    ],
  },
  "Governance of Self-Service BI": {
    objectives: [
      "Explain how governance keeps self-service BI trustworthy",
      "Set up certified datasets, shared definitions and access rules",
      "Balance control with freedom to explore",
    ],
    blocks: [
      { type: "check", id: "das-x-governance", question: "Salary data should be visible only to HR in a shared BI workspace. Which governance control applies?", options: ["Publishing rules", "Role-based access control", "Data freshness SLAs", "Certified datasets"], answer: 1, explain: "Role-based access limits who can see which data, protecting sensitive information such as salaries." },
      { type: "callout", tone: "workplace", title: "In the workplace", text: "Personal data of citizens, patients and employees must be protected. Agree access rules with your legal and IT teams before opening self-service BI to many users." },
      { type: "task", id: "das-t-governance", title: "Practice", items: [
        "Write definitions for three key metrics used across your organisation",
        "Decide which datasets should be certified and who owns each",
        "List which roles can see sensitive data",
      ] },
    ],
  },
};
