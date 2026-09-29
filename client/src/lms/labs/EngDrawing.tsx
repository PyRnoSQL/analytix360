import type { ReactElement } from "react";
import type { Dim, Drawing, Unit } from "../types";

// Engineering drawing on a paper sheet: part views, dimension lines with arrows, tolerances,
// balloons for the dimension being measured, and a title block (units, tolerances, projection).
// Nominal values are stored in millimetres and displayed in the drawing unit.
const INKC = "#1B2433", DIM = "#2F5FA8", HI = "#C8321E";
const conv = (mm: number, u: Unit) => (u === "m" ? mm / 1000 : u === "cm" ? mm / 10 : mm);
export const fmtU = (mm: number, u: Unit) => { const v = conv(mm, u); return Number(v.toFixed(u === "m" ? 5 : u === "cm" ? 4 : 3)).toString(); };
export function dimText(d: Dim | undefined, u: Unit, dia = false) {
  if (!d) return "";
  const n = `${dia ? "Ø" : ""}${fmtU(d.nominal, u)}`;
  const p = d.tolPlus ?? 0, m = d.tolMinus ?? 0;
  if (!p && !m) return n;
  if (p === m) return `${n} ±${fmtU(p, u)}`;
  return `${n} +${fmtU(p, u)}/−${fmtU(m, u)}`;
}

function Arrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1), s = 7;
  const head = (x: number, y: number, ang: number) => `M${x} ${y} L${x - s * Math.cos(ang - 0.35)} ${y - s * Math.sin(ang - 0.35)} L${x - s * Math.cos(ang + 0.35)} ${y - s * Math.sin(ang + 0.35)} Z`;
  return <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.1} /><path d={head(x2, y2, a)} fill={color} /><path d={head(x1, y1, a + Math.PI)} fill={color} /></g>;
}
function Label({ x, y, text, color, balloon, rotate }: { x: number; y: number; text: string; color: string; balloon?: string; rotate?: boolean }) {
  return (
    <g transform={rotate ? `rotate(-90 ${x} ${y})` : undefined}>
      <rect x={x - text.length * 3.6 - 4} y={y - 12} width={text.length * 7.2 + 8} height={15} fill="#F7F9FC" />
      <text x={x} y={y} textAnchor="middle" fontSize="12.5" fontFamily="'JetBrains Mono', monospace" fontWeight={color === HI ? 700 : 500} fill={color}>{text}</text>
      {balloon && <g><circle cx={x + text.length * 3.6 + 16} cy={y - 4} r={9} fill={color === HI ? HI : "#F7F9FC"} stroke={color} strokeWidth={1.3} /><text x={x + text.length * 3.6 + 16} y={y} textAnchor="middle" fontSize="11" fontWeight="700" fill={color === HI ? "#fff" : color}>{balloon}</text></g>}
    </g>
  );
}

export function EngDrawing({ drawing, dims, unit = "mm", active }: { drawing: Drawing; dims: Dim[]; unit?: Unit; active?: string }) {
  const by = (id: string) => dims.find((d) => d.id === id);
  const col = (id?: string) => (id && id === active ? HI : DIM);
  const W = 820, H = 430;
  const parts: ReactElement[] = [];

  if (drawing.kind === "shaft") {
    const segs = drawing.segments.map((s) => ({ d: by(s.d), l: by(s.l), s }));
    const total = segs.reduce((a, s) => a + (s.l?.nominal ?? 0), 0), maxD = Math.max(...segs.map((s) => s.d?.nominal ?? 0));
    const k = Math.min(560 / total, 190 / maxD), cx0 = (W - total * k) / 2, cy = 165;
    let x = cx0;
    parts.push(<line key="axis" x1={cx0 - 30} x2={cx0 + total * k + 30} y1={cy} y2={cy} stroke={INKC} strokeWidth={0.8} strokeDasharray="18 4 3 4" />);
    segs.forEach(({ d, l, s }, i) => {
      const w = (l?.nominal ?? 0) * k, h = (d?.nominal ?? 0) * k;
      parts.push(<rect key={`r${i}`} x={x} y={cy - h / 2} width={w} height={h} fill="#E8EEF7" stroke={INKC} strokeWidth={1.8} />);
      const dx = x + w * 0.5;
      parts.push(<g key={`d${i}`}><Arrow x1={dx} y1={cy - h / 2} x2={dx} y2={cy + h / 2} color={col(s.d)} /><Label x={dx + 4} y={cy - 6} text={dimText(d, unit, true)} color={col(s.d)} balloon={d?.label} rotate /></g>);
      const ly = cy + maxD * k / 2 + 36 + (i % 2) * 34;
      parts.push(<g key={`l${i}`}><line x1={x} x2={x} y1={cy + h / 2 + 4} y2={ly + 6} stroke={DIM} strokeWidth={0.7} /><line x1={x + w} x2={x + w} y1={cy + h / 2 + 4} y2={ly + 6} stroke={DIM} strokeWidth={0.7} /><Arrow x1={x} y1={ly} x2={x + w} y2={ly} color={col(s.l)} /><Label x={x + w / 2} y={ly - 4} text={dimText(l, unit)} color={col(s.l)} balloon={l?.label} /></g>);
      x += w;
    });
  }

  if (drawing.kind === "disc") {
    const o = by(drawing.outer), inn = by(drawing.inner), t = by(drawing.thickness), p = drawing.pcd ? by(drawing.pcd) : undefined, hd = drawing.hole ? by(drawing.hole) : undefined;
    const k = 212 / (o?.nominal ?? 1), cx = 250, cy = 188, R = ((o?.nominal ?? 0) * k) / 2, r = ((inn?.nominal ?? 0) * k) / 2;
    parts.push(<circle key="o" cx={cx} cy={cy} r={R} fill="#E8EEF7" stroke={INKC} strokeWidth={1.8} />);
    parts.push(<circle key="i" cx={cx} cy={cy} r={r} fill="#F7F9FC" stroke={INKC} strokeWidth={1.8} />);
    parts.push(<g key="cl"><line x1={cx - R - 20} x2={cx + R + 20} y1={cy} y2={cy} stroke={INKC} strokeWidth={0.7} strokeDasharray="18 4 3 4" /><line x1={cx} x2={cx} y1={cy - R - 20} y2={cy + R + 20} stroke={INKC} strokeWidth={0.7} strokeDasharray="18 4 3 4" /></g>);
    if (p) {
      const pr = (p.nominal * k) / 2, hr = ((hd?.nominal ?? 10) * k) / 2, n = drawing.holes ?? 4;
      parts.push(<circle key="pcd" cx={cx} cy={cy} r={pr} fill="none" stroke={INKC} strokeWidth={0.7} strokeDasharray="18 4 3 4" />);
      for (let i = 0; i < n; i++) { const a = (i * 2 * Math.PI) / n + Math.PI / 4; parts.push(<circle key={`h${i}`} cx={cx + pr * Math.cos(a)} cy={cy + pr * Math.sin(a)} r={hr} fill="#F7F9FC" stroke={col(drawing.hole)} strokeWidth={1.6} />); }
      parts.push(<Label key="pcdl" x={cx} y={cy - R - 30} text={`${n}× ${dimText(hd, unit, true)} on PCD ${dimText(p, unit, true)}`} color={col(drawing.hole) === HI ? HI : col(drawing.pcd)} balloon={hd?.label ?? p.label} />);
    }
    parts.push(<g key="od"><Arrow x1={cx - R} y1={cy + R * 0.62} x2={cx + R} y2={cy + R * 0.62} color={col(drawing.outer)} /><Label x={cx} y={cy + R * 0.62 - 5} text={dimText(o, unit, true)} color={col(drawing.outer)} balloon={o?.label} /></g>);
    parts.push(<g key="id"><Arrow x1={cx - r} y1={cy - r * 0.35} x2={cx + r} y2={cy - r * 0.35} color={col(drawing.inner)} /><Label x={cx} y={cy - r * 0.35 - 5} text={dimText(inn, unit, true)} color={col(drawing.inner)} balloon={inn?.label} /></g>);
    const tw = Math.max(18, (t?.nominal ?? 10) * k), sx = 560;
    parts.push(<rect key="side" x={sx} y={cy - R} width={tw} height={2 * R} fill="#E8EEF7" stroke={INKC} strokeWidth={1.8} />);
    parts.push(<rect key="hub" x={sx} y={cy - r} width={tw} height={2 * r} fill="none" stroke={INKC} strokeWidth={0.9} strokeDasharray="5 3" />);
    parts.push(<g key="th"><line x1={sx} x2={sx} y1={cy + R + 4} y2={cy + R + 34} stroke={DIM} strokeWidth={0.7} /><line x1={sx + tw} x2={sx + tw} y1={cy + R + 4} y2={cy + R + 34} stroke={DIM} strokeWidth={0.7} /><Arrow x1={sx - 26} y1={cy + R + 28} x2={sx} y2={cy + R + 28} color={col(drawing.thickness)} /><Arrow x1={sx + tw + 26} y1={cy + R + 28} x2={sx + tw} y2={cy + R + 28} color={col(drawing.thickness)} /><Label x={sx + tw / 2} y={cy + R + 52} text={dimText(t, unit)} color={col(drawing.thickness)} balloon={t?.label} /></g>);
    parts.push(<text key="v1" x={cx} y={cy + R + 44} textAnchor="middle" fontSize="11" fill={INKC}>FRONT VIEW</text>, <text key="v2" x={sx + tw / 2} y={cy - R - 12} textAnchor="middle" fontSize="11" fill={INKC}>SIDE VIEW</text>);
  }

  if (drawing.kind === "block") {
    const w = by(drawing.width), h = by(drawing.height), th = drawing.thickness ? by(drawing.thickness) : undefined;
    const k = Math.min(520 / (w?.nominal ?? 1), 240 / (h?.nominal ?? 1)), X = (W - (w?.nominal ?? 0) * k) / 2 - 40, Y = 60, PW = (w?.nominal ?? 0) * k, PH = (h?.nominal ?? 0) * k;
    parts.push(<rect key="b" x={X} y={Y} width={PW} height={PH} rx={4} fill="#E8EEF7" stroke={INKC} strokeWidth={1.8} />);
    (drawing.holes ?? []).forEach((ho, i) => {
      const d = by(ho.d), hx = X + ho.x * k, hy = Y + PH - ho.y * k, rr = ((d?.nominal ?? 8) * k) / 2;
      parts.push(<g key={`h${i}`}><circle cx={hx} cy={hy} r={rr} fill="#F7F9FC" stroke={col(ho.d)} strokeWidth={1.6} /><line x1={hx - rr - 8} x2={hx + rr + 8} y1={hy} y2={hy} stroke={INKC} strokeWidth={0.6} strokeDasharray="8 3 2 3" /><line x1={hx} x2={hx} y1={hy - rr - 8} y2={hy + rr + 8} stroke={INKC} strokeWidth={0.6} strokeDasharray="8 3 2 3" />
        {i === 0 || (drawing.holes?.[i - 1]?.d !== ho.d) ? <><line x1={hx + rr * 0.7} y1={hy - rr * 0.7} x2={hx + rr + 34} y2={hy - rr - 30} stroke={col(ho.d)} strokeWidth={1} /><Label x={hx + rr + 40 + dimText(d, unit, true).length * 3.6} y={hy - rr - 30} text={dimText(d, unit, true)} color={col(ho.d)} balloon={d?.label} /></> : null}</g>);
      parts.push(<text key={`hx${i}`} x={hx} y={Y + PH + 16} textAnchor="middle" fontSize="11" fill={INKC} fontFamily="'JetBrains Mono', monospace">{fmtU(ho.x, unit)}</text>);
    });
    parts.push(<g key="w"><line x1={X} x2={X} y1={Y + PH + 22} y2={Y + PH + 58} stroke={DIM} strokeWidth={0.7} /><line x1={X + PW} x2={X + PW} y1={Y + PH + 4} y2={Y + PH + 58} stroke={DIM} strokeWidth={0.7} /><Arrow x1={X} y1={Y + PH + 52} x2={X + PW} y2={Y + PH + 52} color={col(drawing.width)} /><Label x={X + PW / 2} y={Y + PH + 47} text={dimText(w, unit)} color={col(drawing.width)} balloon={w?.label} /></g>);
    parts.push(<g key="h"><line x1={X + PW + 4} x2={X + PW + 46} y1={Y} y2={Y} stroke={DIM} strokeWidth={0.7} /><line x1={X + PW + 4} x2={X + PW + 46} y1={Y + PH} y2={Y + PH} stroke={DIM} strokeWidth={0.7} /><Arrow x1={X + PW + 40} y1={Y} x2={X + PW + 40} y2={Y + PH} color={col(drawing.height)} /><Label x={X + PW + 36} y={Y + PH / 2} text={dimText(h, unit)} color={col(drawing.height)} balloon={h?.label} rotate /></g>);
    if (th) parts.push(<Label key="t" x={X + 90} y={Y - 16} text={`THK ${dimText(th, unit)}`} color={col(drawing.thickness)} balloon={th.label} />);
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-lg" data-no-translate role="img" aria-label={`Engineering drawing: ${drawing.title}`}>
      <rect width={W} height={H} fill="#F7F9FC" />
      <rect x={8} y={8} width={W - 16} height={H - 16} fill="none" stroke={INKC} strokeWidth={1.4} />
      {parts}
      <g fontFamily="'JetBrains Mono', monospace" fontSize="10" fill={INKC}>
        <rect x={W - 290} y={H - 62} width={282} height={54} fill="#F7F9FC" stroke={INKC} strokeWidth={1} />
        <line x1={W - 290} x2={W - 8} y1={H - 44} y2={H - 44} stroke={INKC} strokeWidth={0.7} />
        <line x1={W - 150} x2={W - 150} y1={H - 44} y2={H - 8} stroke={INKC} strokeWidth={0.7} />
        <text x={W - 282} y={H - 49} fontWeight="700" fontSize="11">{drawing.title}</text>
        <text x={W - 282} y={H - 30}>UNITS: {unit.toUpperCase()}</text>
        <text x={W - 282} y={H - 15}>ISO 2768-m</text>
        <text x={W - 142} y={H - 30}>SCALE: NTS</text>
        <text x={W - 142} y={H - 15}>ANALYTIX ENG. LAB</text>
      </g>
    </svg>
  );
}
