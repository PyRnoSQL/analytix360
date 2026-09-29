import { useEffect, useState } from "react";
import { Check, GitFork, X } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";
import { CAT, INK } from "./qcolors";

// Sorting lab with three looks: a fishbone (Ishikawa) diagram that grows as causes are placed on
// its bones, colour-coded columns (5S, defect classes…), or a numbered step line (8D, PDCA…).
type SBlock = Extract<Block, { type: "sorter" }>;

function Fishbone({ block, place }: { block: SBlock; place: number[] }) {
  const n = block.buckets.length, top = Math.ceil(n / 2);
  const W = 1000, H = 560, spineY = 280, x0 = 24, x1 = 800, lean = 130, rise = 215, rib = 165;
  const spacing = (x1 - x0 - 150) / Math.max(top, n - top);
  const bones = block.buckets.map((b, i) => {
    const up = i < top, k = up ? i : i - top;
    return { b, i, up, bx: x1 - 40 - (k + 0.5) * spacing };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Fishbone diagram: ${block.effect ?? ""}`}>
      <line x1={x0} y1={spineY} x2={x1 + 8} y2={spineY} stroke={INK.secondary} strokeWidth={5} strokeLinecap="round" />
      <path d={`M${x1 + 6} ${spineY - 18} L${x1 + 32} ${spineY} L${x1 + 6} ${spineY + 18} Z`} fill={INK.secondary} />
      <foreignObject x={x1 + 38} y={spineY - 80} width={W - x1 - 44} height={160}>
        <div className="grid h-full place-items-center rounded-xl border-2 border-rose-400/70 bg-rose-400/10 p-2 text-center font-bold leading-snug text-white" style={{ fontSize: 16 }}>{block.effect}</div>
      </foreignObject>
      {bones.map(({ b, i, up, bx }) => {
        const dy = up ? -rise : rise, ex = bx - lean, ey = spineY + dy, color = CAT[i % CAT.length] ?? CAT[0];
        const items = block.items.map((it, j) => ({ it, j })).filter(({ j }) => place[j] === i);
        return (
          <g key={i}>
            <line x1={bx} y1={spineY} x2={ex} y2={ey} stroke={color} strokeWidth={3.5} strokeLinecap="round" />
            <foreignObject x={ex - 80} y={up ? ey - 40 : ey + 6} width={160} height={34}>
              <div style={{ height: 34, borderRadius: 17, background: color, display: "grid", placeItems: "center", fontSize: 15, fontWeight: 700, color: "#0B1120", whiteSpace: "nowrap", overflow: "hidden", padding: "0 8px" }}>{b.label}</div>
            </foreignObject>
            {items.slice(0, 4).map(({ it }, k) => {
              const t = 0.24 + k * 0.19, px = bx - lean * t, py = spineY + dy * t;
              return (
                <g key={k}>
                  <line x1={px} y1={py} x2={px - rib} y2={py} stroke={color} strokeWidth={1.8} opacity={0.9} />
                  <foreignObject x={px - rib} y={py - 36} width={rib - 4} height={35}>
                    <div title={it.text} style={{ fontSize: 13.5, lineHeight: "16px", color: INK.primary, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textAlign: "left", height: 35, alignContent: "end" }}>{it.text}</div>
                  </foreignObject>
                </g>
              );
            })}
            {items.length > 4 && <text x={bx - lean * 0.99 + 12} y={spineY + dy * 0.99} fontSize="13" fontWeight="700" fill={color}>+{items.length - 4}</text>}
          </g>
        );
      })}
    </svg>
  );
}

export function SorterLab({ block, api }: { block: SBlock; api: ProgressApi }) {
  const [place, setPlace] = useState<number[]>(() => block.items.map(() => -1));
  const [checked, setChecked] = useState(false);
  const done = !!api.progress.labs[block.id];
  const results = block.items.map((it, i) => place[i] === it.bucket);
  const allOk = results.every(Boolean);
  useEffect(() => { if (checked && allOk && !done) api.completeLab(block.id); }, [checked, allOk, done, api, block.id]);
  const set = (i: number, v: number) => { setChecked(false); setPlace((p) => p.map((x, j) => (j === i ? v : x))); };
  const placed = place.filter((p) => p >= 0).length;

  return (
    <LabFrame icon={GitFork} kind={block.layout === "fishbone" ? "Fishbone lab" : block.layout === "steps" ? "Problem-solving lab" : "Sorting lab"} level={block.level} title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setPlace(block.items.map(() => -1)); setChecked(false); }}
      onSolution={() => { setPlace(block.items.map((it) => it.bucket)); setChecked(false); }}
      footer={<button type="button" onClick={() => setChecked(true)} className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--acc)] px-4 py-2 text-sm font-bold text-[#11131A] hover:brightness-110"><Check size={15} /> Check</button>}>
      {/* Diagram */}
      <div className="mb-4 rounded-xl border border-[color:var(--line)] bg-[#0E1424] p-3">
        {block.layout === "fishbone" ? <Fishbone block={block} place={place} /> : (
          <div className={`grid gap-3 ${block.layout === "steps" ? "lms-scroll auto-cols-[minmax(9.5rem,1fr)] grid-flow-col overflow-x-auto pb-1" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {block.buckets.map((b, i) => {
              const color = CAT[i % CAT.length] ?? CAT[0];
              return (
                <div key={i} className="min-w-0 rounded-xl border border-[color:var(--line)] bg-[color:var(--panel)]" style={{ borderTop: `4px solid ${color}` }}>
                  <div className="px-3 pt-2.5">
                    {block.layout === "steps" && <span className="lms-mono text-xs font-bold" style={{ color }}>{String(i + 1).padStart(2, "0")}</span>}
                    <p className="text-sm font-bold text-white">{b.label}</p>
                    {b.desc && <p className="text-xs text-[color:var(--muted)]">{b.desc}</p>}
                  </div>
                  <ul className="grid gap-1.5 p-3">
                    {block.items.map((it, j) => (place[j] === i ? (
                      <li key={j} className={`rounded-lg px-2.5 py-1.5 text-[0.8rem] leading-snug text-[#DCE3F2] ${checked ? (results[j] ? "bg-emerald-400/10" : "bg-rose-400/10") : "bg-white/[0.04]"}`}>{it.text}</li>
                    ) : null))}
                    {!place.includes(i) && <li className="rounded-lg border border-dashed border-[color:var(--line)] px-2.5 py-2 text-xs text-[color:var(--muted)]">Empty</li>}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Items to place */}
      <p className="mb-2 text-sm text-[color:var(--muted)]">Placed <span className="lms-mono text-white">{placed}/{block.items.length}</span></p>
      <ul className="grid gap-2 md:grid-cols-2">
        {block.items.map((it, i) => {
          const st = !checked || place[i] === -1 ? "idle" : results[i] ? "ok" : "bad";
          const color = (place[i] ?? -1) >= 0 ? CAT[(place[i] ?? 0) % CAT.length] : undefined;
          return (
            <li key={i} className={`grid gap-1.5 rounded-xl border p-2.5 ${st === "ok" ? "border-emerald-400/40" : st === "bad" ? "border-rose-400/40" : "border-[color:var(--line)]"}`} style={color ? { boxShadow: `inset 3px 0 0 ${color}` } : undefined}>
              <div className="flex items-start gap-2">
                <span className="min-w-0 flex-1 pl-1 text-sm text-[#DCE3F2]">{it.text}</span>
                {st === "ok" && <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />}
                {st === "bad" && <X size={16} className="mt-0.5 shrink-0 text-rose-400" />}
              </div>
              <select aria-label={`Place: ${it.text}`} value={String(place[i])} onChange={(e) => set(i, Number(e.target.value))}
                className="w-full rounded-lg border border-[color:var(--line)] bg-[#0A0F1C] px-2 py-1.5 text-sm text-white">
                <option value="-1" disabled>Choose…</option>
                {block.buckets.map((b, j) => <option key={j} value={String(j)}>{b.label}</option>)}
              </select>
              {checked && st === "bad" && it.explain && <p className="text-xs text-rose-100/90">{it.explain}</p>}
            </li>
          );
        })}
      </ul>
      {checked && (allOk
        ? <p className="lms-rise mt-3 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"><strong>Well done.</strong> Everything is in the right place.</p>
        : <p className="lms-rise mt-3 rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-[color:var(--muted)]"><span className="lms-mono text-white">{results.filter(Boolean).length}/{block.items.length}</span> <span>correct. Move the items marked in red and check again.</span></p>)}
    </LabFrame>
  );
}
