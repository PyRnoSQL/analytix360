import type { CourseModule } from "../../../lms/types";

export const m8: CourseModule = {
  id: "aqe-m8",
  number: 8,
  title: "Lean Six Sigma and Continuous Improvement",
  hours: 16,
  summary:
    "This module introduces the DMAIC methodology as a structured framework for quality improvement projects, " +
    "covering process mapping and value stream analysis to identify non-value-added activities. Learners apply " +
    "root cause analysis tools including fishbone diagrams, 5 Whys, and Pareto analysis, then study lean " +
    "manufacturing principles and the eight wastes (DOWNTIME) to systematically eliminate inefficiency. The " +
    "module concludes with change management practices for sustaining improvement gains, integrating statistical " +
    "methods from earlier modules into real-world continuous improvement projects.",

  lessons: [
    /* ──────────────────────────────────────────────────────────
     * LESSON 1 — DMAIC methodology and project selection
     * ────────────────────────────────────────────────────────── */
    {
      id: "aqe-m8-l1",
      title: "DMAIC methodology and project selection",
      minutes: 30,
      objectives: [
        "Describe the origins of Six Sigma and interpret sigma levels and DPMO",
        "Explain the purpose of each DMAIC phase and how they connect",
        "Apply project selection criteria to rank improvement opportunities",
        "Draft a project charter with all required elements",
      ],
      blocks: [
        { type: "h", text: "Six Sigma: origins and key concepts" },
        {
          type: "p",
          text:
            "Six Sigma was developed at Motorola in the 1980s and popularised by General Electric under " +
            "Jack Welch in the 1990s. The name refers to a process capability of 6 standard deviations between " +
            "the process mean and the nearest specification limit. At true 6σ performance (with the customary " +
            "1.5σ shift), a process produces only **3.4 defects per million opportunities (DPMO)**. " +
            "Cameroonian manufacturers adopting Six Sigma principles typically begin at 3σ–4σ levels and use " +
            "DMAIC projects to drive measurable gains.",
        },
        {
          type: "table",
          head: ["Sigma level", "DPMO", "Yield (%)", "Typical context"],
          rows: [
            ["2σ", "308,537", "69.15", "Unstable process, frequent rework"],
            ["3σ", "66,807", "93.32", "Average manufacturing baseline"],
            ["4σ", "6,210", "99.38", "Competitive process"],
            ["5σ", "233", "99.977", "World-class process"],
            ["6σ", "3.4", "99.99966", "Near-perfect performance"],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "DPMO formula",
          text:
            "DPMO = (Number of defects ÷ (Number of units × Number of opportunities per unit)) × 1,000,000. " +
            "A bottling plant in Douala inspecting 5,000 bottles with 3 defect opportunities each and finding " +
            "42 defects has DPMO = (42 ÷ 15,000) × 1,000,000 = **2,800**, approximately a 4.3σ level.",
        },

        { type: "h", text: "The DMAIC framework" },
        {
          type: "p",
          text:
            "DMAIC (Define–Measure–Analyse–Improve–Control) is the standard Six Sigma improvement cycle for " +
            "existing processes. Each phase has defined deliverables, tollgate reviews, and statistical tools. " +
            "Unlike ad-hoc troubleshooting, DMAIC enforces data-driven decisions at every stage.",
        },
        {
          type: "steps",
          title: "Five DMAIC phases",
          items: [
            "**Define** — Identify the problem, the customer, and the project scope. Deliverables: project charter, SIPOC diagram, stakeholder map.",
            "**Measure** — Quantify the current process performance with reliable data. Deliverables: data collection plan, measurement system evaluation, baseline sigma level.",
            "**Analyse** — Find and verify the root causes of defects or variation. Deliverables: fishbone diagram, 5 Whys, hypothesis tests, Pareto chart.",
            "**Improve** — Develop, test, and implement solutions that address root causes. Deliverables: solution selection matrix, pilot results, implementation plan.",
            "**Control** — Sustain the gains with monitoring, standard work, and response plans. Deliverables: control plan, SPC charts, updated procedures, project closure report.",
          ],
        },
        {
          type: "check",
          id: "aqe-m8-l1-ck1",
          question:
            "A ceramic tile factory in Limbe finds 93 chipped tiles out of 10,000 tiles produced, each tile having 2 defect opportunities (edge chips and surface cracks). What is the DPMO?",
          options: ["4,650", "9,300", "930", "46,500"],
          answer: 0,
          explain:
            "DPMO = (93 ÷ (10,000 × 2)) × 1,000,000 = (93 ÷ 20,000) × 1,000,000 = 4,650.",
        },

        { type: "h", text: "Project selection criteria" },
        {
          type: "p",
          text:
            "Not every problem warrants a full DMAIC project. Organisations prioritise candidates using criteria " +
            "that balance business impact, feasibility, and measurability. A scoring matrix helps leadership " +
            "compare opportunities objectively.",
        },
        {
          type: "table",
          head: ["Criterion", "Question to ask", "Weight example"],
          rows: [
            ["Business impact", "How much does this problem cost in scrap, rework, or lost sales?", "30%"],
            ["Customer impact", "Does this defect reach the customer or violate a specification?", "25%"],
            ["Feasibility", "Can we realistically solve this with available resources and authority?", "20%"],
            ["Measurability", "Can we collect reliable data on the current and future state?", "15%"],
            ["Strategic alignment", "Does this project support company goals or certification targets?", "10%"],
          ],
        },

        { type: "h", text: "Project charter and SIPOC" },
        {
          type: "p",
          text:
            "The project charter is a one-page document that authorises the project and aligns the team. " +
            "It includes the **problem statement** (what is wrong and its magnitude), the **goal statement** " +
            "(specific, measurable target), the **scope** (process boundaries), **team roles**, and a " +
            "**timeline** with tollgate dates. The charter is reviewed and signed by the project sponsor.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "SIPOC at a glance",
          text:
            "SIPOC (Suppliers–Inputs–Process–Outputs–Customers) provides a high-level view of the process " +
            "before the team dives into detail. For a cocoa drying operation in the South-West Region: " +
            "Suppliers = farmers and cooperatives; Inputs = wet cocoa beans, drying mats, sunlight/dryers; " +
            "Process = receiving → fermenting → drying → sorting → bagging; Outputs = dried cocoa beans at " +
            "≤ 7.5% moisture; Customers = exporters and chocolate manufacturers.",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Stakeholder analysis in practice",
          text:
            "At a soap manufacturing plant in Bamenda, the DMAIC team mapped stakeholders on a " +
            "power-interest grid. The plant manager (high power, high interest) was the sponsor. " +
            "Line operators (low power, high interest) were subject matter experts. The procurement " +
            "department (high power, low interest) needed to be kept informed about raw material changes.",
        },

        {
          type: "equip",
          title: "A3 problem-solving report",
          items: [
            {
              art: "a3-report",
              name: "A3 report template",
              caption:
                "The A3 format condenses an entire improvement story — background, analysis, " +
                "countermeasures, and follow-up — onto a single A3-sized sheet, encouraging concise " +
                "thinking and visual communication.",
              specs: [
                { label: "Format", value: "A3 (297 × 420 mm), landscape" },
                { label: "Left side", value: "Background, current condition, root cause analysis" },
                { label: "Right side", value: "Target condition, countermeasures, plan, follow-up" },
              ],
            },
          ],
        },

        /* Lab: form — write project charter elements */
        {
          type: "form",
          id: "aqe-m8-l1-lab1",
          title: "Draft a DMAIC project charter",
          task:
            "A plywood factory in Edéa has been experiencing a 12% rejection rate for warped panels " +
            "over the past 6 months, costing approximately 18 million FCFA per quarter in scrap. " +
            "Complete the charter elements below for a DMAIC project to address this problem.",
          fields: [
            {
              kind: "text",
              label: "Problem statement (include defect, magnitude, and timeframe)",
              accept: ["warped", "12%", "warp"],
              example:
                "12% of plywood panels produced at the Edéa factory have been rejected for warping over the past 6 months, costing 18M FCFA per quarter.",
              placeholder: "Describe the problem with specific data…",
            },
            {
              kind: "text",
              label: "Goal statement (measurable target with deadline)",
              accept: ["reduce", "%"],
              example:
                "Reduce the panel warping rejection rate from 12% to below 4% within 6 months of project launch.",
              placeholder: "State a measurable improvement target…",
            },
            {
              kind: "select",
              label: "Which scope boundary is most appropriate?",
              options: [
                "From raw log receiving to finished panel packaging",
                "From veneer layup through hot press to panel cooling",
                "From customer order to delivery",
                "From procurement of adhesive to warehouse storage",
              ],
              answer: 1,
              explain:
                "Warping is primarily influenced by the veneer layup, pressing, and cooling stages. Scoping the project to these operations keeps it focused and feasible.",
            },
            {
              kind: "select",
              label: "Who should sponsor this project?",
              options: [
                "A line operator with pressing experience",
                "The quality inspector who detects warped panels",
                "The plant manager with authority over production resources",
                "An external consultant specialising in wood products",
              ],
              answer: 2,
              explain:
                "The sponsor must have authority to allocate resources, remove barriers, and approve changes. The plant manager holds this authority for production processes.",
            },
          ],
          hint: "Think about what makes a good problem statement: specific defect, how often, how much it costs, and over what period.",
        },

        /* Lab: sorter — classify activities into DMAIC phases (steps layout) */
        {
          type: "sorter",
          id: "aqe-m8-l1-lab2",
          title: "Classify activities into DMAIC phases",
          task:
            "Drag each activity into the correct DMAIC phase. The phases are arranged in " +
            "sequence from Define through to Control.",
          layout: "steps",
          buckets: [
            { label: "Define", desc: "Scope the project and align stakeholders" },
            { label: "Measure", desc: "Quantify current performance" },
            { label: "Analyse", desc: "Find and verify root causes" },
            { label: "Improve", desc: "Develop and test solutions" },
            { label: "Control", desc: "Sustain the gains" },
          ],
          items: [
            {
              text: "Write the project charter and get sponsor sign-off",
              bucket: 0,
              explain: "The project charter is a Define-phase deliverable that authorises the project.",
            },
            {
              text: "Create a SIPOC diagram of the current process",
              bucket: 0,
              explain: "SIPOC provides the high-level process view needed in the Define phase.",
            },
            {
              text: "Conduct a Gage R&R study on the measurement system",
              bucket: 1,
              explain: "Validating the measurement system is a Measure-phase activity ensuring data reliability.",
            },
            {
              text: "Calculate the baseline process sigma level",
              bucket: 1,
              explain: "The baseline sigma quantifies current performance — a key Measure deliverable.",
            },
            {
              text: "Build a fishbone diagram to identify potential causes",
              bucket: 2,
              explain: "Fishbone diagrams are Analyse-phase tools for structured root cause identification.",
            },
            {
              text: "Run a hypothesis test to verify a suspected root cause",
              bucket: 2,
              explain: "Statistical verification of root causes is central to the Analyse phase.",
            },
            {
              text: "Run a pilot test of the proposed solution",
              bucket: 3,
              explain: "Piloting validates solutions before full-scale implementation in the Improve phase.",
            },
            {
              text: "Set up control charts to monitor the improved process",
              bucket: 4,
              explain: "SPC monitoring is a Control-phase mechanism for sustaining improvements.",
            },
          ],
        },
      ],
    },

    /* ──────────────────────────────────────────────────────────
     * LESSON 2 — Define and Measure phases
     * ────────────────────────────────────────────────────────── */
    {
      id: "aqe-m8-l2",
      title: "Define and Measure phases",
      minutes: 30,
      objectives: [
        "Translate voice of the customer data into critical-to-quality requirements",
        "Build a CTQ tree linking customer needs to measurable specifications",
        "Design a data collection plan with appropriate sampling strategy",
        "Calculate process sigma level, DPMO, and first-pass yield from defect data",
      ],
      blocks: [
        { type: "h", text: "Voice of the customer to critical-to-quality" },
        {
          type: "p",
          text:
            "The Define phase begins with understanding **what the customer truly needs**. Voice of the " +
            "customer (VOC) data comes from complaints, surveys, returns, warranty claims, and direct " +
            "interviews. However, customers often express needs in vague terms ('I want it to last longer'). " +
            "The quality engineer must translate these into **critical-to-quality (CTQ)** characteristics — " +
            "specific, measurable parameters with defined specifications.",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "VOC example — Douala aluminium cookware",
          text:
            "An aluminium pot manufacturer in Douala received complaints that handles 'come loose too easily'. " +
            "The VOC statement is vague. Translated to CTQ: the handle must withstand a pull force of " +
            "≥ 15 kg without detaching. This gives the team a measurable specification to work with.",
        },

        { type: "h", text: "CTQ tree construction" },
        {
          type: "p",
          text:
            "A CTQ tree systematically decomposes customer needs into measurable requirements through three " +
            "levels: **needs** (what the customer wants), **drivers** (factors that influence the need), and " +
            "**CTQs** (measurable specifications). Each CTQ must have a target value and tolerance.",
        },
        {
          type: "steps",
          title: "Building a CTQ tree",
          items: [
            "Identify the customer need from VOC data (e.g., 'packaging must protect the product')",
            "Determine the drivers — what influences this need (e.g., seal integrity, material strength, cushioning)",
            "Define CTQ metrics for each driver (e.g., seal burst strength ≥ 8 kPa, corrugated board ≥ 200 kPa edge crush)",
            "Set specifications: target value, upper and lower limits, measurement method",
          ],
        },
        {
          type: "table",
          head: ["Customer need", "Driver", "CTQ", "Specification"],
          rows: [
            ["Product arrives undamaged", "Seal integrity", "Seal burst strength", "≥ 8 kPa"],
            ["Product arrives undamaged", "Box strength", "Edge crush test", "≥ 200 kPa"],
            ["Product arrives undamaged", "Cushioning", "Drop test survival", "1.2 m onto concrete, no breakage"],
            ["Easy to open", "Tab design", "Opening force", "5–15 N"],
          ],
        },
        {
          type: "check",
          id: "aqe-m8-l2-ck1",
          question:
            "A customer says 'the paint on my furniture scratches too easily'. Which of the following is the best CTQ specification?",
          options: [
            "Use better paint",
            "Paint hardness ≥ 2H on pencil hardness scale, adhesion ≥ 4B cross-hatch rating",
            "Reduce customer complaints about paint",
            "Apply thicker coats of paint",
          ],
          answer: 1,
          explain:
            "A CTQ must be specific and measurable. Pencil hardness ≥ 2H and cross-hatch adhesion ≥ 4B are " +
            "industry-standard measurable specifications for paint durability. The other options are actions " +
            "or vague goals, not measurable specifications.",
        },

        { type: "h", text: "Data collection planning" },
        {
          type: "p",
          text:
            "A data collection plan answers five questions: **what** data to collect (which CTQ or process " +
            "parameter), **where** in the process to collect it (which station or operation), **when** to " +
            "collect (frequency, shift, time of day), **how** to collect (which instrument, which procedure), " +
            "and **who** will collect it (trained operators or inspectors). The plan also specifies sample " +
            "size, which is driven by the precision needed and the expected variation (as studied in Module 2).",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Link to measurement system analysis",
          text:
            "Before collecting baseline data, verify that your measurement system is adequate. As covered in " +
            "Module 3, a Gage R&R study should show that measurement system variation is less than 10% of " +
            "total variation for the measurement to be acceptable. Collecting data with a poor measurement " +
            "system wastes time and leads to wrong conclusions.",
        },

        { type: "h", text: "Process baseline: sigma level and yield" },
        {
          type: "p",
          text:
            "The Measure phase establishes the **baseline** — how the process performs before any improvement. " +
            "Key metrics include DPMO, sigma level, first-pass yield (FPY), and rolled throughput yield (RTY). " +
            "These numbers become the benchmark against which improvement is measured.",
        },
        {
          type: "list",
          items: [
            "**DPMO** = (Defects ÷ (Units × Opportunities)) × 1,000,000",
            "**Yield** = (1 − DPMO ÷ 1,000,000) × 100%",
            "**FPY** = Units passing all inspections on first attempt ÷ Total units started",
            "**RTY** = FPY₁ × FPY₂ × … × FPYₙ (product of yields at each process step)",
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "Sigma level lookup",
          text:
            "To convert DPMO to a sigma level, use a Z-table or the approximation: Sigma ≈ 0.8406 + " +
            "√(29.37 − 2.221 × ln(DPMO)). For practical purposes, most teams use a conversion table. " +
            "A process with DPMO = 6,210 is at 4σ; DPMO = 66,807 is at 3σ.",
        },
        {
          type: "check",
          id: "aqe-m8-l2-ck2",
          question:
            "A three-step process has FPY of 95%, 90%, and 92% at each step. What is the rolled throughput yield?",
          options: ["92.3%", "78.7%", "85.0%", "95.0%"],
          answer: 1,
          explain:
            "RTY = 0.95 × 0.90 × 0.92 = 0.7866, or 78.7%. RTY reveals the true process yield by multiplying " +
            "the yields at each step, exposing hidden factory losses that individual FPY figures miss.",
        },

        /* Lab: form — build a CTQ tree */
        {
          type: "form",
          id: "aqe-m8-l2-lab1",
          title: "Build a CTQ tree from customer needs",
          task:
            "A furniture company in Yaoundé receives VOC feedback that chairs 'break too quickly'. " +
            "Complete the CTQ tree by identifying drivers and measurable specifications.",
          fields: [
            {
              kind: "text",
              label: "Customer need (restate the VOC clearly)",
              accept: ["durability", "durable", "long-lasting", "break"],
              example: "Chair must be durable and withstand normal daily use for at least 5 years",
              placeholder: "What does the customer really want?",
            },
            {
              kind: "select",
              label: "Which is the most relevant quality driver for chair breakage?",
              options: [
                "Paint colour consistency",
                "Joint strength and wood grain orientation",
                "Packaging attractiveness",
                "Delivery speed",
              ],
              answer: 1,
              explain:
                "Joint strength and wood grain orientation directly influence structural durability. " +
                "The other options relate to aesthetics or logistics, not structural failure.",
            },
            {
              kind: "text",
              label: "CTQ specification for joint strength (include units and target)",
              accept: ["kg", "N", "force", "≥", "cycles"],
              example: "Mortise-and-tenon joint pull-out force ≥ 120 kg; withstand 50,000 rocking cycles without failure",
              placeholder: "State a measurable specification with target value…",
            },
            {
              kind: "select",
              label: "What measurement method would verify this CTQ?",
              options: [
                "Visual inspection of the finished chair",
                "Destructive pull test on sample joints using a universal testing machine",
                "Customer satisfaction survey after 1 month",
                "Weighing the chair to check wood density",
              ],
              answer: 1,
              explain:
                "A destructive pull test on sample joints directly measures the joint strength CTQ. " +
                "Visual inspection cannot assess structural strength, and weight alone does not predict joint integrity.",
            },
          ],
          hint: "Think about what physically causes chairs to break — which structural element fails?",
        },

        /* Lab: sheet — calculate process sigma from defect data */
        {
          type: "sheet",
          id: "aqe-m8-l2-lab2",
          title: "Calculate process sigma from defect data",
          task:
            "A textile mill in Garoua inspected 8,000 metres of fabric. Each metre has 4 defect " +
            "opportunities (colour, weave, width, weight). Calculate the DPMO, yield, and approximate " +
            "sigma level in the yellow cells.",
          data: [
            ["Metric", "Value"],
            ["Units inspected", 8000],
            ["Opportunities per unit", 4],
            ["Total defects found", 156],
            ["Total opportunities", null],
            ["DPMO", null],
            ["Yield (%)", null],
            ["Approx. sigma level", null],
          ],
          editable: ["B5", "B6", "B7", "B8"],
          checks: [
            { cell: "B5", equals: 32000 },
            { cell: "B6", equals: 4875, tol: 5 },
            { cell: "B7", equals: 99.51, tol: 0.02 },
            { cell: "B8", equals: 4.1, tol: 0.2 },
          ],
          hint:
            "Total opportunities = Units × Opportunities per unit. DPMO = (Defects ÷ Total opportunities) × 1,000,000. " +
            "Yield = (1 − DPMO/1,000,000) × 100. Use the sigma conversion table: DPMO ≈ 4,875 is between 4σ (6,210) " +
            "and 4.5σ (1,350), closer to 4σ, so approximately 4.1σ.",
          solution: {
            B5: "=8000*4",
            B6: "=(156/32000)*1000000",
            B7: "=(1-4875/1000000)*100",
            B8: "4.1",
          },
        },
      ],
    },

    /* ──────────────────────────────────────────────────────────
     * LESSON 3 — Analyse phase: finding root causes
     * ────────────────────────────────────────────────────────── */
    {
      id: "aqe-m8-l3",
      title: "Analyse phase: finding root causes",
      minutes: 30,
      objectives: [
        "Construct an Ishikawa diagram using the 6M categories",
        "Conduct a 5 Whys analysis to drill down to the true root cause",
        "Apply Pareto analysis to identify the vital few contributors",
        "Link hypothesis testing concepts from Module 2 to root cause verification",
      ],
      blocks: [
        { type: "h", text: "Cause-and-effect diagram (Ishikawa)" },
        {
          type: "p",
          text:
            "The Ishikawa (fishbone) diagram is the most widely used brainstorming tool in root cause " +
            "analysis. The effect (problem) is placed at the head of the fish, and potential causes are " +
            "organised along bones representing the **6M categories**: Man (people), Machine (equipment), " +
            "Material (raw materials), Method (procedures), Measurement (gauges and inspections), and " +
            "Milieu (environment). Each category can have sub-causes branching further.",
        },
        {
          type: "table",
          head: ["6M category", "Example causes (soap production, Bamenda)"],
          rows: [
            ["Man", "Insufficient training on mixing ratios, operator fatigue on night shift"],
            ["Machine", "Worn mixer blades, inconsistent heating element temperature"],
            ["Material", "Varying palm oil acidity between batches, impure caustic soda"],
            ["Method", "No standardised mixing time, inconsistent mould filling"],
            ["Measurement", "Uncalibrated pH meter, visual colour check not standardised"],
            ["Milieu", "Humidity fluctuations in drying area, ambient temperature swings"],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Building a good fishbone",
          text:
            "Involve the people closest to the process — operators, technicians, inspectors. Use sticky notes " +
            "so ideas can be rearranged. Aim for at least 3–4 potential causes per category. After brainstorming, " +
            "circle the 3–5 most likely causes for further investigation with data.",
        },

        { type: "h", text: "5 Whys analysis" },
        {
          type: "p",
          text:
            "The 5 Whys technique, developed at Toyota, repeatedly asks 'Why?' to peel back layers of " +
            "symptoms until the true root cause is exposed. The number five is a guideline — some problems " +
            "require three whys, others seven. The key is to stop when you reach a cause that, if addressed, " +
            "would prevent the problem from recurring.",
        },
        {
          type: "steps",
          title: "5 Whys example — paint defects on metal furniture",
          items: [
            "**Problem:** Paint is peeling off metal chairs within 3 months of purchase.",
            "**Why 1:** The paint adhesion is poor → because the surface preparation is inadequate.",
            "**Why 2:** Why is surface preparation inadequate? → because phosphating solution is too dilute.",
            "**Why 3:** Why is the solution too dilute? → because operators are not checking concentration daily.",
            "**Why 4:** Why are operators not checking daily? → because there is no standard work instruction for daily concentration checks.",
            "**Root cause:** Missing standard work instruction for phosphating solution monitoring. **Countermeasure:** Create and train on a daily checklist for solution concentration, temperature, and pH.",
          ],
        },

        { type: "h", text: "Pareto analysis and stratification" },
        {
          type: "p",
          text:
            "The Pareto principle (80/20 rule) states that roughly 80% of effects come from 20% of causes. " +
            "A Pareto chart combines a bar chart (sorted by frequency) with a cumulative percentage line. " +
            "It focuses improvement efforts on the **vital few** categories that account for the majority " +
            "of defects, rather than spreading resources across the **trivial many**.",
        },
        {
          type: "callout",
          tone: "key",
          title: "Stratification deepens the analysis",
          text:
            "After identifying the top Pareto category, stratify the data by shift, machine, operator, or " +
            "material batch. A cement plant in Figuil found that 'bag breakage' was the top defect, but " +
            "stratifying by shift revealed that 85% of breakages occurred on the night shift, pointing to " +
            "a training gap for night-shift packers.",
        },

        { type: "h", text: "Hypothesis testing for root cause verification" },
        {
          type: "p",
          text:
            "Brainstorming and Pareto analysis identify suspected causes, but statistical hypothesis testing " +
            "(Module 2) **verifies** them with data. Common approaches include two-sample t-tests (does defect " +
            "rate differ between shifts?), chi-square tests (is defect type related to machine?), and " +
            "correlation analysis (does temperature correlate with warping?).",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Multi-vari analysis concept",
          text:
            "Multi-vari analysis is a graphical technique that examines variation at three levels: " +
            "**within-piece** (position-to-position on one unit), **piece-to-piece** (consecutive units), and " +
            "**time-to-time** (shift-to-shift, day-to-day). At a rubber seal factory in Douala, multi-vari " +
            "charts showed that piece-to-piece variation was the dominant component, directing the team to " +
            "investigate the moulding cycle rather than raw material or environmental factors.",
        },

        {
          type: "check",
          id: "aqe-m8-l3-ck1",
          question:
            "After building a Pareto chart, you find that 3 out of 12 defect categories account for 78% of all defects. What is the correct interpretation?",
          options: [
            "All 12 categories need equal attention",
            "The 3 categories are the vital few and should be prioritised for root cause analysis",
            "The chart is wrong because the 80/20 rule requires exactly 80%",
            "Only the single largest category needs investigation",
          ],
          answer: 1,
          explain:
            "The vital few (3 categories covering 78% of defects) should be prioritised. The 80/20 " +
            "rule is a guideline, not an exact threshold. Focusing on these three categories will yield " +
            "the greatest improvement for the effort invested.",
        },

        {
          type: "equip",
          title: "Root cause analysis tools",
          items: [
            {
              art: "qc-fishbone",
              name: "Ishikawa (fishbone) diagram",
              caption:
                "The fishbone layout organises brainstormed causes into the 6M categories, making it " +
                "easy to see which areas have the most potential root causes.",
            },
            {
              art: "qc-pareto",
              name: "Pareto chart",
              caption:
                "Bars sorted by frequency with a cumulative line identify the vital few categories that " +
                "account for the majority of defects.",
            },
          ],
        },

        /* Lab: whys — 5 Whys for a process problem */
        {
          type: "whys",
          id: "aqe-m8-l3-lab1",
          title: "5 Whys: leaking juice bottles",
          task:
            "A fruit juice bottling plant in Bafoussam is experiencing leaking bottles. Use the " +
            "5 Whys to find the root cause and propose a countermeasure.",
          problem: "Juice bottles are leaking during transport to retailers, causing a 6% return rate.",
          steps: [
            {
              question: "Why are bottles leaking during transport?",
              options: [
                "Because the bottle caps are not sealed tightly enough",
                "Because the transport trucks drive too fast",
                "Because the juice is too acidic",
                "Because retailers store them incorrectly",
              ],
              answer: 0,
              explain: "Inspection shows visible gaps between the cap and bottle rim — a sealing problem.",
            },
            {
              question: "Why are the caps not sealed tightly enough?",
              options: [
                "Because the capping machine torque is set too low",
                "Because the bottles are the wrong colour",
                "Because the caps are too expensive",
                "Because the labels obscure the cap",
              ],
              answer: 0,
              explain: "Torque measurements show 1.2 N·m versus the required 1.8 N·m — the machine is under-tightening.",
            },
            {
              question: "Why is the capping machine torque set too low?",
              options: [
                "Because the operator did not adjust it after the last changeover",
                "Because the machine is brand new",
                "Because the factory uses too many cap sizes",
                "Because electricity supply is unstable",
              ],
              answer: 0,
              explain: "The torque setting was left at the value for the previous smaller bottle size after a product changeover.",
            },
            {
              question: "Why did the operator not adjust the torque after changeover?",
              options: [
                "Because there is no changeover checklist requiring torque verification",
                "Because the operator was absent that day",
                "Because torque adjustment requires a special licence",
                "Because the machine cannot be adjusted",
              ],
              answer: 0,
              explain: "There is no standard changeover procedure or checklist that includes torque verification as a mandatory step.",
            },
          ],
          countermeasure: {
            question: "What countermeasure best addresses the root cause?",
            options: [
              "Replace all capping machines with newer models",
              "Create a changeover checklist that includes torque verification and train all operators",
              "Hire additional quality inspectors to check every bottle",
              "Reduce the number of product sizes to avoid changeovers",
            ],
            answer: 1,
            explain:
              "A changeover checklist with mandatory torque verification addresses the root cause " +
              "(missing standard work) directly. It prevents recurrence without requiring expensive " +
              "capital investment or limiting the product range.",
          },
          hint: "Follow the chain of causation — each 'why' should explain the previous answer, drilling deeper into the system.",
        },

        /* Lab: pareto — defect analysis with >= 5 categories */
        {
          type: "pareto",
          id: "aqe-m8-l3-lab2",
          title: "Pareto analysis: ceramic tile defects",
          task:
            "A ceramic tile factory in Limbe recorded 840 defects over one month. Identify the " +
            "vital few defect categories using the Pareto chart. Which categories should the " +
            "improvement team focus on first?",
          unit: "defects",
          categories: [
            { label: "Surface cracks", count: 312 },
            { label: "Colour variation", count: 198 },
            { label: "Edge chips", count: 147 },
            { label: "Dimensional error", count: 89 },
            { label: "Glaze bubbles", count: 52 },
            { label: "Warping", count: 28 },
            { label: "Staining", count: 14 },
          ],
          hint:
            "The vital few are the categories whose cumulative percentage crosses approximately 80%. " +
            "Surface cracks alone account for 37% of defects.",
        },

        /* Lab: sorter — fishbone classification */
        {
          type: "sorter",
          id: "aqe-m8-l3-lab3",
          title: "Fishbone diagram: classify causes by 6M category",
          task:
            "A bakery in Yaoundé is experiencing inconsistent bread loaf weight. Classify " +
            "each potential cause into the correct 6M category on the fishbone diagram.",
          layout: "fishbone",
          effect: "Inconsistent bread loaf weight",
          buckets: [
            { label: "Man", desc: "People-related causes" },
            { label: "Machine", desc: "Equipment-related causes" },
            { label: "Material", desc: "Raw material causes" },
            { label: "Method", desc: "Procedure-related causes" },
            { label: "Measurement", desc: "Gauging and inspection causes" },
            { label: "Milieu", desc: "Environmental causes" },
          ],
          items: [
            {
              text: "New baker not trained on dough scaling procedure",
              bucket: 0,
              explain: "Training gaps are a Man (people) category cause.",
            },
            {
              text: "Dough divider cutting unevenly due to worn blades",
              bucket: 1,
              explain: "Equipment wear is a Machine category cause.",
            },
            {
              text: "Flour moisture content varies between deliveries",
              bucket: 2,
              explain: "Raw material variation is a Material category cause.",
            },
            {
              text: "No standard recipe specifying exact water-to-flour ratio",
              bucket: 3,
              explain: "Missing standard procedures fall under the Method category.",
            },
            {
              text: "Kitchen scale not calibrated for 6 months",
              bucket: 4,
              explain: "Instrument calibration is a Measurement category issue.",
            },
            {
              text: "High humidity causing dough to absorb extra moisture",
              bucket: 5,
              explain: "Ambient humidity is an environmental (Milieu) factor.",
            },
          ],
        },
      ],
    },

    /* ──────────────────────────────────────────────────────────
     * LESSON 4 — Improve and Control phases
     * ────────────────────────────────────────────────────────── */
    {
      id: "aqe-m8-l4",
      title: "Improve and Control phases",
      minutes: 25,
      objectives: [
        "Generate and evaluate solutions using structured selection criteria",
        "Plan and execute a pilot test before full-scale implementation",
        "Design a control plan that integrates SPC, standard work, and visual management",
        "Document project results and conduct a formal handover",
      ],
      blocks: [
        { type: "h", text: "Solution generation methods" },
        {
          type: "p",
          text:
            "Once root causes are verified, the Improve phase generates potential solutions. Three common " +
            "approaches are: **brainstorming** (structured idea generation with the team), **benchmarking** " +
            "(studying how other companies or industries solve similar problems), and **Design of Experiments** " +
            "(DOE, from Module 5) to optimise process settings systematically.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Link to DOE (Module 5)",
          text:
            "When the root cause involves multiple process parameters interacting (e.g., temperature, pressure, " +
            "and time in a moulding process), DOE is the most efficient way to find the optimal settings. A " +
            "factorial experiment tests combinations of factor levels rather than changing one variable at a time.",
        },

        { type: "h", text: "Solution selection: criteria matrix" },
        {
          type: "p",
          text:
            "When multiple solutions are feasible, a criteria matrix (also called a Pugh matrix or decision " +
            "matrix) provides structured evaluation. Common criteria include effectiveness (will it eliminate " +
            "the root cause?), cost, implementation time, risk, and sustainability. Each criterion is weighted " +
            "and each solution is scored, producing a ranked list.",
        },
        {
          type: "table",
          head: ["Criterion", "Weight", "Solution A: Automated torque control", "Solution B: Changeover checklist", "Solution C: New capping machine"],
          rows: [
            ["Effectiveness", "30%", "9 (2.7)", "7 (2.1)", "10 (3.0)"],
            ["Cost", "25%", "5 (1.25)", "9 (2.25)", "3 (0.75)"],
            ["Implementation speed", "20%", "6 (1.2)", "9 (1.8)", "4 (0.8)"],
            ["Sustainability", "15%", "8 (1.2)", "6 (0.9)", "9 (1.35)"],
            ["Risk", "10%", "7 (0.7)", "8 (0.8)", "5 (0.5)"],
            ["**Weighted total**", "100%", "**7.05**", "**7.85**", "**6.40**"],
          ],
        },
        {
          type: "p",
          text:
            "In this example, Solution B (changeover checklist) scores highest because it is low-cost, " +
            "quick to implement, and low-risk. The team may later pursue Solution A as a phase-two enhancement.",
        },

        { type: "h", text: "Piloting and implementation" },
        {
          type: "p",
          text:
            "Before full-scale rollout, the team runs a **pilot test** — implementing the solution on a " +
            "limited scale (one shift, one machine, one product line) to verify effectiveness and identify " +
            "unforeseen problems. The pilot should have clear success criteria, a defined duration, and a " +
            "data collection plan to compare pilot results against the baseline.",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Pilot at a Douala soap factory",
          text:
            "The improvement team piloted a new mixing procedure on Line 2 for two weeks. They compared " +
            "the defect rate (bar cracking) on Line 2 against the unchanged Line 1. Line 2 dropped from " +
            "8.3% to 2.1% cracking, while Line 1 remained at 7.9%. The pilot confirmed the solution, and " +
            "rollout to all lines was approved.",
        },

        {
          type: "check",
          id: "aqe-m8-l4-ck1",
          question:
            "Why is it important to run a pilot before full implementation?",
          options: [
            "To delay the project timeline and reduce costs",
            "To verify effectiveness on a small scale and identify unforeseen problems before committing full resources",
            "Because management always requires a pilot phase",
            "To train only a few operators and save on training costs",
          ],
          answer: 1,
          explain:
            "A pilot verifies that the solution works in the real process environment and exposes " +
            "problems that were not apparent during planning, reducing the risk of a failed full-scale rollout.",
        },

        { type: "h", text: "Control phase: sustaining the gains" },
        {
          type: "p",
          text:
            "The Control phase ensures that improvements are maintained after the project team disbands. " +
            "Without control mechanisms, processes tend to drift back to their old performance. Key control " +
            "tools include:",
        },
        {
          type: "list",
          items: [
            "**Control plan** — documents what to monitor, how to measure it, sampling frequency, control limits, and the reaction plan if a signal occurs",
            "**Statistical process control (SPC)** — control charts (Module 4) provide real-time monitoring of process stability",
            "**Standard work** — detailed written procedures, visual work instructions, and training records",
            "**Visual management** — colour-coded indicators, andon boards, floor markings, and status displays that make abnormalities immediately visible",
            "**Response plan** — who to contact and what actions to take when an out-of-control signal occurs",
          ],
        },

        {
          type: "equip",
          title: "Control phase tools",
          items: [
            {
              art: "control-plan-form",
              name: "Control plan template",
              caption:
                "The control plan links each critical process parameter to its measurement method, " +
                "sampling frequency, control limits, and reaction plan.",
              specs: [
                { label: "Columns", value: "Process step, characteristic, spec, method, sample, control, reaction" },
                { label: "Updated", value: "After every process change or improvement project" },
              ],
            },
          ],
        },

        { type: "h", text: "Project closure and lessons learned" },
        {
          type: "p",
          text:
            "The project concludes with a formal closure report documenting: the problem statement and " +
            "baseline, root causes identified, solutions implemented, before-and-after performance comparison, " +
            "financial impact (cost savings or avoidance), lessons learned, and the control plan handover to " +
            "the process owner. The project sponsor signs off, and results are shared across the organisation.",
        },
        {
          type: "callout",
          tone: "key",
          title: "Cost of quality impact",
          text:
            "Link improvement results to the cost of quality framework (Module 6). A successful DMAIC project " +
            "typically reduces failure costs (scrap, rework, returns) while the increase in appraisal or " +
            "prevention costs is far smaller, yielding a net reduction in total quality costs.",
        },

        /* Lab: form — build a solution criteria matrix */
        {
          type: "form",
          id: "aqe-m8-l4-lab1",
          title: "Build a solution criteria matrix",
          task:
            "A cassava flour mill in Bertoua has identified that excess moisture in the final product " +
            "(target: ≤ 12%) is caused by inconsistent drying time. Three solutions have been proposed. " +
            "Evaluate them using the criteria below.",
          fields: [
            {
              kind: "select",
              label: "Which criterion should have the highest weight for a food safety issue?",
              options: [
                "Implementation speed",
                "Effectiveness at eliminating the root cause",
                "Lowest initial cost",
                "Ease of operator training",
              ],
              answer: 1,
              explain:
                "For a food safety issue like excess moisture (which promotes mould growth), effectiveness " +
                "at eliminating the root cause must be the primary criterion.",
            },
            {
              kind: "select",
              label:
                "Solution A: Install moisture sensor with auto-shutoff (cost: 4.5M FCFA). " +
                "Solution B: Add drying time to the operator checklist (cost: 50K FCFA). " +
                "Solution C: Replace dryer with a larger model (cost: 22M FCFA). " +
                "Which solution best balances effectiveness and feasibility for a small mill?",
              options: [
                "Solution A — automated control directly addresses the root cause at moderate cost",
                "Solution B — lowest cost but relies on operator discipline",
                "Solution C — most effective but cost is prohibitive for a small mill",
                "None of the solutions are adequate",
              ],
              answer: 0,
              explain:
                "Solution A provides automated control (high effectiveness and sustainability) at a cost " +
                "that a small mill can manage. Solution B is cheap but relies on human consistency, and " +
                "Solution C is disproportionately expensive.",
            },
            {
              kind: "select",
              label: "What should the team do after selecting the best solution?",
              options: [
                "Immediately implement it across all production lines",
                "Run a pilot on one production line, collect moisture data, and compare to baseline",
                "Wait for the next budget cycle before taking any action",
                "Move directly to the Control phase",
              ],
              answer: 1,
              explain:
                "A pilot verifies effectiveness in the real process environment before committing to " +
                "full-scale implementation.",
            },
          ],
          hint: "Consider both the severity of the quality problem (food safety) and the practical constraints of a small operation.",
        },

        /* Lab: sheet — calculate cost-benefit for improvement options */
        {
          type: "sheet",
          id: "aqe-m8-l4-lab2",
          title: "Cost-benefit analysis for improvement options",
          task:
            "Calculate the annual savings, net benefit, and payback period for each improvement option " +
            "at a packaging plant in Douala. Fill in the yellow cells.",
          data: [
            ["Option", "Implementation cost (FCFA)", "Annual scrap reduction (FCFA)", "Annual rework reduction (FCFA)", "Total annual savings (FCFA)", "Net benefit Year 1 (FCFA)", "Payback (months)"],
            ["A: Automated inspection", 8500000, 6200000, 2800000, null, null, null],
            ["B: Operator training", 1200000, 2100000, 1400000, null, null, null],
            ["C: Material upgrade", 4800000, 4500000, 1100000, null, null, null],
          ],
          editable: ["E2", "F2", "G2", "E3", "F3", "G3", "E4", "F4", "G4"],
          checks: [
            { cell: "E2", equals: 9000000 },
            { cell: "F2", equals: 500000 },
            { cell: "G2", equals: 11.3, tol: 0.2 },
            { cell: "E3", equals: 3500000 },
            { cell: "F3", equals: 2300000 },
            { cell: "G3", equals: 4.1, tol: 0.2 },
            { cell: "E4", equals: 5600000 },
            { cell: "F4", equals: 800000 },
            { cell: "G4", equals: 10.3, tol: 0.2 },
          ],
          hint:
            "Total annual savings = scrap reduction + rework reduction. " +
            "Net benefit Year 1 = total annual savings − implementation cost. " +
            "Payback (months) = (implementation cost ÷ total annual savings) × 12.",
          solution: {
            E2: "=6200000+2800000",
            F2: "=9000000-8500000",
            G2: "=(8500000/9000000)*12",
            E3: "=2100000+1400000",
            F3: "=3500000-1200000",
            G3: "=(1200000/3500000)*12",
            E4: "=4500000+1100000",
            F4: "=5600000-4800000",
            G4: "=(4800000/5600000)*12",
          },
        },
      ],
    },

    /* ──────────────────────────────────────────────────────────
     * LESSON 5 — Lean principles and waste elimination
     * ────────────────────────────────────────────────────────── */
    {
      id: "aqe-m8-l5",
      title: "Lean principles and waste elimination",
      minutes: 25,
      objectives: [
        "State the five lean principles and explain their relationship to quality",
        "Identify and classify the eight wastes using the DOWNTIME mnemonic",
        "Select appropriate lean tools for specific improvement opportunities",
        "Describe value stream mapping and its role in visualising process flow",
      ],
      blocks: [
        { type: "h", text: "Five lean principles" },
        {
          type: "p",
          text:
            "Lean thinking, developed from the Toyota Production System, provides a complementary framework " +
            "to Six Sigma. While Six Sigma focuses on reducing variation and defects, Lean focuses on " +
            "eliminating waste and improving flow. Together, they form **Lean Six Sigma** — the most powerful " +
            "continuous improvement methodology available.",
        },
        {
          type: "steps",
          title: "The five lean principles",
          items: [
            "**Value** — Define value from the customer's perspective. Only activities the customer is willing to pay for add value; everything else is waste.",
            "**Value stream** — Map all steps in the process from raw material to delivery. Identify which steps add value, which are necessary but non-value-adding (e.g., regulatory inspections), and which are pure waste.",
            "**Flow** — Arrange value-adding steps in tight sequence so the product flows smoothly without waiting, batching, or backtracking.",
            "**Pull** — Produce only what the customer has ordered, when they need it. Avoid overproduction by using pull signals (kanban) rather than pushing product based on forecasts.",
            "**Perfection** — Continuously pursue the ideal state through repeated cycles of waste elimination. Perfection is the direction, not the destination.",
          ],
        },

        { type: "h", text: "The eight wastes: DOWNTIME" },
        {
          type: "p",
          text:
            "Toyota originally identified seven wastes (muda); the eighth — non-utilised talent — was added " +
            "later. The mnemonic **DOWNTIME** makes them easy to remember. Identifying and eliminating these " +
            "wastes is the foundation of lean improvement.",
        },
        {
          type: "table",
          head: ["Waste", "Letter", "Definition", "Cameroon example"],
          rows: [
            ["Defects", "D", "Products or services that do not meet specifications", "Cracked tiles requiring rework at Limbe ceramics plant"],
            ["Overproduction", "O", "Making more than the customer ordered or before it is needed", "Bamenda soap factory producing 3 months of inventory 'just in case'"],
            ["Waiting", "W", "Idle time when people, materials, or information are not ready", "Operators waiting 45 min for forklift to deliver raw materials in Douala"],
            ["Non-utilised talent", "N", "Not using people's skills, knowledge, or creativity", "Experienced machine operator never consulted on process improvements"],
            ["Transportation", "T", "Unnecessary movement of materials between locations", "Semi-finished goods trucked between two buildings 800 m apart in Yaoundé"],
            ["Inventory", "I", "Excess raw materials, WIP, or finished goods beyond what is needed", "6 months of packaging supplies stored in warehouse, tying up capital"],
            ["Motion", "M", "Unnecessary movement of people (walking, reaching, bending)", "Operator walking 20 m to collect tools stored far from workstation"],
            ["Extra processing", "E", "Doing more work than the customer requires", "Polishing internal surfaces of a pipe fitting that will never be visible"],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Waste is not always obvious",
          text:
            "Many wastes are hidden because they have become accepted as 'normal'. A time study at a Douala " +
            "furniture workshop revealed that operators spent 35% of their time walking to fetch tools, " +
            "materials, and drawings — all motion waste that was invisible until measured.",
        },

        {
          type: "check",
          id: "aqe-m8-l5-ck1",
          question:
            "A factory produces 500 units per day but customers only order 300 per day. The excess 200 units go into warehouse storage. Which waste does this represent?",
          options: [
            "Inventory",
            "Overproduction",
            "Extra processing",
            "Waiting",
          ],
          answer: 1,
          explain:
            "Producing more than the customer demands is **overproduction** — considered the worst waste " +
            "because it generates other wastes (inventory, transportation, motion). The resulting excess " +
            "stock in the warehouse is a secondary waste (inventory).",
        },

        { type: "h", text: "Lean tools overview" },
        {
          type: "table",
          head: ["Tool", "Purpose", "When to use"],
          rows: [
            ["5S", "Sort, Set in order, Shine, Standardise, Sustain — workplace organisation", "Foundation for any lean initiative; start here"],
            ["Kanban", "Visual pull signal to trigger production or material replenishment", "Reduce overproduction and inventory waste"],
            ["Poka-yoke", "Error-proofing devices that prevent defects from occurring", "When human error is a significant source of defects"],
            ["SMED", "Single Minute Exchange of Die — reduce changeover time", "When long changeovers force large batch production"],
            ["TPM", "Total Productive Maintenance — operator-led equipment care", "When unplanned breakdowns and minor stops reduce OEE"],
            ["Visual management", "Colour codes, markings, andon lights, status boards", "Make abnormalities immediately visible to everyone"],
          ],
        },

        { type: "h", text: "Value stream mapping" },
        {
          type: "p",
          text:
            "A value stream map (VSM) is a visual representation of all the steps — both value-adding and " +
            "non-value-adding — required to bring a product from raw material to the customer. The **current " +
            "state map** shows the process as it is today, including cycle times, changeover times, inventory " +
            "levels, and information flows. The **future state map** shows the improved process after wastes " +
            "are eliminated.",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "VSM at a Douala packaging company",
          text:
            "A current-state VSM revealed a total lead time of 14 days from order receipt to shipment, " +
            "but only 2.8 hours of actual value-adding processing time. The value-adding ratio was just " +
            "0.83%. The future-state map targeted reducing lead time to 5 days by eliminating batch-and-queue " +
            "processing, reducing WIP inventory, and implementing a pull system with kanban.",
        },

        { type: "h", text: "Kaizen events and daily management" },
        {
          type: "p",
          text:
            "A **kaizen event** (also called a kaizen blitz or rapid improvement event) is a focused, " +
            "short-duration (typically 3–5 days) improvement activity targeting a specific process or area. " +
            "The team maps the current state, identifies wastes, implements improvements, and standardises " +
            "the new process — all within the event week. **Daily management** (also called gemba management) " +
            "sustains gains through structured daily routines: short team meetings, visual performance boards, " +
            "and leader standard work including gemba walks.",
        },

        {
          type: "check",
          id: "aqe-m8-l5-ck2",
          question:
            "Which lean tool would be most appropriate to reduce defects caused by operators accidentally assembling parts in the wrong orientation?",
          options: [
            "Kanban",
            "SMED",
            "Poka-yoke",
            "5S",
          ],
          answer: 2,
          explain:
            "Poka-yoke (error-proofing) prevents human errors by designing parts or fixtures so that " +
            "incorrect assembly is physically impossible — for example, asymmetrical pins that only fit " +
            "in the correct orientation.",
        },

        {
          type: "equip",
          title: "Lean tools in practice",
          items: [
            {
              art: "poka-yoke-fixture",
              name: "Poka-yoke fixture",
              caption:
                "An error-proofing jig that prevents parts from being loaded in the wrong orientation. " +
                "Asymmetric locating pins ensure only correctly positioned parts can be processed.",
              specs: [
                { label: "Type", value: "Contact method — physical shape prevents error" },
                { label: "Triggered by", value: "Incorrect part orientation blocks fixture closure" },
              ],
            },
            {
              art: "andon-light",
              name: "Andon signal light",
              caption:
                "A visual management device mounted on equipment or assembly lines that signals status: " +
                "green (normal), yellow (attention needed), red (line stopped). Enables rapid response " +
                "to abnormalities.",
              specs: [
                { label: "Green", value: "Normal operation — process running to standard" },
                { label: "Yellow", value: "Caution — minor issue, supervisor attention needed" },
                { label: "Red", value: "Stop — critical problem, immediate intervention required" },
              ],
            },
          ],
        },

        /* Lab: sorter — classify wastes */
        {
          type: "sorter",
          id: "aqe-m8-l5-lab1",
          title: "Classify the eight wastes (DOWNTIME)",
          task:
            "Drag each workplace observation into the correct waste category.",
          layout: "columns",
          buckets: [
            { label: "Defects" },
            { label: "Overproduction" },
            { label: "Waiting" },
            { label: "Non-utilised talent" },
            { label: "Transportation" },
            { label: "Inventory" },
            { label: "Motion" },
            { label: "Extra processing" },
          ],
          items: [
            {
              text: "Products returned by customers due to incorrect dimensions",
              bucket: 0,
              explain: "Products not meeting specifications are defects.",
            },
            {
              text: "Factory produces 2,000 units per week although weekly orders average only 1,200",
              bucket: 1,
              explain: "Producing more than demand requires is overproduction.",
            },
            {
              text: "Operators stand idle for 20 minutes each morning waiting for the supervisor to assign tasks",
              bucket: 2,
              explain: "People idle because information is not ready is waiting waste.",
            },
            {
              text: "A technician with 15 years of press experience is assigned only to sweeping duties",
              bucket: 3,
              explain: "Failing to use an employee's skills and knowledge is non-utilised talent.",
            },
            {
              text: "Raw materials are moved by forklift between three buildings before reaching the production line",
              bucket: 4,
              explain: "Unnecessary movement of materials between locations is transportation waste.",
            },
            {
              text: "The warehouse holds 8 months of packaging supplies, tying up 12 million FCFA",
              bucket: 5,
              explain: "Excess stock beyond what is needed is inventory waste.",
            },
            {
              text: "An assembler walks 30 metres to the tool crib each time she needs a different wrench",
              bucket: 6,
              explain: "Unnecessary movement of people is motion waste.",
            },
            {
              text: "Workers sand a surface to mirror finish even though it will be covered by another component",
              bucket: 7,
              explain: "Performing work beyond what the customer requires is extra processing.",
            },
          ],
        },

        /* Lab: form — identify lean tools for improvement opportunities */
        {
          type: "form",
          id: "aqe-m8-l5-lab2",
          title: "Match lean tools to improvement opportunities",
          task:
            "For each workplace problem described below, select the most appropriate lean tool.",
          fields: [
            {
              kind: "select",
              label: "Problem: The workshop floor is cluttered with unused tools, scrap, and personal items, making it hard to find what is needed.",
              options: ["Kanban", "5S", "SMED", "TPM"],
              answer: 1,
              explain: "5S (Sort, Set in order, Shine, Standardise, Sustain) is the foundation tool for organising the workplace and eliminating clutter.",
            },
            {
              kind: "select",
              label: "Problem: Changeover between products takes 4 hours, forcing the factory to run large batches to minimise the number of changeovers.",
              options: ["Poka-yoke", "Visual management", "SMED", "5S"],
              answer: 2,
              explain: "SMED (Single Minute Exchange of Die) systematically reduces changeover time, enabling smaller batch sizes and greater flexibility.",
            },
            {
              kind: "select",
              label: "Problem: Operators frequently install gaskets upside down, causing leaks that are only detected at final test.",
              options: ["Kanban", "Poka-yoke", "TPM", "Value stream mapping"],
              answer: 1,
              explain: "Poka-yoke (error-proofing) designs the part or fixture so that incorrect installation is physically impossible.",
            },
            {
              kind: "select",
              label: "Problem: The factory frequently runs out of key components, then overorders, creating alternating stockouts and excess inventory.",
              options: ["SMED", "Kanban", "5S", "Poka-yoke"],
              answer: 1,
              explain: "Kanban provides visual pull signals that trigger replenishment only when stock drops to a defined level, smoothing the supply chain.",
            },
          ],
          hint: "Match the tool to the specific type of waste or problem it was designed to address.",
        },
      ],
    },

    /* ──────────────────────────────────────────────────────────
     * LESSON 6 — Practice
     * ────────────────────────────────────────────────────────── */
    {
      id: "aqe-m8-practice",
      title: "Practice: Lean Six Sigma and continuous improvement",
      minutes: 30,
      objectives: [
        "Classify the eight wastes (TIMWOODS) and map them to manufacturing observations",
        "Conduct structured root cause analysis using 5 Whys and fishbone diagrams",
        "Perform Pareto analysis and DMAIC sigma-level calculations for process improvement projects",
      ],
      blocks: [
        { type: "h", text: "Practice exercises" },
        {
          type: "p",
          text:
            "Complete the four exercises below. They progress from beginner to expert level, covering " +
            "the core skills of this module: waste identification, root cause analysis, Pareto analysis, " +
            "and full DMAIC project calculations.",
        },

        /* Practice 1: beginner — sorter — classify 8 wastes */
        {
          type: "sorter",
          id: "aqe-m8-practice-lab1",
          level: "beginner",
          title: "Classify the 8 wastes from workplace examples",
          task:
            "A food processing plant in Maroua has asked you to conduct a waste walk. " +
            "Classify each observation into the correct waste category.",
          layout: "columns",
          buckets: [
            { label: "Defects" },
            { label: "Overproduction" },
            { label: "Waiting" },
            { label: "Non-utilised talent" },
            { label: "Transportation" },
            { label: "Inventory" },
            { label: "Motion" },
            { label: "Extra processing" },
          ],
          items: [
            {
              text: "Bags of millet flour rejected because of incorrect weight (underweight by 50 g)",
              bucket: 0,
              explain: "Products not meeting weight specifications are defects requiring rework or disposal.",
            },
            {
              text: "The night shift produces 150 extra bags 'just in case' even though no orders require them",
              bucket: 1,
              explain: "Producing beyond customer demand is overproduction — the most harmful waste because it drives other wastes.",
            },
            {
              text: "The grinding mill is down for 90 minutes every morning waiting for maintenance to replace worn screens",
              bucket: 2,
              explain: "Equipment idle time due to delayed maintenance parts is waiting waste.",
            },
            {
              text: "A quality technician with food science training spends half her day entering data into a spreadsheet that could be automated",
              bucket: 3,
              explain: "Using a skilled professional for routine data entry wastes their expertise (non-utilised talent).",
            },
            {
              text: "Finished bags are moved by hand cart to a temporary area, then moved again to the loading dock — a total distance of 200 m with an intermediate stop",
              bucket: 4,
              explain: "Double-handling and unnecessary material movement is transportation waste.",
            },
            {
              text: "The store room holds 14 weeks of packaging material even though the supplier delivers weekly",
              bucket: 5,
              explain: "Excess raw material inventory beyond what is needed ties up cash and space (inventory waste).",
            },
            {
              text: "The bagging operator bends down 400 times per shift to pick bags from a pallet on the floor instead of using an elevated dispenser",
              bucket: 6,
              explain: "Repetitive bending is unnecessary human movement — motion waste that also causes ergonomic strain.",
            },
            {
              text: "Each bag is hand-stitched closed and then re-stitched with a reinforcing row, although the single stitch meets the closure strength standard",
              bucket: 7,
              explain: "The reinforcing stitch exceeds the customer requirement — extra processing waste.",
            },
          ],
        },

        /* Practice 2: intermediate — whys — 5 Whys for a production problem */
        {
          type: "whys",
          id: "aqe-m8-practice-lab2",
          level: "intermediate",
          title: "5 Whys: high scrap rate on plastic injection moulding",
          task:
            "A plastic container factory in Douala is experiencing a 9% scrap rate due to short shots " +
            "(incomplete filling of the mould). Use the 5 Whys to identify the root cause.",
          problem: "9% of injection-moulded plastic containers have short shots (incompletely filled sections).",
          steps: [
            {
              question: "Why are the containers showing short shots?",
              options: [
                "Because the molten plastic is not completely filling the mould cavity",
                "Because the containers are the wrong colour",
                "Because the moulds are too new",
                "Because the operators are working too fast",
              ],
              answer: 0,
              explain: "Short shots occur when plastic does not flow into all areas of the mould cavity before solidifying.",
            },
            {
              question: "Why is the plastic not completely filling the mould?",
              options: [
                "Because the injection pressure is too low for the mould geometry",
                "Because the plastic pellets are too expensive",
                "Because the mould is painted the wrong colour",
                "Because the factory is located in a humid area",
              ],
              answer: 0,
              explain: "Pressure measurements show 85 bar versus the required 110 bar for this mould — insufficient to push plastic into thin-walled sections.",
            },
            {
              question: "Why is the injection pressure too low?",
              options: [
                "Because the hydraulic system has a leaking seal reducing available pressure",
                "Because the operator prefers lower pressure",
                "Because the machine is too large for the mould",
                "Because the raw material supplier changed countries",
              ],
              answer: 0,
              explain: "Maintenance inspection found a worn hydraulic cylinder seal allowing pressure bypass, reducing effective injection force.",
            },
            {
              question: "Why was the leaking hydraulic seal not detected and replaced?",
              options: [
                "Because the machine is not included in the preventive maintenance schedule",
                "Because the seal is a new design that just came out",
                "Because the operator intentionally damaged the seal",
                "Because hydraulic seals never need replacement",
              ],
              answer: 0,
              explain: "This injection moulding machine was installed 18 months ago but was never added to the PM schedule, so no periodic seal inspections were performed.",
            },
          ],
          countermeasure: {
            question: "What countermeasure addresses the root cause?",
            options: [
              "Buy a completely new injection moulding machine",
              "Replace the seal and add the machine to the preventive maintenance schedule with quarterly hydraulic system inspections",
              "Increase the raw material pellet size to require less pressure",
              "Reduce production speed to give plastic more time to fill the mould",
            ],
            answer: 1,
            explain:
              "Replacing the seal fixes the immediate problem, and adding the machine to the PM schedule " +
              "with quarterly inspections prevents recurrence by ensuring seals are checked before they " +
              "deteriorate to the point of causing defects.",
          },
          hint: "Each answer should logically explain the previous one. Think about what physical mechanism causes short shots and trace it back to the management system.",
        },

        /* Practice 3: advanced — pareto — analyse defect data */
        {
          type: "pareto",
          id: "aqe-m8-practice-lab3",
          level: "advanced",
          title: "Pareto analysis: aluminium extrusion defects",
          task:
            "An aluminium extrusion plant in Edéa recorded 1,245 defects over one quarter. " +
            "Use the Pareto chart to identify the vital few defect categories. What percentage " +
            "of total defects do the top three categories represent?",
          unit: "defects",
          categories: [
            { label: "Surface scratches", count: 423 },
            { label: "Dimensional out-of-tolerance", count: 287 },
            { label: "Twist/bow", count: 196 },
            { label: "Die lines", count: 148 },
            { label: "Porosity", count: 97 },
            { label: "Colour mismatch (anodising)", count: 58 },
            { label: "Cut length errors", count: 36 },
          ],
          hint:
            "The top three categories (surface scratches, dimensional OOT, twist/bow) account for " +
            "423 + 287 + 196 = 906 out of 1,245 defects = 72.8%. These are the vital few.",
        },

        /* Practice 4: expert — sheet — DMAIC project calculations */
        {
          type: "sheet",
          id: "aqe-m8-practice-lab4",
          level: "expert",
          title: "DMAIC project calculations",
          task:
            "Complete the DMAIC project summary calculations for a cocoa bean sorting operation " +
            "in the South-West Region. Calculate baseline metrics, improvement targets, sigma levels, " +
            "and cost of quality savings. Fill in the yellow cells.",
          data: [
            ["DMAIC Project Summary", "", ""],
            ["", "Baseline (Before)", "Target (After)"],
            ["Units processed per month", 50000, 50000],
            ["Opportunities per unit", 3, 3],
            ["Total opportunities", null, null],
            ["Defects found", 2850, null],
            ["DPMO", null, null],
            ["Yield (%)", null, null],
            ["Approx. sigma level", null, null],
            ["", "", ""],
            ["Cost of quality", "Baseline (FCFA/month)", "Target (FCFA/month)"],
            ["Scrap cost", 4275000, null],
            ["Rework cost", 2850000, null],
            ["Total failure cost", null, null],
            ["Monthly savings", "", null],
            ["Annual savings", "", null],
          ],
          editable: [
            "B5", "C5",
            "C6",
            "B7", "C7",
            "B8", "C8",
            "B9", "C9",
            "C12", "C13",
            "B14", "C14",
            "C15",
            "C16",
          ],
          checks: [
            { cell: "B5", equals: 150000 },
            { cell: "C5", equals: 150000 },
            { cell: "C6", equals: 900, tol: 5 },
            { cell: "B7", equals: 19000, tol: 50 },
            { cell: "C7", equals: 6000, tol: 50 },
            { cell: "B8", equals: 98.10, tol: 0.05 },
            { cell: "C8", equals: 99.40, tol: 0.05 },
            { cell: "B9", equals: 3.6, tol: 0.2 },
            { cell: "C9", equals: 4.0, tol: 0.2 },
            { cell: "C12", equals: 1350000, tol: 10000 },
            { cell: "C13", equals: 900000, tol: 10000 },
            { cell: "B14", equals: 7125000 },
            { cell: "C14", equals: 2250000, tol: 10000 },
            { cell: "C15", equals: 4875000, tol: 10000 },
            { cell: "C16", equals: 58500000, tol: 200000 },
          ],
          hint:
            "Total opportunities = units × opportunities per unit (150,000). Target defects: the project aims " +
            "to reduce DPMO from ~19,000 to ~6,000 (a shift from ~3.6σ to ~4.0σ). Target defects = " +
            "DPMO × total opportunities ÷ 1,000,000 = 6,000 × 150,000 ÷ 1,000,000 = 900. Costs scale " +
            "proportionally: target scrap = baseline scrap × (target defects ÷ baseline defects) = " +
            "4,275,000 × (900 ÷ 2,850) ≈ 1,350,000. Monthly savings = baseline failure cost − target " +
            "failure cost. Annual savings = monthly savings × 12.",
          solution: {
            B5: "=50000*3",
            C5: "=50000*3",
            C6: "900",
            B7: "=(2850/150000)*1000000",
            C7: "=(900/150000)*1000000",
            B8: "=(1-19000/1000000)*100",
            C8: "=(1-6000/1000000)*100",
            B9: "3.6",
            C9: "4.0",
            C12: "=4275000*(900/2850)",
            C13: "=2850000*(900/2850)",
            B14: "=4275000+2850000",
            C14: "=1350000+900000",
            C15: "=7125000-2250000",
            C16: "=4875000*12",
          },
        },
      ],
    },
  ],

  /* ──────────────────────────────────────────────────────────
   * MODULE QUIZ
   * ────────────────────────────────────────────────────────── */
  quiz: {
    id: "aqe-m8-quiz",
    title: "Module 8 Quiz — Lean Six Sigma and Continuous Improvement",
    passPct: 75,
    questions: [
      {
        id: "aqe-m8-q1",
        question:
          "What does DPMO stand for, and what is the DPMO value for a 6σ process (with the standard 1.5σ shift)?",
        options: [
          "Defects Per Million Observations — 34",
          "Defects Per Million Opportunities — 3.4",
          "Defects Per Measured Output — 3,400",
          "Defects Per Manufacturing Operation — 340",
        ],
        answer: 1,
        explain:
          "DPMO = Defects Per Million Opportunities. A 6σ process (with the customary 1.5σ long-term shift) produces only 3.4 DPMO.",
      },
      {
        id: "aqe-m8-q2",
        question:
          "In which DMAIC phase would you construct a fishbone diagram and conduct a 5 Whys analysis?",
        options: [
          "Define",
          "Measure",
          "Analyse",
          "Improve",
        ],
        answer: 2,
        explain:
          "The Analyse phase is dedicated to identifying and verifying root causes using tools such as fishbone diagrams, 5 Whys, Pareto charts, and hypothesis tests.",
      },
      {
        id: "aqe-m8-q3",
        question:
          "A CTQ tree translates which of the following into measurable specifications?",
        options: [
          "Management financial targets",
          "Voice of the customer (VOC) needs",
          "Supplier delivery schedules",
          "Employee satisfaction survey results",
        ],
        answer: 1,
        explain:
          "The CTQ (Critical-to-Quality) tree systematically decomposes voice of the customer data into needs, drivers, and measurable specifications that the process must achieve.",
      },
      {
        id: "aqe-m8-q4",
        question:
          "A process has FPY values of 96%, 88%, and 94% at three sequential steps. What is the rolled throughput yield (RTY)?",
        options: [
          "92.7%",
          "79.5%",
          "88.0%",
          "96.0%",
        ],
        answer: 1,
        explain:
          "RTY = 0.96 × 0.88 × 0.94 = 0.7937, or approximately 79.5%. RTY reveals the cumulative effect of losses across all process steps.",
      },
      {
        id: "aqe-m8-q5",
        question:
          "Which of the following is NOT one of the eight wastes in the DOWNTIME framework?",
        options: [
          "Defects",
          "Depreciation",
          "Overproduction",
          "Non-utilised talent",
        ],
        answer: 1,
        explain:
          "DOWNTIME stands for Defects, Overproduction, Waiting, Non-utilised talent, Transportation, Inventory, Motion, and Extra processing. Depreciation is an accounting concept, not one of the eight wastes.",
      },
      {
        id: "aqe-m8-q6",
        question:
          "A factory produces items in batches of 5,000 even though daily demand is only 500. Which lean tool most directly addresses this problem?",
        options: [
          "5S",
          "Poka-yoke",
          "SMED (Single Minute Exchange of Die)",
          "TPM (Total Productive Maintenance)",
        ],
        answer: 2,
        explain:
          "Large batches are typically driven by long changeover times — it takes so long to change over that the factory tries to minimise the number of changeovers. SMED reduces changeover time, enabling smaller batches closer to actual demand.",
      },
      {
        id: "aqe-m8-q7",
        question:
          "What is the primary purpose of a control plan in the Control phase of DMAIC?",
        options: [
          "To calculate the project's return on investment",
          "To document what to monitor, how to measure it, and what action to take if the process drifts",
          "To identify root causes of defects",
          "To select which improvement project to pursue next",
        ],
        answer: 1,
        explain:
          "The control plan specifies what process parameters to monitor, the measurement method, sampling frequency, control limits, and the reaction plan — ensuring improvements are sustained after the project team disbands.",
      },
      {
        id: "aqe-m8-q8",
        question:
          "In a value stream map, the current-state map shows a total lead time of 10 days but only 45 minutes of value-adding time. Which lean principle does this analysis most directly support?",
        options: [
          "Pull — produce only what the customer orders",
          "Value — define value from the customer's perspective",
          "Flow — eliminate waiting and batch processing to create continuous flow",
          "Perfection — continuously pursue the ideal state",
        ],
        answer: 2,
        explain:
          "The huge gap between lead time (10 days) and value-adding time (45 minutes) indicates extensive waiting, batching, and queue time. The Flow principle addresses this by arranging steps in continuous sequence to eliminate non-value-adding time.",
      },
    ],
  },
};
