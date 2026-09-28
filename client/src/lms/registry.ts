import type { CourseModule, Lesson, LmsCourse, ModuleQuiz } from "./types";
import { MOSP_COURSE } from "../data/courses/mosp";
import { DAS_COURSE } from "../data/courses/das";

// Courses written in the earlier format (HTML lessons + quiz items), e.g. das.ts.
interface LegacyQuestion { id: string; question: string; options: string[]; correctIndex: number; explanation?: string }
interface LegacyItem { id: string; title: string; type?: string; content?: string; quiz?: LegacyQuestion[] }
interface LegacyModule { id: string; number: number; title: string; lessons: LegacyItem[] }
interface LegacyCourse { id: string; title: string; acronym?: string; modules: LegacyModule[] }

const readingMinutes = (html: string) => {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(5, Math.round(words / 180 / 5) * 5 || 5);
};

export function fromLegacy(src: LegacyCourse, extra: Pick<LmsCourse, "subtitle" | "accent"> & Partial<LmsCourse>): LmsCourse {
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
        lessons.push({ id: item.id, title: item.title, minutes: readingMinutes(item.content), objectives: [], blocks: [{ type: "html", html: item.content }] });
      }
    }
    return { id: m.id, number: m.number, title: m.title, summary: "", hours: 0, lessons, quiz };
  });
  return { id: src.id, code: src.acronym ?? src.id.toUpperCase(), title: src.title, hours: 0, modules, ...extra };
}

export const COURSES: Record<string, LmsCourse> = {
  mosp: MOSP_COURSE,
  das: fromLegacy(DAS_COURSE as unknown as LegacyCourse, {
    subtitle: "Statistics, predictive models and dashboards for business decisions",
    accent: "#6EA8FE",
  }),
};
