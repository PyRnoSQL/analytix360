import { useState } from "react";
import { FileCode2, Loader2, Play, PlayCircle } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { CodeEditor, LabFrame } from "./LabFrame";

// Python runs in the browser with Pyodide, loaded from jsDelivr the first time a learner
// presses Run (about 15 MB with pandas, then cached by the browser).
const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/";

interface Pyodide {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (names: string[]) => Promise<void>;
  setStdout: (o: { batched: (s: string) => void }) => void;
  setStderr: (o: { batched: (s: string) => void }) => void;
  FS: { writeFile: (path: string, data: string) => void };
}
declare global { interface Window { loadPyodide?: (o: { indexURL: string }) => Promise<Pyodide> } }

let pyPromise: Promise<Pyodide> | null = null;
function loadPython(): Promise<Pyodide> {
  pyPromise ??= new Promise<Pyodide>((resolve, reject) => {
    const boot = () => window.loadPyodide ? window.loadPyodide({ indexURL: PYODIDE }).then(resolve, reject) : reject(new Error("Python could not start."));
    if (window.loadPyodide) { boot(); return; }
    const s = document.createElement("script");
    s.src = PYODIDE + "pyodide.js";
    s.onload = boot;
    s.onerror = () => { pyPromise = null; reject(new Error("Python could not be downloaded. Check your connection, or ask the site administrator to allow cdn.jsdelivr.net.")); };
    document.head.appendChild(s);
  });
  return pyPromise;
}
const loadedPackages = new Set<string>();

type Out = { text: string; html?: string; image?: string; error?: boolean };

// Wraps the learner's code so the last expression is displayed (DataFrames as tables)
// and any matplotlib figure is returned as a PNG.
const RUNNER = `
import sys, io, base64, json
def __ae_run(src):
    import ast
    tree = ast.parse(src, mode="exec")
    last = None
    if tree.body and isinstance(tree.body[-1], ast.Expr):
        last = ast.Expression(tree.body.pop().value)
    g = globals()
    exec(compile(tree, "<cell>", "exec"), g)
    out = {"html": None, "text": None, "image": None}
    if last is not None:
        v = eval(compile(last, "<cell>", "eval"), g)
        if v is not None:
            if hasattr(v, "to_html"):
                out["html"] = v.to_html(max_rows=30, border=0)
            else:
                out["text"] = repr(v)
    if "matplotlib.pyplot" in sys.modules:
        import matplotlib.pyplot as plt
        if plt.get_fignums():
            buf = io.BytesIO(); plt.savefig(buf, format="png", dpi=110, bbox_inches="tight"); plt.close("all")
            out["image"] = base64.b64encode(buf.getvalue()).decode()
    return json.dumps(out)
`;

export function PythonLab({ block, api }: { block: Extract<Block, { type: "python" }>; api: ProgressApi }) {
  const [cells, setCells] = useState<string[]>(block.cells);
  const [outs, setOuts] = useState<(Out | null)[]>(block.cells.map(() => null));
  const [busy, setBusy] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const done = !!api.progress.labs[block.id];

  const runCell = async (i: number): Promise<boolean> => {
    setBusy(i);
    try {
      if (!pyPromise) setStatus("Starting Python (first run downloads about 15 MB)…");
      const py = await loadPython();
      const need = (block.packages ?? []).filter((p) => !loadedPackages.has(p));
      if (need.length) { setStatus(`Loading ${need.join(", ")}…`); await py.loadPackage(need); need.forEach((p) => loadedPackages.add(p)); }
      setStatus("");
      for (const f of block.files ?? []) py.FS.writeFile(f.name, f.content);
      let printed = "";
      py.setStdout({ batched: (s) => { printed += s + "\n"; } });
      py.setStderr({ batched: (s) => { printed += s + "\n"; } });
      await py.runPythonAsync(RUNNER);
      const res = JSON.parse(String(await py.runPythonAsync(`__ae_run(${JSON.stringify(cells[i] ?? "")})`))) as { html: string | null; text: string | null; image: string | null };
      const out: Out = { text: (printed + (res.text ?? "")).trimEnd(), html: res.html ?? undefined, image: res.image ?? undefined };
      setOuts((o) => o.map((x, j) => (j === i ? out : x)));
      if (i === cells.length - 1) {
        const all = out.text + (out.html ?? "");
        if (!block.expect || all.includes(block.expect)) api.completeLab(block.id);
      }
      return true;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const clean = msg.includes("Traceback") ? msg.split("\n").filter((l) => !l.includes("pyodide") && !l.includes("<exec>") && !l.includes("__ae_run")).join("\n").trim() : msg;
      setOuts((o) => o.map((x, j) => (j === i ? { text: clean, error: true } : x)));
      setStatus("");
      return false;
    } finally {
      setBusy(null);
    }
  };
  const runAll = async () => { for (let i = 0; i < cells.length; i++) if (!(await runCell(i))) break; };

  return (
    <LabFrame icon={FileCode2} kind="Python notebook" title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setCells(block.cells); setOuts(block.cells.map(() => null)); }}
      onSolution={block.solution ? () => setCells((c) => c.map((x, i) => (i === c.length - 1 ? block.solution ?? x : x))) : undefined}
      footer={
        <button type="button" onClick={runAll} disabled={busy !== null} className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--acc)] px-4 py-2 text-sm font-bold text-[#11131A] hover:brightness-110 disabled:opacity-60">
          {busy !== null ? <Loader2 size={15} className="animate-spin" /> : <PlayCircle size={15} />} Run all
        </button>
      }>
      {(block.files?.length ?? 0) > 0 && (
        <p className="mb-3 text-sm text-[color:var(--muted)]">Files available to your code: {block.files?.map((f) => <code key={f.name} className="lms-code mr-1">{f.name}</code>)}</p>
      )}
      <ol className="grid gap-4">
        {cells.map((code, i) => {
          const out = outs[i];
          return (
            <li key={i} className="grid grid-cols-[3.2rem_1fr] gap-x-2 gap-y-2">
              <span className="lms-mono pt-3 text-right text-xs text-[color:var(--muted)]">In [{out ? i + 1 : " "}]:</span>
              <div className="relative">
                <CodeEditor id={`${block.id}-cell-${i}`} label={`Python cell ${i + 1}`} value={code} rows={Math.min(12, Math.max(3, code.split("\n").length + 1))}
                  onChange={(v) => setCells((c) => c.map((x, j) => (j === i ? v : x)))} onRun={() => void runCell(i)} />
                <button type="button" aria-label={`Run cell ${i + 1}`} onClick={() => void runCell(i)} disabled={busy !== null}
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg bg-white/[0.06] text-[color:var(--acc)] hover:bg-white/[0.12] disabled:opacity-50">
                  {busy === i ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />}
                </button>
              </div>
              {out && (
                <>
                  <span className="lms-mono pt-1 text-right text-xs text-[color:var(--muted)]">Out:</span>
                  <div className="lms-rise grid min-w-0 gap-2" data-no-translate>
                    {out.text && <pre className={`lms-mono lms-scroll overflow-x-auto whitespace-pre-wrap rounded-xl px-4 py-3 text-[0.82rem] leading-relaxed ${out.error ? "bg-rose-400/10 text-rose-100" : "bg-black/20 text-[#DCE3F2]"}`}>{out.text}</pre>}
                    {out.html && <div className="lms-pyhtml lms-scroll max-h-80 overflow-auto rounded-xl border border-[color:var(--line)]" dangerouslySetInnerHTML={{ __html: out.html }} />}
                    {out.image && <img alt="Chart produced by your code" src={`data:image/png;base64,${out.image}`} className="max-w-full rounded-xl bg-white" />}
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ol>
      {status && <p className="mt-3 flex items-center gap-2 text-sm text-[color:var(--muted)]"><Loader2 size={14} className="animate-spin" />{status}</p>}
      <p className="mt-3 text-xs text-[color:var(--muted)]">Cells share one Python session, like Jupyter. Press Ctrl + Enter inside a cell to run it.</p>
    </LabFrame>
  );
}
