// Auto-generated types will come from: npx supabase gen types typescript
// These are the initial hand-written types matching our schema

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id">>;
      };
      invoices: {
        Row: Invoice;
        Insert: Omit<Invoice, "id" | "created_at">;
        Update: Partial<Omit<Invoice, "id">>;
      };
      payments: {
        Row: Payment;
        Insert: Omit<Payment, "id" | "created_at">;
        Update: Partial<Omit<Payment, "id">>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at">;
        Update: Partial<Omit<Project, "id">>;
      };
      trainings: {
        Row: Training;
        Insert: Omit<Training, "id" | "created_at">;
        Update: Partial<Omit<Training, "id">>;
      };
      enrollments: {
        Row: Enrollment;
        Insert: Omit<Enrollment, "id" | "created_at">;
        Update: Partial<Omit<Enrollment, "id">>;
      };
      documents: {
        Row: Document;
        Insert: Omit<Document, "id" | "created_at">;
        Update: Partial<Omit<Document, "id">>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, "id" | "created_at">;
        Update: Partial<Omit<Message, "id">>;
      };
      audit_logs: {
        Row: AuditLog;
        Insert: Omit<AuditLog, "id" | "created_at">;
        Update: never;
      };
    };
  };
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  company: string | null;
  phone: string | null;
  role: "visitor" | "customer" | "staff" | "admin" | "super_admin";
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
  method: "mtn_momo" | "orange_money" | "visa" | "mastercard" | "bank_transfer";
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
