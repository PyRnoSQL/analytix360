import type { CourseModule } from "../../../lms/types";

/* ──────────────────────────────────────────────────────────────────────
   Module 1 — Marketing Fundamentals & the Data Landscape
   Marketing Analytics Specialist (MAS) Certification Course
   ────────────────────────────────────────────────────────────────────── */

const L1_ID = "mas-m1-l1";
const L2_ID = "mas-m1-l2";
const L3_ID = "mas-m1-l3";
const L4_ID = "mas-m1-l4";
const L5_ID = "mas-m1-l5";
const PRACTICE_ID = "mas-m1-practice";
const QUIZ_ID = "mas-m1-quiz";

export const m1: CourseModule = {
  id: "mas-m1",
  number: 1,
  title: "Marketing Fundamentals & the Data Landscape",
  summary:
    "This module lays the foundation for marketing analytics by covering the marketing mix (4Ps and 7Ps), customer journey mapping, and the marketing data ecosystem encompassing CRM, web analytics, social media, and point-of-sale systems. You will learn to distinguish structured from unstructured data, compute essential marketing metrics — Customer Acquisition Cost, Customer Lifetime Value, Return on Ad Spend, and Click-Through Rate — and understand data governance principles including GDPR fundamentals. All concepts are grounded in Central African workplace contexts with realistic examples from Douala, Yaoundé, and Bafoussam businesses.",
  hours: 14,

  lessons: [
    /* ================================================================
       LESSON 1 — The marketing mix: 4Ps and 7Ps
       ================================================================ */
    {
      id: L1_ID,
      number: 1,
      title: "The marketing mix: 4Ps and 7Ps",
      minutes: 25,
      objectives: [
        "Define each element of the 4Ps (Product, Price, Place, Promotion) and provide a local business example for each.",
        "Extend the 4Ps to the 7Ps framework by explaining People, Process, and Physical evidence in a services context.",
        "Analyse how changes to one marketing mix element ripple across the others and affect measurable outcomes.",
      ],
      blocks: [
        {
          type: "p",
          text: "The marketing mix is the set of controllable variables an organisation uses to influence buyer behaviour and achieve marketing objectives. Originally conceived by E. Jerome McCarthy in 1960, the **4Ps** — Product, Price, Place, and Promotion — remain the foundation of marketing strategy. For services-heavy industries, Booms and Bitner extended the framework to **7Ps** by adding People, Process, and Physical evidence. As a marketing analytics specialist, your role is to measure how each element performs and how they interact.",
        },
        {
          type: "h",
          text: "The 4Ps explained",
        },
        {
          type: "table",
          head: ["Element", "Definition", "Cameroon workplace example"],
          rows: [
            [
              "Product",
              "The goods or services offered to satisfy customer needs — includes features, quality, branding, packaging",
              "Brasseries du Cameroun offers a range of beverages — each SKU targets different consumer segments with distinct packaging and flavour profiles",
            ],
            [
              "Price",
              "The amount customers pay — includes list price, discounts, payment terms, perceived value",
              "A Bafoussam agribusiness sets cassava flour at 1,500 FCFA per kg for wholesalers and 2,200 FCFA per kg at retail, reflecting channel-based pricing",
            ],
            [
              "Place",
              "Distribution channels and logistics that deliver the product to the customer",
              "A Douala electronics retailer sells through physical stores in Akwa and Bonabéri, plus a WhatsApp catalogue reaching customers across the Littoral region",
            ],
            [
              "Promotion",
              "Communication activities that inform, persuade, and remind customers — advertising, sales promotion, PR, personal selling, digital marketing",
              "A Yaoundé fashion brand runs Instagram campaigns during festive seasons, offering 15 % discounts shared via influencer partnerships",
            ],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "Why the mix matters for analytics",
          text: "Each P generates measurable data. Product data includes SKU performance and return rates. Price data feeds revenue analytics and elasticity models. Place data tracks channel performance and logistics costs. Promotion data measures campaign reach, engagement, and conversion. Your job is to connect these data streams into a coherent performance picture.",
        },
        {
          type: "h",
          text: "Extending to 7Ps: the services dimension",
        },
        {
          type: "p",
          text: "Many businesses in Cameroon operate in services sectors — banking, telecommunications, hospitality, education. The additional three Ps capture elements critical to service delivery and customer experience.",
        },
        {
          type: "table",
          head: ["Element", "Definition", "Service example"],
          rows: [
            [
              "People",
              "All human actors in service delivery — employees, customers, and other stakeholders",
              "MTN Cameroon call centre agents in Douala whose courtesy ratings directly correlate with customer retention",
            ],
            [
              "Process",
              "The procedures, mechanisms, and flow of activities by which a service is delivered",
              "A microfinance institution in Bafoussam has a 48-hour loan approval process — faster processing correlates with higher customer satisfaction scores",
            ],
            [
              "Physical evidence",
              "The tangible cues that help customers evaluate the service before and after purchase",
              "A Yaoundé hotel's lobby décor, branded stationery, and clean uniforms all signal quality before the guest reaches their room",
            ],
          ],
        },
        {
          type: "equip",
          title: "Visualising the marketing mix",
          items: [
            {
              art: "qc-flowchart",
              caption: "Marketing mix interaction map",
            },
          ],
        },
        {
          type: "p",
          text: "**Worked example — Mama Ntolo's Pepper Sauce (fictional Douala FMCG brand):** The product is a 250 ml bottle of artisanal pepper sauce. Price is set at 1,800 FCFA retail, with a 25 % margin for distributors (distributor buy price: 1,350 FCFA). Place includes market stalls in Marché Central, two supermarkets in Bonanjo, and an online store. Promotion uses radio spots on CRTV and Instagram posts showcasing recipes. If the brand raises the retail price to 2,200 FCFA, analytics should track: unit sales velocity change, channel sell-through rates, social media sentiment, and overall revenue impact. A 22 % price increase that reduces unit volume by only 10 % nets a positive revenue outcome — this is the kind of trade-off analysis marketing analytics enables.",
        },
        {
          type: "check",
          id: "mas-m1-check-1",
          question: "A Yaoundé gym adds online personal training sessions. Which additional P from the 7Ps framework is most directly affected by the quality of the video platform used to deliver the sessions?",
          options: [
            "Product",
            "Physical evidence",
            "Process",
            "People",
          ],
          answer: 2,
          explain: "The video platform is part of the Process — the mechanism through which the service is delivered. A laggy or unreliable platform degrades the service process, directly affecting customer experience and satisfaction scores.",
        },
        {
          type: "chart",
          id: "mas-m1-chart-mix",
          title: "Revenue contribution by marketing channel — Mama Ntolo's Pepper Sauce (Q3 2025)",
          data: [
            { label: "Marché Central stalls", value: 4200000 },
            { label: "Bonanjo supermarkets", value: 2800000 },
            { label: "Online store", value: 1600000 },
            { label: "WhatsApp orders", value: 950000 },
          ],
          unit: "FCFA",
          kinds: ["bar", "pie"],
          best: "bar",
          question: "Which channel generates the most revenue, and what percentage of total revenue does the online store represent?",
          explain: "Marché Central generates the most at 4,200,000 FCFA. The online store represents 1,600,000 ÷ 9,550,000 = 16.8 % of total revenue. This Place analysis helps decide where to allocate promotional spend.",
        },
      ],
    },

    /* ================================================================
       LESSON 2 — Customer journey mapping
       ================================================================ */
    {
      id: L2_ID,
      number: 2,
      title: "Customer journey mapping",
      minutes: 25,
      objectives: [
        "Identify the five core stages of the customer journey: Awareness, Consideration, Purchase, Retention, and Advocacy.",
        "Map touchpoints, channels, and data sources to each journey stage for a given business.",
        "Explain how journey mapping informs marketing analytics measurement strategy.",
      ],
      blocks: [
        {
          type: "p",
          text: "A **customer journey map** is a visual representation of every interaction a customer has with your brand from first awareness through post-purchase advocacy. For the marketing analytics specialist, the journey map is not just a design exercise — it is the blueprint that tells you **what to measure, where to measure it, and why it matters**. Each stage generates different data types and requires different metrics.",
        },
        {
          type: "h",
          text: "The five journey stages",
        },
        {
          type: "table",
          head: ["Stage", "Customer mindset", "Typical touchpoints", "Key metrics"],
          rows: [
            [
              "Awareness",
              "\"I have a need or problem\"",
              "Social media ads, radio, word-of-mouth, Google search, billboards",
              "Impressions, reach, brand recall, website visits",
            ],
            [
              "Consideration",
              "\"I am comparing options\"",
              "Website product pages, reviews, WhatsApp inquiries, store visits",
              "Time on site, pages per session, enquiry volume, comparison page views",
            ],
            [
              "Purchase",
              "\"I have decided to buy\"",
              "E-commerce checkout, POS terminal, mobile money payment",
              "Conversion rate, average order value, cart abandonment rate, payment method mix",
            ],
            [
              "Retention",
              "\"Will I buy again?\"",
              "Email follow-ups, loyalty programmes, customer service calls, SMS reminders",
              "Repeat purchase rate, churn rate, Net Promoter Score, ticket resolution time",
            ],
            [
              "Advocacy",
              "\"I recommend this brand\"",
              "Social media shares, referrals, online reviews, testimonials",
              "Referral rate, social shares, review count and rating, earned media value",
            ],
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Journey mapping at Cameroon businesses",
          text: "In many Cameroonian markets, the customer journey is not purely digital. A customer might see a Facebook ad (awareness), visit a physical shop in Douala's Marché Congo (consideration), negotiate price in person (purchase), receive follow-up WhatsApp messages with new product photos (retention), and recommend the seller to friends at church (advocacy). Your analytics strategy must capture both online and offline touchpoints.",
        },
        {
          type: "h",
          text: "Building a journey map: step-by-step",
        },
        {
          type: "steps",
          title: "Journey mapping process",
          items: [
            "Define the customer persona — who is this journey for? (e.g., urban professional in Yaoundé, age 25–35, smartphone user)",
            "List all touchpoints where the persona interacts with your brand, both online and offline",
            "Map each touchpoint to a journey stage (Awareness, Consideration, Purchase, Retention, Advocacy)",
            "Identify the data source for each touchpoint (Google Analytics, CRM record, POS log, WhatsApp message archive)",
            "Define the metric that indicates success at each touchpoint (e.g., email open rate for retention emails)",
            "Identify pain points — stages where customers drop off or express dissatisfaction",
            "Prioritise measurement gaps — where you have no data but need it",
          ],
        },
        {
          type: "equip",
          title: "Customer journey funnel visualisation",
          items: [
            {
              art: "qc-flowchart",
              caption: "Journey funnel showing drop-off at each stage",
            },
          ],
        },
        {
          type: "p",
          text: "**Worked example — Douala Fresh (fictional grocery delivery startup):** Douala Fresh maps its customer journey and discovers that 60 % of website visitors who add items to their cart abandon before payment. The analytics team segments by payment method and finds that customers selecting mobile money (Orange Money, MTN MoMo) complete at 72 %, while those attempting card payment complete at only 31 %. The insight: the card payment gateway has a 12-second load time and frequent timeouts. By optimising the payment Process (7Ps) for mobile money and de-emphasising card payment, the conversion rate increases from 40 % to 58 % within one month.",
        },
        {
          type: "check",
          id: "mas-m1-check-2",
          question: "A Bafoussam clothing brand discovers that customers who follow them on Instagram are 3x more likely to make a repeat purchase. Which journey stage does this insight primarily affect?",
          options: [
            "Awareness",
            "Consideration",
            "Retention",
            "Purchase",
          ],
          answer: 2,
          explain: "The insight connects social media following to repeat purchase behaviour, which falls under the Retention stage. This data point would justify investing in Instagram content to keep existing customers engaged and buying again.",
        },
        {
          type: "sorter",
          id: "mas-m1-sorter-journey",
          title: "Map touchpoints to journey stages",
          task: "Drag each customer touchpoint into the correct journey stage.",
          layout: "columns",
          buckets: [
            { label: "Awareness", desc: "Customer first learns about the brand" },
            { label: "Consideration", desc: "Customer evaluates options" },
            { label: "Purchase", desc: "Customer completes the transaction" },
            { label: "Retention", desc: "Customer is encouraged to return" },
          ],
          items: [
            {
              text: "Customer sees a sponsored post on Facebook featuring a new product",
              bucket: 0,
              explain: "A sponsored social media post introduces the brand to potential customers — this is an awareness touchpoint.",
            },
            {
              text: "Customer reads product reviews on the company website",
              bucket: 1,
              explain: "Reading reviews is part of evaluating options before making a decision — a consideration activity.",
            },
            {
              text: "Customer completes payment via MTN Mobile Money at checkout",
              bucket: 2,
              explain: "Completing payment is the purchase action that converts a prospect into a customer.",
            },
            {
              text: "Customer receives an SMS with a 10 % discount code for their next order",
              bucket: 3,
              explain: "A discount code for a future purchase is a retention tactic designed to drive repeat business.",
            },
            {
              text: "Customer compares prices between three different online stores",
              bucket: 1,
              explain: "Price comparison is a classic consideration activity — the customer is evaluating alternatives.",
            },
            {
              text: "Customer hears a radio advertisement on FM 94.0 in Douala",
              bucket: 0,
              explain: "Radio advertising is a mass-reach awareness channel, introducing the brand to a broad audience.",
            },
          ],
        },
      ],
    },

    /* ================================================================
       LESSON 3 — The marketing data ecosystem
       ================================================================ */
    {
      id: L3_ID,
      number: 3,
      title: "The marketing data ecosystem: CRM, web analytics, social and POS",
      minutes: 30,
      objectives: [
        "Describe the four pillars of the marketing data ecosystem: CRM, web analytics, social media analytics, and POS systems.",
        "Explain how data flows between these systems and why integration matters for a unified customer view.",
        "Identify real-world data collection challenges in Central African business environments.",
      ],
      blocks: [
        {
          type: "p",
          text: "Modern marketing generates data from multiple sources. A single customer might interact with your brand through a website, a social media profile, a physical store, and a call centre — all in the same week. The **marketing data ecosystem** is the collection of systems that capture, store, and process these interactions. For the marketing analytics specialist, understanding this ecosystem is essential because your insights are only as good as the data feeding them.",
        },
        {
          type: "h",
          text: "The four pillars",
        },
        {
          type: "table",
          head: ["System", "What it captures", "Common tools", "Cameroon context"],
          rows: [
            [
              "CRM (Customer Relationship Management)",
              "Customer profiles, purchase history, interactions, support tickets, lead status",
              "HubSpot, Salesforce, Zoho CRM, custom solutions",
              "A Douala import/export firm uses Zoho CRM to track 2,400 business clients across CEMAC countries, logging every email, phone call, and order",
            ],
            [
              "Web analytics",
              "Website traffic, page views, sessions, bounce rate, conversion paths, device and location data",
              "Google Analytics 4, Matomo, Hotjar",
              "A Yaoundé e-commerce site uses GA4 to track 15,000 monthly sessions, identifying that 78 % of traffic comes from mobile devices",
            ],
            [
              "Social media analytics",
              "Followers, engagement rate, impressions, reach, sentiment, content performance",
              "Meta Business Suite, Twitter/X Analytics, Hootsuite, Sprout Social",
              "A Bafoussam coffee brand tracks Instagram engagement and finds that posts featuring farmers get 3x more shares than product-only posts",
            ],
            [
              "POS (Point of Sale)",
              "Transaction records, payment methods, basket analysis, time-of-day patterns, inventory movements",
              "Square, Lightspeed, custom POS, mobile money logs",
              "A chain of pharmacies in Douala uses POS data to discover that 40 % of weekend sales involve baby products, adjusting promotional shelf placement",
            ],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "The integration challenge",
          text: "In many Cameroonian businesses, these systems exist in silos. The CRM knows the customer name but not their website behaviour. The POS records transactions but cannot link them to social media campaigns. A key task for the marketing analytics specialist is to build bridges between these systems — even if it starts with something as simple as matching customer phone numbers across databases.",
        },
        {
          type: "h",
          text: "Data flow architecture",
        },
        {
          type: "p",
          text: "In an ideal setup, data flows from collection points (website, store, social platforms) through a data pipeline into a central repository (data warehouse or data lake) where it can be joined, cleaned, and analysed. The result is a **unified customer view** — a single record that contains all interactions across all channels. This is sometimes called a Customer Data Platform (CDP).",
        },
        {
          type: "equip",
          title: "Marketing data architecture",
          items: [
            {
              art: "qc-flowchart",
              caption: "Data flow from collection to insight",
            },
          ],
        },
        {
          type: "h",
          text: "Data collection challenges in Central Africa",
        },
        {
          type: "list",
          items: [
            "**Internet connectivity gaps:** Rural areas may have intermittent connectivity, causing incomplete web analytics data. Offline-first approaches (e.g., syncing POS data when connection restores) are common workarounds.",
            "**Cash-heavy economy:** Many transactions are cash-based with no automatic digital record. Manual entry into POS or spreadsheets introduces delays and errors.",
            "**Multi-channel attribution complexity:** A customer might see a TV ad, check Facebook, ask a friend on WhatsApp, then buy in-store. Attributing that sale to the right channel requires deliberate tracking design.",
            "**Language diversity:** Marketing data may arrive in French, English, Pidgin, or local languages, requiring normalisation before analysis.",
            "**Mobile-first behaviour:** Over 80 % of internet access in Cameroon is mobile. Analytics must be optimised for mobile user patterns — shorter sessions, app-based interactions, mobile money payment flows.",
          ],
        },
        {
          type: "check",
          id: "mas-m1-check-3",
          question: "A Douala retailer wants to understand which Facebook ad campaign drove the most in-store purchases last month. Which two systems must be integrated to answer this question?",
          options: [
            "CRM and web analytics",
            "Social media analytics and POS",
            "Web analytics and POS",
            "CRM and social media analytics",
          ],
          answer: 1,
          explain: "To link Facebook ad campaigns (social media analytics) to in-store purchases (POS data), these two systems must be integrated — for example, using unique promo codes in ads that are scanned at the register.",
        },
        {
          type: "sheet",
          id: "mas-m1-sheet-ecosystem",
          title: "Channel contribution analysis",
          task: "Douala Tech Hub (fictional) runs marketing across four channels. Complete the table by calculating each channel's cost per lead (CPL) and the overall blended CPL. CPL = Spend ÷ Leads generated.",
          data: [
            ["Channel", "Monthly spend (FCFA)", "Leads generated", "CPL (FCFA)"],
            ["Facebook Ads", 450000, 120, null],
            ["Google Search Ads", 380000, 85, null],
            ["Radio (CRTV)", 600000, 45, null],
            ["WhatsApp campaigns", 80000, 65, null],
            ["TOTAL", 1510000, 315, null],
          ],
          editable: ["D2", "D3", "D4", "D5", "D6"],
          checks: [
            { cell: "D2", equals: 3750, tol: 1 },
            { cell: "D3", equals: 4471, tol: 1 },
            { cell: "D4", equals: 13333, tol: 1 },
            { cell: "D5", equals: 1231, tol: 1 },
            { cell: "D6", equals: 4794, tol: 1 },
          ],
          hint: "CPL = Spend ÷ Leads. For the blended CPL, divide total spend by total leads. Round to the nearest whole FCFA.",
          solution: {
            D2: "= 450,000 ÷ 120 = 3,750 FCFA",
            D3: "= 380,000 ÷ 85 = 4,471 FCFA",
            D4: "= 600,000 ÷ 45 = 13,333 FCFA",
            D5: "= 80,000 ÷ 65 = 1,231 FCFA",
            D6: "= 1,510,000 ÷ 315 = 4,794 FCFA",
          },
        },
      ],
    },

    /* ================================================================
       LESSON 4 — Data types and marketing metrics
       ================================================================ */
    {
      id: L4_ID,
      number: 4,
      title: "Data types and essential marketing metrics",
      minutes: 30,
      objectives: [
        "Distinguish structured from unstructured data and provide marketing examples of each.",
        "Calculate the four foundational marketing metrics: CAC, CLV, ROAS, and CTR from raw data.",
        "Interpret metric results to make actionable marketing recommendations.",
      ],
      blocks: [
        {
          type: "p",
          text: "Marketing data comes in many forms. Before you can analyse it, you must understand what kind of data you are working with. The two broadest categories are **structured data** (organised in rows and columns with defined data types) and **unstructured data** (free-form content without a predefined schema). A third category, **semi-structured data**, sits between — it has some organisational properties but does not fit neatly into tables.",
        },
        {
          type: "h",
          text: "Structured vs unstructured data in marketing",
        },
        {
          type: "table",
          head: ["Type", "Characteristics", "Marketing examples"],
          rows: [
            [
              "Structured",
              "Fixed schema, rows and columns, easy to query and aggregate",
              "CRM records (name, email, purchase date, amount), POS transaction logs, Google Analytics sessions table, survey responses with Likert scales",
            ],
            [
              "Unstructured",
              "No predefined schema, requires NLP or manual analysis to extract insights",
              "Customer reviews on social media, call centre transcripts, open-ended survey comments, brand photos posted by customers, video testimonials",
            ],
            [
              "Semi-structured",
              "Has tags or markers but no rigid table format",
              "JSON payloads from web APIs, XML product feeds, email HTML with metadata, social media posts with hashtags and mentions",
            ],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "Why this matters for analytics",
          text: "Structured data is ready for dashboards and statistical analysis. Unstructured data requires preprocessing — sentiment analysis, topic modelling, image recognition — before it yields metrics. A marketing analytics specialist must be comfortable with both and know when each type is the right input for a given question.",
        },
        {
          type: "h",
          text: "The four foundational marketing metrics",
        },
        {
          type: "p",
          text: "Every marketing analytics role requires fluency in these four metrics. They appear in board presentations, campaign reviews, and investor reports. You must be able to calculate them from raw data and, crucially, explain what they mean in business terms.",
        },
        {
          type: "table",
          head: ["Metric", "Formula", "What it tells you"],
          rows: [
            [
              "CAC (Customer Acquisition Cost)",
              "Total marketing & sales spend ÷ Number of new customers acquired",
              "How much it costs to win one new customer — lower is better, but not at the expense of customer quality",
            ],
            [
              "CLV (Customer Lifetime Value)",
              "Average purchase value × Purchase frequency × Customer lifespan",
              "The total revenue a customer is expected to generate over their entire relationship with the brand",
            ],
            [
              "ROAS (Return on Ad Spend)",
              "Revenue from ad campaign ÷ Cost of ad campaign",
              "For every 1 FCFA spent on ads, how many FCFA of revenue are generated — a ROAS of 4.0 means 4 FCFA back per 1 FCFA spent",
            ],
            [
              "CTR (Click-Through Rate)",
              "(Clicks ÷ Impressions) × 100",
              "The percentage of people who see an ad or link and actually click on it — measures ad or content relevance",
            ],
          ],
        },
        {
          type: "h",
          text: "Worked examples with Cameroon data",
        },
        {
          type: "p",
          text: "**CAC example:** Boutique Élégance (fictional, Yaoundé) spent 2,400,000 FCFA on Facebook ads and 600,000 FCFA on sales team salaries in Q2. They acquired 150 new customers. CAC = (2,400,000 + 600,000) ÷ 150 = **20,000 FCFA per customer**. If the average first purchase is 35,000 FCFA with a 40 % margin (14,000 FCFA gross profit), the CAC exceeds first-purchase profit. The brand must rely on repeat purchases to recover acquisition costs.",
        },
        {
          type: "p",
          text: "**CLV example:** Continuing with Boutique Élégance — the average customer spends 35,000 FCFA per purchase, shops 4 times per year, and remains active for 2.5 years. CLV = 35,000 × 4 × 2.5 = **350,000 FCFA**. With a CAC of 20,000 FCFA, the CLV:CAC ratio is 17.5:1 — well above the 3:1 benchmark, indicating a healthy acquisition strategy.",
        },
        {
          type: "p",
          text: "**ROAS example:** A Google Ads campaign for Café Montagne (fictional, Bafoussam) cost 180,000 FCFA and generated 810,000 FCFA in tracked online orders. ROAS = 810,000 ÷ 180,000 = **4.5**. For every 1 FCFA spent, the café earned 4.5 FCFA in revenue.",
        },
        {
          type: "p",
          text: "**CTR example:** An Instagram ad for a Douala hair salon received 12,000 impressions and 360 clicks. CTR = (360 ÷ 12,000) × 100 = **3.0 %**. The beauty industry benchmark for Instagram CTR is approximately 1.0–2.5 %, so 3.0 % indicates strong creative performance.",
        },
        {
          type: "equip",
          title: "Metric relationships visualised",
          items: [
            {
              art: "stat-regression",
              caption: "How CAC and CLV interact to determine profitability",
            },
          ],
        },
        {
          type: "check",
          id: "mas-m1-check-4",
          question: "A Douala e-commerce company spends 5,000,000 FCFA on marketing in January and acquires 200 new customers. Each customer is expected to generate 120,000 FCFA in lifetime revenue. What is the CLV:CAC ratio?",
          options: [
            "4.0:1",
            "4.8:1",
            "24.0:1",
            "2.4:1",
          ],
          answer: 1,
          explain: "CAC = 5,000,000 ÷ 200 = 25,000 FCFA. CLV = 120,000 FCFA. Ratio = 120,000 ÷ 25,000 = 4.8:1. This is above the 3:1 benchmark, indicating a healthy return on customer acquisition investment.",
        },
        {
          type: "sheet",
          id: "mas-m1-sheet-metrics",
          title: "Calculate campaign metrics dashboard",
          task: "Ngon Digital Agency (fictional, Douala) ran three campaigns last month. Complete the metrics for each campaign by calculating CTR, ROAS, and the overall CAC.",
          data: [
            ["Campaign", "Impressions", "Clicks", "CTR (%)", "Ad spend (FCFA)", "Revenue (FCFA)", "ROAS"],
            ["Facebook — Product launch", 25000, 750, null, 320000, 1440000, null],
            ["Google Search — Brand terms", 8000, 640, null, 180000, 990000, null],
            ["Instagram — Influencer collab", 40000, 1200, null, 500000, 1750000, null],
            ["", "", "", "", "", "", ""],
            ["TOTAL SPEND", "", "", "", 1000000, "", ""],
            ["New customers acquired", "", "", "", 85, "", ""],
            ["CAC (FCFA)", "", "", "", null, "", ""],
          ],
          editable: ["D2", "D3", "D4", "G2", "G3", "G4", "E8"],
          checks: [
            { cell: "D2", equals: 3.0, tol: 0.1 },
            { cell: "D3", equals: 8.0, tol: 0.1 },
            { cell: "D4", equals: 3.0, tol: 0.1 },
            { cell: "G2", equals: 4.5, tol: 0.1 },
            { cell: "G3", equals: 5.5, tol: 0.1 },
            { cell: "G4", equals: 3.5, tol: 0.1 },
            { cell: "E8", equals: 11765, tol: 1 },
          ],
          hint: "CTR = (Clicks ÷ Impressions) × 100. ROAS = Revenue ÷ Ad spend. CAC = Total spend ÷ New customers.",
          solution: {
            D2: "= (750 ÷ 25,000) × 100 = 3.0 %",
            D3: "= (640 ÷ 8,000) × 100 = 8.0 %",
            D4: "= (1,200 ÷ 40,000) × 100 = 3.0 %",
            G2: "= 1,440,000 ÷ 320,000 = 4.5",
            G3: "= 990,000 ÷ 180,000 = 5.5",
            G4: "= 1,750,000 ÷ 500,000 = 3.5",
            E8: "= 1,000,000 ÷ 85 = 11,765 FCFA",
          },
        },
      ],
    },

    /* ================================================================
       LESSON 5 — Data governance and privacy
       ================================================================ */
    {
      id: L5_ID,
      number: 5,
      title: "Data governance and privacy fundamentals",
      minutes: 25,
      objectives: [
        "Define data governance and explain its importance for marketing analytics credibility.",
        "Outline key GDPR principles and their applicability to businesses operating in or targeting the EU from Cameroon.",
        "Identify data governance best practices for marketing teams, including consent management, data retention, and access controls.",
      ],
      blocks: [
        {
          type: "p",
          text: "As a marketing analytics specialist, you will handle personal data — names, email addresses, phone numbers, purchase histories, browsing behaviour, and location data. **Data governance** is the framework of policies, processes, and standards that ensures this data is managed responsibly, accurately, securely, and in compliance with applicable laws. Without governance, your analytics outputs may be legally risky, ethically questionable, or simply unreliable.",
        },
        {
          type: "h",
          text: "Why data governance matters for marketing",
        },
        {
          type: "list",
          items: [
            "**Trust:** Customers who trust your data practices are more willing to share information, improving data quality and depth",
            "**Accuracy:** Governed data has defined quality standards — no duplicate records, consistent formats, validated entries",
            "**Compliance:** Regulations like GDPR impose fines up to 4 % of global turnover for violations",
            "**Decision quality:** Analytics built on poorly governed data lead to bad decisions — garbage in, garbage out",
            "**Competitive advantage:** Organisations with strong governance can activate data faster and with greater confidence",
          ],
        },
        {
          type: "h",
          text: "GDPR fundamentals for marketing professionals",
        },
        {
          type: "p",
          text: "The **General Data Protection Regulation (GDPR)** is a European Union regulation effective since May 2018. It applies not only to EU-based organisations but to **any organisation that processes personal data of EU residents** — including a Cameroonian e-commerce business that ships to France or Belgium. Understanding GDPR is therefore essential even for businesses headquartered in Central Africa.",
        },
        {
          type: "table",
          head: ["GDPR Principle", "What it requires", "Marketing implication"],
          rows: [
            [
              "Lawfulness, fairness, transparency",
              "Process data legally, fairly, and with clear communication to the data subject",
              "Your privacy policy must explain in plain language what data you collect, why, and how it is used for marketing",
            ],
            [
              "Purpose limitation",
              "Collect data for specified, explicit, and legitimate purposes only",
              "If you collect emails for order confirmations, you cannot use them for promotional newsletters without separate consent",
            ],
            [
              "Data minimisation",
              "Collect only what is necessary for the stated purpose",
              "A contest entry form should not ask for income level, marital status, or health data unless directly relevant",
            ],
            [
              "Accuracy",
              "Keep personal data accurate and up to date",
              "Implement regular CRM hygiene — remove bounced emails, update changed phone numbers, merge duplicate records",
            ],
            [
              "Storage limitation",
              "Retain personal data only as long as necessary",
              "Define retention policies: e.g., delete inactive customer records after 24 months of no engagement",
            ],
            [
              "Integrity and confidentiality",
              "Protect data against unauthorised access, loss, or destruction",
              "Encrypt customer databases, restrict marketing team access to only the data fields they need",
            ],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Consent is not optional",
          text: "Under GDPR, consent for marketing communications must be freely given, specific, informed, and unambiguous. Pre-ticked boxes are not valid consent. A Cameroon-based company emailing promotional content to customers in EU countries without proper opt-in consent is in violation, regardless of where the company is located.",
        },
        {
          type: "h",
          text: "Data governance best practices for marketing teams",
        },
        {
          type: "steps",
          title: "Implementing marketing data governance",
          items: [
            "Create a data inventory — document every dataset your marketing team uses, including source, owner, refresh frequency, and sensitivity level",
            "Define data quality standards — set rules for formats (phone numbers, names, addresses), required fields, and validation at entry",
            "Implement consent management — use a consent management platform (CMP) or at minimum a documented opt-in/opt-out register",
            "Establish access controls — not every team member needs access to all customer data; implement role-based access",
            "Set retention policies — define how long each data type is kept and automate deletion of expired records",
            "Train the team — regular training on data handling procedures, privacy regulations, and breach reporting protocols",
          ],
        },
        {
          type: "equip",
          title: "Data governance framework",
          items: [
            {
              art: "qc-flowchart",
              caption: "Marketing data governance lifecycle",
            },
          ],
        },
        {
          type: "p",
          text: "**Cameroon regulatory context:** While Cameroon does not have a GDPR-equivalent law as of 2025, the National Agency for Information and Communication Technologies (ANTIC) oversees cybersecurity and data protection. Law No. 2010/012 on cybersecurity and cybercrime provides some data protection provisions. Businesses operating across CEMAC countries should also consider the harmonised framework under development by the CEMAC Commission. Regardless of local regulation, adopting GDPR-aligned practices is recommended as a competitive differentiator and a prerequisite for doing business with EU partners.",
        },
        {
          type: "check",
          id: "mas-m1-check-5",
          question: "A Yaoundé travel agency collects customer email addresses during booking. They want to start sending monthly promotional newsletters to these customers. Under GDPR principles, what must they do first?",
          options: [
            "Nothing — they already have the email addresses from the booking process",
            "Obtain separate, explicit consent for promotional communications, clearly distinct from booking confirmation consent",
            "Add an unsubscribe link to the newsletter and that is sufficient",
            "Send a test email to check deliverability before the full send",
          ],
          answer: 1,
          explain: "Under GDPR's purpose limitation principle, consent given for booking confirmations does not extend to promotional newsletters. The agency must obtain separate, specific consent for marketing communications. An unsubscribe link is necessary but not sufficient — it does not replace initial consent.",
        },
        {
          type: "form",
          id: "mas-m1-form-governance",
          title: "Data governance scenario assessment",
          task: "For each scenario at a fictional Cameroon business, identify the data governance principle being violated or the best corrective action.",
          fields: [
            {
              kind: "select",
              label: "Ekom Fashion (Douala) stores customer phone numbers, email addresses, purchase history, blood type, and religion in their CRM. They collected all fields via a loyalty card sign-up form.",
              options: [
                "No violation — all data was voluntarily provided",
                "Data minimisation violation — blood type and religion are not necessary for fashion retail marketing",
                "Accuracy violation — the data may be outdated",
                "Storage limitation violation — the data has been kept too long",
              ],
              answer: 1,
              explain: "The data minimisation principle requires collecting only data necessary for the stated purpose. Blood type and religion have no legitimate marketing purpose for a fashion retailer and should never have been collected.",
            },
            {
              kind: "select",
              label: "Savane Tech (Yaoundé) has 50,000 customer records. Any of the 12 marketing team members can export the full database to CSV at any time. Last month, an intern downloaded the database to their personal laptop to 'work from home'.",
              options: [
                "This is efficient — it lets the team work flexibly",
                "Access control failure — implement role-based access and prohibit exports to personal devices",
                "Transparency violation — the customers do not know the data exists",
                "Purpose limitation violation — the data is being used for a different purpose",
              ],
              answer: 1,
              explain: "The integrity and confidentiality principle requires protecting data against unauthorised access. Unrestricted export capability and downloads to personal devices create serious security risks. Role-based access controls and device management policies are the correct fix.",
            },
            {
              kind: "select",
              label: "Plateau Coffee (Bafoussam) runs a WhatsApp group for customers who signed up at their café. They add new members without asking, share promotional messages 5 times daily, and share member phone numbers visibly in the group.",
              options: [
                "Only the message frequency is problematic",
                "Multiple violations: no consent for group addition, excessive messaging, and exposure of personal data (phone numbers) to other members",
                "This is standard WhatsApp marketing practice in Cameroon",
                "Only sharing phone numbers is the issue",
              ],
              answer: 1,
              explain: "This scenario violates consent (adding without permission), purpose limitation (using contacts for a different purpose than collected), and confidentiality (exposing phone numbers to other group members). Use broadcast lists instead of groups to protect privacy, and always obtain consent before adding contacts.",
            },
          ],
        },
      ],
    },

    /* ================================================================
       LESSON 6 — Practice: marketing fundamentals
       ================================================================ */
    {
      id: PRACTICE_ID,
      number: 6,
      title: "Practice: marketing fundamentals and the data landscape",
      minutes: 30,
      objectives: [
        "Calculate and interpret core marketing metrics from realistic campaign data",
        "Classify data types, sources, and marketing elements accurately",
        "Visualise and analyse marketing funnel data to identify performance gaps",
      ],
      blocks: [
        {
          type: "p",
          text: "Four exercises of increasing difficulty that test your mastery of marketing fundamentals and the data landscape. From basic metric calculation through to multi-step funnel analysis and data classification, these exercises mirror the tasks you will perform as a practising marketing analytics specialist.",
        },

        /* --- Beginner: sheet — calculate basic marketing metrics --- */
        {
          type: "sheet",
          id: "mas-m1-practice-sheet",
          level: "beginner",
          title: "Calculate basic marketing metrics",
          task: "Afrique Mobile (fictional, Douala) needs a monthly marketing dashboard. Using the raw data provided, calculate CAC, conversion rate, CTR, and ROAS for their January campaigns.",
          data: [
            ["ACQUISITION METRICS", "January"],
            ["Total marketing spend (FCFA)", 3600000],
            ["Sales team costs (FCFA)", 1200000],
            ["New customers acquired", 240],
            ["CAC (FCFA)", null],
            ["", ""],
            ["CONVERSION METRICS", ""],
            ["Website visitors", 18000],
            ["Completed purchases", 540],
            ["Conversion rate (%)", null],
            ["", ""],
            ["AD PERFORMANCE", "Facebook campaign"],
            ["Impressions", 95000],
            ["Clicks", 2850],
            ["CTR (%)", null],
            ["Ad spend (FCFA)", 1800000],
            ["Revenue from campaign (FCFA)", 7200000],
            ["ROAS", null],
          ],
          editable: ["B5", "B10", "B15", "B18"],
          checks: [
            { cell: "B5", equals: 20000, tol: 1 },
            { cell: "B10", equals: 3.0, tol: 0.1 },
            { cell: "B15", equals: 3.0, tol: 0.1 },
            { cell: "B18", equals: 4.0, tol: 0.1 },
          ],
          hint: "CAC = (Marketing spend + Sales costs) ÷ New customers. Conversion rate = (Purchases ÷ Visitors) × 100. CTR = (Clicks ÷ Impressions) × 100. ROAS = Revenue ÷ Ad spend.",
          solution: {
            B5: "= (3,600,000 + 1,200,000) ÷ 240 = 20,000 FCFA",
            B10: "= (540 ÷ 18,000) × 100 = 3.0 %",
            B15: "= (2,850 ÷ 95,000) × 100 = 3.0 %",
            B18: "= 7,200,000 ÷ 1,800,000 = 4.0",
          },
        },

        /* --- Intermediate: form — identify data types and sources --- */
        {
          type: "form",
          id: "mas-m1-practice-form",
          level: "intermediate",
          title: "Identify data types and sources",
          task: "For each data item encountered at a fictional Cameroon business, classify the data type and identify the best system to capture it.",
          fields: [
            {
              kind: "select",
              label: "Customer purchase records showing date, product SKU, quantity, price, and payment method from a Douala supermarket",
              options: [
                "Unstructured data — captured by social media analytics",
                "Structured data — captured by POS system",
                "Semi-structured data — captured by CRM",
                "Structured data — captured by web analytics",
              ],
              answer: 1,
              explain: "Transaction records with defined columns (date, SKU, quantity, price, payment method) are structured data. A POS system is the natural capture point for in-store purchases.",
            },
            {
              kind: "select",
              label: "Customer complaint messages received via WhatsApp about delayed deliveries, written in a mix of French and Pidgin English",
              options: [
                "Structured data — captured by POS system",
                "Unstructured data — captured and logged in CRM",
                "Semi-structured data — captured by web analytics",
                "Structured data — captured by social media analytics",
              ],
              answer: 1,
              explain: "Free-text messages in multiple languages are unstructured data — no predefined schema. They should be logged in the CRM as customer interactions for follow-up and sentiment analysis.",
            },
            {
              kind: "select",
              label: "Google Analytics 4 event data showing page_view events with parameters for page_title, page_location, user_id, and session_id in JSON format",
              options: [
                "Structured data — captured by CRM",
                "Unstructured data — captured by web analytics",
                "Semi-structured data — captured by web analytics",
                "Structured data — captured by POS",
              ],
              answer: 2,
              explain: "GA4 event data uses JSON format with nested parameters — this is semi-structured data. It has organisational markers (event names, parameter keys) but does not follow a fixed table schema. It is captured by the web analytics platform.",
            },
            {
              kind: "select",
              label: "Video testimonials from satisfied customers at a Yaoundé car dealership, posted on the company's YouTube channel",
              options: [
                "Structured data — captured by CRM",
                "Unstructured data — requires manual or AI-powered analysis",
                "Semi-structured data — captured by web analytics",
                "Structured data — captured by social media analytics",
              ],
              answer: 1,
              explain: "Video content is unstructured data — it has no tabular schema. Extracting insights requires transcription, sentiment analysis, or manual review. Social media analytics can track views and engagement metrics, but the content itself is unstructured.",
            },
          ],
        },

        /* --- Advanced: sorter — classify marketing metrics by category --- */
        {
          type: "sorter",
          id: "mas-m1-practice-sorter",
          level: "advanced",
          title: "Classify marketing metrics by strategic category",
          task: "Drag each marketing metric into the correct strategic category based on what aspect of marketing performance it measures.",
          layout: "columns",
          buckets: [
            { label: "Acquisition", desc: "Metrics about gaining new customers" },
            { label: "Engagement", desc: "Metrics about audience interaction" },
            { label: "Conversion", desc: "Metrics about turning prospects into buyers" },
            { label: "Retention", desc: "Metrics about keeping existing customers" },
          ],
          items: [
            {
              text: "Customer Acquisition Cost (CAC)",
              bucket: 0,
              explain: "CAC measures the cost of winning new customers — a core acquisition metric.",
            },
            {
              text: "Click-Through Rate (CTR)",
              bucket: 1,
              explain: "CTR measures how many people interact with an ad or link — an engagement metric showing content relevance and audience interest.",
            },
            {
              text: "Cart abandonment rate",
              bucket: 2,
              explain: "Cart abandonment occurs when prospects add items but fail to complete purchase — it directly measures conversion failure at the final step.",
            },
            {
              text: "Customer Lifetime Value (CLV)",
              bucket: 3,
              explain: "CLV measures the total value generated by a customer over their entire relationship — a retention metric because it depends on repeat purchases over time.",
            },
            {
              text: "Cost per lead (CPL)",
              bucket: 0,
              explain: "CPL measures the cost of generating each new lead — an acquisition metric that helps evaluate top-of-funnel efficiency.",
            },
            {
              text: "Average session duration",
              bucket: 1,
              explain: "Session duration measures how long visitors engage with content — an engagement metric indicating content quality and relevance.",
            },
            {
              text: "Conversion rate",
              bucket: 2,
              explain: "Conversion rate measures the percentage of visitors who take a desired action — the core conversion metric.",
            },
            {
              text: "Churn rate",
              bucket: 3,
              explain: "Churn rate measures the percentage of customers who stop buying — a retention metric indicating customer satisfaction and loyalty.",
            },
          ],
        },

        /* --- Expert: marketing funnel analysis --- */
        {
          type: "form",
          id: "mas-m1-practice-expert",
          level: "expert" as const,
          title: "Marketing funnel analysis — Cameroon e-commerce",
          task: "A fictional Cameroonian e-commerce site recorded these funnel metrics: 45,000 website visitors → 18,000 product page views → 5,400 add to cart → 2,700 begin checkout → 1,350 complete purchase. Analyse the funnel and answer the questions below.",
          fields: [
            { kind: "text" as const, label: "What is the overall conversion rate from visitors to purchase? (e.g. 3.0%)", accept: ["3.0%", "3%", "3.0 %", "3 %"], explain: "1,350 ÷ 45,000 = 3.0 %" },
            { kind: "select" as const, label: "At which stage does the largest absolute drop-off occur?", options: ["Visitors → Product page views (−27,000)", "Product page views → Add to cart (−12,600)", "Add to cart → Begin checkout (−2,700)", "Begin checkout → Purchase (−1,350)"], answer: 0, explain: "The largest absolute drop is 45,000 → 18,000, a loss of 27,000 users." },
            { kind: "text" as const, label: "If the page-to-cart rate improved from 30 % to 40 %, how many additional purchases would result (assuming downstream rates stay constant)?", accept: ["450"], explain: "New carts = 18,000 × 0.40 = 7,200. Checkout rate = 50 % → 3,600. Purchase rate = 50 % → 1,800. Additional = 1,800 − 1,350 = 450." },
            { kind: "select" as const, label: "Which metric best captures the compounding effect of funnel improvements?", options: ["Click-through rate", "Overall funnel conversion rate", "Impressions", "Bounce rate"], answer: 1, explain: "The overall funnel conversion rate captures how improvements at any stage compound through downstream stages to affect final outcomes." },
          ],
          hint: "Calculate each stage's conversion rate separately, then trace how improving one rate flows through the downstream stages.",
        },
      ],
    },
  ],

  /* ================================================================
     MODULE QUIZ
     ================================================================ */
  quiz: {
    id: QUIZ_ID,
    title: "Marketing Fundamentals & the Data Landscape",
    passPct: 70,
    questions: [
      {
        id: "mas-m1-q1",
        question: "Which element of the 7Ps framework is MOST directly concerned with the procedures and flow of activities by which a service is delivered?",
        options: [
          "Physical evidence",
          "Process",
          "Place",
          "People",
        ],
        answer: 1,
        explain: "Process refers to the procedures, mechanisms, and flow of activities in service delivery. Physical evidence refers to tangible cues, Place to distribution, and People to human actors.",
      },
      {
        id: "mas-m1-q2",
        question: "A company spends 4,000,000 FCFA on marketing and acquires 160 new customers. What is the Customer Acquisition Cost (CAC)?",
        options: [
          "40,000 FCFA",
          "25,000 FCFA",
          "160,000 FCFA",
          "4,000 FCFA",
        ],
        answer: 1,
        explain: "CAC = Total marketing spend ÷ New customers = 4,000,000 ÷ 160 = 25,000 FCFA per customer.",
      },
      {
        id: "mas-m1-q3",
        question: "Which stage of the customer journey is primarily measured by metrics like repeat purchase rate and Net Promoter Score?",
        options: [
          "Awareness",
          "Consideration",
          "Purchase",
          "Retention",
        ],
        answer: 3,
        explain: "Retention stage metrics focus on keeping existing customers engaged and buying again. Repeat purchase rate measures returning customer behaviour, and NPS measures loyalty and likelihood to continue the relationship.",
      },
      {
        id: "mas-m1-q4",
        question: "Customer complaint messages received via WhatsApp, written in multiple languages with emojis and photos, are best classified as:",
        options: [
          "Structured data",
          "Semi-structured data",
          "Unstructured data",
          "Transactional data",
        ],
        answer: 2,
        explain: "Free-text messages with mixed languages, emojis, and photos have no predefined schema — they are unstructured data requiring NLP or manual analysis to extract structured insights.",
      },
      {
        id: "mas-m1-q5",
        question: "An Instagram ad receives 20,000 impressions and 800 clicks. What is the Click-Through Rate (CTR)?",
        options: [
          "0.4 %",
          "2.5 %",
          "4.0 %",
          "25.0 %",
        ],
        answer: 2,
        explain: "CTR = (Clicks ÷ Impressions) × 100 = (800 ÷ 20,000) × 100 = 4.0 %.",
      },
      {
        id: "mas-m1-q6",
        question: "Under GDPR, which of the following is NOT a valid basis for processing customer data for marketing purposes?",
        options: [
          "Explicit consent given via an opt-in checkbox",
          "Legitimate interest with a documented balancing test",
          "A pre-ticked consent checkbox on a sign-up form",
          "Consent obtained through a clear affirmative action",
        ],
        answer: 2,
        explain: "GDPR requires consent to be given through a clear affirmative action. Pre-ticked boxes are explicitly prohibited as they do not represent freely given, unambiguous consent.",
      },
      {
        id: "mas-m1-q7",
        question: "Which system is the BEST source for understanding which products are frequently purchased together in a physical retail store?",
        options: [
          "CRM system",
          "Web analytics platform",
          "Point of Sale (POS) system",
          "Social media analytics",
        ],
        answer: 2,
        explain: "POS systems record every transaction with itemised detail, enabling basket analysis — identifying products frequently bought together. CRM tracks customer relationships, web analytics tracks online behaviour, and social media tracks engagement.",
      },
      {
        id: "mas-m1-q8",
        question: "A campaign costs 500,000 FCFA and generates 2,250,000 FCFA in revenue. What is the ROAS?",
        options: [
          "0.22",
          "2.25",
          "4.50",
          "22.50",
        ],
        answer: 2,
        explain: "ROAS = Revenue ÷ Ad spend = 2,250,000 ÷ 500,000 = 4.50. For every 1 FCFA spent, the campaign returned 4.50 FCFA in revenue.",
      },
    ],
  },
};
