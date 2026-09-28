import type { Block } from "../../lms/types";

// Interactive additions for the DAS lessons in das.ts, matched by each lesson's <h2> heading.
// The original lesson text stays as written; these add objectives, a quick check,
// a practice task and workplace notes around it.

export interface LessonExtras { objectives: string[]; blocks: Block[] }

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
