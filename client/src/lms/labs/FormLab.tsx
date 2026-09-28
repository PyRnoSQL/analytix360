import { useState } from "react";
import { Check, ClipboardCheck, X } from "lucide-react";
import type { Block, FormField } from "../types";
import type { ProgressApi } from "../progress";
import { rich } from "../blocks";
import { LabFrame } from "./LabFrame";

// A graded practice sheet: each question is answered with a dropdown or a typed answer.
// Typed answers are compared without spaces or capitals ("Ctrl + Alt + 2" = "ctrl+alt+2"),
// or matched against a pattern when several answers are acceptable (file names).
type FormBlock = Extract<Block, { type: "form" }>;

const squash = (s: string) => s.toLowerCase().replace(/\s+/g, "").replace(/[’‘]/g, "'");
const isRight = (f: FormField, v: string) => {
  if (f.kind === "select") return v === String(f.answer);
  const t = v.trim();
  if (!t) return false;
  if (f.pattern && new RegExp(f.pattern, "i").test(t)) return true;
  return (f.accept ?? []).some((a) => squash(a) === squash(t));
};
const solutionOf = (f: FormField) => (f.kind === "select" ? String(f.answer) : f.accept?.[0] ?? f.example ?? "");

export function FormLab({ block, api }: { block: FormBlock; api: ProgressApi }) {
  const blank = () => block.fields.map(() => "");
  const [vals, setVals] = useState<string[]>(blank);
  const [checked, setChecked] = useState(false);
  const done = !!api.progress.labs[block.id];
  const results = block.fields.map((f, i) => isRight(f, vals[i] ?? ""));
  const score = results.filter(Boolean).length;
  const total = block.fields.length;
  const set = (i: number, v: string) => setVals((x) => x.map((y, j) => (j === i ? v : y)));
  const submit = () => { setChecked(true); if (results.every(Boolean)) api.completeLab(block.id); };

  return (
    <LabFrame icon={ClipboardCheck} kind="Practice exercise" level={block.level} title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setVals(blank()); setChecked(false); }}
      onSolution={() => { setVals(block.fields.map(solutionOf)); setChecked(false); }}
      footer={
        <button type="button" onClick={submit} className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--acc)] px-4 py-2 text-sm font-bold text-[#11131A] hover:brightness-110">
          <Check size={15} /> Check my answers
        </button>
      }>
      <ol className="grid gap-3">
        {block.fields.map((f, i) => {
          const state = !checked ? "idle" : results[i] ? "ok" : "bad";
          const id = `${block.id}-f${i}`;
          const input = "w-full rounded-lg border border-[color:var(--line)] bg-[#0A0F1C] px-3 py-2 text-sm text-white focus:border-[color:var(--acc-60)] focus:outline-none";
          return (
            <li key={i} className={`rounded-xl border p-3 sm:p-4 ${state === "ok" ? "border-emerald-400/40 bg-emerald-400/[0.05]" : state === "bad" ? "border-rose-400/40 bg-rose-400/[0.05]" : "border-[color:var(--line)] bg-white/[0.02]"}`}>
              <label htmlFor={id} className="flex gap-3 text-[0.95rem] leading-relaxed text-[#DCE3F2]">
                <span className="lms-mono shrink-0 pt-0.5 text-xs font-bold text-[color:var(--acc)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">{rich(f.label)}</span>
              </label>
              <div className="mt-2 flex items-center gap-2 sm:pl-8">
                <div className="min-w-0 flex-1 sm:max-w-md">
                  {f.kind === "select" ? (
                    <select id={id} value={vals[i] ?? ""} onChange={(e) => set(i, e.target.value)} className={input}>
                      <option value="" disabled>Choose…</option>
                      {f.options.map((o, j) => <option key={j} value={String(j)}>{o}</option>)}
                    </select>
                  ) : (
                    <input id={id} value={vals[i] ?? ""} onChange={(e) => set(i, e.target.value)} placeholder={f.placeholder}
                      spellCheck={false} autoComplete="off" autoCapitalize="off" className={`${input} ${f.mono ? "lms-mono" : ""}`} />
                  )}
                </div>
                {state === "ok" && <Check size={18} className="shrink-0 text-emerald-400" aria-label="Correct" />}
                {state === "bad" && <X size={18} className="shrink-0 text-rose-400" aria-label="Not correct" />}
              </div>
              {checked && f.explain && <p className="lms-rise mt-2 text-sm text-[color:var(--muted)] sm:pl-8">{rich(f.explain)}</p>}
            </li>
          );
        })}
      </ol>
      {checked && (score === total
        ? <p className="lms-rise mt-3 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"><strong>Well done.</strong> All answers are correct.</p>
        : <p className="lms-rise mt-3 rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-[color:var(--muted)]"><span className="lms-mono tabular-nums text-white">{score}/{total}</span> <span>correct. Fix the answers marked in red and check again.</span></p>)}
    </LabFrame>
  );
}
