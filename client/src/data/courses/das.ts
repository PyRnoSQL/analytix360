import type { CourseData } from "@/pages/learn/CourseViewer";

export const DAS_COURSE: CourseData = {
  id: "das",
  title: "Data Analytics Specialist",
  acronym: "DAS",
  modules: [
    // ═══ MODULE 1 ═══
    {
      id: "das-m1", number: 1, title: "Foundations of Data Analytics",
      lessons: [
        {
          id: "das-m1-l1", title: "The Analytics Lifecycle", type: "lesson",
          content: `<h2>The Analytics Lifecycle</h2>
<p>Data analytics follows a lifecycle of increasing sophistication. Understanding where your analysis falls helps you choose the right tools and communicate value to stakeholders.</p>
<h3>Four Types of Analytics</h3>
<p><strong>Descriptive Analytics</strong> answers <em>"What happened?"</em> — summarizing historical data through reports, dashboards, and KPIs. Example: Monthly revenue reports, website traffic summaries.</p>
<p><strong>Diagnostic Analytics</strong> answers <em>"Why did it happen?"</em> — drilling into data to find root causes using techniques like filtering, segmentation, and correlation. Example: Why did customer churn spike in Q3?</p>
<p><strong>Predictive Analytics</strong> answers <em>"What will happen?"</em> — using statistical models and machine learning to forecast future outcomes. Example: Predicting next quarter's sales based on historical trends.</p>
<p><strong>Prescriptive Analytics</strong> answers <em>"What should we do?"</em> — recommending optimal actions using optimization and simulation. Example: Recommending the best pricing strategy to maximize profit.</p>
<h3>Key Takeaway</h3>
<p>Most organizations start with descriptive analytics. Your job as a data analyst is to move the organization up the analytics maturity curve — from reporting what happened to recommending what to do next.</p>`,
        },
        {
          id: "das-m1-l2", title: "Framing Business Questions", type: "lesson",
          content: `<h2>Framing Business Questions as Analytical Problems</h2>
<p>The most valuable skill of a data analyst is not technical — it's the ability to translate a vague business question into a precise, answerable analytical problem.</p>
<h3>The SMART Framework for Analytical Questions</h3>
<ul>
<li><strong>Specific:</strong> "Which customer segment has the highest churn rate?" not "Why are we losing customers?"</li>
<li><strong>Measurable:</strong> Define the metric — churn rate = customers lost / total customers over a period</li>
<li><strong>Actionable:</strong> The answer should lead to a decision — if we identify the segment, we can target retention efforts</li>
<li><strong>Relevant:</strong> Aligned with a business objective — reducing churn increases revenue</li>
<li><strong>Time-bound:</strong> Specify the period — "in the last 12 months"</li>
</ul>
<h3>Common Patterns</h3>
<table><thead><tr><th>Business Question</th><th>Analytical Translation</th></tr></thead>
<tbody>
<tr><td>"Are our marketing campaigns working?"</td><td>"What is the conversion rate by channel for the last 6 months?"</td></tr>
<tr><td>"We need to cut costs"</td><td>"Which cost categories grew fastest relative to revenue in FY2025?"</td></tr>
<tr><td>"Customers are unhappy"</td><td>"What is the NPS by product line and which drivers correlate with low scores?"</td></tr>
</tbody></table>
<h3>Practice Tip</h3>
<p>Before touching any data, write down: (1) the business question, (2) the metric you will measure, (3) the data you need, and (4) what action the answer enables.</p>`,
        },
        {
          id: "das-m1-l3", title: "The Analytics Toolchain", type: "lesson",
          content: `<h2>Overview of the Analytics Toolchain</h2>
<p>A modern data analyst works across multiple tools, each suited to different tasks in the analytics workflow.</p>
<h3>Spreadsheets (Excel / Google Sheets)</h3>
<p><strong>Best for:</strong> Quick analysis, pivot tables, simple charts, data exploration, sharing with non-technical stakeholders.</p>
<p><strong>Limitations:</strong> Struggles with datasets over 100K rows, version control is manual, hard to reproduce analysis.</p>
<h3>SQL (Structured Query Language)</h3>
<p><strong>Best for:</strong> Querying databases, joining multiple tables, aggregating large datasets, filtering and grouping data.</p>
<p><strong>Why it matters:</strong> Almost every company stores data in databases. SQL is the universal language to access it. If you learn one technical skill, make it SQL.</p>
<h3>Business Intelligence Tools (Power BI / Tableau)</h3>
<p><strong>Best for:</strong> Interactive dashboards, visual exploration, sharing insights with teams, real-time monitoring.</p>
<p><strong>Key skill:</strong> Designing dashboards that answer questions at a glance — not just pretty charts.</p>
<h3>Python (with pandas, matplotlib, seaborn)</h3>
<p><strong>Best for:</strong> Reproducible analysis, complex transformations, statistical modeling, automation, working with APIs and messy data formats.</p>
<p><strong>Why it matters:</strong> Python is the most in-demand programming language for data roles. It bridges the gap between analysis and engineering.</p>
<h3>When to Use What</h3>
<table><thead><tr><th>Task</th><th>Best Tool</th></tr></thead>
<tbody>
<tr><td>Quick ad-hoc analysis</td><td>Excel</td></tr>
<tr><td>Query a database</td><td>SQL</td></tr>
<tr><td>Build a dashboard</td><td>Power BI / Tableau</td></tr>
<tr><td>Clean messy data at scale</td><td>Python</td></tr>
<tr><td>Statistical modeling</td><td>Python</td></tr>
<tr><td>Share with executives</td><td>Power BI / Tableau / Excel</td></tr>
</tbody></table>`,
        },
        {
          id: "das-m1-q1", title: "Module 1 Quiz", type: "quiz",
          quiz: [
            { id: "m1q1", question: "Which type of analytics answers 'What will happen?'", options: ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"], correctIndex: 2, explanation: "Predictive analytics uses statistical models to forecast future outcomes based on historical data." },
            { id: "m1q2", question: "What does diagnostic analytics primarily investigate?", options: ["Future trends", "Why something happened", "What action to take", "What happened last month"], correctIndex: 1, explanation: "Diagnostic analytics drills into data to find root causes — it answers 'Why did it happen?'" },
            { id: "m1q3", question: "Which tool is best for querying data stored in a relational database?", options: ["Excel", "Python", "SQL", "Tableau"], correctIndex: 2, explanation: "SQL (Structured Query Language) is the universal language for querying relational databases." },
            { id: "m1q4", question: "A good analytical question should be all of the following EXCEPT:", options: ["Specific", "Measurable", "Vague", "Time-bound"], correctIndex: 2, explanation: "Analytical questions should be specific, measurable, actionable, relevant, and time-bound — never vague." },
            { id: "m1q5", question: "Which tool is most appropriate for building an interactive executive dashboard?", options: ["Python pandas", "SQL", "Power BI or Tableau", "Notepad"], correctIndex: 2, explanation: "Power BI and Tableau are purpose-built for interactive dashboards that non-technical stakeholders can explore." },
            { id: "m1q6", question: "Prescriptive analytics helps answer which question?", options: ["What happened?", "Why did it happen?", "What will happen?", "What should we do?"], correctIndex: 3, explanation: "Prescriptive analytics recommends optimal actions using optimization and simulation techniques." },
            { id: "m1q7", question: "Which of these is NOT a step in framing an analytical problem?", options: ["Define the metric", "Identify the data needed", "Skip to building a dashboard", "Determine what action the answer enables"], correctIndex: 2, explanation: "You should always define the question, metric, data needs, and actionable outcome before building anything." },
            { id: "m1q8", question: "Python is particularly useful for data analytics because it:", options: ["Has the prettiest charts", "Enables reproducible analysis and handles complex transformations", "Is the only language that works with data", "Replaces all other tools"], correctIndex: 1, explanation: "Python's strength is reproducibility, handling complex transformations, and bridging analysis with engineering." },
            { id: "m1q9", question: "For a dataset with 500,000 rows, which tool would be most efficient?", options: ["Excel", "Google Sheets", "SQL or Python", "A calculator"], correctIndex: 2, explanation: "Excel and Google Sheets struggle with large datasets. SQL and Python handle millions of rows efficiently." },
            { id: "m1q10", question: "An organization that only produces monthly PDF reports is operating at which analytics level?", options: ["Prescriptive", "Predictive", "Diagnostic", "Descriptive"], correctIndex: 3, explanation: "Monthly reports summarizing past data is descriptive analytics — the foundational level." },
          ],
        },
      ],
    },
    // ═══ MODULE 2 ═══
    {
      id: "das-m2", number: 2, title: "Data Wrangling & Cleaning",
      lessons: [
        {
          id: "das-m2-l1", title: "Data Cleaning in Excel and SQL", type: "lesson",
          content: `<h2>Data Cleaning Techniques</h2><p>Real-world data is messy. Before any analysis, you must clean it. This lesson covers the most common data quality issues and how to fix them in Excel and SQL.</p><h3>Handling Missing Values</h3><p><strong>Excel:</strong> Use <code>ISBLANK()</code> to find missing cells. Fill with averages using <code>=IF(ISBLANK(A2), AVERAGE(A:A), A2)</code> or filter and delete incomplete rows.</p><p><strong>SQL:</strong> <code>WHERE column IS NOT NULL</code> filters out nulls. <code>COALESCE(column, default_value)</code> replaces nulls with a default.</p><h3>Removing Duplicates</h3><p><strong>Excel:</strong> Data tab → Remove Duplicates. Select columns that define uniqueness.</p><p><strong>SQL:</strong> Use <code>ROW_NUMBER() OVER(PARTITION BY key_column ORDER BY id) AS rn</code> then filter <code>WHERE rn = 1</code>.</p><h3>Handling Outliers</h3><p><strong>IQR Method:</strong> Calculate Q1, Q3, IQR = Q3-Q1. Outliers are below Q1-1.5×IQR or above Q3+1.5×IQR.</p><p><strong>Z-score Method:</strong> Values with |z-score| > 3 are potential outliers. In Excel: <code>=(A2-AVERAGE(A:A))/STDEV(A:A)</code></p><h3>Key Rule</h3><p>Always document what you cleaned and why. Create a data cleaning log — future you (and your team) will thank you.</p>`,
        },
        {
          id: "das-m2-l2", title: "Data Transformation and Reshaping", type: "lesson",
          content: `<h2>Data Transformation and Reshaping</h2><p>Raw data rarely comes in the format you need for analysis. Transformation is the bridge between raw data and insight.</p><h3>Common Transformations</h3><ul><li><strong>Filtering:</strong> Keep only relevant rows (e.g., only transactions from 2024)</li><li><strong>Sorting:</strong> Order data for readability or to identify patterns</li><li><strong>Aggregating:</strong> Summarize data (SUM, AVG, COUNT by group)</li><li><strong>Pivoting:</strong> Reshape data from long to wide format (Excel: Pivot Tables; SQL: CASE WHEN + GROUP BY)</li><li><strong>Unpivoting:</strong> Reshape from wide to long format (Excel: Power Query; Python: pandas.melt())</li><li><strong>Joining:</strong> Combine data from multiple tables/sheets (Excel: VLOOKUP; SQL: JOIN)</li><li><strong>Type casting:</strong> Convert text dates to date format, strings to numbers</li></ul><h3>Excel Power Query</h3><p>Power Query is Excel's built-in ETL tool. It records every transformation step so you can refresh your analysis with new data in one click. Access it via: Data tab → Get & Transform.</p>`,
        },
        {
          id: "das-m2-l3", title: "Introduction to Python/pandas", type: "lesson",
          content: `<h2>Python/pandas for Data Preparation</h2><p>pandas is the Python library that makes data cleaning reproducible and scalable.</p><h3>Essential Operations</h3><pre><code>import pandas as pd

# Load data
df = pd.read_csv("sales_data.csv")

# Inspect
df.head()          # First 5 rows
df.info()          # Column types and nulls
df.describe()      # Summary statistics

# Handle missing values
df["revenue"].fillna(0, inplace=True)      # Fill nulls with 0
df.dropna(subset=["customer_id"])          # Drop rows missing customer_id

# Remove duplicates
df.drop_duplicates(subset=["order_id"], inplace=True)

# Transform
df["order_date"] = pd.to_datetime(df["order_date"])
df["month"] = df["order_date"].dt.month
df["revenue_k"] = df["revenue"] / 1000

# Aggregate
monthly = df.groupby("month")["revenue"].agg(["sum","mean","count"])

# Filter
big_orders = df[df["revenue"] > 100000]
</code></pre><h3>Why pandas Over Excel?</h3><p>Every step is code → reproducible, version-controlled, and works on millions of rows. You can re-run the entire cleaning pipeline on new data with one command.</p>`,
        },
        {
          id: "das-m2-q1", title: "Module 2 Quiz", type: "quiz",
          quiz: [
            { id: "m2q1", question: "Which SQL function replaces NULL values with a default?", options: ["ISNULL()", "REPLACE()", "COALESCE()", "DEFAULT()"], correctIndex: 2, explanation: "COALESCE() returns the first non-null value from its arguments, effectively replacing NULLs." },
            { id: "m2q2", question: "In the IQR method, a value is considered an outlier if it falls:", options: ["Below Q1 or above Q3", "Below the mean", "Below Q1-1.5×IQR or above Q3+1.5×IQR", "More than 1 standard deviation from mean"], correctIndex: 2, explanation: "The IQR method flags values below Q1-1.5×IQR or above Q3+1.5×IQR as potential outliers." },
            { id: "m2q3", question: "What does pandas df.dropna() do?", options: ["Fills missing values with zero", "Removes rows containing missing values", "Removes all columns", "Converts NaN to string"], correctIndex: 1, explanation: "dropna() removes rows (by default) that contain any missing values (NaN)." },
            { id: "m2q4", question: "Which Excel feature records transformation steps for reproducibility?", options: ["Pivot Tables", "Power Query", "Conditional Formatting", "Data Validation"], correctIndex: 1, explanation: "Power Query records every step so you can refresh your analysis with new data automatically." },
            { id: "m2q5", question: "To remove duplicate rows in SQL, you can use:", options: ["DELETE ALL", "DISTINCT only", "ROW_NUMBER() with PARTITION BY", "DROP TABLE"], correctIndex: 2, explanation: "ROW_NUMBER() OVER(PARTITION BY key) assigns numbers to duplicates, letting you keep only the first occurrence." },
            { id: "m2q6", question: "What is the pandas function to reshape data from wide to long format?", options: ["pd.pivot()", "pd.melt()", "pd.merge()", "pd.concat()"], correctIndex: 1, explanation: "pd.melt() unpivots a DataFrame from wide format to long format." },
            { id: "m2q7", question: "Why is pandas preferred over Excel for large datasets?", options: ["Prettier charts", "Works on millions of rows and is reproducible", "It's free", "It's easier to learn"], correctIndex: 1, explanation: "pandas handles millions of rows efficiently and every step is code — making it reproducible and version-controlled." },
            { id: "m2q8", question: "Which transformation converts '2024-01-15' from text to a date object in pandas?", options: ["pd.to_numeric()", "pd.to_datetime()", "pd.to_string()", "pd.to_csv()"], correctIndex: 1, explanation: "pd.to_datetime() converts string representations of dates into datetime objects for proper date operations." },
          ],
        },
      ],
    },
    // ═══ MODULES 3-6 (abbreviated structure — content generated) ═══
    {
      id: "das-m3", number: 3, title: "Statistical Analysis for Business",
      lessons: [
        { id: "das-m3-l1", title: "Descriptive Statistics in Business", type: "lesson", content: `<h2>Descriptive Statistics in a Business Context</h2><p>Descriptive statistics summarize your data so you can understand what you're working with before diving into deeper analysis.</p><h3>Measures of Central Tendency</h3><p><strong>Mean:</strong> The arithmetic average. Sensitive to outliers. Use for symmetric data (e.g., average order value).</p><p><strong>Median:</strong> The middle value. Robust to outliers. Use for skewed data (e.g., median household income).</p><p><strong>Mode:</strong> The most frequent value. Use for categorical data (e.g., most popular product).</p><h3>Measures of Spread</h3><p><strong>Range:</strong> Max minus Min. Simple but sensitive to outliers.</p><p><strong>Standard Deviation:</strong> Average distance from the mean. The most commonly used measure of spread.</p><p><strong>Interquartile Range (IQR):</strong> Q3 minus Q1. Robust measure of spread, ignores extreme values.</p><h3>Distributions</h3><p><strong>Normal distribution:</strong> Bell-shaped, symmetric. Many business metrics approximate this (e.g., height, test scores).</p><p><strong>Skewed right:</strong> Long tail to the right (e.g., income, revenue per customer).</p><p><strong>Skewed left:</strong> Long tail to the left (e.g., age at retirement).</p><h3>In Excel</h3><p><code>=AVERAGE()</code>, <code>=MEDIAN()</code>, <code>=STDEV.S()</code>, <code>=QUARTILE()</code></p><h3>In Python</h3><pre><code>df["revenue"].mean()
df["revenue"].median()
df["revenue"].std()
df["revenue"].describe()  # All at once</code></pre>` },
        { id: "das-m3-l2", title: "Hypothesis Testing for Decisions", type: "lesson", content: `<h2>Hypothesis Testing for Business Decisions</h2><p>Hypothesis testing gives you a rigorous framework to determine whether an observed difference is real or just due to random chance.</p><h3>The Framework</h3><ol><li><strong>Null Hypothesis (H₀):</strong> "There is no difference" — the default assumption</li><li><strong>Alternative Hypothesis (H₁):</strong> "There IS a difference" — what you're trying to prove</li><li><strong>Collect data and calculate a test statistic</strong></li><li><strong>Compare p-value to significance level (α, typically 0.05)</strong></li><li><strong>If p < α, reject H₀</strong> — the difference is statistically significant</li></ol><h3>Common Tests</h3><p><strong>t-test:</strong> Compare means of two groups (e.g., did the new pricing strategy increase average order value?)</p><p><strong>Chi-square test:</strong> Test relationship between categorical variables (e.g., is product preference related to gender?)</p><p><strong>ANOVA:</strong> Compare means across 3+ groups (e.g., do conversion rates differ across 4 marketing channels?)</p><h3>Business Example</h3><p>You run an A/B test on email subject lines. Group A (old subject) has 12% open rate, Group B (new subject) has 14%. Is 2% real or random noise? A two-proportion z-test gives p = 0.03. Since 0.03 < 0.05, the improvement is statistically significant.</p><h3>In Python</h3><pre><code>from scipy import stats
t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"p-value: {p_value:.4f}")</code></pre>` },
        { id: "das-m3-l3", title: "Correlation and Regression", type: "lesson", content: `<h2>Correlation and Regression Analysis</h2><p>Correlation measures the strength of the relationship between two variables. Regression models that relationship so you can make predictions.</p><h3>Correlation</h3><p><strong>Pearson r:</strong> Ranges from -1 to +1. Measures linear relationship strength.</p><ul><li>r = 0.8 to 1.0: Strong positive</li><li>r = 0.5 to 0.8: Moderate positive</li><li>r = -0.5 to -0.8: Moderate negative</li><li>r near 0: No linear relationship</li></ul><p><strong>Warning:</strong> Correlation does NOT imply causation. Ice cream sales and drowning deaths are correlated — both increase in summer.</p><h3>Simple Linear Regression</h3><p>Models the relationship as: <strong>Y = β₀ + β₁X + ε</strong></p><p>β₀ = intercept (Y when X=0), β₁ = slope (change in Y per unit change in X)</p><p><strong>R² (coefficient of determination):</strong> The percentage of variation in Y explained by X. R² = 0.75 means 75% of the variation is explained.</p><h3>In Excel</h3><p>Insert → Chart → Scatter → Add Trendline → Display R² value. Or use Data Analysis ToolPak → Regression.</p><h3>In Python</h3><pre><code>import statsmodels.api as sm
X = sm.add_constant(df["ad_spend"])
model = sm.OLS(df["revenue"], X).fit()
print(model.summary())</code></pre>` },
        { id: "das-m3-q1", title: "Module 3 Quiz", type: "quiz", quiz: [
          { id: "m3q1", question: "When data is skewed right, which measure of central tendency is most appropriate?", options: ["Mean", "Median", "Mode", "Range"], correctIndex: 1, explanation: "The median is robust to outliers and better represents the 'typical' value in skewed distributions." },
          { id: "m3q2", question: "A p-value of 0.02 means:", options: ["The result is not significant", "There is a 2% probability the observed difference is due to chance", "The null hypothesis is true", "We need more data"], correctIndex: 1, explanation: "A p-value of 0.02 means there's only a 2% chance of seeing this result if the null hypothesis were true." },
          { id: "m3q3", question: "What does R² = 0.85 mean in regression?", options: ["85% of the data is correct", "85% of the variation in Y is explained by X", "The model is 85% accurate", "There are 85 data points"], correctIndex: 1, explanation: "R² measures the proportion of variance in the dependent variable explained by the independent variable(s)." },
          { id: "m3q4", question: "Which test compares means across 3 or more groups?", options: ["t-test", "Chi-square", "ANOVA", "Correlation"], correctIndex: 2, explanation: "ANOVA (Analysis of Variance) tests whether the means of 3 or more groups are significantly different." },
          { id: "m3q5", question: "A correlation of r = -0.92 indicates:", options: ["No relationship", "Strong positive relationship", "Strong negative relationship", "Weak negative relationship"], correctIndex: 2, explanation: "r = -0.92 is close to -1, indicating a strong negative linear relationship between the variables." },
          { id: "m3q6", question: "In regression, what does the slope (β₁) represent?", options: ["The Y value when X is zero", "The change in Y for each unit change in X", "The correlation coefficient", "The sample size"], correctIndex: 1, explanation: "The slope represents the expected change in the dependent variable for each one-unit increase in X." },
          { id: "m3q7", question: "'Correlation does not imply causation' means:", options: ["Correlation is useless", "Two correlated variables may both be caused by a third factor", "We should never use correlation", "Correlation always equals regression"], correctIndex: 1, explanation: "Correlation shows association, but the relationship could be coincidental or driven by a confounding variable." },
          { id: "m3q8", question: "Standard deviation measures:", options: ["The middle value", "The average distance from the mean", "The most common value", "The range of data"], correctIndex: 1, explanation: "Standard deviation quantifies how spread out the values are from the mean — higher SD means more variability." },
        ]},
      ],
    },
    {
      id: "das-m4", number: 4, title: "Data Visualization & Storytelling",
      lessons: [
        { id: "das-m4-l1", title: "Visualization Principles & Chart Selection", type: "lesson", content: `<h2>Principles of Effective Data Visualization</h2><p>A good chart communicates one clear message instantly. A bad chart confuses, misleads, or decorates without informing.</p><h3>Chart Selection Guide</h3><table><thead><tr><th>Message</th><th>Best Chart</th></tr></thead><tbody><tr><td>Comparison across categories</td><td>Bar chart (horizontal for many categories)</td></tr><tr><td>Trend over time</td><td>Line chart</td></tr><tr><td>Part of a whole</td><td>Stacked bar or pie (max 5 slices)</td></tr><tr><td>Distribution</td><td>Histogram or box plot</td></tr><tr><td>Relationship between 2 variables</td><td>Scatter plot</td></tr><tr><td>Geographic patterns</td><td>Map / choropleth</td></tr></tbody></table><h3>Design Rules</h3><ul><li><strong>Title:</strong> State the insight, not just the topic. "Revenue grew 23% in Q4" not "Q4 Revenue Chart"</li><li><strong>Labels:</strong> Every axis needs a label with units</li><li><strong>Color:</strong> Use color to highlight, not decorate. Grey for context, one accent color for the key message</li><li><strong>Remove clutter:</strong> No 3D effects, no gridlines unless needed, no unnecessary legends</li></ul>` },
        { id: "das-m4-l2", title: "Dashboard Design with Power BI/Tableau", type: "lesson", content: `<h2>Dashboard Design and Development</h2><p>A dashboard is not a collection of charts — it's a decision-support tool that answers specific questions at a glance.</p><h3>Dashboard Design Framework</h3><ol><li><strong>Who is the audience?</strong> Executive (high-level KPIs) vs Operational (detailed metrics)</li><li><strong>What decisions will this support?</strong> Each chart should enable a specific action</li><li><strong>What are the top 3-5 questions?</strong> Don't try to answer everything</li></ol><h3>Layout Best Practices</h3><p><strong>Z-pattern:</strong> Eyes scan top-left → top-right → bottom-left → bottom-right. Put the most important KPI top-left.</p><p><strong>Information hierarchy:</strong> KPI cards at top → trend charts in middle → detail tables at bottom</p><p><strong>Filters:</strong> Date range, region, product — let users drill down without cluttering the view</p><h3>Power BI Essentials</h3><ul><li>Connect to data sources (Excel, SQL, APIs)</li><li>Create DAX measures for calculated metrics</li><li>Design pages with a clear visual hierarchy</li><li>Add slicers for interactivity</li><li>Publish to Power BI Service for sharing</li></ul>` },
        { id: "das-m4-l3", title: "Structuring a Data Story", type: "lesson", content: `<h2>Data Storytelling for Executives</h2><p>Data without a narrative is just numbers. A data story turns analysis into action by guiding your audience from context through insight to recommendation.</p><h3>The SCR Framework</h3><p><strong>Situation:</strong> Set the context. What's the current state? "Our customer acquisition cost has been rising for 3 consecutive quarters."</p><p><strong>Complication:</strong> What's the problem or opportunity? "At this rate, we'll exceed our annual marketing budget by Q3."</p><p><strong>Resolution:</strong> What should we do? "Shifting 20% of paid search budget to email re-engagement could reduce CAC by 30% based on our regression model."</p><h3>Presentation Structure</h3><ol><li><strong>Opening (30 sec):</strong> State the key finding upfront — don't make executives wait</li><li><strong>Context (1-2 min):</strong> Brief background, what data you analyzed</li><li><strong>Findings (3-5 min):</strong> 2-3 key insights with supporting charts</li><li><strong>Recommendation (1 min):</strong> Clear next steps with expected impact</li><li><strong>Appendix:</strong> Detailed methodology for those who want to dig deeper</li></ol><h3>Golden Rule</h3><p>Lead with the answer, then show the evidence. Executives want the "so what" first, the "how" second.</p>` },
        { id: "das-m4-q1", title: "Module 4 Quiz", type: "quiz", quiz: [
          { id: "m4q1", question: "What is the best chart type for showing trends over time?", options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"], correctIndex: 2, explanation: "Line charts are ideal for showing how values change over time — the x-axis represents time periods." },
          { id: "m4q2", question: "In the SCR framework, what does 'C' stand for?", options: ["Conclusion", "Complication", "Chart", "Context"], correctIndex: 1, explanation: "SCR = Situation, Complication, Resolution. The Complication is the problem or opportunity your analysis reveals." },
          { id: "m4q3", question: "Where should the most important KPI be placed on a dashboard?", options: ["Bottom right", "Center", "Top left", "In the title"], correctIndex: 2, explanation: "The Z-pattern reading order means eyes go to the top-left first — put your most important metric there." },
          { id: "m4q4", question: "A good chart title should:", options: ["Describe the chart type", "State the insight or finding", "List all the data sources", "Be as long as possible"], correctIndex: 1, explanation: "Titles should communicate the key takeaway: 'Revenue grew 23% in Q4' is better than 'Q4 Revenue Chart'." },
          { id: "m4q5", question: "When presenting to executives, you should:", options: ["Start with methodology details", "Lead with the key finding and recommendation", "Show as many charts as possible", "Read every number aloud"], correctIndex: 1, explanation: "Executives want the 'so what' first. Lead with your answer, then provide supporting evidence." },
          { id: "m4q6", question: "A pie chart should have no more than how many slices?", options: ["3", "5", "10", "Unlimited"], correctIndex: 1, explanation: "Pie charts become hard to read with more than 5 slices. Use a bar chart for more categories." },
        ]},
      ],
    },
    {
      id: "das-m5", number: 5, title: "Exploratory & Predictive Analytics",
      lessons: [
        { id: "das-m5-l1", title: "Exploratory Data Analysis (EDA)", type: "lesson", content: `<h2>Exploratory Data Analysis Techniques</h2><p>EDA is the detective work before the formal analysis. You're looking for patterns, anomalies, and relationships that guide your hypotheses.</p><h3>The EDA Checklist</h3><ol><li><strong>Shape:</strong> How many rows and columns? <code>df.shape</code></li><li><strong>Types:</strong> What are the data types? <code>df.dtypes</code></li><li><strong>Missing values:</strong> How much is missing? <code>df.isnull().sum()</code></li><li><strong>Distributions:</strong> Histograms for each numeric column</li><li><strong>Outliers:</strong> Box plots to spot extreme values</li><li><strong>Correlations:</strong> Heatmap of pairwise correlations</li><li><strong>Relationships:</strong> Scatter plots between key variables</li></ol><h3>In Python</h3><pre><code>import seaborn as sns
import matplotlib.pyplot as plt

# Correlation heatmap
sns.heatmap(df.corr(), annot=True, cmap="coolwarm")
plt.title("Correlation Matrix")
plt.show()

# Distribution of all numeric columns
df.hist(figsize=(12,8), bins=20)
plt.tight_layout()
plt.show()</code></pre><h3>What to Look For</h3><ul><li>Unexpected patterns or clusters</li><li>Variables that are highly correlated (potential predictors)</li><li>Data quality issues (impossible values, suspicious spikes)</li><li>Segments that behave differently from the overall average</li></ul>` },
        { id: "das-m5-l2", title: "Introduction to Predictive Models", type: "lesson", content: `<h2>Introductory Predictive Models</h2><p>Predictive analytics uses historical data to forecast future outcomes. At the introductory level, two models cover most business needs.</p><h3>Linear Regression (Predicting Numbers)</h3><p>Use when your target is continuous: revenue, sales volume, customer spend.</p><p><strong>Example:</strong> Predict monthly sales based on advertising spend.</p><pre><code>from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)</code></pre><h3>Logistic Regression (Predicting Categories)</h3><p>Use when your target is binary: will the customer buy or not? Will the patient readmit or not?</p><p><strong>Example:</strong> Predict which customers will churn based on usage patterns.</p><h3>Model Evaluation</h3><ul><li><strong>For regression:</strong> R², MAE (Mean Absolute Error), RMSE</li><li><strong>For classification:</strong> Accuracy, Precision, Recall, AUC-ROC</li></ul><h3>Communicating Uncertainty</h3><p>Never present predictions as certainties. Say "the model predicts 75% probability of churn" not "this customer will churn." Include confidence intervals where possible.</p>` },
        { id: "das-m5-q1", title: "Module 5 Quiz", type: "quiz", quiz: [
          { id: "m5q1", question: "What is the primary purpose of EDA?", options: ["Build the final model", "Discover patterns and guide hypotheses before formal analysis", "Create the final dashboard", "Clean the data"], correctIndex: 1, explanation: "EDA is the exploration phase where you discover patterns, anomalies, and relationships to guide your analysis." },
          { id: "m5q2", question: "Linear regression is used when the target variable is:", options: ["Categorical (yes/no)", "Continuous (a number)", "Text", "An image"], correctIndex: 1, explanation: "Linear regression predicts continuous numerical outcomes like revenue, temperature, or sales volume." },
          { id: "m5q3", question: "Which metric is used to evaluate logistic regression?", options: ["R-squared", "AUC-ROC", "Mean Absolute Error", "Standard Deviation"], correctIndex: 1, explanation: "AUC-ROC measures how well a classification model distinguishes between positive and negative cases." },
          { id: "m5q4", question: "A correlation heatmap helps you identify:", options: ["Missing values", "Data types", "Relationships between numeric variables", "File sizes"], correctIndex: 2, explanation: "Correlation heatmaps show the pairwise correlation between all numeric columns, revealing strong relationships." },
          { id: "m5q5", question: "When presenting predictions, you should:", options: ["State them as certainties", "Include probability and uncertainty", "Only share if 100% accurate", "Avoid sharing with stakeholders"], correctIndex: 1, explanation: "Predictions are probabilistic. Always communicate uncertainty — use confidence intervals or probability statements." },
          { id: "m5q6", question: "Logistic regression predicts:", options: ["A continuous number", "A probability of belonging to a category", "Time series data", "Text sentiment"], correctIndex: 1, explanation: "Logistic regression outputs a probability (0 to 1) of belonging to the positive class (e.g., churn vs not churn)." },
        ]},
      ],
    },
    {
      id: "das-m6", number: 6, title: "Business Intelligence Systems",
      lessons: [
        { id: "das-m6-l1", title: "BI Architecture", type: "lesson", content: `<h2>BI Architecture: Source to Dashboard</h2><p>Business Intelligence is the infrastructure that turns raw organizational data into accessible, reliable, and actionable insight.</p><h3>The BI Stack</h3><ol><li><strong>Source Systems:</strong> Where data originates — CRM, ERP, POS, web analytics, spreadsheets, APIs</li><li><strong>Data Integration (ETL/ELT):</strong> Extract data from sources, transform it, load into a central store</li><li><strong>Data Warehouse:</strong> A structured, optimized database designed for analytical queries (e.g., BigQuery, Snowflake, PostgreSQL)</li><li><strong>Semantic Layer:</strong> Business-friendly definitions of metrics and dimensions (what does "active customer" mean?)</li><li><strong>BI Tool:</strong> Power BI, Tableau, or Looker — where users explore data through dashboards</li><li><strong>Self-Service:</strong> End users create their own reports without needing a data team for every question</li></ol><h3>Why Architecture Matters</h3><p>Without proper architecture, you get "spreadsheet chaos" — everyone has their own version of the truth. A well-designed BI system gives the entire organization a single source of truth.</p>` },
        { id: "das-m6-l2", title: "Designing KPI Frameworks", type: "lesson", content: `<h2>Designing KPI Frameworks</h2><p>KPIs (Key Performance Indicators) are the vital signs of your organization. A good KPI framework aligns metrics with strategy at every level.</p><h3>KPI Hierarchy</h3><ul><li><strong>Strategic KPIs (CEO/Board):</strong> Revenue growth, market share, customer satisfaction, profitability</li><li><strong>Tactical KPIs (Directors):</strong> CAC, conversion rate, churn rate, production efficiency</li><li><strong>Operational KPIs (Managers):</strong> Daily active users, ticket resolution time, defect rate</li></ul><h3>Good KPI Criteria</h3><ul><li><strong>Actionable:</strong> The team can influence it</li><li><strong>Timely:</strong> Updated frequently enough to act on</li><li><strong>Simple:</strong> Everyone understands what it measures</li><li><strong>Comparable:</strong> Can be benchmarked over time or against peers</li></ul><h3>Common Mistakes</h3><ul><li>Too many KPIs (focus on 5-7 per level)</li><li>Vanity metrics that look good but don't drive decisions</li><li>No targets or baselines for comparison</li><li>KPIs not connected to strategic objectives</li></ul>` },
        { id: "das-m6-l3", title: "BI Governance & Self-Service", type: "lesson", content: `<h2>Governance of Self-Service BI</h2><p>Self-service BI empowers users to answer their own questions without waiting for the data team. But without governance, you get conflicting numbers and eroded trust.</p><h3>The Governance Framework</h3><ul><li><strong>Certified datasets:</strong> Mark trusted, validated data sources. Unapproved sources carry a warning.</li><li><strong>Metric definitions:</strong> A shared glossary — "revenue" means the same thing in every dashboard</li><li><strong>Access control:</strong> Role-based permissions — not everyone needs access to salary data</li><li><strong>Publishing rules:</strong> Dashboards go through review before being shared organization-wide</li><li><strong>Data freshness SLAs:</strong> Data is refreshed daily/hourly — users know how current it is</li></ul><h3>The Balance</h3><p>Too much governance → slow, bureaucratic, people go back to spreadsheets.</p><p>Too little governance → conflicting numbers, wrong decisions, eroded trust.</p><p>The goal is a <strong>governed self-service</strong> model: people can explore freely within guardrails.</p>` },
        { id: "das-m6-q1", title: "Module 6 Quiz", type: "quiz", quiz: [
          { id: "m6q1", question: "What is the purpose of a data warehouse?", options: ["Store source code", "A structured database optimized for analytical queries", "Back up files", "Send emails"], correctIndex: 1, explanation: "A data warehouse is a centralized, structured database designed specifically for analytical and reporting queries." },
          { id: "m6q2", question: "How many KPIs should each organizational level focus on?", options: ["1-2", "5-7", "20+", "As many as possible"], correctIndex: 1, explanation: "Focus on 5-7 KPIs per level. Too many KPIs dilute attention and reduce the ability to act on any single one." },
          { id: "m6q3", question: "What problem does BI governance solve?", options: ["Slow computers", "Conflicting numbers across teams", "Hiring data scientists", "Data storage costs"], correctIndex: 1, explanation: "Governance ensures a single source of truth — everyone uses the same definitions and trusted data sources." },
          { id: "m6q4", question: "In the BI stack, the semantic layer provides:", options: ["Raw data storage", "Business-friendly definitions of metrics and dimensions", "Network security", "Email notifications"], correctIndex: 1, explanation: "The semantic layer translates technical database columns into business terms everyone understands." },
          { id: "m6q5", question: "Self-service BI means:", options: ["No data team needed", "Users can build their own reports within governed guardrails", "Everyone has admin access", "Data is uncontrolled"], correctIndex: 1, explanation: "Self-service BI empowers users to explore data independently, but within governance guardrails that ensure accuracy." },
          { id: "m6q6", question: "A vanity metric is one that:", options: ["Looks good but doesn't drive decisions", "Is always negative", "Requires complex calculation", "Is only available monthly"], correctIndex: 0, explanation: "Vanity metrics (like total page views without context) look impressive but don't lead to actionable business decisions." },
        ]},
      ],
    },
  ],
};
