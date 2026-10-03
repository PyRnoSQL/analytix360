import type { CourseModule } from "../../../lms/types";

// Associate Quality Engineer — Module 3: Measurement Systems Analysis.
// Original Analytix Engineering material. All companies, people and figures are fictional.
// Methodology follows AIAG MSA 4th edition. British spelling. Cameroon context.

export const m3: CourseModule = {
  id: "aqe-m3",
  number: 3,
  title: "Measurement Systems Analysis",
  summary:
    "This module covers the properties of measurement systems — resolution, accuracy, precision, bias, linearity, stability, repeatability and reproducibility — and the studies used to evaluate them. You will learn to plan and analyse Gage R&R studies using both the range method and the ANOVA method following AIAG MSA 4th edition methodology, evaluate attribute measurement systems with kappa statistics, and conduct bias, linearity and stability studies. The module concludes with an introduction to measurement uncertainty using the GUM approach, distinguishing Type A and Type B evaluations.",
  hours: 16,
  lessons: [
    // ═══════════════════════════════ LESSON 1 ═══════════════════════════════
    {
      id: "aqe-m3-l1",
      title: "Measurement system properties",
      minutes: 25,
      objectives: [
        "Define resolution, accuracy, precision, bias, linearity, stability, repeatability and reproducibility",
        "Calculate and interpret the discrimination ratio (number of distinct categories)",
        "Identify the five major sources of measurement variation: instrument, operator, environment, method and part",
      ],
      blocks: [
        { type: "p", text: "Every number on an inspection report comes from a measurement system — the complete collection of instruments, standards, operations, methods, fixtures, software, environment, operators and assumptions used to obtain a result. Before we can trust any data from a process, we must first prove that the measurement system producing that data is adequate. A measurement that cannot tell good parts from bad is worse than no measurement at all: it creates false confidence." },

        { type: "h", text: "Key properties of a measurement system" },
        { type: "table", head: ["Property", "Definition", "What it means in practice"], rows: [
          ["Resolution (discrimination)", "The smallest increment the instrument can detect", "A ruler graduated in millimetres has a resolution of 1 mm; a vernier caliper reading to 0.02 mm has 50 times finer resolution"],
          ["Accuracy", "Closeness of the average of measurements to the true (reference) value", "A micrometer that reads 10.003 when the gauge block is 10.000 has an accuracy offset of +0.003"],
          ["Precision", "Closeness of repeated measurements to each other", "Ten readings of the same shaft within a 0.004 mm range show good precision, even if they are all 0.010 high (biased)"],
          ["Bias", "The systematic difference between the average measured value and the reference value", "Average reading minus reference value; a positive bias means the system reads high"],
          ["Linearity", "Change in bias over the operating range of the instrument", "A gauge may have zero bias at 5 mm but a bias of +0.02 at 25 mm — linearity quantifies this trend"],
          ["Stability (drift)", "Change in bias over time", "The same master part, measured every morning at 07:00, shows readings drifting upward over six months"],
          ["Repeatability", "Variation when the same operator measures the same part with the same instrument under the same conditions", "Also called equipment variation (EV); reflects the instrument's inherent variability"],
          ["Reproducibility", "Variation when different operators (or conditions) measure the same part", "Also called appraiser variation (AV); reflects the effect of the human element"],
        ] },

        { type: "callout", tone: "key", title: "Accuracy vs precision", text: "A measurement system can be precise but inaccurate (tight group, wrong centre), accurate but imprecise (correct on average, wide scatter), or both accurate and precise (tight group, right centre). In quality engineering, we need both. Precision problems are detected with Gage R&R studies; accuracy problems with bias studies against traceable reference standards." },

        { type: "h", text: "The discrimination ratio (ndc)" },
        { type: "p", text: "The AIAG MSA manual defines the **number of distinct categories (ndc)** as the number of non-overlapping confidence intervals that span the range of product variation. It tells you how many groups the measurement system can reliably distinguish. The formula is:" },
        { type: "code", text: "ndc = 1.41 × (PV / GRR)" },
        { type: "p", text: "where PV is the part variation and GRR is the combined gauge repeatability and reproducibility. The ndc is truncated to a whole number. The AIAG acceptance criterion requires ndc >= 5: the measurement system must be able to divide the product variation into at least five distinct groups. An ndc of 2 or 3 means the gauge can barely tell large parts from small ones; an ndc of 1 means it cannot distinguish parts at all." },

        { type: "callout", tone: "tip", title: "Rule of thumb for resolution", text: "The instrument's resolution should be at most one-tenth of the tolerance. For a 22.00 +/- 0.05 mm dimension (tolerance range = 0.10 mm), the instrument should read to at least 0.01 mm. A ruler graduated in millimetres would be far too coarse." },

        { type: "h", text: "Sources of measurement variation" },
        { type: "p", text: "Measurement variation is not a single number — it comes from multiple sources that combine. Understanding these sources helps you target improvements. The fishbone diagram below organises them into five categories, often called the 5M of measurement." },
        { type: "list", items: [
          "**Instrument**: resolution, calibration drift, worn anvils, elastic deformation, zeroing error",
          "**Operator (appraiser)**: reading technique, applied force, parallax, fatigue, training level",
          "**Environment**: temperature (thermal expansion), humidity, vibration, lighting, cleanliness",
          "**Method**: fixturing, measurement point location, number of readings, rounding convention",
          "**Part (workpiece)**: surface finish, form error, within-part variation, elastic deformation under contact",
        ] },

        { type: "equip", title: "Common measuring instruments", items: [
          { art: "vernier-caliper", name: "Vernier caliper", caption: "Reads to 0.02 mm. Used for external, internal and depth measurements up to 150 or 300 mm.", specs: [{ label: "Resolution", value: "0.02 mm" }, { label: "Range", value: "0–150 mm" }] },
          { art: "outside-micrometer", name: "Outside micrometer", caption: "Reads to 0.01 mm. The thimble and ratchet stop ensure consistent measuring force.", specs: [{ label: "Resolution", value: "0.01 mm" }, { label: "Range", value: "0–25 mm" }] },
        ] },

        { type: "sorter", id: "aqe-m3-l1-fishbone", layout: "fishbone", title: "Classify measurement error sources", task: "Drag each source of measurement variation to the correct category on the fishbone diagram. Consider whether the source relates to the gauge itself, the person using it, the surroundings, the procedure, or the item being measured.", hint: "Temperature affects the part and the gauge through the surroundings. The way you hold the caliper is about technique, not the gauge.",
          effect: "Measurement error",
          buckets: [
            { label: "Instrument", desc: "The gauge or device itself" },
            { label: "Operator", desc: "The person taking the measurement" },
            { label: "Environment", desc: "Surroundings and conditions" },
            { label: "Method", desc: "The measurement procedure" },
            { label: "Part", desc: "The workpiece being measured" },
          ],
          items: [
            { text: "Worn micrometer anvil face", bucket: 0, explain: "A physical defect of the instrument that causes systematic error." },
            { text: "Operator applies too much force on the caliper jaws", bucket: 1, explain: "Measuring force depends on the person's technique and training." },
            { text: "Workshop temperature rises to 38 degrees C during the afternoon", bucket: 2, explain: "Thermal expansion of the part and the gauge is an environmental effect." },
            { text: "No fixture specified — part held by hand at varying angles", bucket: 3, explain: "How the part is held and located is part of the measurement method." },
            { text: "Surface roughness varies between machined and cast faces", bucket: 4, explain: "Variation in the workpiece surface affects where the gauge contacts it." },
            { text: "Parallax error when reading the vernier scale at an angle", bucket: 1, explain: "Reading angle is a human factor, not an instrument defect." },
            { text: "Calibration certificate expired three months ago", bucket: 0, explain: "Calibration status is a property of the instrument." },
            { text: "Vibration from the stamping press next to the CMM room", bucket: 2, explain: "Vibration is an environmental disturbance." },
            { text: "Measurement taken at the edge of the bore instead of the true diameter", bucket: 3, explain: "Choosing the wrong measurement location is a method error." },
            { text: "Elastic deformation of thin-walled plastic part under contact pressure", bucket: 4, explain: "The part deforms because of its geometry and material — a part characteristic." },
          ],
        },

        { type: "form", id: "aqe-m3-l1-form", title: "Identify the violated property", task: "For each scenario, select the measurement system property that is most directly violated or deficient.",
          fields: [
            { kind: "select", label: "An outside micrometer reads 10.012, 10.014, 10.010, 10.013, 10.011 mm on the same gauge block (reference value 10.000 mm). The readings are tight but consistently high.", options: ["Repeatability", "Reproducibility", "Bias", "Linearity", "Resolution"], answer: 2, explain: "The readings cluster tightly (good repeatability) but their average is about 0.012 mm above the true value — this is a bias problem." },
            { kind: "select", label: "A dial indicator reads to 0.1 mm, but the tolerance on the part is +/- 0.05 mm (range = 0.10 mm).", options: ["Bias", "Stability", "Resolution", "Reproducibility", "Linearity"], answer: 2, explain: "The resolution equals the entire tolerance range. The instrument cannot distinguish parts near the limits from parts at nominal — it lacks discrimination." },
            { kind: "select", label: "Operator A consistently reads 0.006 mm lower than Operator B on the same set of parts.", options: ["Repeatability", "Reproducibility", "Stability", "Bias", "Linearity"], answer: 1, explain: "Different results from different operators is a reproducibility problem (appraiser variation)." },
            { kind: "select", label: "The same reference standard, measured every Monday morning, shows a gradual upward trend of 0.002 mm per month over the past six months.", options: ["Repeatability", "Bias", "Linearity", "Stability", "Resolution"], answer: 3, explain: "A change in measurement values over time, with all other conditions held constant, is a stability (drift) issue." },
            { kind: "select", label: "A caliper shows zero bias at 20 mm but reads 0.03 mm high at 120 mm.", options: ["Repeatability", "Bias", "Linearity", "Stability", "Reproducibility"], answer: 2, explain: "When bias changes across the measurement range, this is a linearity problem. (Note: linearity is the change in bias, so it is the most specific answer.)" },
          ],
          hint: "Focus on the pattern: constant offset = bias; growing offset across range = linearity; change over time = stability; person-to-person differences = reproducibility.",
        },

        { type: "check", id: "aqe-m3-l1-c1", question: "A measurement system study reports ndc = 3. What does this mean?", options: [
          "The system can distinguish 3 distinct groups within the product variation — this is adequate for SPC",
          "The system can distinguish 3 distinct groups within the product variation — this is NOT adequate for SPC",
          "The system has 3 sources of variation",
          "The system needs 3 operators to be reliable",
        ], answer: 1, explain: "An ndc of 3 means the gauge can only sort parts into three groups (small, medium, large). The AIAG MSA manual requires ndc >= 5 for the measurement system to be considered adequate for process analysis and SPC." },

        { type: "callout", tone: "workplace", title: "In the workplace", text: "At the Douala brake disc plant, a new inspector was getting different results from the senior technician on the same parts. A quick reproducibility check showed that the new inspector was not using the ratchet stop on the micrometer, applying inconsistent force. After a 20-minute training session, the two operators agreed within 0.003 mm." },

        { type: "links", items: [
          { label: "AIAG MSA 4th edition overview", url: "https://www.aiag.org/quality/automotive-core-tools/msa", source: "AIAG" },
          { label: "Measurement system analysis", url: "https://asq.org/quality-resources/measurement-system-analysis", source: "ASQ" },
        ] },
      ],
    },

    // ═══════════════════════════════ LESSON 2 ═══════════════════════════════
    {
      id: "aqe-m3-l2",
      title: "Gage R&R: the range method",
      minutes: 30,
      objectives: [
        "Design a crossed Gage R&R study: select parts, operators and trial count",
        "Calculate repeatability (EV), reproducibility (AV) and GRR using the range method",
        "Apply the AIAG %GRR acceptance criteria to judge a measurement system",
      ],
      blocks: [
        { type: "p", text: "The Gage R&R study is the core tool of measurement systems analysis. It separates the total observed variation into components due to the measurement system (repeatability and reproducibility) and due to actual part differences. The **range method** is the simplest approach, often called the short study. It uses two or three operators, five to ten parts and two or three trials per operator-part combination." },

        { type: "h", text: "Study design: crossed Gage R&R" },
        { type: "p", text: "In a crossed study, every operator measures every part, and each operator measures each part multiple times (trials). The parts must be selected to represent the full range of normal production variation — do not pick five parts that are all near nominal. The operators should be the people who normally use the gauge. Measurements are taken in random order within each operator, and the operators must not see each other's results." },
        { type: "table", head: ["Factor", "Range method (short study)", "Typical full study"], rows: [
          ["Operators", "2 or 3", "2 or 3"],
          ["Parts", "5 to 10", "10"],
          ["Trials per combination", "2 or 3", "2 or 3"],
          ["Total measurements", "20 to 90", "60 to 90"],
          ["Analysis method", "Range calculations", "ANOVA"],
        ] },

        { type: "callout", tone: "key", title: "AIAG MSA 4th edition constants", text: "The range method uses constants d₂* (which depends on the number of trials and the number of parts × operators) and K₁, K₂, K₃ conversion factors. For a study with 2 operators, 5 parts, 2 trials: K₁ = 4.56 (for 2 trials), K₂ = 3.65 (for 2 operators), K₃ = 2.08 (for 5 parts). These are derived from the d₂* values and are tabulated in the AIAG MSA manual, Appendix C." },

        { type: "h", text: "The range method calculations" },
        { type: "steps", title: "Gage R&R by the range method", items: [
          "For each operator-part combination, compute the range of the trials (max minus min).",
          "Compute R̄ₐ and R̄ᵦ — the average range for each operator across all parts.",
          "Compute R̄ = (R̄ₐ + R̄ᵦ) / number of operators — the overall average range.",
          "Calculate **EV** (equipment variation / repeatability) = R̄ × K₁. For 2 trials, K₁ = 4.56.",
          "Compute Xdiff = |X̄ₐ - X̄ᵦ| — the absolute difference of operator averages across all measurements.",
          "Calculate **AV** (appraiser variation / reproducibility) = √(Xdiff × K₂)² - (EV² / (n × r)), where n = parts, r = trials. If the value under the square root is negative, set AV = 0.",
          "Calculate **GRR** = √(EV² + AV²).",
          "Calculate **PV** (part variation) = Rp × K₃, where Rp is the range of part averages (max part average minus min part average).",
          "Calculate **TV** (total variation) = √(GRR² + PV²).",
          "Calculate **%GRR** = (GRR / TV) × 100.",
        ] },

        { type: "table", head: ["% GRR", "Decision", "Typical action"], rows: [
          ["< 10%", "Acceptable", "Measurement system is adequate for the application"],
          ["10% to 30%", "May be acceptable", "Depends on the importance of the application, cost of the gauge, cost of rework; improvement desirable"],
          ["> 30%", "Unacceptable", "Measurement system must be improved; identify and reduce the dominant source (EV or AV)"],
        ] },

        { type: "callout", tone: "warning", title: "Common pitfall", text: "Do not compute %GRR against the tolerance unless the AIAG manual's %Tolerance method is specifically required. The default AIAG method computes %GRR as a percentage of total variation (TV), which includes part variation. Computing against tolerance can give misleadingly small percentages when the tolerance is wide relative to the process spread." },

        { type: "equip", items: [
          { art: "stat-gage-rr", name: "Gage R&R study output", caption: "Statistical software output showing components of variation, R chart by operator, and Xbar chart by operator." },
        ] },

        { type: "h", text: "Worked example: brake disc thickness" },
        { type: "p", text: "At the Douala brake disc plant, two inspectors (Amina and Bertrand) each measure 5 discs twice with an outside micrometer. The nominal dimension is 22.00 mm with a tolerance of +/- 0.05 mm. We will compute the Gage R&R using the range method with K₁ = 4.56, K₂ = 3.65, K₃ = 2.08." },

        { type: "table", head: ["Part", "Amina T1", "Amina T2", "Range A", "Bertrand T1", "Bertrand T2", "Range B"], rows: [
          ["1", "22.014", "22.018", "0.004", "22.020", "22.016", "0.004"],
          ["2", "21.986", "21.990", "0.004", "21.992", "21.984", "0.008"],
          ["3", "22.008", "22.004", "0.004", "22.012", "22.006", "0.006"],
          ["4", "22.032", "22.028", "0.004", "22.038", "22.030", "0.008"],
          ["5", "21.972", "21.978", "0.006", "21.980", "21.974", "0.006"],
        ] },

        { type: "p", text: "**Step 1–3**: R̄ₐ = (0.004 + 0.004 + 0.004 + 0.004 + 0.006) / 5 = 0.0044. R̄ᵦ = (0.004 + 0.008 + 0.006 + 0.008 + 0.006) / 5 = 0.0064. R̄ = (0.0044 + 0.0064) / 2 = 0.0054." },
        { type: "p", text: "**Step 4**: EV = R̄ × K₁ = 0.0054 × 4.56 = 0.02462." },
        { type: "p", text: "**Step 5**: X̄ₐ = average of all 10 Amina readings = 22.0032. X̄ᵦ = average of all 10 Bertrand readings = 22.0052. Xdiff = |22.0032 - 22.0052| = 0.0020." },
        { type: "p", text: "**Step 6**: AV = sqrt((0.0020 × 3.65)² - (0.02462² / (5 × 2))) = sqrt(0.00730² - 0.0000606) = sqrt(0.00005329 - 0.0000606). Since the value under the square root is negative, AV = 0. The appraiser effect is negligible compared to the equipment variation." },
        { type: "p", text: "**Step 7**: GRR = sqrt(0.02462² + 0²) = 0.02462." },
        { type: "p", text: "**Step 8**: Part averages: 22.017, 21.988, 22.0075, 22.032, 21.976. Rp = 22.032 - 21.976 = 0.056. PV = 0.056 × 2.08 = 0.11648." },
        { type: "p", text: "**Step 9**: TV = sqrt(0.02462² + 0.11648²) = sqrt(0.000606 + 0.013568) = sqrt(0.014174) = 0.11906." },
        { type: "p", text: "**Step 10**: %GRR = (0.02462 / 0.11906) × 100 = **20.7%**. This falls in the 10–30% range, meaning the measurement system may be acceptable depending on the application. With ndc = 1.41 × (0.11648 / 0.02462) = 1.41 × 4.73 = 6 (truncated), the ndc >= 5 criterion is met." },

        { type: "sheet", id: "aqe-m3-l2-sheet", title: "Gage R&R range method", task: "Complete the Gage R&R calculations for a micrometer study at the Bafoussam shaft factory. Two operators (Claude and Diane) each measure 5 shaft diameters twice. Use K₁ = 4.56, K₂ = 3.65, K₃ = 2.08. Fill in the yellow cells.", hint: "Start by computing each operator's range per part, then average the ranges. EV = R-bar × K₁. Remember that if the value under the square root for AV is negative, AV = 0.",
          data: [
            ["Part", "Claude T1", "Claude T2", "Range C", "Diane T1", "Diane T2", "Range D"],
            [1, 18.012, 18.016, null, 18.018, 18.014, null],
            [2, 17.994, 17.998, null, 17.998, 17.992, null],
            [3, 18.006, 18.002, null, 18.010, 18.006, null],
            [4, 18.028, 18.024, null, 18.034, 18.026, null],
            [5, 17.978, 17.984, null, 17.984, 17.976, null],
            ["", "", "", "", "", "", ""],
            ["R-bar C", null, "", "", "R-bar D", null, ""],
            ["R-bar", null, "", "", "", "", ""],
            ["EV", null, "", "", "", "", ""],
            ["Xdiff", null, "", "", "", "", ""],
            ["AV", null, "", "", "", "", ""],
            ["GRR", null, "", "", "", "", ""],
            ["PV", null, "", "", "", "", ""],
            ["TV", null, "", "", "", "", ""],
            ["%GRR", null, "", "", "", "", ""],
          ],
          editable: ["D2", "D3", "D4", "D5", "D6", "G2", "G3", "G4", "G5", "G6", "B9", "F9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17"],
          checks: [
            { cell: "D2", equals: 0.004, tol: 0.001 },
            { cell: "D3", equals: 0.004, tol: 0.001 },
            { cell: "D4", equals: 0.004, tol: 0.001 },
            { cell: "D5", equals: 0.004, tol: 0.001 },
            { cell: "D6", equals: 0.006, tol: 0.001 },
            { cell: "G2", equals: 0.004, tol: 0.001 },
            { cell: "G3", equals: 0.006, tol: 0.001 },
            { cell: "G4", equals: 0.004, tol: 0.001 },
            { cell: "G5", equals: 0.008, tol: 0.001 },
            { cell: "G6", equals: 0.008, tol: 0.001 },
            { cell: "B9", equals: 0.0044, tol: 0.001 },
            { cell: "F9", equals: 0.006, tol: 0.001 },
            { cell: "B10", equals: 0.0052, tol: 0.001 },
            { cell: "B11", equals: 0.0237, tol: 0.003 },
            { cell: "B14", equals: 0.0237, tol: 0.004 },
          ],
          solution: {
            "D2": "0.004", "D3": "0.004", "D4": "0.004", "D5": "0.004", "D6": "0.006",
            "G2": "0.004", "G3": "0.006", "G4": "0.004", "G5": "0.008", "G6": "0.008",
            "B9": "0.0044", "F9": "0.006", "B10": "0.0052", "B11": "0.0237",
            "B12": "0.0020", "B13": "0", "B14": "0.0237", "B15": "0.1133",
            "B16": "0.1158", "B17": "20.5",
          },
        },

        { type: "caliper", id: "aqe-m3-l2-caliper", title: "Measure parts for a Gage R&R trial", task: "You are Operator A in a Gage R&R study at the Douala plant. Measure the outside diameter of each shaft segment using the vernier caliper. Record readings to 0.02 mm.", hint: "Ensure the caliper jaws are fully closed on the workpiece. Read the main scale first, then find the vernier division that aligns with a main scale division.",
          instrument: "vernier",
          drawing: { kind: "shaft", title: "Stepped shaft — Gage R&R parts", segments: [{ d: "18.00", l: "25" }, { d: "22.00", l: "30" }, { d: "16.00", l: "20" }] },
          drawingUnit: "mm",
          dims: [
            { id: "d1", label: "Diameter A", nominal: 18.00, tolPlus: 0.05, tolMinus: -0.05 },
            { id: "d2", label: "Diameter B", nominal: 22.00, tolPlus: 0.05, tolMinus: -0.05 },
            { id: "d3", label: "Diameter C", nominal: 16.00, tolPlus: 0.05, tolMinus: -0.05 },
          ],
          readings: [
            { dim: "d1", label: "Part 1, diameter A", value: 18.02 },
            { dim: "d2", label: "Part 1, diameter B", value: 22.04 },
            { dim: "d3", label: "Part 1, diameter C", value: 15.98 },
            { dim: "d1", label: "Part 2, diameter A", value: 17.96 },
            { dim: "d2", label: "Part 2, diameter B", value: 21.98 },
          ],
        },

        { type: "check", id: "aqe-m3-l2-c1", question: "A Gage R&R study gives %GRR = 28% and ndc = 4. What should you conclude?", options: [
          "The measurement system is acceptable because %GRR < 30%",
          "The measurement system may be acceptable based on %GRR, but ndc < 5 indicates insufficient discrimination",
          "The measurement system is unacceptable because %GRR > 10%",
          "The measurement system is acceptable because both criteria are close to the limits",
        ], answer: 1, explain: "A %GRR of 28% is in the marginal 10-30% zone (may be acceptable), but an ndc of 4 is below the minimum of 5 required by AIAG. Both criteria should be considered. The measurement system needs improvement to achieve adequate discrimination." },

        { type: "callout", tone: "workplace", title: "In the workplace", text: "At the Bafoussam shaft factory, the quality team ran a range-method Gage R&R on the new digital micrometer. The %GRR came in at 8.2% with ndc = 9. The measurement system was approved and the micrometer was placed on the production floor with a green calibration label. They repeat the study annually or whenever the instrument is repaired." },

        { type: "links", items: [
          { label: "Gage repeatability and reproducibility", url: "https://asq.org/quality-resources/gage-repeatability", source: "ASQ" },
          { label: "AIAG MSA Reference Manual", url: "https://www.aiag.org/quality/automotive-core-tools/msa", source: "AIAG" },
        ] },
      ],
    },

    // ═══════════════════════════════ LESSON 3 ═══════════════════════════════
    {
      id: "aqe-m3-l3",
      title: "Gage R&R: the ANOVA method",
      minutes: 30,
      objectives: [
        "Explain how the ANOVA method decomposes total variation into part, operator, interaction and repeatability components",
        "Interpret the ANOVA table and variance components from software output",
        "Calculate and interpret the number of distinct categories (ndc) from ANOVA results",
        "Read and interpret R chart by operator and Xbar chart by operator in software output",
      ],
      blocks: [
        { type: "p", text: "The ANOVA (Analysis of Variance) method is the preferred approach for Gage R&R studies in the AIAG MSA 4th edition. It has two key advantages over the range method: it can detect an **operator × part interaction** (some operators measure certain parts differently) and it provides more precise estimates of the variance components. Most statistical software packages — Minitab, JMP, SAS — include a Gage R&R ANOVA routine." },

        { type: "h", text: "Variance decomposition" },
        { type: "p", text: "The ANOVA method partitions the total variation in the measurements into four sources:" },
        { type: "list", items: [
          "**Part variation (PV)**: real differences between the parts in the study",
          "**Operator (appraiser) variation (AV)**: systematic differences between operators — one consistently reads higher or lower",
          "**Operator × Part interaction**: some operators measure certain parts differently; for example, Operator A reads large parts high but small parts low, while Operator B does not",
          "**Repeatability (EV)**: residual variation — the variation left when part, operator and interaction effects are removed; this is the equipment variation",
        ] },
        { type: "code", text: "Total variance = σ²_part + σ²_operator + σ²_interaction + σ²_repeatability\nGRR variance  = σ²_operator + σ²_interaction + σ²_repeatability\n%GRR          = 100 × √(σ²_GRR) / √(σ²_total)\nndc           = 1.41 × √(σ²_part) / √(σ²_GRR)    (truncate to integer)" },

        { type: "callout", tone: "key", title: "When interaction is not significant", text: "If the p-value for the operator × part interaction is greater than 0.05 (at the 95% confidence level, which is common in practice and the default in most MSA software — though the AIAG manual recommends 0.25), the interaction term is pooled into repeatability. This simplifies the model and often increases the degrees of freedom for the repeatability estimate, giving a more precise result." },

        { type: "h", text: "Interpreting software output" },
        { type: "p", text: "Software produces several key outputs from a Gage R&R ANOVA study. Understanding each one is essential for making correct decisions about the measurement system." },

        { type: "equip", items: [
          { art: "stat-gage-rr", name: "Gage R&R ANOVA output", caption: "The standard output includes: (1) ANOVA table with sources, DF, SS, MS, F and p-value; (2) variance components table with σ² estimates, % Contribution, and % Study Variation; (3) R chart by operator; (4) Xbar chart by operator; (5) Measurement by part graph." },
        ] },

        { type: "table", head: ["Output", "What to look for", "Good result"], rows: [
          ["ANOVA table: Part p-value", "Is the part effect significant?", "p < 0.05 — the parts are truly different (good: you selected parts spanning the process range)"],
          ["ANOVA table: Operator p-value", "Is there a significant difference between operators?", "p > 0.05 — no significant operator effect; if p < 0.05, investigate training or technique"],
          ["ANOVA table: Interaction p-value", "Do operators measure certain parts differently?", "p > 0.05 — no interaction; if significant, investigate why specific part-operator combinations differ"],
          ["% Contribution of GRR", "What fraction of total variance comes from the measurement system?", "< 1% excellent, 1–9% acceptable; this is the squared version of %Study Var"],
          ["% Study Variation of GRR", "The %GRR: what fraction of total spread (6σ) comes from the measurement system?", "< 10% acceptable, 10–30% marginal, > 30% unacceptable"],
          ["R chart by operator", "Is each operator's repeatability consistent across parts?", "All ranges within control limits; no operator has notably wider ranges"],
          ["Xbar chart by operator", "Can the gauge detect part-to-part differences?", "Most points outside control limits — this is GOOD: the gauge can tell parts apart"],
          ["ndc", "Number of distinct categories", ">= 5"],
        ] },

        { type: "callout", tone: "tip", title: "Xbar chart paradox", text: "On a normal process control chart, points beyond the limits signal trouble. On the Xbar chart in a Gage R&R study, the opposite is true: points beyond the limits mean the gauge CAN detect part differences. If most points are inside the limits, the gauge cannot distinguish parts — the measurement system is poor." },

        { type: "h", text: "Worked example: piston pin diameter" },
        { type: "p", text: "At the Douala engine components plant, three operators (Amina, Bertrand, Carine) each measure 10 piston pins three times with a digital micrometer. The nominal diameter is 18.000 mm, tolerance +/- 0.008 mm. The ANOVA output (from statistical software) gives these variance components:" },
        { type: "table", head: ["Source", "Variance (σ²)", "% Contribution"], rows: [
          ["Part", "0.00001824", "89.42%"],
          ["Operator", "0.00000078", "3.82%"],
          ["Operator × Part", "0.00000012", "0.59%"],
          ["Repeatability", "0.00000126", "6.17%"],
          ["Total", "0.00002040", "100.00%"],
        ] },
        { type: "p", text: "GRR variance = 0.00000078 + 0.00000012 + 0.00000126 = 0.00000216. σ_GRR = sqrt(0.00000216) = 0.001470. σ_total = sqrt(0.00002040) = 0.004517. %GRR (study variation) = (0.001470 / 0.004517) × 100 = **32.5%**. This exceeds 30% and is unacceptable. The dominant source is repeatability (equipment variation) at 6.17% contribution, followed by operator at 3.82%." },
        { type: "p", text: "σ_part = sqrt(0.00001824) = 0.004271. ndc = 1.41 × (0.004271 / 0.001470) = 1.41 × 2.91 = **4** (truncated). With ndc = 4 (< 5), the gauge cannot adequately distinguish the parts. Action: investigate the micrometer (repeatability is the main issue), check calibration, consider upgrading to a higher-resolution instrument." },

        { type: "sheet", id: "aqe-m3-l3-sheet", title: "ANOVA Gage R&R calculation", task: "Given the ANOVA variance components for a bore gauge study at the Bafoussam plant, compute the GRR metrics. Three operators measured 8 parts, 2 trials each.",
          hint: "GRR variance = sum of operator, interaction and repeatability variances. %GRR = 100 × σ_GRR / σ_total.",
          data: [
            ["Source", "Variance (σ²)", "% Contribution"],
            ["Part", 0.000450, ""],
            ["Operator", 0.000012, ""],
            ["Op × Part", 0.000005, ""],
            ["Repeatability", 0.000033, ""],
            ["Total", null, ""],
            ["", "", ""],
            ["GRR variance", null, ""],
            ["σ_GRR", null, ""],
            ["σ_total", null, ""],
            ["%GRR", null, ""],
            ["ndc", null, ""],
          ],
          editable: ["B6", "B8", "B9", "B10", "B11", "B12"],
          checks: [
            { cell: "B6", equals: 0.000500, tol: 0.00001 },
            { cell: "B8", equals: 0.000050, tol: 0.00001 },
            { cell: "B9", equals: 0.00707, tol: 0.001 },
            { cell: "B10", equals: 0.02236, tol: 0.001 },
            { cell: "B11", equals: 31.6, tol: 2 },
            { cell: "B12", equals: 4, tol: 0.5 },
          ],
          solution: {
            "B6": "0.000500", "B8": "0.000050", "B9": "0.00707",
            "B10": "0.02236", "B11": "31.6", "B12": "4",
          },
        },

        { type: "form", id: "aqe-m3-l3-form", title: "Interpret Gage R&R software output", task: "A Gage R&R ANOVA study on a dial indicator at the Douala plant produced the results below. Answer the interpretation questions.",
          fields: [
            { kind: "select", label: "The ANOVA table shows: Part p-value = 0.001, Operator p-value = 0.42, Interaction p-value = 0.78. Which effects are statistically significant at the 0.05 level?", options: ["Part only", "Part and operator", "All three effects", "None of them"], answer: 0, explain: "Only the part effect has p < 0.05 (p = 0.001). The operator (p = 0.42) and interaction (p = 0.78) are not significant, meaning operators measure consistently and there is no operator-part interaction." },
            { kind: "select", label: "The % Study Variation for GRR is 14.2% and ndc = 7. What is the overall assessment?", options: ["Acceptable — both criteria met", "Marginal — %GRR in the 10–30% range, but ndc >= 5 is met", "Unacceptable — %GRR exceeds 10%", "Cannot determine without more information"], answer: 1, explain: "A %GRR of 14.2% falls in the 10–30% marginal zone. The ndc of 7 exceeds the minimum of 5, so the gauge can distinguish parts adequately. The overall assessment is 'may be acceptable' depending on the application." },
            { kind: "select", label: "On the R chart by operator, Operator C has two points above the upper control limit. What does this suggest?", options: ["Operator C measures parts more accurately", "Operator C has inconsistent measurement technique on those parts", "The instrument is out of calibration for Operator C", "The control limits are set too tight"], answer: 1, explain: "Points beyond the R chart UCL mean that operator's trial-to-trial variation on those parts was unusually large. This suggests inconsistent technique — perhaps Operator C positions the part differently sometimes." },
            { kind: "select", label: "On the Xbar chart by operator, nearly all points fall within the control limits. Is this good or bad?", options: ["Good — the process is in control", "Bad — the gauge cannot detect part-to-part differences", "Good — the operators are consistent", "Bad — the parts were not selected properly"], answer: 1, explain: "In a Gage R&R Xbar chart, points within the limits mean the gauge variation is large relative to part variation. The gauge cannot reliably tell parts apart. Points OUTSIDE the limits are desirable here." },
          ],
          hint: "Remember: in a Gage R&R context, the Xbar chart interpretation is the opposite of a normal SPC chart. Points beyond the limits are good because they show the gauge can detect real part differences.",
        },

        { type: "check", id: "aqe-m3-l3-c1", question: "In an ANOVA Gage R&R study, the operator × part interaction is significant (p = 0.02). What is the most likely practical meaning?", options: [
          "Some operators consistently read higher than others on all parts",
          "Some operators measure certain parts differently — for example, one reads large parts high but another does not",
          "The repeatability of the gauge is poor",
          "The parts in the study do not represent the process range",
        ], answer: 1, explain: "A significant interaction means the operator effect is not the same for all parts. One operator may have particular difficulty with certain part geometries, fixtures, or sizes. This is different from a main operator effect (option A), which would be a consistent bias." },

        { type: "callout", tone: "workplace", title: "In the workplace", text: "At the Douala piston pin line, the ANOVA study revealed that the main source of GRR was repeatability (the micrometer itself), not the operators. The quality engineer recommended replacing the mechanical micrometer with a digital model having a data output port. The new study showed %GRR = 9.8% and ndc = 8 — both within acceptance criteria." },

        { type: "links", items: [
          { label: "Gage R&R ANOVA method", url: "https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/gage_rr.htm", source: "NIST/SEMATECH e-Handbook" },
          { label: "AIAG core tools: MSA", url: "https://www.aiag.org/quality/automotive-core-tools/msa", source: "AIAG" },
        ] },
      ],
    },

    // ═══════════════════════════════ LESSON 4 ═══════════════════════════════
    {
      id: "aqe-m3-l4",
      title: "Attribute measurement systems analysis",
      minutes: 25,
      objectives: [
        "Design an attribute agreement analysis study with parts, appraisers and trials",
        "Calculate and interpret Cohen's kappa and Fleiss' kappa statistics",
        "Compute effectiveness, miss rate and false alarm rate from attribute MSA results",
      ],
      blocks: [
        { type: "p", text: "Not all inspection is measurement with numbers. Many quality decisions are attribute judgements: pass/fail, good/bad, class A/B/C. Visual inspection of welds, cosmetic grading of painted surfaces, and go/no-go gauge checks all produce attribute data. The attribute measurement system analysis evaluates whether appraisers agree with each other and with a known reference standard. If two inspectors look at the same weld and one says pass while the other says fail, the inspection process is not reliable." },

        { type: "h", text: "Attribute agreement analysis study design" },
        { type: "table", head: ["Parameter", "Guideline"], rows: [
          ["Parts", "At least 30, preferably 50; include borderline parts near the accept/reject boundary"],
          ["Appraisers", "At least 2, ideally 3; the people who normally perform the inspection"],
          ["Trials", "At least 2 per appraiser-part combination; parts presented in random order each trial"],
          ["Reference", "A known correct classification for each part, determined by an expert or gold standard"],
        ] },

        { type: "callout", tone: "key", title: "Why borderline parts matter", text: "If you only include obviously good and obviously bad parts, everyone will agree — and the study will overestimate the system's capability. Include parts near the accept/reject boundary, where real disagreements happen in production. About one-third of the sample should be borderline." },

        { type: "h", text: "Cohen's kappa and Fleiss' kappa" },
        { type: "p", text: "Simple percent agreement overstates the true agreement because some agreement happens by chance. **Cohen's kappa (κ)** corrects for chance agreement between two raters:" },
        { type: "code", text: "κ = (P_observed - P_expected) / (1 - P_expected)" },
        { type: "p", text: "where P_observed is the proportion of cases where the two raters agree, and P_expected is the proportion expected by chance alone. For three or more raters, use **Fleiss' kappa**, which generalises the concept." },

        { type: "table", head: ["Kappa range", "Interpretation"], rows: [
          ["< 0.20", "Poor agreement"],
          ["0.21 – 0.40", "Fair agreement"],
          ["0.41 – 0.60", "Moderate agreement"],
          ["0.61 – 0.80", "Substantial agreement"],
          ["0.81 – 1.00", "Almost perfect agreement"],
        ] },

        { type: "h", text: "Effectiveness, miss rate and false alarm rate" },
        { type: "p", text: "Beyond agreement, we also evaluate how well each appraiser matches the reference standard:" },
        { type: "list", items: [
          "**Effectiveness** = (correct decisions / total decisions) × 100%. Target: >= 90%",
          "**Miss rate** = (defective parts called good / total defective parts) × 100%. This is the most dangerous error — bad parts reach the customer",
          "**False alarm rate** = (good parts called defective / total good parts) × 100%. This wastes parts and creates rework",
        ] },

        { type: "callout", tone: "warning", title: "Miss rate is worse than false alarm rate", text: "In most quality systems, missing a defective part (shipping it to the customer) is far more costly than falsely rejecting a good part. When miss rate is high, add inspection aids (lighting, magnification, reference samples), retrain the inspectors, or automate the inspection." },

        { type: "h", text: "Worked example: weld inspection" },
        { type: "p", text: "At the Douala structural steel workshop, three inspectors (Amina, Bertrand, Carine) each inspect 30 welded joints twice. Each joint has a known reference classification (pass or fail) determined by a certified welding inspector. We compare each appraiser's decisions to the reference." },
        { type: "p", text: "For Appraiser A (Amina), Trial 1 vs reference: 29 agreements out of 30. Trial 2 vs reference: 29 agreements out of 30 (one different disagreement). Within-appraiser agreement (Trial 1 vs Trial 2): 29 out of 30. Appraiser A vs reference (combining both trials): P_observed = 58/60 = 0.967." },

        { type: "form", id: "aqe-m3-l4-form", title: "Calculate and interpret kappa", task: "An attribute MSA study at the Bafoussam paint shop has two inspectors grading 40 painted panels as Pass or Fail. Calculate kappa and interpret the results.",
          fields: [
            { kind: "text", label: "Inspector A says Pass on 28 panels, Fail on 12. Inspector B says Pass on 26 panels, Fail on 14. They agree on 34 out of 40 panels. What is P_observed?", accept: ["0.85", "0.850", "34/40", "85%"], example: "0.85", explain: "P_observed = agreements / total = 34 / 40 = 0.85." },
            { kind: "text", label: "P(A says Pass) = 28/40 = 0.70. P(B says Pass) = 26/40 = 0.65. P(A says Fail) = 12/40 = 0.30. P(B says Fail) = 14/40 = 0.35. P_expected = (0.70 × 0.65) + (0.30 × 0.35) = ? (round to 3 decimal places)", accept: ["0.560", "0.56"], example: "0.560", explain: "P_expected = P(both say Pass by chance) + P(both say Fail by chance) = (0.70 × 0.65) + (0.30 × 0.35) = 0.455 + 0.105 = 0.560." },
            { kind: "text", label: "Calculate kappa = (P_observed - P_expected) / (1 - P_expected). Round to 2 decimal places.", accept: ["0.66", "0.659", "0.65", "0.67"], example: "0.66", explain: "κ = (0.85 - 0.560) / (1 - 0.560) = 0.290 / 0.440 = 0.659, which rounds to 0.66." },
            { kind: "select", label: "Based on the kappa value, how would you classify the agreement?", options: ["Poor", "Fair", "Moderate", "Substantial", "Almost perfect"], answer: 3, explain: "A kappa of 0.66 falls in the 0.61–0.80 range, indicating substantial agreement. While not perfect, this is generally considered adequate for production inspection." },
            { kind: "select", label: "Of the 6 disagreements, 4 were cases where one inspector called a good panel defective (false alarm) and 2 were cases where one inspector passed a defective panel (miss). Which type of disagreement is more concerning?", options: ["The 4 false alarms — they waste good panels", "The 2 misses — defective panels could reach the customer", "Both are equally concerning", "Neither is concerning at this volume"], answer: 1, explain: "Misses are always more concerning because defective parts reach the customer. Even though there are fewer misses, each one represents a quality escape." },
          ],
          hint: "P_expected accounts for the agreement you would get if both inspectors were classifying randomly with their observed rates. Kappa removes this chance component.",
        },

        { type: "sheet", id: "aqe-m3-l4-sheet", title: "Attribute MSA calculations", task: "Complete the attribute MSA summary for three appraisers inspecting 50 parts at the Douala welding shop. The reference standard identified 20 defective parts and 30 good parts.",
          hint: "Effectiveness = correct / total. Miss rate = missed defectives / total defectives. False alarm rate = falsely rejected good / total good.",
          data: [
            ["Appraiser", "Correct", "Missed defectives", "False alarms", "Effectiveness %", "Miss rate %", "False alarm rate %"],
            ["Amina", 47, 2, 1, null, null, null],
            ["Bertrand", 44, 4, 2, null, null, null],
            ["Carine", 46, 1, 3, null, null, null],
          ],
          editable: ["E2", "F2", "G2", "E3", "F3", "G3", "E4", "F4", "G4"],
          checks: [
            { cell: "E2", equals: 94, tol: 1 },
            { cell: "F2", equals: 10, tol: 1 },
            { cell: "G2", equals: 3.3, tol: 0.5 },
            { cell: "E3", equals: 88, tol: 1 },
            { cell: "F3", equals: 20, tol: 1 },
            { cell: "G3", equals: 6.7, tol: 0.5 },
            { cell: "E4", equals: 92, tol: 1 },
            { cell: "F4", equals: 5, tol: 1 },
            { cell: "G4", equals: 10, tol: 1 },
          ],
          solution: {
            "E2": "94.0", "F2": "10.0", "G2": "3.3",
            "E3": "88.0", "F3": "20.0", "G3": "6.7",
            "E4": "92.0", "F4": "5.0", "G4": "10.0",
          },
        },

        { type: "check", id: "aqe-m3-l4-c1", question: "An attribute MSA gives a kappa of 0.45 between two inspectors. What action is most appropriate?", options: [
          "Accept the measurement system — kappa is positive",
          "Investigate the source of disagreements, particularly borderline parts, and provide retraining or better reference standards",
          "Replace both inspectors immediately",
          "Increase the sample size to improve kappa",
        ], answer: 1, explain: "A kappa of 0.45 indicates only moderate agreement. The inspectors disagree too often for reliable inspection. The correct response is to investigate where they disagree (usually borderline parts), provide reference samples, better lighting or magnification, and retrain. Increasing sample size does not improve agreement — it only estimates it more precisely." },

        { type: "callout", tone: "workplace", title: "In the workplace", text: "At the Douala welding shop, the attribute MSA revealed that Bertrand had a miss rate of 20% — one in five defective welds was passed. The root cause was poor lighting at his inspection station. After installing LED strip lights and providing magnifying lenses, a repeat study showed his miss rate dropped to 5% and kappa improved from 0.58 to 0.84." },

        { type: "links", items: [
          { label: "Attribute agreement analysis", url: "https://asq.org/quality-resources/attribute-agreement-analysis", source: "ASQ" },
        ] },
      ],
    },

    // ═══════════════════════════════ LESSON 5 ═══════════════════════════════
    {
      id: "aqe-m3-l5",
      title: "Bias, linearity, stability and measurement uncertainty",
      minutes: 25,
      objectives: [
        "Conduct and interpret a bias study by comparing measured values to traceable reference values",
        "Conduct and interpret a linearity study assessing bias across the measurement range",
        "Monitor measurement stability using a control chart of a reference standard",
        "Distinguish Type A and Type B evaluation of measurement uncertainty using the GUM approach",
      ],
      blocks: [
        { type: "p", text: "Gage R&R studies address precision (repeatability and reproducibility), but a measurement system must also be assessed for accuracy-related properties. Bias, linearity and stability studies complete the picture by examining how close the measurements are to the true value, how that closeness changes across the range, and whether it changes over time. The GUM (Guide to the expression of Uncertainty in Measurement) framework then combines all sources into a single statement of measurement uncertainty." },

        { type: "h", text: "Bias study" },
        { type: "p", text: "A bias study compares the average of repeated measurements to a traceable reference value. The reference is typically a calibrated gauge block, a master part measured on a CMM, or a certified reference material." },
        { type: "steps", title: "Conducting a bias study", items: [
          "Obtain a traceable reference standard with a known value within the normal measurement range.",
          "Have one appraiser measure the reference standard at least 10 times (AIAG recommends 12 or more), under normal operating conditions.",
          "Compute the average of the measurements: X̄.",
          "Compute the bias: Bias = X̄ - Reference value.",
          "Compute the repeatability standard deviation s of the measurements.",
          "Test whether the bias is statistically significant: t = Bias / (s / √n). Compare with t_critical at the chosen confidence level.",
          "If the bias is significant and exceeds acceptable limits, recalibrate the instrument or investigate the cause.",
        ] },

        { type: "equip", title: "Bias study equipment", items: [
          { art: "gauge-blocks", name: "Gauge blocks (slip gauges)", caption: "Grade 1 gauge blocks, traceable to national standards, used as reference values for bias and linearity studies.", specs: [{ label: "Accuracy", value: "+/- 0.5 micrometre" }, { label: "Material", value: "Steel or ceramic" }] },
          { art: "calibration-label", name: "Calibration label", caption: "Applied to the instrument after successful calibration, showing the date, next due date, and the responsible metrologist.", specs: [{ label: "Validity", value: "12 months typical" }, { label: "Standard", value: "ISO 17025" }] },
        ] },

        { type: "h", text: "Linearity study" },
        { type: "p", text: "A linearity study checks whether the bias changes across the operating range. The AIAG MSA manual recommends selecting at least 5 reference standards evenly spaced across the range and measuring each one at least 12 times. Plot the individual biases (each reading minus the reference) against the reference value and fit a regression line:" },
        { type: "code", text: "Bias_i = a + b × Reference_i + error\nIf b ≈ 0 and a ≈ 0 → no linearity problem and no significant bias\nIf b ≈ 0 and a ≠ 0 → constant bias (linearity OK, recalibrate)\nIf b ≠ 0          → linearity problem (bias changes across the range)" },
        { type: "p", text: "In the worked example earlier in this module, a gauge showed biases of approximately +0.01 at 2 mm, +0.03 at 4 mm, +0.07 at 6 mm, +0.11 at 8 mm and +0.16 at 10 mm. The increasing bias across the range is a clear linearity problem — the regression slope b is significantly different from zero. This gauge should be repaired or replaced; simple recalibration at one point will not fix a linearity issue." },

        { type: "callout", tone: "key", title: "Linearity vs bias", text: "A bias study at a single reference point cannot detect a linearity problem. If you calibrate a gauge at 10 mm and declare it unbiased, it may still have a significant bias at 2 mm or 25 mm. Always test at multiple points across the range." },

        { type: "h", text: "Stability study" },
        { type: "p", text: "A stability study monitors a measurement system over time to detect drift. The simplest approach is to measure the same reference standard at regular intervals (daily, weekly) and plot the results on an individuals and moving range (I-MR) control chart. The control limits are computed from the data using standard SPC methods." },
        { type: "list", items: [
          "Select a traceable reference standard, preferably near the middle of the operating range",
          "Measure it under the same conditions at regular intervals — the AIAG MSA manual suggests 3 to 5 readings per interval, at least 20 intervals",
          "Plot the subgroup averages on an X-bar chart or individual values on an I chart",
          "If a point falls beyond the control limits, or a trend or run appears, investigate: the instrument may need recalibration, the environment may have changed, or the reference standard itself may be damaged",
        ] },

        { type: "callout", tone: "tip", title: "Stability is a prerequisite", text: "A measurement system that is not stable cannot be reliably assessed for bias, linearity or GRR. Always verify stability first. If the control chart shows special causes, address them before conducting other studies." },

        { type: "h", text: "Introduction to measurement uncertainty (GUM)" },
        { type: "p", text: "The **Guide to the expression of Uncertainty in Measurement (GUM)**, published jointly by BIPM, IEC, IFCC, ISO, IUPAC, IUPAP and OIML, provides a framework for combining all sources of measurement error into a single uncertainty statement. The result is expressed as the measured value +/- the expanded uncertainty U, typically at a 95% confidence level (coverage factor k = 2)." },
        { type: "table", head: ["Evaluation type", "Description", "Example"], rows: [
          ["Type A", "Evaluated by statistical analysis of a series of observations", "Standard deviation of 20 repeated measurements of a gauge block: s / √n"],
          ["Type B", "Evaluated by other means: calibration certificates, manufacturer specs, handbook data, experience", "Calibration uncertainty from the certificate: U_cal / k; resolution uncertainty: resolution / (2√3)"],
        ] },
        { type: "p", text: "The combined standard uncertainty u_c is the root sum of squares (RSS) of all Type A and Type B standard uncertainty components:" },
        { type: "code", text: "u_c = √(u_A1² + u_A2² + u_B1² + u_B2² + ...)\nU   = k × u_c    (k = 2 for 95% confidence)" },

        { type: "callout", tone: "warning", title: "GUM is not GRR", text: "Gage R&R evaluates whether a measurement system is adequate for a specific application by comparing its variation to part variation. Measurement uncertainty (GUM) quantifies the doubt in a single measurement result. Both are needed: GRR for process decisions, uncertainty for conformity assessment and calibration." },

        { type: "sheet", id: "aqe-m3-l5-sheet", title: "Bias and linearity calculations", task: "A vernier caliper at the Bafoussam factory is tested against 4 gauge blocks. For each reference value, 10 readings were taken. Compute the average bias at each point and determine whether there is a linearity problem.",
          hint: "Bias = average reading - reference value. If bias increases or decreases consistently across the range, linearity is a concern.",
          data: [
            ["Reference (mm)", "Average reading (mm)", "Bias (mm)"],
            [5.000, 5.008, null],
            [10.000, 10.022, null],
            [15.000, 15.038, null],
            [20.000, 20.056, null],
            ["", "", ""],
            ["Bias range", null, ""],
            ["Linearity concern?", null, ""],
          ],
          editable: ["C2", "C3", "C4", "C5", "B7", "B8"],
          checks: [
            { cell: "C2", equals: 0.008, tol: 0.001 },
            { cell: "C3", equals: 0.022, tol: 0.001 },
            { cell: "C4", equals: 0.038, tol: 0.001 },
            { cell: "C5", equals: 0.056, tol: 0.001 },
            { cell: "B7", equals: 0.048, tol: 0.002 },
          ],
          solution: {
            "C2": "0.008", "C3": "0.022", "C4": "0.038", "C5": "0.056",
            "B7": "0.048", "B8": "Yes",
          },
        },

        { type: "form", id: "aqe-m3-l5-form", title: "Interpret a stability chart", task: "A bore gauge is monitored by measuring a 25.000 mm reference ring daily for 25 days. The I-MR control chart shows the following patterns. Interpret each observation.",
          fields: [
            { kind: "select", label: "Days 1–18: all individual values fall randomly between the control limits (UCL = 25.006, LCL = 24.994, CL = 25.000). What is the status of the measurement system?", options: ["Stable — common-cause variation only", "Unstable — action required", "Cannot determine without more data", "The limits are too wide"], answer: 0, explain: "Random variation within the control limits indicates a stable measurement system. No special causes are present." },
            { kind: "select", label: "Days 19–25: seven consecutive points fall below the centre line (all between 24.994 and 24.998). What signal does this represent?", options: ["Normal variation — still within limits", "A run below the centre line — possible systematic shift downward", "An upward trend", "Evidence of poor repeatability"], answer: 1, explain: "Seven consecutive points on one side of the centre line is a Western Electric run rule violation. The gauge may be drifting low, indicating a stability issue. Investigate and recalibrate." },
            { kind: "select", label: "What should the quality engineer do first?", options: ["Continue monitoring and wait for a point beyond the control limits", "Recalibrate the bore gauge against a traceable reference ring", "Replace the bore gauge immediately", "Increase the measurement frequency to twice daily"], answer: 1, explain: "A run signal warrants investigation. The first step is to recalibrate the gauge against the traceable reference ring. If the recalibration shows the gauge has drifted, adjust it and resume monitoring." },
          ],
          hint: "The Western Electric rules apply to stability charts the same way they apply to any control chart. Seven points on one side of the centre line is a run signal.",
        },

        { type: "check", id: "aqe-m3-l5-c1", question: "A calibration certificate states an expanded uncertainty of U = 0.004 mm with k = 2. What is the standard uncertainty of this calibration source (a Type B component)?", options: [
          "0.004 mm",
          "0.008 mm",
          "0.002 mm",
          "0.001 mm",
        ], answer: 2, explain: "The expanded uncertainty U = k × u_c. To recover the standard uncertainty: u = U / k = 0.004 / 2 = 0.002 mm. This is a Type B evaluation because it comes from a certificate rather than from repeated measurements." },

        { type: "callout", tone: "workplace", title: "In the workplace", text: "At the Douala metrology laboratory, the senior metrologist plots daily readings of a 10.000 mm gauge block on an I-MR chart pinned to the wall beside the CMM. Over the past two years, the chart has caught two drift episodes: once when the air conditioning unit failed over a weekend (temperature-induced expansion) and once when the CMM probe tip was wearing. Both were corrected before any bad measurements left the laboratory." },

        { type: "links", items: [
          { label: "GUM: Guide to the expression of Uncertainty in Measurement", url: "https://www.bipm.org/en/committees/jc/jcgm/publications", source: "BIPM" },
          { label: "Measurement uncertainty", url: "https://www.nist.gov/pml/nist-technical-note-1297", source: "NIST" },
        ] },
      ],
    },

    // ═══════════════════════════════ PRACTICE ═══════════════════════════════
    {
      id: "aqe-m3-practice",
      title: "Practice",
      minutes: 30,
      objectives: [
        "Identify measurement system properties from workplace descriptions",
        "Measure parts accurately with a vernier caliper",
        "Calculate Gage R&R results using the range method and interpret ANOVA output",
      ],
      blocks: [
        // ── Beginner: form ──
        { type: "form", id: "aqe-m3-p1", level: "beginner", title: "Identify measurement system properties", task: "For each description, select the measurement system property being described.",
          fields: [
            { kind: "select", label: "The same operator measures the same part 10 times and gets readings within a 0.003 mm band.", options: ["Repeatability", "Reproducibility", "Bias", "Linearity", "Stability"], answer: 0, explain: "Same operator, same part, same conditions — the spread of these readings is repeatability (equipment variation)." },
            { kind: "select", label: "Three operators measure the same 10 parts. Operator B consistently reads 0.005 mm higher than the other two.", options: ["Repeatability", "Reproducibility", "Bias", "Linearity", "Stability"], answer: 1, explain: "Differences between operators measuring the same parts is reproducibility (appraiser variation)." },
            { kind: "select", label: "A gauge block of 20.000 mm is measured 15 times and the average reading is 20.014 mm.", options: ["Repeatability", "Reproducibility", "Bias", "Linearity", "Stability"], answer: 2, explain: "The systematic difference between the average reading (20.014) and the reference value (20.000) is bias: +0.014 mm." },
            { kind: "select", label: "A micrometer has zero error at 5 mm but reads 0.02 mm high at 25 mm.", options: ["Repeatability", "Reproducibility", "Bias", "Linearity", "Stability"], answer: 3, explain: "When the bias changes across the measurement range, this is a linearity problem." },
            { kind: "select", label: "Weekly measurements of a reference standard on the same CMM show a gradual upward drift of 0.001 mm per week over three months.", options: ["Repeatability", "Reproducibility", "Bias", "Linearity", "Stability"], answer: 4, explain: "A change in the measurement result over time, all else held constant, is a stability (drift) issue." },
            { kind: "select", label: "A weighing scale has divisions of 50 g, but the tolerance on the product is +/- 25 g.", options: ["Repeatability", "Reproducibility", "Bias", "Resolution", "Stability"], answer: 3, explain: "The smallest increment the instrument can detect (50 g) is too coarse for the tolerance (50 g range). This is a resolution (discrimination) problem — the instrument cannot distinguish parts near the limits." },
          ],
          hint: "Think about what is varying: the instrument itself (repeatability), the operator (reproducibility), the average vs true value (bias), the bias across the range (linearity), the bias over time (stability), or the smallest detectable increment (resolution).",
        },

        // ── Intermediate: caliper ──
        { type: "caliper", id: "aqe-m3-p2", level: "intermediate", title: "Measure parts with a vernier caliper", task: "You are conducting a Gage R&R study at the Bafoussam factory. Measure the dimensions of this disc using a vernier caliper. Record all readings as multiples of 0.02 mm.",
          instrument: "vernier",
          drawing: { kind: "disc", title: "Brake disc — Gage R&R study", outer: "280.00", inner: "180.00", thickness: "22.00" },
          drawingUnit: "mm",
          dims: [
            { id: "od", label: "Outer diameter", nominal: 280.00, tolPlus: 0.10, tolMinus: -0.10 },
            { id: "id", label: "Inner diameter", nominal: 180.00, tolPlus: 0.08, tolMinus: -0.08 },
            { id: "th", label: "Thickness", nominal: 22.00, tolPlus: 0.05, tolMinus: -0.05 },
          ],
          readings: [
            { dim: "th", label: "Thickness, Trial 1", value: 22.04, conformity: true },
            { dim: "th", label: "Thickness, Trial 2", value: 22.02, conformity: true },
            { dim: "od", label: "Outer diameter, Trial 1", value: 280.06, conformity: true },
            { dim: "id", label: "Inner diameter, Trial 1", value: 179.96, conformity: true },
          ],
          hint: "Read the main scale first (the last millimetre mark visible before the zero of the vernier). Then find which vernier division aligns best with a main scale division. Each vernier division = 0.02 mm.",
        },

        // ── Advanced: sheet (Gage R&R range method) ──
        { type: "sheet", id: "aqe-m3-p3", level: "advanced", title: "Complete a Gage R&R range method study", task: "Two operators at the Douala gearbox plant each measured 5 gear tooth widths twice with a digital caliper. Complete all calculations using K₁ = 4.56, K₂ = 3.65, K₃ = 2.08. Determine whether the measurement system is acceptable.",
          hint: "Follow the range method steps: ranges, averages, EV, AV, GRR, PV, TV, %GRR. If the square root term for AV is negative, set AV = 0.",
          data: [
            ["Part", "Oper A T1", "Oper A T2", "Range A", "Oper B T1", "Oper B T2", "Range B"],
            [1, 3.152, 3.148, null, 3.156, 3.150, null],
            [2, 3.178, 3.174, null, 3.180, 3.176, null],
            [3, 3.124, 3.130, null, 3.128, 3.122, null],
            [4, 3.166, 3.162, null, 3.170, 3.164, null],
            [5, 3.140, 3.136, null, 3.146, 3.138, null],
            ["", "", "", "", "", "", ""],
            ["R-bar A", null, "", "R-bar B", null, "", ""],
            ["R-bar", null, "", "", "", "", ""],
            ["EV", null, "", "", "", "", ""],
            ["X-bar A", null, "", "X-bar B", null, "", ""],
            ["Xdiff", null, "", "", "", "", ""],
            ["AV", null, "", "", "", "", ""],
            ["GRR", null, "", "", "", "", ""],
            ["Rp", null, "", "", "", "", ""],
            ["PV", null, "", "", "", "", ""],
            ["TV", null, "", "", "", "", ""],
            ["%GRR", null, "", "", "", "", ""],
            ["ndc", null, "", "", "", "", ""],
            ["Decision", null, "", "", "", "", ""],
          ],
          editable: ["D2","D3","D4","D5","D6","G2","G3","G4","G5","G6","B8","E8","B9","B10","B11","E11","B12","B13","B14","B15","B16","B17","B18","B19","B20"],
          checks: [
            { cell: "D2", equals: 0.004, tol: 0.001 },
            { cell: "D3", equals: 0.004, tol: 0.001 },
            { cell: "D4", equals: 0.006, tol: 0.001 },
            { cell: "D5", equals: 0.004, tol: 0.001 },
            { cell: "D6", equals: 0.004, tol: 0.001 },
            { cell: "G2", equals: 0.006, tol: 0.001 },
            { cell: "G3", equals: 0.004, tol: 0.001 },
            { cell: "G4", equals: 0.006, tol: 0.001 },
            { cell: "G5", equals: 0.006, tol: 0.001 },
            { cell: "G6", equals: 0.008, tol: 0.001 },
            { cell: "B8", equals: 0.0044, tol: 0.001 },
            { cell: "E8", equals: 0.006, tol: 0.001 },
            { cell: "B9", equals: 0.0052, tol: 0.001 },
            { cell: "B10", equals: 0.0237, tol: 0.003 },
            { cell: "B18", equals: 19, tol: 5 },
          ],
          solution: {
            "D2": "0.004", "D3": "0.004", "D4": "0.006", "D5": "0.004", "D6": "0.004",
            "G2": "0.006", "G3": "0.004", "G4": "0.006", "G5": "0.006", "G6": "0.008",
            "B8": "0.0044", "E8": "0.006", "B9": "0.0052", "B10": "0.0237",
            "B11": "3.1522", "E11": "3.1550", "B12": "0.0028",
            "B13": "0", "B14": "0.0237", "B15": "0.054", "B16": "0.1123",
            "B17": "0.1148", "B18": "20.6", "B19": "6", "B20": "May be acceptable",
          },
        },

        // ── Expert: form (interpret full ANOVA output) ──
        { type: "form", id: "aqe-m3-p4", level: "expert", title: "Interpret ANOVA Gage R&R output and recommend actions", task: "A full ANOVA Gage R&R study was conducted on a CMM programme measuring cylinder bore diameters at the Douala engine plant. 10 parts, 3 operators, 3 trials. Study the results below and answer the questions.\n\nANOVA table: Part F = 45.2 (p < 0.001), Operator F = 8.7 (p = 0.003), Interaction F = 1.2 (p = 0.31).\nVariance components: Part σ² = 0.000284 (73.1%), Operator σ² = 0.000038 (9.8%), Interaction σ² = 0.000002 (0.5%), Repeatability σ² = 0.000064 (16.5%), Total σ² = 0.000388.\n%Study Variation: GRR = 51.8%, Repeatability = 40.6%, Reproducibility = 32.2%, Part = 85.5%.\nndc = 2.",
          fields: [
            { kind: "select", label: "Is the measurement system acceptable?", options: ["Acceptable (%GRR < 10%)", "May be acceptable (10–30%)", "Unacceptable (%GRR > 30%)", "Cannot determine"], answer: 2, explain: "With %GRR (% Study Variation) = 51.8%, far exceeding 30%, and ndc = 2 (far below 5), the measurement system is clearly unacceptable. It contributes more variation than it should." },
            { kind: "select", label: "What is the dominant source of measurement system variation?", options: ["Repeatability (equipment variation)", "Reproducibility (operator variation)", "Operator × Part interaction", "Part variation"], answer: 0, explain: "Repeatability at 16.5% of total variance (40.6% of study variation) is the largest measurement system component. The equipment itself is the main problem, larger than the operator effect." },
            { kind: "select", label: "The operator effect is significant (p = 0.003). What does this mean practically?", options: ["Operators are measuring different parts", "At least one operator measures consistently higher or lower than the others", "The operators cannot read the instrument", "The operator effect is negligible"], answer: 1, explain: "A significant operator main effect (p = 0.003 < 0.05) means there is a systematic difference between operators. At least one operator's average differs from the others, indicating a bias that varies by operator. Training or standardising the procedure may help." },
            { kind: "select", label: "The interaction p-value is 0.31. What should be done with this term?", options: ["Keep it in the model — it is important", "Pool it into the repeatability term to simplify the model", "Remove it and re-run the study", "Report it as significant"], answer: 1, explain: "With p = 0.31 > 0.05, the interaction is not statistically significant. It should be pooled into the repeatability term, which increases the degrees of freedom for the repeatability estimate and gives a more stable variance estimate." },
            { kind: "select", label: "With ndc = 2, what practical problem does this create?", options: ["The gauge can distinguish 2 groups — this is sufficient for pass/fail inspection", "The gauge can only sort parts into 2 groups (high and low) — it cannot support SPC or process improvement", "The ndc is adequate because we only need to tell good from bad", "The ndc does not matter when %GRR is already unacceptable"], answer: 1, explain: "An ndc of 2 means the gauge can barely distinguish large parts from small parts. It cannot support SPC (which needs ndc >= 5) or any meaningful process analysis. Even for pass/fail inspection, this is marginal." },
            { kind: "select", label: "What is the most effective first action to improve this measurement system?", options: ["Retrain all operators to reduce reproducibility", "Replace or upgrade the CMM programme / probe to reduce repeatability", "Select parts with wider variation to improve ndc", "Tighten the tolerance to make %GRR look smaller"], answer: 1, explain: "Since repeatability (equipment variation) is the dominant source, the most effective action is to address the CMM programme or probe. This might mean reducing the scanning speed, increasing the number of measurement points, replacing a worn probe, or improving the fixturing. Retraining operators would help but addresses the smaller component." },
          ],
          hint: "Look at both the ANOVA p-values and the variance component percentages. The largest contributor to GRR is where improvement effort should focus. Remember that ndc must be >= 5 for SPC applications.",
        },
      ],
    },
  ],

  // ═══════════════════════════════ MODULE QUIZ ═══════════════════════════════
  quiz: {
    id: "aqe-m3-quiz",
    title: "Module 3 Quiz — Measurement Systems Analysis",
    passPct: 75,
    questions: [
      {
        id: "aqe-m3-q1",
        question: "Which measurement system property describes the systematic difference between the average of measurements and the true (reference) value?",
        options: ["Repeatability", "Reproducibility", "Bias", "Linearity"],
        answer: 2,
        explain: "Bias is the systematic offset between the average measured value and the reference value. It is sometimes called accuracy, though accuracy can also refer to the combination of bias and precision.",
      },
      {
        id: "aqe-m3-q2",
        question: "In a Gage R&R study using the range method, what does EV represent?",
        options: [
          "Environmental variation",
          "Equipment variation (repeatability)",
          "Expected value of the measurements",
          "Error variance from the ANOVA table",
        ],
        answer: 1,
        explain: "EV stands for Equipment Variation, which is the repeatability component of the Gage R&R. It captures the variation from the instrument itself when the same operator measures the same part repeatedly.",
      },
      {
        id: "aqe-m3-q3",
        question: "A Gage R&R study reports %GRR = 24% and ndc = 6. What is the correct assessment?",
        options: [
          "Acceptable — both criteria are met",
          "May be acceptable — %GRR is in the 10–30% range but ndc >= 5",
          "Unacceptable — %GRR exceeds 10%",
          "Unacceptable — ndc is too low",
        ],
        answer: 1,
        explain: "A %GRR of 24% falls in the 10–30% marginal zone (may be acceptable depending on the application). The ndc of 6 meets the >= 5 criterion, confirming the gauge can distinguish at least 5 groups. The overall assessment is 'may be acceptable'.",
      },
      {
        id: "aqe-m3-q4",
        question: "What is the main advantage of the ANOVA method over the range method for Gage R&R studies?",
        options: [
          "It requires fewer parts and operators",
          "It can detect an operator-by-part interaction effect",
          "It does not require repeated trials",
          "It gives the same results with less calculation",
        ],
        answer: 1,
        explain: "The ANOVA method can detect an operator × part interaction, which occurs when some operators measure certain parts differently. The range method cannot detect this interaction. ANOVA also provides more precise variance estimates.",
      },
      {
        id: "aqe-m3-q5",
        question: "In an attribute MSA, Cohen's kappa corrects for what limitation of simple percent agreement?",
        options: [
          "It corrects for the number of appraisers",
          "It corrects for agreement expected by chance alone",
          "It corrects for the size of the sample",
          "It corrects for the difficulty of the inspection task",
        ],
        answer: 1,
        explain: "Cohen's kappa adjusts for the fact that some agreement between raters will occur by chance. Two inspectors randomly classifying parts as pass/fail would agree about 50% of the time by chance alone. Kappa removes this chance agreement to give a truer measure.",
      },
      {
        id: "aqe-m3-q6",
        question: "A linearity study shows that a gauge has no bias at 5 mm but reads 0.04 mm high at 25 mm. Which statement is correct?",
        options: [
          "The gauge has a stability problem",
          "The gauge has a linearity problem — bias changes across the range",
          "The gauge has a repeatability problem",
          "Simple recalibration at 5 mm will fix the issue",
        ],
        answer: 1,
        explain: "When bias changes across the operating range, this is a linearity problem. The slope of the bias-vs-reference regression line is significantly different from zero. Recalibrating at a single point will not fix linearity; the gauge needs repair or replacement.",
      },
      {
        id: "aqe-m3-q7",
        question: "In the GUM framework, which type of uncertainty evaluation uses the standard deviation of repeated measurements?",
        options: [
          "Type A evaluation",
          "Type B evaluation",
          "Type C evaluation",
          "Combined evaluation",
        ],
        answer: 0,
        explain: "Type A evaluation is based on the statistical analysis of a series of observations — typically the standard deviation of repeated measurements divided by the square root of the number of measurements. Type B uses other information such as calibration certificates or manufacturer specifications.",
      },
      {
        id: "aqe-m3-q8",
        question: "On the Xbar chart produced by a Gage R&R ANOVA study, what does it mean when most points fall WITHIN the control limits?",
        options: [
          "The process is in statistical control — this is a good result",
          "The operators are consistent — this is a good result",
          "The gauge cannot detect part-to-part differences — this is a bad result",
          "The parts in the study are too similar — select parts with tighter tolerances",
        ],
        answer: 2,
        explain: "In a Gage R&R Xbar chart, the control limits are based on the measurement system's repeatability. Points within the limits mean the measurement variation is large relative to part variation — the gauge cannot tell parts apart. Points OUTSIDE the limits (the opposite of normal SPC interpretation) indicate the gauge can detect real differences.",
      },
    ],
  },
};
