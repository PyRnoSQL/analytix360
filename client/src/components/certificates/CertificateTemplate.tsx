import { QRCodeSVG } from "qrcode.react";
import { Download, Shield } from "lucide-react";

export interface CertificateData {
  certificateNumber: string;
  recipientName: string;
  courseTitle: string;
  courseCategory: string;
  courseHours: number;
  completionDate: string;
  ceoName: string;
  ceoTitle: string;
  boardDirectorName: string;
  boardDirectorTitle: string;
  verificationUrl: string;
  verificationHash: string;
  issuedAt: string;
  expiresAt?: string | null;
}

interface Props {
  data: CertificateData;
  onDownload?: () => void;
  showControls?: boolean;
}

export function CertificateTemplate({ data, onDownload, showControls = true }: Props) {
  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(data.completionDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedIssueDate = new Date(data.issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Controls — hidden during print */}
      {showControls && (
        <div className="mb-6 flex items-center justify-center gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand/90"
          >
            <Download size={16} /> Download PDF
          </button>
          {onDownload && (
            <button
              onClick={onDownload}
              className="flex items-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
            >
              <Shield size={16} /> Verify Certificate
            </button>
          )}
        </div>
      )}

      {/* Certificate — 297mm × 210mm (A4 Landscape) */}
      <div
        id="certificate-content"
        className="relative mx-auto overflow-hidden bg-white shadow-2xl print:shadow-none"
        style={{ width: "297mm", maxWidth: "100%", aspectRatio: "297 / 210" }}
      >
        {/* ─── Ornamental Border ─── */}
        <div className="absolute inset-0">
          {/* Outer gold border */}
          <div className="absolute inset-[8px] border-[3px] border-[#C9A84C]" />
          {/* Inner navy border */}
          <div className="absolute inset-[14px] border-[1.5px] border-[#0F172A]" />
          {/* Inner gold border */}
          <div className="absolute inset-[18px] border-[0.5px] border-[#C9A84C]/40" />

          {/* Corner ornaments */}
          {[
            "top-[10px] left-[10px]",
            "top-[10px] right-[10px] rotate-90",
            "bottom-[10px] right-[10px] rotate-180",
            "bottom-[10px] left-[10px] -rotate-90",
          ].map((pos, i) => (
            <div key={i} className={`absolute ${pos}`}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M5 5 L25 5 L25 8 L8 8 L8 25 L5 25 Z" fill="#C9A84C" />
                <path d="M5 5 L15 5 L15 7 L7 7 L7 15 L5 15 Z" fill="#0F172A" />
              </svg>
            </div>
          ))}

          {/* Subtle watermark pattern */}
          <div className="absolute inset-[30px] opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 L35 20 L20 35 L5 20Z' fill='none' stroke='%230F172A' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }} />
        </div>

        {/* ─── Certificate Content ─── */}
        <div className="relative flex h-full flex-col items-center justify-between px-[60px] py-[40px]">

          {/* Top: Logo + Title */}
          <div className="text-center">
            <img
              src="/logo.png"
              alt="Analytix Engineering SARL"
              className="mx-auto mb-2 h-[50px] w-auto"
            />
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
              Une filiale de Opes-Analytica LLC
            </p>
          </div>

          {/* Certificate Title */}
          <div className="text-center">
            <h1
              className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#0F172A]"
              style={{ letterSpacing: "0.4em" }}
            >
              Certificate of Completion
            </h1>
            <div className="mx-auto mt-2 h-[2px] w-[200px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
            <p className="mt-3 text-[9px] text-[#64748B]">
              This is to certify that
            </p>
          </div>

          {/* Recipient Name */}
          <div className="text-center">
            <h2
              className="text-[32px] font-light text-[#0F172A]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {data.recipientName}
            </h2>
            <div className="mx-auto mt-1 h-[1px] w-[300px] bg-[#C9A84C]/30" />
          </div>

          {/* Course Details */}
          <div className="max-w-[500px] text-center">
            <p className="text-[9px] leading-relaxed text-[#64748B]">
              has successfully completed all requirements for the professional training program
            </p>
            <h3 className="mt-2 text-[16px] font-bold text-[#1E3A8A]">
              {data.courseTitle}
            </h3>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
              {data.courseCategory}
            </p>
            <p className="mt-2 text-[9px] text-[#64748B]">
              comprising {data.courseHours} hours of instruction, assessment, and practical application
            </p>
            <p className="mt-1 text-[9px] text-[#64748B]">
              Completed on <span className="font-semibold text-[#0F172A]">{formattedDate}</span>
            </p>
          </div>

          {/* Signatures */}
          <div className="flex w-full max-w-[500px] items-end justify-between">
            {/* CEO Signature */}
            <div className="text-center">
              <div className="mb-1 h-[30px] flex items-end justify-center">
                <svg width="120" height="25" viewBox="0 0 120 25" className="opacity-70">
                  <path
                    d="M5 20 Q15 5, 30 15 T55 10 Q65 5, 75 18 T100 12 L115 15"
                    fill="none" stroke="#0F172A" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="h-[1px] w-[140px] bg-[#0F172A]" />
              <p className="mt-1 text-[9px] font-bold text-[#0F172A]">{data.ceoName}</p>
              <p className="text-[7px] text-[#64748B]">{data.ceoTitle}</p>
            </div>

            {/* Seal / Emblem */}
            <div className="flex flex-col items-center">
              <div className="flex h-[55px] w-[55px] items-center justify-center rounded-full border-[2px] border-[#C9A84C] bg-[#C9A84C]/5">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-[1px] border-[#C9A84C]/60">
                  <div className="text-center">
                    <p className="text-[5px] font-bold uppercase tracking-[0.15em] text-[#C9A84C]">Analytix</p>
                    <p className="text-[4px] font-semibold text-[#C9A84C]/70">CERTIFIED</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Board Director Signature */}
            <div className="text-center">
              <div className="mb-1 h-[30px] flex items-end justify-center">
                <svg width="120" height="25" viewBox="0 0 120 25" className="opacity-70">
                  <path
                    d="M10 18 Q25 3, 40 15 T65 8 Q80 5, 90 20 L110 10"
                    fill="none" stroke="#0F172A" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="h-[1px] w-[140px] bg-[#0F172A]" />
              <p className="mt-1 text-[9px] font-bold text-[#0F172A]">{data.boardDirectorName}</p>
              <p className="text-[7px] text-[#64748B]">{data.boardDirectorTitle}</p>
            </div>
          </div>

          {/* Bottom: Verification QR + Certificate Info */}
          <div className="flex w-full max-w-[580px] items-end justify-between">
            {/* QR Code */}
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-1.5">
                <QRCodeSVG
                  value={data.verificationUrl}
                  size={50}
                  level="M"
                  bgColor="#FFFFFF"
                  fgColor="#0F172A"
                />
              </div>
              <div>
                <p className="text-[7px] font-semibold text-[#64748B]">Scan to verify</p>
                <p className="text-[6px] text-[#94A3B8]">or visit analytix-eng.com/verify</p>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="text-right">
              <p className="text-[7px] text-[#94A3B8]">
                Certificate No: <span className="font-bold text-[#0F172A]">{data.certificateNumber}</span>
              </p>
              <p className="text-[7px] text-[#94A3B8]">
                Issued: <span className="font-semibold text-[#64748B]">{formattedIssueDate}</span>
              </p>
              {data.expiresAt && (
                <p className="text-[7px] text-[#94A3B8]">
                  Valid until: <span className="font-semibold text-[#64748B]">
                    {new Date(data.expiresAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                  </span>
                </p>
              )}
              <p className="mt-0.5 text-[5px] font-mono text-[#CBD5E1]">
                SHA-512: {data.verificationHash.substring(0, 24)}...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body * { visibility: hidden; }
          #certificate-content,
          #certificate-content * {
            visibility: visible;
          }
          #certificate-content {
            position: fixed;
            top: 0;
            left: 0;
            width: 297mm;
            height: 210mm;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
