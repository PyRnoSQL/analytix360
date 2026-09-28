import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Check, Circle, FileText, Italic, List, ListOrdered, Underline,
} from "lucide-react";
import type { Block, DocCheck } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";

type DocBlock = Extract<Block, { type: "doc" }>;

const requirement = (c: DocCheck) =>
  c.kind === "heading" ? (c.level === 1 ? "Heading 1" : "Heading 2")
  : c.kind === "align" ? (c.value === "center" ? "Centred" : c.value === "right" ? "Right-aligned" : "Justified")
  : c.kind === "bold" ? "Bold"
  : c.ordered ? "Numbered list" : "Bulleted list";

function Describe({ c }: { c: DocCheck }) {
  if (c.kind === "list") return <span><span>{requirement(c)}</span> <span className="lms-mono">({c.min}+)</span></span>;
  return <span><span className="text-white" data-no-translate>“{c.text}”</span> <span aria-hidden>→</span> <span>{requirement(c)}</span></span>;
}

function evaluate(root: HTMLElement, c: DocCheck): boolean {
  const has = (el: Element, t: string) => (el.textContent ?? "").toLowerCase().includes(t.toLowerCase());
  if (c.kind === "heading") return [...root.querySelectorAll(`h${c.level}`)].some((el) => has(el, c.text));
  if (c.kind === "list") return [...root.querySelectorAll(c.ordered ? "ol" : "ul")].some((l) => l.querySelectorAll("li").length >= c.min);
  if (c.kind === "bold") {
    return [...root.querySelectorAll("b, strong, span, font, h1, h2, h3")].some((el) =>
      has(el, c.text) && (el.tagName === "B" || el.tagName === "STRONG" || Number(getComputedStyle(el).fontWeight) >= 600) && !/^H[1-3]$/.test(el.tagName));
  }
  const blocks = [...root.querySelectorAll("p, h1, h2, h3, div, li")].filter((el) => has(el, c.text));
  return blocks.some((el) => getComputedStyle(el).textAlign === c.value);
}

const TOOLS: { label: string; icon: typeof Bold; cmd: string; arg?: string }[] = [
  { label: "Bold (Ctrl+B)", icon: Bold, cmd: "bold" },
  { label: "Italic (Ctrl+I)", icon: Italic, cmd: "italic" },
  { label: "Underline (Ctrl+U)", icon: Underline, cmd: "underline" },
  { label: "Align left (Ctrl+L)", icon: AlignLeft, cmd: "justifyLeft" },
  { label: "Center (Ctrl+E)", icon: AlignCenter, cmd: "justifyCenter" },
  { label: "Align right (Ctrl+R)", icon: AlignRight, cmd: "justifyRight" },
  { label: "Justify (Ctrl+J)", icon: AlignJustify, cmd: "justifyFull" },
  { label: "Bullets", icon: List, cmd: "insertUnorderedList" },
  { label: "Numbering", icon: ListOrdered, cmd: "insertOrderedList" },
];

export function DocLab({ block, api }: { block: DocBlock; api: ProgressApi }) {
  const ref = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<boolean[]>(block.checks.map(() => false));
  const [version, setVersion] = useState(0);
  const done = !!api.progress.labs[block.id];

  const check = useCallback(() => {
    const root = ref.current;
    if (!root) return;
    const r = block.checks.map((c) => evaluate(root, c));
    setResults(r);
    if (r.every(Boolean)) api.completeLab(block.id);
  }, [block, api]);

  useEffect(() => { if (ref.current) { ref.current.innerHTML = block.html; check(); } }, [block.html, version]); // eslint-disable-line react-hooks/exhaustive-deps

  const exec = (cmd: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    check();
  };

  return (
    <LabFrame icon={FileText} kind="Word lab" title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => setVersion((v) => v + 1)}>
      {/* Ribbon */}
      <div role="toolbar" aria-label="Formatting" className="mb-3 flex flex-wrap items-center gap-1 rounded-xl border border-[color:var(--line)] bg-[color:var(--raised)] p-1.5">
        <select aria-label="Style" defaultValue="" onChange={(e) => { if (e.target.value) exec("formatBlock", e.target.value); e.target.value = ""; }}
          className="rounded-lg border border-[color:var(--line)] bg-[#0A0F1C] px-2 py-1.5 text-sm text-white">
          <option value="" disabled>Styles</option>
          <option value="<h1>">Heading 1</option>
          <option value="<h2>">Heading 2</option>
          <option value="<p>">Normal</option>
        </select>
        <span className="mx-1 h-6 w-px bg-[color:var(--line)]" />
        {TOOLS.map((t) => (
          <button key={t.cmd} type="button" title={t.label} aria-label={t.label} onMouseDown={(e) => e.preventDefault()} onClick={() => exec(t.cmd, t.arg)}
            className="grid h-8 w-8 place-items-center rounded-lg text-[#DCE3F2] hover:bg-white/[0.08]"><t.icon size={16} /></button>
        ))}
      </div>
      {/* Page */}
      <div className="rounded-xl bg-[#2A3147] p-3 sm:p-6">
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          spellCheck
          onInput={check}
          onKeyUp={check}
          onMouseUp={check}
          aria-label="Document"
          className="lms-doc mx-auto min-h-[18rem] max-w-[42rem] rounded-sm bg-white px-8 py-10 text-[#1B1B1B] shadow-2xl focus:outline-none sm:px-14"
        />
      </div>
      {/* Checklist */}
      <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
        {block.checks.map((c, i) => (
          <li key={i} className={`flex items-start gap-2 text-sm ${results[i] ? "text-emerald-200" : "text-[color:var(--muted)]"}`}>
            {results[i] ? <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" /> : <Circle size={16} className="mt-0.5 shrink-0" />}
            <Describe c={c} />
          </li>
        ))}
      </ul>
    </LabFrame>
  );
}
