import { useEffect, useMemo, useState } from "react";
import { Camera, Check, Circle, MapPin, Plus, Smartphone, Trash2, X } from "lucide-react";
import type { Block, XlsChoice, XlsColumn, XlsRow } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";
import { baseType, constraintOk, isRequired, listOf, norm, runCheck, runForm, type Values } from "./xlsform";
import { parse } from "./xpath";

// XLSForm lab: the learner edits the "survey" and "choices" sheets of a form, exactly as in
// Excel for KoboToolbox / ODK / SurveyCTO, and sees the form work live in a phone preview
// (skip logic, constraints, required questions, calculations).
type XBlock = Extract<Block, { type: "xlsform" }>;

const WIDTH: Record<XlsColumn, string> = {
  type: "min-w-[10rem]", name: "min-w-[8rem]", label: "min-w-[14rem]", required: "min-w-[5.5rem]", relevant: "min-w-[13rem]",
  constraint: "min-w-[12rem]", constraint_message: "min-w-[12rem]", calculation: "min-w-[13rem]", hint: "min-w-[12rem]",
};
const EXPR: XlsColumn[] = ["relevant", "constraint", "calculation"];
const copy = <T,>(x: T): T => JSON.parse(JSON.stringify(x)) as T;
const parses = (s = "") => { if (!s.trim()) return true; try { parse(s); return true; } catch { return false; } };

export function XlsFormLab({ block, api }: { block: XBlock; api: ProgressApi }) {
  const cols: XlsColumn[] = block.columns ?? ["type", "name", "label", "required", "relevant", "constraint"];
  const [rows, setRows] = useState<XlsRow[]>(() => copy(block.survey));
  const [choices, setChoices] = useState<XlsChoice[]>(() => copy(block.choices ?? []));
  const [tab, setTab] = useState<"survey" | "choices">("survey");
  const [answers, setAnswers] = useState<Values>({});
  const done = !!api.progress.labs[block.id];

  const results = useMemo(() => block.checks.map((c) => runCheck(c, rows, choices)), [block.checks, rows, choices]);
  const allOk = results.every(Boolean);
  const touched = JSON.stringify(rows) !== JSON.stringify(block.survey) || JSON.stringify(choices) !== JSON.stringify(block.choices ?? []);
  useEffect(() => { if (allOk && touched && !done) api.completeLab(block.id); }, [allOk, touched, done, api, block.id]);

  const form = useMemo(() => runForm(rows, answers), [rows, answers]);
  const setCell = (i: number, c: XlsColumn, v: string) => setRows((r) => r.map((row, j) => (j === i ? { ...row, [c]: v } : row)));
  const setChoice = (i: number, c: keyof XlsChoice, v: string) => setChoices((r) => r.map((row, j) => (j === i ? { ...row, [c]: v } : row)));
  const answer = (name: string, v: string) => setAnswers((a) => ({ ...a, [name]: v }));
  const cell = "lms-mono [font-variant-ligatures:none] w-full rounded-md border bg-[#0A0F1C] px-2 py-1.5 text-[0.8rem] text-white focus:border-[color:var(--acc-60)] focus:outline-none";

  return (
    <LabFrame icon={Smartphone} kind="XLSForm lab" level={block.level} title={block.title} task={block.task} done={done} hint={block.hint}
      onReset={() => { setRows(copy(block.survey)); setChoices(copy(block.choices ?? [])); setAnswers({}); }}
      onSolution={() => { setRows(copy(block.solution.survey)); setChoices(copy(block.solution.choices ?? block.choices ?? [])); setAnswers({}); }}>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(17rem,1fr)]">
        {/* Workbook */}
        <div className="min-w-0">
          <div role="tablist" aria-label="Sheets" className="mb-2 flex gap-1">
            {(["survey", "choices"] as const).map((t) => (
              <button key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => setTab(t)}
                className={`lms-mono rounded-t-lg border-b-2 px-3 py-1.5 text-sm ${tab === t ? "border-[color:var(--acc)] text-white" : "border-transparent text-[color:var(--muted)] hover:text-white"}`}>{t}</button>
            ))}
          </div>
          <div className="lms-scroll overflow-x-auto rounded-xl border border-[color:var(--line)]" data-no-translate>
            {tab === "survey" ? (
              <table className="w-full border-collapse text-left">
                <thead className="bg-[color:var(--raised)]"><tr>
                  <th className="lms-mono w-8 px-2 py-2 text-xs text-[color:var(--muted)]">#</th>
                  {cols.map((c) => <th key={c} className={`lms-mono px-2 py-2 text-xs font-bold text-[color:var(--muted)] ${WIDTH[c]}`}>{c}</th>)}
                  <th className="w-8" />
                </tr></thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t border-[color:var(--line)]">
                      <td className="lms-mono px-2 text-center text-xs text-[color:var(--muted)]">{i + 2}</td>
                      {cols.map((c) => {
                        const bad = (EXPR.includes(c) && !parses(r[c])) || (c === "type" && !!r.type?.trim() && !["begin_group", "end_group"].includes(baseType(r)) && !["text", "integer", "decimal", "select_one", "select_multiple", "date", "note", "calculate", "geopoint", "image"].includes(baseType(r)));
                        return (
                          <td key={c} className="p-1">
                            <input aria-label={`${c}, row ${i + 2}`} value={r[c] ?? ""} spellCheck={false} autoComplete="off" onChange={(e) => setCell(i, c, e.target.value)}
                              className={`${cell} ${bad ? "border-rose-400/70" : "border-transparent"}`} />
                          </td>
                        );
                      })}
                      <td className="p-1"><button type="button" aria-label={`Delete row ${i + 2}`} onClick={() => setRows((x) => x.filter((_, j) => j !== i))} className="grid h-7 w-7 place-items-center rounded-md text-[color:var(--muted)] hover:bg-white/[0.06] hover:text-rose-300"><Trash2 size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full border-collapse text-left">
                <thead className="bg-[color:var(--raised)]"><tr>
                  <th className="lms-mono w-8 px-2 py-2 text-xs text-[color:var(--muted)]">#</th>
                  {(["list_name", "name", "label"] as const).map((c) => <th key={c} className="lms-mono min-w-[9rem] px-2 py-2 text-xs font-bold text-[color:var(--muted)]">{c}</th>)}
                  <th className="w-8" />
                </tr></thead>
                <tbody>
                  {choices.map((r, i) => (
                    <tr key={i} className="border-t border-[color:var(--line)]">
                      <td className="lms-mono px-2 text-center text-xs text-[color:var(--muted)]">{i + 2}</td>
                      {(["list_name", "name", "label"] as const).map((c) => (
                        <td key={c} className="p-1"><input aria-label={`${c}, row ${i + 2}`} value={r[c]} spellCheck={false} autoComplete="off" onChange={(e) => setChoice(i, c, e.target.value)} className={`${cell} border-transparent`} /></td>
                      ))}
                      <td className="p-1"><button type="button" aria-label={`Delete choice ${i + 2}`} onClick={() => setChoices((x) => x.filter((_, j) => j !== i))} className="grid h-7 w-7 place-items-center rounded-md text-[color:var(--muted)] hover:bg-white/[0.06] hover:text-rose-300"><Trash2 size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <button type="button" onClick={() => (tab === "survey" ? setRows((r) => [...r, {}]) : setChoices((c) => [...c, { list_name: c[c.length - 1]?.list_name ?? "", name: "", label: "" }]))}
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[color:var(--acc)] hover:bg-white/[0.05]"><Plus size={15} /> Add a row</button>
          <p className="mt-1 text-xs text-[color:var(--muted)]">Refer to other questions as <code className="lms-code">{"${name}"}</code>. In a constraint, the dot <code className="lms-code">.</code> is the answer being checked. Cells with a formula error turn red.</p>
        </div>

        {/* Phone preview */}
        <div className="min-w-0">
          <div className="mx-auto w-full max-w-[20rem] rounded-[2rem] border border-[color:var(--line)] bg-[#05080F] p-2.5 shadow-2xl">
            <div className="flex items-center justify-between rounded-t-[1.5rem] bg-[color:var(--acc)] px-4 py-2.5 text-[#0B1320]">
              <span className="text-sm font-bold">Form preview</span>
              <button type="button" onClick={() => setAnswers({})} className="rounded-md bg-black/10 px-2 py-0.5 text-xs font-semibold hover:bg-black/20">Clear answers</button>
            </div>
            <div className="lms-scroll grid max-h-[30rem] content-start gap-3 overflow-y-auto rounded-b-[1.5rem] bg-[#F4F6FA] p-4 text-[#1B2230]" data-no-translate>
              {rows.map((r, i) => {
                if (!form.visible[i]) return null;
                const t = baseType(r), name = (r.name ?? "").trim(), label = r.label?.trim() || name || "(no label)";
                const v = answers[name] ?? "";
                const opts = choices.filter((c) => norm(c.list_name) === listOf(r));
                const con = constraintOk(r, v, form.values);
                const field = "w-full rounded-lg border border-[#CBD2DE] bg-white px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none";
                if (t === "begin_group") return <p key={i} className="border-b border-[#CBD2DE] pb-1 pt-1 text-xs font-bold uppercase tracking-wider text-[#4A5568]">{label}</p>;
                if (t === "note") return <p key={i} className="rounded-lg bg-[#E6ECF5] px-3 py-2 text-sm">{label}</p>;
                return (
                  <div key={i} className="grid gap-1.5">
                    <p className="text-sm font-semibold leading-snug">{label}{isRequired(r.required) && <span className="text-[#C53030]"> *</span>}</p>
                    {r.hint && <p className="-mt-1 text-xs text-[#5A6478]">{r.hint}</p>}
                    {t === "select_one" ? (
                      <div className="grid gap-1">{opts.map((o) => (
                        <label key={o.name} className="flex items-center gap-2 text-sm"><input type="radio" name={`${block.id}-${name}`} checked={v === o.name} onChange={() => answer(name, o.name)} />{o.label || o.name}</label>
                      ))}{!opts.length && <span className="text-xs text-[#C53030]">No choices found for list "{listOf(r)}"</span>}</div>
                    ) : t === "select_multiple" ? (
                      <div className="grid gap-1">{opts.map((o) => {
                        const set = v.split(" ").filter(Boolean), on = set.includes(o.name);
                        return <label key={o.name} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={on} onChange={() => answer(name, (on ? set.filter((x) => x !== o.name) : [...set, o.name]).join(" "))} />{o.label || o.name}</label>;
                      })}{!opts.length && <span className="text-xs text-[#C53030]">No choices found for list "{listOf(r)}"</span>}</div>
                    ) : t === "geopoint" ? (
                      <button type="button" onClick={() => answer(name, "4.0511 9.7679 12 5")} className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-[#1B2230] px-3 py-1.5 text-xs font-semibold text-white"><MapPin size={13} />{v ? "4.0511, 9.7679 (±5 m)" : "Record location"}</button>
                    ) : t === "image" ? (
                      <button type="button" onClick={() => answer(name, "photo.jpg")} className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-[#1B2230] px-3 py-1.5 text-xs font-semibold text-white"><Camera size={13} />{v ? "photo.jpg" : "Take picture"}</button>
                    ) : (
                      <input className={field} type={t === "date" ? "date" : "text"} inputMode={t === "integer" || t === "decimal" ? "decimal" : undefined} value={v}
                        onChange={(e) => answer(name, t === "integer" ? e.target.value.replace(/[^\d-]/g, "") : e.target.value)} aria-label={label} />
                    )}
                    {!con.ok && <p className="text-xs font-semibold text-[#C53030]">{r.constraint_message?.trim() || "Value not allowed"}</p>}
                  </div>
                );
              })}
              {!form.visible.some(Boolean) && <p className="text-sm text-[#5A6478]">No question to show yet.</p>}
            </div>
          </div>
          {rows.some((r) => baseType(r) === "calculate") && (
            <div className="mx-auto mt-3 w-full max-w-[20rem] rounded-xl border border-[color:var(--line)] px-3 py-2 text-xs text-[color:var(--muted)]">
              <p className="mb-1 font-semibold text-white">Calculated values</p>
              <ul className="lms-mono grid gap-0.5" data-no-translate>{rows.filter((r) => baseType(r) === "calculate").map((r, i) => <li key={i}>{r.name}: {form.values[(r.name ?? "").trim()] || "—"}</li>)}</ul>
            </div>
          )}
        </div>
      </div>

      {/* Checklist */}
      <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
        {block.checks.map((c, i) => (
          <li key={i} className={`flex items-start gap-2 text-sm ${results[i] ? "text-emerald-200" : "text-[color:var(--muted)]"}`}>
            {results[i] ? <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" /> : touched ? <X size={16} className="mt-0.5 shrink-0 text-rose-300/70" /> : <Circle size={16} className="mt-0.5 shrink-0" />}
            <span>{c.label}</span>
          </li>
        ))}
      </ul>
      {allOk && touched && <p className="lms-rise mt-3 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"><strong>Well done.</strong> Your form works. Try it in the preview.</p>}
    </LabFrame>
  );
}
