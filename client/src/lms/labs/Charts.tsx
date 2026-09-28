import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BarChart3, LineChart, PieChart, Sigma, TrendingUp } from "lucide-react";
import type { Block, ChartKind } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";
import { rich } from "../blocks";

// Categorical palette for multi-slice charts, validated on the player's dark surface (#131A2B):
// all checks pass (CVD ΔE ≥ 8.4, normal-vision ΔE ≥ 19.3, contrast ≥ 3:1). Always shown with direct labels.
const CAT = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"];
const INK = { primary: "#E7EBF3", secondary: "#97A3BD", grid: "rgba(231,235,243,0.08)", axis: "rgba(231,235,243,0.22)" };
const fmt = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  const f = v / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
}

function Tip({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-[color:var(--line)] bg-[#0A0F1C] px-2.5 py-1.5 text-xs text-white shadow-xl"
      style={{ left: `${x}%`, top: `${y}%` }}>{children}</div>
  );
}

// ─────────────── Chart-type chooser (bar / line / pie) ───────────────
export function ChartBlock({ block, api }: { block: Extract<Block, { type: "chart" }>; api: ProgressApi }) {
  const [kind, setKind] = useState<ChartKind>(block.kinds[0] ?? "bar");
  const [seen, setSeen] = useState<ChartKind[]>([block.kinds[0] ?? "bar"]);
  const [picked, setPicked] = useState<ChartKind | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const done = !!api.progress.labs[block.id];
  const W = 640, H = 300, L = 64, R = 20, T = 20, B = 44;
  const max = niceMax(Math.max(...block.data.map((d) => d.value)));
  const n = block.data.length;
  const bw = (W - L - R) / n;
  const yOf = (v: number) => T + (H - T - B) * (1 - v / max);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  const total = block.data.reduce((s, d) => s + d.value, 0);

  const choose = (k: ChartKind) => { setKind(k); setSeen((s) => (s.includes(k) ? s : [...s, k])); setHover(null); };
  useEffect(() => { if (!block.best && seen.length >= block.kinds.length && !done) api.completeLab(block.id); }, [seen, block, done, api]);
  const pick = () => { setPicked(kind); if (kind === block.best) api.completeLab(block.id); };
  const ICON = { bar: BarChart3, line: LineChart, pie: PieChart };

  let tip: { x: number; y: number; label: string; value: number } | null = null;
  const d = hover !== null ? block.data[hover] : undefined;

  const svg = (() => {
    if (kind === "pie") {
      let a0 = -Math.PI / 2;
      const cx = W / 2, cy = H / 2 - 4, r = 110;
      return (
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label={block.title}>
          {block.data.map((p, i) => {
            const a1 = a0 + (p.value / total) * Math.PI * 2;
            const large = a1 - a0 > Math.PI ? 1 : 0;
            const path = `M${cx},${cy} L${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 ${large} 1 ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)} Z`;
            const mid = (a0 + a1) / 2;
            const lx = cx + (r + 26) * Math.cos(mid), ly = cy + (r + 26) * Math.sin(mid);
            if (hover === i) tip = { x: (lx / W) * 100, y: (ly / H) * 100, label: p.label, value: p.value };
            a0 = a1;
            return (
              <g key={p.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <path d={path} fill={CAT[i % CAT.length]} stroke="#131A2B" strokeWidth={2} opacity={hover === null || hover === i ? 1 : 0.55} />
                <text x={lx} y={ly} fill={INK.primary} fontSize={12} textAnchor={Math.cos(mid) > 0.1 ? "start" : Math.cos(mid) < -0.1 ? "end" : "middle"} dominantBaseline="middle">{p.label}</text>
              </g>
            );
          })}
        </svg>
      );
    }
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label={block.title}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={yOf(t)} y2={yOf(t)} stroke={t === 0 ? INK.axis : INK.grid} />
            <text x={L - 8} y={yOf(t)} fill={INK.secondary} fontSize={11} textAnchor="end" dominantBaseline="middle">{fmt(t)}</text>
          </g>
        ))}
        {block.data.map((p, i) => (
          <text key={p.label} x={L + bw * i + bw / 2} y={H - B + 18} fill={INK.secondary} fontSize={11} textAnchor="middle">{p.label}</text>
        ))}
        {kind === "bar" && block.data.map((p, i) => {
          const x = L + bw * i + bw * 0.18, w = bw * 0.64, y = yOf(p.value), h = yOf(0) - y;
          if (hover === i) tip = { x: ((x + w / 2) / W) * 100, y: (y / H) * 100, label: p.label, value: p.value };
          return (
            <g key={p.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={L + bw * i} y={T} width={bw} height={H - T - B} fill="transparent" />
              <path d={`M${x},${y + h} V${y + 4} Q${x},${y} ${x + 4},${y} H${x + w - 4} Q${x + w},${y} ${x + w},${y + 4} V${y + h} Z`} fill="var(--acc)" opacity={hover === null || hover === i ? 1 : 0.55} />
            </g>
          );
        })}
        {kind === "line" && (
          <>
            <path d={block.data.map((p, i) => `${i ? "L" : "M"}${L + bw * i + bw / 2},${yOf(p.value)}`).join(" ")} fill="none" stroke="var(--acc)" strokeWidth={2} strokeLinejoin="round" />
            {block.data.map((p, i) => {
              const x = L + bw * i + bw / 2, y = yOf(p.value);
              if (hover === i) tip = { x: (x / W) * 100, y: (y / H) * 100, label: p.label, value: p.value };
              return (
                <g key={p.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                  <rect x={L + bw * i} y={T} width={bw} height={H - T - B} fill="transparent" />
                  {hover === i && <line x1={x} x2={x} y1={T} y2={H - B} stroke={INK.axis} />}
                  <circle cx={x} cy={y} r={hover === i ? 6 : 4.5} fill="var(--acc)" stroke="#131A2B" strokeWidth={2} />
                </g>
              );
            })}
          </>
        )}
      </svg>
    );
  })();
  // `tip` is filled while building the SVG above
  const t = tip as { x: number; y: number; label: string; value: number } | null;

  return (
    <LabFrame icon={BarChart3} kind="Interactive chart" title={block.title} task={block.question} done={done}>
      <div role="tablist" aria-label="Chart type" className="mb-3 inline-flex rounded-xl border border-[color:var(--line)] bg-[#0A0F1C] p-1">
        {block.kinds.map((k) => {
          const Icon = ICON[k];
          return (
            <button key={k} role="tab" aria-selected={kind === k} type="button" onClick={() => choose(k)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold ${kind === k ? "bg-[color:var(--acc-15)] text-white" : "text-[color:var(--muted)] hover:text-white"}`}>
              <Icon size={15} />{k === "bar" ? "Bar" : k === "line" ? "Line" : "Pie"}
            </button>
          );
        })}
      </div>
      <div className="relative rounded-xl border border-[color:var(--line)] bg-[color:var(--panel)] p-2">
        {svg}
        {t && d && <Tip x={t.x} y={t.y}><strong>{t.label}</strong> · <span className="tabular-nums">{fmt(t.value)}{block.unit ? ` ${block.unit}` : ""}</span></Tip>}
      </div>
      {block.best && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="button" onClick={pick} className="rounded-lg bg-[color:var(--acc)] px-4 py-2 text-sm font-bold text-[#11131A] hover:brightness-110">This chart tells the story best</button>
          {picked && (
            <p className={`lms-rise text-sm ${picked === block.best ? "text-emerald-200" : "text-rose-200"}`}>
              <strong className="mr-1">{picked === block.best ? "Correct." : "Not quite."}</strong>{block.explain ? rich(block.explain) : null}
            </p>
          )}
        </div>
      )}
    </LabFrame>
  );
}

// ─────────────── seeded random numbers (stable charts) ───────────────
function rng(seed: number) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function gauss(r: () => number) { const u = Math.max(1e-9, r()), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

// ─────────────── Correlation & regression explorer ───────────────
function CorrelationExplorer({ id, api }: { id: string; api: ProgressApi }) {
  const [noise, setNoise] = useState(25);
  const [dir, setDir] = useState<1 | 0 | -1>(1);
  const [touched, setTouched] = useState(false);
  const done = !!api.progress.labs[id];
  useEffect(() => { if (touched && !done) api.completeLab(id); }, [touched, done, api, id]);

  const pts = useMemo(() => {
    const r = rng(7), base = rng(11);
    return Array.from({ length: 40 }, () => {
      const x = 1 + base() * 9; // advertising, million FCFA
      const y = 20 + dir * 3.2 * x + gauss(r) * (noise / 100) * 14; // sales, million FCFA
      return { x, y };
    });
  }, [noise, dir]);
  const n = pts.length, mx = pts.reduce((s, p) => s + p.x, 0) / n, my = pts.reduce((s, p) => s + p.y, 0) / n;
  const sxy = pts.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0), sxx = pts.reduce((s, p) => s + (p.x - mx) ** 2, 0), syy = pts.reduce((s, p) => s + (p.y - my) ** 2, 0);
  const slope = sxy / sxx, icpt = my - slope * mx, r = syy ? sxy / Math.sqrt(sxx * syy) : 0;
  const a = Math.abs(r);
  const reading = a < 0.2 ? "No clear relationship"
    : `${a >= 0.8 ? "Strong" : a >= 0.5 ? "Moderate" : "Weak"} ${r > 0 ? "positive" : "negative"} relationship`;

  const W = 640, H = 320, L = 56, R = 16, T = 16, B = 48;
  const ymin = -20, ymax = 70;
  const X = (x: number) => L + ((x - 0) / 10) * (W - L - R), Y = (y: number) => T + (1 - (y - ymin) / (ymax - ymin)) * (H - T - B);

  return (
    <LabFrame icon={TrendingUp} kind="Interactive explorer" title="Correlation and regression, live" done={done}
      task="Move the **noise** slider and switch the relationship. Watch how **r**, **R²** and the regression line respond.">
      <div className="mb-3 flex flex-wrap items-center gap-4">
        <label htmlFor={`${id}-noise`} className="flex items-center gap-3 text-sm text-white">Noise
          <input id={`${id}-noise`} type="range" min={0} max={100} value={noise} onChange={(e) => { setNoise(Number(e.target.value)); setTouched(true); }} className="w-40 accent-[color:var(--acc)]" />
          <span className="lms-mono w-10 tabular-nums text-[color:var(--muted)]">{noise}%</span>
        </label>
        <div role="radiogroup" aria-label="Relationship" className="inline-flex rounded-xl border border-[color:var(--line)] bg-[#0A0F1C] p-1 text-sm">
          {([[1, "Positive"], [0, "None"], [-1, "Negative"]] as const).map(([v, label]) => (
            <button key={label} type="button" role="radio" aria-checked={dir === v} onClick={() => { setDir(v); setTouched(true); }}
              className={`rounded-lg px-3 py-1 font-semibold ${dir === v ? "bg-[color:var(--acc-15)] text-white" : "text-[color:var(--muted)] hover:text-white"}`}>{label}</button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full rounded-xl border border-[color:var(--line)] bg-[color:var(--panel)]" role="img" aria-label="Scatter plot of advertising spend against sales with a regression line">
          {[0, 2, 4, 6, 8, 10].map((x) => <g key={x}><line x1={X(x)} x2={X(x)} y1={T} y2={H - B} stroke={INK.grid} /><text x={X(x)} y={H - B + 16} fill={INK.secondary} fontSize={11} textAnchor="middle">{x}</text></g>)}
          {[-20, 0, 20, 40, 60].map((y) => <g key={y}><line x1={L} x2={W - R} y1={Y(y)} y2={Y(y)} stroke={y === 0 ? INK.axis : INK.grid} /><text x={L - 8} y={Y(y)} fill={INK.secondary} fontSize={11} textAnchor="end" dominantBaseline="middle">{y}</text></g>)}
          <text x={(L + W - R) / 2} y={H - 8} fill={INK.secondary} fontSize={12} textAnchor="middle">Advertising spend (million FCFA)</text>
          <text x={14} y={(T + H - B) / 2} fill={INK.secondary} fontSize={12} textAnchor="middle" transform={`rotate(-90 14 ${(T + H - B) / 2})`}>Sales (million FCFA)</text>
          {pts.map((p, i) => <circle key={i} cx={X(p.x)} cy={Y(Math.max(ymin, Math.min(ymax, p.y)))} r={4.5} fill="var(--acc)" stroke="#131A2B" strokeWidth={2} opacity={0.9} />)}
          <line x1={X(0)} y1={Y(icpt)} x2={X(10)} y2={Y(icpt + slope * 10)} stroke={INK.primary} strokeWidth={2} strokeDasharray="6 4" />
          <text x={X(10) - 4} y={Y(icpt + slope * 10) - 8} fill={INK.primary} fontSize={11} textAnchor="end">Regression line</text>
        </svg>
        <dl className="grid content-start gap-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--raised)] p-4 text-sm">
          <div><dt className="text-[color:var(--muted)]">Correlation r</dt><dd className="lms-mono text-2xl font-bold tabular-nums text-white">{r.toFixed(2)}</dd></div>
          <div><dt className="text-[color:var(--muted)]">R²</dt><dd className="lms-mono text-lg font-bold tabular-nums text-white">{(r * r).toFixed(2)}</dd></div>
          <div><dt className="text-[color:var(--muted)]">Slope</dt><dd className="lms-mono tabular-nums text-white">{slope.toFixed(2)}</dd></div>
          <div><dt className="text-[color:var(--muted)]">Reading</dt><dd className="font-bold text-[color:var(--acc)]">{reading}</dd></div>
        </dl>
      </div>
      <p className="mt-3 text-sm text-[color:var(--muted)]">Each point is one month of a company's figures. More noise means other factors drive sales, so r moves towards 0 even though advertising still matters.</p>
    </LabFrame>
  );
}

// ─────────────── Mean vs median explorer ───────────────
function DistributionExplorer({ id, api }: { id: string; api: ProgressApi }) {
  const [big, setBig] = useState(0);
  const done = !!api.progress.labs[id];
  useEffect(() => { if (big > 0 && !done) api.completeLab(id); }, [big, done, api, id]);
  const base = useMemo(() => { const r = rng(21); return Array.from({ length: 29 }, () => Math.round(Math.exp(10.1 + gauss(r) * 0.35) / 500) * 500); }, []);
  const vals = big > 0 ? [...base, big] : base;
  const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
  const sorted = [...vals].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? (sorted[mid] as number) : ((sorted[mid - 1] as number) + (sorted[mid] as number)) / 2;

  const W = 640, H = 280, L = 44, R = 16, T = 30, B = 44, maxX = 60000, bin = 5000;
  const bins = Array.from({ length: maxX / bin }, (_, i) => base.filter((v) => v >= i * bin && v < (i + 1) * bin).length);
  const top = Math.max(...bins, 1);
  const X = (v: number) => L + (Math.min(v, maxX) / maxX) * (W - L - R);
  const Y = (c: number) => T + (1 - c / (top + 1)) * (H - T - B);
  const bw = (W - L - R) / bins.length;
  const marker = (v: number, color: string, label: string, dy: number) => {
    const off = v > maxX;
    const x = X(v);
    return (
      <g>
        <line x1={x} x2={x} y1={T - 6} y2={H - B} stroke={color} strokeWidth={2} strokeDasharray={off ? "4 3" : undefined} />
        <text x={x + (off ? -6 : 6)} y={T + dy} fill={INK.primary} fontSize={12} textAnchor={off ? "end" : "start"}>{label} {fmt(Math.round(v))}{off ? " →" : ""}</text>
      </g>
    );
  };

  return (
    <LabFrame icon={Sigma} kind="Interactive explorer" title="Mean vs median, live" done={done}
      task="Thirty customers' baskets in a Yaoundé supermarket. Drag the slider to add **one very large customer** and watch which average moves.">
      <label htmlFor={`${id}-big`} className="mb-3 flex flex-wrap items-center gap-3 text-sm text-white">Largest basket
        <input id={`${id}-big`} type="range" min={0} max={2000000} step={50000} value={big} onChange={(e) => setBig(Number(e.target.value))} className="w-56 accent-[color:var(--acc)]" />
        <span className="lms-mono tabular-nums text-[color:var(--muted)]">{big ? `${fmt(big)} FCFA` : "none"}</span>
      </label>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full rounded-xl border border-[color:var(--line)] bg-[color:var(--panel)]" role="img" aria-label="Histogram of basket sizes with mean and median markers">
        {bins.map((c, i) => {
          const x = L + i * bw + 1, w = bw - 2, y = Y(c), h = Y(0) - y;
          return c ? <path key={i} d={`M${x},${y + h} V${y + 3} Q${x},${y} ${x + 3},${y} H${x + w - 3} Q${x + w},${y} ${x + w},${y + 3} V${y + h} Z`} fill="var(--acc)" opacity={0.55} /> : null;
        })}
        <line x1={L} x2={W - R} y1={Y(0)} y2={Y(0)} stroke={INK.axis} />
        {[0, 10000, 20000, 30000, 40000, 50000, 60000].map((v) => <text key={v} x={X(v)} y={H - B + 16} fill={INK.secondary} fontSize={11} textAnchor="middle">{v / 1000}k</text>)}
        <text x={(L + W - R) / 2} y={H - 8} fill={INK.secondary} fontSize={12} textAnchor="middle">Basket size (FCFA)</text>
        {marker(median, CAT[2] ?? "#199e70", "Median", 0)}
        {marker(mean, CAT[1] ?? "#d95926", "Mean", 18)}
      </svg>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <p className="rounded-xl border border-[color:var(--line)] bg-[color:var(--raised)] px-4 py-3 text-sm"><span className="text-[color:var(--muted)]">Mean</span><span className="lms-mono ml-2 text-lg font-bold tabular-nums text-white">{fmt(Math.round(mean))}</span> <span className="text-[color:var(--muted)]">FCFA</span></p>
        <p className="rounded-xl border border-[color:var(--line)] bg-[color:var(--raised)] px-4 py-3 text-sm"><span className="text-[color:var(--muted)]">Median</span><span className="lms-mono ml-2 text-lg font-bold tabular-nums text-white">{fmt(Math.round(median))}</span> <span className="text-[color:var(--muted)]">FCFA</span></p>
      </div>
      <p className="mt-3 text-sm text-[color:var(--muted)]">One customer can pull the mean far to the right while the median barely moves. That is why reports on income, salaries or basket sizes usually quote the median.</p>
    </LabFrame>
  );
}

export function ExplorerBlock({ block, api }: { block: Extract<Block, { type: "explorer" }>; api: ProgressApi }) {
  return block.kind === "correlation" ? <CorrelationExplorer id={block.id} api={api} /> : <DistributionExplorer id={block.id} api={api} />;
}
