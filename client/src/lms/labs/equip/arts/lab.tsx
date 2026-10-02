import type { ReactElement, ReactNode } from "react";
import { useKit, Shadow, Callout, Ticks, Mark } from "../kit";

// ---------------------------------------------------------------------------------------------
// Local helpers: custom gradients and a seven-segment LCD/LED digit renderer.
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

const SEGS: Record<string, string> = { "0": "abcdef", "1": "bc", "2": "abged", "3": "abgcd", "4": "fgbc", "5": "afgcd", "6": "afgedc", "7": "abc", "8": "abcdefg", "9": "abcdfg", "-": "g", " ": "" };
function segPts(sg: string, x: number, y: number, w: number, h: number, s: number): string {
  const q = s / 2, m = s * 0.18;
  const H = (x1: number, x2: number, yc: number) => `${x1},${yc} ${x1 + q},${yc - q} ${x2 - q},${yc - q} ${x2},${yc} ${x2 - q},${yc + q} ${x1 + q},${yc + q}`;
  const V = (xc: number, y1: number, y2: number) => `${xc},${y1} ${xc + q},${y1 + q} ${xc + q},${y2 - q} ${xc},${y2} ${xc - q},${y2 - q} ${xc - q},${y1 + q}`;
  const xl = x + q, xr = x + w - q, yt = y + q, ym = y + h / 2, yb = y + h - q;
  switch (sg) {
    case "a": return H(xl + m, xr - m, yt);
    case "g": return H(xl + m, xr - m, ym);
    case "d": return H(xl + m, xr - m, yb);
    case "f": return V(xl, yt + m, ym - m);
    case "b": return V(xr, yt + m, ym - m);
    case "e": return V(xl, ym + m, yb - m);
    default: return V(xr, ym + m, yb - m);
  }
}
/** Seven-segment digits (top-left x,y; digit height h). "." adds a decimal point without taking a cell. */
function Seg({ x, y, t, h, c = "#1E2A1A", ghost = 0.07 }: { x: number; y: number; t: string; h: number; c?: string; ghost?: number }) {
  const w = h * 0.52, s = h * 0.13, sp = w * 1.3;
  const out: ReactNode[] = [];
  let cx = x;
  [...t].forEach((ch, i) => {
    if (ch === ".") { out.push(<rect key={`p${i}`} x={cx - sp + w + s * 0.25} y={y + h - s} width={s} height={s} fill={c} />); return; }
    const on = SEGS[ch] ?? "";
    for (const sg of "abcdefg") {
      const lit = on.includes(sg);
      if (!lit && !ghost) continue;
      out.push(<polygon key={`${i}${sg}`} points={segPts(sg, cx, y, w, h, s)} fill={c} opacity={lit ? 1 : ghost} />);
    }
    cx += sp;
  });
  return <g transform={`translate(0 ${y + h}) skewX(-6) translate(0 ${-(y + h)})`}>{out}</g>;
}

// ---------------------------------------------------------------------------------------------
// Bridge CMM on a granite table, with the measuring computer and joystick box on a desk.
function Cmm() {
  const k = useKit((id) => <>
    {lg(id("gtop"), [[0, "#454B53"], [1, "#697079"]])}
    {lg(id("paint"), [[0, "#FFFFFF"], [0.55, "#E8EBEF"], [1, "#BAC2CC"]])}
    {lg(id("paintV"), [[0, "#B3BBC5"], [0.3, "#F6F7F9"], [0.75, "#DDE2E7"], [1, "#B7BFC9"]], false)}
    {lg(id("screen"), [[0, "#1D2D48"], [1, "#0C1525"]])}
    {lg(id("desk"), [[0, "#E4E7EB"], [1, "#B5BDC7"]])}
  </>);
  const P = (n: string) => `url(#${k.id(n)})`;
  const ins: ReactNode[] = [];
  for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) {
    const u = (i + 0.5) / 8, w = 0.2 + j * 0.3;
    ins.push(<ellipse key={`${i}-${j}`} cx={70 + 430 * u + 44 * w} cy={330 - 34 * w} rx={2.3} ry={1} fill="#1E2227" opacity={0.8} />);
  }
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={290} cy={440} rx={240} ry={14} />
      <Shadow k={k} cx={652} cy={440} rx={100} ry={10} o={0.3} />
      {/* steel stand under the granite */}
      <rect x={96} y={376} width={380} height={40} rx={3} fill={k.m("dark")} />
      {[110, 262, 426].map((x) => (
        <g key={x}>
          <rect x={x} y={414} width={34} height={16} fill={k.m("darkV")} />
          <rect x={x - 5} y={428} width={44} height={9} rx={3} fill={k.m("rubber")} />
        </g>
      ))}
      {/* granite table */}
      <polygon points="70,330 500,330 544,296 114,296" fill={P("gtop")} />
      <polygon points="70,330 500,330 544,296 114,296" fill={`url(#${k.id("speckle")})`} />
      {ins}
      <polygon points="500,330 544,296 544,344 500,378" fill="#262A30" />
      <polygon points="500,330 544,296 544,344 500,378" fill={`url(#${k.id("speckle")})`} />
      <rect x={70} y={330} width={430} height={48} fill={k.m("granite")} />
      <rect x={70} y={330} width={430} height={48} fill={`url(#${k.id("speckle")})`} />
      <line x1={70} y1={330.6} x2={500} y2={330.6} stroke="#9AA2AC" strokeWidth={1.2} />
      {/* Y guideway on the table */}
      <polygon points="448,330 470,330 514,296 492,296" fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.6} />
      {/* bridge: left leg, right leg (on the guideway), beam */}
      <polygon points="130,313 138,307 132,132 124,136" fill="#9AA3AE" />
      <polygon points="94,313 130,313 124,136 100,136" fill={P("paintV")} stroke="#8C96A3" strokeWidth={0.8} />
      <rect x={90} y={308} width={44} height={8} rx={1.5} fill={k.m("dark")} />
      <polygon points="502,313 510,307 504,132 496,136" fill="#9AA3AE" />
      <polygon points="466,313 502,313 496,136 472,136" fill={P("paintV")} stroke="#8C96A3" strokeWidth={0.8} />
      <rect x={462} y={308} width={44} height={8} rx={1.5} fill={k.m("dark")} />
      <polygon points="84,100 512,100 522,92 94,92" fill="#F8F9FA" stroke="#A7B0BA" strokeWidth={0.6} />
      <polygon points="512,100 522,92 522,128 512,136" fill="#A3ACB6" />
      <rect x={84} y={100} width={428} height={36} fill={P("paint")} stroke="#8C96A3" strokeWidth={0.8} />
      <rect x={110} y={127} width={380} height={4} fill={k.m("brass")} />
      <Ticks x0={110} y={127} n={190} step={2} h={1.6} w={0.4} color="#3A3320" />
      {/* carriage (X) */}
      <polygon points="256,86 344,86 352,79 264,79" fill="#FAFBFC" stroke="#A7B0BA" strokeWidth={0.6} />
      <polygon points="344,86 352,79 352,146 344,152" fill="#A3ACB6" />
      <rect x={256} y={86} width={88} height={66} rx={3} fill={P("paint")} stroke="#8C96A3" strokeWidth={0.9} />
      <rect x={265} y={95} width={70} height={48} rx={2} fill="none" stroke="#AEB6C0" strokeWidth={0.8} />
      <circle cx={331} cy={101} r={2.2} fill="#199E70" />
      {/* Z ram with scale */}
      <rect x={288} y={152} width={24} height={64} fill={P("paintV")} stroke="#8C96A3" strokeWidth={0.8} />
      <rect x={306} y={156} width={3} height={56} fill={k.m("brass")} />
      {/* probe head, probe, stylus, ruby */}
      <rect x={283} y={214} width={34} height={9} rx={2} fill={k.m("dark")} />
      <circle cx={300} cy={233} r={11} fill={k.m("knob")} stroke="#0E1116" strokeWidth={0.8} />
      <circle cx={300} cy={233} r={6} fill="none" stroke="#8C96A3" strokeWidth={0.8} />
      <rect x={295} y={243} width={10} height={20} rx={2} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.6} />
      <rect x={295} y={249} width={10} height={3} fill="#2E333B" />
      <rect x={299} y={262} width={2} height={15} fill={k.m("steelV")} />
      <circle cx={300} cy={280} r={4} fill={k.m("ruby")} />
      {/* fixture plate with clamps and the part */}
      <polygon points="232,310 372,310 384,301 244,301" fill="#5B626B" />
      <rect x={232} y={310} width={140} height={8} fill={k.m("dark")} />
      <polygon points="350,288 362,279 362,301 350,310" fill="#A9B2BD" />
      <polygon points="252,288 350,288 362,279 264,279" fill="#EEF1F4" stroke="#8C96A3" strokeWidth={0.6} />
      <rect x={252} y={288} width={98} height={22} fill={k.m("steel")} stroke="#8C96A3" strokeWidth={0.8} />
      <rect x={266} y={294} width={30} height={10} fill="#9AA3AE" stroke="#7B8591" strokeWidth={0.6} />
      <ellipse cx={318} cy={283.5} rx={11} ry={2.8} fill="#4A525C" />
      <circle cx={300} cy={280} r={4} fill={k.m("ruby")} />
      {[238, 364].map((x) => (
        <g key={x}>
          <rect x={x} y={298} width={12} height={8} fill={k.m("dark")} />
          <circle cx={x + 6} cy={298} r={3} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={0.6} />
        </g>
      ))}
      {/* desk */}
      {[580, 740].map((x) => <rect key={x} x={x} y={316} width={8} height={110} fill="#3A4048" />)}
      <polygon points="556,318 736,318 754,305 574,305" fill="#F1F3F5" stroke="#AEB6C0" strokeWidth={0.6} />
      <polygon points="736,318 754,305 754,315 736,328" fill="#9AA3AE" />
      <rect x={556} y={318} width={180} height={10} fill={P("desk")} stroke="#9AA3AE" strokeWidth={0.6} />
      {[562, 720].map((x) => <rect key={x} x={x} y={328} width={10} height={108} fill={k.m("darkV")} />)}
      {/* monitor */}
      <ellipse cx={648} cy={310} rx={24} ry={4} fill={k.m("dark")} />
      <rect x={643} y={262} width={10} height={48} fill={k.m("darkV")} />
      <rect x={578} y={166} width={140} height={100} rx={5} fill="#1B1F25" />
      <rect x={584} y={172} width={128} height={86} fill={P("screen")} />
      <rect x={584} y={172} width={128} height={7} fill="#2B3E60" />
      {[186, 194, 202, 210, 218, 226].map((y) => <rect key={y} x={589} y={y} width={26} height={3} rx={1} fill="#5A6E93" />)}
      <g stroke="#6FD3F2" strokeWidth={0.9} fill="none">
        <polygon points="632,214 662,200 694,214 664,228" />
        <polyline points="632,214 632,232 664,246 694,232 694,214" />
        <line x1={664} y1={228} x2={664} y2={246} />
        <ellipse cx={664} cy={214} rx={9} ry={4} />
      </g>
      {[[640, 216], [656, 205], [676, 208], [686, 218], [664, 238]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2} fill="#3DDC84" />)}
      <circle cx={648} cy={236} r={2} fill="#FF5A4E" />
      {[0, 1, 2].map((i) => <rect key={i} x={590 + i * 40} y={249} width={34} height={4} rx={1} fill={i === 1 ? "#C98500" : "#199E70"} />)}
      <line x1={580} y1={167.5} x2={716} y2={167.5} stroke="#FFFFFF" strokeOpacity={0.25} />
      {/* keyboard */}
      <polygon points="586,316 668,316 675,309 593,309" fill="#2A2F36" />
      <line x1={590} y1={313.5} x2={671} y2={313.5} stroke="#5A616B" strokeWidth={0.8} strokeDasharray="3 1.4" />
      {/* joystick box */}
      <polygon points="692,300 736,300 742,294 698,294" fill="#4A515B" />
      <rect x={692} y={300} width={44} height={14} rx={2} fill={k.m("dark")} />
      <line x1={716} y1={297} x2={714} y2={280} stroke="#1B1F25" strokeWidth={3.2} strokeLinecap="round" />
      <circle cx={714} cy={277} r={6} fill={k.m("knob")} />
      <circle cx={701} cy={297} r={2} fill="#D03B3B" />
      <circle cx={731} cy={297} r={2} fill="#199E70" />
      <Callout n={1} x={96} y={356} bx={50} by={392} />
      <Callout n={2} x={112} y={220} bx={50} by={220} />
      <Callout n={3} x={322} y={96} bx={380} by={52} />
      <Callout n={4} x={296} y={186} bx={218} by={186} />
      <Callout n={5} x={296} y={252} bx={218} by={250} />
      <Callout n={6} x={345} y={298} bx={418} by={252} />
      <Callout n={7} x={718} y={276} bx={752} by={238} />
      <Callout n={8} x={648} y={168} bx={648} by={122} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// CMM probe head indexed to A90 (probe horizontal), touching the reference sphere.
function CmmProbe() {
  const k = useKit((id) => <>
    {rg(id("ceramic"), [[0, "#FFFFFF"], [0.45, "#E4E7EA"], [1, "#8E969F"]], 0.35, 0.3, 0.8)}
  </>);
  const C = 190;
  const knTicks: string[] = [];
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2, r1 = 40, r2 = i % 2 === 0 ? 34 : 36.5;
    knTicks.push(`M${(170 + Math.cos(a) * r1).toFixed(1)} ${(C + Math.sin(a) * r1).toFixed(1)}L${(170 + Math.cos(a) * r2).toFixed(1)} ${(C + Math.sin(a) * r2).toFixed(1)}`);
  }
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={380} cy={448} rx={230} ry={10} o={0.12} />
      <Shadow k={k} cx={644} cy={448} rx={82} ry={11} />
      {/* head: mounting shank, flange, body with B-axis band */}
      <rect x={152} y={44} width={36} height={22} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      {[50, 55, 60].map((y) => <line key={y} x1={152} y1={y} x2={188} y2={y} stroke="#6E7784" strokeWidth={0.6} />)}
      <rect x={124} y={64} width={92} height={13} rx={3} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.9} />
      <path d="M128 77 H212 V150 Q212 172 190 172 H150 Q128 172 128 150 Z" fill={k.m("darkV")} stroke="#0E1116" strokeWidth={1} />
      <rect x={128} y={112} width={84} height={10} fill={k.m("chromeV")} />
      <Ticks x0={132} y={112} n={38} step={2.1} h={3} major={4} mid={2} w={0.6} />
      <rect x={134} y={80} width={6} height={30} rx={3} fill="#FFFFFF" opacity={0.12} />
      {/* A-axis knuckle */}
      <circle cx={170} cy={C} r={42} fill={k.m("knob")} stroke="#0E1116" strokeWidth={1.2} />
      <circle cx={170} cy={C} r={40} fill="none" stroke={k.m("chrome")} strokeWidth={3} />
      <path d={knTicks.join("")} stroke="#C9D0D8" strokeWidth={1} />
      <circle cx={170} cy={C} r={22} fill={k.m("dark")} stroke="#5E6773" strokeWidth={1} />
      <polygon points="170,145 166,138 174,138" fill="#F5BE1B" />
      {/* autojoint connector */}
      <rect x={196} y={174} width={42} height={32} rx={3} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <rect x={226} y={174} width={4} height={32} fill="#6E7784" opacity={0.5} />
      {/* probe body */}
      <rect x={236} y={170} width={118} height={40} rx={4} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <rect x={236} y={170} width={118} height={40} rx={4} fill={`url(#${k.id("brushed")})`} />
      <rect x={250} y={170} width={10} height={40} fill={k.m("dark")} />
      <rect x={334} y={170} width={8} height={40} fill="#E23A3A" opacity={0.75} />
      <rect x={335} y={172} width={3} height={36} fill="#FFFFFF" opacity={0.5} />
      {/* stylus module */}
      <path d="M354 173 H392 Q400 173 400 181 V199 Q400 207 392 207 H354 Z" fill={k.m("black")} stroke="#0E1116" strokeWidth={1} />
      <line x1={360} y1={173} x2={360} y2={207} stroke="#6A727D" strokeWidth={1} />
      {/* stylus extension */}
      <rect x={400} y={183} width={72} height={14} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.9} />
      {[404, 407, 410].map((x) => <line key={x} x1={x} y1={183} x2={x} y2={197} stroke="#6E7784" strokeWidth={0.6} />)}
      {/* stylus: joint with flats, shank, taper, ruby */}
      <rect x={472} y={180} width={11} height={20} rx={1.5} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.9} />
      <rect x={483} y={185.5} width={46} height={9} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <path d="M529 185.5 L566 188.3 V191.7 L529 194.5 Z" fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <circle cx={575} cy={C} r={10} fill={k.m("ruby")} stroke="#6E0A1C" strokeWidth={0.6} />
      <circle cx={572} cy={186.5} r={2.6} fill="#FFFFFF" opacity={0.8} />
      {/* reference sphere on stem and clamp base */}
      <path d="M612 220 L628 218 L646 386 L630 386 Z" fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.9} />
      <rect x={618} y={380} width={40} height={20} rx={2} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.9} />
      <polygon points="588,400 700,400 690,392 598,392" fill="#50575F" />
      <rect x={588} y={400} width={112} height={44} rx={4} fill={k.m("dark")} />
      <rect x={594} y={404} width={100} height={4} fill="#FFFFFF" opacity={0.1} />
      <circle cx={690} cy={422} r={7} fill={k.m("knob")} />
      <rect x={698} y={419} width={10} height={6} rx={1} fill={k.m("dark")} />
      <circle cx={619} cy={C} r={34} fill={`url(#${k.id("ceramic")})`} stroke="#7A838D" strokeWidth={0.8} />
      <ellipse cx={607} cy={176} rx={9} ry={6} fill="#FFFFFF" opacity={0.7} />
      <Callout n={1} x={140} y={130} bx={70} by={112} />
      <Callout n={2} x={300} y={172} bx={300} by={112} />
      <Callout n={3} x={436} y={184} bx={436} by={112} />
      <Callout n={4} x={505} y={194} bx={505} by={270} />
      <Callout n={5} x={573} y={181} bx={560} by={112} />
      <Callout n={6} x={640} y={166} bx={710} by={112} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Vertical profile projector: screen with cross-hairs and a thread profile, protractor ring, lens,
// stage with micrometer heads and a two-axis digital readout.
function ProfileProjector() {
  const k = useKit((id) => <>
    {lg(id("paint"), [[0, "#FAFBFC"], [0.6, "#E2E6EB"], [1, "#B8C0CA"]])}
    {rg(id("scr"), [[0, "#EEF6EA"], [0.7, "#CFDFCB"], [1, "#A8BCA4"]], 0.45, 0.4, 0.7)}
    {lg(id("dro"), [[0, "#434A54"], [1, "#1E2228"]])}
    <clipPath id={id("scrClip")}><circle cx={360} cy={150} r={78} /></clipPath>
  </>);
  const P = (n: string) => `url(#${k.id(n)})`;
  const cx = 360, cy = 150;
  const ring: string[] = [];
  for (let i = 0; i < 180; i++) {
    const a = (i * 2 * Math.PI) / 180, L = i % 15 === 0 ? 7 : i % 5 === 0 ? 5 : 3;
    ring.push(`M${(cx + Math.sin(a) * 98).toFixed(1)} ${(cy - Math.cos(a) * 98).toFixed(1)}L${(cx + Math.sin(a) * (98 - L)).toFixed(1)} ${(cy - Math.cos(a) * (98 - L)).toFixed(1)}`);
  }
  const thread: string[] = ["272,240", "272,176"];
  for (let x = 272; x < 452; x += 24) thread.push(`${x + 10},158`, `${x + 12},158`, `${x + 22},176`, `${x + 24},176`);
  thread.push("452,240");
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={380} cy={440} rx={260} ry={14} />
      {/* base cabinet */}
      <polygon points="150,322 590,322 578,312 162,312" fill="#F4F6F8" stroke="#AEB6C0" strokeWidth={0.6} />
      <rect x={150} y={322} width={440} height={114} rx={6} fill={P("paint")} stroke="#8C96A3" strokeWidth={1} />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={172} y={372 + i * 6} width={70} height={2.4} rx={1} fill="#8C96A3" />)}
      <rect x={462} y={346} width={110} height={70} rx={6} fill={k.m("dark")} />
      <circle cx={490} cy={381} r={13} fill={k.m("knob")} stroke="#0E1116" />
      <line x1={490} y1={381} x2={490} y2={370} stroke="#E4E8ED" strokeWidth={2} />
      <rect x={516} y={366} width={10} height={18} rx={2} fill={k.m("chromeV")} />
      <rect x={538} y={366} width={10} height={18} rx={2} fill={k.m("chromeV")} />
      <circle cx={554} cy={402} r={3} fill="#3DDC84" />
      {/* rear column */}
      <rect x={250} y={240} width={220} height={74} fill="#CBD1D8" stroke="#9AA3AE" strokeWidth={0.8} />
      {/* screen housing and hood */}
      <rect x={170} y={48} width={380} height={206} rx={10} fill={P("paint")} stroke="#8C96A3" strokeWidth={1} />
      <rect x={162} y={40} width={396} height={12} rx={4} fill={k.m("dark")} />
      <rect x={180} y={60} width={6} height={180} rx={3} fill="#FFFFFF" opacity={0.6} />
      {/* protractor ring */}
      <circle cx={cx} cy={cy} r={100} fill="none" stroke="#8C96A3" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={99} fill={k.m("steel")} />
      <path d={ring.join("")} stroke="#1B1F25" strokeWidth={0.7} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return <Mark key={i} x={cx + Math.sin(a) * 85.5} y={cy - Math.cos(a) * 85.5 + 2.5} t={i * 30} s={6.5} w={700} r={i * 30} />;
      })}
      <polygon points={`${cx},${cy - 100} ${cx - 4},${cy - 108} ${cx + 4},${cy - 108}`} fill="#D03B3B" />
      <circle cx={cx + 70} cy={cy + 70} r={7} fill={k.m("knob")} stroke="#0E1116" strokeWidth={0.8} />
      {/* screen with cross-hairs and projected thread profile */}
      <circle cx={cx} cy={cy} r={78} fill={P("scr")} stroke="#5E6773" strokeWidth={1.2} />
      <g clipPath={P("scrClip")}>
        <polygon points={thread.join(" ")} fill="#1F2B25" opacity={0.88} />
        <line x1={cx} y1={60} x2={cx} y2={240} stroke="#1B1F25" strokeWidth={0.8} />
        <line x1={270} y1={cy} x2={450} y2={cy} stroke="#1B1F25" strokeWidth={0.8} />
        <line x1={cx - 90 * Math.tan(Math.PI / 6)} y1={cy - 90} x2={cx + 90 * Math.tan(Math.PI / 6)} y2={cy + 90} stroke="#1B1F25" strokeWidth={0.5} strokeDasharray="4 3" />
        <line x1={cx + 90 * Math.tan(Math.PI / 6)} y1={cy - 90} x2={cx - 90 * Math.tan(Math.PI / 6)} y2={cy + 90} stroke="#1B1F25" strokeWidth={0.5} strokeDasharray="4 3" />
        <ellipse cx={330} cy={105} rx={44} ry={20} fill="#FFFFFF" opacity={0.28} transform="rotate(-25 330 105)" />
      </g>
      {/* projection lens */}
      <rect x={336} y={254} width={48} height={12} rx={2} fill={k.m("dark")} />
      <rect x={344} y={266} width={32} height={24} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={344} y={276} width={32} height={4} fill="#2E333B" />
      <Mark x={360} y={274.5} t="10×" s={6.5} w={800} />
      <ellipse cx={360} cy={290} rx={12} ry={2.5} fill="#3B6E9E" />
      {/* stage with glass and part */}
      <polygon points="200,300 520,300 510,292 210,292" fill="#EEF1F4" stroke="#8C96A3" strokeWidth={0.6} />
      <polygon points="300,300 420,300 414,293 306,293" fill="#BFE0F2" stroke="#6E9CB8" strokeWidth={0.6} />
      <rect x={340} y={288} width={40} height={6} rx={1} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.5} />
      {[348, 353, 358, 363, 368].map((x) => <line key={x} x1={x} y1={288} x2={x + 2} y2={294} stroke="#6E7784" strokeWidth={0.5} />)}
      <rect x={200} y={300} width={320} height={18} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.9} />
      <rect x={200} y={300} width={320} height={18} fill={`url(#${k.id("brushed")})`} />
      {/* X micrometer head (right) */}
      <rect x={520} y={302} width={34} height={14} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <Ticks x0={524} y={309} n={12} step={2.4} h={2.4} dir={-1} w={0.5} />
      <line x1={522} y1={309} x2={554} y2={309} stroke="#1B1F25" strokeWidth={0.5} />
      <path d="M554 302 L560 297 H588 V321 H560 L554 316 Z" fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={572} y={297} width={16} height={24} fill={`url(#${k.id("knurl")})`} />
      {[300, 304, 309, 314, 318].map((y) => <line key={y} x1={555} y1={y} x2={563} y2={y} stroke="#1B1F25" strokeWidth={0.5} />)}
      <rect x={588} y={302} width={12} height={14} rx={2} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={0.6} />
      {/* Y micrometer head (front, end-on) */}
      <circle cx={234} cy={318} r={14} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.9} />
      <circle cx={234} cy={318} r={9} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={0.6} />
      <circle cx={234} cy={318} r={4} fill={k.m("chrome")} />
      {/* DRO on arm */}
      <rect x={548} y={142} width={58} height={8} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.6} />
      <rect x={604} y={104} width={140} height={104} rx={7} fill={P("dro")} stroke="#0E1116" strokeWidth={1} />
      <rect x={612} y={112} width={124} height={58} rx={3} fill="#0A0C0F" />
      <Mark x={622} y={133} t="X" s={11} c="#E4E8ED" w={800} />
      <Mark x={622} y={160} t="Y" s={11} c="#E4E8ED" w={800} />
      <Seg x={636} y={118} t=" 12.345" h={17} c="#FF3B30" ghost={0.1} />
      <Seg x={636} y={145} t=" -3.170" h={17} c="#FF3B30" ghost={0.1} />
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={614 + (i % 5) * 24} y={177 + Math.floor(i / 5) * 14} width={18} height={10} rx={2} fill={i === 4 ? "#C98500" : "#7B8591"} />)}
      <Callout n={1} x={312} y={116} bx={96} by={104} />
      <Callout n={2} x={281} y={190} bx={96} by={190} />
      <Callout n={3} x={346} y={283} bx={200} by={276} />
      <Callout n={4} x={470} y={296} bx={505} by={270} />
      <Callout n={5} x={578} y={300} bx={626} by={262} />
      <Callout n={6} x={680} y={106} bx={692} by={62} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Portable surface roughness tester: display unit, drive unit tracing a ground part, magnified
// inset of the diamond stylus and skid, and a calibration specimen.
function RoughnessTester() {
  const k = useKit((id) => <>
    {lg(id("paint"), [[0, "#FAFBFC"], [0.6, "#E2E6EB"], [1, "#B8C0CA"]])}
    {lg(id("ground"), [[0, "#C4CBD4"], [1, "#EEF1F4"]])}
    {lg(id("dia"), [[0, "#FFFFFF"], [0.5, "#CFE3F2"], [1, "#7FA3BF"]], false)}
    <clipPath id={id("inset")}><circle cx={470} cy={140} r={80} /></clipPath>
    <pattern id={id("grind")} width="3" height="40" patternUnits="userSpaceOnUse"><line x1="0.5" y1="0" x2="0.5" y2="40" stroke="#6E7784" strokeOpacity="0.25" strokeWidth="0.6" /></pattern>
  </>);
  const P = (n: string) => `url(#${k.id(n)})`;
  // rough surface profile (magnified) inside the inset
  const prof = [0, 5, -3, 6, -2, 3, -5, 4, 1, -4, 5, -1, 3, -6, 2, 4, -3, 5, -2, 1, -4, 6, -1, 3];
  const pts = prof.map((d, i) => `${384 + i * 8},${176 + d}`);
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={470} cy={428} rx={200} ry={12} />
      <Shadow k={k} cx={154} cy={440} rx={96} ry={10} />
      <Shadow k={k} cx={704} cy={434} rx={48} ry={7} />
      {/* cable from display unit to drive unit */}
      <path d="M236 290 C 300 236 560 226 614 284" fill="none" stroke="#23272E" strokeWidth={5} strokeLinecap="round" />
      <path d="M236 290 C 300 236 560 226 614 284" fill="none" stroke="#FFFFFF" strokeOpacity={0.18} strokeWidth={1.2} transform="translate(0 -1.5)" />
      {/* display unit */}
      <rect x={64} y={250} width={180} height={188} rx={14} fill={P("paint")} stroke="#8C96A3" strokeWidth={1.1} />
      <rect x={74} y={260} width={160} height={168} rx={9} fill={k.m("dark")} />
      <rect x={84} y={270} width={140} height={90} rx={3} fill={k.m("lcd")} stroke="#0E1116" strokeWidth={1} />
      <Mark x={92} y={286} t="Ra" s={11} a="start" w={800} c="#1E2A1A" />
      <Seg x={116} y={276} t="0.812" h={24} />
      <Mark x={218} y={298} t="µm" s={9} a="end" w={700} c="#1E2A1A" />
      <line x1={88} y1={306} x2={220} y2={306} stroke="#1E2A1A" strokeWidth={0.6} opacity={0.5} />
      <Mark x={92} y={322} t="Rz" s={10} a="start" w={800} c="#1E2A1A" />
      <Seg x={126} y={312} t="4.95" h={14} />
      <Mark x={218} y={324} t="µm" s={8} a="end" w={700} c="#1E2A1A" />
      <polyline points="90,346 98,342 104,348 112,338 118,346 126,343 132,350 140,340 148,347 156,341 164,349 172,339 180,345 188,342 196,348 204,340 212,346 218,343" fill="none" stroke="#1E2A1A" strokeWidth={0.9} />
      {Array.from({ length: 4 }, (_, i) => <rect key={i} x={90 + i * 34} y={372} width={26} height={12} rx={3} fill="#7B8591" />)}
      <circle cx={154} cy={407} r={14} fill={k.m("blue")} stroke="#123A7A" strokeWidth={1} />
      <polygon points="150,400 150,414 161,407" fill="#FFFFFF" />
      {/* part: block with ground top surface */}
      <polygon points="640,332 656,318 656,408 640,422" fill="#8C96A3" />
      <polygon points="290,332 640,332 656,318 306,318" fill={P("ground")} stroke="#8C96A3" strokeWidth={0.6} />
      <polygon points="290,332 640,332 656,318 306,318" fill={P("grind")} />
      <rect x={290} y={332} width={350} height={90} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <rect x={290} y={332} width={350} height={90} fill={`url(#${k.id("brushed")})`} />
      {/* drive unit with detector */}
      <rect x={454} y={318} width={10} height={8} fill="#2E333B" />
      <rect x={596} y={318} width={10} height={8} fill="#2E333B" />
      <rect x={440} y={272} width={180} height={48} rx={7} fill={k.m("dark")} stroke="#0E1116" strokeWidth={1} />
      <rect x={446} y={276} width={168} height={5} rx={2} fill="#FFFFFF" opacity={0.14} />
      <rect x={560} y={290} width={40} height={14} rx={3} fill="#3A4048" />
      <circle cx={574} cy={297} r={2.4} fill="#3DDC84" />
      <rect x={426} y={294} width={16} height={20} rx={2} fill={k.m("darkV")} />
      <rect x={350} y={298} width={78} height={12} rx={2} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <path d="M350 310 H364 Q364 322 356 324 H352 Q346 322 350 310 Z" fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.6} />
      <line x1={348} y1={306} x2={346} y2={324} stroke="#1B1F25" strokeWidth={1.2} />
      {/* magnifier cone and inset */}
      <line x1={348} y1={324} x2={396} y2={172} stroke="#374151" strokeWidth={0.8} strokeDasharray="4 3" />
      <line x1={348} y1={324} x2={438} y2={214} stroke="#374151" strokeWidth={0.8} strokeDasharray="4 3" />
      <circle cx={470} cy={140} r={82} fill="#1B2330" opacity={0.18} filter={`url(#${k.id("blur2")})`} transform="translate(2 4)" />
      <circle cx={470} cy={140} r={80} fill="#FFFFFF" />
      <g clipPath={P("inset")}>
        <polygon points={`384,240 ${pts.join(" ")} 580,240`} fill={k.m("steel")} />
        <polyline points={pts.join(" ")} fill="none" stroke="#374151" strokeWidth={1.4} />
        {/* pickup nose */}
        <rect x={446} y={74} width={140} height={34} rx={3} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
        {/* skid: rounded pad resting on the peaks */}
        <path d="M478 108 H536 V140 Q536 170 507 171 Q478 170 478 140 Z" fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1} />
        {/* stylus arm and diamond tip */}
        <rect x={420} y={98} width={30} height={8} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
        <rect x={420} y={106} width={10} height={36} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
        <polygon points="420,142 430,142 426,170 424,170" fill={P("dia")} stroke="#4F6B82" strokeWidth={0.8} />
      </g>
      <circle cx={470} cy={140} r={80} fill="none" stroke="#374151" strokeWidth={1.6} />
      <Mark x={540} y={218} t="×200" s={9} w={700} c="#374151" />
      {/* calibration specimen */}
      <polygon points="664,398 744,398 752,390 672,390" fill="#DDE2E8" stroke="#8C96A3" strokeWidth={0.6} />
      <polygon points="684,396 724,396 728,392 688,392" fill="#6B7582" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <line key={i} x1={687 + i * 5} y1={396} x2={691 + i * 5} y2={392} stroke="#E4E8ED" strokeWidth={0.7} />)}
      <polygon points="744,398 752,390 752,422 744,430" fill="#8C96A3" />
      <rect x={664} y={398} width={80} height={32} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.9} />
      <Mark x={704} y={412} t="Ra 2.97" s={9} w={800} />
      <Mark x={704} y={424} t="µm" s={8} w={700} />
      <Callout n={1} x={120} y={272} bx={100} by={214} />
      <Callout n={2} x={530} y={312} bx={560} by={380} />
      <Callout n={3} x={426} y={156} bx={346} by={88} />
      <Callout n={4} x={512} y={150} bx={604} by={80} />
      <Callout n={5} x={400} y={328} bx={400} by={464} />
      <Callout n={6} x={718} y={392} bx={726} by={344} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Rockwell hardness tester (side view, 150 kgf, HRC). Dial reads 45.5 HRC.
function HardnessTester() {
  const k = useKit((id) => <>
    {lg(id("paint"), [[0, "#F5F7FA"], [0.55, "#DCE2E9"], [1, "#AEB8C4"]])}
    {lg(id("dia"), [[0, "#FFFFFF"], [0.5, "#D6E8F5"], [1, "#8FB0C8"]], false)}
  </>);
  const P = (n: string) => `url(#${k.id(n)})`;
  const dx = 500, dy = 144, R = 46;
  const dt: string[] = [];
  for (let i = 0; i < 100; i++) {
    const a = (i / 100) * 2 * Math.PI, L = i % 10 === 0 ? 7 : i % 5 === 0 ? 5 : 3;
    dt.push(`M${(dx + Math.sin(a) * R).toFixed(1)} ${(dy - Math.cos(a) * R).toFixed(1)}L${(dx + Math.sin(a) * (R - L)).toFixed(1)} ${(dy - Math.cos(a) * (R - L)).toFixed(1)}`);
  }
  const reading = 45.5, th = (reading / 100) * 2 * Math.PI;
  const thread: string[] = [];
  for (let y = 296; y < 372; y += 5) thread.push(`M309 ${y + 2.5}L331 ${y}`);
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={420} cy={440} rx={250} ry={14} />
      {/* base */}
      <polygon points="196,386 644,386 632,376 208,376" fill="#F1F3F6" stroke="#AEB6C0" strokeWidth={0.6} />
      <rect x={190} y={386} width={460} height={50} rx={8} fill={P("paint")} stroke="#8C96A3" strokeWidth={1} />
      {/* C-frame: head and column */}
      <path d="M240 108 Q240 84 264 84 H568 Q588 84 588 104 V380 H420 V206 H262 Q240 206 240 186 Z" fill={P("paint")} stroke="#7B8591" strokeWidth={1.2} />
      <path d="M246 108 Q246 90 266 90 H566" fill="none" stroke="#FFFFFF" strokeWidth={2} opacity={0.9} />
      <rect x={420} y={206} width={10} height={174} fill="#FFFFFF" opacity={0.35} />
      <line x1={240} y1={196} x2={420} y2={196} stroke="#9AA3AE" strokeWidth={0.8} />
      {/* spindle nose, indenter holder, diamond cone */}
      <rect x={296} y={206} width={48} height={14} rx={2} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.9} />
      <rect x={310} y={220} width={20} height={20} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <line x1={310} y1={226} x2={330} y2={226} stroke="#6E7784" strokeWidth={0.6} />
      <polygon points="312,240 328,240 320,254" fill={P("dia")} stroke="#4F6B82" strokeWidth={0.8} />
      {/* elevating screw, collar */}
      <rect x={309} y={290} width={22} height={88} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <path d={thread.join("")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={294} y={362} width={52} height={16} rx={2} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={286} y={374} width={68} height={10} rx={2} fill={k.m("dark")} />
      {/* handwheel */}
      <path d="M246 334 A74 13 0 0 0 394 334 V346 A74 13 0 0 1 246 346 Z" fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={0.8} />
      <ellipse cx={320} cy={334} rx={74} ry={13} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.9} />
      <ellipse cx={320} cy={334} rx={60} ry={9.5} fill="none" stroke="#8C96A3" strokeWidth={0.8} />
      <ellipse cx={320} cy={333} rx={16} ry={4} fill={k.m("dark")} />
      <rect x={309} y={318} width={22} height={15} fill={k.m("chromeV")} />
      <path d="M309 330L331 327.5M309 325L331 322.5" stroke="#6E7784" strokeWidth={0.8} />
      {/* anvil */}
      <rect x={308} y={282} width={24} height={10} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={290} y={274} width={60} height={9} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={320} cy={274} rx={30} ry={4} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      {/* test specimen */}
      <rect x={284} y={256} width={72} height={17} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={320} cy={256} rx={36} ry={5} fill="#E7EBEF" stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={300} cy={256} rx={2} ry={0.8} fill="#5E6773" />
      <polygon points="312,240 328,240 320,254" fill={P("dia")} stroke="#4F6B82" strokeWidth={0.8} />
      {/* dial gauge */}
      <circle cx={dx} cy={dy} r={54} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <circle cx={dx} cy={dy} r={48} fill={k.m("dial")} stroke="#8C96A3" strokeWidth={0.8} />
      <path d={dt.join("")} stroke="#1B1F25" strokeWidth={0.8} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * 2 * Math.PI;
        return (
          <g key={i}>
            <Mark x={dx + Math.sin(a) * 33} y={dy - Math.cos(a) * 33 + 3} t={i * 10} s={7.5} w={700} />
            <Mark x={dx + Math.sin(a) * 23} y={dy - Math.cos(a) * 23 + 2} t={(i * 10 + 30) % 100} s={5.5} w={700} c="#C0392B" />
          </g>
        );
      })}
      <Mark x={dx} y={dy - 6} t="HRC" s={6} w={800} />
      <Mark x={dx} y={dy + 13} t="HRB" s={5.5} w={800} c="#C0392B" />
      <line x1={dx - Math.sin(th) * 10} y1={dy + Math.cos(th) * 10} x2={dx + Math.sin(th) * 43} y2={dy - Math.cos(th) * 43} stroke="#111418" strokeWidth={1.6} strokeLinecap="round" />
      <circle cx={dx} cy={dy} r={4.5} fill={k.m("knob")} />
      <ellipse cx={dx - 18} cy={dy - 26} rx={18} ry={8} fill="#FFFFFF" opacity={0.35} transform={`rotate(-30 ${dx - 18} ${dy - 26})`} />
      {/* load selector */}
      <circle cx={494} cy={290} r={26} fill="#E9EDF2" stroke="#9AA3AE" strokeWidth={0.8} />
      <circle cx={494} cy={290} r={16} fill={k.m("knob")} stroke="#0E1116" strokeWidth={0.8} />
      <line x1={494} y1={290} x2={494 + Math.sin(0.7) * 14} y2={290 - Math.cos(0.7) * 14} stroke="#F5BE1B" strokeWidth={2.2} strokeLinecap="round" />
      <Mark x={494 - Math.sin(0.7) * 34} y={290 - Math.cos(0.7) * 34 + 3} t="60" s={7.5} w={700} />
      <Mark x={494} y={290 - 34 + 3} t="100" s={7.5} w={700} />
      <Mark x={494 + Math.sin(0.7) * 34} y={290 - Math.cos(0.7) * 34 + 3} t="150" s={7.5} w={700} />
      <Mark x={494} y={330} t="kgf" s={7.5} w={700} />
      {/* load / unload lever */}
      <circle cx={588} cy={236} r={9} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <path d="M588 232 L646 262 L642 270 L586 240 Z" fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <circle cx={648} cy={268} r={10} fill={k.m("knob")} />
      {/* test block on the base */}
      <rect x={582} y={362} width={50} height={16} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={607} cy={362} rx={25} ry={4.5} fill="#E7EBEF" stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={607} cy={378} rx={25} ry={4.5} fill="none" />
      <Mark x={607} y={374} t="45.3 HRC" s={6.5} w={800} />
      {[597, 607, 617].map((x) => <circle key={x} cx={x} cy={362} r={0.9} fill="#5E6773" />)}
      <Callout n={1} x={536} y={108} bx={610} by={52} />
      <Callout n={2} x={322} y={247} bx={170} by={232} />
      <Callout n={3} x={286} y={266} bx={170} by={284} />
      <Callout n={4} x={292} y={279} bx={170} by={336} />
      <Callout n={5} x={252} y={342} bx={170} by={392} />
      <Callout n={6} x={508} y={300} bx={690} by={330} />
      <Callout n={7} x={628} y={370} bx={706} by={404} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Click-type torque wrench set to 64 N·m (main scale 60, handle micrometer 4).
function TorqueWrench() {
  const k = useKit();
  const xe = 488, S = 2.6, set = 64, yc = 248;
  const xs = (v: number) => xe - (set - v) * S;
  const main: string[] = [];
  for (let v = 20; v <= 60; v += 5) main.push(`M${xs(v).toFixed(1)} ${yc}v${v % 10 === 0 ? -9 : -5}`);
  const mic = [2, 3, 4, 5, 6].map((v) => ({ v, y: yc + Math.sin(((v - 4) * 36 * Math.PI) / 180) * 12, o: Math.cos(((v - 4) * 36 * Math.PI) / 180) }));
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={318} rx={340} ry={14} />
      {/* neck */}
      <path d="M150 226 L214 233 V263 L150 268 Z" fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      {/* square drive under the head */}
      <polygon points="130,262 137,257 137,288 130,294" fill="#6E7784" />
      <rect x={110} y={262} width={20} height={32} fill={k.m("steelV")} stroke="#5E6773" strokeWidth={0.9} />
      <circle cx={120} cy={285} r={3} fill={k.m("ball")} stroke="#5E6773" strokeWidth={0.5} />
      {/* ratchet head */}
      <path d="M72 236 A48 17 0 0 0 168 236 V262 A48 17 0 0 1 72 262 Z" fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1} />
      <ellipse cx={120} cy={236} rx={48} ry={17} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <ellipse cx={120} cy={236} rx={36} ry={12} fill="none" stroke="#8C96A3" strokeWidth={0.8} />
      {/* reverse lever */}
      <g transform="rotate(-14 110 234)">
        <rect x={92} y={229} width={40} height={11} rx={5.5} fill={k.m("dark")} stroke="#0E1116" strokeWidth={0.8} />
        <rect x={96} y={231} width={30} height={2.5} rx={1.2} fill="#FFFFFF" opacity={0.25} />
      </g>
      <circle cx={122} cy={234} r={3.4} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={0.6} />
      <Mark x={148} y={233} t="R" s={7} w={800} c="#374151" />
      <Mark x={148} y={246} t="L" s={7} w={800} c="#374151" />
      {/* tube */}
      <rect x={210} y={233} width={290} height={30} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      <rect x={210} y={233} width={290} height={30} fill={`url(#${k.id("brushed")})`} />
      {/* main scale window */}
      <rect x={340} y={236} width={148} height={24} fill="#F4F6F8" opacity={0.75} stroke="#8C96A3" strokeWidth={0.6} />
      <line x1={344} y1={yc} x2={xe} y2={yc} stroke="#1B1F25" strokeWidth={0.9} />
      <path d={main.join("")} stroke="#1B1F25" strokeWidth={0.9} />
      {[20, 40, 60].map((v) => <Mark key={v} x={xs(v)} y={257.5} t={v} s={7.5} w={800} />)}
      <Mark x={354} y={257.5} t="N·m" s={6} w={700} />
      {/* handle: micrometer bevel sleeve */}
      <path d={`M${xe} 236 L${xe + 10} 231 H532 V265 H${xe + 10} L${xe} 260 Z`} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={1} />
      {mic.map(({ v, y, o }) => (
        <g key={v} opacity={Math.max(0.35, o)}>
          <line x1={xe + 0.5} y1={y} x2={xe + 12} y2={y} stroke="#1B1F25" strokeWidth={0.9} />
          {Math.abs(v - 4) <= 1 && <Mark x={xe + 19} y={y + 2.6} t={v} s={7} w={800} />}
        </g>
      ))}
      <Ticks x0={xe + 10} y={yc} n={0} step={1} h={0} />
      {/* grip */}
      <rect x={530} y={229} width={162} height={38} rx={11} fill={k.m("rubber")} />
      {Array.from({ length: 18 }, (_, i) => <line key={i} x1={540 + i * 8.4} y1={232} x2={540 + i * 8.4} y2={264} stroke="#000000" strokeOpacity={0.45} strokeWidth={2} />)}
      <rect x={534} y={233} width={154} height={5} rx={2.5} fill="#FFFFFF" opacity={0.14} />
      <rect x={608} y={229} width={4} height={38} fill="#D03B3B" />
      <polygon points="610,224 605,218 615,218" fill="#D03B3B" />
      {/* lock ring and end cap */}
      <rect x={690} y={231} width={18} height={34} rx={3} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={0.9} />
      <path d="M708 234 H724 Q736 234 736 248 Q736 262 724 262 H708 Z" fill={k.m("black")} stroke="#0E1116" strokeWidth={0.8} />
      <Callout n={1} x={120} y={290} bx={78} by={350} />
      <Callout n={2} x={98} y={236} bx={74} by={166} />
      <Callout n={3} x={418} y={243} bx={418} by={166} />
      <Callout n={4} x={xe + 6} y={241} bx={510} by={166} />
      <Callout n={5} x={699} y={232} bx={712} by={166} />
      <Callout n={6} x={610} y={262} bx={610} by={340} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Bench bottle cap torque tester: clamps hold the bottle on a rotating table; the display holds 2.35 N·m peak.
function CapTorqueTester() {
  const k = useKit((id) => <>
    {lg(id("paint"), [[0, "#F5F7FA"], [0.55, "#DCE2E9"], [1, "#AEB8C4"]])}
    {lg(id("liquid"), [[0, "#BFE3FA", 0.55], [1, "#6FB6E8", 0.6]], false)}
    {lg(id("cap"), [[0, "#7DB2FF"], [0.35, "#2F6FDB"], [1, "#184A9E"]], false)}
    {rg(id("plat"), [[0, "#FFFFFF"], [0.6, "#D5DBE2"], [1, "#9AA3AE"]], 0.45, 0.35, 0.7)}
  </>);
  const P = (n: string) => `url(#${k.id(n)})`;
  const bottle = "M352 300 V190 Q352 160 382 146 V134 H418 V146 Q448 160 448 190 V300 Q448 306 440 306 H360 Q352 306 352 300 Z";
  const clamp = (side: -1 | 1) => {
    const px = side < 0 ? 262 : 526, ax = side < 0 ? 274 : 452, aw = 74, padx = side < 0 ? 340 : 448;
    return (
      <g>
        <rect x={px} y={176} width={12} height={130} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
        <rect x={px - 6} y={162} width={24} height={16} rx={3} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={0.8} />
        {[204, 256].map((y) => (
          <g key={y}>
            <rect x={ax} y={y} width={aw} height={10} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.8} />
            <rect x={padx} y={y - 8} width={12} height={26} rx={3} fill={k.m("rubber")} />
            <circle cx={px + 6} cy={y + 5} r={8} fill={k.m("knob")} stroke="#0E1116" strokeWidth={0.6} />
          </g>
        ))}
      </g>
    );
  };
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={440} rx={250} ry={14} />
      {/* base */}
      <polygon points="170,340 630,340 610,316 190,316" fill="#EEF1F4" stroke="#AEB6C0" strokeWidth={0.6} />
      <rect x={170} y={340} width={460} height={96} rx={8} fill={P("paint")} stroke="#8C96A3" strokeWidth={1} />
      <rect x={196} y={350} width={408} height={78} rx={6} fill={k.m("dark")} />
      {/* display */}
      <rect x={210} y={358} width={176} height={62} rx={3} fill={k.m("lcd")} stroke="#0E1116" strokeWidth={1} />
      <Seg x={228} y={368} t="2.35" h={38} />
      <Mark x={378} y={414} t="N·m" s={11} a="end" w={800} c="#1E2A1A" />
      <polygon points="372,364 378,374 366,374" fill="#1E2A1A" />
      {/* buttons: power, zero, peak hold */}
      <circle cx={440} cy={389} r={15} fill={k.m("grey")} stroke="#5E6773" strokeWidth={0.8} />
      <path d="M435 383 A8 8 0 1 0 445 383" fill="none" stroke="#374151" strokeWidth={1.8} strokeLinecap="round" />
      <line x1={440} y1={379} x2={440} y2={389} stroke="#374151" strokeWidth={1.8} strokeLinecap="round" />
      <circle cx={500} cy={389} r={15} fill={k.m("grey")} stroke="#5E6773" strokeWidth={0.8} />
      <Mark x={500} y={393.5} t="→0←" s={10} w={800} c="#374151" />
      <circle cx={560} cy={389} r={15} fill={k.m("yellow")} stroke="#8A6200" strokeWidth={0.8} />
      <polyline points="551,396 556,386 560,392 564,381 569,396" fill="none" stroke="#1B1F25" strokeWidth={1.6} strokeLinejoin="round" />
      {/* rotating table */}
      <path d="M230 300 A170 28 0 0 0 570 300 V316 A170 28 0 0 1 230 316 Z" fill={k.m("steelV")} stroke="#6E7784" strokeWidth={1} />
      <ellipse cx={400} cy={300} rx={170} ry={28} fill={P("plat")} stroke="#6E7784" strokeWidth={1} />
      {[150, 120, 90].map((r) => <ellipse key={r} cx={400} cy={300} rx={r} ry={r * 28 / 170} fill="none" stroke="#8C96A3" strokeWidth={0.6} opacity={0.7} />)}
      {[-1, 1].map((s) => <rect key={s} x={s < 0 ? 240 : 540} y={302} width={20} height={4} rx={2} fill="#5E6773" transform={`rotate(${s * 4} 400 300)`} />)}
      {/* bottle */}
      <path d={bottle} fill={P("liquid")} />
      <path d="M353 180 H447 V300 Q447 305 440 305 H360 Q353 305 353 300 Z" fill={P("liquid")} opacity={0.6} />
      <path d={bottle} fill={k.m("glass")} stroke="#7FA3BF" strokeWidth={1.2} />
      {[222, 234, 282, 292].map((y) => <line key={y} x1={353} y1={y} x2={447} y2={y} stroke="#7FA3BF" strokeWidth={0.8} opacity={0.7} />)}
      <line x1={353} y1={180} x2={447} y2={180} stroke="#4E8FC4" strokeWidth={1} opacity={0.8} />
      <rect x={362} y={178} width={7} height={118} rx={3.5} fill="#FFFFFF" opacity={0.55} />
      {/* cap with tamper band */}
      <rect x={378} y={128} width={44} height={7} rx={1} fill={P("cap")} opacity={0.85} />
      <rect x={376} y={100} width={48} height={27} rx={3} fill={P("cap")} stroke="#123A7A" strokeWidth={0.8} />
      {Array.from({ length: 15 }, (_, i) => <line key={i} x1={379 + i * 3} y1={102} x2={379 + i * 3} y2={125} stroke="#0E2A5C" strokeWidth={0.7} opacity={0.6} />)}
      <rect x={376} y={100} width={48} height={4} rx={2} fill="#FFFFFF" opacity={0.25} />
      {/* twist direction */}
      <path d="M362 92 A40 10 0 0 0 438 92" fill="none" stroke="#374151" strokeWidth={1.8} />
      <polygon points="438,92 430,84 443,82" fill="#374151" />
      {/* clamps */}
      {clamp(-1)}
      {clamp(1)}
      <Callout n={1} x={220} y={390} bx={110} by={390} />
      <Callout n={2} x={300} y={209} bx={190} by={170} />
      <Callout n={3} x={250} y={318} bx={140} by={300} />
      <Callout n={4} x={568} y={389} bx={680} by={389} />
      <Callout n={5} x={420} y={112} bx={520} by={70} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Precision balance (0.001 g) with draft shield, weighing a steel bushing: 36.482 g.
function PrecisionBalance() {
  const k = useKit((id) => <>
    {lg(id("wp"), [[0, "#FFFFFF"], [0.6, "#E9ECF0"], [1, "#BFC7D0"]])}
    {lg(id("frame"), [[0, "#9AA3AE"], [0.4, "#F2F4F7"], [1, "#A7B0BA"]], false)}
    {rg(id("pan"), [[0, "#FFFFFF"], [0.6, "#D1D7DE"], [1, "#8C96A3"]], 0.45, 0.35, 0.7)}
  </>);
  const P = (n: string) => `url(#${k.id(n)})`;
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={380} cy={440} rx={250} ry={13} />
      <Shadow k={k} cx={650} cy={434} rx={42} ry={7} />
      {/* feet */}
      {[186, 534].map((x) => (
        <g key={x}>
          <rect x={x + 10} y={420} width={10} height={8} fill={k.m("steelV")} />
          <rect x={x} y={426} width={30} height={10} rx={3} fill={`url(#${k.id("knurl")})`} stroke="#5E6773" strokeWidth={0.8} />
        </g>
      ))}
      {/* body */}
      <polygon points="158,318 592,318 578,304 172,304" fill="#F7F8FA" stroke="#AEB6C0" strokeWidth={0.6} />
      <rect x={150} y={318} width={450} height={106} rx={10} fill={P("wp")} stroke="#8C96A3" strokeWidth={1} />
      <rect x={168} y={336} width={414} height={72} rx={7} fill={k.m("dark")} />
      {/* display */}
      <rect x={290} y={344} width={180} height={46} rx={3} fill={k.m("lcd")} stroke="#0E1116" strokeWidth={1} />
      <Seg x={300} y={352} t="36.482" h={28} />
      <Mark x={463} y={381} t="g" s={15} a="end" w={700} c="#1E2A1A" />
      <circle cx={298} cy={350} r={1.6} fill="#1E2A1A" />
      {/* keys */}
      <rect x={186} y={380} width={40} height={18} rx={4} fill="#7B8591" />
      <Mark x={206} y={392.5} t="I/O" s={8} w={800} c="#FFFFFF" />
      <rect x={234} y={380} width={40} height={18} rx={4} fill="#7B8591" />
      <Mark x={254} y={392.5} t="F" s={8} w={800} c="#FFFFFF" />
      <rect x={484} y={372} width={56} height={26} rx={5} fill={k.m("grey")} stroke="#5E6773" strokeWidth={0.8} />
      <Mark x={512} y={389} t="→T←" s={11} w={800} c="#1B1F25" />
      {/* level bubble */}
      <circle cx={560} cy={354} r={10} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={0.6} />
      <circle cx={560} cy={354} r={7} fill="#CFE8C8" />
      <circle cx={560} cy={354} r={4.2} fill="none" stroke="#1B1F25" strokeWidth={0.6} />
      <circle cx={560} cy={354} r={2.8} fill="#FFFFFF" />
      {/* draft shield: back frame seen through the glass */}
      <g stroke="#A7B0BA" strokeWidth={1.5} fill="none" opacity={0.8}>
        <path d="M194 70 V292 H556 V70" />
        <path d="M186 306 L194 292 M564 306 L556 292 M186 92 L194 70 M564 92 L556 70" />
      </g>
      <polygon points="176,86 574,86 556,68 194,68" fill={k.m("glass")} stroke="#8C96A3" strokeWidth={1} />
      {/* weighing pan with a steel bushing */}
      <rect x={368} y={286} width={14} height={16} fill={k.m("dark")} />
      <ellipse cx={375} cy={294} rx={96} ry={14} fill="none" stroke="#9AA3AE" strokeWidth={1} opacity={0.8} />
      <path d="M303 282 A72 13 0 0 0 447 282 V286 A72 13 0 0 1 303 286 Z" fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={375} cy={282} rx={72} ry={13} fill={P("pan")} stroke="#6E7784" strokeWidth={0.9} />
      <rect x={355} y={262} width={40} height={20} fill={k.m("steelV")} stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={375} cy={282} rx={20} ry={5} fill="none" stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={375} cy={262} rx={20} ry={5} fill="#E7EBEF" stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={375} cy={262} rx={9} ry={2.4} fill="#4A525C" />
      {/* front glass and frame */}
      <rect x={180} y={90} width={390} height={214} fill={k.m("glass")} opacity={0.55} />
      <polygon points="210,96 250,96 186,190 186,150" fill="#FFFFFF" opacity={0.35} />
      <polygon points="470,96 490,96 400,300 380,300" fill="#FFFFFF" opacity={0.18} />
      <rect x={176} y={84} width={398} height={8} rx={2} fill={P("frame")} stroke="#7B8591" strokeWidth={0.6} />
      <rect x={176} y={298} width={398} height={9} rx={2} fill={P("frame")} stroke="#7B8591" strokeWidth={0.6} />
      <rect x={176} y={84} width={10} height={222} fill={P("frame")} stroke="#7B8591" strokeWidth={0.6} />
      <rect x={564} y={84} width={10} height={222} fill={P("frame")} stroke="#7B8591" strokeWidth={0.6} />
      <rect x={370} y={84} width={10} height={222} fill={P("frame")} stroke="#7B8591" strokeWidth={0.6} opacity={0.9} />
      <rect x={186} y={176} width={6} height={44} rx={2} fill={k.m("dark")} />
      <rect x={558} y={176} width={6} height={44} rx={2} fill={k.m("dark")} />
      <rect x={340} y={76} width={70} height={6} rx={3} fill={k.m("dark")} />
      {/* calibration weight */}
      <rect x={624} y={370} width={52} height={60} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.9} />
      <ellipse cx={650} cy={430} rx={26} ry={5} fill="#8C96A3" />
      <rect x={624} y={370} width={52} height={60} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.9} />
      <ellipse cx={650} cy={370} rx={26} ry={5} fill="#EEF1F4" stroke="#6E7784" strokeWidth={0.8} />
      <rect x={641} y={354} width={18} height={16} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <rect x={632} y={340} width={36} height={16} rx={8} fill={k.m("chromeV")} stroke="#6E7784" strokeWidth={0.8} />
      <Mark x={650} y={402} t="200 g" s={10} w={800} />
      <Mark x={650} y={415} t="F1" s={8} w={800} />
      <Callout n={1} x={440} y={284} bx={620} by={262} />
      <Callout n={2} x={569} y={140} bx={630} by={140} />
      <Callout n={3} x={294} y={366} bx={100} by={366} />
      <Callout n={4} x={512} y={396} bx={470} by={468} />
      <Callout n={5} x={560} y={354} bx={606} by={316} />
      <Callout n={6} x={200} y={432} bx={120} by={456} />
      <Callout n={7} x={676} y={392} bx={740} by={392} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Digital thermo-hygrometer: front view (21.4 °C, 48 %RH, min/max memory) and back view (keyhole wall mount).
function ThermoHygrometer() {
  const k = useKit((id) => <>
    {lg(id("wp"), [[0, "#FFFFFF"], [0.6, "#EEF1F4"], [1, "#C9D0D8"]])}
    {lg(id("back"), [[0, "#F2F4F7"], [1, "#BFC7D0"]])}
  </>);
  const P = (n: string) => `url(#${k.id(n)})`;
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={300} cy={452} rx={170} ry={10} />
      <Shadow k={k} cx={620} cy={430} rx={110} ry={9} />
      {/* front case */}
      <rect x={150} y={56} width={300} height={388} rx={26} fill={P("wp")} stroke="#8C96A3" strokeWidth={1.2} />
      <rect x={160} y={66} width={280} height={368} rx={20} fill="none" stroke="#FFFFFF" strokeWidth={2} />
      <rect x={176} y={88} width={248} height={256} rx={8} fill="#3A4048" />
      <rect x={184} y={96} width={232} height={240} rx={4} fill={k.m("lcd")} />
      {/* temperature */}
      <rect x={198} y={116} width={7} height={46} rx={3.5} fill="none" stroke="#1E2A1A" strokeWidth={1.4} />
      <circle cx={201.5} cy={166} r={6} fill="#1E2A1A" />
      <rect x={200} y={134} width={3} height={30} fill="#1E2A1A" />
      <Seg x={226} y={110} t="21.4" h={70} />
      <Mark x={404} y={134} t="°C" s={22} a="end" w={700} c="#1E2A1A" />
      <line x1={192} y1={196} x2={408} y2={196} stroke="#1E2A1A" strokeWidth={1} opacity={0.5} />
      {/* humidity */}
      <path d="M201 212 Q192 226 192 232 A9 9 0 0 0 210 232 Q210 226 201 212 Z" fill="#1E2A1A" />
      <Seg x={262} y={206} t="48" h={64} />
      <Mark x={404} y={242} t="%" s={26} a="end" w={700} c="#1E2A1A" />
      <Mark x={404} y={264} t="RH" s={12} a="end" w={800} c="#1E2A1A" />
      <line x1={192} y1={284} x2={408} y2={284} stroke="#1E2A1A" strokeWidth={1} opacity={0.5} />
      {/* min / max memory */}
      <Mark x={194} y={303} t="MAX" s={9} a="start" w={800} c="#1E2A1A" />
      <Seg x={236} y={292} t="23.1" h={14} />
      <Mark x={296} y={305} t="°C" s={8} a="start" w={700} c="#1E2A1A" />
      <Seg x={330} y={292} t="62" h={14} />
      <Mark x={354} y={305} t="%" s={8} a="start" w={700} c="#1E2A1A" />
      <Mark x={194} y={326} t="MIN" s={9} a="start" w={800} c="#1E2A1A" />
      <Seg x={236} y={315} t="19.8" h={14} />
      <Mark x={296} y={328} t="°C" s={8} a="start" w={700} c="#1E2A1A" />
      <Seg x={330} y={315} t="41" h={14} />
      <Mark x={354} y={328} t="%" s={8} a="start" w={700} c="#1E2A1A" />
      {/* buttons */}
      <rect x={192} y={370} width={96} height={32} rx={16} fill={k.m("grey")} stroke="#8C96A3" strokeWidth={0.9} />
      <Mark x={240} y={390} t="MAX/MIN" s={10} w={800} c="#374151" />
      <rect x={312} y={370} width={96} height={32} rx={16} fill={k.m("grey")} stroke="#8C96A3" strokeWidth={0.9} />
      <Mark x={360} y={390} t="°C/°F" s={10} w={800} c="#374151" />
      <rect x={176} y={70} width={120} height={10} rx={5} fill="#FFFFFF" opacity={0.7} />
      {/* back view with keyhole wall mount */}
      <rect x={530} y={116} width={180} height={306} rx={20} fill={P("back")} stroke="#8C96A3" strokeWidth={1.2} />
      <path d="M616 138 H624 V150 A8 8 0 1 1 616 150 Z" fill="#2A2F36" />
      <circle cx={620} cy={142} r={5} fill={k.m("chrome")} stroke="#5E6773" strokeWidth={0.6} />
      <line x1={617} y1={142} x2={623} y2={142} stroke="#5E6773" strokeWidth={1} />
      <rect x={570} y={196} width={100} height={70} rx={6} fill="none" stroke="#9AA3AE" strokeWidth={1.2} />
      <rect x={606} y={258} width={28} height={6} rx={2} fill="#9AA3AE" />
      <rect x={560} y={300} width={120} height={92} rx={8} fill="#DDE2E8" stroke="#9AA3AE" strokeWidth={1.2} />
      {[312, 318, 324].map((y) => <line key={y} x1={610} y1={y} x2={630} y2={y} stroke="#9AA3AE" strokeWidth={1.2} />)}
      <Mark x={620} y={356} t="+  1.5V  −" s={10} w={700} c="#5E6773" />
      <Callout n={1} x={250} y={146} bx={92} by={146} />
      <Callout n={2} x={290} y={238} bx={92} by={238} />
      <Callout n={3} x={200} y={314} bx={92} by={330} />
      <Callout n={4} x={624} y={152} bx={740} by={96} />
    </g>
  );
}

export const ARTS_LAB: Record<string, () => ReactElement> = {
  "cmm": Cmm,
  "cmm-probe": CmmProbe,
  "profile-projector": ProfileProjector,
  "roughness-tester": RoughnessTester,
  "hardness-tester": HardnessTester,
  "torque-wrench": TorqueWrench,
  "cap-torque-tester": CapTorqueTester,
  "precision-balance": PrecisionBalance,
  "thermo-hygrometer": ThermoHygrometer,
};
