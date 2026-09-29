import type { XlsCheck, XlsChoice, XlsRow } from "../types";
import { literalsOf, parse, refsOf, safeEval, truthy, type XEnv, type XVal } from "./xpath";

// Form model shared by the XLSForm lab: question types, visibility (relevant), calculations,
// constraints, and the checker that compares a learner's formula with the expected one by
// evaluating both over many combinations of answers (so "${age} >= 18" = "18 <= ${age}").

export const norm = (s = "") => s.trim().replace(/\s+/g, " ").toLowerCase();
export const baseType = (row: XlsRow) => norm(row.type).replace(/^begin group$/, "begin_group").replace(/^end group$/, "end_group").split(" ")[0] ?? "";
export const listOf = (row: XlsRow) => norm(row.type).split(" ")[1] ?? "";
export const isRequired = (v = "") => /^(yes|true|true\(\))$/i.test(v.trim());
export const QUESTION_TYPES = ["text", "integer", "decimal", "select_one", "select_multiple", "date", "note", "calculate", "geopoint", "image", "begin_group", "end_group"];

export type Values = Record<string, string>;

/** Which rows are visible, and the value of every field (answers + calculations; hidden fields count as empty). */
export function runForm(rows: XlsRow[], answers: Values) {
  const values: Values = {};
  const visible: boolean[] = [];
  const errors: (string | null)[] = [];
  const stack: boolean[] = [];
  const env: XEnv = { get: (n) => values[n] ?? "" };
  rows.forEach((r, i) => {
    const t = baseType(r);
    const inGroup = stack.every(Boolean);
    let rel = true, err: string | null = null;
    if ((r.relevant ?? "").trim()) { const e = safeEval(r.relevant ?? "", env); if (e.ok) rel = truthy(e.v); else { err = e.error; rel = true; } }
    if (t === "end_group") { stack.pop(); visible[i] = false; errors[i] = null; return; }
    if (t === "begin_group") { stack.push(inGroup && rel); visible[i] = inGroup && rel; errors[i] = err; return; }
    const show = inGroup && rel;
    visible[i] = show && t !== "calculate";
    const name = (r.name ?? "").trim();
    if (t === "calculate") {
      const e = safeEval(r.calculation ?? "", env);
      if (e.ok) values[name] = show ? toStr(e.v) : ""; else { values[name] = ""; err = err ?? e.error; }
    } else if (name) values[name] = show ? answers[name] ?? "" : "";
    errors[i] = err;
  });
  return { values, visible, errors };
}

const toStr = (v: XVal) => (typeof v === "boolean" ? (v ? "true" : "false") : typeof v === "number" ? (Number.isNaN(v) ? "" : String(Math.round(v * 1e6) / 1e6)) : v);

/** true / false / message when the answer breaks the constraint. */
export function constraintOk(row: XlsRow, value: string, values: Values): { ok: boolean; error?: string } {
  const c = (row.constraint ?? "").trim();
  if (!c || value === "") return { ok: true };
  const e = safeEval(c, { get: (n) => values[n] ?? "", self: value });
  if (!e.ok) return { ok: true, error: e.error };
  return { ok: truthy(e.v) };
}

// ── Equivalence checking ────────────────────────────────────────────────────
function domain(row: XlsRow | undefined, choices: XlsChoice[], lits: { nums: number[]; strs: string[] }): string[] {
  const t = row ? baseType(row) : "text";
  const names = choices.filter((c) => norm(c.list_name) === listOf(row ?? {})).map((c) => c.name.trim());
  const numbers = () => {
    const s = new Set<number>([0, 1, 25, 999, -1]);
    for (const n of lits.nums) { s.add(n - 1); s.add(n); s.add(n + 1); s.add(n - 0.5); }
    return ["", ...[...s].map(String)];
  };
  if (t === "select_one") return ["", ...names];
  if (t === "select_multiple") return ["", ...names, names.slice(0, 2).join(" "), names.slice(1, 3).join(" "), names.join(" ")].filter((v, i, a) => a.indexOf(v) === i);
  if (t === "integer" || t === "decimal" || t === "calculate" || t === "range") return numbers();
  if (t === "date") return ["", "2026-01-15"];
  // Text answers: include phone-like and code-like values so regex() constraints are really tested.
  return ["", "abc", "612345678", "699001122", "712345678", "61234567", "6123456789", "6 12 34 56 78", "+237612345678", "AB-123", ...lits.strs, ...numbers().slice(1, 4)].filter((v, i, a) => a.indexOf(v) === i);
}

function combos(domains: string[][], cap = 600): string[][] {
  const total = domains.reduce((n, d) => n * Math.max(1, d.length), 1);
  const out: string[][] = [];
  if (total <= cap) {
    const rec = (i: number, acc: string[]) => { if (i === domains.length) { out.push(acc); return; } for (const v of domains[i] ?? [""]) rec(i + 1, [...acc, v]); };
    rec(0, []);
    return out;
  }
  let seed = 7;
  const rnd = (n: number) => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed % n; };
  for (let k = 0; k < cap; k++) out.push(domains.map((d) => d[rnd(d.length)] ?? ""));
  return out;
}

/** Do two expressions behave the same for every tested combination of answers? */
export function sameLogic(mine: string, expected: string, rows: XlsRow[], choices: XlsChoice[], opts: { self?: XlsRow; asValue?: boolean } = {}): { ok: boolean; why?: string } {
  const a = mine.trim(), b = expected.trim();
  if (!a && !b) return { ok: true };
  if (!a) return { ok: false, why: "empty" };
  try { parse(a); } catch (e) { return { ok: false, why: e instanceof Error ? e.message : "formula error" }; }
  const byName = new Map(rows.map((r) => [(r.name ?? "").trim(), r]));
  const refs = [...new Set([...refsOf(a), ...refsOf(b)])];
  const unknown = refsOf(a).filter((r) => !byName.has(r));
  if (unknown.length) return { ok: false, why: `no question named ${unknown.join(", ")}` };
  const lits = literalsOf(a + " " + b);
  const usesSelf = /(^|[^.\w])\.(?![\w.])/.test(a + " " + b);
  const vars = [...refs, ...(usesSelf ? ["."] : [])];
  // ODK never checks a constraint on an empty answer, so "." is only tested with real values.
  const domains = vars.map((v) => (v === "." ? domain(opts.self, choices, lits).filter((x) => x !== "") : domain(byName.get(v), choices, lits)));
  for (const combo of combos(domains)) {
    const vals: Record<string, string> = {};
    vars.forEach((v, i) => { vals[v] = combo[i] ?? ""; });
    // A calculation is only judged when every answer it uses is filled in (ODK recalculates once answers exist).
    if (opts.asValue && vars.some((v) => (vals[v] ?? "") === "")) continue;
    const env: XEnv = { get: (n) => vals[n] ?? "", self: vals["."] ?? "" };
    const x = safeEval(a, env), y = safeEval(b, env);
    if (!x.ok) return { ok: false, why: x.error };
    if (!y.ok) continue;
    const same = opts.asValue ? toStr(x.v) === toStr(y.v) : truthy(x.v) === truthy(y.v);
    if (!same) return { ok: false, why: "gives a different result for some answers" };
  }
  return { ok: true };
}

export function runCheck(c: XlsCheck, rows: XlsRow[], choices: XlsChoice[]): boolean {
  if (c.kind === "choices") {
    const have = new Set(choices.filter((x) => norm(x.list_name) === norm(c.list)).map((x) => x.name.trim().toLowerCase()));
    return c.names.every((n) => have.has(n.toLowerCase()));
  }
  const row = rows.find((r) => (r.name ?? "").trim() === c.name);
  if (!row) return false;
  if (c.type !== undefined && norm(row.type) !== norm(c.type)) return false;
  if (c.required !== undefined && isRequired(row.required) !== c.required) return false;
  if (c.labelHas !== undefined && !norm(row.label).includes(norm(c.labelHas))) return false;
  if (c.relevant !== undefined && !sameLogic(row.relevant ?? "", c.relevant, rows, choices).ok) return false;
  if (c.constraint !== undefined && !sameLogic(row.constraint ?? "", c.constraint, rows, choices, { self: row }).ok) return false;
  if (c.calculation !== undefined && !sameLogic(row.calculation ?? "", c.calculation, rows, choices, { asValue: true }).ok) return false;
  return true;
}
