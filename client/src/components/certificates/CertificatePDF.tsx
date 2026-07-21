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
  family: "Tinos",
  src: "https://fonts.gstatic.com/s/tinos/v24/buE4poGnedXvwgX8dGVh8TI-.ttf",
});

// A4 Landscape = 842 x 595 points
// Sidebar = 22% = ~185pt, Main = 78% = ~657pt

const s = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: 842,
    height: 595,
  },

  // ─── LEFT SIDEBAR ───
  sidebar: {
    width: 185,
    backgroundColor: "#0F172A",
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: "column",
  },
  badgeOuter: {
    width: 72, height: 72, borderRadius: 36,
    borderWidth: 2, borderColor: "#C9A84C99",
    alignSelf: "center", justifyContent: "center", alignItems: "center",
    marginBottom: 8,
  },
  badgeInner: {
    width: 56, height: 56, borderRadius: 28,
    borderWidth: 1, borderColor: "#C9A84C50",
    backgroundColor: "#C9A84C15",
    justifyContent: "center", alignItems: "center",
  },
  badgeTextTop: { fontSize: 6.5, color: "#C9A84C", fontFamily: "Inter", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center" },
  badgeTextMiddle: { fontSize: 13, color: "#FFFFFF", fontFamily: "Inter", fontWeight: 800, textAlign: "center" },
  badgeTextBottom: { fontSize: 5, color: "#C9A84C99", fontFamily: "Inter", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", textAlign: "center" },
  profCert: { fontSize: 7, color: "#C9A84C", fontFamily: "Inter", fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", textAlign: "center", marginBottom: 2 },
  moduleBadge: {
    backgroundColor: "#2563EB", borderRadius: 6,
    paddingVertical: 6, paddingHorizontal: 10,
    marginBottom: 10, marginTop: 14,
  },
  moduleBadgeText: { fontSize: 10, color: "#FFFFFF", fontFamily: "Inter", fontWeight: 800 },
  moduleItem: { fontSize: 8, color: "#FFFFFFCC", fontFamily: "Inter", fontWeight: 600, marginBottom: 6, lineHeight: 1.4 },
  hoursBadge: {
    backgroundColor: "#FFFFFF15", borderRadius: 6,
    paddingVertical: 7, paddingHorizontal: 10,
    marginTop: "auto", alignItems: "center",
  },
  hoursText: { fontSize: 10, color: "#FFFFFF", fontFamily: "Inter", fontWeight: 700 },
  hoursLabel: { fontSize: 7, color: "#FFFFFF80", fontFamily: "Inter" },

  // ─── MAIN CONTENT ───
  main: {
    width: 657,
    backgroundColor: "#F5F0E8",
    paddingTop: 30,
    paddingBottom: 24,
    paddingHorizontal: 40,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  logo: { width: 140, height: 42 },
  sigBlock: { alignItems: "flex-end" },
  sigName: { fontSize: 11, color: "#0F172A", fontFamily: "Inter", fontWeight: 700, marginTop: 3 },
  sigTitle: { fontSize: 8.5, color: "#64748B", fontFamily: "Inter" },

  date: { fontSize: 14, color: "#64748B", fontFamily: "Inter", marginTop: 16 },
  recipientName: { fontSize: 32, color: "#0F172A", fontFamily: "Inter", fontWeight: 800, marginTop: 5 },
  completionText: { fontSize: 12, color: "#64748B", fontFamily: "Inter", marginTop: 6 },
  courseTitle: { fontSize: 34, color: "#0F172A", fontFamily: "Tinos", marginTop: 10, lineHeight: 1.15 },
  skillsDesc: { fontSize: 10, color: "#475569", fontFamily: "Inter", marginTop: 14, lineHeight: 1.7, maxWidth: 500 },

  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  disclaimer: { fontSize: 7, color: "#94A3B8", fontFamily: "Inter", lineHeight: 1.6, maxWidth: 320 },
  verifyBlock: { alignItems: "flex-end" },
  verifyLabel: { fontSize: 8, color: "#64748B", fontFamily: "Inter", fontWeight: 600 },
  verifyUrl: { fontSize: 8, color: "#2563EB", fontFamily: "Inter", fontWeight: 700 },
  certId: { fontSize: 7, color: "#CBD5E1", fontFamily: "Inter", marginTop: 2 },
  qrImage: { width: 50, height: 50, marginTop: 5 },
  verifyRight: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
});

// ─── Signature SVG ───
function SignatureSVG() {
  return (
    <Svg width={120} height={26} viewBox="0 0 120 25">
      <Path
        d="M5 18 Q20 3, 38 14 T62 8 Q75 4, 88 19 L105 10"
        fill="none" stroke="#0F172A" strokeWidth={1.2}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── QR Code placeholder ───
function generateQRDataUrl(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
    <rect width="100" height="100" fill="white"/>
    <text x="50" y="45" text-anchor="middle" font-size="7" fill="#0F172A" font-family="monospace">SCAN TO</text>
    <text x="50" y="56" text-anchor="middle" font-size="7" fill="#0F172A" font-family="monospace">VERIFY</text>
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
function CertificatePDFDocument({ data, logoUrl }: { data: CertificateData; logoUrl: string }) {
  const formattedDate = new Date(data.completionDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const qrDataUrl = generateQRDataUrl();

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
          <View style={s.topRow}>
            <Image src={logoUrl} style={s.logo} />
            <View style={s.sigBlock}>
              <SignatureSVG />
              <Text style={s.sigName}>{data.boardDirectorName}</Text>
              <Text style={s.sigTitle}>{data.boardDirectorTitle}</Text>
            </View>
          </View>

          <View>
            <Text style={s.date}>{formattedDate}</Text>
            <Text style={s.recipientName}>{data.recipientName}</Text>
            <Text style={s.completionText}>has successfully completed the professional training program</Text>
            <Text style={s.courseTitle}>{data.courseTitle}</Text>
            {data.skillsDescription && (
              <Text style={s.skillsDesc}>{data.skillsDescription}</Text>
            )}
          </View>

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
  // Convert logo to base64 so @react-pdf/renderer can embed it
  let logoUrl = "";
  try {
    const response = await fetch(`${window.location.origin}/logo.png`);
    const blob = await response.blob();
    logoUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error("Failed to load logo:", e);
  }

  const blob = await pdf(<CertificatePDFDocument data={data} logoUrl={logoUrl} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.certificateNumber}_${data.recipientName.replace(/\s+/g, "_")}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
