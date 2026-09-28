import { useEffect, useMemo, useState } from "react";
import { Check, Sheet, X } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";
import { colName, evaluateSheet, formatValue, isErr, refName, type Raw } from "./formula";

type SheetBlock = Extract<Block, { type: "sheet" }>;

const initialRaw = (b: SheetBlock): Raw => {
  const raw: Raw = {};
  b.data.forEach((row, r) => row.forEach((v, c) => { if (v !== null && v !== "") raw[refName(r, c)] = String(v); }));
  return raw;
};

export function SheetLab({ block, api }: { block: SheetBlock; api: ProgressApi }) {
  const [raw, setRaw] = useState<Raw>(() => initialRaw(block));
  const [sel, setSel] = useState<string>(block.editable[0] ?? "A1");
  const [editing, setEditing] = useState<string | null>(null);
  const values = useMemo(() => evaluateSheet(raw), [raw]);
  const done = !!api.progress.labs[block.id];
  const rows = block.data.length;
  const cols = Math.max(...block.data.map((r) => r.length));
  const editable = new Set(block.editable);

  const results = block.checks.map((c) => {
    const v = values[c.cell];
    const ok = v !== undefined && !isErr(v) && (typeof c.equals === "number"
      ? typeof v === "number" && Math.abs(v - c.equals) <= (c.tol ?? 0.005)
      : String(v).trim().toLowerCase() === c.equals.toLowerCase());
    return { ...c, ok };
  });
  const allOk = results.every((r) => r.ok);
  const touched = block.editable.some((c) => (raw[c] ?? "") !== (initialRaw(block)[c] ?? ""));
  useEffect(() => { if (allOk && touched && !done) api.completeLab(block.id); }, [allOk, touched, done, api, block.id]);

  const setCell = (ref: string, v: string) => setRaw((r) => ({ ...r, [ref]: v }));
  const move = (ref: string, dr: number, dc: number) => {
    const m = ref.match(/^([A-Z]+)(\d+)$/);
    if (!m || !m[1] || !m[2]) return;
    const c = m[1].charCodeAt(0) - 65 + dc, r = Number(m[2]) - 1 + dr;
    if (r >= 0 && r < rows && c >= 0 && c < cols) setSel(refName(r, c));
  };

  return (
    <LabFrame icon={Sheet} kind="Excel lab" level={block.level} title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setRaw(initialRaw(block)); setEditing(null); }}
      onSolution={block.solution ? () => setRaw((r) => ({ ...r, ...block.solution })) : undefined}>
      {/* Formula bar */}
      <div className="mb-2 flex items-center gap-2 rounded-xl border border-[color:var(--line)] bg-[#0A0F1C] px-3 py-2" data-no-translate>
        <span className="lms-mono w-12 shrink-0 text-xs font-bold text-[color:var(--acc)]">{sel}</span>
        <span className="lms-mono text-xs italic text-[color:var(--muted)]">fx</span>
        <input
          id={`${block.id}-fx`}
          aria-label={`Formula for cell ${sel}`}
          value={raw[sel] ?? ""}
          readOnly={!editable.has(sel)}
          onChange={(e) => setCell(sel, e.target.value)}
          placeholder={editable.has(sel) ? "Type a value or a formula such as =SUM(B2:B5)" : "This cell is locked"}
          className="lms-mono min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-[color:var(--muted)] focus:outline-none"
        />
      </div>
      {/* Grid */}
      <div className="lms-scroll overflow-x-auto rounded-xl border border-[color:var(--line)]" data-no-translate>
        <table className="border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-10 bg-[color:var(--raised)]" />
              {Array.from({ length: cols }, (_, c) => <th key={c} className="lms-mono min-w-[7.5rem] border-l border-[color:var(--line)] bg-[color:var(--raised)] px-2 py-1 text-xs font-bold text-[color:var(--muted)]">{colName(c)}</th>)}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, r) => (
              <tr key={r}>
                <th className="lms-mono border-t border-[color:var(--line)] bg-[color:var(--raised)] px-2 text-xs font-bold text-[color:var(--muted)]">{r + 1}</th>
                {Array.from({ length: cols }, (_, c) => {
                  const ref = refName(r, c);
                  const v = values[ref];
                  const isEdit = editable.has(ref);
                  const isSel = sel === ref;
                  const check = results.find((x) => x.cell === ref);
                  return (
                    <td key={c} className={`relative border-l border-t border-[color:var(--line)] p-0 ${isEdit ? "bg-[color:var(--acc-8)]" : ""}`}>
                      {editing === ref ? (
                        <input
                          autoFocus
                          aria-label={`Cell ${ref}`}
                          value={raw[ref] ?? ""}
                          onChange={(e) => setCell(ref, e.target.value)}
                          onBlur={() => setEditing(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") { e.preventDefault(); setEditing(null); move(ref, 1, 0); }
                            if (e.key === "Tab") { e.preventDefault(); setEditing(null); move(ref, 0, 1); }
                            if (e.key === "Escape") setEditing(null);
                          }}
                          className="lms-mono h-full w-full bg-[#0A0F1C] px-2 py-1.5 text-sm text-white outline outline-2 outline-[color:var(--acc)]"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSel(ref)}
                          onDoubleClick={() => isEdit && setEditing(ref)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && isEdit) { e.preventDefault(); setEditing(ref); }
                            if (e.key === "ArrowDown") { e.preventDefault(); move(ref, 1, 0); }
                            if (e.key === "ArrowUp") { e.preventDefault(); move(ref, -1, 0); }
                            if (e.key === "ArrowRight") { e.preventDefault(); move(ref, 0, 1); }
                            if (e.key === "ArrowLeft") { e.preventDefault(); move(ref, 0, -1); }
                          }}
                          className={`block h-full min-h-[2.1rem] w-full px-2 py-1.5 text-left ${typeof v === "number" ? "text-right tabular-nums" : ""} ${isErr(v) ? "text-rose-300" : r === 0 ? "font-bold text-white" : "text-[#DCE3F2]"} ${isSel ? "outline outline-2 -outline-offset-2 outline-[color:var(--acc)]" : ""}`}
                        >
                          {formatValue(v)}
                          {check && (raw[ref] ?? "") !== "" && (
                            <span className={`absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full ${check.ok ? "bg-emerald-400 text-[#06281C]" : "bg-rose-400 text-[#2A0B0A]"}`}>{check.ok ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}</span>
                          )}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-[color:var(--muted)]">Highlighted cells are yours to fill. Double-click a cell or use the formula bar. French function names (SOMME, SI, RECHERCHEV…) work too.</p>
      {allOk && <p className="lms-rise mt-3 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"><strong>Well done.</strong> Every target cell has the right result.</p>}
    </LabFrame>
  );
}
