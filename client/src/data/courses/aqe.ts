import type { LmsCourse } from "../../lms/types";
import { m1 } from "./aqe/m1";
import { m2 } from "./aqe/m2";
import { m3 } from "./aqe/m3";
import { m4 } from "./aqe/m4";
import { m5 } from "./aqe/m5";
import { m6 } from "./aqe/m6";
import { m7 } from "./aqe/m7";
import { m8 } from "./aqe/m8";

export const AQE_COURSE: LmsCourse = {
  id: "aqe",
  code: "AQE",
  title: "Associate Quality Engineer",
  subtitle: "Statistical methods, measurement systems, FMEA, DOE, SPC and continuous improvement for quality engineers",
  accent: "#F59E0B",
  hours: 132,
  certification: "Analytix Engineering professional certificate with QR verification",
  modules: [m1, m2, m3, m4, m5, m6, m7, m8],
};
