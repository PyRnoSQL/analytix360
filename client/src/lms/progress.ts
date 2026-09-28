import { useCallback, useEffect, useMemo, useState } from "react";
import type { LmsCourse } from "./types";

// Learner progress, kept in this browser (localStorage). The shape is plain JSON so it
// can later be synced to Supabase without changing the components.

export interface QuizResult { best: number; passed: boolean; attempts: number }

export interface Progress {
  lessons: string[];
  checks: Record<string, number>;
  tasks: Record<string, number[]>;
  quizzes: Record<string, QuizResult>;
  notes: Record<string, string>;
  last?: string;
}

const EMPTY: Progress = { lessons: [], checks: {}, tasks: {}, quizzes: {}, notes: {} };

function load(key: string): Progress {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return { ...EMPTY, ...(JSON.parse(raw) as Partial<Progress>) };
  } catch {
    /* unavailable or corrupt: start fresh */
  }
  return EMPTY;
}

export const LEVELS = [
  { min: 0, name: "Newcomer" },
  { min: 150, name: "Explorer" },
  { min: 400, name: "Practitioner" },
  { min: 800, name: "Professional" },
  { min: 1400, name: "Office Specialist" },
] as const;

export const XP = { lesson: 20, check: 5, task: 10, quizPass: 50, quizPerfect: 25 } as const;

export function useProgress(course: LmsCourse) {
  const key = `ae-lms-${course.id}`;
  const [p, setP] = useState<Progress>(() => load(key));

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(p)); } catch { /* ignore */ }
  }, [key, p]);

  const update = useCallback((fn: (prev: Progress) => Progress) => setP((prev) => fn(prev)), []);

  const actions = useMemo(() => ({
    completeLesson: (id: string) =>
      update((s) => (s.lessons.includes(id) ? s : { ...s, lessons: [...s.lessons, id] })),
    answerCheck: (id: string, choice: number) =>
      update((s) => (id in s.checks ? s : { ...s, checks: { ...s.checks, [id]: choice } })),
    toggleTask: (id: string, index: number) =>
      update((s) => {
        const done = s.tasks[id] ?? [];
        const next = done.includes(index) ? done.filter((i) => i !== index) : [...done, index];
        return { ...s, tasks: { ...s.tasks, [id]: next } };
      }),
    recordQuiz: (id: string, pct: number, passPct: number) =>
      update((s) => {
        const prev = s.quizzes[id];
        const best = Math.max(prev?.best ?? 0, pct);
        return { ...s, quizzes: { ...s.quizzes, [id]: { best, passed: best >= passPct, attempts: (prev?.attempts ?? 0) + 1 } } };
      }),
    setNote: (id: string, text: string) => update((s) => ({ ...s, notes: { ...s.notes, [id]: text } })),
    setLast: (id: string) => update((s) => (s.last === id ? s : { ...s, last: id })),
    reset: () => update(() => EMPTY),
  }), [update]);

  const stats = useMemo(() => {
    let xp = 0;
    let totalItems = 0;
    let doneItems = 0;
    for (const m of course.modules) {
      if (m.comingSoon) continue;
      for (const l of m.lessons) {
        totalItems++;
        if (p.lessons.includes(l.id)) { doneItems++; xp += XP.lesson; }
        for (const b of l.blocks) {
          if (b.type === "check" && p.checks[b.id] === b.answer) xp += XP.check;
          if (b.type === "task" && (p.tasks[b.id]?.length ?? 0) >= b.items.length) xp += XP.task;
        }
      }
      if (m.quiz) {
        totalItems++;
        const r = p.quizzes[m.quiz.id];
        if (r?.passed) { doneItems++; xp += XP.quizPass; if (r.best === 100) xp += XP.quizPerfect; }
      }
    }
    const level = [...LEVELS].reverse().find((lv) => xp >= lv.min) ?? LEVELS[0];
    const nextLevel = LEVELS.find((lv) => lv.min > xp);
    return { xp, level, nextLevel, pct: totalItems ? Math.round((doneItems / totalItems) * 100) : 0, doneItems, totalItems };
  }, [course, p]);

  return { progress: p, ...actions, stats };
}

export type ProgressApi = ReturnType<typeof useProgress>;
