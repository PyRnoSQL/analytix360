import { useMemo, useState } from "react";
import { BarChart3, Check, Play, RotateCcw, Table2 } from "lucide-react";
import type { Block } from "../types";
import type { ProgressApi } from "../progress";
import { LabFrame } from "./LabFrame";

type SBlock = Extract<Block, { type: "statlab" }>;
const num = (v: number | string) => typeof v === "number" ? v : Number(v);
const nums = (xs: (number|string)[]) => xs.map(num).filter((x) => Number.isFinite(x));
const mean = (xs: number[]) => xs.length ? xs.reduce((a,b)=>a+b,0)/xs.length : 0;
const sd = (xs: number[]) => { if (xs.length < 2) return 0; const m=mean(xs); return Math.sqrt(xs.reduce((a,x)=>a+(x-m)**2,0)/(xs.length-1)); };

export function StatLab({ block, api }: { block: SBlock; api: ProgressApi }) {
  const [rows, setRows] = useState<Record<string,string>[]>(() => {
    const n = Math.max(...block.dataset.map(d=>d.values.length),0);
    return Array.from({length:n},(_,i)=>Object.fromEntries(block.dataset.map(d=>[d.name,String(d.values[i] ?? "")] )));
  });
  const [analysis, setAnalysis] = useState(block.analyses[0] ?? "descriptives");
  const [x, setX] = useState(block.dataset[0]?.name ?? "");
  const [y, setY] = useState(block.dataset[1]?.name ?? block.dataset[0]?.name ?? "");
  const [ran, setRan] = useState(false);
  const [passed, setPassed] = useState(false);
  const cols = block.dataset;
  const result = useMemo(() => {
    if (!ran) return null;
    if (analysis === "descriptives") {
      const a=nums(rows.map(r=>r[x]??""));
      return { n:a.length, mean:mean(a), sd:sd(a), min:Math.min(...a), max:Math.max(...a) };
    }
    if (analysis === "frequencies") {
      const map=new Map<string,number>(); rows.forEach(r=>map.set(r[x]??"",(map.get(r[x]??"")??0)+1));
      return [...map.entries()].sort((a,b)=>b[1]-a[1]).map(([value,count])=>({value,count,pct:count/Math.max(rows.length,1)}));
    }
    const map=new Map<string,Map<string,number>>(); rows.forEach(r=>{const a=r[x]??"",b=r[y]??""; if(!map.has(a)) map.set(a,new Map()); const m=map.get(a)!; m.set(b,(m.get(b)??0)+1);});
    return { rows:[...map.entries()].map(([k,m])=>({key:k,cells:[...m.entries()]})) };
  },[analysis,ran,rows,x,y]);
  const check = () => {
    let ok=false;
    const e=block.expected.find(v=>v.analysis===analysis);
    if(!e) ok=!!result;
    else if(analysis==="descriptives" && result && !Array.isArray(result)) ok=Math.abs(result.mean-Number(e.checks.mean??result.mean))<0.001 && result.n===Number(e.checks.n??result.n);
    else if(analysis==="frequencies" && Array.isArray(result)) ok=result.length>0;
    else if(analysis==="crosstab" && result && "rows" in result) ok=result.rows.length>0;
    setPassed(ok); if(ok) api.completeLab(block.id);
  };
  const cell="w-full rounded-md border border-transparent bg-[#0A0F1C] px-2 py-1.5 text-xs text-white focus:border-[color:var(--acc-60)] focus:outline-none";
  return <LabFrame icon={BarChart3} kind="SPSS-style statistics lab" level={block.level} title={block.title} task={block.task} done={!!api.progress.labs[block.id]} hint={block.hint}
    onReset={()=>{setRan(false);setPassed(false);}} onSolution={()=>{setRan(true);setPassed(true);}}>
    <div className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
      <div className="min-w-0 overflow-x-auto rounded-xl border border-[color:var(--line)]">
        <div className="flex items-center gap-2 border-b border-[color:var(--line)] bg-[color:var(--raised)] px-3 py-2"><Table2 size={15}/><span className="text-sm font-semibold">Data View</span><span className="ml-auto text-xs text-[color:var(--muted)]">{rows.length} cases</span></div>
        <table className="w-full border-collapse text-left"><thead className="bg-[#101827]"><tr><th className="w-8 px-2 py-2 text-xs text-[color:var(--muted)]">#</th>{cols.map(c=><th key={c.name} className="min-w-[9rem] px-2 py-2 text-xs text-[color:var(--muted)]">{c.name}</th>)}</tr></thead>
        <tbody>{rows.map((r,i)=><tr key={i} className="border-t border-[color:var(--line)]"><td className="px-2 text-xs text-[color:var(--muted)]">{i+1}</td>{cols.map(c=><td key={c.name} className="p-1"><input className={cell} value={r[c.name]??""} onChange={e=>setRows(rs=>rs.map((z,j)=>j===i?({...z,[c.name]:e.target.value}):z))}/></td>)}</tr>)}</tbody></table>
      </div>
      <div className="grid content-start gap-3">
        <div className="rounded-xl border border-[color:var(--line)] p-3"><p className="mb-2 text-sm font-semibold">Analysis</p>
          <label className="grid gap-1 text-xs text-[color:var(--muted)]">Procedure<select value={analysis} onChange={e=>{setAnalysis(e.target.value as typeof analysis);setRan(false)}} className="rounded-md border border-[color:var(--line)] bg-[#0A0F1C] p-2 text-sm text-white">{block.analyses.map(a=><option key={a}>{a}</option>)}</select></label>
          <div className="mt-2 grid gap-2 sm:grid-cols-2"><label className="grid gap-1 text-xs text-[color:var(--muted)]">Rows / variable<select value={x} onChange={e=>setX(e.target.value)} className="rounded-md border border-[color:var(--line)] bg-[#0A0F1C] p-2 text-sm text-white">{cols.map(c=><option key={c.name}>{c.name}</option>)}</select></label><label className="grid gap-1 text-xs text-[color:var(--muted)]">Columns<select value={y} onChange={e=>setY(e.target.value)} className="rounded-md border border-[color:var(--line)] bg-[#0A0F1C] p-2 text-sm text-white">{cols.map(c=><option key={c.name}>{c.name}</option>)}</select></label></div>
          <button type="button" onClick={()=>setRan(true)} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[color:var(--acc)] px-3 py-2 text-sm font-bold text-[#071018]"><Play size={14}/>Run</button>
        </div>
        <div className="rounded-xl border border-[color:var(--line)] p-3"><p className="mb-2 text-sm font-semibold">Output Viewer</p>{!result?<p className="text-xs text-[color:var(--muted)]">Run an analysis to generate output.</p>:analysis==="descriptives"?<table className="w-full text-sm"><tbody>{Object.entries(result as any).map(([k,v])=><tr key={k} className="border-b border-[color:var(--line)]"><td className="py-1.5 text-[color:var(--muted)]">{k}</td><td className="py-1.5 text-right font-mono">{typeof v==="number"?v.toFixed(3):String(v)}</td></tr>)}</tbody></table>:analysis==="frequencies"?<table className="w-full text-sm"><thead><tr><th className="text-left">Value</th><th>Count</th><th>%</th></tr></thead><tbody>{(result as any[]).map((r,i)=><tr key={i} className="border-t border-[color:var(--line)]"><td>{r.value}</td><td className="text-right">{r.count}</td><td className="text-right">{(r.pct*100).toFixed(1)}%</td></tr>)}</tbody></table>:<table className="w-full text-sm"><tbody>{(result as any).rows.map((r:any)=><tr key={r.key} className="border-t border-[color:var(--line)]"><td className="font-semibold">{r.key}</td><td>{r.cells.map((c:any)=><span key={c[0]} className="mr-3">{c[0]}: {c[1]}</span>)}</td></tr>)}</tbody></table>}</div>
        <button type="button" onClick={check} className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-200"><Check size={15}/>Check analysis</button>
        {passed&&<p className="rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">Correct. Your analysis produced a valid result.</p>}
        <button type="button" onClick={()=>{setRows(Array.from({length:Math.max(...cols.map(c=>c.values.length),0)},(_,i)=>Object.fromEntries(cols.map(d=>[d.name,String(d.values[i]??"")]))));setRan(false);setPassed(false)}} className="inline-flex items-center justify-center gap-2 text-xs text-[color:var(--muted)]"><RotateCcw size={13}/>Reset data</button>
      </div>
    </div>
  </LabFrame>;
}
