import { useEffect, useState } from "react";
import { Check, Circle, Minus, Plus, Presentation } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";

type SlideBlock = Extract<Block, { type: "slide" }>;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

export function SlideLab({ block, api }: { block: SlideBlock; api: ProgressApi }) {
  const [title, setTitle] = useState(block.slide.title);
  const [bullets, setBullets] = useState<string[]>(block.slide.bullets);
  const done = !!api.progress.labs[block.id];
  const { maxBullets, maxWords, titleMaxWords } = block.rules;

  const filled = bullets.filter((b) => b.trim());
  const longest = Math.max(0, ...filled.map(words));
  const checks = [
    { ok: words(title) > 0 && words(title) <= titleMaxWords, label: "Title length", value: `${words(title)} / ${titleMaxWords}` },
    { ok: filled.length > 0 && filled.length <= maxBullets, label: "Number of bullets", value: `${filled.length} / ${maxBullets}` },
    { ok: filled.length > 0 && longest <= maxWords, label: "Longest bullet (words)", value: `${longest} / ${maxWords}` },
  ];
  const allOk = checks.every((c) => c.ok);
  const changed = title !== block.slide.title || bullets.join("|") !== block.slide.bullets.join("|");
  useEffect(() => { if (allOk && changed && !done) api.completeLab(block.id); }, [allOk, changed, done, api, block.id]);

  return (
    <LabFrame icon={Presentation} kind="PowerPoint lab" title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setTitle(block.slide.title); setBullets(block.slide.bullets); }}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Editor */}
        <div className="grid content-start gap-3">
          <label htmlFor={`${block.id}-title`} className="text-sm font-semibold text-white">Slide title</label>
          <input id={`${block.id}-title`} value={title} onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-[color:var(--line)] bg-[#0A0F1C] px-3 py-2.5 text-white focus:border-[color:var(--acc-60)] focus:outline-none" />
          <p className="text-sm font-semibold text-white">Bullet points</p>
          {bullets.map((b, i) => (
            <div key={i} className="flex gap-2">
              <input id={`${block.id}-b${i}`} aria-label={`Bullet ${i + 1}`} value={b} onChange={(e) => setBullets((x) => x.map((v, j) => (j === i ? e.target.value : v)))}
                className={`min-w-0 flex-1 rounded-xl border bg-[#0A0F1C] px-3 py-2 text-sm text-white focus:outline-none ${words(b) > maxWords ? "border-rose-400/60" : "border-[color:var(--line)] focus:border-[color:var(--acc-60)]"}`} />
              <button type="button" aria-label={`Remove bullet ${i + 1}`} onClick={() => setBullets((x) => x.filter((_, j) => j !== i))}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[color:var(--muted)] hover:bg-white/[0.06] hover:text-white"><Minus size={16} /></button>
            </div>
          ))}
          <button type="button" onClick={() => setBullets((x) => [...x, ""])} className="inline-flex w-fit items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[color:var(--acc)] hover:bg-white/[0.05]"><Plus size={15} /> Add bullet</button>
        </div>
        {/* Live 16:9 preview */}
        <div className="grid content-start gap-3">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-white shadow-2xl" style={{ containerType: "inline-size" }} aria-label="Slide preview">
            <div className="flex h-full flex-col px-[7%] py-[6%]">
              <div className="mb-[4%] h-[3px] w-[12%] rounded-full bg-[color:var(--acc)]" />
              <p className="text-[5.2cqw] font-bold leading-tight text-[#14171F]" data-no-translate>{title || " "}</p>
              <ul className="mt-[4%] grid gap-[1.5cqw] pl-[4%] text-[3.1cqw] leading-snug text-[#2B3040]" data-no-translate>
                {filled.map((b, i) => <li key={i} className="list-disc marker:text-[color:var(--acc)]">{b}</li>)}
              </ul>
              <p className="mt-auto text-right text-[1.8cqw] text-[#8A90A0]">Analytix Engineering</p>
            </div>
          </div>
          <ul className="grid gap-1.5">
            {checks.map((c) => (
              <li key={c.label} className={`flex items-center gap-2 text-sm ${c.ok ? "text-emerald-200" : "text-[color:var(--muted)]"}`}>
                {c.ok ? <Check size={16} className="text-emerald-400" /> : <Circle size={16} />}
                <span className="flex-1">{c.label}</span>
                <span className="lms-mono tabular-nums">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LabFrame>
  );
}
