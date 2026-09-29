import type { SpcChart } from "../types";

// Control-chart statistics (Shewhart constants for subgroup sizes 2–10).
const A2: Record<number, number> = { 2: 1.88, 3: 1.023, 4: 0.729, 5: 0.577, 6: 0.483, 7: 0.419, 8: 0.373, 9: 0.337, 10: 0.308 };
const D3: Record<number, number> = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0.076, 8: 0.136, 9: 0.184, 10: 0.223 };
const D4: Record<number, number> = { 2: 3.267, 3: 2.574, 4: 2.282, 5: 2.114, 6: 2.004, 7: 1.924, 8: 1.864, 9: 1.816, 10: 1.777 };
const avg = (a: number[]) => a.reduce((s, x) => s + x, 0) / (a.length || 1);

export interface Limits { cl: number; ucl: number; lcl: number }
export interface Panel { name: string; points: number[]; limits: Limits; key: string }

export interface SpcData { samples?: number[][]; values?: number[]; defectives?: number[]; sampleSize?: number }

/** Panels (main chart first, then the dispersion chart when there is one). */
export function spcPanels(chart: SpcChart, d: SpcData): Panel[] {
  if (chart === "xbar-r") {
    const s = d.samples ?? [], n = s[0]?.length ?? 5;
    const means = s.map(avg), ranges = s.map((g) => Math.max(...g) - Math.min(...g));
    const xbb = avg(means), rbar = avg(ranges);
    return [
      { name: "X̄ chart", key: "x", points: means, limits: { cl: xbb, ucl: xbb + (A2[n] ?? 0.577) * rbar, lcl: xbb - (A2[n] ?? 0.577) * rbar } },
      { name: "R chart", key: "r", points: ranges, limits: { cl: rbar, ucl: (D4[n] ?? 2.114) * rbar, lcl: (D3[n] ?? 0) * rbar } },
    ];
  }
  if (chart === "imr") {
    const x = d.values ?? [], mr = x.slice(1).map((v, i) => Math.abs(v - (x[i] ?? v)));
    const xb = avg(x), mrb = avg(mr);
    return [
      { name: "Individuals chart", key: "x", points: x, limits: { cl: xb, ucl: xb + 2.66 * mrb, lcl: xb - 2.66 * mrb } },
      { name: "Moving range chart", key: "r", points: mr, limits: { cl: mrb, ucl: 3.267 * mrb, lcl: 0 } },
    ];
  }
  if (chart === "p") {
    const dd = d.defectives ?? [], n = d.sampleSize ?? 100;
    const p = dd.map((v) => v / n), pb = avg(p), s = Math.sqrt((pb * (1 - pb)) / n);
    return [{ name: "p chart", key: "x", points: p, limits: { cl: pb, ucl: pb + 3 * s, lcl: Math.max(0, pb - 3 * s) } }];
  }
  const c = d.values ?? [], cb = avg(c);
  return [{ name: "c chart", key: "x", points: c, limits: { cl: cb, ucl: cb + 3 * Math.sqrt(cb), lcl: Math.max(0, cb - 3 * Math.sqrt(cb)) } }];
}

/** Points beyond the control limits. */
export const beyond = (p: Panel) => p.points.map((v, i) => (v > p.limits.ucl || v < p.limits.lcl ? i : -1)).filter((i) => i >= 0);

/** Pattern tests (Western Electric / Nelson style) on a panel. */
export function patterns(p: Panel, run = 7, trend = 6) {
  const side = p.points.map((v) => Math.sign(v - p.limits.cl));
  let longestRun = 0, cur = 0, prev = 0;
  for (const s of side) { cur = s !== 0 && s === prev ? cur + 1 : s !== 0 ? 1 : 0; prev = s; longestRun = Math.max(longestRun, cur); }
  let longestTrend = 1, up = 1, down = 1;
  for (let i = 1; i < p.points.length; i++) {
    const a = p.points[i - 1] ?? 0, b = p.points[i] ?? 0;
    up = b > a ? up + 1 : 1; down = b < a ? down + 1 : 1;
    longestTrend = Math.max(longestTrend, up, down);
  }
  return { run: longestRun >= run, trend: longestTrend >= trend, longestRun, longestTrend };
}
