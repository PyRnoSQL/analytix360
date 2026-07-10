import { Link } from "react-router-dom";
import { BarChart3, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-midnight px-6 pb-8 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-royal">
                <BarChart3 size={18} className="text-white" />
              </div>
              <span className="text-base font-extrabold text-white">
                Analytix Engineering
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/40">
              Transforming organizations through data engineering, operational
              excellence, and professional development.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-[13px] font-bold text-white">Services</h4>
            {[
              "Data & Analytics",
              "Quality Excellence",
              "Professional Training",
              "Custom Solutions",
            ].map((s) => (
              <Link
                key={s}
                to="/services"
                className="mb-2.5 block text-[13px] text-white/40 transition-colors hover:text-white/70"
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-[13px] font-bold text-white">Company</h4>
            {[
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "Customer Portal", to: "/portal" },
              { label: "Careers", to: "/contact" },
            ].map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="mb-2.5 block text-[13px] text-white/40 transition-colors hover:text-white/70"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[13px] font-bold text-white">Contact</h4>
            <div className="space-y-1 text-[13px] leading-loose text-white/40">
              <p>Yaoundé, Cameroon</p>
              <p>contact@analytix-eng.com</p>
              <p>+237 6XX XXX XXX</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Analytix Engineering. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald" />
            <span className="text-[11px] text-white/25">
              SSL Secured · HTTPS Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
