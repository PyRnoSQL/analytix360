import { Fragment, useState, type ReactNode } from "react";
import {
  AlertTriangle, Briefcase, Check, ChevronRight, ExternalLink, KeyRound,
  Lightbulb, ListChecks, XCircle,
} from "lucide-react";
import type { Block, CalloutTone } from "./types";
import type { ProgressApi } from "./progress";
import { SqlLab } from "./labs/SqlLab";
import { SheetLab } from "./labs/SheetLab";
import { PythonLab } from "./labs/PythonLab";
import { DocLab } from "./labs/DocLab";
import { SlideLab } from "./labs/SlideLab";
import { ChartBlock, ExplorerBlock } from "./labs/Charts";
import { FigureBlock } from "./labs/Figure";
import { EquipBlock } from "./labs/EquipBlock";
import { KeysTrainer } from "./labs/KeysTrainer";
import { FormLab } from "./labs/FormLab";
import { XlsFormLab } from "./labs/XlsFormLab";
import { StatLab } from "./labs/StatLab";
import { SpcLab } from "./labs/SpcLab";
import { SorterLab } from "./labs/SorterLab";
import { WhysLab } from "./labs/WhysLab";
import { CaliperLab } from "./labs/CaliperLab";
import { ParetoLab } from "./labs/ParetoLab";
import { CapabilityLab } from "./labs/CapabilityLab";

// **bold** and `code` inside lesson text
export function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="lms-code">{part.slice(1, -1)}</code>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

const TONES: Record<CalloutTone, { icon: typeof Lightbulb; label: string; ring: string; tint: string; fg: string }> = {
  tip: { icon: Lightbulb, label: "Tip", ring: "border-sky-400/25", tint: "bg-sky-400/[0.07]", fg: "text-sky-300" },
  warning: { icon: AlertTriangle, label: "Watch out", ring: "border-rose-400/25", tint: "bg-rose-400/[0.07]", fg: "text-rose-300" },
  key: { icon: KeyRound, label: "Key idea", ring: "border-[color:var(--acc-30)]", tint: "bg-[color:var(--acc-8)]", fg: "text-[color:var(--acc)]" },
  workplace: { icon: Briefcase, label: "In the workplace", ring: "border-emerald-400/25", tint: "bg-emerald-400/[0.07]", fg: "text-emerald-300" },
};

function Keys({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1">
      {keys.map((k, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="text-xs text-[color:var(--muted)]">+</span>}
          <kbd className="lms-kbd">{k}</kbd>
        </Fragment>
      ))}
    </span>
  );
}

function KnowledgeCheck({ block, api }: { block: Extract<Block, { type: "check" }>; api: ProgressApi }) {
  const saved = api.progress.checks[block.id];
  const [choice, setChoice] = useState<number | undefined>(saved);
  const answered = choice !== undefined;
  const correct = choice === block.answer;
  return (
    <section className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--raised)] p-5 sm:p-6">
      <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[color:var(--acc)]">Quick check</p>
      <p className="mb-4 text-lg font-bold leading-snug text-white">{rich(block.question)}</p>
      <div className="grid gap-2">
        {block.options.map((opt, i) => {
          const isAnswer = i === block.answer;
          const picked = i === choice;
          const state = !answered ? "idle" : isAnswer ? "right" : picked ? "wrong" : "dim";
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => { setChoice(i); api.answerCheck(block.id, i); }}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                state === "idle" ? "border-[color:var(--line)] bg-white/[0.02] hover:border-[color:var(--acc-60)] hover:bg-white/[0.05]"
                : state === "right" ? "border-emerald-400/60 bg-emerald-400/10"
                : state === "wrong" ? "border-rose-400/60 bg-rose-400/10"
                : "border-[color:var(--line)] opacity-55"}`}
            >
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                state === "right" ? "bg-emerald-400 text-[#06281C]" : state === "wrong" ? "bg-rose-400 text-[#2A0B0A]" : "bg-white/[0.07] text-[color:var(--muted)]"}`}>
                {state === "right" ? <Check size={15} /> : state === "wrong" ? <XCircle size={15} /> : String.fromCharCode(65 + i)}
              </span>
              <span>{rich(opt)}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <p className={`lms-rise mt-4 rounded-xl px-4 py-3 text-[0.95rem] leading-relaxed ${correct ? "bg-emerald-400/10 text-emerald-100" : "bg-rose-400/10 text-rose-100"}`}>
          <strong className="mr-1">{correct ? "Correct. +5 XP." : "Not quite."}</strong>{rich(block.explain)}
        </p>
      )}
    </section>
  );
}

function Task({ block, api }: { block: Extract<Block, { type: "task" }>; api: ProgressApi }) {
  const done = api.progress.tasks[block.id] ?? [];
  const all = done.length >= block.items.length;
  return (
    <section className={`rounded-2xl border p-5 sm:p-6 transition-colors ${all ? "border-emerald-400/40 bg-emerald-400/[0.05]" : "border-[color:var(--line)] bg-[color:var(--panel)]"}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-bold text-white"><ListChecks size={18} className="text-[color:var(--acc)]" />{block.title}</p>
        <span className="lms-mono text-xs tabular-nums text-[color:var(--muted)]">{done.length}/{block.items.length}{all ? " · +10 XP" : ""}</span>
      </div>
      <ul className="grid gap-1.5">
        {block.items.map((item, i) => {
          const on = done.includes(i);
          return (
            <li key={i}>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 hover:bg-white/[0.04]">
                <input id={`${block.id}-${i}`} type="checkbox" checked={on} onChange={() => api.toggleTask(block.id, i)} className="peer sr-only" />
                <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[color:var(--acc)] ${on ? "border-emerald-400 bg-emerald-400 text-[#06281C]" : "border-[#3A4666]"}`}>
                  {on && <Check size={13} strokeWidth={3} />}
                </span>
                <span className={on ? "text-[color:var(--muted)] line-through decoration-[#3A4666]" : ""}>{rich(item)}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function BlockView({ block, api }: { block: Block; api: ProgressApi }) {
  switch (block.type) {
    case "p":
      return <p className="text-[color:#CDD4E3]">{rich(block.text)}</p>;
    case "h":
      return <h3 className="lms-display pt-4 text-2xl font-semibold text-white">{block.text}</h3>;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className={`grid gap-2 pl-5 text-[color:#CDD4E3] ${block.ordered ? "list-decimal" : "list-disc marker:text-[color:var(--acc)]"}`}>
          {block.items.map((it, i) => <li key={i} className="pl-1">{rich(it)}</li>)}
        </Tag>
      );
    }
    case "steps":
      return (
        <section className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] p-5 sm:p-6">
          {block.title && <p className="mb-4 font-bold text-white">{block.title}</p>}
          <ol className="grid gap-3">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-3">
                <span className="lms-mono grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[color:var(--acc-15)] text-xs font-bold text-[color:var(--acc)]">{i + 1}</span>
                <span className="pt-0.5 text-[color:#CDD4E3]">{rich(it)}</span>
              </li>
            ))}
          </ol>
        </section>
      );
    case "path":
      return (
        <div className="rounded-xl border border-[color:var(--line)] bg-[#0B1120] px-4 py-3">
          <div className="flex flex-wrap items-center gap-1.5 text-sm">
            {block.items.map((it, i) => (
              <Fragment key={i}>
                {i > 0 && <ChevronRight size={14} className="text-[color:var(--muted)]" />}
                <span className={`rounded-md px-2 py-0.5 font-semibold ${i === block.items.length - 1 ? "bg-[color:var(--acc)] text-[#1F1303]" : "bg-white/[0.06] text-white"}`}>{it}</span>
              </Fragment>
            ))}
          </div>
          {block.note && <p className="mt-2 text-sm text-[color:var(--muted)]">{rich(block.note)}</p>}
        </div>
      );
    case "shortcuts":
      return (
        <section>
          {block.title && <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[color:var(--muted)]">{block.title}</p>}
          <div className="grid gap-2 sm:grid-cols-2">
            {block.items.map((s, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--panel)] px-3.5 py-2.5">
                <span className="text-[0.95rem] text-[color:#CDD4E3]">{s.action}</span>
                <Keys keys={s.keys} />
              </div>
            ))}
          </div>
        </section>
      );
    case "callout": {
      const t = TONES[block.tone];
      const Icon = t.icon;
      return (
        <aside className={`flex gap-4 rounded-2xl border ${t.ring} ${t.tint} p-5`}>
          <Icon size={22} className={`mt-0.5 shrink-0 ${t.fg}`} />
          <div>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.14em] ${t.fg}`}>{t.label}</p>
            <p className="mb-1 mt-0.5 font-bold text-white">{block.title}</p>
            <p className="text-[color:#CDD4E3]">{rich(block.text)}</p>
          </div>
        </aside>
      );
    }
    case "check":
      return <KnowledgeCheck block={block} api={api} />;
    case "task":
      return <Task block={block} api={api} />;
    case "table":
      return (
        <div className="lms-scroll overflow-x-auto rounded-2xl border border-[color:var(--line)]">
          <table className="w-full min-w-[32rem] border-collapse text-left text-[0.95rem]">
            <thead className="bg-[color:var(--raised)]">
              <tr>{block.head.map((h, i) => <th key={i} className="px-4 py-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[color:var(--muted)]">{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i} className="border-t border-[color:var(--line)] odd:bg-white/[0.015]">
                  {r.map((c, j) => <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-semibold text-white" : "text-[color:#CDD4E3]"}`}>{rich(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "sql": return <SqlLab block={block} api={api} />;
    case "sheet": return <SheetLab block={block} api={api} />;
    case "python": return <PythonLab block={block} api={api} />;
    case "doc": return <DocLab block={block} api={api} />;
    case "slide": return <SlideLab block={block} api={api} />;
    case "chart": return <ChartBlock block={block} api={api} />;
    case "explorer": return <ExplorerBlock block={block} api={api} />;
    case "figure": return <FigureBlock block={block} api={api} />;
    case "equip": return <EquipBlock block={block} />;
    case "keys": return <KeysTrainer block={block} api={api} />;
    case "form": return <FormLab block={block} api={api} />;
    case "xlsform": return <XlsFormLab block={block} api={api} />;
    case "statlab": return <StatLab block={block} api={api} />;
    case "spc": return <SpcLab block={block} api={api} />;
    case "sorter": return <SorterLab block={block} api={api} />;
    case "whys": return <WhysLab block={block} api={api} />;
    case "caliper": return <CaliperLab block={block} api={api} />;
    case "pareto": return <ParetoLab block={block} api={api} />;
    case "capability": return <CapabilityLab block={block} api={api} />;
    case "html":
      return <div className="lms-html" dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "code":
      return <pre className="lms-scroll lms-mono overflow-x-auto rounded-2xl border border-[color:var(--line)] bg-[#0A0F1C] p-5 text-sm leading-relaxed text-[#C9D3EA]">{block.text}</pre>;
    case "links":
      return (
        <section className="border-t border-[color:var(--line)] pt-6">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[color:var(--muted)]">Further reading</p>
          <ul className="grid gap-2">
            {block.items.map((l, i) => (
              <li key={i}>
                <a href={l.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 rounded-xl border border-[color:var(--line)] px-4 py-3 hover:border-[color:var(--acc-50)] hover:bg-white/[0.03]">
                  <span>
                    <span className="block font-semibold text-white group-hover:text-[color:var(--acc)]">{l.label}</span>
                    <span className="text-sm text-[color:var(--muted)]">{l.source}</span>
                  </span>
                  <ExternalLink size={16} className="shrink-0 text-[color:var(--muted)]" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      );
  }
}

