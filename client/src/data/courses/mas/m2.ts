import type { CourseModule } from "../../../lms/types";

/* ──────────────────────────────────────────────────────────────────────
   Module 2 — Data Collection & Market Research
   Marketing Analytics Specialist (MAS) Certification Course
   ────────────────────────────────────────────────────────────────────── */

const L1_ID = "mas-m2-l1";
const L2_ID = "mas-m2-l2";
const L3_ID = "mas-m2-l3";
const L4_ID = "mas-m2-l4";
const L5_ID = "mas-m2-l5";
const PRACTICE_ID = "mas-m2-practice";
const QUIZ_ID = "mas-m2-quiz";

export const m2: CourseModule = {
  id: "mas-m2",
  number: 2,
  title: "Data Collection & Market Research",
  summary:
    "This module covers the practical skills of gathering and preparing marketing data. You will learn to design effective surveys and questionnaires, apply sampling methods to ensure representative results, and set up A/B tests with proper controls. The module introduces web analytics concepts through Google Analytics 4, covers social listening basics, and addresses data quality challenges including cleaning, deduplication, and validation. Primary and secondary research methods are compared throughout, with all examples grounded in Central African market contexts using realistic data from Douala, Yaoundé, and Bafoussam businesses.",
  hours: 14,

  lessons: [
    /* ================================================================
       LESSON 1 — Survey design and questionnaire construction
       ================================================================ */
    {
      id: L1_ID,
      number: 1,
      title: "Survey design and questionnaire construction",
      minutes: 25,
      objectives: [
        "Design a marketing research survey with clear objectives, well-structured questions, and appropriate response scales.",
        "Identify and correct common sources of bias in survey questions, including leading, double-barrelled, and loaded questions.",
        "Select the appropriate question type (open-ended, closed, Likert scale, ranking) for different research objectives.",
      ],
      blocks: [
        {
          type: "p",
          text: "Surveys are among the most widely used tools in marketing research. They allow you to collect structured data from a defined population — customer satisfaction scores, brand preference rankings, purchase intent, and demographic profiles. However, a poorly designed survey produces misleading data that can drive costly marketing decisions in the wrong direction. This lesson teaches you to build surveys that generate reliable, actionable insights.",
        },
        {
          type: "h",
          text: "Survey design process",
        },
        {
          type: "steps",
          title: "From research question to final questionnaire",
          items: [
            "Define the research objective — what specific marketing question are you trying to answer? (e.g., 'Why did customer satisfaction drop 12 points at our Douala branches last quarter?')",
            "Identify the target population — who can provide the data you need? (e.g., customers who visited Douala branches in Q3 2025)",
            "Choose the survey method — online (Google Forms, SurveyMonkey), phone, face-to-face, SMS, or WhatsApp",
            "Draft questions — start with screening questions, move to core topics, end with demographics",
            "Select response formats — closed-ended for quantitative analysis, open-ended for qualitative depth",
            "Pilot test with 15–20 respondents — check for confusing wording, missing options, and completion time",
            "Revise and finalise — incorporate pilot feedback, check skip logic, and ensure mobile compatibility",
          ],
        },
        {
          type: "h",
          text: "Question types and when to use each",
        },
        {
          type: "table",
          head: ["Question type", "Best for", "Example"],
          rows: [
            [
              "Dichotomous (Yes/No)",
              "Screening, simple factual questions",
              "Have you purchased from our store in the past 3 months? (Yes / No)",
            ],
            [
              "Multiple choice",
              "Categorising respondents, identifying preferences",
              "How did you first hear about us? (Facebook / Friend referral / Radio ad / Walk-by / Other)",
            ],
            [
              "Likert scale (1–5 or 1–7)",
              "Measuring attitudes, satisfaction, agreement",
              "Rate your satisfaction with our delivery speed: 1 (Very dissatisfied) to 5 (Very satisfied)",
            ],
            [
              "Ranking",
              "Understanding relative preferences",
              "Rank the following factors by importance when choosing a mobile phone: Price / Camera quality / Battery life / Brand",
            ],
            [
              "Open-ended",
              "Exploratory insights, capturing unexpected themes",
              "What could we do to improve your shopping experience at our Yaoundé location?",
            ],
            [
              "Semantic differential",
              "Measuring brand perception on bipolar scales",
              "Rate our brand on each pair: Affordable __ __ __ __ __ Expensive",
            ],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "The 80/20 rule of question types",
          text: "For quantitative marketing surveys, aim for roughly 80 % closed-ended questions and 20 % open-ended. Closed questions are easy to analyse at scale. Open questions provide rich context but are time-consuming to code and analyse. One well-placed open-ended question (e.g., 'What is the main reason for your rating?') often provides more insight than five additional closed questions.",
        },
        {
          type: "h",
          text: "Common survey biases and how to fix them",
        },
        {
          type: "table",
          head: ["Bias type", "Bad example", "Why it is biased", "Corrected version"],
          rows: [
            [
              "Leading question",
              "Don't you agree that our new product is excellent?",
              "Pushes the respondent toward 'yes' with 'Don't you agree' and 'excellent'",
              "How would you rate the quality of our new product? (1–5 scale)",
            ],
            [
              "Double-barrelled",
              "How satisfied are you with our price and delivery speed?",
              "Combines two separate topics — respondent may be satisfied with one and not the other",
              "Split into two questions: one for price satisfaction, one for delivery satisfaction",
            ],
            [
              "Loaded question",
              "How often do you waste money on impulse purchases at our store?",
              "'Waste money' is a value judgement that shames the respondent",
              "How often do you make unplanned purchases when visiting our store?",
            ],
            [
              "Social desirability",
              "Do you always recycle your product packaging?",
              "'Always' and recycling is a socially desirable behaviour — respondents overstate",
              "In the past month, how many times did you recycle product packaging? (0, 1–2, 3–5, 6+)",
            ],
            [
              "Recall bias",
              "How many times did you visit our store in the past 12 months?",
              "Difficult to recall accurately over a long period",
              "How many times did you visit our store in the past 30 days? (0, 1, 2, 3, 4+)",
            ],
          ],
        },
        {
          type: "equip",
          title: "Questionnaire structure diagram",
          items: [
            {
              art: "qc-flowchart",
              caption: "Standard questionnaire flow from screening to close",
              callouts: [
                "Screening questions filter out ineligible respondents early",
                "Core questions move from general to specific (funnel approach)",
                "Sensitive or demographic questions placed last to avoid priming",
              ],
            },
          ],
        },
        {
          type: "check",
          id: "mas-m2-check-1",
          question: "A Yaoundé restaurant owner asks customers: 'How much did you enjoy our amazing new jollof rice recipe?' Which type of bias is present?",
          options: [
            "Recall bias",
            "Social desirability bias",
            "Leading question bias",
            "Double-barrelled question",
          ],
          answer: 2,
          explain: "The word 'amazing' leads the respondent toward a positive answer. A neutral version would be: 'How would you rate our new jollof rice recipe?' with a balanced scale.",
        },
        {
          type: "form",
          id: "mas-m2-form-bias",
          title: "Identify and fix survey question bias",
          task: "Review each survey question and identify the type of bias present. Select the best corrected version.",
          fields: [
            {
              kind: "select",
              label: "Original question: 'How satisfied are you with our fast delivery and friendly customer service?'",
              options: [
                "Leading bias — replace 'fast' and 'friendly' with neutral terms",
                "Double-barrelled — split into separate questions for delivery speed and customer service",
                "Recall bias — specify a time period for the experience",
                "Social desirability — remove the positive framing",
              ],
              answer: 1,
              explain: "This question asks about two topics (delivery AND customer service) in a single question. If delivery was fast but service was rude, the respondent cannot answer accurately. Split into: 'How satisfied are you with delivery speed?' and 'How satisfied are you with customer service friendliness?'",
            },
            {
              kind: "select",
              label: "Original question: 'Given that most people prefer locally made products, do you prefer local or imported goods?'",
              options: [
                "Double-barrelled — asks about two types of goods",
                "Recall bias — should specify a recent purchase occasion",
                "Leading bias — the premise pressures toward 'local'",
                "Loaded question — uses a value judgement",
              ],
              answer: 2,
              explain: "The premise 'most people prefer locally made products' creates social pressure to conform. A neutral version: 'When purchasing [product category], do you prefer locally manufactured or imported options, or have no preference?'",
            },
            {
              kind: "select",
              label: "Original question: 'How many litres of soft drinks does your household consume in a typical year?'",
              options: [
                "Leading bias — assumes the household drinks soft drinks",
                "Social desirability — soft drink consumption may be underreported",
                "Recall bias — annual consumption is very difficult to estimate accurately",
                "Loaded question — implies excessive consumption",
              ],
              answer: 2,
              explain: "Estimating annual litres of consumption is nearly impossible for most respondents. A better approach: 'In the past 7 days, how many soft drinks (any size) did anyone in your household purchase?' then extrapolate.",
            },
          ],
        },
      ],
    },

    /* ================================================================
       LESSON 2 — Sampling methods
       ================================================================ */
    {
      id: L2_ID,
      number: 2,
      title: "Sampling methods for marketing research",
      minutes: 25,
      objectives: [
        "Distinguish between probability and non-probability sampling methods and explain when each is appropriate.",
        "Calculate required sample size given confidence level, margin of error, and population proportion.",
        "Select the most appropriate sampling method for a given marketing research scenario in the Cameroon context.",
      ],
      blocks: [
        {
          type: "p",
          text: "In marketing research, surveying every member of your target population is rarely feasible. If you want to understand the brand preferences of all smartphone users in Douala (estimated at 1.2 million people), you cannot interview each one. Instead, you select a **sample** — a subset of the population that represents the whole. The quality of your sample determines the reliability of your findings. This lesson covers how to choose the right sampling method and how to calculate the sample size you need.",
        },
        {
          type: "h",
          text: "Probability vs non-probability sampling",
        },
        {
          type: "table",
          head: ["Category", "Key feature", "Methods", "When to use"],
          rows: [
            [
              "Probability",
              "Every member of the population has a known, non-zero chance of selection",
              "Simple random, systematic, stratified, cluster",
              "When you need statistically generalisable results — typically for large-scale market sizing, satisfaction benchmarks, or regulatory surveys",
            ],
            [
              "Non-probability",
              "Selection is based on convenience, judgement, or quotas — not random chance",
              "Convenience, purposive, quota, snowball",
              "When probability sampling is impractical — exploratory research, qualitative studies, hard-to-reach populations, rapid feedback",
            ],
          ],
        },
        {
          type: "h",
          text: "Probability sampling methods",
        },
        {
          type: "table",
          head: ["Method", "How it works", "Cameroon marketing example", "Pros / Cons"],
          rows: [
            [
              "Simple random",
              "Each member has an equal chance — select using random number generator",
              "Export 10,000 customer emails from the CRM, use a random generator to select 400 for a satisfaction survey",
              "Pro: unbiased. Con: needs a complete list (sampling frame)",
            ],
            [
              "Systematic",
              "Select every k-th member from an ordered list (k = population ÷ sample size)",
              "At Marché Central in Douala, survey every 20th customer who enters (k = 20) to measure brand awareness",
              "Pro: easy to implement in the field. Con: risk of periodicity if the list has a pattern",
            ],
            [
              "Stratified",
              "Divide population into subgroups (strata), then randomly sample within each stratum",
              "Stratify mobile money users by region (Littoral, Centre, West) and sample proportionally to measure payment preferences across Cameroon",
              "Pro: ensures representation of key subgroups. Con: requires knowledge of strata boundaries",
            ],
            [
              "Cluster",
              "Divide population into clusters (e.g., geographic areas), randomly select clusters, then survey all members within selected clusters",
              "Randomly select 15 neighbourhoods in Yaoundé, then survey all households in those neighbourhoods about water brand preferences",
              "Pro: cost-effective for geographic dispersion. Con: higher sampling error than stratified",
            ],
          ],
        },
        {
          type: "h",
          text: "Non-probability sampling methods",
        },
        {
          type: "table",
          head: ["Method", "How it works", "Cameroon marketing example"],
          rows: [
            [
              "Convenience",
              "Sample whoever is readily available",
              "A Bafoussam shop owner asks the first 50 customers on Monday morning what they think of the new store layout",
            ],
            [
              "Purposive (judgement)",
              "Researcher selects participants based on specific criteria",
              "Interview 20 restaurant owners in Douala who have adopted online ordering to understand adoption barriers",
            ],
            [
              "Quota",
              "Set quotas for key characteristics (age, gender, region) and fill them non-randomly",
              "A telecom survey requires 100 responses: 50 urban (Douala/Yaoundé), 50 rural, with gender balance within each group",
            ],
            [
              "Snowball",
              "Existing participants recruit future participants from their networks",
              "Studying luxury goods purchasing among high-net-worth individuals in Cameroon — each interviewee refers others in their network",
            ],
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Sampling in practice across Cameroon",
          text: "In many Cameroon market research scenarios, strict probability sampling is difficult. No comprehensive sampling frame exists for 'all household consumers in Bafoussam'. Researchers often use a hybrid approach: cluster sampling to select neighbourhoods, then systematic sampling within each cluster, combined with quotas for gender and age. This pragmatic approach balances statistical rigour with field realities.",
        },
        {
          type: "h",
          text: "Calculating sample size",
        },
        {
          type: "p",
          text: "The three key inputs to a sample size calculation are: **confidence level** (typically 95 %), **margin of error** (how much imprecision you accept, typically ±3 % to ±5 %), and **estimated population proportion** (p, your best guess at what percentage of the population has the characteristic you are measuring — use 0.5 if unknown, as this gives the largest, most conservative sample). The formula for a large population is:",
        },
        {
          type: "p",
          text: "**n = (Z² × p × (1 − p)) ÷ E²** where Z = 1.96 for 95 % confidence, p = estimated proportion, E = margin of error as a decimal.",
        },
        {
          type: "p",
          text: "**Worked example:** A mobile operator wants to estimate the percentage of prepaid subscribers in Yaoundé who would switch to a monthly data plan. Unknown proportion, so p = 0.5. They want 95 % confidence with ±4 % margin of error. n = (1.96² × 0.5 × 0.5) ÷ 0.04² = (3.8416 × 0.25) ÷ 0.0016 = 0.9604 ÷ 0.0016 = **600.25, round up to 601**. They need at least 601 responses.",
        },
        {
          type: "equip",
          title: "Sample size and margin of error relationship",
          items: [
            {
              art: "stat-normality",
              caption: "Normal distribution showing confidence interval width",
              callouts: [
                "95 % confidence captures values within ±1.96 standard deviations",
                "Doubling sample size reduces margin of error by a factor of √2, not by half",
                "Diminishing returns: going from n = 400 to n = 1,600 cuts MoE by only half",
              ],
            },
          ],
        },
        {
          type: "check",
          id: "mas-m2-check-2",
          question: "A Douala marketing agency wants to estimate brand awareness with 95 % confidence and ±5 % margin of error. Using p = 0.5, what is the minimum sample size?",
          options: [
            "196",
            "271",
            "385",
            "600",
          ],
          answer: 2,
          explain: "n = (1.96² × 0.5 × 0.5) ÷ 0.05² = (3.8416 × 0.25) ÷ 0.0025 = 0.9604 ÷ 0.0025 = 384.16, rounded up to 385.",
        },
        {
          type: "sheet",
          id: "mas-m2-sheet-sample",
          title: "Calculate sample sizes for different scenarios",
          task: "For each marketing research scenario, calculate the required sample size using the formula n = (Z² × p × (1 − p)) ÷ E². Use Z = 1.96 for 95 % confidence. Round up to the nearest whole number.",
          data: [
            ["Scenario", "Confidence", "Z", "p", "Margin of error (E)", "n (sample size)"],
            ["Brand awareness study (p unknown)", "95 %", 1.96, 0.50, 0.05, null],
            ["Customer satisfaction (est. 80 % satisfied)", "95 %", 1.96, 0.80, 0.04, null],
            ["Purchase intent (est. 30 % would buy)", "95 %", 1.96, 0.30, 0.03, null],
          ],
          editable: ["F2", "F3", "F4"],
          checks: [
            { cell: "F2", equals: 385, tol: 1 },
            { cell: "F3", equals: 385, tol: 1 },
            { cell: "F4", equals: 897, tol: 1 },
          ],
          hint: "n = (Z² × p × (1 − p)) ÷ E². For row 2: (1.96² × 0.5 × 0.5) ÷ 0.05². For row 3: note that 0.80 × 0.20 = 0.16, and E = 0.04. Always round up.",
          solution: {
            F2: "= (1.96² × 0.5 × 0.5) ÷ 0.05² = (3.8416 × 0.25) ÷ 0.0025 = 384.16 → 385",
            F3: "= (1.96² × 0.8 × 0.2) ÷ 0.04² = (3.8416 × 0.16) ÷ 0.0016 = 384.16 → 385",
            F4: "= (1.96² × 0.3 × 0.7) ÷ 0.03² = (3.8416 × 0.21) ÷ 0.0009 = 896.37 → 897",
          },
        },
      ],
    },

    /* ================================================================
       LESSON 3 — A/B testing fundamentals
       ================================================================ */
    {
      id: L3_ID,
      number: 3,
      title: "A/B testing fundamentals",
      minutes: 25,
      objectives: [
        "Explain the principles of A/B testing including control groups, treatment groups, and statistical significance.",
        "Design an A/B test for a marketing scenario with clear hypotheses, metrics, sample size, and duration.",
        "Interpret A/B test results and determine whether to implement or reject the variant.",
      ],
      blocks: [
        {
          type: "p",
          text: "**A/B testing** (also called split testing) is the gold standard for causal inference in marketing. It answers the question: 'If I change X, does it cause a measurable change in Y?' Unlike observational analysis (which shows correlation), a properly run A/B test isolates the effect of a single variable by randomly assigning users to a control group (A — the current version) and a treatment group (B — the modified version). The difference in outcomes between A and B, if statistically significant, is attributable to the change you made.",
        },
        {
          type: "h",
          text: "A/B testing anatomy",
        },
        {
          type: "table",
          head: ["Component", "Description", "Example"],
          rows: [
            [
              "Hypothesis",
              "A testable prediction of what change will produce what outcome",
              "Changing the call-to-action button from 'Buy Now' to 'Add to Cart' will increase the click rate by at least 10 %",
            ],
            [
              "Control (A)",
              "The current version — the baseline against which the variant is compared",
              "The existing product page with the 'Buy Now' button",
            ],
            [
              "Treatment (B)",
              "The modified version with exactly one variable changed",
              "The same product page but with 'Add to Cart' replacing 'Buy Now'",
            ],
            [
              "Primary metric",
              "The single metric used to determine success or failure",
              "Button click rate (clicks ÷ page views)",
            ],
            [
              "Sample size",
              "The number of users needed in each group for statistically reliable results",
              "Calculated based on desired minimum detectable effect, baseline rate, and statistical power",
            ],
            [
              "Duration",
              "How long the test runs — must account for weekly patterns and reach required sample size",
              "14 days minimum to capture weekday and weekend behaviour patterns",
            ],
            [
              "Statistical significance",
              "The threshold (typically p < 0.05) above which results are considered not due to chance",
              "A p-value of 0.03 means there is only a 3 % probability the observed difference is due to random variation",
            ],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Common A/B testing mistakes",
          text: "Do not stop a test early because results 'look significant' — this is called peeking and inflates false-positive rates. Do not test multiple changes simultaneously in a simple A/B test — you will not know which change caused the result. Do not ignore segment effects — a variant might win overall but lose badly for your most valuable customer segment.",
        },
        {
          type: "h",
          text: "Designing an A/B test: step-by-step",
        },
        {
          type: "steps",
          title: "A/B test design process",
          items: [
            "Identify the problem — what metric needs improvement? (e.g., email open rate is 12 %, below the 18 % industry benchmark)",
            "Form a hypothesis — state the change, the expected effect, and the mechanism (e.g., 'Personalising the subject line with the recipient's first name will increase open rate because it signals relevance')",
            "Define the primary metric — one metric that determines success (open rate), plus guardrail metrics that must not degrade (unsubscribe rate)",
            "Calculate sample size — use a sample size calculator with baseline rate, minimum detectable effect (MDE), power (80 %), and significance level (5 %)",
            "Set the duration — calculate based on daily traffic and required sample size; never less than 7 days (to capture weekly patterns)",
            "Randomise assignment — use server-side randomisation to split users into control and treatment; ensure the split is truly random",
            "Run the test — do not peek at results or change the test mid-flight",
            "Analyse results — compare the primary metric between groups; check for statistical significance (p < 0.05) and practical significance (is the effect large enough to matter?)",
          ],
        },
        {
          type: "p",
          text: "**Worked example — Awa Cosmetics (fictional, Douala):** The marketing team hypothesises that adding customer testimonials to the product page will increase the 'Add to Cart' rate. Current baseline: 8.5 % of product page visitors click 'Add to Cart'. The MDE is set at 1.5 percentage points (raising the rate to 10 %). Using a sample size calculator at 80 % power and 5 % significance: each group needs approximately 3,270 visitors. The website gets 1,200 product page visitors per day. With a 50/50 split, each group gets 600 per day. Required duration = 3,270 ÷ 600 = **5.5 days, rounded up to 14 days** (minimum to capture weekly cycles). After 14 days, Group A (no testimonials) shows 8.7 % conversion (510 ÷ 5,862), Group B (with testimonials) shows 10.4 % conversion (616 ÷ 5,923), p-value = 0.003. The result is statistically significant — the testimonials variant is implemented site-wide.",
        },
        {
          type: "equip",
          title: "A/B test result interpretation",
          items: [
            {
              art: "qc-histogram",
              caption: "Distribution of conversion rates under null hypothesis vs observed difference",
              callouts: [
                "The null hypothesis assumes no difference between A and B",
                "If the observed difference falls far enough from zero, we reject the null",
                "p < 0.05 means the observed result would occur by chance less than 5 % of the time",
              ],
            },
          ],
        },
        {
          type: "check",
          id: "mas-m2-check-3",
          question: "An A/B test comparing two email subject lines shows: Control open rate 14.2 % (n = 2,000), Treatment open rate 15.8 % (n = 2,000), p-value = 0.18. What should you do?",
          options: [
            "Implement the treatment — it has a higher open rate",
            "Do not implement — the result is not statistically significant (p > 0.05)",
            "Run the test for one more day to get significance",
            "Implement the treatment for half the audience only",
          ],
          answer: 1,
          explain: "A p-value of 0.18 means there is an 18 % probability the difference is due to random chance — well above the 5 % threshold. The result is not statistically significant, so you cannot conclude the treatment is better. Do not extend the test to chase significance — that inflates false positives.",
        },
        {
          type: "chart",
          id: "mas-m2-chart-ab",
          title: "A/B test results — Email subject line experiment at Douala Fresh",
          data: [
            { label: "Control: 'Your order is ready'", value: 14.2 },
            { label: "Variant B: 'Bonjour [Name], your order is ready'", value: 15.8 },
            { label: "Variant C: '⚡ [Name], fresh delivery waiting!'", value: 18.6 },
          ],
          unit: "% open rate",
          kinds: ["bar"],
          best: "bar",
          question: "If the baseline (Control) was 14.2 % and Variant C achieved 18.6 %, what is the relative lift? If the p-value for Variant C vs Control is 0.001, what is your recommendation?",
          explain: "Relative lift = (18.6 − 14.2) ÷ 14.2 × 100 = 31.0 %. With p = 0.001 (well below 0.05), the result is highly significant. Recommend implementing Variant C. The personalised, emoji-enhanced subject line with urgency cues ('fresh delivery waiting') drives meaningfully higher engagement. Note: this was an A/B/C test (multivariate), requiring Bonferroni correction if strict multiple comparison adjustment is desired (adjusted threshold: 0.05 ÷ 2 = 0.025; 0.001 is still below this).",
        },
      ],
    },

    /* ================================================================
       LESSON 4 — Web analytics and social listening
       ================================================================ */
    {
      id: L4_ID,
      number: 4,
      title: "Web analytics setup and social listening basics",
      minutes: 30,
      objectives: [
        "Explain the GA4 event-based data model and distinguish events, parameters, conversions, and audiences.",
        "Set up key GA4 reports for a marketing analytics use case including traffic sources, conversion paths, and user engagement.",
        "Describe social listening concepts and identify tools and techniques for monitoring brand sentiment online.",
      ],
      blocks: [
        {
          type: "p",
          text: "Web analytics transforms raw website data — page views, clicks, form submissions, purchases — into marketing intelligence. **Google Analytics 4 (GA4)** is the current standard, replacing Universal Analytics. GA4 uses an **event-based data model** where every user interaction is recorded as an event with associated parameters. This is fundamentally different from the session-based, pageview-centric model of its predecessor, and understanding this shift is essential for modern marketing analytics.",
        },
        {
          type: "h",
          text: "GA4 data model: events, parameters, and conversions",
        },
        {
          type: "table",
          head: ["Concept", "Description", "Example"],
          rows: [
            [
              "Event",
              "Any user interaction you want to measure — automatically collected, enhanced, or custom",
              "page_view, scroll, click, purchase, sign_up, add_to_cart",
            ],
            [
              "Parameter",
              "Additional data attached to an event — describes the context of the interaction",
              "page_view event has parameters: page_title, page_location, page_referrer",
            ],
            [
              "User property",
              "Attributes of the user that persist across sessions",
              "country, language, device_category, custom: customer_tier",
            ],
            [
              "Conversion",
              "An event you flag as a key business outcome — GA4 counts and attributes these",
              "A 'purchase' event marked as a conversion allows you to see which channels drive purchases",
            ],
            [
              "Audience",
              "A defined group of users who share characteristics — used for analysis and remarketing",
              "Audience: 'High-value mobile users' = users on mobile devices who have made 3+ purchases in 90 days",
            ],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Event naming conventions",
          text: "GA4 uses snake_case for event names (e.g., add_to_cart, begin_checkout). Custom events should follow the same convention and be descriptive: 'whatsapp_click' is better than 'btn1_click'. Good naming makes your data self-documenting and your reports easier to read six months later.",
        },
        {
          type: "h",
          text: "Key GA4 reports for marketing analytics",
        },
        {
          type: "list",
          items: [
            "**Acquisition overview:** Where your users come from — organic search, paid search, social, direct, referral. Essential for understanding which channels drive traffic and which drive conversions.",
            "**Engagement overview:** Average engagement time, engaged sessions per user, views per session. Tells you whether visitors find your content valuable or bounce immediately.",
            "**Conversion paths:** The sequence of touchpoints a user interacted with before converting. Reveals whether social media assists conversions even if it is not the last click.",
            "**User explorer:** Individual-level journey tracking — see the exact sequence of events for a specific user. Useful for debugging conversion funnels and understanding edge cases.",
            "**Retention reports:** How many users return after their first visit, and how often. Critical for subscription businesses and apps.",
          ],
        },
        {
          type: "equip",
          title: "GA4 reporting architecture",
          items: [
            {
              art: "qc-flowchart",
              caption: "Data flow from user action to GA4 report",
              callouts: [
                "User action triggers a JavaScript event sent to GA4 servers",
                "Events are processed, enriched with user properties, and stored",
                "Reports aggregate events into dimensions and metrics for analysis",
              ],
            },
          ],
        },
        {
          type: "h",
          text: "Social listening basics",
        },
        {
          type: "p",
          text: "**Social listening** is the process of monitoring social media platforms, forums, blogs, and news sites for mentions of your brand, competitors, industry topics, and relevant keywords. Unlike social media analytics (which measures your own pages' performance), social listening captures the broader conversation happening about you — including what you do not control.",
        },
        {
          type: "table",
          head: ["Social listening element", "What you monitor", "Cameroon example"],
          rows: [
            [
              "Brand mentions",
              "Direct mentions of your brand name, products, or handles",
              "Tracking mentions of 'Douala Fresh' across Twitter, Facebook, and online forums to catch customer complaints and praise",
            ],
            [
              "Competitor mentions",
              "What people say about competing brands",
              "Monitoring sentiment around competitor delivery services to identify weaknesses you can exploit",
            ],
            [
              "Industry keywords",
              "Trending topics and conversations in your market",
              "Tracking 'mobile money', 'fintech Cameroon', 'digital payment' to spot emerging trends and customer pain points",
            ],
            [
              "Sentiment analysis",
              "The emotional tone of mentions — positive, negative, neutral",
              "A spike in negative sentiment after a price increase signals the need for communication adjustments",
            ],
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Social listening tools accessible in Cameroon",
          text: "Enterprise tools like Brandwatch or Meltwater may be beyond the budget of SMEs. Free or low-cost alternatives include Google Alerts (monitors web mentions), TweetDeck/X Pro (real-time Twitter monitoring), Facebook Page Insights (tracks page mentions and reviews), and manual monitoring of WhatsApp groups and local forums like CameroonWeb. The key is consistency — check daily and log findings in a structured format.",
        },
        {
          type: "check",
          id: "mas-m2-check-4",
          question: "In GA4, a user visits a product page, adds an item to the cart, and completes a purchase. How many events are generated by these three actions?",
          options: [
            "1 — the purchase event captures everything",
            "2 — page_view and purchase",
            "3 — page_view, add_to_cart, and purchase (each interaction is a separate event)",
            "It depends on the session duration",
          ],
          answer: 2,
          explain: "GA4's event-based model records each interaction as a separate event. Viewing the product page triggers page_view, adding to cart triggers add_to_cart, and buying triggers purchase. Each event carries its own parameters (product name, price, quantity, etc.).",
        },
        {
          type: "sheet",
          id: "mas-m2-sheet-ga4",
          title: "GA4 channel performance analysis",
          task: "Analyse the marketing channel data from a GA4 export for a fictional Yaoundé e-commerce site. Calculate the conversion rate and cost per acquisition (CPA) for each channel. CPA = Marketing spend ÷ Conversions.",
          data: [
            ["Channel", "Sessions", "Conversions", "Conv. rate (%)", "Spend (FCFA)", "CPA (FCFA)"],
            ["Organic search", 8500, 255, null, 0, null],
            ["Paid search", 3200, 160, null, 480000, null],
            ["Social (organic)", 5600, 112, null, 0, null],
            ["Social (paid)", 4100, 205, null, 615000, null],
            ["Direct", 2800, 168, null, 0, null],
          ],
          editable: ["D2", "D3", "D4", "D5", "D6", "F3", "F5"],
          checks: [
            { cell: "D2", equals: 3.0, tol: 0.1 },
            { cell: "D3", equals: 5.0, tol: 0.1 },
            { cell: "D4", equals: 2.0, tol: 0.1 },
            { cell: "D5", equals: 5.0, tol: 0.1 },
            { cell: "D6", equals: 6.0, tol: 0.1 },
            { cell: "F3", equals: 3000, tol: 1 },
            { cell: "F5", equals: 3000, tol: 1 },
          ],
          hint: "Conv. rate = (Conversions ÷ Sessions) × 100. CPA = Spend ÷ Conversions. For organic and direct channels, CPA is 0 (no spend) — leave those cells or mark as N/A. Only calculate CPA for paid channels.",
          solution: {
            D2: "= (255 ÷ 8,500) × 100 = 3.0 %",
            D3: "= (160 ÷ 3,200) × 100 = 5.0 %",
            D4: "= (112 ÷ 5,600) × 100 = 2.0 %",
            D5: "= (205 ÷ 4,100) × 100 = 5.0 %",
            D6: "= (168 ÷ 2,800) × 100 = 6.0 %",
            F3: "= 480,000 ÷ 160 = 3,000 FCFA",
            F5: "= 615,000 ÷ 205 = 3,000 FCFA",
          },
        },
      ],
    },

    /* ================================================================
       LESSON 5 — Data quality, cleaning, and primary vs secondary research
       ================================================================ */
    {
      id: L5_ID,
      number: 5,
      title: "Data quality, cleaning, and research types",
      minutes: 30,
      objectives: [
        "Identify the six dimensions of data quality: accuracy, completeness, consistency, timeliness, validity, and uniqueness.",
        "Apply data cleaning techniques to resolve duplicates, missing values, formatting inconsistencies, and outliers in marketing datasets.",
        "Compare primary and secondary research methods, identifying strengths, weaknesses, and appropriate use cases for each.",
      ],
      blocks: [
        {
          type: "p",
          text: "The best analytics tools and the most sophisticated models are worthless if the data feeding them is dirty. **Data quality** is the degree to which data is fit for its intended purpose. In marketing analytics, poor data quality leads to miscounted customers, wrong conversion rates, flawed segmentation, and ultimately poor marketing decisions. This lesson equips you with the frameworks and techniques to assess and improve data quality.",
        },
        {
          type: "h",
          text: "The six dimensions of data quality",
        },
        {
          type: "table",
          head: ["Dimension", "Definition", "Marketing example of poor quality"],
          rows: [
            [
              "Accuracy",
              "Data values correctly represent the real-world entities they describe",
              "A customer's email is recorded as 'jean@gmial.com' instead of 'jean@gmail.com' — emails bounce, skewing campaign metrics",
            ],
            [
              "Completeness",
              "All required data fields are populated — no missing values where data should exist",
              "30 % of CRM records have no phone number — SMS campaigns reach only 70 % of the intended audience",
            ],
            [
              "Consistency",
              "Data values do not contradict each other across systems or within a system",
              "A customer's name is 'Ngassa Paul' in the CRM but 'Paul NGASSA' in the billing system — deduplication fails",
            ],
            [
              "Timeliness",
              "Data is available when needed and reflects the current state",
              "Sales data is updated weekly, but the marketing team needs daily conversion rates for a time-sensitive campaign",
            ],
            [
              "Validity",
              "Data conforms to the defined format, range, and business rules",
              "A 'phone number' field contains 'call me later' — the value exists but is not a valid phone number",
            ],
            [
              "Uniqueness",
              "Each real-world entity is represented exactly once — no duplicates",
              "A customer who registered twice with different email addresses has two CRM records, inflating the customer count by one",
            ],
          ],
        },
        {
          type: "equip",
          title: "Data quality assessment process",
          items: [
            {
              art: "qc-control-chart",
              caption: "Monitoring data quality metrics over time",
              callouts: [
                "Track completeness rate weekly — flag drops below 90 % threshold",
                "Monitor duplicate rate after each data import batch",
                "Set up automated validation rules to catch invalid entries at the point of collection",
              ],
            },
          ],
        },
        {
          type: "h",
          text: "Data cleaning techniques",
        },
        {
          type: "table",
          head: ["Problem", "Technique", "Tool / approach"],
          rows: [
            [
              "Duplicate records",
              "Fuzzy matching on name + phone/email, then merge or flag for manual review",
              "Python (fuzzywuzzy library), Excel VLOOKUP, CRM deduplication module",
            ],
            [
              "Missing values",
              "Imputation (fill with mean/median/mode), flagging, or deletion depending on severity",
              "If <5 % of records are missing a field, deletion is safe. If 20 %+, investigate the collection process",
            ],
            [
              "Inconsistent formats",
              "Standardise formats: dates (YYYY-MM-DD), phone numbers (+237XXXXXXXXX), names (Title Case)",
              "Python (pandas str.strip(), str.lower()), Excel TRIM/PROPER, regex patterns",
            ],
            [
              "Outliers",
              "Flag values outside expected ranges (e.g., an order value of 50,000,000 FCFA when the average is 25,000)",
              "Calculate IQR or z-scores; investigate outliers before removing — some are genuine (bulk orders)",
            ],
            [
              "Invalid entries",
              "Validate against business rules (email format, phone digit count, valid region codes)",
              "Regex validation for emails: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            ],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "The data cleaning 80/20 rule",
          text: "In practice, 80 % of data quality issues fall into three categories: duplicates, missing values, and inconsistent formatting. Master these three and you solve the majority of data quality problems. The remaining 20 % (outliers, invalid entries, encoding issues) require case-by-case investigation.",
        },
        {
          type: "h",
          text: "Primary vs secondary research",
        },
        {
          type: "p",
          text: "Marketing data comes from two fundamental sources: **primary research** (data you collect yourself, specifically for your research question) and **secondary research** (data collected by others for a different purpose, which you repurpose). Both have important roles in marketing analytics.",
        },
        {
          type: "table",
          head: ["Dimension", "Primary research", "Secondary research"],
          rows: [
            [
              "Definition",
              "Original data collected directly from the source for your specific research objective",
              "Pre-existing data collected by someone else for a different purpose",
            ],
            [
              "Methods",
              "Surveys, interviews, focus groups, experiments, observation, mystery shopping",
              "Government statistics (INS Cameroon), industry reports, academic papers, competitor websites, published surveys",
            ],
            [
              "Cost",
              "Higher — you bear all collection costs (design, fieldwork, analysis)",
              "Lower — data already exists; cost is in acquisition and adaptation",
            ],
            [
              "Time",
              "Slower — designing and conducting research takes weeks to months",
              "Faster — data may be available immediately",
            ],
            [
              "Relevance",
              "Highly relevant — designed for your exact question",
              "May not perfectly fit your needs — different population, time period, or definitions",
            ],
            [
              "Control",
              "Full control over methodology, sample, and variables",
              "No control — you must work with whatever methodology was used",
            ],
            [
              "Cameroon example",
              "A Douala telecom runs its own survey of 500 subscribers to measure satisfaction with 4G coverage",
              "The same telecom analyses ANTIC's published internet penetration statistics to size the addressable market",
            ],
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Combining primary and secondary in practice",
          text: "Smart marketing research starts with secondary data to frame the landscape (market size, industry benchmarks, competitor positioning), then uses primary research to answer specific questions that secondary data cannot. For example, INS Cameroon's census data tells you the population of Douala by age group (secondary), but only your own survey can tell you what percentage of 18–25 year-olds in Douala have heard of your brand (primary).",
        },
        {
          type: "check",
          id: "mas-m2-check-5",
          question: "A marketing analyst discovers that 15 % of customer records in the CRM have the city field recorded as 'Dla', 'DOUALA', 'douala', and 'Douala'. Which data quality dimension is violated?",
          options: [
            "Accuracy — the data does not reflect reality",
            "Completeness — data is missing",
            "Consistency — the same entity is represented in different formats",
            "Timeliness — the data is outdated",
          ],
          answer: 2,
          explain: "All four values refer to Douala, so the data is accurate (it correctly represents the real city). The issue is consistency — the same city is recorded in four different formats, which prevents reliable filtering, grouping, and reporting. Standardising to 'Douala' resolves the issue.",
        },
        {
          type: "form",
          id: "mas-m2-form-research",
          title: "Primary vs secondary research classification",
          task: "For each data-gathering scenario, classify whether the method is primary or secondary research and identify the most appropriate approach.",
          fields: [
            {
              kind: "select",
              label: "A Bafoussam coffee cooperative reviews export statistics published by the Cameroon Ministry of Commerce to estimate total arabica coffee exports in 2024.",
              options: [
                "Primary research — the cooperative collected the data",
                "Secondary research — using government-published statistics for a purpose different from the original collection",
                "Primary research — the data relates to their industry",
                "Neither — government data is not research",
              ],
              answer: 1,
              explain: "The Ministry of Commerce collected and published the export data for regulatory and policy purposes. The cooperative is repurposing this existing data for market analysis — this is secondary research.",
            },
            {
              kind: "select",
              label: "A Douala mobile app company conducts 45-minute video interviews with 20 users to understand why they stopped using the app after the first week.",
              options: [
                "Secondary research — interviewing existing users about past behaviour",
                "Primary qualitative research — original data collected via interviews for a specific research question",
                "Primary quantitative research — collecting numerical data from 20 participants",
                "Secondary qualitative research — analysing interview transcripts",
              ],
              answer: 1,
              explain: "The company designs and conducts original interviews to answer their specific question about app abandonment. This is primary qualitative research — depth interviews generate rich, unstructured data about user motivations and pain points.",
            },
          ],
        },
      ],
    },

    /* ================================================================
       LESSON 6 — Practice: data collection and market research
       ================================================================ */
    {
      id: PRACTICE_ID,
      number: 6,
      title: "Practice: data collection and market research",
      minutes: 30,
      objectives: [
        "Design survey questions free of common biases for realistic marketing scenarios",
        "Calculate sample sizes and interpret margin of error for research planning",
        "Clean and prepare a raw marketing dataset using Python",
      ],
      blocks: [
        {
          type: "p",
          text: "Four exercises of increasing difficulty covering survey design, research methodology classification, sample size calculation, and hands-on data cleaning. These exercises reflect the practical tasks you will perform when collecting and preparing data for marketing analytics projects.",
        },

        /* --- Beginner: form — design survey questions and identify bias --- */
        {
          type: "form",
          id: "mas-m2-practice-form",
          level: "beginner",
          title: "Design bias-free survey questions",
          task: "A Yaoundé fitness centre wants to survey members about satisfaction and future services. For each draft question, identify the issue and select the best corrected version.",
          fields: [
            {
              kind: "select",
              label: "Draft question: 'How much do you love our excellent gym facilities and our amazing trainers?'",
              options: [
                "Replace 'love' with 'rate' — the rest is fine",
                "This is a leading, double-barrelled question — split into two neutral questions: (1) 'How would you rate the gym facilities?' and (2) 'How would you rate the trainers?' on a 1–5 scale",
                "Add 'or not' at the end to balance it",
                "Change to an open-ended question",
              ],
              answer: 1,
              explain: "The question has two problems: it is leading ('excellent', 'amazing' push toward positive answers) and double-barrelled (asks about facilities AND trainers in one question). The fix: split into two separate questions with neutral wording and a balanced scale.",
            },
            {
              kind: "select",
              label: "Draft question: 'Which new class would you prefer?' with options: Yoga, Pilates, Spinning, CrossFit.",
              options: [
                "The question is well-designed — no changes needed",
                "Add an 'Other (please specify)' option and a 'None of these' option to avoid forcing a choice",
                "Make it open-ended to avoid limiting responses",
                "Add a 'Don't know' option only",
              ],
              answer: 1,
              explain: "The question forces respondents to choose from a pre-set list that may not include their preference. Adding 'Other (please specify)' captures unlisted preferences, and 'None of these' allows respondents who do not want any new class to express that. Both options reduce forced-choice bias.",
            },
            {
              kind: "select",
              label: "Draft question: 'How many times per month do you visit the gym?' — placed as the first question after the greeting.",
              options: [
                "Good placement — start with an easy behavioural question",
                "Move to after core satisfaction questions — visit frequency should follow general satisfaction to avoid anchoring",
                "This question has recall bias and should be removed entirely",
                "Place at the very end with demographics",
              ],
              answer: 0,
              explain: "Starting with a simple, non-threatening behavioural question (visit frequency) is good survey design. It warms up the respondent before moving to opinion and satisfaction questions. This follows the 'funnel approach' — starting broad and easy, then narrowing to more specific topics.",
            },
          ],
        },

        /* --- Intermediate: sheet — calculate sample sizes and margin of error --- */
        {
          type: "sheet",
          id: "mas-m2-practice-sheet",
          level: "intermediate",
          title: "Sample size and margin of error calculations",
          task: "Bamenda Telecom (fictional) is planning three market research studies. Calculate the required sample size for each study using n = (Z² × p × (1 − p)) ÷ E². Then calculate the actual margin of error achieved if they can only survey 300 people for Study C, using E = √((Z² × p × (1 − p)) ÷ n).",
          data: [
            ["Study", "Z (95%)", "p", "E", "Required n"],
            ["A: Brand awareness (p unknown)", 1.96, 0.50, 0.05, null],
            ["B: Satisfaction (est. 75 %)", 1.96, 0.75, 0.04, null],
            ["C: Churn risk (est. 20 %)", 1.96, 0.20, 0.03, null],
            ["", "", "", "", ""],
            ["Study C with n = 300", "", "", "Actual MoE (%)", null],
          ],
          editable: ["E2", "E3", "E4", "E7"],
          checks: [
            { cell: "E2", equals: 385, tol: 1 },
            { cell: "E3", equals: 451, tol: 1 },
            { cell: "E4", equals: 683, tol: 1 },
            { cell: "E7", equals: 4.5, tol: 0.1 },
          ],
          hint: "For n: n = (1.96² × p × (1−p)) ÷ E². Always round up. For actual MoE: E = √((1.96² × 0.20 × 0.80) ÷ 300), then multiply by 100 to express as percentage.",
          solution: {
            E2: "= (3.8416 × 0.25) ÷ 0.0025 = 384.16 → 385",
            E3: "= (3.8416 × 0.1875) ÷ 0.0016 = 450.19 → 451",
            E4: "= (3.8416 × 0.16) ÷ 0.0009 = 682.95 → 683",
            E7: "= √((3.8416 × 0.16) ÷ 300) = √(0.002048) = 0.04526 → 4.5 %",
          },
        },

        /* --- Advanced: sorter — classify research methods --- */
        {
          type: "sorter",
          id: "mas-m2-practice-sorter",
          level: "advanced",
          title: "Classify marketing research methods",
          task: "Drag each research activity into the correct category based on the type of research it represents.",
          layout: "columns",
          buckets: [
            { label: "Primary quantitative", desc: "Original numerical data you collect" },
            { label: "Primary qualitative", desc: "Original non-numerical data you collect" },
            { label: "Secondary research", desc: "Pre-existing data from other sources" },
          ],
          items: [
            {
              text: "Online survey of 500 customers measuring satisfaction on a 1–5 scale",
              bucket: 0,
              explain: "You design and deploy the survey (primary) and collect numerical scale ratings (quantitative).",
            },
            {
              text: "Analysis of INS Cameroon census data on household income by region",
              bucket: 2,
              explain: "Census data was collected by the national statistics institute for government purposes. You are repurposing existing data — secondary research.",
            },
            {
              text: "Focus group discussion with 8 mothers in Douala about baby food preferences",
              bucket: 1,
              explain: "You organise and moderate the focus group (primary) to gather opinions, perceptions, and narratives (qualitative).",
            },
            {
              text: "A/B test comparing two landing page designs with 2,000 visitors per variant",
              bucket: 0,
              explain: "You design the experiment and collect measurable outcome data — conversion rates, click rates (primary quantitative).",
            },
            {
              text: "Review of a competitor's published annual report for market share data",
              bucket: 2,
              explain: "The annual report was produced by the competitor for their stakeholders. Using it for your analysis is secondary research.",
            },
            {
              text: "In-depth interviews with 15 small business owners about digital marketing adoption barriers",
              bucket: 1,
              explain: "You conduct the interviews (primary) and gather narrative, exploratory data about perceptions and experiences (qualitative).",
            },
            {
              text: "Web scraping competitor prices from their public e-commerce websites",
              bucket: 2,
              explain: "The competitor posted these prices for their customers. Collecting and analysing them for competitive intelligence is secondary research — you are using data originally produced for a different purpose.",
            },
            {
              text: "Tracking 1,000 customers' click behaviour on your website using GA4 event logs",
              bucket: 0,
              explain: "You set up the tracking (primary) and collect numerical behavioural data — event counts, session durations (quantitative).",
            },
          ],
        },

        /* --- Expert: python — clean and prepare marketing data --- */
        {
          type: "python",
          id: "mas-m2-practice-python",
          level: "expert",
          title: "Clean and prepare a marketing dataset",
          task: "You have received a raw customer dataset from a Douala e-commerce company. The data has several quality issues: duplicate emails, inconsistent city names, missing phone numbers, and invalid email formats. Write Python code using pandas to: (1) Load the data, (2) Remove duplicate rows based on email, keeping the first occurrence, (3) Standardise the 'city' column so all variations of 'Douala' become 'Douala' and all variations of 'Yaounde'/'Yaoundé' become 'Yaoundé', (4) Count the number of rows with missing phone numbers, (5) Flag invalid emails (those not containing '@'). Print a summary of the cleaning results.",
          cells: [
            "import pandas as pd\n\n# Raw customer data with quality issues\ndata = {\n    'name': ['Ngassa Paul', 'Mbarga Élise', 'Fon Tabi', 'Ngassa Paul', 'Ekane Marie',\n             'Biya Jean', 'Nkeng Rose', 'Fouda André', 'Tabi Grace', 'Ekane Marie'],\n    'email': ['paul.n@gmail.com', 'elise.m@yahoo.fr', 'fon.t@outlook.com', 'paul.n@gmail.com', 'marie.e@gmail.com',\n              'jean.b@hotmail.com', 'rose.n@yahoo.fr', 'andre.f[at]gmail.com', 'grace.tabi', 'marie.e@gmail.com'],\n    'phone': ['+237 6 70 12 34 56', '+237 6 99 88 77 66', None, '+237 6 70 12 34 56', '+237 6 55 44 33 22',\n              None, '+237 6 77 66 55 44', '+237 6 88 77 66 55', None, '+237 6 55 44 33 22'],\n    'city': ['Dla', 'DOUALA', 'Yaounde', 'Douala', 'douala',\n             'Yaoundé', 'yaounde', 'YAOUNDE', 'Bafoussam', 'DOUALA'],\n    'total_purchases_fcfa': [125000, 340000, 78000, 125000, 560000,\n                             45000, 210000, 890000, 67000, 560000]\n}\n\ndf = pd.DataFrame(data)\nprint(f'Original dataset: {len(df)} rows')\nprint(df[['name', 'email', 'city']].to_string())\nprint()",
            "# Your cleaning code here\n# Step 1: Remove duplicates based on email\n\n# Step 2: Standardise city names\n\n# Step 3: Count missing phone numbers\n\n# Step 4: Flag invalid emails\n\n# Step 5: Print summary",
          ],
          packages: ["pandas"],
          expect: "Cleaned dataset: 8 rows",
          hint: "Use df.drop_duplicates(subset='email', keep='first') for deduplication. For city standardisation, try df['city'].str.strip().str.title() then .replace() for specific mappings. Check for '@' with df['email'].str.contains('@').",
          solution: "# Step 1: Remove duplicates\ndf_clean = df.drop_duplicates(subset='email', keep='first').copy()\nprint(f'After deduplication: {len(df_clean)} rows (removed {len(df) - len(df_clean)} duplicates)')\n\n# Step 2: Standardise city names\ndf_clean['city'] = df_clean['city'].str.strip().str.title()\ncity_map = {'Dla': 'Douala', 'Yaounde': 'Yaoundé'}\ndf_clean['city'] = df_clean['city'].replace(city_map)\nprint(f'Cities after standardisation: {df_clean[\"city\"].unique()}')\n\n# Step 3: Count missing phone numbers\nmissing_phones = df_clean['phone'].isna().sum()\nprint(f'Missing phone numbers: {missing_phones}')\n\n# Step 4: Flag invalid emails\ndf_clean['valid_email'] = df_clean['email'].str.contains('@', na=False)\ninvalid_count = (~df_clean['valid_email']).sum()\nprint(f'Invalid emails: {invalid_count}')\n\n# Step 5: Print summary\nprint(f'\\nCleaned dataset: {len(df_clean)} rows')\nprint(df_clean[['name', 'email', 'city', 'valid_email']].to_string())",
        },
      ],
    },
  ],

  /* ================================================================
     MODULE QUIZ
     ================================================================ */
  quiz: {
    id: QUIZ_ID,
    title: "Data Collection & Market Research",
    passPct: 70,
    questions: [
      {
        id: "mas-m2-q1",
        question: "A survey asks: 'Don't you think our prices are very reasonable?' Which type of bias is present?",
        options: [
          "Recall bias",
          "Leading question bias",
          "Social desirability bias",
          "Double-barrelled question",
        ],
        answer: 1,
        explain: "'Don't you think' combined with 'very reasonable' pushes the respondent toward agreement. This is a leading question. A neutral version: 'How would you rate our pricing?' on a balanced scale.",
      },
      {
        id: "mas-m2-q2",
        question: "Using the formula n = (Z² × p × (1 − p)) ÷ E², what is the required sample size for a 95 % confidence level, unknown proportion (p = 0.5), and ±3 % margin of error?",
        options: [
          "385",
          "600",
          "1,068",
          "1,067",
        ],
        answer: 3,
        explain: "n = (1.96² × 0.5 × 0.5) ÷ 0.03² = (3.8416 × 0.25) ÷ 0.0009 = 0.9604 ÷ 0.0009 = 1,067.1, rounded up to 1,067. Note: some calculators round to 1,068 depending on intermediate rounding.",
      },
      {
        id: "mas-m2-q3",
        question: "An A/B test shows a 2 % improvement in conversion rate with a p-value of 0.42. What is the correct interpretation?",
        options: [
          "The improvement is statistically significant — implement the variant",
          "The improvement is not statistically significant — cannot conclude the variant is better",
          "The test needs more time to reach significance",
          "The 2 % improvement is too small to matter",
        ],
        answer: 1,
        explain: "A p-value of 0.42 means there is a 42 % probability the observed difference is due to chance. This is well above the 0.05 threshold. The result is not statistically significant — you cannot conclude that the variant performs better than the control.",
      },
      {
        id: "mas-m2-q4",
        question: "In GA4, what is the fundamental unit of data collection?",
        options: [
          "Session",
          "Pageview",
          "Event",
          "User",
        ],
        answer: 2,
        explain: "GA4 uses an event-based data model where every interaction is recorded as an event with parameters. Sessions and pageviews are derived from events, and users are identified across events. The event is the fundamental building block.",
      },
      {
        id: "mas-m2-q5",
        question: "A researcher analyses published World Bank data on Cameroon's GDP growth to estimate market potential for a new product category. This is an example of:",
        options: [
          "Primary quantitative research",
          "Primary qualitative research",
          "Secondary research",
          "Experimental research",
        ],
        answer: 2,
        explain: "The World Bank collected and published the GDP data for its own purposes. The researcher is repurposing existing data collected by another organisation — this is secondary research.",
      },
      {
        id: "mas-m2-q6",
        question: "A CRM database contains 5,000 customer records. An analyst discovers 200 exact duplicate records (same name, email, phone). Which data quality dimension is primarily violated?",
        options: [
          "Accuracy",
          "Completeness",
          "Uniqueness",
          "Timeliness",
        ],
        answer: 2,
        explain: "Uniqueness requires each entity to be represented exactly once. Duplicate records mean the same customer appears multiple times, inflating customer counts and distorting metrics like average purchase value.",
      },
      {
        id: "mas-m2-q7",
        question: "Which sampling method divides the population into subgroups (e.g., by region) and then randomly samples within each subgroup?",
        options: [
          "Simple random sampling",
          "Cluster sampling",
          "Stratified sampling",
          "Convenience sampling",
        ],
        answer: 2,
        explain: "Stratified sampling divides the population into homogeneous subgroups (strata) and draws random samples from each. This ensures key subgroups are represented. Cluster sampling randomly selects entire groups, then surveys all members within them.",
      },
      {
        id: "mas-m2-q8",
        question: "What is the primary risk of 'peeking' at A/B test results before the test reaches its required sample size?",
        options: [
          "The data will be lost",
          "It inflates the false-positive rate — you may conclude a winner that does not actually exist",
          "It reduces statistical power",
          "It introduces selection bias",
        ],
        answer: 1,
        explain: "Peeking (repeatedly checking for significance before the planned sample size) inflates the false-positive rate because random fluctuations early in a test can temporarily appear significant. If you stop at that point, you may implement a variant that is not actually better — a false positive.",
      },
    ],
  },
};
