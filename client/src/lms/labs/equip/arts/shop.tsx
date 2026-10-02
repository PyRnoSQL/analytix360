import type { ReactElement, ReactNode } from "react";
import { useKit, Shadow, Callout, Mark, type Kit } from "../kit";

// ---------------------------------------------------------------------------------------------
// Local helpers: custom gradients, number formatting, polygon paths, arrow dimension lines.
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
const f = (n: number) => n.toFixed(1);
const poly = (pts: [number, number][]) => "M" + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L") + "Z";
const rad = (d: number) => (d * Math.PI) / 180;
const lerpC = (a: string, b: string, t: number) => {
  const p = (s: string, i: number) => parseInt(s.slice(1 + 2 * i, 3 + 2 * i), 16);
  return "#" + [0, 1, 2].map((i) => Math.round(p(a, i) + (p(b, i) - p(a, i)) * t).toString(16).padStart(2, "0")).join("");
};

/** Thin grey dimension line with arrowheads at both ends and short extension lines. */
function Dim({ k, x1, y1, x2, y2 }: { k: Kit; x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4B5563" strokeWidth={1.1} markerStart={`url(#${k.id("arr")})`} markerEnd={`url(#${k.id("arr")})`} />;
}
const arrowDef = (id: (n: string) => string) => (
  <marker key="arr" id={id("arr")} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0 1 L10 5 L0 9 Z" fill="#4B5563" />
  </marker>
);

// ---------------------------------------------------------------------------------------------
// Inspection status tags: HOLD / REJECTED / ACCEPTED hanging from a rail, each with a data panel.
type TagSpec = { px: number; rot: number; g: string; word: string; wc: string; ws: number; v: string[] };
function NcTags() {
  const k = useKit((id) => <>
    {lg(id("tY"), [[0, "#FFE36E"], [1, "#F2BC12"]])}
    {lg(id("tR"), [[0, "#EE5A4C"], [1, "#C2261C"]])}
    {lg(id("tG"), [[0, "#3DC27C"], [1, "#138A4B"]])}
    {lg(id("rail"), [[0, "#FFFFFF"], [0.4, "#B9C1CB"], [1, "#6E7784"]])}
  </>);
  const tags: TagSpec[] = [
    { px: 228, rot: 6, g: "tY", word: "HOLD", wc: "#1B1F25", ws: 30, v: ["4471-02", "2609-14", "240", "0417", "26.09.30", "QC 07"] },
    { px: 400, rot: -1.5, g: "tR", word: "REJECTED", wc: "#FFFFFF", ws: 19, v: ["4471-02", "2609-11", "36", "0412", "26.09.29", "QC 03"] },
    { px: 572, rot: -6, g: "tG", word: "ACCEPTED", wc: "#FFFFFF", ws: 19, v: ["5120-01", "2610-02", "500", "—", "26.10.02", "QC 07"] },
  ];
  const labels = ["P/N", "LOT", "QTY", "NCR", "DATE", "INSP"];
  const Tw = 150, Th = 292, top = 46; // tag size, string length above tag
  const outline = poly([[22, 0], [Tw - 22, 0], [Tw, 22], [Tw, Th], [0, Th], [0, 22]]);
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={452} rx={250} ry={10} o={0.16} />
      {/* rail with end brackets */}
      <rect x={120} y={48} width={560} height={10} rx={5} fill={`url(#${k.id("rail")})`} stroke="#6E7784" strokeWidth={0.8} />
      {[124, 662].map((x) => <rect key={x} x={x} y={36} width={14} height={34} rx={3} fill={k.m("dark")} />)}
      {tags.map((t, ti) => (
        <g key={ti} transform={`translate(${t.px} 53) rotate(${t.rot})`}>
          {/* string loop over the rail (back strand) */}
          <path d={`M-1 ${top + 24} Q-12 20 -6 -4 Q0 -10 6 -4`} fill="none" stroke="#CFC6AC" strokeWidth={2} />
          <g transform={`translate(${-Tw / 2} ${top})`}>
            <path d={outline} transform="translate(5 7)" fill="#1B2330" opacity={0.18} filter={`url(#${k.id("blur2")})`} />
            <path d={outline} fill={`url(#${k.id(t.g)})`} stroke="#00000033" strokeWidth={1} />
            <path d={poly([[23, 1.5], [Tw - 23, 1.5], [Tw - 2, 22], [Tw - 2, 60], [2, 60], [2, 22]])} fill="#FFFFFF" opacity={0.18} />
            {/* reinforced eyelet */}
            <circle cx={Tw / 2} cy={26} r={11} fill="#F3EEDD" stroke="#00000040" strokeWidth={0.8} />
            <circle cx={Tw / 2} cy={26} r={4.5} fill="#E7EBF0" stroke="#00000055" strokeWidth={0.8} />
            {/* front strand through the eyelet */}
            <path d={`M${Tw / 2 + 6} -50 Q${Tw / 2 + 14} -26 ${Tw / 2 + 3} 22 Q${Tw / 2} 30 ${Tw / 2 - 2} 24`} fill="none" stroke="#EFE8D4" strokeWidth={2.2} />
            <path d={`M${Tw / 2 + 6} -50 Q${Tw / 2 + 14} -26 ${Tw / 2 + 3} 22`} fill="none" stroke="#9C9378" strokeWidth={0.6} />
            <Mark x={Tw / 2} y={72} t={t.word} s={t.ws} c={t.wc} w={900} />
            <line x1={10} y1={84} x2={Tw - 10} y2={84} stroke={t.wc} strokeWidth={1.4} opacity={0.8} />
            {/* data panel */}
            <rect x={10} y={92} width={Tw - 20} height={150} rx={3} fill="#FFFFFF" stroke="#00000030" strokeWidth={0.8} />
            {labels.map((l, i) => (
              <g key={l}>
                <Mark x={16} y={113 + i * 24} t={l} s={7.5} a="start" w={800} c="#374151" />
                <line x1={44} y1={115 + i * 24} x2={Tw - 16} y2={115 + i * 24} stroke="#9AA3AE" strokeWidth={0.8} strokeDasharray="2 2" />
                <text x={48} y={112 + i * 24} fontSize={11.5} fill="#1E3A8A" fontStyle="italic" fontWeight={600} fontFamily="'Segoe Print', 'Comic Sans MS', 'Bradley Hand', cursive" transform={`rotate(-1.5 48 ${112 + i * 24})`}>{t.v[i]}</text>
              </g>
            ))}
            {/* perforated stub with serial no. and inspector stamp */}
            <line x1={4} y1={252} x2={Tw - 4} y2={252} stroke={t.wc} strokeWidth={1} strokeDasharray="3 3" opacity={0.7} />
            <Mark x={14} y={276} t={`№ 0045${12 + ti}`} s={9} a="start" c={t.wc} w={700} />
            <circle cx={118} cy={271} r={14} fill="none" stroke="#1E3A8A" strokeWidth={1.6} opacity={0.75} />
            <Mark x={118} y={268} t="QC" s={7} c="#1E3A8A" w={800} />
            <Mark x={118} y={278} t={t.v[5]!.slice(3)} s={7} c="#1E3A8A" w={800} />
          </g>
        </g>
      ))}
      <Callout n={1} x={190} y={120} bx={92} by={150} />
      <Callout n={2} x={430} y={120} bx={470} by={30} />
      <Callout n={3} x={620} y={110} bx={720} by={140} />
      <Callout n={4} x={630} y={274} bx={725} by={330} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Quarantine area: locked mesh cage on a red floor marking, HOLD sign, tagged pallets, lot register.
function QuarantineArea() {
  const k = useKit((id) => <>
    <pattern key="mesh" id={id("mesh")} width="9" height="9" patternUnits="userSpaceOnUse">
      <path d="M0 0.5H9M0.5 0V9" stroke="#3B414A" strokeWidth="1.1" opacity="0.85" />
    </pattern>
    {lg(id("floor"), [[0, "#DCE0E5"], [1, "#C4CAD2"]])}
    {lg(id("box"), [[0, "#D9AE74"], [1, "#B48650"]])}
    {lg(id("boxS"), [[0, "#B88A55"], [1, "#94693B"]])}
    {lg(id("wood"), [[0, "#D6B887"], [1, "#A88555"]])}
    {lg(id("post"), [[0, "#FFE27A"], [0.5, "#F2BC12"], [1, "#B88600"]], false)}
  </>);
  const X0 = 160, X1 = 590, Y0 = 118, Y1 = 400, DX = 110, DY = -46; // cage front face and depth offset
  const doorX = 440;
  const Pallet = ({ x, y, w, rows, tag }: { x: number; y: number; w: number; rows: number; tag: string }) => (
    <g>
      <rect x={x} y={y - 14} width={w} height={14} fill={`url(#${k.id("wood")})`} stroke="#7A5C33" strokeWidth={0.8} />
      {[0.08, 0.46, 0.84].map((u) => <rect key={u} x={x + w * u} y={y - 10} width={w * 0.08} height={10} fill="#5E4626" opacity={0.75} />)}
      {Array.from({ length: rows }, (_, r) => Array.from({ length: 3 }, (_, c) => (
        <g key={`${r}${c}`}>
          <rect x={x + 3 + c * ((w - 6) / 3)} y={y - 14 - (r + 1) * 46} width={(w - 6) / 3 - 2} height={45} fill={`url(#${k.id("box")})`} stroke="#8A6236" strokeWidth={0.8} />
          <rect x={x + 3 + c * ((w - 6) / 3) + ((w - 6) / 3 - 2) / 2 - 5} y={y - 14 - (r + 1) * 46} width={10} height={45} fill="#E9D3AE" opacity={0.6} />
        </g>
      )))}
      {/* status tag on the stack */}
      <g transform={`translate(${x + w * 0.5 - 16} ${y - 14 - rows * 46 + 20}) rotate(-3)`}>
        <rect width={32} height={44} rx={2} fill={k.m(tag)} stroke="#00000040" strokeWidth={0.6} />
        <rect x={4} y={14} width={24} height={26} fill="#FFFFFF" opacity={0.9} />
        {[20, 26, 32].map((yy) => <line key={yy} x1={7} y1={yy} x2={25} y2={yy} stroke="#9AA3AE" strokeWidth={0.8} />)}
        <circle cx={16} cy={6} r={2.5} fill="#E7EBF0" />
      </g>
    </g>
  );
  return (
    <g>
      {k.defs}
      {/* floor */}
      <path d={poly([[70, 455], [730, 455], [755, 330], [150, 330]])} fill={`url(#${k.id("floor")})`} opacity={0.5} />
      {/* red floor marking around the footprint */}
      <path d={poly([[X0 - 30, Y1 + 24], [X1 + 30, Y1 + 24], [X1 + DX + 44, Y1 + DY - 6], [X0 + DX - 20, Y1 + DY - 6]])
        + poly([[X0 - 8, Y1 + 8], [X0 + DX, Y1 + DY + 4], [X1 + DX + 18, Y1 + DY + 4], [X1 + 10, Y1 + 8]])} fill="#D32F25" fillRule="evenodd" />
      <path d={poly([[X0 - 30, Y1 + 24], [X1 + 30, Y1 + 24], [X1 + 10, Y1 + 8], [X0 - 8, Y1 + 8]])} fill="#FFFFFF" opacity={0.12} />
      <Shadow k={k} cx={X0 + (X1 - X0) / 2 + 40} cy={Y1 + 2} rx={260} ry={10} o={0.3} />
      {/* back face and left side face (seen through the front mesh) */}
      <rect x={X0 + DX} y={Y0 + DY} width={X1 - X0} height={Y1 - Y0} fill={`url(#${k.id("mesh")})`} opacity={0.35} />
      <g transform={`translate(${X0} 0) skewY(${(Math.atan2(DY, DX) * 180) / Math.PI})`}>
        <rect x={0} y={Y0} width={DX} height={Y1 - Y0} fill={`url(#${k.id("mesh")})`} opacity={0.4} />
        <rect x={0} y={Y1 - 34} width={DX} height={5} fill={`url(#${k.id("post")})`} opacity={0.8} />
      </g>
      <rect x={X0 + DX} y={Y1 + DY - 34} width={X1 - X0} height={5} fill={`url(#${k.id("post")})`} opacity={0.8} />
      <rect x={X0 + DX - 4} y={Y0 + DY} width={8} height={Y1 - Y0} fill={`url(#${k.id("post")})`} opacity={0.9} />
      {/* pallets inside */}
      <Pallet x={192} y={385} w={156} rows={3} tag="yellow" />
      <Pallet x={450} y={372} w={150} rows={2} tag="red" />
      {/* side face (skewed) */}
      <g transform={`translate(${X1} 0) skewY(${(Math.atan2(DY, DX) * 180) / Math.PI})`}>
        <rect x={0} y={Y0} width={DX} height={Y1 - Y0} fill="#8C96A3" opacity={0.18} />
        <rect x={0} y={Y0} width={DX} height={Y1 - Y0} fill={`url(#${k.id("mesh")})`} opacity={0.85} />
        <rect x={0} y={Y0} width={DX} height={6} fill={`url(#${k.id("post")})`} />
        <rect x={0} y={Y1 - 34} width={DX} height={5} fill={`url(#${k.id("post")})`} />
      </g>
      {/* top rails going back */}
      <path d={`M${X0} ${Y0} L${X0 + DX} ${Y0 + DY} H${X1 + DX} L${X1} ${Y0}`} fill="none" stroke="#C99A08" strokeWidth={5} strokeLinejoin="round" />
      {/* front mesh panels */}
      <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill={`url(#${k.id("mesh")})`} />
      <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="#FFFFFF" opacity={0.05} />
      {/* frame: posts and rails */}
      {[X0, 300, doorX - 8, X1].map((x, i) => <rect key={i} x={x - 5} y={Y0 - 4} width={10} height={Y1 - Y0 + 8} rx={1} fill={`url(#${k.id("post")})`} stroke="#8F6A00" strokeWidth={0.6} />)}
      <rect x={X1 + DX - 5} y={Y0 + DY - 4} width={10} height={Y1 - Y0 + 8} rx={1} fill={`url(#${k.id("post")})`} stroke="#8F6A00" strokeWidth={0.6} />
      {[Y0 - 2, Y1 - 34].map((y) => <rect key={y} x={X0} y={y} width={X1 - X0} height={6} fill={`url(#${k.id("post")})`} />)}
      {/* door frame, hinges, hasp and padlock */}
      <rect x={doorX} y={Y0 + 8} width={X1 - doorX - 10} height={Y1 - Y0 - 14} fill="none" stroke="#C99A08" strokeWidth={4} />
      {[150, 330].map((y) => <rect key={y} x={X1 - 12} y={y} width={8} height={18} rx={2} fill={k.m("dark")} />)}
      <rect x={doorX - 14} y={252} width={26} height={8} rx={2} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
      <path d="M422 262 v-10 a8 8 0 0 1 16 0 v10" fill="none" stroke="#C9D0D8" strokeWidth={3.5} />
      <path d="M422 262 v-10 a8 8 0 0 1 16 0 v10" fill="none" stroke="#6E7784" strokeWidth={0.8} />
      <rect x={417} y={260} width={26} height={24} rx={4} fill={k.m("brass")} stroke="#7A5A18" strokeWidth={1} />
      <circle cx={430} cy={270} r={2.6} fill="#5A410E" />
      <rect x={429} y={271} width={2} height={6} fill="#5A410E" />
      {/* foot plates */}
      {[X0, 300, doorX - 8, X1].map((x, i) => <rect key={i} x={x - 10} y={Y1 + 2} width={20} height={5} fill={k.m("dark")} />)}
      {/* HOLD sign */}
      <g>
        <rect x={180} y={140} width={104} height={74} rx={4} fill="#FFFFFF" stroke="#D32F25" strokeWidth={3} />
        <rect x={180} y={140} width={104} height={30} rx={3} fill="#D32F25" />
        <Mark x={232} y={163} t="HOLD" s={21} c="#FFFFFF" w={900} />
        <circle cx={232} cy={192} r={15} fill="none" stroke="#D32F25" strokeWidth={4} />
        <line x1={221} y1={181} x2={243} y2={203} stroke="#D32F25" strokeWidth={4} />
        {[[184, 144], [280, 144], [184, 210], [280, 210]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={1.6} fill="#6E7784" />)}
      </g>
      {/* register of held lots on a clipboard, hanging on the left post */}
      <g transform="rotate(-3 110 240)">
        <line x1={156} y1={212} x2={118} y2={226} stroke="#6E7784" strokeWidth={1.2} /><circle cx={156} cy={212} r={2.4} fill="#3B414A" />
        <rect x={76} y={226} width={70} height={98} rx={4} fill="#C8A574" stroke="#8A6236" strokeWidth={1} />
        <rect x={82} y={236} width={58} height={82} fill="#FFFFFF" />
        <rect x={98} y={222} width={26} height={12} rx={3} fill={k.m("chrome")} stroke="#6E7784" strokeWidth={0.8} />
        <rect x={82} y={238} width={58} height={8} fill="#E5E7EB" />
        {Array.from({ length: 8 }, (_, i) => <line key={i} x1={82} y1={254 + i * 8} x2={140} y2={254 + i * 8} stroke="#9AA3AE" strokeWidth={0.6} />)}
        {[100, 118].map((x) => <line key={x} x1={x} y1={238} x2={x} y2={318} stroke="#9AA3AE" strokeWidth={0.6} />)}
        {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M85 ${251 + i * 8} h${10 + (i % 3) * 2} M103 ${251 + i * 8} h11 M121 ${251 + i * 8} h${14 - (i % 2) * 4}`} stroke="#1E3A8A" strokeWidth={1} />)}
      </g>
      <Callout n={1} x={438} y={280} bx={500} by={60} />
      <Callout n={2} x={300} y={418} bx={300} by={475} />
      <Callout n={3} x={190} y={160} bx={118} by={110} />
      <Callout n={4} x={528} y={302} bx={690} by={52} />
      <Callout n={5} x={100} y={300} bx={60} by={390} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Visual inspection station: booth with daylight hood, magnifier lamp, grey background,
// limit samples tray and defect catalogue board.
function InspectionBooth() {
  const k = useKit((id) => <>
    {lg(id("panel"), [[0, "#9DA3AA"], [1, "#868C93"]])}
    {lg(id("side"), [[0, "#7C838B"], [1, "#9DA3AA"]], false)}
    {lg(id("sideR"), [[0, "#9DA3AA"], [1, "#7C838B"]], false)}
    {lg(id("hood"), [[0, "#F4F6F8"], [1, "#C9CFD7"]])}
    {lg(id("cone"), [[0, "#FFFFFF", 0.55], [1, "#FFFFFF", 0]])}
    {lg(id("top"), [[0, "#E9ECEF"], [1, "#BFC6CE"]])}
    {lg(id("lamp"), [[0, "#FFFFFF"], [1, "#EAF4FF"]])}
    {rg(id("photo"), [[0, "#E9ECEF"], [0.6, "#AEB7C2"], [1, "#6E7784"]], 0.35, 0.3, 0.9)}
    {rg(id("lens"), [[0, "#FFFFFF", 0.85], [0.6, "#D7E9F7", 0.45], [1, "#9DB8CC", 0.6]], 0.4, 0.35, 0.8)}
  </>);
  const thumbs = [
    { d: "M8 14 L30 22", c: "#6B7280" }, { d: "M18 10 a6 6 0 1 0 0.1 0", c: "#6B7280" }, { d: "M6 20 l6 -6 l4 4 l6 -8 l8 6", c: "#6B7280" },
    { d: "M10 8 h18 v14 h-18 z", c: "#6B7280" }, { d: "M8 18 q10 -14 22 0", c: "#6B7280" }, { d: "M20 8 v16 M12 16 h16", c: "#6B7280" },
  ];
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={458} rx={310} ry={12} />
      {/* table legs */}
      {[130, 650].map((x) => <rect key={x} x={x} y={378} width={20} height={78} fill={k.m("darkV")} />)}
      <rect x={150} y={420} width={500} height={8} fill={k.m("dark")} />
      {/* back panel (neutral grey) and sides */}
      <rect x={140} y={104} width={520} height={262} fill={`url(#${k.id("panel")})`} />
      <path d="M110 92 L140 104 V366 L110 372 Z" fill={`url(#${k.id("side")})`} />
      <path d="M690 92 L660 104 V366 L690 372 Z" fill={`url(#${k.id("sideR")})`} />
      {/* light cone from the hood */}
      <path d="M170 104 H630 L675 368 H125 Z" fill={`url(#${k.id("cone")})`} />
      {/* defect catalogue board */}
      <g>
        <rect x={168} y={128} width={172} height={146} rx={3} fill="#FFFFFF" stroke="#6B7280" strokeWidth={1} />
        <rect x={168} y={128} width={172} height={14} rx={3} fill="#374151" />
        {thumbs.map((t, i) => {
          const x = 176 + (i % 3) * 54, y = 148 + Math.floor(i / 3) * 62;
          return (
            <g key={i}>
              <rect x={x} y={y} width={48} height={40} fill="#D7DCE2" stroke="#9AA3AE" strokeWidth={0.6} />
              <rect x={x} y={y} width={48} height={40} fill="#3B414A" />
              <rect x={x + 4} y={y + 5} width={40} height={30} rx={3} fill={`url(#${k.id("photo")})`} />
              <path d={t.d} transform={`translate(${x + 4} ${y + 4})`} fill="none" stroke="#2A2F36" strokeWidth={1.6} />
              <circle cx={x + 26} cy={y + 20} r={13} fill="none" stroke="#D03B3B" strokeWidth={1.4} />
              <Mark x={x + 24} y={y + 52} t={`D${i + 1}`} s={8.5} w={800} c="#374151" />
            </g>
          );
        })}
        {[[172, 132], [336, 132]].map(([x, y]) => <circle key={x} cx={x} cy={y} r={2} fill="#9AA3AE" />)}
      </g>
      {/* hood with daylight lamp */}
      <path d="M96 66 H704 L690 104 H110 Z" fill={`url(#${k.id("hood")})`} stroke="#9AA3AE" strokeWidth={1} />
      <rect x={150} y={100} width={500} height={8} rx={2} fill={`url(#${k.id("lamp")})`} stroke="#C9D0D8" strokeWidth={0.8} />
      <rect x={150} y={100} width={500} height={8} rx={2} fill="#FFFFFF" filter={`url(#${k.id("blur2")})`} />
      <rect x={612} y={76} width={52} height={16} rx={2} fill="#1B1F25" />
      <Mark x={638} y={88} t="D65" s={10} c="#7CF0A8" w={800} f="'DejaVu Sans Mono', monospace" />
      <rect x={548} y={76} width={58} height={16} rx={2} fill="#1B1F25" />
      <Mark x={577} y={88} t="1200 lx" s={9} c="#7CF0A8" w={700} f="'DejaVu Sans Mono', monospace" />
      <circle cx={136} cy={84} r={6} fill={k.m("knob")} />
      {/* worktop */}
      <rect x={100} y={364} width={600} height={16} rx={2} fill={`url(#${k.id("top")})`} stroke="#9AA3AE" strokeWidth={0.8} />
      <rect x={140} y={356} width={520} height={10} fill="#5D636B" opacity={0.25} />
      {/* limit samples tray */}
      <g>
        <path d="M178 362 L188 340 H352 L362 362 Z" fill="#2E333B" />
        <path d="M184 360 L192 344 H348 L356 360 Z" fill="#454B54" />
        {[{ x: 222, t: "green" }, { x: 270, t: "yellow" }, { x: 318, t: "red" }].map((s) => (
          <g key={s.x}>
            <ellipse cx={s.x} cy={352} rx={18} ry={5} fill="#0E1116" opacity={0.5} />
            <rect x={s.x - 16} y={334} width={32} height={16} fill={k.m("steelV")} />
            <ellipse cx={s.x} cy={350} rx={16} ry={4.5} fill="#8C96A3" />
            <ellipse cx={s.x} cy={334} rx={16} ry={4.5} fill="#E4E8ED" stroke="#8C96A3" strokeWidth={0.6} />
            <ellipse cx={s.x} cy={334} rx={7} ry={2} fill="#3B414A" />
            <path d={`M${s.x + 10} 340 L${s.x + 16} 314`} stroke="#6E7784" strokeWidth={0.8} />
            <rect x={s.x + 8} y={300} width={16} height={18} rx={1.5} fill={k.m(s.t)} transform={`rotate(8 ${s.x + 16} 309)`} />
          </g>
        ))}
      </g>
      {/* part under inspection on a mat */}
      <ellipse cx={500} cy={362} rx={60} ry={5} fill="#1B1F25" opacity={0.6} />
      <rect x={470} y={344} width={60} height={16} rx={2} fill={k.m("steel")} stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={500} cy={344} rx={30} ry={4} fill="#F5F7FA" stroke="#8C96A3" strokeWidth={0.6} />
      {/* magnifier lamp: clamp, arms with springs, round lens head */}
      <rect x={632} y={360} width={30} height={30} rx={2} fill={k.m("dark")} />
      <rect x={640} y={380} width={14} height={20} fill={k.m("darkV")} />
      <rect x={641} y={316} width={12} height={46} fill={k.m("chromeV")} />
      <path d="M647 318 L612 200" stroke="#E4E8ED" strokeWidth={8} strokeLinecap="round" />
      <path d="M647 318 L612 200" stroke="#8C96A3" strokeWidth={8} strokeLinecap="round" opacity={0.4} />
      <path d="M655 312 L620 202" stroke="#6E7784" strokeWidth={2} strokeDasharray="2 1.5" />
      <circle cx={612} cy={200} r={8} fill={k.m("knob")} />
      <path d="M612 200 L584 246" stroke="#E4E8ED" strokeWidth={7} strokeLinecap="round" />
      <path d="M612 200 L584 246" stroke="#8C96A3" strokeWidth={7} strokeLinecap="round" opacity={0.4} />
      <g transform="rotate(-8 500 270)">
        <ellipse cx={500} cy={272} rx={64} ry={26} fill="#E9ECEF" stroke="#8C96A3" strokeWidth={1.2} />
        <ellipse cx={500} cy={268} rx={64} ry={26} fill="#F7F8FA" stroke="#9AA3AE" strokeWidth={1} />
        <ellipse cx={500} cy={268} rx={50} ry={18} fill={`url(#${k.id("lens")})`} stroke="#6E7784" strokeWidth={1} />
        <ellipse cx={486} cy={262} rx={18} ry={5} fill="#FFFFFF" opacity={0.7} />
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return <circle key={i} cx={500 + Math.cos(a) * 57} cy={268 + Math.sin(a) * 22} r={1.6} fill="#FFFBE6" stroke="#C9D0D8" strokeWidth={0.4} />;
        })}
        <rect x={556} y={262} width={28} height={8} rx={3} fill={k.m("dark")} />
      </g>
      <circle cx={584} cy={250} r={6} fill={k.m("knob")} />
      <Callout n={1} x={420} y={86} bx={420} by={30} />
      <Callout n={2} x={548} y={240} bx={745} by={225} />
      <Callout n={3} x={636} y={150} bx={745} by={130} />
      <Callout n={4} x={270} y={344} bx={200} by={470} />
      <Callout n={5} x={180} y={200} bx={62} by={200} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Video borescope: handset with screen and articulation joystick, flexible insertion tube, camera tip.
function Borescope() {
  const k = useKit((id) => <>
    {lg(id("body"), [[0, "#3E444D"], [0.5, "#23272E"], [1, "#15181C"]], false)}
    {lg(id("bump"), [[0, "#FFD34D"], [1, "#D99A00"]], false)}
    {rg(id("bore"), [[0, "#05070A"], [0.25, "#2B2620"], [0.6, "#8C7A63"], [0.85, "#C9B79A"], [1, "#6D5D48"]], 0.5, 0.5, 0.62)}
    {rg(id("led"), [[0, "#FFFFFF"], [0.4, "#FFF6C8"], [1, "#FFF6C8", 0]], 0.5, 0.5, 0.5)}
    {lg(id("tipS"), [[0, "#FBFCFD"], [0.35, "#C2C9D2"], [0.7, "#7C8693"], [1, "#B7BFC9"]])}
  </>);
  const tx = 660, ty = 165, a = -32; // tip group origin and direction
  const ux = Math.cos(rad(a)), uy = Math.sin(rad(a));
  const ex = tx - 66 * ux, ey = ty - 66 * uy; // where the tube meets the articulation section
  const tube = `M224 424 C224 470 330 470 420 448 C520 424 600 440 640 400 C690 350 640 300 560 316 C480 332 492 440 540 400 C590 358 ${f(ex - 60 * ux)} ${f(ey - 60 * uy)} ${f(ex)} ${f(ey)}`;
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={420} cy={455} rx={300} ry={12} />
      {/* insertion tube */}
      <path d={tube} fill="none" stroke="#14171B" strokeWidth={11} strokeLinecap="round" />
      <path d={tube} fill="none" stroke="#5A626D" strokeWidth={7} strokeLinecap="round" />
      <path d={tube} fill="none" stroke="#2A2F36" strokeWidth={7} strokeDasharray="1.2 2" />
      <path d={tube} fill="none" stroke="#FFFFFF" strokeWidth={1.4} opacity={0.35} transform="translate(-1 -2)" />
      {/* articulation section and camera tip */}
      <g transform={`translate(${tx} ${ty}) rotate(${a})`}>
        <path d="M-66 -6 Q-30 -9 0 -8 V8 Q-30 9 -66 6 Z" fill="#2A2F36" />
        {Array.from({ length: 11 }, (_, i) => <rect key={i} x={-64 + i * 6} y={-8} width={4.5} height={16} rx={1.5} fill={`url(#${k.id("tipS")})`} opacity={0.9} />)}
        <rect x={0} y={-9} width={34} height={18} rx={2} fill={`url(#${k.id("tipS")})`} stroke="#6E7784" strokeWidth={0.8} />
        <rect x={6} y={-9} width={1.4} height={18} fill="#6E7784" />
        <ellipse cx={34} cy={0} rx={5.5} ry={9} fill="#3B414A" stroke="#6E7784" strokeWidth={0.8} />
        <ellipse cx={34.5} cy={0} rx={2.6} ry={4.4} fill="#0C1525" />
        <ellipse cx={34} cy={-1.5} rx={1} ry={1.6} fill="#9DB8FF" opacity={0.8} />
        {[-6.5, 6.5].map((y) => <circle key={y} cx={34.6} cy={y} r={1.3} fill="#FFFBE6" />)}
        <circle cx={50} cy={0} r={22} fill={`url(#${k.id("led")})`} opacity={0.75} />
      </g>
      {/* handset: strain relief, grip, control face, screen housing */}
      <path d="M210 410 L238 410 L232 432 L216 432 Z" fill="#14171B" />
      <path d="M168 230 Q164 250 172 290 L190 410 Q194 418 224 418 Q254 418 258 410 L276 290 Q284 250 280 230 Z" fill={`url(#${k.id("body")})`} />
      {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${190 + i * 1.2} ${330 + i * 14} H${258 - i * 1.2}`} stroke="#0B0D10" strokeWidth={4} opacity={0.6} />)}
      {/* screen housing with yellow corner bumpers */}
      <rect x={120} y={62} width={208} height={176} rx={16} fill={`url(#${k.id("body")})`} />
      {[[120, 62], [298, 62], [120, 208], [298, 208]].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width={30} height={30} rx={12} fill={`url(#${k.id("bump")})`} />)}
      <rect x={130} y={72} width={188} height={156} rx={10} fill="#111418" />
      <rect x={138} y={80} width={172} height={124} rx={3} fill="#05070A" />
      {/* screen image: looking down a bore, with a pit circled */}
      <g>
        <clipPath id={k.id("scr")}><rect x={140} y={82} width={168} height={120} /></clipPath>
        <g clipPath={`url(#${k.id("scr")})`}>
          <rect x={140} y={82} width={168} height={120} fill={`url(#${k.id("bore")})`} />
          {[30, 48, 70].map((r) => <ellipse key={r} cx={224} cy={142} rx={r * 1.25} ry={r} fill="none" stroke="#E8D9BF" strokeWidth={0.8} opacity={0.4} />)}
          <path d="M262 168 q6 -4 10 2 q-3 6 -10 -2z" fill="#3A2614" />
          <circle cx={267} cy={168} r={12} fill="none" stroke="#FF5252" strokeWidth={1.6} />
          <path d="M218 142 h12 M224 136 v12" stroke="#7CF0A8" strokeWidth={1} />
        </g>
        <rect x={140} y={82} width={168} height={14} fill="#000000" opacity={0.45} />
        <Mark x={146} y={92} t="×2" s={8} a="start" c="#FFFFFF" w={700} />
        <Mark x={302} y={92} t="0.8 mm" s={8} a="end" c="#7CF0A8" w={700} />
        <rect x={140} y={82} width={168} height={120} fill="none" stroke="#2A2F36" />
        <path d="M150 84 L210 84 L160 150 L142 150 Z" fill="#FFFFFF" opacity={0.06} />
      </g>
      {/* buttons under the screen */}
      {[160, 196, 252, 288].map((x, i) => <rect key={x} x={x - 12} y={210} width={24} height={10} rx={4} fill={i === 3 ? "#D03B3B" : "#4A505A"} stroke="#0B0D10" strokeWidth={0.6} />)}
      {/* articulation joystick on the grip face */}
      <circle cx={224} cy={276} r={24} fill="#15181C" stroke="#4A505A" strokeWidth={1.2} />
      {[0, 90, 180, 270].map((d) => <path key={d} d="M224 256 l-4 6 h8 z" fill="#8C96A3" transform={`rotate(${d} 224 276)`} />)}
      <circle cx={224} cy={276} r={12} fill={k.m("knob")} stroke="#0B0D10" strokeWidth={1} />
      <circle cx={221} cy={272} r={4} fill="#FFFFFF" opacity={0.18} />
      <Callout n={1} x={190} y={120} bx={70} by={110} />
      <Callout n={2} x={238} y={270} bx={110} by={300} />
      <Callout n={3} x={420} y={448} bx={380} by={360} />
      <Callout n={4} x={tx + 20 * ux} y={ty + 20 * uy} bx={700} by={70} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Ventilated brake disc in 3/4 view: machined friction ring, vane rim, painted hat with bore and studs.
function BrakeDisc() {
  const k = useKit((id) => <>
    {rg(id("face"), [[0, "#F2F4F7"], [0.55, "#C4CBD3"], [0.8, "#E7EAEE"], [1, "#A5AEB9"]], 0.42, 0.3, 0.75)}
    {lg(id("hatTop"), [[0, "#7A828C"], [1, "#4D545D"]])}
    {lg(id("hatSide"), [[0, "#3A4048"], [0.3, "#6E7680"], [0.6, "#4E555E"], [1, "#2F343B"]], false)}
    {lg(id("rim"), [[0, "#3F454D"], [0.25, "#9AA3AE"], [0.5, "#C9D0D8"], [0.8, "#7C8693"], [1, "#4A515A"]], false)}
    {lg(id("wall"), [[0, "#7C8693"], [1, "#2A2F36"]])}
  </>);
  const cx = 400, cy = 236, R = 255, s = 0.4, T = 42, H = 58, Rh = 130, Ri = 158;
  const ry = R * s;
  const band = (r: number, y0: number, y1: number) => `M${cx + r} ${cy + y0} A${r} ${r * s} 0 0 1 ${cx - r} ${cy + y0} L${cx - r} ${cy + y1} A${r} ${r * s} 0 0 0 ${cx + r} ${cy + y1} Z`;
  const vanes: ReactNode[] = [];
  for (let i = 0; i < 40; i++) {
    const p = rad(4.5 + i * 9);
    if (Math.sin(p) <= 0.05) continue;
    const x = cx + R * Math.cos(p), y = cy + ry * Math.sin(p), w = 6.5 * Math.sin(p);
    vanes.push(<rect key={i} x={x - w / 2} y={y + 13} width={w} height={T - 26} fill="#A5AEB9" />);
    vanes.push(<rect key={`h${i}`} x={x - w / 2} y={y + 13} width={w * 0.35} height={T - 26} fill="#E4E8ED" />);
  }
  const hole = (x: number, y: number, r: number, depth: number, key: string) => (
    <g key={key}>
      <ellipse cx={x} cy={y} rx={r} ry={r * s} fill={`url(#${k.id("wall")})`} />
      <clipPath id={k.id("c" + key)}><ellipse cx={x} cy={y} rx={r} ry={r * s} /></clipPath>
      <ellipse cx={x} cy={y + depth} rx={r} ry={r * s} fill="#14171B" clipPath={`url(#${k.id("c" + key)})`} />
      <ellipse cx={x} cy={y} rx={r} ry={r * s} fill="none" stroke="#C9D0D8" strokeWidth={1.2} />
    </g>
  );
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={cx} cy={cy + ry + T + 8} rx={R} ry={22} o={0.4} />
      {/* rim: two friction plates with vanes between */}
      <path d={band(R, 0, T)} fill={`url(#${k.id("rim")})`} stroke="#4A515A" strokeWidth={1} />
      <path d={band(R - 0.5, 13, T - 13)} fill="#15181C" />
      {vanes}
      <path d={band(R - 0.5, 13, 14.5)} fill="#000000" opacity={0.25} />
      {/* friction face with turning marks */}
      <ellipse cx={cx} cy={cy} rx={R} ry={ry} fill={`url(#${k.id("face")})`} stroke="#7C8693" strokeWidth={1} />
      {Array.from({ length: 14 }, (_, i) => {
        const r = Ri + 8 + i * ((R - Ri - 14) / 13);
        return <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * s} fill="none" stroke={i % 2 ? "#FFFFFF" : "#8C96A3"} strokeWidth={0.6} opacity={0.5} />;
      })}
      <ellipse cx={cx} cy={cy} rx={R - 4} ry={ry - 1.6} fill="none" stroke="#FFFFFF" strokeWidth={1.2} opacity={0.7} />
      {/* unmachined groove between friction ring and hat */}
      <ellipse cx={cx} cy={cy} rx={Ri} ry={Ri * s} fill="#5D646D" stroke="#3E444C" strokeWidth={1} />
      <ellipse cx={cx} cy={cy + 3} rx={Ri - 10} ry={(Ri - 10) * s} fill="#454B53" />
      {/* hat: side wall and top flange */}
      <path d={`M${cx + Rh} ${cy - H} A${Rh} ${Rh * s} 0 0 1 ${cx - Rh} ${cy - H} L${cx - Rh} ${cy} A${Rh} ${Rh * s} 0 0 0 ${cx + Rh} ${cy} Z`} fill={`url(#${k.id("hatSide")})`} stroke="#2F343B" strokeWidth={1} />
      <ellipse cx={cx} cy={cy - H} rx={Rh} ry={Rh * s} fill={`url(#${k.id("hatTop")})`} stroke="#2F343B" strokeWidth={1} />
      <ellipse cx={cx} cy={cy - H} rx={Rh - 5} ry={(Rh - 5) * s} fill="none" stroke="#9AA3AE" strokeWidth={0.8} opacity={0.6} />
      {Array.from({ length: 5 }, (_, i) => {
        const p = rad(-90 + i * 72 + 18);
        return hole(cx + 96 * Math.cos(p), cy - H + 96 * s * Math.sin(p), 12, 7, `s${i}`);
      })}
      {hole(cx, cy - H, 56, 34, "bore")}
      <ellipse cx={cx} cy={cy - H} rx={60} ry={24} fill="none" stroke="#8C96A3" strokeWidth={2} opacity={0.7} />
      {/* cast minimum thickness marking on the hat wall */}
      <Mark x={cx - 40} y={cy + 30} t="MIN TH 26.0" s={11} c="#1B1F25" w={800} />
      <Mark x={cx - 40} y={cy + 29} t="MIN TH 26.0" s={11} c="#B9C1CB" w={800} />
      <Callout n={1} x={cx + 200} y={cy + 30} bx={720} by={150} />
      <Callout n={2} x={cx - 190} y={cy + ry * 0.7 + 21} bx={110} by={430} />
      <Callout n={3} x={cx - 110} y={cy - 30} bx={150} by={110} />
      <Callout n={4} x={cx + 20} y={cy - H - 10} bx={470} by={50} />
      <Callout n={5} x={cx - 56} y={cy - H - 31} bx={300} by={50} />
      <Callout n={6} x={cx - 40} y={cy + 38} bx={cx - 40} by={470} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Turned shaft (axle stub): thread, undercut, ground bearing seat, shoulder, body with keyway, journal.
function DriveShaft() {
  const k = useKit((id) => <>
    {lg(id("face"), [[0, "#D5DBE2"], [1, "#9AA3AE"]], false)}
    {lg(id("ground"), [[0, "#FFFFFF"], [0.22, "#C3CAD3"], [0.45, "#F7F9FB"], [0.7, "#7E8895"], [1, "#B3BCC6"]])}
    {lg(id("kw"), [[0, "#2A2F36"], [0.6, "#5A626D"], [1, "#9AA3AE"]])}
  </>);
  const c = 250, e = 0.2; // axis, end-face ellipse ratio
  const cyl = (x1: number, x2: number, r: number, fill: string, key: string) => (
    <path key={key} d={`M${x1} ${c - r} H${x2} A${r * e} ${r} 0 0 1 ${x2} ${c + r} H${x1} A${r * e} ${r} 0 0 1 ${x1} ${c - r} Z`} fill={fill} stroke="#6E7784" strokeWidth={1} />
  );
  const face = (x: number, r: number, key: string) => <ellipse key={key} cx={x} cy={c} rx={r * e} ry={r} fill={`url(#${k.id("face")})`} stroke="#6E7784" strokeWidth={1} />;
  // thread: M24×1.5 shown as slanted crests
  const thX1 = 112, thX2 = 202, thR = 34, pitch = 7;
  const crests: ReactNode[] = [];
  for (let x = thX1 + 8; x < thX2; x += pitch) crests.push(<path key={x} d={`M${x} ${c - thR} L${x + pitch / 2} ${c + thR}`} stroke="#5E6773" strokeWidth={2.2} opacity={0.75} />);
  for (let x = thX1 + 8; x < thX2; x += pitch) crests.push(<path key={`h${x}`} d={`M${x + 2.4} ${c - thR} L${x + 2.4 + pitch / 2} ${c + thR}`} stroke="#FFFFFF" strokeWidth={1} opacity={0.6} />);
  const zig = (y: number, dir: number) => {
    let d = `M${thX1 + 8} ${y}`;
    for (let x = thX1 + 8; x < thX2 - 2; x += pitch) d += ` L${x + pitch / 2} ${y - dir * 2.6} L${x + pitch} ${y}`;
    return d;
  };
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={405} cy={340} rx={300} ry={12} o={0.35} />
      {/* thread with chamfered start */}
      <path d={`M${thX1 + 8} ${c - thR} H${thX2} V${c + thR} H${thX1 + 8} L${thX1} ${c + thR - 7} V${c - thR + 7} Z`} fill={k.m("steel")} stroke="#6E7784" strokeWidth={1} />
      <clipPath id={k.id("th")}><rect x={thX1 + 8} y={c - thR} width={thX2 - thX1 - 8} height={2 * thR} /></clipPath>
      <g clipPath={`url(#${k.id("th")})`}>{crests}</g>
      <path d={zig(c - thR, 1)} fill="none" stroke="#6E7784" strokeWidth={1} />
      <path d={zig(c + thR, -1)} fill="none" stroke="#6E7784" strokeWidth={1} />
      {/* undercut */}
      {cyl(thX2 - 2, 214, 29, k.m("steel"), "uc")}
      {/* ground bearing seat */}
      {cyl(212, 334, 44, `url(#${k.id("ground")})`, "seat")}
      <rect x={212} y={c - 44} width={122} height={88} fill={`url(#${k.id("brushed")})`} opacity={0.6} />
      {/* body with keyway */}
      {cyl(332, 562, 66, k.m("steel"), "body")}
      <path d={`M332 ${c - 66} H562`} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.9} />
      <rect x={332} y={c - 66} width={230} height={132} fill={`url(#${k.id("brushed")})`} opacity={0.5} />
      {face(562, 66, "bf")}
      <ellipse cx={562} cy={c} rx={66 * e - 3} ry={62} fill="none" stroke="#FFFFFF" strokeWidth={1} opacity={0.7} />
      <rect x={380} y={c - 17} width={142} height={34} rx={17} fill={`url(#${k.id("kw")})`} stroke="#3B414A" strokeWidth={1} />
      <rect x={388} y={c - 9} width={126} height={22} rx={11} fill="#7C8693" />
      <rect x={388} y={c - 9} width={126} height={6} rx={3} fill="#3B414A" opacity={0.6} />
      <path d={`M380 ${c + 0.5} A17 17 0 0 0 397 ${c + 17.5} H505 A17 17 0 0 0 522 ${c + 0.5}`} fill="none" stroke="#FFFFFF" strokeWidth={1.4} opacity={0.85} />
      {/* journal with chamfer and centre hole on the end face */}
      {cyl(560, 690, 46, k.m("steel"), "jr")}
      <rect x={560} y={c - 46} width={130} height={92} fill={`url(#${k.id("brushed")})`} opacity={0.5} />
      <ellipse cx={690} cy={c} rx={46 * e} ry={46} fill="#AEB7C2" stroke="#6E7784" strokeWidth={1} />
      <ellipse cx={692} cy={c} rx={39 * e} ry={39} fill={`url(#${k.id("face")})`} stroke="#6E7784" strokeWidth={0.8} />
      <ellipse cx={692.5} cy={c} rx={4.6} ry={16} fill="#8C96A3" stroke="#5E6773" strokeWidth={0.8} />
      <ellipse cx={693} cy={c} rx={2.2} ry={7} fill="#1B1F25" />
      <Callout n={1} x={272} y={c - 26} bx={250} by={120} />
      <Callout n={2} x={334} y={c - 52} bx={330} by={110} />
      <Callout n={3} x={150} y={c + 20} bx={110} by={380} />
      <Callout n={4} x={450} y={c + 4} bx={460} by={390} />
      <Callout n={5} x={696} y={c - 38} bx={735} by={140} />
      <Callout n={6} x={693} y={c + 2} bx={745} by={340} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Bronze bushing (standing) and hollow piston pin (lying), with dimension lines for the lengths.
function BushingPin() {
  const k = useKit((id) => <>
    {lg(id("bzV"), [[0, "#7A4E1C"], [0.3, "#E8B672"], [0.5, "#C68D45"], [0.8, "#F2CC8C"], [1, "#9A6326"]], false)}
    {lg(id("bzT"), [[0, "#F7D8A2"], [1, "#C99252"]])}
    {lg(id("bzIn"), [[0, "#C9914F"], [0.3, "#F1CB8C"], [0.6, "#8F5A22"], [1, "#5A3510"]], false)}
    {lg(id("pin"), [[0, "#FFFFFF"], [0.25, "#C4CBD4"], [0.5, "#F5F7FA"], [0.75, "#6E7784"], [1, "#A3ADB9"]])}
    {lg(id("pinIn"), [[0, "#3B414A"], [0.5, "#8C96A3"], [1, "#2A2F36"]])}
    {arrowDef(id)}
  </>);
  const bx = 250, by = 168, R = 92, r = 66, L = 160, s = 0.36; // bushing
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={bx} cy={by + L + 30} rx={115} ry={14} />
      <Shadow k={k} cx={575} cy={360} rx={170} ry={14} />
      {/* bushing body */}
      <path d={`M${bx - R} ${by} V${by + L} A${R} ${R * s} 0 0 0 ${bx + R} ${by + L} V${by} Z`} fill={`url(#${k.id("bzV")})`} stroke="#7A4E1C" strokeWidth={1} />
      <path d={`M${bx - R} ${by + L - 6} A${R} ${R * s} 0 0 0 ${bx + R} ${by + L - 6}`} fill="none" stroke="#FFFFFF" strokeWidth={1} opacity={0.35} />
      {/* lubrication hole */}
      <ellipse cx={bx + 18} cy={by + 70} rx={7} ry={8} fill="#4A2C0C" stroke="#E8B672" strokeWidth={1} />
      {/* top face with chamfers and bore */}
      <ellipse cx={bx} cy={by} rx={R} ry={R * s} fill={`url(#${k.id("bzT")})`} stroke="#7A4E1C" strokeWidth={1} />
      <ellipse cx={bx} cy={by} rx={R - 5} ry={(R - 5) * s} fill="none" stroke="#FFF2D6" strokeWidth={1.2} opacity={0.8} />
      <ellipse cx={bx} cy={by} rx={r + 5} ry={(r + 5) * s} fill="#E0AE68" />
      <ellipse cx={bx} cy={by} rx={r} ry={r * s} fill={`url(#${k.id("bzIn")})`} stroke="#7A4E1C" strokeWidth={1} />
      <clipPath id={k.id("bb")}><ellipse cx={bx} cy={by} rx={r} ry={r * s} /></clipPath>
      <ellipse cx={bx} cy={by + 26} rx={r} ry={r * s} fill="#3A220A" opacity={0.85} clipPath={`url(#${k.id("bb")})`} />
      {/* oil groove visible inside the bore */}
      <path d={`M${bx - 30} ${by - r * s + 6} Q${bx} ${by - r * s + 16} ${bx + 34} ${by - r * s + 4}`} fill="none" stroke="#6E4312" strokeWidth={2.4} clipPath={`url(#${k.id("bb")})`} />
      {/* dimension: bushing length and OD */}
      <path d={`M${bx - R - 4} ${by} H${bx - R - 30} M${bx - R - 4} ${by + L} H${bx - R - 30}`} stroke="#4B5563" strokeWidth={0.8} />
      <Dim k={k} x1={bx - R - 22} y1={by + 2} x2={bx - R - 22} y2={by + L - 2} />
      <path d={`M${bx - R} ${by + L + 12} V${by + L + 50} M${bx + R} ${by + L + 12} V${by + L + 50}`} stroke="#4B5563" strokeWidth={0.8} />
      <Dim k={k} x1={bx - R + 2} y1={by + L + 44} x2={bx + R - 2} y2={by + L + 44} />
      {/* piston pin: hollow, chamfered, lying at an angle */}
      <g transform="translate(575 285) rotate(-16)">
        <path d="M-150 -46 H150 A18 46 0 0 1 150 46 H-150 Z" fill={`url(#${k.id("pin")})`} stroke="#6E7784" strokeWidth={1} />
        <rect x={-150} y={-46} width={300} height={92} fill={`url(#${k.id("brushed")})`} opacity={0.6} />
        <ellipse cx={-150} cy={0} rx={18} ry={46} fill="#C9D0D8" stroke="#6E7784" strokeWidth={1} />
        <ellipse cx={-149} cy={0} rx={15} ry={40} fill="#E4E8ED" stroke="#8C96A3" strokeWidth={0.8} />
        <ellipse cx={-149} cy={0} rx={10.5} ry={27} fill={`url(#${k.id("pinIn")})`} stroke="#5E6773" strokeWidth={0.8} />
        <ellipse cx={-147} cy={3} rx={7} ry={20} fill="#15181C" />
        {/* length dimension along the axis */}
        <path d="M-168 52 V84 M168 52 V84" stroke="#4B5563" strokeWidth={0.8} />
        <Dim k={k} x1={-166} y1={76} x2={166} y2={76} />
      </g>
      <Callout n={1} x={bx + 30} y={by - 8} bx={330} by={70} />
      <Callout n={2} x={bx + 40} y={by + L + 44} bx={bx + 80} by={465} />
      <Callout n={3} x={bx - R - 22} y={by + 100} bx={90} by={330} />
      <Callout n={4} x={640} y={250} bx={690} by={150} />
      <Callout n={5} x={428} y={330} bx={392} by={250} />
      <Callout n={6} x={610} y={355} bx={660} by={445} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Packaging components: crown cork, PET preform, can end, screw cap with tamper band, glass finish.
function PackagingSamples() {
  const k = useKit((id) => <>
    {lg(id("pet"), [[0, "#8FC3E8", 0.75], [0.25, "#E6F4FF", 0.6], [0.5, "#B5DAF2", 0.55], [0.8, "#6FA9D6", 0.75], [1, "#4E8FC4", 0.85]], false)}
    {lg(id("amber"), [[0, "#4A2306"], [0.25, "#A8580F"], [0.45, "#D98B2E"], [0.7, "#7A3B08"], [1, "#3A1A04"]], false)}
    {lg(id("capB"), [[0, "#1B4FB0"], [0.3, "#5C93F0"], [0.55, "#2F6FDB"], [1, "#14398A"]], false)}
    {lg(id("crownS"), [[0, "#7E8895"], [0.3, "#F2F4F7"], [0.55, "#AEB7C2"], [1, "#6E7784"]], false)}
    {lg(id("canT"), [[0, "#FBFCFD"], [1, "#B7BFC9"]])}
    {rg(id("crownT"), [[0, "#F27B6E"], [0.7, "#C8261B"], [1, "#8E150D"]], 0.4, 0.3, 0.8)}
  </>);
  // crown cork with 21 flutes on the skirt
  const ccx = 120, ccy = 356, cR = 54, cs = 0.42, cH = 18;
  const flutes: ReactNode[] = [];
  for (let j = 0; j < 42; j++) {
    const p1 = (j / 42) * 2 * Math.PI, p2 = ((j + 1) / 42) * 2 * Math.PI;
    if (Math.sin((p1 + p2) / 2) <= 0) continue;
    const rb = cR + 3, dip = j % 2 ? 2.5 : 0;
    const pts: [number, number][] = [
      [ccx + cR * Math.cos(p1), ccy + cR * cs * Math.sin(p1)], [ccx + cR * Math.cos(p2), ccy + cR * cs * Math.sin(p2)],
      [ccx + rb * Math.cos(p2), ccy + cH + rb * cs * Math.sin(p2)], [ccx + rb * Math.cos((p1 + p2) / 2), ccy + cH + dip + rb * cs * Math.sin((p1 + p2) / 2)], [ccx + rb * Math.cos(p1), ccy + cH + rb * cs * Math.sin(p1)],
    ];
    const lit = 0.5 + 0.45 * Math.cos((p1 + p2) / 2 + 0.6);
    flutes.push(<path key={j} d={poly(pts)} fill={j % 2 ? lerpC("#5E6773", "#C9D0D8", lit) : lerpC("#9AA3AE", "#FFFFFF", lit)} stroke="#6E7784" strokeWidth={0.4} />);
  }
  // PET preform
  const px = 252, pt = 186;
  const thread: ReactNode[] = [];
  for (let i = 0; i < 3; i++) thread.push(<g key={i}>
    <path d={`M${px - 23} ${pt + 13 + i * 9} Q${px} ${pt + 19 + i * 9} ${px + 23} ${pt + 8 + i * 9}`} fill="none" stroke="#5E9BCF" strokeWidth={3.2} opacity={0.7} />
    <path d={`M${px - 22} ${pt + 12 + i * 9} Q${px} ${pt + 18 + i * 9} ${px + 22} ${pt + 7 + i * 9}`} fill="none" stroke="#FFFFFF" strokeWidth={1} opacity={0.8} />
  </g>);
  // screw cap
  const sx = 540, sy = 318, sR = 44;
  // glass bottle
  const gx = 676;
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={418} rx={340} ry={12} o={0.3} />
      {/* crown cork */}
      {flutes}
      <ellipse cx={ccx} cy={ccy} rx={cR} ry={cR * cs} fill={`url(#${k.id("crownT")})`} stroke="#8E150D" strokeWidth={1} />
      <ellipse cx={ccx} cy={ccy} rx={cR - 10} ry={(cR - 10) * cs} fill="none" stroke="#FFE7A8" strokeWidth={2} />
      <ellipse cx={ccx} cy={ccy} rx={cR - 2} ry={(cR - 2) * cs} fill="none" stroke="#FFFFFF" strokeWidth={1} opacity={0.35} />
      <ellipse cx={ccx - 14} cy={ccy - 9} rx={16} ry={3.5} fill="#FFFFFF" opacity={0.35} />
      {/* PET preform: neck finish with thread, tamper bead, support ring, body */}
      <path d={`M${px - 22} ${pt} V${pt + 38} H${px - 24} V${pt + 46} H${px - 22} V${pt + 62} L${px - 25} ${pt + 80} V${pt + 196} Q${px - 25} ${pt + 224} ${px} ${pt + 225} Q${px + 25} ${pt + 224} ${px + 25} ${pt + 196} V${pt + 80} L${px + 22} ${pt + 62} V${pt + 46} H${px + 24} V${pt + 38} H${px + 22} V${pt} Z`} fill={`url(#${k.id("pet")})`} stroke="#3E7FB8" strokeWidth={1} />
      {thread}
      <path d={`M${px - 16} ${pt + 4} V${pt + 66} L${px - 18} ${pt + 82} V${pt + 196} Q${px - 18} ${pt + 216} ${px} ${pt + 217} Q${px + 18} ${pt + 216} ${px + 18} ${pt + 196} V${pt + 82} L${px + 16} ${pt + 66} V${pt + 4}`} fill="none" stroke="#3E7FB8" strokeWidth={0.8} opacity={0.45} />
      <path d={`M${px - 11} ${pt + 86} V${pt + 196}`} stroke="#FFFFFF" strokeWidth={4} opacity={0.6} strokeLinecap="round" />
      <ellipse cx={px} cy={pt + 60} rx={36} ry={7} fill="#9CC7E6" stroke="#3E7FB8" strokeWidth={0.8} opacity={0.9} />
      <ellipse cx={px} cy={pt + 55} rx={36} ry={7} fill="#D7ECFA" stroke="#3E7FB8" strokeWidth={0.8} />
      <path d={`M${px - 22} ${pt + 55} V${pt + 62} M${px + 22} ${pt + 55} V${pt + 62}`} stroke="#3E7FB8" strokeWidth={0.8} />
      <rect x={px - 22} y={pt + 50} width={44} height={10} fill="#BFE0F5" opacity={0.7} />
      <ellipse cx={px} cy={pt} rx={22} ry={5} fill="#DFF0FB" stroke="#3E7FB8" strokeWidth={0.8} />
      <ellipse cx={px} cy={pt} rx={16} ry={3.6} fill="#8CBFE3" />
      <circle cx={px} cy={pt + 224} r={2.5} fill="#7DB2DE" />
      {/* can end: seam, countersink, panel, score line, stay-on tab */}
      <g>
        <path d="M324 364 A74 30 0 0 0 472 364 V372 A74 30 0 0 1 324 372 Z" fill={k.m("steel")} stroke="#8C96A3" strokeWidth={0.8} />
        <ellipse cx={398} cy={364} rx={74} ry={30} fill={`url(#${k.id("canT")})`} stroke="#6E7784" strokeWidth={1} />
        <ellipse cx={398} cy={364} rx={67} ry={27} fill="none" stroke="#8C96A3" strokeWidth={2.4} />
        <ellipse cx={398} cy={365.5} rx={62} ry={24.5} fill="#DDE2E8" stroke="#AEB7C2" strokeWidth={1} />
        <g transform="translate(396 366) scale(1 0.4) rotate(-62) scale(1.15)">
          <path d="M-22 14 Q-26 50 0 54 Q26 50 22 14 Q0 4 -22 14 Z" fill="#E4E8ED" stroke="#8C96A3" strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
          <path d="M-16 12 Q-18 -2 0 -6 Q18 -2 16 12 L13 -44 Q0 -58 -13 -44 Z" fill="none" />
          <path d="M-15 16 L-15 -36 Q-15 -54 0 -54 Q15 -54 15 -36 L15 16 Q15 26 0 26 Q-15 26 -15 16 Z" fill="#AEB7C2" stroke="#4A515A" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <path d="M-9 -12 L-9 -34 Q-9 -46 0 -46 Q9 -46 9 -34 L9 -12 Q9 -6 0 -6 Q-9 -6 -9 -12 Z" fill="#DDE2E8" stroke="#4A515A" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <circle cx={0} cy={6} r={5.5} fill="#C9D0D8" stroke="#6E7784" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </g>
      </g>
      {/* screw cap with tamper-evident band */}
      <g>
        <path d={`M${sx - sR} ${sy} V${sy + 52} A${sR} ${sR * 0.38} 0 0 0 ${sx + sR} ${sy + 52} V${sy} Z`} fill={`url(#${k.id("capB")})`} />
        {Array.from({ length: 26 }, (_, i) => {
          const x = sx - sR + 3 + i * ((2 * sR - 6) / 25);
          const yb = sy + 34 + Math.sqrt(Math.max(0, 1 - ((x - sx) / sR) ** 2)) * sR * 0.38;
          return <line key={i} x1={x} y1={sy + 6} x2={x} y2={yb} stroke="#0F2E6E" strokeWidth={1.2} opacity={0.55} />;
        })}
        {/* band gap with bridges */}
        <path d={`M${sx - sR} ${sy + 38} A${sR} ${sR * 0.38} 0 0 0 ${sx + sR} ${sy + 38}`} fill="none" stroke="#0A1F4A" strokeWidth={2.6} strokeDasharray="7 3" />
        <path d={`M${sx - sR} ${sy + 52} A${sR} ${sR * 0.38} 0 0 0 ${sx + sR} ${sy + 52}`} fill="none" stroke="#14398A" strokeWidth={1} />
        <ellipse cx={sx} cy={sy} rx={sR} ry={sR * 0.38} fill="#3E7DE6" stroke="#14398A" strokeWidth={1} />
        <ellipse cx={sx} cy={sy} rx={sR - 6} ry={(sR - 6) * 0.38} fill="#2F6FDB" />
        <ellipse cx={sx - 10} cy={sy - 3} rx={16} ry={3} fill="#FFFFFF" opacity={0.3} />
      </g>
      {/* glass bottle with crown finish */}
      <g>
        <path d={`M${gx - 12} 112 V122 Q${gx - 15} 126 ${gx - 13} 132 V182 Q${gx - 14} 222 ${gx - 34} 262 Q${gx - 42} 278 ${gx - 42} 298 V406 Q${gx - 42} 412 ${gx - 36} 412 H${gx + 36} Q${gx + 42} 412 ${gx + 42} 406 V298 Q${gx + 42} 278 ${gx + 34} 262 Q${gx + 14} 222 ${gx + 13} 182 V132 Q${gx + 15} 126 ${gx + 12} 122 V112 Z`} fill={`url(#${k.id("amber")})`} stroke="#3A1A04" strokeWidth={1} />
        <path d={`M${gx - 15} 104 H${gx + 15} Q${gx + 18} 108 ${gx + 16} 116 Q${gx + 15} 122 ${gx + 12} 122 H${gx - 12} Q${gx - 15} 122 ${gx - 16} 116 Q${gx - 18} 108 ${gx - 15} 104 Z`} fill={`url(#${k.id("amber")})`} stroke="#3A1A04" strokeWidth={1} />
        <ellipse cx={gx} cy={104} rx={15} ry={4.5} fill="#E9A65A" stroke="#7A3B08" strokeWidth={0.8} />
        <ellipse cx={gx} cy={104} rx={9} ry={2.6} fill="#2A1203" />
        <path d={`M${gx - 6} 136 V184 Q${gx - 8} 222 ${gx - 24} 258 Q${gx - 30} 274 ${gx - 30} 300 V398`} fill="none" stroke="#FFE3B8" strokeWidth={3} opacity={0.5} strokeLinecap="round" />
      </g>
      <Callout n={1} x={ccx + 34} y={ccy + 24} bx={150} by={250} />
      <Callout n={2} x={px + 22} y={pt + 22} bx={330} by={150} />
      <Callout n={3} x={386} y={357} bx={400} by={250} />
      <Callout n={4} x={sx + 30} y={sy + 44} bx={560} by={220} />
      <Callout n={5} x={gx + 10} y={103} bx={740} by={60} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Disc brake pad in 3/4 view: shim, steel backing plate with ears, friction block with chamfers,
// central slot and a spring-steel wear indicator.
function BrakePad() {
  const k = useKit((id) => <>
    <pattern key="fm" id={id("fm")} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(23) scale(0.8)">
      <rect width="10" height="10" fill="#4C4945" />
      <circle cx="2" cy="3" r="0.8" fill="#8C8F96" /><circle cx="7" cy="7" r="0.6" fill="#B4A47A" /><circle cx="6" cy="2" r="0.5" fill="#1A1C1F" /><circle cx="3" cy="8" r="0.7" fill="#6B6E74" />
    </pattern>
  </>);
  // Face-on outline (x along the pad, y across: negative = inner/back edge), projected in 3/4 view.
  const ox = 400, oy = 262, sx = 1.12, sv = 0.95;
  const P = (x: number, y: number, z: number): [number, number] => [ox + x * sx, oy + y * sv - z];
  const yOut = (x: number) => 72 - (x * x) / 1500, yIn = (x: number) => -62 - (x * x) / 1500;
  const span = (a: number, b: number, fn: (x: number) => number, z: number, n = 20) => Array.from({ length: n + 1 }, (_, i) => { const x = a + ((b - a) * i) / n; return P(x, fn(x), z); });
  const plateOutline = (z: number, ins = 0): [number, number][] => {
    const ear = (sg: number): [number, number][] => {
      const pts: [number, number][] = [P(sg * 232, -22 + ins, z), P(sg * 262, -22 + ins, z)];
      for (let i = 1; i < 10; i++) { const t = -Math.PI / 2 + (i / 10) * Math.PI; pts.push(P(sg * (262 + (22 - ins) * Math.cos(t)), (22 - ins) * Math.sin(t), z)); }
      pts.push(P(sg * 262, 22 - ins, z), P(sg * 236, 22 - ins, z));
      return sg > 0 ? pts : pts.reverse();
    };
    return [
      ...span(-220 + ins, 220 - ins, (x) => yIn(x) + ins, z),
      ...ear(1),
      ...span(234 - ins, -234 + ins, (x) => yOut(x) - ins, z),
      ...ear(-1),
    ];
  };
  const zP = 22, zF = 54, zC = 45; // top of plate, top of friction, start of chamfer
  const fric = (z: number): [number, number][] => {
    const A = z < zC ? 204 : 204 - (24 * (z - zC)) / (zF - zC);
    return [...span(-A, A, (x) => yIn(x) + 14, z, 16), ...span(A, -A, (x) => yOut(x) - 10, z, 16)];
  };
  const layers: ReactNode[] = [];
  for (let z = 0; z <= 8; z += 1) layers.push(<path key={`s${z}`} d={poly(plateOutline(z, 1))} fill={lerpC("#9AA3AE", "#EEF1F4", z / 8)} />);
  for (let z = 9; z < zP; z += 1) layers.push(<path key={`p${z}`} d={poly(plateOutline(z))} fill={lerpC("#16191D", "#2E333B", (z - 9) / 11)} />);
  layers.push(<path key="ptop" d={poly(plateOutline(zP))} fill={k.m("dark")} stroke="#6A727D" strokeWidth={0.9} />);
  for (let z = zP; z <= zF; z += 1.5) layers.push(<path key={`f${z}`} d={poly(fric(z))} fill={z < zC ? lerpC("#24221F", "#3A3733", (z - zP) / (zC - zP)) : lerpC("#6A655E", "#7A756D", (z - zC) / (zF - zC))} />);
  const top = fric(zF);
  const wa = P(216, yOut(216) - 1, zP), wb = P(216, yOut(216) - 1, zF + 4), wc = P(198, yOut(198) - 4, zF + 12);
  return (
    <g>
      {k.defs}
      <Shadow k={k} cx={400} cy={348} rx={320} ry={20} o={0.4} />
      {layers}
      {/* plate edge highlight along the front */}
      <path d={"M" + span(-234, 234, (x) => yOut(x), zP, 24).map(([x, y]) => `${f(x)} ${f(y)}`).join("L")} fill="none" stroke="#8C96A3" strokeWidth={1.2} opacity={0.7} />
      <path d={poly(top)} fill={`url(#${k.id("fm")})`} stroke="#8A847A" strokeWidth={1} />
      {/* chamfer edges */}
      {[-1, 1].map((sg) => <path key={sg} d={`M${P(sg * 180, yIn(180) + 14, zF).join(" ")} L${P(sg * 204, yIn(204) + 14, zC).join(" ")} M${P(sg * 180, yOut(180) - 10, zF).join(" ")} L${P(sg * 204, yOut(204) - 10, zC).join(" ")}`} stroke="#9A948A" strokeWidth={1} />)}
      {/* central slot across the friction face, continuing down the front */}
      <path d={poly([P(-3.5, yIn(0) + 14, zF), P(3.5, yIn(0) + 14, zF), P(3.5, yOut(0) - 10, zF), P(-3.5, yOut(0) - 10, zF)])} fill="#0B0C0E" />
      <path d={poly([P(-3.5, yOut(0) - 10, zF), P(3.5, yOut(0) - 10, zF), P(3.5, yOut(0) - 10, zP + 10), P(-3.5, yOut(0) - 10, zP + 10)])} fill="#0B0C0E" />
      {/* wear indicator: spring-steel tab riveted to the plate, tip bent towards the disc */}
      <path d={`M${f(wa[0] + 14)} ${f(wa[1] + 2)} L${f(wa[0])} ${f(wa[1])} L${f(wb[0])} ${f(wb[1])} L${f(wc[0])} ${f(wc[1])}`} fill="none" stroke="#E4E8ED" strokeWidth={6} strokeLinejoin="round" />
      <path d={`M${f(wa[0] + 14)} ${f(wa[1] + 2)} L${f(wa[0])} ${f(wa[1])} L${f(wb[0])} ${f(wb[1])} L${f(wc[0])} ${f(wc[1])}`} fill="none" stroke="#6E7784" strokeWidth={1} strokeLinejoin="round" />
      <circle cx={wa[0] + 10} cy={wa[1] + 1.5} r={2.4} fill="#C9D0D8" stroke="#6E7784" strokeWidth={0.6} />
      <Callout n={1} x={P(-262, 0, zP)[0]} y={P(-262, 0, zP)[1]} bx={70} by={190} />
      <Callout n={2} x={P(-90, 10, zF)[0]} y={P(-90, 10, zF)[1]} bx={250} by={90} />
      <Callout n={3} x={P(-192, 20, zF - 6)[0]} y={P(-192, 20, zF - 6)[1]} bx={120} by={330} />
      <Callout n={4} x={P(0, -20, zF)[0]} y={P(0, -20, zF)[1]} bx={430} by={70} />
      <Callout n={5} x={(wb[0] + wc[0]) / 2} y={(wb[1] + wc[1]) / 2} bx={720} by={170} />
      <Callout n={6} x={P(80, yOut(80) - 1, 4)[0]} y={P(80, yOut(80) - 1, 4)[1]} bx={520} by={430} />
    </g>
  );
}

export const ARTS_SHOP: Record<string, () => ReactElement> = {
  "nc-tags": NcTags,
  "quarantine-area": QuarantineArea,
  "inspection-booth": InspectionBooth,
  "borescope": Borescope,
  "brake-disc": BrakeDisc,
  "drive-shaft": DriveShaft,
  "bushing-pin": BushingPin,
  "packaging-samples": PackagingSamples,
  "brake-pad": BrakePad,
};
