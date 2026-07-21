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
import type { CertificateData } from "./CertificateTemplate";

// ─── Register Fonts ───
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
  family: "Georgia",
  src: "https://fonts.gstatic.com/s/tinos/v24/buE4poGnedXvwgX8dGVh8TI-.ttf",
});

// ─── Styles ───
const s = StyleSheet.create({
  page: { flexDirection: "row", backgroundColor: "#FFFFFF" },

  // Left sidebar
  sidebar: {
    width: "22%",
    backgroundColor: "#0F172A",
    paddingVertical: 25,
    paddingHorizontal: 16,
    flexDirection: "column",
  },
  badgeOuter: {
    width: 60, height: 60, borderRadius: 30,
    borderWidth: 2, borderColor: "#C9A84C99",
    alignSelf: "center", justifyContent: "center", alignItems: "center",
    marginBottom: 6,
  },
  badgeInner: {
    width: 48, height: 48, borderRadius: 24,
    borderWidth: 1, borderColor: "#C9A84C50",
    backgroundColor: "#C9A84C15",
    justifyContent: "center", alignItems: "center",
  },
  badgeTextTop: { fontSize: 5.5, color: "#C9A84C", fontFamily: "Inter", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" },
  badgeTextMiddle: { fontSize: 10, color: "#FFFFFF", fontFamily: "Inter", fontWeight: 800 },
  badgeTextBottom: { fontSize: 4.5, color: "#C9A84C99", fontFamily: "Inter", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" },
  profCert: { fontSize: 6, color: "#C9A84C", fontFamily: "Inter", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 2 },
  moduleBadge: {
    backgroundColor: "#2563EB", borderRadius: 5,
    paddingVertical: 5, paddingHorizontal: 8,
    marginBottom: 8, marginTop: 10,
  },
  moduleBadgeText: { fontSize: 9, color: "#FFFFFF", fontFamily: "Inter", fontWeight: 800 },
  moduleItem: { fontSize: 6.5, color: "#FFFFFFCC", fontFamily: "Inter", fontWeight: 600, marginBottom: 5, lineHeight: 1.4 },
  hoursBadge: {
    backgroundColor: "#FFFFFF15", borderRadius: 5,
    paddingVertical: 5, paddingHorizontal: 8,
    marginTop: "auto", alignItems: "center",
  },
  hoursText: { fontSize: 8, color: "#FFFFFF", fontFamily: "Inter", fontWeight: 700 },
  hoursLabel: { fontSize: 5.5, color: "#FFFFFF80", fontFamily: "Inter" },

  // Main content
  main: {
    width: "78%",
    backgroundColor: "#F5F0E8",
    paddingVertical: 25,
    paddingHorizontal: 35,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  logo: { width: 120, height: 35 },
  sigBlock: { alignItems: "flex-end" },
  sigName: { fontSize: 9, color: "#0F172A", fontFamily: "Inter", fontWeight: 700, marginTop: 2 },
  sigTitle: { fontSize: 7, color: "#64748B", fontFamily: "Inter" },

  date: { fontSize: 11, color: "#64748B", fontFamily: "Inter", marginTop: 12 },
  recipientName: { fontSize: 26, color: "#0F172A", fontFamily: "Inter", fontWeight: 800, marginTop: 4 },
  completionText: { fontSize: 10, color: "#64748B", fontFamily: "Inter", marginTop: 5 },
  courseTitle: { fontSize: 28, color: "#0F172A", fontFamily: "Georgia", marginTop: 8, lineHeight: 1.2 },
  skillsDesc: { fontSize: 8.5, color: "#475569", fontFamily: "Inter", marginTop: 10, lineHeight: 1.7, maxWidth: 420 },

  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  disclaimer: { fontSize: 6, color: "#94A3B8", fontFamily: "Inter", lineHeight: 1.6, maxWidth: 280 },
  verifyBlock: { alignItems: "flex-end" },
  verifyLabel: { fontSize: 6.5, color: "#64748B", fontFamily: "Inter", fontWeight: 600 },
  verifyUrl: { fontSize: 6.5, color: "#2563EB", fontFamily: "Inter", fontWeight: 700 },
  certId: { fontSize: 5.5, color: "#CBD5E1", fontFamily: "Inter", marginTop: 2 },
  qrImage: { width: 42, height: 42, marginTop: 4 },
  verifyRight: { flexDirection: "row", alignItems: "flex-end", gap: 6 },
});

// ─── Signature SVG ───
function SignatureSVG({ width = 100 }: { width?: number }) {
  return (
    <Svg width={width} height={22} viewBox="0 0 120 25">
      <Path
        d="M5 18 Q20 3, 38 14 T62 8 Q75 4, 88 19 L105 10"
        fill="none" stroke="#0F172A" strokeWidth={1.2}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── QR Code as Data URL ───
function generateQRDataUrl(_url: string): string {
  // Simple QR placeholder — in production, generate server-side or use a canvas-based approach
  // For now we use a small inline SVG encoded as data URL
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
    <rect width="100" height="100" fill="white"/>
    <text x="50" y="45" text-anchor="middle" font-size="8" fill="#0F172A" font-family="monospace">SCAN TO</text>
    <text x="50" y="57" text-anchor="middle" font-size="8" fill="#0F172A" font-family="monospace">VERIFY</text>
    <rect x="5" y="5" width="20" height="20" fill="#0F172A"/>
    <rect x="75" y="5" width="20" height="20" fill="#0F172A"/>
    <rect x="5" y="75" width="20" height="20" fill="#0F172A"/>
    <rect x="8" y="8" width="14" height="14" fill="white"/>
    <rect x="78" y="8" width="14" height="14" fill="white"/>
    <rect x="8" y="78" width="14" height="14" fill="white"/>
    <rect x="11" y="11" width="8" height="8" fill="#0F172A"/>
    <rect x="81" y="11" width="8" height="8" fill="#0F172A"/>
    <rect x="11" y="81" width="8" height="8" fill="#0F172A"/>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// ─── PDF Document ───
function CertificatePDFDocument({ data }: { data: CertificateData }) {
  const formattedDate = new Date(data.completionDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const qrDataUrl = generateQRDataUrl(data.verificationUrl);

  return (
    <Document title={`${data.recipientName} — ${data.courseTitle}`} author="Analytix Engineering SARL">
      <Page size="A4" orientation="landscape" style={s.page}>
        {/* LEFT SIDEBAR */}
        <View style={s.sidebar}>
          <View style={s.badgeOuter}>
            <View style={s.badgeInner}>
              <Text style={s.badgeTextTop}>Analytix</Text>
              <Text style={s.badgeTextMiddle}>AE</Text>
              <Text style={s.badgeTextBottom}>Certified</Text>
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
          {/* Top: Logo + Director signature */}
          <View style={s.topRow}>
            <Image src="/logo.png" style={s.logo} />
            <View style={s.sigBlock}>
              <SignatureSVG width={110} />
              <Text style={s.sigName}>{data.boardDirectorName}</Text>
              <Text style={s.sigTitle}>{data.boardDirectorTitle}</Text>
            </View>
          </View>

          {/* Date + Name + Course */}
          <View>
            <Text style={s.date}>{formattedDate}</Text>
            <Text style={s.recipientName}>{data.recipientName}</Text>
            <Text style={s.completionText}>has successfully completed the professional training program</Text>
            <Text style={s.courseTitle}>{data.courseTitle}</Text>
            {data.skillsDescription && (
              <Text style={s.skillsDesc}>{data.skillsDescription}</Text>
            )}
          </View>

          {/* Bottom: Disclaimer + Verify */}
          <View style={s.bottomRow}>
            <Text style={s.disclaimer}>
              This professional certificate was issued by Analytix Engineering SARL upon successful
              completion of all required coursework, assessments, and practical exercises. This certificate
              does not confer academic credit or a university degree. It attests to the holder's demonstrated
              competency in the subject matter as evaluated by Analytix Engineering's Certification Board.
            </Text>

            <View style={s.verifyRight}>
              <View style={s.verifyBlock}>
                <Text style={s.verifyLabel}>Verify this certificate at:</Text>
                <Text style={s.verifyUrl}>analytix-eng.com/verify</Text>
                <Text style={s.certId}>ID: {data.certificateNumber}</Text>
              </View>
              <Image src={qrDataUrl} style={s.qrImage} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─── Export function ───
export async function generateCertificatePDF(data: CertificateData): Promise<void> {
  const blob = await pdf(<CertificatePDFDocument data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.certificateNumber}_${data.recipientName.replace(/\s+/g, "_")}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
