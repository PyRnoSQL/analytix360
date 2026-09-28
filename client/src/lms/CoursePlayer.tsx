import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft, ArrowRight, Award, BookOpen, CheckCircle2, ChevronDown, Circle, Clock, Layers,
  Lock, Menu, NotebookPen, PlayCircle, Sparkles, Target, Trophy, X, Zap,
} from "lucide-react";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import "@fontsource/jetbrains-mono/500.css";
import "./lms.css";
import type { CourseModule, LmsCourse } from "./types";
import { useProgress, type ProgressApi } from "./progress";
import { BlockView } from "./blocks";
import { QuizView } from "./QuizView";

type View = { kind: "overview" } | { kind: "lesson"; m: number; l: number } | { kind: "quiz"; m: number };

const pad2 = (n: number) => String(n).padStart(2, "0");

// Follows the site's EN/FR switch through the <html lang> attribute.
function useDocLang(): "en" | "fr" {
  const read = () => (document.documentElement.lang?.toLowerCase().startsWith("fr") ? "fr" : "en");
  const [lang, setLang] = useState<"en" | "fr">(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setLang(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => obs.disconnect();
  }, []);
  return lang;
}

function Ring({ pct, size = 44, stroke = 5, label }: { pct: number; size?: number; stroke?: number; label?: ReactNode }) {
  const r = (size - stroke) / 2;
  const len = 2 * Math.PI * r;
  return (
    <span className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(231,235,243,0.09)" strokeWidth={stroke} />
        {pct > 0 && <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--acc)" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * len} ${len}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dasharray .6s ease-out" }} />}
      </svg>
      <span className="absolute text-center">{label ?? <span className="lms-mono text-[0.65rem] font-bold tabular-nums text-white">{pct}%</span>}</span>
    </span>
  );
}

function moduleProgress(m: CourseModule, api: ProgressApi) {
  if (m.comingSoon) return { done: 0, total: m.lessons.length + 1, pct: 0 };
  const total = m.lessons.length + (m.quiz ? 1 : 0);
  const done = m.lessons.filter((l) => api.progress.lessons.includes(l.id)).length + (m.quiz && api.progress.quizzes[m.quiz.id]?.passed ? 1 : 0);
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function CoursePlayer({ course, backLink }: { course: LmsCourse; backLink?: ReactNode }) {
  const api = useProgress(course);
  const lang = useDocLang();
  const video = course.introVideo ? (lang === "fr" && course.introVideo.fr) || course.introVideo.en : undefined;
  const { stats, progress } = api;
  const [view, setView] = useState<View>({ kind: "overview" });
  const [open, setOpen] = useState<number[]>([0]);
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState<{ level?: string; xp: number } | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [readPct, setReadPct] = useState(0);

  // +XP / level-up toast
  const prevXp = useRef(stats.xp);
  const prevLevel = useRef(stats.level.name);
  useEffect(() => {
    const gained = stats.xp - prevXp.current;
    if (gained > 0) {
      setToast(stats.level.name !== prevLevel.current ? { level: stats.level.name, xp: gained } : { xp: gained });
      const t = setTimeout(() => setToast(null), 2200);
      prevXp.current = stats.xp; prevLevel.current = stats.level.name;
      return () => clearTimeout(t);
    }
    prevXp.current = stats.xp; prevLevel.current = stats.level.name;
  }, [stats.xp, stats.level.name]);

  // Scroll to top and remember position on every view change
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    setReadPct(0);
    setDrawer(false);
    if (view.kind !== "overview") setOpen((o) => (o.includes(view.m) ? o : [...o, view.m]));
    if (view.kind === "lesson") { const l = course.modules[view.m]?.lessons[view.l]; if (l) api.setLast(l.id); }
    if (view.kind === "quiz") { const q = course.modules[view.m]?.quiz; if (q) api.setLast(q.id); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const available = useMemo(() => course.modules.map((m) => !m.comingSoon), [course]);

  const resumeView = useMemo<View>(() => {
    for (let mi = 0; mi < course.modules.length; mi++) {
      const m = course.modules[mi];
      if (!m || m.comingSoon) continue;
      if (progress.last) {
        const li = m.lessons.findIndex((l) => l.id === progress.last);
        if (li >= 0) return { kind: "lesson", m: mi, l: li };
        if (m.quiz?.id === progress.last) return { kind: "quiz", m: mi };
      }
    }
    for (let mi = 0; mi < course.modules.length; mi++) {
      const m = course.modules[mi];
      if (!m || m.comingSoon) continue;
      const li = m.lessons.findIndex((l) => !progress.lessons.includes(l.id));
      if (li >= 0) return { kind: "lesson", m: mi, l: li };
      if (m.quiz && !progress.quizzes[m.quiz.id]?.passed) return { kind: "quiz", m: mi };
    }
    return { kind: "lesson", m: 0, l: 0 };
  }, [course, progress]);

  const nextOf = (v: View): View => {
    if (v.kind === "lesson") {
      const m = course.modules[v.m];
      if (m && v.l + 1 < m.lessons.length) return { kind: "lesson", m: v.m, l: v.l + 1 };
      if (m?.quiz) return { kind: "quiz", m: v.m };
    }
    if (v.kind !== "overview") {
      const nm = v.m + 1;
      if (available[nm]) return { kind: "lesson", m: nm, l: 0 };
    }
    return { kind: "overview" };
  };
  const prevOf = (v: View): View | null => {
    if (v.kind === "lesson" && v.l > 0) return { kind: "lesson", m: v.m, l: v.l - 1 };
    if (v.kind === "quiz") { const m = course.modules[v.m]; if (m && m.lessons.length) return { kind: "lesson", m: v.m, l: m.lessons.length - 1 }; }
    return null;
  };
  const labelOf = (v: View) =>
    v.kind === "overview" ? "Course overview" : v.kind === "quiz" ? course.modules[v.m]?.quiz?.title ?? "Quiz" : course.modules[v.m]?.lessons[v.l]?.title ?? "";

  const onScroll = () => {
    const el = mainRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setReadPct(max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 0);
  };

  // ── Sidebar ──
  const sidebar = (
    <nav aria-label="Course outline" className="lms-scroll flex h-full flex-col overflow-y-auto">
      <button type="button" onClick={() => setView({ kind: "overview" })}
        className={`mx-3 mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${view.kind === "overview" ? "bg-white/[0.07] text-white" : "text-[color:var(--muted)] hover:bg-white/[0.04] hover:text-white"}`}>
        <Layers size={17} /> Course overview
      </button>
      <ol className="grid gap-1 p-3">
        {course.modules.map((m, mi) => {
          const mp = moduleProgress(m, api);
          const expanded = open.includes(mi);
          return (
            <li key={m.id} className="rounded-2xl">
              <button type="button" aria-expanded={expanded}
                onClick={() => setOpen((o) => (o.includes(mi) ? o.filter((x) => x !== mi) : [...o, mi]))}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-white/[0.04]">
                <Ring pct={mp.pct} size={34} stroke={4} label={<span className="lms-mono text-[0.62rem] font-bold text-white">{pad2(m.number)}</span>} />
                <span className="min-w-0 flex-1">
                  <span className={`block text-[0.9rem] font-semibold leading-snug ${m.comingSoon ? "text-[color:var(--muted)]" : "text-white"}`}>{m.title}</span>
                  <span className="text-xs text-[color:var(--muted)]">{m.comingSoon ? "In production" : <>{mp.done}/{mp.total} complete</>}</span>
                </span>
                <ChevronDown size={16} className={`shrink-0 text-[color:var(--muted)] transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
              {expanded && (
                <ul className="mb-2 ml-[1.9rem] grid gap-0.5 border-l border-[color:var(--line)] pl-3">
                  {m.lessons.map((l, li) => {
                    const done = progress.lessons.includes(l.id);
                    const here = view.kind === "lesson" && view.m === mi && view.l === li;
                    return (
                      <li key={l.id}>
                        <button type="button" disabled={m.comingSoon} onClick={() => setView({ kind: "lesson", m: mi, l: li })}
                          className={`flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left text-[0.85rem] leading-snug ${
                            here ? "bg-[color:var(--acc-15)] text-white" : m.comingSoon ? "cursor-default text-[#6F7B95]" : "text-[color:#C5CDDD] hover:bg-white/[0.04] hover:text-white"}`}>
                          {m.comingSoon ? <Lock size={14} className="mt-0.5 shrink-0 opacity-60" />
                            : done ? <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                            : here ? <PlayCircle size={15} className="mt-0.5 shrink-0 text-[color:var(--acc)]" />
                            : <Circle size={15} className="mt-0.5 shrink-0 text-[#3A4666]" />}
                          <span className="flex-1">{l.title}</span>
                        </button>
                      </li>
                    );
                  })}
                  {m.quiz && (
                    <li>
                      <button type="button" onClick={() => setView({ kind: "quiz", m: mi })}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[0.85rem] ${
                          view.kind === "quiz" && view.m === mi ? "bg-[color:var(--acc-15)] text-white" : "text-[color:#C5CDDD] hover:bg-white/[0.04] hover:text-white"}`}>
                        <Trophy size={15} className={`shrink-0 ${progress.quizzes[m.quiz.id]?.passed ? "text-emerald-400" : "text-[color:var(--acc)]"}`} />
                        <span className="flex-1">{m.quiz.title}</span>
                        {progress.quizzes[m.quiz.id] && <span className="lms-mono text-[0.7rem] tabular-nums text-[color:var(--muted)]">{progress.quizzes[m.quiz.id]?.best}%</span>}
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );

  // ── Views ──
  let content: ReactNode = null;
  if (view.kind === "overview") {
    const started = progress.lessons.length > 0 || Object.keys(progress.quizzes).length > 0;
    const lessonCount = course.modules.filter((m) => !m.comingSoon).reduce((n, m) => n + m.lessons.length, 0);
    content = (
      <div className="lms-rise">
        <section className="lms-glow -mx-5 -mt-8 px-5 pb-10 pt-10 sm:-mx-10 sm:px-10">
          <div className={`grid items-center gap-10 ${video ? "xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]" : ""}`}>
            <div className="max-w-2xl">
              <span className="lms-mono inline-flex rounded-md bg-[color:var(--acc-15)] px-2 py-1 text-xs font-bold tracking-wider text-[color:var(--acc)]">{course.code}</span>
              <h1 className="lms-display mt-4 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">{course.title}</h1>
              <p className="mt-4 text-lg text-[color:#C5CDDD]">{course.subtitle}</p>
              {course.certification && <p className="mt-3 flex items-center gap-2 text-sm text-[color:var(--muted)]"><Award size={16} className="shrink-0 text-[color:var(--acc)]" />{course.certification}</p>}
              <button type="button" onClick={() => setView(resumeView)}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[color:var(--acc)] px-6 py-3.5 font-bold text-[#1F1303] shadow-[0_10px_30px_-10px_var(--acc)] hover:brightness-110">
                {started ? "Continue learning" : "Start the course"} <ArrowRight size={18} />
              </button>
              {started && <p className="mt-3 text-sm text-[color:var(--muted)]">Next: {labelOf(resumeView)}</p>}
            </div>
            {video && (
              <figure className="overflow-hidden rounded-3xl border border-[color:var(--line)] bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
                <video key={video.src} className="block aspect-video w-full" src={video.src} poster={video.poster} controls playsInline preload="metadata" />
                <figcaption className="flex items-center gap-2 border-t border-[color:var(--line)] bg-[color:var(--panel)] px-4 py-2.5 text-sm text-[color:var(--muted)]">
                  <PlayCircle size={16} className="text-[color:var(--acc)]" /> Course introduction · 30 s
                </figcaption>
              </figure>
            )}
          </div>
          <div className="mt-9 flex flex-col gap-6 rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-5">
              <Ring pct={stats.pct} size={84} stroke={8} label={<span className="lms-display text-lg font-semibold tabular-nums text-white">{stats.pct}%</span>} />
              <dl className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
                <div><dt className="text-[color:var(--muted)]">Level</dt><dd className="whitespace-nowrap font-bold text-white">{stats.level.name}</dd></div>
                <div><dt className="text-[color:var(--muted)]">Experience</dt><dd className="lms-mono whitespace-nowrap font-bold tabular-nums text-[color:var(--acc)]">{stats.xp} XP</dd></div>
                <div><dt className="text-[color:var(--muted)]">Completed</dt><dd className="whitespace-nowrap tabular-nums text-white">{stats.doneItems}/{stats.totalItems}</dd></div>
              </dl>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[color:#C5CDDD]">
              <li className="flex items-center gap-2"><Layers size={16} className="text-[color:var(--acc)]" />{course.modules.length} modules</li>
              {course.hours > 0 && <li className="flex items-center gap-2"><Clock size={16} className="text-[color:var(--acc)]" />{course.hours} contact hours</li>}
              <li className="flex items-center gap-2"><BookOpen size={16} className="text-[color:var(--acc)]" />{lessonCount} lessons available now</li>
              <li className="flex items-center gap-2"><Sparkles size={16} className="text-[color:var(--acc)]" />Quizzes and practice tasks</li>
            </ul>
          </div>
        </section>
        <h2 className="lms-display mb-5 mt-10 text-2xl font-semibold text-white">Modules</h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {course.modules.map((m, mi) => {
            const mp = moduleProgress(m, api);
            return (
              <li key={m.id}>
                <button type="button" disabled={m.comingSoon} onClick={() => setView({ kind: "lesson", m: mi, l: 0 })}
                  className={`group flex h-full w-full flex-col rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5 text-left transition-colors ${m.comingSoon ? "cursor-default" : "hover:border-[color:var(--acc-50)] hover:bg-[color:var(--raised)]"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="lms-mono text-xs font-bold tracking-widest text-[color:var(--muted)]">MODULE {pad2(m.number)}</span>
                    {m.comingSoon
                      ? <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs text-[color:var(--muted)]">In production</span>
                      : <span className="lms-mono text-xs tabular-nums text-[color:var(--muted)]">{m.hours > 0 && <>{m.hours} h · </>}{m.lessons.length} lessons</span>}
                  </div>
                  <h3 className={`lms-display mt-2 text-xl font-semibold leading-snug ${m.comingSoon ? "text-[color:#AEB8CC]" : "text-white group-hover:text-[color:var(--acc)]"}`}>{m.title}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] text-[color:var(--muted)]">{m.summary || m.lessons.map((l) => l.title).join(" · ")}</p>
                  {!m.comingSoon && (
                    <div className="mt-4 flex items-center gap-3">
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]"><span className="block h-full rounded-full bg-[color:var(--acc)] transition-all" style={{ width: `${mp.pct}%` }} /></span>
                      <span className="lms-mono text-xs tabular-nums text-[color:var(--muted)]">{mp.done}/{mp.total}</span>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    );
  } else if (view.kind === "lesson") {
    const m = course.modules[view.m];
    const lesson = m?.lessons[view.l];
    if (m && lesson) {
      const done = progress.lessons.includes(lesson.id);
      const nxt = nextOf(view);
      const prv = prevOf(view);
      content = (
        <article key={lesson.id} className="lms-rise mx-auto max-w-3xl">
          <p className="lms-mono text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--acc)]">
            Module {pad2(m.number)} · Lesson {view.l + 1} of {m.lessons.length}
          </p>
          <h1 className="lms-display mt-3 text-3xl font-semibold leading-tight text-white sm:text-[2.6rem]">{lesson.title}</h1>
          <p className="mt-3 flex items-center gap-4 text-sm text-[color:var(--muted)]">
            <span className="flex items-center gap-1.5"><Clock size={15} />{lesson.minutes} min</span>
            {done && <span className="flex items-center gap-1.5 text-emerald-300"><CheckCircle2 size={15} />Completed</span>}
          </p>
          {lesson.objectives.length > 0 && (
            <section className="mt-8 rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5 sm:p-6">
              <p className="mb-3 flex items-center gap-2 font-bold text-white"><Target size={18} className="text-[color:var(--acc)]" />In this lesson you will</p>
              <ul className="grid gap-2">
                {lesson.objectives.map((o, i) => <li key={i} className="flex gap-2.5 text-[color:#CDD4E3]"><CheckCircle2 size={17} className="mt-1 shrink-0 text-[color:var(--acc)]" />{o}</li>)}
              </ul>
            </section>
          )}
          <div className="lms-prose mt-8 grid gap-6">
            {lesson.blocks.map((b, i) => <BlockView key={i} block={b} api={api} />)}
          </div>
          <section className="mt-10 rounded-2xl border border-dashed border-[color:var(--line)] p-5">
            <label htmlFor={`note-${lesson.id}`} className="mb-2 flex items-center gap-2 font-bold text-white"><NotebookPen size={17} className="text-[color:var(--acc)]" />My notes</label>
            <textarea id={`note-${lesson.id}`} rows={4} value={progress.notes[lesson.id] ?? ""} onChange={(e) => api.setNote(lesson.id, e.target.value)}
              placeholder="Write what you want to remember from this lesson. Notes are saved on this device."
              className="w-full resize-y rounded-xl border border-[color:var(--line)] bg-[#0B1120] p-3 text-[0.95rem] text-white placeholder:text-[color:var(--muted)] focus:border-[color:var(--acc-60)] focus:outline-none" />
          </section>
          <footer className="mt-10 flex flex-col-reverse gap-3 border-t border-[color:var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            {prv ? (
              <button type="button" onClick={() => setView(prv)} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-[color:var(--muted)] hover:bg-white/[0.04] hover:text-white"><ArrowLeft size={17} />Previous</button>
            ) : <span />}
            <button type="button" onClick={() => { api.completeLesson(lesson.id); setView(nxt); }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--acc)] px-6 py-3.5 font-bold text-[#1F1303] hover:brightness-110">
              {done ? "Next" : "Mark complete and continue"} <ArrowRight size={18} />
            </button>
          </footer>
          <p className="mt-3 text-right text-sm text-[color:var(--muted)]">Up next: {labelOf(nxt)}</p>
        </article>
      );
    }
  } else {
    const m = course.modules[view.m];
    if (m?.quiz) {
      const nxt = nextOf(view);
      content = (
        <div key={m.quiz.id}>
          <p className="lms-mono mb-6 text-center text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--acc)]">Module {pad2(m.number)} · {m.title}</p>
          <QuizView quiz={m.quiz} api={api} onContinue={() => setView(nxt)} continueLabel={nxt.kind === "overview" ? "Back to course" : "Next module"} />
        </div>
      );
    }
  }

  const levelSpan = stats.nextLevel ? stats.nextLevel.min - stats.level.min : 1;
  const levelPct = stats.nextLevel ? Math.round(((stats.xp - stats.level.min) / levelSpan) * 100) : 100;

  return (
    <div className="lms flex h-[100dvh] flex-col overflow-hidden" style={{ ["--acc" as string]: course.accent }}>
      {/* Top bar */}
      <header className="relative z-20 flex items-center gap-3 border-b border-[color:var(--line)] bg-[color:var(--ink)] px-3 py-2.5 backdrop-blur sm:px-5">
        <button type="button" aria-label="Open course outline" onClick={() => setDrawer(true)} className="grid h-10 w-10 place-items-center rounded-xl text-white hover:bg-white/[0.06] lg:hidden"><Menu size={20} /></button>
        {backLink && <div className="hidden text-sm text-[color:var(--muted)] hover:text-white sm:block">{backLink}</div>}
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="lms-mono hidden rounded-md bg-[color:var(--acc-15)] px-1.5 py-0.5 text-[0.7rem] font-bold text-[color:var(--acc)] sm:inline">{course.code}</span>
          <span className="truncate text-sm font-semibold text-white">{course.title}</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] py-1 pl-1.5 pr-3">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[color:var(--acc-15)] text-[color:var(--acc)]"><Zap size={15} /></span>
          <span className="leading-tight">
            <span className="lms-mono block text-xs font-bold tabular-nums text-white">{stats.xp} XP</span>
            <span className="hidden text-[0.65rem] text-[color:var(--muted)] sm:block">{stats.level.name}</span>
          </span>
          <span className="ml-1 hidden h-1 w-16 overflow-hidden rounded-full bg-white/[0.08] sm:block"><span className="block h-full bg-[color:var(--acc)]" style={{ width: `${levelPct}%` }} /></span>
        </div>
        <Ring pct={stats.pct} size={40} stroke={4} />
        {view.kind === "lesson" && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent"><span className="block h-full bg-[color:var(--acc)] transition-[width]" style={{ width: `${readPct}%` }} /></span>}
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-80 shrink-0 border-r border-[color:var(--line)] bg-[color:var(--panel)] lg:block">{sidebar}</aside>
        {drawer && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <button type="button" aria-label="Close course outline" className="absolute inset-0 bg-black/60" onClick={() => setDrawer(false)} />
            <aside className="absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col border-r border-[color:var(--line)] bg-[color:var(--panel)]">
              <div className="flex items-center justify-between px-4 pt-3">
                <span className="text-sm font-semibold text-white">Course outline</span>
                <button type="button" aria-label="Close" onClick={() => setDrawer(false)} className="grid h-9 w-9 place-items-center rounded-lg text-white hover:bg-white/[0.06]"><X size={18} /></button>
              </div>
              <div className="min-h-0 flex-1">{sidebar}</div>
            </aside>
          </div>
        )}
        <main ref={mainRef} onScroll={onScroll} className="lms-scroll min-w-0 flex-1 overflow-y-auto px-5 pb-16 pt-8 sm:px-10">{content}</main>
      </div>

      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
        {toast && (
          <span key={stats.xp} className="lms-rise flex items-center gap-2 rounded-full border border-[color:var(--acc-50)] bg-[color:var(--raised)] px-5 py-2.5 font-bold text-white shadow-2xl">
            <Zap size={16} className="text-[color:var(--acc)]" />
            {toast.level ? <><span>Level up:</span> <span>{toast.level}</span></> : <span className="lms-mono tabular-nums">+{toast.xp} XP</span>}
          </span>
        )}
      </div>
    </div>
  );
}
