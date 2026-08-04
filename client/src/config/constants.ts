export const APP_NAME = "Analytix Engineering";
export const APP_URL =
  import.meta.env.VITE_APP_URL ?? "https://www.analytix-eng.com";

// ─── Payment Gateway ───
export const PAYMENT_CONFIG = {
  gateway: import.meta.env.VITE_PAYMENT_GATEWAY ?? "cinetpay",
  cinetpay: {
    apiKey: import.meta.env.VITE_CINETPAY_API_KEY ?? "",
    siteId: import.meta.env.VITE_CINETPAY_SITE_ID ?? "",
  },
  currency: "XAF",
  country: "CM",
  channels: ["MOBILE_MONEY", "CREDIT_CARD", "WALLET"],
} as const;

// ─── Roles ───
export const ROLES = {
  VISITOR: "visitor",
  CUSTOMER: "customer",
  STAFF: "staff",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// ─── Navigation ───
export const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/" },
  { id: "services", label: "Services", path: "/services" },
  { id: "institute", label: "Institute", path: "/institute" },
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
    features: [
      "Data Pipeline Architecture",
      "Business Intelligence Dashboards",
      "Predictive Analytics & ML",
      "Data Governance & Quality",
      "Real-time Data Streaming",
      "Cloud Data Platform Migration",
    ],
    color: "brand" as const,
  },
  {
    id: "quality-excellence",
    title: "Quality & Operational Excellence",
    description:
      "Optimize processes, reduce waste, and build a culture of continuous improvement. Lean Six Sigma expertise that drives measurable performance gains.",
    features: [
      "Lean Six Sigma Implementation",
      "Process Mapping & Optimization",
      "ISO Certification Support",
      "Performance Metrics & KPIs",
      "Operational Audits",
      "Change Management",
    ],
    color: "emerald" as const,
  },
  {
    id: "professional-training",
    title: "Professional Training & Certification",
    description:
      "Upskill your workforce with industry-recognized certifications. Hands-on programs designed for real-world application and career advancement.",
    features: [
      "Lean Six Sigma Certification",
      "Data Analytics Bootcamps",
      "Project Management (PMP)",
      "Statistical Process Control",
      "Custom Corporate Programs",
      "Online & In-Person Options",
    ],
    color: "amber" as const,
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
