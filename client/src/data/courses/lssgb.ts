import type { CourseModule, LmsCourse, Lesson, ModuleQuiz, Block } from "../../lms/types";

// Lean Six Sigma Green Belt — Analytix Engineering SARL
// Original instructional material. Workplace examples and datasets are fictional.
// The course follows the DMAIC project lifecycle and is designed for applied Green Belt practice.

const ASQ = "ASQ";
const NIST = "NIST/SEMATECH";
const ISO = "ISO";

const quiz = (id: string, title: string, questions: ModuleQuiz["questions"]): ModuleQuiz => ({ id, title, passPct: 70, questions });
const lesson = (id: string, title: string, minutes: number, objectives: string[], blocks: Block[]): Lesson => ({ id, title, minutes, objectives, blocks });
const intro: Block = { type: "p", text: "Green Belt work is not a collection of tools. It is a disciplined way to understand a customer problem, establish a defensible baseline, identify evidence-based causes, improve the process and hold the gains. Throughout this course, fictional Cameroon-based workplace cases are used so that every method is connected to a realistic business decision." };
const dmaic: Block = { type: "table", head: ["DMAIC phase", "Primary question", "Typical outputs"], rows: [
  ["Define", "What problem matters and who is affected?", "Project charter, VOC, CTQ, SIPOC, scope"],
  ["Measure", "How bad is the problem and can we trust the data?", "Operational definition, data plan, baseline, MSA, capability"],
  ["Analyze", "What verified factors explain the performance?", "Pareto, stratification, hypothesis tests, regression, root causes"],
  ["Improve", "Which changes reduce the verified causes?", "Solutions, FMEA, pilot/DOE, implementation plan, validation"],
  ["Control", "How will the improvement survive?", "Control plan, SPC, response plan, ownership, handover and closure"],
] };

const modules: CourseModule[] = [];

modules.push({
  id: "lssgb-m1", number: 1, title: "Lean Six Sigma Foundations & Project Leadership",
  summary: "Understand Lean, Six Sigma, DMAIC, customer value, project selection, roles, financial linkage and disciplined project governance.", hours: 10,
  lessons: [
    lesson("lssgb-m1-l1", "What Lean Six Sigma is — and what it is not", 25,
      ["Explain Lean, Six Sigma and DMAIC in operational terms", "Distinguish process improvement from inspection and firefighting", "Connect variation, waste and customer value"], [
        intro, dmaic,
        { type: "h", text: "Lean and Six Sigma solve different parts of the same problem" },
        { type: "table", head: ["Lean focus", "Six Sigma focus", "Combined effect"], rows: [
          ["Flow, waiting, motion, inventory, over-processing", "Variation, defects, instability and evidence", "A faster process that also produces consistent results"],
          ["Make value visible from the customer's viewpoint", "Measure performance against CTQs", "Improvement is tied to what customers actually value"],
          ["Remove non-value-added work", "Reduce common and special-cause variation", "Less effort and fewer defects"],
        ] },
        { type: "callout", tone: "key", title: "Green Belt mindset", text: "Do not start with a favorite tool. Start with a measurable problem, a customer or business consequence, and a process that can be changed." },
        { type: "h", text: "DMAIC as a learning cycle" },
        { type: "list", items: [
          "Define establishes why the project deserves attention and what success means.",
          "Measure establishes the operational definition, data quality and baseline.",
          "Analyze separates plausible explanations from causes supported by evidence.",
          "Improve changes the process and validates that the change produced the intended result.",
          "Control transfers ownership and makes the new performance the normal way of working.",
        ] },
        { type: "check", id: "lssgb-m1-l1-c1", question: "A manager asks a Green Belt to install a dashboard because delivery is late. What should happen first?", options: ["Choose the dashboard software", "Define the measurable problem, customer impact and process boundary", "Run a DOE immediately", "Create a control chart before defining the metric"], answer: 1, explain: "The improvement method begins with a well-defined problem. A dashboard may later help, but it is not a substitute for defining the problem and its measurement." },
        { type: "task", id: "lssgb-m1-l1-t1", title: "Workplace reflection", items: ["Name one recurring problem in your workplace", "Identify the customer or stakeholder affected", "Write the problem as an observable gap without proposing a cause", "List one metric that could demonstrate the gap" ] },
      ]),
    lesson("lssgb-m1-l2", "Project selection, business case and Green Belt roles", 25,
      ["Screen projects using impact, feasibility and controllability", "Write a business case without overstating savings", "Explain Sponsor, Process Owner, Champion, Green Belt and SME responsibilities"], [
        { type: "p", text: "A good Green Belt project is important enough to matter and narrow enough to finish. Projects become dangerous when the team promises enterprise-wide transformation before proving a local process relationship." },
        { type: "table", head: ["Role", "Core responsibility", "Common failure"], rows: [
          ["Champion/Sponsor", "Removes barriers, aligns priorities and protects resources", "Treating the Green Belt as the sole owner of the result"],
          ["Process Owner", "Owns the process and sustains the new standard", "Leaving after the project closes"],
          ["Green Belt", "Leads analysis and improvement with the project team", "Becoming the department's permanent firefighter"],
          ["SME", "Provides process knowledge and constraints", "Presenting opinion as statistical evidence"],
        ] },
        { type: "h", text: "Project screening" },
        { type: "form", id: "lssgb-m1-l2-form", level: "intermediate", title: "Screen the project", task: "Choose the response that keeps the project measurable and within Green Belt control.", hint: "Look for a defined process, measurable output, credible customer/business impact and a scope that can be completed.", fields: [
          { kind: "select", label: "Project: reduce every service problem across the entire company", options: ["Accept unchanged", "Narrow to one process, customer segment or defect family", "Start Improve immediately"], answer: 1, explain: "The original scope is too broad. Narrowing the process and defect family makes measurement and ownership practical." },
          { kind: "select", label: "Finance estimates 30M FCFA savings but no baseline exists", options: ["Record 30M as guaranteed savings", "Label it a hypothesis and establish baseline/financial rules", "Ignore finance"], answer: 1 },
          { kind: "select", label: "A process owner says the problem is caused by training", options: ["Accept the cause", "Record it as a hypothesis to test", "Exclude the process owner"], answer: 1 },
        ] },
        { type: "callout", tone: "warning", title: "Savings discipline", text: "Separate hard savings, cost avoidance, productivity capacity and soft benefits. Do not convert a theoretical annualized benefit into realized savings without an agreed financial method." },
        { type: "check", id: "lssgb-m1-l2-c1", question: "Which project statement is most measurable?", options: ["Improve customer service", "Reduce complaints", "Reduce average complaint resolution time from 72 hours to 36 hours for mobile-money support cases by Q4", "Make customers happier"], answer: 2, explain: "It specifies the metric, baseline, target population and deadline." },
      ]),
    lesson("lssgb-m1-l3", "Voice of Customer, CTQ and value", 25,
      ["Separate VOC statements from CTQs", "Translate customer language into measurable requirements", "Identify value-added, necessary non-value-added and pure waste"], [
        { type: "p", text: "Customers rarely speak in statistical language. They say, 'I need the shipment when promised' or 'I should not have to call twice.' A Green Belt translates these statements into Critical-to-Quality requirements that can be measured consistently." },
        { type: "table", head: ["Customer statement", "Possible CTQ", "Operational measure"], rows: [
          ["I need my customs declaration cleared quickly", "Clearance cycle time", "Hours from accepted declaration to release"],
          ["The invoice must be correct the first time", "First-pass accuracy", "% invoices requiring no correction"],
          ["I do not want repeated follow-up calls", "Resolution effectiveness", "% cases resolved without reopen/contact within 7 days"],
        ] },
        { type: "sorter", id: "lssgb-m1-l3-sort", level: "intermediate", title: "Classify process activities", task: "Place each activity into value-added, necessary non-value-added or pure waste.", layout: "columns", buckets: [
          { label: "Value-added", desc: "Changes the service/product in a way the customer values" },
          { label: "Necessary non-value-added", desc: "Required today by regulation, control or infrastructure" },
          { label: "Pure waste", desc: "Consumes resources without customer value or required purpose" },
        ], items: [
          { text: "Assembling a product to the customer's specification", bucket: 0 },
          { text: "Regulatory record retention", bucket: 1 },
          { text: "Waiting for an approval that adds no information", bucket: 2 },
          { text: "Duplicate data entry into two systems", bucket: 2 },
          { text: "A required identity verification", bucket: 1 },
          { text: "Configuring the service the customer ordered", bucket: 0 },
        ] },
        { type: "check", id: "lssgb-m1-l3-c1", question: "Which is a CTQ rather than raw VOC?", options: ["I want it fast", "The customer is angry", "95% of requests completed within 24 hours", "Customers dislike waiting"], answer: 2, explain: "A CTQ translates customer need into a measurable requirement." },
        { type: "task", id: "lssgb-m1-l3-t1", title: "VOC-to-CTQ exercise", items: ["Collect five customer statements", "Group similar needs", "Write one measurable CTQ for each group", "Specify the unit and acceptable performance range", "Identify which CTQ should drive your project" ] },
      ]),
    lesson("lssgb-m1-l4", "Project charter and tollgate discipline", 30,
      ["Build a one-page charter", "Define scope, target, timeline and risks", "Use tollgates to prevent premature movement between DMAIC phases"], [
        { type: "h", text: "Minimum charter fields" },
        { type: "table", head: ["Field", "What belongs there"], rows: [
          ["Business problem", "Observable performance gap and consequence"],
          ["Goal statement", "Metric, baseline, target population and due date"],
          ["Scope", "Process start/end and included/excluded cases"],
          ["Team", "Sponsor, owner, Green Belt, SMEs and contributors"],
          ["Financial/customer impact", "Known impact plus assumptions"],
          ["Milestones", "Define, Measure, Analyze, Improve, Control reviews"],
        ] },
        { type: "form", id: "lssgb-m1-l4-charter", level: "advanced", title: "Charter quality check", task: "Select the strongest statement for each charter field.", fields: [
          { kind: "select", label: "Problem statement", options: ["The process is terrible", "Late orders increased from 8% to 17% during the last six months", "Employees need training"], answer: 1 },
          { kind: "select", label: "Goal", options: ["Improve delivery", "Reduce late-order rate from 17% to 8% or less by 30 September", "Eliminate all variation"], answer: 1 },
          { kind: "select", label: "Scope", options: ["Everything from supplier to customer", "Orders released by the Douala distribution center from pick confirmation to customer handoff", "All company operations"], answer: 1 },
        ] },
        { type: "callout", tone: "key", title: "Tollgate question", text: "A tollgate is not a ceremony. The question is whether the evidence produced in the current phase is sufficient to make the next phase rational." },
        { type: "check", id: "lssgb-m1-l4-c1", question: "What is the purpose of the Define tollgate?", options: ["Prove the root cause", "Confirm the problem, value, scope, team and project logic are sufficiently clear", "Deploy the solution", "Close the project"], answer: 1, explain: "Root-cause proof belongs primarily to Analyze; deployment belongs to Improve/Control." },
        { type: "task", id: "lssgb-m1-l4-t1", title: "Green Belt charter", items: ["Write the business problem", "Write a quantified goal", "Define start/end boundaries", "Name stakeholders and process owner", "List assumptions and risks", "Define five tollgate deliverables" ] },
      ]),
  ],
  quiz: quiz("lssgb-m1-quiz", "Module 1 — Foundations & Leadership", [
    { id: "q1", question: "What is the best starting point for a Green Belt project?", options: ["A favorite statistical test", "A measurable problem with customer/business impact", "A solution already selected", "A dashboard design"], answer: 1, explain: "DMAIC begins by defining a meaningful problem and its boundaries." },
    { id: "q2", question: "Which role normally owns the process after project closure?", options: ["Green Belt", "Process Owner", "Data analyst", "External trainer"], answer: 1, explain: "The Process Owner sustains the process after the project team disbands." },
    { id: "q3", question: "A CTQ is best described as...", options: ["A customer complaint copied verbatim", "A measurable requirement derived from customer need", "A root cause", "A project budget"], answer: 1, explain: "CTQs convert customer needs into measurable performance requirements." },
    { id: "q4", question: "Why should scope be controlled?", options: ["To reduce learning", "To make the project finishable and causally coherent", "To avoid collecting data", "To eliminate stakeholder involvement"], answer: 1, explain: "A bounded process allows the team to establish a defensible baseline and test causes." },
    { id: "q5", question: "Which is a problem statement rather than a solution statement?", options: ["Install automation", "Train operators", "First-pass yield fell from 96% to 89%", "Buy a new machine"], answer: 2, explain: "The performance gap is the problem; the other choices are proposed solutions." },
  ])
});

modules.push({
  id: "lssgb-m2", number: 2, title: "Define: Process Mapping, SIPOC & Problem Framing",
  summary: "Turn a broad complaint into a process-level problem using SIPOC, COPQ, CTQ trees, process maps and clear operational definitions.", hours: 10,
  lessons: [
    lesson("lssgb-m2-l1", "SIPOC and process boundaries", 25, ["Build a SIPOC", "Identify suppliers, inputs, process steps, outputs and customers", "Use SIPOC to prevent scope drift"], [
      { type: "p", text: "SIPOC is a high-level map, not a detailed work instruction. Its value is alignment: everyone should agree on where the process begins, where it ends and who receives its output." },
      { type: "code", text: "Supplier → Input → Process → Output → Customer\n             S I P O C" },
      { type: "table", head: ["Element", "Question", "Example: invoice processing"], rows: [
        ["Supplier", "Who provides what enters the process?", "Sales, customer, ERP"],
        ["Input", "What information/material is required?", "Order, price, tax data"],
        ["Process", "What 4–7 high-level steps transform inputs?", "Validate → price → tax → approve → issue"],
        ["Output", "What leaves the process?", "Correct invoice"],
        ["Customer", "Who receives or depends on it?", "Customer, Finance, Sales"],
      ] },
      { type: "form", id: "lssgb-m2-l1-sipoc", level: "beginner", title: "SIPOC boundary check", task: "Choose the best boundary for a project on late customer invoices.", fields: [
        { kind: "select", label: "Start", options: ["Customer complains", "Order is accepted in the billing system", "Company strategy meeting"], answer: 1 },
        { kind: "select", label: "End", options: ["Invoice is issued and available to customer", "CEO sees dashboard", "Employee receives training"], answer: 0 },
        { kind: "select", label: "Customer", options: ["Only the Green Belt", "Customer and downstream Finance/Collections users", "Nobody until Control"], answer: 1 },
      ] },
      { type: "check", id: "lssgb-m2-l1-c1", question: "What is the main purpose of SIPOC?", options: ["Calculate sigma level", "Define the high-level process boundary and stakeholders", "Replace all detailed process maps", "Perform hypothesis testing"], answer: 1, explain: "SIPOC creates a shared high-level view before detailed measurement." },
    ]),
    lesson("lssgb-m2-l2", "Detailed process mapping, flow and waste", 25, ["Construct a cross-functional process map", "Identify handoffs and queues", "Recognize Lean waste without assuming every delay is a root cause"], [
      { type: "p", text: "A process map makes invisible work visible. Mark handoffs, decisions, rework loops, queues and information systems. Do not confuse a map with a cause analysis: a delay on the map is a fact to measure, not automatically the reason for poor performance." },
      { type: "table", head: ["Map feature", "What to look for", "Useful measure"], rows: [
        ["Handoff", "Information or work moves between people/teams", "Handoff count, defects at handoff"],
        ["Queue", "Work waits before the next step", "Waiting time, queue size"],
        ["Decision", "Different paths occur", "% each path, rework probability"],
        ["Rework loop", "Output returns to an earlier step", "% rework, repeat cycle time"],
      ] },
      { type: "sorter", id: "lssgb-m2-l2-sort", level: "intermediate", title: "Spot Lean waste", task: "Classify the observation by the dominant Lean waste category.", layout: "columns", buckets: [
        { label: "Waiting", desc: "Work sits idle" }, { label: "Defect/Rework", desc: "Work must be corrected" }, { label: "Motion", desc: "Unnecessary movement" }, { label: "Over-processing", desc: "More work than required" }, { label: "Inventory/WIP", desc: "Excess work waiting" },
      ], items: [
        { text: "Applications wait 36 hours for one approval signature", bucket: 0 },
        { text: "An analyst re-enters the same customer ID into three systems", bucket: 3 },
        { text: "Operator walks 80 metres to retrieve a commonly used tool", bucket: 2 },
        { text: "Rejected claims are corrected and submitted again", bucket: 1 },
        { text: "500 cases remain open before the next review stage", bucket: 4 },
      ] },
      { type: "task", id: "lssgb-m2-l2-t1", title: "Gemba mapping", items: ["Observe one process for 30 minutes", "Record every queue and handoff", "Measure one waiting time", "Mark rework loops", "Ask the process owner which map step is most painful" ] },
    ]),
    lesson("lssgb-m2-l3", "Problem definition, operational definitions and data terms", 25, ["Write operational definitions", "Distinguish unit, defect, defective, opportunity and denominator", "Prevent ambiguity in measurement"], [
      { type: "p", text: "Two people can report different defect rates from the same process if they use different definitions. A Green Belt therefore defines exactly what counts, when the clock starts and stops, which population is included and how missing cases are treated." },
      { type: "table", head: ["Term", "Operational definition example"], rows: [
        ["Unit", "One customer order with a unique order ID"],
        ["Defect", "Any required field missing or incorrect at final invoice release"],
        ["Defective unit", "An order containing one or more defects"],
        ["Opportunity", "One invoice field that can be incorrect"],
        ["Cycle time", "Timestamp difference between accepted order and invoice release, excluding planned system downtime"],
      ] },
      { type: "form", id: "lssgb-m2-l3-def", level: "advanced", title: "Operational-definition test", task: "Select the definition that another analyst could reproduce without asking the author what they meant.", fields: [
        { kind: "select", label: "Late shipment", options: ["Shipments that feel late", "Shipment handed to carrier after the committed date/time stored in the order record", "Bad delivery performance"], answer: 1 },
        { kind: "select", label: "Complaint", options: ["Unhappy customer", "A case tagged Complaint in the CRM with a customer contact record", "Any negative comment online"], answer: 1 },
        { kind: "select", label: "First-pass yield", options: ["Good quality", "Units meeting all defined acceptance criteria without rework on the first processing cycle divided by units entering the process", "Units that eventually pass"], answer: 1 },
      ] },
      { type: "check", id: "lssgb-m2-l3-c1", question: "Why is the denominator part of the metric definition?", options: ["It makes charts prettier", "A rate is meaningless if different teams count different populations", "It removes the need for data validation", "It proves causation"], answer: 1, explain: "A numerator without a consistent denominator can create a misleading comparison." },
    ]),
    lesson("lssgb-m2-l4", "Define phase case study and tollgate", 30, ["Integrate SIPOC, VOC, CTQ and problem statement", "Test project logic before Measure", "Prepare a Define tollgate package"], [
      { type: "p", text: "Case: a fictional regional distributor reports that 14% of customer orders require manual correction before dispatch. Sales says the ERP is the problem; Operations says order entry is the problem. The Green Belt must resist the temptation to choose a side before measurement." },
      { type: "steps", title: "Define package", items: ["Business problem and customer consequence", "Project goal with metric, baseline and target", "SIPOC and detailed boundary", "VOC and CTQs", "Stakeholder map and RACI", "Risks, assumptions and financial logic", "Measure-phase data plan" ] },
      { type: "callout", tone: "key", title: "Tollgate readiness", text: "The project is ready for Measure when the team can explain what process is being studied, who is affected, what metric will represent the problem and how the metric will be collected." },
      { type: "task", id: "lssgb-m2-l4-t1", title: "Define tollgate simulation", items: ["Create a one-page SIPOC", "Write one CTQ tree", "Write the operational definition of the primary metric", "Identify three data sources", "List five questions that Measure must answer" ] },
    ]),
  ],
  quiz: quiz("lssgb-m2-quiz", "Module 2 — Define", [
    { id: "q1", question: "What does the P in SIPOC represent?", options: ["Problem", "Process", "Performance", "Project"], answer: 1, explain: "SIPOC stands for Supplier, Input, Process, Output, Customer." },
    { id: "q2", question: "Which statement is an operational definition?", options: ["Poor service", "Slow processing", "Cycle time is hours from accepted order timestamp to release timestamp", "Customers dislike delays"], answer: 2, explain: "It specifies exactly how the measure is calculated." },
    { id: "q3", question: "Why map handoffs?", options: ["To make the diagram longer", "They are locations where information, ownership and errors can change", "They always cause defects", "They replace data collection"], answer: 1, explain: "Handoffs are useful points to observe and measure, but they are not automatically root causes." },
    { id: "q4", question: "Which belongs in Define rather than Analyze?", options: ["Confirming a root cause", "Project charter and scope", "Regression coefficient", "Hypothesis test"], answer: 1, explain: "The charter and scope establish the project before causal analysis." },
    { id: "q5", question: "A good project goal should contain...", options: ["A solution", "A measurable target and time boundary", "A preferred vendor", "A statistical test only"], answer: 1, explain: "The target and time boundary make the goal testable." },
  ])
});

modules.push({
  id: "lssgb-m3", number: 3, title: "Measure: Data, MSA, Capability & SPC",
  summary: "Build a reliable measurement system, establish the baseline, understand distributions, calculate capability and interpret process stability.", hours: 12,
  lessons: [
    lesson("lssgb-m3-l1", "Data collection plans and descriptive statistics", 30, ["Build a data collection plan", "Choose appropriate descriptive statistics", "Use stratification to reveal patterns without claiming causation"], [
      { type: "p", text: "Measure turns a narrative problem into evidence. The first task is not to collect every field available; it is to collect the minimum reliable data needed to answer the project questions." },
      { type: "table", head: ["Data-plan field", "Example"], rows: [
        ["Metric", "Invoice correction rate"], ["Unit", "Customer order"], ["Sampling", "All orders for four weeks"], ["Source", "ERP order and correction tables"], ["Owner", "Order management analyst"], ["Frequency", "Daily extraction"], ["Strata", "Sales channel, branch, product family"],
      ] },
      { type: "h", text: "Descriptive statistics" },
      { type: "table", head: ["Statistic", "Use", "Caution"], rows: [
        ["Mean", "Average level", "Sensitive to extreme values"], ["Median", "Typical middle value", "Does not describe spread alone"], ["Range", "Quick spread indicator", "Uses only extremes"], ["Standard deviation", "Typical variation around mean", "Interpret with distribution/context"], ["Percentile", "Position in ordered data", "Specify calculation convention"],
      ] },
      { type: "chart", id: "lssgb-m3-l1-chart", title: "Weekly cycle time", data: [{ label: "W1", value: 44 }, { label: "W2", value: 39 }, { label: "W3", value: 61 }, { label: "W4", value: 48 }, { label: "W5", value: 42 }, { label: "W6", value: 66 }], unit: "hours", kinds: ["bar", "line"], best: "line", question: "Which chart best shows the time trend across ordered weeks?", explain: "A line chart emphasizes ordered time and makes movement across weeks easy to see." },
      { type: "check", id: "lssgb-m3-l1-c1", question: "Why stratify data by branch or shift?", options: ["To guarantee a cause", "To reveal whether performance differs across meaningful groups", "To increase sample size automatically", "To avoid checking data quality"], answer: 1, explain: "Stratification reveals patterns. A cause still requires further evidence." },
    ]),
    lesson("lssgb-m3-l2", "Measurement System Analysis: can we trust the measurement?", 30, ["Explain repeatability, reproducibility, bias and stability", "Recognize when measurement error can mask process variation", "Plan a practical MSA"], [
      { type: "p", text: "If the measurement system is noisy, the Green Belt can mistake measurement error for process variation or miss a real shift. MSA asks whether the measurement process is fit for the decision being made." },
      { type: "table", head: ["Concept", "Meaning", "Example"], rows: [
        ["Repeatability", "Variation when the same appraiser measures the same item repeatedly with the same instrument", "One inspector measures a shaft three times"],
        ["Reproducibility", "Variation attributable to different appraisers using the same method", "Three inspectors measure the same parts"],
        ["Bias", "Difference between average observed value and accepted reference", "Scale reads 101 g for a 100 g reference"],
        ["Stability", "Consistency of measurement performance over time", "Gauge slowly drifts during six months"],
      ] },
      { type: "caliper", id: "lssgb-m3-l2-caliper", level: "intermediate", title: "Measurement decision", task: "Read the digital caliper values and decide whether each dimension is within specification.", hint: "Compare each reading with nominal ± tolerance. Do not round before deciding conformity.", instrument: "digital", drawing: { kind: "shaft", title: "Stepped shaft", segments: [{ d: "Ø25.00 ± 0.05 mm", l: "40" }, { d: "Ø18.00 ± 0.03 mm", l: "30" }, { d: "Ø12.00 ± 0.02 mm", l: "25" }] }, drawingUnit: "mm", dims: [{ id: "d1", label: "Ø25", nominal: 25, tolPlus: 0.05, tolMinus: 0.05 }, { id: "d2", label: "Ø18", nominal: 18, tolPlus: 0.03, tolMinus: 0.03 }, { id: "d3", label: "Ø12", nominal: 12, tolPlus: 0.02, tolMinus: 0.02 }], readings: [{ dim: "d1", value: 25.04, conformity: true }, { dim: "d2", value: 17.96, conformity: true }, { dim: "d3", value: 12.025, conformity: false }] },
      { type: "callout", tone: "warning", title: "MSA before capability", text: "Capability indices are only meaningful when the measurement system is adequate for the decision. If the gauge contributes substantial variation, investigate the measurement system before interpreting process capability." },
      { type: "check", id: "lssgb-m3-l2-c1", question: "Which term describes variation between different appraisers?", options: ["Repeatability", "Reproducibility", "Bias", "Stability"], answer: 1, explain: "Reproducibility concerns variation between appraisers using the same measurement method." },
    ]),
    lesson("lssgb-m3-l3", "Process capability: Cp, Cpk and sigma", 35, ["Distinguish specification limits from control limits", "Calculate and interpret Cp and Cpk", "Understand centering versus spread"], [
      { type: "p", text: "Specification limits come from the customer, design or requirement. Control limits come from process data. Capability asks how process variation compares with specification width; control charts ask whether the process is stable over time." },
      { type: "table", head: ["Index", "Formula", "What it indicates"], rows: [
        ["Cp", "(USL − LSL) / (6σ)", "Potential capability if centered"],
        ["Cpk", "min[(USL−μ)/(3σ), (μ−LSL)/(3σ)]", "Capability accounting for centering"],
        ["CPU", "(USL−μ)/(3σ)", "Upper-side distance in sigma units"],
        ["CPL", "(μ−LSL)/(3σ)", "Lower-side distance in sigma units"],
      ] },
      { type: "capability", id: "lssgb-m3-l3-cap", level: "advanced", title: "Capability simulator", task: "A filling process has LSL = 495 ml and USL = 505 ml. Adjust the mean and sigma until Cpk reaches the project goal of 1.33, then explain which lever you changed.", unit: "ml", lsl: 495, usl: 505, mean: 502, sigma: 1.5, adjust: ["mean", "sigma"], goal: 1.33, meanRange: [498, 502], sigmaRange: [0.4, 1.5] },
      { type: "callout", tone: "key", title: "Centering versus variation", text: "Reducing sigma improves both sides of the distribution. Moving the mean toward the center can improve the weaker side without reducing total process variation. A strong improvement plan considers both." },
      { type: "check", id: "lssgb-m3-l3-c1", question: "A process has Cp = 1.67 but Cpk = 0.92. What does that suggest?", options: ["The process has no variation", "The process has potential capability but is poorly centered", "The specification limits are control limits", "The gauge is automatically invalid"], answer: 1, explain: "Cp describes spread relative to tolerance; the much lower Cpk indicates the mean is close to one specification limit." },
    ]),
    lesson("lssgb-m3-l4", "SPC and process stability", 35, ["Select an appropriate control chart", "Calculate and interpret control limits conceptually", "Distinguish common and special causes"], [
      { type: "table", head: ["Chart", "Typical use"], rows: [
        ["X̄-R", "Continuous measurements collected in rational subgroups"], ["I-MR", "Continuous measurements when observations are individual"], ["p", "Fraction defective/defectives with sample size considered"], ["c", "Count of defects when area/opportunity is constant"],
      ] },
      { type: "spc", id: "lssgb-m3-l4-spc", level: "advanced", title: "X-bar and R control-chart exercise", task: "Compute the center line and control limits for the sample data, then identify points beyond the limits. Use the chart to decide whether the process appears stable.", hint: "For n=5 use A2=0.577, D3=0 and D4=2.114. Calculate subgroup means and ranges first.", chart: "xbar-r", unit: "mm", decimals: 3, samples: [[10.01,10.02,9.99,10.00,10.01],[10.00,10.01,10.02,10.00,9.99],[10.03,10.04,10.02,10.03,10.04],[10.01,10.00,10.02,10.01,10.00],[10.02,10.01,10.03,10.02,10.01],[10.05,10.06,10.04,10.05,10.06],[10.01,10.00,10.02,10.01,10.00],[10.03,10.02,10.04,10.03,10.02]], askLimits: true, askBeyond: true },
      { type: "callout", tone: "warning", title: "Do not overreact", text: "A control-chart signal is evidence of unusual process behavior, not permission to adjust the process blindly. First preserve the evidence, identify the special cause and prevent recurrence." },
      { type: "task", id: "lssgb-m3-l4-t1", title: "SPC interpretation", items: ["Choose a chart for your project metric", "Define the rational subgroup", "Write the reaction rule for an out-of-control signal", "Identify who owns the chart", "Specify how special-cause investigations will be recorded" ] },
    ]),
  ],
  quiz: quiz("lssgb-m3-quiz", "Module 3 — Measure", [
    { id: "q1", question: "What is the purpose of MSA?", options: ["Prove the process is capable", "Determine whether the measurement system is adequate for the intended decision", "Replace sampling", "Calculate financial savings"], answer: 1, explain: "MSA evaluates measurement error and measurement-system performance." },
    { id: "q2", question: "Which limits come from customer/design requirements?", options: ["Control limits", "Specification limits", "Warning limits", "Action limits"], answer: 1, explain: "Specification limits define required performance; control limits are calculated from process behavior." },
    { id: "q3", question: "What does Cpk account for that Cp does not?", options: ["Sample size only", "Process centering", "Customer satisfaction", "Measurement units"], answer: 1, explain: "Cpk considers the distance from the process mean to the nearer specification limit." },
    { id: "q4", question: "Which chart is commonly used for individual continuous observations?", options: ["I-MR", "p", "c", "Xbar-R only"], answer: 0, explain: "I-MR is designed for individual measurements and their moving ranges." },
    { id: "q5", question: "A point beyond a control limit indicates...", options: ["Guaranteed customer defect", "Evidence of unusual process behavior requiring investigation", "A specification failure automatically", "A reason to change the mean immediately"], answer: 1, explain: "A control-chart signal should trigger investigation of special causes." },
  ])
});

modules.push({
  id: "lssgb-m4", number: 4, title: "Analyze: Root Cause & Statistical Reasoning",
  summary: "Move from symptoms to verified causes using Pareto, stratification, 5 Whys, fishbone, hypothesis testing and regression.", hours: 12,
  lessons: [
    lesson("lssgb-m4-l1", "Pareto, stratification and prioritization", 30, ["Construct and interpret Pareto analysis", "Separate frequency from severity", "Use stratification to narrow the causal search"], [
      { type: "p", text: "Pareto analysis is a prioritization method, not a law that says exactly 80% of every problem comes from 20% of causes. Sort categories by an appropriate measure and make the decision rule explicit." },
      { type: "pareto", id: "lssgb-m4-l1-pareto", level: "intermediate", title: "Customer complaint Pareto", task: "Select the defect categories that together account for at least 80% of complaint volume.", hint: "Order the categories from largest to smallest and accumulate the percentages.", threshold: 80, categories: [{ label: "Incorrect invoice", count: 74 }, { label: "Late delivery", count: 52 }, { label: "Missing document", count: 21 }, { label: "Wrong quantity", count: 13 }, { label: "Damaged item", count: 9 }, { label: "Other", count: 6 }] },
      { type: "table", head: ["Question", "Why it matters"], rows: [
        ["Which category is most frequent?", "Prioritizes volume"], ["Which category is most costly?", "May prioritize financial impact differently"], ["Which category is most severe?", "Safety/regulatory risk can override frequency"], ["Does the pattern differ by branch/shift/product?", "Stratification can reveal a concentrated problem"],
      ] },
      { type: "check", id: "lssgb-m4-l1-c1", question: "A rare defect creates a serious regulatory risk. What is the correct use of Pareto?", options: ["Ignore the rare defect", "Always choose the most frequent category", "Use Pareto for prioritization while considering severity and risk separately", "Delete the category"], answer: 2, explain: "Frequency is one decision dimension; severity and regulatory risk can require immediate attention." },
    ]),
    lesson("lssgb-m4-l2", "Cause-and-effect, 5 Whys and verified root causes", 30, ["Generate plausible causes without treating them as facts", "Use 5 Whys appropriately", "Verify suspected causes with data or controlled observation"], [
      { type: "sorter", id: "lssgb-m4-l2-fish", level: "intermediate", title: "6M cause classification", task: "Classify possible causes of incorrect invoice totals using a 6M fishbone structure.", layout: "fishbone", effect: "Incorrect invoice total", buckets: [
        { label: "Man", desc: "People/skills" }, { label: "Machine", desc: "Systems/equipment" }, { label: "Method", desc: "Procedures" }, { label: "Material", desc: "Inputs/data" }, { label: "Measurement", desc: "Checks/metrics" }, { label: "Environment", desc: "Context" },
      ], items: [
        { text: "New agent has not learned the tax-code workflow", bucket: 0 },
        { text: "ERP tax table was not refreshed", bucket: 1 },
        { text: "Manual override procedure has five ambiguous steps", bucket: 2 },
        { text: "Customer price file contains duplicate product codes", bucket: 3 },
        { text: "No automated reconciliation check before release", bucket: 4 },
        { text: "Network outage causes users to work from a stale local extract", bucket: 5 },
      ] },
      { type: "whys", id: "lssgb-m4-l2-whys", level: "advanced", title: "5 Whys practice", task: "Build a causal chain for the observed problem without jumping to a solution.", problem: "A customer received an invoice with the wrong tax amount.", hint: "Each answer should explain the previous why. Avoid statements such as 'because the operator was careless' unless you can explain the system condition behind it.", steps: [
        { question: "Why was the tax amount wrong?", options: ["The invoice used an outdated tax code", "The operator is bad", "The customer complained"], answer: 0 },
        { question: "Why was an outdated code used?", options: ["The tax table in the billing system was not refreshed", "The operator did not care", "The invoice was printed"], answer: 0 },
        { question: "Why was the table not refreshed?", options: ["The update task had no monitored owner or completion check", "Customers were busy", "The printer failed"], answer: 0 },
      ], countermeasure: { question: "What should be verified next?", options: ["Whether the ownership/control gap occurs consistently", "Whether to blame the operator", "Whether to remove tax", "Whether to stop invoicing"], answer: 0 } },
      { type: "callout", tone: "key", title: "Root cause is not the deepest-sounding sentence", text: "A useful root cause is a condition that explains the observed behavior and, when controlled, is expected to prevent recurrence. Verify it with evidence." },
    ]),
    lesson("lssgb-m4-l3", "Hypothesis testing and practical statistical inference", 35, ["Formulate null and alternative hypotheses", "Interpret p-values and confidence intervals correctly", "Select tests based on data type and design"], [
      { type: "table", head: ["Question", "Potential method"], rows: [
        ["Did average cycle time change after a process change?", "t-test / paired analysis depending on design"],
        ["Do defect rates differ between two groups?", "Proportion comparison / appropriate categorical test"],
        ["Do three or more group means differ?", "ANOVA"],
        ["Are two continuous variables associated?", "Correlation/regression"],
      ] },
      { type: "h", text: "Hypothesis structure" },
      { type: "code", text: "H0: no specified difference / association\nH1: specified difference / association\nChoose alpha before looking at the result.\nInterpret the p-value in the context of H0 and the study design." },
      { type: "callout", tone: "warning", title: "A p-value is not the probability that H0 is true", text: "A p-value describes how surprising the observed result would be under the null model, given the assumptions of the test. Statistical significance is not the same as practical importance." },
      { type: "form", id: "lssgb-m4-l3-test", level: "advanced", title: "Choose the analysis", task: "Select the most appropriate first analysis for each question.", fields: [
        { kind: "select", label: "Compare mean delivery time before vs after on the same matched orders", options: ["Paired analysis", "Chi-square only", "Pareto", "Fishbone"], answer: 0 },
        { kind: "select", label: "Compare mean processing time across four independent branches", options: ["ANOVA", "5 Whys", "p chart", "SIPOC"], answer: 0 },
        { kind: "select", label: "Assess relationship between order volume and overtime hours", options: ["Correlation/regression", "Fishbone", "Acceptance sampling", "SIPOC"], answer: 0 },
      ] },
      { type: "check", id: "lssgb-m4-l3-c1", question: "A statistically significant difference is found but the mean improved by only 0.2 minutes on a 45-minute process. What should the Green Belt do?", options: ["Declare victory automatically", "Assess practical significance, cost and customer impact", "Delete the data", "Increase alpha until it looks important"], answer: 1, explain: "Statistical significance does not automatically establish meaningful operational impact." },
    ]),
    lesson("lssgb-m4-l4", "Regression, interaction and Analyze tollgate", 35, ["Interpret simple regression outputs", "Distinguish association from causation", "Prepare an evidence-based root-cause statement"], [
      { type: "p", text: "Regression can quantify relationships and support prediction, but the coefficient alone does not prove that changing X will cause Y to change. Design, timing, confounding and process knowledge matter." },
      { type: "table", head: ["Output", "Question"], rows: [
        ["Slope", "How does predicted Y change with one unit of X?"], ["R²", "How much variation in Y is explained by the model under its definition?"], ["Residuals", "Does the model leave systematic patterns?"], ["Confidence interval", "What range of parameter values is compatible with the data/model assumptions?"],
      ] },
      { type: "check", id: "lssgb-m4-l4-c1", question: "If temperature and defect rate are correlated, what is the next question?", options: ["Temperature is definitely the root cause", "What evidence and design can distinguish temperature effect from confounding or coincidence?", "Stop measuring", "Change temperature immediately"], answer: 1, explain: "Correlation identifies a relationship to investigate, not proof of causation." },
      { type: "task", id: "lssgb-m4-l4-t1", title: "Analyze tollgate", items: ["Show the baseline and stratification", "Show Pareto/prioritization", "Document suspected causes", "Show the evidence supporting each critical cause", "Record causes ruled out", "State which causes the Improve phase will address and why" ] },
      { type: "callout", tone: "key", title: "Analyze exit condition", text: "The team should be able to defend a short list of verified or strongly supported causal factors. 'Everyone agrees' is not evidence." },
    ]),
  ],
  quiz: quiz("lssgb-m4-quiz", "Module 4 — Analyze", [
    { id: "q1", question: "What is Pareto primarily used for?", options: ["Proving causation", "Prioritizing categories using a chosen measure", "Replacing a control chart", "Calculating Cpk"], answer: 1, explain: "Pareto helps focus attention; it does not prove causes." },
    { id: "q2", question: "A fishbone diagram should be treated as...", options: ["A list of proven causes", "A structured way to generate and organize hypotheses", "A financial model", "A control plan"], answer: 1, explain: "Candidate causes need evidence." },
    { id: "q3", question: "What does a p-value directly describe?", options: ["Probability H0 is true", "Evidence against H0 under the test model", "Probability the project will succeed", "Effect size"], answer: 1, explain: "It is interpreted under the null model and test assumptions." },
    { id: "q4", question: "Why inspect residuals in regression?", options: ["To prove causation", "To check whether systematic patterns suggest model inadequacy", "To increase sample size", "To calculate VOC"], answer: 1, explain: "Residual behavior can reveal nonlinearity, unequal variance or missing structure." },
    { id: "q5", question: "Which statement is strongest?", options: ["The team thinks training is the cause", "Training is correlated with the defect", "Evidence shows the defect occurs disproportionately when the training condition is absent and the mechanism is verified", "Training is expensive"], answer: 2, explain: "A defensible cause combines observed evidence with a plausible mechanism and verification." },
  ])
});

modules.push({
  id: "lssgb-m5", number: 5, title: "Improve: Solutions, FMEA, DOE & Validation",
  summary: "Generate countermeasures, assess risk, design pilots and experiments, validate improvement and manage implementation.", hours: 12,
  lessons: [
    lesson("lssgb-m5-l1", "Solution generation and Lean redesign", 30, ["Generate multiple countermeasures", "Prefer controls that prevent or detect errors early", "Use Lean principles to improve flow without creating new risk"], [
      { type: "p", text: "Once causes are verified, the team can design countermeasures. Strong solutions change the process condition that produces the problem; weak solutions rely entirely on reminders and vigilance." },
      { type: "table", head: ["Countermeasure type", "Example", "Relative dependence on human memory"], rows: [
        ["Eliminate", "Remove an unnecessary manual approval", "Low"], ["Prevent", "System blocks invalid code", "Low"], ["Automate", "Automatic reconciliation", "Low"], ["Standardize", "Visual standard and work instruction", "Medium"], ["Train", "Teach a new procedure", "Higher"],
      ] },
      { type: "form", id: "lssgb-m5-l1-sol", level: "intermediate", title: "Countermeasure selection", task: "Select the stronger countermeasure for the verified cause in each case.", fields: [
        { kind: "select", label: "Wrong product code entered", options: ["Send another reminder", "Use a controlled dropdown populated from the master product list"], answer: 1 },
        { kind: "select", label: "Inspection result is sometimes forgotten", options: ["Add a required electronic field that prevents release without a result", "Tell inspectors to remember"], answer: 0 },
        { kind: "select", label: "Long queue caused by one approval step", options: ["Remove/automate the approval if risk analysis permits", "Add a second spreadsheet to track the queue"], answer: 0 },
      ] },
      { type: "check", id: "lssgb-m5-l1-c1", question: "Why should solutions be tied to verified causes?", options: ["To make the report longer", "Otherwise the team cannot reasonably expect the solution to affect the problem mechanism", "Because all solutions require software", "Because Lean prohibits training"], answer: 1, explain: "A solution should address a demonstrated mechanism rather than a symptom or opinion." },
    ]),
    lesson("lssgb-m5-l2", "FMEA and risk-based improvement", 30, ["Use FMEA to anticipate failure modes", "Score severity, occurrence and detection consistently", "Prioritize risk without treating an RPN as absolute truth"], [
      { type: "table", head: ["FMEA field", "Question"], rows: [
        ["Failure mode", "How can the process/product fail?"], ["Effect", "What happens if it fails?"], ["Cause", "Why could it happen?"], ["Current controls", "What prevents or detects it today?"], ["Severity", "How serious is the effect?"], ["Occurrence", "How often is the cause/failure likely?"], ["Detection", "How likely is the current control to detect it before impact?"], ["Action", "What change reduces risk?"],
      ] },
      { type: "sorter", id: "lssgb-m5-l2-fmea", level: "advanced", title: "FMEA action logic", task: "Place each proposed action into the dominant FMEA strategy.", layout: "columns", buckets: [
        { label: "Prevent cause", desc: "Reduce occurrence" }, { label: "Detect before release", desc: "Improve detection" }, { label: "Reduce effect/severity", desc: "Limit consequence" },
      ], items: [
        { text: "Interlock prevents selecting an inactive product code", bucket: 0 },
        { text: "Automated reconciliation flags mismatch before invoice release", bucket: 1 },
        { text: "Containment rule prevents a high-risk shipment from reaching customer", bucket: 2 },
      ] },
      { type: "callout", tone: "warning", title: "Do not worship RPN", text: "Risk Priority Number is a prioritization aid. A high-severity regulatory or safety failure can deserve action even if its numerical product is not the highest." },
      { type: "task", id: "lssgb-m5-l2-t1", title: "Mini-FMEA", items: ["Choose one process step", "List three failure modes", "Describe effect and cause", "Rate severity/occurrence/detection using a defined scale", "Select the strongest action and owner", "Define how the new control will be verified" ] },
    ]),
    lesson("lssgb-m5-l3", "Pilots, DOE and controlled experimentation", 35, ["Distinguish pilot from experiment", "Identify factors, responses and controls", "Understand main effects and interactions"], [
      { type: "p", text: "A pilot tests whether a solution can work in a realistic setting. A designed experiment deliberately changes factors so their effects can be estimated efficiently. Green Belts should use the simplest defensible design that answers the question." },
      { type: "table", head: ["Concept", "Example"], rows: [
        ["Response", "Invoice correction rate"], ["Factor", "Validation rule enabled: yes/no"], ["Level", "Yes vs no"], ["Control variable", "Product family held constant or included in design"], ["Interaction", "Effect of one factor changes depending on another factor"], ["Randomization", "Reduces bias from hidden time/order effects"], ["Replication", "Provides information about experimental variation"],
      ] },
      { type: "form", id: "lssgb-m5-l3-doe", level: "expert", title: "DOE reasoning", task: "Choose the design decision that best protects the validity of a small experiment.", hint: "Think about randomization, replication, factor levels and response definition.", fields: [
        { kind: "select", label: "Two factors may interact. What should you avoid?", options: ["Testing combinations of factor levels", "Changing both factors in an uncontrolled way and attributing all change to one", "Recording the response", "Randomizing run order"], answer: 1 },
        { kind: "select", label: "Why randomize run order?", options: ["To make the sample smaller", "To reduce confounding with time/order effects", "To eliminate measurement error", "To increase Cpk"], answer: 1 },
        { kind: "select", label: "Why replicate?", options: ["To estimate experimental variation and improve precision", "To guarantee causation", "To avoid controls", "To remove outliers automatically"], answer: 0 },
      ] },
      { type: "callout", tone: "key", title: "Experiment before scale", text: "A controlled pilot protects the organization from deploying a solution that works in theory but creates a new defect, delay, compliance issue or customer burden." },
    ]),
    lesson("lssgb-m5-l4", "Validate improvement and the Improve tollgate", 35, ["Compare before/after performance appropriately", "Confirm benefit, side effects and financial/customer impact", "Prepare implementation and change-management plans"], [
      { type: "p", text: "Improvement is not validated because a chart moved in the desired direction for one week. Validate the metric, time period, population, measurement system and potential unintended consequences." },
      { type: "table", head: ["Validation question", "Example"], rows: [
        ["Primary response", "Did correction rate fall?"], ["Stability", "Did the reduction persist across several cycles?"], ["Customer", "Did complaints or satisfaction improve?"], ["Capacity", "Did cycle time or workload change?"], ["Risk", "Did any new failure mode appear?"], ["Financial", "Were benefits realized using agreed finance rules?"],
      ] },
      { type: "check", id: "lssgb-m5-l4-c1", question: "A pilot reduces defects but doubles processing time. What should the team do?", options: ["Declare success", "Evaluate the trade-off and redesign the solution before scale", "Hide the cycle-time result", "Close the project immediately"], answer: 1, explain: "An improvement that creates a major new constraint needs redesign or a balanced decision with stakeholders." },
      { type: "task", id: "lssgb-m5-l4-t1", title: "Improve tollgate", items: ["Document verified cause-to-solution linkage", "Complete risk review/FMEA", "Run pilot or experiment", "Compare baseline and post-change performance", "Document side effects", "Confirm process-owner acceptance", "Prepare implementation plan" ] },
    ]),
  ],
  quiz: quiz("lssgb-m5-quiz", "Module 5 — Improve", [
    { id: "q1", question: "Which countermeasure generally creates the strongest error-proofing?", options: ["Reminder poster", "System interlock preventing invalid input", "Annual training only", "Verbal warning"], answer: 1, explain: "A preventive control is less dependent on memory." },
    { id: "q2", question: "In FMEA, detection asks...", options: ["How severe is the effect?", "How likely the current control is to detect the failure before impact", "How expensive is the project?", "How many employees are involved?"], answer: 1, explain: "Detection evaluates the effectiveness of current detection controls." },
    { id: "q3", question: "Why randomize DOE run order?", options: ["To reduce confounding with time/order effects", "To eliminate all variation", "To make the result significant", "To reduce the number of factors"], answer: 0, explain: "Randomization protects against systematic time/order bias." },
    { id: "q4", question: "What is an interaction?", options: ["Two people disagree", "The effect of one factor depends on the level of another factor", "Two defects occur together", "A control limit is crossed"], answer: 1, explain: "Interaction is a statistical/design concept describing dependent factor effects." },
    { id: "q5", question: "What should happen before full-scale implementation?", options: ["Validate the solution and unintended consequences", "Delete baseline data", "Stop measuring", "Skip process-owner review"], answer: 0, explain: "Validation demonstrates that the change works and does not create unacceptable new problems." },
  ])
});

modules.push({
  id: "lssgb-m6", number: 6, title: "Control, Sustainment & Green Belt Capstone",
  summary: "Create control plans, SPC response rules, ownership, documentation and a complete DMAIC project package.", hours: 12,
  lessons: [
    lesson("lssgb-m6-l1", "Control plans and process ownership", 30, ["Build a practical control plan", "Define metric, frequency, owner, limits and reaction", "Transfer ownership from project team to process owner"], [
      { type: "table", head: ["Control-plan field", "Example"], rows: [
        ["CTQ/process characteristic", "Invoice tax-code accuracy"], ["Specification/target", "100% valid code at release"], ["Measurement", "Automated reconciliation"], ["Frequency", "Every invoice"], ["Owner", "Billing Operations"], ["Reaction", "Block release, investigate code source, correct and document"], ["Escalation", "Process Owner → Finance/IT if systemic"],
      ] },
      { type: "form", id: "lssgb-m6-l1-control", level: "advanced", title: "Control-plan quality", task: "Choose the strongest control-plan element.", fields: [
        { kind: "select", label: "Owner", options: ["Green Belt forever", "Named process owner/role with responsibility", "Nobody"], answer: 1 },
        { kind: "select", label: "Reaction plan", options: ["Investigate later", "Define immediate containment, investigation and escalation steps", "Ignore if average remains good"], answer: 1 },
        { kind: "select", label: "Metric", options: ["Quality", "A defined measure with unit, denominator and data source", "Management feeling"], answer: 1 },
      ] },
      { type: "callout", tone: "key", title: "Control is designed before the project leaves", text: "The team should know how the improved process will be monitored and what happens when performance leaves the expected condition. A dashboard without a reaction plan is not a control system." },
      { type: "task", id: "lssgb-m6-l1-t1", title: "Build a control plan", items: ["Select three critical process characteristics", "Define target/specification", "Specify measurement method", "Set frequency", "Assign owner", "Write reaction and escalation rules" ] },
    ]),
    lesson("lssgb-m6-l2", "SPC response, visual management and sustainment", 30, ["Write rational SPC reaction rules", "Use visual management without creating noise", "Audit the process after handover"], [
      { type: "p", text: "A control chart becomes valuable when people know what to do when a signal appears. The reaction should preserve the evidence, contain risk where necessary, investigate the special cause and restore the process using a controlled decision." },
      { type: "steps", title: "Example reaction sequence", items: ["Confirm the signal and data integrity", "Protect potentially affected output", "Record the condition and time", "Investigate the special cause using the approved method", "Correct the cause where appropriate", "Resume normal operation under the standard", "Document the learning and escalate repeated signals" ] },
      { type: "spc", id: "lssgb-m6-l2-spc", level: "expert", title: "Control-chart signal recognition", task: "Use the control chart to identify observations beyond the calculated limits and assess whether the reaction plan should be triggered.", hint: "Separate a point beyond a limit from a stable process. A signal is a reason to investigate, not a reason to adjust blindly.", chart: "imr", unit: "hours", decimals: 1, values: [31,30,32,31,30,32,31,30,31,32,30,31,45,44,46,45,44,31,30,32,31], askLimits: true, askBeyond: true },
      { type: "check", id: "lssgb-m6-l2-c1", question: "What should an operator do first after a confirmed special-cause signal?", options: ["Adjust the process randomly", "Preserve evidence and follow the defined containment/investigation reaction", "Delete the point", "Change the control limits"], answer: 1, explain: "The reaction plan should protect the customer and preserve evidence before corrective action." },
    ]),
    lesson("lssgb-m6-l3", "Project closure, benefits and lessons learned", 30, ["Close a DMAIC project with evidence", "Document financial and customer results", "Transfer ownership and lessons learned"], [
      { type: "table", head: ["Closure evidence", "Question"], rows: [
        ["Before/after metric", "Did the primary response improve against the baseline?"], ["Stability", "Is the improvement sustained?"], ["Financial", "What benefits were actually realized under finance rules?"], ["Customer", "Did CTQ/customer performance improve?"], ["Control", "Who owns the metric and response?"], ["Documentation", "Are standards, training and process records updated?"],
      ] },
      { type: "callout", tone: "warning", title: "Do not close on enthusiasm", text: "The final presentation should make it possible for an independent reviewer to reconstruct the logic from problem → baseline → cause → solution → validated result → control." },
      { type: "task", id: "lssgb-m6-l3-t1", title: "Executive closure pack", items: ["One-page project summary", "Baseline and target", "Root-cause evidence", "Improvement experiment/pilot results", "Control chart or ongoing metric", "Financial/customer impact", "Owner and sustainment plan", "Lessons learned and next opportunity" ] },
    ]),
    lesson("lssgb-m6-l4", "Green Belt capstone — complete DMAIC simulation", 60, ["Integrate all DMAIC tools", "Defend analysis and decisions", "Produce a professional Green Belt project package"], [
      { type: "p", text: "Capstone case: a fictional Cameroon distribution operation reports that order-to-dispatch cycle time averages 52 hours, with 18% of orders exceeding the 72-hour customer commitment. The process owner wants the rate below 8% without increasing overtime. You receive six weeks of order-level data, branch, product family, shift, rework flag and timestamps. Your job is to complete DMAIC, not simply recommend training." },
      { type: "table", head: ["Phase", "Capstone deliverable"], rows: [
        ["Define", "Charter, VOC/CTQ, SIPOC, scope and goal"], ["Measure", "Operational definition, data-quality checks, baseline, stratification and measurement plan"], ["Analyze", "Pareto, process patterns, verified causes and statistical evidence where appropriate"], ["Improve", "Countermeasures, FMEA, pilot/DOE logic and validation"], ["Control", "Control plan, SPC/metric, reaction plan, owner and closure"],
      ] },
      { type: "form", id: "lssgb-m6-l4-capstone", level: "expert", title: "Capstone decision gate", task: "Choose the defensible decision at each stage of the case.", fields: [
        { kind: "select", label: "Define: Sales says late dispatch is caused by warehouse staffing. What do you do?", options: ["Accept it", "Record staffing as a hypothesis and define the measurement needed to test it", "Hire immediately"], answer: 1 },
        { kind: "select", label: "Measure: one branch has missing timestamps for 22% of orders. What do you do?", options: ["Ignore missing data", "Assess missingness, repair/replace the data source if possible and document the limitation", "Invent timestamps"], answer: 1 },
        { kind: "select", label: "Analyze: a factor is associated with late orders. What is next?", options: ["Declare root cause", "Test the mechanism and rule out important confounding", "Deploy immediately"], answer: 1 },
        { kind: "select", label: "Improve: pilot reduces late orders but raises overtime 20%", options: ["Scale unchanged", "Evaluate the trade-off and redesign/optimize before scale", "Hide overtime"], answer: 1 },
        { kind: "select", label: "Control: the process owner asks the Green Belt to keep monitoring forever", options: ["Agree", "Transfer ownership, define controls and escalation, then exit the project", "Close without controls"], answer: 1 },
      ] },
      { type: "task", id: "lssgb-m6-l4-capstone-task", title: "Final Green Belt project", items: [
        "Prepare a 10–15 slide DMAIC executive presentation",
        "Include the problem, customer impact and quantified goal",
        "Show SIPOC/process map and operational definitions",
        "Show baseline, data quality and stratification",
        "Show root-cause evidence and analyses",
        "Show solution selection, risk assessment and pilot/experiment",
        "Show validated results and practical/financial impact",
        "Show control plan, SPC/metric and reaction plan",
        "Present the project to a reviewer and answer challenge questions",
      ] },
      { type: "callout", tone: "workplace", title: "Green Belt standard", text: "A Green Belt is expected to be able to explain not only what changed, but why the team believed the change would work, how the evidence supports the conclusion, and how the process owner will sustain it." },
    ]),
  ],
  quiz: quiz("lssgb-m6-quiz", "Module 6 — Control & Closure", [
    { id: "q1", question: "What makes a control plan actionable?", options: ["A dashboard only", "A defined measure, frequency, owner, expected condition and reaction", "A project charter", "A list of tools"], answer: 1, explain: "Control requires both monitoring and a defined response." },
    { id: "q2", question: "Who should normally own the improved process after closure?", options: ["Green Belt", "Process Owner", "Finance only", "External auditor"], answer: 1, explain: "The process owner is responsible for sustaining the process." },
    { id: "q3", question: "What should happen after a special-cause signal?", options: ["Blindly adjust the process", "Follow the documented reaction and investigate the cause", "Delete the point", "Recalculate limits to hide it"], answer: 1, explain: "Signals trigger a controlled investigation." },
    { id: "q4", question: "What is essential in project closure?", options: ["Only a celebration", "Evidence linking baseline, validated improvement and sustainment", "Deleting baseline data", "A new project charter"], answer: 1, explain: "Closure should make the project logic and sustained result auditable." },
    { id: "q5", question: "What distinguishes a Green Belt project from a collection of tools?", options: ["Number of charts", "A coherent evidence-based problem-solving story from customer need through control", "Use of every statistical test", "A long report"], answer: 1, explain: "Tools are selected because they answer project questions within DMAIC." },
  ])
});

export const LSSGB_COURSE: LmsCourse = {
  id: "lssgb",
  code: "LSSGB",
  title: "Lean Six Sigma Green Belt",
  subtitle: "Applied DMAIC, process improvement, statistical analysis and project leadership",
  accent: "#22C55E",
  hours: 68,
  certification: "Analytix Engineering professional certificate with QR verification",
  modules,
};
