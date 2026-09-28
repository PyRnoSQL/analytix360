// ─── App ───
export const APP_NAME = "Analytix Engineering";

export const PAYMENT_CONFIG = {
  gateway: "flutterwave",
  currency: "XAF",
  country: "CM",
  channels: ["MOBILE_MONEY", "CREDIT_CARD", "WALLET"],
} as const;

export type Role = "visitor" | "customer" | "staff" | "admin" | "super_admin";
export const ROLES = {
  VISITOR: "visitor",
  CUSTOMER: "customer",
  STAFF: "staff",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

// ─── Navigation (Verify Certificate moved to Services page) ───
export const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/" },
  { id: "services", label: "Services", path: "/services" },
  { id: "training", label: "Training", path: "/training" },
  { id: "about", label: "About", path: "/about" },
  { id: "contact", label: "Contact", path: "/contact" },
] as const;

// ─── Services ───
export const SERVICES = [
  {
    id: "data-analytics",
    title: "Data & Analytics Engineering",
    description:
      "Transform raw data into strategic intelligence. We design scalable data pipelines, warehouses, and analytics platforms that power informed decision-making.",
    color: "brand" as const,
    features: [
      "Enterprise Data Warehouse Design",
      "ETL/ELT Pipeline Development",
      "Business Intelligence & Dashboards",
      "Data Quality & Governance",
      "Cloud Data Platform Migration",
      "Real-Time Analytics & Streaming",
    ],
  },
  {
    id: "quality-excellence",
    title: "Quality & Operational Excellence",
    description:
      "Optimize processes, reduce waste, and build a culture of continuous improvement. Lean Six Sigma expertise that drives measurable performance gains.",
    color: "emerald" as const,
    features: [
      "Lean Six Sigma Programs (Yellow–Black Belt)",
      "Process Mapping & Value Stream Analysis",
      "Statistical Process Control (SPC)",
      "Quality Management Systems (ISO 9001)",
      "Operational KPI Design & Monitoring",
      "Change Management & Culture Transformation",
    ],
  },
  {
    id: "professional-training",
    title: "Professional Training & Certification",
    description:
      "Upskill your workforce with industry-recognized certifications. Hands-on programs designed for real-world application and career advancement.",
    color: "amber" as const,
    features: [
      "Data Engineering & Analytics Certification",
      "Lean Six Sigma (Green Belt, Black Belt)",
      "Project Management Professional (PMP)",
      "Business Intelligence Tools (Power BI, Tableau)",
      "Python & SQL for Data Professionals",
      "Custom Corporate Training Programs",
    ],
  },
] as const;

// ─── Industries ───
export const INDUSTRIES = [
  "Government & Public Sector",
  "Healthcare & Life Sciences",
  "Financial Services & Insurance",
  "Telecommunications",
  "Manufacturing & Industry",
  "Energy & Utilities",
] as const;

