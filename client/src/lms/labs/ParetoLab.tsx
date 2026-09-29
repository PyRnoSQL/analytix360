import { useEffect, useMemo, useState } from "react";
import { BarChart3, Check } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";
import { CAT, INK, STATUS } from "./qcolors";

// Pareto lab: categories are sorted from largest to smallest; the learner clicks the bars that make up
// the "vital few" (the smallest group reaching the threshold, 80% by default). The cumulative line
// appears when they check.
type PBlock = Extract<Block, { type: "pareto" }>;

export function ParetoLab({ block, api }: { block: PBlock; api: ProgressApi }) {
  const cats = useMemo(() => [...block.categories].sort((a, b) => b.count - a.count), [block.categories]);
  const total = cats.reduce((s, c) => s + c.count, 0) || 1;
  const cum = cats.reduce<number[]>((a, c) => [...a, (a[a.length - 1] ?? 0) + (c.count / total) * 100], []);
  const threshold = block.threshold ?? 80;
  const vital = cum.findIndex((v) => v >= threshold - 1e-9) + 1;
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const done = !!api.progress.labs[block.id];
  const ok = sel.size === vital && [...sel].every((i) => i < vital);
  useEffect(() => { if (checked && ok && !done) api.completeLab(block.id); }, [checked, ok, done, api, block.id]);
  const show = checked || done;

  const W = 780, H = 330, L = 56, R = 52, T = 18, B = 70;
  const bw = (W - L - R) / cats.length, maxC = Math.max(...cats.map((c) => c.count)) * 1.1;
  const yC = (v: number) => T + (1 - v / maxC) * (H - T - B);
  const yP = (p: number) => T + (1 - p / 100) * (H - T - B);
  const toggle = (i: number) => { setChecked(false); setSel((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; }); };

  return (
    <LabFrame icon={BarChart3} kind="Pareto lab" level={block.level} title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setSel(new Set()); setChecked(false); }} onSolution={() => { setSel(new Set([...Array(vital).keys()])); setChecked(false); }}
      footer={<button type="button" onClick={() => setChecked(true)} className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--acc)] px-4 py-2 text-sm font-bold text-[#11131A] hover:brightness-110"><Check size={15} /> Check</button>}>
      <div className="relative rounded-xl border border-[color:var(--line)] bg-[#0E1424] p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Pareto chart">
          {[0, 0.25, 0.5, 0.75, 1].map((k) => (
            <g key={k}><line x1={L} x2={W - R} y1={yC(k * maxC)} y2={yC(k * maxC)} stroke={INK.grid} /><text x={L - 8} y={yC(k * maxC) + 4} textAnchor="end" fontSize="11" fill={INK.muted}>{Math.round(k * maxC)}</text></g>
          ))}
          {show && <><line x1={L} x2={W - R} y1={yP(threshold)} y2={yP(threshold)} stroke={STATUS.warning} strokeDasharray="5 5" /><text x={W - R + 6} y={yP(threshold) + 4} fontSize="11" fontWeight="700" fill={STATUS.warning}>{threshold}%</text></>}
          {cats.map((c, i) => {
            const x = L + i * bw + 2, h = H - B - yC(c.count), on = sel.has(i);
            return (
              <g key={i} onClick={() => toggle(i)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
                <rect x={L + i * bw} y={T} width={bw} height={H - T - B} fill="transparent" />
                <path d={`M${x} ${H - B} V${yC(c.count) + 4} Q${x} ${yC(c.count)} ${x + 4} ${yC(c.count)} H${x + bw - 8} Q${x + bw - 4} ${yC(c.count)} ${x + bw - 4} ${yC(c.count) + 4} V${H - B} Z`}
                  fill={on ? CAT[2] : CAT[0]} opacity={h > 0 ? 1 : 0} />
                <text x={x + (bw - 4) / 2} y={yC(c.count) - 6} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK.primary}>{c.count}</text>
                <foreignObject x={L + i * bw} y={H - B + 6} width={bw} height={B - 8}>
                  <div style={{ fontSize: 11, lineHeight: "13px", color: INK.secondary, textAlign: "center", overflow: "hidden", padding: "0 2px" }}>{c.label}</div>
                </foreignObject>
              </g>
            );
          })}
          {show && (
            <g>
              <polyline points={cum.map((p, i) => `${L + i * bw + bw / 2},${yP(p)}`).join(" ")} fill="none" stroke={CAT[3]} strokeWidth={2} />
              {cum.map((p, i) => <g key={i}><circle cx={L + i * bw + bw / 2} cy={yP(p)} r={4.5} fill={CAT[3]} stroke={INK.surface} strokeWidth={2} /><text x={L + i * bw + bw / 2} y={yP(p) - 9} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={CAT[3]} stroke={INK.surface} strokeWidth={3} paintOrder="stroke">{Math.round(p)}%</text></g>)}
              {[0, 50, 100].map((p) => <text key={p} x={W - R + 6} y={yP(p) + 4} fontSize="11" fill={INK.muted}>{p}%</text>)}
            </g>
          )}
        </svg>
        {hover !== null && cats[hover] && (
          <div className="pointer-events-none absolute left-4 top-3 rounded-lg border border-[color:var(--line)] bg-[#0B1120] px-2.5 py-1.5 text-xs text-white" data-no-translate>
            {cats[hover]?.label}: <b>{cats[hover]?.count}</b>{block.unit ? ` ${block.unit}` : ""} · {((cats[hover]?.count ?? 0) / total * 100).toFixed(1)}%
          </div>
        )}
        <div className="mt-1 flex flex-wrap gap-4 px-2 text-xs text-[color:var(--muted)]">
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: CAT[0] }} />Category count</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: CAT[2] }} />Selected as vital few</span>
          {show && <span className="flex items-center gap-1.5"><i className="inline-block h-0.5 w-4" style={{ background: CAT[3] }} />Cumulative %</span>}
        </div>
      </div>
      <p className="mt-3 text-sm text-[color:var(--muted)]">Click the bars that make up the vital few. Selected: <span className="lms-mono text-white">{sel.size}</span></p>
      {checked && (ok
        ? <p className="lms-rise mt-3 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"><strong>Well done.</strong> These categories cause most of the problem: start there.</p>
        : <p className="lms-rise mt-3 rounded-xl bg-rose-400/10 px-4 py-3 text-sm text-rose-100">Not yet. Use the cumulative line: take the largest bars, in order, until the line reaches the threshold.</p>)}
    </LabFrame>
  );
}
