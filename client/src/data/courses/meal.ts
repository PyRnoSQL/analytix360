import type { LmsCourse } from "../../lms/types";
import { m1 } from "./meal/m1";
import { m2 } from "./meal/m2";
import { m3 } from "./meal/m3";
import { m4 } from "./meal/m4";
import { m5 } from "./meal/m5";
import { m6 } from "./meal/m6";

// MEAL Professional Certificate (Monitoring, Evaluation, Accountability and Learning).
// Original Analytix Engineering material. Tools: XLSForm, KoboToolbox, ODK, SurveyCTO,
// CommCare, Excel, SPSS and Stata.
export const MEAL_COURSE: LmsCourse = {
  id: "meal",
  code: "MEALPC",
  title: "MEAL Professional Certificate",
  subtitle: "Monitoring, Evaluation, Accountability and Learning for development and humanitarian programmes",
  accent: "#2CC4DB",
  hours: 140,
  certification: "Analytix Engineering professional certificate with QR verification",
  introVideo: {
    en: { src: "/media/meal-intro-en.mp4", poster: "/media/meal-intro-en.jpg" },
    fr: { src: "/media/meal-intro-fr.mp4", poster: "/media/meal-intro-fr.jpg" },
  },
  modules: [m1, m2, m3, m4, m5, m6],
};
