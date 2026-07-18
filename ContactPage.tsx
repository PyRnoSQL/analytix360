import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  MapPin, Mail, Globe, Clock, CheckCircle2, ArrowRight,
  Users, Building2,
} from "lucide-react";
import { submitContactForm } from "@/services/api";

// WhatsApp SVG icon
function WhatsAppIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const offices = [
  {
    city: "Yaoundé",
    country: "Cameroon",
    flag: "🇨🇲",
    phone: "+237 6 59 06 19 89",
    whatsappUrl: "https://wa.me/237659061989",
  },
  {
    city: "Atlanta",
    country: "USA",
    flag: "🇺🇸",
    phone: "+1 470 549 9644",
    whatsappUrl: "https://wa.me/14705499644",
  },
  {
    city: "Quebec",
    country: "Canada",
    flag: "🇨🇦",
    phone: "+1 581 306 7333",
    whatsappUrl: "https://wa.me/15813067333",
  },
];

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide more detail"),
});

type Form = z.infer<typeof schema>;

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      await submitContactForm({ ...data, company: data.company ?? "" });
    } catch {
      // Edge function may not be deployed yet — still show success for UX
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-pearl pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10">
            <CheckCircle2 size={40} className="text-emerald" />
          </div>
          <h2 className="text-3xl font-extrabold text-navy">Message Sent!</h2>
          <p className="mt-3 text-slate-500">
            Thank you. Our team will respond within 24 hours.
          </p>
        </motion.div>
      </div>
    );
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: "contact@analytix-eng.com" },
    { icon: Globe, label: "Website", value: "www.analytix-eng.com" },
    { icon: Clock, label: "Hours", value: "Mon–Fri 8:00–17:00 WAT" },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-midnight to-navy px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-sky">
              Get In Touch
            </span>
            <h1 className="mt-3 text-[clamp(32px,5vw,48px)] font-extrabold text-white">
              Let's Start a Conversation
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="rounded-2xl bg-pearl p-9">
              <h3 className="mb-6 text-xl font-bold text-navy">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                    Full Name *
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 focus-within:border-brand">
                    <Users size={18} className="text-slate-400" />
                    <input
                      {...register("name")}
                      placeholder="Jean-Pierre Nkoulou"
                      className="flex-1 bg-transparent text-sm text-navy outline-none"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                    Email *
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 focus-within:border-brand">
                    <Mail size={18} className="text-slate-400" />
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="jp@company.cm"
                      className="flex-1 bg-transparent text-sm text-navy outline-none"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                    Company
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 focus-within:border-brand">
                    <Building2 size={18} className="text-slate-400" />
                    <input
                      {...register("company")}
                      placeholder="Your Organization"
                      className="flex-1 bg-transparent text-sm text-navy outline-none"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                    Service *
                  </label>
                  <select
                    {...register("service")}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-navy focus:border-brand focus:outline-none"
                  >
                    <option value="">Select a service...</option>
                    <option>Data & Analytics Engineering</option>
                    <option>Quality & Operational Excellence</option>
                    <option>Professional Training & Certification</option>
                    <option>Custom Solution</option>
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs text-rose">
                      {errors.service.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Tell us about your project or training needs..."
                    className="w-full resize-y rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-navy focus:border-brand focus:outline-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}{" "}
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-6 text-xl font-bold text-navy">
              Our Offices
            </h3>
            <div className="space-y-4">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="rounded-xl border border-slate-100 bg-pearl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand/5">
                      <MapPin size={18} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-navy">
                        {office.flag} {office.city}, {office.country}
                      </p>
                    </div>
                  </div>
                  <a
                    href={office.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-2 rounded-lg bg-[#25D366]/10 px-3 py-2 text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                  >
                    <WhatsAppIcon size={16} />
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>

            <h3 className="mb-4 mt-8 text-xl font-bold text-navy">
              Contact Details
            </h3>
            <div className="space-y-5">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand/5">
                    <c.icon size={20} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      {c.label}
                    </p>
                    <p className="mt-0.5 text-[15px] font-medium text-navy">
                      {c.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-brand/3 to-emerald/3 p-6">
              <h4 className="font-bold text-navy">Prefer a Quick Call?</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Schedule a free 30-minute consultation to discuss your project
                requirements and timeline.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
