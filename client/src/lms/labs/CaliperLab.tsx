import { useEffect, useState } from "react";
import { Check, Ruler, X, ZoomIn, ZoomOut } from "lucide-react";
import type { Block, Unit } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";
import { EngDrawing, dimText } from "./EngDrawing";
import { STATUS } from "./qcolors";

// Measurement lab: an engineering drawing with the feature to measure highlighted, and a measuring
// instrument showing the measurement. The learner reads the instrument (vernier 0.02 mm, micrometer
// 0.01 mm, or a digital display converted to cm or m) and decides whether the part conforms.
type CBlock = Extract<Block, { type: "caliper" }>;
const RES = { vernier: 0.02, micrometer: 0.01, digital: 0.01 };
const toUnit = (mm: number, u: Unit) => (u === "m" ? mm / 1000 : u === "cm" ? mm / 10 : mm);
const num = (s: string) => { const n = Number(s.replace(",", ".").replace(/\s/g, "")); return s.trim() === "" || !Number.isFinite(n) ? NaN : n; };
const STEEL = "#D6DCE6", STEEL2 = "#B9C2D0", MARK = "#1B2433";

function Vernier({ value, zoom }: { value: number; zoom: boolean }) {
  const M = Math.floor(value + 1e-9), start = M - 4, end = M + 54, k = 13;
  const x = (mm: number) => 20 + (mm - start) * k, W = x(end) + 20;
  const main = [], vern = [];
  for (let m = Math.ceil(start); m <= end; m++) {
    const len = m % 10 === 0 ? 26 : m % 5 === 0 ? 18 : 11;
    main.push(<line key={m} x1={x(m)} x2={x(m)} y1={78} y2={78 - len} stroke={MARK} strokeWidth={1.1} />);
    if (m % 10 === 0 && m >= 0) main.push(<text key={`t${m}`} x={x(m)} y={42} textAnchor="middle" fontSize="13" fontWeight="700" fill={MARK}>{m / 10}</text>);
  }
  for (let i = 0; i <= 50; i++) {
    const p = value + i * 0.98, len = i % 5 === 0 ? 18 : 11;
    vern.push(<line key={i} x1={x(p)} x2={x(p)} y1={82} y2={82 + len} stroke={MARK} strokeWidth={1.1} />);
    if (i % 5 === 0) vern.push(<text key={`v${i}`} x={x(p)} y={116} textAnchor="middle" fontSize="12" fontWeight="700" fill={MARK}>{i / 5}</text>);
  }
  return (
    <div className="lms-scroll overflow-x-auto rounded-lg">
      <svg viewBox={`0 0 ${W} 132`} style={{ width: zoom ? `${W * 1.6}px` : "100%", minWidth: zoom ? undefined : "40rem" }} role="img" aria-label="Vernier caliper scale">
        <rect x={0} y={20} width={W} height={60} fill={STEEL} />
        <text x={6} y={34} fontSize="10" fill="#4A5568">cm</text>
        <rect x={x(value) - 14} y={80} width={x(value + 49) - x(value) + 28} height={46} rx={4} fill={STEEL2} />
        <text x={x(value + 49) + 6} y={100} fontSize="10" fill="#4A5568">0.02 mm</text>
        {main}{vern}
      </svg>
    </div>
  );
}

function Micrometer({ value, zoom }: { value: number; zoom: boolean }) {
  const S = Math.floor(value * 2 + 1e-9) / 2, t = Math.round((value - S) * 100);
  const k = 24, x = (mm: number) => 30 + mm * k, W = x(26) + 170, ref = 96;
  const ticks = [];
  for (let m = 0; m <= 25; m++) {
    if (x(m) > x(value)) break;
    ticks.push(<line key={m} x1={x(m)} x2={x(m)} y1={ref} y2={ref - (m % 5 === 0 ? 18 : 12)} stroke={MARK} strokeWidth={1.2} />);
    if (m % 5 === 0) ticks.push(<text key={`t${m}`} x={x(m)} y={ref - 24} textAnchor="middle" fontSize="12" fontWeight="700" fill={MARK}>{m}</text>);
    if (x(m + 0.5) <= x(value)) ticks.push(<line key={`h${m}`} x1={x(m + 0.5)} x2={x(m + 0.5)} y1={ref} y2={ref + 11} stroke={MARK} strokeWidth={1.2} />);
  }
  const th = [];
  for (let d = -6; d <= 6; d++) {
    const i = (t + d + 50) % 50, y = ref - d * 11;
    th.push(<line key={d} x1={x(value)} x2={x(value) + (i % 5 === 0 ? 24 : 14)} y1={y} y2={y} stroke={MARK} strokeWidth={1.2} />);
    if (i % 5 === 0) th.push(<text key={`n${d}`} x={x(value) + 30} y={y + 4} fontSize="12" fontWeight="700" fill={MARK}>{i}</text>);
  }
  return (
    <div className="lms-scroll overflow-x-auto rounded-lg">
      <svg viewBox={`0 0 ${W} 190`} style={{ width: zoom ? `${W * 1.5}px` : "100%", minWidth: zoom ? undefined : "36rem" }} role="img" aria-label="Micrometer scales">
        <rect x={10} y={ref - 40} width={x(value) - 10} height={80} fill={STEEL} />
        <line x1={10} x2={x(value)} y1={ref} y2={ref} stroke={MARK} strokeWidth={1.4} />
        {ticks}
        <rect x={x(value)} y={ref - 78} width={120} height={156} rx={10} fill={STEEL2} />
        <line x1={x(value)} x2={x(value)} y1={ref - 78} y2={ref + 78} stroke={MARK} strokeWidth={1.4} />
        {th}
        <text x={x(value) + 64} y={ref + 92} fontSize="10" fill="#4A5568">0.01 mm</text>
      </svg>
    </div>
  );
}

function Digital({ value }: { value: number }) {
  return (
    <div className="mx-auto grid w-full max-w-sm gap-2 rounded-2xl p-4" style={{ background: "linear-gradient(180deg,#2B3446,#1C2333)" }} role="img" aria-label="Digital caliper display">
      <div className="flex items-end justify-end gap-2 rounded-lg px-4 py-3" style={{ background: "#B7C9A4", boxShadow: "inset 0 2px 6px rgba(0,0,0,.35)" }}>
        <span className="lms-mono text-5xl font-bold tracking-wider text-[#1F2A18]">{value.toFixed(2)}</span><span className="lms-mono pb-1 text-lg font-bold text-[#1F2A18]">mm</span>
      </div>
      <div className="flex justify-between px-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#8A96B0]"><span>ON/OFF</span><span>ZERO</span><span>mm/in</span></div>
    </div>
  );
}

export function CaliperLab({ block, api }: { block: CBlock; api: ProgressApi }) {
  const dims = block.dims ?? [];
  const [idx, setIdx] = useState(0);
  const [reading, setReading] = useState("");
  const [conf, setConf] = useState<"" | "yes" | "no">("");
  const [checked, setChecked] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [log, setLog] = useState<{ label: string; value: string; ok: boolean | null }[]>([]);
  const done = !!api.progress.labs[block.id];
  const r = block.readings[idx];
  const finished = idx >= block.readings.length;
  useEffect(() => { if (finished && !done) api.completeLab(block.id); }, [finished, done, api, block.id]);

  const dim = r?.dim ? dims.find((d) => d.id === r.dim) : undefined;
  const unit: Unit = r?.answerUnit ?? "mm";
  const expected = r ? toUnit(r.value, unit) : 0;
  const tol = toUnit(RES[block.instrument] / 2 + 1e-9, unit);
  const readOk = r ? Math.abs(num(reading) - expected) <= tol : false;
  const inSpec = dim ? r!.value >= dim.nominal - (dim.tolMinus ?? 0) - 1e-9 && r!.value <= dim.nominal + (dim.tolPlus ?? 0) + 1e-9 : null;
  const askConf = !!(r?.conformity && dim);
  const confOk = !askConf || (conf !== "" && (conf === "yes") === inSpec);
  const next = () => {
    if (!r) return;
    setLog((l) => [...l, { label: dim ? `${dim.label} · ${dimText(dim, block.drawingUnit ?? "mm", false)}` : r.label ?? `#${idx + 1}`, value: `${Number(expected.toFixed(unit === "m" ? 5 : unit === "cm" ? 3 : 2))} ${unit}`, ok: askConf ? inSpec : null }]);
    setIdx((i) => i + 1); setReading(""); setConf(""); setChecked(false);
  };

  return (
    <LabFrame icon={Ruler} kind={block.instrument === "micrometer" ? "Micrometer lab" : block.instrument === "digital" ? "Digital caliper lab" : "Vernier caliper lab"} level={block.level} title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setIdx(0); setReading(""); setConf(""); setChecked(false); setLog([]); }}
      onSolution={r ? () => { setReading(String(Number(expected.toFixed(unit === "m" ? 5 : unit === "cm" ? 3 : 2)))); if (askConf) setConf(inSpec ? "yes" : "no"); } : undefined}>
      <div className="grid gap-4">
        {block.drawing && <EngDrawing drawing={block.drawing} dims={dims} unit={block.drawingUnit ?? "mm"} active={finished ? undefined : r?.dim} />}
        {!finished && r && (
          <div className="rounded-xl border border-[color:var(--line)] bg-[#0E1424] p-3">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="lms-mono rounded-md bg-[color:var(--acc-15)] px-2 py-0.5 text-xs font-bold text-[color:var(--acc)]">{idx + 1}/{block.readings.length}</span>
              <p className="flex-1 text-sm font-semibold text-white">{dim ? <><span>Measure dimension</span> <span className="lms-mono" style={{ color: "#F07A63" }} data-no-translate>{dim.label}</span></> : r.label}</p>
              {block.instrument !== "digital" && (
                <button type="button" onClick={() => setZoom((z) => !z)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-[color:var(--muted)] hover:bg-white/[0.06] hover:text-white">
                  {zoom ? <ZoomOut size={14} /> : <ZoomIn size={14} />}{zoom ? "Zoom out" : "Magnify"}
                </button>
              )}
            </div>
            <div className="rounded-lg bg-[#E9EDF3] p-2" data-no-translate>
              {block.instrument === "vernier" ? <Vernier value={r.value} zoom={zoom} /> : block.instrument === "micrometer" ? <Micrometer value={r.value} zoom={zoom} /> : <Digital value={r.value} />}
            </div>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <label className="grid gap-1 text-sm text-[color:var(--muted)]">
                <span>Your reading ({unit})</span>
                <input value={reading} inputMode="decimal" onChange={(e) => { setReading(e.target.value); setChecked(false); }} aria-label={`Reading in ${unit}`}
                  className={`lms-mono w-40 rounded-lg border bg-[#0A0F1C] px-3 py-2 text-white focus:outline-none ${checked ? (readOk ? "border-emerald-400/70" : "border-rose-400/70") : "border-[color:var(--line)] focus:border-[color:var(--acc-60)]"}`} />
              </label>
              {askConf && (
                <div className="grid gap-1 text-sm text-[color:var(--muted)]">
                  <span>Against <span className="lms-mono text-white" data-no-translate>{dimText(dim, block.drawingUnit ?? "mm", false)}</span></span>
                  <div className="flex gap-2">
                    {(["yes", "no"] as const).map((v) => (
                      <button key={v} type="button" onClick={() => { setConf(v); setChecked(false); }}
                        className={`rounded-lg border px-3 py-2 text-sm font-semibold ${conf === v ? (v === "yes" ? "border-emerald-400/70 bg-emerald-400/10 text-emerald-100" : "border-rose-400/70 bg-rose-400/10 text-rose-100") : "border-[color:var(--line)] text-[#DCE3F2] hover:bg-white/[0.05]"}`}>
                        {v === "yes" ? "Conforming" : "Nonconforming"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button type="button" onClick={() => (checked && readOk && confOk ? next() : setChecked(true))}
                className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--acc)] px-4 py-2 text-sm font-bold text-[#11131A] hover:brightness-110">
                <Check size={15} />{checked && readOk && confOk ? (idx + 1 < block.readings.length ? "Next measurement" : "Finish") : "Check"}
              </button>
            </div>
            {checked && (
              <p className={`lms-rise mt-2 text-sm ${readOk && confOk ? "text-emerald-200" : "text-rose-100"}`}>
                {!readOk ? (block.instrument === "vernier" ? "Not quite. Read the whole millimetres on the main scale to the left of the vernier 0, then find the vernier line that lines up exactly with a main-scale line (each line = 0.02 mm)." : block.instrument === "micrometer" ? "Not quite. Add the sleeve reading (whole and half millimetres visible) to the thimble line that meets the reference line (each line = 0.01 mm)." : `Not quite. Convert from millimetres: 1 cm = 10 mm and 1 m = 1 000 mm.`)
                  : !confOk ? "Your reading is right, but check it against the tolerance limits again." : "Correct."}
              </p>
            )}
          </div>
        )}
        {log.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-[color:var(--line)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[color:var(--raised)]"><tr><th className="px-3 py-2 text-xs text-[color:var(--muted)]">Feature</th><th className="px-3 py-2 text-xs text-[color:var(--muted)]">Measured</th><th className="px-3 py-2 text-xs text-[color:var(--muted)]">Result</th></tr></thead>
              <tbody>{log.map((l, i) => (
                <tr key={i} className="border-t border-[color:var(--line)]">
                  <td className="lms-mono px-3 py-1.5 text-[#DCE3F2]" data-no-translate>{l.label}</td>
                  <td className="lms-mono px-3 py-1.5 text-white" data-no-translate>{l.value}</td>
                  <td className="px-3 py-1.5">{l.ok === null ? <span className="text-[color:var(--muted)]">—</span> : l.ok
                    ? <span className="inline-flex items-center gap-1 font-semibold" style={{ color: STATUS.good }}><Check size={14} />OK</span>
                    : <span className="inline-flex items-center gap-1 font-semibold" style={{ color: "#F07A63" }}><X size={14} />NOK</span>}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        {finished && <p className="lms-rise rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"><strong>Well done.</strong> All measurements are recorded.</p>}
      </div>
    </LabFrame>
  );
}
