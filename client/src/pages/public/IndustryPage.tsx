import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Activity,
  Briefcase,
  Layers,
  Cpu,
  TrendingUp,
  AlertTriangle,
  Target,
  BarChart3,
  Shield,
  Zap,
  Users,
  Database,
  type LucideIcon,
} from "lucide-react";

// ─── Sector Data ───

interface Challenge {
  title: string;
  description: string;
}

interface Solution {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Sector {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  accentColor: string;
  accentBg: string;
  heroImage: string;
  challenges: Challenge[];
  solutions: Solution[];
  stats: { value: string; label: string }[];
  caseStudy: {
    title: string;
    description: string;
    results: string[];
  };
}

const SECTORS: Sector[] = [
  {
    slug: "government-public-sector",
    name: "Government & Public Sector",
    tagline: "Modernizing public services through data-driven governance",
    description:
      "Government agencies face mounting pressure to digitize services, improve transparency, and deliver citizen-centric outcomes — often with constrained budgets and legacy systems. Analytix Engineering partners with public institutions to build modern data infrastructure that transforms how governments serve their people.",
    icon: Building2,
    gradient: "from-blue-900 via-blue-800 to-indigo-900",
    accentColor: "text-blue-500",
    accentBg: "bg-blue-500",
    heroImage:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=80",
    challenges: [
      {
        title: "Fragmented Legacy Systems",
        description:
          "Decades of siloed databases across ministries and agencies create data inconsistencies, duplication, and an inability to produce unified reports for decision-makers.",
      },
      {
        title: "Lack of Real-Time Visibility",
        description:
          "Leaders make critical policy decisions based on outdated data. Census, tax, health, and education data are often months or years behind — while crises demand immediate insight.",
      },
      {
        title: "Corruption & Revenue Leakage",
        description:
          "Without integrated tracking systems, public revenue collection (customs, taxes, fees) suffers from leakage, fraud, and limited accountability mechanisms.",
      },
      {
        title: "Citizen Service Delivery Gaps",
        description:
          "Citizens experience long wait times, repeated documentation requests, and opaque processes when interacting with government services — eroding public trust.",
      },
      {
        title: "Compliance & Security Requirements",
        description:
          "Handling sensitive citizen data requires strict adherence to privacy regulations, cybersecurity standards, and audit trails that many legacy systems cannot provide.",
      },
    ],
    solutions: [
      {
        title: "Unified Data Platforms",
        description:
          "We design and implement cross-ministry data warehouses that consolidate information from disparate sources into a single source of truth — enabling real-time dashboards for policy makers.",
        icon: Database,
      },
      {
        title: "Revenue Assurance Systems",
        description:
          "Our analytics engines detect anomalies in customs declarations, tax filings, and fee collections — identifying revenue leakage and flagging fraudulent patterns automatically.",
        icon: Shield,
      },
      {
        title: "Citizen-Centric Digital Services",
        description:
          "We build modern portals and mobile applications that streamline citizen interactions, reduce processing times, and provide transparent status tracking for all government services.",
        icon: Users,
      },
      {
        title: "Operational Excellence Programs",
        description:
          "Lean Six Sigma methodologies applied to government workflows eliminate waste, reduce processing bottlenecks, and establish measurable performance KPIs across departments.",
        icon: Target,
      },
    ],
    stats: [
      { value: "40%", label: "Reduction in processing time" },
      { value: "3x", label: "Faster reporting cycles" },
      { value: "25%", label: "Revenue recovery improvement" },
      { value: "90%", label: "Citizen satisfaction increase" },
    ],
    caseStudy: {
      title: "National Customs Modernization",
      description:
        "Partnered with a national customs administration to design a fraud detection analytics platform processing millions of import/export declarations.",
      results: [
        "Automated risk scoring for 100% of declarations",
        "Identified 23% more undervalued shipments",
        "Reduced physical inspection needs by 35%",
        "Real-time dashboard for customs leadership",
      ],
    },
  },
  {
    slug: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    tagline: "Accelerating patient outcomes with intelligent health data systems",
    description:
      "Healthcare systems across Africa and globally struggle with fragmented patient records, disease surveillance gaps, and resource allocation challenges. Analytix Engineering delivers data solutions that connect the dots between patient care, public health monitoring, and operational efficiency.",
    icon: Activity,
    gradient: "from-emerald-900 via-teal-800 to-green-900",
    accentColor: "text-emerald-500",
    accentBg: "bg-emerald-500",
    heroImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80",
    challenges: [
      {
        title: "Fragmented Patient Records",
        description:
          "Patient data is scattered across hospitals, clinics, and pharmacies with no unified health information system — leading to duplicated tests, medication errors, and incomplete medical histories.",
      },
      {
        title: "Disease Surveillance Gaps",
        description:
          "Epidemiological data arrives too late for effective intervention. Manual reporting from health districts creates weeks-long delays in detecting outbreaks and tracking vaccination coverage.",
      },
      {
        title: "Resource Misallocation",
        description:
          "Hospitals operate without data-driven staffing models, inventory forecasting, or equipment utilization analytics — resulting in overcrowded wards alongside underused facilities.",
      },
      {
        title: "Drug Supply Chain Integrity",
        description:
          "Counterfeit medications, expired stock, and distribution inefficiencies plague pharmaceutical supply chains — putting patient safety at risk and wasting limited health budgets.",
      },
      {
        title: "Regulatory Compliance Complexity",
        description:
          "Meeting health data privacy standards, clinical trial regulations, and international reporting requirements demands robust data governance frameworks that most institutions lack.",
      },
    ],
    solutions: [
      {
        title: "Health Information Exchanges",
        description:
          "We build interoperable health data platforms that connect hospitals, clinics, labs, and pharmacies — giving clinicians complete patient histories at the point of care.",
        icon: Database,
      },
      {
        title: "Real-Time Disease Surveillance",
        description:
          "Our epidemiological dashboards aggregate data from health facilities, labs, and community health workers — enabling early outbreak detection and targeted response coordination.",
        icon: BarChart3,
      },
      {
        title: "Operational Analytics",
        description:
          "Predictive models for patient flow, staffing optimization, bed management, and supply chain forecasting that ensure resources are where they're needed most.",
        icon: Zap,
      },
      {
        title: "Quality Improvement Programs",
        description:
          "Lean Six Sigma healthcare programs that reduce patient wait times, minimize clinical errors, and establish continuous improvement cultures within health institutions.",
        icon: Target,
      },
    ],
    stats: [
      { value: "60%", label: "Faster outbreak detection" },
      { value: "45%", label: "Reduction in duplicate tests" },
      { value: "30%", label: "Improvement in bed utilization" },
      { value: "5M+", label: "Patient records unified" },
    ],
    caseStudy: {
      title: "National Health Data Quality Program",
      description:
        "Designed a comprehensive data quality framework for a Ministry of Public Health, covering all health districts and regional hospitals.",
      results: [
        "Standardized reporting across 180+ health districts",
        "Automated data validation catching 94% of errors",
        "Real-time COVID-19 surveillance dashboard",
        "Training program certified 200+ health data managers",
      ],
    },
  },
  {
    slug: "financial-services-insurance",
    name: "Financial Services & Insurance",
    tagline: "Building trust through data integrity and intelligent risk management",
    description:
      "Banks, microfinance institutions, and insurance companies operate in an increasingly competitive landscape where data is the differentiator. Analytix Engineering helps financial institutions harness their data assets for better risk decisions, regulatory compliance, and customer experiences.",
    icon: Briefcase,
    gradient: "from-amber-900 via-orange-800 to-yellow-900",
    accentColor: "text-amber-500",
    accentBg: "bg-amber-500",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
    challenges: [
      {
        title: "Credit Risk Assessment Gaps",
        description:
          "Traditional credit scoring models fail to capture the reality of informal economies. Millions of creditworthy individuals and businesses are excluded from financial services due to limited formal financial histories.",
      },
      {
        title: "Fraud Detection Limitations",
        description:
          "Mobile money fraud, identity theft, and transaction laundering are growing faster than the rule-based systems designed to catch them — resulting in significant financial losses.",
      },
      {
        title: "Regulatory Reporting Burden",
        description:
          "Central bank requirements, anti-money laundering (AML) regulations, and IFRS standards demand increasingly complex reporting that strains manual processes and spreadsheet-based workflows.",
      },
      {
        title: "Customer Retention Challenges",
        description:
          "With mobile money and fintech disrupting traditional banking, institutions struggle to understand customer behavior, predict churn, and deliver personalized financial products.",
      },
      {
        title: "Data Silos Across Products",
        description:
          "Savings, loans, insurance, and mobile banking platforms often run on separate systems — making it impossible to have a 360-degree view of customer relationships.",
      },
    ],
    solutions: [
      {
        title: "Alternative Credit Scoring",
        description:
          "Machine learning models that incorporate mobile money transactions, utility payments, and behavioral data to assess creditworthiness beyond traditional financial histories.",
        icon: BarChart3,
      },
      {
        title: "Real-Time Fraud Detection",
        description:
          "AI-powered transaction monitoring that identifies suspicious patterns in real-time — reducing false positives while catching sophisticated fraud schemes.",
        icon: Shield,
      },
      {
        title: "Automated Regulatory Reporting",
        description:
          "Data pipelines that automatically generate central bank reports, AML filings, and IFRS-compliant financial statements — eliminating manual errors and meeting deadlines consistently.",
        icon: Database,
      },
      {
        title: "Customer Analytics & Retention",
        description:
          "Segmentation models, churn prediction, and personalized product recommendation engines that help institutions deepen customer relationships and grow portfolio value.",
        icon: Users,
      },
    ],
    stats: [
      { value: "70%", label: "Faster regulatory reporting" },
      { value: "35%", label: "Reduction in fraud losses" },
      { value: "50%", label: "More customers scored" },
      { value: "28%", label: "Improvement in retention" },
    ],
    caseStudy: {
      title: "Banking Data Warehouse Modernization",
      description:
        "Redesigned the enterprise data warehouse for a leading commercial bank, unifying data from core banking, mobile money, and insurance platforms.",
      results: [
        "360-degree customer view across all products",
        "Automated daily regulatory reports (previously weekly)",
        "Predictive churn model with 82% accuracy",
        "Self-service analytics for 50+ branch managers",
      ],
    },
  },
  {
    slug: "telecommunications",
    name: "Telecommunications",
    tagline: "Transforming network data into competitive intelligence",
    description:
      "Telecom operators generate massive volumes of data every second — from call records and network performance to customer interactions and billing events. Analytix Engineering helps telcos transform this data deluge into actionable intelligence that drives network optimization, customer satisfaction, and revenue growth.",
    icon: Layers,
    gradient: "from-violet-900 via-purple-800 to-fuchsia-900",
    accentColor: "text-violet-500",
    accentBg: "bg-violet-500",
    heroImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80",
    challenges: [
      {
        title: "Network Performance Blind Spots",
        description:
          "With thousands of cell towers, fiber segments, and switching nodes, operators struggle to pinpoint performance degradation before customers notice — leading to churn and regulatory penalties.",
      },
      {
        title: "Revenue Assurance & Leakage",
        description:
          "Complex billing systems, interconnect agreements, and value-added services create opportunities for revenue leakage through misconfigured rates, unbilled usage, and partner settlement errors.",
      },
      {
        title: "Customer Experience Disconnect",
        description:
          "Despite collecting vast customer data, most operators cannot connect network quality metrics with individual customer experience — making it impossible to proactively resolve issues.",
      },
      {
        title: "Mobile Money Scaling Challenges",
        description:
          "As mobile money services grow exponentially, the transaction processing, fraud detection, and regulatory compliance infrastructure must scale without compromising performance or security.",
      },
      {
        title: "Data Monetization Gaps",
        description:
          "Operators sit on incredibly valuable location, behavior, and usage data but lack the analytics infrastructure to package and monetize insights while maintaining privacy compliance.",
      },
    ],
    solutions: [
      {
        title: "Network Analytics & Optimization",
        description:
          "Real-time network performance dashboards with predictive maintenance models that identify degradation patterns before they impact customers — reducing downtime and optimizing capital spending.",
        icon: Zap,
      },
      {
        title: "Revenue Assurance Platforms",
        description:
          "End-to-end billing verification systems that reconcile usage records, interconnect charges, and partner settlements — recovering leaked revenue and preventing future losses.",
        icon: Shield,
      },
      {
        title: "Customer Experience Management",
        description:
          "Unified customer data platforms that correlate network quality, usage patterns, and support interactions — enabling proactive care and personalized offers that reduce churn.",
        icon: Users,
      },
      {
        title: "Scalable Data Infrastructure",
        description:
          "Big data architectures designed for telecom-scale data volumes — processing billions of CDRs, network events, and transactions with sub-second latency for real-time analytics.",
        icon: Database,
      },
    ],
    stats: [
      { value: "99.9%", label: "Network uptime achieved" },
      { value: "15%", label: "Revenue leakage recovered" },
      { value: "40%", label: "Reduction in customer churn" },
      { value: "10B+", label: "Records processed daily" },
    ],
    caseStudy: {
      title: "Mobile Operator Data Platform",
      description:
        "Built a real-time data analytics platform for a major mobile operator serving 15 million subscribers across multiple countries.",
      results: [
        "Real-time network quality monitoring across 3,000+ sites",
        "Automated revenue reconciliation saving $2M annually",
        "Customer micro-segmentation for targeted campaigns",
        "Fraud detection for mobile money transactions",
      ],
    },
  },
  {
    slug: "manufacturing-industry",
    name: "Manufacturing & Industry",
    tagline: "Driving operational excellence from the factory floor to the supply chain",
    description:
      "Manufacturers face relentless pressure to improve quality, reduce waste, and accelerate production — while navigating supply chain disruptions and rising raw material costs. Analytix Engineering combines data engineering with Lean Six Sigma expertise to build smart factories that compete globally.",
    icon: Cpu,
    gradient: "from-slate-900 via-gray-800 to-zinc-900",
    accentColor: "text-sky-500",
    accentBg: "bg-sky-500",
    heroImage:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1920&q=80",
    challenges: [
      {
        title: "Production Quality Inconsistencies",
        description:
          "Without real-time monitoring of production parameters, defects are detected too late — resulting in costly rework, scrap, and customer complaints that damage brand reputation.",
      },
      {
        title: "Unplanned Equipment Downtime",
        description:
          "Reactive maintenance strategies lead to unexpected breakdowns that halt production lines, miss delivery deadlines, and incur emergency repair costs far exceeding planned maintenance budgets.",
      },
      {
        title: "Supply Chain Visibility Gaps",
        description:
          "Disconnected supplier systems, manual inventory tracking, and limited demand forecasting create bullwhip effects — oscillating between stockouts and excess inventory.",
      },
      {
        title: "Energy & Resource Waste",
        description:
          "Manufacturing facilities consume significant energy and raw materials, but without granular consumption analytics, optimization opportunities remain invisible to plant managers.",
      },
      {
        title: "Workforce Productivity Plateaus",
        description:
          "Manual processes, skill gaps, and lack of standardized work procedures create inconsistent output quality and limit the scalability of production operations.",
      },
    ],
    solutions: [
      {
        title: "Smart Factory Analytics",
        description:
          "IoT-connected production monitoring with real-time quality dashboards that detect parameter drift and trigger alerts before defects occur — reducing scrap rates and rework costs.",
        icon: BarChart3,
      },
      {
        title: "Predictive Maintenance",
        description:
          "Machine learning models trained on equipment sensor data that predict failure windows — enabling planned maintenance that prevents costly unplanned downtime.",
        icon: Zap,
      },
      {
        title: "Lean Six Sigma Programs",
        description:
          "Structured continuous improvement programs that systematically eliminate waste, reduce cycle times, and establish statistical process control across all production lines.",
        icon: Target,
      },
      {
        title: "Supply Chain Intelligence",
        description:
          "End-to-end supply chain analytics with demand forecasting, supplier performance scoring, and inventory optimization that minimizes costs while ensuring production continuity.",
        icon: Database,
      },
    ],
    stats: [
      { value: "50%", label: "Reduction in defect rates" },
      { value: "35%", label: "Less unplanned downtime" },
      { value: "20%", label: "Improvement in OEE" },
      { value: "15%", label: "Energy cost reduction" },
    ],
    caseStudy: {
      title: "Industrial Quality Transformation",
      description:
        "Implemented a comprehensive Lean Six Sigma program combined with production analytics for a major manufacturing facility.",
      results: [
        "Six Sigma quality levels achieved in key processes",
        "Overall Equipment Effectiveness (OEE) from 62% to 84%",
        "Predictive maintenance reducing breakdowns by 40%",
        "40 employees certified as Lean practitioners",
      ],
    },
  },
  {
    slug: "energy-utilities",
    name: "Energy & Utilities",
    tagline: "Powering sustainable operations with intelligent energy analytics",
    description:
      "Energy companies and utility providers face a dual challenge: meeting growing demand while transitioning to sustainable operations. Analytix Engineering delivers data solutions that optimize generation, distribution, and consumption — while supporting the transition to cleaner energy systems.",
    icon: TrendingUp,
    gradient: "from-orange-900 via-red-800 to-rose-900",
    accentColor: "text-orange-500",
    accentBg: "bg-orange-500",
    heroImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80",
    challenges: [
      {
        title: "Grid Reliability & Outages",
        description:
          "Aging infrastructure, limited monitoring, and reactive maintenance lead to frequent power outages that impact businesses, hospitals, and households — with slow restoration times due to poor fault localization.",
      },
      {
        title: "Revenue Collection Losses",
        description:
          "Non-technical losses from meter tampering, illegal connections, and billing errors represent significant revenue erosion — often exceeding 20% of generated electricity in developing markets.",
      },
      {
        title: "Demand Forecasting Inaccuracy",
        description:
          "Without accurate demand prediction models, utilities over-generate or under-generate power — wasting fuel costs or triggering blackouts that damage economic productivity.",
      },
      {
        title: "Renewable Integration Complexity",
        description:
          "Integrating variable renewable energy sources (solar, wind) into existing grids requires sophisticated forecasting and balancing capabilities that traditional utility systems were never designed for.",
      },
      {
        title: "Regulatory & Environmental Compliance",
        description:
          "Increasingly stringent emission reporting, environmental impact assessments, and energy efficiency mandates require robust data collection and reporting systems.",
      },
    ],
    solutions: [
      {
        title: "Smart Grid Analytics",
        description:
          "Real-time grid monitoring with fault detection, automated outage mapping, and restoration prioritization — dramatically reducing outage duration and improving customer satisfaction.",
        icon: Zap,
      },
      {
        title: "Loss Reduction Systems",
        description:
          "Advanced metering analytics that detect tampering patterns, identify illegal connections, and optimize billing accuracy — recovering lost revenue and improving financial sustainability.",
        icon: Shield,
      },
      {
        title: "Demand & Generation Forecasting",
        description:
          "Machine learning models that predict demand patterns with weather, economic, and seasonal factors — enabling optimal generation scheduling and fuel cost reduction.",
        icon: BarChart3,
      },
      {
        title: "Sustainability & Compliance Reporting",
        description:
          "Automated environmental monitoring and reporting platforms that track emissions, renewable generation, and efficiency metrics — meeting regulatory requirements while driving sustainability goals.",
        icon: Target,
      },
    ],
    stats: [
      { value: "45%", label: "Reduction in outage duration" },
      { value: "18%", label: "Non-technical loss recovery" },
      { value: "95%", label: "Demand forecast accuracy" },
      { value: "30%", label: "Carbon reporting efficiency" },
    ],
    caseStudy: {
      title: "Utility Distribution Analytics",
      description:
        "Deployed a comprehensive distribution analytics platform for a national electricity utility covering thousands of transformers and millions of customers.",
      results: [
        "Real-time monitoring of distribution network health",
        "Automated outage detection and crew dispatch",
        "Predictive transformer maintenance saving $1.5M/year",
        "Customer self-service portal reducing call center load by 40%",
      ],
    },
  },
];

// ─── Animation Variants ───

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Component ───

export function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const sector = SECTORS.find((s) => s.slug === slug);

  if (!sector) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-navy">Sector Not Found</h1>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const SectorIcon = sector.icon;

  return (
    <div className="overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section className={`relative bg-gradient-to-br ${sector.gradient} px-6 pb-20 pt-32`}>
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${sector.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center"
          >
            <motion.div variants={fadeUp} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <SectorIcon size={40} className="text-white" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(32px,5vw,56px)] font-extrabold leading-tight text-white"
            >
              {sector.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70"
            >
              {sector.tagline}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ OVERVIEW ═══ */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center text-lg leading-relaxed text-slate-600"
          >
            {sector.description}
          </motion.p>
        </div>
      </section>

      {/* ═══ CHALLENGES ═══ */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-rose">
              The Challenges
            </span>
            <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-extrabold text-navy">
              What Keeps Leaders Up at Night
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {sector.challenges.map((challenge, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose/30 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-rose/10">
                    <AlertTriangle size={16} className="text-rose" />
                  </div>
                  <h3 className="text-[15px] font-bold text-navy">
                    {challenge.title}
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-rose to-amber transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW WE HELP ═══ */}
      <section className="bg-slate-100/60 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <span className={`text-[13px] font-bold uppercase tracking-[0.15em] ${sector.accentColor}`}>
              Our Solutions
            </span>
            <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-extrabold text-navy">
              How Analytix Engineering Helps
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2"
          >
            {sector.solutions.map((solution, i) => {
              const SolIcon = solution.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md"
                >
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${sector.accentBg}/10`}
                  >
                    <SolIcon size={20} className={sector.accentColor} />
                  </div>
                  <h3 className="text-[15px] font-bold text-navy">
                    {solution.title}
                  </h3>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ IMPACT STATS ═══ */}
      <section className={`bg-gradient-to-br ${sector.gradient} px-6 py-20`}>
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-white">
              Measurable Impact
            </h2>
            <p className="mt-3 text-white/50">
              Results our clients have achieved in {sector.name.toLowerCase()}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {sector.stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm"
              >
                <p className="text-3xl font-extrabold text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[13px] font-semibold text-white/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CASE STUDY ═══ */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="overflow-hidden rounded-3xl shadow-lg"
          >
            <div className={`bg-gradient-to-r ${sector.gradient} px-8 py-8`}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                Case Study
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-white">
                {sector.caseStudy.title}
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-slate-100/60 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-navy">
              Ready to Transform Your{" "}
              <span className={sector.accentColor}>{sector.name.split(" ")[0]}</span>{" "}
              Operations?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-500">
              Let's discuss how Analytix Engineering can help you overcome these
              challenges and achieve measurable results.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start a Conversation <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 px-8 py-4 text-sm font-semibold text-navy transition-all hover:border-brand hover:bg-brand/5"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ OTHER SECTORS ═══ */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-8 text-center text-lg font-bold text-navy">
            Explore Other Sectors
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SECTORS.filter((s) => s.slug !== slug).map((s) => {
              const OtherIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={`/industries/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:border-brand hover:bg-brand/5"
                >
                  <OtherIcon size={16} />
                  {s.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
