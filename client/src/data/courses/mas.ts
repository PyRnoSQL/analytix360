import type { LmsCourse } from "../../lms/types";
import { m1 } from "./mas/m1";
import { m2 } from "./mas/m2";
import { m3 } from "./mas/m3";
import { m4 } from "./mas/m4";
import { m5 } from "./mas/m5";
import { m6 } from "./mas/m6";
import { m7 } from "./mas/m7";
import { m8 } from "./mas/m8";

// Marketing Analytics Specialist (MAS) Professional Certificate
// Original Analytix Engineering material. All projects, organisations, people and figures are fictional.
// Workplace context: Cameroon / Central Africa (FCFA currency).

export const MAS_COURSE: LmsCourse = {
  id: "mas",
  code: "MAS",
  title: "Marketing Analytics Specialist",
  subtitle:
    "Master data-driven marketing: from research design and customer analytics to predictive modeling, campaign optimization, and executive reporting.",
  accent: "#1a73e8",
  hours: 48,
  certification: "Marketing Analytics Specialist (MAS) — Professional Certificate in Marketing Analytics",
  modules: [m1, m2, m3, m4, m5, m6, m7, m8],
};
