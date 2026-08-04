import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, Target, GraduationCap, Clock, BookOpen, Award } from "lucide-react";
import { SERVICES } from "@/config/constants";

// ─── Training Programs (shown under Professional Training tab) ───
const TRAINING_TRACKS = [
  { track: "Operational Excellence", color: "#059669", programs: [
    { id: "lssyb", title: "Lean Six Sigma Yellow Belt", acronym: "LSSYB", duration: "5 weeks", hours: 40, modules: 5, level: "Foundation" },
    { id: "lssgb", title: "Lean Six Sigma Green Belt", acronym: "LSSGB", duration: "10 weeks", hours: 90, modules: 7, level: "Professional" },
  ]},
  { track: "Quality Engineering", color: "#7C3AED", programs: [
    { id: "qt", title: "Quality Technician", acronym: "QT", duration: "7 weeks", hours: 60, modules: 5, level: "Foundation" },
    { id: "qea", title: "Quality Engineer Associate", acronym: "QEA", duration: "11 weeks", hours: 100, modules: 7, level: "Associate" },
    { id: "lqms", title: "Laboratory Quality Management Specialist", acronym: "LQMS", duration: "9 weeks", hours: 80, modules: 7, level: "Specialist" },
  ]},
  { track: "Data Analytics & Business Intelligence", color: "#2563EB", programs: [
    { id: "maq", title: "Marketing Analytics Quant", acronym: "MAQ", duration: "9 weeks", hours: 80, modules: 7, level: "Associate" },
    { id: "dea", title: "Data Engineering Associate", acronym: "DEA", duration: "12 weeks", hours: 110, modules: 8, level: "Associate" },
    { id: "das", title: "Data Analytics Specialist", acronym: "DAS", duration: "9 weeks", hours: 80, modules: 6, level: "Professional" },
  ]},
];

// ─── Client Logos (split into two rows for dual marquee) ───
const CLIENT_LOGOS_ROW1 = [
  { name: "ExxonMobil", file: "exxonmobil.png" },
  { name: "Shell", file: "shell.png" },
  { name: "BP", file: "bp.png" },
  { name: "Aker Solutions", file: "aker-solutions.png" },
  { name: "Tullow Oil", file: "tullow-oil.png" },
  { name: "Eni-Saipem", file: "saipem.png" },
  { name: "Noble Energy", file: "noble-energy.png" },
  { name: "Schlumberger", file: "schlumberger.png" },
  { name: "Microsoft", file: "microsoft.png" },
  { name: "T-Mobile", file: "t-mobile.png" },
  { name: "Intuit", file: "intuit.png" },
];

const CLIENT_LOGOS_ROW2 = [
  { name: "Abbott", file: "abbott.png" },
  { name: "Becton Dickinson", file: "bd.png" },
  { name: "Novartis", file: "novartis.png" },
  { name: "Alcon", file: "alcon.png" },
  { name: "Medtronic", file: "medtronic.png" },
  { name: "Volvo", file: "volvo.png" },
  { name: "ZF", file: "zf.png" },
  { name: "Textron", file: "textron.png" },
  { name: "Johnson Controls", file: "johnson-controls.png" },
  { name: "CACI International", file: "caci.png" },
  { name: "SHL Medical", file: "shl-medical.png" },
];

const icons = [Database, Target, GraduationCap];
const colors: Record<string, string> = {
  brand: "bg-brand text-white",
  emerald: "bg-emerald text-white",
  amber: "bg-amber text-white",
};
const colorsOutline: Record<string, string> = {
  brand: "border-brand text-brand",
  emerald: "border-emerald text-emerald",
  amber: "border-amber text-amber",
};
const checkColors: Record<string, string> = {
  brand: "text-brand",
  emerald: "text-emerald",
  amber: "text-amber",
};

export function ServicesPage() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active]!;
  const isTrainingTab = active === 2;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-midnight to-navy px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-sky">Our Expertise</span>
            <h1 className="mt-3 text-[clamp(32px,5vw,52px)] font-extrabold text-white">Services That Drive Results</h1>
            <p className="mt-4 max-w-xl text-lg text-white/60">
              Each engagement is tailored to your organization's unique challenges, scale, and ambition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap gap-3">
            {SERVICES.map((svc, i) => {
              const SIcon = icons[i]!;
              return (
                <button key={svc.id} onClick={() => setActive(i)}
                  className={`flex items-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-all ${
                    i === active ? colors[svc.color] + " border-transparent" : colorsOutline[svc.color] + " bg-transparent"
                  }`}>
                  <SIcon size={18} /> {svc.title}
                </button>
              );
            })}
          </div>

          <div className="grid items-start gap-12 md:grid-cols-2" key={active}>
            {/* Left: Description */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-3xl font-extrabold text-navy">{s.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-500">{s.description}</p>
              {isTrainingTab ? (
                <Link to="/institute"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 text-sm font-semibold text-white">
                  View Full Catalog <ArrowRight size={16} />
                </Link>
              ) : (
                <Link to="/contact"
                  className={`mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white ${(colors[s.color] ?? "").split(" ")[0]}`}>
                  Get Started <ArrowRight size={16} />
                </Link>
              )}
            </motion.div>

            {/* Right: Features or Training Programs */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
              {isTrainingTab ? (
                <div className="space-y-6">
                  {TRAINING_TRACKS.map((track) => (
                    <div key={track.track}>
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: track.color }}>{track.track}</h4>
                      <div className="space-y-2">
                        {track.programs.map((p) => (
                          <Link key={p.id} to={`/institute`}
                            className="flex items-center justify-between rounded-xl bg-slate-100 px-5 py-4 transition-all hover:bg-slate-200 hover:-translate-y-0.5 hover:shadow-sm group">
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white" style={{ backgroundColor: track.color }}>
                                {p.acronym.slice(0, 2)}
                              </span>
                              <div>
                                <p className="text-[14px] font-semibold text-navy">{p.title}</p>
                                <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
                                  <span className="flex items-center gap-1"><Clock size={10} /> {p.duration}</span>
                                  <span className="flex items-center gap-1"><BookOpen size={10} /> {p.modules} modules</span>
                                  <span className="flex items-center gap-1"><Award size={10} /> {p.level}</span>
                                </div>
                              </div>
                            </div>
                            <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                s.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 rounded-xl bg-slate-100 px-5 py-4">
                    <CheckCircle2 size={20} className={checkColors[s.color]} />
                    <span className="text-[15px] font-medium text-navy">{f}</span>
                  </div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="overflow-hidden bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-brand">Trusted By Industry Leaders</span>
            <h2 className="mt-3 text-[clamp(24px,3.5vw,36px)] font-extrabold text-navy">Companies We've Helped</h2>
          </motion.div>

          <div className="relative mb-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" />
            <div className="flex animate-[marquee_35s_linear_infinite]">
              {[...CLIENT_LOGOS_ROW1, ...CLIENT_LOGOS_ROW1].map((c, i) => (
                <div key={`r1-${i}`} className="mx-5 flex h-32 w-80 flex-shrink-0 items-center justify-center px-8">
                  <img src={`/logos/${c.file}`} alt={c.name} className="h-16 max-w-[260px] object-contain" loading="lazy"
                    onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = "none"; const span = document.createElement("span"); span.className = "text-sm font-bold tracking-tight text-slate-500"; span.textContent = c.name; el.parentElement!.appendChild(span); }} />
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" />
            <div className="flex animate-[marquee-reverse_40s_linear_infinite]">
              {[...CLIENT_LOGOS_ROW2, ...CLIENT_LOGOS_ROW2].map((c, i) => (
                <div key={`r2-${i}`} className="mx-5 flex h-32 w-80 flex-shrink-0 items-center justify-center px-8">
                  <img src={`/logos/${c.file}`} alt={c.name} className="h-16 max-w-[260px] object-contain" loading="lazy"
                    onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = "none"; const span = document.createElement("span"); span.className = "text-sm font-bold tracking-tight text-slate-500"; span.textContent = c.name; el.parentElement!.appendChild(span); }} />
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-sm font-semibold text-slate-400">...and many more across 6 continents</p>
        </div>
      </section>

      {/* Verify Certificate */}
      <section className="bg-slate-100 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
              <CheckCircle2 size={28} className="text-brand" />
            </div>
            <h2 className="text-[clamp(24px,3.5vw,32px)] font-extrabold text-navy">Verify a Certificate</h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-slate-500">
              Employers and institutions can verify the authenticity of any Analytix Engineering training certificate using our secure verification system.
            </p>
            <Link to="/verify" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:shadow-xl">
              Verify Certificate <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand to-royal px-6 py-20 text-center">
        <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-white">Ready to Get Started?</h2>
        <p className="mt-3 text-lg text-white/70">Let's discuss your requirements.</p>
        <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-brand hover:-translate-y-0.5 transition-all">
          Request a Consultation <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
