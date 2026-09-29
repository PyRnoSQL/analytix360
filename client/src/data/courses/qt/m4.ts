import type { CourseModule } from "../../../lms/types";

// Quality Technician certificate — Module 4: Statistical Process Control.
// Original Analytix Engineering material. All companies, people and figures are fictional.

const ASQ = "ASQ";
const NIST = "NIST/SEMATECH e-Handbook";
const TOOLS = ["Check sheet", "Pareto chart", "Cause-and-effect diagram", "Histogram", "Scatter diagram", "Flowchart / stratification", "Control chart"];
const RULES = ["Point beyond a control limit", "Run of 7 on one side of the centre line", "Trend of 6 rising or falling", "2 of 3 points beyond 2σ on the same side", "No signal: common-cause variation only"];

// Lesson 2: 500 ml soft-drink fill volume, 20 subgroups of 5 bottles (stable process).
const FILL: number[][] = [[502.8, 502.6, 500.0, 499.4, 501.4], [502.3, 501.3, 499.9, 501.0, 503.1], [500.0, 502.7, 502.1, 502.0, 502.3], [500.9, 501.4, 503.5, 501.1, 501.0], [500.0, 501.0, 502.3, 502.9, 502.2], [502.2, 502.1, 501.9, 502.6, 501.3], [502.7, 501.4, 499.8, 500.1, 501.3], [501.0, 500.2, 500.7, 501.7, 501.9], [502.4, 500.6, 501.9, 502.6, 501.9], [503.4, 501.0, 501.5, 501.7, 501.1], [501.4, 501.8, 501.5, 501.0, 501.0], [501.4, 499.8, 501.7, 500.3, 501.2], [500.3, 501.6, 501.1, 501.2, 500.7], [501.6, 503.2, 499.6, 502.1, 501.7], [501.1, 500.1, 503.2, 501.7, 502.6], [501.1, 500.7, 502.7, 502.3, 501.2], [501.3, 502.2, 500.6, 500.6, 501.5], [502.6, 502.4, 501.7, 503.0, 501.3], [501.0, 504.0, 501.0, 502.2, 502.1], [501.6, 501.8, 502.3, 502.1, 500.9]];
// Lesson 2: 28-day compressive strength of cement (MPa), one result per production day.
const STRENGTH = [48.1, 48.1, 50.5, 46.6, 49.4, 46.7, 51.0, 49.9, 51.4, 48.9, 50.1, 49.2, 48.6, 49.8, 48.0, 49.1, 50.5, 49.7, 49.1, 52.4];
// Lesson 3: defective PET preforms in samples of 200 per shift (shift 13: new resin lot).
const PREFORMS = [7, 7, 5, 3, 2, 5, 9, 6, 6, 2, 5, 11, 17, 4, 6, 5, 8, 8, 8, 6];
// Practice: brake disc thickness, subgroups of 4 (subgroup 12: insert offset set wrong).
const DISC: number[][] = [[22.004, 22.03, 22.013, 22.013], [22.008, 22.005, 22.008, 22.0], [21.992, 21.99, 21.987, 22.004], [22.008, 22.021, 22.007, 22.005], [22.009, 22.001, 21.978, 22.014], [21.996, 22.004, 21.998, 22.037], [22.015, 22.006, 21.987, 22.012], [21.99, 22.016, 21.983, 22.0], [22.013, 21.991, 22.003, 22.003], [22.013, 21.995, 22.01, 22.027], [21.983, 21.991, 22.007, 21.993], [22.021, 22.055, 22.049, 22.051], [22.015, 22.011, 21.991, 21.972], [22.008, 21.988, 22.002, 22.006], [21.986, 21.997, 22.023, 22.011], [21.981, 21.999, 22.002, 22.009], [22.011, 22.001, 21.999, 22.013], [21.984, 22.016, 22.006, 21.995], [21.994, 22.004, 21.983, 21.972], [22.006, 22.02, 21.999, 22.002]];
// Practice: 50 kg cement bag weight, one bag every 15 minutes.
const BAGS = [50.18, 50.39, 50.58, 50.63, 50.56, 50.36, 50.41, 50.31, 50.12, 50.27, 50.52, 50.39, 50.29, 50.16, 50.33, 50.25, 50.36, 50.44, 49.94, 50.33];
// Practice: paint defects per car body (body 8: dirty booth filter; from body 15: new thinner lot).
const PAINT = [4, 3, 5, 2, 4, 6, 3, 15, 4, 3, 2, 5, 3, 4, 7, 8, 6, 7, 9, 6, 8, 7, 6, 8, 7];

export const m4: CourseModule = {
  id: "qt-m4",
  number: 4,
  title: "Statistical Process Control",
  summary: "The seven basic quality tools, variables and attribute control charts, out-of-control signals and process capability.",
  hours: 14,
  lessons: [
    // ───────────────────────────── LESSON 1 ─────────────────────────────
    {
      id: "qt-m4-l1",
      title: "The seven basic quality tools",
      minutes: 20,
      objectives: [
        "Name the seven basic quality tools and the question each one answers",
        "Choose the right tool for a quality problem on the shop floor",
        "Find the vital few defect categories with a Pareto chart",
      ],
      blocks: [
        { type: "p", text: "Most quality problems in a factory are solved with simple tools, a pencil and good data, not with advanced statistics. Seven tools, made popular by the Japanese quality pioneer Kaoru Ishikawa, cover almost every step: collecting facts, finding the biggest problem, searching for causes, and watching whether the process stays stable. A good technician knows which tool answers which question." },
        { type: "h", text: "One question, one tool" },
        { type: "table", head: ["Tool", "Question it answers", "Example in a plant"], rows: [
          ["Check sheet", "How often does each thing happen, and where or when?", "Tally of bottle rejects by type and by hour on the filling line"],
          ["Pareto chart", "Which few categories cause most of the problem?", "Low fill and crooked crowns make 73% of all rejects"],
          ["Cause-and-effect diagram", "What could be causing this effect?", "Brainstorm of 6M causes for cracked cement blocks"],
          ["Histogram", "What is the shape, centre and spread of the measurements?", "Distribution of 100 shaft diameters against the tolerance"],
          ["Scatter diagram", "Are two variables related?", "Kiln temperature against clinker free lime"],
          ["Flowchart / stratification", "What are the steps, and do results differ by group?", "Defect rate split by shift, machine or supplier"],
          ["Control chart", "Is the process stable over time, or has something changed?", "X-bar R chart of fill volume, subgroup every hour"],
        ] },
        { type: "callout", tone: "key", title: "Tools work as a chain", text: "A check sheet collects the data, a Pareto chart picks the biggest problem, a cause-and-effect diagram lists possible causes, a scatter diagram or stratification tests them, and a control chart confirms that the fix holds." },
        { type: "h", text: "Check sheets and histograms" },
        { type: "p", text: "A check sheet is a prepared form where the inspector makes a tally mark each time an event occurs. Design it before collecting: fixed categories, a column per hour or per shift, and room for the inspector's name and date. A histogram groups measurements into equal classes (bins) and shows how many fall in each. Draw the specification limits on it: you see at once whether the process is centred, too wide, skewed, or has two peaks, which often means two machines or two material lots mixed together." },
        { type: "h", text: "The Pareto principle" },
        { type: "p", text: "In most processes a few causes produce most of the defects: roughly 80% of the problem from 20% of the categories. A Pareto chart sorts the categories from largest to smallest and adds a cumulative percentage line. The categories needed to reach about 80% are the vital few: work on them first. Remember that Pareto ranks by count or cost, not by severity: a rare critical defect is still treated at once." },
        { type: "steps", title: "Build a Pareto chart", items: [
          "Collect counts per category over a fixed period with a check sheet.",
          "Sort the categories from the largest count to the smallest, keeping \"Other\" last.",
          "Compute each category's percentage of the total and the cumulative percentage.",
          "Draw the bars and the cumulative line on a second axis.",
          "Mark the categories needed to reach about 80%: these are the vital few.",
        ] },
        { type: "path", items: ["Insert", "Charts", "Insert Statistic Chart", "Pareto"], note: "In Excel 2016 and later, select the categories and their counts first. Excel sorts the bars and draws the cumulative line for you." },
        { type: "callout", tone: "workplace", title: "In the workplace", text: "At a soft-drink plant in Bonabéri, the QC team counted 450 rejected bottles in one week on a check sheet. The Pareto chart showed that low fill and crooked crowns made almost three quarters of the rejects. Instead of retraining everybody, the maintenance team reset the filling valves and the crowner heads, and rejects fell by half the following week." },
        { type: "pareto", id: "qt-m4-l1-pareto", title: "Rejects on a bottling line", task: "One week of rejects on a 500 ml soft-drink line at the fictional Brasseries du Littoral. Select the vital few categories that together reach 80% of the rejects.", unit: "bottles", hint: "Sort from largest to smallest and add the percentages until the running total reaches 80%.",
          categories: [{ label: "Low fill", count: 186 }, { label: "Crooked or missing crown", count: 142 }, { label: "Label misplaced", count: 58 }, { label: "Dirty bottle", count: 31 }, { label: "Chipped neck", count: 22 }, { label: "Other", count: 11 }] },
        { type: "sorter", id: "qt-m4-l1-tools", layout: "columns", title: "Which tool answers the question?", task: "Place each question in the column of the tool that answers it best.", hint: "Think about the kind of data: counts by category, measurements, two variables, groups, or results in time order.",
          buckets: TOOLS.map((label) => ({ label })),
          items: [
            { text: "Record how many of each defect type appear per hour on the paint line", bucket: 0, explain: "A check sheet is the simple form used to tally events as they happen." },
            { text: "Find which three complaint types make most of the customer returns", bucket: 1, explain: "Sorting categories by size to find the vital few is the job of a Pareto chart." },
            { text: "List possible causes of porous welds under people, machine, method, material, measurement and environment", bucket: 2, explain: "The fishbone organises possible causes of one effect into categories." },
            { text: "See whether 125 piston pin diameters are centred inside the tolerance", bucket: 3, explain: "A histogram shows the centre, spread and shape of a set of measurements." },
            { text: "Check whether the moisture of cocoa beans is related to drying time", bucket: 4, explain: "Two numeric variables for the same items go on a scatter diagram." },
            { text: "Compare defect rates of the morning, afternoon and night shifts", bucket: 5, explain: "Splitting data by group is stratification." },
            { text: "Map every step from raw material reception to dispatch to see where inspection happens", bucket: 5, explain: "A flowchart shows the sequence of process steps." },
            { text: "Know whether the average bag weight has shifted since this morning", bucket: 6, explain: "A control chart plots results in time order against limits to detect changes." },
          ] },
        { type: "check", id: "qt-m4-l1-c1", question: "A histogram of 100 brake disc thickness readings shows two separate peaks. What is the most likely explanation?", options: ["The process is perfectly centred", "Two different sources, such as two machines or two casting lots, are mixed in the data", "The measuring instrument has too fine a resolution", "The sample is too large"], answer: 1, explain: "Two peaks usually mean two populations mixed together. Stratify the data by machine, lot or operator to find them." },
        { type: "task", id: "qt-m4-l1-t1", title: "Practice", items: [
          "Design a check sheet for the three most common defects in your workplace, with one column per hour or shift",
          "Collect one week of data and draw a Pareto chart of the categories",
          "Draw a cause-and-effect diagram for the biggest category with two colleagues",
          "Pick two variables you suspect are linked and plot 20 pairs on a scatter diagram",
          "Write which tool you would use to check that your improvement holds",
        ] },
        { type: "links", items: [
          { label: "Seven basic quality tools", url: "https://asq.org/quality-resources/seven-basic-quality-tools", source: ASQ },
          { label: "What is a Pareto chart?", url: "https://asq.org/quality-resources/pareto", source: ASQ },
        ] },
      ],
    },

    // ───────────────────────────── LESSON 2 ─────────────────────────────
    {
      id: "qt-m4-l2",
      title: "Variables control charts: X-bar R and I-MR",
      minutes: 25,
      objectives: [
        "Explain common and special causes and why subgroups must be rational",
        "Calculate the limits of X-bar R and I-MR charts with the standard constants",
        "Distinguish control limits from specification limits",
      ],
      blocks: [
        { type: "p", text: "Every process varies. Two bottles filled one after the other never hold exactly the same volume. Statistical process control (SPC) separates the normal, random variation of a process from the variation caused by something that changed. A control chart is the tool that makes the difference visible, so operators react when they should and leave the process alone when they should not. A process with only common causes is stable, or in statistical control: its output can be predicted, even if some parts are out of tolerance." },
        { type: "h", text: "Common causes and special causes" },
        { type: "table", head: ["", "Common causes", "Special causes"], rows: [
          ["What they are", "Many small, permanent sources of variation built into the process", "A specific event that is not part of the normal process"],
          ["Examples", "Small valve differences, normal temperature swings, small material variation", "Worn tool, new raw material lot, wrong setting after changeover, untrained operator"],
          ["On the chart", "Points vary randomly between the limits", "Points beyond the limits or non-random patterns"],
          ["Who acts", "Management: changing the system (machine, method, material)", "The operator and technician: find the cause and remove it"],
        ] },
        { type: "h", text: "Rational subgroups" },
        { type: "p", text: "For an X-bar R chart you take small subgroups, usually 4 or 5 consecutive parts, at regular intervals, for example every hour. Consecutive parts are made under almost identical conditions, so the variation inside a subgroup shows only common causes. Differences between subgroups then reveal special causes. Never mix parts from two machines or two filling heads in one subgroup: the ranges would grow and the limits would become too wide to detect anything. Collect at least 20 to 25 subgroups before calculating limits." },
        { type: "h", text: "X-bar R chart: the calculations" },
        { type: "steps", title: "Limits for an X-bar R chart", items: [
          "For each subgroup, compute the mean X̄ and the range R = largest − smallest.",
          "Compute the grand mean X̿ (the average of all subgroup means) and R̄ (the average range).",
          "X̄ chart: centre line X̿, UCL = X̿ + A2 × R̄, LCL = X̿ − A2 × R̄.",
          "R chart: centre line R̄, UCL = D4 × R̄, LCL = D3 × R̄.",
          "Look at the R chart first: if the ranges are not stable, the X̄ limits are not reliable.",
          "Estimate the process standard deviation as σ ≈ R̄ / d2. You will need it for capability in lesson 4.",
        ] },
        { type: "table", head: ["n", "A2", "D3", "D4", "d2"], rows: [
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
        { type: "spc", id: "qt-m4-l2-xbar", chart: "xbar-r", title: "Fill volume of 500 ml bottles", unit: "ml", decimals: 1, samples: FILL, askLimits: true,
          task: "Every hour, the QC technician of a fictional Douala soft-drink plant measures 5 consecutive bottles from the same filling head. Compute the centre line and control limits of the X̄ chart and of the R chart (n = 5).",
          hint: "Average the 20 subgroup means to get X̿ and the 20 ranges to get R̄. With n = 5: A2 = 0.577, D3 = 0, D4 = 2.114.",
          question: { question: "All points fall inside the limits and show no pattern. What does this tell you?", options: ["Every bottle is within specification", "The process is stable: only common-cause variation is present", "The filler must be adjusted towards 500.0 ml", "The limits are wrong because no point is outside"], answer: 1, explain: "A stable chart shows that the process is predictable. Whether the bottles meet the specification is a separate question, answered by capability." } },
        { type: "h", text: "I-MR chart for one value at a time" },
        { type: "p", text: "Sometimes subgroups make no sense: one cement strength result per day, one pH per batch, one assay per tank. Then use an individuals and moving range chart (I-MR). The moving range is the absolute difference between each value and the previous one." },
        { type: "list", items: [
          "Individuals chart: centre line X̄, UCL = X̄ + 2.66 × MR̄, LCL = X̄ − 2.66 × MR̄.",
          "Moving range chart: centre line MR̄, UCL = 3.267 × MR̄, LCL = 0.",
          "2.66 is 3 / d2 for n = 2 (3 / 1.128), and 3.267 is D4 for n = 2.",
        ] },
        { type: "spc", id: "qt-m4-l2-imr", chart: "imr", title: "28-day compressive strength of cement", unit: "MPa", decimals: 1, values: STRENGTH, askLimits: true,
          task: "A fictional cement plant near Figuil tests one CEM II 42.5 sample per production day. Compute the centre line and limits of the individuals chart and of the moving range chart for these 20 results.",
          hint: "There are 20 values but only 19 moving ranges. Use 2.66 × MR̄ around the mean, and 3.267 × MR̄ for the moving range UCL." },
        { type: "h", text: "Control limits are not specification limits" },
        { type: "table", head: ["", "Control limits", "Specification limits"], rows: [
          ["Come from", "The process data (the voice of the process)", "The customer or the drawing (the voice of the customer)"],
          ["Apply to", "Subgroup means, ranges or individual values", "Individual parts"],
          ["Tell you", "Whether the process is stable", "Whether a part is acceptable"],
          ["Changed by", "Recalculating after a real, lasting process change", "Only the customer or the design authority"],
        ] },
        { type: "callout", tone: "warning", title: "Never draw specification limits on an X̄ chart", text: "Subgroup means vary much less than individual parts. A mean can sit comfortably inside the tolerance while single bottles are out. Keep tolerances on the histogram, and control limits on the control chart." },
        { type: "callout", tone: "workplace", title: "In the workplace", text: "In a machine shop in Bassa, an operator adjusted the lathe each time a shaft came close to the tolerance limit, reading the drawing rather than a control chart. When the team plotted an X-bar R chart, the process turned out to be stable, and the adjustments were only adding variation. They stopped adjusting and the scrap rate dropped." },
        { type: "check", id: "qt-m4-l2-c1", question: "An X-bar R chart uses subgroups of 4 parts. X̿ = 22.004 mm and R̄ = 0.027 mm. What is the UCL of the X̄ chart?", options: ["22.024 mm", "22.031 mm", "22.066 mm", "22.019 mm"], answer: 0, explain: "UCL = X̿ + A2 × R̄ = 22.004 + 0.729 × 0.027 = 22.004 + 0.020 = 22.024 mm." },
        { type: "task", id: "qt-m4-l2-t1", title: "Practice", items: [
          "Choose one measured characteristic in your workplace and decide on a rational subgroup (size and frequency)",
          "Collect 20 subgroups and compute X̿, R̄ and the limits with the constants table",
          "For a characteristic measured once per batch, set up an I-MR chart instead",
          "Estimate the process standard deviation with R̄ / d2",
          "Explain to an operator the difference between the control limits and the tolerance on the drawing",
        ] },
        { type: "links", items: [
          { label: "What are variables control charts?", url: "https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc32.htm", source: NIST },
          { label: "Control chart", url: "https://asq.org/quality-resources/control-chart", source: ASQ },
        ] },
      ],
    },

    // ───────────────────────────── LESSON 3 ─────────────────────────────
    {
      id: "qt-m4-l3",
      title: "Attribute charts and out-of-control signals",
      minutes: 25,
      objectives: [
        "Calculate the limits of a p chart and a c chart",
        "Recognise the main out-of-control rules on any control chart",
        "Apply a reaction plan without tampering with a stable process",
      ],
      blocks: [
        { type: "p", text: "Not every quality characteristic is measured. Many are judged: a preform is good or defective, a car body has a number of paint defects, a bag is torn or not. These are attribute data, and they have their own control charts. Whatever the chart, the same rules tell you when the process has changed, and the same reaction plan tells you what to do." },
        { type: "h", text: "Which attribute chart?" },
        { type: "table", head: ["Chart", "What you plot", "Typical use", "Limits"], rows: [
          ["p chart", "Proportion of defective units in each sample", "Defective preforms in 200 inspected per shift", "p̄ ± 3 × √(p̄(1 − p̄) / n)"],
          ["c chart", "Number of defects on one inspection unit of the same size", "Paint defects per car body, flaws per 10 m of fabric", "c̄ ± 3 × √c̄"],
        ] },
        { type: "p", text: "A defective is a unit that fails; a defect is one flaw. One car body can have five defects and still be one defective unit. When the lower limit comes out negative, it is set to zero. In this course the p chart uses a constant sample size; when the sample size changes, the limits change for each sample (or you use a u chart for defects per unit)." },
        { type: "steps", title: "Limits for a p chart", items: [
          "For each sample, compute p = defectives ÷ sample size.",
          "Compute p̄ = total defectives ÷ total units inspected.",
          "Compute the standard error √(p̄ × (1 − p̄) ÷ n).",
          "UCL = p̄ + 3 × standard error; LCL = p̄ − 3 × standard error, or 0 if negative.",
        ] },
        { type: "spc", id: "qt-m4-l3-p", chart: "p", title: "Defective PET preforms per shift", decimals: 4, defectives: PREFORMS, sampleSize: 200, askLimits: true, askBeyond: true,
          task: "A fictional plastic packaging plant in Douala inspects 200 preforms per shift. Compute p̄ and the limits as proportions (for example 0.0325, not 3.25%), then click every point beyond the limits.",
          hint: "Total defectives ÷ (20 × 200) gives p̄. The standard error is √(p̄ × (1 − p̄) ÷ 200). The LCL is negative, so it is 0.",
          question: { question: "The shift log for the point above the UCL shows that a new resin lot was loaded at the start of that shift. What should the team do?", options: ["Recalculate the limits including this point and carry on", "Quarantine the preforms from that shift, check the resin lot against its certificate and contact the supplier", "Adjust the injection temperature after every shift", "Ignore it: one point out of 20 is normal"], answer: 1, explain: "A point beyond the limits is a signal of a special cause. Contain the suspect product, confirm the cause and act on it. Tampering with settings or ignoring the signal both let it happen again." } },
        { type: "h", text: "Out-of-control signals" },
        { type: "p", text: "A point beyond a limit is the clearest signal, but a process can change without crossing a limit. Patterns that are very unlikely under pure chance also count. Plants use slightly different sets of rules; the most common are these:" },
        { type: "table", head: ["Rule", "What you see", "Typical cause"], rows: [
          ["1. Point beyond a limit", "One point above the UCL or below the LCL", "A sudden event: wrong setting, broken tool, bad material lot"],
          ["2. Run", "7 points in a row on the same side of the centre line (some plants use 8 or 9)", "A lasting shift: new supplier, new operator, recalibrated gauge"],
          ["3. Trend", "6 points in a row steadily rising or steadily falling", "Gradual drift: tool wear, filter clogging, heating up"],
          ["4. Zone rule", "2 of 3 points in a row beyond 2σ on the same side", "An early warning of a shift"],
        ] },
        { type: "callout", tone: "key", title: "Zones on the chart", text: "Divide the distance between the centre line and each limit into three equal zones of 1σ. The zone rule needs these lines; the other three rules only need the centre line and the limits." },
        { type: "h", text: "The reaction plan" },
        { type: "steps", title: "When a signal appears", items: [
          "Stop and mark the point on the chart with the time.",
          "Contain: set aside and check the product made since the last good subgroup.",
          "Investigate the special cause: what changed in people, machine, method, material, measurement or environment?",
          "Correct the cause, not just the setting, and note the action on the chart.",
          "Restart and confirm with the next subgroups that the process is back in control.",
        ] },
        { type: "callout", tone: "warning", title: "Do not tamper", text: "Adjusting a stable process after every result, because one value is a little high or low, is called tampering or over-adjustment. It reacts to common-cause noise and makes the variation larger. If the chart shows no signal, leave the process alone." },
        { type: "callout", tone: "workplace", title: "In the workplace", text: "At an assembly workshop in Douala, the c chart of paint defects per bus body stayed inside the limits, but eight bodies in a row sat above the centre line. No single point was alarming. The team checked what had changed and found a new batch of thinner, delivered the day the run started." },
        { type: "form", id: "qt-m4-l3-rules", title: "Which rule is broken?", task: "Each description comes from a different control chart. Choose the signal it shows, or no signal.", hint: "Count carefully: a run is about the side of the centre line, a trend about the direction of each step.",
          fields: [
            { kind: "select", label: "X̄ chart of shaft diameter: subgroup 17 is 0.004 mm above the UCL", options: RULES, answer: 0, explain: "Any point outside a control limit is a signal." },
            { kind: "select", label: "c chart of weld defects: the last 8 frames all have more defects than the centre line, all inside the limits", options: RULES, answer: 1, explain: "8 points on one side is a run: something has shifted the average." },
            { kind: "select", label: "I chart of palm oil acidity: 0.21, 0.23, 0.24, 0.26, 0.28, 0.31 %, each higher than the last", options: RULES, answer: 2, explain: "6 points steadily rising is a trend, often wear or a slow drift." },
            { kind: "select", label: "X̄ chart of bag weight: two of the last three points are between 2σ and the UCL", options: RULES, answer: 3, explain: "2 of 3 points beyond 2σ on the same side is an early warning of a shift." },
            { kind: "select", label: "p chart of label defects: points go up and down around the centre line, none outside the limits, no run or trend", options: RULES, answer: 4, explain: "Random variation inside the limits is common cause. Leave the process alone." },
            { kind: "select", label: "The fill of one bottle is 1 ml above the mean, all charts are in control. What should the operator do?", options: ["Lower the filler setting by 1 ml", "Nothing: the chart shows no signal", "Stop the line", "Recalculate the limits"], answer: 1, explain: "Adjusting after a single in-control result is tampering. It increases variation." },
          ] },
        { type: "check", id: "qt-m4-l3-c1", question: "A c chart has c̄ = 9 defects per unit. What are its limits?", options: ["UCL 18, LCL 0", "UCL 12, LCL 6", "UCL 36, LCL 0", "UCL 27, LCL 0"], answer: 0, explain: "√9 = 3, so UCL = 9 + 3 × 3 = 18 and LCL = 9 − 9 = 0." },
        { type: "task", id: "qt-m4-l3-t1", title: "Practice", items: [
          "Find one attribute you already count in your workplace and decide whether it needs a p chart or a c chart",
          "Collect 20 samples and compute the centre line and limits",
          "Draw the 1σ and 2σ zone lines and check the four rules",
          "Write a one-page reaction plan for your chart and post it next to it",
          "Explain tampering to an operator with an example from your line",
        ] },
        { type: "links", items: [
          { label: "What are attributes control charts?", url: "https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc33.htm", source: NIST },
        ] },
      ],
    },

    // ───────────────────────────── LESSON 4 ─────────────────────────────
    {
      id: "qt-m4-l4",
      title: "Process capability: Cp and Cpk",
      minutes: 25,
      objectives: [
        "Calculate Cp and Cpk from the specification limits, the mean and the standard deviation",
        "Interpret capability against the 1.33 and 1.67 targets",
        "Decide whether to centre the process or reduce its variation",
      ],
      blocks: [
        { type: "p", text: "A control chart tells you whether a process is stable. It does not tell you whether it is good enough. Process capability compares the natural spread of a stable process with the tolerance the customer allows. Customers in automotive, pharmaceutical and food supply chains often ask for capability figures before they approve a supplier." },
        { type: "h", text: "Stability first" },
        { type: "p", text: "Capability only makes sense for a stable process. If the control chart shows special causes, the mean and the spread are moving, and any capability number describes a process that no longer exists. Remove the special causes, confirm stability over at least 20 to 25 subgroups, then calculate capability." },
        { type: "h", text: "Natural spread against the tolerance" },
        { type: "p", text: "A stable process with a roughly normal distribution puts almost all its output (about 99.73%) within ±3σ of the mean. This 6σ width is its natural spread. The tolerance is USL − LSL. Capability indices simply compare the two." },
        { type: "table", head: ["Index", "Formula", "What it measures"], rows: [
          ["Cp", "(USL − LSL) ÷ 6σ", "Potential: could the process fit inside the tolerance if it were centred?"],
          ["Cpk", "min(USL − μ, μ − LSL) ÷ 3σ", "Actual: how far is the mean from the nearer limit, in units of 3σ?"],
        ] },
        { type: "p", text: "Here σ is the short-term standard deviation, estimated from the control chart as R̄ ÷ d2 (or MR̄ ÷ 1.128 for an I-MR chart), and μ is the process mean. Cpk is never larger than Cp; the two are equal only when the process is perfectly centred." },
        { type: "table", head: ["Cpk", "Meaning", "Usual decision"], rows: [
          ["Below 1.00", "Part of the output is outside the tolerance", "Not capable: 100% inspection and urgent improvement"],
          ["1.00 to 1.33", "Just fits, with no margin", "Marginal: improve and watch closely"],
          ["1.33 or more", "About one σ of margin on each side", "Capable: the usual minimum target"],
          ["1.67 or more", "Comfortable margin", "Often required for safety or critical characteristics and new processes"],
        ] },
        { type: "h", text: "Two ways to improve" },
        { type: "list", items: [
          "If Cp is good but Cpk is low, the process is off centre. Move the mean to the middle of the tolerance: usually a setting, an offset or a target change. This is quick and cheap.",
          "If Cp itself is low, the process is too wide. Centring cannot help: you must reduce the variation (better fixture, maintenance, material consistency, a more precise machine). This takes longer and costs more.",
        ] },
        { type: "capability", id: "qt-m4-l4-centre", title: "Centre the tablet press", unit: "mg", lsl: 237.5, usl: 262.5, mean: 256, sigma: 2.5, adjust: ["mean"], goal: 1.33,
          task: "A fictional pharmaceutical plant in Yaoundé makes 250 mg tablets with a tolerance of ±5%. The press runs heavy. Move the mean until Cpk reaches at least 1.33.",
          hint: "Cp is already (262.5 − 237.5) ÷ (6 × 2.5) = 1.67. Bring the mean towards 250 mg so that the distance to the nearer limit grows." },
        { type: "capability", id: "qt-m4-l4-spread", title: "Reduce the spread of a bushing bore", unit: "mm", lsl: 29.97, usl: 30.03, mean: 30, sigma: 0.009, adjust: ["sigma"], goal: 1.33,
          task: "A machine shop bores bushings to 30.00 ± 0.03 mm. The process is already centred. Reduce the standard deviation until Cpk reaches at least 1.33.",
          hint: "With a centred process, Cpk = Cp = 0.06 ÷ 6σ. For 1.33 you need σ of about 0.0075 mm or less." },
        { type: "h", text: "Calculate capability in a spreadsheet" },
        { type: "p", text: "In Excel, Cp is a simple division. For Cpk, use MIN to take the nearer limit: =MIN(USL−mean, mean−LSL)/(3*sigma). Then add a decision with IF." },
        { type: "sheet", id: "qt-m4-l4-sheet", title: "Capability summary for four characteristics",
          task: "Fill **F2:F5** with Cp, **G2:G5** with Cpk, and **H2:H5** with \"Capable\" when Cpk is at least 1.33, otherwise \"Not capable\".",
          data: [
            ["Characteristic", "LSL", "USL", "Mean", "Sigma", "Cp", "Cpk", "Decision"],
            ["Tablet weight (mg)", 237.5, 262.5, 250.4, 2.1, null, null, null],
            ["Shaft diameter (mm)", 19.95, 20.05, 20.02, 0.012, null, null, null],
            ["Fill volume (ml)", 495, 510, 501.6, 1, null, null, null],
            ["Cement bag (kg)", 49.5, 51, 50.3, 0.25, null, null, null],
          ],
          editable: ["F2", "F3", "F4", "F5", "G2", "G3", "G4", "G5", "H2", "H3", "H4", "H5"],
          checks: [
            { cell: "F2", equals: 1.984, tol: 0.01 }, { cell: "F3", equals: 1.389, tol: 0.01 }, { cell: "F4", equals: 2.5, tol: 0.01 }, { cell: "F5", equals: 1, tol: 0.01 },
            { cell: "G2", equals: 1.921, tol: 0.01 }, { cell: "G3", equals: 0.833, tol: 0.01 }, { cell: "G4", equals: 2.2, tol: 0.01 }, { cell: "G5", equals: 0.933, tol: 0.01 },
            { cell: "H2", equals: "Capable" }, { cell: "H3", equals: "Not capable" }, { cell: "H4", equals: "Capable" }, { cell: "H5", equals: "Not capable" },
          ],
          hint: "Cp: =(C2-B2)/(6*E2). Cpk: =MIN(C2-D2,D2-B2)/(3*E2). Decision: =IF(G2>=1.33,\"Capable\",\"Not capable\"). Copy each formula down.",
          solution: {
            F2: "=(C2-B2)/(6*E2)", F3: "=(C3-B3)/(6*E3)", F4: "=(C4-B4)/(6*E4)", F5: "=(C5-B5)/(6*E5)",
            G2: "=MIN(C2-D2,D2-B2)/(3*E2)", G3: "=MIN(C3-D3,D3-B3)/(3*E3)", G4: "=MIN(C4-D4,D4-B4)/(3*E4)", G5: "=MIN(C5-D5,D5-B5)/(3*E5)",
            H2: "=IF(G2>=1.33,\"Capable\",\"Not capable\")", H3: "=IF(G3>=1.33,\"Capable\",\"Not capable\")", H4: "=IF(G4>=1.33,\"Capable\",\"Not capable\")", H5: "=IF(G5>=1.33,\"Capable\",\"Not capable\")",
          } },
        { type: "callout", tone: "workplace", title: "In the workplace", text: "A cement plant supplying a construction company in Yaoundé found a Cpk of 0.93 on its 50 kg bags. The Cp was only 1.00, so re-targeting the packer could not fix it alone. The plant first centred the bags, then overhauled the weighing cells of the rotary packer, and reached a Cpk of 1.4 two months later." },
        { type: "check", id: "qt-m4-l4-c1", question: "A process has Cp = 1.8 and Cpk = 0.9. What is the best first action?", options: ["Buy a more precise machine", "Move the process mean towards the middle of the tolerance", "Widen the tolerance", "Inspect every part forever"], answer: 1, explain: "Cp is high, so the spread fits easily. The low Cpk comes from poor centring, which is usually corrected with a setting." },
        { type: "task", id: "qt-m4-l4-t1", title: "Practice", items: [
          "Take a characteristic with a stable control chart from lesson 2 and estimate σ with R̄ ÷ d2",
          "Calculate Cp and Cpk against the drawing or product specification",
          "Decide whether the first action is centring or reducing variation",
          "Build the capability sheet in Excel with MIN and IF for your own characteristics",
          "Present the result to your supervisor with the control chart that proves stability",
        ] },
        { type: "links", items: [
          { label: "What is process capability?", url: "https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm", source: NIST },
          { label: "Process capability", url: "https://asq.org/quality-resources/process-capability", source: ASQ },
        ] },
      ],
    },

    // ───────────────────────────── PRACTICE LAB ─────────────────────────────
    {
      id: "qt-m4-practice",
      title: "Practice lab: control charts and capability on the shop floor",
      minutes: 35,
      objectives: [
        "Find the vital few defects with a Pareto chart",
        "Calculate the limits of an I-MR chart and an X-bar R chart",
        "Detect points beyond the limits and non-random patterns",
        "Decide the right reaction to a signal on a c chart",
      ],
      blocks: [
        { type: "p", text: "Four exercises of increasing difficulty, from beginner to expert. Each one uses a different workplace situation. Take your time: every answer is checked, and the explanations appear after you check." },
        { type: "h", text: "Exercise 1: Weld defects on steel doors" },
        { type: "pareto", id: "qt-pr-m4-welds", level: "beginner", title: "Weld defects on steel doors", unit: "defects",
          task: "A fictional metal workshop in Douala makes steel security doors. One month of weld inspection records is shown. Select the vital few defect types that together reach 80% of the defects.",
          hint: "Pareto ranks by frequency. Cracks are the most serious defect, but they are rare: treat them at once as a critical defect, yet they are not part of the vital few by count.",
          categories: [{ label: "Porosity", count: 34 }, { label: "Undercut", count: 12 }, { label: "Spatter", count: 71 }, { label: "Incomplete fusion", count: 9 }, { label: "Burn-through", count: 46 }, { label: "Cracks", count: 5 }, { label: "Other", count: 8 }] },
        { type: "h", text: "Exercise 2: Cement bag weight" },
        { type: "spc", id: "qt-pr-m4-bags", level: "intermediate", chart: "imr", title: "Weight of 50 kg cement bags", unit: "kg", decimals: 2, values: BAGS, askLimits: true,
          task: "At a fictional cement packing station in Douala, one bag is taken from the rotary packer every 15 minutes and weighed. Compute the centre line and limits of the individuals chart and of the moving range chart.",
          hint: "First compute the 19 moving ranges (absolute differences). Individuals: X̄ ± 2.66 × MR̄. Moving range: UCL = 3.267 × MR̄, LCL = 0." },
        { type: "h", text: "Exercise 3: Brake disc thickness" },
        { type: "spc", id: "qt-pr-m4-disc", level: "advanced", chart: "xbar-r", title: "Brake disc thickness after finish turning", unit: "mm", decimals: 3, samples: DISC, askLimits: true, askBeyond: true,
          task: "A fictional automotive parts shop in Douala measures 4 consecutive brake discs every hour (nominal 22.00 mm). Compute the limits of both charts (n = 4), then click every point beyond the limits.",
          hint: "With n = 4: A2 = 0.729, D3 = 0, D4 = 2.282. Look for a subgroup whose four discs are all thicker than usual.",
          question: { question: "The R chart is in control but one subgroup mean is above the UCL. What does this suggest?", options: ["The spread increased: the machine is worn", "The whole subgroup shifted: look for a setting change such as a wrong tool offset at that hour", "The micrometer has poor resolution", "Nothing: the R chart is in control, so the process is fine"], answer: 1, explain: "Normal ranges with a high mean point to a shift of the process centre, typical of a wrong offset or setting, not of increased variation." } },
        { type: "h", text: "Exercise 4: Paint defects per car body" },
        { type: "spc", id: "qt-pr-m4-paint", level: "expert", chart: "c", title: "Paint defects per car body", unit: "defects", decimals: 0, values: PAINT, askLimits: true, askBeyond: true,
          task: "A fictional vehicle assembly line in Douala counts paint defects (dust, runs, craters) on each finished body. Compute c̄ and the limits, click every point beyond the limits, then read the rest of the chart.",
          hint: "c̄ is the average of the 25 counts. UCL = c̄ + 3√c̄. The LCL is negative, so it is 0. After that, look at which side of the centre line the last points fall.",
          question: { question: "Apart from the point beyond the UCL, what does the chart show, and what should the team do?", options: ["Nothing more: all other points are inside the limits", "A run of 11 bodies above the centre line from body 15: find what changed at that time, such as a new material lot, and recalculate limits only after the cause is removed", "A downward trend: the process is improving, so no action", "The limits are too tight: widen them to 4σ"], answer: 1, explain: "From body 15 every point is above c̄: a run far longer than 7 signals a lasting shift even though no point crosses the UCL. Investigate the cause (here a new thinner lot); the limits are recalculated from clean data after correction." } },
      ],
    },
  ],
  quiz: {
    id: "qt-m4-quiz",
    title: "Module 4 Quiz",
    passPct: 70,
    questions: [
      { id: "q1", question: "Which tool shows whether two variables, such as oven temperature and moisture, are related?", options: ["Pareto chart", "Check sheet", "Scatter diagram", "Control chart"], answer: 2, explain: "A scatter diagram plots pairs of values to reveal a relationship between two variables." },
      { id: "q2", question: "Why are subgroups for an X-bar R chart made of consecutive parts from the same machine?", options: ["So that variation within the subgroup shows only common causes", "To save measuring time", "Because the customer requires 5 parts", "To make the limits wider"], answer: 0, explain: "Rational subgroups keep special causes between subgroups, where the X̄ chart can detect them." },
      { id: "q3", question: "Subgroups of 5, X̿ = 50.20 and R̄ = 0.40. What is the UCL of the R chart?", options: ["0.40", "0.23", "0.85", "0.52"], answer: 2, explain: "UCL = D4 × R̄ = 2.114 × 0.40 = 0.85." },
      { id: "q4", question: "An I-MR chart has X̄ = 7.00 and MR̄ = 0.15. What is the UCL of the individuals chart?", options: ["7.45", "7.40", "7.49", "7.15"], answer: 1, explain: "UCL = 7.00 + 2.66 × 0.15 = 7.00 + 0.40 = 7.40." },
      { id: "q5", question: "Which chart suits the number of defective bottles in a sample of 500 per shift?", options: ["c chart", "I-MR chart", "X-bar R chart", "p chart"], answer: 3, explain: "Good-or-defective units in a sample give a proportion defective: a p chart." },
      { id: "q6", question: "Eight points in a row fall below the centre line, all inside the limits. What is the correct conclusion?", options: ["A run: a special cause has probably shifted the process", "No signal, because no point is outside the limits", "A trend caused by tool wear", "The process is capable"], answer: 0, explain: "A run of 7 or more on one side of the centre line is a signal even without a point beyond a limit." },
      { id: "q7", question: "Tolerance 10.0 ± 0.3 mm, mean 10.1 mm, σ = 0.05 mm. What is Cpk?", options: ["2.00", "1.00", "1.33", "0.67"], answer: 2, explain: "The nearer limit is the USL: (10.3 − 10.1) ÷ (3 × 0.05) = 0.2 ÷ 0.15 = 1.33. Cp would be 0.6 ÷ 0.3 = 2.00." },
      { id: "q8", question: "What must be true before a capability study is meaningful?", options: ["The Cpk must already be above 1.33", "The tolerance must be symmetric", "The process must be stable, shown by a control chart", "At least 1 000 parts must be measured"], answer: 2, explain: "Capability predicts future output, which is only possible when the process is in statistical control." },
    ],
  },
};
