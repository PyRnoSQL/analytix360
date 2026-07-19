import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Star,
  Database,
  Target,
  GraduationCap,
  Building2,
  Activity,
  Briefcase,
  Layers,
  Cpu,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { SERVICES, INDUSTRIES } from "@/config/constants";

// ─── Animated counter ───
function Counter({
  end,
  suffix = "",
}: {
  end: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = end / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const iconMap = { brand: Database, emerald: Target, amber: GraduationCap };
const industryIcons = [Building2, Activity, Briefcase, Layers, Cpu, TrendingUp];
const industrySlugs = [
  "government-public-sector",
  "healthcare-life-sciences",
  "financial-services-insurance",
  "telecommunications",
  "manufacturing-industry",
  "energy-utilities",
];

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 45, suffix: "+", label: "Enterprise Clients" },
  { value: 2500, suffix: "+", label: "Professionals Trained" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const testimonials = [
  {
    name: "Jean-Pierre Nkoulou",
    role: "Director of IT, MINSANTE",
    text: "Analytix Engineering transformed our health data infrastructure. Their analytics platform gives us real-time visibility across all regional offices.",
  },
  {
    name: "Marie-Claire Essomba",
    role: "Operations Director, CNPS",
    text: "The Six Sigma training program elevated our entire quality culture. Processing times dropped 40% within six months.",
  },
  {
    name: "Paul Fotso",
    role: "CTO, Customs Administration",
    text: "CUSTOMS360 revolutionized how we handle declaration processing. The team delivered beyond expectations.",
  },
];

export function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-gradient-to-br from-midnight via-navy to-royal">
        {/* Mesh background */}
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <svg width="100%" height="100%" viewBox="0 0 800 600">
            {Array.from({ length: 20 }).map((_, i) => (
              <circle
                key={i}
                cx={100 + (i % 5) * 160}
                cy={80 + Math.floor(i / 5) * 140}
                r={3}
                fill="#38BDF8"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/15 px-4 py-2"
            >
              <Sparkles size={14} className="text-sky" />
              <span className="text-[13px] font-semibold tracking-wide text-sky">
                TRUSTED BY LEADING ORGANIZATIONS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.08] tracking-tight text-white"
            >
              Turning Data Into{" "}
              <span className="bg-gradient-to-r from-sky to-brand bg-clip-text text-transparent">
                Decisive Action
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
            >
              We engineer data platforms, optimize operations, and train
              professionals — helping organizations across Africa make smarter,
              faster decisions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-4 text-[15px] font-semibold text-white transition-all hover:bg-brand/90 hover:-translate-y-0.5"
              >
                Explore Our Services <ArrowRight size={18} />
              </Link>
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-[15px] font-semibold text-white transition-all hover:bg-white/10"
              >
                Customer Portal <ExternalLink size={16} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-14 flex flex-wrap gap-8"
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-extrabold text-white">
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[13px] font-medium text-white/40">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-brand">
              What We Do
            </span>
            <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight text-navy">
              Three Pillars of Excellence
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate-500">
              From raw data to trained professionals, we cover the full spectrum
              of organizational performance improvement.
            </p>
          </motion.div>

          <div className="grid gap-7 md:grid-cols-3">
            {SERVICES.map((s, i) => {
              const Icon = iconMap[s.color];
              const colorClasses = {
                brand: "text-brand bg-brand/5 border-brand/20",
                emerald: "text-emerald bg-emerald/5 border-emerald/20",
                amber: "text-amber bg-amber/5 border-amber/20",
              }[s.color];

              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to="/services"
                    className="group block h-full rounded-2xl border border-slate-200 bg-pearl p-9 transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5"
                  >
                    <div
                      className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${colorClasses.split(" ").slice(1).join(" ")}`}
                    >
                      <Icon size={26} className={colorClasses.split(" ")[0]} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-navy">
                      {s.title}
                    </h3>
                    <p className="mb-5 text-[15px] leading-relaxed text-slate-500">
                      {s.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.features.slice(0, 4).map((f) => (
                        <span
                          key={f}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${colorClasses}`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="bg-gradient-to-br from-midnight to-navy px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-sky">
              Industries
            </span>
            <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-extrabold text-white">
              Sectors We Serve
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {INDUSTRIES.map((name, i) => {
              const Icon = industryIcons[i];
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/industries/${industrySlugs[i]}`}
                    className="glass group block rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:bg-white/10"
                  >
                    {Icon && (
                      <Icon size={32} className="mx-auto mb-3 text-sky transition-colors group-hover:text-white" />
                    )}
                    <p className="text-[13px] font-semibold text-white">{name}</p>
                    <span className="mt-2 inline-block text-[11px] font-semibold text-sky/0 transition-all group-hover:text-sky">
                      Learn more →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="bg-pearl px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-emerald">
              Testimonials
            </span>
            <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-extrabold text-navy">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8"
              >
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      fill="#D97706"
                      className="text-amber"
                    />
                  ))}
                </div>
                <p className="flex-1 text-[15px] italic leading-relaxed text-navy">
                  "{t.text}"
                </p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="font-bold text-navy">{t.name}</p>
                  <p className="text-[13px] text-slate-500">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-gradient-to-r from-brand to-royal px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold text-white">
            Ready to Transform Your Organization?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Let's discuss how data, quality, and training can accelerate your
            goals.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-[15px] font-semibold text-brand transition-all hover:-translate-y-0.5"
            >
              Request a Consultation <ArrowRight size={18} />
            </Link>
            <Link
              to="/portal"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-white/15"
            >
              Access Portal
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
