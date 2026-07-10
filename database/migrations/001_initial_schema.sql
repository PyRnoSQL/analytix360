-- ═══════════════════════════════════════════════════════════════
-- Analytix Engineering – Initial Database Schema
-- Run this in the Supabase SQL Editor after creating your project
-- ═══════════════════════════════════════════════════════════════

-- ─── Enable extensions ───
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Profiles ───
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  company TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer'
    CHECK (role IN ('visitor','customer','staff','admin','super_admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── Invoices ───
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id),
  description TEXT NOT NULL,
  amount BIGINT NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'XAF',
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('draft','pending','paid','overdue','cancelled')),
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Payments ───
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id),
  customer_id UUID NOT NULL REFERENCES public.profiles(id),
  amount BIGINT NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'XAF',
  method TEXT NOT NULL
    CHECK (method IN ('mtn_momo','orange_money','visa','mastercard','bank_transfer')),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','processing','completed','failed','refunded')),
  gateway_ref TEXT,
  gateway_response JSONB,
  qr_code_data TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Projects ───
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  client_id UUID NOT NULL REFERENCES public.profiles(id),
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'planning'
    CHECK (status IN ('planning','active','paused','completed','cancelled')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Trainings ───
CREATE TABLE public.trainings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'general',
  duration_hours INTEGER NOT NULL DEFAULT 0,
  max_seats INTEGER NOT NULL DEFAULT 30,
  price BIGINT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  next_cohort_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Enrollments ───
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  training_id UUID NOT NULL REFERENCES public.trainings(id),
  customer_id UUID NOT NULL REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'enrolled'
    CHECK (status IN ('enrolled','in_progress','completed','dropped')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  certificate_url TEXT,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (training_id, customer_id)
);

-- ─── Documents ───
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  mime_type TEXT NOT NULL DEFAULT 'application/octet-stream',
  category TEXT NOT NULL DEFAULT 'other'
    CHECK (category IN ('report','certificate','contract','invoice','other')),
  project_id UUID REFERENCES public.projects(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Messages ───
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id),
  recipient_id UUID NOT NULL REFERENCES public.profiles(id),
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Audit Logs ───
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: check if user is staff/admin
CREATE OR REPLACE FUNCTION public.is_staff_or_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('staff', 'admin', 'super_admin')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ─── Profiles RLS ───
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Staff can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_staff_or_admin());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ─── Invoices RLS ───
CREATE POLICY "Customers see own invoices"
  ON public.invoices FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Staff see all invoices"
  ON public.invoices FOR SELECT
  USING (public.is_staff_or_admin());

CREATE POLICY "Staff manage invoices"
  ON public.invoices FOR ALL
  USING (public.is_staff_or_admin());

-- ─── Payments RLS ───
CREATE POLICY "Customers see own payments"
  ON public.payments FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Customers create payments"
  ON public.payments FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Staff see all payments"
  ON public.payments FOR SELECT
  USING (public.is_staff_or_admin());

-- ─── Projects RLS ───
CREATE POLICY "Customers see own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Staff manage projects"
  ON public.projects FOR ALL
  USING (public.is_staff_or_admin());

-- ─── Trainings RLS ───
CREATE POLICY "Anyone can view active trainings"
  ON public.trainings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Staff manage trainings"
  ON public.trainings FOR ALL
  USING (public.is_staff_or_admin());

-- ─── Enrollments RLS ───
CREATE POLICY "Customers see own enrollments"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Staff manage enrollments"
  ON public.enrollments FOR ALL
  USING (public.is_staff_or_admin());

-- ─── Documents RLS ───
CREATE POLICY "Customers see own documents"
  ON public.documents FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Staff manage documents"
  ON public.documents FOR ALL
  USING (public.is_staff_or_admin());

-- ─── Messages RLS ───
CREATE POLICY "Users see own messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- ─── Audit Logs RLS ───
CREATE POLICY "Only staff see audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.is_staff_or_admin());

-- ═══════════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX idx_invoices_customer ON public.invoices(customer_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_payments_invoice ON public.payments(invoice_id);
CREATE INDEX idx_payments_customer ON public.payments(customer_id);
CREATE INDEX idx_projects_client ON public.projects(client_id);
CREATE INDEX idx_enrollments_customer ON public.enrollments(customer_id);
CREATE INDEX idx_documents_owner ON public.documents(owner_id);
CREATE INDEX idx_messages_recipient ON public.messages(recipient_id);
CREATE INDEX idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);

-- ═══════════════════════════════════════════════════════════════
-- STORAGE BUCKETS
-- ═══════════════════════════════════════════════════════════════

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('documents', 'documents', false),
  ('avatars', 'avatars', true),
  ('certificates', 'certificates', false);

-- Storage policies
CREATE POLICY "Users upload own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users read own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Anyone can read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
