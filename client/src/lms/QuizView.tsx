import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, RotateCcw, Timer, Trophy, X } from "lucide-react";
import type { ModuleQuiz } from "./types";
import type { ProgressApi } from "./progress";
import { rich } from "./blocks";

function Confetti({ run }: { run: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!run || !c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const w = (c.width = c.offsetWidth * devicePixelRatio);
    const h = (c.height = c.offsetHeight * devicePixelRatio);
    const colors = ["#F4A340", "#3CCB9A", "#6EA8FE", "#F2706B", "#E7EBF3"];
    const bits = Array.from({ length: 140 }, () => ({
      x: w / 2, y: h * 0.35, vx: (Math.random() - 0.5) * 16 * devicePixelRatio, vy: (-Math.random() * 13 - 4) * devicePixelRatio,
      s: (Math.random() * 6 + 4) * devicePixelRatio, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
      c: colors[Math.floor(Math.random() * colors.length)] ?? "#F4A340",
    }));
    let frame = 0;
    let id = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const b of bits) {
        b.vy += 0.35 * devicePixelRatio; b.x += b.vx; b.y += b.vy; b.r += b.vr; b.vx *= 0.99;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r); ctx.fillStyle = b.c;
        ctx.globalAlpha = Math.max(0, 1 - frame / 150); ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2); ctx.restore();
      }
      if (++frame < 150) id = requestAnimationFrame(tick); else ctx.clearRect(0, 0, w, h);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [run]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}

function ScoreRing({ pct, passed }: { pct: number; passed: boolean }) {
  const r = 52;
  const len = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 128 128" className="h-40 w-40" role="img" aria-label={`${pct}%`}>
      <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(231,235,243,0.08)" strokeWidth="10" />
      {pct > 0 && <circle cx="64" cy="64" r={r} fill="none" stroke={passed ? "#3CCB9A" : "#F2706B"} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * len} ${len}`} transform="rotate(-90 64 64)" style={{ transition: "stroke-dasharray 0.9s ease-out" }} />}
      <text x="64" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="30" fontWeight="700" className="lms-display">{pct}%</text>
      <text x="64" y="84" textAnchor="middle" fill="#97A3BD" fontSize="11">{passed ? "Passed" : "Not yet"}</text>
    </svg>
  );
}

export function QuizView({ quiz, api, onContinue, continueLabel }: {
  quiz: ModuleQuiz; api: ProgressApi; onContinue?: () => void; continueLabel?: string;
}) {
  const [phase, setPhase] = useState<"intro" | "run" | "done">("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const best = api.progress.quizzes[quiz.id];
  const q = quiz.questions[idx];
  const picked = answers[idx];
  const total = quiz.questions.length;
  const score = quiz.questions.reduce((n, qq, i) => n + (answers[i] === qq.answer ? 1 : 0), 0);
  const pct = Math.round((score / total) * 100);
  const passed = pct >= quiz.passPct;

  const start = () => { setAnswers([]); setIdx(0); setPhase("run"); };
  const choose = (i: number) => { if (picked !== undefined) return; const a = [...answers]; a[idx] = i; setAnswers(a); };
  const next = () => {
    if (idx + 1 < total) { setIdx(idx + 1); return; }
    api.recordQuiz(quiz.id, pct, quiz.passPct);
    setPhase("done");
  };

  if (phase === "intro") {
    return (
      <div className="lms-rise mx-auto max-w-2xl rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-8 text-center sm:p-10">
        <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[color:var(--acc-15)] text-[color:var(--acc)]"><Trophy size={30} /></span>
        <h2 className="lms-display text-3xl font-semibold text-white">{quiz.title}</h2>
        <p className="mx-auto mt-3 max-w-md text-[color:var(--muted)]">
          {total} questions. You need {quiz.passPct}% to pass. Each answer shows an explanation, so treat mistakes as part of learning.
        </p>
        <div className="mx-auto mt-6 flex max-w-sm justify-center gap-3 text-sm">
          <span className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-[color:var(--muted)]"><Timer size={14} /> {Math.ceil(total * 0.75)} min</span>
          {best && <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-[color:var(--muted)]">Best: <span className="tabular-nums text-white">{best.best}%</span></span>}
        </div>
        <button type="button" onClick={start} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[color:var(--acc)] px-6 py-3 font-bold text-[#1F1303] hover:brightness-110">
          {best ? "Retake quiz" : "Start quiz"} <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="relative mx-auto max-w-2xl">
        <Confetti run={passed} />
        <div className="lms-rise rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-8 text-center sm:p-10">
          <div className="flex justify-center"><ScoreRing pct={pct} passed={passed} /></div>
          <h2 className="lms-display mt-2 text-3xl font-semibold text-white">{passed ? (pct === 100 ? "Perfect score!" : "You passed!") : "Almost there"}</h2>
          <p className="mx-auto mt-2 max-w-md text-[color:var(--muted)]">
            {score} of {total} correct.{" "}
            {passed ? <>+{pct === 100 ? 75 : 50} XP earned.</> : <>Review the explanations below, then try again. You need {quiz.passPct}%.</>}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={start} className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--line)] px-5 py-3 font-semibold text-white hover:bg-white/[0.05]"><RotateCcw size={17} /> Retake</button>
            {passed && onContinue && (
              <button type="button" onClick={onContinue} className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--acc)] px-5 py-3 font-bold text-[#1F1303] hover:brightness-110">{continueLabel ?? "Continue"} <ArrowRight size={17} /></button>
            )}
          </div>
        </div>
        <ol className="mt-6 grid gap-3">
          {quiz.questions.map((qq, i) => {
            const ok = answers[i] === qq.answer;
            return (
              <li key={qq.id} className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5">
                <p className="flex gap-3 font-semibold text-white">
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${ok ? "bg-emerald-400 text-[#06281C]" : "bg-rose-400 text-[#2A0B0A]"}`}>{ok ? <Check size={14} /> : <X size={14} />}</span>
                  {rich(qq.question)}
                </p>
                {!ok && <p className="mt-2 pl-9 text-sm text-rose-200">Your answer: {rich(qq.options[answers[i] ?? -1] ?? "—")}</p>}
                <p className="mt-1 pl-9 text-sm text-emerald-200">Correct answer: {rich(qq.options[qq.answer] ?? "")}</p>
                <p className="mt-2 pl-9 text-sm text-[color:var(--muted)]">{rich(qq.explain)}</p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  if (!q) return null;
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center justify-between gap-4 text-sm text-[color:var(--muted)]">
        <span className="lms-mono tabular-nums">Question {idx + 1} / {total}</span>
        <span className="tabular-nums">{answers.filter((a, i) => a === quiz.questions[i]?.answer).length} correct</span>
      </div>
      <div className="mb-6 flex gap-1.5">
        {quiz.questions.map((qq, i) => (
          <span key={qq.id} className={`h-1.5 flex-1 rounded-full ${
            i < idx || (i === idx && picked !== undefined)
              ? answers[i] === qq.answer ? "bg-emerald-400" : "bg-rose-400"
              : i === idx ? "bg-[color:var(--acc)]" : "bg-white/[0.08]"}`} />
        ))}
      </div>
      <div key={q.id} className="lms-rise rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-6 sm:p-8">
        <h2 className="lms-display text-2xl font-semibold leading-snug text-white">{rich(q.question)}</h2>
        <div className="mt-6 grid gap-2.5">
          {q.options.map((opt, i) => {
            const state = picked === undefined ? "idle" : i === q.answer ? "right" : i === picked ? "wrong" : "dim";
            return (
              <button key={i} type="button" disabled={picked !== undefined} onClick={() => choose(i)}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[1.02rem] transition-all ${
                  state === "idle" ? "border-[color:var(--line)] bg-white/[0.02] hover:-translate-y-px hover:border-[color:var(--acc-60)] hover:bg-white/[0.05]"
                  : state === "right" ? "border-emerald-400/70 bg-emerald-400/10"
                  : state === "wrong" ? "border-rose-400/70 bg-rose-400/10" : "border-[color:var(--line)] opacity-50"}`}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold ${
                  state === "right" ? "bg-emerald-400 text-[#06281C]" : state === "wrong" ? "bg-rose-400 text-[#2A0B0A]" : "bg-white/[0.07] text-[color:var(--muted)]"}`}>
                  {state === "right" ? <Check size={16} /> : state === "wrong" ? <X size={16} /> : String.fromCharCode(65 + i)}
                </span>
                <span className="text-white">{rich(opt)}</span>
              </button>
            );
          })}
        </div>
        {picked !== undefined && (
          <div className="lms-rise mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className={`rounded-xl px-4 py-3 text-[0.95rem] leading-relaxed ${picked === q.answer ? "bg-emerald-400/10 text-emerald-100" : "bg-rose-400/10 text-rose-100"}`}>
              <strong className="mr-1">{picked === q.answer ? "Correct." : "Not quite."}</strong>{rich(q.explain)}
            </p>
            <button type="button" onClick={next} autoFocus className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[color:var(--acc)] px-5 py-3 font-bold text-[#1F1303] hover:brightness-110">
              {idx + 1 < total ? "Next question" : "See results"} <ArrowRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
