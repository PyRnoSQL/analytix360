import type { ReactElement } from "react";
import { useKit, Shadow, Callout, Ticks, Mark } from "../kit";

// ---------------------------------------------------------------------------------------------
// Vernier caliper 0–150 mm, 0.02 mm, shown open at 24.58 mm (vernier line 29 lines up with 53 mm).
function VernierCaliper() {
  const k = useKit();
  const S = 3.3, Z = 172, R = 24.58, xz = Z + R * S; // px per mm, main-scale zero, reading
  const vs = 0.98 * S; // vernier division
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={430} cy={440} rx={330} ry={16} />
      {/* depth rod (moves with the slider) */}
      <rect x={690} y={226} width={R * S} height={6} rx={1.5} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      {/* fixed jaw head + outside and inside jaws */}
      <path d={`M100 196 H${Z} V395 L166 406 L152 386 L128 300 L100 256 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      <path d={`M150 196 V112 L156 102 L162 112 L${Z} 196 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      {/* beam */}
      <rect x={140} y={200} width={550} height={56} rx={3} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={140} y={200} width={550} height={56} rx={3} fill={`url(#${k.id("brushed")})`} />
      {/* main scale: 1 mm ticks hanging up from the vernier edge, numbers every 10 mm */}
      <Ticks x0={Z} y={232} n={150} step={S} h={6} dir={-1} w={0.9} />
      {Array.from({ length: 16 }, (_, i) => <Mark key={i} x={Z + i * 10 * S} y={214} t={i} s={10} />)}
      <Mark x={675} y={250} t="mm" s={9} a="end" />
      {/* slider: top rail, side plates, vernier plate */}
      <path d={`M206 192 H${xz + 190} V272 H${xz - 10} V202 H206 Z`} fill="none" />
      <rect x={206} y={190} width={xz + 200 - 206} height={12} rx={2} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <rect x={xz - 10} y={190} width={12} height={84} rx={2} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1} />
      <rect x={xz + 188} y={190} width={12} height={84} rx={2} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1} />
      <path d={`M${xz - 10} 232 H${xz + 200} V274 H${xz - 10} Z`} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <path d={`M${xz - 6} 233 H${xz + 186} L${xz + 180} 246 H${xz - 2} Z`} fill="#FFFFFF" opacity={0.35} />
      <Ticks x0={xz} y={232} n={50} step={vs} h={6} major={5} mid={5} w={0.9} />
      {Array.from({ length: 11 }, (_, i) => <Mark key={i} x={xz + i * 5 * vs} y={258} t={i} s={8.5} />)}
      <Mark x={xz + 172} y={270} t="0.02mm" s={7.5} a="end" w={700} />
      {/* slider jaws */}
      <path d={`M${xz} 274 V395 L${xz + 6} 406 L${xz + 20} 386 L${xz + 44} 300 L${xz + 64} 274 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      <path d={`M${150 + R * S} 192 V112 L${144 + R * S} 102 L${138 + R * S} 112 L208 192 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      {/* locking screw */}
      <rect x={xz + 116} y={174} width={10} height={18} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={xz + 104} y={160} width={34} height={16} rx={5} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1} />
      {/* thumb roller */}
      <rect x={xz + 170} y={272} width={14} height={8} fill="#8C96A3" />
      <circle cx={xz + 177} cy={288} r={13} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1.2} />
      <circle cx={xz + 177} cy={288} r={3} fill="#5E6773" />
      {/* highlight on the beam top edge */}
      <line x1={142} y1={201.5} x2={688} y2={201.5} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.9} />
      <Callout n={1} x={160} y={340} bx={70} by={380} />
      <Callout n={2} x={156} y={140} bx={78} by={112} />
      <Callout n={3} x={560} y={222} bx={580} by={140} />
      <Callout n={4} x={xz + 70} y={246} bx={xz + 110} by={350} />
      <Callout n={5} x={xz + 121} y={166} bx={xz + 121} by={112} />
      <Callout n={6} x={xz + 177} y={296} bx={xz + 230} by={360} />
      <Callout n={7} x={740} y={229} bx={745} by={300} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Outside micrometer 0–25 mm, 0.01 mm, open at 7.73 mm (sleeve 7.5 + thimble 23).
function OutsideMicrometer() {
  const k = useKit();
  const P = 12, zero = 366, sleeveEdge = zero + 7.5 * P + 0.23 * P; // thimble edge position
  const thR = 30, thY = 200; // thimble radius and axis
  const thLines = Array.from({ length: 13 }, (_, i) => 17 + i); // visible thimble graduations
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={430} rx={300} ry={16} />
      {/* C-frame */}
      <path d="M136 176 H176 V300 Q176 360 236 360 H292 Q304 360 304 348 V230 H344 V350 Q344 404 290 404 H232 Q136 404 136 308 Z" fill={k.m("grey")} stroke="#6B7582" strokeWidth={1.5} />
      <path d="M140 180 H150 V305 Q150 395 232 398 V404 Q136 404 136 308 Z" fill="#FFFFFF" opacity={0.35} />
      {/* heat-insulating plate */}
      <path d="M160 312 Q162 380 232 384 H286 Q322 384 324 350 V312 Q300 344 244 344 Q178 344 160 312 Z" fill={k.m("black")} stroke="#0E1116" strokeWidth={1} />
      {/* anvil */}
      <rect x={176} y={thY - 12} width={30} height={24} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <rect x={200} y={thY - 12} width={6} height={24} fill="#3B414A" />
      {/* spindle */}
      <rect x={206 + 7.73 * 3} y={thY - 12} width={304 - 206 - 7.73 * 3} height={24} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <rect x={206 + 7.73 * 3} y={thY - 12} width={6} height={24} fill="#3B414A" />
      {/* spindle housing and lock lever */}
      <rect x={296} y={172} width={56} height={56} rx={6} fill={k.m("grey")} stroke="#6B7582" strokeWidth={1.5} />
      <path d="M318 172 L326 140 L336 140 L332 172 Z" fill={k.m("dark")} stroke="#1B1F25" strokeWidth={1} />
      <circle cx={331} cy={140} r={7} fill={k.m("knob")} />
      {/* sleeve with reference line, mm above, half-mm below */}
      <rect x={352} y={thY - 17} width={sleeveEdge - 352 + 20} height={34} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <line x1={356} y1={thY} x2={sleeveEdge + 20} y2={thY} stroke="#1B1F25" strokeWidth={1.2} />
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1={zero + i * P} y1={thY} x2={zero + i * P} y2={thY - (i % 5 === 0 ? 12 : 8)} stroke="#1B1F25" strokeWidth={1.1} />)}
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1={zero + (i + 0.5) * P} y1={thY} x2={zero + (i + 0.5) * P} y2={thY + 7} stroke="#1B1F25" strokeWidth={1.1} />)}
      <Mark x={zero} y={thY - 14} t="0" s={9} />
      <Mark x={zero + 5 * P} y={thY - 14} t="5" s={9} />
      {/* thimble */}
      <path d={`M${sleeveEdge} ${thY - thR + 6} L${sleeveEdge + 16} ${thY - thR} H${sleeveEdge + 150} V${thY + thR} H${sleeveEdge + 16} L${sleeveEdge} ${thY + thR - 6} Z`} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={sleeveEdge + 70} y={thY - thR} width={80} height={thR * 2} fill={`url(#${k.id("knurl")})`} opacity={0.9} />
      {thLines.map((v) => {
        const a = ((v - 23) / 50) * 2 * Math.PI; // angle on the drum
        if (Math.abs(a) > 1.35) return null;
        const y = thY + Math.sin(a) * (thR - 6);
        return (
          <g key={v}>
            <line x1={sleeveEdge + 2} y1={y} x2={sleeveEdge + (v % 5 === 0 ? 30 : 22)} y2={y} stroke="#1B1F25" strokeWidth={1} opacity={Math.cos(a)} />
            {v % 5 === 0 && <Mark x={sleeveEdge + 44} y={y + 3.5} t={v} s={9} a="middle" />}
          </g>
        );
      })}
      <Mark x={sleeveEdge + 140} y={thY + thR - 6} t="0.01mm" s={7} a="end" />
      {/* ratchet */}
      <rect x={sleeveEdge + 150} y={thY - 14} width={14} height={28} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <rect x={sleeveEdge + 164} y={thY - 18} width={46} height={36} rx={6} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1.2} />
      <Callout n={1} x={318} y={300} bx={378} by={360} />
      <Callout n={2} x={192} y={thY} bx={170} by={110} />
      <Callout n={3} x={260} y={thY} bx={250} by={110} />
      <Callout n={4} x={330} y={146} bx={372} by={96} />
      <Callout n={5} x={410} y={thY + 12} bx={440} by={276} />
      <Callout n={6} x={sleeveEdge + 100} y={thY + thR - 4} bx={sleeveEdge + 110} by={300} />
      <Callout n={7} x={sleeveEdge + 190} y={thY - 18} bx={sleeveEdge + 215} by={120} />
      <Callout n={8} x={240} y={370} bx={110} by={450} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Shared helpers for round dials (angles in radians, clockwise from 12 o'clock).
const pol = (cx: number, cy: number, r: number, a: number): [number, number] => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
const f2 = (v: number) => v.toFixed(2);

/** Graduations of a round dial: n divisions over `sweep`, long tick every `maj`, medium every `mid`, label every `lab`. */
function DialGrad({ cx, cy, r, n, lab, label, fs = 10, w = 1, maj = 10, mid = 5, sweep = 2 * Math.PI, c = "#1B1F25", lr }: { cx: number; cy: number; r: number; n: number; lab: number; label: (i: number) => string | null; fs?: number; w?: number; maj?: number; mid?: number; sweep?: number; c?: string; lr?: number }) {
  const d: string[] = [];
  const ls: ReactElement[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * sweep;
    const L = i % maj === 0 ? r * 0.15 : i % mid === 0 ? r * 0.105 : r * 0.07;
    const [x1, y1] = pol(cx, cy, r, a), [x2, y2] = pol(cx, cy, r - L, a);
    d.push(`M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}`);
    if (i % lab === 0) {
      const t = label(i);
      if (t !== null) { const [x, y] = pol(cx, cy, lr ?? r - r * 0.15 - fs * 0.85, a); ls.push(<Mark key={i} x={x} y={y + fs * 0.36} t={t} s={fs} c={c} w={700} />); }
    }
  }
  return <g><path d={d.join("")} stroke={c} strokeWidth={w} fill="none" />{ls}</g>;
}

/** Tapered pointer with a counterweight tail and a hub. */
function Needle({ cx, cy, len, a, tail = 16, w = 2.6, c = "#1B1F25", hub = 6 }: { cx: number; cy: number; len: number; a: number; tail?: number; w?: number; c?: string; hub?: number }) {
  const [tx, ty] = pol(cx, cy, len, a), [bx, by] = pol(cx, cy, -tail, a);
  const [p1x, p1y] = pol(cx, cy, w, a + Math.PI / 2), [p2x, p2y] = pol(cx, cy, w, a - Math.PI / 2);
  return (
    <g>
      <path d={`M${f2(bx)} ${f2(by)} L${f2(p1x)} ${f2(p1y)} L${f2(tx)} ${f2(ty)} L${f2(p2x)} ${f2(p2y)} Z`} fill={c} opacity={0.18} transform="translate(2 3)" />
      <path d={`M${f2(bx)} ${f2(by)} L${f2(p1x)} ${f2(p1y)} L${f2(tx)} ${f2(ty)} L${f2(p2x)} ${f2(p2y)} Z`} fill={c} />
      <circle cx={cx} cy={cy} r={hub} fill="#2E333B" stroke="#0E1116" strokeWidth={0.8} />
      <circle cx={cx - hub * 0.3} cy={cy - hub * 0.3} r={hub * 0.35} fill="#FFFFFF" opacity={0.45} />
    </g>
  );
}

/** Chrome bezel with a fine knurled rim, bevel ring and white dial face. */
function Bezel({ k, cx, cy, r, rf }: { k: ReturnType<typeof useKit>; cx: number; cy: number; r: number; rf: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={1.3} />
      <circle cx={cx} cy={cy} r={r - 1.6} fill="none" stroke="#4A525D" strokeWidth={2.4} strokeDasharray="1.2 1.6" opacity={0.7} />
      <circle cx={cx} cy={cy} r={(r + rf) / 2 + 1} fill={k.m("steelV")} stroke="#8C96A3" strokeWidth={0.8} />
      <circle cx={cx} cy={cy} r={rf} fill={k.m("dial")} stroke="#9AA3AE" strokeWidth={1} />
    </g>
  );
}

/** Glass reflection over a dial. */
function Glare({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <path d={`M${f2(cx - r * 0.82)} ${f2(cy - r * 0.2)} A${r} ${r} 0 0 1 ${f2(cx + r * 0.35)} ${f2(cy - r * 0.86)} A${r * 1.25} ${r * 1.25} 0 0 0 ${f2(cx - r * 0.82)} ${f2(cy - r * 0.2)} Z`} fill="#FFFFFF" opacity={0.32} />;
}

/** Horizontal tick lines stacked vertically from y0 (step may be negative to go upwards). */
function VTicks({ x, y0, n, step, h = 8, major = 10, mid = 5, dir = 1, color = "#1B1F25", w = 1, from = 0 }: { x: number; y0: number; n: number; step: number; h?: number; major?: number; mid?: number; dir?: 1 | -1; color?: string; w?: number; from?: number }) {
  const d: string[] = [];
  for (let i = from; i <= n; i++) { const L = i % major === 0 ? h * 1.9 : i % mid === 0 ? h * 1.4 : h; d.push(`M${x} ${f2(y0 + i * step)}h${dir * L}`); }
  return <path d={d.join("")} stroke={color} strokeWidth={w} fill="none" />;
}

// ---------------------------------------------------------------------------------------------
// Digital caliper 0–150 mm, 0.01 mm, open at 24.58 mm.
function DigitalCaliper() {
  const k = useKit();
  const S = 3.3, Z = 172, R = 24.58, xz = Z + R * S;
  const hx = xz - 10, hw = 236; // slider housing
  const btn = [{ x: hx + 62, t: "ON/OFF" }, { x: hx + 120, t: "ZERO" }, { x: hx + 178, t: "mm/in" }];
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={430} cy={440} rx={330} ry={16} />
      {/* depth rod */}
      <rect x={690} y={226} width={R * S} height={6} rx={1.5} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      {/* fixed jaws */}
      <path d={`M100 196 H${Z} V395 L166 406 L152 386 L128 300 L100 256 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      <path d={`M150 196 V112 L156 102 L162 112 L${Z} 196 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      {/* beam with printed scale */}
      <rect x={140} y={200} width={550} height={56} rx={3} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={140} y={200} width={550} height={56} rx={3} fill={`url(#${k.id("brushed")})`} />
      <Ticks x0={Z} y={201} n={150} step={S} h={5} w={0.8} />
      {Array.from({ length: 16 }, (_, i) => <Mark key={i} x={Z + i * 10 * S} y={230} t={i * 10} s={8.5} />)}
      <Mark x={684} y={250} t="mm" s={8} a="end" />
      <line x1={142} y1={201.5} x2={688} y2={201.5} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.9} />
      {/* slider jaws */}
      <path d={`M${xz} 290 V395 L${xz + 6} 406 L${xz + 20} 386 L${xz + 44} 310 L${xz + 64} 298 V290 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={206} y={188} width={hx + 30 - 206} height={12} rx={2} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <path d={`M${150 + R * S} 190 V112 L${144 + R * S} 102 L${138 + R * S} 112 L208 190 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      {/* locking screw */}
      <rect x={hx + 36} y={172} width={10} height={16} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={hx + 24} y={158} width={34} height={16} rx={5} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1} />
      {/* thumb roller */}
      <rect x={hx + hw - 44} y={298} width={14} height={10} fill="#8C96A3" />
      <circle cx={hx + hw - 37} cy={316} r={13} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1.2} />
      <circle cx={hx + hw - 37} cy={316} r={3} fill="#5E6773" />
      {/* electronic slider housing */}
      <rect x={hx} y={184} width={hw} height={118} rx={12} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={hx} y={184} width={hw} height={118} rx={12} fill={`url(#${k.id("brushed")})`} />
      <rect x={hx + 8} y={192} width={hw - 16} height={102} rx={9} fill={k.m("black")} stroke="#0E1116" strokeWidth={1} />
      <path d={`M${hx + 14} 196 H${hx + hw - 14}`} stroke="#FFFFFF" strokeOpacity={0.18} strokeWidth={1.5} />
      {/* LCD */}
      <rect x={hx + 24} y={200} width={188} height={48} rx={4} fill="#11151A" />
      <rect x={hx + 28} y={203} width={180} height={42} rx={3} fill={k.m("lcd")} />
      <rect x={hx + 28} y={203} width={180} height={4} fill="#000000" opacity={0.12} />
      <Mark x={hx + 178} y={237} t="24.58" s={31} c="#1E2A1A" w={700} f="'DejaVu Sans Mono', 'Courier New', monospace" a="end" />
      <Mark x={hx + 203} y={237} t="mm" s={10} c="#1E2A1A" w={700} a="end" />
      <path d={`M${hx + 30} 205 L${hx + 80} 205 L${hx + 60} 243 L${hx + 30} 243 Z`} fill="#FFFFFF" opacity={0.12} />
      {/* buttons */}
      {btn.map((b) => (
        <g key={b.t}>
          <Mark x={b.x} y={261} t={b.t} s={7.5} c="#E6E9ED" w={700} />
          <rect x={b.x - 21} y={266} width={42} height={17} rx={8.5} fill={k.m("grey")} stroke="#0E1116" strokeWidth={1} />
          <rect x={b.x - 16} y={268} width={32} height={4} rx={2} fill="#FFFFFF" opacity={0.6} />
        </g>
      ))}
      <Callout n={1} x={160} y={340} bx={70} by={380} />
      <Callout n={2} x={156} y={140} bx={78} by={112} />
      <Callout n={3} x={hx + 56} y={214} bx={440} by={112} />
      <Callout n={4} x={hx + 100} y={276} bx={362} by={392} />
      <Callout n={5} x={hx + 190} y={275} bx={560} by={350} />
      <Callout n={6} x={hx + hw - 37} y={324} bx={492} by={410} />
      <Callout n={7} x={740} y={229} bx={745} by={300} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Dial caliper 0–150 mm, 0.02 mm, 2 mm per revolution, reading 24.36 mm (24 on the beam + 36 on the dial).
function DialCaliper() {
  const k = useKit();
  const S = 3.3, Z = 172, R = 24.36, xz = Z + R * S;
  const dcx = xz + 100, dcy = 280, rb = 63, rf = 53;
  const rack: string[] = [];
  for (let x = 176; x < 684; x += 2.6) rack.push(`M${f2(x)} 238v9`);
  const ang = (0.36 / 2) * 2 * Math.PI; // 0.36 mm on a 2 mm-per-turn dial
  const lock = pol(dcx, dcy, rb + 3, (125 * Math.PI) / 180);
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={430} cy={440} rx={330} ry={16} />
      <rect x={690} y={223} width={R * S} height={6} rx={1.5} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <path d={`M100 186 H${Z} V405 L166 416 L152 396 L128 310 L100 262 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      <path d={`M150 186 V108 L156 98 L162 108 L${Z} 186 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      {/* beam: scale band on top, rack in the middle */}
      <rect x={140} y={190} width={550} height={72} rx={3} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={140} y={190} width={550} height={72} rx={3} fill={`url(#${k.id("brushed")})`} />
      <Ticks x0={Z} y={216} n={150} step={S} h={5} dir={-1} w={0.85} />
      {Array.from({ length: 16 }, (_, i) => <Mark key={i} x={Z + i * 10 * S} y={203} t={i * 10} s={8.5} />)}
      <Mark x={686} y={231} t="mm" s={8} a="end" />
      <rect x={174} y={235} width={512} height={15} rx={1} fill="#7D8794" stroke="#5E6773" strokeWidth={0.8} />
      <path d={rack.join("")} stroke="#3B414A" strokeWidth={1.2} />
      <line x1={174} y1={236} x2={686} y2={236} stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={0.8} />
      <line x1={142} y1={191.5} x2={688} y2={191.5} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.9} />
      {/* slider jaws */}
      <path d={`M${xz} 330 V405 L${xz + 6} 416 L${xz + 20} 396 L${xz + 44} 352 L${xz + 64} 344 V330 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={206} y={180} width={xz + 200 - 206} height={12} rx={2} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <path d={`M${150 + R * S} 182 V108 L${144 + R * S} 98 L${138 + R * S} 108 L208 182 Z`} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={xz - 10} y={180} width={12} height={40} rx={2} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1} />
      <rect x={xz + 188} y={180} width={12} height={40} rx={2} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1} />
      {/* locking screw */}
      <rect x={xz + 160} y={166} width={10} height={16} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={xz + 148} y={152} width={34} height={16} rx={5} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1} />
      {/* thumb roller */}
      <rect x={xz + 172} y={344} width={14} height={8} fill="#8C96A3" />
      <circle cx={xz + 179} cy={360} r={12} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1.2} />
      <circle cx={xz + 179} cy={360} r={3} fill="#5E6773" />
      {/* slider plate carrying the dial */}
      <path d={`M${xz - 10} 216 H${xz + 200} V336 Q${xz + 200} 346 ${xz + 190} 346 H${xz} Q${xz - 10} 346 ${xz - 10} 336 Z`} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1.1} />
      <path d={`M${xz - 6} 218 H${xz + 196} V226 H${xz - 6} Z`} fill="#FFFFFF" opacity={0.4} />
      <path d={`M${xz} 216 l-4 -6 h8 Z`} fill="#D03B3B" />
      {/* dial */}
      <Bezel k={k} cx={dcx} cy={dcy} r={rb} rf={rf} />
      <DialGrad cx={dcx} cy={dcy} r={rf - 1} n={100} lab={5} label={(i) => String((i % 50) * 2)} fs={8.5} w={0.8} lr={rf - 16} />
      <Mark x={dcx} y={dcy + 22} t="0.02mm" s={7.5} c="#374151" />
      <Mark x={dcx} y={dcy - 16} t="2mm" s={7} c="#374151" />
      <Needle cx={dcx} cy={dcy} len={rf - 4} a={ang} tail={10} w={2} c="#C8261C" hub={4.5} />
      <Glare cx={dcx} cy={dcy} r={rf} />
      {/* bezel lock screw */}
      <circle cx={lock[0]} cy={lock[1]} r={7} fill={k.m("knob")} stroke="#0E1116" strokeWidth={0.8} />
      <line x1={lock[0] - 4} y1={lock[1] - 2} x2={lock[0] + 4} y2={lock[1] + 2} stroke="#9AA3AE" strokeWidth={1.4} />
      <Callout n={1} x={160} y={340} bx={70} by={380} />
      <Callout n={2} x={dcx - 18} y={dcy - 8} bx={dcx - 40} by={112} />
      <Callout n={3} x={lock[0]} y={lock[1]} bx={520} by={390} />
      <Callout n={4} x={620} y={243} bx={640} by={320} />
      <Callout n={5} x={560} y={210} bx={580} by={130} />
      <Callout n={6} x={740} y={226} bx={745} by={300} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Digital outside micrometer 0–25 mm, 0.001 mm, reading 7.734 mm (sleeve 7.5 + thimble 23.4).
function DigitalMicrometer() {
  const k = useKit();
  const R = 7.734, P = 11, zero = 452, sleeveEdge = zero + R * P;
  const thR = 30, thY = 200, thV = 23.4;
  const thLines = Array.from({ length: 13 }, (_, i) => 17 + i);
  const sp = 206 + R * 3; // spindle face
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={420} cy={430} rx={320} ry={16} />
      {/* C-frame and heat-insulating plate */}
      <path d="M136 176 H176 V300 Q176 360 236 360 H292 Q304 360 304 348 V230 H344 V350 Q344 404 290 404 H232 Q136 404 136 308 Z" fill={k.m("grey")} stroke="#6B7582" strokeWidth={1.5} />
      <path d="M140 180 H150 V305 Q150 395 232 398 V404 Q136 404 136 308 Z" fill="#FFFFFF" opacity={0.35} />
      <path d="M160 312 Q162 380 232 384 H286 Q322 384 324 350 V312 Q300 344 244 344 Q178 344 160 312 Z" fill={k.m("black")} stroke="#0E1116" strokeWidth={1} />
      {/* anvil and spindle with carbide faces */}
      <rect x={176} y={thY - 12} width={30} height={24} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <rect x={198} y={thY - 12} width={8} height={24} fill={k.m("dark")} />
      <rect x={sp} y={thY - 12} width={300 - sp} height={24} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <rect x={sp} y={thY - 12} width={8} height={24} fill={k.m("dark")} />
      {/* display housing */}
      <rect x={290} y={130} width={152} height={108} rx={12} fill={k.m("grey")} stroke="#6B7582" strokeWidth={1.5} />
      <rect x={290} y={130} width={152} height={108} rx={12} fill={`url(#${k.id("brushed")})`} />
      <rect x={298} y={138} width={136} height={92} rx={8} fill={k.m("black")} stroke="#0E1116" strokeWidth={1} />
      <rect x={306} y={145} width={120} height={42} rx={3} fill="#11151A" />
      <rect x={309} y={148} width={114} height={36} rx={2} fill={k.m("lcd")} />
      <Mark x={402} y={177} t="7.734" s={25} c="#1E2A1A" w={700} f="'DejaVu Sans Mono', 'Courier New', monospace" a="end" />
      <Mark x={419} y={177} t="mm" s={8} c="#1E2A1A" w={700} a="end" />
      <path d="M311 150 H346 L330 182 H311 Z" fill="#FFFFFF" opacity={0.12} />
      <Mark x={366} y={198} t="0.001mm" s={7} c="#C9CFD7" w={700} />
      {[{ x: 334, t: "ZERO" }, { x: 398, t: "ORIGIN" }].map((b) => (
        <g key={b.t}>
          <rect x={b.x - 22} y={206} width={44} height={16} rx={8} fill={k.m("grey")} stroke="#0E1116" strokeWidth={1} />
          <rect x={b.x - 17} y={208} width={34} height={4} rx={2} fill="#FFFFFF" opacity={0.6} />
          <Mark x={b.x} y={217.5} t={b.t} s={7} c="#1B1F25" w={800} />
        </g>
      ))}
      {/* sleeve */}
      <rect x={442} y={thY - 17} width={sleeveEdge - 442 + 20} height={34} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <line x1={446} y1={thY} x2={sleeveEdge + 20} y2={thY} stroke="#1B1F25" strokeWidth={1.2} />
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1={zero + i * P} y1={thY} x2={zero + i * P} y2={thY - (i % 5 === 0 ? 12 : 8)} stroke="#1B1F25" strokeWidth={1.1} />)}
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1={zero + (i + 0.5) * P} y1={thY} x2={zero + (i + 0.5) * P} y2={thY + 7} stroke="#1B1F25" strokeWidth={1.1} />)}
      <Mark x={zero} y={thY - 14} t="0" s={9} />
      <Mark x={zero + 5 * P} y={thY - 14} t="5" s={9} />
      {/* thimble */}
      <path d={`M${sleeveEdge} ${thY - thR + 6} L${sleeveEdge + 16} ${thY - thR} H${sleeveEdge + 128} V${thY + thR} H${sleeveEdge + 16} L${sleeveEdge} ${thY + thR - 6} Z`} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={sleeveEdge + 66} y={thY - thR} width={62} height={thR * 2} fill={`url(#${k.id("knurl")})`} opacity={0.9} />
      {thLines.map((v) => {
        const a = ((v - thV) / 50) * 2 * Math.PI;
        if (Math.abs(a) > 1.35) return null;
        const y = thY + Math.sin(a) * (thR - 6);
        return (
          <g key={v}>
            <line x1={sleeveEdge + 2} y1={y} x2={sleeveEdge + (v % 5 === 0 ? 30 : 22)} y2={y} stroke="#1B1F25" strokeWidth={1} opacity={Math.cos(a)} />
            {v % 5 === 0 && <Mark x={sleeveEdge + 44} y={y + 3.5} t={v} s={9} a="middle" />}
          </g>
        );
      })}
      {/* ratchet */}
      <rect x={sleeveEdge + 128} y={thY - 14} width={14} height={28} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <rect x={sleeveEdge + 142} y={thY - 18} width={44} height={36} rx={6} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1.2} />
      <Callout n={1} x={(206 + sp) / 2} y={thY} bx={214} by={96} />
      <Callout n={2} x={318} y={160} bx={330} by={70} />
      <Callout n={3} x={313} y={216} bx={250} by={290} />
      <Callout n={4} x={sleeveEdge + 96} y={thY + thR - 4} bx={sleeveEdge + 104} by={300} />
      <Callout n={5} x={sleeveEdge + 166} y={thY - 18} bx={sleeveEdge + 186} by={116} />
      <Callout n={6} x={142} y={260} bx={76} by={300} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Dial bore gauge lying on the bench: 0.01 mm indicator (stem into the shank), grip, measuring head,
// spare anvils and washers in front.
function BoreGauge() {
  const k = useKit();
  const ax = 250; // shank axis y
  const dcx = 160, dcy = ax, rb = 78, rf = 66;
  const T = (x: number, y: number): [number, number] => [650 + (x - 650) * 1.25, ax + (y - ax) * 1.25]; // head is drawn scaled 1.25×
  return (
    <g>
      {k.defs}
      <g transform="translate(-14 0)">
      <Shadow k={k} cx={420} cy={352} rx={330} ry={24} o={0.3} />
      <Shadow k={k} cx={600} cy={414} rx={150} ry={20} o={0.18} />
      {/* shank tube */}
      <rect x={280} y={ax - 10} width={370} height={20} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      {/* insulated grip */}
      <rect x={340} y={ax - 26} width={170} height={52} rx={18} fill={k.m("rubber")} stroke="#000000" strokeWidth={1} />
      {Array.from({ length: 13 }, (_, i) => <rect key={i} x={356 + i * 11} y={ax - 24} width={5} height={48} rx={2.5} fill="#4A4F57" opacity={0.75} />)}
      <rect x={346} y={ax - 22} width={158} height={8} rx={4} fill="#FFFFFF" opacity={0.12} />
      <rect x={330} y={ax - 18} width={12} height={36} rx={3} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={508} y={ax - 18} width={12} height={36} rx={3} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.8} />
      {/* clamp collar for the indicator stem */}
      <rect x={236} y={ax - 7} width={30} height={14} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={262} y={ax - 20} width={34} height={40} rx={5} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <rect x={272} y={ax - 34} width={14} height={16} rx={2} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={0.8} />
      <line x1={262} y1={ax} x2={296} y2={ax} stroke="#5E6773" strokeWidth={1} />
      <g transform={`translate(650 ${ax}) scale(1.25) translate(-650 ${-ax})`}>
      {/* measuring head */}
      <path d={`M640 ${ax - 14} H652 L660 ${ax - 30} H708 Q716 ${ax - 30} 716 ${ax - 22} V${ax + 22} Q716 ${ax + 30} 708 ${ax + 30} H660 L652 ${ax + 14} H640 Z`} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={662} y={ax - 26} width={48} height={6} rx={2} fill="#FFFFFF" opacity={0.45} />
      {/* anvil: threaded rod, washers, lock nut */}
      <rect x={679} y={150} width={14} height={66} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <path d={Array.from({ length: 12 }, (_, i) => `M679 ${172 + i * 3.5}h14`).join("")} stroke="#6E7784" strokeWidth={0.9} />
      <path d="M679 152 Q686 140 693 152 Z" fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={670} y={202} width={32} height={4} rx={1} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.6} />
      <rect x={670} y={206.5} width={32} height={4} rx={1} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.6} />
      <rect x={668} y={211} width={36} height={9} rx={1.5} fill={k.m("steelV")} stroke="#5E6773" strokeWidth={0.8} />
      <line x1={680} y1={211} x2={680} y2={220} stroke="#5E6773" strokeWidth={0.8} />
      <line x1={692} y1={211} x2={692} y2={220} stroke="#5E6773" strokeWidth={0.8} />
      {/* plunger and centralising guide */}
      <rect x={681} y={ax + 30} width={10} height={30} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <circle cx={686} cy={ax + 61} r={5.5} fill={k.m("ball")} stroke="#5E6773" strokeWidth={0.6} />
      <path d={`M662 ${ax + 30} H710 V${ax + 36} Q712 ${ax + 50} 704 ${ax + 54} L700 ${ax + 54} Q698 ${ax + 44} 694 ${ax + 38} H678 Q674 ${ax + 44} 672 ${ax + 54} L668 ${ax + 54} Q660 ${ax + 50} 662 ${ax + 36} Z`} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      </g>
      {/* dial indicator, stem pointing into the shank */}
      <g transform={`rotate(-90 ${dcx} ${dcy})`}>
        <rect x={dcx - 9} y={dcy + rb - 4} width={18} height={16} rx={2} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
        <rect x={dcx - 6} y={dcy - rb - 14} width={12} height={16} rx={3} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
        <Bezel k={k} cx={dcx} cy={dcy} r={rb} rf={rf} />
        <DialGrad cx={dcx} cy={dcy} r={rf - 1} n={100} lab={10} label={(i) => String(i)} fs={10} w={0.9} />
        <circle cx={dcx} cy={dcy - 26} r={13} fill="#FFFFFF" stroke="#9AA3AE" strokeWidth={0.8} />
        <DialGrad cx={dcx} cy={dcy - 26} r={12} n={10} lab={100} label={() => null} maj={1} mid={1} w={0.8} />
        <Needle cx={dcx} cy={dcy - 26} len={10} a={(0.22 / 10) * 2 * Math.PI} tail={3} w={1.2} hub={2} />
        <Mark x={dcx} y={dcy + 30} t="0.01mm" s={8} c="#374151" />
        <Needle cx={dcx} cy={dcy} len={rf - 6} a={(22 / 100) * 2 * Math.PI} tail={14} w={2.4} c="#C8261C" hub={5} />
      </g>
      <Glare cx={dcx} cy={dcy} r={rf} />
      {/* spare anvils and washers */}
      {[0, 1, 2].map((i) => {
        const y = 374 + i * 15, L = 70 + i * 22, x = 486;
        return (
          <g key={i}>
            <rect x={x} y={y} width={L} height={9} rx={1} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.7} />
            <path d={Array.from({ length: Math.floor((L - 26) / 3.5) }, (_, j) => `M${x + 22 + j * 3.5} ${y}v9`).join("")} stroke="#6E7784" strokeWidth={0.8} />
            <path d={`M${x + L} ${y} Q${x + L + 7} ${y + 4.5} ${x + L} ${y + 9} Z`} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.7} />
          </g>
        );
      })}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <ellipse cx={664 + i * 24} cy={404} rx={10} ry={5} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.8} />
          <ellipse cx={664 + i * 24} cy={402.5} rx={10} ry={5} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
          <ellipse cx={664 + i * 24} cy={402.5} rx={4} ry={2} fill="#6E7784" />
        </g>
      ))}
      <Callout n={1} x={128} y={200} bx={80} by={118} />
      <Callout n={2} x={430} y={ax - 24} bx={430} by={140} />
      <Callout n={3} x={T(714, ax)[0]} y={ax} bx={772} by={250} />
      <Callout n={4} x={T(706, ax + 47)[0]} y={T(706, ax + 47)[1]} bx={770} by={330} />
      <Callout n={5} x={T(686, ax + 64)[0]} y={T(686, ax + 64)[1]} bx={640} by={360} />
      <Callout n={6} x={T(686, 207)[0]} y={T(686, 207)[1]} bx={620} by={130} />
      </g>
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Vernier depth gauge 0–150 mm, 0.02 mm, standing on a sectioned part: depth 36.42 mm
// (vernier line 21 lines up with 57 mm on the rod).
function DepthGauge() {
  const k = useKit(
    (id) => (
      <pattern id={id("hatch")} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#6E7784" strokeWidth="1.2" />
      </pattern>
    ),
  );
  const S = 3.3, D = 36.42, iy = 286; // px/mm, depth, vernier zero line
  const face = 340, tip = face + D * S; // base reference face, rod tip
  const vY = (v: number) => iy - (v - D) * S; // y of rod graduation v
  const vs = 0.98 * S;
  const rodTicks: string[] = [];
  for (let v = 0; v <= 110; v++) { const y = vY(v); if (y < 46) continue; const L = v % 10 === 0 ? 14 : v % 5 === 0 ? 10 : 6; rodTicks.push(`M400 ${f2(y)}h${L}`); }
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={410} cy={466} rx={250} ry={20} o={0.3} />
      {/* sectioned workpiece with a blind hole */}
      <rect x={200} y={face} width={432} height={128} fill={k.m("grey")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={200} y={face} width={432} height={128} fill={`url(#${k.id("hatch")})`} opacity={0.5} />
      <rect x={384} y={face} width={64} height={D * S} fill="#4A525D" />
      <rect x={384} y={face} width={64} height={D * S} fill={k.m("darkV")} opacity={0.6} />
      <line x1={384} y1={tip} x2={448} y2={tip} stroke="#1B1F25" strokeWidth={1.5} />
      {/* measuring rod */}
      <rect x={400} y={40} width={32} height={tip - 40} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.1} />
      <rect x={400} y={40} width={32} height={tip - 40} fill={`url(#${k.id("brushed")})`} />
      <path d={rodTicks.join("")} stroke="#1B1F25" strokeWidth={0.85} />
      {Array.from({ length: 11 }, (_, i) => i).filter((c) => vY(c * 10) > 56 && (vY(c * 10) < 296 || vY(c * 10) > face + 10)).map((c) => <Mark key={c} x={421} y={vY(c * 10) + 3.5} t={c} s={9} a="start" />)}
      {/* base */}
      <path d={`M116 ${face} V${face - 12} Q116 ${face - 18} 124 ${face - 19} L250 302 Q256 300 264 300 H568 Q576 300 582 302 L708 ${face - 19} Q716 ${face - 18} 716 ${face - 12} V${face} Z`} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.3} />
      <path d={`M126 ${face - 17} L252 304 H580 L706 ${face - 17}`} fill="none" stroke="#FFFFFF" strokeWidth={2} opacity={0.6} />
      <rect x={116} y={face - 5} width={600} height={5} fill={k.m("chrome")} />
      {/* body with vernier plate */}
      <rect x={334} y={117} width={124} height={185} rx={4} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={334} y={117} width={124} height={185} rx={4} fill={`url(#${k.id("brushed")})`} />
      <rect x={398} y={117} width={36} height={185} fill="#5E6773" opacity={0.5} />
      <rect x={400} y={117} width={32} height={185} fill={k.m("steelV")} />
      <path d={rodTicks.filter((s) => { const y = Number(s.split(" ")[1]!.split("h")[0]); return y > 117 && y < 302; }).join("")} stroke="#1B1F25" strokeWidth={0.85} />
      {[4, 5, 6, 7, 8].map((c) => <Mark key={c} x={421} y={vY(c * 10) + 3.5} t={c} s={9} a="start" />)}
      <path d={`M344 121 H398 L400 ${iy + 10} H344 Z`} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <VTicks x={400} y0={iy} n={50} step={-vs} h={5} dir={-1} major={5} mid={5} w={0.8} />
      {Array.from({ length: 11 }, (_, i) => <Mark key={i} x={378} y={iy - i * 5 * vs + 3} t={i} s={7.5} a="end" />)}
      <Mark x={372} y={iy + 7} t="0.02mm" s={6} a="middle" w={700} />
      {/* locking screw */}
      <rect x={318} y={174} width={18} height={12} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={300} y={164} width={20} height={32} rx={5} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1} />
      <Callout n={1} x={640} y={322} bx={720} by={250} />
      <Callout n={2} x={416} y={52} bx={520} by={64} />
      <Callout n={3} x={408} y={vY(75)} bx={530} by={150} />
      <Callout n={4} x={360} y={230} bx={250} by={260} />
      <Callout n={5} x={302} y={180} bx={232} by={140} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Digital height gauge 0–300 mm on a granite plate, scriber set to 120.36 mm on a part.
function HeightGauge() {
  const k = useKit();
  const S = 1.1, ref = 390, H = 120.36, sy = ref - H * S; // scriber measuring face
  const colTicks: string[] = [];
  for (let v = 0; v <= 300; v += 2) { const y = ref - v * S; if (y > 340 || y < 52) continue; const L = v % 10 === 0 ? 12 : 6; colTicks.push(`M288 ${f2(y)}h${L}`); }
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={458} rx={360} ry={14} o={0.4} />
      {/* granite surface plate */}
      <path d="M92 368 H708 L742 400 H58 Z" fill="#5C626B" />
      <path d="M92 368 H708 L742 400 H58 Z" fill={`url(#${k.id("speckle")})`} />
      <path d="M92 368 H708" stroke="#8B929C" strokeWidth={1.5} />
      <rect x={58} y={400} width={684} height={50} fill={k.m("granite")} />
      <rect x={58} y={400} width={684} height={50} fill={`url(#${k.id("speckle")})`} />
      <line x1={58} y1={400.5} x2={742} y2={400.5} stroke="#9AA1AB" strokeWidth={1.2} />
      {/* workpiece */}
      <path d={`M540 ${ref} V${sy} H606 V320 H660 V${ref} Z`} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.1} />
      <rect x={540} y={sy} width={66} height={4} fill="#FFFFFF" opacity={0.6} />
      {/* heavy base */}
      <path d={`M186 ${ref} V352 Q186 340 200 340 H420 Q434 340 434 352 V${ref} Z`} fill={k.m("dark")} stroke="#0E1116" strokeWidth={1.2} />
      <rect x={186} y={ref - 8} width={248} height={8} fill={k.m("chrome")} />
      <path d="M200 343 H420" stroke="#FFFFFF" strokeOpacity={0.3} strokeWidth={2} />
      <circle cx={392} cy={364} r={10} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1} />
      {/* column with scale */}
      <rect x={282} y={46} width={44} height={296} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={286} y={46} width={22} height={296} fill="#F3F5F8" opacity={0.6} />
      <path d={colTicks.join("")} stroke="#1B1F25" strokeWidth={0.7} />
      {[50, 100, 150, 200, 250, 300].map((v) => <Mark key={v} x={302} y={ref - v * S + 3} t={v} s={6.5} a="start" />)}
      <rect x={278} y={40} width={52} height={10} rx={2} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      {/* slider, fine adjustment, scriber */}
      <rect x={268} y={sy - 72} width={72} height={78} rx={4} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.2} />
      <rect x={252} y={sy - 30} width={18} height={8} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={236} y={sy - 44} width={18} height={36} rx={4} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1} />
      <circle cx={304} cy={sy - 12} r={7} fill={k.m("knob")} stroke="#0E1116" strokeWidth={0.8} />
      <rect x={340} y={sy - 22} width={34} height={24} rx={3} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1} />
      <circle cx={357} cy={sy - 10} r={5} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={0.8} />
      <rect x={374} y={sy - 11} width={170} height={11} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <path d={`M544 ${sy - 11} H556 L568 ${sy} H544 Z`} fill={k.m("dark")} stroke="#1B1F25" strokeWidth={0.8} />
      {/* digital display unit */}
      <rect x={208} y={sy - 166} width={192} height={96} rx={10} fill={k.m("grey")} stroke="#6B7582" strokeWidth={1.4} />
      <rect x={216} y={sy - 158} width={176} height={80} rx={7} fill={k.m("black")} stroke="#0E1116" strokeWidth={1} />
      <rect x={226} y={sy - 150} width={156} height={40} rx={3} fill="#11151A" />
      <rect x={229} y={sy - 147} width={150} height={34} rx={2} fill={k.m("lcd")} />
      <Mark x={352} y={sy - 120} t="120.36" s={24} c="#1E2A1A" w={700} f="'DejaVu Sans Mono', 'Courier New', monospace" a="end" />
      <Mark x={374} y={sy - 120} t="mm" s={8} c="#1E2A1A" w={700} a="end" />
      <path d={`M231 ${sy - 145} H262 L248 ${sy - 115} H231 Z`} fill="#FFFFFF" opacity={0.12} />
      {[{ x: 250, t: "ON" }, { x: 304, t: "0" }, { x: 358, t: "mm/in" }].map((b) => (
        <g key={b.t}>
          <rect x={b.x - 20} y={sy - 102} width={40} height={15} rx={7.5} fill={k.m("grey")} stroke="#0E1116" strokeWidth={1} />
          <Mark x={b.x} y={sy - 91.5} t={b.t} s={7} c="#1B1F25" w={800} />
        </g>
      ))}
      <Callout n={1} x={214} y={364} bx={130} by={320} />
      <Callout n={2} x={300} y={70} bx={210} by={70} />
      <Callout n={3} x={236} y={sy - 140} bx={140} by={160} />
      <Callout n={4} x={245} y={sy - 26} bx={160} by={sy - 10} />
      <Callout n={5} x={556} y={sy - 6} bx={610} by={190} />
      <Callout n={6} x={110} y={426} bx={60} by={470} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// 0.01 mm dial indicator on a magnetic stand, reading 1.37 mm (revolution counter between 1 and 2).
function DialIndicator() {
  const k = useKit();
  const cx = 560, cy = 188, rb = 94, rf = 80;
  const rc = { x: cx, y: cy - 33, r: 19 };
  const sx = cx; // stem axis
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={444} rx={300} ry={12} />
      {/* workpiece */}
      <rect x={480} y={398} width={170} height={42} rx={2} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.1} />
      <rect x={480} y={398} width={170} height={5} fill="#FFFFFF" opacity={0.55} />
      {/* magnetic base */}
      <rect x={96} y={346} width={176} height={94} rx={6} fill={k.m("grey")} stroke="#6B7582" strokeWidth={1.4} />
      <rect x={96} y={346} width={176} height={94} rx={6} fill={`url(#${k.id("brushed")})`} />
      <rect x={96} y={420} width={176} height={20} rx={3} fill={k.m("black")} />
      <path d="M160 440 L172 426 H196 L208 440 Z" fill="#5E6773" />
      <rect x={100} y={349} width={168} height={6} rx={3} fill="#FFFFFF" opacity={0.5} />
      <circle cx={184} cy={386} r={22} fill="#D5DBE3" stroke="#8C96A3" strokeWidth={1} />
      <circle cx={184} cy={386} r={16} fill={k.m("knob")} stroke="#0E1116" strokeWidth={1} />
      <rect x={180} y={366} width={8} height={30} rx={4} fill={k.m("black")} transform="rotate(-40 184 386)" />
      <Mark x={150} y={372} t="ON" s={8} w={800} c="#1B7A3E" />
      <Mark x={220} y={372} t="OFF" s={8} w={800} c="#B3261E" />
      {/* post */}
      <rect x={176} y={86} width={16} height={262} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.9} />
      <circle cx={184} cy={86} r={8} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.9} />
      {/* articulated arm */}
      <rect x={168} y={104} width={32} height={26} rx={5} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <circle cx={210} cy={117} r={9} fill={k.m("ball")} stroke="#5E6773" strokeWidth={0.8} />
      <path d="M214 109 L352 152 L348 168 L208 125 Z" fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <path d="M352 158 L518 312 L506 324 L342 170 Z" fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <circle cx={350} cy={162} r={18} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1.2} />
      <circle cx={350} cy={162} r={8} fill={k.m("knob")} />
      <circle cx={510} cy={318} r={9} fill={k.m("ball")} stroke="#5E6773" strokeWidth={0.8} />
      {/* indicator back lug and top cap */}
      <rect x={cx - 7} y={cy - rb - 12} width={14} height={14} rx={3} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      {/* stem, plunger, contact point */}
      <rect x={sx - 12} y={cy + rb - 4} width={24} height={18} rx={2} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.9} />
      <rect x={sx - 8} y={cy + rb + 14} width={16} height={60} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.9} />
      <rect x={sx - 4} y={cy + rb + 74} width={8} height={28} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <circle cx={sx} cy={392} r={6} fill={k.m("ball")} stroke="#5E6773" strokeWidth={0.8} />
      {/* stem clamp */}
      <rect x={516} y={307} width={62} height={22} rx={4} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <circle cx={566} cy={318} r={5} fill={k.m("knob")} />
      {/* dial */}
      <Bezel k={k} cx={cx} cy={cy} r={rb} rf={rf} />
      <DialGrad cx={cx} cy={cy} r={rf - 1} n={100} lab={10} label={(i) => String(i)} fs={11} w={1} />
      <circle cx={rc.x} cy={rc.y} r={rc.r} fill="#FFFFFF" stroke="#9AA3AE" strokeWidth={0.8} />
      <DialGrad cx={rc.x} cy={rc.y} r={rc.r - 1} n={10} lab={2} label={(i) => String(i)} maj={2} mid={1} fs={6.5} w={0.7} lr={rc.r - 9.5} />
      <Needle cx={rc.x} cy={rc.y} len={rc.r - 4} a={(1.37 / 10) * 2 * Math.PI} tail={3} w={1.3} hub={2} />
      <Mark x={cx} y={cy + 34} t="0.01mm" s={9} c="#374151" />
      <Mark x={cx} y={cy + 46} t="1mm" s={7} c="#374151" w={500} />
      <path d={`M${pol(cx, cy, rf + 6, 0.62)[0]} ${pol(cx, cy, rf + 6, 0.62)[1]} l6 -2 l-2 6 Z`} fill="#D03B3B" />
      <Needle cx={cx} cy={cy} len={rf - 6} a={(37 / 100) * 2 * Math.PI} tail={18} w={2.6} c="#1B1F25" hub={6} />
      <Glare cx={cx} cy={cy} r={rf} />
      <Callout n={1} x={cx + 70} y={cy + 10} bx={714} by={240} />
      <Callout n={2} x={rc.x - 6} y={rc.y - 8} bx={470} by={62} />
      <Callout n={3} x={cx + 64} y={cy - 64} bx={700} by={100} />
      <Callout n={4} x={sx + 8} y={cy + rb + 54} bx={668} by={318} />
      <Callout n={5} x={sx + 6} y={392} bx={692} by={374} />
      <Callout n={6} x={280} y={133} bx={290} by={62} />
      <Callout n={7} x={196} y={386} bx={330} by={420} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Lever-type dial test indicator, 0.002 mm, 0–100–0 (µm) dial, reading +14 µm (7 divisions).
function DialTestIndicator() {
  const k = useKit();
  const cx = 290, cy = 230, rb = 118, rf = 104;
  const px = 594, py = 232; // stylus pivot
  const ta = (36 * Math.PI) / 180, L = 140;
  const tx = px + L * Math.cos(ta), ty = py + L * Math.sin(ta);
  const nx = -Math.sin(ta), ny = Math.cos(ta);
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={420} cy={392} rx={310} ry={18} />
      {/* body: round case + neck to the stylus */}
      <circle cx={cx} cy={cy} r={rb + 10} fill={k.m("grey")} stroke="#6B7582" strokeWidth={1.4} />
      <path d={`M${cx + 60} ${cy - 46} L410 ${cy - 46} L420 ${cy - 62} H532 L542 ${cy - 46} Z`} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.1} />
      <line x1={422} y1={cy - 59} x2={530} y2={cy - 59} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.8} />
      <path d={`M440 ${cy + 44} L430 ${cy + 58} H522 L512 ${cy + 44} Z`} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.1} />
      <path d={`M${cx + 40} ${cy - 46} H540 Q582 ${cy - 42} 594 ${cy - 18} Q602 ${cy} 594 ${cy + 18} Q582 ${cy + 42} 540 ${cy + 46} H${cx + 40} Z`} fill={k.m("grey")} stroke="#6B7582" strokeWidth={1.4} />
      <path d={`M${cx + 40} ${cy - 46} H540 Q582 ${cy - 42} 594 ${cy - 18} Q602 ${cy} 594 ${cy + 18} Q582 ${cy + 42} 540 ${cy + 46} H${cx + 40} Z`} fill={`url(#${k.id("brushed")})`} />
      <path d={`M${cx + 60} ${cy - 40} H540 Q574 ${cy - 37} 586 ${cy - 20}`} fill="none" stroke="#FFFFFF" strokeWidth={3} opacity={0.7} />
      <circle cx={548} cy={cy} r={5} fill={k.m("knob")} />
      {/* stylus: pivot hub, tapered lever, ball tip */}
      <path d={`M${f2(px + nx * 6)} ${f2(py + ny * 6)} L${f2(tx + nx * 2.8)} ${f2(ty + ny * 2.8)} L${f2(tx - nx * 2.8)} ${f2(ty - ny * 2.8)} L${f2(px - nx * 6)} ${f2(py - ny * 6)} Z`} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={1} />
      <circle cx={px} cy={py} r={14} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.1} />
      <circle cx={px} cy={py} r={14} fill="none" stroke="#5E6773" strokeWidth={2} strokeDasharray="1.2 1.6" opacity={0.7} />
      <circle cx={px} cy={py} r={4} fill={k.m("knob")} />
      <circle cx={tx} cy={ty} r={8} fill={k.m("ruby")} stroke="#6E0A1C" strokeWidth={0.8} />
      {/* dial */}
      <Bezel k={k} cx={cx} cy={cy} r={rb} rf={rf} />
      <DialGrad cx={cx} cy={cy} r={rf - 1} n={100} lab={10} label={(i) => String(i <= 50 ? i * 2 : (100 - i) * 2)} fs={12} w={1} />
      <Mark x={cx} y={cy + 40} t="0.002mm" s={10} c="#374151" />
      <Mark x={cx} y={cy - 32} t="µm" s={9} c="#374151" />
      <Needle cx={cx} cy={cy} len={rf - 8} a={(7 / 100) * 2 * Math.PI} tail={22} w={3} c="#1B1F25" hub={7} />
      <Glare cx={cx} cy={cy} r={rf} />
      <Callout n={1} x={232} y={272} bx={100} by={330} />
      <Callout n={2} x={500} y={cy + 22} bx={510} by={350} />
      <Callout n={3} x={(px + tx) / 2 + 2} y={(py + ty) / 2 - 2} bx={736} by={230} />
      <Callout n={4} x={tx} y={ty + 6} bx={680} by={394} />
      <Callout n={5} x={480} y={cy - 56} bx={490} by={110} />
    </g>
  );
}

export const ARTS_MEASURE: Record<string, () => ReactElement> = {
  "vernier-caliper": VernierCaliper,
  "outside-micrometer": OutsideMicrometer,
  "digital-caliper": DigitalCaliper,
  "dial-caliper": DialCaliper,
  "digital-micrometer": DigitalMicrometer,
  "bore-gauge": BoreGauge,
  "depth-gauge": DepthGauge,
  "height-gauge": HeightGauge,
  "dial-indicator": DialIndicator,
  "dial-test-indicator": DialTestIndicator,
};
