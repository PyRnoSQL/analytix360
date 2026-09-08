import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Clock, Users, Award, BarChart3, Shield,
  GraduationCap, ArrowRight, Star, Layers, CheckCircle2,
  BookOpen, FileText, Target, type LucideIcon,
} from "lucide-react";

// ─── Types ───
interface TrainingModule {
  id: string;
  number: number;
  title: string;
  hours: number;
  price: number;
  topics: string[];
}

interface Program {
  id: string;
  title: string;
  acronym: string;
  subtitle: string;
  level: "Foundation" | "Associate" | "Professional" | "Specialist";
  badge: "Silver" | "Gold" | "Platinum";
  duration: string;
  contactHours: number;
  delivery: string;
  targetAudience: string;
  prerequisites: string;
  alignment: string;
  assessment: string;
  description: string;
  modules: TrainingModule[];
  capstone: { title: string; tasks: string[] };
}

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
  programs: Program[];
}

// ═══════════════════════════════════════════════
//  TRAINING CATALOG — from Analytix Engineering
//  Professional Certification Training Academy
//  Curriculum Design Catalogue
// ═══════════════════════════════════════════════

const CATEGORIES: Category[] = [
  {
    id: "opex",
    name: "Operational Excellence",
    icon: Target,
    color: "#059669",
    description: "Two-tier belt structure aligned to IASSC/ASQ Six Sigma bodies of knowledge, focused on process improvement in manufacturing, agro-processing, logistics, and public-service delivery contexts common across Africa.",
    programs: [
      {
        id: "lssyb",
        title: "Lean Six Sigma Yellow Belt",
        acronym: "LSSYB",
        subtitle: "Foundational process-improvement literacy for team members and frontline supervisors",
        level: "Foundation",
        badge: "Silver",
        duration: "5 weeks",
        contactHours: 40,
        delivery: "24 self-paced + 16 live workshop",
        targetAudience: "Frontline supervisors, team leads, junior engineers, government service-delivery officers",
        prerequisites: "None — basic numeracy and workplace experience recommended",
        alignment: "IASSC Yellow Belt Body of Knowledge / ASQ Foundations of Six Sigma",
        assessment: "Proctored 60-question exam (70% pass) + Capstone workplace project",
        description: "The Yellow Belt program builds a solid foundation in Lean Six Sigma thinking. Graduates understand waste elimination, basic statistical thinking, and can actively support Green Belt and Black Belt improvement projects.",
        modules: [
          { id: "lssyb-m1", number: 1, title: "Foundations of Lean & Six Sigma", hours: 6, price: 0, topics: [
            "History and business case for Lean and Six Sigma; cost of poor quality (COPQ)",
            "The 8 Wastes (DOWNTIME) and value vs. non-value-added activity",
            "Introduction to the DMAIC roadmap and Six Sigma organizational roles",
            "Voice of the Customer (VOC) and translating customer needs into Critical-to-Quality (CTQ) requirements",
          ]},
          { id: "lssyb-m2", number: 2, title: "Define Phase", hours: 6, price: 0, topics: [
            "Building a project charter: problem statement, goal statement, scope, and business case",
            "SIPOC diagrams (Suppliers-Inputs-Process-Outputs-Customers)",
            "Stakeholder identification and RACI basics",
            "Selecting and prioritizing improvement opportunities",
          ]},
          { id: "lssyb-m3", number: 3, title: "Measure Phase Essentials", hours: 8, price: 0, topics: [
            "Process mapping and flowcharting techniques",
            "Basic data types (continuous vs. discrete) and data collection plans",
            "Descriptive statistics: mean, median, mode, range, standard deviation",
            "Introduction to baseline performance metrics and defect definitions",
          ]},
          { id: "lssyb-m4", number: 4, title: "Analyze Phase Basics", hours: 8, price: 0, topics: [
            "Fishbone / Ishikawa (Cause-and-Effect) diagrams",
            "5 Whys root-cause technique",
            "Pareto analysis and the 80/20 principle for prioritizing causes",
            "Simple graphical analysis: histograms, run charts, scatter plots",
          ]},
          { id: "lssyb-m5", number: 5, title: "Improve & Control Basics", hours: 8, price: 0, topics: [
            "Kaizen events and rapid improvement workshops",
            "5S workplace organization (Sort, Set in Order, Shine, Standardize, Sustain)",
            "Standard work and visual management",
            "Introduction to control charts and sustaining improvements",
          ]},
        ],
        capstone: { title: "Yellow Belt Workplace Improvement Project", tasks: [
          "Identify one recurring inefficiency, defect, or delay in your workplace",
          "Apply SIPOC, a Fishbone diagram, and a Pareto chart to isolate the top root cause",
          "Propose and pilot one low-cost countermeasure (5S, visual control, or standard work change)",
          "Present a one-page A3 report with before/after metrics to a review panel",
        ]},
      },
      {
        id: "lssgb",
        title: "Lean Six Sigma Green Belt",
        acronym: "LSSGB",
        subtitle: "Applied statistical process-improvement leadership for engineers, analysts, and project leads",
        level: "Professional",
        badge: "Gold",
        duration: "10 weeks",
        contactHours: 90,
        delivery: "50 self-paced + 40 live workshop/lab",
        targetAudience: "Process/industrial engineers, quality officers, operations analysts, project managers",
        prerequisites: "Lean Six Sigma Yellow Belt (or demonstrated equivalent) + basic spreadsheet literacy",
        alignment: "IASSC Green Belt Body of Knowledge / ASQ CSSGB reference topics",
        assessment: "Proctored 100-question exam (70% pass) + full DMAIC Capstone with statistical evidence",
        description: "The Green Belt program develops practitioners who can independently lead DMAIC improvement projects that deliver measurable financial and operational results. Graduates master statistical analysis, hypothesis testing, DOE, and SPC.",
        modules: [
          { id: "lssgb-m1", number: 1, title: "Six Sigma Deployment & Project Selection", hours: 6, price: 0, topics: [
            "Organizational deployment models and linking projects to strategic KPIs",
            "Financial benefit analysis: hard vs. soft savings, cost-benefit justification",
            "Advanced project chartering and team formation",
          ]},
          { id: "lssgb-m2", number: 2, title: "Define Phase — Deep Dive", hours: 8, price: 0, topics: [
            "Advanced VOC techniques: surveys, interviews, Kano model",
            "Quality Function Deployment (QFD) / House of Quality introduction",
            "Risk framing with a preliminary FMEA",
          ]},
          { id: "lssgb-m3", number: 3, title: "Measure Phase — Measurement Systems & Capability", hours: 14, price: 0, topics: [
            "Detailed process mapping: swim-lane and value-stream perspectives",
            "Measurement System Analysis (MSA): Gage R&R for variable and attribute data",
            "Sampling strategies and data collection plan design",
            "Process capability and performance indices (Cp, Cpk, Pp, Ppk) and sigma-level calculation",
          ]},
          { id: "lssgb-m4", number: 4, title: "Analyze Phase — Statistical Root Cause", hours: 16, price: 0, topics: [
            "Probability distributions (normal, binomial, Poisson) for process data",
            "Hypothesis testing: t-tests, chi-square, ANOVA for comparing process conditions",
            "Correlation and simple/multiple linear regression",
            "Failure Mode and Effects Analysis (FMEA) — detailed application",
          ]},
          { id: "lssgb-m5", number: 5, title: "Improve Phase — Solution Design", hours: 14, price: 0, topics: [
            "Introduction to Design of Experiments (DOE): full-factorial basics",
            "Solution generation, evaluation, and prioritization matrices",
            "Piloting solutions and validating improvement with data",
          ]},
          { id: "lssgb-m6", number: 6, title: "Control Phase — Sustaining Gains", hours: 10, price: 0, topics: [
            "Statistical Process Control (SPC): control chart selection and construction (X-bar/R, p, c, u charts)",
            "Control plans and standard operating procedures",
            "Mistake-proofing (Poka-Yoke) and response plans",
          ]},
          { id: "lssgb-m7", number: 7, title: "Lean Integration", hours: 10, price: 0, topics: [
            "Value Stream Mapping (current-state and future-state)",
            "Kanban and pull systems",
            "Single-Minute Exchange of Die (SMED) for setup reduction",
          ]},
        ],
        capstone: { title: "End-to-End DMAIC Capstone Project", tasks: [
          "Execute a complete DMAIC project on a live organizational process",
          "Produce a validated project charter, SIPOC, and data collection plan",
          "Perform a Gage R&R and baseline process capability study",
          "Apply at least two statistical analysis tools to identify root causes",
          "Implement a piloted improvement and demonstrate statistically significant results",
          "Deliver a control plan and formal project storyboard, quantifying financial or quality impact",
        ]},
      },
    ],
  },
  {
    id: "quality",
    name: "Quality Engineering",
    icon: Shield,
    color: "#7C3AED",
    description: "A three-tier pathway — Technician → Engineer Associate → Laboratory Specialist — aligned to ASQ Bodies of Knowledge (CQT/CQE) and ISO/IEC 17025, built for manufacturers, regulatory bodies, and testing laboratories.",
    programs: [
      {
        id: "qt",
        title: "Quality Technician",
        acronym: "QT",
        subtitle: "Frontline inspection, testing, and quality-control competency",
        level: "Foundation",
        badge: "Silver",
        duration: "7 weeks",
        contactHours: 60,
        delivery: "Self-paced + live workshop",
        targetAudience: "Quality inspectors, production technicians, aspiring quality professionals",
        prerequisites: "Secondary technical education or equivalent workplace experience",
        alignment: "ASQ Certified Quality Technician (CQT) Body of Knowledge",
        assessment: "Proctored 90-question exam (70% pass) + Capstone inspection & CAPA case study",
        description: "The Quality Technician program provides essential skills for quality inspections, understanding quality standards, and supporting quality management systems.",
        modules: [
          { id: "qt-m1", number: 1, title: "Quality Concepts & Team Dynamics", hours: 8, price: 0, topics: [
            "Quality philosophies: Deming, Juran, Crosby, and the cost of quality",
            "Roles and responsibilities within a quality management system",
            "Team problem-solving methods and effective meeting facilitation",
          ]},
          { id: "qt-m2", number: 2, title: "Inspection, Test & Metrology", hours: 12, price: 0, topics: [
            "Sampling plans (AQL-based acceptance sampling)",
            "Measurement equipment: calipers, micrometers, gauges, and calibration fundamentals",
            "Traceability, measurement uncertainty basics, and equipment maintenance records",
          ]},
          { id: "qt-m3", number: 3, title: "Basic Quality Tools & Statistics", hours: 12, price: 0, topics: [
            "The Seven Basic Quality Tools (checksheets, Pareto, fishbone, histograms, scatter diagrams, control charts, flowcharts)",
            "Elementary statistics for quality data interpretation",
            "Introduction to control charts for shop-floor monitoring",
          ]},
          { id: "qt-m4", number: 4, title: "Corrective & Preventive Action", hours: 10, price: 0, topics: [
            "Root cause analysis techniques (5 Whys, fishbone, fault tree basics)",
            "8D problem-solving methodology",
            "CAPA systems and effectiveness verification",
          ]},
          { id: "qt-m5", number: 5, title: "Quality Systems & Standards", hours: 10, price: 0, topics: [
            "ISO 9001 fundamentals: structure, key clauses, and documentation requirements",
            "Document and record control practices",
            "Introduction to internal audit concepts and non-conformance reporting",
          ]},
        ],
        capstone: { title: "Inspection & CAPA Case Study", tasks: [
          "Design a sampling and inspection plan for a defined product or service line",
          "Document a non-conformance using an 8D or CAPA template",
          "Conduct root cause analysis using at least two quality tools",
          "Propose verified corrective and preventive actions with effectiveness metrics",
        ]},
      },
      {
        id: "qea",
        title: "Quality Engineer Associate",
        acronym: "QEA",
        subtitle: "Statistical and systems-level quality engineering for engineers and QA leads",
        level: "Associate",
        badge: "Gold",
        duration: "11 weeks",
        contactHours: 100,
        delivery: "Hybrid + live workshop/lab",
        targetAudience: "Quality engineers, process/manufacturing engineers, QA/QC supervisors",
        prerequisites: "Quality Technician certificate or engineering/technical degree + basic statistics",
        alignment: "ASQ Certified Quality Engineer (CQE) Body of Knowledge (associate level)",
        assessment: "Proctored 110-question exam (70% pass) + Capstone QMS/statistical project",
        description: "The QEA program develops professionals who can design, implement, and manage quality systems, conduct audits, perform advanced statistical analysis, lead FMEA sessions, and manage supplier quality.",
        modules: [
          { id: "qea-m1", number: 1, title: "Quality Management Systems", hours: 10, price: 0, topics: [
            "ISO 9001 in depth: process approach, risk-based thinking, management review",
            "Quality planning and the Cost of Quality (prevention, appraisal, failure costs)",
            "Supplier quality management fundamentals",
          ]},
          { id: "qea-m2", number: 2, title: "Product & Process Design for Quality", hours: 12, price: 0, topics: [
            "Design for Manufacturability (DFM) and Design for Six Sigma (DFSS) overview",
            "Tolerance design and stack-up analysis",
            "Reliability engineering basics: bathtub curve, MTBF, MTTR",
          ]},
          { id: "qea-m3", number: 3, title: "Statistical Methods for Quality", hours: 14, price: 0, topics: [
            "Probability distributions and sampling theory",
            "Hypothesis testing and confidence intervals for quality decisions",
            "Regression analysis and Design of Experiments (DOE) fundamentals",
          ]},
          { id: "qea-m4", number: 4, title: "Statistical Process Control (Advanced)", hours: 12, price: 0, topics: [
            "Control chart theory: variable and attribute charts, rational subgrouping",
            "Process capability and performance analysis in regulated environments",
            "Multivariate and short-run SPC considerations",
          ]},
          { id: "qea-m5", number: 5, title: "Measurement Systems Analysis", hours: 10, price: 0, topics: [
            "Gage R&R studies (crossed and nested designs)",
            "Calibration systems management and metrology traceability",
            "Attribute agreement analysis",
          ]},
          { id: "qea-m6", number: 6, title: "Risk & Reliability Engineering", hours: 12, price: 0, topics: [
            "Design and Process FMEA (DFMEA/PFMEA)",
            "Fault Tree Analysis (FTA) fundamentals",
            "Reliability testing and life-data analysis basics",
          ]},
          { id: "qea-m7", number: 7, title: "Auditing & Corrective Action Systems", hours: 10, price: 0, topics: [
            "Internal and supplier audit planning and execution",
            "Advanced root-cause methodologies and systemic CAPA management",
            "Regulatory and customer audit readiness",
          ]},
        ],
        capstone: { title: "Quality Engineering Project", tasks: [
          "Select a real process or product and complete a Process or Design FMEA",
          "Conduct a Gage R&R study and a process capability analysis",
          "Design and justify a control plan integrating SPC and inspection strategy",
          "Present a QMS improvement recommendation with quantified risk-reduction impact",
        ]},
      },
      {
        id: "lqms",
        title: "Laboratory Quality Management Specialist",
        acronym: "LQMS",
        subtitle: "ISO/IEC 17025-based competency for testing and calibration laboratories",
        level: "Specialist",
        badge: "Platinum",
        duration: "9 weeks",
        contactHours: 80,
        delivery: "On-site + Hybrid",
        targetAudience: "Laboratory managers, quality officers in testing/calibration/medical labs, regulatory lab auditors",
        prerequisites: "Science, engineering, or laboratory technical background; basic statistics recommended",
        alignment: "ISO/IEC 17025:2017 General requirements for the competence of testing and calibration laboratories",
        assessment: "Proctored 90-question exam (70% pass) + Capstone accreditation readiness package",
        description: "The LQMS program develops specialists who can implement and manage laboratory quality systems aligned with ISO/IEC 17025, design internal QC programs, manage EQA, and prepare laboratories for accreditation.",
        modules: [
          { id: "lqms-m1", number: 1, title: "Introduction to ISO/IEC 17025 & Lab Quality Systems", hours: 8, price: 0, topics: [
            "Structure of ISO/IEC 17025: general, structural, resource, process, and management system requirements",
            "Impartiality, confidentiality, and laboratory risk-based thinking",
            "Overview of national and regional accreditation bodies (SANAS, ANOR, COFRAC) and their role in Africa",
          ]},
          { id: "lqms-m2", number: 2, title: "Management System Requirements", hours: 10, price: 0, topics: [
            "Document and record control for laboratory quality manuals",
            "Management review, internal audit planning, and continual improvement",
            "Control of nonconforming work and corrective action processes",
          ]},
          { id: "lqms-m3", number: 3, title: "Technical Competence Requirements", hours: 10, price: 0, topics: [
            "Personnel competence, training, and authorization records",
            "Equipment qualification, maintenance, and calibration programs",
            "Facilities and environmental condition control for valid results",
          ]},
          { id: "lqms-m4", number: 4, title: "Method Validation & Measurement Uncertainty", hours: 12, price: 0, topics: [
            "Method selection, verification, and validation protocols",
            "Building a measurement uncertainty budget",
            "Metrological traceability to international/national standards",
          ]},
          { id: "lqms-m5", number: 5, title: "Quality Control & Proficiency Testing", hours: 10, price: 0, topics: [
            "Internal quality control: control charts for laboratory data",
            "Participation in and interpretation of proficiency testing / interlaboratory comparisons",
            "Handling of QC failures and out-of-specification results",
          ]},
          { id: "lqms-m6", number: 6, title: "Sampling & Handling of Test/Calibration Items", hours: 8, price: 0, topics: [
            "Sampling plans and chain-of-custody documentation",
            "Storage, handling, and disposal of test items",
            "Reporting of results: content requirements and statements of conformity",
          ]},
          { id: "lqms-m7", number: 7, title: "Accreditation Readiness & Assessor Perspective", hours: 10, price: 0, topics: [
            "Gap analysis methodology against ISO/IEC 17025 clauses",
            "Preparing for and hosting an accreditation assessment",
            "Mock internal audits and witnessed-testing simulations",
          ]},
        ],
        capstone: { title: "Laboratory Accreditation Readiness Package", tasks: [
          "Conduct a full gap analysis of a real or simulated laboratory against ISO/IEC 17025:2017",
          "Draft key sections of a laboratory quality manual (scope, impartiality statement, document control procedure)",
          "Build a measurement uncertainty budget for one test/calibration method",
          "Perform a mock internal audit and produce a corrective action plan for identified gaps",
          "Present an accreditation-readiness report to an Analytix Engineering assessor panel",
        ]},
      },
    ],
  },
  {
    id: "data",
    name: "Data Analytics & Business Intelligence",
    icon: BarChart3,
    color: "#2563EB",
    description: "Three specialist certifications addressing distinct but complementary business needs: converting marketing data into decisions, building reliable data infrastructure, and turning organizational data into actionable intelligence.",
    programs: [
      {
        id: "maq",
        title: "Marketing Analytics Quant",
        acronym: "MAQ",
        subtitle: "Quantitative marketing decision-making with Excel and Python",
        level: "Associate" as const,
        badge: "Gold" as const,
        duration: "14 weeks",
        contactHours: 112,
        delivery: "Online + Hybrid",
        targetAudience: "Marketing managers, growth analysts, CRM leads, business analysts, and professionals with management, engineering, math, statistics, or economics backgrounds",
        prerequisites: "Intermediate Excel; basic statistics (mean, variance, distributions); Python exposure helpful but not required",
        alignment: "Wayne L. Winston (Marketing Analytics), Peter Fader (Customer Centricity), Ron Kohavi (Trustworthy Online Controlled Experiments), Philip Kotler (Marketing Management)",
        assessment: "Proctored 90-question exam (70% pass) + Capstone analytics project",
        description: "A hands-on, quantitative program that teaches you to make better marketing decisions using data, statistics, and models -- all built in Excel and Python. Every module is built around real business scenarios: you will calculate, model, and decide -- not just read theory.",
        modules: [
          { id: "maq-m1", number: 1, title: "Excel & Python Toolkit for Marketing Analysts", hours: 12, price: 0, topics: ["Excel power tools: pivot tables, VLOOKUP/XLOOKUP, dynamic arrays, data tables, Solver", "Building scenario models with Excel Data Tables (one-way and two-way sensitivity analysis)", "Python crash course: Pandas DataFrames, filtering, grouping, merging", "Visualization with Matplotlib, Seaborn, and Plotly for marketing data", "SQL fundamentals for marketing data extraction: joins, aggregations, window functions", "Connecting to data: reading CSV, Excel, and SQL databases from Python", "Reproducible analysis: Jupyter notebooks, markdown documentation"] },
          { id: "maq-m2", number: 2, title: "Marketing Metrics, Funnel Analytics & Data Foundations", hours: 12, price: 0, topics: ["The marketing funnel: awareness, acquisition, activation, retention, revenue, referral (AAARRR)", "Digital marketing KPIs: CTR, CPC, CPM, CPA, ROAS, conversion rate, bounce rate", "Marketing data sources: CRM systems, web/app analytics, social platforms, POS data", "Data quality and privacy considerations in customer analytics (GDPR concepts)", "Building a marketing KPI dashboard in Excel: sparklines, conditional formatting, KPI cards", "Funnel analysis with SQL: conversion rates between stages, drop-off identification"] },
          { id: "maq-m3", number: 3, title: "Customer Economics: CAC, CLTV & Unit Economics", hours: 14, price: 0, topics: ["Customer Acquisition Cost (CAC): calculation by channel, blended vs paid CAC, payback period", "Customer Lifetime Value (CLTV): historical, simple predictive, and cohort-based approaches", "The BG/NBD model (Fader & Hardie): probabilistic CLTV for contractual and non-contractual settings", "Gamma-Gamma model for monetary value prediction", "Building a CLTV model in Excel with Data Tables and in Python with the lifetimes library", "Unit economics dashboard: LTV/CAC ratio, contribution margin, payback period", "Retention and loyalty program analytics: measuring program ROI and impact on CLTV", "Scenario analysis: how pricing, retention, and acquisition cost changes affect profitability"] },
          { id: "maq-m4", number: 4, title: "Customer Segmentation & Cohort Analysis", hours: 14, price: 0, topics: ["RFM analysis (Recency, Frequency, Monetary): scoring, ranking, segment creation in Excel and Python", "K-means clustering for behavioral segmentation: elbow method, silhouette, interpreting centroids", "Hierarchical clustering and dendrograms: when K-means is not enough", "Building and validating data-driven customer personas from quantitative segments", "Cohort analysis: building retention tables, visualizing cohort heatmaps, calculating cohort LTV", "Churn analysis: defining churn, calculating churn rate, survival curves (Kaplan-Meier intuition)", "Logistic regression for churn prediction: feature selection, odds ratios, AUC-ROC evaluation", "From segments to strategy: mapping segments to differentiated marketing actions"] },
          { id: "maq-m5", number: 5, title: "Demand Forecasting & Diffusion Models", hours: 16, price: 0, topics: ["Time series decomposition: trend, seasonality, and residuals", "Moving averages and exponential smoothing in Excel: simple, double, and Holt method", "Holt-Winters forecasting: additive vs multiplicative seasonality, parameter optimization with Solver", "Bass Diffusion Model: modeling new product adoption (innovators + imitators), fitting p and q", "Bass model applications: forecasting product launch curves, estimating market potential (m)", "Regression-based forecasting: using price, promotion, and seasonality as predictors", "Forecast accuracy metrics: MAE, MAPE, RMSE -- choosing the right measure", "Building a demand forecasting dashboard in Excel with scenario toggles"] },
          { id: "maq-m6", number: 6, title: "Pricing Analytics & Market Basket Analysis", hours: 16, price: 0, topics: ["Price elasticity of demand: point elasticity, arc elasticity, log-log regression estimation", "Optimal pricing with Excel Solver: maximizing revenue or profit given elasticity estimates", "Price discrimination and segmented pricing: Van Westendorp and Gabor-Granger methods", "Conjoint analysis intuition: attribute trade-offs for pricing and product design", "Promotion effectiveness: measuring lift, cannibalization, and halo effects", "Market Basket Analysis: support, confidence, and lift metrics", "Apriori algorithm: finding association rules in Python (mlxtend library)", "From association rules to cross-sell and product recommendation strategies"] },
          { id: "maq-m7", number: 7, title: "A/B Testing & Controlled Experimentation", hours: 14, price: 0, topics: ["A/B testing fundamentals: hypothesis formulation, control vs treatment, randomization", "Sample size calculation: power analysis, minimum detectable effect, significance level", "Statistical analysis of A/B tests: z-test, t-test, chi-square for contingencies", "Multi-variant testing (MVT): testing multiple variables simultaneously", "Uplift modeling: identifying persuadable customer segments", "Common pitfalls: peeking, multiple comparisons, novelty effects, Simpsons paradox", "Bayesian A/B testing intuition: posterior probability and credible intervals"] },
          { id: "maq-m8", number: 8, title: "Attribution, Dashboarding & Executive Storytelling", hours: 14, price: 0, topics: ["Multi-touch attribution: first-touch, last-touch, linear, time-decay, position-based", "Shapley value attribution: a game-theory approach to fair credit allocation", "Introduction to media mix modeling for channel budget allocation", "Marketing mix budget optimization: marginal ROI analysis across channels", "Dashboard design in Power BI / Tableau: real-time campaign monitoring, KPI drill-downs", "The data storytelling framework: context, narrative, visual, insight, action", "Structuring presentations for C-level audiences: situation, complication, resolution (SCR)", "Communicating quantitative findings to non-technical decision-makers"] },
        ],
        capstone: { title: "Quantitative Marketing Strategy Project", tasks: [
          "Perform RFM segmentation and build a CLTV model (BG/NBD + Gamma-Gamma or cohort-based)",
          "Conduct a Market Basket Analysis and propose a data-driven cross-sell strategy",
          "Build a demand forecast using Holt-Winters or Bass Diffusion Model with accuracy evaluation",
          "Estimate price elasticity for at least one product/service and recommend an optimal price point",
          "Design an A/B test plan with sample size justification and attribution model",
          "Deliver an executive dashboard and presentation with quantified recommendations",
        ]},
      },
      {
        id: "dea",
        title: "Data Engineering Associate",
        acronym: "DEA",
        subtitle: "Building and operating reliable data pipelines and infrastructure",
        level: "Associate",
        badge: "Gold",
        duration: "12 weeks",
        contactHours: 110,
        delivery: "Online + Hybrid",
        targetAudience: "Aspiring/junior data engineers, backend developers moving into data roles, BI developers",
        prerequisites: "Basic programming exposure (any language) and fundamental SQL recommended",
        alignment: "Industry-standard data engineering competencies (SQL, Python, orchestration, cloud data platforms)",
        assessment: "Proctored 100-question exam (70% pass) + Capstone end-to-end pipeline build",
        description: "The DEA program builds practitioners who can design, build, and maintain the data infrastructure that powers analytics and AI across organizations.",
        modules: [
          { id: "dea-m1", number: 1, title: "Foundations of Data Engineering", hours: 8, price: 0, topics: [
            "Modern data architecture: sources, ingestion, storage, transformation, serving",
            "ETL vs. ELT patterns; batch vs. streaming processing",
            "The data engineering lifecycle and collaboration with analytics/BI teams",
          ]},
          { id: "dea-m2", number: 2, title: "SQL & Relational Database Fundamentals", hours: 14, price: 0, topics: [
            "Relational modeling, normalization, and keys/constraints",
            "Advanced SQL: window functions, CTEs, joins, and query optimization",
            "Indexing strategies and query performance tuning",
          ]},
          { id: "dea-m3", number: 3, title: "Python for Data Engineering", hours: 12, price: 0, topics: [
            "Data manipulation with pandas; working with JSON, CSV, Parquet",
            "Scripting reusable, parameterized data transformation jobs",
            "Error handling, logging, and testing for data code",
          ]},
          { id: "dea-m4", number: 4, title: "Data Pipeline Development & Orchestration", hours: 16, price: 0, topics: [
            "ETL pipeline design principles: idempotency, incremental loads, backfills",
            "Workflow orchestration concepts (DAGs) using tools such as Apache Airflow",
            "Data quality checks and validation frameworks within pipelines",
          ]},
          { id: "dea-m5", number: 5, title: "Cloud Data Platforms", hours: 14, price: 0, topics: [
            "Core data services across major cloud providers (storage, compute, managed databases)",
            "Data lakes vs. data warehouses; when to use each",
            "Columnar storage formats (Parquet, ORC) and cost/performance trade-offs",
          ]},
          { id: "dea-m6", number: 6, title: "Big Data Processing Fundamentals", hours: 12, price: 0, topics: [
            "Distributed processing concepts and the Apache Spark execution model",
            "Writing and optimizing basic Spark transformations",
            "Partitioning strategies for large datasets",
          ]},
          { id: "dea-m7", number: 7, title: "Data Modeling & Warehousing", hours: 10, price: 0, topics: [
            "Dimensional modeling: star and snowflake schemas, fact and dimension tables",
            "Slowly Changing Dimensions (SCD) handling",
            "Data warehouse design for analytics and reporting consumption",
          ]},
          { id: "dea-m8", number: 8, title: "DataOps, Governance & Security", hours: 10, price: 0, topics: [
            "CI/CD principles applied to data pipelines",
            "Pipeline monitoring, alerting, and observability practices",
            "Data governance fundamentals: access control, lineage, and cataloging",
          ]},
        ],
        capstone: { title: "End-to-End Data Pipeline Build", tasks: [
          "Ingest a real-world or provided raw dataset (batch and/or streaming source)",
          "Build an orchestrated ETL/ELT pipeline with data quality validation checks",
          "Load transformed data into a dimensionally modeled warehouse or lake",
          "Document the architecture, monitoring approach, and data governance controls",
          "Present the pipeline and its design trade-offs to an Analytix Engineering technical review panel",
        ]},
      },
      {
        id: "das",
        title: "Data Analytics Specialist",
        acronym: "DAS",
        subtitle: "Turning organizational data into decisions through analysis, visualization, and BI",
        level: "Professional",
        badge: "Platinum",
        duration: "9 weeks",
        contactHours: 80,
        delivery: "Online + Hybrid + On-site",
        targetAudience: "Business analysts, operations/finance analysts, BI developers, government M&E officers",
        prerequisites: "Basic spreadsheet literacy; no prior programming required (SQL/Python introduced in-program)",
        alignment: "Industry-standard business/data analytics competencies (analytics lifecycle, statistics, visualization, BI)",
        assessment: "Proctored 90-question exam (70% pass) + Capstone BI/analytics solution",
        description: "The DAS program develops advanced analytical practitioners who can tackle complex business problems with statistical rigor, predictive models, and compelling dashboards across any industry.",
        modules: [
          { id: "das-m1", number: 1, title: "Foundations of Data Analytics", hours: 8, price: 0, topics: [
            "The analytics lifecycle: descriptive, diagnostic, predictive, and prescriptive analytics",
            "Framing business questions as analytical problems",
            "Overview of the analytics toolchain: spreadsheets, SQL, BI tools, and scripting languages",
          ]},
          { id: "das-m2", number: 2, title: "Data Wrangling & Cleaning", hours: 12, price: 0, topics: [
            "Data cleaning techniques in Excel and SQL: handling missing values, duplicates, and outliers",
            "Data transformation and reshaping for analysis",
            "Introduction to Python/pandas for repeatable data preparation",
          ]},
          { id: "das-m3", number: 3, title: "Statistical Analysis for Business", hours: 12, price: 0, topics: [
            "Descriptive statistics and distributions in a business context",
            "Hypothesis testing and confidence intervals for business decisions",
            "Correlation and regression analysis for driver identification",
          ]},
          { id: "das-m4", number: 4, title: "Data Visualization & Storytelling", hours: 12, price: 0, topics: [
            "Principles of effective data visualization and chart selection",
            "Dashboard design and development in Power BI/Tableau",
            "Structuring a data story for executive and non-technical audiences",
          ]},
          { id: "das-m5", number: 5, title: "Exploratory & Predictive Analytics", hours: 12, price: 0, topics: [
            "Exploratory data analysis (EDA) techniques",
            "Introductory predictive models: linear/logistic regression and simple forecasting",
            "Model evaluation basics and communicating uncertainty in predictions",
          ]},
          { id: "das-m6", number: 6, title: "Business Intelligence Systems", hours: 10, price: 0, topics: [
            "BI architecture: from source systems to self-service dashboards",
            "Designing KPI frameworks aligned to organizational strategy",
            "Governance of self-service BI: consistency, single source of truth",
          ]},
        ],
        capstone: { title: "Business Intelligence & Analytics Capstone", tasks: [
          "Select a real organizational problem (e.g., sales performance, operations efficiency, program M&E)",
          "Clean and prepare a relevant dataset and conduct exploratory analysis",
          "Apply at least one statistical or predictive technique to generate insight",
          "Build an interactive BI dashboard summarizing findings and KPIs",
          "Deliver a recommendations report with measurable business impact",
        ]},
      },
    ],
  },
  // ─────────────────────────────────────────────
  //  MEAL & IMPACT EVALUATION
  // ─────────────────────────────────────────────
  {
    id: "meal",
    name: "MEAL \& Impact Evaluation",
    icon: Layers,
    color: "#0891B2",
    description: "Master Monitoring, Evaluation, Accountability, and Learning (MEAL) — the essential framework for ensuring programs deliver measurable, sustainable impact. Designed for development practitioners, government M\&E officers, NGO program managers, and anyone responsible for proving that projects make a real difference.",
    programs: [
      {
        id: "meal-cert",
        title: "MEAL Professional Certificate",
        acronym: "MEALPC",
        subtitle: "Scenario-based certification in Monitoring, Evaluation, Accountability, and Learning",
        level: "Professional" as const,
        badge: "Platinum" as const,
        duration: "14 weeks",
        contactHours: 140,
        delivery: "Online + Hybrid",
        targetAudience: "M\&E officers, program managers, project coordinators, government planning officers, NGO/INGO staff, humanitarian workers, public health practitioners",
        prerequisites: "Professional experience in program/project management, development, or public administration recommended; no prior M\&E training required",
        alignment: "OECD-DAC Evaluation Criteria / USAID Evaluation Policy / DFID Logframe Guidance / Sphere Standards",
        assessment: "Proctored 100-question exam (70% pass) + scenario-based MEAL Plan Capstone",
        description: "How do you know if your project had the desired impact? By regularly monitoring progress, evaluating outcomes, being accountable to stakeholders, and learning from successes and failures, project teams can ensure that their projects are well-managed and have a positive impact on the communities they serve. This scenario-based program builds essential skills across all four MEAL pillars through real-world case studies from health, education, governance, and humanitarian contexts across Africa.",
        modules: [
          { id: "meal-m1", number: 1, title: "Foundations of MEAL", hours: 16, price: 0, topics: [
            "What is MEAL? Definitions, history, and the evolution from M\&E to MEAL",
            "The four pillars: Monitoring, Evaluation, Accountability, and Learning — how they interconnect",
            "Why MEAL matters: evidence-based decision making, donor requirements, and organizational learning",
            "MEAL in context: development, humanitarian, government, health, and education sectors",
            "Key MEAL stakeholders: beneficiaries, donors, governments, implementing partners, communities",
            "Ethical principles: do no harm, informed consent, data privacy, cultural sensitivity",
            "Introduction to results-based management (RBM) and adaptive management",
            "Scenario: Identify MEAL gaps in a failing education project case study",
          ]},
          { id: "meal-m2", number: 2, title: "Theory of Change \& Logical Frameworks", hours: 20, price: 0, topics: [
            "Theory of Change (ToC): building a causal pathway from activities to long-term impact",
            "Assumptions, risks, and preconditions in your Theory of Change",
            "The Logical Framework (Logframe): structure, purpose, and practical construction",
            "Results chain: inputs → activities → outputs → outcomes → impact",
            "SMART indicators: Specific, Measurable, Achievable, Relevant, Time-bound",
            "Output indicators vs outcome indicators vs impact indicators",
            "Indicator reference sheets: definition, data source, frequency, disaggregation, baseline, target",
            "Common frameworks: SDG indicators, WHO health indicators, education sector indicators",
            "Developing a Results Framework aligned to donor requirements (USAID, EU, World Bank, AfDB)",
            "Scenario: Build a complete Theory of Change and Logframe for a maternal health project",
          ]},
          { id: "meal-m3", number: 3, title: "Planning for MEAL", hours: 20, price: 0, topics: [
            "The MEAL Plan: purpose, components, and when to develop it in the project cycle",
            "Budgeting for MEAL: allocating adequate resources (the 5-10% rule and beyond)",
            "Baseline studies: design, purpose, timing, and methodology selection",
            "Defining data needs: what data do you need, when, from whom, and how often?",
            "Sampling strategies: probability vs non-probability, sample size considerations",
            "MEAL staffing and capacity: roles, responsibilities, and skill requirements",
            "Integrating MEAL into project design from day one",
            "MEAL calendars and workplans: scheduling data collection, reporting, and review cycles",
            "Coordination with partners: harmonizing MEAL across multi-partner programs",
            "Scenario: Develop a complete MEAL Plan for a youth employment program",
          ]},
          { id: "meal-m4", number: 4, title: "Data Collection Methods \& Tools", hours: 24, price: 0, topics: [
            "Quantitative methods: structured surveys, census data, administrative records, service statistics",
            "Qualitative methods: key informant interviews (KII), focus group discussions (FGD), case studies",
            "Mixed methods: triangulation and complementarity — when and how to combine approaches",
            "Questionnaire design: question types, sequencing, skip logic, pre-testing, and piloting",
            "Digital data collection: KoboToolbox, ODK, SurveyCTO, and CommCare",
            "Mobile data collection: form design, validation rules, GPS capture, photo capture",
            "Participatory methods: community scorecards, most significant change (MSC), PRA",
            "Routine monitoring data: activity trackers, attendance registers, distribution logs",
            "Data collection training and supervision: ensuring enumerator quality and consistency",
            "Research ethics: consent protocols, vulnerable populations, data protection",
            "Scenario: Design a mixed-methods data collection plan with digital tools for a WASH program",
          ]},
          { id: "meal-m5", number: 5, title: "Data Management \& Quality Assurance", hours: 16, price: 0, topics: [
            "Data management planning: storage, naming conventions, version control, backup",
            "Data cleaning: identifying and handling missing data, duplicates, outliers, and entry errors",
            "Data quality assessments (DQA): validity, reliability, timeliness, precision, integrity",
            "Data quality audit tools and checklists for routine monitoring data",
            "Database design for MEAL: spreadsheet best practices, relational database concepts",
            "Data security and protection: encryption, access controls, GDPR compliance",
            "Indicator tracking tables (ITTs): maintaining a living record of progress against targets",
            "Scenario: Conduct a DQA on a provided messy dataset and produce a clean analysis-ready file",
          ]},
          { id: "meal-m6", number: 6, title: "Data Analysis \& Interpretation", hours: 24, price: 0, topics: [
            "Descriptive statistics for MEAL: frequencies, percentages, means, cross-tabulations",
            "Data disaggregation: analyzing by gender, age, location, disability, and equity dimensions",
            "Trend analysis: tracking indicator progress over time against targets and baselines",
            "Qualitative data analysis: coding, thematic analysis, and content analysis",
            "Data visualization: charts, graphs, maps, dashboards — choosing the right visual",
            "Building MEAL dashboards: Excel, Power BI, and Tableau for program monitoring",
            "Evaluation designs: pre-post comparison, quasi-experimental, contribution analysis",
            "OECD-DAC criteria: relevance, coherence, effectiveness, efficiency, impact, sustainability",
            "Interpreting findings: moving from data to conclusions to recommendations",
            "Common pitfalls: correlation vs causation, selection bias, survivorship bias",
            "Scenario: Analyze a multi-year program dataset and produce an evaluation findings brief",
          ]},
          { id: "meal-m7", number: 7, title: "Accountability, Learning \& Adaptive Management", hours: 20, price: 0, topics: [
            "Accountability to affected populations (AAP): feedback mechanisms, complaints, and response",
            "Community feedback mechanisms: hotlines, suggestion boxes, committees, digital platforms",
            "Closing the feedback loop: acting on and communicating back about stakeholder input",
            "Accountability to donors: reporting requirements, compliance, and evidence of results",
            "Learning agendas: identifying strategic learning questions for your program",
            "After Action Reviews (AARs) and pause-and-reflect sessions",
            "Knowledge management: capturing, organizing, and sharing MEAL knowledge across teams",
            "Adaptive management: using MEAL data to make real-time program adjustments",
            "MEAL reporting: progress reports, donor reports, dashboards, and briefs",
            "Building a MEAL culture: embedding evidence-based thinking across your organization",
            "Scenario: Design a complete accountability system with feedback mechanisms for a refugee response",
          ]},
        ],
        capstone: { title: "Comprehensive MEAL System Design", tasks: [
          "Select a real or simulated multi-year development/humanitarian project",
          "Build a complete Theory of Change with assumptions and risk analysis",
          "Develop a Logical Framework with SMART indicators at output, outcome, and impact levels",
          "Design a MEAL Plan including data collection methods, tools, timeline, budget, and staffing",
          "Create a digital data collection form using KoboToolbox or equivalent",
          "Conduct analysis on a provided program dataset and produce a findings brief with visualizations",
          "Design an accountability and feedback mechanism appropriate to the project context",
          "Develop a learning agenda with strategic questions and knowledge management plan",
          "Present the complete MEAL system to an Analytix Engineering review panel",
        ]},
      },
    ],
  },
];

// ─── Helpers ───
const badgeColors: Record<string, string> = { Silver: "bg-slate-300 text-slate-700", Gold: "bg-amber-400 text-amber-900", Platinum: "bg-violet-500 text-white" };
const levelColors: Record<string, string> = { Foundation: "bg-emerald-100 text-emerald-700", Associate: "bg-blue-100 text-blue-700", Professional: "bg-purple-100 text-purple-700", Specialist: "bg-rose-100 text-rose-700" };

// ─── Module Accordion ───
function ModuleAccordion({ mod, accentColor }: { mod: TrainingModule; accentColor: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-slate-100 transition-colors">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: accentColor }}>M{mod.number}</span>
          <div>
            <p className="text-sm font-bold text-navy">{mod.title}</p>
            <p className="text-[11px] text-slate-400">{mod.hours} hours · Course Completion Certificate</p>
          </div>
        </div>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="border-t border-slate-200 bg-slate-100/50 px-4 py-3 space-y-1.5">
              {mod.topics.map((topic, j) => (
                <div key={j} className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                  <p className="text-xs text-slate-600">{topic}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Program Card ───
function ProgramCard({ program, accentColor }: { program: Program; accentColor: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div layout className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-shadow hover:shadow-md">
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${badgeColors[program.badge]}`}>{program.badge}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${levelColors[program.level]}`}>{program.level}</span>
            </div>
            <h3 className="text-lg font-extrabold text-navy">{program.title}</h3>
            <p className="text-xs italic text-slate-400">{program.subtitle}</p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">{program.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500 lg:grid-cols-4">
          <span className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5"><Clock size={12} /> {program.duration} · {program.contactHours}h</span>
          <span className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5"><BookOpen size={12} /> {program.modules.length} modules</span>
          <span className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5"><Users size={12} /> {program.delivery}</span>
          <span className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5"><Award size={12} /> {program.alignment.split("/")[0]?.trim()}</span>
        </div>

        {/* Certification Path */}
        <div className="mt-4 rounded-xl bg-slate-100 p-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500"><FileText size={13} /> Certification Path:</div>
          <div className="mt-2 flex items-center gap-1 overflow-x-auto pb-1">
            {program.modules.map((mod, i) => (
              <div key={i} className="flex items-center gap-1 flex-shrink-0">
                <span className="rounded-md px-2 py-1 text-[10px] font-bold text-white" style={{ backgroundColor: accentColor }}>M{mod.number}</span>
                {i < program.modules.length - 1 && <ArrowRight size={10} className="text-slate-300" />}
              </div>
            ))}
            <ArrowRight size={10} className="text-slate-300 flex-shrink-0" />
            <span className="rounded-md bg-amber-400 px-2 py-1 text-[10px] font-bold text-amber-900 flex-shrink-0">Capstone</span>
            <ArrowRight size={10} className="text-slate-300 flex-shrink-0" />
            <span className="rounded-md bg-navy px-2 py-1 text-[10px] font-bold text-white flex-shrink-0">🎓 {program.acronym}</span>
          </div>
        </div>

        <button onClick={() => setExpanded(!expanded)} className="mt-4 flex w-full items-center justify-between rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-200" style={{ color: accentColor }}>
          {expanded ? "Hide Details" : "View Modules & Details"}
          <ChevronDown size={16} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="border-t border-slate-200 bg-slate-100/50 px-6 py-5 space-y-5">
              {/* Program details */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase text-slate-400">Target Audience</p><p className="mt-1 text-xs text-slate-600">{program.targetAudience}</p></div>
                <div className="rounded-lg bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase text-slate-400">Prerequisites</p><p className="mt-1 text-xs text-slate-600">{program.prerequisites}</p></div>
                <div className="rounded-lg bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase text-slate-400">Alignment</p><p className="mt-1 text-xs text-slate-600">{program.alignment}</p></div>
                <div className="rounded-lg bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase text-slate-400">Assessment</p><p className="mt-1 text-xs text-slate-600">{program.assessment}</p></div>
              </div>

              {/* Modules */}
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Course Modules ({program.modules.length})</h4>
                <div className="space-y-2">{program.modules.map((mod) => (<ModuleAccordion key={mod.id} mod={mod} accentColor={accentColor} />))}</div>
              </div>

              {/* Capstone */}
              <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5">
                <div className="flex items-center gap-2 mb-2"><Star size={16} className="text-amber-500" /><h4 className="text-sm font-bold text-amber-900">Capstone: {program.capstone.title}</h4></div>
                <div className="space-y-1.5">{program.capstone.tasks.map((t, i) => (
                  <div key={i} className="flex items-start gap-2"><CheckCircle2 size={12} className="mt-0.5 flex-shrink-0 text-amber-500" /><p className="text-xs text-amber-700">{t}</p></div>
                ))}</div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:shadow-lg transition-all" style={{ backgroundColor: accentColor }}>Enroll Now <ArrowRight size={14} /></Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-navy hover:bg-slate-100">Request Info</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ───
export function AcademyPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]?.id ?? "");
  const totalPrograms = CATEGORIES.reduce((s, c) => s + c.programs.length, 0);
  const totalModules = CATEGORIES.reduce((s, c) => s + c.programs.reduce((s2, p) => s2 + p.modules.length, 0), 0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-midnight via-navy to-royal px-6 pb-16 pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm"><GraduationCap size={32} className="text-white" /></div>
            <h1 className="text-[clamp(32px,5vw,52px)] font-extrabold text-white">Analytix Engineering Institute</h1>
            <p className="mx-auto mt-3 max-w-3xl text-lg text-white/60">Industry-recognized certification programs built around ASQ, IASSC, ISO/IEC 17025, and current industry-standard competency frameworks — adapted to the operational, regulatory, and business realities of African enterprises and public institutions.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-white/40">
              <span className="flex items-center gap-2"><Layers size={16} /> {totalPrograms} Programs</span>
              <span className="flex items-center gap-2"><BookOpen size={16} /> {totalModules} Modules</span>
              <span className="flex items-center gap-2"><Award size={16} /> Verified Certificates</span>
              <span className="flex items-center gap-2"><Star size={16} /> Capstone-Driven</span>
            </div>
            <div className="mx-auto mt-8 max-w-2xl rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs text-white/50 mb-2 font-semibold">How Certification Works</p>
              <div className="flex items-center justify-center gap-2 text-xs text-white/70 flex-wrap">
                <span className="rounded bg-white/20 px-2 py-1 font-bold">Complete a Module</span>
                <ArrowRight size={12} className="text-white/30" />
                <span className="rounded bg-emerald-500/30 px-2 py-1 font-bold text-emerald-200">Course Completion Certificate</span>
                <span className="mx-1 text-white/30">|</span>
                <span className="rounded bg-white/20 px-2 py-1 font-bold">All Modules + Capstone</span>
                <ArrowRight size={12} className="text-white/30" />
                <span className="rounded bg-amber-400/80 px-2 py-1 font-bold text-amber-900">Professional Certificate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-[72px] z-30 border-b border-slate-200 bg-slate-50/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl overflow-x-auto px-6">
          <div className="flex gap-1 py-2">
            {CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex flex-shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all ${isActive ? "bg-navy text-white shadow-sm" : "text-slate-500 hover:bg-slate-200 hover:text-navy"}`}>
                  <CatIcon size={14} />{cat.name}
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${isActive ? "bg-white/20" : "bg-slate-200"}`}>{cat.programs.length}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          {CATEGORIES.filter((c) => c.id === activeCategory).map((cat) => (
            <div key={cat.id}>
              <div className="mb-8"><h2 className="text-2xl font-extrabold text-navy">{cat.name}</h2><p className="mt-1 text-sm text-slate-500">{cat.description}</p></div>
              <div className="space-y-6">{cat.programs.map((program) => (<ProgramCard key={program.id} program={program} accentColor={cat.color} />))}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Verify Certificate */}
      <section className="bg-slate-100 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10"><CheckCircle2 size={28} className="text-brand" /></div>
            <h2 className="text-[clamp(24px,3.5vw,32px)] font-extrabold text-navy">Verify a Certificate</h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-slate-500">Employers and institutions can verify the authenticity of any Analytix Engineering training certificate.</p>
            <Link to="/verify" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:shadow-xl">Verify Certificate <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </section>

      {/* Capstone Governance */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-extrabold text-navy mb-8">Capstone Governance & Certification Framework</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-5">
              <h3 className="text-sm font-bold text-navy mb-3">Capstone Evaluation Criteria</h3>
              <div className="space-y-2 text-xs text-slate-600">
                {[["Problem relevance and business significance","20%"],["Correct application of methodology and tools","30%"],["Quality and rigor of analysis/execution","25%"],["Clarity of documentation and presentation","15%"],["Demonstrated or projected measurable impact","10%"]].map(([c,p],i)=>(
                  <div key={i} className="flex items-center justify-between"><span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500"/>{c}</span><span className="font-bold text-navy">{p}</span></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-100 p-5">
                <h3 className="text-sm font-bold text-navy mb-2">Certification Issuance</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Learners must pass the proctored knowledge exam (70% threshold) and achieve a passing capstone grade (assessed by at least two Analytix Engineering-accredited mentors) to receive their digital, verifiable certificate with a unique credential ID and verification link.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-100 p-5">
                <h3 className="text-sm font-bold text-navy mb-2">Progression Pathways</h3>
                <div className="space-y-1 text-xs text-slate-600">
                  <p>• <span className="font-semibold">Operational Excellence:</span> Yellow Belt → Green Belt → Black Belt</p>
                  <p>• <span className="font-semibold">Quality Engineering:</span> Technician → Engineer Associate → LQMS Specialist</p>
                  <p>• <span className="font-semibold">Data Analytics & BI:</span> Data Analytics Specialist & MAQ → Data Engineering Associate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand to-royal px-6 py-20 text-center">
        <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-white">Ready to Advance Your Career?</h2>
        <p className="mt-3 text-lg text-white/70">Enroll in a program today or contact us for custom corporate training.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-brand transition-all hover:-translate-y-0.5">Request a Consultation <ArrowRight size={18} /></Link>
          <Link to="/portal" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10">Student Portal</Link>
        </div>
      </section>
    </div>
  );
}
