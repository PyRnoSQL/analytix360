import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, Check, X } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";
import { beyond, spcPanels, type Limits, type Panel } from "./spc";
import { CAT, INK, STATUS, fmt } from "./qcolors";

// SPC lab: an interactive Shewhart chart. The learner can be asked to compute the centre line and
// control limits (their lines appear on the chart as they type), to click the points beyond the
// limits, and to recognise a pattern. Hovering a point shows its value.
type SBlock = Extract<Block, { type: "spc" }>;
type Field = "cl" | "ucl" | "lcl";
const FIELDS: Field[] = ["ucl", "cl", "lcl"];
const LABEL: Record<Field, string> = { ucl: "UCL", cl: "CL", lcl: "LCL" };
const num = (s: string) => { const n = Number(s.replace(",", ".").trim()); return s.trim() === "" || !Number.isFinite(n) ? NaN : n; };

function Chart({ panel, entered, showTrue, selected, reveal, onPick, unit, decimals }: {
  panel: Panel; entered: Partial<Record<Field, number>>; showTrue: boolean; selected: Set<string>; reveal: boolean;
  onPick?: (id: string) => void; unit?: string; decimals: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 760, H = 250, L = 64, R = 70, T = 16, B = 30;
  const lim = panel.limits;
  const extra = Object.values(entered).filter((v): v is number => Number.isFinite(v));
  const vals = [...panel.points, lim.ucl, lim.lcl, ...extra];
  let lo = Math.min(...vals), hi = Math.max(...vals);
  const pad = (hi - lo || 1) * 0.12; lo -= pad; hi += pad;
  const x = (i: number) => L + (panel.points.length <= 1 ? 0 : (i * (W - L - R)) / (panel.points.length - 1));
  const y = (v: number) => T + ((hi - v) * (H - T - B)) / (hi - lo);
  const out = new Set(beyond(panel));
  const lines: { v: number; label: string; color: string; dash?: string }[] = [];
  if (showTrue) {
    lines.push({ v: lim.ucl, label: "UCL", color: STATUS.critical, dash: "6 5" }, { v: lim.cl, label: "CL", color: INK.secondary }, { v: lim.lcl, label: "LCL", color: STATUS.critical, dash: "6 5" });
  } else {
    for (const f of FIELDS) { const v = entered[f]; if (v !== undefined && Number.isFinite(v)) lines.push({ v, label: `${LABEL[f]}?`, color: STATUS.warning, dash: "3 4" }); }
  }
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((k) => lo + k * (hi - lo));
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={panel.name}>
        {showTrue && <rect x={L} y={y(lim.ucl)} width={W - L - R} height={Math.max(0, y(lim.lcl) - y(lim.ucl))} fill={STATUS.good} opacity={0.07} />}
        {ticks.map((t, i) => (
          <g key={i}><line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke={INK.grid} /><text x={L - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill={INK.muted}>{fmt(t, decimals)}</text></g>
        ))}
        {lines.map((l, i) => (
          <g key={i}>
            <line x1={L} x2={W - R} y1={y(l.v)} y2={y(l.v)} stroke={l.color} strokeWidth={1.6} strokeDasharray={l.dash} />
            <text x={W - R + 6} y={y(l.v) + 4} fontSize="11" fontWeight="700" fill={l.color}>{l.label}</text>
          </g>
        ))}
        <polyline points={panel.points.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke={CAT[0]} strokeWidth={2} strokeLinejoin="round" />
        {panel.points.map((v, i) => {
          const id = `${panel.key}:${i}`, sel = selected.has(id), bad = reveal && out.has(i);
          return (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={() => onPick?.(id)} style={{ cursor: onPick ? "pointer" : "default" }}>
              <circle cx={x(i)} cy={y(v)} r={13} fill="transparent" />
              {sel && <circle cx={x(i)} cy={y(v)} r={9.5} fill="none" stroke={STATUS.warning} strokeWidth={2.2} />}
              <circle cx={x(i)} cy={y(v)} r={bad ? 6.5 : 5} fill={bad ? STATUS.critical : CAT[0]} stroke={INK.surface} strokeWidth={2} />
            </g>
          );
        })}
        {panel.points.map((_, i) => (i % Math.ceil(panel.points.length / 15) === 0 || i === panel.points.length - 1) && <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10.5" fill={INK.muted}>{i + 1}</text>)}
      </svg>
      {hover !== null && (
        <div className="pointer-events-none absolute rounded-lg border border-[color:var(--line)] bg-[#0B1120] px-2.5 py-1.5 text-xs text-white shadow-xl"
          style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(panel.points[hover] ?? 0) / H) * 100}%`, transform: "translate(-50%, -135%)" }} data-no-translate>
          #{hover + 1}: <b>{fmt(panel.points[hover] ?? 0, decimals + 1)}</b>{unit ? ` ${unit}` : ""}
        </div>
      )}
    </div>
  );
}

export function SpcLab({ block, api }: { block: SBlock; api: ProgressApi }) {
  const panels = useMemo(() => spcPanels(block.chart, block), [block]);
  const decimals = block.decimals ?? 3;
  const askLimits = block.askLimits ?? true, askBeyond = block.askBeyond ?? false;
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const done = !!api.progress.labs[block.id];

  const entered = (p: Panel) => Object.fromEntries(FIELDS.map((f) => [f, num(inputs[`${p.key}.${f}`] ?? "")])) as Record<Field, number>;
  const limitOk = (p: Panel, f: Field) => { const v = entered(p)[f], t = (p.limits as Limits)[f], tol = Math.max(0.01 * (p.limits.ucl - p.limits.lcl), 0.5 * 10 ** -decimals); return Number.isFinite(v) && Math.abs(v - t) <= tol; };
  const panelOk = (p: Panel) => FIELDS.every((f) => limitOk(p, f));
  const truth = new Set(panels.flatMap((p) => beyond(p).map((i) => `${p.key}:${i}`)));
  const beyondOk = selected.size === truth.size && [...selected].every((s) => truth.has(s));
  const qOk = !block.question || answer === String(block.question.answer);
  const allOk = (!askLimits || panels.every(panelOk)) && (!askBeyond || beyondOk) && qOk;
  useEffect(() => { if (checked && allOk && !done) api.completeLab(block.id); }, [checked, allOk, done, api, block.id]);

  const pick = (id: string) => { setChecked(false); setSelected((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; }); };
  const solve = () => {
    const next: Record<string, string> = {};
    for (const p of panels) for (const f of FIELDS) next[`${p.key}.${f}`] = String(Number((p.limits as Limits)[f].toFixed(decimals)));
    setInputs(next); setSelected(new Set(truth)); if (block.question) setAnswer(String(block.question.answer)); setChecked(false);
  };
  const header = block.chart === "xbar-r" ? ["#", ...(block.samples?.[0] ?? []).map((_, i) => `x${i + 1}`), "x̄", "R"] : block.chart === "imr" ? ["#", "x", "MR"] : block.chart === "p" ? ["#", "Defectives", "p"] : ["#", "Defects (c)"];
  const rows = (panels[0]?.points ?? []).map((v, i) => {
    if (block.chart === "xbar-r") return [i + 1, ...(block.samples?.[i] ?? []), fmt(v, decimals + 1), fmt(panels[1]?.points[i] ?? 0, decimals + 1)];
    if (block.chart === "imr") return [i + 1, v, i === 0 ? "—" : fmt(panels[1]?.points[i - 1] ?? 0, decimals + 1)];
    if (block.chart === "p") return [i + 1, block.defectives?.[i] ?? 0, fmt(v, 4)];
    return [i + 1, v];
  });

  return (
    <LabFrame icon={Activity} kind="SPC lab" level={block.level} title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setInputs({}); setSelected(new Set()); setAnswer(""); setChecked(false); }} onSolution={solve}
      footer={<button type="button" onClick={() => setChecked(true)} className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--acc)] px-4 py-2 text-sm font-bold text-[#11131A] hover:brightness-110"><Check size={15} /> Check</button>}>
      <details className="mb-3 text-sm text-[color:var(--muted)]">
        <summary className="cursor-pointer select-none hover:text-white">Show the data ({rows.length} {block.chart === "xbar-r" ? "subgroups" : "points"}{block.chart === "p" ? `, n = ${block.sampleSize ?? 100}` : ""}{block.unit ? `, ${block.unit}` : ""})</summary>
        <div className="lms-scroll mt-2 max-h-64 overflow-auto rounded-xl border border-[color:var(--line)]" data-no-translate>
          <table className="w-full text-right text-xs"><thead className="sticky top-0 bg-[color:var(--raised)]"><tr>{header.map((h) => <th key={h} className="lms-mono px-2 py-1.5 text-[color:var(--muted)]">{h}</th>)}</tr></thead>
            <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-[color:var(--line)]">{r.map((c, j) => <td key={j} className="lms-mono px-2 py-1 text-[#DCE3F2]">{c}</td>)}</tr>)}</tbody></table>
        </div>
      </details>
      <div className="grid gap-4">
        {panels.map((p) => {
          const showTrue = !askLimits || (checked && panelOk(p)) || panelOk(p);
          return (
            <div key={p.key} className="rounded-xl border border-[color:var(--line)] bg-[#0E1424] p-3">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-white">{p.name}</p>
                {showTrue && <span className="lms-mono text-xs text-[color:var(--muted)]" data-no-translate>UCL {fmt(p.limits.ucl, decimals)} · CL {fmt(p.limits.cl, decimals)} · LCL {fmt(p.limits.lcl, decimals)}</span>}
              </div>
              <Chart panel={p} entered={entered(p)} showTrue={showTrue} selected={selected} reveal={checked || done} onPick={askBeyond ? pick : undefined} unit={block.unit} decimals={decimals} />
              {askLimits && (
                <div className="mt-2 flex flex-wrap gap-3">
                  {FIELDS.map((f) => {
                    const key = `${p.key}.${f}`, ok = limitOk(p, f), filled = (inputs[key] ?? "") !== "";
                    return (
                      <label key={f} className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
                        <span className="lms-mono w-9 font-bold text-white">{LABEL[f]}</span>
                        <input value={inputs[key] ?? ""} inputMode="decimal" onChange={(e) => { setChecked(false); setInputs((s) => ({ ...s, [key]: e.target.value })); }}
                          aria-label={`${p.name} ${LABEL[f]}`}
                          className={`lms-mono w-28 rounded-lg border bg-[#0A0F1C] px-2 py-1.5 text-white focus:outline-none ${checked && filled ? (ok ? "border-emerald-400/70" : "border-rose-400/70") : "border-[color:var(--line)] focus:border-[color:var(--acc-60)]"}`} />
                        {checked && filled && (ok ? <Check size={15} className="text-emerald-400" /> : <X size={15} className="text-rose-400" />)}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {askBeyond && <p className="mt-3 text-sm text-[color:var(--muted)]">Click every point that falls outside the control limits (click again to unselect). Selected: <span className="lms-mono text-white">{selected.size}</span></p>}
      {block.question && (
        <div className="mt-3 rounded-xl border border-[color:var(--line)] p-3">
          <label className="text-sm font-semibold text-white" htmlFor={`${block.id}-q`}>{block.question.question}</label>
          <select id={`${block.id}-q`} value={answer} onChange={(e) => { setChecked(false); setAnswer(e.target.value); }} className="mt-2 block w-full max-w-xl rounded-lg border border-[color:var(--line)] bg-[#0A0F1C] px-3 py-2 text-sm text-white">
            <option value="" disabled>Choose…</option>
            {block.question.options.map((o, i) => <option key={i} value={String(i)}>{o}</option>)}
          </select>
          {checked && answer !== "" && block.question.explain && <p className="mt-2 text-sm text-[color:var(--muted)]">{block.question.explain}</p>}
        </div>
      )}
      {checked && (allOk
        ? <p className="lms-rise mt-3 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"><strong>Well done.</strong> Your chart is correct.</p>
        : <p className="lms-rise mt-3 flex items-center gap-2 rounded-xl bg-rose-400/10 px-4 py-3 text-sm text-rose-100"><AlertTriangle size={16} className="shrink-0" /><span>Not yet. Fix the values marked in red{askBeyond && !beyondOk ? " and check which points you selected" : ""}.</span></p>)}
    </LabFrame>
  );
}
