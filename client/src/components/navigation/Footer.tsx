import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-midnight px-6 pb-8 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="Analytix Engineering SARL"
                className="h-12 w-auto brightness-0 invert"
              />
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
              { label: "Verify Certificate", to: "/verify" },
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
            <div className="space-y-3 text-[13px]">
              {[
                { flag: "🇨🇲", city: "Yaoundé", phone: "+237 6 59 06 19 89", wa: "237659061989" },
                { flag: "🇺🇸", city: "Atlanta", phone: "+1 470 549 9644", wa: "14705499644" },
                { flag: "🇨🇦", city: "Quebec", phone: "+1 581 306 7333", wa: "15813067333" },
              ].map((o) => (
                <div key={o.city}>
                  <p className="text-white/50">{o.flag} {o.city}</p>
                  <a
                    href={`https://wa.me/${o.wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#25D366] transition-colors hover:text-[#25D366]/80"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {o.phone}
                  </a>
                </div>
              ))}
              <p className="mt-2 text-white/40">contact@analytix-eng.com</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Analytix Engineering SARL. All rights
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
