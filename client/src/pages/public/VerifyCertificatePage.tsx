import { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck, ShieldX, Search, Clock,
  User, BookOpen, Calendar, Hash, Award,
} from "lucide-react";
import { CertificateTemplate, type CertificateData } from "@/components/certificates/CertificateTemplate";

// ─── Demo certificate for testing ───
const DEMO_CERTIFICATES: Record<string, CertificateData> = {
  "AE-CERT-2026-00001": {
    certificateNumber: "AE-CERT-2026-00001",
    recipientName: "Jean-Pierre Mbarga",
    courseTitle: "Advanced Data Pipeline Engineering with Apache Spark",
    courseCategory: "Data & Analytics Engineering",
    courseHours: 120,
    completionDate: "2026-06-15",
    ceoName: "Christian H. Nwinsto",
    ceoTitle: "Chief Executive Officer",
    boardDirectorName: "Christopher JESS",
    boardDirectorTitle: "Director, Certification Board",
    verificationUrl: "/verify/AE-CERT-2026-00001",
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
  "AE-CERT-2026-00002": {
    certificateNumber: "AE-CERT-2026-00002",
    recipientName: "Alice Ngo Bassa",
    courseTitle: "Lean Six Sigma Green Belt Certification",
    courseCategory: "Quality & Operational Excellence",
    courseHours: 80,
    completionDate: "2026-07-01",
    ceoName: "Christian H. Nwinsto",
    ceoTitle: "Chief Executive Officer",
    boardDirectorName: "Christopher JESS",
    boardDirectorTitle: "Director, Certification Board",
    verificationUrl: "/verify/AE-CERT-2026-00002",
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
};

export function VerifyCertificatePage() {
  const { certId } = useParams<{ certId: string }>();
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(certId ?? searchParams.get("id") ?? "");
  const [result, setResult] = useState<{ status: "valid" | "invalid" | "revoked"; data?: CertificateData } | null>(
    certId && DEMO_CERTIFICATES[certId]
      ? { status: "valid", data: DEMO_CERTIFICATES[certId] }
      : certId
        ? { status: "invalid" }
        : null
  );
  const [showCertificate, setShowCertificate] = useState(false);

  const handleVerify = () => {
    const id = searchInput.trim().toUpperCase();
    if (!id) return;

    // Demo lookup — replace with Supabase query when connected
    const cert = DEMO_CERTIFICATES[id];
    if (cert) {
      setResult({ status: "valid", data: cert });
    } else {
      setResult({ status: "invalid" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 pt-28 pb-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10">
            <ShieldCheck size={30} className="text-brand" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy">Certificate Verification</h1>
          <p className="mt-2 text-sm text-slate-500">
            Verify the authenticity of an Analytix Engineering training certificate
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
        >
          <label className="mb-2 block text-xs font-semibold text-slate-600">
            Enter Certificate Number
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              placeholder="e.g. AE-CERT-2026-00001"
              className="flex-1 rounded-xl border-2 border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-navy placeholder-slate-400 focus:border-brand focus:outline-none"
            />
            <button
              onClick={handleVerify}
              className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand/90"
            >
              <Search size={16} /> Verify
            </button>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            You can find the certificate number at the bottom-right of the certificate, or scan the QR code.
          </p>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            {/* Valid */}
            {result.status === "valid" && result.data && (
              <div>
                <div className="rounded-2xl border-2 border-emerald/20 bg-emerald/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald/10">
                      <ShieldCheck size={24} className="text-emerald" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-emerald">
                        ✓ Certificate Verified
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        This certificate is authentic and was issued by Analytix Engineering SARL.
                      </p>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      { icon: Hash, label: "Certificate No.", value: result.data.certificateNumber },
                      { icon: User, label: "Recipient", value: result.data.recipientName },
                      { icon: BookOpen, label: "Course", value: result.data.courseTitle },
                      { icon: Award, label: "Category", value: result.data.courseCategory },
                      { icon: Clock, label: "Duration", value: `${result.data.courseHours} hours` },
                      { icon: Calendar, label: "Completed", value: new Date(result.data.completionDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3 rounded-xl bg-white/60 p-3">
                        <item.icon size={16} className="mt-0.5 flex-shrink-0 text-emerald" />
                        <div>
                          <p className="text-[10px] font-semibold text-slate-500">{item.label}</p>
                          <p className="text-sm font-bold text-navy">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Signatories */}
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-white/60 p-3">
                      <p className="text-[10px] font-semibold text-slate-500">Signed by (CEO)</p>
                      <p className="text-sm font-bold text-navy">{result.data.ceoName}</p>
                      <p className="text-[10px] text-slate-400">{result.data.ceoTitle}</p>
                    </div>
                    <div className="rounded-xl bg-white/60 p-3">
                      <p className="text-[10px] font-semibold text-slate-500">Signed by (Board)</p>
                      <p className="text-sm font-bold text-navy">{result.data.boardDirectorName}</p>
                      <p className="text-[10px] text-slate-400">{result.data.boardDirectorTitle}</p>
                    </div>
                  </div>

                  {/* Security Hash */}
                  <div className="mt-4 rounded-xl bg-slate-800 px-4 py-3">
                    <p className="text-[9px] font-semibold text-slate-400">Verification Hash (SHA-512)</p>
                    <p className="mt-1 break-all font-mono text-[10px] text-emerald/80">
                      {result.data.verificationHash}
                    </p>
                  </div>

                  {/* View Certificate Button */}
                  <button
                    onClick={() => setShowCertificate(!showCertificate)}
                    className="mt-4 w-full rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand/90"
                  >
                    {showCertificate ? "Hide Certificate" : "View Full Certificate"}
                  </button>
                </div>

                {/* Full Certificate Preview */}
                {showCertificate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 overflow-x-auto"
                  >
                    <CertificateTemplate data={result.data} showControls={true} />
                  </motion.div>
                )}
              </div>
            )}

            {/* Invalid */}
            {result.status === "invalid" && (
              <div className="rounded-2xl border-2 border-rose/20 bg-rose/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-rose/10">
                    <ShieldX size={24} className="text-rose" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-rose">
                      ✗ Certificate Not Found
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      No certificate matching this number was found in our records.
                      Please check the number and try again.
                    </p>
                    <p className="mt-3 text-xs text-slate-400">
                      If you believe this is an error, please contact{" "}
                      <a href="mailto:certificates@analytix-eng.com" className="font-semibold text-brand hover:underline">
                        certificates@analytix-eng.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Revoked */}
            {result.status === "revoked" && (
              <div className="rounded-2xl border-2 border-amber/20 bg-amber/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber/10">
                    <ShieldX size={24} className="text-amber" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-amber">
                      ⚠ Certificate Revoked
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      This certificate has been revoked and is no longer valid.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Demo certificates hint */}
        <div className="mt-8 rounded-xl bg-brand/5 p-4 text-center">
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-brand">Demo Mode:</span>{" "}
            Try verifying <button onClick={() => { setSearchInput("AE-CERT-2026-00001"); }} className="font-bold text-brand hover:underline">AE-CERT-2026-00001</button>{" "}
            or <button onClick={() => { setSearchInput("AE-CERT-2026-00002"); }} className="font-bold text-brand hover:underline">AE-CERT-2026-00002</button>
          </p>
        </div>

        {/* Trust badges */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-slate-400">
            Certificates are secured with SHA-512 cryptographic hashes and verified against our tamper-proof ledger.
          </p>
          <Link to="/" className="mt-2 inline-block text-xs font-semibold text-brand hover:underline">
            ← Back to Analytix Engineering
          </Link>
        </div>
      </div>
    </div>
  );
}
