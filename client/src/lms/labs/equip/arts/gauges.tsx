import type { ReactElement, ReactNode } from "react";
import { useKit, Shadow, Callout, Ticks, Mark, type Kit } from "../kit";

// ---------------------------------------------------------------------------------------------
// Local helpers
type Stop = [number, string, number?];
const lg = (id: string, stops: Stop[], v = true): ReactNode => (
  <linearGradient key={id} id={id} x1="0" y1="0" x2={v ? 0 : 1} y2={v ? 1 : 0}>
    {stops.map(([o, c, a], i) => <stop key={i} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}
  </linearGradient>
);
const rg = (id: string, stops: Stop[], cx = 0.4, cy = 0.35, r = 0.75): ReactNode => (
  <radialGradient key={id} id={id} cx={cx} cy={cy} r={r}>
    {stops.map(([o, c, a], i) => <stop key={i} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}
  </radialGradient>
);
const deg = Math.PI / 180;
/** point at distance d from (px,py) along angle a (degrees, SVG orientation) */
const along = (px: number, py: number, a: number, d: number): [number, number] => [px + Math.cos(a * deg) * d, py + Math.sin(a * deg) * d];
/** text rotation that keeps text readable for a leaf pointing at angle a */
const readable = (a: number) => { let r = ((a % 360) + 360) % 360; if (r > 90 && r < 270) r -= 180; return r; };

// ---------------------------------------------------------------------------------------------
// Granite surface plate on its steel stand, protective cover folded back.
function SurfacePlate() {
  const k = useKit((id) => <>
    {lg(id("gTop"), [[0, "#4A5058"], [0.35, "#5E656E"], [0.5, "#737A83"], [0.62, "#5A6169"], [1, "#454B53"]], false)}
    {lg(id("gFront"), [[0, "#40464E"], [1, "#25292F"]])}
    {lg(id("gSide"), [[0, "#2E3238"], [1, "#1A1D21"]])}
    {lg(id("cover"), [[0, "#4A6CA3"], [1, "#2A4373"]])}
    {lg(id("coverF"), [[0, "#5B7DB6"], [0.5, "#334F82"], [1, "#1F3358"]])}
    {lg(id("frame"), [[0, "#5C6672"], [0.4, "#3A424C"], [1, "#272D35"]])}
    {lg(id("tag"), [[0, "#F4F6F8"], [1, "#BFC6CF"]])}
    <pattern id={id("gran")} width="53" height="41" patternUnits="userSpaceOnUse">
      {Array.from({ length: 70 }, (_, i) => {
        const h = (n: number) => { const v = Math.sin(n * 12.9898 + i * 78.233) * 43758.5453; return v - Math.floor(v); };
        const dark = h(3) < 0.4;
        return <circle key={i} cx={h(1) * 53} cy={h(2) * 41} r={0.35 + h(4) * 0.75} fill={dark ? "#05070A" : "#FFFFFF"} opacity={dark ? 0.4 : 0.08 + h(5) * 0.16} />;
      })}
    </pattern>
  </>);
  const D = (x: number, t: number, y: number): [number, number] => [x + 100 * t, y - 70 * t];
  const pts = (...p: [number, number][]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const RT = 324, LB = 420; // stand top-rail level and leg-bottom level (front-plane y)
  const leg = (x: number, t: number, key: string) => {
    const [sx, sy] = D(x, t, RT), [, by] = D(x, t, LB);
    return (
      <g key={key}>
        <rect x={sx} y={sy} width={20} height={by - sy} fill={k.m("darkV")} stroke="#15181C" strokeWidth={0.8} />
        {/* levelling foot: lock nut, threaded stud, swivel pad */}
        <rect x={sx + 2} y={by} width={16} height={6} fill={k.m("steelV")} stroke="#5E6773" strokeWidth={0.6} />
        <rect x={sx + 7} y={by + 6} width={6} height={10} fill={k.m("chromeV")} />
        {[0, 1, 2, 3].map((i) => <line key={i} x1={sx + 7} y1={by + 7.5 + i * 2.4} x2={sx + 13} y2={by + 6.5 + i * 2.4} stroke="#5E6773" strokeWidth={0.6} />)}
        <path d={`M${sx - 6} ${by + 22} Q${sx + 10} ${by + 13} ${sx + 26} ${by + 22} V${by + 25} H${sx - 6} Z`} fill={k.m("steel")} stroke="#5E6773" strokeWidth={0.6} />
        <rect x={sx - 7} y={by + 24} width={34} height={5} rx={2} fill={k.m("rubber")} />
      </g>
    );
  };
  const rail = (x0: number, x1: number, t: number, y: number, h: number, key: string) => (
    <rect key={key} x={D(x0, t, y)[0]} y={D(x0, t, y)[1]} width={x1 - x0} height={h} fill={k.m("dark")} stroke="#15181C" strokeWidth={0.8} />
  );
  const sideRail = (x: number, y: number, h: number, key: string) => (
    <polygon key={key} points={pts(D(x, 0.1, y), D(x, 0.9, y), D(x, 0.9, y + h), D(x, 0.1, y + h))} fill={k.m("darkV")} stroke="#15181C" strokeWidth={0.8} />
  );
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={445} rx={300} ry={14} />
      {/* back legs and lower frame (behind) */}
      {leg(150, 0.9, "bl")}
      {leg(520, 0.9, "br")}
      {rail(150, 540, 0.9, 384, 14, "lrb")}
      {sideRail(150, 384, 14, "lsl")}
      {leg(150, 0.1, "fl")}
      {leg(520, 0.1, "fr")}
      {rail(150, 540, 0.1, 384, 14, "lrf")}
      {sideRail(540, 384, 14, "lsr")}
      {/* top frame */}
      {sideRail(540, RT, 20, "tsr")}
      {rail(150, 540, 0.1, RT, 20, "trf")}
      <line x1={D(150, 0.1, RT)[0]} y1={D(150, 0.1, RT)[1] + 1.2} x2={D(540, 0.1, RT)[0]} y2={D(540, 0.1, RT)[1] + 1.2} stroke="#8A939E" strokeWidth={1} />
      {/* support points (3-point support; the third sits under the rear centre) */}
      {[200, 470].map((x) => {
        const [sx, sy] = D(x, 0.1, RT);
        return (
          <g key={x}>
            <rect x={sx - 1} y={sy - 7} width={22} height={7} fill={k.m("steelV")} stroke="#5E6773" strokeWidth={0.6} />
            <rect x={sx - 4} y={sy - 18} width={28} height={11} rx={2} fill={k.m("chromeV")} stroke="#5E6773" strokeWidth={0.7} />
          </g>
        );
      })}
      {/* granite plate */}
      <polygon points={pts(D(120, 0, 250), D(570, 0, 250), D(570, 1, 250), D(120, 1, 250))} fill={k.m("gTop")} />
      <polygon points={pts(D(120, 0, 250), D(570, 0, 250), D(570, 1, 250), D(120, 1, 250))} fill={`url(#${k.id("gran")})`} />
      <polygon points={pts(D(150, 0.05, 250), D(330, 0.05, 250), D(400, 0.55, 250), D(250, 0.55, 250))} fill="#FFFFFF" opacity={0.07} />
      <rect x={120} y={250} width={450} height={56} fill={k.m("gFront")} />
      <rect x={120} y={250} width={450} height={56} fill={`url(#${k.id("gran")})`} />
      <polygon points={pts(D(570, 0, 250), D(570, 1, 250), D(570, 1, 306), D(570, 0, 306))} fill={k.m("gSide")} />
      <polygon points={pts(D(570, 0, 250), D(570, 1, 250), D(570, 1, 306), D(570, 0, 306))} fill={`url(#${k.id("gran")})`} />
      <line x1={121} y1={250.8} x2={569} y2={250.8} stroke="#AEB5BE" strokeWidth={1.3} />
      <line x1={570.6} y1={250} x2={670} y2={180.6} stroke="#8D949D" strokeWidth={1} />
      {/* identification plate: grade and size */}
      <rect x={470} y={262} width={78} height={32} rx={2} fill={k.m("tag")} stroke="#8C96A3" strokeWidth={0.8} />
      <circle cx={475} cy={278} r={1.6} fill="#8C96A3" />
      <circle cx={543} cy={278} r={1.6} fill="#8C96A3" />
      <Mark x={509} y={279} t="00" s={13} w={800} />
      <Mark x={509} y={290} t="1000×630" s={7} />
      {/* protective cover folded back over the rear of the plate */}
      <polygon points={pts(D(571, 0.6, 246), D(571, 1, 246), D(571, 1, 292), D(571, 0.6, 276))} fill="#22385E" />
      <polygon points={pts(D(116, 0.6, 246), D(571, 0.6, 246), D(571, 1, 246), D(116, 1, 246))} fill={k.m("cover")} />
      <path d={`M${D(116, 0.6, 246).join(" ")} L${D(571, 0.6, 246).join(" ")} Q${D(575, 0.57, 249).join(" ")} ${D(571, 0.55, 251).join(" ")} L${D(116, 0.55, 251).join(" ")} Q${D(112, 0.57, 249).join(" ")} ${D(116, 0.6, 246).join(" ")} Z`} fill={k.m("coverF")} />
      <line x1={D(124, 0.64, 246)[0]} y1={D(124, 0.64, 246)[1]} x2={D(564, 0.64, 246)[0]} y2={D(564, 0.64, 246)[1]} stroke="#9FB6DD" strokeWidth={0.8} strokeDasharray="4 3" />
      <line x1={D(571, 0.64, 252)[0]} y1={D(571, 0.64, 252)[1]} x2={D(571, 0.97, 252)[0]} y2={D(571, 0.97, 252)[1]} stroke="#9FB6DD" strokeWidth={0.7} strokeDasharray="4 3" opacity={0.6} />
      <Callout n={1} x={190} y={290} bx={80} by={300} />
      <Callout n={2} x={300} y={234} bx={210} by={110} />
      <Callout n={3} x={481} y={310} bx={440} by={455} />
      <Callout n={4} x={180} y={440} bx={90} by={455} />
      <Callout n={5} x={560} y={196} bx={640} by={90} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Gauge block set in its wooden case, with a wrung stack (50 + 20 + 9 = 79 mm) beside it.
function GaugeBlocks() {
  const k = useKit((id) => <>
    {lg(id("wood"), [[0, "#E4B97F"], [0.5, "#BE8750"], [1, "#94622F"]])}
    {lg(id("woodF"), [[0, "#B07440"], [1, "#7A4D22"]])}
    {lg(id("felt"), [[0, "#25334F"], [1, "#151E31"]])}
    {lg(id("feltL"), [[0, "#111827"], [1, "#2A3956"]])}
    {lg(id("blk"), [[0, "#97A1AD"], [0.28, "#F3F5F8"], [0.55, "#C6CDD5"], [1, "#8C96A2"]], false)}
    {lg(id("blkH"), [[0, "#F3F5F8"], [0.45, "#C6CDD5"], [1, "#8C96A2"]])}
    {lg(id("carb"), [[0, "#4E545C"], [0.3, "#7B828B"], [0.6, "#40454D"], [1, "#2A2E35"]], false)}
  </>);
  const X0 = 134, BW = 26, PITCH = 36;
  const row = (y: number, h: number, sizes: string[], wear = 0) => sizes.map((s, i) => {
    const x = X0 + i * PITCH, isW = i >= sizes.length - wear;
    return (
      <g key={`${y}-${i}`}>
        <rect x={x - 3} y={y - 3} width={BW + 6} height={h + 6} rx={2} fill="#0B1120" />
        <rect x={x} y={y} width={BW} height={h} rx={1} fill={isW ? k.m("carb") : k.m("blk")} stroke={isW ? "#1B1F25" : "#7A8490"} strokeWidth={0.6} />
        <rect x={x + 1} y={y + 1} width={BW - 2} height={3} fill="#FFFFFF" opacity={0.45} />
        <Mark x={x + BW / 2 + 3} y={y + h / 2} t={s} s={8.5} r={-90} c={isW ? "#E6E9ED" : "#2F3640"} w={700} />
      </g>
    );
  });
  const long = [[25, "25"], [50, "50"], [75, "75"], [100, "100"]] as const;
  let lx = X0;
  const stack: [number, string][] = [[100, "50"], [40, "20"], [18, "9"]];
  let sy = 440;
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={330} cy={462} rx={250} ry={12} />
      <Shadow k={k} cx={652} cy={442} rx={50} ry={8} />
      {/* lid, opened back */}
      <path d="M88 64 H572 L562 190 H98 Z" fill={k.m("wood")} stroke="#6E4520" strokeWidth={1.2} />
      <path d="M104 78 H556 L548 182 H112 Z" fill={k.m("feltL")} />
      <path d="M104 78 H556 L553 92 H107 Z" fill="#000000" opacity={0.25} />
      {[150, 470].map((x) => <rect key={x} x={x} y={184} width={40} height={10} rx={2} fill={k.m("brass")} stroke="#7A5A18" strokeWidth={0.6} />)}
      {/* case body */}
      <rect x={100} y={190} width={460} height={252} rx={4} fill={k.m("wood")} stroke="#6E4520" strokeWidth={1.2} />
      {[214, 300, 380].map((y, i) => <path key={i} d={`M102 ${y} Q 220 ${y - 6} 330 ${y + 2} T 558 ${y - 3}`} stroke="#6E4520" strokeOpacity={0.18} fill="none" />)}
      <rect x={114} y={204} width={432} height={224} rx={2} fill={k.m("felt")} />
      <rect x={114} y={204} width={432} height={5} fill="#000000" opacity={0.35} />
      <path d="M100 442 H560 V466 Q560 470 556 470 H104 Q100 470 100 466 Z" fill={k.m("woodF")} stroke="#6E4520" strokeWidth={1} />
      <line x1={102} y1={443} x2={558} y2={443} stroke="#F3D3A3" strokeWidth={1} opacity={0.8} />
      {/* latch */}
      <rect x={312} y={436} width={36} height={22} rx={3} fill={k.m("brass")} stroke="#7A5A18" strokeWidth={0.8} />
      <circle cx={330} cy={448} r={3} fill="#7A5A18" />
      {/* blocks */}
      {row(218, 46, ["1.001", "1.002", "1.003", "1.004", "1.005", "1.006", "1.007", "1.008", "1.009", "2", "2"], 2)}
      {row(276, 46, ["1.01", "1.02", "1.03", "1.04", "1.05", "1.06", "1.07", "1.08", "1.09", "1.1", "1.2"])}
      {row(334, 46, ["0.5", "1", "1.5", "2", "3", "4", "5", "6", "7", "8", "9"])}
      {long.map(([mm, t]) => {
        const w = mm * 1.32, x = lx; lx += w + 14;
        return (
          <g key={t}>
            <rect x={x - 3} y={392} width={w + 6} height={30} rx={2} fill="#0B1120" />
            <rect x={x} y={395} width={w} height={24} rx={1} fill={k.m("blkH")} stroke="#7A8490" strokeWidth={0.6} />
            <Mark x={x + w / 2} y={410.5} t={t} s={9} c="#2F3640" w={700} />
          </g>
        );
      })}
      {/* wrung stack standing on the bench */}
      {stack.map(([h, t], i) => {
        const y = sy - h; sy = y;
        const top = i === stack.length - 1;
        return (
          <g key={t}>
            <rect x={612} y={y} width={70} height={h} fill={k.m("blk")} stroke="#7A8490" strokeWidth={0.7} />
            <polygon points={`682,${y} 694,${y - 9} 694,${y + h - 9} 682,${y + h}`} fill="#9AA4AF" stroke="#7A8490" strokeWidth={0.7} />
            {top && <polygon points={`612,${y} 624,${y - 9} 694,${y - 9} 682,${y}`} fill="#E9EDF1" stroke="#7A8490" strokeWidth={0.7} />}
            <line x1={612} y1={y + h} x2={682} y2={y + h} stroke="#3B4350" strokeWidth={1.1} />
            <Mark x={647} y={y + h / 2 + 4} t={t} s={h > 20 ? 12 : 9} c="#2F3640" w={700} />
          </g>
        );
      })}
      <Callout n={1} x={140} y={456} bx={60} by={420} />
      <Callout n={2} x={136} y={262} bx={60} by={250} />
      <Callout n={3} x={147} y={315} bx={60} by={330} />
      <Callout n={4} x={479} y={224} bx={610} by={180} />
      <Callout n={5} x={650} y={340} bx={740} by={300} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// 150 mm steel rule (0.5 mm / 1 mm graduations) and a 5 m tape measure with the blade pulled out.
function SteelRuleTape() {
  const k = useKit((id) => <>
    {lg(id("tape"), [[0, "#FFE680"], [0.5, "#F7C928"], [1, "#D9A70E"]])}
    {lg(id("shell"), [[0, "#FFE27A"], [0.45, "#F5BE1B"], [1, "#C48A00"]])}
    {rg(id("badge"), [[0, "#FFFFFF"], [0.6, "#C9D0D8"], [1, "#7C8693"]], 0.4, 0.35, 0.8)}
  </>);
  const S = 4.2, Z = 80; // rule: px per mm and zero end
  const S2 = 2.0, Z2 = 104; // tape: px per mm and hook face
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={410} cy={148} rx={340} ry={8} o={0.25} />
      <Shadow k={k} cx={420} cy={436} rx={320} ry={10} />
      {/* steel rule */}
      <path d={`M${Z} 70 H736 Q746 70 746 80 V124 Q746 134 736 134 H${Z} Z`} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1.1} />
      <path d={`M${Z} 70 H736 Q746 70 746 80 V124 Q746 134 736 134 H${Z} Z`} fill={`url(#${k.id("brushed")})`} />
      <rect x={Z} y={134} width={656} height={3} fill="#6E7784" />
      <circle cx={728} cy={102} r={6} fill="#C7CED6" stroke="#6E7784" strokeWidth={1} />
      <circle cx={728} cy={102} r={4} fill="#E7EBEF" />
      <Ticks x0={Z} y={70} n={300} step={S / 2} h={5} major={20} mid={10} w={0.7} />
      <Ticks x0={Z} y={134} n={150} step={S} h={6} dir={-1} w={0.8} />
      {Array.from({ length: 14 }, (_, i) => <Mark key={i} x={Z + (i + 1) * 10 * S} y={107} t={(i + 1) * 10} s={10.5} w={700} />)}
      <Mark x={86} y={93} t="0.5mm" s={7} a="start" />
      <Mark x={86} y={119} t="1mm" s={7} a="start" />
      <Mark x={712} y={107} t="mm" s={9} a="end" />
      <line x1={Z + 1} y1={71} x2={Z + 1} y2={133} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.8} />
      {/* tape blade */}
      <rect x={Z2} y={392} width={386} height={24} fill={k.m("tape")} stroke="#B58700" strokeWidth={0.8} />
      <rect x={Z2} y={402} width={386} height={4} fill="#B58700" opacity={0.15} />
      <Ticks x0={Z2} y={392} n={188} step={S2} h={4} major={10} mid={5} w={0.7} />
      {Array.from({ length: 18 }, (_, i) => <Mark key={i} x={Z2 + (i + 1) * 10 * S2} y={413} t={i + 1} s={8} w={700} c={(i + 1) % 10 === 0 ? "#C0261C" : "#1B1F25"} />)}
      {/* end hook with rivets in slotted holes */}
      <rect x={Z2} y={393} width={30} height={22} fill={k.m("steel")} stroke="#5E6773" strokeWidth={0.8} />
      {[400, 408].map((y) => <rect key={y} x={Z2 + 8} y={y - 2.2} width={14} height={4.4} rx={2.2} fill="#3B414A" />)}
      {[400, 408].map((y) => <circle key={y} cx={Z2 + 12} cy={y} r={2.2} fill={k.m("chrome")} />)}
      <path d={`M${Z2} 390 V432 H${Z2 - 7} V390 Z`} fill={k.m("steelV")} stroke="#5E6773" strokeWidth={0.8} />
      {/* tape case */}
      <rect x={478} y={208} width={244} height={222} rx={40} fill={k.m("black")} />
      <path d="M498 238 Q498 222 514 222 H690 Q708 222 708 240 V396 Q708 414 690 414 H524 Q498 414 498 390 Z" fill={k.m("shell")} stroke="#9E7000" strokeWidth={1} />
      <path d="M506 236 Q508 228 518 228 H684" stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={2} fill="none" />
      <circle cx={608} cy={316} r={58} fill={k.m("black")} />
      <circle cx={608} cy={316} r={50} fill={`url(#${k.id("badge")})`} stroke="#5E6773" strokeWidth={1} />
      <circle cx={608} cy={316} r={36} fill="none" stroke="#8C96A3" strokeWidth={1} />
      <Mark x={608} y={312} t="5 m" s={17} w={800} />
      <Mark x={608} y={330} t="19 mm" s={8} />
      {/* blade mouth and lock button */}
      <rect x={478} y={386} width={22} height={36} rx={4} fill="#14171B" />
      <rect x={488} y={260} width={18} height={70} rx={9} fill="#14171B" />
      <rect x={484} y={268} width={26} height={30} rx={6} fill={k.m("red")} stroke="#7A140D" strokeWidth={1} />
      {[275, 281, 287, 293].map((y) => <line key={y} x1={488} y1={y} x2={506} y2={y} stroke="#7A140D" strokeWidth={1} />)}
      <circle cx={690} cy={400} r={4} fill="#3B414A" />
      <circle cx={518} cy={240} r={4} fill="#3B414A" />
      <Callout n={1} x={300} y={84} bx={300} by={190} />
      <Callout n={2} x={82} y={124} bx={60} by={200} />
      <Callout n={3} x={690} y={260} bx={750} by={180} />
      <Callout n={4} x={98} y={428} bx={60} by={460} />
      <Callout n={5} x={292} y={398} bx={292} by={320} />
      <Callout n={6} x={497} y={276} bx={420} by={250} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Feeler gauge set 0.05–1.00 mm, eight blades fanned out of the holder.
function FeelerGauge() {
  const k = useKit((id) => <>
    {lg(id("blade"), [[0, "#F4F6F9"], [0.15, "#E1E5EA"], [0.7, "#D2D8DF"], [1, "#AAB3BE"]])}
    {lg(id("holder"), [[0, "#EEF1F4"], [0.4, "#B9C1CB"], [0.6, "#D4DAE0"], [1, "#7C8693"]])}
  </>);
  const PX = 112, PY = 408, L = 430;
  const blades: [number, string][] = [[-52, "0.50"], [-46, "0.40"], [-40, "0.30"], [-34, "0.25"], [-28, "0.20"], [-22, "0.15"], [-16, "0.10"], [-10, "0.05"]];
  const bladePath = `M-20 0 A20 20 0 0 1 0 -20 L${L - 7} -15 Q${L} -15 ${L} -8 V8 Q${L} 15 ${L - 7} 15 L0 20 A20 20 0 0 1 -20 0 Z`;
  const at = (a: number, d: number, off: number): [number, number] => {
    const [x, y] = along(PX, PY, a, d); return [x - Math.sin(a * deg) * off, y + Math.cos(a * deg) * off];
  };
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={380} cy={438} rx={300} ry={12} />
      {blades.map(([a, t]) => {
        const [tx, ty] = at(a, L - 92, 4), [ux, uy] = at(a, L - 42, 3.5);
        return (
          <g key={t}>
            <g transform={`translate(${PX} ${PY}) rotate(${a})`}>
              <path d={bladePath} fill={k.m("blade")} stroke="#6E7784" strokeWidth={0.9} />
              <line x1={30} y1={-17.6} x2={L - 8} y2={-14} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.9} />
              <line x1={30} y1={17.6} x2={L - 8} y2={14} stroke="#8C96A3" strokeWidth={0.8} opacity={0.8} />
            </g>
            <Mark x={tx} y={ty} t={t} s={12} r={a} w={700} c="#2B323C" />
            <Mark x={ux} y={uy} t="mm" s={8.5} r={a} c="#2B323C" />
          </g>
        );
      })}
      {/* holder (protective cover) with the remaining blades folded inside */}
      <g transform={`translate(${PX} ${PY}) rotate(-1)`}>
        <path d={`M-28 0 A28 28 0 0 1 0 -28 L${L + 40} -22 Q${L + 64} -22 ${L + 64} 0 Q${L + 64} 22 ${L + 40} 22 L0 28 A28 28 0 0 1 -28 0 Z`} fill={k.m("holder")} stroke="#5E6773" strokeWidth={1.2} />
        <path d={`M34 -16 L${L + 20} -11 Q${L + 34} -11 ${L + 34} 0 Q${L + 34} 11 ${L + 20} 11 L34 16 Q26 0 34 -16 Z`} fill="#000000" opacity={0.07} stroke="#8C96A3" strokeWidth={0.8} />
        <line x1={4} y1={-26} x2={L + 40} y2={-20.5} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.8} />
        <Mark x={L / 2 + 30} y={4} t="0.05–1.00 mm" s={12} w={700} c="#3B4350" />
        <Mark x={L / 2 + 30} y={17} t="13" s={8} c="#3B4350" />
        <circle cx={L + 42} cy={0} r={6} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={0.8} />
      </g>
      {/* pivot screw */}
      <circle cx={PX} cy={PY} r={15} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={1.2} />
      <circle cx={PX} cy={PY} r={10} fill={k.m("steel")} />
      <line x1={PX - 8} y1={PY + 4} x2={PX + 8} y2={PY - 4} stroke="#3B414A" strokeWidth={2.4} strokeLinecap="round" />
      <Callout n={1} x={at(-52, 220, 0)[0]} y={at(-52, 220, 0)[1]} bx={140} by={180} />
      <Callout n={2} x={at(-10, L - 92, 0)[0] - 30} y={at(-10, L - 92, 0)[1] + 2} bx={660} by={250} />
      <Callout n={3} x={PX} y={PY} bx={60} by={320} />
      <Callout n={4} x={470} y={418} bx={560} by={466} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Metric thread pitch gauge (left) and a radius gauge (right; each leaf has a convex and a concave end profile).
function ThreadPitchGauge() {
  const k = useKit((id) => <>
    {lg(id("leaf"), [[0, "#F4F6F9"], [0.15, "#E1E5EA"], [0.7, "#D2D8DF"], [1, "#AAB3BE"]])}
    {lg(id("holder"), [[0, "#EEF1F4"], [0.4, "#B9C1CB"], [0.6, "#D4DAE0"], [1, "#7C8693"]])}
  </>);
  const hw = 15;
  // pitch gauge leaf with 60° thread teeth cut into its upper edge, near the tip
  const pitchLeaf = (L: number, p: number) => {
    const d = 0.62 * p, xa = L - 130, n = Math.floor((L - 4 - xa) / p);
    let path = `M-${hw} 0 A${hw} ${hw} 0 0 1 0 -${hw} L${xa} -${hw - 3}`;
    for (let i = 0; i < n; i++) { const x = xa + i * p; path += ` L${(x + p / 2).toFixed(2)} ${(-(hw - 3) + d).toFixed(2)} L${(x + p).toFixed(2)} -${hw - 3}`; }
    return `${path} L${L} -${hw - 3} L${L} ${hw - 5} L0 ${hw} A${hw} ${hw} 0 0 1 -${hw} 0 Z`;
  };
  // radius leaf: tip with a convex half-round (upper half) and a concave half-round notch (lower half)
  const radiusLeaf = (L: number, r: number) => {
    const w = 20;
    return `M-${w} 0 A${w} ${w} 0 0 1 0 -${w} L${L - r} -${w} A${r} ${r} 0 0 1 ${L - r} ${-w + 2 * r} L${L - r} ${w - 2 * r} A${r} ${r} 0 0 0 ${L - r} ${w} L0 ${w} A${w} ${w} 0 0 1 -${w} 0 Z`;
  };
  const holder = (len: number, h: number) => `M${-h} 0 A${h} ${h} 0 0 1 0 ${-h} H${len} A${h} ${h} 0 0 1 ${len} ${h} H0 A${h} ${h} 0 0 1 ${-h} 0 Z`;
  const screw = (x: number, y: number) => (
    <g>
      <circle cx={x} cy={y} r={12} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={1} />
      <line x1={x - 7} y1={y + 3} x2={x + 7} y2={y - 3} stroke="#3B414A" strokeWidth={2.2} strokeLinecap="round" />
    </g>
  );
  const at = (px: number, py: number, a: number, d: number, off: number): [number, number] => {
    const [x, y] = along(px, py, a, d); return [x - Math.sin(a * deg) * off, y + Math.cos(a * deg) * off];
  };
  const PX = 92, PY = 392, L = 290, HL = 262;
  const pitches: [number, string][] = [[-74, "2.5"], [-61, "2.0"], [-48, "1.75"], [-35, "1.5"], [-22, "1.25"]];
  const RX = 708, RY = 392;
  const radii: [number, string][] = [[254, "7"], [241, "6"], [228, "5"], [215, "4"], [202, "3"]];
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={230} cy={420} rx={170} ry={10} />
      <Shadow k={k} cx={570} cy={420} rx={170} ry={10} />
      {/* thread pitch gauge */}
      {pitches.map(([a, t]) => {
        const p = Number(t) * 6.5, [tx, ty] = at(PX, PY, a, L * 0.5, 4);
        return (
          <g key={t}>
            <path d={pitchLeaf(L, p)} transform={`translate(${PX} ${PY}) rotate(${a})`} fill={k.m("leaf")} stroke="#6E7784" strokeWidth={0.9} />
            <Mark x={tx} y={ty} t={t} s={12} r={a} w={800} c="#2B323C" />
          </g>
        );
      })}
      <g transform={`translate(${PX} ${PY})`}>
        <path d={holder(HL, 22)} fill={k.m("holder")} stroke="#5E6773" strokeWidth={1.2} />
        <line x1={4} y1={-20.5} x2={HL - 4} y2={-20.5} stroke="#FFFFFF" strokeWidth={1.3} opacity={0.8} />
        <Mark x={HL / 2 + 6} y={4} t="0.4–7 mm" s={11} w={700} c="#3B4350" />
        <Mark x={HL / 2 + 6} y={16} t="60°" s={8.5} c="#3B4350" />
      </g>
      {screw(PX, PY)}
      {/* radius gauge (mirror image, pivot on the right) */}
      {radii.map(([a, R]) => {
        const r = Number(R) * 1.3, [tx, ty] = at(RX, RY, a, L * 0.5, -4);
        return (
          <g key={R}>
            <path d={radiusLeaf(L, r)} transform={`translate(${RX} ${RY}) rotate(${a})`} fill={k.m("leaf")} stroke="#6E7784" strokeWidth={0.9} />
            <Mark x={tx} y={ty} t={`R${R}`} s={12} r={readable(a)} w={800} c="#2B323C" />
          </g>
        );
      })}
      <g transform={`translate(${RX - HL} ${RY})`}>
        <path d={holder(HL, 22)} fill={k.m("holder")} stroke="#5E6773" strokeWidth={1.2} />
        <line x1={4} y1={-20.5} x2={HL - 4} y2={-20.5} stroke="#FFFFFF" strokeWidth={1.3} opacity={0.8} />
        <Mark x={HL / 2 - 6} y={4} t="R1–7 mm" s={11} w={700} c="#3B4350" />
      </g>
      {screw(RX, RY)}
      {/* magnified tip: convex and concave radius profiles */}
      <defs><clipPath id={k.id("inset")}><circle cx={420} cy={112} r={64} /></clipPath></defs>
      <line x1={484} y1={112} x2={at(RX, RY, 254, L, 0)[0] - 6} y2={at(RX, RY, 254, L, 0)[1] + 4} stroke="#6B7280" strokeWidth={1} strokeDasharray="4 3" />
      <circle cx={420} cy={112} r={64} fill="#FFFFFF" />
      <g clipPath={`url(#${k.id("inset")})`}>
        <path d={radiusLeaf(L, 9.1)} transform={`translate(${420 + 34 - L * 2.8} 112) scale(2.8)`} fill={k.m("leaf")} stroke="#6E7784" strokeWidth={0.4} />
        <circle cx={420 + 34 - 9.1 * 2.8} cy={112 - 10.9 * 2.8} r={9.1 * 2.8} fill="none" stroke="#3987e5" strokeWidth={1} strokeDasharray="3 3" />
        <circle cx={420 + 34 - 9.1 * 2.8} cy={112 + 10.9 * 2.8} r={9.1 * 2.8} fill="none" stroke="#3987e5" strokeWidth={1} strokeDasharray="3 3" />
      </g>
      <circle cx={420} cy={112} r={64} fill="none" stroke="#8C96A3" strokeWidth={2} />
      <Mark x={400} y={116} t="R7" s={13} w={800} c="#2B323C" />
      <Callout n={1} x={250} y={404} bx={250} by={466} />
      <Callout n={2} x={at(PX, PY, -74, L * 0.5 + 22, 0)[0]} y={at(PX, PY, -74, L * 0.5 + 22, 0)[1]} bx={70} by={150} />
      <Callout n={3} x={550} y={404} bx={550} by={466} />
      <Callout n={4} x={452} y={84} bx={540} by={50} />
    </g>
  );
}
// ---------------------------------------------------------------------------------------------
// Shared: plain cylinder (side view) with chamfered ends, and a gauge handle with colour bands.
function Cyl({ k, x0, x1, cy, r, ch = 4, fill }: { k: Kit; x0: number; x1: number; cy: number; r: number; ch?: number; fill?: string }) {
  return (
    <g>
      <path d={`M${x0} ${cy - r + ch} L${x0 + ch} ${cy - r} H${x1 - ch} L${x1} ${cy - r + ch} V${cy + r - ch} L${x1 - ch} ${cy + r} H${x0 + ch} L${x0} ${cy + r - ch} Z`} fill={fill ?? k.m("chrome")} stroke="#5E6773" strokeWidth={1} />
      <line x1={x0 + ch} y1={cy - r} x2={x0 + ch} y2={cy + r} stroke="#5E6773" strokeWidth={0.6} opacity={0.6} />
      <line x1={x1 - ch} y1={cy - r} x2={x1 - ch} y2={cy + r} stroke="#5E6773" strokeWidth={0.6} opacity={0.6} />
      <line x1={x0 + ch} y1={cy - r * 0.55} x2={x1 - ch} y2={cy - r * 0.55} stroke="#FFFFFF" strokeWidth={2} opacity={0.55} />
    </g>
  );
}
function GaugeHandle({ k, x0, x1, cy, r, size, go, nogo }: { k: Kit; x0: number; x1: number; cy: number; r: number; size: string; go: string; nogo: string }) {
  const kn = 54;
  return (
    <g>
      <Cyl k={k} x0={x0} x1={x1} cy={cy} r={r} ch={5} />
      {/* colour bands: green at the GO end, red at the NO-GO end */}
      <rect x={x0 + 6} y={cy - r} width={12} height={r * 2} fill={k.m("green")} />
      <rect x={x1 - 18} y={cy - r} width={12} height={r * 2} fill={k.m("red")} />
      {/* knurled grips */}
      <rect x={x0 + 24} y={cy - r} width={kn} height={r * 2} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={0.8} />
      <rect x={x1 - 24 - kn} y={cy - r} width={kn} height={r * 2} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={0.8} />
      <rect x={x0 + 24} y={cy - r} width={kn} height={r * 2} fill={k.m("chrome")} opacity={0.35} />
      <rect x={x1 - 24 - kn} y={cy - r} width={kn} height={r * 2} fill={k.m("chrome")} opacity={0.35} />
      {/* engraved flat */}
      <Mark x={(x0 + x1) / 2} y={cy + 6} t={size} s={16} w={800} c="#2B323C" />
      {go && <Mark x={x0 + 24 + kn + 8} y={cy - r + 13} t={go} s={8} a="start" c="#2B323C" w={700} />}
      {nogo && <Mark x={x1 - 24 - kn - 8} y={cy - r + 13} t={nogo} s={8} a="end" c="#2B323C" w={700} />}
      <Mark x={x0 + 24 + kn + 8} y={cy + r - 6} t="GO" s={9} a="start" c="#0E7A42" w={800} />
      <Mark x={x1 - 24 - kn - 8} y={cy + r - 6} t="NO GO" s={9} a="end" c="#B3261E" w={800} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Plain GO / NO-GO plug gauge for a Ø20 H7 hole (GO 20.000, NO-GO 20.021).
function PlugGauge() {
  const k = useKit();
  const cy = 250;
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={318} rx={310} ry={12} />
      {/* GO member (long) */}
      <rect x={282} y={cy - 30} width={24} height={60} fill={k.m("steel")} stroke="#5E6773" strokeWidth={1} />
      <Cyl k={k} x0={92} x1={286} cy={cy} r={48} ch={7} />
      {/* NO-GO member (short) with red band */}
      <rect x={598} y={cy - 30} width={24} height={60} fill={k.m("steel")} stroke="#5E6773" strokeWidth={1} />
      <Cyl k={k} x0={618} x1={712} cy={cy} r={48} ch={7} />
      <rect x={624} y={cy - 48} width={10} height={96} fill={k.m("red")} opacity={0.9} />
      <GaugeHandle k={k} x0={304} x1={600} cy={cy} r={34} size="Ø20 H7" go="20.000" nogo="20.021" />
      <Callout n={1} x={180} y={cy + 20} bx={160} by={360} />
      <Callout n={2} x={680} y={cy + 20} bx={690} by={360} />
      <Callout n={3} x={360} y={cy - 30} bx={330} by={150} />
      <Callout n={4} x={470} y={cy - 18} bx={480} by={150} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// GO and NO-GO ring gauges for a Ø20 h6 shaft (GO 20.000, NO-GO 19.987), lying on the bench.
function RingGauge() {
  const k = useKit((id) => <>
    {lg(id("face"), [[0, "#D9DFE6"], [0.45, "#F7F9FB"], [0.6, "#E2E7EC"], [1, "#B9C1CB"]], false)}
    {lg(id("wall"), [[0, "#7C8693"], [0.25, "#C9D0D8"], [0.45, "#F2F4F7"], [0.7, "#AEB7C2"], [1, "#6E7784"]], false)}
    {lg(id("bore"), [[0, "#5E6773"], [0.3, "#9AA3AE"], [0.65, "#E9EDF1"], [1, "#7C8693"]], false)}
    {lg(id("boreSh"), [[0, "#1B1F25", 0.65], [0.55, "#1B1F25", 0.1], [1, "#1B1F25", 0]])}
  </>);
  const R = 132, ry = 0.5, H = 80, r = 48;
  const ring = (cx: number, cy: number, nogo: boolean) => {
    const clip = k.id(nogo ? "clipN" : "clipG");
    return (
      <g>
        <defs><clipPath id={clip}><ellipse cx={cx} cy={cy} rx={r} ry={r * ry} /></clipPath></defs>
        {/* outer wall */}
        <path d={`M${cx - R} ${cy} V${cy + H} A${R} ${R * ry} 0 0 0 ${cx + R} ${cy + H} V${cy} Z`} fill={k.m("wall")} stroke="#5E6773" strokeWidth={1} />
        <clipPath id={`${clip}w`}><path d={`M${cx - R} ${cy} V${cy + H} A${R} ${R * ry} 0 0 0 ${cx + R} ${cy + H} V${cy} Z`} /></clipPath>
        {nogo && <g clipPath={`url(#${clip}w)`}>
          <path d={`M${cx - R} ${cy + H / 2} A${R} ${R * ry} 0 0 0 ${cx + R} ${cy + H / 2}`} fill="none" stroke="#3B414A" strokeWidth={7} />
          <path d={`M${cx - R} ${cy + H / 2 + 4} A${R} ${R * ry} 0 0 0 ${cx + R} ${cy + H / 2 + 4}`} fill="none" stroke="#FFFFFF" strokeWidth={1.2} opacity={0.7} />
          <path d={`M${cx - R} ${cy + H / 2 - 3.5} A${R} ${R * ry} 0 0 0 ${cx + R} ${cy + H / 2 - 3.5}`} fill="none" stroke="#1B1F25" strokeWidth={1} opacity={0.6} />
        </g>}
        {/* top face with chamfers */}
        <ellipse cx={cx} cy={cy} rx={R} ry={R * ry} fill={k.m("face")} stroke="#5E6773" strokeWidth={1} />
        <ellipse cx={cx} cy={cy} rx={R - 5} ry={(R - 5) * ry} fill="none" stroke="#FFFFFF" strokeWidth={1.2} opacity={0.8} />
        {/* bore, inner wall and the bench seen through it */}
        <ellipse cx={cx} cy={cy} rx={r + 5} ry={(r + 5) * ry} fill="#C9D0D8" stroke="#8C96A3" strokeWidth={0.8} />
        <ellipse cx={cx} cy={cy} rx={r} ry={r * ry} fill={k.m("bore")} />
        <g clipPath={`url(#${clip})`}>
          <rect x={cx - r} y={cy - r * ry} width={2 * r} height={r * ry * 2} fill={`url(#${k.id("boreSh")})`} />
          <ellipse cx={cx} cy={cy + H * 0.86} rx={r} ry={r * ry} fill="#D5DBE3" />
          <ellipse cx={cx} cy={cy + H * 0.86} rx={r} ry={r * ry} fill="none" stroke="#6E7784" strokeWidth={1} />
        </g>
        {/* engraving on the face */}
        <g transform={`translate(${cx} ${cy - 40}) scale(1 0.55)`}>
          <Mark x={0} y={0} t="Ø20 h6" s={22} w={800} c="#2B323C" />
        </g>
        <g transform={`translate(${cx} ${cy + 40}) scale(1 0.55)`}>
          <Mark x={0} y={0} t={nogo ? "NO GO" : "GO"} s={20} w={800} c={nogo ? "#B3261E" : "#0E7A42"} />
          <Mark x={0} y={24} t={nogo ? "19.987" : "20.000"} s={17} w={700} c="#2B323C" />
        </g>
      </g>
    );
  };
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={235} cy={326} rx={150} ry={22} />
      <Shadow k={k} cx={565} cy={326} rx={150} ry={22} />
      {ring(232, 196, false)}
      {ring(568, 196, true)}
      <Callout n={1} x={120} y={290} bx={60} by={370} />
      <Callout n={2} x={680} y={262} bx={740} by={370} />
      <Callout n={3} x={232} y={186} bx={400} by={90} />
      <Callout n={4} x={614} y={150} bx={660} by={60} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Adjustable snap gauge for a Ø25 f7 shaft (GO 24.980, NO-GO 24.959); C-frame opening to the left.
function SnapGauge() {
  const k = useKit((id) => <>
    {lg(id("paint"), [[0, "#93A7BF"], [0.45, "#647A98"], [1, "#3C4E68"]])}
    {lg(id("paintD"), [[0, "#33445C"], [1, "#1F2B3D"]])}
    {lg(id("plate"), [[0, "#F4F6F8"], [1, "#C2C9D2"]])}
    {lg(id("carbide"), [[0, "#7A828C"], [0.5, "#AEB5BE"], [1, "#4A5058"]])}
  </>);
  // C-frame opening to the left: upper jaw carries the two adjustable anvils, lower jaw the fixed anvil
  const frame = "M150 96 H560 Q650 96 650 186 V346 Q650 436 560 436 H150 Q140 436 140 426 V346 Q140 336 150 336 H470 Q520 336 520 296 V236 Q520 196 470 196 H150 Q140 196 140 186 V106 Q140 96 150 96 Z";
  const upper = (x: number, w: number, key: string) => (
    <g key={key}>
      {/* plunger seen through the slot, carbide face pointing down */}
      <rect x={x} y={192} width={w} height={14} fill={k.m("steelV")} stroke="#5E6773" strokeWidth={0.9} />
      <rect x={x} y={203} width={w} height={6} fill={k.m("carbide")} stroke="#3B414A" strokeWidth={0.6} />
    </g>
  );
  const adjScrew = (x: number) => (
    <g>
      <rect x={x - 11} y={82} width={22} height={16} rx={2} fill={k.m("chromeV")} stroke="#5E6773" strokeWidth={0.9} />
      <line x1={x - 8} y1={84} x2={x + 8} y2={84} stroke="#3B414A" strokeWidth={2} />
    </g>
  );
  const lockSeal = (x: number, y: number) => (
    <g>
      <circle cx={x} cy={y} r={9} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={0.8} />
      <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="#3B414A" strokeWidth={1.8} />
      <circle cx={x + 3} cy={y + 3} r={6} fill="#B3261E" opacity={0.9} />
      <circle cx={x + 1.5} cy={y + 1.5} r={1.8} fill="#FFFFFF" opacity={0.5} />
    </g>
  );
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={452} rx={270} ry={12} />
      <path d={frame} transform="translate(8 8)" fill={k.m("paintD")} />
      <path d={frame} fill={k.m("paint")} stroke="#24324A" strokeWidth={1.4} />
      <path d="M148 100 H560 Q644 100 646 186" fill="none" stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={2} />
      {/* lightening pocket in the back of the frame */}
      <path d="M548 130 Q616 130 616 196 V336 Q616 402 548 402 H542 Q552 380 552 340 V190 Q552 150 542 130 Z" fill="#000000" opacity={0.12} />
      <rect x={168} y={360} width={360} height={52} rx={14} fill="#000000" opacity={0.1} stroke="#24324A" strokeOpacity={0.3} />
      <line x1={172} y1={411} x2={524} y2={411} stroke="#FFFFFF" strokeOpacity={0.25} />
      {/* size and tolerance plate on the upper jaw */}
      <rect x={168} y={110} width={150} height={74} rx={4} fill={k.m("plate")} stroke="#6E7784" strokeWidth={1} />
      {[[174, 116], [312, 116], [174, 178], [312, 178]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={2} fill="#8C96A3" />)}
      <Mark x={243} y={136} t="Ø25 f7" s={17} w={800} />
      <Mark x={182} y={157} t="GO" s={10} a="start" c="#0E7A42" w={800} />
      <Mark x={304} y={157} t="24.980" s={10} a="end" w={700} />
      <Mark x={182} y={173} t="NO GO" s={10} a="start" c="#B3261E" w={800} />
      <Mark x={304} y={173} t="24.959" s={10} a="end" w={700} />
      {/* adjustable anvils: GO at the front (mouth), NO-GO at the back */}
      {upper(346, 48, "go")}
      {upper(426, 48, "ng")}
      <rect x={350} y={186} width={40} height={6} rx={1} fill={k.m("green")} />
      <rect x={430} y={186} width={40} height={6} rx={1} fill={k.m("red")} />
      <Mark x={370} y={176} t="GO" s={10} c="#FFFFFF" w={800} />
      <Mark x={450} y={176} t="NO GO" s={9} c="#FFFFFF" w={800} />
      {/* adjustment screws on top, locking screws with seals on the face */}
      {adjScrew(370)}
      {adjScrew(450)}
      {lockSeal(370, 136)}
      {lockSeal(450, 136)}
      {/* fixed anvil on the lower jaw */}
      <rect x={300} y={322} width={196} height={16} fill={k.m("steel")} stroke="#5E6773" strokeWidth={0.9} />
      <rect x={300} y={320} width={196} height={5} fill={k.m("carbide")} stroke="#3B414A" strokeWidth={0.6} />
      <circle cx={318} cy={331} r={3} fill="#5E6773" />
      <circle cx={478} cy={331} r={3} fill="#5E6773" />
      {/* insulating hand grip on the back */}
      <rect x={652} y={210} width={26} height={112} rx={10} fill={k.m("black")} />
      {[230, 246, 262, 278, 294].map((y) => <line key={y} x1={656} y1={y} x2={674} y2={y} stroke="#4A505A" strokeWidth={2} />)}
      <Callout n={1} x={600} y={400} bx={700} by={440} />
      <Callout n={2} x={370} y={208} bx={330} by={262} />
      <Callout n={3} x={450} y={208} bx={430} by={270} />
      <Callout n={4} x={190} y={128} bx={90} by={80} />
      <Callout n={5} x={450} y={86} bx={540} by={50} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Thread plug gauge M12×1.75 6H: long GO thread, short NO-GO thread with red band.
function ThreadPlugGauge() {
  const k = useKit();
  const cy = 250, R = 44, d = 7, p = 1.75 * 7.33;
  const thread = (x0: number, x1: number) => {
    const n = Math.floor((x1 - x0) / p);
    const xe = x0 + n * p;
    const crestR = (x: number) => Math.min(R, R - d + (x - x0) * 0.75, R - d + (xe - x) * 0.75);
    let top = `M${x0} ${cy - R + d}`;
    for (let i = 0; i < n; i++) { const xs = x0 + i * p; top += ` L${(xs + p / 2).toFixed(2)} ${(cy - crestR(xs + p / 2)).toFixed(2)} L${(xs + p).toFixed(2)} ${cy - R + d}`; }
    let bot = ` L${xe} ${cy + R - d}`;
    for (let i = n - 1; i >= 0; i--) { const xs = x0 + i * p; bot += ` L${(xs + p / 2).toFixed(2)} ${cy + R - d} L${xs.toFixed(2)} ${(cy + crestR(xs)).toFixed(2)}`; }
    const crests: ReactNode[] = [];
    for (let i = 0; i < n; i++) {
      const xs = x0 + i * p, xt = xs + p / 2, xb = xs + p;
      if (xb > xe) continue;
      crests.push(<path key={`c${i}`} d={`M${xt} ${cy - crestR(xt)} Q${xt + p * 0.25 + 3} ${cy} ${xb} ${cy + crestR(xb)}`} fill="none" stroke="#FFFFFF" strokeWidth={1.6} opacity={0.75} />);
      crests.push(<path key={`r${i}`} d={`M${xb} ${cy - R + d} Q${xb + p * 0.25 + 3} ${cy} ${xb + p / 2} ${cy + R - d}`} fill="none" stroke="#4A525D" strokeWidth={1} opacity={xb + p / 2 > xe ? 0 : 0.7} />);
    }
    return { path: `${top}${bot} Z`, crests, xe };
  };
  const go = thread(96, 290), ng = thread(624, 704);
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={316} rx={310} ry={12} />
      <rect x={go.xe - 2} y={cy - 28} width={22} height={56} fill={k.m("steel")} stroke="#5E6773" strokeWidth={1} />
      <path d={go.path} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={1} />
      {go.crests}
      <rect x={598} y={cy - 28} width={30} height={56} fill={k.m("steel")} stroke="#5E6773" strokeWidth={1} />
      <rect x={606} y={cy - 28} width={14} height={56} fill={k.m("red")} />
      <path d={ng.path} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={1} />
      {ng.crests}
      <GaugeHandle k={k} x0={go.xe + 18} x1={600} cy={cy} r={33} size="M12×1.75 6H" go="" nogo="" />
      <Callout n={1} x={190} y={cy + 30} bx={170} by={370} />
      <Callout n={2} x={664} y={cy + 30} bx={680} by={370} />
      <Callout n={3} x={350} y={cy - 28} bx={320} by={150} />
      <Callout n={4} x={470} y={cy - 18} bx={480} by={150} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Calibration status labels and a micrometer carrying its label and engraved ID.
function Label({ x, y, rot, w, h, head, color, children }: { x: number; y: number; rot: number; w: number; h: number; head: string; color: string; children: ReactNode }) {
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x + 3} y={y + 4} width={w} height={h} rx={8} fill="#1B2330" opacity={0.18} />
      <rect x={x} y={y} width={w} height={h} rx={8} fill="#FFFFFF" stroke={color} strokeWidth={2} />
      <path d={`M${x} ${y + 8} Q${x} ${y} ${x + 8} ${y} H${x + w - 8} Q${x + w} ${y} ${x + w} ${y + 8} V${y + 34} H${x} Z`} fill={color} />
      <Mark x={x + w / 2} y={y + 23} t={head} s={15} w={800} c="#FFFFFF" />
      {children}
      <path d={`M${x + w - 20} ${y + h} L${x + w} ${y + h - 20} V${y + h - 8} Q${x + w} ${y + h} ${x + w - 8} ${y + h} Z`} fill="#E5E7EB" />
    </g>
  );
}
function Field({ x, y, l, v, w = 150, c = "#1D3E8A" }: { x: number; y: number; l: string; v: string; w?: number; c?: string }) {
  return (
    <g>
      <Mark x={x} y={y} t={l} s={9} a="start" c="#6B7280" w={700} />
      <line x1={x + 32} y1={y + 3} x2={x + w} y2={y + 3} stroke="#CBD2DA" strokeWidth={1} />
      <Mark x={x + 36} y={y} t={v} s={12} a="start" c={c} w={600} f="'Comic Sans MS', 'Segoe Print', cursive" />
    </g>
  );
}
function CalibrationLabel() {
  const k = useKit();
  const G = "#15924F", A = "#D99A00", Rd = "#D03B3B";
  return (
    <g>
      {k.defs}
      <Label x={54} y={52} rot={-3} w={200} h={150} head="CALIBRATED" color={G}>
        <Field x={68} y={110} l="ID" v="QE-0147" w={172} />
        <Field x={68} y={134} l="CAL" v="2026-09-14" w={172} />
        <Field x={68} y={158} l="DUE" v="2027-09-14" w={172} />
        <Mark x={68} y={186} t="SIG" s={9} a="start" c="#6B7280" w={700} />
        <path d="M104 184 q8 -18 14 -4 t12 -2 q6 -12 10 2 t16 -6 q10 -4 18 4 l20 -6" fill="none" stroke="#1D3E8A" strokeWidth={1.6} />
        <line x1={100} y1={189} x2={240} y2={189} stroke="#CBD2DA" strokeWidth={1} />
      </Label>
      <Label x={300} y={52} rot={2} w={200} h={150} head="LIMITED" color={A}>
        <Field x={314} y={110} l="ID" v="QE-0212" w={172} />
        <Field x={314} y={134} l="DUE" v="2027-03-02" w={172} />
        <rect x={314} y={146} width={172} height={44} rx={5} fill="#FFF7E0" stroke={A} strokeWidth={1.4} strokeDasharray="5 3" />
        <path d="M330 152 L342 174 H318 Z" fill={A} />
        <Mark x={330} y={171} t="!" s={13} c="#FFFFFF" w={900} />
        <Mark x={416} y={175} t="0–25 mm" s={17} c="#1D3E8A" w={700} f="'Comic Sans MS', 'Segoe Print', cursive" />
      </Label>
      <Label x={546} y={52} rot={-2} w={200} h={150} head="EXPIRED" color={Rd}>
        <circle cx={646} cy={124} r={24} fill="#FFFFFF" stroke={Rd} strokeWidth={7} />
        <line x1={629} y1={141} x2={663} y2={107} stroke={Rd} strokeWidth={7} />
        <Field x={560} y={170} l="ID" v="QE-0098" w={172} />
        <Field x={560} y={192} l="DUE" v="2026-06-30" w={172} />
        <line x1={594} y1={187} x2={672} y2={187} stroke={Rd} strokeWidth={1.8} />
      </Label>
      {/* micrometer carrying a calibration label and its engraved ID */}
      <Shadow k={k} cx={400} cy={458} rx={230} ry={10} />
      <g transform="translate(92 158) scale(0.76)">
        <path d="M136 176 H176 V300 Q176 360 236 360 H292 Q304 360 304 348 V230 H344 V350 Q344 404 290 404 H232 Q136 404 136 308 Z" fill={k.m("grey")} stroke="#6B7582" strokeWidth={1.5} />
        <path d="M140 180 H150 V305 Q150 395 232 398 V404 Q136 404 136 308 Z" fill="#FFFFFF" opacity={0.35} />
        <path d="M160 312 Q162 380 232 384 H286 Q322 384 324 350 V312 Q300 344 244 344 Q178 344 160 312 Z" fill={k.m("black")} stroke="#0E1116" strokeWidth={1} />
        <rect x={176} y={188} width={30} height={24} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
        <rect x={229} y={188} width={75} height={24} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
        <rect x={296} y={172} width={56} height={56} rx={6} fill={k.m("grey")} stroke="#6B7582" strokeWidth={1.5} />
        <path d="M318 172 L326 140 L336 140 L332 172 Z" fill={k.m("dark")} stroke="#1B1F25" strokeWidth={1} />
        <circle cx={331} cy={140} r={7} fill={k.m("knob")} />
        <rect x={352} y={183} width={114} height={34} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
        <line x1={356} y1={200} x2={466} y2={200} stroke="#1B1F25" strokeWidth={1.2} />
        {Array.from({ length: 8 }, (_, i) => <line key={i} x1={366 + i * 12} y1={200} x2={366 + i * 12} y2={200 - (i % 5 === 0 ? 12 : 8)} stroke="#1B1F25" strokeWidth={1.1} />)}
        <path d="M459 176 L475 170 H609 V230 H475 L459 224 Z" fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1.2} />
        <rect x={529} y={170} width={80} height={60} fill={`url(#${k.id("knurl")})`} opacity={0.9} />
        {[-2, -1, 0, 1, 2].map((i) => <line key={i} x1={461} y1={200 + i * 9} x2={461 + (i === 0 ? 28 : 20)} y2={200 + i * 9} stroke="#1B1F25" strokeWidth={1} />)}
        <rect x={609} y={186} width={14} height={28} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
        <rect x={623} y={182} width={46} height={36} rx={6} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={1.2} />
        {/* engraved instrument ID on the frame */}
        <Mark x={157} y={250} t="QE-0147" s={11} r={-90} c="#3B4350" w={800} />
        {/* small calibrated sticker on the insulating plate */}
        <g transform="rotate(-4 250 340)">
          <rect x={206} y={322} width={88} height={40} rx={4} fill="#FFFFFF" stroke={G} strokeWidth={1.5} />
          <rect x={206} y={322} width={88} height={12} rx={3} fill={G} />
          <Mark x={250} y={346} t="QE-0147" s={9} c="#1B1F25" w={700} />
          <Mark x={250} y={357} t="2027-09-14" s={8} c="#1D3E8A" />
        </g>
      </g>
      <Callout n={1} x={100} y={196} bx={70} by={260} />
      <Callout n={2} x={470} y={190} bx={500} by={260} />
      <Callout n={3} x={720} y={190} bx={730} by={260} />
      <Callout n={4} x={211} y={381} bx={110} by={420} />
    </g>
  );
}

export const ARTS_GAUGES: Record<string, () => ReactElement> = {
  "surface-plate": SurfacePlate,
  "gauge-blocks": GaugeBlocks,
  "steel-rule-tape": SteelRuleTape,
  "feeler-gauge": FeelerGauge,
  "thread-pitch-gauge": ThreadPitchGauge,
  "plug-gauge": PlugGauge,
  "ring-gauge": RingGauge,
  "snap-gauge": SnapGauge,
  "thread-plug-gauge": ThreadPlugGauge,
  "calibration-label": CalibrationLabel,
};
