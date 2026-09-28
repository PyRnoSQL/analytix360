import { useEffect, useRef, useState } from "react";
import { Keyboard } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";

// Asks for one shortcut at a time and listens for the real key combination.
// Cmd on a Mac counts as Ctrl. Only use shortcuts the browser lets a page intercept
// (Ctrl+B/I/U/E/L/R/J/Z/Y/S/P…, not Ctrl+N/T/W or anything with the Windows key).
const norm = (k: string) => {
  const map: Record<string, string> = { Control: "Ctrl", " ": "Space", Esc: "Escape", Del: "Delete" };
  const s = map[k] ?? k;
  return s.length === 1 ? s.toUpperCase() : s;
};
const comboOf = (e: KeyboardEvent) => {
  const parts: string[] = [];
  if (e.ctrlKey || e.metaKey) parts.push("Ctrl");
  if (e.altKey) parts.push("Alt");
  if (e.shiftKey) parts.push("Shift");
  const k = norm(e.key);
  if (!["Ctrl", "Alt", "Shift", "Meta"].includes(k)) parts.push(e.code.startsWith("Digit") ? e.code.slice(5) : k);
  return parts;
};
const same = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.map((y) => y.toUpperCase()).includes(x.toUpperCase()));

export function KeysTrainer({ block, api }: { block: Extract<Block, { type: "keys" }>; api: ProgressApi }) {
  const [i, setI] = useState(0);
  const [pressed, setPressed] = useState<string[]>([]);
  const [wrong, setWrong] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const done = !!api.progress.labs[block.id];
  const item = block.items[i];
  const finished = i >= block.items.length;

  useEffect(() => { if (finished && !done) api.completeLab(block.id); }, [finished, done, api, block.id]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !item) return;
    const onKey = (e: KeyboardEvent) => {
      const c = comboOf(e);
      if (c.length === 0 || (c.length === 1 && ["Ctrl", "Alt", "Shift"].includes(c[0] ?? ""))) return;
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.startsWith("F")) e.preventDefault();
      setPressed(c);
      if (same(c, item.keys)) { setWrong(false); setTimeout(() => { setI((x) => x + 1); setPressed([]); }, 450); }
      else setWrong(true);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [item]);

  return (
    <LabFrame icon={Keyboard} kind="Shortcut trainer" title={block.title} done={done}
      task="Click the practice pad, then press the shortcut for each action."
      onReset={() => { setI(0); setPressed([]); setWrong(false); }}>
      <div ref={ref} tabIndex={0} role="application" aria-label="Shortcut practice pad"
        onFocus={() => setActive(true)} onBlur={() => setActive(false)}
        className={`grid min-h-[11rem] place-items-center rounded-xl border-2 border-dashed p-6 text-center transition-colors focus:outline-none ${active ? "border-[color:var(--acc-60)] bg-[color:var(--acc-8)]" : "border-[color:var(--line)] bg-[#0A0F1C]"}`}>
        {finished ? (
          <div className="lms-rise"><p className="lms-display text-2xl font-semibold text-white">All shortcuts done!</p><p className="mt-1 text-sm text-[color:var(--muted)]">Press Reset to practise again.</p></div>
        ) : item ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--muted)]"><span className="lms-mono tabular-nums">{i + 1} / {block.items.length}</span></p>
            <p className="lms-display mt-2 text-2xl font-semibold text-white">{item.action}</p>
            <div className="mt-4 flex min-h-[2.2rem] flex-wrap items-center justify-center gap-1.5" data-no-translate>
              {pressed.length ? pressed.map((k, j) => <kbd key={j} className={`lms-kbd ${wrong ? "!border-rose-400/70" : "!border-emerald-400/70"}`}>{k}</kbd>) : <span className="text-sm text-[color:var(--muted)]">{active ? "Waiting for your keys…" : "Click here first"}</span>}
            </div>
            {wrong && <p className="lms-rise mt-3 text-sm text-rose-200">Not that one. Try again.</p>}
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex gap-1.5">{block.items.map((_, j) => <span key={j} className={`h-1.5 flex-1 rounded-full ${j < i ? "bg-emerald-400" : j === i ? "bg-[color:var(--acc)]" : "bg-white/[0.08]"}`} />)}</div>
    </LabFrame>
  );
}
