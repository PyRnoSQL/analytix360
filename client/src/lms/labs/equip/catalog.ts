// Catalogue of equipment, tools and materials illustrated in the Quality Technician course.
// `parts` are the numbered callouts drawn on each illustration (balloon 1 = parts[0], …).
// `photo` (optional) = path of a real photograph under /public; when set it is shown instead of the drawing.
export interface EquipInfo { name: string; parts: string[]; photo?: string }

export const CATALOG: Record<string, EquipInfo> = {
  // ---- Hand measuring instruments ----
  "vernier-caliper": { name: "Vernier caliper", parts: ["Outside jaws", "Inside jaws", "Main scale (beam)", "Vernier scale", "Locking screw", "Thumb roller", "Depth rod"] },
  "digital-caliper": { name: "Digital caliper", parts: ["Outside jaws", "Inside jaws", "LCD display", "ON/OFF and ZERO buttons", "mm/inch button", "Thumb roller", "Depth rod"] },
  "dial-caliper": { name: "Dial caliper", parts: ["Outside jaws", "Dial (0.02 mm per division)", "Bezel lock", "Rack on the beam", "Main scale (whole millimetres)", "Depth rod"] },
  "outside-micrometer": { name: "Outside micrometer (0–25 mm)", parts: ["Frame", "Anvil", "Spindle", "Lock lever", "Sleeve (barrel) with reference line", "Thimble", "Ratchet stop", "Heat-insulating plate"] },
  "digital-micrometer": { name: "Digital outside micrometer", parts: ["Anvil and spindle faces (carbide)", "LCD display (0.001 mm)", "ZERO / ORIGIN button", "Thimble", "Ratchet stop", "Frame"] },
  "bore-gauge": { name: "Dial bore gauge", parts: ["Dial indicator", "Insulated handle", "Measuring head", "Centralising guide", "Movable plunger", "Interchangeable anvil and washers"] },
  "depth-gauge": { name: "Depth gauge", parts: ["Base (reference face)", "Measuring rod", "Main scale", "Vernier or digital reading", "Locking screw"] },
  "height-gauge": { name: "Digital height gauge on a surface plate", parts: ["Heavy base", "Column with scale", "Digital display", "Slider with fine adjustment", "Carbide scriber / probe", "Granite surface plate"] },
  "dial-indicator": { name: "Dial indicator on a magnetic stand", parts: ["Dial face (0.01 mm)", "Revolution counter", "Bezel", "Stem", "Contact point", "Articulated arm", "Magnetic base with ON/OFF switch"] },
  "dial-test-indicator": { name: "Dial test indicator (lever type)", parts: ["Dial face (0.002 mm)", "Body", "Lever stylus", "Ball contact tip", "Dovetail mounting"] },
  "surface-plate": { name: "Granite surface plate", parts: ["Granite plate (flatness grade 00, 0 or 1)", "Working surface", "Stand with three support points", "Levelling feet", "Protective cover"] },
  "gauge-blocks": { name: "Gauge block set", parts: ["Wooden or plastic case", "Gauge blocks (steel or ceramic)", "Size engraved on each block", "Wear blocks", "Wrung stack"] },
  "steel-rule-tape": { name: "Steel rule and tape measure", parts: ["Steel rule (0.5 mm graduations)", "Zero end", "Tape measure case", "Hook (moves by its own thickness)", "Tape blade (1 mm graduations)", "Lock button"] },
  "feeler-gauge": { name: "Feeler gauge set", parts: ["Blades of known thickness", "Thickness marked on each blade", "Pivot screw", "Protective cover"] },
  "thread-pitch-gauge": { name: "Thread pitch and radius gauges", parts: ["Thread pitch gauge (metric)", "Pitch marked on each leaf", "Radius gauge", "Convex and concave profiles"] },
  // ---- Fixed gauges ----
  "plug-gauge": { name: "GO / NO-GO plug gauge", parts: ["GO end (long, green)", "NO-GO end (short, red)", "Handle with size and tolerance", "Nominal size and class (e.g. Ø20 H7)"] },
  "ring-gauge": { name: "GO / NO-GO ring gauges", parts: ["GO ring (plain outside)", "NO-GO ring (groove on the outside)", "Gauging bore", "Size engraved on the face"] },
  "snap-gauge": { name: "Snap gauge", parts: ["C-frame", "GO anvils (front)", "NO-GO anvils (back)", "Size and tolerance plate", "Adjustment and seal screws"] },
  "thread-plug-gauge": { name: "Thread plug gauge", parts: ["GO thread end (full length)", "NO-GO thread end (short, marked red)", "Handle", "Thread size and class (e.g. M12×1.75 6H)"] },
  // ---- Lab and coordinate metrology ----
  "cmm": { name: "Bridge coordinate measuring machine (CMM)", parts: ["Granite table", "Bridge (moves on the Y axis)", "Carriage (X axis)", "Z ram", "Touch probe", "Part on a fixture", "Joystick controller", "Computer with measuring software"] },
  "cmm-probe": { name: "CMM touch probe and styli", parts: ["Probe head (rotating)", "Probe body", "Stylus extension", "Stylus", "Ruby ball tip", "Reference sphere (for qualification)"] },
  "profile-projector": { name: "Profile projector (optical comparator)", parts: ["Screen with cross-hairs", "Protractor ring", "Lens (magnification)", "Glass stage", "X and Y micrometer heads", "Digital readout"] },
  "roughness-tester": { name: "Portable surface roughness tester", parts: ["Display unit (Ra, Rz)", "Drive unit", "Diamond stylus", "Skid", "Part surface", "Calibration specimen"] },
  "hardness-tester": { name: "Rockwell hardness tester", parts: ["Dial or digital display (HRC, HRB)", "Indenter (diamond cone or ball)", "Test specimen", "Anvil", "Elevating screw with handwheel", "Load selector", "Test block for daily check"] },
  "torque-wrench": { name: "Click-type torque wrench", parts: ["Square drive", "Ratchet head with reverse lever", "Main scale (N·m)", "Micrometer scale on the handle", "Lock ring", "Handle (hold at the centre line)"] },
  "cap-torque-tester": { name: "Bottle cap torque tester", parts: ["Digital display (N·m)", "Bottle clamps", "Rotating table", "Peak-hold button", "Bottle and cap under test"] },
  "precision-balance": { name: "Precision balance", parts: ["Weighing pan", "Draft shield", "Display", "TARE button", "Level bubble", "Levelling feet", "Calibration weight"] },
  "thermo-hygrometer": { name: "Thermo-hygrometer", parts: ["Temperature reading (°C)", "Relative humidity (%)", "Min / max memory", "Wall mount"] },
  "calibration-label": { name: "Calibration status labels", parts: ["Calibrated: instrument ID, date, due date, signature", "Limited use: restriction written on the label", "Do not use / out of calibration", "Unique instrument ID (engraved)"] },
  // ---- Inspection area, tags and products ----
  "nc-tags": { name: "Inspection status tags", parts: ["HOLD tag (yellow): awaiting decision", "REJECTED tag (red): nonconforming", "ACCEPTED tag (green): released", "Tag data: part, lot, quantity, reason, date, inspector"] },
  "quarantine-area": { name: "Quarantine (hold) area", parts: ["Locked cage", "Floor marking (red)", "Sign", "Tagged pallets", "Register of held lots"] },
  "inspection-booth": { name: "Visual inspection station", parts: ["Daylight lamp (controlled lux)", "Magnifier lamp", "Neutral grey background", "Limit samples (boundary samples)", "Defect catalogue with photos"] },
  "borescope": { name: "Video borescope", parts: ["Screen", "Handset with articulation joystick", "Flexible insertion tube", "Camera tip with LED light"] },
  "brake-disc": { name: "Brake disc", parts: ["Friction surfaces (braking faces)", "Ventilation vanes", "Hat (mounting flange)", "Centre bore", "Wheel stud holes", "Minimum thickness marking"] },
  "drive-shaft": { name: "Turned shaft (axle stub)", parts: ["Bearing seat (tight tolerance)", "Shoulder", "Thread", "Keyway", "Chamfer", "Centre hole"] },
  "bushing-pin": { name: "Bushing and piston pin", parts: ["Bronze bushing: bore", "Bushing: outside diameter", "Bushing: length", "Piston pin: outside diameter", "Piston pin: bore", "Piston pin: length"] },
  "packaging-samples": { name: "Packaging components", parts: ["Crown cork (skirt with 21 flutes)", "PET preform (neck finish, body)", "Beverage can end (with tab)", "Screw cap with tamper band", "Glass bottle finish (sealing surface)"] },
  "brake-pad": { name: "Brake pad", parts: ["Steel backing plate", "Friction material", "Chamfer", "Slot", "Wear indicator", "Anti-noise shim"] },
  // ---- The 7 basic quality tools ----
  "qc-check-sheet": { name: "Check sheet", parts: ["Defect types", "Tally marks per day", "Totals", "Header: product, period, inspector"] },
  "qc-histogram": { name: "Histogram", parts: ["Classes (bins) of the measured value", "Frequency", "Lower specification limit", "Upper specification limit", "Target"] },
  "qc-pareto": { name: "Pareto chart", parts: ["Categories sorted from largest to smallest", "Cumulative percentage line", "80% line", "The vital few"] },
  "qc-fishbone": { name: "Cause-and-effect (fishbone) diagram", parts: ["Effect (the problem)", "Spine", "Main cause categories (6M)", "Causes and sub-causes"] },
  "qc-scatter": { name: "Scatter diagram", parts: ["Suspected cause (X)", "Effect (Y)", "Each point = one pair of measurements", "Trend: positive correlation"] },
  "qc-control-chart": { name: "Control chart", parts: ["Upper control limit (UCL)", "Centre line (CL)", "Lower control limit (LCL)", "Point out of control", "Subgroup number / time"] },
  "qc-stratification": { name: "Stratification", parts: ["Data split by source (machine, shift, supplier)", "Stratum A", "Stratum B", "The difference that was hidden in the total"] },
  "qc-flowchart": { name: "Flowchart", parts: ["Start / end", "Process step", "Decision", "Inspection point", "Rework loop"] },
  // ---- Problem solving and error-proofing ----
  "poka-yoke-fixture": { name: "Error-proofing (poka-yoke) fixture", parts: ["Asymmetric locating pin: the part fits only one way", "Presence sensor", "Clamp", "Green / red indicator", "Counter"] },
  "andon-light": { name: "Andon stack light", parts: ["Red: stopped, help needed", "Yellow: problem, attention", "Green: running normally", "Pull cord or button"] },
  "shadow-board": { name: "5S shadow board", parts: ["Outline of each tool", "Tool label", "Missing tool shows immediately", "Area and owner"] },
  "eight-d-board": { name: "8D problem-solving board", parts: ["D1 Team and D2 problem description", "D3 Containment", "D4 Root causes", "D5–D6 Corrective actions and verification", "D7 Prevent recurrence", "D8 Recognise the team"] },
};
