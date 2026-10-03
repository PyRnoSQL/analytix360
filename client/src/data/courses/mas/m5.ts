import type { CourseModule } from "../../../lms/types";

/* ──────────────────────────────────────────────────────────────────────
   Module 5 — Digital Marketing Analytics
   Marketing Analytics Specialist (MAS) Certification Course
   ────────────────────────────────────────────────────────────────────── */

const L1_ID = "mas-m5-l1";
const L2_ID = "mas-m5-l2";
const L3_ID = "mas-m5-l3";
const L4_ID = "mas-m5-l4";
const L5_ID = "mas-m5-l5";
const PRACTICE_ID = "mas-m5-practice";
const QUIZ_ID = "mas-m5-quiz";

export const m5: CourseModule = {
  id: "mas-m5",
  number: 5,
  title: "Digital Marketing Analytics",
  summary:
    "This module covers the core digital marketing analytics competencies required by a marketing analytics specialist. It begins with SEO analytics — keyword ranking, organic traffic measurement, and domain authority — then moves to SEM/PPC metrics including cost per click, click-through rate, Quality Score, and return on ad spend. Social media analytics follows, covering engagement rate, reach, impressions, and share of voice across platforms used by Cameroonian businesses. Email marketing metrics — open rate, click rate, deliverability, and list growth — are examined with realistic Central African campaign data. The module culminates with attribution modeling: first-touch, last-touch, multi-touch, linear, and time-decay models, plus UTM parameter strategies for campaign tracking across channels.",
  hours: 14,

  lessons: [
    /* ================================================================
       LESSON 1 — SEO Analytics: Keywords, Traffic, and Authority
       ================================================================ */
    {
      id: L1_ID,
      title: "SEO analytics: keywords, traffic, and authority",
      minutes: 25,
      objectives: [
        "Interpret keyword ranking reports and identify opportunities for organic growth in African markets.",
        "Calculate and analyse organic traffic metrics including sessions, users, and bounce rate.",
        "Evaluate domain authority and backlink profiles to benchmark competitive positioning.",
      ],
      blocks: [
        {
          type: "p",
          text: "Search engine optimisation (SEO) analytics provides the foundation for understanding how potential customers discover your brand online. For businesses in Cameroon and Central Africa, where Google dominates with over 95 % search market share, mastering SEO metrics is essential for cost-effective digital growth. Unlike paid channels, organic search delivers compounding returns — content that ranks well today continues to generate traffic for months or years.",
        },
        {
          type: "h",
          text: "Keyword ranking fundamentals",
        },
        {
          type: "p",
          text: "A keyword ranking tells you where your page appears in search engine results pages (SERPs) for a specific query. Position 1 captures roughly 28–32 % of clicks, position 2 about 15 %, and by position 10 you are down to 2–3 %. Moving from position 8 to position 3 for a high-volume keyword can increase organic traffic tenfold. The three primary keyword metrics every analyst must track are: **search volume** (average monthly searches), **keyword difficulty** (how competitive the term is), and **current ranking position**.",
        },
        {
          type: "table",
          head: ["Metric", "Definition", "Example"],
          rows: [
            ["Search volume", "Average number of monthly searches for a keyword", "\"assurance auto Cameroun\" — 4,400 searches/month"],
            ["Keyword difficulty", "Score 0–100 indicating how hard it is to rank on page 1", "KD 35 = moderate — achievable with quality content and backlinks"],
            ["Current position", "Your page's rank in SERPs for that keyword", "Position 6 = bottom of page 1, low click-through rate"],
            ["Click-through rate (organic)", "% of searchers who click your result", "Position 1 ≈ 30 %, position 5 ≈ 6 %"],
            ["Keyword intent", "Purpose behind the search query", "\"prix forfait MTN\" = transactional; \"comment choisir forfait\" = informational"],
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Local keyword research in Central Africa",
          text: "Many Cameroonian businesses overlook French-language long-tail keywords. A Douala e-commerce company found that \"acheter téléphone pas cher Douala\" (KD 12, 1,900 searches/month) was far easier to rank for than the generic \"téléphone Cameroun\" (KD 58, 8,100 searches/month), and the long-tail term converted at 3× the rate because the intent was more specific.",
        },
        {
          type: "h",
          text: "Organic traffic analysis",
        },
        {
          type: "p",
          text: "Organic traffic refers to visitors who arrive at your site through unpaid search results. Key metrics include **sessions** (total visits), **users** (unique visitors), **pages per session** (depth of engagement), **average session duration**, and **bounce rate** (percentage of single-page visits). A healthy SEO programme shows steady month-over-month growth in organic sessions alongside improving engagement metrics.",
        },
        {
          type: "equip",
          title: "Reading an organic traffic dashboard",
          items: [
            { art: "qc-histogram", caption: "An organic traffic histogram shows the distribution of daily sessions over a month. Peaks often correspond to content publication dates or trending search terms. A right-skewed distribution suggests consistent baseline traffic with occasional viral spikes." },
            { art: "stat-regression", caption: "A regression trendline through monthly organic sessions reveals the growth trajectory. A positive slope indicates SEO momentum, while a flattening curve may signal content saturation or increased competition." },
          ],
        },
        {
          type: "h",
          text: "Domain authority and backlink profiles",
        },
        {
          type: "p",
          text: "Domain authority (DA) is a score from 0 to 100 that predicts how likely a domain is to rank in search results. It is calculated based on the quantity and quality of backlinks pointing to your site. A new Cameroonian business website typically starts at DA 1–5, while established sites like **jumia.cm** or **investir.cm** may reach DA 40–60. Building DA requires earning backlinks from reputable sites — local news outlets, industry directories, and partner organisations.",
        },
        {
          type: "list",
          items: [
            "**Referring domains**: The number of unique websites linking to your site — more important than total backlink count",
            "**Backlink quality**: Links from high-DA sites pass more authority than links from low-DA sites",
            "**Anchor text distribution**: The clickable text of backlinks should be varied and natural — over-optimised anchors trigger penalties",
            "**Follow vs nofollow**: Follow links pass authority; nofollow links (social media, forums) do not, but still drive referral traffic",
          ],
        },
        {
          type: "check",
          id: "mas-m5-l1-check1",
          question: "A Yaoundé travel agency's website has a domain authority of 18 and 45 referring domains. Their main competitor has DA 42 and 310 referring domains. Which strategy will most effectively close the authority gap?",
          options: [
            "Publishing more blog posts on their own site",
            "Earning backlinks from Cameroonian tourism directories, news sites, and travel bloggers",
            "Increasing their social media posting frequency",
            "Reducing page load time to improve user experience",
          ],
          answer: 1,
          explain: "Domain authority is primarily driven by backlink quality and quantity. Earning links from relevant, reputable sites is the most direct way to increase DA. While content creation, social media, and site speed all matter for SEO, they do not directly build domain authority the way backlinks do.",
        },
        {
          type: "sheet",
          id: "mas-m5-l1-sheet",
          title: "SEO keyword opportunity analysis",
          task: "Calculate the estimated monthly organic clicks for each keyword based on position and search volume. Use the CTR values: Pos 1 = 30%, Pos 3 = 10%, Pos 5 = 6%, Pos 8 = 2%. Enter estimated clicks in column D and identify the keyword with highest click potential.",
          data: [
            ["Keyword", "Search Volume", "Position", "Est. Clicks"],
            ["assurance auto Douala", 4400, 3, null],
            ["comparateur assurance Cameroun", 2900, 1, null],
            ["meilleure assurance moto", 1800, 5, null],
            ["tarif assurance santé Yaoundé", 3200, 8, null],
          ],
          editable: ["D2", "D3", "D4", "D5"],
          checks: [
            { cell: "D2", equals: 440, tol: 5 },
            { cell: "D3", equals: 870, tol: 5 },
            { cell: "D4", equals: 108, tol: 5 },
            { cell: "D5", equals: 64, tol: 5 },
          ],
          hint: "Multiply search volume by the CTR for each position. For example, position 3 CTR is 10%, so 4,400 × 0.10 = 440.",
          solution: { D2: "=B2*0.10", D3: "=B3*0.30", D4: "=B4*0.06", D5: "=B5*0.02" },
        },
        {
          type: "callout",
          tone: "tip",
          title: "Track keyword movement over time",
          text: "A single ranking snapshot is less useful than a trend. Track your top 20 keywords weekly to identify which are climbing (double down on that content) and which are falling (investigate algorithm changes or new competitors).",
        },
      ],
    },

    /* ================================================================
       LESSON 2 — SEM/PPC Metrics: Paid Search Performance
       ================================================================ */
    {
      id: L2_ID,
      title: "SEM/PPC metrics: paid search performance",
      minutes: 25,
      objectives: [
        "Calculate and interpret cost per click (CPC), click-through rate (CTR), and cost per acquisition (CPA) for paid search campaigns.",
        "Explain how Google Ads Quality Score is determined and its impact on ad rank and actual CPC.",
        "Compute return on ad spend (ROAS) and use it to evaluate campaign profitability.",
      ],
      blocks: [
        {
          type: "p",
          text: "Search engine marketing (SEM) or pay-per-click (PPC) advertising lets businesses appear at the top of search results instantly — but at a cost. For Cameroonian businesses investing marketing budgets in Google Ads, understanding PPC metrics is critical to avoid wasting spend. Unlike SEO, every click has a direct cost, making precise measurement and optimisation essential.",
        },
        {
          type: "h",
          text: "Core PPC metrics",
        },
        {
          type: "table",
          head: ["Metric", "Formula", "Benchmark (Cameroon services)"],
          rows: [
            ["Cost per click (CPC)", "Total spend ÷ Total clicks", "150–600 FCFA for insurance keywords"],
            ["Click-through rate (CTR)", "Clicks ÷ Impressions × 100", "3–5 % for search ads; 0.5–1 % for display"],
            ["Cost per acquisition (CPA)", "Total spend ÷ Conversions", "5,000–25,000 FCFA depending on industry"],
            ["Conversion rate (CVR)", "Conversions ÷ Clicks × 100", "2–5 % for landing pages; 8–12 % for lead forms"],
            ["Impression share", "Your impressions ÷ Total eligible impressions × 100", "60–80 % is healthy; <50 % signals budget or quality issues"],
          ],
        },
        {
          type: "equip",
          title: "Visualising PPC campaign performance",
          items: [
            { art: "qc-scatter", caption: "A scatter plot of CPC vs conversion rate across ad groups reveals which keywords deliver efficient conversions. Points in the lower-right quadrant (low CPC, high conversion rate) are top performers to scale, while upper-left points (high CPC, low conversion) should be paused or restructured." },
          ],
        },
        {
          type: "h",
          text: "Google Ads Quality Score",
        },
        {
          type: "p",
          text: "Quality Score is Google's rating of the quality and relevance of your keywords, ads, and landing pages, scored from 1 to 10. It directly affects your ad rank and actual CPC. A higher Quality Score means you pay less per click and achieve better ad positions. The three components are: **expected CTR** (how likely users are to click your ad), **ad relevance** (how closely your ad matches the search intent), and **landing page experience** (how useful and relevant your landing page is).",
        },
        {
          type: "callout",
          tone: "key",
          title: "Quality Score impact on costs",
          text: "Ad Rank = Max CPC Bid × Quality Score. A keyword with Quality Score 8 and a bid of 300 FCFA has an Ad Rank of 2,400 — beating a competitor bidding 500 FCFA with Quality Score 4 (Ad Rank 2,000). The higher-quality advertiser wins a better position AND pays less per click.",
        },
        {
          type: "h",
          text: "Return on ad spend (ROAS)",
        },
        {
          type: "p",
          text: "ROAS measures the revenue generated for every franc spent on advertising: **ROAS = Revenue from ads ÷ Ad spend**. A ROAS of 5:1 means 5 FCFA revenue for every 1 FCFA spent. For e-commerce, a ROAS of 4:1 or higher is typically profitable after accounting for cost of goods sold and operating expenses. For lead-generation businesses (insurance, banking, real estate), you calculate ROAS using the lifetime value of acquired customers.",
        },
        {
          type: "steps",
          title: "Calculating ROAS for a Douala insurance company",
          items: [
            "Determine total Google Ads spend for the campaign period: 2,500,000 FCFA over 30 days",
            "Count total conversions (quote requests submitted): 180 leads",
            "Apply lead-to-customer conversion rate: 180 × 12 % = 21.6 ≈ 22 new customers",
            "Calculate average customer lifetime value: 450,000 FCFA per customer over 3 years",
            "Compute total revenue attributed: 22 × 450,000 = 9,900,000 FCFA",
            "ROAS = 9,900,000 ÷ 2,500,000 = 3.96:1",
          ],
        },
        {
          type: "check",
          id: "mas-m5-l2-check1",
          question: "A Yaoundé real estate agency runs Google Ads with total spend of 1,800,000 FCFA. The campaign generated 12,000 impressions, 480 clicks, and 24 property viewing appointments. What is the CPA?",
          options: [
            "150 FCFA",
            "3,750 FCFA",
            "75,000 FCFA",
            "1,500 FCFA",
          ],
          answer: 2,
          explain: "CPA = Total spend ÷ Conversions = 1,800,000 ÷ 24 = 75,000 FCFA per appointment. The CPC would be 1,800,000 ÷ 480 = 3,750 FCFA, and the CTR would be 480 ÷ 12,000 = 4 %.",
        },
        {
          type: "sheet",
          id: "mas-m5-l2-sheet",
          title: "PPC campaign ROAS calculator",
          task: "Calculate CPC, CTR, CPA, and ROAS for each campaign. Revenue per conversion is provided in column F.",
          data: [
            ["Campaign", "Spend (FCFA)", "Impressions", "Clicks", "Conversions", "Rev/Conv (FCFA)", "CPC", "CTR %", "CPA", "ROAS"],
            ["Brand keywords", 450000, 18000, 1350, 135, 25000, null, null, null, null],
            ["Generic insurance", 1200000, 40000, 1600, 48, 80000, null, null, null, null],
            ["Competitor terms", 800000, 25000, 750, 15, 60000, null, null, null, null],
            ["Retargeting", 350000, 60000, 900, 90, 15000, null, null, null, null],
          ],
          editable: ["G2", "H2", "I2", "J2", "G3", "H3", "I3", "J3", "G4", "H4", "I4", "J4", "G5", "H5", "I5", "J5"],
          checks: [
            { cell: "G2", equals: 333, tol: 5 },
            { cell: "H2", equals: 7.5, tol: 0.1 },
            { cell: "I2", equals: 3333, tol: 50 },
            { cell: "J2", equals: 7.5, tol: 0.2 },
            { cell: "G3", equals: 750, tol: 5 },
            { cell: "H3", equals: 4, tol: 0.1 },
            { cell: "I3", equals: 25000, tol: 50 },
            { cell: "J3", equals: 3.2, tol: 0.1 },
            { cell: "G4", equals: 1067, tol: 10 },
            { cell: "I4", equals: 53333, tol: 100 },
            { cell: "J4", equals: 1.13, tol: 0.05 },
          ],
          hint: "CPC = Spend ÷ Clicks. CTR = (Clicks ÷ Impressions) × 100. CPA = Spend ÷ Conversions. ROAS = (Conversions × Rev/Conv) ÷ Spend.",
          solution: { G2: "=B2/D2", H2: "=D2/C2*100", I2: "=B2/E2", J2: "=E2*F2/B2" },
        },
        {
          type: "callout",
          tone: "warning",
          title: "Vanity metrics in PPC",
          text: "High impressions and clicks mean nothing if they do not convert. A campaign with 50,000 impressions but 0 conversions is wasting budget. Always evaluate PPC campaigns by CPA and ROAS, not by volume metrics alone.",
        },
      ],
    },

    /* ================================================================
       LESSON 3 — Social Media Analytics
       ================================================================ */
    {
      id: L3_ID,
      title: "Social media analytics: engagement, reach, and share of voice",
      minutes: 25,
      objectives: [
        "Calculate engagement rate, reach rate, and impression frequency for social media campaigns.",
        "Distinguish between vanity metrics and actionable social media KPIs.",
        "Measure share of voice and competitive positioning across social platforms.",
      ],
      blocks: [
        {
          type: "p",
          text: "Social media has become the primary digital channel for many Cameroonian businesses, with Facebook, WhatsApp Business, Instagram, and increasingly TikTok driving brand awareness and sales. As a marketing analytics specialist, you must move beyond counting likes and followers to measuring the metrics that actually drive business outcomes. This lesson covers the analytics framework for social media performance measurement.",
        },
        {
          type: "h",
          text: "Engagement metrics",
        },
        {
          type: "p",
          text: "Engagement measures how actively your audience interacts with your content. The **engagement rate** is the single most important social media metric because it indicates content resonance. There are several ways to calculate it, but the most common formula for organic content is: **Engagement rate = (Likes + Comments + Shares + Saves) ÷ Followers × 100**. For paid content, divide by reach instead of followers to get the **engagement rate on reach (ERR)**.",
        },
        {
          type: "table",
          head: ["Metric", "Formula", "Good benchmark (Africa)"],
          rows: [
            ["Engagement rate (organic)", "(Reactions + Comments + Shares) ÷ Followers × 100", "1–3 % on Facebook; 2–5 % on Instagram"],
            ["Reach rate", "Unique users who saw the post ÷ Followers × 100", "15–30 % organic reach on Facebook (declining)"],
            ["Impressions", "Total number of times content was displayed", "Impressions ≥ Reach (same user can see post multiple times)"],
            ["Frequency", "Impressions ÷ Reach", "1.5–3.0 for paid campaigns; >5 signals ad fatigue"],
            ["Video view rate", "Views (3+ seconds) ÷ Impressions × 100", "15–25 % for feed videos; 40–60 % for Stories"],
            ["Share of voice", "Your brand mentions ÷ Total industry mentions × 100", "Varies; market leader typically >30 %"],
          ],
        },
        {
          type: "equip",
          title: "Reading social media performance charts",
          items: [
            { art: "qc-control-chart", caption: "A control chart applied to daily engagement rate helps distinguish normal variation from genuine performance shifts. If your engagement rate drops below the lower control limit for three consecutive days, investigate — the algorithm may have changed or content quality has declined." },
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Social analytics at a Douala FMCG brand",
          text: "Brasseries du Cameroun tracks weekly engagement rate across their beer brands on Facebook and Instagram. When the engagement rate for their \"33\" Export brand dropped from 3.2 % to 1.1 % over two weeks, analysis revealed the shift from product photography to generic stock images. Returning to authentic local imagery restored engagement to 2.8 % within 10 days.",
        },
        {
          type: "h",
          text: "Vanity metrics vs actionable KPIs",
        },
        {
          type: "p",
          text: "Follower count is the classic vanity metric — it looks impressive in reports but says nothing about business impact. A page with 500,000 followers and 0.2 % engagement rate generates less interaction than a page with 20,000 followers and 5 % engagement. Actionable KPIs connect social media activity to business outcomes: **link clicks** (traffic driven), **lead form submissions** (leads generated), **message conversations** (customer enquiries), and **conversion value** (revenue attributed).",
        },
        {
          type: "list",
          items: [
            "**Vanity**: Total followers, total page likes, total impressions — look good but do not indicate business value",
            "**Actionable**: Engagement rate, click-through rate, cost per result, conversion rate — drive decisions and optimisation",
            "**Leading indicators**: Share of voice, brand mention sentiment, audience growth rate — predict future performance",
            "**Lagging indicators**: Revenue attributed to social, customer acquisition cost from social — confirm past performance",
          ],
        },
        {
          type: "h",
          text: "Share of voice (SOV)",
        },
        {
          type: "p",
          text: "Share of voice measures your brand's visibility relative to competitors in a defined market. In traditional media, SOV = your ad spend ÷ total category ad spend. In social media, SOV is calculated using brand mentions: **SOV = Your brand mentions ÷ (Your mentions + Competitor mentions) × 100**. Research by Les Binet and Peter Field shows that brands whose share of voice exceeds their share of market tend to grow, while brands with SOV below SOM tend to shrink — a principle called the **excess share of voice (ESOV)** effect.",
        },
        {
          type: "check",
          id: "mas-m5-l3-check1",
          question: "A Cameroonian mobile money service posts content that receives 1,200 reactions, 340 comments, and 180 shares. The page has 85,000 followers. What is the engagement rate?",
          options: [
            "0.82 %",
            "2.02 %",
            "1.41 %",
            "3.25 %",
          ],
          answer: 1,
          explain: "Engagement rate = (1,200 + 340 + 180) ÷ 85,000 × 100 = 1,720 ÷ 85,000 × 100 = 2.02 %. This is within the healthy range for a Facebook page in the African market.",
        },
        {
          type: "chart",
          id: "mas-m5-l3-chart1",
          title: "Monthly engagement rate by platform — Douala retailer",
          data: [
            { label: "Jan", value: 2.8 },
            { label: "Feb", value: 3.1 },
            { label: "Mar", value: 2.5 },
            { label: "Apr", value: 3.4 },
            { label: "May", value: 4.2 },
            { label: "Jun", value: 3.9 },
          ],
          unit: "%",
          kinds: ["line", "bar"],
          best: "line",
          question: "What trend do you observe and what might explain the May peak?",
          explain: "The engagement rate shows an upward trend with a peak in May (4.2 %). This could correlate with a seasonal promotion, a viral campaign, or increased posting of high-engagement content formats like video or user-generated content.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Platform-specific metrics",
          text: "Each social platform has unique metrics. Instagram prioritises Saves and Shares in its algorithm. Facebook weights Comments and Shares. TikTok rewards watch time and completion rate. Always tailor your KPI framework to the platform's algorithm signals.",
        },
      ],
    },

    /* ================================================================
       LESSON 4 — Email Marketing Metrics
       ================================================================ */
    {
      id: L4_ID,
      title: "Email marketing metrics: deliverability, engagement, and growth",
      minutes: 25,
      objectives: [
        "Calculate and benchmark open rate, click rate, and click-to-open rate for email campaigns.",
        "Evaluate email deliverability and identify factors that affect inbox placement.",
        "Measure list growth rate and subscriber lifetime value for email programmes.",
      ],
      blocks: [
        {
          type: "p",
          text: "Email remains one of the highest-ROI marketing channels, with global benchmarks showing an average return of 36 FCFA for every 1 FCFA spent. For Cameroonian businesses in financial services, e-commerce, and professional services, email marketing delivers personalised messages directly to prospects and customers. However, the channel's effectiveness depends entirely on measuring and optimising the right metrics.",
        },
        {
          type: "h",
          text: "Core email marketing metrics",
        },
        {
          type: "table",
          head: ["Metric", "Formula", "Industry benchmark"],
          rows: [
            ["Open rate", "Unique opens ÷ Emails delivered × 100", "18–25 % (note: Apple MPP inflates this)"],
            ["Click rate (CTR)", "Unique clicks ÷ Emails delivered × 100", "2.5–4.5 %"],
            ["Click-to-open rate (CTOR)", "Unique clicks ÷ Unique opens × 100", "12–18 %"],
            ["Bounce rate", "Bounced emails ÷ Emails sent × 100", "<2 % hard bounces acceptable"],
            ["Unsubscribe rate", "Unsubscribes ÷ Emails delivered × 100", "<0.5 % per campaign"],
            ["List growth rate", "(New subscribers − Unsubscribes − Bounces) ÷ List size × 100", "2–5 % monthly for growing brands"],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "Open rate reliability after Apple MPP",
          text: "Since September 2021, Apple Mail Privacy Protection (MPP) pre-loads tracking pixels for all Apple Mail users, making open rates artificially inflated. As a marketing analyst, rely more heavily on **click rate** and **click-to-open rate** as primary engagement indicators. Open rate is still useful for subject line A/B testing within the same send but should not be trended across time periods.",
        },
        {
          type: "h",
          text: "Email deliverability",
        },
        {
          type: "p",
          text: "Deliverability is the percentage of emails that actually reach the inbox (not spam or promotions tabs). The **inbox placement rate** is more meaningful than the simple delivery rate (which only measures whether the email bounced). Key factors affecting deliverability include: **sender reputation** (domain and IP reputation scores), **authentication** (SPF, DKIM, DMARC records), **list hygiene** (removing inactive and invalid addresses), and **content quality** (avoiding spam trigger words).",
        },
        {
          type: "equip",
          title: "Email performance funnel",
          items: [
            { art: "stat-capability", caption: "Think of email metrics as a funnel: Sent → Delivered → Opened → Clicked → Converted. Each step has a drop-off rate. A capability analysis mindset helps you identify which stage has the largest gap between actual and potential performance." },
          ],
        },
        {
          type: "steps",
          title: "Diagnosing a deliverability problem",
          items: [
            "Check delivery rate: if below 95 %, investigate hard bounce rate — are you sending to invalid addresses?",
            "Review sender reputation using Google Postmaster Tools and Microsoft SNDS",
            "Verify authentication records: SPF, DKIM, and DMARC must all pass for major inbox providers",
            "Audit list hygiene: remove subscribers who have not opened or clicked in 6+ months",
            "Test content: use spam scoring tools to identify trigger words, excessive images, or broken links",
          ],
        },
        {
          type: "h",
          text: "List growth and subscriber value",
        },
        {
          type: "p",
          text: "A healthy email programme grows its list while maintaining engagement quality. **List growth rate** = (New subscribers − Unsubscribes − Hard bounces) ÷ Total list size × 100, measured monthly. **Subscriber lifetime value (SLV)** estimates the total revenue a subscriber generates over their time on your list: SLV = Average revenue per email × Emails per month × Average subscriber lifespan in months. This metric helps you determine how much to invest in list-building campaigns.",
        },
        {
          type: "check",
          id: "mas-m5-l4-check1",
          question: "A Cameroonian bank sends an email campaign to 25,000 subscribers. 23,500 are delivered, 5,875 open the email, and 940 click a link. What is the click-to-open rate (CTOR)?",
          options: [
            "3.76 %",
            "4.00 %",
            "16.00 %",
            "25.00 %",
          ],
          answer: 2,
          explain: "CTOR = Unique clicks ÷ Unique opens × 100 = 940 ÷ 5,875 × 100 = 16.0 %. The click rate (CTR) would be 940 ÷ 23,500 × 100 = 4.0 %, and the open rate would be 5,875 ÷ 23,500 × 100 = 25.0 %.",
        },
        {
          type: "sheet",
          id: "mas-m5-l4-sheet",
          title: "Email campaign performance comparison",
          task: "Calculate the missing metrics for each campaign. Determine which campaign has the best click-to-open rate and which has a deliverability concern.",
          data: [
            ["Campaign", "Sent", "Delivered", "Opens", "Clicks", "Unsubs", "Delivery %", "Open %", "CTR %", "CTOR %"],
            ["Product launch", 30000, 28800, 8640, 1296, 45, null, null, null, null],
            ["Newsletter", 30000, 29400, 5880, 882, 30, null, null, null, null],
            ["Flash sale", 30000, 27000, 9450, 2025, 120, null, null, null, null],
            ["Re-engagement", 15000, 12000, 1800, 360, 450, null, null, null, null],
          ],
          editable: ["G2", "H2", "I2", "J2", "G3", "H3", "I3", "J3", "G4", "H4", "I4", "J4", "G5", "H5", "I5", "J5"],
          checks: [
            { cell: "G2", equals: 96, tol: 0.5 },
            { cell: "H2", equals: 30, tol: 0.5 },
            { cell: "I2", equals: 4.5, tol: 0.1 },
            { cell: "J2", equals: 15, tol: 0.5 },
            { cell: "G5", equals: 80, tol: 0.5 },
            { cell: "J4", equals: 21.4, tol: 0.5 },
          ],
          hint: "Delivery % = Delivered ÷ Sent × 100. Open % = Opens ÷ Delivered × 100. CTR = Clicks ÷ Delivered × 100. CTOR = Clicks ÷ Opens × 100. The re-engagement campaign's low delivery rate is a red flag.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "List decay is real",
          text: "Email lists degrade at 22–30 % per year as subscribers change jobs, abandon addresses, or lose interest. A list of 50,000 that is not actively maintained and grown will shrink to under 35,000 usable addresses within two years. Budget for continuous list-building, not one-time acquisition.",
        },
      ],
    },

    /* ================================================================
       LESSON 5 — Attribution Modeling and Campaign Tracking
       ================================================================ */
    {
      id: L5_ID,
      title: "Attribution modeling and campaign tracking",
      minutes: 30,
      objectives: [
        "Compare first-touch, last-touch, linear, time-decay, and position-based attribution models and explain when each is appropriate.",
        "Design a UTM parameter strategy for consistent multi-channel campaign tracking.",
        "Evaluate the impact of attribution model choice on channel budget allocation decisions.",
      ],
      blocks: [
        {
          type: "p",
          text: "A customer in Douala sees your Facebook ad on Monday, clicks a Google search result on Wednesday, opens your email on Friday, and makes a purchase on Saturday. Which channel gets credit for the sale? This is the attribution problem — and how you answer it determines where you invest your marketing budget. Attribution modeling is one of the most consequential analytical decisions a marketing analytics specialist makes.",
        },
        {
          type: "h",
          text: "Single-touch attribution models",
        },
        {
          type: "p",
          text: "Single-touch models assign 100 % of conversion credit to one touchpoint. **First-touch attribution** credits the channel that first introduced the customer to your brand — useful for understanding which channels drive awareness. **Last-touch attribution** credits the final interaction before conversion — useful for understanding which channels close sales. Both models are simple and easy to implement but fundamentally flawed: they ignore every other touchpoint in the customer journey.",
        },
        {
          type: "table",
          head: ["Model", "Credit allocation", "Best for", "Limitation"],
          rows: [
            ["First-touch", "100 % to first interaction", "Measuring awareness and top-of-funnel channels", "Ignores all nurturing and closing touchpoints"],
            ["Last-touch", "100 % to final interaction before conversion", "Measuring bottom-of-funnel effectiveness", "Ignores awareness and consideration channels"],
            ["Linear", "Equal credit to every touchpoint", "Understanding the full journey when all touches matter equally", "Overvalues low-impact touches, undervalues high-impact ones"],
            ["Time-decay", "More credit to touches closer to conversion", "Long sales cycles where recent interactions are most influential", "May undervalue critical early awareness touches"],
            ["Position-based (U-shaped)", "40 % first, 40 % last, 20 % split among middle", "Balancing awareness and conversion credit", "Arbitrary weight allocation; middle touches always undervalued"],
          ],
        },
        {
          type: "equip",
          title: "Visualising attribution models",
          items: [
            { art: "qc-histogram", caption: "A histogram of credit distribution across channels changes dramatically depending on the attribution model chosen. Under last-touch, search and direct channels dominate. Under first-touch, social and display often emerge as top contributors. Understanding this shift is critical for budget allocation." },
            { art: "stat-regression", caption: "A regression analysis of touchpoint sequence data can reveal which channel combinations produce the highest conversion rates, informing data-driven attribution weights beyond the standard models." },
          ],
        },
        {
          type: "h",
          text: "Multi-touch attribution in practice",
        },
        {
          type: "p",
          text: "Multi-touch models distribute credit across multiple touchpoints. The **linear model** gives equal weight to all interactions — if there are 4 touchpoints, each gets 25 %. The **time-decay model** gives exponentially more credit to interactions closer to conversion, using a configurable half-life (typically 7 days). The **position-based (U-shaped) model** gives 40 % to the first touch, 40 % to the last, and distributes the remaining 20 % equally among middle interactions.",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Attribution at a Cameroon fintech company",
          text: "When CinetPay (a Central African payment platform) switched from last-touch to linear attribution, they discovered that their Facebook awareness campaigns were driving 35 % of eventual conversions — credit that had previously gone entirely to Google Search (last touch). This insight shifted 2,000,000 FCFA monthly budget from search to social, increasing overall conversions by 18 %.",
        },
        {
          type: "h",
          text: "UTM parameters for campaign tracking",
        },
        {
          type: "p",
          text: "UTM (Urchin Tracking Module) parameters are tags added to URLs that allow analytics tools to identify exactly where traffic comes from. There are five standard UTM parameters: **utm_source** (the platform: google, facebook, newsletter), **utm_medium** (the marketing medium: cpc, social, email), **utm_campaign** (the specific campaign name), **utm_term** (the paid keyword, for search ads), and **utm_content** (differentiates ad variations or link placements within the same campaign).",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**utm_source** — Always required. Identifies the traffic source: google, facebook, mailchimp, jumia",
            "**utm_medium** — Always required. Identifies the marketing medium: cpc, organic, email, social, referral",
            "**utm_campaign** — Always required. Names the specific campaign: black_friday_2025, product_launch_q1",
            "**utm_term** — Optional. Tracks paid search keywords: assurance_auto_douala",
            "**utm_content** — Optional. Differentiates similar content: banner_top vs banner_sidebar, cta_red vs cta_blue",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "UTM naming conventions",
          text: "Establish strict naming conventions before your first campaign. Use lowercase only, hyphens or underscores (never spaces), and a consistent structure. Document your conventions in a shared spreadsheet. Inconsistent UTMs (e.g. \"Facebook\" vs \"facebook\" vs \"fb\") fragment your data and make analysis unreliable.",
        },
        {
          type: "check",
          id: "mas-m5-l5-check1",
          question: "A customer journey has 5 touchpoints: Facebook Ad → Blog post (organic) → Google Search Ad → Email newsletter → Direct visit (purchase). Under a time-decay model with a 7-day half-life, which channel receives the MOST credit?",
          options: [
            "Facebook Ad (first touch)",
            "Google Search Ad (middle touch)",
            "Email newsletter (second to last)",
            "Direct visit (last touch before purchase)",
          ],
          answer: 3,
          explain: "In a time-decay model, the touchpoint closest to conversion receives the most credit. The direct visit (last touch) gets the highest weight, followed by the email newsletter. The Facebook ad (first touch) receives the least credit. Each touchpoint's weight decreases exponentially as you move further from the conversion event.",
        },
        {
          type: "form",
          id: "mas-m5-l5-form1",
          title: "Identify the attribution model",
          task: "For each scenario, select the attribution model being described.",
          fields: [
            { kind: "select", label: "A Douala telecom company credits the Google Search ad that a customer clicked just before signing up for a data plan, ignoring the Instagram ad seen 3 days earlier.", options: ["First-touch", "Last-touch", "Linear", "Time-decay", "Position-based"], answer: 1, explain: "This is last-touch attribution — 100 % of credit goes to the final interaction before conversion." },
            { kind: "select", label: "An e-commerce site allocates equal conversion credit to the Facebook ad, the blog visit, the email click, and the direct visit that all preceded a purchase.", options: ["First-touch", "Last-touch", "Linear", "Time-decay", "Position-based"], answer: 2, explain: "Linear attribution distributes credit equally across all touchpoints in the conversion path." },
            { kind: "select", label: "A bank gives 40 % credit to the awareness billboard that introduced the customer, 40 % to the branch visit where they opened the account, and splits 20 % among the three digital touchpoints in between.", options: ["First-touch", "Last-touch", "Linear", "Time-decay", "Position-based"], answer: 4, explain: "Position-based (U-shaped) attribution gives 40 % to the first touch, 40 % to the last, and distributes 20 % among all middle interactions." },
            { kind: "select", label: "A SaaS company weights recent touchpoints more heavily — the demo request (2 days before purchase) gets 35 % credit, the webinar (8 days before) gets 20 %, and the original blog visit (30 days before) gets only 5 %.", options: ["First-touch", "Last-touch", "Linear", "Time-decay", "Position-based"], answer: 3, explain: "Time-decay attribution gives exponentially more credit to interactions closer to conversion. The decreasing percentages as touchpoints get older is the hallmark of this model." },
          ],
          hint: "Think about how credit is distributed: all to one touch (first or last), equally (linear), weighted by recency (time-decay), or weighted by position (U-shaped).",
        },
        {
          type: "check",
          id: "mas-m5-l5-check2",
          question: "Which UTM parameter would you use to distinguish between two different banner sizes in the same Facebook campaign?",
          options: [
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_content",
          ],
          answer: 3,
          explain: "utm_content is used to differentiate between variations of the same campaign — different ad creatives, banner sizes, or CTA button colours. utm_source identifies the platform (facebook), utm_medium identifies the channel type (social or cpc), and utm_campaign names the overall campaign.",
        },
      ],
    },

    /* ================================================================
       LESSON 6 — Practice: Digital Marketing Analytics
       ================================================================ */
    {
      id: PRACTICE_ID,
      title: "Practice: digital marketing analytics",
      minutes: 30,
      objectives: [
        "Apply ROAS and CPC calculations to evaluate multi-channel campaign performance.",
        "Classify digital marketing metrics by channel, type, and strategic purpose.",
        "Analyse attribution model outputs and recommend optimal budget allocation.",
      ],
      blocks: [
        {
          type: "p",
          text: "Four exercises of increasing difficulty test your mastery of digital marketing analytics — from basic metric calculations through to multi-channel attribution analysis. Each exercise reflects scenarios you will encounter as a marketing analytics specialist working with Cameroonian and Central African businesses.",
        },

        /* --- Beginner: sheet — Calculate ROAS and CPC --- */
        {
          type: "sheet",
          id: "mas-m5-practice-sheet",
          level: "beginner",
          title: "Multi-channel ROAS and CPC analysis",
          task: "A Yaoundé insurance company ran campaigns across four digital channels last quarter. Calculate CPC, conversion rate, CPA, and ROAS for each channel. Identify which channel delivers the best ROAS and which has the worst CPA.",
          data: [
            ["Channel", "Spend (FCFA)", "Clicks", "Conversions", "Revenue (FCFA)", "CPC", "Conv Rate %", "CPA", "ROAS"],
            ["Google Search", 3500000, 7000, 280, 28000000, null, null, null, null],
            ["Facebook Ads", 2200000, 11000, 176, 12320000, null, null, null, null],
            ["Instagram Ads", 1500000, 6000, 90, 5400000, null, null, null, null],
            ["Email marketing", 400000, 8000, 480, 9600000, null, null, null, null],
          ],
          editable: ["F2", "G2", "H2", "I2", "F3", "G3", "H3", "I3", "F4", "G4", "H4", "I4", "F5", "G5", "H5", "I5"],
          checks: [
            { cell: "F2", equals: 500, tol: 5 },
            { cell: "G2", equals: 4, tol: 0.1 },
            { cell: "H2", equals: 12500, tol: 50 },
            { cell: "I2", equals: 8, tol: 0.1 },
            { cell: "F3", equals: 200, tol: 5 },
            { cell: "I3", equals: 5.6, tol: 0.1 },
            { cell: "F5", equals: 50, tol: 5 },
            { cell: "I5", equals: 24, tol: 0.5 },
          ],
          hint: "CPC = Spend ÷ Clicks. Conv Rate = Conversions ÷ Clicks × 100. CPA = Spend ÷ Conversions. ROAS = Revenue ÷ Spend. Email marketing should show the highest ROAS due to low spend and high conversions.",
        },

        /* --- Intermediate: form — Identify attribution models --- */
        {
          type: "form",
          id: "mas-m5-practice-form",
          level: "intermediate",
          title: "Attribution model identification and application",
          task: "Read each business scenario and select the most appropriate attribution model, then answer the calculation question.",
          fields: [
            { kind: "select", label: "A startup with a short sales cycle (1–2 days) wants to know which channel closes the most deals to optimise their limited budget immediately.", options: ["First-touch", "Last-touch", "Linear", "Time-decay"], answer: 1, explain: "With a short sales cycle and immediate optimisation needs, last-touch attribution is most practical — it identifies which channel directly drives conversions." },
            { kind: "select", label: "A B2B software company with a 90-day sales cycle and 8+ touchpoints wants to understand the full customer journey without biasing toward any single interaction.", options: ["First-touch", "Last-touch", "Linear", "Position-based"], answer: 2, explain: "Linear attribution gives equal credit to all 8+ touchpoints, providing an unbiased view of the full journey — ideal for understanding complex B2B paths." },
            { kind: "select", label: "A university wants to understand which channels first introduce prospective students to their programmes, knowing that the application process takes 6+ months.", options: ["First-touch", "Last-touch", "Linear", "Time-decay"], answer: 0, explain: "First-touch attribution identifies the channels driving initial awareness — critical for a long consideration cycle where the first interaction plants the seed." },
            { kind: "text", label: "Under linear attribution with 4 touchpoints, if a conversion is worth 1,200,000 FCFA, how much credit (in FCFA) does each touchpoint receive?", accept: ["300000", "300,000"], placeholder: "e.g. 300000", explain: "Linear attribution divides credit equally: 1,200,000 ÷ 4 = 300,000 FCFA per touchpoint." },
          ],
          hint: "Consider the sales cycle length, the number of touchpoints, and what the business needs to understand — awareness (first-touch), closing (last-touch), or the full journey (linear/time-decay).",
        },

        /* --- Advanced: sorter — Classify digital metrics --- */
        {
          type: "sorter",
          id: "mas-m5-practice-sorter",
          level: "advanced",
          title: "Classify digital marketing metrics by channel",
          task: "Drag each metric into the correct digital marketing channel category.",
          layout: "columns",
          buckets: [
            { label: "SEO" },
            { label: "PPC/SEM" },
            { label: "Social media" },
            { label: "Email" },
          ],
          items: [
            { text: "Domain authority", bucket: 0, explain: "Domain authority is an SEO metric that predicts ranking ability based on backlink quality." },
            { text: "Quality Score", bucket: 1, explain: "Quality Score is Google Ads' rating of keyword/ad/landing page relevance (1–10)." },
            { text: "Share of voice (social)", bucket: 2, explain: "Share of voice measures your brand's mention volume relative to competitors on social platforms." },
            { text: "Click-to-open rate", bucket: 3, explain: "CTOR (clicks ÷ opens) is specific to email marketing and measures content relevance for those who opened." },
            { text: "Referring domains", bucket: 0, explain: "Referring domains count unique sites linking to yours — a key SEO backlink metric." },
            { text: "Impression share", bucket: 1, explain: "Impression share (your impressions ÷ eligible impressions) is a PPC metric showing budget/quality adequacy." },
            { text: "Engagement rate", bucket: 2, explain: "Engagement rate (interactions ÷ followers or reach) is the primary social media performance metric." },
            { text: "List growth rate", bucket: 3, explain: "List growth rate measures net subscriber growth — a metric specific to email marketing programmes." },
            { text: "Organic CTR by position", bucket: 0, explain: "Click-through rate by SERP position is an SEO metric showing how ranking position affects traffic capture." },
            { text: "Cost per acquisition", bucket: 1, explain: "While CPA exists across channels, in this context it is most closely associated with PPC where every click has a direct cost and CPA optimisation is the primary goal." },
          ],
          hint: "Think about which channel each metric is native to. Some metrics (like CTR) exist across channels, but each has a primary home.",
        },

        /* --- Expert: chart — Visualise channel performance --- */
        {
          type: "chart",
          id: "mas-m5-practice-chart",
          level: "expert",
          title: "Channel ROAS comparison — Cameroon insurance company Q3",
          data: [
            { label: "Google Search", value: 8.0 },
            { label: "Facebook Ads", value: 5.6 },
            { label: "Instagram", value: 3.6 },
            { label: "Email", value: 24.0 },
            { label: "Display Ads", value: 1.2 },
            { label: "YouTube", value: 2.8 },
          ],
          unit: "ROAS",
          kinds: ["bar", "pie"],
          best: "bar",
          question: "Based on ROAS alone, which channel should receive increased budget and which should be reconsidered? What additional context would you need before making a final recommendation?",
          explain: "Email (ROAS 24:1) and Google Search (8:1) are the top performers by ROAS. Display Ads (1.2:1) is barely profitable and may not cover the cost of goods. However, ROAS alone is insufficient — you need to consider: (1) scalability — email may have a ceiling on list size; (2) attribution model used — last-touch may over-credit search; (3) the role of display in awareness/assisted conversions; (4) customer lifetime value differences by channel.",
        },
      ],
    },
  ],

  quiz: {
    id: QUIZ_ID,
    title: "Digital Marketing Analytics — Module Quiz",
    passPct: 70,
    questions: [
      {
        id: "mas-m5-q1",
        question: "A keyword has 6,600 monthly searches and your page ranks at position 3 (estimated CTR 10 %). What is the estimated monthly organic traffic from this keyword?",
        options: [
          "330 visits",
          "660 visits",
          "1,980 visits",
          "6,600 visits",
        ],
        answer: 1,
        explain: "Estimated organic traffic = Search volume × CTR = 6,600 × 0.10 = 660 visits per month.",
      },
      {
        id: "mas-m5-q2",
        question: "An advertiser bids 400 FCFA per click and has a Quality Score of 7. A competitor bids 600 FCFA with a Quality Score of 4. Who wins the ad auction?",
        options: [
          "The competitor, because their bid is higher",
          "The first advertiser, because their Ad Rank (2,800) exceeds the competitor's (2,400)",
          "They tie, because 400 × 7 equals 600 × 4.67",
          "Cannot be determined without knowing impression share",
        ],
        answer: 1,
        explain: "Ad Rank = Bid × Quality Score. First advertiser: 400 × 7 = 2,800. Competitor: 600 × 4 = 2,400. The first advertiser wins with a higher Ad Rank despite a lower bid.",
      },
      {
        id: "mas-m5-q3",
        question: "A social media post receives 450 likes, 120 comments, and 80 shares. The page has 32,500 followers. What is the engagement rate?",
        options: [
          "0.65 %",
          "1.38 %",
          "2.00 %",
          "3.85 %",
        ],
        answer: 2,
        explain: "Engagement rate = (450 + 120 + 80) ÷ 32,500 × 100 = 650 ÷ 32,500 × 100 = 2.00 %.",
      },
      {
        id: "mas-m5-q4",
        question: "Which email marketing metric is LEAST affected by Apple Mail Privacy Protection (MPP)?",
        options: [
          "Open rate",
          "Click rate",
          "Open-to-click timing",
          "Forward rate",
        ],
        answer: 1,
        explain: "Apple MPP pre-loads tracking pixels, inflating open rates and distorting open timing. Click rate (unique clicks ÷ delivered) requires actual user action and is not affected by MPP pixel pre-loading.",
      },
      {
        id: "mas-m5-q5",
        question: "Under position-based (U-shaped) attribution, a customer journey has 6 touchpoints. How much credit does each of the 4 middle touchpoints receive?",
        options: [
          "5 % each",
          "10 % each",
          "16.7 % each",
          "20 % each",
        ],
        answer: 0,
        explain: "Position-based gives 40 % to the first touch and 40 % to the last touch. The remaining 20 % is split equally among the 4 middle touchpoints: 20 % ÷ 4 = 5 % each.",
      },
      {
        id: "mas-m5-q6",
        question: "A Google Ads campaign spends 1,500,000 FCFA and generates 45,000,000 FCFA in attributed revenue. What is the ROAS?",
        options: [
          "3:1",
          "15:1",
          "30:1",
          "45:1",
        ],
        answer: 2,
        explain: "ROAS = Revenue ÷ Ad spend = 45,000,000 ÷ 1,500,000 = 30:1. For every 1 FCFA spent, the campaign generated 30 FCFA in revenue.",
      },
      {
        id: "mas-m5-q7",
        question: "Which UTM parameter identifies the specific marketing medium (e.g., cost-per-click, email, social)?",
        options: [
          "utm_source",
          "utm_medium",
          "utm_campaign",
          "utm_content",
        ],
        answer: 1,
        explain: "utm_medium identifies the marketing medium or channel type: cpc, email, social, organic, referral. utm_source identifies the specific platform (google, facebook), utm_campaign names the campaign, and utm_content differentiates ad variations.",
      },
      {
        id: "mas-m5-q8",
        question: "An email campaign is sent to 40,000 subscribers. 38,000 are delivered, 9,500 are opened, and 1,425 links are clicked. What is the click-to-open rate (CTOR)?",
        options: [
          "3.75 %",
          "15.00 %",
          "25.00 %",
          "37.50 %",
        ],
        answer: 1,
        explain: "CTOR = Clicks ÷ Opens × 100 = 1,425 ÷ 9,500 × 100 = 15.0 %. This measures how compelling the email content was for those who opened it.",
      },
    ],
  },
};
