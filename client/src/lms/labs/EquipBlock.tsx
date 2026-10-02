import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Wrench, X } from "lucide-react";
import type { Block, EquipItem } from "../types";
import { rich } from "../blocks";
import { ARTS, CATALOG } from "./equip";
import { W, H } from "./equip/kit";

// Equipment gallery: detailed illustrations of instruments, gauges, lab equipment, products and
// quality tools, with numbered parts. Click a picture to enlarge it.
type EBlock = Extract<Block, { type: "equip" }>;

function Picture({ art, big }: { art: string; big?: boolean }) {
  const info = CATALOG[art];
  const Art = ARTS[art];
  return (
    <div className="relative overflow-hidden rounded-xl" style={{ background: "radial-gradient(120% 90% at 50% 30%, #FFFFFF 0%, #EEF1F5 45%, #D5DBE3 100%)" }}>
      {info?.photo ? <img src={info.photo} alt={info.name} className={`block w-full object-contain ${big ? "max-h-[70vh]" : "aspect-[8/5]"}`} loading="lazy" /> : (
        <svg viewBox={`0 0 ${W} ${H}`} className={`block w-full ${big ? "max-h-[70vh]" : ""}`} role="img" aria-label={info?.name ?? art} data-no-translate>
          {Art ? <Art /> : <text x={W / 2} y={H / 2} textAnchor="middle" fill="#6B7280" fontSize="20">{art}</text>}
        </svg>
      )}
    </div>
  );
}

function Parts({ parts, cols }: { parts: string[]; cols?: boolean }) {
  return (
    <ol className={`grid gap-x-4 gap-y-1.5 text-[0.85rem] ${cols ? "sm:grid-cols-2" : ""}`}>
      {parts.map((p, i) => (
        <li key={i} className="flex items-start gap-2 text-[#CDD4E3]">
          <span className="lms-mono mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#111827] text-[0.7rem] font-bold text-white ring-1 ring-white/60" data-no-translate>{i + 1}</span>
          <span className="min-w-0">{p}</span>
        </li>
      ))}
    </ol>
  );
}

function Card({ item, onOpen }: { item: EquipItem; onOpen: () => void }) {
  const info = CATALOG[item.art];
  const name = item.name ?? info?.name ?? item.art;
  return (
    <figure className="grid min-w-0 content-start gap-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] p-3 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-start">
      <button type="button" onClick={onOpen} className="group relative block w-full text-left" aria-label={`Enlarge: ${name}`}>
        <Picture art={item.art} />
        <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg bg-[#111827]/70 text-white opacity-80 transition group-hover:opacity-100"><Maximize2 size={15} /></span>
      </button>
      <figcaption className="grid min-w-0 gap-2 px-1 pb-1">
        <p className="font-bold leading-snug text-white">{name}</p>
        {item.caption && <p className="text-[0.88rem] leading-relaxed text-[color:var(--muted)]">{rich(item.caption)}</p>}
        {info && info.parts.length > 0 && <Parts parts={info.parts} />}
      </figcaption>
      {item.specs && item.specs.length > 0 && (
        <dl className="grid gap-x-4 gap-y-1.5 rounded-xl bg-white/[0.03] px-3 py-2.5 text-[0.85rem] sm:grid-cols-[minmax(9rem,max-content)_minmax(0,1fr)] md:col-span-2">
          {item.specs.map((s, i) => [<dt key={`t${i}`} className="text-[color:var(--muted)]">{s.label}</dt>, <dd key={`d${i}`} className="mb-1 font-semibold text-white sm:mb-0">{rich(s.value)}</dd>])}
        </dl>
      )}
    </figure>
  );
}

export function EquipBlock({ block }: { block: EBlock }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % block.items.length)); if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + block.items.length) % block.items.length)); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, block.items.length]);
  const n = block.items.length;
  const cur = open === null ? null : block.items[open];
  const curInfo = cur ? CATALOG[cur.art] : undefined;
  return (
    <section className="grid gap-3">
      {block.title && (
        <p className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[color:var(--acc)]"><Wrench size={14} /><span>{block.title}</span></p>
      )}
      <div className="grid gap-3">
        {block.items.map((it, i) => <Card key={i} item={it} onOpen={() => setOpen(i)} />)}
      </div>
      {cur && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#05080F]/90 p-3 sm:p-6" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <div className="lms-scroll grid max-h-full w-full max-w-6xl gap-4 overflow-y-auto rounded-2xl border border-[#2A3550] bg-[#131A2B] p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_20rem]" onClick={(e) => e.stopPropagation()}>
            <Picture art={cur.art} big />
            <div className="grid content-start gap-3">
              <div className="flex items-start gap-2">
                <p className="min-w-0 flex-1 text-lg font-bold leading-snug text-white">{cur.name ?? curInfo?.name}</p>
                <button type="button" onClick={() => setOpen(null)} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-white hover:bg-white/10" aria-label="Close"><X size={16} /></button>
              </div>
              {cur.caption && <p className="text-[0.9rem] leading-relaxed text-[#9AA6BD]">{rich(cur.caption)}</p>}
              {curInfo && <Parts parts={curInfo.parts} />}
              {n > 1 && <p className="lms-mono text-xs text-[#9AA6BD]" data-no-translate>{(open ?? 0) + 1} / {n} · ← →</p>}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
