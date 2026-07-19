// ─── User Roles ───
export type UserRole = "visitor" | "customer" | "staff" | "admin" | "super_admin";

// ─── Database Row Types ───

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  company: string | null;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  reference: string;
  customer_id: string;
  description: string;
  amount: number;
  currency: string;
  status: "draft" | "pending" | "paid" | "overdue" | "cancelled";
  due_date: string;
  paid_at: string | null;
  created_at: string;
}

export interface Payment {
  id: string;
  invoice_id: string;
  customer_id: string;
  amount: number;
  currency: string;
  method: "mtn_momo" | "orange_money" | "airtel_money" | "wave" | "yoomoney" | "visa" | "mastercard" | "bank_transfer";
  status: "pending" | "processing" | "completed" | "failed" | "refunded";
  gateway_ref: string | null;
  gateway_response: Record<string, unknown> | null;
  qr_code_data: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  client_id: string;
  description: string;
  status: "planning" | "active" | "paused" | "completed" | "cancelled";
  progress: number;
  start_date: string;
  end_date: string | null;
  created_at: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  category: string;
  duration_hours: number;
  max_seats: number;
  price: number;
  is_active: boolean;
  next_cohort_date: string | null;
  created_at: string;
}

export interface Enrollment {
  id: string;
  training_id: string;
  customer_id: string;
  status: "enrolled" | "in_progress" | "completed" | "dropped";
  progress: number;
  certificate_url: string | null;
  enrolled_at: string;
  completed_at: string | null;
  created_at: string;
}

export interface Document {
  id: string;
  owner_id: string;
  name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  category: "report" | "certificate" | "contract" | "invoice" | "other";
  project_id: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

// ─── API Request/Response Types ───

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export interface PaymentSessionRequest {
  invoice_id: string;
  customer_id: string;
  amount: number;
  currency: string;
  description: string;
  return_url: string;
  notify_url: string;
}

export interface PaymentSessionResponse {
  payment_id: string;
  payment_url: string;
  qr_code_data: string;
  expires_at: string;
}

export interface AdminStats {
  totalRevenue: number;
  pendingRevenue: number;
  activeProjects: number;
  totalTrainees: number;
  certifiedTrainees: number;
  totalCustomers: number;
}
