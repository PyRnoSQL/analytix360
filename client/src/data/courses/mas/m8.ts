import type { CourseModule } from "../../../lms/types";

const m8: CourseModule = {
  id: "mas-m8",
  number: 8,
  title: "Campaign Management, Reporting & Strategy",
  summary:
    "Master end-to-end campaign management, executive reporting, A/B testing methodology, and data-driven marketing strategy to drive business growth.",
  hours: 6,
  lessons: [
    {
      id: "mas-m8-l1",
      title: "Campaign Planning & Execution Framework",
      minutes: 45,
      objectives: [
        "Design a structured campaign plan with objectives, targeting, channels, and KPIs",
        "Apply the RACE framework (Reach, Act, Convert, Engage) to campaign design",
        "Create campaign timelines with milestones and accountability checkpoints",
      ],
      blocks: [
        { type: "h", text: "Structured Campaign Planning" },
        {
          type: "p",
          text: "Effective marketing campaigns begin long before the first ad runs. A structured planning framework ensures every campaign aligns with business objectives, targets the right audience, uses appropriate channels, and measures what matters. In the Cameroonian market, where marketing budgets must deliver maximum impact, disciplined campaign planning separates successful marketers from those who waste resources on unfocused efforts.",
        },
        {
          type: "callout", tone: "tip",
          title: "Industry Standard",
          text: "The RACE framework — Reach, Act, Convert, Engage — provides a funnel-based structure for planning digital marketing campaigns. Each stage has distinct KPIs and tactics.",
        },
        {
          type: "table",
          head: ["RACE Stage", "Objective", "Key Tactics", "Primary KPI"],
          rows: [
            ["Reach", "Build awareness", "SEO, social ads, PR, display", "Impressions / reach"],
            ["Act", "Drive interaction", "Content marketing, landing pages", "Visits / bounce rate"],
            ["Convert", "Generate sales/leads", "Email nurture, retargeting, promos", "Conversion rate / CPA"],
            ["Engage", "Build loyalty", "Loyalty programs, community, CRM", "Retention rate / CLV"],
          ],
        },
        {
          type: "h", text: "Campaign Brief Template"
        },
        {
          type: "p",
          text: "Every campaign should start with a written brief that forces clarity. The brief documents the business context, target audience, value proposition, channel strategy, budget allocation, timeline, and success metrics. Without this discipline, campaigns drift from their objectives and become impossible to evaluate.",
        },
        {
          type: "steps",
          items: [
            "Define campaign objective — tie to a specific business goal (e.g., increase mobile money sign-ups by 15% in Q2)",
            "Identify target audience — use personas and segmentation from Module 4",
            "Craft value proposition — what benefit does the audience receive?",
            "Select channels — match channels to audience behavior and budget",
            "Set budget — allocate across channels with contingency reserve (10-15%)",
            "Build timeline — milestones for creative development, launch, optimization, wrap-up",
            "Define KPIs — leading indicators (clicks, sign-ups) and lagging indicators (revenue, CLV)",
            "Assign accountability — who owns each deliverable and decision?",
          ],
        },
        {
          type: "h", text: "Budget Allocation Strategy"
        },
        {
          type: "p",
          text: "Budget allocation should follow the 70-20-10 rule for mature marketing teams: 70% on proven channels with predictable ROI, 20% on emerging channels showing promise, and 10% on experimental approaches. For newer teams, a more conservative 80-15-5 split reduces risk while still allowing learning.",
        },
        {
          type: "sheet",
          id: "mas-m8-l1-budget",
          title: "Campaign Budget Allocator",
          task: "Review the budget allocation across channels for a 5,000,000 FCFA campaign. Adjust the Allocation % column so the total stays at 100 % and verify that Budget FCFA and CPA update correctly.",
          data: [
            ["Channel", "Allocation %", "Budget (FCFA)", "Expected Reach", "CPM (FCFA)", "Est. Conversions", "CPA (FCFA)"],
            ["Facebook/Instagram Ads", 35, 1750000, 250000, 7000, 875, 2000],
            ["Google Search Ads", 25, 1250000, 50000, 25000, 1250, 1000],
            ["Radio Spots", 15, 750000, 180000, 4167, 300, 2500],
            ["SMS Campaign", 10, 500000, 100000, 5000, 500, 1000],
            ["Influencer Partnership", 10, 500000, 75000, 6667, 375, 1333],
            ["Experimental / Reserve", 5, 250000, 0, 0, 0, 0],
          ],
          editable: ["B2", "B3", "B4", "B5", "B6", "B7"],
          checks: [
            { cell: "B8", equals: 100, tol: 1 },
          ],
          hint: "The total allocation must remain at 100 %. Adjusting one channel means reducing another.",
        },
        {
          type: "check", id: "mas-m8-ck1",
          question: "In the RACE framework, which stage focuses on converting visitors into customers through tactics like email nurture and retargeting?",
          options: ["Reach", "Act", "Convert", "Engage"],
          answer: 2,
          explain: "This stage is about turning interest into action — the moment a prospect becomes a customer.",
        },
        {
          type: "form",
          id: "mas-m8-l1-lab1",
          title: "Lab: Campaign Brief Builder",
          level: "intermediate" as const,
          task:
            "A microfinance institution in Douala wants to launch a campaign to increase mobile savings account sign-ups among market vendors aged 25-45. Total budget: 5,000,000 FCFA over 8 weeks. Design the campaign brief.",
          fields: [
            { kind: "text", label: "Campaign Objective (SMART format)" },
            { kind: "text", label: "Target Audience Description" },
            { kind: "text", label: "Value Proposition" },
            { kind: "select", label: "Primary Channel", options: ["Facebook Ads", "SMS Marketing", "Radio", "Community Events", "WhatsApp Business"], answer: 0 },
            { kind: "select", label: "Secondary Channel", options: ["Facebook Ads", "SMS Marketing", "Radio", "Community Events", "WhatsApp Business"], answer: 0 },
            { kind: "text", label: "Primary KPI & Target" },
            { kind: "text", label: "Campaign Duration (weeks)" },
          ],
        },
      ],
    },
    {
      id: "mas-m8-l2",
      title: "A/B Testing & Experimentation",
      minutes: 50,
      objectives: [
        "Design statistically valid A/B tests for marketing campaigns",
        "Calculate required sample sizes and interpret test results with confidence intervals",
        "Apply multi-variate testing principles to optimize landing pages and email campaigns",
      ],
      blocks: [
        { type: "h", text: "The Science of Marketing Experimentation" },
        {
          type: "p",
          text: "A/B testing transforms marketing from guesswork into science. By systematically comparing variations against a control, marketers can make data-driven decisions about messaging, design, pricing, and channel strategy. The key is statistical rigor — without proper sample sizes and significance testing, you risk making decisions based on random noise rather than real differences.",
        },
        {
          type: "callout", tone: "tip",
          title: "Statistical Foundation",
          text: "An A/B test is a randomized controlled experiment. The null hypothesis (H₀) states there is no difference between variants. We reject H₀ only when the p-value falls below our significance level (typically α = 0.05), meaning there is less than a 5% probability the observed difference occurred by chance.",
        },
        {
          type: "h", text: "Sample Size Determination"
        },
        {
          type: "p",
          text: "Before launching any test, calculate the minimum sample size needed to detect a meaningful difference. Running tests with insufficient sample sizes leads to inconclusive results and wasted time. The required sample size depends on three factors: baseline conversion rate, minimum detectable effect (MDE), and desired statistical power.",
        },
        {
          type: "table",
          head: ["Baseline Rate", "MDE (Relative)", "Power 80%", "Power 90%"],
          rows: [
            ["2%", "25% (→ 2.5%)", "12,548 per variant", "16,810 per variant"],
            ["5%", "20% (→ 6%)", "7,126 per variant", "9,540 per variant"],
            ["10%", "15% (→ 11.5%)", "5,718 per variant", "7,654 per variant"],
            ["15%", "10% (→ 16.5%)", "6,940 per variant", "9,292 per variant"],
            ["25%", "10% (→ 27.5%)", "4,760 per variant", "6,374 per variant"],
          ],
        },
        {
          type: "h", text: "Test Design Best Practices"
        },
        {
          type: "list",
          items: [
            "Test one variable at a time — changing multiple elements makes it impossible to attribute results",
            "Run tests for full business cycles — at minimum one full week to capture day-of-week effects",
            "Decide success criteria before launching — pre-register your hypothesis and primary metric",
            "Account for novelty effect — new variants may initially perform better simply because they are new",
            "Segment results post-hoc — a test that shows no overall effect may reveal significant differences in sub-populations",
            "Document every test — build an organizational learning repository of what worked and what did not",
          ],
        },
        {
          type: "h", text: "Common A/B Testing Mistakes"
        },
        {
          type: "table",
          head: ["Mistake", "Consequence", "Prevention"],
          rows: [
            ["Peeking at results early", "Inflated false positive rate", "Set fixed evaluation date upfront"],
            ["Stopping at first significance", "Unreliable results", "Run to pre-calculated sample size"],
            ["Testing too many variants", "Diluted traffic, slow results", "Limit to 2-4 variants max"],
            ["Ignoring segment effects", "Missing actionable insights", "Plan segment analysis upfront"],
            ["No documentation", "Repeated failed experiments", "Maintain a test repository"],
          ],
        },
        {
          type: "python",
          id: "mas-m8-l2-abtest",
          title: "A/B Test Significance Calculator",
          task: "Run the A/B test calculator with the given campaign data. Then change the variant conversions to 170 and re-run to see how the result changes.",
          cells: [`# A/B Test Statistical Significance Calculator
import math

# --- Input your test results ---
control_visitors = 5000
control_conversions = 150
variant_visitors = 5000
variant_conversions = 195

# --- Calculations ---
p_control = control_conversions / control_visitors
p_variant = variant_conversions / variant_visitors
p_pooled = (control_conversions + variant_conversions) / (control_visitors + variant_visitors)

se = math.sqrt(p_pooled * (1 - p_pooled) * (1/control_visitors + 1/variant_visitors))
z_score = (p_variant - p_control) / se if se > 0 else 0

# Approximate p-value (two-tailed)
p_value = 2 * (1 - 0.5 * (1 + math.erf(abs(z_score) / math.sqrt(2))))

lift = ((p_variant - p_control) / p_control) * 100

print("=" * 50)
print("A/B TEST RESULTS")
print("=" * 50)
print(f"Control:  {p_control:.2%} ({control_conversions}/{control_visitors})")
print(f"Variant:  {p_variant:.2%} ({variant_conversions}/{variant_visitors})")
print(f"Lift:     {lift:+.1f}%")
print(f"Z-score:  {z_score:.3f}")
print(f"P-value:  {p_value:.4f}")
print(f"Result:   {'SIGNIFICANT (p < 0.05)' if p_value < 0.05 else 'NOT significant'}")
print()
print("Recommendation:", "Deploy variant" if p_value < 0.05 and lift > 0 else "Keep control / gather more data")`],
        },
        {
          type: "check", id: "mas-m8-ck2",
          question: "Why is it important to calculate sample size before launching an A/B test?",
          options: [
            "To reduce the cost of running the test",
            "To ensure the test can detect a meaningful difference with statistical confidence",
            "To make the test run faster",
            "To satisfy regulatory requirements",
          ],
          answer: 1,
          explain: "Think about what happens when you make decisions based on too little data.",
        },
        {
          type: "form",
          id: "mas-m8-l2-lab1",
          title: "Lab: A/B Test Design & Analysis",
          level: "advanced" as const,
          task:
            "An e-commerce site in Yaoundé wants to test two checkout page designs. Current conversion rate: 3.2%. They want to detect a 20% relative improvement. Design the test and analyze preliminary results.",
          fields: [
            { kind: "text", label: "Test Hypothesis (H₀ and H₁)" },
            { kind: "text", label: "Required Sample Size per Variant" },
            { kind: "text", label: "Estimated Test Duration (days)" },
            { kind: "text", label: "Primary Success Metric" },
            { kind: "text", label: "Guardrail Metric (what must NOT decrease)" },
            { kind: "text", label: "Post-hoc Segments to Analyze" },
          ],
        },
      ],
    },
    {
      id: "mas-m8-l3",
      title: "Executive Dashboard Design & Data Storytelling",
      minutes: 50,
      objectives: [
        "Design executive dashboards that surface actionable insights at a glance",
        "Apply the Pyramid Principle to structure marketing reports for senior leadership",
        "Create data narratives that connect marketing metrics to business outcomes",
      ],
      blocks: [
        { type: "h", text: "Dashboards That Drive Decisions" },
        {
          type: "p",
          text: "An executive dashboard is not a collection of charts — it is a decision-support tool. The best dashboards answer three questions in under 10 seconds: Are we on track? Where are the problems? What needs attention? Most marketing dashboards fail because they show activity metrics (posts published, emails sent) rather than outcome metrics (revenue influenced, cost per acquisition, customer lifetime value).",
        },
        {
          type: "callout", tone: "tip",
          title: "Dashboard Design Principle",
          text: "The 5-second rule: A well-designed dashboard should communicate its key message within 5 seconds. If an executive needs to study your dashboard to understand performance, it needs redesigning.",
        },
        {
          type: "h", text: "Dashboard Architecture"
        },
        {
          type: "table",
          head: ["Layer", "Content", "Update Frequency", "Audience"],
          rows: [
            ["Executive Summary", "3-5 KPIs with trend arrows, overall health score", "Daily / Weekly", "C-Suite, Board"],
            ["Channel Performance", "Channel-level metrics, budget vs. actual, ROAS", "Weekly", "Marketing Director"],
            ["Campaign Detail", "Individual campaign metrics, A/B test results", "Daily", "Campaign Managers"],
            ["Diagnostic", "Funnel analysis, cohort trends, anomaly alerts", "Real-time", "Analysts"],
          ],
        },
        {
          type: "h", text: "The Pyramid Principle for Marketing Reports"
        },
        {
          type: "p",
          text: "Barbara Minto's Pyramid Principle structures communication top-down: lead with the conclusion, then support with key arguments, then provide evidence. For marketing reports, this means starting with the business impact ('Revenue from marketing grew 12% QoQ'), then supporting arguments ('Digital channels drove 65% of new acquisition'), then detailed data. Executives read from the top; analysts read to the bottom.",
        },
        {
          type: "steps",
          items: [
            "Situation — Provide context the audience already knows (Q3 campaign launched August 1 targeting urban millennials)",
            "Complication — State what changed or what the problem is (CPA increased 35% mid-campaign due to competitor activity)",
            "Resolution — Present your recommendation with data support (Shift 20% of budget from display to social; projected CPA reduction of 18%)",
            "Evidence — Back each claim with specific metrics, charts, and statistical analysis",
          ],
        },
        {
          type: "h", text: "Visualization Best Practices for Executives"
        },
        {
          type: "list",
          items: [
            "Use consistent color coding — green for above target, red for below, grey for benchmark",
            "Show trends, not just snapshots — a number without context (vs. last period, vs. target) is meaningless",
            "Limit to 6-8 metrics per dashboard view — cognitive overload kills insight",
            "Include commentary — 1-2 sentence annotations explaining why a metric changed",
            "Make it actionable — every metric should connect to a decision someone can make",
          ],
        },
        {
          type: "chart",
          id: "mas-m8-l3-chart",
          title: "Q3 Marketing Performance vs Targets (score out of 100)",
          data: [
            { label: "Awareness (Reach)", value: 95 },
            { label: "Engagement (CTR)", value: 72 },
            { label: "Conversion (CVR)", value: 88 },
            { label: "Retention (NRR)", value: 79 },
            { label: "Revenue (ROAS)", value: 92 },
          ],
          kinds: ["bar"] as const,
          best: "bar" as const,
          question: "Which KPI area fell short of its Q3 target of 80 and needs the most attention?",
          explain: "Engagement (CTR) scored 72, below the Q3 target of 80. This is the area requiring the most attention in the next quarter's strategy.",
        },
        {
          type: "check", id: "mas-m8-ck3",
          question: "According to the Pyramid Principle, what should come first in a marketing report to executives?",
          options: [
            "Detailed methodology and data sources",
            "The conclusion and key recommendation",
            "Background context and market analysis",
            "A chronological account of campaign activities",
          ],
          answer: 1,
          explain: "Think about how busy executives read — they want the answer first, then the support.",
        },
        {
          type: "form",
          id: "mas-m8-l3-lab1",
          title: "Lab: Executive Dashboard Wireframe",
          level: "intermediate" as const,
          task:
            "The CMO of a telecom company in Douala wants a monthly marketing dashboard. The company runs campaigns across SMS, social media, radio, and retail promotions. Design the dashboard layout.",
          fields: [
            { kind: "text", label: "Top 5 KPIs for Summary Row" },
            { kind: "text", label: "Primary Chart (type + metric)" },
            { kind: "text", label: "Secondary Chart (type + metric)" },
            { kind: "text", label: "Detail Table Content" },
            { kind: "text", label: "Automated Alert Rules (when to flag)" },
            { kind: "select", label: "Data Refresh Frequency", options: ["Real-time", "Daily", "Weekly", "Monthly"], answer: 0 },
          ],
        },
      ],
    },
    {
      id: "mas-m8-l4",
      title: "Marketing Report Writing & Stakeholder Communication",
      minutes: 45,
      objectives: [
        "Write concise marketing reports that translate data into business recommendations",
        "Tailor reporting format and depth to different stakeholder audiences",
        "Present marketing ROI and attribution findings to non-technical stakeholders",
      ],
      blocks: [
        { type: "h", text: "Writing Reports That Get Read" },
        {
          type: "p",
          text: "Most marketing reports are never fully read. They are too long, too technical, and too focused on what happened rather than what it means. Effective marketing reports are structured documents that answer four questions: What did we do? What happened? Why did it happen? What should we do next? The best reports make the reader feel informed and confident in the recommended next steps.",
        },
        {
          type: "h", text: "Report Structure by Audience"
        },
        {
          type: "table",
          head: ["Audience", "Format", "Length", "Focus", "Metrics Level"],
          rows: [
            ["Board / CEO", "Executive summary", "1 page", "Business impact & strategic direction", "Revenue, market share, CLV"],
            ["CMO / VP Marketing", "Performance review", "3-5 pages", "Channel effectiveness & budget optimization", "ROAS, CPA, pipeline contribution"],
            ["Marketing Manager", "Campaign report", "5-10 pages", "Tactical performance & optimization", "CTR, conversion rate, engagement"],
            ["Analytics Team", "Technical deep-dive", "10+ pages", "Methodology, statistical analysis, data quality", "Confidence intervals, effect sizes, model accuracy"],
          ],
        },
        {
          type: "h", text: "The So-What Test"
        },
        {
          type: "p",
          text: "Every data point in your report must pass the 'so-what' test. If you cannot articulate why a metric matters and what action it implies, remove it. 'Email open rate was 22%' fails the test. 'Email open rate dropped from 28% to 22% after we increased frequency from 2x to 4x weekly, suggesting subscriber fatigue — recommend reverting to 2x weekly' passes. Data without context is noise; data with context and a recommendation is insight.",
        },
        {
          type: "callout", tone: "tip",
          title: "Pro Tip",
          text: "Use the 'Headlines First' technique: write every section heading as a complete sentence that conveys the finding. Instead of 'Social Media Performance,' write 'Social media drove 40% of new leads at 30% lower CPA than search.' A reader who only scans headings should understand the full story.",
        },
        {
          type: "h", text: "Communicating Attribution & ROI"
        },
        {
          type: "p",
          text: "Attribution is one of marketing's most complex topics, but executives don't need to understand the methodology — they need to trust the result and know what to do with it. When presenting attribution findings, lead with the business decision the data supports, briefly explain the model used, acknowledge limitations, and provide a confidence range rather than a single number.",
        },
        {
          type: "table",
          head: ["Attribution Model", "Best For", "Limitation", "How to Explain"],
          rows: [
            ["Last Touch", "Short sales cycles, direct response", "Ignores awareness channels", "Credits the final interaction before purchase"],
            ["First Touch", "Brand awareness campaigns", "Ignores conversion optimization", "Credits the channel that introduced the customer"],
            ["Linear", "Multi-channel campaigns", "Treats all touchpoints equally", "Splits credit equally across all interactions"],
            ["Time Decay", "Long sales cycles", "De-values early awareness", "Gives more credit to recent interactions"],
            ["Data-Driven", "Large datasets, sophisticated teams", "Requires significant data volume", "Uses algorithms to assign credit based on actual impact"],
          ],
        },
        {
          type: "check", id: "mas-m8-ck4",
          question: "What does the 'so-what' test require for every data point in a marketing report?",
          options: [
            "Statistical significance at p < 0.05",
            "Comparison to at least three competitors",
            "A clear connection to why it matters and what action it implies",
            "Visualization in chart format",
          ],
          answer: 2,
          explain: "Think about what separates data from insight.",
        },
        {
          type: "form",
          id: "mas-m8-l4-lab1",
          title: "Lab: Monthly Marketing Report",
          level: "advanced" as const,
          task:
            "Write the executive summary section of a monthly marketing report for a beverage distributor in Cameroon. Q3 digital spend was 8,000,000 FCFA. Results: 2,400 new customers acquired (target: 2,000), CPA of 3,333 FCFA (target: 4,000), but retention rate dropped from 65% to 52%.",
          fields: [
            { kind: "text", label: "Report Headline (complete sentence)" },
            { kind: "text", label: "Executive Summary (3-4 sentences)" },
            { kind: "text", label: "Key Wins (with data)" },
            { kind: "text", label: "Key Concerns (with data)" },
            { kind: "text", label: "Top 3 Recommendations" },
            { kind: "text", label: "Immediate Next Steps" },
          ],
        },
      ],
    },
    {
      id: "mas-m8-l5",
      title: "Data-Driven Marketing Strategy & Career Development",
      minutes: 45,
      objectives: [
        "Build a data-driven marketing strategy aligned with organizational maturity level",
        "Apply the marketing analytics maturity model to assess and advance organizational capabilities",
        "Chart career development paths in marketing analytics from analyst to strategic leadership",
      ],
      blocks: [
        { type: "h", text: "Marketing Analytics Maturity Model" },
        {
          type: "p",
          text: "Organizations progress through distinct stages of marketing analytics maturity. Understanding where your organization sits on this spectrum helps you set realistic goals, prioritize investments, and build capabilities in the right sequence. Trying to do predictive modeling when you cannot reliably track basic campaign metrics is a recipe for failure.",
        },
        {
          type: "table",
          head: ["Level", "Stage", "Capabilities", "Typical Tools", "Team Size"],
          rows: [
            ["1", "Ad Hoc", "Manual reporting, spreadsheet analysis, gut-feel decisions", "Excel, basic Google Analytics", "0-1 analysts"],
            ["2", "Descriptive", "Automated dashboards, standardized KPIs, historical trend analysis", "Google Analytics, Tableau, SQL", "2-3 analysts"],
            ["3", "Diagnostic", "Attribution modeling, customer segmentation, funnel analysis", "CRM, marketing automation, statistical tools", "4-6 analysts"],
            ["4", "Predictive", "Propensity models, CLV prediction, demand forecasting", "Python/R, ML platforms, CDP", "6-10 data scientists & analysts"],
            ["5", "Prescriptive", "Real-time optimization, automated decisioning, AI-driven personalization", "AI/ML platforms, real-time data infrastructure", "10+ with dedicated data engineering"],
          ],
        },
        {
          type: "h", text: "Building a Data-Driven Strategy"
        },
        {
          type: "steps",
          items: [
            "Audit current state — Assess data infrastructure, team skills, tool stack, and decision-making processes",
            "Define the target state — Where should the organization be in 12-18 months? Be realistic about the jump (one level at a time)",
            "Identify gaps — What data, tools, skills, and processes are missing?",
            "Prioritize quick wins — Start with projects that demonstrate value within 60-90 days",
            "Build the business case — Quantify the ROI of analytics investments using pilot project results",
            "Create a roadmap — Phase investments across quarters with clear milestones and success criteria",
            "Establish governance — Define data ownership, quality standards, and privacy compliance",
            "Invest in people — Training, hiring, and retention strategy for analytics talent",
          ],
        },
        {
          type: "h", text: "Career Paths in Marketing Analytics"
        },
        {
          type: "p",
          text: "Marketing analytics offers diverse career paths spanning technical depth and strategic breadth. The field is growing rapidly across Africa as organizations digitize and competition intensifies. Whether you pursue a technical specialist track or a management track, the foundation is the same: deep understanding of marketing principles combined with strong analytical skills.",
        },
        {
          type: "table",
          head: ["Level", "Role", "Key Skills", "Experience", "Salary Range (FCFA/year)"],
          rows: [
            ["Entry", "Marketing Analyst", "Excel, SQL, basic statistics, reporting", "0-2 years", "3,000,000 - 5,000,000"],
            ["Mid", "Senior Marketing Analyst", "Python/R, A/B testing, segmentation, dashboards", "2-5 years", "5,000,000 - 9,000,000"],
            ["Senior", "Marketing Data Scientist", "ML models, predictive analytics, experimentation design", "5-8 years", "9,000,000 - 15,000,000"],
            ["Lead", "Head of Marketing Analytics", "Strategy, team leadership, stakeholder management", "8-12 years", "15,000,000 - 25,000,000"],
            ["Executive", "VP/Director of Data & Analytics", "Organizational transformation, P&L impact, board reporting", "12+ years", "25,000,000+"],
          ],
        },
        {
          type: "callout", tone: "tip",
          title: "Career Advice",
          text: "The most successful marketing analytics professionals combine three things: technical skills (statistics, programming, tools), business acumen (understanding marketing strategy, customer behavior, and financial metrics), and communication skills (translating data into stories that drive action). Invest in all three.",
        },
        {
          type: "h", text: "Building Your Analytics Portfolio"
        },
        {
          type: "list",
          items: [
            "Document 3-5 case studies showing business impact from your analytics work",
            "Contribute to open-source marketing analytics tools or publish analysis on platforms like Medium or LinkedIn",
            "Earn relevant certifications: Google Analytics, HubSpot, Meta Blueprint, or institute-specific credentials like MAS",
            "Build a personal dashboard project that demonstrates your technical and visualization skills",
            "Network with marketing analytics communities — both local (Cameroon Data Science) and global",
            "Stay current with industry trends through resources like Marketing Analytics Summit, Measure Camp, and Analytics Vidhya",
          ],
        },
        {
          type: "check", id: "mas-m8-ck5",
          question: "An organization has automated dashboards and standardized KPIs but has not yet implemented customer segmentation or attribution modeling. What maturity level is it at?",
          options: ["Level 1 — Ad Hoc", "Level 2 — Descriptive", "Level 3 — Diagnostic", "Level 4 — Predictive"],
          answer: 1,
          explain: "Match the described capabilities to the maturity model. Automated dashboards and standard KPIs are characteristic of a specific level.",
        },
        {
          type: "form",
          id: "mas-m8-l5-lab1",
          title: "Lab: Analytics Maturity Assessment & Roadmap",
          level: "advanced" as const,
          task:
            "You are hired as the first marketing analyst at a growing agribusiness company in Cameroon. They currently track sales in Excel and run Facebook ads with no conversion tracking. Assess their maturity and create a 12-month roadmap.",
          fields: [
            { kind: "text", label: "Current Maturity Level (1-5)" },
            { kind: "text", label: "Target Level in 12 Months" },
            { kind: "text", label: "Q1 Priorities (quick wins)" },
            { kind: "text", label: "Q2 Priorities (foundation)" },
            { kind: "text", label: "Tools to Implement (prioritized)" },
            { kind: "text", label: "Business Case for Investment (1 paragraph)" },
            { kind: "text", label: "Skills to Develop or Hire" },
          ],
        },
      ],
    },
    {
      id: "mas-m8-practice",
      title: "Practice: Campaign Management & Strategy",
      minutes: 60,
      objectives: [
        "Apply end-to-end campaign planning, testing, and reporting skills in realistic scenarios",
        "Demonstrate ability to design experiments, interpret results, and communicate findings",
        "Build strategic marketing analytics roadmaps for organizations at different maturity levels",
      ],
      blocks: [
        { type: "h", text: "Practice Labs — Campaign Management & Strategy" },
        {
          type: "p",
          text: "Complete these practice labs to demonstrate mastery of campaign management, experimentation, reporting, and strategic planning. Each lab builds on skills from across the entire MAS program.",
        },
        {
          type: "sorter",
          id: "mas-m8-practice-lab1",
          title: "Lab 1: Campaign Launch Sequence (Beginner)",
          level: "beginner" as const,
          task: "Arrange each campaign step under the correct phase of the launch process.",
          layout: "columns" as const,
          buckets: [
            { label: "Phase 1: Planning", desc: "Strategic groundwork before anything goes live" },
            { label: "Phase 2: Preparation", desc: "Building and configuring before launch" },
            { label: "Phase 3: Execution", desc: "Live campaign management" },
            { label: "Phase 4: Review", desc: "Post-campaign analysis and documentation" },
          ],
          items: [
            { text: "Define campaign objectives and KPIs", bucket: 0, explain: "Objectives come first — everything else follows from what you are trying to achieve." },
            { text: "Identify and segment target audience", bucket: 0, explain: "Audience definition is part of strategic planning, before creative or channel work begins." },
            { text: "Develop creative assets and messaging", bucket: 1, explain: "Creative is built after strategy is set but before launch." },
            { text: "Set up tracking and attribution", bucket: 1, explain: "Tracking must be configured and tested before the campaign goes live." },
            { text: "Launch campaign on selected channels", bucket: 2, explain: "The actual launch happens once planning and preparation are complete." },
            { text: "Monitor performance and optimize", bucket: 2, explain: "Active monitoring and optimization happen while the campaign is running." },
            { text: "Analyze results and calculate ROI", bucket: 3, explain: "Post-campaign analysis measures what actually happened against objectives." },
            { text: "Document learnings and report to stakeholders", bucket: 3, explain: "Final documentation captures insights for future campaigns." },
          ],
        },
        {
          type: "form",
          id: "mas-m8-practice-lab2",
          title: "Lab 2: Multi-Channel Campaign Analysis (Intermediate)",
          level: "intermediate" as const,
          task:
            "A retail chain in Douala ran a 4-week holiday campaign across 3 channels. Facebook: 2,000,000 FCFA spend → 45,000 clicks → 1,800 purchases. Google: 1,500,000 FCFA spend → 12,000 clicks → 960 purchases. SMS: 500,000 FCFA spend → 25,000 delivered → 750 purchases. Average order value: 15,000 FCFA. Analyze performance and recommend budget reallocation.",
          fields: [
            { kind: "text", label: "Facebook ROAS" },
            { kind: "text", label: "Google ROAS" },
            { kind: "text", label: "SMS ROAS" },
            { kind: "text", label: "Best Performing Channel & Why" },
            { kind: "text", label: "Recommended Budget Reallocation" },
            { kind: "text", label: "A/B Test Proposal for Next Campaign" },
          ],
        },
        {
          type: "sheet",
          id: "mas-m8-practice-lab3",
          level: "advanced" as const,
          title: "Lab 3: Campaign ROI Dashboard (Advanced)",
          task: "You have campaign data for three Cameroonian campaigns. Calculate the overall ROAS for each campaign by combining its channels, then identify which individual channel entry has the highest ROAS.",
          data: [
            ["Campaign", "Channel", "Spend (FCFA)", "Impressions", "Clicks", "Conversions", "Revenue (FCFA)", "CTR %", "CVR %", "ROAS"],
            ["Back to School", "Facebook", 1200000, 180000, 5400, 324, 4860000, 3.0, 6.0, 4.05],
            ["Back to School", "Google", 800000, 40000, 3200, 256, 3840000, 8.0, 8.0, 4.80],
            ["Back to School", "SMS", 300000, 50000, 2500, 175, 2625000, 5.0, 7.0, 8.75],
            ["Holiday Promo", "Facebook", 2000000, 300000, 9000, 450, 9000000, 3.0, 5.0, 4.50],
            ["Holiday Promo", "Radio", 1500000, 200000, 0, 180, 3600000, 0, 0, 2.40],
            ["New Year Sale", "Facebook", 1000000, 150000, 6000, 360, 5400000, 4.0, 6.0, 5.40],
            ["New Year Sale", "WhatsApp", 200000, 30000, 4500, 270, 4050000, 15.0, 6.0, 20.25],
          ],
          editable: ["J9"],
          checks: [
            { cell: "J9", equals: 20.25, tol: 0.1 },
          ],
          hint: "ROAS = Revenue ÷ Spend. Check the WhatsApp channel row.",
        },
        {
          type: "python",
          id: "mas-m8-practice-lab4",
          level: "expert" as const,
          title: "Lab 4: Strategic Marketing Analytics Assessment (Expert)",
          task: "Run the maturity assessment for the default scores. Then change the scores to reflect a company that has invested heavily in data infrastructure (score 4) but has weak experimentation culture (score 1). Re-run and compare the action plan.",
          cells: [`# Marketing Analytics Maturity Scorer & Strategy Generator
# Assess an organization and generate recommendations

print("=" * 60)
print("MARKETING ANALYTICS MATURITY ASSESSMENT")
print("=" * 60)

# --- Scoring rubric (1-5 scale for each dimension) ---
dimensions = {
    "Data Infrastructure": {
        "score": 2,
        "indicators": {
            1: "No centralized data; manual exports",
            2: "Basic tracking (GA, spreadsheets)",
            3: "Data warehouse, automated ETL",
            4: "CDP, real-time data pipelines",
            5: "Unified data platform, ML-ready"
        }
    },
    "Analytics Capability": {
        "score": 1,
        "indicators": {
            1: "Ad hoc spreadsheet analysis",
            2: "Standard dashboards and reports",
            3: "Statistical analysis, segmentation",
            4: "Predictive models in production",
            5: "AI-driven automated decisioning"
        }
    },
    "Experimentation Culture": {
        "score": 1,
        "indicators": {
            1: "No testing; decisions by opinion",
            2: "Occasional informal tests",
            3: "Structured A/B testing program",
            4: "Multi-variate testing, holdout groups",
            5: "Continuous experimentation platform"
        }
    },
    "Team & Skills": {
        "score": 2,
        "indicators": {
            1: "No dedicated analytics role",
            2: "1-2 analysts (Excel/SQL)",
            3: "Analytics team with mixed skills",
            4: "Data science team with specializations",
            5: "Center of excellence, embedded analysts"
        }
    },
    "Decision Integration": {
        "score": 1,
        "indicators": {
            1: "Data rarely used in decisions",
            2: "Data reviewed after decisions made",
            3: "Data informs major decisions",
            4: "Data-first culture, metrics-driven",
            5: "Automated optimization, AI assists"
        }
    }
}

# --- Calculate scores ---
total = sum(d["score"] for d in dimensions.values())
max_total = len(dimensions) * 5
maturity_pct = (total / max_total) * 100

if maturity_pct <= 25:
    overall_level = "Level 1: Ad Hoc"
elif maturity_pct <= 45:
    overall_level = "Level 2: Descriptive"
elif maturity_pct <= 65:
    overall_level = "Level 3: Diagnostic"
elif maturity_pct <= 85:
    overall_level = "Level 4: Predictive"
else:
    overall_level = "Level 5: Prescriptive"

print(f"\\nOverall Maturity: {overall_level}")
print(f"Composite Score: {total}/{max_total} ({maturity_pct:.0f}%)")
print()

# --- Dimension breakdown ---
print("DIMENSION SCORES:")
print("-" * 50)
weakest = min(dimensions.items(), key=lambda x: x[1]["score"])
strongest = max(dimensions.items(), key=lambda x: x[1]["score"])

for name, info in dimensions.items():
    bar = "█" * info["score"] + "░" * (5 - info["score"])
    marker = " ← weakest" if name == weakest[0] else (" ← strongest" if name == strongest[0] else "")
    print(f"  {name:25s} [{bar}] {info['score']}/5{marker}")
    print(f"    Current: {info['indicators'][info['score']]}")

# --- Recommendations ---
print()
print("=" * 60)
print("90-DAY ACTION PLAN")
print("=" * 60)

priorities = sorted(dimensions.items(), key=lambda x: x[1]["score"])
for i, (name, info) in enumerate(priorities[:3], 1):
    next_level = min(info["score"] + 1, 5)
    print(f"\\n  Priority {i}: {name}")
    print(f"    Current: Level {info['score']} → Target: Level {next_level}")
    print(f"    Next milestone: {info['indicators'][next_level]}")

print()
print("Modify the scores above to assess different organizations.")
print("Each dimension is scored 1-5 based on current capabilities.")`],
        },
      ],
    },
  ],
  quiz: {
    id: "mas-m8-quiz",
    title: "Module 8 Quiz",
    passPct: 70,
    questions: [
      {
        id: "mas-m8-q1",
        question: "In the RACE framework, which stage focuses on building long-term customer relationships through loyalty programs and community building?",
        options: ["Reach", "Act", "Convert", "Engage"],
        answer: 3,
        explain: "Engage is the final RACE stage — it focuses on nurturing existing customers through loyalty programs, email nurture, community building, and repeat-purchase incentives.",
      },
      {
        id: "mas-m8-q2",
        question: "What is the recommended budget allocation split for mature marketing teams according to the 70-20-10 rule?",
        options: [
          "70% digital, 20% traditional, 10% events",
          "70% proven channels, 20% emerging channels, 10% experimental",
          "70% awareness, 20% conversion, 10% retention",
          "70% media spend, 20% creative, 10% analytics",
        ],
        answer: 1,
        explain: "The 70-20-10 rule allocates 70% of budget to proven channels with predictable ROI, 20% to emerging channels showing promise, and 10% to experimental approaches for learning.",
      },
      {
        id: "mas-m8-q3",
        question: "Why is it dangerous to peek at A/B test results before reaching the pre-calculated sample size?",
        options: [
          "It violates data privacy regulations",
          "It increases the cost of running the test",
          "It inflates the false positive rate, leading to unreliable conclusions",
          "It reduces the conversion rate of the variant",
        ],
        answer: 2,
        explain: "Peeking inflates the false positive rate because early results are noisy. With multiple looks, you increase the chance of seeing a 'significant' result that is actually random variation.",
      },
      {
        id: "mas-m8-q4",
        question: "What does the '5-second rule' mean in executive dashboard design?",
        options: [
          "Dashboards should load within 5 seconds",
          "A well-designed dashboard should communicate its key message within 5 seconds",
          "Users should be able to customize the dashboard in 5 seconds",
          "Data should refresh every 5 seconds",
        ],
        answer: 1,
        explain: "The 5-second rule means an executive should grasp the key message — are we on track, where are the problems — within 5 seconds of looking at the dashboard, without needing to read fine print.",
      },
      {
        id: "mas-m8-q5",
        question: "According to the Pyramid Principle, marketing reports should be structured:",
        options: [
          "Chronologically, from campaign start to end",
          "By channel, from highest spend to lowest",
          "Top-down: conclusion first, then supporting arguments, then evidence",
          "Bottom-up: raw data first, then analysis, then recommendations",
        ],
        answer: 2,
        explain: "The Pyramid Principle structures communication top-down: lead with the conclusion, then supporting arguments, then evidence. Executives read from the top; analysts read deeper.",
      },
      {
        id: "mas-m8-q6",
        question: "What does the 'so-what' test require for data points in a marketing report?",
        options: [
          "Each data point must be statistically significant",
          "Each data point must have a visual representation",
          "Each data point must connect to why it matters and what action it implies",
          "Each data point must be compared to industry benchmarks",
        ],
        answer: 2,
        explain: "The so-what test ensures every data point is connected to a business implication and a recommended action. Data without context or actionability is noise in a report.",
      },
      {
        id: "mas-m8-q7",
        question: "An organization has basic Google Analytics tracking and Excel-based reporting but no automated dashboards or standardized KPIs. What maturity level is it at?",
        options: [
          "Level 1 — Ad Hoc",
          "Level 2 — Descriptive",
          "Level 3 — Diagnostic",
          "Level 4 — Predictive",
        ],
        answer: 0,
        explain: "Level 1 (Ad Hoc) is characterised by basic tracking and manual spreadsheet analysis without standardised processes or automated reporting.",
      },
      {
        id: "mas-m8-q8",
        question: "Which attribution model is best suited for organizations with large datasets and sophisticated analytics teams?",
        options: [
          "Last Touch attribution",
          "Linear attribution",
          "Time Decay attribution",
          "Data-Driven attribution",
        ],
        answer: 3,
        explain: "Data-Driven attribution uses machine learning to assign credit based on actual conversion patterns. It requires large datasets and analytics expertise but gives the most accurate results.",
      },
    ],
  },
};

export { m8 };
