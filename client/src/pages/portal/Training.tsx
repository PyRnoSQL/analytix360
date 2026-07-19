import { motion } from "framer-motion";
import { Award } from "lucide-react";

const trainings = [
  { name: "Lean Six Sigma Green Belt", status: "Completed", cert: true, date: "2026-02-15", progress: 100 },
  { name: "Advanced Data Analytics", status: "In Progress", cert: false, date: "2026-07-01", progress: 68 },
  { name: "Project Management Essentials", status: "Enrolled", cert: false, date: "2026-08-15", progress: 0 },
];

export function PortalTraining() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-extrabold text-navy">Training & Certifications</h2>
      <div className="space-y-4">
        {trainings.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold text-navy">{t.name}</p>
                <p className="mt-1 text-xs text-slate-400">{t.status} · Started {t.date}</p>
              </div>
              {t.cert && (
                <button className="flex items-center gap-1.5 rounded-xl bg-emerald px-4 py-2 text-[13px] font-semibold text-white">
                  <Award size={14} /> View Certificate
                </button>
              )}
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs text-slate-400">
                <span>Progress</span>
                <span className="font-bold">{t.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div className={`h-full rounded-full transition-all duration-1000 ${t.progress === 100 ? "bg-emerald" : "bg-brand"}`}
                  style={{ width: `${t.progress}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
