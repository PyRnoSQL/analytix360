import { motion } from "framer-motion";
import { Briefcase, Receipt, Award, MessageSquare, BookOpen, CheckCircle2 } from "lucide-react";

const cards = [
  { label: "Active Projects", value: "3", icon: Briefcase, color: "text-brand bg-brand/5" },
  { label: "Pending Invoices", value: "2", icon: Receipt, color: "text-amber bg-amber/5" },
  { label: "Certifications", value: "1", icon: Award, color: "text-emerald bg-emerald/5" },
  { label: "Support Tickets", value: "0", icon: MessageSquare, color: "text-slate-400 bg-slate-100" },
];

const activity = [
  { text: "Invoice AE-2026-003 generated", time: "2 hours ago", icon: Receipt, color: "text-brand bg-brand/5" },
  { text: "Data Analytics training – Module 5 completed", time: "1 day ago", icon: BookOpen, color: "text-emerald bg-emerald/5" },
  { text: "Payment received for AE-2026-001", time: "3 days ago", icon: CheckCircle2, color: "text-emerald bg-emerald/5" },
  { text: "New project kickoff: BI Dashboard", time: "1 week ago", icon: Briefcase, color: "text-amber bg-amber/5" },
];

export function PortalDashboard() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-extrabold text-navy">Dashboard</h2>

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">{c.label}</p>
                <p className="mt-1 text-3xl font-extrabold text-navy">{c.value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.color.split(" ").slice(1).join(" ")}`}>
                <c.icon size={20} className={c.color.split(" ")[0]} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-4 font-bold text-navy">Recent Activity</h3>
        {activity.map((a, i) => (
          <div key={i} className={`flex items-center gap-3 py-3 ${i < activity.length - 1 ? "border-b border-slate-100" : ""}`}>
            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${a.color.split(" ").slice(1).join(" ")}`}>
              <a.icon size={16} className={a.color.split(" ")[0]} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-navy">{a.text}</p>
              <p className="text-xs text-slate-400">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
