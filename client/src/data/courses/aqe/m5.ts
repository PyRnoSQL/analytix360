import type { CourseModule } from "../../../lms/types";

export const m5: CourseModule = {
  id: "aqe-m5",
  number: 5,
  title: "Design of Experiments",
  hours: 16,
  summary:
    "This module introduces the principles and practice of Design of Experiments (DOE) for quality engineering. Learners progress from understanding why factorial designs surpass one-factor-at-a-time approaches, through constructing and analysing full 2^k factorial designs, to using fractional factorials and screening designs when resources are limited. The module then covers response surface methodology for process optimisation, including central composite and Box-Behnken designs. Throughout, practical planning, execution and confirmation of experiments are emphasised, with realistic manufacturing scenarios drawn from Cameroonian industry.",
  lessons: [
    // ===== LESSON 1 =====
    {
      id: "aqe-m5-l1",
      number: 1,
      title: "Experiment planning and one-factor-at-a-time vs factorial",
      duration: 25,
      objectives: [
        "Explain why structured experimentation is superior to trial-and-error approaches",
        "Compare one-factor-at-a-time (OFAT) with factorial experiment designs",
        "Define key DOE terminology including factor, level, response, treatment, replicate, block and randomisation",
      ],
      blocks: [
        {
          type: "h",
          text: "Why Run Experiments?",
        },
        {
          type: "p",
          text: "Every manufacturing process has variables that affect output quality. A brewery in Douala wants to maximise the carbonation level in its lager. A cement plant in Figuil needs to achieve target compressive strength whilst minimising energy consumption. A machining workshop in Yaoundé must reduce bore diameter variation. In each case, engineers must determine which process settings produce the best results. Design of Experiments provides a systematic, statistically rigorous framework for answering these questions efficiently.",
        },
        {
          type: "list",
          items: [
            "Optimise processes: find the factor settings that yield the best response",
            "Reduce variation: identify and control the sources of unwanted variability",
            "Solve problems: determine root causes by testing competing hypotheses simultaneously",
            "Build knowledge: quantify how factors and their interactions affect the response",
          ],
        },
        {
          type: "h",
          text: "OFAT vs Factorial Approaches",
        },
        {
          type: "p",
          text: "The traditional approach is one-factor-at-a-time (OFAT): hold everything constant, vary one factor, find its best level, then move to the next factor. This seems logical but has a critical flaw — it cannot detect interactions between factors. If the effect of temperature on cement strength depends on the water-to-cement ratio, OFAT will miss this entirely.",
        },
        {
          type: "table",
          head: ["Criterion", "OFAT", "Factorial"],
          rows: [
            ["Detects interactions", "No", "Yes"],
            ["Number of runs (k factors, 2 levels)", "2k + 1 (sequential)", "2^k (all combinations)"],
            [
              "Efficiency",
              "Low — each run tests only one factor",
              "High — every run provides information on all factors",
            ],
            ["Validity of conclusions", "Only at fixed levels of other factors", "Across the full design space"],
            ["Risk of misleading results", "High if interactions exist", "Low — interactions are estimated"],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "The Interaction Problem",
          text: "When factors interact, the best level of one factor depends on the level of another. OFAT finds the best level of Factor A at a single, possibly suboptimal, level of Factor B. A factorial design tests all combinations and reveals the true optimum.",
        },
        {
          type: "h",
          text: "DOE Terminology",
        },
        {
          type: "table",
          head: ["Term", "Definition", "Example"],
          rows: [
            ["Factor", "A controllable variable under investigation", "Kiln temperature, grinding time"],
            ["Level", "A specific value or setting of a factor", "Low (850°C), High (950°C)"],
            ["Response", "The measured outcome of interest", "Compressive strength (MPa)"],
            ["Treatment", "A specific combination of factor levels", "Temperature = High, Time = Low"],
            ["Replicate", "An independent repeat of a treatment combination", "Running the same settings on a separate batch"],
            ["Block", "A group of runs performed under similar conditions", "Morning shift vs afternoon shift"],
            ["Randomisation", "Running treatments in random order to avoid bias", "Using a random number table to set run order"],
          ],
        },
        {
          type: "h",
          text: "The Experiment Planning Process",
        },
        {
          type: "steps",
          title: "Six Steps to a Successful Experiment",
          items: [
            "Define the objective: state clearly what you want to learn or optimise",
            "Select factors and levels: choose the most important variables and their test ranges",
            "Choose the design: select full factorial, fractional factorial, or other appropriate design",
            "Execute the experiment: run treatments in randomised order, collect data carefully",
            "Analyse results: calculate effects, check significance, build a model",
            "Confirm findings: run confirmation trials at the predicted optimal settings",
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Planning at Cimencam",
          text: "At Cimencam’s Figuil plant, the quality team planning a DOE on clinker formation first held a brainstorming session with operators, maintenance staff and the process engineer. They identified 12 potential factors, then used Pareto voting to narrow these to the 4 most likely to influence compressive strength. This collaborative approach ensured buy-in and prevented important factors from being overlooked.",
        },
        {
          type: "check",
          id: "aqe-m5-chk-01",
          question:
            "A brewery engineer varies mashing temperature from 62°C to 68°C while keeping all other factors constant, records the extract yield, then repeats the process for mash duration. What method is this?",
          options: [
            "Full factorial design",
            "One-factor-at-a-time (OFAT)",
            "Fractional factorial design",
            "Response surface methodology",
          ],
          answer: 1,
          explain:
            "This is OFAT because the engineer varies one factor at a time while holding others constant. A factorial design would test all combinations of temperature and duration simultaneously.",
        },
        {
          type: "equip",
          title: "DOE Software and Tools",
          items: [
            {
              id: "stat-doe-main",
              name: "DOE Analysis Toolkit",
              desc: "Software for designing experiments, generating run orders, calculating effects and producing interaction plots. Essential for factorial and fractional factorial analysis.",
            },
          ],
        },
        {
          type: "form",
          id: "aqe-m5-lab-01",
          title: "DOE Terminology Match",
          task: "For each description, select the correct DOE term.",
          fields: [
            {
              kind: "select",
              label: "A controllable process variable such as kiln temperature or grinding time",
              options: ["Response", "Factor", "Replicate", "Block"],
              answer: 1,
              explain: "A factor is a controllable variable that the experimenter deliberately changes.",
            },
            {
              kind: "select",
              label: "Running the same treatment combination independently a second time to estimate error",
              options: ["Block", "Treatment", "Replicate", "Level"],
              answer: 2,
              explain:
                "A replicate is an independent repeat of a treatment. It provides an estimate of experimental error.",
            },
            {
              kind: "select",
              label: "Grouping runs performed on the same day to account for day-to-day variation",
              options: ["Randomisation", "Replicate", "Factor", "Block"],
              answer: 3,
              explain:
                "A block is a group of homogeneous experimental units. Blocking removes known sources of nuisance variation.",
            },
            {
              kind: "select",
              label: "The specific combination Temperature = 950°C, Time = 45 min",
              options: ["Level", "Factor", "Treatment", "Response"],
              answer: 2,
              explain:
                "A treatment (or treatment combination) is one specific set of factor levels tested together.",
            },
          ],
          hint: "Each DOE term has a precise meaning. Think about what the experimenter controls versus what they measure.",
        },
        {
          type: "sorter",
          id: "aqe-m5-lab-02",
          title: "Classify Experiment Elements",
          task: "A cement plant is studying the effect of kiln temperature (850°C and 950°C) and raw meal fineness (3000 and 3500 cm²/g) on 28-day compressive strength (MPa). The experiment is run over two days, with each treatment repeated twice. Classify each element.",
          layout: "columns",
          buckets: [
            { label: "Factor" },
            { label: "Level" },
            { label: "Response" },
            { label: "Experimental structure" },
          ],
          items: [
            { text: "Kiln temperature", bucket: 0, explain: "Temperature is a controllable variable being tested." },
            {
              text: "850°C",
              bucket: 1,
              explain: "This is a specific setting (level) of the kiln temperature factor.",
            },
            {
              text: "28-day compressive strength",
              bucket: 2,
              explain: "This is the measured outcome — the response variable.",
            },
            {
              text: "Day 1 vs Day 2",
              bucket: 3,
              explain: "The two days form blocks — part of the experimental structure.",
            },
            {
              text: "Raw meal fineness",
              bucket: 0,
              explain: "Fineness is the second controllable variable being investigated.",
            },
            {
              text: "3500 cm²/g",
              bucket: 1,
              explain: "This is a specific setting (level) of the fineness factor.",
            },
            {
              text: "Two independent batches per treatment",
              bucket: 3,
              explain: "These are replicates — part of the experimental structure for estimating error.",
            },
          ],
        },
        {
          type: "links",
          items: [
            {
              label: "NIST Engineering Statistics Handbook — Introduction to DOE",
              url: "https://www.itl.nist.gov/div898/handbook/pri/pri.htm",
              source: "NIST",
            },
          ],
        },
      ],
    },

    // ===== LESSON 2 =====
    {
      id: "aqe-m5-l2",
      number: 2,
      title: "Full factorial designs: 2² and 2³",
      duration: 35,
      objectives: [
        "Construct and execute a 2² full factorial design with coded factor levels",
        "Calculate main effects and interaction effects using the contrast matrix",
        "Extend factorial analysis to 2³ designs and interpret three-factor interactions",
        "Use normal probability plots to identify significant effects",
      ],
      blocks: [
        {
          type: "h",
          text: "The 2² Factorial Design",
        },
        {
          type: "p",
          text: "The simplest factorial design studies two factors, each at two levels. We code the low level as −1 and the high level as +1. With two factors (A and B) at two levels each, there are 2² = 4 treatment combinations. Every combination of factor levels is tested, which is what makes it a full factorial.",
        },
        {
          type: "p",
          text: "Consider a brewery filling line in Douala optimising carbonation (measured in g/L CO₂). Factor A is carbonation pressure (low = 2.0 bar, high = 2.8 bar) and Factor B is beer temperature (low = 2°C, high = 6°C). Each treatment is replicated twice.",
        },
        {
          type: "table",
          head: ["Run", "A (Pressure)", "B (Temperature)", "AB", "Response y̅ (g/L CO₂)"],
          rows: [
            ["1", "−1", "−1", "+1", "5.1"],
            ["2", "+1", "−1", "−1", "5.8"],
            ["3", "−1", "+1", "−1", "4.4"],
            ["4", "+1", "+1", "+1", "5.9"],
          ],
        },
        {
          type: "callout",
          tone: "key",
          title: "Contrast Matrix (Sign Table)",
          text: "The AB column is calculated by multiplying the signs of A and B for each run. This sign table is the contrast matrix — it tells us how to combine the responses to estimate each effect. The column of signs for any effect shows which responses to add (+1) and which to subtract (−1).",
        },
        {
          type: "h",
          text: "Calculating Main Effects",
        },
        {
          type: "p",
          text: "The main effect of a factor is the average change in response when that factor moves from its low level to its high level. We use the contrast matrix columns as weights.",
        },
        {
          type: "code",
          text: "Main Effect of A = (1/2) × [(−1)(5.1) + (+1)(5.8) + (−1)(4.4) + (+1)(5.9)]\n                 = (1/2) × [−5.1 + 5.8 − 4.4 + 5.9]\n                 = (1/2) × 2.2\n                 = 1.10 g/L CO₂\n\nMain Effect of B = (1/2) × [(−1)(5.1) + (−1)(5.8) + (+1)(4.4) + (+1)(5.9)]\n                 = (1/2) × [−5.1 − 5.8 + 4.4 + 5.9]\n                 = (1/2) × (−0.6)\n                 = −0.30 g/L CO₂",
        },
        {
          type: "p",
          text: "Interpretation: increasing pressure from 2.0 to 2.8 bar increases carbonation by 1.10 g/L on average. Increasing temperature from 2°C to 6°C decreases carbonation by 0.30 g/L on average (as expected — CO₂ is more soluble at lower temperatures).",
        },
        {
          type: "h",
          text: "The Interaction Effect",
        },
        {
          type: "code",
          text: "Interaction AB = (1/2) × [(+1)(5.1) + (−1)(5.8) + (−1)(4.4) + (+1)(5.9)]\n               = (1/2) × [5.1 − 5.8 − 4.4 + 5.9]\n               = (1/2) × 0.8\n               = 0.40 g/L CO₂",
        },
        {
          type: "p",
          text: "A positive AB interaction of 0.40 means that the effect of pressure is 0.40 g/L larger when temperature is high than when temperature is low. In other words, the two factors do not act independently — there is synergy between higher pressure and higher temperature. This interaction would be completely invisible in an OFAT study.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Reading Interaction Plots",
          text: "Plot the response on the y-axis against Factor A on the x-axis, with separate lines for each level of Factor B. If the lines are parallel, there is no interaction. If the lines cross or diverge, an interaction is present. The more the lines diverge, the stronger the interaction.",
        },
        {
          type: "h",
          text: "The 2³ Factorial Design",
        },
        {
          type: "p",
          text: "Adding a third factor C gives 2³ = 8 treatment combinations. We now estimate three main effects (A, B, C), three two-factor interactions (AB, AC, BC) and one three-factor interaction (ABC). The contrast matrix extends naturally: the ABC column is the product of all three factor columns.",
        },
        {
          type: "p",
          text: "A machining workshop in Yaoundé is optimising surface roughness (Ra, µm) of aluminium bushings. Factor A is cutting speed (80 vs 120 m/min), Factor B is feed rate (0.10 vs 0.20 mm/rev), and Factor C is depth of cut (0.5 vs 1.5 mm).",
        },
        {
          type: "table",
          head: ["Run", "A", "B", "C", "AB", "AC", "BC", "ABC", "Ra (µm)"],
          rows: [
            ["1", "−1", "−1", "−1", "+1", "+1", "+1", "−1", "1.2"],
            ["2", "+1", "−1", "−1", "−1", "−1", "+1", "+1", "0.9"],
            ["3", "−1", "+1", "−1", "−1", "+1", "−1", "+1", "2.1"],
            ["4", "+1", "+1", "−1", "+1", "−1", "−1", "−1", "1.6"],
            ["5", "−1", "−1", "+1", "+1", "−1", "−1", "+1", "1.5"],
            ["6", "+1", "−1", "+1", "−1", "+1", "−1", "−1", "1.1"],
            ["7", "−1", "+1", "+1", "−1", "−1", "+1", "−1", "2.6"],
            ["8", "+1", "+1", "+1", "+1", "+1", "+1", "+1", "2.0"],
          ],
        },
        {
          type: "code",
          text: "Main Effect of A (Speed) = (1/4) × [−1.2 + 0.9 − 2.1 + 1.6 − 1.5 + 1.1 − 2.6 + 2.0]\n                         = (1/4) × (−1.8)\n                         = −0.45 µm\n\nMain Effect of B (Feed)  = (1/4) × [−1.2 − 0.9 + 2.1 + 1.6 − 1.5 − 1.1 + 2.6 + 2.0]\n                         = (1/4) × 3.6\n                         = 0.90 µm\n\nMain Effect of C (Depth) = (1/4) × [−1.2 − 0.9 − 2.1 − 1.6 + 1.5 + 1.1 + 2.6 + 2.0]\n                         = (1/4) × 1.4\n                         = 0.35 µm",
        },
        {
          type: "p",
          text: "Higher cutting speed reduces roughness (−0.45 µm), higher feed rate increases roughness substantially (+0.90 µm), and greater depth of cut increases roughness moderately (+0.35 µm). Feed rate is the dominant factor.",
        },
        {
          type: "h",
          text: "Normal Probability Plot of Effects",
        },
        {
          type: "p",
          text: "With 7 effects to evaluate in a 2³ design, a normal probability plot helps distinguish real effects from noise. Plot the ordered effects against their expected normal scores. Effects that are just noise will fall on a straight line. Effects that stand out from the line are statistically significant. In our machining example, the main effect of B (feed rate) at 0.90 would be far from the line, confirming it is the dominant factor.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Three-Factor Interactions",
          text: "A significant ABC interaction means the two-factor interaction between any pair of factors changes depending on the level of the third factor. These are hard to interpret physically and are often small. If ABC is large, check for data errors or lurking variables before accepting it.",
        },
        {
          type: "equip",
          title: "Analysis Tools for Factorial Designs",
          items: [
            {
              id: "stat-doe-main",
              name: "DOE Analysis Toolkit",
              desc: "Used here for generating contrast matrices, computing effects, and producing normal probability plots and interaction plots.",
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m5-chk-02",
          question:
            "In a 2² factorial with responses y₁ = 40, y₂ = 52, y₃ = 38, y₄ = 46 (standard order), what is the main effect of Factor A?",
          options: ["10", "5", "−2", "3"],
          answer: 0,
          explain:
            "Effect of A = (1/2)[(−40) + (52) + (−38) + (46)] = (1/2)(20) = 10. Using the contrast column for A: −1, +1, −1, +1.",
        },
        {
          type: "sheet",
          id: "aqe-m5-lab-03",
          title: "Calculate 2² Factorial Effects",
          task: "A Douala brewery tested two factors on dissolved CO₂ (g/L): A = carbonation pressure (2.0 vs 2.8 bar) and B = temperature (2°C vs 6°C). Calculate all effects from the data below. Enter effect values in the yellow cells.",
          data: [
            ["Run", "A", "B", "AB", "CO₂ (g/L)", "", "Effect", "Value"],
            [1, -1, -1, 1, 5.1, null, "A", null],
            [2, 1, -1, -1, 5.8, null, "B", null],
            [3, -1, 1, -1, 4.4, null, "AB", null],
            [4, 1, 1, 1, 5.9, null, "", null],
          ],
          editable: ["H2", "H3", "H4"],
          checks: [
            { cell: "H2", equals: 1.1, tol: 0.05 },
            { cell: "H3", equals: -0.3, tol: 0.05 },
            { cell: "H4", equals: 0.4, tol: 0.05 },
          ],
          hint: "Multiply each response by its contrast column sign, sum, then divide by n/2 where n = 4 runs. For A: (1/2)[−5.1 + 5.8 − 4.4 + 5.9].",
          solution: {
            H2: "1.1",
            H3: "-0.3",
            H4: "0.4",
          },
        },
        {
          type: "form",
          id: "aqe-m5-lab-04",
          title: "Interpret Interaction Plots",
          task: "Based on the brewery 2² factorial results (Effect A = 1.10, Effect B = −0.30, Effect AB = 0.40), answer the following interpretation questions.",
          fields: [
            {
              kind: "select",
              label: "Which factor has the largest effect on carbonation?",
              options: [
                "Factor B (temperature)",
                "Factor A (pressure)",
                "The AB interaction",
                "All effects are equal",
              ],
              answer: 1,
              explain:
                "Factor A has an effect of 1.10 g/L, which is larger in magnitude than B (−0.30) or AB (0.40).",
            },
            {
              kind: "select",
              label: "If the interaction plot lines cross, what does this indicate?",
              options: [
                "No interaction exists",
                "The main effects are both significant",
                "The effect of one factor depends on the level of the other",
                "The experiment has too much noise",
              ],
              answer: 2,
              explain:
                "Crossing lines on an interaction plot indicate that the effect of one factor changes depending on the level of the other — a clear sign of interaction.",
            },
            {
              kind: "select",
              label: "The positive AB interaction (+0.40) means the effect of pressure is:",
              options: [
                "0.40 g/L smaller at high temperature",
                "0.40 g/L larger at high temperature",
                "The same at both temperatures",
                "Reversed at high temperature",
              ],
              answer: 1,
              explain:
                "A positive AB interaction means that moving pressure from low to high increases carbonation more when temperature is at its high level than at its low level.",
            },
          ],
          hint: "Remember: the interaction effect measures how much the effect of one factor changes across levels of the other.",
        },
        {
          type: "links",
          items: [
            {
              label: "Montgomery — Design and Analysis of Experiments (Chapter 5)",
              url: "https://www.wiley.com/en-us/Design+and+Analysis+of+Experiments",
              source: "Wiley",
            },
          ],
        },
      ],
    },

    // ===== LESSON 3 =====
    {
      id: "aqe-m5-l3",
      number: 3,
      title: "Fractional factorial and screening designs",
      duration: 30,
      objectives: [
        "Explain why fractional factorial designs are needed when the number of factors is large",
        "Construct a 2^(k−p) fractional factorial using generators and the defining relation",
        "Distinguish between Resolution III, IV and V designs and their estimation capabilities",
        "Interpret the aliasing structure to determine what is confounded",
      ],
      blocks: [
        {
          type: "h",
          text: "Why Fractionate?",
        },
        {
          type: "p",
          text: "A full factorial with 6 factors at 2 levels requires 2⁶ = 64 runs. With 7 factors it is 128 runs. For a cement plant studying kiln temperature, raw meal fineness, fuel rate, kiln speed, fan damper position, moisture content and clinker cooler speed, running 128 treatments with replicates is often impractical. Fractional factorial designs run only a carefully chosen fraction of the full factorial — one-half, one-quarter, or even one-eighth — while still estimating the most important effects.",
        },
        {
          type: "callout",
          tone: "key",
          title: "The Sparsity of Effects Principle",
          text: "Most real processes are dominated by a small number of main effects and low-order interactions. Higher-order interactions (three-factor and above) are usually negligible. Fractional factorials exploit this by confounding (aliasing) higher-order interactions with lower-order effects, sacrificing information we probably do not need.",
        },
        {
          type: "h",
          text: "Building a 2^(k−p) Design",
        },
        {
          type: "p",
          text: "A 2^(k−p) design studies k factors in 2^(k−p) runs. The fraction is 1/2^p of the full factorial. To construct it, we start with a full factorial in (k−p) basic factors and use generators to assign levels to the remaining p factors. Each generator sets one additional factor equal to an interaction of the basic factors.",
        },
        {
          type: "p",
          text: "Example: a 2^(3−1) design studies 3 factors in 4 runs (half of the full 2³). We start with a full 2² in factors A and B, then set C = AB (the generator). This means C’s column of signs is the product of the A and B columns.",
        },
        {
          type: "table",
          head: ["Run", "A", "B", "C = AB"],
          rows: [
            ["1", "−1", "−1", "+1"],
            ["2", "+1", "−1", "−1"],
            ["3", "−1", "+1", "−1"],
            ["4", "+1", "+1", "+1"],
          ],
        },
        {
          type: "h",
          text: "Defining Relation and Aliasing",
        },
        {
          type: "p",
          text: "The generator C = AB can be written as I = ABC (multiply both sides by C). This is the defining relation. It tells us which effects are aliased (confounded). To find the alias of any effect, multiply it by the defining relation: the alias of A is A × ABC = A²BC = BC (since A² = I). So A is aliased with BC, B is aliased with AC, and C is aliased with AB.",
        },
        {
          type: "table",
          head: ["Effect", "Alias", "Consequence"],
          rows: [
            ["A", "BC", "Cannot separate main effect A from interaction BC"],
            ["B", "AC", "Cannot separate main effect B from interaction AC"],
            ["C", "AB", "Cannot separate main effect C from interaction AB"],
          ],
        },
        {
          type: "h",
          text: "Design Resolution",
        },
        {
          type: "p",
          text: "Resolution is a Roman numeral that tells you the shortest word in the defining relation. It indicates the severity of aliasing.",
        },
        {
          type: "table",
          head: ["Resolution", "Defining Relation", "Aliasing Pattern", "Use"],
          rows: [
            [
              "III",
              "Shortest word = 3 letters",
              "Main effects aliased with 2-factor interactions",
              "Screening many factors quickly",
            ],
            [
              "IV",
              "Shortest word = 4 letters",
              "Main effects clear of 2FI; 2FI aliased with each other",
              "Estimating main effects when 2FI may exist",
            ],
            [
              "V",
              "Shortest word = 5 letters",
              "Main effects and 2FI all clear",
              "Estimating main effects and all 2FI",
            ],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Choosing Resolution",
          text: "Use Resolution III for initial screening of many factors (e.g., Plackett-Burman). Use Resolution IV when you want unbiased main effects but can tolerate aliased two-factor interactions. Use Resolution V when you need to estimate all two-factor interactions cleanly.",
        },
        {
          type: "h",
          text: "Plackett-Burman Designs",
        },
        {
          type: "p",
          text: "Plackett-Burman (PB) designs are Resolution III screening designs where the number of runs is a multiple of 4 (but not necessarily a power of 2). A PB design in 12 runs can screen up to 11 factors. They are ideal for the initial stage of experimentation when you need to identify the vital few factors from many candidates. However, main effects are partially aliased with two-factor interactions, so significant effects should be confirmed with a higher-resolution follow-up design.",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Screening at a Douala Soap Factory",
          text: "A soap factory in Douala needed to screen 7 factors affecting bar hardness: oil blend ratio, saponification temperature, NaOH concentration, mixing speed, curing time, moisture content, and fragrance percentage. A full factorial would need 128 runs. Instead, they used a 2^(7−4) Resolution III design in just 8 runs to identify the 3 most important factors, then ran a full 2³ on those 3 factors to build a detailed model.",
        },
        {
          type: "check",
          id: "aqe-m5-chk-03",
          question:
            "In a 2^(3−1) design with generator C = AB and defining relation I = ABC, what is the alias of main effect B?",
          options: ["AB", "AC", "BC", "ABC"],
          answer: 1,
          explain:
            "Multiply B by the defining relation word ABC: B × ABC = AB²C = AC (since B² = I). So B is aliased with AC.",
        },
        {
          type: "form",
          id: "aqe-m5-lab-05",
          title: "Choose Appropriate Design Resolution",
          task: "For each experimental scenario, select the most appropriate design resolution.",
          fields: [
            {
              kind: "select",
              label: "You have 10 potential factors and want to narrow to the top 3–4 quickly. Budget allows 12 runs.",
              options: [
                "Resolution III (screening)",
                "Resolution IV (main effects clear)",
                "Resolution V (main effects + 2FI clear)",
                "Full factorial",
              ],
              answer: 0,
              explain:
                "With 10 factors and only 12 runs, Resolution III (e.g., Plackett-Burman) is the only practical choice. It will identify the important main effects for follow-up study.",
            },
            {
              kind: "select",
              label: "You have 5 factors and need to estimate all main effects without bias from two-factor interactions. Budget allows 16 runs.",
              options: [
                "Resolution III (screening)",
                "Resolution IV (main effects clear)",
                "Resolution V (main effects + 2FI clear)",
                "Full factorial",
              ],
              answer: 1,
              explain:
                "A 2^(5−1) Resolution IV design uses 16 runs and provides unbiased main effect estimates. Two-factor interactions are aliased with each other, which is acceptable if you primarily need main effects.",
            },
            {
              kind: "select",
              label: "You have 4 factors and suspect strong two-factor interactions. Budget allows 32 runs.",
              options: [
                "Resolution III (screening)",
                "Resolution IV (main effects clear)",
                "Resolution V (main effects + 2FI clear)",
                "Full factorial (2⁴ = 16 runs)",
              ],
              answer: 3,
              explain:
                "With only 4 factors, a full 2⁴ factorial is just 16 runs, well within budget. It estimates all main effects and interactions without aliasing. No fractioning is needed.",
            },
          ],
          hint: "Consider both the number of factors and the budget. Use the smallest fraction that still gives you the information you need.",
        },
        {
          type: "sheet",
          id: "aqe-m5-lab-06",
          title: "Analyse a 2^(3−1) Fractional Factorial",
          task: "A palm oil refinery in Douala used a 2^(3−1) design (C = AB) to study bleaching effectiveness (% colour reduction). Calculate the estimated effects. Remember: each estimated effect is aliased with a two-factor interaction.",
          data: [
            ["Run", "A", "B", "C=AB", "% Colour Reduction", "", "Effect", "Estimate"],
            [1, -1, -1, 1, 62, null, "A + BC", null],
            [2, 1, -1, -1, 71, null, "B + AC", null],
            [3, -1, 1, -1, 58, null, "C + AB", null],
            [4, 1, 1, 1, 75, null, "", null],
          ],
          editable: ["H2", "H3", "H4"],
          checks: [
            { cell: "H2", equals: 13.0, tol: 0.5 },
            { cell: "H3", equals: 0.0, tol: 0.5 },
            { cell: "H4", equals: 2.0, tol: 0.5 },
          ],
          hint: "Effect of (A+BC) = (1/2)[−62 + 71 − 58 + 75]. Use contrast signs from column A. Similarly for B and C=AB.",
          solution: {
            H2: "13.0",
            H3: "0.0",
            H4: "2.0",
          },
        },
        {
          type: "links",
          items: [
            {
              label: "NIST — Fractional Factorial Designs",
              url: "https://www.itl.nist.gov/div898/handbook/pri/section3/pri334.htm",
              source: "NIST",
            },
          ],
        },
      ],
    },

    // ===== LESSON 4 =====
    {
      id: "aqe-m5-l4",
      number: 4,
      title: "Response surface methodology",
      duration: 25,
      objectives: [
        "Explain the purpose of response surface methodology in process optimisation",
        "Describe central composite and Box-Behnken designs and when to use each",
        "Fit and interpret a second-order regression model with quadratic and interaction terms",
      ],
      blocks: [
        {
          type: "h",
          text: "From Screening to Optimisation",
        },
        {
          type: "p",
          text: "Factorial designs tell us which factors matter and in which direction their effects act. But the optimum may not lie at one of the tested levels — it may be somewhere in between, or even at a combination involving curvature in the response surface. Response surface methodology (RSM) extends factorial designs by fitting a second-order (quadratic) model that captures curvature, allowing us to locate the true optimum.",
        },
        {
          type: "steps",
          title: "Sequential Experimentation Strategy",
          items: [
            "Screen: use a fractional factorial to identify the vital few factors",
            "Characterise: run a full factorial on the important factors to estimate main effects and interactions",
            "Optimise: add axial and centre points (RSM) to fit a quadratic model and find the optimum",
            "Confirm: run confirmation trials at the predicted optimal conditions",
          ],
        },
        {
          type: "h",
          text: "Central Composite Design (CCD)",
        },
        {
          type: "p",
          text: "A CCD augments a 2^k factorial with two additional types of points. Axial points (star points) are located at distance α from the centre along each axis, extending the design beyond the factorial cube. Centre points are repeated runs at the midpoint of all factor ranges. Together, these allow estimation of all quadratic terms (A², B², etc.).",
        },
        {
          type: "p",
          text: "For k = 2 factors, a CCD has: 4 factorial points (±1, ±1), 4 axial points (±α, 0) and (0, ±α), and n₀ centre points (typically 3–5). With α = √2 ≈ 1.414, the design is rotatable, meaning prediction variance is constant at equal distances from the centre.",
        },
        {
          type: "table",
          head: ["Point Type", "Count (k=2)", "Purpose"],
          rows: [
            ["Factorial (±1, ±1)", "4", "Estimate main effects and two-factor interactions"],
            [
              "Axial (±α, 0) and (0, ±α)",
              "4",
              "Estimate quadratic (curvature) terms A² and B²",
            ],
            [
              "Centre (0, 0)",
              "3–5",
              "Estimate pure error and test for curvature",
            ],
          ],
        },
        {
          type: "h",
          text: "Box-Behnken Design",
        },
        {
          type: "p",
          text: "An alternative to the CCD is the Box-Behnken design, which uses only three levels per factor (−1, 0, +1) and avoids corner points. For k = 3, it requires 15 runs instead of the CCD’s 20. It is useful when the corner points are physically impractical (e.g., a combination of maximum temperature and maximum pressure might damage equipment). However, it does not allow sequential augmentation from a factorial — you must plan it from the start.",
        },
        {
          type: "h",
          text: "The Second-Order Model",
        },
        {
          type: "p",
          text: "RSM fits a polynomial of the form: y = β₀ + β₁A + β₂B + β₁₂AB + β₁₁A² + β₂₂B² + ε. The linear terms (β₁A, β₂B) capture the slope, the interaction term (β₁₂AB) captures the twist, and the quadratic terms (β₁₁A², β₂₂B²) capture the curvature in each factor’s direction.",
        },
        {
          type: "p",
          text: "Consider a Cameroon brewery optimising ethanol yield (% v/v) with Factor A = fermentation temperature (coded: −1 = 18°C, 0 = 22°C, +1 = 26°C) and Factor B = yeast pitch rate (coded: −1 = 0.5 million cells/mL, 0 = 1.0 million cells/mL, +1 = 1.5 million cells/mL). A CCD with 3 centre points gave the fitted model:",
        },
        {
          type: "code",
          text: "ŷ = 5.42 + 0.38A + 0.27B + 0.15AB − 0.31A² − 0.18B²\n\nMaximum predicted yield: set partial derivatives to zero:\n  ∂y/∂A = 0.38 + 0.15B − 0.62A = 0  →  A = (0.38 + 0.15B)/0.62\n  ∂y/∂B = 0.27 + 0.15A − 0.36B = 0  →  B = (0.27 + 0.15A)/0.36\n\nSolving simultaneously: A ≈ 0.69, B ≈ 1.04\n\nDecoded: Temperature ≈ 24.8°C, Pitch rate ≈ 1.52 million cells/mL\nPredicted yield ≈ 5.42 + 0.38(0.69) + 0.27(1.04) + 0.15(0.69)(1.04) − 0.31(0.69)² − 0.18(1.04)²\n                ≈ 5.77% v/v",
        },
        {
          type: "callout",
          tone: "key",
          title: "Contour Plots",
          text: "A contour plot shows lines of equal response on a grid of the two factors. The contour lines form ellipses (or hyperbolas) centred on the stationary point. If the stationary point is a maximum, the contours form closed ellipses with the highest response at the centre. The shape and orientation of the ellipses reveal the relative importance of each factor and their interaction.",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "RSM at a Bamenda Tea Estate",
          text: "A tea processing plant near Bamenda used RSM to optimise the rolling stage. After screening 6 factors with a Plackett-Burman design, they found that rolling pressure and rolling time were the key factors. A CCD with α = 1.414 and 5 centre points revealed a clear maximum for leaf cell rupture at 2.8 bar and 42 minutes — conditions that the factorial alone would have missed because the optimum was not at an extreme.",
        },
        {
          type: "equip",
          title: "Regression and RSM Tools",
          items: [
            {
              id: "stat-regression",
              name: "Regression Analysis Module",
              desc: "Fits linear and polynomial regression models, computes R², residual analysis, and generates contour and surface plots for RSM.",
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m5-chk-04",
          question: "What is the primary purpose of adding axial (star) points to a 2^k factorial in a CCD?",
          options: [
            "To increase the number of replicates for better error estimation",
            "To enable estimation of quadratic (curvature) terms in the model",
            "To improve the aliasing structure of the design",
            "To screen additional factors beyond the original k",
          ],
          answer: 1,
          explain:
            "Axial points extend the design along each factor axis, creating five levels per factor (−α, −1, 0, +1, +α). This enables fitting quadratic terms A² and B² that capture curvature in the response surface.",
        },
        {
          type: "form",
          id: "aqe-m5-lab-07",
          title: "Interpret Contour Plot and Identify Optimum",
          task: "A contour plot for ethanol yield shows closed elliptical contours with the highest contour (5.75% v/v) centred near coded values A = 0.7, B = 1.0. Answer the interpretation questions.",
          fields: [
            {
              kind: "select",
              label: "What does the stationary point represent in this case?",
              options: [
                "A saddle point — the response increases in some directions and decreases in others",
                "A minimum — the lowest yield occurs at the centre of the contours",
                "A maximum — yield decreases in all directions from this point",
                "A ridge — the response is nearly constant along one direction",
              ],
              answer: 2,
              explain:
                "Closed elliptical contours with the highest value at the centre indicate a maximum. Yield decreases as you move away in any direction.",
            },
            {
              kind: "select",
              label: "The ellipses are elongated along a diagonal. What does this suggest?",
              options: [
                "The two factors do not interact",
                "The quadratic terms are negligible",
                "There is an interaction between the two factors",
                "The model is inadequate and needs higher-order terms",
              ],
              answer: 2,
              explain:
                "Ellipses tilted along a diagonal (not aligned with the axes) indicate a significant interaction between the two factors. Axis-aligned ellipses would suggest no interaction.",
            },
            {
              kind: "select",
              label: "If the coded optimum is A = 0.7 and the factor range for temperature is 18–26°C (coded −1 to +1), what is the optimal temperature?",
              options: ["24.8°C", "22.0°C", "20.6°C", "25.6°C"],
              answer: 0,
              explain:
                "Decode: actual = centre + coded × half-range = 22 + 0.7 × 4 = 24.8°C. The centre is (18+26)/2 = 22, half-range is (26−18)/2 = 4.",
            },
          ],
          hint: "Coded value = (actual − centre) / half-range. So actual = centre + coded × half-range.",
        },
        {
          type: "sheet",
          id: "aqe-m5-lab-08",
          title: "Fit a Response Model",
          task: "Given the CCD data for ethanol yield below, verify the model coefficients. The model is y = β₀ + β₁A + β₂B. Calculate the predicted yield at the centre point (A=0, B=0) and at the factorial point (A=1, B=1). Use the simplified linear model: ŷ = 5.42 + 0.38A + 0.27B.",
          data: [
            ["Point", "A", "B", "y observed", "", "Calculation", "ŷ predicted"],
            ["Centre", 0, 0, 5.40, null, "β₀ + β₁(0) + β₂(0)", null],
            ["Factorial", 1, 1, 6.10, null, "β₀ + β₁(1) + β₂(1)", null],
            ["Factorial", -1, 1, 4.90, null, "β₀ + β₁(-1) + β₂(1)", null],
          ],
          editable: ["G2", "G3", "G4"],
          checks: [
            { cell: "G2", equals: 5.42, tol: 0.02 },
            { cell: "G3", equals: 6.07, tol: 0.02 },
            { cell: "G4", equals: 5.31, tol: 0.02 },
          ],
          hint: "Substitute A and B values into ŷ = 5.42 + 0.38A + 0.27B. For centre point: 5.42 + 0.38(0) + 0.27(0) = 5.42.",
          solution: {
            G2: "5.42",
            G3: "6.07",
            G4: "5.31",
          },
        },
        {
          type: "links",
          items: [
            {
              label: "NIST — Response Surface Designs",
              url: "https://www.itl.nist.gov/div898/handbook/pri/section3/pri336.htm",
              source: "NIST",
            },
          ],
        },
      ],
    },

    // ===== LESSON 5 =====
    {
      id: "aqe-m5-l5",
      number: 5,
      title: "Practical DOE: planning, execution and confirmation",
      duration: 25,
      objectives: [
        "Plan an experiment accounting for resources, time, cost and personnel",
        "Apply randomisation and blocking strategies to reduce bias in practice",
        "Use ANOVA to assess the significance of factorial effects",
        "Design and interpret confirmation runs to verify optimal settings",
      ],
      blocks: [
        {
          type: "h",
          text: "Planning the Experiment",
        },
        {
          type: "p",
          text: "A well-planned experiment succeeds; a poorly planned one wastes resources and produces ambiguous results. Before running a single trial, the quality engineer must consider the practical constraints: available raw materials, machine time, technician availability, cost per run, measurement system capability and management support. In Cameroon’s manufacturing sector, where budgets are often tight and downtime is costly, careful planning is especially important.",
        },
        {
          type: "list",
          items: [
            "Define the objective in writing: what question must the experiment answer?",
            "List all potential factors and use expert knowledge to select the most important 3–6",
            "Set factor ranges wide enough to detect effects but narrow enough to be practical",
            "Determine the number of replicates needed using power analysis or prior variance estimates",
            "Estimate total cost: materials per run × number of runs + measurement costs + labour",
            "Assign responsibilities: who sets the factors, who measures the response, who records the data",
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Pre-Experiment Checklist at ALUCAM Edea",
          text: "At the ALUCAM aluminium smelter in Edea, DOE teams use a standard pre-experiment checklist covering 14 items: measurement system validation (Gage R&R), safety review for extreme factor combinations, stakeholder sign-off, raw material procurement, operator training on the protocol, and data collection forms. No experiment proceeds until every item is ticked off.",
        },
        {
          type: "h",
          text: "Randomisation and Blocking in Practice",
        },
        {
          type: "p",
          text: "Randomisation protects against unknown lurking variables by ensuring that any systematic trends (e.g., tool wear, ambient temperature drift, operator fatigue) are spread evenly across all treatments. Complete randomisation means running treatments in a fully random order. However, some factors are hard to change — for instance, kiln temperature takes hours to adjust. In such cases, a split-plot design or restricted randomisation scheme keeps the hard-to-change factor constant within blocks.",
        },
        {
          type: "p",
          text: "Blocking accounts for known nuisance variables. If an experiment spans two shifts, two batches of raw material, or two machines, these become blocks. Within each block, a complete set (or balanced subset) of treatments is run. The block effect is estimated and removed from the error, increasing the precision of the factor effect estimates.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Do Not Confound Blocks with Factors",
          text: "If you run all high-temperature treatments on Monday and all low-temperature treatments on Tuesday, any Monday-vs-Tuesday difference (humidity, raw material batch, crew) is confounded with temperature. Always ensure every block contains a mix of treatment combinations.",
        },
        {
          type: "h",
          text: "ANOVA for DOE",
        },
        {
          type: "p",
          text: "Analysis of variance partitions the total variability in the response into components due to each factor, each interaction and the residual error. The F-ratio for each effect compares its mean square to the error mean square. If F > F-critical (or p-value < 0.05), the effect is statistically significant.",
        },
        {
          type: "table",
          head: ["Source", "SS", "df", "MS", "F", "p-value"],
          rows: [
            ["A (Speed)", "0.81", "1", "0.810", "14.73", "0.005"],
            ["B (Feed)", "3.24", "1", "3.240", "58.91", "< 0.001"],
            ["C (Depth)", "0.49", "1", "0.490", "8.91", "0.017"],
            ["AB", "0.01", "1", "0.010", "0.18", "0.680"],
            ["AC", "0.04", "1", "0.040", "0.73", "0.418"],
            ["BC", "0.09", "1", "0.090", "1.64", "0.236"],
            ["ABC", "0.0025", "1", "0.0025", "0.05", "0.836"],
            ["Error", "0.44", "8", "0.055", "", ""],
            ["Total", "5.1125", "15", "", "", ""],
          ],
        },
        {
          type: "p",
          text: "From this ANOVA table (machining surface roughness with 2 replicates), factors A (speed), B (feed rate) and C (depth of cut) are all significant at α = 0.05. None of the interactions are significant, suggesting the factors act independently on roughness. Feed rate (B) has the largest F-statistic and is by far the most influential factor.",
        },
        {
          type: "h",
          text: "Confirmation Runs",
        },
        {
          type: "p",
          text: "After identifying the optimal factor settings, run 3–5 confirmation trials at those settings. Compare the mean response from confirmation runs with the model’s prediction. If the confirmation mean falls within the prediction interval, the model is validated. If not, investigate: the model may be inadequate, conditions may have changed, or an important factor was overlooked.",
        },
        {
          type: "code",
          text: "Prediction: Ra = 0.85 µm at A=+1, B=−1, C=−1\nConfirmation runs (n=4): 0.88, 0.82, 0.91, 0.84\nConfirmation mean: 0.8625 µm\n95% prediction interval: [0.72, 0.98] µm\n\n0.8625 falls within [0.72, 0.98] → Model confirmed.",
        },
        {
          type: "h",
          text: "Common Pitfalls",
        },
        {
          type: "table",
          head: ["Pitfall", "Consequence", "Prevention"],
          rows: [
            [
              "Lurking variables",
              "Unexplained variation or misleading effects",
              "Randomise run order; monitor ambient conditions",
            ],
            [
              "Inadequate replication",
              "Cannot distinguish real effects from noise",
              "Run at least 2 replicates; use centre points for pure error",
            ],
            [
              "Changing conditions",
              "Drift contaminates effect estimates",
              "Block on time; run experiment as quickly as practical",
            ],
            [
              "Factor ranges too narrow",
              "Effects are too small to detect",
              "Set ranges based on engineering judgement and prior data",
            ],
            [
              "Measurement error",
              "Inflated residual variance masks real effects",
              "Validate measurement system (Gage R&R) before experimenting",
            ],
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Document Everything",
          text: "Maintain a detailed experiment logbook recording the actual factor settings (not just target), any anomalies, environmental conditions and the identity of the operator for each run. This documentation is invaluable for diagnosing unexpected results.",
        },
        {
          type: "equip",
          title: "Statistical Tools for DOE Analysis",
          items: [
            {
              id: "stat-doe-main",
              name: "DOE Analysis Toolkit",
              desc: "Computes ANOVA tables, generates effect estimates, and performs confirmation-run analysis for factorial experiments.",
            },
            {
              id: "stat-normality",
              name: "Normality Testing Module",
              desc: "Performs Anderson-Darling, Shapiro-Wilk and normal probability plot analysis on residuals from DOE models to verify assumptions.",
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m5-chk-05",
          question:
            "After a DOE identifies optimal settings, you run 4 confirmation trials. The predicted response is 5.8 with a 95% prediction interval of [5.2, 6.4]. Your confirmation mean is 6.1. What do you conclude?",
          options: [
            "The model is invalid because 6.1 ≠ 5.8",
            "The model is confirmed because 6.1 falls within [5.2, 6.4]",
            "More confirmation runs are needed because the mean is above the prediction",
            "The experiment must be repeated with different factor ranges",
          ],
          answer: 1,
          explain:
            "The confirmation mean (6.1) falls within the 95% prediction interval [5.2, 6.4], so the model’s predictions are consistent with the observed results. The model is confirmed.",
        },
        {
          type: "form",
          id: "aqe-m5-lab-09",
          title: "Plan an Experiment",
          task: "A cement quality engineer at a plant in Bertoua wants to study the effect of 3 factors (clinker fineness, gypsum percentage, grinding time) on compressive strength. Plan the experiment by answering the questions below.",
          fields: [
            {
              kind: "select",
              label: "With 3 factors at 2 levels each, how many runs does a single replicate of the full factorial require?",
              options: ["6", "8", "9", "12"],
              answer: 1,
              explain: "2³ = 8 runs for a full factorial with 3 factors at 2 levels.",
            },
            {
              kind: "select",
              label: "If the engineer can only afford 12 runs total, which is the best approach?",
              options: [
                "Run a 2³ full factorial once with 4 extra centre points",
                "Run a 2³ full factorial with partial replication",
                "Use OFAT to test each factor separately",
                "Run a 2^(3−1) fractional factorial with 3 replicates",
              ],
              answer: 0,
              explain:
                "A 2³ (8 runs) plus 4 centre points = 12 runs. Centre points provide an estimate of pure error and a test for curvature, giving the most information for the budget.",
            },
            {
              kind: "select",
              label: "The engineer plans to run the experiment over two days. How should days be handled?",
              options: [
                "Run all high-temperature treatments on Day 1 and low-temperature on Day 2",
                "Run the treatments in alphabetical order within each day",
                "Block on day — run a balanced subset of treatments on each day in random order",
                "Ignore the day difference since it is not a factor of interest",
              ],
              answer: 2,
              explain:
                "Days should be treated as blocks. A balanced set of treatments within each day (randomised) ensures that the day effect does not confound any factor effect.",
            },
          ],
          hint: "Think about how many runs the factorial requires, how to use remaining runs wisely, and how to handle nuisance variables like day-to-day variation.",
        },
        {
          type: "sorter",
          id: "aqe-m5-lab-10",
          title: "Match DOE Pitfalls to Solutions",
          task: "Match each common DOE pitfall to the most appropriate preventive measure.",
          layout: "columns",
          buckets: [
            { label: "Randomise run order" },
            { label: "Validate measurement system" },
            { label: "Block on nuisance variable" },
            { label: "Increase replication" },
          ],
          items: [
            {
              text: "Ambient temperature drifts during the experiment and affects the response unpredictably",
              bucket: 0,
              explain:
                "Randomisation spreads unpredictable environmental effects evenly across treatments, preventing them from biasing specific factor effects.",
            },
            {
              text: "The caliper used to measure bore diameter has poor repeatability (high Gage R&R %)",
              bucket: 1,
              explain:
                "A measurement system with poor repeatability inflates residual error. Validating and improving the measurement system before experimenting is essential.",
            },
            {
              text: "Two batches of raw material must be used during the experiment",
              bucket: 2,
              explain:
                "Known batch-to-batch differences should be controlled by blocking. Assign treatments within each batch block to remove this source of variation.",
            },
            {
              text: "The experiment detects no significant effects despite expected differences",
              bucket: 3,
              explain:
                "If the error variance is too large relative to the effects, the F-test lacks power. Increasing replication reduces the error mean square and increases the chance of detecting real effects.",
            },
          ],
        },
        {
          type: "links",
          items: [
            {
              label: "ASQ — Design of Experiments Guidance",
              url: "https://asq.org/quality-resources/design-of-experiments",
              source: "ASQ",
            },
          ],
        },
      ],
    },

    // ===== PRACTICE LESSON =====
    {
      id: "aqe-m5-practice",
      number: 6,
      title: "Practice: Design of Experiments",
      duration: 30,
      objectives: [
        "Apply DOE terminology and concepts across a range of difficulty levels",
        "Calculate and interpret factorial effects from experimental data",
        "Design and analyse experiments for complex manufacturing scenarios",
      ],
      blocks: [
        {
          type: "p",
          text: "This practice lesson consolidates your learning across the full range of DOE topics. Work through all four labs, progressing from basic terminology to advanced factorial analysis and experimental design.",
        },
        // --- Practice Lab 1: Beginner ---
        {
          type: "form",
          id: "aqe-m5-plab-01",
          level: "beginner",
          title: "Identify Factors, Levels and Responses",
          task: "For each manufacturing scenario, identify the factors, levels and response variable.",
          fields: [
            {
              kind: "select",
              label: "A Douala chocolate factory tests two cocoa butter percentages (28% and 32%) and two conching times (12h and 18h) to optimise smoothness score. What are the factors?",
              options: [
                "Smoothness score and cocoa butter percentage",
                "Cocoa butter percentage and conching time",
                "Conching time and smoothness score",
                "Cocoa butter percentage only",
              ],
              answer: 1,
              explain:
                "The factors are the controllable variables: cocoa butter percentage and conching time. Smoothness score is the response (the measured outcome).",
            },
            {
              kind: "select",
              label: "In the same experiment, how many treatment combinations are there?",
              options: ["2", "3", "4", "6"],
              answer: 2,
              explain:
                "Two factors at two levels each: 2² = 4 treatment combinations (28%-12h, 28%-18h, 32%-12h, 32%-18h).",
            },
            {
              kind: "select",
              label: "A Bafoussam coffee roaster tests roast temperature at three levels (180°C, 200°C, 220°C) and roast time at two levels (10 min, 15 min). How many treatments in the full factorial?",
              options: ["5", "6", "8", "9"],
              answer: 1,
              explain:
                "3 levels of temperature × 2 levels of time = 6 treatment combinations in the full factorial.",
            },
            {
              kind: "select",
              label: "A cement plant engineer says 'I ran each treatment 3 times independently.' What DOE term describes this?",
              options: ["3 blocks", "3 levels", "3 replicates", "3 factors"],
              answer: 2,
              explain:
                "Running the same treatment combination independently multiple times gives replicates, which are used to estimate experimental error.",
            },
          ],
          hint: "Factors are what you control. Levels are the specific values of each factor. The response is what you measure.",
        },
        // --- Practice Lab 2: Intermediate ---
        {
          type: "sheet",
          id: "aqe-m5-plab-02",
          level: "intermediate",
          title: "Calculate Effects for a 2² Factorial",
          task: "A Cameroonian tile factory tested two factors on tile breaking strength (N): Factor A = firing temperature (1050°C vs 1150°C) and Factor B = clay moisture (8% vs 12%). Calculate all three effects (A, B, AB).",
          data: [
            ["Run", "A", "B", "AB", "Strength (N)", "", "Effect", "Value"],
            [1, -1, -1, 1, 420, null, "A", null],
            [2, 1, -1, -1, 510, null, "B", null],
            [3, -1, 1, -1, 390, null, "AB", null],
            [4, 1, 1, 1, 460, null, "", null],
          ],
          editable: ["H2", "H3", "H4"],
          checks: [
            { cell: "H2", equals: 80, tol: 1 },
            { cell: "H3", equals: -40, tol: 1 },
            { cell: "H4", equals: -10, tol: 1 },
          ],
          hint: "Effect A = (1/2)[−420 + 510 − 390 + 460]. Use the contrast signs from column A for each response.",
          solution: {
            H2: "80",
            H3: "-40",
            H4: "-10",
          },
        },
        // --- Practice Lab 3: Advanced ---
        {
          type: "sheet",
          id: "aqe-m5-plab-03",
          level: "advanced",
          title: "Analyse a 2³ Factorial with Effects and ANOVA",
          task: "A Kribi shrimp processing plant ran a 2³ factorial (2 replicates) on shelf life (days). Factors: A = brine concentration, B = smoking time, C = packaging type. Calculate main effects from the run averages and determine which effect has the largest SS. SS = (n × 2^k / 4) × effect² where n=2 replicates and 2^k=8.",
          data: [
            ["Run", "A", "B", "C", "y̅ (days)", "", "Effect", "Value", "SS"],
            [1, -1, -1, -1, 8, null, "A", null, null],
            [2, 1, -1, -1, 12, null, "B", null, null],
            [3, -1, 1, -1, 10, null, "C", null, null],
            [4, 1, 1, -1, 15, null, "AB", null, null],
            [5, -1, -1, 1, 11, null, "AC", null, null],
            [6, 1, -1, 1, 16, null, "BC", null, null],
            [7, -1, 1, 1, 14, null, "ABC", null, null],
            [8, 1, 1, 1, 18, null, "", null, null],
          ],
          editable: ["H2", "H3", "H4", "I2", "I3", "I4"],
          checks: [
            { cell: "H2", equals: 4.5, tol: 0.1 },
            { cell: "H3", equals: 2.5, tol: 0.1 },
            { cell: "H4", equals: 3.5, tol: 0.1 },
            { cell: "I2", equals: 81.0, tol: 1 },
            { cell: "I3", equals: 25.0, tol: 1 },
            { cell: "I4", equals: 49.0, tol: 1 },
          ],
          hint: "Effect A = (1/4)[−8+12−10+15−11+16−14+18] = (1/4)(18) = 4.5. SS_A = (2×8/4)×4.5² = 4×20.25 = 81.0.",
          solution: {
            H2: "4.5",
            H3: "2.5",
            H4: "3.5",
            I2: "81.0",
            I3: "25.0",
            I4: "49.0",
          },
        },
        // --- Practice Lab 4: Expert ---
        {
          type: "form",
          id: "aqe-m5-plab-04",
          level: "expert",
          title: "Design and Interpret a Fractional Factorial",
          task: "A Douala paint factory wants to study 5 factors affecting drying time. Budget allows only 16 runs (plus replicates). Design and interpret the experiment.",
          fields: [
            {
              kind: "select",
              label: "A full factorial in 5 factors requires 2⁵ = 32 runs. To fit within 16 runs, which design is appropriate?",
              options: [
                "2^(5−2) Resolution III design (8 runs)",
                "2^(5−1) Resolution V design (16 runs)",
                "Plackett-Burman in 12 runs",
                "Box-Behnken design (46 runs)",
              ],
              answer: 1,
              explain:
                "A 2^(5−1) design uses 16 runs and provides Resolution V — all main effects and two-factor interactions are estimable without aliasing. This is the best fit for the budget.",
            },
            {
              kind: "select",
              label: "In a 2^(5−1) design with generator E = ABCD, what is the defining relation?",
              options: [
                "I = ABCDE",
                "I = ABCD",
                "I = ABE",
                "I = CDE",
              ],
              answer: 0,
              explain:
                "Multiply both sides of E = ABCD by E: E² = ABCDE, so I = ABCDE. The defining relation is I = ABCDE, a five-letter word giving Resolution V.",
            },
            {
              kind: "select",
              label: "With I = ABCDE, what is the alias of the two-factor interaction AB?",
              options: [
                "CDE",
                "CD",
                "ABC",
                "DE",
              ],
              answer: 0,
              explain:
                "Alias of AB = AB × ABCDE = A²B²CDE = CDE. So AB is aliased with the three-factor interaction CDE. Since Resolution V means the shortest word is 5 letters, 2FI are aliased only with 3FI — which are usually negligible.",
            },
            {
              kind: "select",
              label: "After running the 2^(5−1) experiment, the analysis shows main effects A and C are significant, along with the AC interaction. The optimal drying time occurs at A = +1, C = −1. What should the engineer do next?",
              options: [
                "Implement A = +1, C = −1 immediately on the production line",
                "Run 3–5 confirmation trials at A = +1, C = −1 with other factors at current levels",
                "Run a full 2⁵ factorial to verify all effects",
                "Switch to OFAT testing on factors A and C only",
              ],
              answer: 1,
              explain:
                "Before changing production settings, always run confirmation trials at the predicted optimum. This verifies the model’s prediction under real production conditions and builds confidence in the result.",
            },
          ],
          hint: "Think about the relationship between the number of runs, the fraction size, and the resolution. For the defining relation, multiply the generator by the factor it defines.",
        },
      ],
    },
  ],

  // ===== QUIZ =====
  quiz: {
    id: "aqe-m5-quiz",
    title: "Module 5 Quiz: Design of Experiments",
    passPct: 75,
    questions: [
      {
        id: "aqe-m5-q1",
        text: "What is the main disadvantage of the one-factor-at-a-time (OFAT) approach compared to factorial designs?",
        options: [
          "OFAT requires more runs than a factorial design",
          "OFAT cannot detect interactions between factors",
          "OFAT can only test one level per factor",
          "OFAT requires more replicates to achieve the same precision",
        ],
        answer: 1,
        explain:
          "The critical flaw of OFAT is its inability to detect interactions. Because only one factor changes at a time while others are held constant, any synergistic or antagonistic effects between factors are invisible.",
      },
      {
        id: "aqe-m5-q2",
        text: "In a 2² factorial with responses (standard order) y₁ = 30, y₂ = 50, y₃ = 25, y₄ = 55, what is the interaction effect AB?",
        options: ["5.0", "10.0", "25.0", "5.0 but negative"],
        answer: 0,
        explain:
          "AB = (1/2)[(+1)(30) + (−1)(50) + (−1)(25) + (+1)(55)] = (1/2)[30 − 50 − 25 + 55] = (1/2)(10) = 5.0.",
      },
      {
        id: "aqe-m5-q3",
        text: "A 2³ full factorial design has how many runs per replicate?",
        options: ["6", "8", "9", "12"],
        answer: 1,
        explain: "A 2³ design tests all combinations of 3 factors at 2 levels each: 2 × 2 × 2 = 8 runs.",
      },
      {
        id: "aqe-m5-q4",
        text: "In a 2^(4−1) design with generator D = ABC and defining relation I = ABCD, what is the resolution?",
        options: ["Resolution II", "Resolution III", "Resolution IV", "Resolution V"],
        answer: 2,
        explain:
          "The shortest word in the defining relation I = ABCD has 4 letters, so this is a Resolution IV design. Main effects are clear of two-factor interactions, but two-factor interactions are aliased with each other.",
      },
      {
        id: "aqe-m5-q5",
        text: "What is the primary purpose of centre points in a Central Composite Design?",
        options: [
          "To increase the number of factorial points",
          "To estimate pure error and detect curvature",
          "To replace axial points when they are impractical",
          "To reduce the total number of runs needed",
        ],
        answer: 1,
        explain:
          "Centre points (replicated runs at the midpoint of all factors) provide a model-independent estimate of pure error and test whether the first-order model adequately describes the response or whether curvature (quadratic terms) is present.",
      },
      {
        id: "aqe-m5-q6",
        text: "Which design avoids the extreme corner points of the factor space and uses only three levels per factor?",
        options: [
          "Central Composite Design (CCD)",
          "Plackett-Burman design",
          "Box-Behnken design",
          "2^(k−p) fractional factorial",
        ],
        answer: 2,
        explain:
          "The Box-Behnken design uses only −1, 0 and +1 levels and does not include corner points (where all factors are simultaneously at their extremes). This is advantageous when corner combinations are physically impractical or dangerous.",
      },
      {
        id: "aqe-m5-q7",
        text: "In an ANOVA table for a 2³ factorial, a factor has SS = 6.4, df = 1, and the error MS = 0.25. What is the F-ratio for this factor?",
        options: ["6.4", "25.6", "0.039", "3.2"],
        answer: 1,
        explain:
          "MS for the factor = SS / df = 6.4 / 1 = 6.4. F = MS(factor) / MS(error) = 6.4 / 0.25 = 25.6. This large F-ratio indicates a statistically significant effect.",
      },
      {
        id: "aqe-m5-q8",
        text: "After optimising a process with DOE, the predicted response at optimal settings is 78.5 with a 95% prediction interval of [74.2, 82.8]. Four confirmation runs yield: 76.1, 79.3, 77.8, 80.0. Is the model confirmed?",
        options: [
          "No — the individual values differ from 78.5",
          "No — the confirmation mean is below the prediction",
          "Yes — the confirmation mean (78.3) is within [74.2, 82.8]",
          "Cannot determine without running more trials",
        ],
        answer: 2,
        explain:
          "Confirmation mean = (76.1 + 79.3 + 77.8 + 80.0) / 4 = 78.3. Since 78.3 is within the 95% prediction interval [74.2, 82.8], the model is confirmed. Individual values need not equal the prediction exactly.",
      },
    ],
  },
};
