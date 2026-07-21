import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  DollarSign, TrendingUp, AlertCircle,
  CreditCard, Smartphone, Building2, FileText, Download,
  RefreshCw, Filter, ArrowUpRight,
} from "lucide-react";

// ─── Demo Data ───

const MONTHLY_REVENUE = [
  { month: "Jan", consulting: 4200000, training: 2800000, software: 800000 },
  { month: "Feb", consulting: 3900000, training: 3200000, software: 950000 },
  { month: "Mar", consulting: 5100000, training: 2600000, software: 1100000 },
  { month: "Apr", consulting: 4800000, training: 3500000, software: 1250000 },
  { month: "May", consulting: 5600000, training: 4100000, software: 1400000 },
  { month: "Jun", consulting: 6200000, training: 3800000, software: 1600000 },
];

const PAYMENT_METHOD_DATA = [
  { name: "MTN MoMo", value: 38, color: "#FFCC00" },
  { name: "Orange Money", value: 28, color: "#FF6600" },
  { name: "Bank Transfer", value: 15, color: "#2563EB" },
  { name: "Visa/MC", value: 10, color: "#1A1F71" },
  { name: "Wave", value: 5, color: "#1DC3E2" },
  { name: "PayPal", value: 4, color: "#003087" },
];

const PAYMENT_STATUS = [
  { status: "Successful", count: 342, amount: 45600000, pct: 89 },
  { status: "Pending", count: 28, amount: 3800000, pct: 7 },
  { status: "Failed", count: 18, amount: 2100000, pct: 4 },
];

const RECENT_TRANSACTIONS = [
  { id: "AX360-2026-001", customer: "MINSANTE", amount: 3500000, method: "bank_transfer", status: "completed", date: "2026-07-18" },
  { id: "AX360-2026-002", customer: "Jean Mbarga", amount: 150000, method: "mtn_momo", status: "completed", date: "2026-07-18" },
  { id: "AX360-2026-003", customer: "CNPS", amount: 8200000, method: "purchase_order", status: "pending", date: "2026-07-17" },
  { id: "AX360-2026-004", customer: "Marie Atangana", amount: 75000, method: "orange_money", status: "completed", date: "2026-07-17" },
  { id: "AX360-2026-005", customer: "DGSN", amount: 12000000, method: "bank_transfer", status: "pending", date: "2026-07-16" },
  { id: "AX360-2026-006", customer: "Paul Fotso", amount: 200000, method: "visa", status: "failed", date: "2026-07-16" },
  { id: "AX360-2026-007", customer: "Shell Cameroon", amount: 5400000, method: "bank_transfer", status: "completed", date: "2026-07-15" },
  { id: "AX360-2026-008", customer: "Alice Ngo", amount: 95000, method: "wave", status: "completed", date: "2026-07-15" },
];

const OUTSTANDING_INVOICES = [
  { ref: "INV-2026-045", customer: "MINSANTE", amount: 12500000, due: "2026-07-25", days: 7, category: "consulting" },
  { ref: "INV-2026-048", customer: "CNPS", amount: 8200000, due: "2026-07-30", days: 12, category: "consulting" },
  { ref: "INV-2026-051", customer: "Customs HQ", amount: 6800000, due: "2026-08-05", days: 17, category: "software" },
  { ref: "INV-2026-053", customer: "Volvo CM", amount: 4500000, due: "2026-08-10", days: 22, category: "training" },
];

const REFUNDS = [
  { id: "REF-001", customer: "Jean Mbarga", amount: 50000, reason: "Duplicate payment", status: "processed", date: "2026-07-10" },
  { id: "REF-002", customer: "Marie Atangana", amount: 75000, reason: "Training cancelled", status: "pending", date: "2026-07-15" },
];

const MRR_DATA = [
  { month: "Jan", mrr: 450000 },
  { month: "Feb", mrr: 520000 },
  { month: "Mar", mrr: 580000 },
  { month: "Apr", mrr: 620000 },
  { month: "May", mrr: 750000 },
  { month: "Jun", mrr: 890000 },
];

// ─── Helpers ───

function formatXAF(amount: number) {
  return new Intl.NumberFormat("fr-CM", { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(amount);
}

const methodLabels: Record<string, string> = {
  mtn_momo: "MTN MoMo", orange_money: "Orange Money", bank_transfer: "Bank Transfer",
  visa: "Visa", mastercard: "Mastercard", wave: "Wave", paypal: "PayPal",
  purchase_order: "Purchase Order",
};

const methodColors: Record<string, string> = {
  mtn_momo: "bg-yellow-400", orange_money: "bg-orange-500", bank_transfer: "bg-blue-600",
  visa: "bg-indigo-900", wave: "bg-cyan-400", paypal: "bg-blue-800", purchase_order: "bg-slate-600",
};

const statusColors: Record<string, string> = {
  completed: "text-emerald bg-emerald/10", pending: "text-amber bg-amber/10",
  failed: "text-rose bg-rose/10", processed: "text-emerald bg-emerald/10",
};

// ─── Component ───

export function FinancialDashboard() {
  const [period, setPeriod] = useState("6m");
  const [tab, setTab] = useState<"overview" | "transactions" | "invoices" | "refunds">("overview");

  const totalRevenue = MONTHLY_REVENUE.reduce((s, m) => s + m.consulting + m.training + m.software, 0);
  const lastMonthRevenue = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1]!;
  const prevMonthRevenue = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 2]!;
  const currentTotal = lastMonthRevenue.consulting + lastMonthRevenue.training + lastMonthRevenue.software;
  const prevTotal = prevMonthRevenue.consulting + prevMonthRevenue.training + prevMonthRevenue.software;
  const growthPct = ((currentTotal - prevTotal) / prevTotal * 100).toFixed(1);
  const outstandingTotal = OUTSTANDING_INVOICES.reduce((s, i) => s + i.amount, 0);

  const handleExport = (format: string) => {
    alert(`Export to ${format} — will be connected to real data export when Supabase is configured.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Financial Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Real-time revenue, payments, and financial analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-navy"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
          <button onClick={() => handleExport("Excel")} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-navy hover:bg-slate-100">
            <Download size={14} /> Excel
          </button>
          <button onClick={() => handleExport("PDF")} className="flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand/90">
            <Download size={14} /> PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: formatXAF(totalRevenue), change: `+${growthPct}%`, positive: true, icon: DollarSign, color: "text-emerald" },
          { label: "Outstanding Invoices", value: formatXAF(outstandingTotal), change: `${OUTSTANDING_INVOICES.length} pending`, positive: false, icon: FileText, color: "text-amber" },
          { label: "Monthly Recurring", value: formatXAF(MRR_DATA[MRR_DATA.length - 1]?.mrr ?? 0), change: "+18.7%", positive: true, icon: RefreshCw, color: "text-brand" },
          { label: "Success Rate", value: `${PAYMENT_STATUS[0]?.pct ?? 0}%`, change: `${PAYMENT_STATUS[0]?.count ?? 0} transactions`, positive: true, icon: TrendingUp, color: "text-emerald" },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{kpi.label}</span>
              <kpi.icon size={16} className={kpi.color} />
            </div>
            <p className="mt-2 text-2xl font-extrabold text-navy">{kpi.value}</p>
            <div className="mt-1 flex items-center gap-1">
              {kpi.positive ? <ArrowUpRight size={12} className="text-emerald" /> : <AlertCircle size={12} className="text-amber" />}
              <span className={`text-xs font-semibold ${kpi.positive ? "text-emerald" : "text-amber"}`}>{kpi.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1">
        {(["overview", "transactions", "invoices", "refunds"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-all ${
              tab === t ? "bg-slate-50 text-navy shadow-sm" : "text-slate-500 hover:text-navy"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ─── Overview Tab ─── */}
      {tab === "overview" && (
        <div className="space-y-6">
          {/* Revenue by Service */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-sm font-bold text-navy">Revenue by Service</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={MONTHLY_REVENUE}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip formatter={(v) => formatXAF(v as number)} />
                <Legend />
                <Area type="monotone" dataKey="consulting" name="Consulting" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
                <Area type="monotone" dataKey="training" name="Training" stackId="1" stroke="#059669" fill="#059669" fillOpacity={0.6} />
                <Area type="monotone" dataKey="software" name="Software" stackId="1" stroke="#D97706" fill="#D97706" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Payment Method Breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 text-sm font-bold text-navy">Revenue by Payment Method</h3>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie data={PAYMENT_METHOD_DATA} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                      {PAYMENT_METHOD_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {PAYMENT_METHOD_DATA.map((m) => (
                    <div key={m.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: m.color }} />
                        <span className="text-xs font-medium text-slate-600">{m.name}</span>
                      </div>
                      <span className="text-xs font-bold text-navy">{m.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Money vs Card vs Other */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 text-sm font-bold text-navy">Payment Channel Split</h3>
              <div className="space-y-4">
                {[
                  { label: "Mobile Money", pct: 71, icon: Smartphone, color: "bg-amber" },
                  { label: "Card Payments", pct: 10, icon: CreditCard, color: "bg-indigo-700" },
                  { label: "Bank & PO", pct: 15, icon: Building2, color: "bg-blue-600" },
                  { label: "Digital Wallets", pct: 4, icon: DollarSign, color: "bg-cyan-500" },
                ].map((ch) => (
                  <div key={ch.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ch.icon size={14} className="text-slate-500" />
                        <span className="text-xs font-semibold text-slate-600">{ch.label}</span>
                      </div>
                      <span className="text-xs font-bold text-navy">{ch.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div className={`h-2 rounded-full ${ch.color}`} style={{ width: `${ch.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* MRR Trend */}
              <h3 className="mb-2 mt-6 text-sm font-bold text-navy">Monthly Recurring Revenue</h3>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={MRR_DATA}>
                  <Area type="monotone" dataKey="mrr" stroke="#2563EB" fill="#2563EB" fillOpacity={0.15} />
                  <Tooltip formatter={(v) => formatXAF(v as number)} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Success/Fail/Pending */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-sm font-bold text-navy">Transaction Status Summary</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {PAYMENT_STATUS.map((s) => (
                <div key={s.status} className={`rounded-xl p-4 ${s.status === "Successful" ? "bg-emerald/5" : s.status === "Pending" ? "bg-amber/5" : "bg-rose/5"}`}>
                  <p className={`text-xs font-bold ${s.status === "Successful" ? "text-emerald" : s.status === "Pending" ? "text-amber" : "text-rose"}`}>{s.status}</p>
                  <p className="mt-1 text-xl font-extrabold text-navy">{s.count}</p>
                  <p className="text-xs text-slate-500">{formatXAF(s.amount)}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                    <div className={`h-1.5 rounded-full ${s.status === "Successful" ? "bg-emerald" : s.status === "Pending" ? "bg-amber" : "bg-rose"}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Summary */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-sm font-bold text-navy">Tax Summary (TVA 19.25%)</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold text-slate-500">Gross Revenue</p>
                <p className="mt-1 text-lg font-extrabold text-navy">{formatXAF(totalRevenue)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">TVA Collected</p>
                <p className="mt-1 text-lg font-extrabold text-navy">{formatXAF(Math.round(totalRevenue * 0.1925))}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Net Revenue (after TVA)</p>
                <p className="mt-1 text-lg font-extrabold text-emerald">{formatXAF(Math.round(totalRevenue * 0.8075))}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Transactions Tab ─── */}
      {tab === "transactions" && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy">Recent Transactions</h3>
            <button className="flex items-center gap-1 text-xs font-semibold text-brand"><Filter size={12} /> Filter</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                  <th className="pb-3 pr-4">Reference</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Method</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs font-semibold text-navy">{tx.id}</td>
                    <td className="py-3 pr-4 font-medium text-navy">{tx.customer}</td>
                    <td className="py-3 pr-4 font-bold text-navy">{formatXAF(tx.amount)}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${methodColors[tx.method] ?? "bg-slate-400"}`}>
                        {methodLabels[tx.method] ?? tx.method}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColors[tx.status] ?? ""}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-slate-500">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── Outstanding Invoices Tab ─── */}
      {tab === "invoices" && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-4 text-sm font-bold text-navy">Outstanding Invoices</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                  <th className="pb-3 pr-4">Invoice</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Due Date</th>
                  <th className="pb-3">Days Until Due</th>
                </tr>
              </thead>
              <tbody>
                {OUTSTANDING_INVOICES.map((inv) => (
                  <tr key={inv.ref} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs font-bold text-brand">{inv.ref}</td>
                    <td className="py-3 pr-4 font-medium text-navy">{inv.customer}</td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold capitalize text-brand">{inv.category}</span>
                    </td>
                    <td className="py-3 pr-4 font-bold text-navy">{formatXAF(inv.amount)}</td>
                    <td className="py-3 pr-4 text-xs text-slate-500">{inv.due}</td>
                    <td className="py-3">
                      <span className={`text-xs font-bold ${inv.days <= 7 ? "text-rose" : inv.days <= 14 ? "text-amber" : "text-slate-500"}`}>
                        {inv.days} days
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-amber/5 px-4 py-3">
            <span className="text-sm font-semibold text-amber">Total Outstanding</span>
            <span className="text-lg font-extrabold text-navy">{formatXAF(outstandingTotal)}</span>
          </div>
        </div>
      )}

      {/* ─── Refunds Tab ─── */}
      {tab === "refunds" && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-4 text-sm font-bold text-navy">Refund Tracking</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                  <th className="pb-3 pr-4">Refund ID</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Reason</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {REFUNDS.map((ref) => (
                  <tr key={ref.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs font-bold text-navy">{ref.id}</td>
                    <td className="py-3 pr-4 font-medium text-navy">{ref.customer}</td>
                    <td className="py-3 pr-4 font-bold text-rose">{formatXAF(ref.amount)}</td>
                    <td className="py-3 pr-4 text-xs text-slate-500">{ref.reason}</td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColors[ref.status] ?? ""}`}>{ref.status}</span>
                    </td>
                    <td className="py-3 text-xs text-slate-500">{ref.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-rose/5 px-4 py-3">
            <span className="text-sm font-semibold text-rose">Total Refunded</span>
            <span className="text-lg font-extrabold text-navy">{formatXAF(REFUNDS.filter(r => r.status === "processed").reduce((s, r) => s + r.amount, 0))}</span>
          </div>
        </div>
      )}
    </div>
  );
}
