// Course content model for the Analytix Engineering course player.
// Text fields accept **bold** and `code` inline markers.

export type CalloutTone = "tip" | "warning" | "key" | "workplace";
export type ChartKind = "bar" | "line" | "pie";
export type DocCheck =
  | { kind: "heading"; level: 1 | 2; text: string }
  | { kind: "align"; text: string; value: "center" | "right" | "justify" }
  | { kind: "bold"; text: string }
  | { kind: "list"; ordered: boolean; min: number };

/** One question of a graded practice exercise: a dropdown, or a typed answer checked against accepted answers or a pattern. */
export type FormField =
  | { kind: "select"; label: string; options: string[]; answer: number; explain?: string }
  | { kind: "text"; label: string; accept?: string[]; pattern?: string; example?: string; placeholder?: string; mono?: boolean; explain?: string };

/** Block types that are hands-on labs; completing one earns XP. */
export const LAB_TYPES = ["sql", "sheet", "python", "doc", "slide", "chart", "explorer", "figure", "keys", "form"] as const;

/** Difficulty shown as a badge on practice exercises. */
export type LabLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "steps"; title?: string; items: string[] }
  | { type: "path"; items: string[]; note?: string }
  | { type: "shortcuts"; title?: string; items: { keys: string[]; action: string }[] }
  | { type: "callout"; tone: CalloutTone; title: string; text: string }
  | { type: "check"; id: string; question: string; options: string[]; answer: number; explain: string }
  | { type: "task"; id: string; title: string; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "code"; text: string }
  | { type: "html"; html: string }
  // ── Hands-on labs (each one earns XP when completed) ──
  | { type: "sql"; id: string; level?: LabLevel; title: string; task: string; setup: string; starter: string; solution: string; hint?: string }
  | { type: "sheet"; id: string; level?: LabLevel; title: string; task: string; data: (string | number | null)[][]; editable: string[]; checks: { cell: string; equals: number | string; tol?: number }[]; hint?: string; solution?: Record<string, string> }
  | { type: "python"; id: string; level?: LabLevel; title: string; task: string; cells: string[]; packages?: string[]; files?: { name: string; content: string }[]; expect?: string; hint?: string; solution?: string }
  | { type: "doc"; id: string; level?: LabLevel; title: string; task: string; html: string; checks: DocCheck[]; hint?: string }
  | { type: "slide"; id: string; title: string; task: string; slide: { title: string; bullets: string[] }; rules: { maxBullets: number; maxWords: number; titleMaxWords: number }; hint?: string }
  | { type: "chart"; id: string; title: string; data: { label: string; value: number }[]; unit?: string; kinds: ChartKind[]; best?: ChartKind; question?: string; explain?: string }
  | { type: "explorer"; id: string; kind: "correlation" | "distribution" }
  | { type: "figure"; id: string; title: string; art: "computer" | "word"; hotspots: { x: number; y: number; label: string; text: string }[] }
  | { type: "keys"; id: string; title: string; items: { keys: string[]; action: string }[] }
  | { type: "form"; id: string; level?: LabLevel; title: string; task: string; fields: FormField[]; hint?: string }
  | { type: "links"; items: { label: string; url: string; source: string }[] };

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  objectives: string[];
  blocks: Block[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface ModuleQuiz {
  id: string;
  title: string;
  passPct: number;
  questions: QuizQuestion[];
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  summary: string;
  hours: number;
  lessons: Lesson[];
  quiz?: ModuleQuiz;
  comingSoon?: boolean;
}

export interface IntroVideo { src: string; poster: string }

export interface LmsCourse {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  accent: string;
  hours: number;
  certification?: string;
  /** Intro video per site language; "en" is the fallback. */
  introVideo?: { en: IntroVideo; fr?: IntroVideo };
  modules: CourseModule[];
}
