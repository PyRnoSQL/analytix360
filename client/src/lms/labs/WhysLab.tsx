import { useEffect, useState } from "react";
import { ArrowDown, HelpCircle, Target, Wrench } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { rich } from "../blocks";
import { LabFrame } from "./LabFrame";
import { STATUS } from "./qcolors";

// 5 Whys lab: starting from the problem, the learner picks the direct cause at each level.
// A wrong pick explains why it is not the direct cause; the chain grows down to the root cause,
// then (optionally) the learner chooses the countermeasure that removes it.
type WBlock = Extract<Block, { type: "whys" }>;

export function WhysLab({ block, api }: { block: WBlock; api: ProgressApi }) {
  const [level, setLevel] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [cm, setCm] = useState<number | null>(null);
  const done = !!api.progress.labs[block.id];
  const chainDone = level >= block.steps.length;
  const finished = chainDone && (!block.countermeasure || cm === block.countermeasure.answer);
  useEffect(() => { if (finished && !done) api.completeLab(block.id); }, [finished, done, api, block.id]);

  const pick = (i: number) => {
    const s = block.steps[level];
    if (!s) return;
    if (i === s.answer) { setLevel((l) => l + 1); setWrong(null); } else setWrong(i);
  };
  const step = block.steps[level];

  return (
    <LabFrame icon={HelpCircle} kind="5 Whys lab" level={block.level} title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setLevel(0); setWrong(null); setCm(null); }}
      onSolution={() => { setLevel(block.steps.length); setWrong(null); setCm(block.countermeasure?.answer ?? null); }}>
      <div className="mx-auto grid max-w-2xl gap-0">
        <div className="rounded-xl border-2 px-4 py-3" style={{ borderColor: STATUS.critical, background: "rgba(208,59,59,0.10)" }}>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em]" style={{ color: "#F19A9A" }}>Problem</p>
          <p className="mt-0.5 font-semibold text-white">{rich(block.problem)}</p>
        </div>
        {block.steps.slice(0, level).map((s, i) => (
          <div key={i} className="lms-rise">
            <div className="flex items-center gap-2 py-1.5 pl-5 text-xs font-bold text-[color:var(--acc)]"><ArrowDown size={14} /><span>Why? ({i + 1})</span></div>
            <div className={`rounded-xl border px-4 py-3 ${i === block.steps.length - 1 ? "" : "border-[color:var(--line)] bg-white/[0.03]"}`}
              style={i === block.steps.length - 1 ? { borderColor: STATUS.warning, background: "rgba(250,178,25,0.10)" } : undefined}>
              {i === block.steps.length - 1 && <p className="mb-0.5 flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em]" style={{ color: STATUS.warning }}><Target size={13} /> Root cause</p>}
              <p className="text-[0.95rem] text-[#DCE3F2]">{s.options[s.answer]}</p>
              {s.explain && <p className="mt-1 text-xs text-[color:var(--muted)]">{s.explain}</p>}
            </div>
          </div>
        ))}
        {step && (
          <div className="lms-rise">
            <div className="flex items-center gap-2 py-1.5 pl-5 text-xs font-bold text-[color:var(--acc)]"><ArrowDown size={14} /><span>Why? ({level + 1})</span></div>
            <div className="rounded-xl border border-dashed border-[color:var(--acc-50)] p-3">
              <p className="mb-2 text-sm font-semibold text-white">{step.question}</p>
              <div className="grid gap-2">
                {step.options.map((o, i) => (
                  <button key={i} type="button" onClick={() => pick(i)}
                    className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${wrong === i ? "border-rose-400/60 bg-rose-400/10 text-rose-100" : "border-[color:var(--line)] text-[#DCE3F2] hover:border-[color:var(--acc-50)] hover:bg-white/[0.04]"}`}>{o}</button>
                ))}
              </div>
              {wrong !== null && <p className="lms-rise mt-2 text-sm text-rose-100/90">Not the direct cause. Look for what makes the previous answer happen, not a symptom or a person to blame.</p>}
            </div>
          </div>
        )}
        {chainDone && block.countermeasure && (
          <div className="lms-rise mt-4 rounded-xl border border-[color:var(--line)] p-3">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white"><Wrench size={15} className="text-[color:var(--acc)]" />{block.countermeasure.question}</p>
            <div className="grid gap-2">
              {block.countermeasure.options.map((o, i) => (
                <button key={i} type="button" onClick={() => setCm(i)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${cm === i ? (i === block.countermeasure?.answer ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100" : "border-rose-400/60 bg-rose-400/10 text-rose-100") : "border-[color:var(--line)] text-[#DCE3F2] hover:bg-white/[0.04]"}`}>{o}</button>
              ))}
            </div>
            {cm !== null && block.countermeasure.explain && <p className="mt-2 text-sm text-[color:var(--muted)]">{block.countermeasure.explain}</p>}
          </div>
        )}
      </div>
    </LabFrame>
  );
}
