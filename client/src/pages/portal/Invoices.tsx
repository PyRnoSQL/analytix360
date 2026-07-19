import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Download, ShieldCheck } from "lucide-react";
import { QRPaymentModal } from "@/components/payment/QRPaymentModal";
import { formatCurrency } from "@/services/payment";
import type { Invoice } from "@/types";

// Demo data — in production these come from Supabase via TanStack Query
const demoInvoices: Invoice[] = [
  {
    id: "inv-001",
    reference: "AE-2026-001",
    customer_id: "cust-001",
    description: "Data Pipeline Architecture – Phase 1",
    amount: 2_500_000,
    currency: "XAF",
    status: "paid",
    due_date: "2026-03-15",
    paid_at: "2026-03-12",
    created_at: "2026-03-01",
  },
  {
    id: "inv-002",
    reference: "AE-2026-002",
    customer_id: "cust-001",
    description: "Lean Six Sigma Green Belt Training (10 seats)",
    amount: 1_800_000,
    currency: "XAF",
    status: "pending",
    due_date: "2026-07-20",
    paid_at: null,
    created_at: "2026-06-20",
  },
  {
    id: "inv-003",
    reference: "AE-2026-003",
    customer_id: "cust-001",
    description: "BI Dashboard Development – MINSANTE",
    amount: 4_200_000,
    currency: "XAF",
    status: "pending",
    due_date: "2026-08-01",
    paid_at: null,
    created_at: "2026-07-01",
  },
  {
    id: "inv-004",
    reference: "AE-2026-004",
    customer_id: "cust-001",
    description: "Quality Audit – Manufacturing Division",
    amount: 950_000,
    currency: "XAF",
    status: "paid",
    due_date: "2026-05-10",
    paid_at: "2026-05-08",
    created_at: "2026-04-25",
  },
];

export function PortalInvoices() {
  const [payingInvoice, setPayingInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState(demoInvoices);

  const handlePaymentSuccess = () => {
    if (!payingInvoice) return;
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === payingInvoice.id
          ? { ...inv, status: "paid" as const, paid_at: new Date().toISOString() }
          : inv
      )
    );
  };

  return (
    <>
      <h2 className="mb-6 text-2xl font-extrabold text-navy">
        Invoices & Payments
      </h2>

      {/* Invoice list */}
      <div className="space-y-3">
        {invoices.map((inv, i) => (
          <motion.div
            key={inv.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="min-w-[200px] flex-1">
              <p className="text-sm font-bold text-navy">{inv.description}</p>
              <p className="mt-1 text-xs text-slate-400">
                {inv.reference} · {inv.due_date}
              </p>
            </div>

            <p className="text-lg font-extrabold text-navy">
              {formatCurrency(inv.amount)}
            </p>

            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                inv.status === "paid"
                  ? "bg-emerald/10 text-emerald"
                  : "bg-amber/10 text-amber"
              }`}
            >
              {inv.status === "paid" ? "Paid" : "Pending"}
            </span>

            {inv.status === "pending" ? (
              <button
                onClick={() => setPayingInvoice(inv)}
                className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand/90"
              >
                <QrCode size={14} /> Pay Now
              </button>
            ) : (
              <button className="flex items-center gap-1.5 rounded-xl border-2 border-brand px-4 py-2 text-[13px] font-semibold text-brand transition-colors hover:bg-brand/5">
                <Download size={14} /> Receipt
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Security info */}
      <div className="mt-7 rounded-2xl border border-brand/10 bg-brand/3 p-5">
        <div className="mb-2 flex items-center gap-2.5">
          <ShieldCheck size={18} className="text-brand" />
          <span className="text-sm font-bold text-navy">Secure Payments</span>
        </div>
        <p className="text-[13px] leading-relaxed text-slate-500">
          All payments are processed securely via encrypted channels. We support
          MTN Mobile Money, Orange Money, Airtel Money, Wave, YooMoney, Visa,
          Mastercard, and bank transfers. Each transaction generates a unique
          reference and downloadable receipt.
        </p>
      </div>

      {/* QR Payment Modal */}
      {payingInvoice && (
        <QRPaymentModal
          invoice={payingInvoice}
          onClose={() => setPayingInvoice(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}
