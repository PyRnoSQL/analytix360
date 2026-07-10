export const APP_NAME = "Analytix Engineering";

export const ROLES = {
  VISITOR: "visitor",
  CUSTOMER: "customer",
  STAFF: "staff",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

export const PAYMENT = {
  CURRENCY: "XAF",
  COUNTRY: "CM",
  CHANNELS: ["MOBILE_MONEY", "CREDIT_CARD", "WALLET"],
  METHODS: {
    MTN_MOMO: "mtn_momo",
    ORANGE_MONEY: "orange_money",
    VISA: "visa",
    MASTERCARD: "mastercard",
    BANK_TRANSFER: "bank_transfer",
  },
} as const;

export const SERVICES = [
  {
    id: "data-analytics",
    title: "Data & Analytics Engineering",
    description:
      "Transform raw data into strategic intelligence. We design scalable data pipelines, warehouses, and analytics platforms that power informed decision-making.",
  },
  {
    id: "quality-excellence",
    title: "Quality & Operational Excellence",
    description:
      "Optimize processes, reduce waste, and build a culture of continuous improvement. Lean Six Sigma expertise that drives measurable performance gains.",
  },
  {
    id: "professional-training",
    title: "Professional Training & Certification",
    description:
      "Upskill your workforce with industry-recognized certifications. Hands-on programs designed for real-world application and career advancement.",
  },
] as const;

export const INDUSTRIES = [
  "Government & Public Sector",
  "Healthcare & Life Sciences",
  "Financial Services & Insurance",
  "Telecommunications",
  "Manufacturing & Industry",
  "Energy & Utilities",
] as const;
