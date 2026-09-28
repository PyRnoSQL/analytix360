// Course content model for the Analytix Engineering course player.
// Text fields accept **bold** and `code` inline markers.

export type CalloutTone = "tip" | "warning" | "key" | "workplace";

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
