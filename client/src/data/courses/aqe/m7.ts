import type { CourseModule } from "../../../lms/types";

export const m7: CourseModule = {
  id: "aqe-m7",
  number: 7,
  title: "Reliability Engineering and Supplier Quality",
  hours: 15,
  summary:
    "This module covers reliability engineering concepts and metrics including failure rate, MTBF, and the bathtub curve; failure mode analysis techniques and Weibull distribution fundamentals for characterising failure behaviour; the Production Part Approval Process (PPAP) and its 18 elements for qualifying production parts; supplier development, qualification, and management through scorecards and audit programmes; and corrective and preventive action (CAPA) systems including 8D methodology for systematically resolving quality issues across the supply chain.",

  lessons: [
    /* ------------------------------------------------------------------ */
    /*  LESSON 1 — Reliability concepts and metrics                       */
    /* ------------------------------------------------------------------ */
    {
      id: "aqe-m7-l1",
      number: 1,
      title: "Reliability concepts and metrics",
      minutes: 25,
      objectives: [
        "Define reliability and express it mathematically as a probability function",
        "Calculate MTBF, MTTF, and MTTR from field failure data",
        "Describe the three regions of the bathtub curve and their practical implications",
        "Compute system reliability for series and parallel configurations",
      ],
      blocks: [
        {
          type: "h",
          text: "What is reliability?",
        },
        {
          type: "p",
          text: "Reliability is the probability that an item will perform its intended function for a specified period of time under stated conditions. Unlike quality, which is assessed at a point in time, reliability introduces the dimension of time. A pump may pass all quality checks at the factory in Douala, yet fail within three months if reliability was not designed in.",
        },
        {
          type: "callout",
          tone: "key",
          title: "Reliability function",
          text: "R(t) = e^(−λt) for constant failure rate λ. If λ = 0.002 failures/hour, the probability of surviving 500 hours is R(500) = e^(−0.002 × 500) = e^(−1) ≈ 0.368, or 36.8 %.",
        },
        {
          type: "h",
          text: "Key reliability metrics",
        },
        {
          type: "table",
          head: ["Metric", "Full name", "Definition", "Units"],
          rows: [
            [
              "MTBF",
              "Mean Time Between Failures",
              "Average operating time between successive failures (repairable systems)",
              "Hours",
            ],
            [
              "MTTF",
              "Mean Time To Failure",
              "Average time to first failure (non-repairable items)",
              "Hours",
            ],
            [
              "MTTR",
              "Mean Time To Repair",
              "Average time required to restore a failed item to operation",
              "Hours",
            ],
            [
              "λ",
              "Failure rate",
              "Number of failures per unit time; λ = 1/MTBF",
              "Failures/hour",
            ],
            [
              "A",
              "Availability",
              "A = MTBF / (MTBF + MTTR)",
              "Ratio (0–1)",
            ],
          ],
        },
        {
          type: "p",
          text: "For a fleet of 20 water pumps at a Cameroon municipal utility operating a combined 40 000 hours with 8 failures recorded, MTBF = 40 000 / 8 = 5 000 hours and λ = 1 / 5 000 = 0.0002 failures/hour.",
        },
        {
          type: "check",
          id: "aqe-m7-ck1",
          question:
            "A non-repairable sensor has an MTTF of 10 000 hours. What is the failure rate λ?",
          options: [
            "0.01 failures/hour",
            "0.001 failures/hour",
            "0.0001 failures/hour",
            "0.00001 failures/hour",
          ],
          answer: 2,
          explain:
            "λ = 1 / MTTF = 1 / 10 000 = 0.0001 failures/hour.",
        },
        {
          type: "h",
          text: "The bathtub curve",
        },
        {
          type: "p",
          text: "The bathtub curve plots failure rate against time and reveals three distinct regions that govern maintenance and quality strategies.",
        },
        {
          type: "steps",
          title: "Bathtub curve regions",
          items: [
            "Infant mortality (decreasing failure rate): early failures caused by manufacturing defects, assembly errors, or material flaws. Burn-in testing and robust incoming inspection reduce this region.",
            "Useful life (constant failure rate): failures occur randomly. This is the region modelled by the exponential distribution. Preventive maintenance is designed around this stable rate.",
            "Wear-out (increasing failure rate): failures increase due to fatigue, corrosion, or degradation. Replacement schedules and condition monitoring target this region.",
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Bathtub curve in Cameroon cement plants",
          text: "Conveyor belt bearings imported into Douala often show elevated infant mortality when subjected to humidity levels above supplier specifications. Quality engineers implement 48-hour burn-in runs before commissioning and track early failures separately from wear-out data.",
        },
        {
          type: "h",
          text: "Series and parallel system reliability",
        },
        {
          type: "p",
          text: "In a series system, all components must function for the system to operate. In a parallel (redundant) system, only one path must survive. These models are fundamental to reliability design.",
        },
        {
          type: "table",
          head: ["Configuration", "Formula", "Example (R₁ = 0.95, R₂ = 0.90)"],
          rows: [
            [
              "Series",
              "R_sys = R₁ × R₂ × … × Rₙ",
              "0.95 × 0.90 = 0.855",
            ],
            [
              "Parallel",
              "R_sys = 1 − (1 − R₁)(1 − R₂)…(1 − Rₙ)",
              "1 − (0.05)(0.10) = 0.995",
            ],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Series reliability always decreases",
          text: "Adding components in series always reduces system reliability. A packaging line with 6 series stations each at 0.98 reliability gives R_sys = 0.98⁶ = 0.886 — only 88.6 %. Identify the weakest link and add parallel redundancy there.",
        },
        {
          type: "equip",
          title: "Reliability testing equipment",
          items: [
            {
              art: "inspection-booth",
              name: "Inspection booth",
              caption: "Controlled environment for reliability inspections during burn-in testing and post-failure examination of returned components.",
            },
          ],
        },
        {
          type: "sheet",
          id: "aqe-m7-lab1a",
          title: "System reliability calculation",
          task: "A bottling line in Limbe has three critical stations in series: capper (R = 0.97), filler (R = 0.94), labeller (R = 0.96). Calculate the series system reliability in C2. Then calculate the new system reliability in C3 if a redundant filler (R = 0.94) is added in parallel to the existing filler.",
          data: [
            ["Station", "Reliability", "Series R_sys", "Parallel filler + Series R_sys"],
            ["Capper", 0.97, null, null],
            ["Filler", 0.94, null, null],
            ["Labeller", 0.96, null, null],
          ],
          editable: ["C2", "C3"],
          checks: [
            { cell: "C2", equals: 0.8789, tol: 0.001 },
            { cell: "C3", equals: 0.9336, tol: 0.001 },
          ],
          hint: "Series: R_sys = 0.97 × 0.94 × 0.96. For parallel filler: R_filler_parallel = 1 − (1 − 0.94)² = 0.9964, then multiply in series with capper and labeller.",
          solution: {
            C2: "0.8789 (0.97 × 0.94 × 0.96)",
            C3: "0.9336 (0.97 × 0.9964 × 0.96)",
          },
        },
        {
          type: "form",
          id: "aqe-m7-lab1b",
          title: "Reliability metrics matching",
          task: "Match each reliability scenario to the correct metric.",
          fields: [
            {
              kind: "select",
              id: "f1",
              label:
                "A repairable compressor at a Kribi fish processing plant averages 2 400 operating hours between breakdowns",
              options: ["MTBF", "MTTF", "MTTR", "Failure rate"],
              answer: 0,
            },
            {
              kind: "select",
              id: "f2",
              label:
                "A single-use pressure relief valve lasts an average of 8 760 hours before it must be replaced",
              options: ["MTBF", "MTTF", "MTTR", "Failure rate"],
              answer: 1,
            },
            {
              kind: "select",
              id: "f3",
              label:
                "The maintenance crew takes an average of 4.5 hours to restore a failed motor",
              options: ["MTBF", "MTTF", "MTTR", "Failure rate"],
              answer: 2,
            },
            {
              kind: "select",
              id: "f4",
              label:
                "A batch of circuit boards experiences 0.0005 failures per hour",
              options: ["MTBF", "MTTF", "MTTR", "Failure rate"],
              answer: 3,
            },
          ],
          hint: "MTBF applies to repairable items; MTTF to non-repairable. MTTR measures repair duration, not operating time.",
        },
        {
          type: "links",
          items: [
            {
              label: "NIST Engineering Statistics Handbook — Reliability",
              url: "https://www.itl.nist.gov/div898/handbook/apr/apr.htm",
              source: "NIST",
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    /*  LESSON 2 — Failure analysis and Weibull distribution              */
    /* ------------------------------------------------------------------ */
    {
      id: "aqe-m7-l2",
      number: 2,
      title: "Failure analysis and Weibull distribution",
      minutes: 30,
      objectives: [
        "Explain the three Weibull parameters and their physical meaning",
        "Interpret the shape parameter β to classify failure behaviour",
        "Construct a Weibull probability plot from ranked failure data",
        "Calculate B10 life from Weibull parameters",
      ],
      blocks: [
        {
          type: "h",
          text: "Why Weibull?",
        },
        {
          type: "p",
          text: "The Weibull distribution is the most versatile reliability distribution because it can model all three regions of the bathtub curve through a single shape parameter β. Unlike the exponential distribution (which assumes constant failure rate), Weibull adapts to infant mortality, constant, and wear-out failure modes.",
        },
        {
          type: "h",
          text: "Weibull parameters",
        },
        {
          type: "table",
          head: ["Parameter", "Symbol", "Physical meaning", "Typical values"],
          rows: [
            [
              "Shape",
              "β (beta)",
              "Governs the failure rate behaviour over time",
              "0.5–5.0",
            ],
            [
              "Scale",
              "η (eta)",
              "Characteristic life — the time by which 63.2 % of units have failed",
              "Application-specific (hours, cycles, km)",
            ],
            [
              "Location",
              "γ (gamma)",
              "Minimum life before any failure is possible; shifts the distribution along the time axis",
              "Often 0 (two-parameter Weibull)",
            ],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "Interpreting β",
          text: "β < 1: decreasing failure rate (infant mortality — defective subpopulation). β = 1: constant failure rate (exponential distribution — random failures). β > 1: increasing failure rate (wear-out — fatigue, corrosion, ageing). Most mechanical components exhibit β between 1.5 and 4.0.",
        },
        {
          type: "h",
          text: "The Weibull reliability function",
        },
        {
          type: "code",
          text: "R(t) = e^−((t − γ) / η)^β\n\nFor a two-parameter Weibull (γ = 0):\n  R(t) = e^−(t / η)^β\n\nExample: β = 2.5, η = 3 000 hours\n  R(1 000) = e^−(1000/3000)^2.5\n           = e^−(0.333)^2.5\n           = e^−0.0642\n           = 0.9378 → 93.8 % survive to 1 000 hours",
        },
        {
          type: "equip",
          title: "Probability plotting tools",
          items: [
            {
              art: "stat-normality",
              name: "Statistical normality and probability plotting",
              caption: "Weibull probability plots follow the same ranking and plotting logic as normal probability plots: rank failure times, compute median ranks, and plot on special axes where the Weibull CDF appears as a straight line.",
            },
          ],
        },
        {
          type: "h",
          text: "Weibull probability plotting",
        },
        {
          type: "steps",
          title: "Constructing a Weibull plot",
          items: [
            "Rank the n failure times from smallest to largest and assign rank i = 1, 2, …, n.",
            "Calculate median rank for each failure: MR(i) = (i − 0.3) / (n + 0.4). This estimates the cumulative probability of failure F(t).",
            "Transform axes: X = ln(t), Y = ln(ln(1 / (1 − F(t)))). On Weibull probability paper these become linear axes.",
            "Plot each (X, Y) pair and fit a straight line by least squares.",
            "Read β as the slope of the fitted line. Read η where the line crosses F = 63.2 % (or Y = 0 on the transformed scale).",
          ],
        },
        {
          type: "h",
          text: "B10 life and L10 life",
        },
        {
          type: "p",
          text: "B10 life (also written L10) is the time by which 10 % of units are expected to fail, i.e., R(t) = 0.90. It is widely used in bearing and automotive specifications. From the Weibull function: B10 = η × (−ln(0.90))^(1/β). For β = 2.5 and η = 3 000 hours: B10 = 3 000 × (0.10536)^(1/2.5) = 3 000 × 0.10536^0.4 = 3 000 × 0.2784 ≈ 835 hours.",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Weibull analysis at a Douala tyre plant",
          text: "A quality engineer collected failure data from 15 tyre moulds and found β = 3.2, η = 18 000 cycles. The B10 life was calculated as 8 470 cycles. Since production schedules required 10 000 cycles per mould, the engineer recommended a design change to the mould cooling system to extend characteristic life.",
        },
        {
          type: "check",
          id: "aqe-m7-ck2",
          question:
            "A Weibull analysis of pump seal failures yields β = 0.7. What does this indicate?",
          options: [
            "Seals are failing due to wear-out after extended use",
            "Seals have a constant random failure rate",
            "Seals exhibit infant mortality — early failures dominate",
            "The data is not suitable for Weibull analysis",
          ],
          answer: 2,
          explain:
            "β < 1 indicates a decreasing failure rate, characteristic of infant mortality. This suggests manufacturing defects or installation errors rather than wear-out.",
        },
        {
          type: "sheet",
          id: "aqe-m7-lab2a",
          title: "Weibull parameter estimation from failure data",
          task: "Eight hydraulic hoses at a Bamenda construction site failed at the times listed below (hours). Calculate the median rank F(t) for each failure in column C, then compute X = ln(t) in column D and Y = ln(ln(1/(1−F(t)))) in column E for the first and last failures. Use the provided β = 1.8 and η = 950 hours to calculate B10 life in F2.",
          data: [
            ["Rank i", "Failure time (hrs)", "Median rank F(t)", "X = ln(t)", "Y = ln(ln(1/(1-F)))", "B10 life"],
            [1, 210, null, null, null, null],
            [2, 380, null, null, null, null],
            [3, 510, null, null, null, null],
            [4, 630, null, null, null, null],
            [5, 790, null, null, null, null],
            [6, 920, null, null, null, null],
            [7, 1085, null, null, null, null],
            [8, 1340, null, null, null, null],
          ],
          editable: ["C2", "C9", "D2", "D9", "E2", "E9", "F2"],
          checks: [
            { cell: "C2", equals: 0.0833, tol: 0.005 },
            { cell: "C9", equals: 0.9167, tol: 0.005 },
            { cell: "D2", equals: 5.347, tol: 0.01 },
            { cell: "D9", equals: 7.200, tol: 0.01 },
            { cell: "E2", equals: -2.442, tol: 0.05 },
            { cell: "E9", equals: 0.910, tol: 0.05 },
            { cell: "F2", equals: 290, tol: 15 },
          ],
          hint: "Median rank: MR(i) = (i − 0.3) / (n + 0.4) where n = 8. B10 = η × (−ln 0.90)^(1/β) = 950 × 0.10536^(1/1.8).",
          solution: {
            C2: "0.0833 → (1 − 0.3) / (8 + 0.4) = 0.7 / 8.4",
            C9: "0.9167 → (8 − 0.3) / 8.4 = 7.7 / 8.4",
            D2: "5.347 → ln(210)",
            D9: "7.200 → ln(1340)",
            E2: "−2.442 → ln(ln(1/(1 − 0.0833)))",
            E9: "0.910 → ln(ln(1/(1 − 0.9167)))",
            F2: "≈ 290 hours → 950 × (0.10536)^(1/1.8)",
          },
        },
        {
          type: "form",
          id: "aqe-m7-lab2b",
          title: "Interpret Weibull plot",
          task: "A Weibull analysis of electric motor bearings at a Garoua flour mill produced the following results. Interpret them.",
          fields: [
            {
              kind: "select",
              id: "f1",
              label:
                "The Weibull plot slope (β) is 3.4. What failure mode does this represent?",
              options: [
                "Infant mortality",
                "Random constant failure",
                "Wear-out failure",
                "No failure pattern",
              ],
              answer: 2,
            },
            {
              kind: "select",
              id: "f2",
              label:
                "The characteristic life η = 12 000 hours. What percentage of bearings are expected to fail by 12 000 hours?",
              options: ["36.8 %", "50.0 %", "63.2 %", "90.0 %"],
              answer: 2,
            },
            {
              kind: "select",
              id: "f3",
              label:
                "Given β = 3.4 (wear-out), which maintenance strategy is most appropriate?",
              options: [
                "Run to failure with no preventive action",
                "Scheduled replacement before the characteristic life",
                "Burn-in testing to screen weak units",
                "Increase incoming inspection stringency",
              ],
              answer: 1,
            },
            {
              kind: "select",
              id: "f4",
              label:
                "If the mill requires 95 % reliability (B5 life), approximately how does B5 compare to η?",
              options: [
                "B5 ≈ η (they are roughly equal)",
                "B5 is much shorter than η (perhaps 30–40 % of η)",
                "B5 is longer than η",
                "B5 cannot be determined from Weibull parameters",
              ],
              answer: 1,
            },
          ],
          hint: "At η, F(t) = 1 − e^(−1) ≈ 0.632 regardless of β. B5 life is always shorter than η because only 5 % have failed.",
        },
        {
          type: "links",
          items: [
            {
              label: "Abernethy — The New Weibull Handbook (reference)",
              url: "https://www.barringer1.com/wdbase.htm",
              source: "Barringer & Associates",
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    /*  LESSON 3 — PPAP and production part approval                      */
    /* ------------------------------------------------------------------ */
    {
      id: "aqe-m7-l3",
      number: 3,
      title: "PPAP and production part approval",
      minutes: 30,
      objectives: [
        "State the purpose of PPAP and when it is triggered",
        "List and describe the 18 PPAP elements",
        "Distinguish between the five PPAP submission levels",
        "Complete a Part Submission Warrant for a production part",
      ],
      blocks: [
        {
          type: "h",
          text: "What is PPAP?",
        },
        {
          type: "p",
          text: "The Production Part Approval Process (PPAP) is a standardised process defined by the Automotive Industry Action Group (AIAG) that demonstrates a supplier's manufacturing process can consistently produce parts meeting engineering specifications. Although originating in automotive, PPAP is now applied across industries wherever production part qualification is required.",
        },
        {
          type: "callout",
          tone: "key",
          title: "When is PPAP triggered?",
          text: "PPAP is required for new parts, engineering changes, tooling transfers, corrections to previous submissions, parts produced from new or modified tooling, production from a new supplier location, and parts produced after tooling has been inactive for more than 12 months.",
        },
        {
          type: "h",
          text: "The 18 PPAP elements",
        },
        {
          type: "table",
          head: ["#", "Element", "Purpose"],
          rows: [
            ["1", "Design records", "Complete product drawing or CAD data with all specifications"],
            ["2", "Engineering change documents", "Detailed description of any authorised changes"],
            ["3", "Customer engineering approval", "Evidence that the customer approved the design"],
            ["4", "Design FMEA (DFMEA)", "Risk analysis of the product design"],
            ["5", "Process flow diagram", "Sequence of all manufacturing and assembly steps"],
            ["6", "Process FMEA (PFMEA)", "Risk analysis of the manufacturing process"],
            ["7", "Control plan", "Methods for controlling process variation at each step"],
            ["8", "Measurement system analysis (MSA)", "Gage R&R and bias studies for inspection equipment"],
            ["9", "Dimensional results", "Measurements of all dimensions on the drawing"],
            ["10", "Material / performance test results", "Proof that materials and performance meet specification"],
            ["11", "Initial process studies", "Cpk/Ppk capability data from initial production run"],
            ["12", "Qualified laboratory documentation", "Proof that testing laboratories meet ISO/IEC 17025 or equivalent"],
            ["13", "Appearance approval report (AAR)", "Colour, texture, and appearance confirmation for visible parts"],
            ["14", "Sample production parts", "Physical samples from the production run"],
            ["15", "Master sample", "Retained reference sample approved by the customer"],
            ["16", "Checking aids", "Fixtures, gages, or templates used for production inspection"],
            ["17", "Customer-specific requirements", "Additional requirements beyond standard PPAP"],
            ["18", "Part Submission Warrant (PSW)", "Formal document summarising PPAP submission and declaring conformance"],
          ],
        },
        {
          type: "h",
          text: "PPAP submission levels",
        },
        {
          type: "table",
          head: ["Level", "What is submitted to customer", "Typical use"],
          rows: [
            ["1", "PSW and AAR (if applicable) only", "Low-risk parts, trusted supplier with established track record"],
            ["2", "PSW with product samples and limited data", "Standard submissions for familiar part families"],
            ["3", "PSW with product samples and complete supporting data", "Default level — most common for new parts and new suppliers"],
            ["4", "PSW and full requirements as defined by the customer", "Customer specifies exactly what is needed"],
            ["5", "PSW with product samples and complete data available for review at supplier site", "High-volume parts where shipping full data packages is impractical"],
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "PPAP in Cameroon automotive supply",
          text: "A rubber gasket manufacturer in Douala supplying brake system components to a European OEM was required to submit Level 3 PPAP. The quality team prepared all 18 elements, including Cpk data from an initial run of 300 parts. The submission was initially rejected because the MSA study showed a Gage R&R of 38 % — exceeding the 30 % maximum. After recalibrating the measurement fixture, the resubmission was approved.",
        },
        {
          type: "equip",
          title: "PPAP documentation tools",
          items: [
            {
              art: "ppap-package",
              name: "PPAP submission package",
              caption: "Standardised folder structure and document templates for assembling all 18 PPAP elements, including Part Submission Warrant (PSW), dimensional layout, and capability study templates.",
            },
            {
              art: "calibration-label",
              name: "Calibration label",
              caption: "Applied to all gages and measurement equipment referenced in PPAP element 8 (MSA) and element 16 (Checking aids) to confirm calibration currency.",
            },
          ],
        },
        {
          type: "h",
          text: "The Part Submission Warrant (PSW)",
        },
        {
          type: "p",
          text: "The PSW is the cover document for every PPAP submission. It identifies the part, material, engineering level, test results summary, and supplier declaration. The supplier's authorised representative signs the PSW to warrant that all PPAP requirements have been met and that the production process is capable.",
        },
        {
          type: "steps",
          title: "Key PSW sections",
          items: [
            "Part identification: part number, name, customer, drawing level, and engineering change level",
            "Reason for submission: new part, engineering change, tooling, supplier change, or other trigger",
            "Test results summary: dimensional, material, and performance test disposition (pass/fail)",
            "Declaration: supplier certifies the samples are representative of production and all PPAP requirements are satisfied",
            "Customer disposition: approved, interim approval (with conditions), or rejected",
          ],
        },
        {
          type: "check",
          id: "aqe-m7-ck3",
          question:
            "Which PPAP submission level requires the supplier to retain complete data at their site for customer review, with samples and PSW submitted?",
          options: ["Level 1", "Level 2", "Level 4", "Level 5"],
          answer: 3,
          explain:
            "Level 5 requires the PSW and product samples to be submitted, with all complete supporting documentation retained at the supplier's manufacturing site and available for customer review.",
        },
        {
          type: "form",
          id: "aqe-m7-lab3a",
          title: "PPAP submission level and required elements",
          task: "A Cameroon plastics supplier has been asked to provide PPAP for a dashboard ventilation trim piece. Determine the correct requirements.",
          fields: [
            {
              kind: "select",
              id: "f1",
              label:
                "This is a new part from a new supplier. Which submission level should be used as the default?",
              options: ["Level 1", "Level 2", "Level 3", "Level 5"],
              answer: 2,
            },
            {
              kind: "select",
              id: "f2",
              label:
                "The part is visible to the vehicle occupant. Which additional PPAP element is specifically required?",
              options: [
                "Element 3: Customer engineering approval",
                "Element 13: Appearance approval report (AAR)",
                "Element 17: Customer-specific requirements",
                "Element 12: Qualified laboratory documentation",
              ],
              answer: 1,
            },
            {
              kind: "select",
              id: "f3",
              label:
                "The supplier's dimensional inspection uses a custom fixture. Which PPAP element documents this?",
              options: [
                "Element 8: MSA",
                "Element 9: Dimensional results",
                "Element 16: Checking aids",
                "Element 14: Sample production parts",
              ],
              answer: 2,
            },
            {
              kind: "select",
              id: "f4",
              label:
                "The customer approved the PPAP but required the supplier to improve Cpk from 1.2 to 1.33 within 90 days. What disposition is this?",
              options: [
                "Approved",
                "Interim approval",
                "Rejected",
                "Conditional rejection",
              ],
              answer: 1,
            },
          ],
          hint: "Level 3 is the default for new parts. Visible parts require AAR. Interim approval permits shipment with conditions that must be met by a deadline.",
        },
        {
          type: "sorter",
          id: "aqe-m7-lab3b",
          title: "Classify PPAP elements",
          task: "Sort each item into the correct PPAP element category.",
          layout: "columns",
          buckets: [
            { label: "Design documentation" },
            { label: "Process documentation" },
            { label: "Test and measurement" },
            { label: "Physical evidence" },
          ],
          items: [
            {
              text: "Complete engineering drawing with GD&T",
              bucket: 0,
              explain: "Element 1: Design records",
            },
            {
              text: "DFMEA identifying potential design failure modes",
              bucket: 0,
              explain: "Element 4: Design FMEA is part of design documentation",
            },
            {
              text: "Control plan listing inspection methods at each station",
              bucket: 1,
              explain: "Element 7: Control plan documents process controls",
            },
            {
              text: "Process flow diagram from raw material to finished part",
              bucket: 1,
              explain: "Element 5: Process flow diagram",
            },
            {
              text: "Gage R&R study showing 18 % total variation",
              bucket: 2,
              explain: "Element 8: Measurement system analysis (MSA)",
            },
            {
              text: "Cpk = 1.45 from initial run of 300 parts",
              bucket: 2,
              explain: "Element 11: Initial process studies",
            },
            {
              text: "Retained reference sample signed off by customer",
              bucket: 3,
              explain: "Element 15: Master sample",
            },
            {
              text: "Custom go/no-go fixture for bore diameter",
              bucket: 3,
              explain: "Element 16: Checking aids",
            },
          ],
        },
        {
          type: "links",
          items: [
            {
              label: "AIAG PPAP Manual (4th edition overview)",
              url: "https://www.aiag.org/quality/automotive-core-tools/ppap",
              source: "AIAG",
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    /*  LESSON 4 — Supplier management and development                    */
    /* ------------------------------------------------------------------ */
    {
      id: "aqe-m7-l4",
      number: 4,
      title: "Supplier management and development",
      minutes: 25,
      objectives: [
        "Define criteria for supplier qualification and selection",
        "Conduct a supplier audit using a structured assessment checklist",
        "Build and interpret a supplier scorecard across quality, delivery, cost, and service dimensions",
        "Select the appropriate incoming inspection strategy based on supplier history",
      ],
      blocks: [
        {
          type: "h",
          text: "Supplier qualification and selection",
        },
        {
          type: "p",
          text: "Supplier qualification determines whether a potential supplier has the capability, capacity, and quality systems to consistently meet requirements. In Cameroon, where supply chains often span local, regional (CEMAC zone), and international sources, a structured qualification process prevents costly surprises during production.",
        },
        {
          type: "list",
          items: [
            "Quality management system: ISO 9001 certification or equivalent documented system",
            "Technical capability: equipment, tooling, and process capability for the required specifications",
            "Financial stability: ability to sustain operations and invest in capacity",
            "Delivery performance: logistics infrastructure, lead times, and proximity to production facility",
            "Regulatory compliance: adherence to local, regional, and export market regulations",
            "References and track record: prior performance with similar products or customers",
          ],
        },
        {
          type: "h",
          text: "Supplier audit and assessment",
        },
        {
          type: "p",
          text: "A supplier audit is a systematic examination of the supplier's quality system, processes, and facilities. Audits may be conducted before qualification (initial audit), periodically (surveillance audit), or in response to quality issues (for-cause audit).",
        },
        {
          type: "steps",
          title: "Supplier audit process",
          items: [
            "Define audit scope and prepare the checklist covering quality system, process control, inspection, calibration, training, and corrective action",
            "Notify the supplier and schedule the audit (except for unannounced audits triggered by quality issues)",
            "Conduct the on-site audit: interview personnel, review records, observe processes, and verify calibration status",
            "Score each checklist item (e.g., 0 = non-conforming, 1 = partially conforming, 2 = fully conforming) and identify findings",
            "Issue the audit report with findings, required corrective actions, and follow-up timeline",
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Supplier audit in the CEMAC zone",
          text: "When auditing a packaging materials supplier in neighbouring Equatorial Guinea, a Douala-based food company found that the supplier had no documented calibration programme for their film thickness gauge. The audit finding triggered a corrective action that included purchasing a certified gauge block set and training two operators. Re-audit three months later confirmed closure.",
        },
        {
          type: "h",
          text: "Supplier scorecards",
        },
        {
          type: "p",
          text: "Scorecards translate supplier performance into quantifiable metrics across four standard dimensions. They are typically updated monthly or quarterly and shared with suppliers to drive improvement.",
        },
        {
          type: "table",
          head: ["Dimension", "Metric", "Weight", "Scoring example"],
          rows: [
            ["Quality", "PPM defective, lot rejection rate, CAPA closure rate", "40 %", "< 500 PPM = 10 pts; 500–2 000 = 7; > 2 000 = 3"],
            ["Delivery", "On-time delivery %, lead time adherence", "30 %", "≥ 98 % OTD = 10; 95–97 % = 7; < 95 % = 3"],
            ["Cost", "Price competitiveness, cost reduction contributions", "15 %", "Competitive + cost-down ideas = 10; Competitive only = 7; Above market = 3"],
            ["Service", "Responsiveness, communication, technical support", "15 %", "< 24 hr response + proactive = 10; < 48 hr = 7; > 48 hr = 3"],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Weighted score calculation",
          text: "Total score = Σ(dimension weight × dimension score). A supplier scoring Quality = 7, Delivery = 10, Cost = 7, Service = 10 would get: (0.40 × 7) + (0.30 × 10) + (0.15 × 7) + (0.15 × 10) = 2.80 + 3.00 + 1.05 + 1.50 = 8.35 out of 10.",
        },
        {
          type: "h",
          text: "Incoming inspection strategies",
        },
        {
          type: "table",
          head: ["Strategy", "When used", "Inspection level"],
          rows: [
            ["Skip-lot", "Supplier has excellent quality history (10+ consecutive lots accepted)", "Inspect only every kth lot (e.g., every 5th)"],
            ["Reduced", "Supplier has good recent history (5+ lots accepted under normal)", "Smaller sample size than normal"],
            ["Normal", "Default starting point for all suppliers", "Standard sampling plan (e.g., AQL-based)"],
            ["Tightened", "Recent lot rejections (2 of 5 lots rejected under normal)", "Larger sample size; tighter acceptance criteria"],
          ],
        },
        {
          type: "p",
          text: "Switching rules between these levels follow ANSI/ASQ Z1.4 (ISO 2859-1). The quality engineer must document the switching criteria and maintain lot-by-lot records to justify the current inspection level for each supplier-part combination.",
        },
        {
          type: "equip",
          title: "Incoming inspection tools",
          items: [
            {
              art: "inspection-booth",
              name: "Inspection booth",
              caption: "Dedicated station for incoming material inspection with controlled lighting, reference samples, and documented sampling plans for each supplier-part combination.",
            },
            {
              art: "nc-tags",
              name: "Non-conformance tags",
              caption: "Red tags applied to rejected incoming lots. Tags reference the lot number, supplier, defect description, and disposition (return, sort, use-as-is with concession).",
            },
            {
              art: "quarantine-area",
              name: "Quarantine area",
              caption: "Physically segregated storage for incoming lots awaiting inspection results or held pending supplier corrective action. Prevents accidental use of unapproved material.",
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m7-ck4",
          question:
            "A supplier has had 2 lots rejected out of the last 5 lots received under normal inspection. What action should the quality engineer take?",
          options: [
            "Switch to skip-lot inspection",
            "Maintain normal inspection",
            "Switch to tightened inspection",
            "Disqualify the supplier immediately",
          ],
          answer: 2,
          explain:
            "Under ANSI/ASQ Z1.4 switching rules, 2 rejections in 5 consecutive lots under normal inspection triggers a switch to tightened inspection. The supplier is not disqualified but must demonstrate improvement to return to normal.",
        },
        {
          type: "sheet",
          id: "aqe-m7-lab4a",
          title: "Build a supplier scorecard",
          task: "Three suppliers provide aluminium extrusions to a Douala window frame manufacturer. Calculate the weighted total score for each supplier. Weights: Quality 40 %, Delivery 30 %, Cost 15 %, Service 15 %. Enter the weighted total for each supplier and determine the best-performing supplier.",
          data: [
            ["Supplier", "Quality (10)", "Delivery (10)", "Cost (10)", "Service (10)", "Weighted total"],
            ["Alu-Cam Sarl", 8, 9, 7, 6, null],
            ["ExtruPro Douala", 6, 7, 9, 8, null],
            ["MetalWorks Kribi", 9, 6, 6, 9, null],
          ],
          editable: ["F2", "F3", "F4"],
          checks: [
            { cell: "F2", equals: 7.85, tol: 0.05 },
            { cell: "F3", equals: 7.05, tol: 0.05 },
            { cell: "F4", equals: 7.35, tol: 0.05 },
          ],
          hint: "Weighted total = (0.40 × Quality) + (0.30 × Delivery) + (0.15 × Cost) + (0.15 × Service). Alu-Cam: (0.40 × 8) + (0.30 × 9) + (0.15 × 7) + (0.15 × 6).",
          solution: {
            F2: "7.85 → (3.20 + 2.70 + 1.05 + 0.90) — Alu-Cam is the best overall supplier",
            F3: "7.05 → (2.40 + 2.10 + 1.35 + 1.20)",
            F4: "7.35 → (3.60 + 1.80 + 0.90 + 1.35)",
          },
        },
        {
          type: "form",
          id: "aqe-m7-lab4b",
          title: "Evaluate supplier performance",
          task: "Review the following supplier scenarios and determine the appropriate action.",
          fields: [
            {
              kind: "select",
              id: "f1",
              label:
                "Supplier A has delivered 12 consecutive lots with zero defects under normal inspection. What incoming inspection change is appropriate?",
              options: [
                "Switch to tightened inspection",
                "Maintain normal inspection",
                "Switch to reduced inspection",
                "Switch to skip-lot inspection",
              ],
              answer: 3,
            },
            {
              kind: "select",
              id: "f2",
              label:
                "Supplier B scored 4.2 / 10 on the quality dimension for three consecutive quarters. What is the priority action?",
              options: [
                "Reduce the quality weight in the scorecard",
                "Initiate a supplier development programme with specific quality targets",
                "Switch to a different scoring methodology",
                "Accept the risk and continue ordering",
              ],
              answer: 1,
            },
            {
              kind: "select",
              id: "f3",
              label:
                "During a surveillance audit, you discover the supplier changed their heat treatment oven without notifying you. What is required?",
              options: [
                "No action — equipment changes are internal supplier matters",
                "Request updated PPAP submission because of the process change",
                "Increase the order quantity to test the new oven",
                "Reduce the scorecard delivery score",
              ],
              answer: 1,
            },
          ],
          hint: "10+ consecutive accepted lots under normal can move to skip-lot. Process equipment changes trigger PPAP resubmission.",
        },
        {
          type: "links",
          items: [
            {
              label: "ISO 2859-1 Sampling procedures for inspection by attributes",
              url: "https://www.iso.org/standard/1141.html",
              source: "ISO",
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    /*  LESSON 5 — CAPA: corrective and preventive action                 */
    /* ------------------------------------------------------------------ */
    {
      id: "aqe-m7-l5",
      title: "CAPA: corrective and preventive action",
      minutes: 25,
      objectives: [
        "Describe the five stages of the CAPA process",
        "Apply the 8D problem-solving methodology to a supplier quality issue",
        "Distinguish between containment, corrective, and preventive actions",
        "Design an effectiveness verification plan for a corrective action",
      ],
      blocks: [
        {
          type: "h",
          text: "The CAPA process",
        },
        {
          type: "p",
          text: "Corrective and Preventive Action (CAPA) is a systematic approach to investigating, correcting, and preventing quality problems. CAPA is required by ISO 9001, IATF 16949, and virtually every regulated quality system. The goal is not just to fix the immediate problem but to eliminate the root cause and prevent recurrence.",
        },
        {
          type: "steps",
          title: "CAPA stages",
          items: [
            "Identify: detect and document the nonconformance or quality issue. Sources include customer complaints, audit findings, process monitoring, and incoming inspection rejections.",
            "Investigate: gather data, review process history, and analyse the problem. Determine the scope and impact — how many parts, lots, or customers are affected.",
            "Root cause analysis: use structured methods (5 Whys, fishbone diagram, fault tree) to identify the fundamental cause, not just the symptom.",
            "Implement: design and execute the corrective or preventive action. Assign responsibility, define timeline, and document the changes.",
            "Verify effectiveness: monitor the process after implementation to confirm the root cause has been eliminated. Track for recurrence over a defined period (typically 3–6 months).",
          ],
        },
        {
          type: "h",
          text: "Containment vs corrective vs preventive action",
        },
        {
          type: "table",
          head: ["Action type", "Purpose", "Timing", "Example"],
          rows: [
            [
              "Containment",
              "Stop the immediate impact — prevent defective product from reaching the customer",
              "Hours to days",
              "100 % sort and inspect all warehouse stock of the affected lot; quarantine suspect material",
            ],
            [
              "Corrective",
              "Eliminate the root cause of the existing nonconformance",
              "Days to weeks",
              "Replace worn die insert that caused dimensional out-of-spec; retrain operators on setup procedure",
            ],
            [
              "Preventive",
              "Eliminate potential causes of nonconformances that have not yet occurred",
              "Weeks to months",
              "Add die wear monitoring to the preventive maintenance schedule; update PFMEA with new failure mode",
            ],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Common CAPA mistake",
          text: "Treating containment as corrective action is the most frequent CAPA failure. Sorting 100 % of a lot stops the bleeding but does nothing to prevent the next lot from having the same defect. Always ask: 'Will this action prevent recurrence?' If not, it is containment only.",
        },
        {
          type: "h",
          text: "8D problem-solving methodology",
        },
        {
          type: "p",
          text: "The 8D (Eight Disciplines) method provides a structured framework for team-based problem solving, widely used in automotive and manufacturing supply chains. Each discipline builds on the previous one.",
        },
        {
          type: "table",
          head: ["D#", "Discipline", "Key activity"],
          rows: [
            ["D0", "Prepare", "Recognise the problem and determine if 8D is warranted; gather initial data"],
            ["D1", "Establish the team", "Assign a cross-functional team with process knowledge and authority"],
            ["D2", "Describe the problem", "Use IS/IS NOT analysis to precisely define what, where, when, and how big"],
            ["D3", "Interim containment actions (ICA)", "Implement temporary measures to protect the customer while root cause is found"],
            ["D4", "Root cause analysis", "Identify and verify all root causes using 5 Whys, fishbone, or fault tree"],
            ["D5", "Permanent corrective actions (PCA)", "Select and verify actions that eliminate the root cause"],
            ["D6", "Implement and validate PCA", "Execute the permanent fix and confirm it works in production"],
            ["D7", "Prevent recurrence", "Update systems (FMEA, control plan, work instructions) to prevent similar problems"],
            ["D8", "Congratulate the team", "Recognise team contributions and share lessons learnt"],
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "8D at a Yaoundé electronics assembler",
          text: "A contract electronics manufacturer in Yaoundé received a customer complaint about solder joint failures. D1 assembled a team of process engineer, quality technician, and the solder paste supplier. D4 identified the root cause as expired solder paste (3 months past shelf life) combined with oven temperature 8 °C below specification. D5 corrective actions included implementing FIFO labelling for solder paste and adding oven temperature verification to the startup checklist. D7 updated the PFMEA and control plan.",
        },
        {
          type: "equip",
          title: "CAPA documentation tools",
          items: [
            {
              art: "a3-report",
              name: "A3 report",
              caption: "Single-page structured problem-solving report (Toyota format) used to document the CAPA process from problem identification through root cause analysis to verification. Fits on A3 paper for visual management boards.",
            },
            {
              art: "pfmea-worksheet",
              name: "PFMEA worksheet",
              caption: "Process FMEA template updated as part of D7 (prevent recurrence). New failure modes discovered during CAPA are added with revised severity, occurrence, and detection ratings.",
            },
            {
              art: "control-plan-form",
              name: "Control plan form",
              caption: "Updated alongside PFMEA when CAPA introduces new process controls, inspection methods, or reaction plans.",
            },
          ],
        },
        {
          type: "h",
          text: "Linking CAPA to FMEA updates",
        },
        {
          type: "p",
          text: "Every completed CAPA should trigger a review of the relevant FMEA. If the failure mode was not previously listed, add it. If it was listed but with an underestimated occurrence rating, revise upward. If the corrective action introduces a new detection method, update the detection rating. This feedback loop keeps the FMEA as a living document.",
        },
        {
          type: "h",
          text: "Effectiveness verification",
        },
        {
          type: "list",
          items: [
            "Define measurable success criteria before implementing the corrective action",
            "Establish a monitoring period (typically 3–6 months or a defined number of production lots)",
            "Track the specific metric that triggered the CAPA (e.g., defect rate, PPM, dimensional Cpk)",
            "If the metric returns to acceptable levels with no recurrence, close the CAPA",
            "If recurrence is detected, re-open the CAPA and revisit root cause analysis — the original root cause was likely incorrect or incomplete",
          ],
        },
        {
          type: "check",
          id: "aqe-m7-ck5",
          question:
            "In the 8D methodology, at which discipline are interim containment actions implemented?",
          options: ["D1", "D3", "D5", "D7"],
          answer: 1,
          explain:
            "D3 is Interim Containment Actions (ICA) — temporary measures to protect the customer while the team works on root cause analysis (D4) and permanent corrective actions (D5).",
        },
        {
          type: "whys",
          id: "aqe-m7-lab5a",
          title: "5 Whys analysis for a supplier quality issue",
          task: "A Cameroon beverage company received a shipment of bottle caps from a local supplier. During filling, 12 % of caps failed to seal properly, causing product leakage on the bottling line. Use 5 Whys to find the root cause.",
          problem:
            "12 % of bottle caps from the supplier fail to seal, causing leakage on the bottling line",
          steps: [
            {
              question:
                "Why are the bottle caps failing to seal?",
              options: [
                "The cap liner material is too thin",
                "The cap thread dimensions are out of specification",
                "The bottling machine is applying too much torque",
                "The bottles are a different size than specified",
              ],
              answer: 1,
              explain:
                "Dimensional inspection confirmed the cap thread outer diameter was 0.3 mm undersize, preventing proper engagement with the bottle neck.",
            },
            {
              question:
                "Why are the cap thread dimensions out of specification?",
              options: [
                "The injection mould cavity has excessive wear",
                "The raw material shrinkage rate changed",
                "The operator selected the wrong mould",
                "The specification was updated but the supplier was not notified",
              ],
              answer: 0,
              explain:
                "Inspection of the mould showed cavity wear of 0.25 mm beyond the maintenance limit, directly causing the undersize threads.",
            },
            {
              question:
                "Why does the injection mould cavity have excessive wear?",
              options: [
                "The mould was not replaced at the scheduled interval",
                "The glass-filled resin is more abrasive than standard PP",
                "The mould steel grade is too soft for production volume",
                "All of the above contribute",
              ],
              answer: 0,
              explain:
                "Maintenance records showed the mould had exceeded its scheduled replacement interval by 40 000 shots. The schedule called for replacement at 200 000 shots, but the mould was at 240 000 shots.",
            },
            {
              question:
                "Why was the mould not replaced at the scheduled interval?",
              options: [
                "The replacement mould was on back-order from the toolmaker",
                "There is no mould shot counter installed on the machine",
                "The maintenance team forgot to check the schedule",
                "Management deferred the replacement to reduce costs",
              ],
              answer: 1,
              explain:
                "The injection moulding machine had no automatic shot counter. Mould life tracking relied on manual logbook entries, which were incomplete and 3 weeks out of date.",
            },
            {
              question:
                "Why is there no automatic shot counter on the moulding machine?",
              options: [
                "Shot counters are not available for this machine model",
                "The supplier's capital expenditure budget did not include this upgrade",
                "The previous quality system did not require mould life tracking",
                "The machine is too old to be retrofitted",
              ],
              answer: 2,
              explain:
                "The supplier's quality system had no procedure requiring mould life tracking or automatic shot counting. This is the root cause — a system gap that allowed the mould to exceed its life without detection.",
            },
          ],
          countermeasure: {
            question:
              "Based on the root cause, which countermeasure is most effective?",
            options: [
              "Replace the worn mould immediately",
              "Install shot counters on all moulding machines and add mould life tracking to the quality system procedures",
              "Switch to a harder mould steel grade",
              "Increase incoming inspection of caps to 100 %",
            ],
            answer: 1,
            explain:
              "Installing shot counters and formalising mould life tracking in the quality system addresses the root cause (system gap). Replacing the mould alone is containment — it fixes the current problem but does not prevent recurrence on other moulds.",
          },
        },
        {
          type: "sorter",
          id: "aqe-m7-lab5b",
          title: "Classify actions as containment, corrective, or preventive",
          task: "A batch of steel brackets supplied to a Douala construction company was found to have incorrect hole spacing. Classify each response action.",
          layout: "steps",
          buckets: [
            { label: "Containment" },
            { label: "Corrective action" },
            { label: "Preventive action" },
          ],
          items: [
            {
              text: "Quarantine all remaining brackets from the affected lot in the warehouse",
              bucket: 0,
              explain:
                "Quarantine stops defective product from reaching the construction site — this is immediate containment.",
            },
            {
              text: "Sort 100 % of the quarantined lot and segregate non-conforming brackets",
              bucket: 0,
              explain:
                "Sorting identifies which specific brackets are defective — still a containment activity to protect the customer.",
            },
            {
              text: "Replace the worn drill jig that caused the incorrect hole spacing",
              bucket: 1,
              explain:
                "Replacing the worn jig eliminates the identified root cause of the current problem — this is corrective action.",
            },
            {
              text: "Retrain the CNC operator on the correct setup and verification procedure",
              bucket: 1,
              explain:
                "Retraining addresses the human factor root cause that contributed to the defect — corrective action.",
            },
            {
              text: "Add drill jig wear checks to the weekly preventive maintenance schedule for all similar jigs",
              bucket: 2,
              explain:
                "Extending the check to all similar jigs prevents the same failure mode from occurring elsewhere — preventive action.",
            },
            {
              text: "Update the PFMEA to include drill jig wear as a failure mode with a detection control",
              bucket: 2,
              explain:
                "Updating the FMEA captures the lesson learnt and ensures future risk assessments account for this failure mode — preventive action.",
            },
          ],
        },
        {
          type: "links",
          items: [
            {
              label: "CQI-20: Effective Problem Solving Guide",
              url: "https://www.aiag.org/quality/cqi",
              source: "AIAG",
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    /*  PRACTICE LESSON                                                   */
    /* ------------------------------------------------------------------ */
    {
      id: "aqe-m7-practice",
      number: 6,
      title: "Practice: Reliability and supplier quality",
      minutes: 30,
      objectives: [
        "Calculate reliability metrics including MTBF, availability and Weibull parameters for fielded products",
        "Evaluate PPAP submission packages and determine supplier approval status",
        "Design and execute corrective action plans using 8D and CAPA methodologies",
      ],
      blocks: [
        {
          type: "p",
          text: "This practice session brings together reliability engineering, PPAP, supplier management, and CAPA skills. Work through all four labs, progressing from foundational concepts to complex problem solving.",
        },
        /* --- Beginner: form --- */
        {
          type: "form",
          id: "aqe-m7-prac1",
          level: "beginner",
          title: "Match reliability terms to definitions",
          task: "Select the correct definition for each reliability and supplier quality term.",
          fields: [
            {
              kind: "select",
              id: "f1",
              label: "MTBF",
              options: [
                "Average time to first failure for non-repairable items",
                "Average operating time between successive failures for repairable systems",
                "Average time required to restore a failed system",
                "The probability of surviving to a specified time",
              ],
              answer: 1,
            },
            {
              kind: "select",
              id: "f2",
              label: "Bathtub curve — useful life region",
              options: [
                "Decreasing failure rate due to manufacturing defects",
                "Increasing failure rate due to wear and fatigue",
                "Approximately constant failure rate — random failures",
                "Zero failure rate under ideal conditions",
              ],
              answer: 2,
            },
            {
              kind: "select",
              id: "f3",
              label: "Characteristic life (η) in Weibull analysis",
              options: [
                "The time at which 10 % of units have failed",
                "The time at which 50 % of units have failed",
                "The time at which 63.2 % of units have failed",
                "The time at which 90 % of units have failed",
              ],
              answer: 2,
            },
            {
              kind: "select",
              id: "f4",
              label: "Part Submission Warrant (PSW)",
              options: [
                "A statistical process capability report",
                "A formal cover document summarising PPAP submission and declaring conformance",
                "A supplier scorecard used for annual evaluation",
                "A corrective action report issued after a customer complaint",
              ],
              answer: 1,
            },
            {
              kind: "select",
              id: "f5",
              label: "Containment action",
              options: [
                "An action that eliminates the root cause of a nonconformance",
                "An action that prevents potential future nonconformances",
                "An immediate action to stop defective product from reaching the customer",
                "A long-term system improvement added to the FMEA",
              ],
              answer: 2,
            },
          ],
          hint: "MTBF is for repairable systems; MTTF is for non-repairable. Containment protects the customer immediately but does not address root cause.",
        },

        /* --- Intermediate: sheet --- */
        {
          type: "sheet",
          id: "aqe-m7-prac2",
          level: "intermediate",
          title: "Calculate system reliability and MTBF",
          task: "A cocoa processing line in Kumba has four stages in series. Calculate the system reliability for the series configuration in E2. Then calculate the system MTBF in E3 (use λ_sys = 1 − R_sys for a one-hour mission, then MTBF = 1/λ_sys). Finally, if a parallel redundant unit (R = 0.91) is added to the dryer, calculate the new system reliability in E4.",
          data: [
            ["Stage", "Reliability (1 hr)", "Failure rate λ", "MTBF (hrs)", "System calculations"],
            ["Fermentation monitor", 0.98, 0.0202, 49.5, null],
            ["Dryer", 0.91, 0.0943, 10.6, null],
            ["Roaster", 0.95, 0.0513, 19.5, null],
            ["Grinder", 0.97, 0.0305, 32.8, null],
          ],
          editable: ["E2", "E3", "E4"],
          checks: [
            { cell: "E2", equals: 0.8218, tol: 0.005 },
            { cell: "E3", equals: 5.61, tol: 0.15 },
            { cell: "E4", equals: 0.9067, tol: 0.005 },
          ],
          hint: "Series R = 0.98 × 0.91 × 0.95 × 0.97. For MTBF: λ_sys = sum of individual λ values = 0.0202 + 0.0943 + 0.0513 + 0.0305, then MTBF = 1/λ_sys. Parallel dryer: R_dryer_par = 1 − (1 − 0.91)² = 0.9919, then multiply all series.",
          solution: {
            E2: "0.8218 → 0.98 × 0.91 × 0.95 × 0.97",
            E3: "5.61 hrs → 1 / (0.0202 + 0.0943 + 0.0513 + 0.0305) = 1 / 0.1963",
            E4: "0.9067 → 0.98 × 0.9919 × 0.95 × 0.97",
          },
        },

        /* --- Advanced: form --- */
        {
          type: "form",
          id: "aqe-m7-prac3",
          level: "advanced",
          title: "Complete PPAP documentation requirements",
          task: "A Douala supplier is submitting PPAP for a newly designed aluminium heat sink used in an automotive LED headlamp assembly. Determine the correct documentation requirements.",
          fields: [
            {
              kind: "select",
              id: "f1",
              label:
                "This is a brand new part design. The customer has requested comprehensive documentation. Which PPAP level is appropriate?",
              options: ["Level 1", "Level 2", "Level 3", "Level 5"],
              answer: 2,
            },
            {
              kind: "select",
              id: "f2",
              label:
                "The heat sink's thermal conductivity must meet a minimum of 180 W/m·K. Which PPAP element specifically documents this?",
              options: [
                "Element 9: Dimensional results",
                "Element 10: Material / performance test results",
                "Element 11: Initial process studies",
                "Element 14: Sample production parts",
              ],
              answer: 1,
            },
            {
              kind: "select",
              id: "f3",
              label:
                "The initial process study shows Cpk = 1.15 for the critical mounting hole position. What is the expected customer response?",
              options: [
                "Approved — Cpk > 1.0 is acceptable",
                "Interim approval — Cpk is below the typical 1.33 minimum with a required improvement plan",
                "Rejected — Cpk must be at least 2.0 for automotive",
                "Not applicable — Cpk is not part of PPAP",
              ],
              answer: 1,
            },
            {
              kind: "select",
              id: "f4",
              label:
                "The supplier uses an outside laboratory for salt spray corrosion testing. Which PPAP element must confirm the laboratory's qualifications?",
              options: [
                "Element 8: Measurement system analysis",
                "Element 10: Material / performance test results",
                "Element 12: Qualified laboratory documentation",
                "Element 17: Customer-specific requirements",
              ],
              answer: 2,
            },
            {
              kind: "select",
              id: "f5",
              label:
                "After PPAP approval, the supplier changes the CNC machine used for machining the heat sink fins. What is required?",
              options: [
                "No action — machine changes are internal matters",
                "Notify the customer informally by email",
                "Submit a new PPAP because production equipment has changed",
                "Only update the control plan internally",
              ],
              answer: 2,
            },
          ],
          hint: "Performance specifications (thermal conductivity) are element 10. Cpk below 1.33 typically receives interim approval. Equipment changes trigger PPAP resubmission.",
        },

        /* --- Expert: whys --- */
        {
          type: "whys",
          id: "aqe-m7-prac4",
          level: "expert",
          title: "5 Whys root cause analysis for complex supplier failure",
          task: "A Cameroon pharmaceutical packaging company discovered that 3 of the last 5 blister foil shipments from their aluminium foil supplier failed the heat-seal bond strength test. Each failure resulted in a full lot quarantine and production delays averaging 4 days. Trace the root cause.",
          problem:
            "3 of 5 blister foil lots failed heat-seal bond strength test, causing production quarantine and 4-day delays",
          steps: [
            {
              question:
                "Why are the blister foil lots failing the heat-seal bond strength test?",
              options: [
                "The heat-seal lacquer coating thickness is inconsistent across the foil width",
                "The pharmaceutical company's sealing machine temperature is too low",
                "The foil gauge thickness is out of specification",
                "The test method has changed and is now more stringent",
              ],
              answer: 0,
              explain:
                "Cross-web coating thickness measurements showed variation from 4.2 to 7.8 g/m² against a specification of 5.5 ± 0.8 g/m². The thin areas (< 4.7 g/m²) failed bond strength testing.",
            },
            {
              question:
                "Why is the heat-seal lacquer coating thickness inconsistent across the foil width?",
              options: [
                "The coating roller has developed uneven wear patterns",
                "The lacquer viscosity is varying between batches",
                "The foil tension during coating is fluctuating",
                "The drying oven temperature is too high, causing uneven curing",
              ],
              answer: 0,
              explain:
                "Physical inspection of the coating roller revealed wear grooves in two areas, creating low-transfer zones that produced thin coating bands.",
            },
            {
              question:
                "Why has the coating roller developed uneven wear patterns?",
              options: [
                "The roller exceeded its service life without reconditioning",
                "Abrasive contaminants in the lacquer accelerated localised wear",
                "The roller material specification was changed to save cost",
                "The roller was damaged during installation after last reconditioning",
              ],
              answer: 0,
              explain:
                "Maintenance records showed the roller had run 2.8 million metres against a reconditioning interval of 2.0 million metres — 40 % over the service limit.",
            },
            {
              question:
                "Why did the roller exceed its service life without reconditioning?",
              options: [
                "The maintenance schedule exists but compliance is not tracked or enforced",
                "Spare rollers were unavailable due to import delays",
                "Production pressures overrode the maintenance team's reconditioning request",
                "The maintenance team was unaware of the reconditioning interval",
              ],
              answer: 0,
              explain:
                "The supplier's maintenance system had a documented schedule, but no mechanism to flag overdue tasks or block production when critical maintenance was past due. Compliance tracking was manual and had lapsed.",
            },
          ],
          countermeasure: {
            question:
              "Which combination of actions best addresses the root cause and prevents recurrence?",
            options: [
              "Recondition the roller and increase incoming inspection of foil at the pharmaceutical company",
              "Recondition the roller and implement a computerised maintenance management system (CMMS) with automatic alerts and production interlocks for overdue critical maintenance",
              "Switch to a different foil supplier with better maintenance practices",
              "Accept the variation and widen the coating thickness specification",
            ],
            answer: 1,
            explain:
              "Reconditioning the roller addresses the immediate cause, and implementing a CMMS with automated tracking and interlocks addresses the root cause — the lack of maintenance compliance enforcement. Incoming inspection alone is containment, not prevention.",
          },
        },
      ],
    },
  ],

  /* -------------------------------------------------------------------- */
  /*  QUIZ                                                                */
  /* -------------------------------------------------------------------- */
  quiz: {
    id: "aqe-m7-quiz",
    title: "Module 7 Quiz: Reliability Engineering and Supplier Quality",
    passPct: 75,
    questions: [
      {
        id: "aqe-m7-q1",
        question: "A system has three components in series with reliabilities of 0.96, 0.93, and 0.98. What is the system reliability?",
        options: [
          "0.874",
          "0.957",
          "0.990",
          "0.870",
        ],
        answer: 0,
        explain:
          "Series reliability = 0.96 × 0.93 × 0.98 = 0.8742, which rounds to 0.874.",
      },
      {
        id: "aqe-m7-q2",
        question: "In the bathtub curve, which region is characterised by a decreasing failure rate?",
        options: [
          "Useful life period",
          "Wear-out period",
          "Infant mortality period",
          "Steady-state period",
        ],
        answer: 2,
        explain:
          "Infant mortality is the early-life region where failure rate decreases as weak units are screened out through burn-in or early use.",
      },
      {
        id: "aqe-m7-q3",
        question: "A Weibull analysis yields β = 2.8 and η = 5 000 hours. What is the approximate B10 life?",
        options: [
          "500 hours",
          "1 850 hours",
          "3 160 hours",
          "4 500 hours",
        ],
        answer: 1,
        explain:
          "B10 = η × (−ln 0.90)^(1/β) = 5 000 × (0.10536)^(1/2.8) = 5 000 × (0.10536)^(0.357) ≈ 5 000 × 0.370 ≈ 1 850 hours.",
      },
      {
        id: "aqe-m7-q4",
        question: "Which PPAP element documents the statistical capability of the manufacturing process?",
        options: [
          "Element 7: Control plan",
          "Element 9: Dimensional results",
          "Element 11: Initial process studies",
          "Element 8: Measurement system analysis",
        ],
        answer: 2,
        explain:
          "Element 11 (Initial process studies) presents Cpk and Ppk data from initial production runs to demonstrate process capability.",
      },
      {
        id: "aqe-m7-q5",
        question: "A supplier has delivered 12 consecutive lots accepted under normal inspection. According to standard switching rules, the buyer may now move to:",
        options: [
          "Tightened inspection",
          "Reduced inspection only",
          "Skip-lot inspection",
          "No inspection required",
        ],
        answer: 2,
        explain:
          "With 10+ consecutive accepted lots under normal inspection, the buyer may move to skip-lot inspection, inspecting only every kth lot.",
      },
      {
        id: "aqe-m7-q6",
        question: "In the 8D methodology, which discipline specifically addresses preventing recurrence by updating system documents like FMEAs and control plans?",
        options: [
          "D3: Interim containment actions",
          "D5: Permanent corrective actions",
          "D6: Implement and validate PCA",
          "D7: Prevent recurrence",
        ],
        answer: 3,
        explain:
          "D7 focuses on preventing recurrence by updating management systems — FMEAs, control plans, work instructions, and training — to institutionalise the lessons learnt.",
      },
      {
        id: "aqe-m7-q7",
        question: "What is the default PPAP submission level for a new part from a new supplier?",
        options: [
          "Level 1",
          "Level 2",
          "Level 3",
          "Level 5",
        ],
        answer: 2,
        explain:
          "Level 3 is the default submission level requiring PSW, product samples, and complete supporting documentation.",
      },
      {
        id: "aqe-m7-q8",
        question: "A quality engineer sorts 100 % of a quarantined lot to separate conforming from non-conforming parts. This action is best classified as:",
        options: [
          "Preventive action",
          "Corrective action",
          "Containment action",
          "Root cause analysis",
        ],
        answer: 2,
        explain:
          "100 % sorting of a quarantined lot is containment — it protects the customer from receiving defective product but does not address the root cause that created the defects.",
      },
    ],
  },
};
