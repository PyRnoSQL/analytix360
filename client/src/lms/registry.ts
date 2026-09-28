import type { CourseModule, Lesson, LmsCourse, ModuleQuiz } from "./types";
import { MOSP_COURSE } from "../data/courses/mosp";
import { DAS_COURSE } from "../data/courses/das";
import { DAS_EXTRAS, type LessonExtras } from "../data/courses/das-extras";
import { DAS_PRACTICE, type PracticeSet } from "../data/courses/das-practice";
import { MOSP_PRACTICE } from "../data/courses/mosp-practice";

// Adds a practice lesson at the end of each open module that has one.
const withPractice = (c: LmsCourse, extra: Record<string, Lesson>): LmsCourse => ({
  ...c,
  modules: c.modules.map((m) => { const p = extra[m.id]; return p && !m.comingSoon ? { ...m, lessons: [...m.lessons, p] } : m; }),
});

// Courses written in the earlier format (HTML lessons + quiz items), e.g. das.ts.
interface LegacyQuestion { id: string; question: string; options: string[]; correctIndex: number; explanation?: string }
interface LegacyItem { id: string; title: string; type?: string; content?: string; quiz?: LegacyQuestion[] }
interface LegacyModule { id: string; number: number; title: string; lessons: LegacyItem[] }
interface LegacyCourse { id: string; title: string; acronym?: string; modules: LegacyModule[] }

const readingMinutes = (html: string) => {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(5, Math.round(words / 180 / 5) * 5 || 5);
};

const headingOf = (html: string) =>
  (html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim();

export function fromLegacy(
  src: LegacyCourse,
  extra: Pick<LmsCourse, "subtitle" | "accent"> & Partial<LmsCourse>,
  extras: Record<string, LessonExtras> = {},
  practice: PracticeSet[] = [],
): LmsCourse {
  const modules: CourseModule[] = src.modules.map((m) => {
    const lessons: Lesson[] = [];
    let quiz: ModuleQuiz | undefined;
    for (const item of m.lessons) {
      if (item.quiz?.length && !quiz) {
        quiz = {
          id: item.id,
          title: item.title,
          passPct: 70,
          questions: item.quiz.map((q) => ({ id: q.id, question: q.question, options: q.options, answer: q.correctIndex, explain: q.explanation ?? "" })),
        };
      } else if (item.content) {
        const add = extras[headingOf(item.content)] ?? extras[item.title];
        lessons.push({
          id: item.id,
          title: item.title,
          minutes: readingMinutes(item.content) + (add ? 5 : 0),
          objectives: add?.objectives ?? [],
          blocks: [{ type: "html", html: item.content }, ...(add?.blocks ?? [])],
        });
      }
    }
    return { id: m.id, number: m.number, title: m.title, summary: "", hours: 0, lessons, quiz };
  });
  // Each practice set goes to the module that holds most of its anchor lessons.
  for (const set of practice) {
    let best = -1, hits = 0;
    src.modules.forEach((m, i) => {
      const n = m.lessons.filter((it) => it.content && (set.anchors.includes(headingOf(it.content)) || set.anchors.includes(it.title))).length;
      if (n > hits) { hits = n; best = i; }
    });
    const mod = modules[best];
    if (mod) mod.lessons.push({ id: `${mod.id}-practice-${set.key}`, title: set.title, minutes: 30, objectives: set.objectives, blocks: set.blocks });
  }
  return { id: src.id, code: src.acronym ?? src.id.toUpperCase(), title: src.title, hours: 0, modules, ...extra };
}

export const COURSES: Record<string, LmsCourse> = {
  mosp: withPractice(MOSP_COURSE, MOSP_PRACTICE),
  das: fromLegacy(DAS_COURSE as unknown as LegacyCourse, {
    subtitle: "Statistics, predictive models and dashboards for business decisions",
    accent: "#6EA8FE",
    certification: "Analytix Engineering professional certificate with QR verification",
    introVideo: {
      en: { src: "/media/das-intro-en.mp4", poster: "/media/das-intro-en.jpg" },
      fr: { src: "/media/das-intro-fr.mp4", poster: "/media/das-intro-fr.jpg" },
    },
  }, DAS_EXTRAS, DAS_PRACTICE),
};
