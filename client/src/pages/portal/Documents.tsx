import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

const docs = [
  { name: "Data Pipeline Architecture – Final Report.pdf", size: "2.4 MB", date: "Jun 15, 2026" },
  { name: "Lean Six Sigma – Certificate.pdf", size: "180 KB", date: "Feb 15, 2026" },
  { name: "BI Dashboard – Requirements Specification.docx", size: "890 KB", date: "Jul 01, 2026" },
  { name: "Quality Audit – Findings Summary.pdf", size: "1.1 MB", date: "May 10, 2026" },
  { name: "Service Agreement – 2026.pdf", size: "340 KB", date: "Jan 05, 2026" },
];

export function PortalDocuments() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-extrabold text-navy">Documents</h2>
      <div className="space-y-2">
        {docs.map((doc, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5">
            <FileText size={20} className="text-brand" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy">{doc.name}</p>
              <p className="text-xs text-slate-400">{doc.size} · {doc.date}</p>
            </div>
            <button className="flex items-center gap-1 rounded-lg border-2 border-brand px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand/5">
              <Download size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </>
  );
}
