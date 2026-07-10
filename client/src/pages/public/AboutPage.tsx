import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Target, Users, ArrowRight } from "lucide-react";

const values = [
  { icon: ShieldCheck, title: "Integrity", desc: "Transparent partnerships built on trust and accountability." },
  { icon: Zap, title: "Innovation", desc: "Cutting-edge approaches tailored to your context." },
  { icon: Target, title: "Excellence", desc: "Measurable outcomes, not just deliverables." },
  { icon: Users, title: "Empowerment", desc: "Building your team's capabilities for lasting impact." },
];

export function AboutPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-midnight to-navy px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-sky">About Us</span>
            <h1 className="mt-3 text-[clamp(32px,5vw,52px)] font-extrabold text-white">
              Engineering Excellence Since Day One
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="mb-6 text-lg leading-relaxed text-navy">
              Analytix Engineering is a leading consulting firm specializing in data engineering, operational
              excellence, and professional development. Headquartered in Cameroon, we partner with organizations
              across Africa to modernize their operations through data-driven strategies and internationally
              recognized methodologies.
            </p>
            <p className="mb-12 text-base leading-relaxed text-slate-500">
              Our team combines deep technical expertise with practical industry experience. From building
              analytics platforms for national agencies like MINSANTE, DGSN, CNPS, and Customs to training
              hundreds of professionals in Lean Six Sigma, we deliver impact that scales.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/5">
                  <v.icon size={24} className="text-brand" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-navy">{v.title}</h4>
                <p className="text-sm leading-relaxed text-slate-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-brand to-royal px-6 py-20 text-center">
        <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-white">
          Ready to Transform Your Organization?
        </h2>
        <p className="mt-3 text-lg text-white/70">Let's discuss how we can help.</p>
        <Link to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-brand hover:-translate-y-0.5 transition-all">
          Contact Us <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
