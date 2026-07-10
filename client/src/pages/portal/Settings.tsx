import { useAuth } from "@/contexts/AuthContext";
import { Users, Mail, Phone, Building2 } from "lucide-react";

export function PortalSettings() {
  const { profile } = useAuth();
  return (
    <>
      <h2 className="mb-6 text-2xl font-extrabold text-navy">Account Settings</h2>
      <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-7">
        {[
          { label: "Full Name", icon: Users, value: profile?.full_name ?? "Your Name" },
          { label: "Email", icon: Mail, value: profile?.email ?? "your@email.com" },
          { label: "Phone", icon: Phone, value: profile?.phone ?? "+237 6XX XXX XXX" },
          { label: "Company", icon: Building2, value: profile?.company ?? "Your Organization" },
        ].map((f) => (
          <div key={f.label} className="mb-4">
            <label className="mb-1.5 block text-xs font-semibold text-slate-500">{f.label}</label>
            <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-pearl px-4 py-3">
              <f.icon size={18} className="text-slate-400" />
              <input defaultValue={f.value} className="flex-1 bg-transparent text-sm text-navy outline-none" />
            </div>
          </div>
        ))}
        <button className="mt-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand/90">
          Save Changes
        </button>
      </div>
    </>
  );
}
