-- ═══════════════════════════════════════════════════════════════
-- Analytix Engineering – Extended Schema (Phase 2)
-- Adds: Coupons, Installment Plans, Subscriptions, Refunds,
--        Bank Transfer tracking, Purchase Orders
-- Run AFTER 001_initial_schema.sql in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── Extend Payment Methods ───
ALTER TABLE payments
  DROP CONSTRAINT IF EXISTS payments_method_check;

ALTER TABLE payments
  ADD CONSTRAINT payments_method_check CHECK (
    method IN (
      'mtn_momo', 'orange_money', 'airtel_money', 'wave',
      'visa', 'mastercard', 'bank_transfer', 'paypal',
      'purchase_order', 'installment', 'coupon'
    )
  );

-- ─── Promotional Coupons ───
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value NUMERIC(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'XAF',
  max_uses INTEGER DEFAULT NULL,          -- NULL = unlimited
  current_uses INTEGER DEFAULT 0,
  min_order_amount NUMERIC(12,2) DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  applicable_services TEXT[] DEFAULT '{}', -- empty = all services
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Coupon Redemptions (audit trail) ───
CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_id UUID REFERENCES coupons(id) NOT NULL,
  customer_id UUID REFERENCES profiles(id) NOT NULL,
  invoice_id UUID REFERENCES invoices(id),
  discount_applied NUMERIC(12,2) NOT NULL,
  redeemed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Installment Plans ───
CREATE TABLE IF NOT EXISTS installment_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) NOT NULL,
  customer_id UUID REFERENCES profiles(id) NOT NULL,
  total_amount NUMERIC(12,2) NOT NULL,
  num_installments INTEGER NOT NULL CHECK (num_installments BETWEEN 2 AND 12),
  installment_amount NUMERIC(12,2) NOT NULL,
  frequency VARCHAR(20) DEFAULT 'monthly' CHECK (frequency IN ('weekly', 'biweekly', 'monthly')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'defaulted', 'cancelled')),
  start_date DATE NOT NULL,
  next_due_date DATE NOT NULL,
  paid_installments INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Individual Installment Payments ───
CREATE TABLE IF NOT EXISTS installment_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID REFERENCES installment_plans(id) NOT NULL,
  installment_number INTEGER NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'waived')),
  payment_id UUID REFERENCES payments(id),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Subscription Plans (for future SaaS) ───
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'XAF',
  interval VARCHAR(20) NOT NULL CHECK (interval IN ('monthly', 'quarterly', 'yearly')),
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID REFERENCES subscription_plans(id) NOT NULL,
  customer_id UUID REFERENCES profiles(id) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Refunds ───
CREATE TABLE IF NOT EXISTS refunds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id UUID REFERENCES payments(id) NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'processed', 'rejected')),
  approved_by UUID REFERENCES profiles(id),
  gateway_ref VARCHAR(100),
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Purchase Orders (for government/enterprise) ───
CREATE TABLE IF NOT EXISTS purchase_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  po_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES profiles(id) NOT NULL,
  invoice_id UUID REFERENCES invoices(id),
  issuing_organization VARCHAR(200) NOT NULL,
  authorized_signatory VARCHAR(100),
  total_amount NUMERIC(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'XAF',
  status VARCHAR(20) DEFAULT 'received' CHECK (
    status IN ('received', 'verified', 'approved', 'fulfilled', 'cancelled')
  ),
  document_url TEXT,
  notes TEXT,
  received_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Bank Transfer Records ───
CREATE TABLE IF NOT EXISTS bank_transfers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) NOT NULL,
  customer_id UUID REFERENCES profiles(id) NOT NULL,
  bank_name VARCHAR(100),
  reference_number VARCHAR(100),
  amount NUMERIC(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'XAF',
  transfer_date DATE,
  proof_document_url TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (
    status IN ('pending', 'under_review', 'confirmed', 'rejected')
  ),
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Tax Configuration ───
CREATE TABLE IF NOT EXISTS tax_rates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  rate NUMERIC(5,2) NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default Cameroon VAT
INSERT INTO tax_rates (name, rate, description, is_default) VALUES
  ('TVA', 19.25, 'Taxe sur la Valeur Ajoutée — Cameroon standard rate', true)
ON CONFLICT DO NOTHING;

-- ─── Add service category to invoices ───
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS service_category VARCHAR(50)
  CHECK (service_category IN ('consulting', 'training', 'software', 'other'));

ALTER TABLE invoices ADD COLUMN IF NOT EXISTS tax_rate NUMERIC(5,2) DEFAULT 0;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS tax_amount NUMERIC(12,2) DEFAULT 0;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS subtotal NUMERIC(12,2);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS coupon_id UUID REFERENCES coupons(id);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(12,2) DEFAULT 0;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS payment_method_preference VARCHAR(30);

-- ─── Indexes ───
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupon_redemptions_customer ON coupon_redemptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_installment_plans_customer ON installment_plans(customer_id);
CREATE INDEX IF NOT EXISTS idx_installment_payments_plan ON installment_payments(plan_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_refunds_payment ON refunds(payment_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_customer ON purchase_orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_bank_transfers_invoice ON bank_transfers(invoice_id);

-- ─── RLS Policies ───
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE installment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE installment_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_rates ENABLE ROW LEVEL SECURITY;

-- Coupons: anyone can read active coupons, only admin creates
CREATE POLICY "Public can read active coupons" ON coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Admin manages coupons" ON coupons FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Customer sees own redemptions
CREATE POLICY "Customer reads own redemptions" ON coupon_redemptions FOR SELECT USING (customer_id = auth.uid());

-- Customer sees own installment plans
CREATE POLICY "Customer reads own plans" ON installment_plans FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Staff manages plans" ON installment_plans FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('staff', 'admin', 'super_admin'))
);

-- Customer sees own installment payments
CREATE POLICY "Customer reads own installment payments" ON installment_payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM installment_plans WHERE id = plan_id AND customer_id = auth.uid())
);

-- Subscription plans are public read
CREATE POLICY "Public reads subscription plans" ON subscription_plans FOR SELECT USING (is_active = true);

-- Customer sees own subscriptions
CREATE POLICY "Customer reads own subscriptions" ON subscriptions FOR SELECT USING (customer_id = auth.uid());

-- Customer sees own refunds
CREATE POLICY "Customer reads own refunds" ON refunds FOR SELECT USING (
  EXISTS (SELECT 1 FROM payments WHERE id = payment_id AND customer_id = auth.uid())
);
CREATE POLICY "Admin manages refunds" ON refunds FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Customer sees own POs
CREATE POLICY "Customer reads own POs" ON purchase_orders FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Staff manages POs" ON purchase_orders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('staff', 'admin', 'super_admin'))
);

-- Customer sees own bank transfers
CREATE POLICY "Customer reads own transfers" ON bank_transfers FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Staff manages transfers" ON bank_transfers FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('staff', 'admin', 'super_admin'))
);

-- Tax rates are public read
CREATE POLICY "Public reads tax rates" ON tax_rates FOR SELECT USING (true);
