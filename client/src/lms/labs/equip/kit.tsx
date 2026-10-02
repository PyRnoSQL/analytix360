import { useId, type ReactNode } from "react";

// Drawing kit for the equipment illustrations: shared material gradients (steel, chrome, brass,
// plastics, granite, LCD…), soft studio shadows, scale ticks and numbered callout balloons.
// Every illustration is drawn on a 800 × 500 canvas and shown on a light "studio" backdrop.

export const W = 800, H = 500;

type Stop = [number, string, number?];
const lin = (id: string, stops: Stop[], v = true) => (
  <linearGradient key={id} id={id} x1="0" y1="0" x2={v ? 0 : 1} y2={v ? 1 : 0}>
    {stops.map(([o, c, a], i) => <stop key={i} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}
  </linearGradient>
);
const rad = (id: string, stops: Stop[], cx = 0.35, cy = 0.35, r = 0.75) => (
  <radialGradient key={id} id={id} cx={cx} cy={cy} r={r}>
    {stops.map(([o, c, a], i) => <stop key={i} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}
  </radialGradient>
);

// Material names. Suffix V = gradient runs left→right (for vertical parts), otherwise top→bottom.
const MATERIALS: Record<string, (id: string) => ReactNode> = {
  steel: (id) => lin(id, [[0, "#FBFCFD"], [0.2, "#DDE2E8"], [0.5, "#AEB7C2"], [0.62, "#E4E8ED"], [1, "#8C96A3"]]),
  steelV: (id) => lin(id, [[0, "#8C96A3"], [0.38, "#E4E8ED"], [0.5, "#AEB7C2"], [0.8, "#DDE2E8"], [1, "#FBFCFD"]], false),
  chrome: (id) => lin(id, [[0, "#FFFFFF"], [0.3, "#A3ADB9"], [0.5, "#F5F7FA"], [0.75, "#6E7784"], [1, "#C9D0D8"]]),
  chromeV: (id) => lin(id, [[0, "#C9D0D8"], [0.25, "#6E7784"], [0.5, "#F5F7FA"], [0.7, "#A3ADB9"], [1, "#FFFFFF"]], false),
  dark: (id) => lin(id, [[0, "#6A727D"], [0.35, "#2E333B"], [0.7, "#1B1F25"], [1, "#454B54"]]),
  darkV: (id) => lin(id, [[0, "#454B54"], [0.3, "#1B1F25"], [0.65, "#2E333B"], [1, "#6A727D"]], false),
  brass: (id) => lin(id, [[0, "#FFF1C2"], [0.3, "#E0BC62"], [0.6, "#B38A2E"], [1, "#7A5A18"]]),
  copper: (id) => lin(id, [[0, "#FFD9C2"], [0.35, "#D9895C"], [0.7, "#A4552D"], [1, "#6E3317"]]),
  black: (id) => lin(id, [[0, "#4A505A"], [0.5, "#23272E"], [1, "#111418"]]),
  yellow: (id) => lin(id, [[0, "#FFE27A"], [0.5, "#F5BE1B"], [1, "#C98F00"]]),
  red: (id) => lin(id, [[0, "#FF8A7A"], [0.5, "#DE3B2F"], [1, "#9E1F17"]]),
  green: (id) => lin(id, [[0, "#7FE0A6"], [0.5, "#1FAE62"], [1, "#0E7A42"]]),
  blue: (id) => lin(id, [[0, "#7DB2FF"], [0.5, "#2F6FDB"], [1, "#184A9E"]]),
  orange: (id) => lin(id, [[0, "#FFB77A"], [0.5, "#F07A1E"], [1, "#B5520A"]]),
  grey: (id) => lin(id, [[0, "#F2F4F7"], [0.5, "#C9CFD7"], [1, "#9AA3AE"]]),
  cream: (id) => lin(id, [[0, "#FFFDF6"], [1, "#EDE6D3"]]),
  granite: (id) => lin(id, [[0, "#5A6068"], [0.5, "#3A3F46"], [1, "#24272C"]]),
  lcd: (id) => lin(id, [[0, "#D5E0CB"], [1, "#A9B99A"]]),
  glass: (id) => lin(id, [[0, "#FFFFFF", 0.75], [0.5, "#DDEBF5", 0.35], [1, "#FFFFFF", 0.6]]),
  rubber: (id) => lin(id, [[0, "#3B3B3B"], [1, "#121212"]]),
  ruby: (id) => rad(id, [[0, "#FFC2CB"], [0.35, "#F23A57"], [1, "#8A0A22"]]),
  ball: (id) => rad(id, [[0, "#FFFFFF"], [0.4, "#C4CBD4"], [1, "#5E6773"]]),
  knob: (id) => rad(id, [[0, "#6B737E"], [0.6, "#2A2F36"], [1, "#15181C"]], 0.4, 0.3, 0.8),
  dial: (id) => rad(id, [[0, "#FFFFFF"], [0.85, "#F1F3F6"], [1, "#C9CFD7"]], 0.5, 0.45, 0.7),
};

export type Kit = {
  /** fill/stroke url for a material, e.g. k.m("steel") */
  m: (name: keyof typeof MATERIALS | string) => string;
  /** unique id for a custom gradient/clip inside one illustration */
  id: (name: string) => string;
  defs: ReactNode;
};

/** Call once at the top of an illustration; render {k.defs} first. Ids are unique per instance. */
export function useKit(extra?: (id: (n: string) => string) => ReactNode): Kit {
  const u = useId().replace(/:/g, "");
  const id = (n: string) => `eq${u}-${n}`;
  const defs = (
    <defs>
      {Object.entries(MATERIALS).map(([n, f]) => f(id(n)))}
      <filter id={id("soft")} x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
      <filter id={id("blur2")}><feGaussianBlur stdDeviation="2" /></filter>
      <pattern id={id("brushed")} width="6" height="6" patternUnits="userSpaceOnUse"><line x1="0" y1="1" x2="6" y2="1" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="0.6" /><line x1="0" y1="4" x2="6" y2="4" stroke="#000000" strokeOpacity="0.06" strokeWidth="0.6" /></pattern>
      <pattern id={id("speckle")} width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="0.9" fill="#FFFFFF" opacity="0.25" /><circle cx="9" cy="8" r="0.7" fill="#FFFFFF" opacity="0.18" /><circle cx="5" cy="12" r="0.8" fill="#000000" opacity="0.3" /><circle cx="12" cy="2" r="0.6" fill="#000000" opacity="0.25" /></pattern>
      <pattern id={id("knurl")} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" fill="#9AA3AE" /><line x1="0" y1="0" x2="0" y2="5" stroke="#5E6773" strokeWidth="1.6" /><line x1="0" y1="0" x2="5" y2="0" stroke="#EEF1F4" strokeWidth="1" /></pattern>
      {extra?.(id)}
    </defs>
  );
  return { m: (n) => `url(#${id(n)})`, id, defs };
}

/** Soft contact shadow under an object resting on the table. */
export function Shadow({ k, cx, cy, rx, ry = 14, o = 0.35 }: { k: Kit; cx: number; cy: number; rx: number; ry?: number; o?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#1B2330" opacity={o} filter={`url(#${k.id("soft")})`} />;
}

/** Numbered callout: dot on the part (x, y), leader line, and balloon (bx, by). Numbers must match the catalog parts list. */
export function Callout({ n, x, y, bx, by }: { n: number; x: number; y: number; bx: number; by: number }) {
  return (
    <g className="eq-callout">
      <line x1={x} y1={y} x2={bx} y2={by} stroke="#111827" strokeWidth="1.6" />
      <circle cx={x} cy={y} r="3.6" fill="#111827" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx={bx} cy={by} r="15" fill="#111827" stroke="#FFFFFF" strokeWidth="2.2" />
      <text x={bx} y={by + 5.2} textAnchor="middle" fontSize="15" fontWeight="800" fill="#FFFFFF" fontFamily="Inter, Arial, sans-serif">{n}</text>
    </g>
  );
}

/** Scale ticks along x from x0, `n` ticks every `step` px; long tick every `major`, medium every `mid`. */
export function Ticks({ x0, y, n, step, h = 8, major = 10, mid = 5, dir = 1, color = "#1B1F25", w = 1 }: { x0: number; y: number; n: number; step: number; h?: number; major?: number; mid?: number; dir?: 1 | -1; color?: string; w?: number }) {
  const d: string[] = [];
  for (let i = 0; i <= n; i++) { const L = i % major === 0 ? h * 1.9 : i % mid === 0 ? h * 1.4 : h; const x = x0 + i * step; d.push(`M${x.toFixed(2)} ${y}v${dir * L}`); }
  return <path d={d.join("")} stroke={color} strokeWidth={w} fill="none" />;
}

/** Engraved/printed label on an instrument (numbers, units: never full sentences). */
export function Mark({ x, y, t, s = 11, c = "#1B1F25", a = "middle", w = 600, f = "Inter, Arial, sans-serif", r }: { x: number; y: number; t: string | number; s?: number; c?: string; a?: "start" | "middle" | "end"; w?: number; f?: string; r?: number }) {
  return <text x={x} y={y} fontSize={s} fill={c} textAnchor={a} fontWeight={w} fontFamily={f} transform={r ? `rotate(${r} ${x} ${y})` : undefined}>{t}</text>;
}
