// A small spreadsheet formula engine for the Excel lab.
// Supports A1 references, ranges, + - * / ^ & %, comparisons, and common functions,
// with French Excel names as aliases (SOMME, MOYENNE, SI, RECHERCHEV, ...).

export type Value = number | string | boolean | FormulaError;
export class FormulaError { code: string; constructor(code: string) { this.code = code; } toString() { return this.code; } }
const ERR = { div0: "#DIV/0!", name: "#NAME?", ref: "#REF!", value: "#VALUE!", na: "#N/A", circ: "#CIRC!" } as const;
const err = (c: string) => new FormulaError(c);
export const isErr = (v: unknown): v is FormulaError => v instanceof FormulaError;

// ---------- cell addresses ----------
export const colName = (i: number) => { let s = ""; i++; while (i > 0) { const r = (i - 1) % 26; s = String.fromCharCode(65 + r) + s; i = Math.floor((i - 1) / 26); } return s; };
const colIndex = (s: string) => s.split("").reduce((n, ch) => n * 26 + (ch.charCodeAt(0) - 64), 0) - 1;
export const parseRef = (ref: string): { r: number; c: number } | null => {
  const m = ref.replace(/\$/g, "").toUpperCase().match(/^([A-Z]{1,3})(\d{1,5})$/);
  if (!m || !m[1] || !m[2]) return null;
  return { r: Number(m[2]) - 1, c: colIndex(m[1]) };
};
export const refName = (r: number, c: number) => `${colName(c)}${r + 1}`;

// ---------- tokenizer ----------
type Tok = { t: "num"; v: number } | { t: "str"; v: string } | { t: "ref"; v: string } | { t: "name"; v: string } | { t: "op"; v: string };

function tokenize(src: string): Tok[] {
  const commaDecimal = src.includes(";"); // French Excel: ";" separates arguments, "," is the decimal mark
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i] ?? "";
    if (/\s/.test(ch)) { i++; continue; }
    if (ch === '"') {
      let j = i + 1, s = "";
      while (j < src.length) { if (src[j] === '"') { if (src[j + 1] === '"') { s += '"'; j += 2; continue; } break; } s += src[j]; j++; }
      if (j >= src.length) throw err(ERR.value);
      out.push({ t: "str", v: s }); i = j + 1; continue;
    }
    const num = src.slice(i).match(commaDecimal ? /^\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?/ : /^\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/);
    if (num && !/^\d+[A-Za-z]/.test(src.slice(i))) { out.push({ t: "num", v: Number(num[0].replace(",", ".")) }); i += num[0].length; continue; }
    const word = src.slice(i).match(/^\$?[A-Za-z_][A-Za-z0-9_.]*\$?\d*/);
    if (word) {
      const w = word[0];
      if (/^\$?[A-Za-z]{1,3}\$?\d{1,5}$/.test(w)) out.push({ t: "ref", v: w.replace(/\$/g, "").toUpperCase() });
      else out.push({ t: "name", v: w.toUpperCase() });
      i += w.length; continue;
    }
    const two = src.slice(i, i + 2);
    if (["<=", ">=", "<>"].includes(two)) { out.push({ t: "op", v: two }); i += 2; continue; }
    if ("+-*/^&%(),;:=<>".includes(ch)) { out.push({ t: "op", v: ch === ";" ? "," : ch }); i++; continue; }
    throw err(ERR.name);
  }
  return out;
}

// ---------- parser -> AST ----------
type Node =
  | { k: "lit"; v: Value }
  | { k: "ref"; ref: string }
  | { k: "range"; a: string; b: string }
  | { k: "un"; op: string; x: Node }
  | { k: "bin"; op: string; a: Node; b: Node }
  | { k: "pct"; x: Node }
  | { k: "fn"; name: string; args: Node[] };

function parse(src: string): Node {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v: string) => { const t = peek(); return !!t && t.t === "op" && t.v === v; };
  const eat = (v: string) => { if (!isOp(v)) throw err(ERR.value); p++; };

  const primary = (): Node => {
    const t = toks[p++];
    if (!t) throw err(ERR.value);
    if (t.t === "num") return { k: "lit", v: t.v };
    if (t.t === "str") return { k: "lit", v: t.v };
    if (t.t === "ref") {
      if (isOp(":")) { p++; const b = toks[p++]; if (!b || b.t !== "ref") throw err(ERR.ref); return { k: "range", a: t.v, b: b.v }; }
      return { k: "ref", ref: t.v };
    }
    if (t.t === "name") {
      if (t.v === "TRUE" || t.v === "VRAI") return { k: "lit", v: true };
      if (t.v === "FALSE" || t.v === "FAUX") return { k: "lit", v: false };
      eat("(");
      const args: Node[] = [];
      if (!isOp(")")) { do { args.push(expr()); } while (isOp(",") && (p++, true)); }
      eat(")");
      return { k: "fn", name: t.v, args };
    }
    if (t.v === "(") { const e = expr(); eat(")"); return e; }
    throw err(ERR.value);
  };
  const postfix = (): Node => { let x = primary(); while (isOp("%")) { p++; x = { k: "pct", x }; } return x; };
  const unary = (): Node => { if (isOp("-") || isOp("+")) { const op = (toks[p++] as { v: string }).v; return { k: "un", op, x: unary() }; } return postfix(); };
  const power = (): Node => { let a = unary(); while (isOp("^")) { p++; a = { k: "bin", op: "^", a, b: unary() }; } return a; };
  const term = (): Node => { let a = power(); while (isOp("*") || isOp("/")) { const op = (toks[p++] as { v: string }).v; a = { k: "bin", op, a, b: power() }; } return a; };
  const additive = (): Node => { let a = term(); while (isOp("+") || isOp("-")) { const op = (toks[p++] as { v: string }).v; a = { k: "bin", op, a, b: term() }; } return a; };
  const concat = (): Node => { let a = additive(); while (isOp("&")) { p++; a = { k: "bin", op: "&", a, b: additive() }; } return a; };
  const expr = (): Node => {
    let a = concat();
    while (["=", "<>", "<", ">", "<=", ">="].some(isOp)) { const op = (toks[p++] as { v: string }).v; a = { k: "bin", op, a, b: concat() }; }
    return a;
  };
  const tree = expr();
  if (p !== toks.length) throw err(ERR.value);
  return tree;
}

// ---------- evaluation ----------
export type Raw = Record<string, string>;

const FR: Record<string, string> = {
  SOMME: "SUM", MOYENNE: "AVERAGE", NB: "COUNT", NBVAL: "COUNTA", SI: "IF", ARRONDI: "ROUND", ET: "AND", OU: "OR", NON: "NOT",
  MAJUSCULE: "UPPER", MINUSCULE: "LOWER", NBCAR: "LEN", SUPPRESPACE: "TRIM", CONCATENER: "CONCATENATE", "SOMME.SI": "SUMIF",
  "NB.SI": "COUNTIF", "MOYENNE.SI": "AVERAGEIF", RECHERCHEV: "VLOOKUP", MEDIANE: "MEDIAN", SIERREUR: "IFERROR", "ECARTYPE.STANDARD": "STDEV.S", ECARTYPE: "STDEV",
  GAUCHE: "LEFT", DROITE: "RIGHT", STXT: "MID", CNUM: "VALUE", SUBSTITUE: "SUBSTITUTE",
};

const toNum = (v: Value): number | FormulaError => {
  if (isErr(v)) return v;
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (v === "") return 0;
  const n = Number(String(v).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : err(ERR.value);
};
const toStr = (v: Value) => (typeof v === "boolean" ? (v ? "TRUE" : "FALSE") : isErr(v) ? v.code : String(v));
const toBool = (v: Value): boolean | FormulaError => (isErr(v) ? v : typeof v === "boolean" ? v : typeof v === "number" ? v !== 0 : v.toUpperCase() === "TRUE");

function matchCriteria(v: Value, crit: Value): boolean {
  const c = typeof crit === "string" ? crit : toStr(crit);
  const m = c.match(/^(<=|>=|<>|<|>|=)?(.*)$/);
  const op = m?.[1] ?? "=";
  const rhsRaw = m?.[2] ?? "";
  const rhsNum = Number(rhsRaw.replace(",", "."));
  const numeric = rhsRaw !== "" && Number.isFinite(rhsNum) && typeof v === "number";
  const a: number | string = numeric ? (v as number) : toStr(v).toLowerCase();
  const b: number | string = numeric ? rhsNum : rhsRaw.toLowerCase();
  switch (op) {
    case "<": return a < b; case ">": return a > b; case "<=": return a <= b; case ">=": return a >= b; case "<>": return a !== b;
    default: return a === b;
  }
}

export function evaluateSheet(raw: Raw): Record<string, Value> {
  const cache: Record<string, Value> = {};
  const visiting = new Set<string>();

  const cell = (ref: string): Value => {
    if (ref in cache) return cache[ref] as Value;
    if (visiting.has(ref)) return err(ERR.circ);
    const src = (raw[ref] ?? "").trim();
    let v: Value;
    if (src.startsWith("=")) {
      visiting.add(ref);
      try { v = evalNode(parse(src.slice(1))); } catch (e) { v = isErr(e) ? e : err(ERR.value); }
      visiting.delete(ref);
    } else if (src === "") v = "";
    else {
      const n = Number(src.replace(/\s/g, "").replace(",", "."));
      v = Number.isFinite(n) && /\d/.test(src) ? n : src;
    }
    cache[ref] = v;
    return v;
  };

  const rangeCells = (a: string, b: string): Value[][] => {
    const A = parseRef(a), B = parseRef(b);
    if (!A || !B) throw err(ERR.ref);
    const rows: Value[][] = [];
    for (let r = Math.min(A.r, B.r); r <= Math.max(A.r, B.r); r++) {
      const row: Value[] = [];
      for (let c = Math.min(A.c, B.c); c <= Math.max(A.c, B.c); c++) row.push(cell(refName(r, c)));
      rows.push(row);
    }
    return rows;
  };

  const flat = (nodes: Node[]): Value[] => nodes.flatMap((n) => (n.k === "range" ? rangeCells(n.a, n.b).flat() : [evalNode(n)]));
  const nums = (vals: Value[]) => vals.filter((v): v is number => typeof v === "number");
  const firstErr = (vals: Value[]) => vals.find(isErr);

  function evalNode(n: Node): Value {
    switch (n.k) {
      case "lit": return n.v;
      case "ref": { if (!parseRef(n.ref)) return err(ERR.ref); return cell(n.ref); }
      case "range": return err(ERR.value);
      case "pct": { const x = toNum(evalNode(n.x)); return isErr(x) ? x : x / 100; }
      case "un": { const x = toNum(evalNode(n.x)); return isErr(x) ? x : n.op === "-" ? -x : x; }
      case "bin": {
        const A = evalNode(n.a), B = evalNode(n.b);
        if (isErr(A)) return A; if (isErr(B)) return B;
        if (n.op === "&") return toStr(A) + toStr(B);
        if (["=", "<>", "<", ">", "<=", ">="].includes(n.op)) {
          const both = typeof A === "number" && typeof B === "number";
          const a = both ? A : toStr(A).toLowerCase(), b = both ? B : toStr(B).toLowerCase();
          switch (n.op) { case "=": return a === b; case "<>": return a !== b; case "<": return a < b; case ">": return a > b; case "<=": return a <= b; default: return a >= b; }
        }
        const a = toNum(A), b = toNum(B);
        if (isErr(a)) return a; if (isErr(b)) return b;
        switch (n.op) { case "+": return a + b; case "-": return a - b; case "*": return a * b; case "/": return b === 0 ? err(ERR.div0) : a / b; default: return a ** b; }
      }
      case "fn": {
        const name = FR[n.name] ?? n.name;
        const arg = (i: number) => { const a = n.args[i]; return a ? evalNode(a) : ""; };
        switch (name) {
          case "SUM": { const v = flat(n.args); return firstErr(v) ?? nums(v).reduce((s, x) => s + x, 0); }
          case "AVERAGE": { const v = flat(n.args); const e = firstErr(v); if (e) return e; const x = nums(v); return x.length ? x.reduce((s, y) => s + y, 0) / x.length : err(ERR.div0); }
          case "MIN": { const v = flat(n.args); return firstErr(v) ?? (nums(v).length ? Math.min(...nums(v)) : 0); }
          case "MAX": { const v = flat(n.args); return firstErr(v) ?? (nums(v).length ? Math.max(...nums(v)) : 0); }
          case "COUNT": return nums(flat(n.args)).length;
          case "COUNTA": return flat(n.args).filter((v) => v !== "").length;
          case "MEDIAN": { const x = nums(flat(n.args)).sort((a, b) => a - b); if (!x.length) return err(ERR.value); const m = Math.floor(x.length / 2); return x.length % 2 ? (x[m] as number) : ((x[m - 1] as number) + (x[m] as number)) / 2; }
          case "STDEV": case "STDEV.S": { const x = nums(flat(n.args)); if (x.length < 2) return err(ERR.div0); const mu = x.reduce((s, y) => s + y, 0) / x.length; return Math.sqrt(x.reduce((s, y) => s + (y - mu) ** 2, 0) / (x.length - 1)); }
          case "ROUND": { const x = toNum(arg(0)), d = toNum(arg(1)); if (isErr(x)) return x; if (isErr(d)) return d; const f = 10 ** d; return Math.round(x * f) / f; }
          case "ABS": { const x = toNum(arg(0)); return isErr(x) ? x : Math.abs(x); }
          case "IF": { const c = toBool(arg(0)); if (isErr(c)) return c; return c ? arg(1) : n.args.length > 2 ? arg(2) : false; }
          case "IFERROR": { const v = arg(0); return isErr(v) ? arg(1) : v; }
          case "AND": { const v = flat(n.args).map(toBool); return v.find(isErr) ?? v.every(Boolean); }
          case "OR": { const v = flat(n.args).map(toBool); return v.find(isErr) ?? v.some(Boolean); }
          case "NOT": { const v = toBool(arg(0)); return isErr(v) ? v : !v; }
          case "CONCAT": case "CONCATENATE": { const v = flat(n.args); return firstErr(v) ?? v.map(toStr).join(""); }
          case "UPPER": return toStr(arg(0)).toUpperCase();
          case "LOWER": return toStr(arg(0)).toLowerCase();
          case "LEN": return toStr(arg(0)).length;
          case "TRIM": return toStr(arg(0)).trim().replace(/\s+/g, " ");
          case "SUMIF": case "COUNTIF": case "AVERAGEIF": {
            const r = n.args[0], s = n.args[2] ?? n.args[0];
            if (r?.k !== "range" || s?.k !== "range") return err(ERR.value);
            const test = rangeCells(r.a, r.b).flat(), vals = rangeCells(s.a, s.b).flat(), crit = arg(1);
            const hit = test.map((v, i) => (matchCriteria(v, crit) ? vals[i] : undefined)).filter((v): v is Value => v !== undefined);
            if (name === "COUNTIF") return hit.length;
            const x = nums(hit);
            if (name === "SUMIF") return x.reduce((a, b) => a + b, 0);
            return x.length ? x.reduce((a, b) => a + b, 0) / x.length : err(ERR.div0);
          }
          case "LEFT": case "RIGHT": {
            const s = arg(0); if (isErr(s)) return s;
            const k = n.args.length > 1 ? toNum(arg(1)) : 1; if (isErr(k)) return k;
            if (k < 0) return err(ERR.value);
            const t = toStr(s), c = Math.trunc(k);
            return name === "LEFT" ? t.slice(0, c) : c === 0 ? "" : t.slice(-c);
          }
          case "MID": {
            const s = arg(0); if (isErr(s)) return s;
            const st = toNum(arg(1)), len = toNum(arg(2));
            if (isErr(st)) return st; if (isErr(len)) return len;
            if (st < 1 || len < 0) return err(ERR.value);
            return toStr(s).substr(Math.trunc(st) - 1, Math.trunc(len));
          }
          case "VALUE": {
            const v = arg(0);
            if (typeof v === "number" || isErr(v)) return v;
            if (toStr(v).trim() === "") return err(ERR.value);
            return toNum(v);
          }
          case "SUBSTITUTE": {
            const s = arg(0), a = arg(1), b = arg(2);
            const e = [s, a, b].find(isErr); if (e) return e;
            const from = toStr(a);
            return from === "" ? toStr(s) : toStr(s).split(from).join(toStr(b));
          }
          case "VLOOKUP": {
            const table = n.args[1];
            if (table?.k !== "range") return err(ERR.value);
            const key = arg(0), col = toNum(arg(2));
            if (isErr(col)) return col;
            const exact = n.args.length < 4 ? false : !(toBool(arg(3)) === true);
            const rows = rangeCells(table.a, table.b);
            const idx = Math.trunc(col) - 1;
            if (idx < 0 || idx >= (rows[0]?.length ?? 0)) return err(ERR.ref);
            if (exact || typeof key !== "number") {
              const row = rows.find((r) => toStr(r[0] ?? "").toLowerCase() === toStr(key).toLowerCase());
              return row ? (row[idx] ?? "") : err(ERR.na);
            }
            let best: Value[] | undefined;
            for (const r of rows) { const v = r[0]; if (typeof v === "number" && v <= key) best = r; }
            return best ? (best[idx] ?? "") : err(ERR.na);
          }
          default: return err(ERR.name);
        }
      }
    }
  }

  const out: Record<string, Value> = {};
  for (const ref of Object.keys(raw)) out[ref] = cell(ref);
  return out;
}

export function formatValue(v: Value | undefined): string {
  if (v === undefined || v === "") return "";
  if (isErr(v)) return v.code;
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (typeof v === "number") return Number.isInteger(v) ? v.toLocaleString("fr-FR") : v.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
  return v;
}
