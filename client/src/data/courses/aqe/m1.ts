import type { CourseModule } from "../../../lms/types";

/* ──────────────────────────────────────────────────────────────────────
   Module 1 — Quality Management Systems and Leadership
   Associate Quality Engineer (AQE) Certification Course
   ────────────────────────────────────────────────────────────────────── */

const L1_ID = "aqe-m1-l1";
const L2_ID = "aqe-m1-l2";
const L3_ID = "aqe-m1-l3";
const L4_ID = "aqe-m1-l4";
const L5_ID = "aqe-m1-l5";
const PRACTICE_ID = "aqe-m1-practice";
const QUIZ_ID = "aqe-m1-quiz";

export const m1: CourseModule = {
  id: "aqe-m1",
  number: 1,
  title: "Quality Management Systems and Leadership",
  summary:
    "This module establishes the foundation of quality management for the associate quality engineer. It covers the seven quality management principles defined in ISO 9000:2015 and the process approach that underpins ISO 9001:2015, including its high-level structure clauses 4–10. Sector-specific standards — IATF 16949 for automotive, AS9100 for aerospace, and ISO 13485 for medical devices — are examined alongside their unique requirements. The module addresses auditing competencies: planning, conducting, and reporting audits per ISO 19011, writing findings and verifying corrective actions. Quality costs are analysed through the prevention–appraisal–failure (PAF) model, and key metrics such as ppm, DPMO, sigma level, FPY, RTY, and OEE are derived with worked examples. Finally, the module defines the quality engineer's leadership role in cross-functional teams, influencing without authority, and driving continual improvement.",
  hours: 16,

  lessons: [
    /* ================================================================
       LESSON 1 — Quality management principles and the process approach
       ================================================================ */
    {
      id: L1_ID,
      number: 1,
      title: "Quality management principles and the process approach",
      minutes: 25,
      objectives: [
        "Explain each of the seven quality management principles from ISO 9000:2015 and give a workplace example for each.",
        "Describe the process approach including inputs, outputs, resources, owner, indicators, and risk considerations.",
        "Apply the Plan–Do–Check–Act (PDCA) cycle at system, process, and product levels.",
      ],
      blocks: [
        {
          type: "p",
          text: "Every quality management system rests on a set of principles that guide organisations toward sustained success. ISO 9000:2015 defines seven quality management principles (QMPs) that form the philosophical backbone of the ISO 9001 standard. As a quality engineer, you must not only know these principles — you must be able to translate them into measurable actions within your organisation.",
        },
        {
          type: "h",
          text: "The seven quality management principles",
        },
        {
          type: "table",
          head: ["Principle", "Core intent", "Workplace example"],
          rows: [
            [
              "Customer focus",
              "Understand current and future customer needs, meet requirements, exceed expectations",
              "A Douala brewing company surveys distributors quarterly to align product specifications with market demand",
            ],
            [
              "Leadership",
              "Establish unity of purpose and direction, create conditions for people to achieve quality objectives",
              "Plant manager in Bafoussam sets measurable quality targets and reviews them at weekly stand-ups",
            ],
            [
              "Engagement of people",
              "Competent, empowered, engaged people at all levels create value",
              "Operators at a Bonabéri machining shop are trained to halt the line when a defect is detected",
            ],
            [
              "Process approach",
              "Manage activities as interrelated processes that function as a coherent system",
              "A Yaoundé cement plant maps each process from raw material receipt to dispatch with defined owners",
            ],
            [
              "Improvement",
              "Maintain focus on improvement to sustain current performance and react to changing conditions",
              "Monthly kaizen events at a food processing line in Douala target a 5 % reduction in rework each quarter",
            ],
            [
              "Evidence-based decision making",
              "Decisions based on analysis and evaluation of data are more likely to produce desired results",
              "Using SPC charts to decide whether to adjust a filling machine rather than relying on operator intuition",
            ],
            [
              "Relationship management",
              "Manage relationships with relevant interested parties to optimise their impact on performance",
              "A Bonabéri automotive parts supplier conducts annual audits and development workshops with key raw-material vendors",
            ],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "Principles vs requirements",
          text: "The seven QMPs are principles, not auditable requirements. ISO 9001 translates these principles into specific 'shall' statements. During an audit you assess compliance against ISO 9001 requirements, but you use the principles to interpret intent.",
        },
        {
          type: "h",
          text: "The process approach",
        },
        {
          type: "p",
          text: "The process approach requires organisations to understand and manage interrelated processes as a system. Each process transforms inputs into outputs using resources, under the direction of a process owner. The quality engineer's role is to ensure every process has defined indicators (KPIs) and that risks and opportunities are identified and addressed.",
        },
        {
          type: "table",
          head: ["Element", "Description", "Example (machining process)"],
          rows: [
            ["Inputs", "Materials, information, requirements entering the process", "Raw steel bar stock, engineering drawing, customer PO"],
            ["Activities", "Steps that transform inputs", "Turning, milling, deburring, inspection"],
            ["Outputs", "Products, services, information leaving the process", "Finished shaft, inspection report, delivery note"],
            ["Owner", "Person accountable for the process", "Production supervisor — Mr Nkeng"],
            ["Resources", "People, equipment, infrastructure, environment", "CNC lathe, trained operator, calibrated micrometer, climate-controlled shop"],
            ["Indicators", "Metrics to monitor process performance", "Cpk ≥ 1.33, first-pass yield ≥ 97 %, cycle time ≤ 4.2 min"],
            ["Risks & opportunities", "Factors that could affect ability to achieve intended results", "Risk: tool wear causing out-of-tolerance parts; Opportunity: new insert grade reducing scrap by 15 %"],
          ],
        },
        {
          type: "equip",
          title: "Process flow chart",
          items: [
            {
              art: "process-flow-chart",
              label: "Process flow chart",
              desc: "A process flow chart documents the sequence of operations, decision points, inspections, and material movements. It is a key documented information requirement in ISO 9001 clause 8.1 and is essential for FMEA, control plan development, and auditing.",
            },
          ],
        },
        {
          type: "h",
          text: "PDCA at three levels",
        },
        {
          type: "p",
          text: "The Plan–Do–Check–Act cycle, attributed to Deming, operates at three levels in a quality management system. At the system level, PDCA drives the overall QMS planning and review. At the process level, it governs how individual processes are established, monitored, and improved. At the product level, it guides design, verification, validation, and release.",
        },
        {
          type: "table",
          head: ["Level", "Plan", "Do", "Check", "Act"],
          rows: [
            [
              "System",
              "Establish QMS policy, objectives, context (clauses 4–6)",
              "Implement processes and allocate resources (clauses 7–8)",
              "Monitor, measure, analyse, evaluate; conduct internal audits and management review (clause 9)",
              "Address nonconformities, take corrective actions, drive continual improvement (clause 10)",
            ],
            [
              "Process",
              "Define process inputs, outputs, KPIs, risks",
              "Execute the process per documented procedures",
              "Measure KPIs, analyse trends, compare to targets",
              "Adjust process parameters, update procedures, retrain",
            ],
            [
              "Product",
              "Design and development planning, design inputs",
              "Create prototypes, produce pilot run",
              "Design verification and validation, inspection results",
              "Release product or initiate corrective design changes",
            ],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "PDCA is not sequential",
          text: "In practice, PDCA operates as a continuous spiral. The 'Act' phase feeds directly into new planning. A quality engineer facilitating a corrective action will often cycle through PDCA multiple times before closing a finding.",
        },
        {
          type: "sorter",
          id: "aqe-m1-sorter-principles",
          title: "Classify the seven QMP examples",
          task: "Drag each workplace scenario into the correct quality management principle bucket.",
          layout: "columns",
          buckets: [
            { label: "Customer focus", desc: "Understanding and meeting customer needs" },
            { label: "Leadership", desc: "Creating unity of purpose" },
            { label: "Engagement of people", desc: "Empowering competent people" },
            { label: "Process approach", desc: "Managing interrelated processes" },
            { label: "Improvement", desc: "Focus on continual improvement" },
            { label: "Evidence-based decision making", desc: "Data-driven decisions" },
          ],
          items: [
            {
              text: "The Douala plant manager defines clear quality objectives and personally chairs the weekly quality review",
              bucket: 1,
              explain: "Setting direction and reviewing progress are core leadership behaviours.",
            },
            {
              text: "A Bafoussam cement factory analyses customer complaint trends before revising its product specification",
              bucket: 0,
              explain: "Using customer feedback to adjust specifications demonstrates customer focus.",
            },
            {
              text: "Operators at a Bonabéri food processing line are authorised to stop the conveyor when they detect contamination",
              bucket: 2,
              explain: "Empowering operators to act demonstrates engagement of people.",
            },
            {
              text: "A Yaoundé machining shop maps its heat-treatment process with defined inputs, outputs, and KPIs",
              bucket: 3,
              explain: "Documenting process elements is the process approach in action.",
            },
            {
              text: "The quality team uses Pareto analysis of scrap data to prioritise which defect category to tackle first",
              bucket: 5,
              explain: "Using data analysis to direct resources is evidence-based decision making.",
            },
            {
              text: "A monthly kaizen event targets a 10 % reduction in customer returns for the beverage filling line",
              bucket: 4,
              explain: "Structured improvement events with measurable targets exemplify the improvement principle.",
            },
          ],
        },
        {
          type: "form",
          id: "aqe-m1-form-pdca",
          title: "Match PDCA steps to actions",
          task: "For each action below, select the PDCA phase it belongs to.",
          fields: [
            {
              kind: "select",
              label: "Conduct an internal audit of the receiving inspection process",
              options: ["Plan", "Do", "Check", "Act"],
              answer: 2,
              explain: "Internal audits are a 'Check' activity — they evaluate whether the process conforms to planned arrangements.",
            },
            {
              kind: "select",
              label: "Define quality objectives for the next fiscal year",
              options: ["Plan", "Do", "Check", "Act"],
              answer: 0,
              explain: "Setting objectives is part of 'Plan' — establishing what you intend to achieve.",
            },
            {
              kind: "select",
              label: "Implement a revised work instruction for soldering operations",
              options: ["Plan", "Do", "Check", "Act"],
              answer: 1,
              explain: "Executing updated procedures is a 'Do' activity.",
            },
            {
              kind: "select",
              label: "Issue a corrective action request after finding a recurring nonconformity",
              options: ["Plan", "Do", "Check", "Act"],
              answer: 3,
              explain: "Taking corrective action to eliminate a nonconformity's root cause is the 'Act' phase.",
            },
            {
              kind: "select",
              label: "Review SPC trend charts during the monthly management review",
              options: ["Plan", "Do", "Check", "Act"],
              answer: 2,
              explain: "Reviewing performance data against objectives is a 'Check' activity.",
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m1-check-l1",
          question: "Which quality management principle is MOST directly linked to ISO 9001's requirement for organisations to determine external and internal issues relevant to their purpose (clause 4.1)?",
          options: [
            "Customer focus",
            "Process approach",
            "Evidence-based decision making",
            "Leadership",
          ],
          answer: 3,
          explain: "Clause 4.1 requires top management to understand the organisation's context and establish strategic direction — a core leadership responsibility. While other principles are relevant, leadership is the driver for establishing context, purpose, and direction.",
        },
        {
          type: "links",
          items: [
            {
              label: "ISO 9000:2015 — Quality management systems — Fundamentals and vocabulary",
              url: "https://www.iso.org/standard/45481.html",
              source: "ISO",
            },
            {
              label: "ASQ — Seven quality management principles",
              url: "https://asq.org/quality-resources/quality-management-system",
              source: "ASQ",
            },
          ],
        },
      ],
    },

    /* ================================================================
       LESSON 2 — ISO 9001:2015 requirements for the quality engineer
       ================================================================ */
    {
      id: L2_ID,
      number: 2,
      title: "ISO 9001:2015 requirements for the quality engineer",
      minutes: 30,
      objectives: [
        "Describe the high-level structure (HLS) of ISO 9001:2015 and explain the purpose of clauses 4 through 10.",
        "Distinguish between 'maintained' documented information (procedures, policies) and 'retained' documented information (records, evidence).",
        "Apply clause 8 operational planning requirements to a manufacturing scenario including design inputs, verification, and control of external providers.",
      ],
      blocks: [
        {
          type: "p",
          text: "ISO 9001:2015 uses the Annex SL high-level structure (HLS) shared by all ISO management system standards. This common framework makes integration of quality, environmental (ISO 14001), and occupational health and safety (ISO 45001) systems straightforward. For the quality engineer, deep familiarity with clauses 4–10 is non-negotiable — you must know which requirements apply to each situation you encounter.",
        },
        {
          type: "h",
          text: "High-level structure overview",
        },
        {
          type: "table",
          head: ["Clause", "Title", "Key focus for quality engineers"],
          rows: [
            ["4", "Context of the organisation", "Internal/external issues, interested parties, QMS scope, process interactions"],
            ["5", "Leadership", "Quality policy, roles and responsibilities, customer focus"],
            ["6", "Planning", "Risks and opportunities, quality objectives, planning of changes"],
            ["7", "Support", "Resources, competence, awareness, communication, documented information"],
            ["8", "Operation", "Operational planning, design and development, production, release, control of nonconforming outputs"],
            ["9", "Performance evaluation", "Monitoring, measurement, analysis, evaluation, internal audit, management review"],
            ["10", "Improvement", "Nonconformity, corrective action, continual improvement"],
          ],
        },
        {
          type: "h",
          text: "Clause 4 — Context of the organisation",
        },
        {
          type: "p",
          text: "Clause 4 requires the organisation to determine external and internal issues that are relevant to its purpose and strategic direction. For a Douala-based brewing company, external issues might include regulatory changes by ANOR (Agence des Normes et de la Qualité), currency fluctuation of the FCFA, or supply-chain disruptions. Internal issues could include ageing equipment, workforce competency gaps, or production capacity constraints.",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Interested parties in practice",
          text: "At a Bafoussam machining shop, interested parties include: customers (automotive OEMs), employees, regulatory bodies (Ministry of Mines), raw-material suppliers, the local community (noise and environmental impact), and shareholders. Each party's relevant requirements must be determined and monitored.",
        },
        {
          type: "h",
          text: "Clause 6 — Planning: risks, opportunities, and objectives",
        },
        {
          type: "p",
          text: "Clause 6.1 requires the organisation to address risks and opportunities when planning the QMS. This is not a requirement for formal risk assessment (such as an FMEA), but rather a systematic consideration of what could go wrong or be improved. Quality objectives (clause 6.2) must be measurable, monitored, communicated, and updated. They must be consistent with the quality policy and relevant to product conformity.",
        },
        {
          type: "steps",
          title: "Setting effective quality objectives",
          items: [
            "Align each objective with the quality policy and strategic direction",
            "Make it measurable — specify the metric, target, and timeframe (e.g., 'Reduce customer complaints to fewer than 5 per month by Q4')",
            "Assign responsibility — name the process owner accountable for achieving the objective",
            "Determine actions needed, resources required, and timeline",
            "Define how results will be evaluated — which reports, at which review meetings",
          ],
        },
        {
          type: "h",
          text: "Clause 8 — Operation",
        },
        {
          type: "p",
          text: "Clause 8 is the largest clause and covers the core value-creating activities. For a quality engineer, clauses 8.3 (design and development), 8.4 (control of externally provided processes, products, and services), and 8.7 (control of nonconforming outputs) are particularly critical.",
        },
        {
          type: "table",
          head: ["Sub-clause", "Requirement", "Quality engineer's role"],
          rows: [
            ["8.1", "Operational planning and control", "Establish process criteria, implement controls, maintain documented information"],
            ["8.2", "Requirements for products and services", "Review customer requirements, confirm capability before acceptance"],
            ["8.3", "Design and development", "Define design inputs/outputs, conduct design reviews, verification, validation"],
            ["8.4", "Control of external providers", "Evaluate, select, monitor, and re-evaluate suppliers; define verification activities"],
            ["8.5", "Production and service provision", "Control production conditions, identification, traceability, preservation"],
            ["8.6", "Release of products and services", "Ensure planned arrangements are satisfied before release; maintain evidence"],
            ["8.7", "Control of nonconforming outputs", "Identify, segregate, disposition; document the nonconformity and actions taken"],
          ],
        },
        {
          type: "h",
          text: "Clauses 9 and 10 — Checking and improving",
        },
        {
          type: "p",
          text: "Clause 9 requires monitoring, measurement, analysis, and evaluation of QMS performance. This includes customer satisfaction monitoring, internal audits per a defined programme, and management review at planned intervals. Clause 10 demands that organisations react to nonconformities by taking corrective action proportional to the effects, and pursue continual improvement through analysis of data and audit results.",
        },
        {
          type: "callout",
          tone: "key",
          title: "Maintained vs retained documented information",
          text: "ISO 9001:2015 uses two specific phrases: 'maintain documented information' means keep it current — these are your procedures, policies, process descriptions. 'Retain documented information' means keep it as evidence — these are your records: inspection results, calibration certificates, audit reports, training records. Confusing the two is a common audit finding.",
        },
        {
          type: "form",
          id: "aqe-m1-form-clauses",
          title: "Match clauses to situations",
          task: "For each workplace situation, select the ISO 9001:2015 clause that most directly applies.",
          fields: [
            {
              kind: "select",
              label: "A Bonabéri supplier delivers steel bar stock that fails incoming inspection. The quality team must segregate, tag, and decide whether to return, rework, or scrap the material.",
              options: [
                "Clause 6.1 — Actions to address risks",
                "Clause 8.4 — Control of external providers",
                "Clause 8.7 — Control of nonconforming outputs",
                "Clause 10.2 — Nonconformity and corrective action",
              ],
              answer: 2,
              explain: "Clause 8.7 specifically covers identifying and controlling outputs that do not conform to requirements, including segregation, disposition (return, rework, scrap, concession), and documentation.",
            },
            {
              kind: "select",
              label: "The management team at a Yaoundé food processing plant reviews customer satisfaction data, audit results, and quality objective performance at a quarterly meeting.",
              options: [
                "Clause 5.1 — Leadership and commitment",
                "Clause 9.1 — Monitoring, measurement, analysis",
                "Clause 9.3 — Management review",
                "Clause 10.3 — Continual improvement",
              ],
              answer: 2,
              explain: "Management review (clause 9.3) requires top management to review the QMS at planned intervals, using inputs including audit results, customer feedback, and process performance data.",
            },
            {
              kind: "select",
              label: "A quality engineer must verify that a new CNC operator has the required training, certifications, and demonstrated competency before being allowed to operate unsupervised.",
              options: [
                "Clause 7.2 — Competence",
                "Clause 7.3 — Awareness",
                "Clause 8.5.1 — Control of production",
                "Clause 8.1 — Operational planning",
              ],
              answer: 0,
              explain: "Clause 7.2 requires the organisation to determine necessary competence, ensure persons are competent on the basis of education, training, or experience, and retain documented information as evidence of competence.",
            },
          ],
        },
        {
          type: "sorter",
          id: "aqe-m1-sorter-docinfo",
          title: "Maintained vs retained documented information",
          task: "Classify each item as documented information that should be 'maintained' (kept current) or 'retained' (kept as evidence).",
          layout: "columns",
          buckets: [
            { label: "Maintained", desc: "Procedures, policies — kept current" },
            { label: "Retained", desc: "Records, evidence — kept as proof" },
          ],
          items: [
            {
              text: "Quality policy statement",
              bucket: 0,
              explain: "The quality policy is a living document that must be maintained current and communicated.",
            },
            {
              text: "Calibration certificate for a micrometer",
              bucket: 1,
              explain: "A calibration certificate is evidence (a record) that the instrument was calibrated — it is retained.",
            },
            {
              text: "Work instruction for the heat-treatment process",
              bucket: 0,
              explain: "A work instruction describes how to perform an activity and must be kept current — maintained.",
            },
            {
              text: "Internal audit report from last quarter",
              bucket: 1,
              explain: "An audit report is evidence that the audit was conducted — it is retained.",
            },
            {
              text: "Training record showing an operator completed SPC training",
              bucket: 1,
              explain: "Training records are evidence of competence — retained documented information.",
            },
            {
              text: "Incoming inspection procedure",
              bucket: 0,
              explain: "A procedure describing how to perform incoming inspection must be kept current — maintained.",
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m1-check-l2",
          question: "Under ISO 9001:2015, which clause requires the organisation to evaluate and select external providers based on their ability to provide processes, products, or services in accordance with requirements?",
          options: [
            "Clause 7.1.6 — Organisational knowledge",
            "Clause 8.4.1 — Control of externally provided processes",
            "Clause 9.1.3 — Analysis and evaluation",
            "Clause 6.1 — Actions to address risks and opportunities",
          ],
          answer: 1,
          explain: "Clause 8.4.1 specifically requires organisations to determine and apply criteria for the evaluation, selection, monitoring of performance, and re-evaluation of external providers.",
        },
        {
          type: "links",
          items: [
            {
              label: "ISO 9001:2015 — Quality management systems — Requirements",
              url: "https://www.iso.org/standard/62085.html",
              source: "ISO",
            },
          ],
        },
      ],
    },

    /* ================================================================
       LESSON 3 — Sector-specific standards
       ================================================================ */
    {
      id: L3_ID,
      number: 3,
      title: "Sector-specific standards: IATF 16949, AS9100 and ISO 13485",
      minutes: 25,
      objectives: [
        "Explain the additional requirements IATF 16949 imposes beyond ISO 9001 for automotive quality, including APQP, PPAP, and the five core tools.",
        "Describe the key aerospace-specific requirements of AS9100, including product safety, configuration management, and first article inspection.",
        "Identify ISO 13485 requirements for medical device quality including design controls, risk management per ISO 14971, and traceability.",
      ],
      blocks: [
        {
          type: "p",
          text: "While ISO 9001 provides the universal framework for quality management, high-risk industries demand additional controls. Three major sector standards build upon ISO 9001 and add industry-specific requirements. As a quality engineer, you may encounter any of these depending on your organisation's customer base and product portfolio.",
        },
        {
          type: "h",
          text: "IATF 16949 — Automotive quality management",
        },
        {
          type: "p",
          text: "IATF 16949 is published by the International Automotive Task Force and incorporates the full text of ISO 9001:2015 with automotive-specific supplemental requirements. It is mandatory for any organisation supplying production parts, service parts, or accessories to major automotive OEMs. A Bonabéri factory producing brake disc assemblies for export to European OEMs would require IATF 16949 certification.",
        },
        {
          type: "table",
          head: ["Core tool", "Purpose", "Key deliverable"],
          rows: [
            ["APQP (Advanced Product Quality Planning)", "Structured framework for product development from concept to launch", "Control plan, PFMEA, measurement system plan"],
            ["PPAP (Production Part Approval Process)", "Demonstrate that the production process can consistently produce parts meeting requirements", "PPAP submission package (18 elements)"],
            ["FMEA (Failure Mode and Effects Analysis)", "Systematically identify potential failures, assess risk, and define controls", "DFMEA and PFMEA worksheets with RPN and AP ratings"],
            ["SPC (Statistical Process Control)", "Monitor process stability and capability using control charts", "X̄-R charts, Cpk calculations, process capability studies"],
            ["MSA (Measurement Systems Analysis)", "Evaluate the adequacy of measurement systems", "Gage R&R studies, bias, linearity, stability studies"],
          ],
        },
        {
          type: "equip",
          title: "PPAP package",
          items: [
            {
              art: "ppap-package",
              label: "PPAP submission package",
              desc: "The Production Part Approval Process package contains 18 elements including design records, engineering change documents, DFMEA, process flow diagram, PFMEA, control plan, MSA results, dimensional results, material/performance test results, initial process studies, qualified laboratory documentation, appearance approval report, sample parts, master sample, checking aids, customer-specific requirements, part submission warrant (PSW), and bulk material requirements (if applicable).",
            },
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Customer-specific requirements (CSRs)",
          text: "Each automotive OEM publishes customer-specific requirements that supplement IATF 16949. For example, one OEM may require statistical capability of Cpk ≥ 1.67 for safety-critical characteristics while the standard minimum is 1.33. A Bonabéri brake disc manufacturer must maintain a register of all applicable CSRs and ensure they flow down to sub-tier suppliers.",
        },
        {
          type: "h",
          text: "AS9100 — Aerospace quality management",
        },
        {
          type: "p",
          text: "AS9100 (also published as EN 9100 in Europe) adds aerospace-specific requirements to ISO 9001. The standard emphasises product safety, configuration management, and the control of special processes. Organisations must implement a product safety programme and assess risks of counterfeit parts entering the supply chain.",
        },
        {
          type: "list",
          items: [
            "Product safety: organisations must assess product safety risks during design and manufacturing, and have a process for reporting safety issues",
            "Configuration management: control of product configuration throughout its lifecycle — identification, control, status accounting, and audit",
            "First article inspection (FAI): detailed verification that the production process produces parts conforming to engineering specifications — documented per AS9102",
            "Special processes: processes where the output cannot be fully verified by inspection (e.g., welding, heat treatment, plating) require qualification and ongoing monitoring",
            "Risk management of counterfeit parts: controls to prevent the use of fraudulent, recycled, or non-conforming parts misrepresented as genuine",
            "Key characteristics: features whose variation significantly affects product fit, performance, or ability to be manufactured — require tighter process control",
          ],
        },
        {
          type: "h",
          text: "ISO 13485 — Medical device quality management",
        },
        {
          type: "p",
          text: "ISO 13485 provides a comprehensive quality management system for the design and manufacture of medical devices. Unlike ISO 9001, which emphasises continual improvement, ISO 13485 focuses on maintaining the effectiveness of the QMS to consistently meet customer and regulatory requirements. This reflects the regulatory environment where changes to validated processes require formal change control.",
        },
        {
          type: "table",
          head: ["Requirement", "ISO 13485 clause", "Significance"],
          rows: [
            ["Design controls", "7.3", "Formal design and development process with planning, inputs, outputs, review, verification, validation, and transfer"],
            ["Risk management", "7.1 (ISO 14971)", "Application of ISO 14971 throughout the product lifecycle to identify hazards, estimate risk, and implement controls"],
            ["Process validation", "7.5.6", "Validation of processes where output cannot be verified by subsequent monitoring or measurement"],
            ["Traceability", "7.5.3", "Ability to trace each medical device back to raw materials, manufacturing records, and distribution"],
            ["Clinical evaluation", "Regulatory", "Evidence that the device performs as intended and is safe when used as specified"],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "Common themes across sector standards",
          text: "All three sector standards share: risk-based thinking woven throughout (not bolted on), enhanced documented information requirements beyond ISO 9001, rigorous control of product realisation processes, supply-chain management and flow-down of requirements, and emphasis on product safety and traceability.",
        },
        {
          type: "sorter",
          id: "aqe-m1-sorter-standards",
          title: "Match requirements to standards",
          task: "Drag each requirement to the sector standard that specifically mandates it.",
          layout: "columns",
          buckets: [
            { label: "IATF 16949", desc: "Automotive" },
            { label: "AS9100", desc: "Aerospace" },
            { label: "ISO 13485", desc: "Medical devices" },
          ],
          items: [
            {
              text: "Production Part Approval Process (PPAP) submission before start of production",
              bucket: 0,
              explain: "PPAP is an automotive core tool required by IATF 16949 to demonstrate production readiness.",
            },
            {
              text: "First article inspection documented per a standardised report format",
              bucket: 1,
              explain: "AS9100 requires FAI per AS9102 to verify that the production process produces conforming parts.",
            },
            {
              text: "Design and development process with formal design transfer to manufacturing",
              bucket: 2,
              explain: "ISO 13485 clause 7.3.8 specifically requires design and development transfer activities.",
            },
            {
              text: "Control of counterfeit parts through supply-chain risk assessment",
              bucket: 1,
              explain: "AS9100 has specific requirements for awareness and control of counterfeit parts.",
            },
            {
              text: "Measurement systems analysis (Gage R&R) for all measurement systems used in the control plan",
              bucket: 0,
              explain: "MSA is one of the five core tools required by IATF 16949.",
            },
            {
              text: "Application of ISO 14971 risk management throughout the product lifecycle",
              bucket: 2,
              explain: "ISO 13485 requires the application of ISO 14971 for risk management of medical devices.",
            },
          ],
        },
        {
          type: "form",
          id: "aqe-m1-form-sector",
          title: "Which standard applies?",
          task: "Read each scenario and select the sector-specific standard that would apply.",
          fields: [
            {
              kind: "select",
              label: "A Douala factory manufactures hydraulic brake hose assemblies for a European vehicle manufacturer.",
              options: ["IATF 16949", "AS9100", "ISO 13485", "ISO 9001 only"],
              answer: 0,
              explain: "Brake hoses are safety-critical automotive production parts — IATF 16949 is required.",
            },
            {
              kind: "select",
              label: "A Yaoundé precision shop machines turbine blade mounting fixtures for an aircraft engine overhaul facility.",
              options: ["IATF 16949", "AS9100", "ISO 13485", "ISO 9001 only"],
              answer: 1,
              explain: "Aerospace engine components and tooling fall under AS9100 requirements.",
            },
            {
              kind: "select",
              label: "A Bafoussam company manufactures sterile surgical drainage kits for hospitals across Central Africa.",
              options: ["IATF 16949", "AS9100", "ISO 13485", "ISO 9001 only"],
              answer: 2,
              explain: "Sterile surgical devices are medical devices requiring ISO 13485 certification.",
            },
            {
              kind: "select",
              label: "A Bonabéri cement plant supplies bulk construction materials to local contractors.",
              options: ["IATF 16949", "AS9100", "ISO 13485", "ISO 9001 only"],
              answer: 3,
              explain: "Cement for construction does not fall under automotive, aerospace, or medical device sectors — ISO 9001 is the applicable standard.",
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m1-check-l3",
          question: "Which of the following is a distinguishing feature of ISO 13485 compared to ISO 9001?",
          options: [
            "ISO 13485 requires management review at planned intervals",
            "ISO 13485 replaces continual improvement with maintaining QMS effectiveness",
            "ISO 13485 requires a quality policy",
            "ISO 13485 requires internal audits",
          ],
          answer: 1,
          explain: "ISO 13485 does not include the ISO 9001 emphasis on continual improvement. Instead, it focuses on maintaining the effectiveness of the QMS. This reflects the medical device regulatory environment where validated processes should not be changed without formal change control.",
        },
        {
          type: "links",
          items: [
            {
              label: "ASQ — Automotive quality resources",
              url: "https://asq.org/quality-resources/automotive-quality",
              source: "ASQ",
            },
            {
              label: "ISO 13485:2016 — Medical devices — Quality management systems",
              url: "https://www.iso.org/standard/59752.html",
              source: "ISO",
            },
          ],
        },
      ],
    },

    /* ================================================================
       LESSON 4 — Auditing: planning, conducting and reporting
       ================================================================ */
    {
      id: L4_ID,
      number: 4,
      title: "Auditing: planning, conducting and reporting",
      minutes: 30,
      objectives: [
        "Distinguish between first-, second-, and third-party audits and between system, process, and product audit types.",
        "Apply ISO 19011 guidelines to plan, conduct, report, and follow up on a quality audit.",
        "Write accurate audit findings classified as major nonconformity, minor nonconformity, observation, or opportunity for improvement.",
        "Verify the effectiveness of corrective actions resulting from audit findings.",
      ],
      blocks: [
        {
          type: "p",
          text: "Auditing is one of the quality engineer's most powerful tools. A well-conducted audit provides objective evidence of how well the organisation's processes conform to planned arrangements and identifies opportunities to strengthen the system. ISO 19011:2018 provides guidelines for auditing management systems and is the quality engineer's reference for audit competence.",
        },
        {
          type: "h",
          text: "Audit types and classifications",
        },
        {
          type: "table",
          head: ["Classification", "Type", "Description", "Example"],
          rows: [
            ["By party", "First party", "Internal audit — conducted by or on behalf of the organisation itself", "Yaoundé plant quality team audits its own incoming inspection process"],
            ["By party", "Second party", "External audit conducted by a customer or interested party", "A European OEM audits the Bonabéri brake disc supplier before awarding a contract"],
            ["By party", "Third party", "Independent audit by a certification body", "Bureau Veritas conducts an ISO 9001 certification audit at a Douala brewery"],
            ["By scope", "System audit", "Evaluates the entire QMS or a significant portion against the standard", "Full ISO 9001 surveillance audit covering clauses 4–10"],
            ["By scope", "Process audit", "Focuses on a specific process to evaluate its effectiveness", "Audit of the heat-treatment process at a Bafoussam machining shop"],
            ["By scope", "Product audit", "Examines a finished product against specifications, drawings, and customer requirements", "Audit of packaged cement bags for labelling, weight accuracy, and seal integrity"],
          ],
        },
        {
          type: "h",
          text: "ISO 19011 audit principles",
        },
        {
          type: "list",
          items: [
            "Integrity — the foundation of professionalism; auditors must be ethical, fair, and honest",
            "Fair presentation — findings, conclusions, and reports reflect the audit truthfully and accurately",
            "Due professional care — auditors apply diligence and judgement commensurate with the importance of the task",
            "Confidentiality — security of information obtained during the audit",
            "Independence — auditors are free from bias and conflict of interest",
            "Evidence-based approach — audit evidence is verifiable; conclusions are based on available evidence",
            "Risk-based approach — planning and conducting audits consider risks and opportunities",
          ],
        },
        {
          type: "h",
          text: "Planning and conducting an audit",
        },
        {
          type: "steps",
          title: "Audit process flow",
          items: [
            "Establish the audit programme: define objectives, scope, frequency, methods, and resources for the programme",
            "Plan the individual audit: define scope, criteria, schedule; prepare the audit plan and checklists; notify the auditee",
            "Conduct the opening meeting: confirm scope, schedule, methods, confidentiality, and communication channels",
            "Collect evidence: interview personnel, observe activities, review documents and records; use sampling",
            "Generate findings: evaluate evidence against audit criteria; classify as conformity, nonconformity, or observation",
            "Conduct the closing meeting: present findings, agree timescales for corrective actions, confirm the audit report timeline",
            "Prepare and distribute the audit report: document findings, conclusions, and any recommendations",
            "Follow up: verify corrective actions have been implemented and are effective",
          ],
        },
        {
          type: "equip",
          title: "A3 report as audit summary",
          items: [
            {
              art: "a3-report",
              label: "A3 audit summary report",
              desc: "The A3 format (named after the A3 paper size) provides a structured, single-page summary ideal for presenting audit findings to management. The left side captures background, current condition, and root-cause analysis. The right side shows target condition, countermeasures, implementation plan, and follow-up actions. Using A3 for audit summaries forces conciseness and visual clarity.",
            },
          ],
        },
        {
          type: "h",
          text: "Writing audit findings",
        },
        {
          type: "p",
          text: "A well-written audit finding is objective, evidence-based, and traceable to a specific requirement. Every finding must include: the requirement (clause reference), the evidence observed, and a clear statement of the gap. Findings are classified based on severity.",
        },
        {
          type: "table",
          head: ["Classification", "Definition", "Example"],
          rows: [
            [
              "Major nonconformity",
              "Absence of, or total breakdown in, a required process; or a systematic failure that could result in delivery of nonconforming product",
              "No evidence of management review having been conducted in the past 14 months, contrary to clause 9.3 which requires management review at planned intervals (annually per the quality manual)",
            ],
            [
              "Minor nonconformity",
              "A single observed lapse or partial failure that does not result in a total breakdown of the system",
              "Three of twelve calibration records reviewed were missing the 'as found' reading before adjustment, contrary to the calibration procedure QP-CAL-003 section 4.2",
            ],
            [
              "Observation (OFI)",
              "A situation that is not a nonconformity but could become one, or an area where improvement is possible",
              "While the incoming inspection procedure is followed, the sampling plan has not been reviewed since 2019 and may not reflect current risk levels",
            ],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "The three-part finding statement",
          text: "Use this structure for every finding: (1) Requirement — cite the specific clause, procedure, or specification. (2) Evidence — state what you observed, reviewed, or were told, with specific details (dates, document numbers, quantities). (3) Gap — clearly state the nonconformity or concern. Example: 'ISO 9001 clause 7.1.5.2 requires measurement traceability. During review of measuring equipment records, micrometer SN-M042 showed no calibration certificate since March 2024. The equipment was found in use on the production floor.'",
        },
        {
          type: "h",
          text: "Corrective action verification",
        },
        {
          type: "p",
          text: "After audit findings are issued, the auditee must investigate root causes and implement corrective actions. The quality engineer's role is to verify that: (1) the root cause was correctly identified, (2) the corrective action addresses the root cause and not just the symptom, (3) the action has been effectively implemented, and (4) the nonconformity has not recurred. Verification may require a follow-up audit, review of revised documents, or examination of subsequent records.",
        },
        {
          type: "form",
          id: "aqe-m1-form-findings",
          title: "Write audit findings from scenarios",
          task: "For each audit scenario, select the correct finding classification.",
          fields: [
            {
              kind: "select",
              label: "During a process audit of the welding shop, you find that no welder qualification records exist. The procedure requires all welders to hold valid qualifications reviewed annually.",
              options: [
                "Major nonconformity",
                "Minor nonconformity",
                "Observation / OFI",
                "Not a finding — conformity",
              ],
              answer: 0,
              explain: "Complete absence of welder qualification records represents a total breakdown in the required process — this is a major nonconformity affecting product quality and safety.",
            },
            {
              kind: "select",
              label: "You review 20 completed inspection records and find that 2 are missing the inspector's signature, though all other fields are completed and the parts were correctly dispositioned.",
              options: [
                "Major nonconformity",
                "Minor nonconformity",
                "Observation / OFI",
                "Not a finding — conformity",
              ],
              answer: 1,
              explain: "Two of twenty records missing signatures is a partial lapse (10 % non-compliance rate) but the system is generally functioning — this is a minor nonconformity.",
            },
            {
              kind: "select",
              label: "The calibration laboratory maintains all records correctly, but you notice that the temperature and humidity in the lab are not logged, although there is no specific requirement for environmental monitoring in their documented procedure.",
              options: [
                "Major nonconformity",
                "Minor nonconformity",
                "Observation / OFI",
                "Not a finding — conformity",
              ],
              answer: 2,
              explain: "While not a nonconformity against a specific requirement, environmental conditions can affect measurement accuracy. This is an observation or opportunity for improvement.",
            },
            {
              kind: "select",
              label: "You audit the receiving area and find that all incoming materials are inspected per the sampling plan, results are recorded, and nonconforming material is segregated and tagged.",
              options: [
                "Major nonconformity",
                "Minor nonconformity",
                "Observation / OFI",
                "Not a finding — conformity",
              ],
              answer: 3,
              explain: "The process conforms to the requirements — this is a positive finding. Record it as a conformity in your audit notes.",
            },
          ],
        },
        {
          type: "sorter",
          id: "aqe-m1-sorter-findings",
          title: "Classify audit finding types",
          task: "Drag each audit finding into the correct classification.",
          layout: "columns",
          buckets: [
            { label: "Major NC", desc: "Total breakdown or absence of a process" },
            { label: "Minor NC", desc: "Single or partial lapse" },
            { label: "Observation / OFI", desc: "Not a NC but could become one" },
          ],
          items: [
            {
              text: "The organisation has no documented process for design and development, although it designs custom products for customers",
              bucket: 0,
              explain: "Absence of a required process (design and development) is a major nonconformity.",
            },
            {
              text: "One of six training records reviewed did not include the assessment score, though the trainee passed per the trainer's verbal confirmation",
              bucket: 1,
              explain: "A single incomplete record is a partial lapse — minor nonconformity.",
            },
            {
              text: "Internal auditors have completed training but there is no formal competency evaluation criteria defined for auditor qualification",
              bucket: 2,
              explain: "While not violating a specific shall requirement if auditors are otherwise competent, this is an area where the system could be strengthened — observation.",
            },
            {
              text: "No corrective actions have been raised or closed in 18 months, despite 12 customer complaints being received in the same period",
              bucket: 0,
              explain: "Systematic failure to raise corrective actions from customer complaints represents a major breakdown in clause 10.2.",
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m1-check-l4",
          question: "According to ISO 19011, what is the primary purpose of the opening meeting?",
          options: [
            "To present preliminary audit findings to management",
            "To confirm the audit plan, scope, criteria, and communication arrangements with the auditee",
            "To review the corrective actions from the previous audit",
            "To train auditee personnel on the audit process",
          ],
          answer: 1,
          explain: "The opening meeting is used to confirm the audit plan, scope, criteria, timetable, and communication channels. It sets expectations and ensures both parties agree on the audit arrangements.",
        },
        {
          type: "links",
          items: [
            {
              label: "ISO 19011:2018 — Guidelines for auditing management systems",
              url: "https://www.iso.org/standard/70017.html",
              source: "ISO",
            },
            {
              label: "ASQ — Quality audits",
              url: "https://asq.org/quality-resources/auditing",
              source: "ASQ",
            },
          ],
        },
      ],
    },

    /* ================================================================
       LESSON 5 — Quality costs, metrics and the quality engineer's role
       ================================================================ */
    {
      id: L5_ID,
      number: 5,
      title: "Quality costs, metrics and the quality engineer's role",
      minutes: 25,
      objectives: [
        "Categorise quality costs using the prevention–appraisal–failure (PAF) model and calculate the cost of quality for a manufacturing operation.",
        "Calculate key quality metrics including ppm, DPMO, sigma level, first-pass yield (FPY), rolled throughput yield (RTY), and overall equipment effectiveness (OEE).",
        "Describe the quality function deployment (QFD) house of quality and its role in translating the voice of the customer into design requirements.",
        "Explain the quality engineer's leadership role in cross-functional teams, influencing without authority, and basic project management.",
      ],
      blocks: [
        {
          type: "p",
          text: "The quality engineer must speak the language of business. Quality costs, when properly measured and reported, provide the financial justification for improvement initiatives. Metrics translate process performance into numbers that drive decisions. And leadership — the ability to influence teams and drive change — is what turns analysis into results.",
        },
        {
          type: "h",
          text: "Cost of quality: the PAF model",
        },
        {
          type: "p",
          text: "The prevention–appraisal–failure (PAF) model, developed by Armand Feigenbaum, categorises all quality-related costs into four categories. The fundamental insight is that investing in prevention and appraisal reduces failure costs by a much larger amount — typically a 10:1 return.",
        },
        {
          type: "table",
          head: ["Category", "Definition", "Examples"],
          rows: [
            [
              "Prevention",
              "Costs incurred to prevent defects from occurring",
              "Quality planning, training, process capability studies, FMEA, supplier development, design reviews, poka-yoke implementation",
            ],
            [
              "Appraisal",
              "Costs incurred to detect defects before delivery",
              "Incoming inspection, in-process inspection, final inspection, calibration, laboratory testing, audit costs",
            ],
            [
              "Internal failure",
              "Costs resulting from defects found before delivery to the customer",
              "Scrap, rework, re-inspection, downgrading, root-cause investigation, production delays",
            ],
            [
              "External failure",
              "Costs resulting from defects found after delivery to the customer",
              "Warranty claims, returns, complaints handling, product recalls, liability, loss of reputation",
            ],
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Worked example — COQ at Mbanga Brewing, Douala",
          text: "Mbanga Brewing Ltd (fictional) reports the following annual quality costs: Training and SOP development: 4,200,000 FCFA (prevention). Laboratory testing and inspection: 8,500,000 FCFA (appraisal). Off-spec batches scrapped: 12,800,000 FCFA (internal failure). Customer returns and complaints: 6,200,000 FCFA (external failure). Total COQ = 31,700,000 FCFA. As a percentage of sales revenue (620,000,000 FCFA): COQ = 5.1 %. Prevention is only 13.2 % of COQ — the company should invest more in prevention to reduce the 60 % spent on failure costs.",
        },
        {
          type: "h",
          text: "Quality metrics",
        },
        {
          type: "p",
          text: "Quality engineers must be fluent in calculating and interpreting a range of performance metrics. These metrics provide objective evidence for decision making and allow benchmarking across processes, plants, and industries.",
        },
        {
          type: "table",
          head: ["Metric", "Formula", "Worked example"],
          rows: [
            [
              "ppm (parts per million)",
              "(Defective parts ÷ Total parts) × 1,000,000",
              "42 defective shafts from 28,000 produced: (42 ÷ 28,000) × 1,000,000 = 1,500 ppm",
            ],
            [
              "DPMO (defects per million opportunities)",
              "(Defects ÷ (Units × Opportunities per unit)) × 1,000,000",
              "A PCB has 8 solder joints. 150 boards inspected, 6 defective joints found: (6 ÷ (150 × 8)) × 1,000,000 = 5,000 DPMO ≈ 4.08 sigma",
            ],
            [
              "FPY (first-pass yield)",
              "Good units out ÷ Total units in (at a single step)",
              "Step produces 970 good units from 1,000 inputs: FPY = 0.970 or 97.0 %",
            ],
            [
              "RTY (rolled throughput yield)",
              "FPY₁ × FPY₂ × … × FPYₙ",
              "Three-step process: 0.97 × 0.95 × 0.98 = 0.903 or 90.3 % — hidden factory losses revealed",
            ],
            [
              "OEE (overall equipment effectiveness)",
              "Availability × Performance × Quality",
              "A = 90 %, P = 85 %, Q = 98 %: OEE = 0.90 × 0.85 × 0.98 = 0.749 or 74.9 %",
            ],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "The hidden factory",
          text: "RTY reveals the 'hidden factory' — the rework, re-inspection, and repair loops that consume resources without appearing in traditional yield calculations. If each of 5 process steps has 97 % FPY, the RTY is only 0.97⁵ = 85.9 %. The other 14.1 % represents hidden waste. World-class manufacturers target RTY above 95 %.",
        },
        {
          type: "h",
          text: "Quality function deployment (QFD)",
        },
        {
          type: "p",
          text: "QFD is a structured method for translating the voice of the customer (VOC) into technical requirements at each stage of product development. The primary tool is the 'house of quality' — a matrix that links customer needs (what the customer wants) to engineering characteristics (how the organisation delivers). While full QFD deployment involves four houses (product planning, parts deployment, process planning, production planning), the quality engineer must understand at minimum the first house.",
        },
        {
          type: "steps",
          title: "Building the house of quality",
          items: [
            "Capture the voice of the customer: gather customer needs through surveys, complaints, focus groups, and market research",
            "Prioritise customer needs: weight each need by importance (1–5 scale or AHP method)",
            "Define engineering characteristics: measurable technical parameters that address customer needs (e.g., 'tensile strength ≥ 450 MPa')",
            "Build the relationship matrix: rate the strength of relationship between each customer need and each engineering characteristic (strong = 9, medium = 3, weak = 1)",
            "Add the correlation roof: identify interactions between engineering characteristics (positive synergies or trade-offs)",
            "Set targets: define measurable targets for each engineering characteristic based on competitive benchmarking",
          ],
        },
        {
          type: "h",
          text: "The quality engineer as leader",
        },
        {
          type: "p",
          text: "Quality engineers rarely have direct line authority over production, design, or procurement personnel. Yet they must drive change across functions. This requires influencing without authority — the ability to build credibility, use data to persuade, and create win-win solutions that align quality objectives with departmental goals.",
        },
        {
          type: "list",
          items: [
            "Build credibility through technical competence — know the processes, the data, and the standards better than anyone in the room",
            "Use data to tell a story — a Pareto chart of warranty costs by failure mode is more persuasive than a lecture on quality",
            "Frame quality as a business issue — translate defects into FCFA lost, delivery delays, and customer retention risk",
            "Facilitate cross-functional teams — bring production, engineering, purchasing, and quality together to solve problems collaboratively",
            "Apply basic project management — define scope, timeline, deliverables, and milestones for improvement projects; track progress and report to management",
            "Develop others — coach and mentor operators, technicians, and junior engineers in quality tools and methods",
          ],
        },
        {
          type: "sheet",
          id: "aqe-m1-sheet-coq",
          title: "Calculate cost of quality",
          task: "Nkoulou Machining (fictional, Bafoussam) has provided their annual quality cost data. Calculate the totals for each PAF category, total COQ, and COQ as a percentage of revenue (475,000,000 FCFA). Enter formulas in column C.",
          data: [
            ["Cost item", "Amount (FCFA)", "Category total", "% of COQ"],
            ["PREVENTION", "", "", ""],
            ["SPC training for operators", 1800000, null, null],
            ["FMEA workshops", 1200000, null, null],
            ["Supplier development visits", 950000, null, null],
            ["Prevention subtotal", null, null, null],
            ["APPRAISAL", "", "", ""],
            ["Incoming inspection labour", 3200000, null, null],
            ["Calibration costs", 1400000, null, null],
            ["Final inspection and testing", 2800000, null, null],
            ["Appraisal subtotal", null, null, null],
            ["INTERNAL FAILURE", "", "", ""],
            ["Scrap (machining defects)", 8500000, null, null],
            ["Rework labour and materials", 4200000, null, null],
            ["Production downtime (quality)", 2100000, null, null],
            ["Internal failure subtotal", null, null, null],
            ["EXTERNAL FAILURE", "", "", ""],
            ["Warranty returns", 5600000, null, null],
            ["Customer complaint investigation", 1800000, null, null],
            ["External failure subtotal", null, null, null],
            ["TOTAL COQ", null, null, null],
            ["Revenue", 475000000, "", ""],
            ["COQ as % of revenue", null, "", ""],
          ],
          editable: ["C6", "C11", "C15", "C18", "C19", "C21"],
          checks: [
            { cell: "C6", equals: 3950000, tol: 0 },
            { cell: "C11", equals: 7400000, tol: 0 },
            { cell: "C15", equals: 14800000, tol: 0 },
            { cell: "C18", equals: 7400000, tol: 0 },
            { cell: "C19", equals: 33550000, tol: 0 },
            { cell: "C21", equals: 7.1, tol: 0.1 },
          ],
          hint: "Prevention subtotal = sum of SPC training + FMEA workshops + supplier development. COQ % = (Total COQ ÷ Revenue) × 100.",
          solution: {
            C6: "= 1,800,000 + 1,200,000 + 950,000 = 3,950,000",
            C11: "= 3,200,000 + 1,400,000 + 2,800,000 = 7,400,000",
            C15: "= 8,500,000 + 4,200,000 + 2,100,000 = 14,800,000",
            C18: "= 5,600,000 + 1,800,000 = 7,400,000",
            C19: "= 3,950,000 + 7,400,000 + 14,800,000 + 7,400,000 = 33,550,000",
            C21: "= (33,550,000 ÷ 475,000,000) × 100 = 7.1 %",
          },
        },
        {
          type: "form",
          id: "aqe-m1-form-metrics",
          title: "Calculate DPMO and sigma level",
          task: "A Bonabéri automotive parts factory inspects drive shafts. Each shaft has 5 critical characteristics checked. In a batch of 2,000 shafts, inspectors find 18 total defects across all characteristics. Calculate the metrics below.",
          fields: [
            {
              kind: "text",
              label: "Total opportunities (units × opportunities per unit)",
              accept: ["10000", "10,000"],
              placeholder: "Enter number",
              explain: "2,000 shafts × 5 characteristics per shaft = 10,000 total opportunities.",
            },
            {
              kind: "text",
              label: "DPMO (defects per million opportunities)",
              accept: ["1800", "1,800"],
              placeholder: "Enter DPMO value",
              explain: "(18 defects ÷ 10,000 opportunities) × 1,000,000 = 1,800 DPMO.",
            },
            {
              kind: "select",
              label: "Approximate sigma level for 1,800 DPMO",
              options: ["3.0 sigma", "3.6 sigma", "4.4 sigma", "5.1 sigma"],
              answer: 2,
              explain: "1,800 DPMO corresponds to approximately 4.4 sigma. The sigma conversion table shows: 6,210 DPMO ≈ 4.0σ; 1,350 DPMO ≈ 4.5σ. 1,800 DPMO falls between these at approximately 4.4σ.",
            },
          ],
          hint: "DPMO = (total defects ÷ total opportunities) × 1,000,000. Total opportunities = units × opportunities per unit.",
        },
        {
          type: "equip",
          title: "Quality tools in practice",
          items: [
            {
              art: "qc-pareto",
              label: "Pareto chart",
              desc: "The Pareto chart ranks defect categories or cost drivers in descending order with a cumulative percentage line. Quality engineers use Pareto analysis to apply the 80/20 rule — focusing improvement efforts on the vital few causes that account for the majority of defects or costs. When presenting quality costs to management, a Pareto of failure costs by category is one of the most effective visual communication tools.",
            },
            {
              art: "stat-capability",
              label: "Process capability analysis",
              desc: "Process capability indices (Cp, Cpk, Pp, Ppk) quantify how well a process meets specification limits. A Cpk of 1.33 means the process mean is at least 4 standard deviations from the nearest specification limit — the minimum acceptable capability for most industries. IATF 16949 often requires Cpk ≥ 1.67 for safety-critical characteristics.",
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m1-check-l5",
          question: "A three-step manufacturing process has first-pass yields of 96 %, 93 %, and 98 %. What is the rolled throughput yield (RTY)?",
          options: [
            "95.7 %",
            "87.4 %",
            "92.3 %",
            "89.0 %",
          ],
          answer: 1,
          explain: "RTY = FPY₁ × FPY₂ × FPY₃ = 0.96 × 0.93 × 0.98 = 0.8744 = 87.4 %. This reveals that only 87.4 % of product passes through all three steps without requiring any rework — the hidden factory consumes 12.6 % of throughput.",
        },
        {
          type: "links",
          items: [
            {
              label: "ASQ — Cost of quality",
              url: "https://asq.org/quality-resources/cost-of-quality",
              source: "ASQ",
            },
            {
              label: "ASQ — Quality function deployment (QFD)",
              url: "https://asq.org/quality-resources/qfd-quality-function-deployment",
              source: "ASQ",
            },
          ],
        },
      ],
    },

    /* ================================================================
       PRACTICE LESSON — Quality management systems
       ================================================================ */
    {
      id: PRACTICE_ID,
      number: 6,
      title: "Practice: quality management systems",
      minutes: 30,
      objectives: [
        "Classify quality costs into prevention, appraisal and failure categories",
        "Match ISO 9001:2015 clauses to workplace situations",
        "Build a cost-of-quality report and calculate key quality metrics",
      ],
      blocks: [
        {
          type: "p",
          text: "Four exercises of increasing difficulty that test your mastery of quality management systems, from basic cost classification through to writing complete audit findings with corrective action recommendations. Work through each exercise carefully — the advanced and expert levels reflect the complexity you will face as a practising quality engineer.",
        },

        /* --- Beginner: sorter — classify quality costs --- */
        {
          type: "sorter",
          id: "aqe-m1-sorter-paf",
          level: "beginner",
          title: "Classify quality costs (PAF categories)",
          task: "Drag each cost item into the correct PAF category.",
          layout: "columns",
          buckets: [
            { label: "Prevention", desc: "Costs to prevent defects" },
            { label: "Appraisal", desc: "Costs to detect defects" },
            { label: "Internal failure", desc: "Defects found before delivery" },
            { label: "External failure", desc: "Defects found after delivery" },
          ],
          items: [
            {
              text: "FMEA workshop for new product launch (280,000 FCFA)",
              bucket: 0,
              explain: "FMEA is a prevention activity — it identifies and mitigates potential failures before they occur.",
            },
            {
              text: "Final inspection labour costs (1,400,000 FCFA per month)",
              bucket: 1,
              explain: "Final inspection is an appraisal activity — detecting defects before product reaches the customer.",
            },
            {
              text: "Scrap from out-of-tolerance machined parts (3,200,000 FCFA)",
              bucket: 2,
              explain: "Scrapped parts that never reached the customer are an internal failure cost.",
            },
            {
              text: "Warranty replacement of failed brake components (5,800,000 FCFA)",
              bucket: 3,
              explain: "Warranty replacements occur after delivery — this is an external failure cost.",
            },
            {
              text: "Calibration of measuring equipment (600,000 FCFA per year)",
              bucket: 1,
              explain: "Calibration ensures measurement accuracy for detection — an appraisal cost.",
            },
            {
              text: "Supplier quality audit programme (450,000 FCFA travel and labour)",
              bucket: 0,
              explain: "Supplier audits prevent defects from entering the supply chain — a prevention cost.",
            },
            {
              text: "Customer complaint investigation and corrective action (780,000 FCFA)",
              bucket: 3,
              explain: "Investigating complaints from customers who received defective product is an external failure cost.",
            },
            {
              text: "Rework of castings that failed radiographic inspection (1,900,000 FCFA)",
              bucket: 2,
              explain: "Rework of parts caught before delivery is an internal failure cost.",
            },
          ],
        },

        /* --- Intermediate: form — ISO 9001 clause matching --- */
        {
          type: "form",
          id: "aqe-m1-form-clause-match",
          level: "intermediate",
          title: "ISO 9001 clause matching exercise",
          task: "For each workplace situation at a fictional Cameroon manufacturer, identify the primary ISO 9001:2015 clause that applies.",
          fields: [
            {
              kind: "select",
              label: "Atangana Cement (Yaoundé) discovers that its laboratory technician's qualifications expired 6 months ago. The technician has been signing off test reports during this period.",
              options: [
                "Clause 7.1.5 — Monitoring and measuring resources",
                "Clause 7.2 — Competence",
                "Clause 8.6 — Release of products and services",
                "Clause 10.2 — Nonconformity and corrective action",
              ],
              answer: 1,
              explain: "The primary issue is competence — clause 7.2 requires ensuring that personnel are competent based on education, training, or experience. The expired qualification means the organisation failed to maintain evidence of competence.",
            },
            {
              kind: "select",
              label: "Dibombé Precision (Bonabéri) receives a customer order for a new shaft variant. The quality engineer reviews the order requirements and confirms the factory has the capability and capacity to fulfil it before accepting.",
              options: [
                "Clause 8.2.3 — Review of requirements for products and services",
                "Clause 8.3.2 — Design and development planning",
                "Clause 8.1 — Operational planning and control",
                "Clause 5.1.2 — Customer focus",
              ],
              answer: 0,
              explain: "Clause 8.2.3 requires the organisation to review requirements before committing to supply, ensuring it has the ability to meet the specified requirements.",
            },
            {
              kind: "select",
              label: "Ndongo Brewery (Douala) needs to validate its pasteurisation process because the adequacy of pasteurisation cannot be verified by subsequent inspection of the finished product.",
              options: [
                "Clause 7.1.5 — Monitoring and measuring resources",
                "Clause 8.5.1 — Control of production and service provision",
                "Clause 8.5.1(f) — Validation of special processes",
                "Clause 9.1.1 — Monitoring, measurement, analysis and evaluation",
              ],
              answer: 2,
              explain: "Clause 8.5.1(f) requires validation and periodic revalidation of processes where the resulting output cannot be verified by subsequent monitoring or measurement — these are 'special processes'.",
            },
            {
              kind: "select",
              label: "During a management review at Etoudi Food Processing (Yaoundé), the managing director reviews customer satisfaction trends, audit results, supplier performance, and decides to invest in a new X-ray inspection system.",
              options: [
                "Clause 5.1 — Leadership and commitment",
                "Clause 9.3 — Management review",
                "Clause 6.1 — Actions to address risks and opportunities",
                "Clause 7.1.1 — Resources — General",
              ],
              answer: 1,
              explain: "This describes a management review meeting as defined in clause 9.3, where top management reviews QMS performance data and makes decisions about resource allocation and improvement.",
            },
            {
              kind: "select",
              label: "Fako Machining (Bafoussam) outsources heat treatment to a local provider. The quality engineer defines incoming inspection requirements, monitors the provider's delivery quality, and conducts an annual supplier audit.",
              options: [
                "Clause 8.4 — Control of externally provided processes",
                "Clause 7.1.4 — Environment for the operation of processes",
                "Clause 8.5.1 — Control of production",
                "Clause 9.1.2 — Customer satisfaction",
              ],
              answer: 0,
              explain: "Clause 8.4 covers the control of externally provided processes, products, and services — including evaluation, monitoring, and verification of outsourced processes like heat treatment.",
            },
          ],
        },

        /* --- Advanced: sheet — COQ report and metrics dashboard --- */
        {
          type: "sheet",
          id: "aqe-m1-sheet-dashboard",
          level: "advanced",
          title: "Build a COQ report and metrics dashboard",
          task: "Kombi Auto Parts (fictional, Douala) manufactures drive shafts. Complete the metrics dashboard using the raw production data provided. Calculate FPY for each step, RTY, ppm, and total COQ percentage.",
          data: [
            ["PRODUCTION METRICS", "Turning", "Grinding", "Plating", "Final inspect"],
            ["Units entering step", 5000, 4850, 4680, 4620],
            ["Good units out", 4850, 4680, 4620, 4550],
            ["FPY (%)", null, null, null, null],
            ["", "", "", "", ""],
            ["RTY (%)", null, "", "", ""],
            ["", "", "", "", ""],
            ["DEFECT METRICS", "", "", "", ""],
            ["Total units produced", 5000, "", "", ""],
            ["Total defective (final)", 450, "", "", ""],
            ["ppm", null, "", "", ""],
            ["", "", "", "", ""],
            ["COST OF QUALITY (FCFA)", "", "", "", ""],
            ["Prevention costs", 2800000, "", "", ""],
            ["Appraisal costs", 4200000, "", "", ""],
            ["Internal failure costs", 9600000, "", "", ""],
            ["External failure costs", 3400000, "", "", ""],
            ["Total COQ", null, "", "", ""],
            ["Revenue", 185000000, "", "", ""],
            ["COQ as % of revenue", null, "", "", ""],
          ],
          editable: ["B4", "C4", "D4", "E4", "B6", "B11", "B18", "B20"],
          checks: [
            { cell: "B4", equals: 97.0, tol: 0.1 },
            { cell: "C4", equals: 96.5, tol: 0.1 },
            { cell: "D4", equals: 98.7, tol: 0.1 },
            { cell: "E4", equals: 98.5, tol: 0.1 },
            { cell: "B6", equals: 91.0, tol: 0.1 },
            { cell: "B11", equals: 90000, tol: 0 },
            { cell: "B18", equals: 20000000, tol: 0 },
            { cell: "B20", equals: 10.8, tol: 0.1 },
          ],
          hint: "FPY = (Good units out ÷ Units entering) × 100. RTY = FPY₁ × FPY₂ × FPY₃ × FPY₄ (use decimal form, then convert to %). ppm = (defective ÷ total) × 1,000,000.",
          solution: {
            B4: "= (4850 ÷ 5000) × 100 = 97.0 %",
            C4: "= (4680 ÷ 4850) × 100 = 96.5 %",
            D4: "= (4620 ÷ 4680) × 100 = 98.7 %",
            E4: "= (4550 ÷ 4620) × 100 = 98.5 %",
            B6: "= 0.970 × 0.965 × 0.987 × 0.985 × 100 = 91.0 %",
            B11: "= (450 ÷ 5000) × 1,000,000 = 90,000 ppm",
            B18: "= 2,800,000 + 4,200,000 + 9,600,000 + 3,400,000 = 20,000,000",
            B20: "= (20,000,000 ÷ 185,000,000) × 100 = 10.8 %",
          },
        },

        /* --- Expert: form — audit findings and corrective actions --- */
        {
          type: "form",
          id: "aqe-m1-form-audit-expert",
          level: "expert",
          title: "Write audit findings and corrective actions for complex scenarios",
          task: "You are conducting a third-party surveillance audit at Ngoh Engineering (fictional, Bafoussam), an ISO 9001:2015 certified machining shop. For each scenario, determine the finding classification and identify the most appropriate corrective action approach.",
          fields: [
            {
              kind: "select",
              label: "Scenario 1: You review the management review minutes from the past 18 months. The minutes show that quality objectives were reviewed and discussed, but no actions were assigned for objectives that were not met. Three of seven objectives show 'red' status for two consecutive quarters with no documented response.",
              options: [
                "Major NC — clause 9.3: Management review outputs must include decisions on improvement opportunities",
                "Minor NC — clause 9.3: Incomplete management review outputs",
                "Major NC — clause 10.3: Failure to pursue continual improvement",
                "Observation — Management review could be more action-oriented",
              ],
              answer: 0,
              explain: "Clause 9.3.3 requires management review outputs to include decisions and actions related to continual improvement, resource needs, and changes to the QMS. Consistently failing to act on missed objectives for two quarters represents a systematic failure in management review outputs — a major nonconformity.",
            },
            {
              kind: "select",
              label: "Scenario 2: The purchasing department evaluates suppliers using a scoring system, but the quality engineer discovers that the evaluation criteria do not include delivery performance or quality metrics — only price and lead time. Five new suppliers were approved in the past year using these incomplete criteria.",
              options: [
                "Major NC — clause 8.4.1: Evaluation criteria do not address ability to meet requirements",
                "Minor NC — clause 8.4.1: Evaluation criteria incomplete",
                "Observation — Evaluation criteria could be enhanced",
                "Minor NC — clause 7.1.1: Inadequate resources for supplier management",
              ],
              answer: 0,
              explain: "Clause 8.4.1 requires evaluation and selection of external providers based on their ability to provide processes, products, or services in accordance with requirements. Evaluating suppliers without quality or delivery criteria, and approving five suppliers this way, is a systematic failure — major nonconformity.",
            },
            {
              kind: "select",
              label: "Scenario 3: You examine corrective action records and find 12 CARs closed in the past year. All show root-cause analysis and implemented actions. However, for 3 of the 12, there is no evidence that the effectiveness of the corrective action was verified (i.e., no follow-up check that the problem did not recur).",
              options: [
                "Major NC — clause 10.2: No verification of corrective action effectiveness",
                "Minor NC — clause 10.2: Partial failure in verifying corrective action effectiveness",
                "Observation — Effectiveness verification could be more systematic",
                "Not a finding — 75 % compliance is acceptable",
              ],
              answer: 1,
              explain: "Clause 10.2.1(e) requires reviewing the effectiveness of corrective action taken. Three of twelve CARs lacking effectiveness verification is a partial lapse (25 % non-compliance) — a minor nonconformity. The system is functioning but not consistently applied.",
            },
            {
              kind: "select",
              label: "For the Scenario 1 finding (management review outputs), which corrective action approach would be most effective?",
              options: [
                "Retrain the managing director on ISO 9001 management review requirements",
                "Revise the management review procedure to include mandatory action items for any objective showing 'red' status, with assigned owners and deadlines, and add a standing agenda item to review open actions",
                "Change the quality objectives to easier targets so they show 'green' status",
                "Hire an external consultant to attend management reviews",
              ],
              answer: 1,
              explain: "The root cause is a procedural gap — the management review process does not require actions for missed objectives. Revising the procedure to mandate action items with accountability, plus tracking open actions, addresses the systemic cause. Retraining alone does not fix the process, and lowering targets masks the real performance issues.",
            },
          ],
        },
      ],
    },
  ],

  /* ==================================================================
     QUIZ — Quality Management Systems
     ================================================================== */
  quiz: {
    id: QUIZ_ID,
    title: "Quality Management Systems Quiz",
    passPct: 75,
    questions: [
      {
        id: "aqe-m1-q1",
        text: "Which ISO 9000:2015 quality management principle states that 'decisions based on the analysis and evaluation of data and information are more likely to produce desired results'?",
        options: [
          "Customer focus",
          "Process approach",
          "Evidence-based decision making",
          "Improvement",
        ],
        answer: 2,
        explain:
          "Evidence-based decision making is the sixth quality management principle. It recognises that decisions informed by factual data analysis are more effective than those based on intuition or anecdote.",
      },
      {
        id: "aqe-m1-q2",
        text: "In ISO 9001:2015, the term 'retain documented information' refers to:",
        options: [
          "Keeping procedures and policies up to date",
          "Maintaining the quality manual in a controlled location",
          "Preserving records as evidence of conformity",
          "Distributing the latest revision of work instructions",
        ],
        answer: 2,
        explain:
          "'Retain documented information' means keeping records as evidence that activities were performed or results achieved. 'Maintain documented information' is the term for keeping procedures and policies current.",
      },
      {
        id: "aqe-m1-q3",
        text: "A Bonabéri automotive parts supplier must submit a PPAP package to its OEM customer. Which sector-specific standard mandates this requirement?",
        options: [
          "ISO 9001:2015",
          "IATF 16949",
          "AS9100",
          "ISO 13485",
        ],
        answer: 1,
        explain:
          "PPAP (Production Part Approval Process) is one of the five automotive core tools required by IATF 16949. It is not required by ISO 9001, AS9100, or ISO 13485.",
      },
      {
        id: "aqe-m1-q4",
        text: "According to ISO 19011, which of the following is NOT one of the audit principles?",
        options: [
          "Integrity",
          "Independence",
          "Speed of completion",
          "Evidence-based approach",
        ],
        answer: 2,
        explain:
          "ISO 19011 lists seven audit principles: integrity, fair presentation, due professional care, confidentiality, independence, evidence-based approach, and risk-based approach. Speed of completion is not a principle — thoroughness takes precedence over speed.",
      },
      {
        id: "aqe-m1-q5",
        text: "An audit finding states: 'During review of 30 inspection records, 4 were found without the required dimensional measurement for critical characteristic #3, contrary to inspection instruction WI-INS-015 section 5.4.' This finding is best classified as:",
        options: [
          "Major nonconformity",
          "Minor nonconformity",
          "Observation",
          "Opportunity for improvement",
        ],
        answer: 1,
        explain:
          "Four of thirty records (13 %) missing a required measurement is a partial failure — the system is generally working but not consistently applied. This is a minor nonconformity. A major NC would require a total breakdown or systematic failure.",
      },
      {
        id: "aqe-m1-q6",
        text: "In the PAF (prevention–appraisal–failure) model, which category does 'calibration of measuring instruments' belong to?",
        options: [
          "Prevention",
          "Appraisal",
          "Internal failure",
          "External failure",
        ],
        answer: 1,
        explain:
          "Calibration is an appraisal cost — it ensures that measuring instruments provide accurate readings, enabling the detection of nonconforming product. While calibration supports prevention indirectly, its primary purpose is ensuring measurement capability for detection.",
      },
      {
        id: "aqe-m1-q7",
        text: "A four-step process has first-pass yields of 98 %, 95 %, 97 %, and 99 %. The rolled throughput yield (RTY) is approximately:",
        options: [
          "97.3 %",
          "89.4 %",
          "92.1 %",
          "95.0 %",
        ],
        answer: 1,
        explain:
          "RTY = 0.98 × 0.95 × 0.97 × 0.99 = 0.894 = 89.4 %. The multiplication of individual yields always produces a number lower than any single step's yield, revealing the hidden factory losses.",
      },
      {
        id: "aqe-m1-q8",
        text: "ISO 13485 differs from ISO 9001 in that ISO 13485:",
        options: [
          "Does not require a quality policy",
          "Replaces the emphasis on continual improvement with maintaining QMS effectiveness",
          "Does not require management review",
          "Does not use the process approach",
        ],
        answer: 1,
        explain:
          "ISO 13485 focuses on maintaining the effectiveness of the QMS rather than continual improvement. In the medical device regulatory environment, validated processes must not be changed without formal change control, making 'continual improvement' potentially problematic. Both standards require a quality policy, management review, and the process approach.",
      },
    ],
  },
};
