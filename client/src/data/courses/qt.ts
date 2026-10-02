import type { LmsCourse } from "../../lms/types";
import { m1 } from "./qt/m1";
import { m2 } from "./qt/m2";
import { m3 } from "./qt/m3";
import { m4 } from "./qt/m4";
import { m5 } from "./qt/m5";

// Quality Technician (quality control). Original Analytix Engineering material, aligned to the
// ASQ Certified Quality Technician body of knowledge and ISO 9001:2015.
export const QT_COURSE: LmsCourse = {
  id: "qt",
  code: "QT",
  title: "Quality Technician",
  subtitle: "Quality control in the plant and the lab: drawings, measurement, inspection, SPC and problem solving",
  accent: "#A78BFA",
  hours: 75,
  certification: "Analytix Engineering professional certificate with QR verification",
  introVideo: {
    en: { src: "/media/qt-intro-en.mp4", poster: "/media/qt-intro-en.jpg" },
    fr: { src: "/media/qt-intro-fr.mp4", poster: "/media/qt-intro-fr.jpg" },
  },
  modules: [m1, m2, m3, m4, m5],
};
