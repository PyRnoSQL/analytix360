import { useEffect, useState } from "react";
import { Gauge } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";
import { CAT, INK, STATUS, fmt } from "./qcolors";

// Capability lab: the learner moves the process mean and/or spread with sliders and watches the
// distribution against the specification limits, with Cp, Cpk and the expected defect rate (ppm)
// updating live. The lab completes when Cpk reaches the goal.
type CBlock = Extract<Block, { type: "capability" }>;

function erf(x: number) {
  const s = Math.sign(x), a = Math.abs(x), t = 1 / (1 + 0.3275911 * a);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return s * y;
}
const cdf = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));

export function capStats(lsl: number, usl: number, mean: number, sigma: number) {
  const cp = (usl - lsl) / (6 * sigma);
  const cpk = Math.min(usl - mean, mean - lsl) / (3 * sigma);
  const ppm = (cdf((lsl - mean) / sigma) + (1 - cdf((usl - mean) / sigma))) * 1e6;
  return { cp, cpk, ppm };
}

export function CapabilityLab({ block, api }: { block: CBlock; api: ProgressApi }) {
  const { lsl, usl } = block;
  const span = usl - lsl;
  const mRange = block.meanRange ?? [lsl - span * 0.1, usl + span * 0.1];
  const sRange = block.sigmaRange ?? [span / 24, span / 3];
  const [mean, setMean] = useState(block.mean);
  const [sigma, setSigma] = useState(block.sigma);
  const done = !!api.progress.labs[block.id];
  const st = capStats(lsl, usl, mean, sigma);
  const moved = mean !== block.mean || sigma !== block.sigma;
  const reached = st.cpk >= block.goal - 1e-9;
  useEffect(() => { if (reached && moved && !done) api.completeLab(block.id); }, [reached, moved, done, api, block.id]);

  const W = 780, H = 260, L = 30, R = 30, T = 20, B = 36;
  const lo = Math.min(lsl - span * 0.35, mean - 4 * sigma), hi = Math.max(usl + span * 0.35, mean + 4 * sigma);
  const x = (v: number) => L + ((v - lo) * (W - L - R)) / (hi - lo);
  const pdf = (v: number) => Math.exp(-0.5 * ((v - mean) / sigma) ** 2);
  const y = (d: number) => H - B - d * (H - T - B);
  const pts = Array.from({ length: 161 }, (_, i) => lo + (i * (hi - lo)) / 160);
  const area = (a: number, b: number) => { const p = pts.filter((v) => v >= a && v <= b); if (!p.length) return ""; return `M${x(p[0]!)} ${y(0)} ` + p.map((v) => `L${x(v)} ${y(pdf(v))}`).join(" ") + ` L${x(p[p.length - 1]!)} ${y(0)} Z`; };
  const unit = block.unit ? ` ${block.unit}` : "";
  const d = Math.max(2, Math.ceil(-Math.log10(span / 100)));
  const tone = st.cpk >= 1.33 ? STATUS.good : st.cpk >= 1 ? STATUS.warning : STATUS.critical;
  const verdict = st.cpk >= 1.33 ? "Capable" : st.cpk >= 1 ? "Marginal" : "Not capable";

  return (
    <LabFrame icon={Gauge} kind="Capability lab" level={block.level} title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setMean(block.mean); setSigma(block.sigma); }}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="rounded-xl border border-[color:var(--line)] bg-[#0E1424] p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Process distribution against specification limits">
            <path d={area(lo, hi)} fill={CAT[0]} opacity={0.22} />
            <path d={area(lo, lsl)} fill={STATUS.critical} opacity={0.55} />
            <path d={area(usl, hi)} fill={STATUS.critical} opacity={0.55} />
            <polyline points={pts.map((v) => `${x(v)},${y(pdf(v))}`).join(" ")} fill="none" stroke={CAT[0]} strokeWidth={2} />
            <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke={INK.grid} />
            {[{ v: lsl, t: "LSL" }, { v: usl, t: "USL" }].map((s) => (
              <g key={s.t}><line x1={x(s.v)} x2={x(s.v)} y1={T} y2={y(0)} stroke={STATUS.critical} strokeWidth={2} strokeDasharray="6 4" />
                <text x={x(s.v)} y={T - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill={STATUS.critical}>{s.t}</text>
                <text x={x(s.v)} y={H - 14} textAnchor="middle" fontSize="13" fill={INK.muted}>{fmt(s.v, d)}</text></g>
            ))}
            <line x1={x((lsl + usl) / 2)} x2={x((lsl + usl) / 2)} y1={T + 14} y2={y(0)} stroke={INK.muted} strokeDasharray="2 4" />
            <line x1={x(mean)} x2={x(mean)} y1={y(1)} y2={y(0)} stroke={CAT[0]} strokeWidth={1.5} />
            <text x={x(mean)} y={y(1) - 6} textAnchor="middle" fontSize="14" fontWeight="700" fill={INK.primary}>μ {fmt(mean, d)}</text>
          </svg>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {block.adjust.includes("mean") && (
              <label className="grid gap-1 text-sm text-[color:var(--muted)]">
                <span>Process mean: <b className="lms-mono text-white" data-no-translate>{fmt(mean, d)}{unit}</b></span>
                <input type="range" min={mRange[0]} max={mRange[1]} step={span / 400} value={mean} onChange={(e) => setMean(Number(e.target.value))} aria-label="Process mean" className="accent-[color:var(--acc)]" />
              </label>
            )}
            {block.adjust.includes("sigma") && (
              <label className="grid gap-1 text-sm text-[color:var(--muted)]">
                <span>Standard deviation (σ): <b className="lms-mono text-white" data-no-translate>{fmt(sigma, d + 1)}{unit}</b></span>
                <input type="range" min={sRange[0]} max={sRange[1]} step={span / 1200} value={sigma} onChange={(e) => setSigma(Number(e.target.value))} aria-label="Standard deviation" className="accent-[color:var(--acc)]" />
              </label>
            )}
          </div>
        </div>
        <div className="grid content-start gap-2">
          {[["Cp", fmt(st.cp, 2)], ["Cpk", fmt(st.cpk, 2)], ["Out of spec", `${st.ppm >= 1 ? Math.round(st.ppm).toLocaleString("en-US") : st.ppm.toFixed(2)} ppm`]].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-[color:var(--line)] bg-[color:var(--panel)] px-4 py-2.5">
              <p className="text-xs text-[color:var(--muted)]">{k}</p><p className="lms-mono text-2xl font-bold text-white" data-no-translate>{v}</p>
            </div>
          ))}
          <p className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold" style={{ background: `${tone}22`, color: tone }}><span className="h-2.5 w-2.5 rounded-full" style={{ background: tone }} />{verdict}</p>
          <p className="text-xs text-[color:var(--muted)]">Goal: Cpk ≥ <span className="lms-mono text-white">{block.goal}</span></p>
        </div>
      </div>
      {reached && moved && <p className="lms-rise mt-3 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"><strong>Well done.</strong> The process now meets the capability goal.</p>}
    </LabFrame>
  );
}
