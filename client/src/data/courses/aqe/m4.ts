import type { CourseModule } from "../../../lms/types";

// Associate Quality Engineer — Module 4: Statistical Process Control and Process Capability.
// Original Analytix Engineering material. All companies, people and figures are fictional.
// British spelling throughout; Cameroon industrial context.

/* ── Realistic SPC data sets ──────────────────────────────────────────────────
   Generated with a seeded PRNG so every value is deterministic and reproducible.
   Each data set is annotated with its purpose and any injected out-of-control points.
*/

// Lesson 1 — X̄-R chart: aluminium extrusion width (mm), target 40.00 mm, 20 subgroups of 5.
// Subgroup 14 has been shifted up (tool clamp loosened) to create one out-of-control signal.
const EXTRUSION: number[][] = [
  [40.02, 39.98, 40.01, 39.97, 40.03],
  [39.99, 40.04, 40.00, 40.02, 39.96],
  [40.01, 39.95, 40.03, 40.00, 39.98],
  [39.97, 40.02, 39.99, 40.01, 40.04],
  [40.03, 40.00, 39.96, 39.98, 40.01],
  [40.00, 39.97, 40.02, 40.04, 39.99],
  [39.98, 40.01, 40.03, 39.96, 40.00],
  [40.02, 39.99, 39.97, 40.01, 40.03],
  [40.04, 40.00, 39.98, 39.96, 40.02],
  [39.99, 40.03, 40.01, 39.97, 39.98],
  [40.01, 39.98, 40.00, 40.02, 39.96],
  [39.97, 40.04, 39.99, 40.01, 40.00],
  [40.00, 39.96, 40.02, 39.98, 40.03],
  [40.12, 40.09, 40.14, 40.11, 40.08],  // subgroup 14: shift — clamp loosened
  [40.01, 39.99, 40.03, 39.97, 40.00],
  [39.98, 40.02, 40.00, 39.96, 40.01],
  [40.03, 39.97, 39.99, 40.01, 40.04],
  [40.00, 40.02, 39.98, 40.03, 39.96],
  [39.96, 40.01, 40.00, 39.99, 40.02],
  [40.02, 39.98, 40.01, 40.00, 39.97],
];

// Lesson 1 — I-MR chart: tensile strength of rebar (MPa), one test per batch, 20 batches.
// Batch 16 is abnormally high (wrong alloy charge).
const REBAR: number[] = [
  485, 492, 488, 491, 487, 493, 490, 486, 494, 489,
  491, 487, 493, 488, 490, 518, 486, 492, 489, 491,
];

// Lesson 2 — p chart: nonconforming PVC pipes per sample of 150 from Plastiques de Douala.
// Sample 11 has a spike (raw material contamination).
const PIPES_DEF: number[] = [
  5, 7, 4, 6, 8, 3, 5, 7, 6, 4,
  19, 5, 6, 7, 3, 5, 8, 6, 4, 7,
];
const PIPES_N = 150;

// Lesson 2 — c chart: surface defects per sheet of plywood at Scieries du Moungo.
// Sheet 8 has a high count (moisture in veneer stack).
const PLYWOOD: number[] = [
  3, 5, 2, 4, 6, 3, 4, 14, 5, 3,
  2, 4, 5, 3, 6, 4, 2, 5, 3, 4,
];

// Practice — I-MR: pH of treated water at a Douala brewery, one reading per hour, 20 hours.
const WATER_PH: number[] = [
  7.02, 6.98, 7.01, 6.97, 7.03, 7.00, 6.99, 7.04, 6.96, 7.01,
  6.98, 7.02, 7.00, 6.97, 7.03, 6.99, 7.01, 6.98, 7.00, 7.02,
];

// Practice — X̄-R with out-of-control: cocoa butter content (%), 18 subgroups of 5.
// Subgroup 7 is shifted (fermentation batch error); subgroup 15 has high range.
const COCOA: number[][] = [
  [54.2, 53.8, 54.0, 53.9, 54.1],
  [53.7, 54.1, 53.9, 54.0, 53.8],
  [54.0, 53.6, 54.2, 53.8, 54.1],
  [53.9, 54.0, 53.7, 54.1, 53.8],
  [54.1, 53.9, 54.0, 53.8, 53.7],
  [53.8, 54.2, 53.9, 54.1, 54.0],
  [55.1, 55.3, 55.0, 55.4, 55.2],  // subgroup 7: fermentation error
  [54.0, 53.8, 54.1, 53.9, 53.7],
  [53.9, 54.0, 53.8, 54.2, 54.1],
  [54.1, 53.7, 54.0, 53.9, 53.8],
  [53.8, 54.1, 53.9, 54.0, 54.2],
  [54.0, 53.9, 53.7, 54.1, 53.8],
  [53.9, 54.2, 54.0, 53.8, 54.1],
  [54.1, 53.8, 53.9, 54.0, 53.7],
  [52.8, 55.1, 53.2, 54.9, 53.5],  // subgroup 15: high range (mixing problem)
  [54.0, 53.9, 54.1, 53.8, 54.2],
  [53.8, 54.0, 53.9, 54.1, 53.7],
  [54.1, 53.9, 54.0, 53.8, 54.2],
];

// Practice — p chart with variable thinking: bottle cap seal failures, sample of 200.
// Sample 12 spike (new seal liner supplier).
const CAPS_DEF: number[] = [
  6, 8, 5, 7, 9, 4, 6, 8, 7, 5,
  3, 18, 6, 7, 5, 8, 4, 6, 7, 5,
];
const CAPS_N = 200;

export const m4: CourseModule = {
  id: "aqe-m4",
  number: 4,
  title: "Statistical Process Control and Process Capability",
  summary:
    "This module covers the theory and practice of statistical process control as applied in Cameroonian manufacturing. You will construct and interpret variables control charts (X-bar/R, X-bar/S and I-MR) and attribute control charts (p, np, c and u), apply Western Electric and Nelson rules to detect special causes, and calculate process capability and performance indices (Cp, Cpk, Pp, Ppk). The module closes with advanced SPC topics including pre-control, short-run SPC and using control charts to drive process improvement.",
  hours: 18,
  lessons: [
    // ───────────────────────────── LESSON 1 ─────────────────────────────
    {
      id: "aqe-m4-l1",
      title: "Variables control charts: X̄-R and I-MR",
      minutes: 35,
      objectives: [
        "Form rational subgroups that capture within-subgroup and between-subgroup variation",
        "Construct an X̄-R chart from subgroup data using A₂, D₃ and D₄ constants",
        "Construct an I-MR chart for individual measurements using the E₂ constant",
        "Plot data on control charts and identify points beyond the control limits",
      ],
      blocks: [
        { type: "p", text: "A control chart is a time-ordered plot of a quality characteristic with a centre line (CL) and two control limits: upper (UCL) and lower (LCL). The limits are calculated from the process data itself, not from the specification, and they sit at ±3 standard deviations of the plotted statistic. If the process is stable, about 99.73% of points fall inside the limits and any point outside is a signal of a **special cause** worth investigating." },

        { type: "h", text: "Rational subgrouping" },
        { type: "p", text: "The power of a control chart depends on how the data are grouped. A **rational subgroup** is a small set of items produced under essentially the same conditions: the same machine, operator, material batch and short time interval. The variation within the subgroup estimates the common-cause spread, and the variation between subgroup averages reveals any shifts or trends over time." },
        { type: "list", items: [
          "**Why subgroup?** Averaging reduces noise and makes shifts easier to see. An average of 5 readings is about 2.2 times less variable than a single reading.",
          "**How many per subgroup?** Typically 3 to 5, sometimes 10. Larger subgroups increase sensitivity but can mix conditions.",
          "**How often?** Often enough to catch a shift before too many nonconforming units are produced. Hourly or every 50 parts is common.",
          "**Key rule:** items within a subgroup must come from one stream, one set-up, one operator. Never mix morning and afternoon production in the same subgroup.",
        ] },
        { type: "callout", tone: "key", title: "Within vs between", text: "The within-subgroup variation (the range R or standard deviation S) estimates the short-term common-cause spread. The between-subgroup variation (movement of X̄) reveals assignable causes. If the subgroups mix different conditions, the within-group spread is inflated and the chart loses sensitivity." },

        { type: "h", text: "X̄-R chart: construction" },
        { type: "p", text: "The X-bar and R chart is the most common variables control chart. You plot the subgroup average (X̄) and the subgroup range (R) on two aligned charts. The X̄ chart detects shifts in the process mean; the R chart detects changes in the process spread." },
        { type: "steps", title: "Steps to build an X̄-R chart", items: [
          "Collect k subgroups of n measurements each (k ≥ 20 is recommended; n is typically 4 or 5).",
          "For each subgroup, calculate the average X̄ᵢ and the range Rᵢ = max − min.",
          "Calculate the grand average X̄̄ = ΣX̄ᵢ / k and the average range R̄ = ΣRᵢ / k.",
          "Look up the constants A₂, D₃ and D₄ for your subgroup size n.",
          "Compute the X̄ chart limits: UCL = X̄̄ + A₂ × R̄, LCL = X̄̄ − A₂ × R̄.",
          "Compute the R chart limits: UCL = D₄ × R̄, LCL = D₃ × R̄ (D₃ = 0 when n ≤ 6).",
          "Plot the points, centre lines and limits, and inspect for signals.",
        ] },
        { type: "table", head: ["n", "A₂", "D₃", "D₄", "d₂"], rows: [
          ["2", "1.880", "0", "3.267", "1.128"],
          ["3", "1.023", "0", "2.574", "1.693"],
          ["4", "0.729", "0", "2.282", "2.059"],
          ["5", "0.577", "0", "2.114", "2.326"],
          ["6", "0.483", "0", "2.004", "2.534"],
          ["7", "0.419", "0.076", "1.924", "2.704"],
          ["8", "0.373", "0.136", "1.864", "2.847"],
          ["9", "0.337", "0.184", "1.816", "2.970"],
          ["10", "0.308", "0.223", "1.777", "3.078"],
        ] },
        { type: "callout", tone: "tip", title: "Estimating sigma from R̄", text: "The process standard deviation is estimated as σ̂ = R̄ / d₂. For n = 5, d₂ = 2.326, so σ̂ = R̄ / 2.326. This within-subgroup estimate of sigma is the basis for the 3σ control limits and for process capability studies." },

        { type: "h", text: "X̄-R example: aluminium extrusion" },
        { type: "p", text: "Alumilite Cameroun in Bonaberi extrudes aluminium window frames with a target width of 40.00 mm. The quality engineer collects 20 subgroups of 5 pieces, one subgroup per hour. Subgroup 14 was taken just after the tool clamp was found loose." },
        { type: "code", text: "n = 5    k = 20 subgroups\nA₂ = 0.577    D₃ = 0    D₄ = 2.114    d₂ = 2.326\n\nX̄̄  = (40.002 + 40.002 + 39.994 + …) / 20   (calculate from all subgroup averages)\nR̄  = (0.06 + 0.08 + 0.08 + …) / 20\n\nUCL_X̄ = X̄̄ + 0.577 × R̄\nLCL_X̄ = X̄̄ − 0.577 × R̄\nUCL_R  = 2.114 × R̄\nLCL_R  = 0 × R̄ = 0" },
        { type: "equip", title: "Reading a control chart output", items: [
          { art: "stat-control-chart", caption: "Statistical software draws both the X̄ and R chart together. Each subgroup is a point, the centre line is the grand average, and the control limits are computed from the constants table. Points in red are flagged as beyond the limits.",
            specs: [
              { label: "UCL / LCL", value: "Calculated from the data, not from specification" },
              { label: "Red points", value: "Beyond 3σ from the centre line" },
              { label: "Tests for special causes", value: "Software can run all eight Nelson rules automatically" },
            ] },
        ] },

        { type: "h", text: "I-MR chart: individuals and moving range" },
        { type: "p", text: "When you can measure only one item per time period (destructive testing, batch-process output, a daily laboratory analysis), you cannot form subgroups. The **Individuals and Moving Range (I-MR)** chart plots each individual value and the absolute difference between consecutive values." },
        { type: "list", items: [
          "The moving range MRᵢ = |xᵢ − xᵢ₋₁| estimates short-term variation.",
          "MR̄ = average of all moving ranges.",
          "Centre line of the I chart: X̄ (average of all individual values).",
          "UCLᵢ = X̄ + E₂ × MR̄ and LCLᵢ = X̄ − E₂ × MR̄, where E₂ = 2.660.",
          "UCLₘʀ = D₄ × MR̄ = 3.267 × MR̄ and LCLₘʀ = 0.",
        ] },
        { type: "callout", tone: "warning", title: "Assumption", text: "The I-MR chart assumes the data are approximately normally distributed. With only one observation per period, there is no within-subgroup averaging to invoke the central limit theorem. Check the data with a histogram or normal probability plot before relying on the limits." },

        { type: "spc", id: "aqe-m4-l1-spc1", title: "X̄-R chart: aluminium extrusion width", task: "Examine the X̄-R chart for 20 subgroups of 5 measurements of extrusion width (mm). Identify the control limits and any points beyond them. Subgroup 14 was taken after the tool clamp loosened.", hint: "Look at the X̄ chart first. The grand average and A₂ × R̄ give the limits. Subgroup 14 should appear above the UCL.", chart: "xbar-r", unit: "mm", decimals: 2, samples: EXTRUSION, askLimits: true, askBeyond: true },

        { type: "sheet", id: "aqe-m4-l1-sheet", title: "Manual X̄-R limit calculation", task: "Using the first 5 subgroups of the extrusion data, calculate each subgroup average, each subgroup range, the grand average, the average range, and the X̄ chart UCL and LCL. Use n = 5, A₂ = 0.577.", hint: "X̄ᵢ = sum of 5 values / 5. Rᵢ = max − min. Then X̄̄ = average of 5 X̄ᵢ values, R̄ = average of 5 Rᵢ values.",
          data: [
            ["Subgroup", "x₁", "x₂", "x₃", "x₄", "x₅", "X̄ᵢ", "Rᵢ"],
            [1, 40.02, 39.98, 40.01, 39.97, 40.03, null, null],
            [2, 39.99, 40.04, 40.00, 40.02, 39.96, null, null],
            [3, 40.01, 39.95, 40.03, 40.00, 39.98, null, null],
            [4, 39.97, 40.02, 39.99, 40.01, 40.04, null, null],
            [5, 40.03, 40.00, 39.96, 39.98, 40.01, null, null],
            ["", "", "", "", "", "X̄̄ =", null, null],
            ["", "", "", "", "", "R̄ =", null, null],
            ["", "", "", "A₂ =", 0.577, "UCL =", null, ""],
            ["", "", "", "", "", "LCL =", null, ""],
          ],
          editable: ["G2", "H2", "G3", "H3", "G4", "H4", "G5", "H5", "G6", "H6", "G7", "H7", "G8", "H8"],
          checks: [
            { cell: "G2", equals: 40.002, tol: 0.001 },
            { cell: "H2", equals: 0.06, tol: 0.005 },
            { cell: "G3", equals: 40.002, tol: 0.001 },
            { cell: "H3", equals: 0.08, tol: 0.005 },
            { cell: "G4", equals: 39.994, tol: 0.001 },
            { cell: "H4", equals: 0.08, tol: 0.005 },
            { cell: "G5", equals: 40.006, tol: 0.001 },
            { cell: "H5", equals: 0.07, tol: 0.005 },
            { cell: "G6", equals: 39.996, tol: 0.001 },
            { cell: "H6", equals: 0.07, tol: 0.005 },
            { cell: "G7", equals: 40.000, tol: 0.001 },
            { cell: "H7", equals: 0.072, tol: 0.005 },
            { cell: "G8", equals: 40.042, tol: 0.005 },
            { cell: "H8", equals: 39.958, tol: 0.005 },
          ],
          solution: {
            G2: "=(B2+C2+D2+E2+F2)/5",
            H2: "=MAX(B2:F2)-MIN(B2:F2)",
            G7: "=AVERAGE(G2:G6)",
            H7: "=AVERAGE(H2:H6)",
            G8: "=G7+E8*H7",
            H8: "=G7-E8*H7",
          },
        },

        { type: "equip", items: [
          { art: "stat-control-chart", caption: "An I-MR chart has two panels: the upper panel plots each individual observation against the average and ±E₂ × MR̄ limits; the lower panel plots each moving range against D₄ × MR̄.",
            specs: [
              { label: "Use when", value: "Only one measurement per period (destructive test, batch process)" },
              { label: "E₂", value: "2.660 (for moving range of span 2)" },
              { label: "D₄", value: "3.267 (for moving range of span 2)" },
            ] },
        ] },

        { type: "check", id: "aqe-m4-l1-ck1", question: "Why are control limits calculated from the process data rather than from the specification limits?", options: [
          "Because the specification limits are always wider than the control limits",
          "Because control limits measure the voice of the process, not the voice of the customer",
          "Because specification limits change every year",
          "Because the engineer does not know the specification",
        ], answer: 1, explain: "Control limits represent the natural variation of the process (±3σ of the plotted statistic). Specification limits represent the customer’s requirements. The two are independent: a process can be in control yet out of specification, or in specification yet out of control." },

        { type: "check", id: "aqe-m4-l1-ck2", question: "When is an I-MR chart preferred over an X̄-R chart?", options: [
          "When the subgroup size is larger than 10",
          "When the measurement is continuous",
          "When only one observation is available per sampling period",
          "When the process is already in control",
        ], answer: 2, explain: "The I-MR chart is used when subgrouping is impossible: destructive tests, batch processes, expensive analyses where only one result is obtained per period." },
      ],
    },

    // ───────────────────────────── LESSON 2 ─────────────────────────────
    {
      id: "aqe-m4-l2",
      title: "Attribute control charts: p, c and u charts",
      minutes: 30,
      objectives: [
        "Select the correct attribute chart based on the type of count data",
        "Construct a p chart for proportion nonconforming with constant or variable sample size",
        "Construct c and u charts for counts of defects per unit or per area of opportunity",
      ],
      blocks: [
        { type: "p", text: "Not every quality characteristic is measured on a continuous scale. When the inspector classifies each item as conforming or nonconforming, or counts the number of defects on each unit, you need an **attribute** control chart. The choice depends on two things: are you counting nonconforming items or individual defects, and is the sample size (or area of opportunity) constant or variable?" },

        { type: "h", text: "Choosing the right attribute chart" },
        { type: "table", head: ["Chart", "What you count", "Sample size", "Plotted statistic", "Distribution"], rows: [
          ["p", "Nonconforming items", "Variable or constant", "pᵢ = dᵢ / nᵢ (proportion)", "Binomial"],
          ["np", "Nonconforming items", "Constant only", "dᵢ (count)", "Binomial"],
          ["c", "Defects per unit", "Constant area of opportunity", "cᵢ (count)", "Poisson"],
          ["u", "Defects per unit", "Variable area of opportunity", "uᵢ = cᵢ / nᵢ (rate)", "Poisson"],
        ] },
        { type: "callout", tone: "key", title: "Nonconforming vs defect", text: "A **nonconforming item** (defective) fails one or more requirements and is counted once. A **defect** (nonconformity) is a single flaw: one item can have several defects. A scratched, dented and discoloured panel has 3 defects but is 1 nonconforming item." },

        { type: "h", text: "The p chart: proportion nonconforming" },
        { type: "p", text: "Each sample of nᵢ items is inspected and dᵢ nonconforming items are found. The proportion is pᵢ = dᵢ / nᵢ. The centre line is p̄ = Σdᵢ / Σnᵢ (the overall proportion). The 3σ limits are:" },
        { type: "code", text: "UCL = p̄ + 3 × √( p̄(1 − p̄) / n )\nLCL = p̄ − 3 × √( p̄(1 − p̄) / n )      (set to 0 if negative)" },
        { type: "p", text: "When the sample size varies from period to period, the limits change with each sample (they widen for smaller samples). You can either recalculate exact limits for every sample or use the average sample size n̄ for approximate constant limits (acceptable when sample sizes do not vary by more than ±25%)." },

        { type: "h", text: "The np chart" },
        { type: "p", text: "When the sample size n is the same for every period, you can plot the **count** of nonconforming items directly instead of the proportion. The np chart is simpler because no division is needed." },
        { type: "code", text: "CL = n × p̄\nUCL = n × p̄ + 3 × √( n × p̄ × (1 − p̄) )\nLCL = n × p̄ − 3 × √( n × p̄ × (1 − p̄) )      (set to 0 if negative)" },

        { type: "h", text: "The c chart: defects per unit" },
        { type: "p", text: "When the area of opportunity is constant (same size of panel, same length of cable, same area of fabric), you count the number of defects per inspection unit. The c chart assumes the defects follow a Poisson distribution." },
        { type: "code", text: "CL = c̄ = Σcᵢ / k\nUCL = c̄ + 3 × √c̄\nLCL = c̄ − 3 × √c̄      (set to 0 if negative)" },

        { type: "h", text: "The u chart: defects per unit, variable opportunity" },
        { type: "p", text: "When the inspection area varies (different lengths of pipe, different numbers of welds per joint), you divide the defect count by the size of opportunity to get uᵢ = cᵢ / nᵢ. The u chart handles variable areas the way the p chart handles variable sample sizes." },
        { type: "code", text: "CL = ū = Σcᵢ / Σnᵢ\nUCL = ū + 3 × √( ū / nᵢ )\nLCL = ū − 3 × √( ū / nᵢ )      (set to 0 if negative)" },

        { type: "callout", tone: "workplace", title: "In the workplace", text: "At Plastiques de Douala, the quality inspector samples 150 PVC pipes per shift and records the number rejected. Since the sample size is constant, either a p chart or an np chart works. The team chose the p chart because the production manager prefers to see the rejection rate as a percentage. Sample 11 showed a spike to 12.7% nonconforming; the root cause was a batch of recycled resin that had degraded." },

        { type: "equip", title: "Attribute chart displays", items: [
          { art: "stat-control-chart", caption: "Attribute control charts look similar to variables charts but the plotted points are proportions (p chart) or counts (c, np, u charts). The limits may step when the sample size changes.",
            specs: [
              { label: "p chart limits", value: "Variable with sample size" },
              { label: "c chart limits", value: "Constant (√c̄-based)" },
              { label: "Minimum data", value: "≥20 subgroups recommended" },
            ] },
        ] },

        { type: "spc", id: "aqe-m4-l2-spc1", title: "p chart: PVC pipe nonconformities", task: "Inspect the p chart for 20 samples of 150 PVC pipes. Identify the average proportion nonconforming, the control limits and any out-of-control points.", hint: "p̄ = total defectives / total inspected. The UCL and LCL use the formula with √(p̄(1−p̄)/n). Look for sample 11.", chart: "p", defectives: PIPES_DEF, sampleSize: PIPES_N },

        { type: "spc", id: "aqe-m4-l2-spc2", title: "c chart: plywood surface defects", task: "Examine the c chart for 20 sheets of plywood. Determine c̄, the control limits, and whether any sheet exceeds the UCL.", hint: "c̄ is the average number of defects. UCL = c̄ + 3√c̄. Sheet 8 had moisture damage.", chart: "c", values: PLYWOOD },

        { type: "check", id: "aqe-m4-l2-ck1", question: "A weld inspector counts the number of pores in each pipe joint. The pipe lengths vary from 3 m to 12 m. Which chart is appropriate?", options: [
          "p chart",
          "np chart",
          "c chart",
          "u chart",
        ], answer: 3, explain: "The inspector is counting defects (pores), not nonconforming items, and the area of opportunity (pipe length) varies. This calls for a u chart, which divides the count by the unit of opportunity." },

        { type: "check", id: "aqe-m4-l2-ck2", question: "Why is LCL set to zero when the formula gives a negative value?", options: [
          "Because negative proportions and counts are impossible",
          "Because the lower limit is not important",
          "Because the chart is one-sided",
          "Because the process is already good enough",
        ], answer: 0, explain: "You cannot have a negative proportion nonconforming or a negative defect count. When the 3σ formula yields a negative LCL, it is truncated to zero." },
      ],
    },

    // ───────────────────────────── LESSON 3 ─────────────────────────────
    {
      id: "aqe-m4-l3",
      title: "Interpreting control charts: tests for special causes",
      minutes: 25,
      objectives: [
        "Apply the Western Electric and Nelson rules to identify non-random patterns",
        "Recognise common chart patterns: shifts, trends, cycles, mixtures, stratification and over-control",
        "Determine the correct response when an out-of-control signal is detected",
      ],
      blocks: [
        { type: "p", text: "A point beyond a control limit is the most obvious signal that the process has changed, but it is not the only one. Non-random patterns within the limits, such as runs, trends and systematic alternation, also indicate that something has changed. The **Western Electric rules** (1956) and the extended **Nelson rules** (1984) provide a standard set of tests that statistical software applies automatically." },

        { type: "h", text: "The zone system" },
        { type: "p", text: "Divide the area between each control limit and the centre line into three equal zones, each one sigma wide. Zone C is the inner third (nearest the centre line), Zone B is the middle third, and Zone A is the outer third (nearest the control limit). The rules use these zones to define suspicious patterns." },
        { type: "table", head: ["Zone", "Location", "Expected proportion of points"], rows: [
          ["C", "±1σ from centre line", "About 68%"],
          ["B", "Between ±1σ and ±2σ", "About 27%"],
          ["A", "Between ±2σ and ±3σ", "About 4.3%"],
          ["Beyond", "Outside ±3σ", "About 0.27%"],
        ] },

        { type: "h", text: "Western Electric / Nelson rules" },
        { type: "table", head: ["Rule", "Description", "What it detects"], rows: [
          ["1", "1 point beyond Zone A (beyond 3σ)", "Single large shift or outlier"],
          ["2", "9 consecutive points on the same side of the centre line", "Sustained shift in the mean"],
          ["3", "6 consecutive points steadily increasing or decreasing", "Trend (tool wear, drift)"],
          ["4", "14 consecutive points alternating up and down", "Over-adjustment or two alternating streams"],
          ["5", "2 out of 3 consecutive points in Zone A or beyond, same side", "Erratic shift"],
          ["6", "4 out of 5 consecutive points in Zone B or beyond, same side", "Sustained moderate shift"],
          ["7", "15 consecutive points in Zone C (both sides)", "Stratification or plotting error"],
          ["8", "8 consecutive points outside Zone C (both sides)", "Mixture of two processes"],
        ] },
        { type: "callout", tone: "warning", title: "False alarms", text: "Each rule has a small probability of triggering by chance. Applying all eight rules simultaneously increases the false alarm rate to roughly 2–3% per sample. Many factories use only rules 1, 2 and 3 for routine monitoring and add the others for deeper investigation." },

        { type: "h", text: "Common patterns and their causes" },
        { type: "list", items: [
          "**Shift:** a sudden, sustained change in the level. Causes: new operator, tool replacement, material lot change, recalibration.",
          "**Trend:** a steady drift upward or downward. Causes: tool wear, filter clogging, chemical depletion, temperature drift.",
          "**Cycle:** a repeating wave pattern. Causes: ambient temperature cycle (day/night), shift rotation, periodic maintenance, batch-to-batch raw material variation.",
          "**Mixture:** points consistently in Zones B and A on both sides, with too few points near the centre. Causes: two machines feeding one stream, two operators, two shifts mixed into one chart.",
          "**Stratification:** points hugging the centre line too closely (too little variation). Causes: limits calculated from data that include a special cause (inflated R̄), or a plotting error.",
          "**Over-control:** every point is adjusted after each reading, causing an alternating sawtooth. The operator is reacting to common-cause variation and making things worse.",
        ] },

        { type: "h", text: "Reacting to out-of-control signals" },
        { type: "steps", title: "Response procedure", items: [
          "Stop: mark the point on the chart and record the time.",
          "Investigate: find the assignable cause (ask the operator, check material, inspect tooling).",
          "Correct: remove the cause or adjust the process.",
          "Document: note the cause and the corrective action on the control chart or in the logbook.",
          "Decide: if the cause is found and removed, exclude that point and recalculate the limits. If no cause is found, tighten investigation and continue plotting.",
        ] },
        { type: "callout", tone: "key", title: "Common vs special cause", text: "**Common-cause** variation is always present and inherent to the process (random, stable). **Special-cause** variation is due to an identifiable, intermittent factor. Control charts separate the two: if all points are within the limits and show no patterns, only common causes are acting. Reducing common-cause variation requires a system change (better materials, new tooling, training); removing a special cause requires finding and eliminating that one factor." },

        { type: "form", id: "aqe-m4-l3-form", title: "Identify the violated rule", task: "For each chart description below, select which Western Electric / Nelson rule is violated.",
          fields: [
            { kind: "select", label: "A single point plots above the UCL on the X̄ chart", options: ["Rule 1: point beyond 3σ", "Rule 2: 9 points same side", "Rule 3: 6 points trending", "Rule 5: 2 of 3 in Zone A"], answer: 0, explain: "One point beyond a 3σ limit is Rule 1." },
            { kind: "select", label: "The last 10 points are all below the centre line but within the limits", options: ["Rule 1: point beyond 3σ", "Rule 2: 9 points same side", "Rule 3: 6 points trending", "Rule 7: 15 points in Zone C"], answer: 1, explain: "Nine or more consecutive points on the same side of the centre line is Rule 2, indicating a sustained shift." },
            { kind: "select", label: "Seven consecutive points rise steadily from left to right", options: ["Rule 1: point beyond 3σ", "Rule 2: 9 points same side", "Rule 3: 6 points trending", "Rule 4: 14 points alternating"], answer: 2, explain: "Six or more consecutive points increasing or decreasing is Rule 3, suggesting a trend such as tool wear." },
            { kind: "select", label: "Points 5 and 6 are both in Zone A above the centre line, and point 7 is in Zone B above", options: ["Rule 1: point beyond 3σ", "Rule 3: 6 points trending", "Rule 5: 2 of 3 in Zone A", "Rule 6: 4 of 5 in Zone B"], answer: 2, explain: "Two out of three consecutive points in Zone A on the same side is Rule 5." },
          ],
          hint: "Remember: Rule 1 = beyond limits; Rule 2 = long run on one side; Rule 3 = trend; Rule 5 = 2 of 3 in Zone A." },

        { type: "sorter", id: "aqe-m4-l3-sort", layout: "columns", title: "Match patterns to causes", task: "Drag each observed cause to the chart pattern it most likely produces.",
          buckets: [
            { label: "Shift" },
            { label: "Trend" },
            { label: "Cycle" },
            { label: "Mixture" },
          ],
          items: [
            { text: "A new batch of resin is introduced at the start of the afternoon shift", bucket: 0, explain: "A sudden material change causes a step change (shift) in the process mean." },
            { text: "The cutting tool wears gradually over the day", bucket: 1, explain: "Gradual tool wear produces a steady drift (trend) in the dimension." },
            { text: "Ambient temperature rises during the day and falls at night, and the chart shows a repeating wave", bucket: 2, explain: "A periodic environmental factor creates a cycle in the data." },
            { text: "Two injection moulding machines feed the same inspection station; one runs slightly higher than the other", bucket: 3, explain: "Two machines at different levels produce a bimodal spread that appears as mixture on the chart." },
            { text: "The acid concentration in the etching bath is consumed as parts are processed", bucket: 1, explain: "Chemical depletion is a gradual, continuous change, producing a trend." },
            { text: "The operator changes at 06:00 and the readings step up", bucket: 0, explain: "An operator change with a different technique or set-up causes a shift." },
          ] },

        { type: "check", id: "aqe-m4-l3-ck1", question: "Fifteen consecutive points all fall within Zone C. What does this suggest?", options: [
          "The process is very stable and well controlled",
          "The control limits are too narrow",
          "Stratification: the limits were calculated with inflated variation",
          "The process has shifted to the centre",
        ], answer: 2, explain: "Rule 7 flags 15 consecutive points in Zone C. This usually means the within-subgroup variation used to set the limits was inflated (e.g. by including a special cause in the initial data), making the limits too wide relative to the actual common-cause spread." },
      ],
    },

    // ───────────────────────────── LESSON 4 ─────────────────────────────
    {
      id: "aqe-m4-l4",
      title: "Process capability: Cp, Cpk, Pp and Ppk",
      minutes: 35,
      objectives: [
        "Distinguish between process capability (within, short-term) and process performance (overall, long-term)",
        "Calculate and interpret Cp, Cpk, Pp and Ppk from process data",
        "Apply minimum capability requirements: Cpk ≥ 1.33 for existing and ≥ 1.67 for new processes",
        "Explain how non-normal data affects capability analysis",
      ],
      blocks: [
        { type: "p", text: "Once a process is in statistical control, you can ask: is the natural variation small enough to fit comfortably within the specification? **Process capability** compares the voice of the process to the voice of the customer. A capable process produces virtually no nonconforming output; an incapable process, even when in control, is inherently unable to meet the specification." },

        { type: "h", text: "Capability vs performance" },
        { type: "table", head: ["", "Capability (Cp, Cpk)", "Performance (Pp, Ppk)"], rows: [
          ["Variation used", "Within-subgroup (σ̂_within = R̄/d₂ or S̄/c₄)", "Overall (σ̂_overall = standard deviation of all individuals)"],
          ["Condition", "Process must be in statistical control", "No requirement for control"],
          ["Interpretation", "What the process **can** do at its best", "What the process **has been** doing"],
          ["Typical use", "Pre-production approval, SPC studies", "Long-term monitoring, customer reports"],
        ] },
        { type: "callout", tone: "key", title: "Why two sigmas?", text: "When a process is in control, σ_within ≈ σ_overall and Cp ≈ Pp. When special causes are present, σ_overall > σ_within and Pp < Cp. A large gap between Cp and Pp tells you that assignable causes are inflating the overall variation." },

        { type: "h", text: "Cp and Cpk formulas" },
        { type: "p", text: "**Cp** (potential capability) measures only the spread, ignoring the centering. **Cpk** (actual capability) also accounts for how far the process mean is from the nearest specification limit." },
        { type: "code", text: "Cp  = (USL − LSL) / (6σ̂)\nCpk = min( (USL − X̄̄) / (3σ̂) , (X̄̄ − LSL) / (3σ̂) )\n\nwhere σ̂ = R̄ / d₂   (within-subgroup estimate)" },
        { type: "list", items: [
          "Cp = 1.00: the process spread equals the tolerance (3σ on each side). About 2 700 PPM nonconforming.",
          "Cp = 1.33: 4σ on each side. About 63 PPM. Typical minimum for existing processes.",
          "Cp = 1.67: 5σ on each side. About 0.6 PPM. Typical minimum for new / safety-critical processes.",
          "Cp = 2.00: 6σ on each side. About 2 PPB. World-class.",
        ] },
        { type: "callout", tone: "tip", title: "Cpk can never exceed Cp", text: "Cpk accounts for off-centre processes. If the process is perfectly centred between the specification limits, Cpk = Cp. If the mean drifts toward one limit, Cpk decreases while Cp stays the same." },

        { type: "h", text: "Pp and Ppk formulas" },
        { type: "code", text: "Pp  = (USL − LSL) / (6s)\nPpk = min( (USL − X̄) / (3s) , (X̄ − LSL) / (3s) )\n\nwhere s = √[ Σ(xᵢ − X̄)² / (N−1) ]   (overall standard deviation of all N individuals)" },

        { type: "h", text: "Minimum capability requirements" },
        { type: "table", head: ["Situation", "Minimum Cpk", "Rationale"], rows: [
          ["Existing process, normal production", "≥ 1.33", "Four-sigma coverage on each side; widely accepted industry standard"],
          ["New process or new equipment", "≥ 1.67", "Higher standard because the process will drift over time"],
          ["Safety-critical or key characteristic", "≥ 1.67 to 2.00", "Near-zero risk of nonconformance; automotive and aerospace requirement"],
          ["Process not in control", "Not valid", "Capability indices are meaningless unless the process is in statistical control"],
        ] },
        { type: "callout", tone: "warning", title: "Control before capability", text: "Never calculate Cp and Cpk from data that contain special causes. First bring the process into statistical control by removing assignable causes. Only then does the within-subgroup estimate of sigma represent the true common-cause variation." },

        { type: "h", text: "Capability for non-normal data" },
        { type: "p", text: "The standard Cp/Cpk formulas assume the process data follow a normal distribution. When the data are skewed (e.g. surface roughness, cycle times, particle counts), the formulas overestimate or underestimate the actual tail proportions. Options include:" },
        { type: "list", items: [
          "**Transform the data:** apply a Box-Cox transformation (e.g. logarithm) to make the data approximately normal, then calculate capability on the transformed scale.",
          "**Fit a non-normal distribution:** use a Weibull, lognormal or other distribution and calculate equivalent tail proportions.",
          "**Use empirical percentiles:** estimate the 0.135th and 99.865th percentiles from a large data set and compare them to the specification limits.",
        ] },

        { type: "equip", title: "Process capability study output", items: [
          { art: "stat-capability", caption: "A capability study output shows the histogram of the data overlaid with a fitted normal curve, the specification limits (LSL and USL), and the calculated indices. The expected PPM (parts per million) nonconforming above and below each limit is also reported.",
            specs: [
              { label: "Cp", value: "Potential capability (spread only)" },
              { label: "Cpk", value: "Actual capability (spread + centering)" },
              { label: "Pp / Ppk", value: "Performance indices using overall sigma" },
              { label: "PPM", value: "Expected parts per million nonconforming" },
            ] },
        ] },

        { type: "capability", id: "aqe-m4-l4-cap", title: "Cpk simulator: bearing inner diameter", task: "A bearing inner diameter has LSL = 24.98 mm and USL = 25.02 mm. The process currently has a mean of 25.005 mm and sigma of 0.005 mm. Adjust the mean and sigma to achieve Cpk ≥ 1.33.", hint: "Cpk = min((USL − mean)/(3σ), (mean − LSL)/(3σ)). Centre the process and reduce sigma.", unit: "mm", lsl: 24.98, usl: 25.02, mean: 25.005, sigma: 0.005, adjust: ["mean", "sigma"], goal: 1.33, meanRange: [24.98, 25.02], sigmaRange: [0.001, 0.010] },

        { type: "sheet", id: "aqe-m4-l4-sheet", title: "Calculate Cp and Cpk from data", task: "A shaft has LSL = 19.95 mm and USL = 20.05 mm. From 25 subgroups of 5, the quality engineer found X̄̄ = 20.008 mm and R̄ = 0.032 mm. Using d₂ = 2.326, calculate σ̂, Cp and Cpk.", hint: "σ̂ = R̄ / d₂. Cp = (USL − LSL) / (6σ̂). Cpk = min of (USL − X̄̄)/(3σ̂) and (X̄̄ − LSL)/(3σ̂).",
          data: [
            ["Parameter", "Value"],
            ["USL (mm)", 20.05],
            ["LSL (mm)", 19.95],
            ["X̄̄ (mm)", 20.008],
            ["R̄ (mm)", 0.032],
            ["d₂", 2.326],
            ["σ̂ (mm)", null],
            ["Cp", null],
            ["Cpu", null],
            ["Cpl", null],
            ["Cpk", null],
          ],
          editable: ["B7", "B8", "B9", "B10", "B11"],
          checks: [
            { cell: "B7", equals: 0.01375, tol: 0.0005 },
            { cell: "B8", equals: 2.42, tol: 0.05 },
            { cell: "B9", equals: 1.02, tol: 0.05 },
            { cell: "B10", equals: 1.41, tol: 0.05 },
            { cell: "B11", equals: 1.02, tol: 0.05 },
          ],
          solution: {
            B7: "=B5/B6",
            B8: "=(B2-B3)/(6*B7)",
            B9: "=(B2-B4)/(3*B7)",
            B10: "=(B4-B3)/(3*B7)",
            B11: "=MIN(B9,B10)",
          },
        },

        { type: "equip", items: [
          { art: "stat-normality", caption: "Before running a capability study, verify that the data are approximately normal using a normal probability plot. Points should fall close to the fitted straight line; a significant Anderson-Darling or Shapiro-Wilk test (p < 0.05) suggests non-normality.",
            specs: [
              { label: "If normal", value: "Use standard Cp/Cpk formulas" },
              { label: "If non-normal", value: "Transform, fit a distribution, or use percentile method" },
            ] },
        ] },

        { type: "check", id: "aqe-m4-l4-ck1", question: "A process has Cp = 1.50 and Cpk = 0.85. What does this tell you?", options: [
          "The process is capable and centred",
          "The process spread fits the tolerance but the mean is off-centre",
          "The process is out of control",
          "The specification limits are wrong",
        ], answer: 1, explain: "Cp = 1.50 means the tolerance is 9σ wide, which is more than enough. But Cpk = 0.85 means the mean is shifted toward one limit so that the nearest limit is only 2.55σ away. The process needs recentring." },

        { type: "check", id: "aqe-m4-l4-ck2", question: "Why must a process be in statistical control before calculating Cp and Cpk?", options: [
          "Because out-of-control processes always fail capability",
          "Because the within-subgroup sigma estimate is valid only when no special causes inflate it",
          "Because specification limits change when the process is out of control",
          "Because Cp requires at least 100 data points",
        ], answer: 1, explain: "Capability indices use σ̂ = R̄/d₂, which estimates only common-cause variation. If special causes are present, the data mix common and special-cause variation, and the sigma estimate does not represent the inherent process spread." },
      ],
    },

    // ───────────────────────────── LESSON 5 ─────────────────────────────
    {
      id: "aqe-m4-l5",
      title: "Advanced SPC: pre-control, short runs and process improvement",
      minutes: 25,
      objectives: [
        "Apply pre-control (stoplight) rules for quick set-up verification",
        "Use standardised control charts for short production runs",
        "Link SPC to process improvement and the control plan",
      ],
      blocks: [
        { type: "h", text: "Pre-control (stoplight control)" },
        { type: "p", text: "Pre-control is a simple technique for monitoring short runs or verifying a set-up. It divides the specification range into three coloured zones using the specification limits and the tolerance midpoint, not the process data." },
        { type: "table", head: ["Zone", "Boundaries", "Colour", "Rule"], rows: [
          ["Green", "Middle 50% of the tolerance", "Green", "Continue running"],
          ["Yellow", "Outer 25% on each side (between green and the spec limit)", "Yellow", "Warning: two consecutive yellows on the same side → adjust"],
          ["Red", "Beyond the specification limit", "Red", "Stop and adjust immediately"],
        ] },
        { type: "code", text: "Tolerance = USL − LSL\nGreen zone: from (LSL + 0.25 × Tol) to (USL − 0.25 × Tol)\nYellow zone: LSL to green boundary, and green boundary to USL\n\nExample: shaft Ø20.00 ± 0.05 mm  →  LSL = 19.95, USL = 20.05, Tol = 0.10 mm\n  Green:  19.975 to 20.025\n  Yellow: 19.95 to 19.975  and  20.025 to 20.05\n  Red:    below 19.95 or above 20.05" },
        { type: "list", items: [
          "**Set-up qualification:** measure 5 consecutive parts. All 5 must be in the green zone to start production.",
          "**During production:** sample 2 consecutive parts periodically. Both green → continue. One yellow → continue but watch. Two yellows on the same side → adjust toward centre. Any red → stop and investigate.",
          "**Advantages:** no calculations, no charts, easy to train operators. Works well for short runs where there is no time to collect 20+ subgroups.",
          "**Limitation:** pre-control requires that the process is already capable (Cpk ≥ 1.0 minimum, ideally ≥ 1.33). It is not a substitute for SPC but a complement for set-up approval.",
        ] },
        { type: "callout", tone: "tip", title: "When to use pre-control", text: "Pre-control is ideal for job shops and CNC operations with frequent set-ups and short runs (50 to 500 pieces). Use it to qualify the set-up quickly and switch to SPC charts once enough data have accumulated for proper control limits." },

        { type: "h", text: "Short-run SPC" },
        { type: "p", text: "In short production runs, you may not have 20+ subgroups of one part number to calculate control limits. **Standardised (deviation from nominal) charts** solve this by plotting the deviation of each measurement from the nominal rather than the raw value. This lets you combine data from different part numbers on one chart, provided the processes have similar variation." },
        { type: "code", text: "Standardised value:  zᵢ = (xᵢ − nominal) / σ̂_reference\n\nFor X̄ chart: plot (X̄ᵢ − target) / (σ̂ / √n)\nFor R chart: plot Rᵢ / R̄_reference\n\nThe limits on the standardised chart are ±A₂ (for the X̄ chart) and 0, D₃, D₄ (for the R chart)." },
        { type: "list", items: [
          "**DNOM chart (deviation from nominal):** plot xᵢ − nominal. All part numbers share the same chart; the centre line is zero.",
          "**Standardised chart:** divide by a reference sigma so all part numbers have the same scale. Useful when part numbers have different tolerances.",
          "**Target chart:** the X̄ chart centre line is the target, and each lot's deviation is tracked against it.",
        ] },

        { type: "h", text: "SPC for process improvement" },
        { type: "p", text: "Control charts are not just alarm systems. They are powerful improvement tools. The strategy has two phases:" },
        { type: "steps", title: "Two-phase improvement", items: [
          "**Phase 1 — Bring the process into control:** identify and remove special causes one by one. Each time a signal appears, investigate, find the root cause, and put a permanent fix in place. Recalculate the limits after removing the special cause. Continue until all points fall within the limits and pass the run tests.",
          "**Phase 2 — Reduce common-cause variation:** once the process is stable, work on fundamental changes to reduce the inherent spread: better raw materials, tighter machine maintenance, improved tooling, operator training, environmental controls. Each improvement reduces σ and tightens the control limits.",
          "**Centre the process:** if Cp is adequate but Cpk is not, adjust the process mean to the target. This is often the quickest capability gain.",
          "**Hold the gains:** update the control plan with the new SPC parameters, reaction plan and revised limits. Train all operators.",
        ] },
        { type: "callout", tone: "key", title: "Control plan connection", text: "Every SPC chart in the factory should correspond to a line in the **control plan**: which characteristic is monitored, what chart type is used, what sample size and frequency, who plots it, what the reaction plan is when a signal appears, and who is notified. Without a control plan link, SPC is an isolated exercise." },

        { type: "form", id: "aqe-m4-l5-form", title: "Apply pre-control rules", task: "A shaft has a specification of 20.00 ± 0.05 mm (LSL = 19.95, USL = 20.05). Determine the green zone boundaries and the correct action for each situation.",
          fields: [
            { kind: "text", label: "Lower green boundary (mm)", accept: ["19.975"], placeholder: "e.g. 19.975", explain: "Green zone starts at LSL + 0.25 × Tolerance = 19.95 + 0.25 × 0.10 = 19.975 mm." },
            { kind: "text", label: "Upper green boundary (mm)", accept: ["20.025"], placeholder: "e.g. 20.025", explain: "Green zone ends at USL − 0.25 × Tolerance = 20.05 − 0.25 × 0.10 = 20.025 mm." },
            { kind: "select", label: "Two consecutive parts measure 20.035 and 20.042 mm. Action?", options: ["Continue running", "Adjust the process toward centre", "Stop and investigate"], answer: 1, explain: "Both parts are in the yellow zone on the same side (above 20.025 but below 20.05). The rule says: two yellows on the same side → adjust toward the centre." },
            { kind: "select", label: "A part measures 19.943 mm. Action?", options: ["Continue running", "Adjust the process toward centre", "Stop and investigate"], answer: 2, explain: "19.943 is below LSL (19.95), so it is in the red zone. The rule says: stop and investigate immediately." },
          ],
          hint: "The green zone is the middle 50% of the tolerance. Calculate: LSL + 25% of tolerance and USL − 25% of tolerance." },

        { type: "sheet", id: "aqe-m4-l5-sheet", title: "Standardised values for short-run SPC", task: "Three different shaft diameters are produced on the same CNC lathe. Convert each measurement to a deviation from nominal, then to a standardised value using the reference σ = 0.008 mm.", hint: "Deviation = measurement − nominal. Standardised = deviation / σ_ref.",
          data: [
            ["Part", "Nominal (mm)", "Measurement (mm)", "Deviation (mm)", "Standardised"],
            ["A", 20.000, 20.006, null, null],
            ["B", 25.000, 24.992, null, null],
            ["C", 30.000, 30.011, null, null],
            ["A", 20.000, 19.997, null, null],
            ["B", 25.000, 25.004, null, null],
            ["", "σ_ref =", 0.008, "", ""],
          ],
          editable: ["D2", "E2", "D3", "E3", "D4", "E4", "D5", "E5", "D6", "E6"],
          checks: [
            { cell: "D2", equals: 0.006, tol: 0.001 },
            { cell: "E2", equals: 0.75, tol: 0.05 },
            { cell: "D3", equals: -0.008, tol: 0.001 },
            { cell: "E3", equals: -1.0, tol: 0.05 },
            { cell: "D4", equals: 0.011, tol: 0.001 },
            { cell: "E4", equals: 1.375, tol: 0.05 },
            { cell: "D5", equals: -0.003, tol: 0.001 },
            { cell: "E5", equals: -0.375, tol: 0.05 },
            { cell: "D6", equals: 0.004, tol: 0.001 },
            { cell: "E6", equals: 0.5, tol: 0.05 },
          ],
          solution: {
            D2: "=C2-B2",
            E2: "=D2/0.008",
          },
        },

        { type: "check", id: "aqe-m4-l5-ck1", question: "What is the main advantage of pre-control over traditional SPC charts?", options: [
          "Pre-control is more sensitive to small shifts",
          "Pre-control does not require calculations or a charting system",
          "Pre-control works on any process regardless of capability",
          "Pre-control provides better long-term monitoring",
        ], answer: 1, explain: "Pre-control is designed for simplicity: three coloured zones based on the specification, no formulas, no charts. It is ideal for short runs and set-up verification but less sensitive than control charts for detecting small sustained shifts." },

        { type: "check", id: "aqe-m4-l5-ck2", question: "Why does a standardised short-run SPC chart use the deviation from nominal rather than the raw measurement?", options: [
          "To make the chart look cleaner",
          "To reduce the number of decimal places",
          "To allow different part numbers with different nominals to share one chart",
          "To eliminate the need for control limits",
        ], answer: 2, explain: "By subtracting each part number's nominal, all deviations share a common zero reference and can be plotted on a single chart, even though the parts have different target dimensions." },
      ],
    },

    // ───────────────────────────── PRACTICE ──────────────────────────────
    {
      id: "aqe-m4-practice",
      title: "Practice: SPC and Process Capability",
      minutes: 30,
      objectives: [
        "Construct and interpret I-MR, X̄-R and p charts from realistic quality data",
        "Use a capability simulator to centre and tighten a process to meet Cpk ≥ 1.33",
        "Identify out-of-control signals and recommend corrective actions",
      ],
      blocks: [
        { type: "p", text: "Apply what you have learnt about control charts and process capability to the following four exercises. Each exercise uses data from Cameroonian manufacturing scenarios." },

        // beginner: I-MR chart
        { type: "spc", id: "aqe-m4-pr-imr", level: "beginner", title: "I-MR chart: brewery water pH", task: "Plot the I-MR chart for 20 hourly pH readings from the water treatment plant at Brasseries du Cameroun in Douala. Calculate the average, the average moving range, and the I chart control limits. Is the process in control?", hint: "X̄ = average of all values. MR̄ = average of consecutive absolute differences. UCL = X̄ + 2.660 × MR̄. All points should be within the limits for a stable process.", chart: "imr", values: WATER_PH, askLimits: true },

        // intermediate: X̄-R with out-of-control
        { type: "spc", id: "aqe-m4-pr-xbar", level: "intermediate", title: "X̄-R chart: cocoa butter content", task: "Analyse the X̄-R chart for 18 subgroups of 5 cocoa butter percentage readings from a Douala chocolate factory. Identify any subgroups that signal out-of-control conditions. What might have caused the unusual subgroups?", hint: "Look for subgroups where the X̄ is beyond the limits (subgroup 7: fermentation error) and where the range is unusually large (subgroup 15: mixing problem).", chart: "xbar-r", unit: "%", decimals: 1, samples: COCOA, askBeyond: true },

        // advanced: capability
        { type: "capability", id: "aqe-m4-pr-cap", level: "advanced", title: "Centre and tighten: piston ring groove width", task: "A piston ring groove has LSL = 2.470 mm and USL = 2.530 mm. The current process runs with mean = 2.510 mm and sigma = 0.012 mm, giving a Cpk well below the 1.33 target. Adjust the mean and sigma until Cpk ≥ 1.33.", hint: "First centre the mean at the midpoint of the tolerance (2.500 mm). Then reduce sigma until the Cpk formula gives at least 1.33.", unit: "mm", lsl: 2.470, usl: 2.530, mean: 2.510, sigma: 0.012, adjust: ["mean", "sigma"], goal: 1.33, meanRange: [2.470, 2.530], sigmaRange: [0.002, 0.015] },

        // expert: p chart with question
        { type: "spc", id: "aqe-m4-pr-pchart", level: "expert", title: "p chart: bottle cap seal failures", task: "Construct a p chart for 20 samples of 200 bottle caps inspected for seal integrity. Identify any out-of-control samples. Then answer the question about process stability.", hint: "Calculate p̄ from total defectives / total inspected. Sample 12 shows a spike (new seal liner supplier). Consider whether the process is stable overall or only after excluding the special cause.", chart: "p", defectives: CAPS_DEF, sampleSize: CAPS_N, question: { question: "After investigating sample 12 and switching back to the original supplier, is the remaining process stable?", options: ["Yes — all other samples are within the recalculated limits", "No — there is a trend in the remaining data", "Cannot determine without more data", "No — the average proportion is too high"], answer: 0, explain: "Excluding the special cause in sample 12, the remaining 19 samples show no points beyond the recalculated limits and no non-random patterns. The process is stable at the common-cause level." } },
      ],
    },
  ],

  // ────────────────────────────── QUIZ ──────────────────────────────────
  quiz: {
    id: "aqe-m4-quiz",
    title: "Module 4 Quiz: SPC and Process Capability",
    passPct: 75,
    questions: [
      {
        id: "aqe-m4-q1",
        question: "For an X̄-R chart with subgroup size n = 5, the constant A₂ is 0.577. If X̄̄ = 50.00 and R̄ = 4.00, what is the UCL of the X̄ chart?",
        options: ["52.31", "52.00", "54.00", "50.58"],
        answer: 0,
        explain: "UCL = X̄̄ + A₂ × R̄ = 50.00 + 0.577 × 4.00 = 52.308, rounded to 52.31.",
      },
      {
        id: "aqe-m4-q2",
        question: "Which attribute control chart is appropriate when you count the number of paint defects on car bodies of the same size?",
        options: ["p chart", "np chart", "c chart", "u chart"],
        answer: 2,
        explain: "You are counting individual defects (not nonconforming items) on a constant area of opportunity (same size body). This is the c chart.",
      },
      {
        id: "aqe-m4-q3",
        question: "Nine consecutive points fall below the centre line of an X̄ chart but within the control limits. Which Nelson rule is violated?",
        options: ["Rule 1: point beyond 3σ", "Rule 2: 9 points on the same side", "Rule 3: 6-point trend", "Rule 4: 14 alternating points"],
        answer: 1,
        explain: "Rule 2 states that 9 or more consecutive points on the same side of the centre line indicate a sustained shift in the process mean.",
      },
      {
        id: "aqe-m4-q4",
        question: "A process has USL = 30 mm, LSL = 20 mm, X̄̄ = 26 mm and σ̂ = 1.5 mm. What is Cpk?",
        options: ["1.11", "0.89", "1.33", "1.00"],
        answer: 1,
        explain: "Cpu = (30 − 26) / (3 × 1.5) = 4 / 4.5 = 0.889. Cpl = (26 − 20) / (3 × 1.5) = 6 / 4.5 = 1.333. Cpk = min(0.889, 1.333) = 0.89.",
      },
      {
        id: "aqe-m4-q5",
        question: "What is the minimum Cpk typically required for a new process or new equipment?",
        options: ["1.00", "1.33", "1.67", "2.00"],
        answer: 2,
        explain: "For new processes or new equipment, the typical minimum is Cpk ≥ 1.67 (5σ on each side), because the process will likely drift over time.",
      },
      {
        id: "aqe-m4-q6",
        question: "In pre-control (stoplight method), two consecutive measurements fall in the yellow zone on the same side. What is the correct action?",
        options: ["Continue running", "Adjust the process toward the centre", "Stop and investigate immediately", "Switch to an X̄-R chart"],
        answer: 1,
        explain: "Two consecutive yellows on the same side mean the process is drifting toward a specification limit. The operator should adjust the process toward the centre of the tolerance.",
      },
      {
        id: "aqe-m4-q7",
        question: "What does a large gap between Cp and Pp (Cp significantly higher than Pp) indicate?",
        options: ["The specification limits are set too wide", "Special causes are inflating the overall variation", "The process is perfectly centred", "The data are not normally distributed"],
        answer: 1,
        explain: "Cp uses within-subgroup sigma (common cause only) while Pp uses overall sigma (common + special cause). When special causes are present, overall sigma is larger, so Pp < Cp.",
      },
      {
        id: "aqe-m4-q8",
        question: "Why does short-run SPC use the deviation from nominal rather than the raw measurement?",
        options: ["To reduce calculation errors", "To eliminate the need for control limits", "To allow multiple part numbers to share one chart", "To compensate for non-normal data"],
        answer: 2,
        explain: "By subtracting each part number’s nominal value, all deviations have a common zero reference. This allows data from different part numbers produced on the same machine to be plotted on a single control chart.",
      },
    ],
  },
};
