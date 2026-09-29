// A small evaluator for the XPath subset used in XLSForm (KoboToolbox, ODK, SurveyCTO):
// ${field} references, "." for the current answer, and / or / not(), = != < <= > >=,
// + - * div mod, and the functions selected(), count-selected(), string-length(), regex(),
// if(), coalesce(), concat(), int(), number(), round(), true(), false().
// Answers are strings ("" when empty); select_multiple answers are space-separated choice names.

export type XVal = string | number | boolean;
export type XEnv = { get: (name: string) => string; self?: string };

type Tok = { t: "num"; v: number } | { t: "str"; v: string } | { t: "ref"; v: string } | { t: "dot" } | { t: "id"; v: string } | { t: "op"; v: string };

export class XPathError extends Error {}

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i] ?? "";
    if (/\s/.test(c)) { i++; continue; }
    if (c === "$" && src[i + 1] === "{") {
      const j = src.indexOf("}", i);
      if (j < 0) throw new XPathError("Missing } after ${");
      out.push({ t: "ref", v: src.slice(i + 2, j).trim() }); i = j + 1; continue;
    }
    if (c === "'" || c === '"' || c === "‘" || c === "’" || c === "“" || c === "”") {
      const close = c === "‘" || c === "’" ? /['’‘]/ : c === "“" || c === "”" ? /["”“]/ : new RegExp(c);
      let j = i + 1; while (j < src.length && !close.test(src[j] ?? "")) j++;
      if (j >= src.length) throw new XPathError("Missing closing quote");
      out.push({ t: "str", v: src.slice(i + 1, j) }); i = j + 1; continue;
    }
    const num = src.slice(i).match(/^\d+(\.\d+)?/);
    if (num) { out.push({ t: "num", v: Number(num[0]) }); i += num[0].length; continue; }
    if (c === "." && !/\d/.test(src[i + 1] ?? "")) { out.push({ t: "dot" }); i++; continue; }
    const id = src.slice(i).match(/^[A-Za-z_][A-Za-z0-9_-]*/);
    if (id) { out.push({ t: "id", v: id[0] }); i += id[0].length; continue; }
    const two = src.slice(i, i + 2);
    if (["!=", "<=", ">="].includes(two)) { out.push({ t: "op", v: two }); i += 2; continue; }
    if ("=<>+-*(),".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
    throw new XPathError(`Unexpected character "${c}"`);
  }
  return out;
}

type Node =
  | { k: "lit"; v: XVal } | { k: "ref"; name: string } | { k: "dot" }
  | { k: "bin"; op: string; a: Node; b: Node } | { k: "neg"; x: Node } | { k: "fn"; name: string; args: Node[] };

export function parse(src: string): Node {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v: string) => { const t = peek(); return !!t && t.t === "op" && t.v === v; };
  const expect = (v: string) => { if (!isOp(v)) throw new XPathError(`Expected "${v}"`); p++; };
  const bin = (next: () => Node, ops: string[], words: string[] = []): Node => {
    let a = next();
    for (;;) {
      const t = peek();
      if (t && t.t === "op" && ops.includes(t.v)) { p++; a = { k: "bin", op: t.v, a, b: next() }; continue; }
      if (t && t.t === "id" && words.includes(t.v)) { p++; a = { k: "bin", op: t.v, a, b: next() }; continue; }
      return a;
    }
  };
  const or = (): Node => bin(and, [], ["or"]);
  const and = (): Node => bin(cmp, [], ["and"]);
  const cmp = (): Node => bin(add, ["=", "!=", "<", "<=", ">", ">="]);
  const add = (): Node => bin(mul, ["+", "-"]);
  const mul = (): Node => bin(unary, ["*"], ["div", "mod"]);
  const unary = (): Node => (isOp("-") ? (p++, { k: "neg", x: unary() }) : primary());
  const primary = (): Node => {
    const t = peek();
    if (!t) throw new XPathError("The formula ends too early");
    p++;
    if (t.t === "num") return { k: "lit", v: t.v };
    if (t.t === "str") return { k: "lit", v: t.v };
    if (t.t === "ref") return { k: "ref", name: t.v };
    if (t.t === "dot") return { k: "dot" };
    if (t.t === "op" && t.v === "(") { const e = or(); expect(")"); return e; }
    if (t.t === "id" && isOp("(")) {
      p++;
      const args: Node[] = [];
      if (!isOp(")")) { args.push(or()); while (isOp(",")) { p++; args.push(or()); } }
      expect(")");
      return { k: "fn", name: t.v, args };
    }
    if (t.t === "id" && (t.v === "true" || t.v === "false")) return { k: "lit", v: t.v === "true" };
    throw new XPathError(t.t === "id" ? `Unknown word "${t.v}" (field names are written \${name})` : "Unexpected symbol");
  };
  if (!toks.length) throw new XPathError("Empty formula");
  const e = or();
  if (p !== toks.length) throw new XPathError("Unexpected text after the formula");
  return e;
}

const num = (v: XVal): number => (typeof v === "number" ? v : typeof v === "boolean" ? (v ? 1 : 0) : v.trim() === "" ? NaN : Number(v));
const str = (v: XVal): string => (typeof v === "string" ? v : typeof v === "boolean" ? (v ? "true" : "false") : Number.isNaN(v) ? "" : String(v));
export const truthy = (v: XVal): boolean => (typeof v === "boolean" ? v : typeof v === "number" ? v !== 0 && !Number.isNaN(v) : v !== "");

const FNS: Record<string, (a: XVal[]) => XVal> = {
  selected: (a) => str(a[0] ?? "").split(/\s+/).includes(str(a[1] ?? "")),
  "count-selected": (a) => str(a[0] ?? "").split(/\s+/).filter(Boolean).length,
  "string-length": (a) => str(a[0] ?? "").length,
  not: (a) => !truthy(a[0] ?? false),
  regex: (a) => { try { return new RegExp(str(a[1] ?? "")).test(str(a[0] ?? "")); } catch { return false; } },
  if: (a) => (truthy(a[0] ?? false) ? (a[1] ?? "") : (a[2] ?? "")),
  coalesce: (a) => (str(a[0] ?? "") !== "" ? (a[0] ?? "") : (a[1] ?? "")),
  concat: (a) => a.map(str).join(""),
  int: (a) => Math.trunc(num(a[0] ?? NaN)),
  number: (a) => num(a[0] ?? NaN),
  round: (a) => { const f = 10 ** num(a[1] ?? 0); return Math.round(num(a[0] ?? NaN) * f) / f; },
  true: () => true,
  false: () => false,
};

export function evaluate(n: Node, env: XEnv): XVal {
  switch (n.k) {
    case "lit": return n.v;
    case "ref": return env.get(n.name);
    case "dot": return env.self ?? "";
    case "neg": return -num(evaluate(n.x, env));
    case "fn": {
      const f = FNS[n.name];
      if (!f) throw new XPathError(`Unknown function ${n.name}()`);
      return f(n.args.map((a) => evaluate(a, env)));
    }
    case "bin": {
      if (n.op === "or") return truthy(evaluate(n.a, env)) || truthy(evaluate(n.b, env));
      if (n.op === "and") return truthy(evaluate(n.a, env)) && truthy(evaluate(n.b, env));
      const a = evaluate(n.a, env), b = evaluate(n.b, env);
      if (["+", "-", "*", "div", "mod"].includes(n.op)) {
        const x = num(a), y = num(b);
        return n.op === "+" ? x + y : n.op === "-" ? x - y : n.op === "*" ? x * y : n.op === "div" ? x / y : x % y;
      }
      // Comparisons: numeric when either side is a number (or both look numeric), otherwise text.
      const numeric = typeof a === "number" || typeof b === "number" || typeof a === "boolean" || typeof b === "boolean";
      if (n.op === "=" || n.op === "!=") {
        const eq = numeric ? num(a) === num(b) : str(a) === str(b);
        return n.op === "=" ? eq : !eq;
      }
      const x = num(a), y = num(b);
      if (Number.isNaN(x) || Number.isNaN(y)) return false;
      return n.op === "<" ? x < y : n.op === "<=" ? x <= y : n.op === ">" ? x > y : x >= y;
    }
  }
}

/** Field names referenced as ${name}. */
export function refsOf(src: string): string[] {
  return [...new Set([...src.matchAll(/\$\{\s*([^}\s]+)\s*\}/g)].map((m) => m[1] ?? ""))];
}
/** Literal numbers and strings in an expression (used to build test values). */
export function literalsOf(src: string): { nums: number[]; strs: string[] } {
  const nums = [...src.matchAll(/(?<![\w$])(\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
  const strs = [...src.matchAll(/['"‘’“”]([^'"‘’“”]*)['"‘’“”]/g)].map((m) => m[1] ?? "");
  return { nums, strs };
}

export function safeEval(src: string, env: XEnv): { ok: true; v: XVal } | { ok: false; error: string } {
  try { return { ok: true, v: evaluate(parse(src), env) }; } catch (e) { return { ok: false, error: e instanceof Error ? e.message : String(e) }; }
}
