import { useState, type ReactNode } from "react";
import { CheckCircle2, Eye, Lightbulb, RotateCcw, type LucideIcon } from "lucide-react";
import { rich } from "../blocks";

// Shared frame for every hands-on lab: header, task, status, hint/solution/reset.
export function LabFrame({
  icon: Icon, kind, title, task, done, hint, onReset, onSolution, children, footer,
}: {
  icon: LucideIcon; kind: string; title: string; task?: string; done: boolean; hint?: string;
  onReset?: () => void; onSolution?: () => void; children: ReactNode; footer?: ReactNode;
}) {
  const [showHint, setShowHint] = useState(false);
  return (
    <section className={`overflow-hidden rounded-2xl border ${done ? "border-emerald-400/40" : "border-[color:var(--line)]"} bg-[color:var(--panel)]`}>
      <header className="flex flex-wrap items-center gap-3 border-b border-[color:var(--line)] bg-[color:var(--raised)] px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color:var(--acc-15)] text-[color:var(--acc)]"><Icon size={18} /></span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[color:var(--acc)]">{kind}</p>
          <p className="font-bold leading-snug text-white">{title}</p>
        </div>
        {done
          ? <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300"><CheckCircle2 size={14} /> Completed · +15 XP</span>
          : <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold text-[color:var(--muted)]">Hands-on</span>}
      </header>
      {task && <p className="border-b border-[color:var(--line)] px-4 py-3 text-[0.97rem] text-[color:#CDD4E3] sm:px-5"><strong className="mr-1 text-white">Your task:</strong>{rich(task)}</p>}
      <div className="p-4 sm:p-5">{children}</div>
      {(hint || onReset || onSolution || footer) && (
        <footer className="flex flex-wrap items-center gap-2 border-t border-[color:var(--line)] px-4 py-3 sm:px-5">
          {footer}
          <span className="flex-1" />
          {hint && <button type="button" onClick={() => setShowHint((h) => !h)} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[color:var(--muted)] hover:bg-white/[0.05] hover:text-white"><Lightbulb size={15} /> Hint</button>}
          {onSolution && <button type="button" onClick={onSolution} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[color:var(--muted)] hover:bg-white/[0.05] hover:text-white"><Eye size={15} /> Show solution</button>}
          {onReset && <button type="button" onClick={onReset} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[color:var(--muted)] hover:bg-white/[0.05] hover:text-white"><RotateCcw size={15} /> Reset</button>}
        </footer>
      )}
      {showHint && hint && <p className="lms-rise border-t border-[color:var(--line)] bg-sky-400/[0.06] px-4 py-3 text-sm text-sky-100 sm:px-5"><strong className="mr-1">Hint:</strong>{rich(hint)}</p>}
    </section>
  );
}

// Monospace code editor: Tab indents, Ctrl/Cmd+Enter runs.
export function CodeEditor({ id, value, onChange, onRun, rows = 6, label }: {
  id: string; value: string; onChange: (v: string) => void; onRun?: () => void; rows?: number; label: string;
}) {
  return (
    <textarea
      id={id}
      aria-label={label}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); onRun?.(); return; }
        if (e.key === "Tab" && !e.shiftKey) {
          e.preventDefault();
          const t = e.currentTarget, s = t.selectionStart, en = t.selectionEnd;
          const next = value.slice(0, s) + "  " + value.slice(en);
          onChange(next);
          requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 2; });
        }
      }}
      className="lms-mono lms-scroll block w-full resize-y rounded-xl border border-[color:var(--line)] bg-[#0A0F1C] p-4 text-[0.88rem] leading-relaxed text-[#DCE3F2] placeholder:text-[color:var(--muted)] focus:border-[color:var(--acc-60)] focus:outline-none"
      data-no-translate
    />
  );
}

export function ResultTable({ columns, rows }: { columns: string[]; rows: (string | number | null)[][] }) {
  return (
    <div className="lms-scroll max-h-72 overflow-auto rounded-xl border border-[color:var(--line)]" data-no-translate>
      <table className="w-full border-collapse text-left text-sm">
        <thead className="sticky top-0 bg-[color:var(--raised)]">
          <tr>{columns.map((c, i) => <th key={i} className="lms-mono whitespace-nowrap px-3 py-2 text-xs font-bold text-[color:var(--muted)]">{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-[color:var(--line)] odd:bg-white/[0.015]">
              {r.map((v, j) => <td key={j} className={`lms-mono whitespace-nowrap px-3 py-1.5 ${typeof v === "number" ? "text-right tabular-nums text-[#C9D3EA]" : "text-[#DCE3F2]"}`}>{v === null ? <span className="text-[color:var(--muted)]">NULL</span> : String(v)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
