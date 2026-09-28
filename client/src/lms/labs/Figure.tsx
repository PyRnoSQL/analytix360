import { useEffect, useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";

// Built-in illustrations drawn for the course (no external images needed).
function ComputerArt() {
  return (
    <svg viewBox="0 0 800 450" className="block h-full w-full" aria-hidden>
      <rect width="800" height="450" fill="#10172A" />
      {/* monitor */}
      <rect x="40" y="40" width="360" height="230" rx="14" fill="#1C2640" stroke="#33415F" strokeWidth="3" />
      <rect x="58" y="58" width="324" height="180" rx="6" fill="#0B1222" />
      <rect x="74" y="74" width="120" height="10" rx="3" fill="#2B3A5E" /><rect x="74" y="94" width="200" height="8" rx="3" fill="#22304F" /><rect x="74" y="110" width="170" height="8" rx="3" fill="#22304F" />
      <rect x="200" y="270" width="40" height="40" fill="#26304A" /><rect x="150" y="306" width="140" height="12" rx="6" fill="#26304A" />
      {/* keyboard + mouse */}
      <rect x="40" y="350" width="330" height="60" rx="10" fill="#1C2640" stroke="#33415F" strokeWidth="2" />
      {Array.from({ length: 3 }, (_, r) => Array.from({ length: 12 }, (_, c) => <rect key={`${r}-${c}`} x={54 + c * 26} y={360 + r * 15} width="20" height="10" rx="2" fill="#2B3654" />))}
      <rect x="392" y="362" width="36" height="52" rx="18" fill="#1C2640" stroke="#33415F" strokeWidth="2" />
      {/* open tower */}
      <rect x="470" y="30" width="290" height="390" rx="16" fill="#151D33" stroke="#33415F" strokeWidth="3" />
      <rect x="490" y="50" width="250" height="250" rx="8" fill="#12382E" stroke="#1E5A48" strokeWidth="2" />
      <rect x="520" y="80" width="70" height="70" rx="6" fill="#2B3654" stroke="#8FA3C8" strokeWidth="2" /><text x="555" y="120" fill="#E7EBF3" fontSize="14" textAnchor="middle" fontFamily="monospace">CPU</text>
      <rect x="620" y="70" width="16" height="130" rx="3" fill="#3B7A57" /><rect x="646" y="70" width="16" height="130" rx="3" fill="#3B7A57" />
      <rect x="520" y="230" width="190" height="40" rx="6" fill="#2A2F3F" stroke="#566079" strokeWidth="2" />
      <rect x="500" y="320" width="120" height="80" rx="8" fill="#1F2740" stroke="#566079" strokeWidth="2" />
      <rect x="640" y="330" width="90" height="60" rx="6" fill="#262E44" stroke="#566079" strokeWidth="2" />
      <circle cx="685" cy="360" r="18" fill="none" stroke="#566079" strokeWidth="2" />
    </svg>
  );
}

function WordArt() {
  const tabs = ["File", "Home", "Insert", "Layout", "References", "Review", "View"];
  return (
    <svg viewBox="0 0 800 450" className="block h-full w-full" aria-hidden>
      <rect width="800" height="450" fill="#E9ECF2" />
      <rect width="800" height="34" fill="#185ABD" />
      <text x="400" y="22" fill="#FFFFFF" fontSize="13" textAnchor="middle" fontFamily="Segoe UI, sans-serif">2026-03-15_Rapport-activites-T1_v1.docx · Word</text>
      <rect x="14" y="10" width="36" height="14" rx="7" fill="#FFFFFF" opacity="0.9" /><circle cx="42" cy="17" r="5" fill="#185ABD" />
      <rect y="34" width="800" height="30" fill="#F3F4F7" />
      {tabs.map((t, i) => <text key={t} x={24 + i * 78} y="54" fill={t === "Home" ? "#185ABD" : "#3B3F4A"} fontSize="13" fontWeight={t === "Home" ? 700 : 400} fontFamily="Segoe UI, sans-serif">{t}</text>)}
      <rect x="100" y="60" width="44" height="3" fill="#185ABD" />
      <rect y="64" width="800" height="70" fill="#FFFFFF" stroke="#D8DCE4" />
      {[20, 150, 330, 520].map((x, i) => (
        <g key={x}>
          <rect x={x} y="72" width={[110, 160, 170, 240][i]} height="44" rx="4" fill="#F5F6F9" stroke="#E0E3EA" />
          <text x={x + ([110, 160, 170, 240][i] ?? 0) / 2} y="128" fill="#6B7080" fontSize="10" textAnchor="middle" fontFamily="Segoe UI, sans-serif">{["Clipboard", "Font", "Paragraph", "Styles"][i]}</text>
        </g>
      ))}
      {["Normal", "Heading 1", "Heading 2", "Title"].map((s, i) => <g key={s}><rect x={530 + i * 57} y="78" width="52" height="32" rx="3" fill="#FFFFFF" stroke="#D0D5DE" /><text x={556 + i * 57} y="98" fill="#2B2F3A" fontSize="9" textAnchor="middle" fontFamily="Segoe UI, sans-serif">{s}</text></g>)}
      <rect x="120" y="140" width="560" height="10" fill="#F7F8FA" stroke="#D8DCE4" />
      {Array.from({ length: 28 }, (_, i) => <line key={i} x1={130 + i * 20} x2={130 + i * 20} y1="143" y2={i % 2 ? 147 : 150} stroke="#9AA0AE" />)}
      <rect x="160" y="160" width="480" height="260" fill="#FFFFFF" stroke="#D0D5DE" />
      <rect x="200" y="190" width="220" height="14" rx="2" fill="#2F3A56" />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x="200" y={222 + i * 18} width={i % 3 === 2 ? 300 : 400} height="7" rx="2" fill="#C8CDD8" />)}
      <rect y="424" width="800" height="26" fill="#F3F4F7" stroke="#D8DCE4" />
      <text x="16" y="441" fill="#4B5060" fontSize="11" fontFamily="Segoe UI, sans-serif">Page 1 of 3   ·   842 words   ·   French (France)</text>
      <rect x="640" y="432" width="100" height="4" rx="2" fill="#C5CAD6" /><circle cx="690" cy="434" r="5" fill="#4B5060" /><text x="780" y="441" fill="#4B5060" fontSize="11" textAnchor="end" fontFamily="Segoe UI, sans-serif">100%</text>
    </svg>
  );
}

export function FigureBlock({ block, api }: { block: Extract<Block, { type: "figure" }>; api: ProgressApi }) {
  const [open, setOpen] = useState<number | null>(null);
  const [seen, setSeen] = useState<number[]>([]);
  const done = !!api.progress.labs[block.id];
  useEffect(() => { if (seen.length >= block.hotspots.length && !done) api.completeLab(block.id); }, [seen, block, done, api]);
  const hs = open !== null ? block.hotspots[open] : undefined;

  return (
    <LabFrame icon={ImageIcon} kind="Interactive picture" title={block.title} done={done}
      task="Click each numbered point to find out what it is.">
      <div className="relative overflow-hidden rounded-xl border border-[color:var(--line)]" style={{ aspectRatio: "16 / 9" }}>
        {block.art === "computer" ? <ComputerArt /> : <WordArt />}
        {block.hotspots.map((h, i) => (
          <button key={i} type="button" aria-label={h.label} onClick={() => { setOpen(i); setSeen((s) => (s.includes(i) ? s : [...s, i])); }}
            className={`absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-sm font-bold shadow-lg transition-transform hover:scale-110 ${
              open === i ? "border-white bg-[color:var(--acc)] text-[#11131A]" : seen.includes(i) ? "border-white/70 bg-emerald-400 text-[#06281C]" : "border-white bg-[color:var(--acc)] text-[#11131A]"}`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}>
            {!seen.includes(i) && open !== i && <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--acc)] opacity-40" />}
            <span className="relative">{i + 1}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-[5.5rem] rounded-xl border border-[color:var(--line)] bg-[color:var(--raised)] p-4">
        {hs ? (
          <div className="lms-rise flex items-start gap-3">
            <span className="lms-mono grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[color:var(--acc-15)] text-xs font-bold text-[color:var(--acc)]">{(open ?? 0) + 1}</span>
            <div className="flex-1"><p className="font-bold text-white">{hs.label}</p><p className="mt-1 text-[0.95rem] text-[color:#CDD4E3]">{hs.text}</p></div>
            <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="text-[color:var(--muted)] hover:text-white"><X size={16} /></button>
          </div>
        ) : (
          <p className="text-sm text-[color:var(--muted)]"><span className="lms-mono tabular-nums">{seen.length}/{block.hotspots.length}</span> explored</p>
        )}
      </div>
    </LabFrame>
  );
}
