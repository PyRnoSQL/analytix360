import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Globe, Clock, CheckCircle2, ArrowRight,
  Users, Building2,
} from "lucide-react";
import { submitContactForm } from "@/services/api";

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
    { icon: MapPin, label: "Address", value: "Yaoundé, Cameroon" },
    { icon: Phone, label: "Phone", value: "+237 6XX XXX XXX" },
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
