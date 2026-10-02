import type { ReactElement, ReactNode } from "react";
import { useKit, Shadow, Callout, Mark, Ticks, type Kit } from "../kit";

// ---------------------------------------------------------------------------------------------
// Shared bits for the 7 basic quality tools, drawn as printed poster sheets.
const C = { blue: "#3987e5", orange: "#d95926", green: "#199e70", amber: "#c98500", pink: "#d55181", purple: "#9085e9", red: "#d03b3b", ink: "#374151", grid: "#E5E8EC", mute: "#9AA3AE" };

/** deterministic pseudo-random numbers (so every render shows the same data) */
function rng(seed: number) {
  let s = seed >>> 0;
  const u = () => { s = (s * 1664525 + 1013904223) >>> 0; return (s + 0.5) / 4294967296; };
  const n = () => Math.sqrt(-2 * Math.log(u())) * Math.cos(2 * Math.PI * u());
  return { u, n };
}

/** A printed sheet (poster) lying on the backdrop, with a soft drop shadow and a greeked title. */
function Sheet({ k, x, y, w, h, accent = C.blue, title = true }: { k: Kit; x: number; y: number; w: number; h: number; accent?: string; title?: boolean }) {
  return (
    <g>
      <Shadow k={k} cx={x + w / 2} cy={y + h + 4} rx={w / 2 + 10} ry={12} o={0.3} />
      <rect x={x + 3} y={y + 5} width={w} height={h} fill="#1B2330" opacity={0.18} filter={`url(#${k.id("blur2")})`} />
      <rect x={x} y={y} width={w} height={h} fill="#FFFFFF" stroke="#D3D9E0" strokeWidth={0.8} />
      <rect x={x} y={y} width={w} height={h} fill={k.m("cream")} opacity={0.18} />
      {title && (
        <g>
          <rect x={x + 22} y={y + 18} width={6} height={20} fill={accent} />
          <rect x={x + 36} y={y + 19} width={150} height={9} rx={2} fill="#4B5563" />
          <rect x={x + 36} y={y + 32} width={96} height={5} rx={2} fill="#C4CAD2" />
          <rect x={x + w - 92} y={y + 22} width={70} height={5} rx={2} fill="#D5DAE0" />
          <rect x={x + w - 72} y={y + 31} width={50} height={5} rx={2} fill="#D5DAE0" />
        </g>
      )}
    </g>
  );
}

/** greeked (unreadable) printed text line */
const Gk = ({ x, y, w, h = 4, c = "#C4CAD2" }: { x: number; y: number; w: number; h?: number; c?: string }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} />;

type Ax = { x0: number; x1: number; y0: number; y1: number };
/** axis frame with horizontal grid lines and y labels */
function YGrid({ a, ticks, fmt = (v: number) => String(v), map, right }: { a: Ax; ticks: number[]; fmt?: (v: number) => string; map: (v: number) => number; right?: boolean }) {
  return (
    <g>
      {ticks.map((v) => (
        <g key={v}>
          <line x1={a.x0} x2={a.x1} y1={map(v)} y2={map(v)} stroke={C.grid} strokeWidth={0.8} />
          <line x1={right ? a.x1 : a.x0 - 4} x2={right ? a.x1 + 4 : a.x0} y1={map(v)} y2={map(v)} stroke={C.ink} strokeWidth={1} />
          <Mark x={right ? a.x1 + 7 : a.x0 - 7} y={map(v) + 3.5} t={fmt(v)} s={9.5} a={right ? "start" : "end"} c={C.ink} w={500} />
        </g>
      ))}
    </g>
  );
}
const Frame = ({ a, right }: { a: Ax; right?: boolean }) => <path d={`M${a.x0} ${a.y1} V${a.y0} H${a.x1}${right ? ` V${a.y1}` : ""}`} fill="none" stroke={C.ink} strokeWidth={1.4} />;

// Small pictograms (instead of words) for defect types, 6M categories etc. Drawn in a 24×24 box centred on (x, y).
function Pic({ t, x, y, s = 1, c = C.ink }: { t: string; x: number; y: number; s?: number; c?: string }) {
  const p: Record<string, ReactNode> = {
    scratch: <g><rect x={-10} y={-8} width={20} height={16} rx={2} fill="none" stroke={c} strokeWidth={1.6} /><path d="M-7 4 L-2 -1 L1 1 L7 -5" fill="none" stroke={C.red} strokeWidth={1.8} /></g>,
    dent: <g><rect x={-10} y={-8} width={20} height={16} rx={2} fill="none" stroke={c} strokeWidth={1.6} /><ellipse cx={0} cy={0} rx={5} ry={3.5} fill={C.red} opacity={0.85} /></g>,
    burr: <g><path d="M-10 8 V-8 H4 L6 -5 L4 -2 L7 0 L4 2 L6 5 L4 8 Z" fill="none" stroke={c} strokeWidth={1.6} strokeLinejoin="round" /><path d="M4 -5 L9 -4 M4 0 L10 0 M4 4 L9 5" stroke={C.red} strokeWidth={1.6} /></g>,
    dim: <g><path d="M-10 -8 V8 M10 -8 V8" stroke={c} strokeWidth={1.6} /><path d="M-7 0 H7 M-7 0 L-3 -3 M-7 0 L-3 3 M7 0 L3 -3 M7 0 L3 3" stroke={C.red} strokeWidth={1.6} fill="none" /></g>,
    hole: <g><rect x={-10} y={-8} width={20} height={16} rx={2} fill="none" stroke={c} strokeWidth={1.6} /><circle cx={-3} cy={0} r={3.2} fill={c} /><circle cx={4.5} cy={0} r={3.2} fill="none" stroke={C.red} strokeWidth={1.4} strokeDasharray="2 1.5" /></g>,
    paint: <g><rect x={-10} y={-8} width={20} height={16} rx={2} fill="none" stroke={c} strokeWidth={1.6} /><circle cx={-3} cy={-2} r={2} fill={C.red} /><circle cx={3} cy={2} r={2.6} fill={C.red} /><circle cx={5} cy={-4} r={1.3} fill={C.red} /></g>,
    part: <g><path d="M-10 -5 H4 L10 0 L4 5 H-10 Z" fill="none" stroke={c} strokeWidth={1.6} /><circle cx={-4} cy={0} r={2} fill={c} /></g>,
    cal: <g><rect x={-9} y={-8} width={18} height={17} rx={2} fill="none" stroke={c} strokeWidth={1.6} /><path d="M-9 -3 H9 M-4 -11 V-6 M4 -11 V-6" stroke={c} strokeWidth={1.6} /></g>,
    person: <g><circle cx={0} cy={-5} r={4} fill={c} /><path d="M-8 9 Q-8 0 0 0 Q8 0 8 9 Z" fill={c} /></g>,
    machine: <g><rect x={-10} y={-4} width={20} height={12} rx={1.5} fill={c} /><rect x={-6} y={-10} width={8} height={6} fill={c} /><path d="M2 -2 V4" stroke="#FFFFFF" strokeWidth={1.6} /><circle cx={-4} cy={2} r={2.4} fill="#FFFFFF" /></g>,
    material: <g><path d="M0 -10 L9 -5 V5 L0 10 L-9 5 V-5 Z" fill="none" stroke={c} strokeWidth={1.6} strokeLinejoin="round" /><path d="M-9 -5 L0 0 L9 -5 M0 0 V10" stroke={c} strokeWidth={1.4} fill="none" /></g>,
    method: <g><rect x={-9} y={-10} width={10} height={6} rx={1} fill={c} /><rect x={-9} y={4} width={10} height={6} rx={1} fill={c} /><path d="M-4 -4 V4 M1 -7 H7 V7 H1" stroke={c} strokeWidth={1.5} fill="none" /></g>,
    measure: <g><path d="M-10 -8 H10 V-3 H-10 Z" fill="none" stroke={c} strokeWidth={1.5} /><path d="M-8 -3 V9 L-5 5 V-3 M4 -3 V9 L7 5 V-3" fill={c} stroke={c} strokeWidth={1.2} strokeLinejoin="round" /><path d="M-6 -8 V-5 M-2 -8 V-5 M2 -8 V-5 M6 -8 V-5" stroke={c} strokeWidth={1} /></g>,
    env: <g><path d="M-2 5 V-8 Q-2 -11 1 -11 Q4 -11 4 -8 V5" fill="none" stroke={c} strokeWidth={1.5} /><circle cx={1} cy={7} r={4} fill={C.red} /><path d="M1 6 V-5" stroke={C.red} strokeWidth={2} /><path d="M6 -6 H9 M6 -2 H9 M6 2 H9" stroke={c} strokeWidth={1.2} /></g>,
    wrench: <g><path d="M-9 8 L3 -4 M3 -4 A6 6 0 1 0 8 -8" fill="none" stroke={c} strokeWidth={2.4} strokeLinecap="round" /></g>,
    search: <g><circle cx={-2} cy={-2} r={6} fill="none" stroke={c} strokeWidth={2} /><path d="M3 3 L9 9" stroke={c} strokeWidth={2.6} strokeLinecap="round" /></g>,
  };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{p[t]}</g>;
}

// ---------------------------------------------------------------------------------------------
// Check sheet: defects tallied per day on a clipboard. 5 defect types × 5 days, 119 defects in total.
function CheckSheet() {
  const k = useKit((id) => (
    <linearGradient id={id("board")} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#B08A5C" /><stop offset="0.5" stopColor="#8E6A40" /><stop offset="1" stopColor="#6E4F2C" />
    </linearGradient>
  ));
  const types = ["scratch", "dent", "burr", "dim", "hole"];
  const data = [[7, 5, 9, 6, 8], [3, 2, 4, 1, 3], [12, 10, 14, 11, 13], [2, 1, 0, 3, 1], [1, 0, 2, 1, 0]];
  const rowT = data.map((r) => r.reduce((a, b) => a + b, 0));
  const colT = [0, 1, 2, 3, 4].map((j) => data.reduce((a, r) => a + (r[j] ?? 0), 0));
  const all = rowT.reduce((a, b) => a + b, 0);
  const X0 = 166, cw0 = 92, cw = 64, cwT = 70, Y0 = 158, rh0 = 30, rh = 44;
  const colX = (j: number) => X0 + cw0 + j * cw; // left edge of day column j
  const xT = colX(5);
  const yRow = (i: number) => Y0 + rh0 + i * rh;
  const ink = "#1F3A8A";
  const tally = (n: number, x: number, y: number, key: string) => {
    const out: ReactNode[] = [];
    for (let g = 0; g * 5 < n; g++) {
      const m = Math.min(5, n - g * 5);
      const gx = x + (g % 2) * 26, gy = y + Math.floor(g / 2) * 17;
      for (let s = 0; s < Math.min(m, 4); s++) out.push(<line key={`${key}${g}${s}`} x1={gx + s * 4.6 + 0.6} y1={gy} x2={gx + s * 4.6} y2={gy + 12} stroke={ink} strokeWidth={1.5} strokeLinecap="round" />);
      if (m === 5) out.push(<line key={`${key}${g}d`} x1={gx - 3} y1={gy + 10} x2={gx + 17} y2={gy + 2} stroke={ink} strokeWidth={1.5} strokeLinecap="round" />);
    }
    return out;
  };
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={470} rx={290} ry={14} />
      {/* hardboard clipboard */}
      <rect x={118} y={34} width={564} height={440} rx={14} fill={`url(#${k.id("board")})`} stroke="#5A3F22" strokeWidth={1.2} />
      <rect x={121} y={37} width={558} height={434} rx={12} fill="none" stroke="#FFFFFF" strokeOpacity={0.25} strokeWidth={1.5} />
      {/* paper */}
      <rect x={144} y={66} width={512} height={392} fill="#1B2330" opacity={0.2} filter={`url(#${k.id("blur2")})`} />
      <rect x={140} y={62} width={512} height={392} fill="#FFFFFF" stroke="#D3D9E0" strokeWidth={0.8} />
      {/* header: product, period, inspector */}
      <rect x={X0} y={96} width={xT + cwT - X0} height={46} fill="#F4F6F9" stroke={C.ink} strokeWidth={1} />
      {[0, 1, 2].map((i) => <line key={i} x1={X0 + (i + 1) * 157} y1={96} x2={X0 + (i + 1) * 157} y2={142} stroke={C.ink} strokeWidth={0.8} opacity={i < 2 ? 1 : 0} />)}
      <Pic t="part" x={X0 + 20} y={119} />
      <Mark x={X0 + 40} y={124} t="P-2041" s={13} a="start" c={ink} w={600} />
      <Pic t="cal" x={X0 + 177} y={120} />
      <Mark x={X0 + 197} y={124} t="14–18.09" s={13} a="start" c={ink} w={600} />
      <Pic t="person" x={X0 + 334} y={120} />
      <Mark x={X0 + 354} y={124} t="J.K." s={13} a="start" c={ink} w={600} />
      {/* grid */}
      <rect x={X0} y={Y0} width={xT + cwT - X0} height={rh0 + 5 * rh + 34} fill="none" stroke={C.ink} strokeWidth={1.4} />
      <rect x={X0} y={Y0} width={xT + cwT - X0} height={rh0} fill="#E8EEF7" />
      <rect x={xT} y={Y0} width={cwT} height={rh0 + 5 * rh + 34} fill="#FFF4E0" opacity={0.8} />
      <rect x={X0} y={yRow(5)} width={xT + cwT - X0} height={34} fill="#FFF4E0" opacity={0.8} />
      {[0, 1, 2, 3, 4, 5].map((j) => <line key={j} x1={colX(j)} y1={Y0} x2={colX(j)} y2={yRow(5) + 34} stroke={C.ink} strokeWidth={j === 0 || j === 5 ? 1.4 : 0.8} />)}
      {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={X0} y1={yRow(i)} x2={xT + cwT} y2={yRow(i)} stroke={C.ink} strokeWidth={i === 0 || i === 5 ? 1.4 : 0.8} />)}
      {[0, 1, 2, 3, 4].map((j) => <Mark key={j} x={colX(j) + cw / 2} y={Y0 + 20} t={`${14 + j}.09`} s={11} c={C.ink} w={700} />)}
      <Mark x={xT + cwT / 2} y={Y0 + 21} t="Σ" s={15} c={C.ink} w={700} />
      <Mark x={X0 + cw0 / 2} y={Y0 + 20} t="#" s={12} c={C.ink} w={700} />
      {types.map((t, i) => (
        <g key={t}>
          <Mark x={X0 + 18} y={yRow(i) + 27} t={String.fromCharCode(65 + i)} s={14} c={C.ink} w={800} />
          <Pic t={t} x={X0 + 58} y={yRow(i) + 22} s={1.15} />
        </g>
      ))}
      {data.map((r, i) => r.map((v, j) => <g key={`${i}-${j}`}>{tally(v, colX(j) + 9, yRow(i) + 7, `${i}-${j}-`)}</g>))}
      {rowT.map((v, i) => <Mark key={i} x={xT + cwT / 2} y={yRow(i) + 28} t={v} s={16} c={ink} w={700} />)}
      {colT.map((v, j) => <Mark key={j} x={colX(j) + cw / 2} y={yRow(5) + 23} t={v} s={14} c={ink} w={700} />)}
      <Mark x={X0 + cw0 / 2} y={yRow(5) + 24} t="Σ" s={15} c={C.ink} w={700} />
      <Mark x={xT + cwT / 2} y={yRow(5) + 24} t={all} s={16} c={C.red} w={800} />
      <ellipse cx={xT + cwT / 2} cy={yRow(5) + 18} rx={24} ry={13} fill="none" stroke={C.red} strokeWidth={1.6} transform={`rotate(-6 ${xT + cwT / 2} ${yRow(5) + 18})`} />
      {/* metal clip */}
      <path d="M300 30 H500 L508 60 Q510 72 498 72 H302 Q290 72 292 60 Z" fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1.2} />
      <path d="M330 30 Q330 12 350 12 H450 Q470 12 470 30" fill="none" stroke="#8C96A3" strokeWidth={7} />
      <path d="M330 30 Q330 12 350 12 H450 Q470 12 470 30" fill="none" stroke="#F5F7FA" strokeWidth={2.5} />
      <rect x={306} y={62} width={188} height={5} rx={2} fill="#FFFFFF" opacity={0.6} />
      <circle cx={318} cy={52} r={4} fill={k.m("ball")} /><circle cx={482} cy={52} r={4} fill={k.m("ball")} />
      {/* pen */}
      <g transform="rotate(-28 640 420)">
        <rect x={560} y={414} width={150} height={12} rx={6} fill={k.m("blue")} stroke="#123A7A" strokeWidth={0.8} />
        <rect x={690} y={411} width={30} height={3} rx={1} fill={k.m("chrome")} />
        <path d="M560 414 L540 420 L560 426 Z" fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.6} />
        <circle cx={540} cy={420} r={1.4} fill="#111827" />
      </g>
      <Callout n={1} x={X0 + 58} y={yRow(2) + 22} bx={72} by={yRow(2) + 22} />
      <Callout n={2} x={colX(2) + 30} y={yRow(0) + 12} bx={colX(2) + 70} by={Y0 - 2} />
      <Callout n={3} x={xT + cwT / 2 + 12} y={yRow(2) + 22} bx={735} by={yRow(2) + 22} />
      <Callout n={4} x={X0 + 6} y={100} bx={72} by={100} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Histogram: 100 shafts Ø20 ±0.05 mm, classes 0.01 mm wide, roughly normal around 20.00.
function Histogram() {
  const k = useKit();
  const a: Ax = { x0: 160, x1: 660, y0: 400, y1: 110 };
  const lo = 19.93, hi = 20.07;
  const X = (v: number) => a.x0 + ((v - lo) / (hi - lo)) * (a.x1 - a.x0);
  const Y = (f: number) => a.y0 - (f / 25) * (a.y0 - a.y1);
  const freq = [1, 3, 8, 14, 21, 23, 15, 9, 4, 2];
  const mean = freq.reduce((s, f, i) => s + f * (19.955 + i * 0.01), 0) / 100;
  const sd = Math.sqrt(freq.reduce((s, f, i) => s + f * (19.955 + i * 0.01 - mean) ** 2, 0) / 99);
  const curve = Array.from({ length: 81 }, (_, i) => { const v = 19.94 + (i / 80) * 0.12; const f = (100 * 0.01) / (sd * Math.sqrt(2 * Math.PI)) * Math.exp(-(((v - mean) / sd) ** 2) / 2); return `${i ? "L" : "M"}${X(v).toFixed(1)} ${Y(f).toFixed(1)}`; }).join("");
  return (
    <g>
      {k.defs}
      <Sheet k={k} x={100} y={36} w={600} h={426} />
      <YGrid a={a} ticks={[0, 5, 10, 15, 20, 25]} map={Y} />
      {freq.map((f, i) => {
        const x = X(19.95 + i * 0.01);
        return <g key={i}><rect x={x + 0.8} y={Y(f)} width={X(19.96) - X(19.95) - 1.6} height={a.y0 - Y(f)} fill={C.blue} /><Mark x={x + (X(19.96) - X(19.95)) / 2} y={Y(f) - 5} t={f} s={9} c={C.ink} w={600} /></g>;
      })}
      <path d={curve} fill="none" stroke={C.ink} strokeWidth={1.3} strokeDasharray="4 3" opacity={0.7} />
      <Frame a={a} />
      {Array.from({ length: 15 }, (_, i) => { const v = lo + i * 0.01; return <g key={i}><line x1={X(v)} x2={X(v)} y1={a.y0} y2={a.y0 + 5} stroke={C.ink} strokeWidth={1} />{i % 2 === 0 && <Mark x={X(v)} y={a.y0 + 18} t={v.toFixed(2)} s={9.5} c={C.ink} w={500} />}</g>; })}
      <Mark x={a.x1} y={a.y0 + 34} t="Ø mm" s={10} a="end" c={C.ink} w={700} />
      <Mark x={a.x0 - 34} y={a.y1 - 12} t="n" s={11} c={C.ink} w={700} />
      <Mark x={a.x0 + 12} y={a.y1 + 4} t="n = 100" s={10} a="start" c={C.ink} w={600} />
      {/* spec limits and target */}
      {[[19.95, "LSL", C.red], [20.05, "USL", C.red], [20.0, "T", C.green]].map(([v, t, c]) => (
        <g key={t as string}>
          <line x1={X(v as number)} x2={X(v as number)} y1={a.y1 - 8} y2={a.y0} stroke={c as string} strokeWidth={2} strokeDasharray={t === "T" ? "7 4" : undefined} />
          <Mark x={X(v as number)} y={a.y1 - 26} t={t as string} s={11} c={c as string} w={800} />
          <Mark x={X(v as number)} y={a.y1 - 13} t={(v as number).toFixed(2)} s={9} c={c as string} w={600} />
        </g>
      ))}
      <Callout n={1} x={X(19.995)} y={a.y0 - 30} bx={X(19.995) - 20} by={440} />
      <Callout n={2} x={a.x0 - 20} y={Y(15) + 3} bx={62} by={Y(15) + 3} />
      <Callout n={3} x={X(19.95)} y={a.y1 + 60} bx={62} by={a.y1 + 60} />
      <Callout n={4} x={X(20.05)} y={a.y1 + 60} bx={738} by={a.y1 + 60} />
      <Callout n={5} x={X(20.0)} y={a.y1 + 10} bx={X(20.0) + 58} by={a.y1 + 36} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Pareto chart: 100 rejects by defect type, sorted descending, cumulative % line, 80 % line.
function Pareto() {
  const k = useKit();
  const a: Ax = { x0: 170, x1: 630, y0: 390, y1: 100 };
  const cats = [["burr", 48], ["scratch", 27], ["dim", 12], ["dent", 7], ["hole", 4], ["paint", 2]] as const;
  const bw = (a.x1 - a.x0) / cats.length;
  const Y = (v: number) => a.y0 - (v / 100) * (a.y0 - a.y1);
  let cum = 0;
  const pts = [{ x: a.x0, y: Y(0), c: 0 }, ...cats.map(([, v], i) => { cum += v; return { x: a.x0 + (i + 1) * bw, y: Y(cum), c: cum }; })];
  return (
    <g>
      {k.defs}
      <Sheet k={k} x={100} y={36} w={600} h={426} accent={C.orange} />
      <YGrid a={a} ticks={[0, 20, 40, 60, 80, 100]} map={Y} />
      <YGrid a={a} ticks={[0, 20, 40, 60, 80, 100]} map={Y} fmt={(v) => `${v}%`} right />
      {cats.map(([t, v], i) => (
        <g key={t}>
          <rect x={a.x0 + i * bw + 7} y={Y(v)} width={bw - 14} height={a.y0 - Y(v)} fill={i < 2 ? C.blue : "#A9C9F2"} />
          <Mark x={a.x0 + (i + 0.5) * bw} y={Y(v) - 6} t={v} s={10} c={C.ink} w={700} />
          <Pic t={t} x={a.x0 + (i + 0.5) * bw} y={a.y0 + 20} s={0.9} />
          <Mark x={a.x0 + (i + 0.5) * bw} y={a.y0 + 46} t={String.fromCharCode(65 + i)} s={11} c={C.ink} w={800} />
        </g>
      ))}
      <line x1={a.x0} x2={a.x1} y1={Y(80)} y2={Y(80)} stroke={C.red} strokeWidth={1.6} strokeDasharray="6 4" />
      <path d={pts.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join("")} fill="none" stroke={C.orange} strokeWidth={2.4} strokeLinejoin="round" />
      {pts.slice(1).map((p, i) => <g key={i}><circle cx={p.x} cy={p.y} r={4} fill="#FFFFFF" stroke={C.orange} strokeWidth={2} />{i > 0 && <Mark x={p.x} y={p.y - 9} t={`${p.c}%`} s={9} c={C.orange} w={700} />}</g>)}
      <Mark x={pts[1]!.x + 8} y={pts[1]!.y + 16} t="48%" s={9} a="start" c={C.orange} w={700} />
      <Frame a={a} right />
      <Mark x={a.x0 - 30} y={a.y1 - 14} t="n" s={11} c={C.ink} w={700} />
      <Mark x={a.x1 + 22} y={a.y1 - 14} t="Σ%" s={11} c={C.orange} w={700} />
      {/* vital few bracket */}
      <path d={`M${a.x0 + 6} ${a.y0 + 62} V${a.y0 + 68} H${a.x0 + 2 * bw - 6} V${a.y0 + 62}`} fill="none" stroke={C.blue} strokeWidth={2} />
      <Callout n={1} x={a.x0 + 3.5 * bw} y={Y(7) - 18} bx={a.x0 + 3.5 * bw + 14} by={Y(40)} />
      <Callout n={2} x={(pts[3]!.x + pts[4]!.x) / 2} y={(pts[3]!.y + pts[4]!.y) / 2} bx={738} by={130} />
      <Callout n={3} x={a.x0 + 2.5 * bw} y={Y(80)} bx={62} by={Y(80) + 40} />
      <Callout n={4} x={a.x0 + bw} y={a.y0 + 68} bx={62} by={a.y0 + 68} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Cause-and-effect (Ishikawa) diagram: effect = burrs on P-2041, six 6M bones with causes/sub-causes.
function Fishbone() {
  const k = useKit();
  const sy = 262, hx = 578; // spine height, head (effect box) left edge
  const cats = [
    { t: "person", c: C.blue, x: 186, top: true }, { t: "machine", c: C.orange, x: 326, top: true }, { t: "material", c: C.green, x: 466, top: true },
    { t: "method", c: C.amber, x: 186, top: false }, { t: "measure", c: C.pink, x: 326, top: false }, { t: "env", c: C.purple, x: 466, top: false },
  ];
  const by0 = 132, dy = sy - by0; // bone from box edge to spine
  const pt = (cx: number, top: boolean, t: number) => ({ x: cx + 100 * t, y: top ? by0 + dy * t : 2 * sy - by0 - dy * t });
  const causeW = [[50, 38], [42, 56], [46, 34], [36, 50], [54, 40], [40, 46]];
  return (
    <g>
      {k.defs}
      <Sheet k={k} x={100} y={36} w={600} h={426} accent={C.red} />
      {/* spine with arrow head into the effect */}
      <line x1={140} y1={sy} x2={hx - 12} y2={sy} stroke={C.ink} strokeWidth={4} />
      <path d={`M${hx - 2} ${sy} L${hx - 20} ${sy - 9} L${hx - 20} ${sy + 9} Z`} fill={C.ink} />
      {/* effect (head) */}
      <rect x={hx} y={sy - 48} width={102} height={96} rx={6} fill="#FDECEC" stroke={C.red} strokeWidth={2.2} />
      <Pic t="burr" x={hx + 51} y={sy - 14} s={1.9} />
      <Mark x={hx + 51} y={sy + 24} t="P-2041" s={11} c={C.red} w={800} />
      <Mark x={hx + 51} y={sy + 38} t="12%" s={10} c={C.red} w={700} />
      {cats.map((g, i) => {
        const a = pt(g.x, g.top, 0), b = pt(g.x, g.top, 1);
        const bx = g.top ? by0 - 34 : 2 * sy - by0;
        return (
          <g key={g.t}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.ink} strokeWidth={2.4} />
            {/* category box */}
            <rect x={g.x - 34} y={bx} width={68} height={34} rx={5} fill="#FFFFFF" stroke={g.c} strokeWidth={2} />
            <rect x={g.x - 34} y={bx} width={68} height={34} rx={5} fill={g.c} opacity={0.12} />
            <Pic t={g.t} x={g.x - 13} y={bx + 17} c={g.c} />
            <Mark x={g.x + 14} y={bx + 22} t={`M${i + 1}`} s={13} c={g.c} w={800} />
            {/* two causes per bone, each with a sub-cause twig */}
            {[0.32, 0.68].map((t, j) => {
              const p = pt(g.x, g.top, t), w = causeW[i]![j]!;
              const L = w + 18;
              return (
                <g key={j}>
                  <line x1={p.x - L} y1={p.y} x2={p.x} y2={p.y} stroke={g.c} strokeWidth={1.8} />
                  <circle cx={p.x} cy={p.y} r={2.4} fill={g.c} />
                  <Gk x={p.x - L} y={p.y - 9} w={w} h={5} c="#8B95A3" />
                  {j === 0 && (
                    <g>
                      <line x1={p.x - L + 14} y1={p.y} x2={p.x - L + 6} y2={p.y + 14} stroke={g.c} strokeWidth={1.2} />
                      <Gk x={p.x - L - 20} y={p.y + 14} w={24} h={4} />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
      <Callout n={1} x={hx + 102} y={sy} bx={740} by={sy} />
      <Callout n={2} x={146} y={sy} bx={62} by={sy} />
      <Callout n={3} x={466 + 34} y={by0 - 17} bx={738} by={by0 - 17} />
      <Callout n={4} x={pt(186, false, 0.32).x - 56} y={pt(186, false, 0.32).y} bx={62} by={pt(186, false, 0.32).y + 30} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Scatter diagram: workshop temperature (X) vs. measured bore deviation on Ø100 mm parts (Y).
// Steel grows ≈ 1.15 µm/°C on 100 mm, so the cloud shows a clear positive correlation.
function Scatter() {
  const k = useKit();
  const a: Ax = { x0: 160, x1: 640, y0: 396, y1: 110 };
  const X = (t: number) => a.x0 + ((t - 18) / 14) * (a.x1 - a.x0);
  const Y = (v: number) => a.y0 - ((v + 4) / 20) * (a.y0 - a.y1);
  const r0 = rng(11);
  const pts = Array.from({ length: 42 }, () => { const t = 19 + r0.u() * 12; return { t, v: 1.15 * (t - 20) + 1.4 * r0.n() }; });
  const n = pts.length, mt = pts.reduce((s, p) => s + p.t, 0) / n, mv = pts.reduce((s, p) => s + p.v, 0) / n;
  const sxy = pts.reduce((s, p) => s + (p.t - mt) * (p.v - mv), 0), sxx = pts.reduce((s, p) => s + (p.t - mt) ** 2, 0), syy = pts.reduce((s, p) => s + (p.v - mv) ** 2, 0);
  const b = sxy / sxx, r = sxy / Math.sqrt(sxx * syy);
  const fit = (t: number) => mv + b * (t - mt);
  const one = pts.reduce((m, p) => (Math.abs(p.t - 25.2) < Math.abs(m.t - 25.2) ? p : m), pts[0]!);
  return (
    <g>
      {k.defs}
      <Sheet k={k} x={100} y={36} w={600} h={426} accent={C.green} />
      <YGrid a={a} ticks={[-4, 0, 4, 8, 12, 16]} map={Y} />
      {[18, 20, 22, 24, 26, 28, 30, 32].map((t) => <g key={t}><line x1={X(t)} x2={X(t)} y1={a.y0} y2={a.y1} stroke={C.grid} strokeWidth={0.8} /><line x1={X(t)} x2={X(t)} y1={a.y0} y2={a.y0 + 5} stroke={C.ink} /><Mark x={X(t)} y={a.y0 + 18} t={t} s={9.5} c={C.ink} w={500} /></g>)}
      <line x1={X(18.5)} x2={X(31.5)} y1={Y(fit(18.5))} y2={Y(fit(31.5))} stroke={C.orange} strokeWidth={2.4} strokeDasharray="8 5" />
      {pts.map((p, i) => <circle key={i} cx={X(p.t)} cy={Y(p.v)} r={4.4} fill={C.blue} fillOpacity={0.85} stroke="#FFFFFF" strokeWidth={1.2} />)}
      <Frame a={a} />
      <rect x={a.x0 + 14} y={a.y1 + 8} width={112} height={44} rx={4} fill="#FFFFFF" stroke={C.grid} />
      <Mark x={a.x0 + 24} y={a.y1 + 26} t={`r = ${r.toFixed(2)}`} s={12} a="start" c={C.ink} w={800} />
      <Mark x={a.x0 + 24} y={a.y1 + 44} t={`n = ${n}`} s={11} a="start" c={C.ink} w={600} />
      <Pic t="env" x={a.x1 - 70} y={a.y0 + 42} s={0.9} />
      <Mark x={a.x1 - 54} y={a.y0 + 46} t="X  °C" s={11} a="start" c={C.ink} w={700} />
      <Pic t="dim" x={a.x0 - 36} y={a.y1 - 16} s={0.85} />
      <Mark x={a.x0 - 20} y={a.y1 - 12} t="Y  µm" s={11} a="start" c={C.ink} w={700} />
      <Callout n={1} x={X(25)} y={a.y0 + 2} bx={X(25)} by={446} />
      <Callout n={2} x={a.x0 - 2} y={Y(6)} bx={62} by={Y(6)} />
      <Callout n={3} x={X(one.t) + 3} y={Y(one.v) + 3} bx={X(one.t) + 60} by={Y(one.v) + 56} />
      <Callout n={4} x={X(30.6)} y={Y(fit(30.6))} bx={738} by={Y(fit(30.6)) + 40} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// X̄ control chart: 25 subgroups (n = 5) of Ø20 mm shafts, CL 20.000, UCL/LCL ±0.012; subgroup 18 is out.
function ControlChart() {
  const k = useKit();
  const a: Ax = { x0: 160, x1: 630, y0: 400, y1: 110 };
  const cl = 20.0, s = 0.004, ucl = cl + 3 * s, lcl = cl - 3 * s;
  const Y = (v: number) => a.y0 - ((v - 19.98) / 0.04) * (a.y0 - a.y1);
  const X = (i: number) => a.x0 + 14 + (i - 1) * ((a.x1 - a.x0 - 28) / 24);
  const r0 = rng(5);
  const pts = Array.from({ length: 25 }, (_, i) => (i === 17 ? 20.0151 : cl + Math.max(-2.3, Math.min(2.3, r0.n())) * s));
  const out = 18;
  return (
    <g>
      {k.defs}
      <Sheet k={k} x={100} y={36} w={600} h={426} accent={C.purple} />
      <rect x={a.x0} y={Y(ucl)} width={a.x1 - a.x0} height={Y(lcl) - Y(ucl)} fill={C.green} opacity={0.06} />
      <YGrid a={a} ticks={[19.98, 19.99, 20.01, 20.02]} map={Y} fmt={(v) => v.toFixed(3)} />
      {/* ±1σ, ±2σ zone lines */}
      {[-2, -1, 1, 2].map((z) => <line key={z} x1={a.x0} x2={a.x1} y1={Y(cl + z * s)} y2={Y(cl + z * s)} stroke={C.mute} strokeWidth={0.8} strokeDasharray="2 3" />)}
      {[[ucl, "UCL", C.red], [cl, "CL", C.green], [lcl, "LCL", C.red]].map(([v, t, c]) => (
        <g key={t as string}>
          <line x1={a.x0} x2={a.x1} y1={Y(v as number)} y2={Y(v as number)} stroke={c as string} strokeWidth={2} strokeDasharray={t === "CL" ? undefined : "8 4"} />
          <Mark x={a.x1 + 7} y={Y(v as number) - 3} t={t as string} s={11} a="start" c={c as string} w={800} />
          <Mark x={a.x1 + 7} y={Y(v as number) + 10} t={(v as number).toFixed(3)} s={9.5} a="start" c={c as string} w={600} />
        </g>
      ))}
      <path d={pts.map((v, i) => `${i ? "L" : "M"}${X(i + 1).toFixed(1)} ${Y(v).toFixed(1)}`).join("")} fill="none" stroke={C.blue} strokeWidth={1.8} strokeLinejoin="round" />
      {pts.map((v, i) => <circle key={i} cx={X(i + 1)} cy={Y(v)} r={i + 1 === out ? 5.2 : 3.6} fill={i + 1 === out ? C.red : C.blue} stroke="#FFFFFF" strokeWidth={1.2} />)}
      <circle cx={X(out)} cy={Y(pts[out - 1]!)} r={11} fill="none" stroke={C.red} strokeWidth={1.8} />
      <Frame a={a} />
      {Array.from({ length: 25 }, (_, i) => <g key={i}><line x1={X(i + 1)} x2={X(i + 1)} y1={a.y0} y2={a.y0 + (i % 5 === 4 || i === 0 ? 6 : 3)} stroke={C.ink} />{(i % 5 === 4 || i === 0) && <Mark x={X(i + 1)} y={a.y0 + 19} t={i + 1} s={9.5} c={C.ink} w={500} />}</g>)}
      <Mark x={a.x1} y={a.y0 + 36} t="#" s={11} a="end" c={C.ink} w={700} />
      <Mark x={a.x0 - 40} y={a.y1 - 12} t="X̄ mm" s={11} c={C.ink} w={700} />
      <Mark x={a.x0 + 12} y={a.y1 + 4} t="n = 5" s={10} a="start" c={C.ink} w={600} />
      <Callout n={1} x={a.x0 + 6} y={Y(ucl)} bx={62} by={Y(ucl)} />
      <Callout n={2} x={a.x0 + 6} y={Y(cl)} bx={62} by={Y(cl)} />
      <Callout n={3} x={a.x0 + 6} y={Y(lcl)} bx={62} by={Y(lcl)} />
      <Callout n={4} x={X(out) + 8} y={Y(pts[out - 1]!) - 8} bx={X(out) + 44} by={a.y1 - 26} />
      <Callout n={5} x={X(22)} y={a.y0 + 4} bx={X(22)} by={448} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Stratification: 100 bores Ø20 mm; the total looks wide, split by machine it shows B is shifted +0.03 mm.
function Stratification() {
  const k = useKit();
  const A = [2, 5, 10, 14, 11, 6, 2, 0, 0, 0, 0], B = [0, 0, 0, 1, 3, 7, 12, 14, 9, 3, 1];
  const T = A.map((v, i) => v + (B[i] ?? 0));
  const c0 = 19.965; // centre of first class, width 0.01
  const mean = (f: number[]) => f.reduce((s, v, i) => s + v * (c0 + i * 0.01), 0) / f.reduce((s, v) => s + v, 0);
  const mA = mean(A), mB = mean(B);
  // one histogram panel
  const Hist = ({ f, x, y, w, h, max, c, ml }: { f: number[]; x: number; y: number; w: number; h: number; max: number; c: string; ml?: number }) => {
    const bw = w / f.length;
    const MX = (v: number) => x + ((v - (c0 - 0.005)) / (f.length * 0.01)) * w;
    return (
      <g>
        {[0.5, 1].map((q) => <line key={q} x1={x} x2={x + w} y1={y + h - q * h} y2={y + h - q * h} stroke={C.grid} strokeWidth={0.8} />)}
        {f.map((v, i) => <rect key={i} x={x + i * bw + 1} y={y + h - (v / max) * h} width={bw - 2} height={(v / max) * h} fill={c} />)}
        <line x1={MX(20.05)} x2={MX(20.05)} y1={y - 6} y2={y + h} stroke={C.red} strokeWidth={1.6} />
        {ml !== undefined && <line x1={MX(ml)} x2={MX(ml)} y1={y - 4} y2={y + h} stroke={C.ink} strokeWidth={1.6} strokeDasharray="5 3" />}
        <path d={`M${x} ${y - 4} V${y + h} H${x + w}`} fill="none" stroke={C.ink} strokeWidth={1.3} />
        {[19.96, 20.0, 20.04].map((v) => <g key={v}><line x1={MX(v)} x2={MX(v)} y1={y + h} y2={y + h + 4} stroke={C.ink} /><Mark x={MX(v)} y={y + h + 15} t={v.toFixed(2)} s={8.5} c={C.ink} w={500} /></g>)}
      </g>
    );
  };
  const L = { x: 150, y: 150, w: 220, h: 220 }, RA = { x: 476, y: 98, w: 194, h: 104 }, RB = { x: 476, y: 296, w: 194, h: 104 };
  const MXR = (v: number) => RA.x + ((v - (c0 - 0.005)) / 0.11) * RA.w;
  return (
    <g>
      {k.defs}
      <Sheet k={k} x={100} y={36} w={600} h={426} accent={C.amber} />
      {/* total, not stratified */}
      <Hist f={T} x={L.x} y={L.y} w={L.w} h={L.h} max={24} c="#AEB6C1" />
      <Mark x={L.x + 4} y={L.y - 18} t="Σ" s={16} a="start" c={C.ink} w={800} />
      <Mark x={L.x + 22} y={L.y - 19} t="n = 100" s={10} a="start" c={C.ink} w={600} />
      <Mark x={L.x + L.w - 4} y={L.y + L.h + 34} t="Ø mm" s={9.5} a="end" c={C.ink} w={700} />
      <Mark x={L.x + ((20.05 - (c0 - 0.005)) / 0.11) * L.w} y={L.y - 10} t="USL" s={9} c={C.red} w={800} />
      {/* split by machine */}
      <path d={`M${L.x + L.w + 14} 260 H404`} stroke={C.ink} strokeWidth={2} fill="none" />
      <path d={`M404 150 V370 M404 150 H424 M404 370 H424`} stroke={C.ink} strokeWidth={2} fill="none" />
      <path d={`M424 144 L434 150 L424 156 Z M424 364 L434 370 L424 376 Z`} fill={C.ink} />
      <circle cx={404} cy={260} r={13} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.6} />
      <Pic t="machine" x={404} y={261} s={0.72} />
      {[{ r: RA, f: A, c: C.blue, m: mA, t: "A" }, { r: RB, f: B, c: C.orange, m: mB, t: "B" }].map((g) => (
        <g key={g.t}>
          <rect x={436} y={g.r.y + g.r.h / 2 - 34} width={30} height={46} rx={4} fill={g.c} opacity={0.14} />
          <Pic t="machine" x={451} y={g.r.y + g.r.h / 2 - 20} c={g.c} s={0.85} />
          <Mark x={451} y={g.r.y + g.r.h / 2 + 7} t={g.t} s={14} c={g.c} w={800} />
          <Hist f={g.f} x={g.r.x} y={g.r.y} w={g.r.w} h={g.r.h} max={16} c={g.c} ml={g.m} />
          <Mark x={g.r.x + 8} y={g.r.y + 8} t="n = 50" s={9} a="start" c={C.ink} w={600} />
          <Mark x={MXR(20.05)} y={g.r.y - 9} t="USL" s={8.5} c={C.red} w={800} />
        </g>
      ))}
      {/* the hidden difference between the strata means */}
      <line x1={MXR(mA)} x2={MXR(mA)} y1={RA.y + RA.h + 20} y2={RB.y - 4} stroke={C.blue} strokeWidth={1.2} strokeDasharray="3 3" />
      <line x1={MXR(mB)} x2={MXR(mB)} y1={RA.y + RA.h + 20} y2={RB.y - 4} stroke={C.orange} strokeWidth={1.2} strokeDasharray="3 3" />
      <path d={`M${MXR(mA)} 262 H${MXR(mB)} M${MXR(mA)} 262 l7 -4 v8 Z M${MXR(mB)} 262 l-7 -4 v8 Z`} stroke={C.red} strokeWidth={1.8} fill={C.red} />
      <Mark x={(MXR(mA) + MXR(mB)) / 2} y={254} t={`Δ ${(mB - mA).toFixed(3)}`} s={11} c={C.red} w={800} />
      <Callout n={1} x={414} y={254} bx={450} by={232} />
      <Callout n={2} x={RA.x + RA.w} y={RA.y + RA.h} bx={738} by={RA.y + RA.h} />
      <Callout n={3} x={RB.x + RB.w} y={RB.y + RB.h} bx={738} by={RB.y + RB.h} />
      <Callout n={4} x={MXR(mB) + 8} y={262} bx={738} by={262} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Process flowchart: start → OP10 machining → inspection → decision → OP20 packing → end, with a rework loop.
function Flowchart() {
  const k = useKit();
  const y = 190, ink = C.ink;
  const Arrow = ({ d, c = ink }: { d: string; c?: string }) => <path d={d} fill="none" stroke={c} strokeWidth={2} markerEnd={`url(#${k.id(c === ink ? "ah" : "ahO")})`} />;
  return (
    <g>
      {k.defs}
      <defs>
        <marker id={k.id("ah")} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill={ink} /></marker>
        <marker id={k.id("ahO")} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill={C.orange} /></marker>
      </defs>
      <Sheet k={k} x={100} y={36} w={600} h={426} accent={C.blue} />
      {/* start */}
      <rect x={124} y={y - 22} width={70} height={44} rx={22} fill="#E3F4EC" stroke={C.green} strokeWidth={2.2} />
      <path d={`M152 ${y - 9} L168 ${y} L152 ${y + 9} Z`} fill={C.green} />
      <Arrow d={`M194 ${y} H222`} />
      {/* OP10 process step */}
      <rect x={224} y={y - 30} width={88} height={60} rx={3} fill="#EAF2FC" stroke={C.blue} strokeWidth={2.2} />
      <Pic t="machine" x={250} y={y} c={C.blue} />
      <Mark x={286} y={y + 6} t="10" s={16} c={C.blue} w={800} />
      <Arrow d={`M312 ${y} H344`} />
      {/* inspection point */}
      <circle cx={376} cy={y} r={30} fill="#FFF4DD" stroke={C.amber} strokeWidth={2.2} />
      <Pic t="search" x={376} y={y} c={C.amber} s={1.2} />
      <Arrow d={`M406 ${y} H430`} />
      {/* decision */}
      <path d={`M478 ${y - 46} L524 ${y} L478 ${y + 46} L432 ${y} Z`} fill="#F3F0FD" stroke={C.purple} strokeWidth={2.2} />
      <Mark x={478} y={y + 4} t="Ø20" s={12} c={C.purple} w={800} />
      <Mark x={478} y={y + 18} t="±0.05" s={9} c={C.purple} w={700} />
      <Arrow d={`M524 ${y} H560`} />
      <path d={`M534 ${y - 16} l4 5 l9 -11`} fill="none" stroke={C.green} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
      {/* OP20 packing */}
      <rect x={562} y={y - 30} width={88} height={60} rx={3} fill="#EAF2FC" stroke={C.blue} strokeWidth={2.2} />
      <Pic t="material" x={588} y={y} c={C.blue} />
      <Mark x={624} y={y + 6} t="20" s={16} c={C.blue} w={800} />
      <Arrow d={`M606 ${y + 30} V${y + 150}`} />
      {/* end */}
      <rect x={571} y={y + 152} width={70} height={44} rx={22} fill="#FDECEC" stroke={C.red} strokeWidth={2.2} />
      <rect x={598} y={y + 166} width={16} height={16} rx={2} fill={C.red} />
      {/* rework loop */}
      <Arrow d={`M478 ${y + 46} V${y + 120}`} c={C.orange} />
      <path d={`M486 ${y + 58} l10 10 m0 -10 l-10 10`} stroke={C.red} strokeWidth={2.6} strokeLinecap="round" />
      <rect x={434} y={y + 122} width={88} height={56} rx={3} fill="#FCEBE3" stroke={C.orange} strokeWidth={2.2} />
      <Pic t="wrench" x={462} y={y + 150} c={C.orange} s={1.1} />
      <Mark x={498} y={y + 156} t="R" s={16} c={C.orange} w={800} />
      <Arrow d={`M434 ${y + 150} H376 V${y + 32}`} c={C.orange} />
      <Callout n={1} x={140} y={y + 18} bx={140} by={y + 92} />
      <Callout n={2} x={268} y={y - 30} bx={268} by={y - 92} />
      <Callout n={3} x={478} y={y - 46} bx={478} by={y - 100} />
      <Callout n={4} x={376} y={y - 30} bx={376} by={y - 92} />
      <Callout n={5} x={400} y={y + 150} bx={330} by={y + 210} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Poka-yoke fixture: anodised base plate with a nest for a plate part with one chamfered corner,
// two locating pins of different diameter at asymmetric positions, a presence sensor (M12 proximity
// switch), a toggle clamp (open), and a control box with green/red lamps and a good-part counter.
function PokaYoke() {
  const k = useKit((id) => (
    <>
      <radialGradient id={id("lampOn")} cx="0.45" cy="0.4" r="0.6"><stop offset="0" stopColor="#FFFFFF" /><stop offset="0.25" stopColor="#FF9B8F" /><stop offset="0.7" stopColor="#F0362A" /><stop offset="1" stopColor="#A3150D" /></radialGradient>
      <radialGradient id={id("lampOff")} cx="0.45" cy="0.4" r="0.6"><stop offset="0" stopColor="#9FD8B6" /><stop offset="0.5" stopColor="#2C7A50" /><stop offset="1" stopColor="#123D27" /></radialGradient>
      <radialGradient id={id("halo")}><stop offset="0" stopColor="#FF4A3A" stopOpacity="0.55" /><stop offset="1" stopColor="#FF4A3A" stopOpacity="0" /></radialGradient>
      <linearGradient id={id("alu")} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EEF1F4" /><stop offset="0.55" stopColor="#CDD3DA" /><stop offset="1" stopColor="#B4BCC6" /></linearGradient>
      <linearGradient id={id("pocket")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7E8794" /><stop offset="1" stopColor="#A9B1BC" /></linearGradient>
    </>
  ));
  const P = (u: number, v: number) => [100 + u + 0.9 * v, 352 - v] as const;
  const poly = (pts: (readonly [number, number])[]) => pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("") + "Z";
  // part outline in plate coordinates (u along width, v along depth): back-right corner chamfered
  const nest: [number, number][] = [[110, 18], [292, 18], [292, 64], [270, 84], [110, 84]];
  const Pin = ({ u, v, r, h }: { u: number; v: number; r: number; h: number }) => {
    const [x, y] = P(u, v);
    return (
      <g>
        <ellipse cx={x} cy={y} rx={r + 3} ry={(r + 3) * 0.42} fill="#5E6773" opacity={0.5} />
        <rect x={x - r} y={y - h} width={2 * r} height={h} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
        <ellipse cx={x} cy={y} rx={r} ry={r * 0.42} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
        <rect x={x - r} y={y - h} width={2 * r} height={h - 1} fill={k.m("chromeV")} />
        <ellipse cx={x} cy={y - h} rx={r} ry={r * 0.42} fill="#F3F5F8" stroke="#6E7784" strokeWidth={0.8} />
        <ellipse cx={x} cy={y - h} rx={r * 0.6} ry={r * 0.25} fill="#D5DAE0" />
      </g>
    );
  };
  const [p1x, p1y] = P(132, 36), [p2x, p2y] = P(262, 70);
  const [sx, sy] = P(96, 48); // sensor head
  return (
    <g>
      {k.defs}
      <g transform="translate(0 24)">
      <Shadow k={k} cx={400} cy={392} rx={320} ry={16} />
      {/* base plate: top, front, right side */}
      <path d={poly([P(0, 0), P(420, 0), P(420, 110), P(0, 110)])} fill={`url(#${k.id("alu")})`} stroke="#8C96A3" strokeWidth={1.2} />
      <path d={poly([P(0, 0), P(420, 0), P(420, 110), P(0, 110)])} fill={`url(#${k.id("brushed")})`} />
      <path d={`M100 352 H520 V382 H100 Z`} fill={k.m("steel")} stroke="#8C96A3" strokeWidth={1.2} />
      <path d={`M520 352 L${P(420, 110)[0]} ${P(420, 110)[1]} V${P(420, 110)[1] + 30} L520 382 Z`} fill="#9AA3AE" stroke="#8C96A3" strokeWidth={1.2} />
      <line x1={101} y1={353} x2={519} y2={353} stroke="#FFFFFF" strokeWidth={1.4} />
      {/* counterbored mounting screws in the corners */}
      {[[14, 12], [406, 12], [14, 98], [406, 98]].map(([u, v], i) => { const [x, y] = P(u!, v!); return <g key={i}><ellipse cx={x} cy={y} rx={7} ry={3.2} fill="#5E6773" /><ellipse cx={x} cy={y - 0.6} rx={4.4} ry={2} fill={k.m("dark")} /></g>; })}
      {/* sensor cable runs along the back edge to the control box */}
      <path d={`M${sx - 84} ${sy} C${sx - 116} ${sy} ${P(10, 100)[0] - 10} ${P(10, 100)[1] + 6} ${P(30, 100)[0]} ${P(30, 100)[1]} L${P(400, 100)[0]} ${P(400, 100)[1]} C${P(400, 100)[0] + 30} ${P(400, 100)[1]} 600 300 612 340`} fill="none" stroke="#23272E" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      {/* engraved part outline and pocket */}
      <path d={poly(nest.map(([u, v]) => P(u, v)))} fill={`url(#${k.id("pocket")})`} stroke="#5E6773" strokeWidth={1.4} />
      <path d={poly(nest.map(([u, v]) => P(u, v)).map(([x, y]) => [x, y + 5] as const))} fill="#C3CAD2" opacity={0.65} />
      <path d={poly(nest.map(([u, v]) => P(u, v)))} fill="none" stroke="#4A525D" strokeWidth={1.2} />
      {/* locating pins: Ø12 round at the front-left, Ø6 at the back-right, never symmetric */}
      <Pin u={132} v={36} r={11} h={30} />
      <Pin u={262} v={70} r={6} h={24} />
      <Mark x={p1x + 34} y={p1y + 4} t="Ø12" s={9} c="#3B424C" w={700} />
      <Mark x={p2x - 22} y={p2y - 4} t="Ø6" s={9} c="#3B424C" w={700} />
      {/* presence sensor: M12 inductive proximity switch in a bracket, LED at the back */}
      <path d={`M${sx - 62} ${sy - 4} h26 v22 h-26 Z`} fill={k.m("dark")} stroke="#1B1F25" strokeWidth={0.8} />
      <rect x={sx - 72} y={sy - 8} width={64} height={16} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      {Array.from({ length: 15 }, (_, i) => <line key={i} x1={sx - 70 + i * 4} y1={sy - 8} x2={sx - 68 + i * 4} y2={sy + 8} stroke="#6E7784" strokeWidth={0.7} />)}
      <rect x={sx - 52} y={sy - 11} width={8} height={22} rx={1} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={sx - 32} y={sy - 11} width={8} height={22} rx={1} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={sx - 8} y={sy - 7} width={10} height={14} rx={2} fill="#2E6FD8" stroke="#184A9E" strokeWidth={0.8} />
      <rect x={sx - 84} y={sy - 7} width={12} height={14} rx={2} fill="#FFC23A" stroke="#B5820A" strokeWidth={0.8} />
      {/* toggle clamp (open): base, arm lifted, spindle with rubber pad, red handle */}
      <path d={poly([P(318, 66), P(352, 66), P(352, 92), P(318, 92)])} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <path d={`M${P(322, 80)[0]} ${P(322, 80)[1]} v-34 h30 v34 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1} />
      <circle cx={P(337, 80)[0]} cy={P(322, 80)[1] - 34} r={6} fill={k.m("ball")} stroke="#6E7784" strokeWidth={0.8} />
      <path d={`M${P(337, 80)[0] - 4} ${P(322, 80)[1] - 38} L${P(337, 80)[0] - 108} ${P(322, 80)[1] - 112} L${P(337, 80)[0] - 116} ${P(322, 80)[1] - 104} L${P(337, 80)[0] - 8} ${P(322, 80)[1] - 28} Z`} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <g transform={`translate(${P(337, 80)[0] - 112} ${P(322, 80)[1] - 108})`}>
        <rect x={-4} y={-16} width={8} height={56} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
        <rect x={-8} y={-4} width={16} height={9} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
        <rect x={-8} y={9} width={16} height={9} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
        <path d="M-10 40 h20 v6 q-10 6 -20 0 Z" fill={k.m("rubber")} />
      </g>
      <path d={`M${P(337, 80)[0] + 2} ${P(322, 80)[1] - 40} L${P(337, 80)[0] + 70} ${P(322, 80)[1] - 112} L${P(337, 80)[0] + 78} ${P(322, 80)[1] - 106} L${P(337, 80)[0] + 8} ${P(322, 80)[1] - 32} Z`} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <path d={`M${P(337, 80)[0] + 58} ${P(322, 80)[1] - 98} L${P(337, 80)[0] + 98} ${P(322, 80)[1] - 140} Q${P(337, 80)[0] + 106} ${P(322, 80)[1] - 146} ${P(337, 80)[0] + 112} ${P(322, 80)[1] - 138} L${P(337, 80)[0] + 72} ${P(322, 80)[1] - 88} Z`} fill={k.m("red")} stroke="#9E1F17" strokeWidth={1} />
      {/* control box: front, top, side */}
      <path d="M592 196 L612 178 H726 L706 196 Z" fill="#E6E9ED" stroke="#8C96A3" strokeWidth={1} />
      <path d="M706 196 L726 178 V352 L706 370 Z" fill="#B4BCC6" stroke="#8C96A3" strokeWidth={1} />
      <rect x={592} y={196} width={114} height={174} rx={2} fill={k.m("grey")} stroke="#8C96A3" strokeWidth={1.2} />
      <rect x={598} y={202} width={102} height={162} rx={2} fill="none" stroke="#FFFFFF" strokeOpacity={0.6} />
      {/* lamps: green off, red on (no part in the nest) */}
      <circle cx={624} cy={236} r={19} fill={k.m("chrome")} stroke="#6E7784" />
      <circle cx={624} cy={236} r={14} fill={`url(#${k.id("lampOff")})`} />
      <circle cx={674} cy={236} r={40} fill={`url(#${k.id("halo")})`} />
      <circle cx={674} cy={236} r={19} fill={k.m("chrome")} stroke="#6E7784" />
      <circle cx={674} cy={236} r={14} fill={`url(#${k.id("lampOn")})`} />
      <ellipse cx={619} cy={230} rx={5} ry={3} fill="#FFFFFF" opacity={0.5} />
      <ellipse cx={669} cy={230} rx={5} ry={3} fill="#FFFFFF" opacity={0.8} />
      {/* counter: LED digits */}
      <rect x={604} y={280} width={90} height={34} rx={3} fill="#1A1414" stroke="#3B414A" strokeWidth={2} />
      <Mark x={649} y={305} t="01248" s={21} c="#FF5A3C" w={700} f="'DejaVu Sans Mono', monospace" />
      <circle cx={616} cy={340} r={9} fill={k.m("black")} stroke="#3B414A" />
      <circle cx={616} cy={340} r={6} fill={k.m("knob")} />
      <rect x={640} y={332} width={50} height={16} rx={2} fill="#F5F7FA" stroke="#C4CAD2" />
      <Mark x={665} y={344} t="R" s={10} c="#374151" w={800} />
      {/* cable gland */}
      <rect x={606} y={370} width={14} height={8} fill={k.m("dark")} />
      <Callout n={1} x={p1x} y={p1y - 32} bx={p1x - 20} by={126} />
      <Callout n={2} x={sx - 70} y={sy - 4} bx={62} by={sy - 4} />
      <Callout n={3} x={P(337, 80)[0] + 92} y={P(322, 80)[1] - 136} bx={P(337, 80)[0] + 92} by={88} />
      <Callout n={4} x={693} y={236} bx={746} by={236} />
      <Callout n={5} x={694} y={297} bx={746} by={297} />
      </g>
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Andon stack light: red / yellow / green tiers (green lit = running), base with buzzer, pole and foot,
// cabled to a pull-cord switch whose red cord handle stops the line.
function AndonLight() {
  const k = useKit((id) => (
    <>
      <linearGradient id={id("cyl")} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000000" stopOpacity="0.4" /><stop offset="0.22" stopColor="#FFFFFF" stopOpacity="0.45" /><stop offset="0.38" stopColor="#FFFFFF" stopOpacity="0.08" /><stop offset="0.8" stopColor="#000000" stopOpacity="0.12" /><stop offset="1" stopColor="#000000" stopOpacity="0.45" /></linearGradient>
      <radialGradient id={id("lit")} cx="0.45" cy="0.5" r="0.6"><stop offset="0" stopColor="#FFFFFF" /><stop offset="0.35" stopColor="#B9FFD2" /><stop offset="1" stopColor="#22C463" /></radialGradient>
      <radialGradient id={id("glow")}><stop offset="0" stopColor="#3BE07A" stopOpacity="0.6" /><stop offset="1" stopColor="#3BE07A" stopOpacity="0" /></radialGradient>
    </>
  ));
  const cx = 300, w = 96, x0 = cx - w / 2, th = 70;
  const tiers = [{ y: 82, c: "#A52A22", hi: "#D9574B" }, { y: 82 + th + 6, c: "#C48A12", hi: "#E8B640" }, { y: 82 + 2 * (th + 6), c: "#1E8F4E", hi: "#3BE07A", lit: true }];
  const ring = (y: number) => <path d={`M${x0 - 2} ${y - 3} Q${cx} ${y + 6} ${x0 + w + 2} ${y - 3} V${y + 4} Q${cx} ${y + 13} ${x0 - 2} ${y + 4} Z`} fill={k.m("grey")} stroke="#8C96A3" strokeWidth={0.8} />;
  const baseY = 82 + 3 * (th + 6);
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={420} cy={446} rx={260} ry={12} />
      <ellipse cx={cx} cy={tiers[2]!.y + th / 2} rx={120} ry={80} fill={`url(#${k.id("glow")})`} />
      {/* cap */}
      <path d={`M${x0} ${82} V68 Q${x0} 50 ${cx} 50 Q${x0 + w} 50 ${x0 + w} 68 V82 Z`} fill={k.m("grey")} stroke="#8C96A3" strokeWidth={1} />
      <path d={`M${x0} 82 V68 Q${x0} 50 ${cx} 50 Q${x0 + w} 50 ${x0 + w} 68 V82 Z`} fill={`url(#${k.id("cyl")})`} opacity={0.6} />
      {/* lens tiers */}
      {tiers.map((t, i) => (
        <g key={i}>
          <rect x={x0} y={t.y} width={w} height={th} fill={t.lit ? `url(#${k.id("lit")})` : t.c} />
          {!t.lit && <ellipse cx={cx - 8} cy={t.y + th / 2} rx={22} ry={26} fill={t.hi} opacity={0.35} />}
          {/* fresnel ribs */}
          {Array.from({ length: 15 }, (_, j) => { const x = cx - (w / 2) * Math.cos((Math.PI * (j + 1)) / 16); return <line key={j} x1={x} x2={x} y1={t.y + 2} y2={t.y + th - 2} stroke="#FFFFFF" strokeOpacity={t.lit ? 0.35 : 0.16} strokeWidth={1} />; })}
          <rect x={x0} y={t.y} width={w} height={th} fill={`url(#${k.id("cyl")})`} opacity={t.lit ? 0.35 : 1} />
          {ring(t.y)}
        </g>
      ))}
      {ring(baseY)}
      {/* base with buzzer slots */}
      <rect x={x0} y={baseY + 6} width={w} height={44} fill={k.m("black")} />
      <rect x={x0} y={baseY + 6} width={w} height={44} fill={`url(#${k.id("cyl")})`} opacity={0.5} />
      {[0, 1, 2].map((i) => <rect key={i} x={cx - 22} y={baseY + 16 + i * 8} width={44} height={3} rx={1.5} fill="#0B0D10" />)}
      <path d={`M${x0} ${baseY + 50} Q${cx} ${baseY + 58} ${x0 + w} ${baseY + 50}`} fill="none" stroke="#3B414A" strokeWidth={1} />
      {/* pole and mounting foot */}
      <rect x={cx - 12} y={baseY + 54} width={24} height={398 - baseY - 54 + 30} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <path d={`M${cx - 60} 444 L${cx - 44} 426 H${cx + 44} L${cx + 60} 444 Z`} fill={k.m("dark")} stroke="#1B1F25" strokeWidth={1} />
      <rect x={cx - 20} y={414} width={40} height={14} rx={2} fill={k.m("black")} />
      {[-38, 38].map((d) => <ellipse key={d} cx={cx + d} cy={436} rx={6} ry={3} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.6} />)}
      {/* cable from the base to the pull-cord switch */}
      <path d={`M${cx + 12} ${baseY + 40} C ${cx + 110} ${baseY + 40} 470 210 548 210`} fill="none" stroke="#23272E" strokeWidth={4} strokeLinecap="round" />
      {/* pull-cord switch box */}
      <rect x={540} y={150} width={86} height={86} rx={6} fill={k.m("yellow")} stroke="#9A6E00" strokeWidth={1.2} />
      <rect x={550} y={160} width={66} height={66} rx={4} fill="none" stroke="#FFFFFF" strokeOpacity={0.5} />
      {[[548, 158], [618, 158], [548, 228], [618, 228]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.6} fill={k.m("ball")} />)}
      <circle cx={583} cy={186} r={15} fill={k.m("red")} stroke="#7A120C" />
      <circle cx={579} cy={181} r={5} fill="#FFFFFF" opacity={0.35} />
      {/* steel wire along the line and lever eye */}
      <rect x={576} y={236} width={14} height={14} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <circle cx={583} cy={256} r={6} fill="none" stroke="#8C96A3" strokeWidth={3} />
      <path d="M589 256 H744" stroke="#8C96A3" strokeWidth={2.2} />
      <path d="M589 256 H744" stroke="#E4E8ED" strokeWidth={0.8} />
      <circle cx={744} cy={256} r={4} fill={k.m("ball")} />
      {/* hanging pull cord and handle */}
      <path d="M660 256 C 662 300 656 330 660 360" fill="none" stroke="#D03B3B" strokeWidth={3.2} />
      <path d="M660 256 C 662 300 656 330 660 360" fill="none" stroke="#FFD24A" strokeWidth={3.2} strokeDasharray="5 5" />
      <circle cx={660} cy={256} r={3.5} fill="#5E6773" />
      <rect x={644} y={360} width={32} height={44} rx={10} fill={k.m("red")} stroke="#7A120C" />
      <rect x={650} y={366} width={6} height={30} rx={3} fill="#FFFFFF" opacity={0.3} />
      <Callout n={1} x={x0 + 4} y={tiers[0]!.y + th / 2} bx={150} by={tiers[0]!.y + th / 2} />
      <Callout n={2} x={x0 + 4} y={tiers[1]!.y + th / 2} bx={150} by={tiers[1]!.y + th / 2} />
      <Callout n={3} x={x0 + 4} y={tiers[2]!.y + th / 2} bx={150} by={tiers[2]!.y + th / 2} />
      <Callout n={4} x={676} y={382} bx={730} by={410} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// 5S shadow board: painted outlines behind each hand tool, a label plate under every tool,
// one wrench out (its outline shows at once), header with area code and owner.
type ToolMode = "sil" | "tool";
function ShadowBoard() {
  const k = useKit((id) => (
    <>
      <linearGradient id={id("wood")} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#B07A45" /><stop offset="0.5" stopColor="#D49A5C" /><stop offset="1" stopColor="#A06A38" /></linearGradient>
      <linearGradient id={id("panel")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FAFBFC" /><stop offset="1" stopColor="#E9EDF1" /></linearGradient>
    </>
  ));
  const SIL = "#2B3240";
  // fill helper: silhouette mode paints everything dark and inflates it with a thick stroke
  const f = (mode: ToolMode, fill: string, stroke = "#5E6773") => (mode === "sil" ? { fill: SIL, stroke: SIL, strokeWidth: 9, strokeLinejoin: "round" as const } : { fill, stroke, strokeWidth: 0.9 });
  const Hammer = (m: ToolMode) => (
    <g>
      <path d="M-40 0 H30 L38 6 V18 L30 24 H-40 Q-46 12 -40 0 Z" {...f(m, k.m("steel"))} />
      <rect x={-7} y={24} width={14} height={110} {...f(m, `url(#${k.id("wood")})`, "#7A5A30")} />
      <rect x={-9} y={130} width={18} height={84} rx={7} {...f(m, k.m("black"), "#111418")} />
      {m === "tool" && <path d="M-36 3 H28" stroke="#FFFFFF" strokeOpacity={0.7} />}
    </g>
  );
  const Wrench = (m: ToolMode, L: number, s: number) => (
    <g>
      <path d={`M${-s * 0.42} ${s * 2} L${-s * 0.95} ${s * 1.05} Q${-s * 1.2} ${s * 0.2} ${-s * 0.62} ${-s * 0.45} L${-s * 0.32} ${s * 0.45} Q0 ${s * 0.62} ${s * 0.32} ${s * 0.45} L${s * 0.62} ${-s * 0.45} Q${s * 1.2} ${s * 0.2} ${s * 0.95} ${s * 1.05} L${s * 0.42} ${s * 2} Z`} {...f(m, k.m("chromeV"))} />
      <rect x={-s * 0.42} y={s * 1.7} width={s * 0.84} height={L - s * 3.4} {...f(m, k.m("chromeV"))} />
      <circle cx={0} cy={L - s * 0.6} r={s * 0.95} {...f(m, k.m("chromeV"))} />
      {m === "tool" && <><circle cx={0} cy={L - s * 0.6} r={s * 0.55} fill="#F4F6F9" stroke="#6E7784" strokeWidth={0.8} /><path d={Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; const r = i % 2 ? s * 0.55 : s * 0.42; return `${i ? "L" : "M"}${(Math.sin(a) * r).toFixed(1)} ${(L - s * 0.6 - Math.cos(a) * r).toFixed(1)}`; }).join("") + "Z"} fill="#F4F6F9" stroke="#6E7784" strokeWidth={0.8} /><Mark x={0} y={L * 0.5} t={L > 190 ? "17" : "13"} s={7.5} c="#3B424C" w={800} r={90} /></>}
    </g>
  );
  const Screwdriver = (m: ToolMode, ph: boolean) => (
    <g>
      <path d="M-13 6 Q-13 0 -7 0 H7 Q13 0 13 6 V78 Q13 86 6 88 H-6 Q-13 86 -13 78 Z" {...f(m, ph ? k.m("blue") : k.m("red"), ph ? "#123A7A" : "#7A120C")} />
      {m === "tool" && <><rect x={-13} y={56} width={26} height={22} fill={k.m("black")} /><path d="M-6 6 V52 M0 6 V52 M6 6 V52" stroke="#000000" strokeOpacity={0.2} strokeWidth={2} /></>}
      <rect x={-3.5} y={88} width={7} height={92} {...f(m, k.m("chromeV"))} />
      <path d={ph ? "M-3.5 180 L0 194 L3.5 180 Z" : "M-3.5 180 L-5 192 H5 L3.5 180 Z"} {...f(m, k.m("chromeV"))} />
    </g>
  );
  const Pliers = (m: ToolMode) => (
    <g>
      <path d="M-4 0 Q-12 20 -9 46 L-3 60 L3 60 L9 46 Q12 20 4 0 Q0 -3 -4 0 Z" {...f(m, k.m("steelV"))} />
      <path d="M-9 56 Q-14 70 -10 82 L-22 210 Q-22 218 -14 216 L-2 84 Z" {...f(m, k.m("red"), "#7A120C")} />
      <path d="M9 56 Q14 70 10 82 L22 210 Q22 218 14 216 L2 84 Z" {...f(m, k.m("red"), "#7A120C")} />
      <circle cx={0} cy={64} r={8} {...f(m, k.m("chrome"))} />
      {m === "tool" && <><circle cx={0} cy={64} r={3} fill="#5E6773" /><path d="M0 2 V40" stroke="#5E6773" strokeWidth={0.8} /><path d="M-5 22 H5 M-6 28 H6 M-6 34 H6" stroke="#5E6773" strokeWidth={0.7} /></>}
    </g>
  );
  const Adjustable = (m: ToolMode) => (
    <g>
      <path d="M-24 4 Q-24 -10 -8 -10 H-2 V18 H6 V-4 Q20 -4 22 12 Q24 36 4 44 L5 56 H-5 Q-24 46 -24 24 Z" {...f(m, k.m("chromeV"))} />
      <rect x={-6} y={54} width={12} height={156} rx={4} {...f(m, k.m("chromeV"))} />
      <circle cx={0} cy={198} r={4.5} {...f(m, "#F4F6F9")} />
      {m === "tool" && <><rect x={-9} y={26} width={8} height={16} rx={3} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={0.6} /><rect x={-6} y={60} width={12} height={130} rx={4} fill={`url(#${k.id("brushed")})`} /></>}
    </g>
  );
  const Rule = (m: ToolMode) => (
    <g>
      <rect x={0} y={0} width={250} height={20} rx={1} {...f(m, k.m("chrome"))} />
      {m === "tool" && <><Ticks x0={6} y={0} n={120} step={2} h={4} major={10} mid={5} w={0.6} />{Array.from({ length: 12 }, (_, i) => <Mark key={i} x={6 + (i + 1) * 20} y={17} t={(i + 1) * 10} s={6} />)}<circle cx={244} cy={10} r={2.5} fill="#5E6773" /></>}
    </g>
  );
  const HexKey = (m: ToolMode, s: number) => (
    <path d={`M0 0 H${s * 2.6} Q${s * 3.4} 0 ${s * 3.4} ${s * 0.8} V${s * 9} H${s * 2.4} V${s * 1}  H0 Z`} {...f(m, k.m("black"), "#0B0D10")} />
  );
  const tools: { x: number; y: number; d: (m: ToolMode) => ReactNode; code: string; ly: number; out?: boolean }[] = [
    { x: 168, y: 124, d: Hammer, code: "T01", ly: 352 },
    { x: 244, y: 124, d: (m) => Wrench(m, 214, 15), code: "T02", ly: 352 },
    { x: 306, y: 124, d: (m) => Screwdriver(m, false), code: "T03", ly: 332 },
    { x: 362, y: 124, d: (m) => Screwdriver(m, true), code: "T04", ly: 332 },
    { x: 432, y: 130, d: Pliers, code: "T05", ly: 360 },
    { x: 512, y: 132, d: Adjustable, code: "T06", ly: 356 },
    { x: 596, y: 124, d: (m) => Wrench(m, 186, 12), code: "T07", ly: 324, out: true },
  ];
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={462} rx={300} ry={12} o={0.3} />
      {/* board with aluminium frame */}
      <rect x={104} y={38} width={592} height={420} rx={6} fill={k.m("steel")} stroke="#8C96A3" strokeWidth={1.2} />
      <rect x={114} y={48} width={572} height={400} fill={`url(#${k.id("panel")})`} stroke="#B4BCC6" />
      {/* header: area and owner */}
      <rect x={114} y={48} width={572} height={44} fill="#2F6FDB" />
      <rect x={126} y={56} width={60} height={28} rx={4} fill="#FFFFFF" />
      <Mark x={156} y={77} t="A3" s={19} c="#2F6FDB" w={900} />
      <circle cx={214} cy={70} r={15} fill="#FFFFFF" opacity={0.2} />
      <Pic t="person" x={214} y={71} c="#FFFFFF" />
      <Mark x={238} y={76} t="M.R." s={15} a="start" c="#FFFFFF" w={800} />
      <rect x={590} y={56} width={84} height={28} rx={14} fill="#FFFFFF" opacity={0.18} />
      <Mark x={612} y={76} t="5S" s={15} c="#FFFFFF" w={900} />
      <Mark x={656} y={76} t="92%" s={13} c="#FFFFFF" w={700} />
      <Mark x={540} y={76} t="06.10" s={12} c="#DCE8FB" w={600} />
      {/* outlines, then hooks, then the tools hanging on them */}
      {tools.map((t, i) => <g key={i} transform={`translate(${t.x} ${t.y})`}>{t.d("sil")}</g>)}
      <g transform="translate(150 388)">{Rule("sil")}</g>
      {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${452 + i * 46} ${386 - i * 2})`}>{HexKey("sil", 3 + i)}</g>)}
      {tools.map((t, i) => <g key={i}><circle cx={t.x} cy={t.y - 10} r={4} fill={k.m("ball")} stroke="#5E6773" strokeWidth={0.6} /></g>)}
      {tools.map((t, i) => (t.out ? null : <g key={i} transform={`translate(${t.x} ${t.y})`}>{t.d("tool")}</g>))}
      <g transform="translate(150 388)">{Rule("tool")}</g>
      {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${452 + i * 46} ${386 - i * 2})`}>{HexKey("tool", 3 + i)}</g>)}
      {/* label plates */}
      {tools.map((t, i) => (
        <g key={i}>
          <rect x={t.x - 19} y={t.ly} width={38} height={15} rx={2} fill="#FFFFFF" stroke={t.out ? C.red : "#8C96A3"} strokeWidth={t.out ? 1.6 : 0.8} />
          <Mark x={t.x} y={t.ly + 11.5} t={t.code} s={9.5} c={t.out ? C.red : "#1B1F25"} w={800} />
        </g>
      ))}
      <rect x={250} y={418} width={38} height={15} rx={2} fill="#FFFFFF" stroke="#8C96A3" strokeWidth={0.8} />
      <Mark x={269} y={429.5} t="T08" s={9.5} c="#1B1F25" w={800} />
      <rect x={512} y={428} width={38} height={15} rx={2} fill="#FFFFFF" stroke="#8C96A3" strokeWidth={0.8} />
      <Mark x={531} y={439.5} t="T09" s={9.5} c="#1B1F25" w={800} />
      <Callout n={1} x={124} y={130} bx={62} by={150} />
      <Callout n={2} x={168 - 19} y={359} bx={62} by={359} />
      <Callout n={3} x={608} y={170} bx={742} by={200} />
      <Callout n={4} x={126} y={64} bx={62} by={64} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// 8D board: a magnetic whiteboard with six printed sheets D1–D2 … D8 for one customer complaint.
function EightDBoard() {
  const k = useKit();
  const bx = 86, by = 40, bw = 628, bh = 384;
  const pw = 188, ph = 172, gx = 14, gy = 12, ix = bx + 18, iy = by + 16;
  const pos = (i: number) => ({ x: ix + (i % 3) * (pw + gx), y: iy + Math.floor(i / 3) * (ph + gy) });
  const heads = [["D1", "D2", C.blue], ["D3", "", C.red], ["D4", "", C.orange], ["D5", "D6", C.green], ["D7", "", C.purple], ["D8", "", C.amber]] as const;
  const Doc = ({ x, y, c, rev }: { x: number; y: number; c: string; rev: string }) => (
    <g>
      <path d={`M${x} ${y} h34 l10 10 v46 h-44 Z`} fill="#FFFFFF" stroke="#8C96A3" />
      <path d={`M${x + 34} ${y} v10 h10`} fill="none" stroke="#8C96A3" />
      <rect x={x} y={y + 14} width={44} height={6} fill={c} opacity={0.6} />
      {[0, 1, 2, 3].map((i) => <Gk key={i} x={x + 5} y={y + 25 + i * 7} w={i % 2 ? 26 : 34} h={3} />)}
      <circle cx={x + 40} cy={y + 52} r={9} fill={c} />
      <Mark x={x + 40} y={y + 56} t={rev} s={10} c="#FFFFFF" w={800} />
    </g>
  );
  const Check = ({ x, y, ok = true }: { x: number; y: number; ok?: boolean }) => (
    <g><rect x={x} y={y} width={11} height={11} rx={2} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.1} />{ok && <path d={`M${x + 2} ${y + 6} l3 3 l6 -8`} fill="none" stroke={C.green} strokeWidth={2} strokeLinecap="round" />}</g>
  );
  const p = [0, 1, 2, 3, 4, 5].map(pos);
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={458} rx={330} ry={12} />
      {/* whiteboard */}
      <rect x={bx - 8} y={by - 8} width={bw + 16} height={bh + 16} rx={6} fill={k.m("steel")} stroke="#8C96A3" strokeWidth={1.2} />
      <rect x={bx} y={by} width={bw} height={bh} fill="#FBFCFD" stroke="#C4CAD2" />
      <path d={`M${bx + 30} ${by} L${bx + 140} ${by + bh} H${bx + 190} L${bx + 80} ${by} Z`} fill="#FFFFFF" opacity={0.5} />
      {/* marker tray */}
      <path d={`M${bx - 4} ${by + bh + 8} H${bx + bw + 4} L${bx + bw - 6} ${by + bh + 24} H${bx + 6} Z`} fill={k.m("steel")} stroke="#8C96A3" />
      <rect x={bx + 420} y={by + bh + 9} width={60} height={7} rx={3} fill={k.m("blue")} />
      <rect x={bx + 488} y={by + bh + 9} width={60} height={7} rx={3} fill={k.m("red")} />
      <rect x={bx + 556} y={by + bh + 10} width={40} height={10} rx={2} fill={k.m("dark")} />
      {/* six sheets */}
      {heads.map(([a, b, c], i) => {
        const q = p[i]!;
        return (
          <g key={a}>
            <rect x={q.x + 2} y={q.y + 3} width={pw} height={ph} fill="#1B2330" opacity={0.15} filter={`url(#${k.id("blur2")})`} />
            <rect x={q.x} y={q.y} width={pw} height={ph} fill="#FFFFFF" stroke="#D3D9E0" />
            <rect x={q.x} y={q.y} width={pw} height={24} fill={c} />
            <Mark x={q.x + 10} y={q.y + 17} t={b ? `${a} · ${b}` : a} s={13} a="start" c="#FFFFFF" w={800} />
            <Gk x={q.x + pw - 66} y={q.y + 10} w={56} h={4} c="#FFFFFF" />
            <circle cx={q.x + pw / 2} cy={q.y + 2} r={6} fill={k.m("knob")} />
          </g>
        );
      })}
      {/* D1 team + D2 problem */}
      {[0, 1, 2, 3].map((i) => <Pic key={i} t="person" x={p[0]!.x + 22 + i * 24} y={p[0]!.y + 46} c={i === 0 ? C.blue : C.ink} s={0.9} />)}
      {[0, 1, 2].map((i) => <Gk key={i} x={p[0]!.x + 112} y={p[0]!.y + 36 + i * 8} w={i === 1 ? 50 : 66} h={3.5} />)}
      <line x1={p[0]!.x + 10} x2={p[0]!.x + pw - 10} y1={p[0]!.y + 68} y2={p[0]!.y + 68} stroke={C.grid} />
      <rect x={p[0]!.x + 12} y={p[0]!.y + 78} width={64} height={52} rx={4} fill="#FDECEC" stroke={C.red} />
      <Pic t="burr" x={p[0]!.x + 44} y={p[0]!.y + 104} s={1.5} />
      <Mark x={p[0]!.x + 88} y={p[0]!.y + 94} t="P-2041" s={11} a="start" c={C.ink} w={800} />
      <Mark x={p[0]!.x + 88} y={p[0]!.y + 112} t="12%" s={11} a="start" c={C.red} w={800} />
      <Mark x={p[0]!.x + 88} y={p[0]!.y + 129} t="14.09" s={10} a="start" c={C.ink} w={600} />
      {[0, 1].map((i) => <Gk key={i} x={p[0]!.x + 12} y={p[0]!.y + 142 + i * 9} w={i ? 120 : 168} h={3.5} />)}
      {/* D3 containment: crate on hold, sorted quantities */}
      <g transform={`translate(${p[1]!.x + 18} ${p[1]!.y + 52})`}>
        <path d="M0 18 L12 6 H82 L70 18 Z" fill="#D9C08F" stroke="#8A6A32" />
        <rect x={0} y={18} width={70} height={52} fill="#C9A86B" stroke="#8A6A32" />
        <path d="M70 18 L82 6 V58 L70 70 Z" fill="#A9864A" stroke="#8A6A32" />
        {[30, 46].map((y) => <line key={y} x1={0} x2={70} y1={y + 6} y2={y + 6} stroke="#8A6A32" strokeOpacity={0.6} />)}
        <rect x={6} y={28} width={58} height={26} rx={2} fill={C.red} transform="rotate(-8 35 41)" />
        <Mark x={35} y={46} t="HOLD" s={13} c="#FFFFFF" w={900} r={-8} />
      </g>
      <Mark x={p[1]!.x + 116} y={p[1]!.y + 64} t="1 240" s={13} a="start" c={C.ink} w={800} />
      <Mark x={p[1]!.x + 116} y={p[1]!.y + 88} t="−148" s={13} a="start" c={C.red} w={800} />
      <Mark x={p[1]!.x + 116} y={p[1]!.y + 112} t="1 092" s={13} a="start" c={C.green} w={800} />
      <line x1={p[1]!.x + 114} x2={p[1]!.x + 176} y1={p[1]!.y + 96} y2={p[1]!.y + 96} stroke={C.ink} />
      {[0, 1].map((i) => <Gk key={i} x={p[1]!.x + 14} y={p[1]!.y + 140 + i * 9} w={i ? 110 : 160} h={3.5} />)}
      {/* D4 root causes: mini fishbone + 5 whys */}
      {(() => {
        const q = p[2]!, y0 = q.y + 78;
        return (
          <g>
            <line x1={q.x + 14} x2={q.x + 150} y1={y0} y2={y0} stroke={C.ink} strokeWidth={2} />
            <rect x={q.x + 150} y={y0 - 13} width={34} height={26} rx={3} fill="#FDECEC" stroke={C.red} />
            <Pic t="burr" x={q.x + 167} y={y0} s={0.75} />
            {[40, 84, 128].map((x) => <g key={x}><line x1={q.x + x - 22} y1={y0 - 34} x2={q.x + x} y2={y0} stroke={C.ink} strokeWidth={1.4} /><line x1={q.x + x - 22} y1={y0 + 34} x2={q.x + x} y2={y0} stroke={C.ink} strokeWidth={1.4} /></g>)}
            <line x1={q.x + 50} x2={q.x + 73} y1={y0 - 17} y2={y0 - 17} stroke={C.red} strokeWidth={1.6} />
            <Gk x={q.x + 46} y={y0 - 25} w={24} h={4} c={C.red} />
            <ellipse cx={q.x + 60} cy={y0 - 20} rx={21} ry={10} fill="none" stroke={C.red} strokeWidth={1.8} />
            {[0, 1, 2, 3, 4].map((i) => <g key={i}><Mark x={q.x + 14} y={q.y + 128 + i * 9} t={`${i + 1}`} s={7} a="start" c={C.ink} w={800} /><Gk x={q.x + 24} y={q.y + 124 + i * 9} w={60 + ((i * 37) % 70)} h={3.5} c={i === 4 ? "#E7A29C" : "#C4CAD2"} /></g>)}
          </g>
        );
      })()}
      {/* D5–D6 actions with checkboxes + before/after */}
      {[0, 1, 2].map((i) => <g key={i}><Check x={p[3]!.x + 12} y={p[3]!.y + 38 + i * 20} /><Gk x={p[3]!.x + 30} y={p[3]!.y + 42 + i * 20} w={[64, 50, 58][i]!} h={3.5} /></g>)}
      {(() => {
        const q = p[3]!, ax = q.x + 118, ay = q.y + 150;
        return (
          <g>
            <path d={`M${ax} ${q.y + 36} V${ay} H${ax + 66}`} fill="none" stroke={C.ink} strokeWidth={1.2} />
            <rect x={ax + 8} y={ay - 96} width={20} height={96} fill={C.red} />
            <rect x={ax + 38} y={ay - 4} width={20} height={4} fill={C.green} />
            <Mark x={ax + 18} y={ay - 100} t="12%" s={9} c={C.red} w={800} />
            <Mark x={ax + 48} y={ay - 8} t="0.4%" s={9} c={C.green} w={800} />
          </g>
        );
      })()}
      <Mark x={p[3]!.x + 12} y={p[3]!.y + 120} t="✓" s={18} a="start" c={C.green} w={800} />
      <Gk x={p[3]!.x + 30} y={p[3]!.y + 110} w={70} h={3.5} />
      <Gk x={p[3]!.x + 30} y={p[3]!.y + 120} w={52} h={3.5} />
      <Mark x={p[3]!.x + 12} y={p[3]!.y + 156} t="21.10" s={10} a="start" c={C.ink} w={700} />
      {/* D7 prevent recurrence: updated PFMEA, control plan, work instruction */}
      <Doc x={p[4]!.x + 14} y={p[4]!.y + 40} c={C.purple} rev="C" />
      <Doc x={p[4]!.x + 74} y={p[4]!.y + 40} c={C.purple} rev="D" />
      <Doc x={p[4]!.x + 134} y={p[4]!.y + 40} c={C.purple} rev="B" />
      {[0, 1, 2].map((i) => <Check key={i} x={p[4]!.x + 30 + i * 60} y={p[4]!.y + 110} />)}
      {[0, 1].map((i) => <Gk key={i} x={p[4]!.x + 14} y={p[4]!.y + 138 + i * 9} w={i ? 100 : 160} h={3.5} />)}
      {/* D8 recognise the team: trophy, stars, team */}
      {(() => {
        const q = p[5]!, cx = q.x + 60, ty = q.y + 40;
        return (
          <g>
            <path d={`M${cx - 24} ${ty} H${cx + 24} V${ty + 20} Q${cx + 24} ${ty + 46} ${cx} ${ty + 50} Q${cx - 24} ${ty + 46} ${cx - 24} ${ty + 20} Z`} fill={k.m("brass")} stroke="#7A5A18" />
            <path d={`M${cx - 24} ${ty + 6} Q${cx - 40} ${ty + 6} ${cx - 38} ${ty + 20} Q${cx - 36} ${ty + 32} ${cx - 20} ${ty + 34} M${cx + 24} ${ty + 6} Q${cx + 40} ${ty + 6} ${cx + 38} ${ty + 20} Q${cx + 36} ${ty + 32} ${cx + 20} ${ty + 34}`} fill="none" stroke="#B38A2E" strokeWidth={3} />
            <rect x={cx - 5} y={ty + 50} width={10} height={14} fill={k.m("brass")} />
            <rect x={cx - 20} y={ty + 64} width={40} height={12} rx={2} fill={k.m("dark")} />
            <path d={`M${cx - 8} ${ty + 12} l4 0 l2 -6 l2 6 l4 0 l-3 3 l1 5 l-4 -3 l-4 3 l1 -5 Z`} fill="#FFF1C2" />
            {[[q.x + 136, q.y + 50, 9], [q.x + 166, q.y + 66, 7], [q.x + 140, q.y + 86, 6]].map(([x, y, r], i) => <path key={i} d={Array.from({ length: 10 }, (_, j) => { const a = (j * Math.PI) / 5 - Math.PI / 2; const rr = j % 2 ? r! * 0.45 : r!; return `${j ? "L" : "M"}${(x! + Math.cos(a) * rr).toFixed(1)} ${(y! + Math.sin(a) * rr).toFixed(1)}`; }).join("") + "Z"} fill={C.amber} />)}
            {[0, 1, 2, 3].map((i) => <Pic key={i} t="person" x={q.x + 40 + i * 28} y={q.y + 144} c={C.ink} s={0.95} />)}
          </g>
        );
      })()}
      <Callout n={1} x={p[0]!.x} y={p[0]!.y + 46} bx={48} by={p[0]!.y + 46} />
      <Callout n={2} x={p[1]!.x + pw / 2 - 30} y={p[1]!.y} bx={p[1]!.x + pw / 2 - 30} by={20} />
      <Callout n={3} x={p[2]!.x + pw} y={p[2]!.y + 70} bx={752} by={p[2]!.y + 70} />
      <Callout n={4} x={p[3]!.x} y={p[3]!.y + 60} bx={48} by={p[3]!.y + 60} />
      <Callout n={5} x={p[4]!.x + 98} y={p[4]!.y + ph - 14} bx={p[4]!.x + 98} by={482} />
      <Callout n={6} x={p[5]!.x + pw} y={p[5]!.y + 60} bx={752} by={p[5]!.y + 60} />
    </g>
  );
}

export const ARTS_TOOLS: Record<string, () => ReactElement> = {
  "qc-check-sheet": CheckSheet,
  "qc-histogram": Histogram,
  "qc-pareto": Pareto,
  "qc-fishbone": Fishbone,
  "qc-scatter": Scatter,
  "qc-control-chart": ControlChart,
  "qc-stratification": Stratification,
  "qc-flowchart": Flowchart,
  "poka-yoke-fixture": PokaYoke,
  "andon-light": AndonLight,
  "shadow-board": ShadowBoard,
  "eight-d-board": EightDBoard,
};
