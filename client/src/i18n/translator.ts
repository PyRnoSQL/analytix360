// Site-wide EN <-> FR translation.
// English stays in the components. When French is selected, every visible text
// node (and placeholder/title/alt/aria-label) is swapped for its French version
// from ./fr.ts; switching back restores the original English exactly.
// The French dictionary is loaded only when French is actually used.

export type Lang = "en" | "fr";

const STORAGE_KEY = "ae-lang";
const ATTRS = ["placeholder", "title", "alt", "aria-label"];
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "TEXTAREA"]);

type Pair = { src: string; out: string };

let lang: Lang = initialLang();
let dict: Record<string, string> | null = null;
let observer: MutationObserver | null = null;
const listeners = new Set<() => void>();
const textState = new WeakMap<Text, Pair>();
const attrState = new WeakMap<Element, Record<string, Pair>>();

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") return saved;
  } catch {
    /* storage unavailable: fall through */
  }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

// ---------- lookups ----------

const MONTHS: Record<string, string> = {
  Jan: "janv.", Feb: "févr.", Mar: "mars", Apr: "avr.", May: "mai", Jun: "juin", Jul: "juil.",
  Aug: "août", Sep: "sept.", Sept: "sept.", Oct: "oct.", Nov: "nov.", Dec: "déc.",
  January: "janvier", February: "février", March: "mars", April: "avril", June: "juin", July: "juillet",
  August: "août", September: "septembre", October: "octobre", November: "novembre", December: "décembre",
};
const UNITS: Record<string, [string, string]> = {
  minute: ["minute", "minutes"], hour: ["heure", "heures"], day: ["jour", "jours"],
  week: ["semaine", "semaines"], month: ["mois", "mois"], year: ["an", "ans"],
};
const unitFr = (n: number, u: string) => {
  const pair = UNITS[u];
  return pair ? (n > 1 ? pair[1] : pair[0]) : u;
};

// Patterns for text that contains numbers or dates, so it doesn't need one entry per value.
function translatePattern(s: string): string | null {
  let m = s.match(/^([A-Z][a-z]+)\.? (\d{1,2}), (\d{4})$/);
  if (m) {
    const [, mon = "", day = "", year = ""] = m;
    const frMonth = MONTHS[mon];
    if (frMonth) return `${day} ${frMonth} ${year}`;
  }
  m = s.match(/^(\d+) (minute|hour|day|week|month|year)s? ago$/);
  if (m) {
    const [, n = "", u = ""] = m;
    return `il y a ${n} ${unitFr(Number(n), u)}`;
  }
  m = s.match(/^(\d+) (minute|hour|day|week|month|year)s?$/);
  if (m) {
    const [, n = "", u = ""] = m;
    return `${n} ${unitFr(Number(n), u)}`;
  }
  m = s.match(/^(\d+)-Week Bootcamp$/);
  if (m) return `Bootcamp de ${m[1] ?? ""} semaines`;
  m = s.match(/^(\d+) of (\d+)$/);
  if (m) return `${m[1] ?? ""} sur ${m[2] ?? ""}`;
  m = s.match(/^(\d+) modules?$/);
  if (m) return `${m[1] ?? ""} module${Number(m[1]) > 1 ? "s" : ""}`;
  return null;
}

function translate(src: string): string {
  if (!dict) return src;
  const m = src.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!m || !m[2]) return src;
  const key = m[2].replace(/\s+/g, " ");
  const fr = dict[key] ?? translatePattern(key);
  return fr == null ? src : m[1] + fr + m[3];
}

// ---------- DOM ----------

function isSkipped(el: Element | null): boolean {
  for (let e = el; e; e = e.parentElement) {
    if (SKIP_TAGS.has(e.tagName) || e.hasAttribute("data-no-translate") || e.getAttribute("contenteditable") === "true") return true;
  }
  return false;
}

function applyText(node: Text) {
  const st = textState.get(node);
  if (lang === "en" && !st) return; // never touched: nothing to restore
  if (isSkipped(node.parentElement)) return;
  // If the text changed since we last wrote it, React rendered new English: that is the new source.
  const src = st && node.data === st.out ? st.src : node.data;
  const out = lang === "fr" ? translate(src) : src;
  if (node.data !== out) node.data = out;
  textState.set(node, { src, out });
}

function applyAttr(el: Element, name: string) {
  const state = attrState.get(el) ?? {};
  const st = state[name];
  if (lang === "en" && !st) return;
  const cur = el.getAttribute(name);
  if (cur == null || isSkipped(el)) return;
  const src = st && cur === st.out ? st.src : cur;
  const out = lang === "fr" ? translate(src) : src;
  if (cur !== out) el.setAttribute(name, out);
  state[name] = { src, out };
  attrState.set(el, state);
}

function applyTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) { applyText(root as Text); return; }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  for (let n: Node | null = walker.currentNode; n; n = walker.nextNode()) {
    if (n.nodeType === Node.TEXT_NODE) applyText(n as Text);
    else for (const a of ATTRS) if ((n as Element).hasAttribute(a)) applyAttr(n as Element, a);
  }
}

function startObserver() {
  if (observer || typeof MutationObserver === "undefined") return;
  observer = new MutationObserver((records) => {
    for (const r of records) {
      if (r.type === "characterData") applyText(r.target as Text);
      else if (r.type === "attributes" && r.attributeName) applyAttr(r.target as Element, r.attributeName);
      else r.addedNodes.forEach(applyTree);
    }
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
}

async function ensureDict() {
  if (!dict) dict = (await import("./fr")).FR;
}

// ---------- public API ----------

export function getLang(): Lang {
  return lang;
}

export function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

export async function setLang(next: Lang) {
  lang = next;
  try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  document.documentElement.lang = next;
  listeners.forEach((cb) => cb());
  if (next === "fr") await ensureDict();
  if (lang !== next) return; // user switched again while the dictionary was loading
  applyTree(document.body);
  startObserver();
}

function boot() {
  document.documentElement.lang = lang;
  startObserver();
  if (lang === "fr") void setLang("fr");
}

if (typeof document !== "undefined") {
  if (document.body) boot();
  else document.addEventListener("DOMContentLoaded", boot, { once: true });
}
