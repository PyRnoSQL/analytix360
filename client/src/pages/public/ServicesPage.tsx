import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, Target, GraduationCap } from "lucide-react";
import { SERVICES } from "@/config/constants";

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

  return (
    <div className="pt-20">
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

      <section className="bg-white px-6 py-16">
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
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-3xl font-extrabold text-navy">{s.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-500">{s.description}</p>
              <Link to="/contact"
                className={`mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white ${(colors[s.color] ?? "").split(" ")[0]}`}>
                Get Started <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
              {s.features.map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-xl bg-pearl px-5 py-4">
                  <CheckCircle2 size={20} className={checkColors[s.color]} />
                  <span className="text-[15px] font-medium text-navy">{f}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-pearl px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-navy">Our Approach</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Discover & Assess", "Design & Architect", "Build & Implement", "Monitor & Optimize"].map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border-t-4 border-brand bg-white p-7 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand/5 text-xl font-extrabold text-brand">
                  {i + 1}
                </div>
                <p className="font-bold text-navy">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand to-royal px-6 py-20 text-center">
        <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-white">
          Ready to Get Started?
        </h2>
        <p className="mt-3 text-lg text-white/70">Let's discuss your requirements.</p>
        <Link to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-brand hover:-translate-y-0.5 transition-all">
          Request a Consultation <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
