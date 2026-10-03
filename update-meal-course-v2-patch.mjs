// ===================== MEAL v2 upgrade =====================
// Adds deeper, reusable practical-learning engines on top of the existing MEAL course.
// Safe to run from the analytix360 root after the base MEAL updater has written /learn/meal.
import { readFileSync as __read, writeFileSync as __write, existsSync as __exists, mkdirSync as __mkdir } from "fs";
import { dirname as __dirname } from "path";
const __fail = (m) => { console.error("STOPPED, nothing written: " + m); process.exit(1); };
const __need = (p) => { if (!__exists(p)) __fail(p + " not found — run this from the analytix360 root"); };
__need("client/src/lms/types.ts");
__need("client/src/lms/blocks.tsx");
__need("client/src/data/courses/meal.ts");

const __writeText = (p, s) => { __mkdir(__dirname(p), { recursive: true }); __write(p, s, "utf8"); };
const __patchOnce = (p, marker, replacement, label) => {
  const s = __read(p, "utf8");
  if (s.includes(replacement)) return false;
  const i = s.indexOf(marker);
  if (i < 0) __fail(p + ": could not find patch anchor for " + label);
  __write(p, s.slice(0, i) + replacement + s.slice(i + marker.length), "utf8");
  return true;
};

// ---------- 1. Statistical / SPSS-style lab block ----------
const __types = "client/src/lms/types.ts";
let __t = __read(__types, "utf8");
if (!__t.includes('type: "statlab"')) {
  const anchor = '  | { type: "links";';
  const addition = `  | { type: "statlab"; id: string; level?: LabLevel; title: string; task: string; hint?: string; dataset: { name: string; type: "numeric" | "text"; values: (number | string)[] }[]; analyses: ("descriptives" | "frequencies" | "crosstab")[]; expected: { analysis: string; checks: Record<string, number | string> }[] }\n`;
  if (!__t.includes(anchor)) __fail(__types + ": could not find Block union anchor");
  __t = __t.replace(anchor, addition + anchor);
  __write(__types, __t, "utf8");
}

const __statlab = `import { useMemo, useState } from "react";
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
`;
__writeText("client/src/lms/labs/StatLab.tsx", __statlab);

const __blocks = "client/src/lms/blocks.tsx";
let __b = __read(__blocks, "utf8");
if (!__b.includes('from "./labs/StatLab"')) {
  const a='import { XlsFormLab } from "./labs/XlsFormLab";';
  if (!__b.includes(a)) __fail(__blocks + ": XLSForm import anchor not found");
  __b=__b.replace(a,a+'\nimport { StatLab } from "./labs/StatLab";');
}
if (!__b.includes('case "statlab"')) {
  const a='    case "xlsform": return <XlsFormLab block={block} api={api} />;';
  if (!__b.includes(a)) __fail(__blocks + ": XLSForm case anchor not found");
  __b=__b.replace(a,a+'\n    case "statlab": return <StatLab block={block} api={api} />;');
}
__write(__blocks,__b,"utf8");

// ---------- 2. Advanced MEAL lessons ----------
const __adv = `import type { CourseModule, Lesson } from "../../../lms/types";

const sampling: Lesson = { id:"meal-m3-v2-sampling", title:"Sampling, bias and field data-quality controls", minutes:35,
  objectives:["Choose a defensible sampling approach","Recognise selection and response bias","Build practical field data-quality checks"],
  blocks:[
    {type:"p",text:"Good MEAL starts before the first interview. The sampling frame, selection rule, non-response protocol and supervisor checks determine what the numbers can legitimately tell you."},
    {type:"h",text:"Sampling decision tree"},
    {type:"steps",title:"From population to sample",items:["Define the target population and unit of analysis.","Build or document the sampling frame and its limitations.","Choose probability or purposive sampling according to the question.","Define the sample size and replacement/non-response rules before fieldwork.","Document deviations instead of silently changing the design in the field."]},
    {type:"table",head:["Risk","Example","Control"],rows:[["Selection bias","Enumerators interview only households near the road","Random starting points / mapped segments"],["Non-response bias","Women working during the day are missing","Call-back / alternative safe time"],["Interviewer bias","Enumerator paraphrases sensitive questions","Standard script + role play"],["Data-entry error","Age entered as 350","Range constraint + supervisor review"]]},
    {type:"sheet",id:"meal-m3-v2-dq",level:"intermediate",title:"Data-quality triage workbook",task:"Use the worksheet to flag records that need review. Mark an age outside 0–120, a household size below 1, or a missing consent value as Review.",data:[["Case","Age","HH size","Consent","DQ status"],["HH001",34,5,"Yes",null],["HH002",350,4,"Yes",null],["HH003",27,0,"Yes",null],["HH004",41,6,"",null]],editable:["E2","E3","E4","E5"],checks:[{cell:"E2",equals:"OK"},{cell:"E3",equals:"Review"},{cell:"E4",equals:"Review"},{cell:"E5",equals:"Review"}],hint:"Use AND/OR logic: a record is Review if age is outside 0–120, household size < 1, or consent is blank.",solution:{E2:"=IF(OR(B2<0,B2>120,C2<1,D2=\"\"),\"Review\",\"OK\")",E3:"=IF(OR(B3<0,B3>120,C3<1,D3=\"\"),\"Review\",\"OK\")",E4:"=IF(OR(B4<0,B4>120,C4<1,D4=\"\"),\"Review\",\"OK\")",E5:"=IF(OR(B5<0,B5>120,C5<1,D5=\"\"),\"Review\",\"OK\")"}},
    {type:"check",id:"meal-m3-v2-c1",question:"What is the safest way to handle an enumerator discovering a selected household is unavailable?",options:["Replace it with the nearest household","Follow the pre-defined non-response/call-back protocol and document the outcome","Interview the neighbour","Delete the case"],answer:1,explain:"Unplanned replacement can introduce selection bias. Follow the protocol defined before fieldwork."}
  ]};

const digital: Lesson = { id:"meal-m4-v2-digital", title:"Digital field operations: KoboToolbox, ODK, SurveyCTO and CommCare", minutes:40,
  objectives:["Understand the common XLSForm workflow across platforms","Design offline-safe forms","Plan deployment, versioning, QA and export"],
  blocks:[
    {type:"p",text:"KoboToolbox, ODK, SurveyCTO and CommCare differ in their deployment ecosystems, but the MEAL workflow is similar: define the instrument, test it, deploy a controlled version, collect offline when needed, monitor submissions, export and archive."},
    {type:"table",head:["Platform","Typical MEAL use","What to practise"],rows:[["KoboToolbox","Rapid humanitarian/development surveys","XLSForm, deployment, offline collection, export"],["ODK","Open-source field data collection","XLSForm, Central, device forms, offline workflows"],["SurveyCTO","Controlled survey operations","XLSForm, quality controls, secure server workflow"],["CommCare","Case management and longitudinal workflows","Cases, forms, follow-up, supervision"]]},
    {type:"h",text:"Production checklist"},
    {type:"steps",title:"Before a form goes to the field",items:["Lock the indicator definitions and question wording.","Validate names, choices, relevance, constraints and calculations.","Test on the actual device and language versions.","Run a pilot and inspect the exported dataset.","Publish a version number and change log.","Train collectors on consent, safeguarding, device security and escalation.","Back up and archive the final form and export according to the project's retention policy."]},
    {type:"xlsform",id:"meal-m4-v2-xls",level:"advanced",title:"Advanced XLSForm: skip logic, constraints and calculation",task:"Build a household survey form with age, consent, disability screening and a calculated vulnerability flag. The live phone preview must behave correctly.",hint:"Use relevant to hide questions, constraint to reject impossible values, and calculation to derive the flag.",columns:["type","name","label","required","relevant","constraint","constraint_message","calculation"],survey:[{type:"integer",name:"age",label:"Age of respondent",required:"yes",constraint:". >= 18 and . <= 120",constraint_message:"Enter an age from 18 to 120."},{type:"select_one consent",name:"consent",label:"Consent given?",required:"yes"},{type:"select_one disability",name:"disability",label:"Does anyone in the household have a disability?",required:"yes",relevant:"${consent} = 'yes'"},{type:"integer",name:"members",label:"Household members",required:"yes",relevant:"${consent} = 'yes'",constraint:". >= 1 and . <= 50"},{type:"calculate",name:"vulnerability",label:"Vulnerability flag",calculation:"if(${members} >= 8, 'high', 'standard')"}],choices:[{list_name:"consent",name:"yes",label:"Yes"},{list_name:"consent",name:"no",label:"No"},{list_name:"disability",name:"yes",label:"Yes"},{list_name:"disability",name:"no",label:"No"}],checks:[{kind:"field",name:"age",type:"integer",required:true,labelHas:"Age"},{kind:"field",name:"disability",relevant:"${consent} = 'yes'"},{kind:"field",name:"members",constraint:". >= 1 and . <= 50"},{kind:"field",name:"vulnerability",calculation:"if(${members} >= 8, 'high', 'standard')"}],solution:{survey:[{type:"integer",name:"age",label:"Age of respondent",required:"yes",constraint:". >= 18 and . <= 120",constraint_message:"Enter an age from 18 to 120."},{type:"select_one consent",name:"consent",label:"Consent given?",required:"yes"},{type:"select_one disability",name:"disability",label:"Does anyone in the household have a disability?",required:"yes",relevant:"${consent} = 'yes'"},{type:"integer",name:"members",label:"Household members",required:"yes",relevant:"${consent} = 'yes'",constraint:". >= 1 and . <= 50"},{type:"calculate",name:"vulnerability",label:"Vulnerability flag",calculation:"if(${members} >= 8, 'high', 'standard')"}],choices:[{list_name:"consent",name:"yes",label:"Yes"},{list_name:"consent",name:"no",label:"No"},{list_name:"disability",name:"yes",label:"Yes"},{list_name:"disability",name:"no",label:"No"}]}},
    {type:"check",id:"meal-m4-v2-c1",question:"Why must the form be tested on the actual device before deployment?",options:["Only to make the colours look right","Because offline behaviour, display, validation and device permissions can differ from the desktop preview","Because XLSForm only works on Android","To avoid collecting consent"],answer:1,explain:"A production test must include the real device/offline workflow, not only a desktop preview."}
  ]};

const stats: Lesson = { id:"meal-m5-v2-statistics", title:"SPSS-style analysis: descriptives, frequencies and cross-tabs", minutes:45,
  objectives:["Prepare variables for analysis","Run descriptive statistics and frequencies","Interpret a cross-tab without confusing counts and percentages"],
  blocks:[
    {type:"p",text:"MEAL analysts often move from a raw export to an analysis dataset, then to tables that answer a decision question. This lab provides a familiar Data View → procedure → Output Viewer workflow without pretending that a screenshot is a statistical engine."},
    {type:"h",text:"Analysis workflow"},
    {type:"steps",title:"From raw data to evidence",items:["Inspect variable names, labels, missing values and measurement levels.","Check ranges and impossible combinations.","Run descriptives for numeric variables and frequencies for categorical variables.","Use cross-tabs when the question is about distribution across groups.","Interpret the result in plain language and state important limitations."]},
    {type:"statlab",id:"meal-m5-v2-stat",level:"advanced",title:"SPSS-style MEAL analysis workspace",task:"Use Data View to inspect the household dataset. Run Descriptives on expenditure, Frequencies on sex, and a Cross-tab of region by programme participation. Then check the analysis.",hint:"Start with Descriptives. Compare N, mean and standard deviation. For the cross-tab, focus on counts by row/column rather than treating a count as a percentage.",dataset:[{name:"region",type:"text",values:["Centre","Centre","Centre","Littoral","Littoral","Littoral","North","North","North","North" ]},{name:"sex",type:"text",values:["F","M","F","F","M","F","M","F","M","F"]},{name:"participant",type:"text",values:["Yes","Yes","No","Yes","No","Yes","Yes","No","Yes","No"]},{name:"expenditure",type:"numeric",values:[42000,38000,51000,62000,55000,49000,30000,27000,35000,41000]}],analyses:["descriptives","frequencies","crosstab"],expected:[{analysis:"descriptives",checks:{n:10,mean:43000}},{analysis:"frequencies",checks:{}},{analysis:"crosstab",checks:{}}]},
    {type:"check",id:"meal-m5-v2-c1",question:"Which statement is correct?",options:["A cross-tab count is automatically a percentage","A descriptive mean should be calculated without checking missing values","The output should be interpreted against the question and the data-quality limitations","If a result is statistically formatted it is automatically valid"],answer:2,explain:"Statistical output is evidence only when the data, method and interpretation are appropriate."}
  ]};

const reporting: Lesson = { id:"meal-m6-v2-reporting", title:"From analysis to dashboard, donor report and learning decision", minutes:35,
  objectives:["Translate indicator data into findings","Design an executive dashboard","Connect feedback and evidence to an adaptation decision"],
  blocks:[
    {type:"p",text:"A MEAL product is successful when the intended user can understand what happened, why it matters and what decision follows. A dashboard is not the destination; action and learning are."},
    {type:"table",head:["Product","Audience","Minimum useful content"],rows:[["Indicator tracking table","Project team","Definition, baseline, target, period result, cumulative result, status, source"],["Dashboard","Managers","A few decision-relevant KPIs, trends, disaggregation, flags and actions"],["Donor report","Donor / governance","Finding, evidence, comparison, explanation, progress, risks, actions"],["Feedback report","Communities / programme","What people said, who was reached, what changed, unresolved issues"]]},
    {type:"sheet",id:"meal-m6-v2-dashboard",level:"advanced",title:"Executive MEAL dashboard data model",task:"Calculate achievement and status, then write the finding that a programme manager should act on.",data:[["Indicator","Target","Actual","% achieved","Status","Finding"],["Households receiving cash",5000,4550,null,null,null],["Complaints resolved within SLA",90,72,null,null,null],["Women attending skills training",1200,1080,null,null,null]],editable:["D2","D3","D4","E2","E3","E4","F2","F3","F4"],checks:[{cell:"D2",equals:0.91,tol:0.001},{cell:"D3",equals:0.8,tol:0.001},{cell:"D4",equals:0.9,tol:0.001},{cell:"E2",equals:"On track"},{cell:"E3",equals:"Behind"},{cell:"E4",equals:"On track"}],hint:"% achieved = Actual / Target. For this exercise, use 90% as the threshold for On track. A good finding contains the result, comparison and a likely reason when known.",solution:{D2:"=C2/B2",D3:"=C3/B3",D4:"=C4/B4",E2:"=IF(D2>=0.9,\"On track\",\"Behind\")",E3:"=IF(D3>=0.9,\"On track\",\"Behind\")",E4:"=IF(D4>=0.9,\"On track\",\"Behind\")",F2:"Cash reach is 91% of target; investigate the remaining gap.",F3:"Only 80% of complaints meet the SLA; review case-routing delays.",F4:"Women’s training participation is 90% of target; maintain outreach and monitor access."}},
    {type:"check",id:"meal-m6-v2-c1",question:"Which dashboard statement is most useful to a decision-maker?",options:["Complaints: 72","Complaints resolved within SLA: 80% vs 90% target; routing delays should be reviewed","There were many complaints","The chart is blue"],answer:1,explain:"A decision-ready finding gives the result, the comparison and an actionable implication."}
  ]};

export function augmentMealModules(modules: CourseModule[]): CourseModule[] {
  const by=(n:number)=>modules.find(m=>m.number===n);
  by(3)?.lessons.push(sampling);
  by(4)?.lessons.push(digital);
  by(5)?.lessons.push(stats);
  by(6)?.lessons.push(reporting);
  return modules;
}
`;
__writeText("client/src/data/courses/meal/advanced-v2.ts", __adv);

const __meal = "client/src/data/courses/meal.ts";
let __m = __read(__meal,"utf8");
if (!__m.includes("augmentMealModules")) {
  const anchor='import { m6 } from "./meal/m6";';
  if (!__m.includes(anchor)) __fail(__meal + ": module import anchor not found");
  __m=__m.replace(anchor,anchor+'\nimport { augmentMealModules } from "./meal/advanced-v2";');
  __m=__m.replace('modules: [m1, m2, m3, m4, m5, m6],','modules: augmentMealModules([m1, m2, m3, m4, m5, m6]),');
  __m=__m.replace('hours: 140,','hours: 165,');
  __write(__meal,__m,"utf8");
}

console.log("OK MEAL v2 upgrade applied at /learn/meal");
console.log("OK deeper curriculum: sampling/data quality, digital field operations, SPSS-style statistics, dashboard/reporting labs");
console.log("OK interactive engines: Excel-style sheets, XLSForm/Kobo/ODK workflow, SPSS-style Data View/Output Viewer");
console.log("OK 4 advanced practical lessons added; course nominal duration updated to 165 hours");
