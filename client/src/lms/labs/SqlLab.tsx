import { useRef, useState } from "react";
import { Database, Loader2, Play } from "lucide-react";
import type { Database as SqlDb, SqlJsStatic } from "sql.js";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { CodeEditor, LabFrame, ResultTable } from "./LabFrame";

type Result = { columns: string[]; rows: (string | number | null)[][] };

// sql.js (SQLite compiled to WebAssembly) is loaded the first time a learner runs a query.
let sqlPromise: Promise<SqlJsStatic> | null = null;
function loadSql(): Promise<SqlJsStatic> {
  sqlPromise ??= Promise.all([import("sql.js"), import("sql.js/dist/sql-wasm.wasm?url")]).then(
    ([mod, wasm]) => mod.default({ locateFile: () => wasm.default }),
  );
  return sqlPromise;
}

const toResult = (db: SqlDb, sql: string): Result => {
  const res = db.exec(sql);
  const last = res[res.length - 1];
  if (!last) return { columns: [], rows: [] };
  return { columns: last.columns, rows: last.values.map((r) => r.map((v) => (v instanceof Uint8Array ? "[blob]" : v))) };
};

const same = (a: Result, b: Result, ordered: boolean) => {
  if (a.columns.length !== b.columns.length || a.rows.length !== b.rows.length) return false;
  const norm = (r: (string | number | null)[]) => JSON.stringify(r.map((v) => (typeof v === "number" ? Math.round(v * 1e6) / 1e6 : v)));
  const x = a.rows.map(norm), y = b.rows.map(norm);
  if (!ordered) { x.sort(); y.sort(); }
  return x.every((v, i) => v === y[i]);
};

export function SqlLab({ block, api }: { block: Extract<Block, { type: "sql" }>; api: ProgressApi }) {
  const [code, setCode] = useState(block.starter);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [message, setMessage] = useState("");
  const [verdict, setVerdict] = useState<"match" | "differ" | null>(null);
  const done = !!api.progress.labs[block.id];
  const dbRef = useRef<SqlDb | null>(null);

  const run = async () => {
    setState("loading"); setMessage(""); setVerdict(null);
    try {
      const SQL = await loadSql();
      // A fresh copy of the sample data for every run, so mistakes never break the lab.
      dbRef.current?.close();
      const db = new SQL.Database();
      db.run(block.setup);
      dbRef.current = db;
      const mine = toResult(db, code);
      const check = new SQL.Database();
      check.run(block.setup);
      const expected = toResult(check, block.solution);
      check.close();
      setResult(mine);
      setState("ok");
      const ok = same(mine, expected, /order\s+by/i.test(block.solution));
      setVerdict(ok ? "match" : "differ");
      if (ok) api.completeLab(block.id);
      setMessage(`${mine.rows.length} row${mine.rows.length === 1 ? "" : "s"}`);
    } catch (e) {
      setState("error");
      setResult(null);
      setMessage(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <LabFrame icon={Database} kind="SQL lab" level={block.level} title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setCode(block.starter); setResult(null); setVerdict(null); setState("idle"); }}
      onSolution={() => setCode(block.solution)}
      footer={
        <button type="button" onClick={run} disabled={state === "loading"} className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--acc)] px-4 py-2 text-sm font-bold text-[#11131A] hover:brightness-110 disabled:opacity-60">
          {state === "loading" ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />} Run query
        </button>
      }>
      <details className="mb-3 text-sm text-[color:var(--muted)]">
        <summary className="cursor-pointer select-none hover:text-white">Show the sample tables</summary>
        <pre className="lms-mono lms-scroll mt-2 max-h-48 overflow-auto rounded-xl bg-[#0A0F1C] p-3 text-xs leading-relaxed text-[#9FB0CF]" data-no-translate>{block.setup}</pre>
      </details>
      <CodeEditor id={`${block.id}-code`} label="SQL query" value={code} onChange={setCode} onRun={run} rows={Math.min(10, Math.max(4, code.split("\n").length + 1))} />
      <p className="mt-2 text-xs text-[color:var(--muted)]">Press Ctrl + Enter to run.</p>
      {state === "error" && <p className="lms-rise mt-3 rounded-xl bg-rose-400/10 px-4 py-3 text-sm text-rose-100" data-no-translate>{message}</p>}
      {state === "ok" && result && (
        <div className="lms-rise mt-3 grid gap-2">
          {result.columns.length ? <ResultTable columns={result.columns} rows={result.rows} /> : <p className="text-sm text-[color:var(--muted)]">The query ran but returned no table.</p>}
          <p className={`text-sm ${verdict === "match" ? "text-emerald-300" : "text-[color:var(--muted)]"}`}>
            <span className="lms-mono tabular-nums">{message}</span>{" · "}
            {verdict === "match" ? "Correct: this is the expected result." : "Not the expected result yet. Compare with the task and try again."}
          </p>
        </div>
      )}
    </LabFrame>
  );
}
