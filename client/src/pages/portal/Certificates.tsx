import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Download, ExternalLink, ShieldCheck, Clock, BookOpen } from "lucide-react";
import { CertificateTemplate, type CertificateData } from "@/components/certificates/CertificateTemplate";

// Demo certificates — will be fetched from Supabase when connected
const DEMO_CERTS: CertificateData[] = [
  {
    certificateNumber: "AE-CERT-2026-00001",
    recipientName: "Demo User",
    courseTitle: "Advanced Data Pipeline Engineering with Apache Spark",
    courseCategory: "Data & Analytics Engineering",
    courseHours: 120,
    completionDate: "2026-06-15",
    ceoName: "Christian H. Nwinsto",
    ceoTitle: "Chief Executive Officer",
    boardDirectorName: "Dr. Marie-Claire Atangana",
    boardDirectorTitle: "Director, Certification Board",
    verificationUrl: "https://analytix360-production.up.railway.app/verify/AE-CERT-2026-00001",
    verificationHash: "a7f3d2e1b9c84f56a1e2d3f4b5c6a7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4",
    issuedAt: "2026-06-20",
    expiresAt: null,
    skillsDescription: "Those who earn the Advanced Data Pipeline Engineering certificate have completed eight modules developed by Analytix Engineering, that include hands-on, practice-based assessments and are designed to prepare them for senior data engineering roles. They are competent in tools and platforms including Apache Spark, Apache Airflow, dbt, PostgreSQL, and cloud data warehouses. They know how to design, build, test, and maintain production-grade data pipelines for enterprise analytics.",
    courseModules: [
      "Foundations: Data Engineering Principles",
      "Data Modeling & Warehouse Design",
      "Building ETL Pipelines with Python",
      "Apache Spark: Core Concepts & Processing",
      "Workflow Orchestration with Apache Airflow",
      "Data Quality & Testing Frameworks",
      "Cloud Data Platforms (AWS/GCP)",
      "Capstone: End-to-End Pipeline Project",
    ],
  },
  {
    certificateNumber: "AE-CERT-2026-00002",
    recipientName: "Demo User",
    courseTitle: "Lean Six Sigma Green Belt Certification",
    courseCategory: "Quality & Operational Excellence",
    courseHours: 80,
    completionDate: "2026-07-01",
    ceoName: "Christian H. Nwinsto",
    ceoTitle: "Chief Executive Officer",
    boardDirectorName: "Dr. Marie-Claire Atangana",
    boardDirectorTitle: "Director, Certification Board",
    verificationUrl: "https://analytix360-production.up.railway.app/verify/AE-CERT-2026-00002",
    verificationHash: "b8e4c3f2a1d95e67b2f3e4a5c6d7b8e9f0a1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5",
    issuedAt: "2026-07-05",
    expiresAt: "2029-07-05",
    skillsDescription: "Those who earn the Lean Six Sigma Green Belt certificate have completed six modules that include hands-on process improvement projects and statistical analysis assessments. They are competent in DMAIC methodology, process mapping, root cause analysis, statistical process control, and hypothesis testing. They know how to lead improvement projects that reduce waste, improve quality, and drive measurable operational performance gains.",
    courseModules: [
      "Define: Project Charter & Voice of the Customer",
      "Measure: Process Mapping & Data Collection",
      "Analyze: Root Cause Analysis & Statistical Tools",
      "Improve: Solution Design & Pilot Testing",
      "Control: Sustaining Gains & SPC",
      "Green Belt Capstone: Live Improvement Project",
    ],
  },
];

export function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">My Certificates</h1>
        <p className="mt-1 text-sm text-slate-500">
          View, download, and share your training certificates
        </p>
      </div>

      {/* Certificate Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {DEMO_CERTS.map((cert, i) => {
          const isExpired = cert.expiresAt && new Date(cert.expiresAt) < new Date();
          return (
            <motion.div
              key={cert.certificateNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-brand/30 hover:shadow-md"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10">
                    <Award size={20} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">{cert.courseCategory}</p>
                    <h3 className="text-sm font-bold text-navy">{cert.courseTitle}</h3>
                  </div>
                </div>
                {isExpired ? (
                  <span className="rounded-full bg-rose/10 px-2.5 py-1 text-[10px] font-bold text-rose">Expired</span>
                ) : (
                  <span className="rounded-full bg-emerald/10 px-2.5 py-1 text-[10px] font-bold text-emerald">Active</span>
                )}
              </div>

              {/* Details */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-slate-400" />
                  <span className="text-xs text-slate-500">{cert.courseHours} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={13} className="text-slate-400" />
                  <span className="text-xs text-slate-500">
                    {new Date(cert.completionDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Certificate Number */}
              <div className="mt-3 rounded-lg bg-slate-100 px-3 py-2">
                <p className="font-mono text-[11px] text-slate-500">
                  Certificate: <span className="font-bold text-navy">{cert.certificateNumber}</span>
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setSelectedCert(selectedCert?.certificateNumber === cert.certificateNumber ? null : cert)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white hover:bg-brand/90"
                >
                  <Download size={14} />
                  {selectedCert?.certificateNumber === cert.certificateNumber ? "Hide" : "View & Download"}
                </button>
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-navy hover:bg-slate-100"
                >
                  <ShieldCheck size={14} /> Verify
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(cert.verificationUrl);
                    alert("Verification link copied to clipboard!");
                  }}
                  className="flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-navy hover:bg-slate-100"
                  title="Copy share link"
                >
                  <ExternalLink size={14} />
                </button>
              </div>

              {/* Certificate Preview */}
              {selectedCert?.certificateNumber === cert.certificateNumber && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white p-4"
                >
                  <CertificateTemplate data={cert} showControls={true} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Empty state if no certificates */}
      {DEMO_CERTS.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
          <Award size={40} className="mx-auto text-slate-300" />
          <h3 className="mt-4 text-lg font-bold text-navy">No Certificates Yet</h3>
          <p className="mt-2 text-sm text-slate-500">
            Complete a training program to receive your certificate.
          </p>
        </div>
      )}

      {/* Info */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck size={18} className="mt-0.5 flex-shrink-0 text-emerald" />
          <div>
            <p className="text-sm font-bold text-navy">Certificate Security</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Every certificate is cryptographically signed with SHA-512 and includes a QR code
              for instant verification. Employers and institutions can verify authenticity at{" "}
              <a href="/verify" className="font-semibold text-brand hover:underline">analytix-eng.com/verify</a>.
              Certificates are tamper-proof and permanently recorded in our secure ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
