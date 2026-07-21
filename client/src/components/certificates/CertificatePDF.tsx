import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
  Svg,
  Path,
  pdf,
} from "@react-pdf/renderer";
import QRCode from "qrcode";
import type { CertificateData } from "./CertificateTemplate";

// ─── Fonts ───
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.ttf", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.ttf", fontWeight: 700 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYAZ9hjQ.ttf", fontWeight: 800 },
  ],
});

Font.register({
  family: "Tinos",
  fonts: [
    { src: "https://fonts.gstatic.com/s/tinos/v24/buE4poGnedXvwgX8dGVh8TI-.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/tinos/v24/buE1poGnedXvwj1AW0Fp2i43-cxL.ttf", fontWeight: 700 },
  ],
});

Font.register({
  family: "monospace",
  src: "https://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_ROW4.ttf",
});

// A4 Landscape = 842 x 595 points
const s = StyleSheet.create({
  page: { flexDirection: "row", backgroundColor: "#FFFFFF" },

  // LEFT SIDEBAR
  sidebar: {
    width: 185,
    backgroundColor: "#0F172A",
    paddingVertical: 28,
    paddingHorizontal: 18,
    flexDirection: "column",
  },
  badgeOuter: {
    width: 70, height: 70, borderRadius: 35,
    borderWidth: 2, borderColor: "#C9A84C99",
    alignSelf: "center", justifyContent: "center", alignItems: "center",
    marginBottom: 8,
  },
  badgeInner: {
    width: 54, height: 54, borderRadius: 27,
    borderWidth: 1, borderColor: "#C9A84C50",
    backgroundColor: "#C9A84C15",
    justifyContent: "center", alignItems: "center",
  },
  badgeTextTop: { fontSize: 6, color: "#C9A84C", fontFamily: "Inter", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center" },
  badgeTextMid: { fontSize: 12, color: "#FFFFFF", fontFamily: "Inter", fontWeight: 800, textAlign: "center" },
  badgeTextBot: { fontSize: 5, color: "#C9A84C99", fontFamily: "Inter", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", textAlign: "center" },
  profCert: { fontSize: 7, color: "#C9A84C", fontFamily: "Inter", fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", textAlign: "center", marginBottom: 2 },
  moduleBadge: { backgroundColor: "#2563EB", borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, marginTop: 14 },
  moduleBadgeText: { fontSize: 9, color: "#FFFFFF", fontFamily: "Inter", fontWeight: 800 },
  moduleItem: { fontSize: 7.5, color: "#FFFFFFCC", fontFamily: "Inter", fontWeight: 600, marginBottom: 5, lineHeight: 1.4 },
  hoursBadge: { backgroundColor: "#FFFFFF15", borderRadius: 5, paddingVertical: 6, paddingHorizontal: 10, marginTop: "auto", alignItems: "center" },
  hoursText: { fontSize: 9, color: "#FFFFFF", fontFamily: "Inter", fontWeight: 700 },
  hoursLabel: { fontSize: 6, color: "#FFFFFF80", fontFamily: "Inter" },

  // MAIN CONTENT
  main: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    paddingTop: 28,
    paddingBottom: 22,
    paddingHorizontal: 36,
    flexDirection: "column",
  },

  logo: { width: 130, height: 38, objectFit: "contain" as const },

  // Center section — grows to fill and centers content
  centerSection: {
    flex: 1,
    justifyContent: "center",
  },

  date: { fontSize: 13, color: "#64748B", fontFamily: "Inter" },
  recipientName: { fontSize: 30, color: "#0F172A", fontFamily: "Inter", fontWeight: 800, marginTop: 4 },
  completionText: { fontSize: 11, color: "#64748B", fontFamily: "Inter", marginTop: 5 },
  courseTitle: { fontSize: 32, color: "#0F172A", fontFamily: "Tinos", fontWeight: 700, marginTop: 8, lineHeight: 1.15 },
  skillsDesc: { fontSize: 9.5, color: "#475569", fontFamily: "Inter", marginTop: 12, lineHeight: 1.7, maxWidth: 480 },

  // Signature row
  sigRow: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 12 },
  sigBlock: { alignItems: "flex-end" },
  sigName: { fontSize: 10, color: "#0F172A", fontFamily: "Inter", fontWeight: 700, marginTop: 2 },
  sigTitle: { fontSize: 8, color: "#64748B", fontFamily: "Inter" },

  // Footer
  footerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  disclaimer: { fontSize: 6.5, color: "#94A3B8", fontFamily: "Inter", lineHeight: 1.6, maxWidth: 310 },
  verifyArea: { flexDirection: "row", alignItems: "flex-end", gap: 6 },
  verifyText: { alignItems: "flex-end" },
  verifyLabel: { fontSize: 7.5, color: "#64748B", fontFamily: "Inter", fontWeight: 600 },
  verifyUrl: { fontSize: 7.5, color: "#2563EB", fontFamily: "Inter", fontWeight: 700 },
  certId: { fontSize: 6.5, color: "#CBD5E1", fontFamily: "Inter", marginTop: 1 },
  qrImage: { width: 48, height: 48 },
});

function SignatureSVG() {
  return (
    <Svg width={110} height={24} viewBox="0 0 120 25">
      <Path d="M5 18 Q20 3, 38 14 T62 8 Q75 4, 88 19 L105 10" fill="none" stroke="#0F172A" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CertificatePDFDocument({ data, logoUrl, qrUrl, hostUrl }: { data: CertificateData; logoUrl: string; qrUrl: string; hostUrl: string }) {
  const formattedDate = new Date(data.completionDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <Document title={`${data.recipientName} - ${data.courseTitle}`} author="Analytix Engineering SARL">
      <Page size="A4" orientation="landscape" style={s.page}>

        {/* LEFT SIDEBAR */}
        <View style={s.sidebar}>
          <View style={s.badgeOuter}>
            <View style={s.badgeInner}>
              <Text style={s.badgeTextTop}>Analytix</Text>
              <Text style={s.badgeTextMid}>AE</Text>
              <Text style={s.badgeTextBot}>Certified</Text>
            </View>
          </View>
          <Text style={s.profCert}>Professional</Text>
          <Text style={s.profCert}>Certificate</Text>
          {data.courseModules && data.courseModules.length > 0 && (
            <>
              <View style={s.moduleBadge}>
                <Text style={s.moduleBadgeText}>{data.courseModules.length} Modules</Text>
              </View>
              {data.courseModules.map((mod, i) => (
                <Text key={i} style={s.moduleItem}>{mod}</Text>
              ))}
            </>
          )}
          <View style={s.hoursBadge}>
            <Text style={s.hoursText}>{data.courseHours} Hours</Text>
            <Text style={s.hoursLabel}>of instruction</Text>
          </View>
        </View>

        {/* MAIN CONTENT */}
        <View style={s.main}>
          {/* Top: Logo */}
          {logoUrl ? (
            <Image src={logoUrl} style={s.logo} />
          ) : (
            <Text style={{ fontSize: 13, fontFamily: "Inter", fontWeight: 700, color: "#0F172A" }}>Analytix Engineering SARL</Text>
          )}

          {/* Center: vertically centered content */}
          <View style={s.centerSection}>
            <Text style={s.date}>{formattedDate}</Text>
            <Text style={s.recipientName}>{data.recipientName}</Text>
            <Text style={s.completionText}>has successfully completed the professional training program</Text>
            <Text style={s.courseTitle}>{data.courseTitle}</Text>
            {data.skillsDescription && (
              <Text style={s.skillsDesc}>{data.skillsDescription}</Text>
            )}
          </View>

          {/* Bottom: Signature + Footer */}
          <View style={s.sigRow}>
            <View style={s.sigBlock}>
              <SignatureSVG />
              <Text style={s.sigName}>{data.boardDirectorName}</Text>
              <Text style={s.sigTitle}>{data.boardDirectorTitle}</Text>
            </View>
          </View>

          <View style={s.footerRow}>
            <Text style={s.disclaimer}>
              This professional certificate was issued by Analytix Engineering SARL upon successful completion of all required coursework, assessments, and practical exercises. This certificate does not confer academic credit or a university degree. It attests to the holder's demonstrated competency in the subject matter as evaluated by Analytix Engineering's Certification Board.
            </Text>
            <View style={s.verifyArea}>
              <View style={s.verifyText}>
                <Text style={s.verifyLabel}>Verify this certificate at:</Text>
                <Text style={s.verifyUrl}>{hostUrl}/verify</Text>
                <Text style={s.certId}>ID: {data.certificateNumber}</Text>
              </View>
              {qrUrl ? <Image src={qrUrl} style={s.qrImage} /> : null}
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
}

// ─── Export ───
export async function generateCertificatePDF(data: CertificateData): Promise<void> {
  // Load logo as base64
  let logoUrl = "";
  try {
    const res = await fetch(`${window.location.origin}/logo.png`);
    if (res.ok) {
      const blob = await res.blob();
      logoUrl = await new Promise<string>((resolve) => {
        const r = new FileReader();
        r.onloadend = () => resolve(r.result as string);
        r.readAsDataURL(blob);
      });
    }
  } catch (e) {
    console.warn("Logo load failed:", e);
  }

  // Generate real QR code as data URL
  let qrUrl = "";
  try {
    const fullVerifyUrl = data.verificationUrl.startsWith("http")
      ? data.verificationUrl
      : `${window.location.origin}${data.verificationUrl}`;
    qrUrl = await QRCode.toDataURL(fullVerifyUrl, {
      width: 200,
      margin: 1,
      color: { dark: "#0F172A", light: "#FFFFFF" },
      errorCorrectionLevel: "M",
    });
  } catch (e) {
    console.warn("QR generation failed:", e);
  }

  const hostUrl = window.location.host;

  const blob = await pdf(
    <CertificatePDFDocument data={data} logoUrl={logoUrl} qrUrl={qrUrl} hostUrl={hostUrl} />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.certificateNumber}_${data.recipientName.replace(/\s+/g, "_")}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
