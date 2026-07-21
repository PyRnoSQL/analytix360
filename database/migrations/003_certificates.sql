-- ═══════════════════════════════════════════════════════════════
-- Analytix Engineering – Certificate System (Phase 3)
-- Verifiable, traceable, tamper-proof training certificates
-- Run AFTER 002_extended_payments.sql in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Unique public certificate number (e.g. AE-CERT-2026-00042)
  certificate_number VARCHAR(30) UNIQUE NOT NULL,

  -- Recipient
  recipient_id UUID REFERENCES profiles(id),
  recipient_name VARCHAR(200) NOT NULL,
  recipient_email VARCHAR(200),

  -- Training details
  training_id UUID REFERENCES trainings(id),
  enrollment_id UUID REFERENCES enrollments(id),
  course_title VARCHAR(300) NOT NULL,
  course_category VARCHAR(100),         -- e.g. 'Data & Analytics Engineering'
  course_hours INTEGER NOT NULL,
  completion_date DATE NOT NULL,

  -- Signatories
  ceo_name VARCHAR(100) DEFAULT 'Christian H. Nwinsto',
  ceo_title VARCHAR(100) DEFAULT 'Chief Executive Officer',
  board_director_name VARCHAR(100) DEFAULT 'Dr. Marie-Claire Atangana',
  board_director_title VARCHAR(100) DEFAULT 'Director, Certification Board',

  -- Security & Verification
  verification_hash VARCHAR(128) NOT NULL,  -- HMAC-SHA512 of cert data
  verification_url TEXT NOT NULL,
  qr_code_data TEXT NOT NULL,
  is_revoked BOOLEAN DEFAULT false,
  revocation_reason TEXT,
  revoked_at TIMESTAMPTZ,
  revoked_by UUID REFERENCES profiles(id),

  -- Metadata
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,              -- NULL = no expiry
  template_version VARCHAR(10) DEFAULT 'v1.0',
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Certificate Verification Log (tracks every verification attempt) ───
CREATE TABLE IF NOT EXISTS certificate_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id UUID REFERENCES certificates(id) NOT NULL,
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  country VARCHAR(2)
);

-- ─── Indexes ───
CREATE INDEX IF NOT EXISTS idx_certificates_number ON certificates(certificate_number);
CREATE INDEX IF NOT EXISTS idx_certificates_recipient ON certificates(recipient_id);
CREATE INDEX IF NOT EXISTS idx_certificates_hash ON certificates(verification_hash);
CREATE INDEX IF NOT EXISTS idx_cert_verifications_cert ON certificate_verifications(certificate_id);

-- ─── RLS Policies ───
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificate_verifications ENABLE ROW LEVEL SECURITY;

-- Public can read non-revoked certificates (for verification)
CREATE POLICY "Public verifies certificates" ON certificates
  FOR SELECT USING (true);

-- Admin manages certificates
CREATE POLICY "Admin manages certificates" ON certificates
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('staff', 'admin', 'super_admin'))
  );

-- Verification logs are insert-only for anyone, read for admin
CREATE POLICY "Anyone logs verification" ON certificate_verifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin reads verification logs" ON certificate_verifications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- ─── Auto-generate certificate number ───
CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  seq_num INTEGER;
  cert_num TEXT;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  SELECT COUNT(*) + 1 INTO seq_num FROM certificates
    WHERE certificate_number LIKE 'AE-CERT-' || year_part || '%';
  cert_num := 'AE-CERT-' || year_part || '-' || LPAD(seq_num::TEXT, 5, '0');
  NEW.certificate_number := cert_num;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_certificate_number
  BEFORE INSERT ON certificates
  FOR EACH ROW
  WHEN (NEW.certificate_number IS NULL OR NEW.certificate_number = '')
  EXECUTE FUNCTION generate_certificate_number();
