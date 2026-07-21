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
  skillsDescription?: string;
  courseModules?: string[];
}

interface Props {
  data: CertificateData;
  onDownload?: () => void;
  showControls?: boolean;
}

export function CertificateTemplate({ data, onDownload, showControls = true }: Props) {
  const handlePrint = () => window.print();

  const formattedDate = new Date(data.completionDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div>
      {/* Controls — hidden during print */}
      {showControls && (
        <div className="mb-6 flex items-center justify-center gap-4 print:hidden">
          <button onClick={handlePrint} className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand/90">
            <Download size={16} /> Download PDF
          </button>
          {onDownload && (
            <button onClick={onDownload} className="flex items-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-navy hover:bg-slate-50">
              <Shield size={16} /> Verify Certificate
            </button>
          )}
        </div>
      )}

      {/* Certificate — A4 Landscape */}
      <div
        id="certificate-content"
        className="relative mx-auto overflow-hidden bg-white shadow-2xl print:shadow-none"
        style={{ width: "297mm", maxWidth: "100%", aspectRatio: "297 / 210" }}
      >
        {/* Background watermark */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40Z' fill='none' stroke='%230F172A' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }} />

        <div className="relative flex h-full">

          {/* ═══ LEFT SIDEBAR — Course Modules ═══ */}
          <div className="flex w-[210px] flex-shrink-0 flex-col bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] px-[20px] py-[30px]">
            {/* Certification badge */}
            <div className="mb-[16px] text-center">
              <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full border-[2px] border-[#C9A84C]/60">
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-[1px] border-[#C9A84C]/30 bg-[#C9A84C]/10">
                  <div className="text-center">
                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Analytix</p>
                    <p className="text-[10px] font-extrabold text-white">AE</p>
                    <p className="text-[5px] font-bold uppercase tracking-[0.15em] text-[#C9A84C]/70">Certified</p>
                  </div>
                </div>
              </div>
              <p className="mt-[8px] text-[7px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
                Professional
              </p>
              <p className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
                Certificate
              </p>
            </div>

            {/* Course count */}
            {data.courseModules && data.courseModules.length > 0 && (
              <>
                <div className="mb-[10px] rounded-lg bg-[#2563EB] px-[10px] py-[6px]">
                  <p className="text-[10px] font-extrabold text-white">
                    {data.courseModules.length} Modules
                  </p>
                </div>

                {/* Module list */}
                <div className="flex-1 space-y-[6px]">
                  {data.courseModules.map((mod, i) => (
                    <p key={i} className="text-[7px] font-semibold leading-[1.4] text-white/80">
                      {mod}
                    </p>
                  ))}
                </div>
              </>
            )}

            {/* Hours badge */}
            <div className="mt-auto rounded-lg bg-white/10 px-[10px] py-[6px] text-center">
              <p className="text-[8px] font-bold text-white">{data.courseHours} Hours</p>
              <p className="text-[6px] text-white/50">of instruction</p>
            </div>
          </div>

          {/* ═══ MAIN CONTENT ═══ */}
          <div className="flex flex-1 flex-col justify-between px-[40px] py-[30px]" style={{ backgroundColor: "#F5F0E8" }}>

            {/* Top: Logo */}
            <div>
              <img
                src="/logo.png"
                alt="Analytix Engineering SARL"
                className="h-[45px] w-auto"
              />
            </div>

            {/* Date */}
            <p className="mt-[14px] text-[12px] text-[#64748B]">{formattedDate}</p>

            {/* Recipient Name */}
            <h2
              className="mt-[6px] text-[28px] font-extrabold tracking-tight text-[#0F172A]"
            >
              {data.recipientName}
            </h2>

            <p className="mt-[6px] text-[11px] text-[#64748B]">
              has successfully completed the professional training program
            </p>

            {/* Course Title */}
            <h1
              className="mt-[10px] text-[32px] font-extrabold leading-[1.15] text-[#0F172A]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {data.courseTitle}
            </h1>

            {/* Skills Description */}
            {data.skillsDescription && (
              <p className="mt-[12px] max-w-[480px] text-[9px] leading-[1.7] text-[#475569]">
                {data.skillsDescription}
              </p>
            )}

            {/* Bottom: Disclaimer + Board signature + Verify */}
            <div className="mt-auto flex items-end justify-between">
              {/* Disclaimer */}
              <div className="max-w-[320px]">
                <p className="text-[6.5px] leading-[1.6] text-[#94A3B8]">
                  This professional certificate was issued by Analytix Engineering SARL upon successful
                  completion of all required coursework, assessments, and practical exercises. This certificate
                  does not confer academic credit or a university degree. It attests to the holder's demonstrated
                  competency in the subject matter as evaluated by Analytix Engineering's Certification Board.
                </p>
              </div>

              {/* Board Director Signature + Verify */}
              <div className="text-right">
                {/* Board signature */}
                <svg width="110" height="25" viewBox="0 0 110 25" className="ml-auto opacity-70">
                  <path
                    d="M5 18 Q20 3, 38 14 T62 8 Q75 4, 88 19 L105 10"
                    fill="none" stroke="#0F172A" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-[2px] text-[9px] font-bold text-[#0F172A]">{data.boardDirectorName}</p>
                <p className="text-[7px] text-[#64748B]">{data.boardDirectorTitle}</p>

                {/* Verification */}
                <div className="mt-[10px] flex items-center justify-end gap-[8px]">
                  <div>
                    <p className="text-[7px] font-semibold text-[#64748B]">Verify this certificate at:</p>
                    <p className="text-[7px] font-bold text-[#2563EB]">analytix-eng.com/verify</p>
                    <p className="mt-[2px] font-mono text-[6px] text-[#CBD5E1]">
                      ID: {data.certificateNumber}
                    </p>
                  </div>
                  <div className="rounded-md border border-[#E2E8F0] bg-white p-[3px]">
                    <QRCodeSVG
                      value={data.verificationUrl}
                      size={45}
                      level="M"
                      bgColor="#FFFFFF"
                      fgColor="#0F172A"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          body { margin: 0; padding: 0; }
          body > *:not(#certificate-content) { display: none !important; }
          .print\\:hidden { display: none !important; }
          #certificate-content {
            position: fixed; top: 0; left: 0;
            width: 297mm !important; height: 210mm !important;
            box-shadow: none !important;
            overflow: hidden;
          }
          #certificate-content * {
            visibility: visible;
          }
          #certificate-content div, #certificate-content p, #certificate-content h1, #certificate-content h2, #certificate-content span {
            font-size: inherit !important;
            line-height: inherit !important;
          }
        }
      `}</style>
    </div>
  );
}
