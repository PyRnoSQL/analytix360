import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  Briefcase,
  DollarSign,
  GraduationCap,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/navigation/Navbar";

const sidebarItems = [
  { path: "/admin", icon: BarChart3, label: "Analytics", exact: true },
  { path: "/admin/users", icon: Users, label: "Users" },
  { path: "/admin/projects", icon: Briefcase, label: "Projects" },
  { path: "/admin/payments", icon: DollarSign, label: "Payments" },
  { path: "/admin/training", icon: GraduationCap, label: "Training" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminLayout() {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex pt-20" style={{ minHeight: "100vh" }}>
        <aside className="hidden w-56 flex-shrink-0 flex-col bg-midnight md:flex">
          <div className="border-b border-white/5 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sky">
              Admin Panel
            </p>
            <p className="mt-1 text-sm font-bold text-white">
              Analytix Engineering
            </p>
          </div>

          <nav className="flex-1 space-y-0.5 p-2">
            {sidebarItems.map((item) => {
              const active = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-brand/15 text-sky"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-2">
            <button
              onClick={signOut}
              className="flex w-full items-center gap-2 rounded-lg bg-rose/10 px-3 py-2 text-[13px] font-medium text-rose/60 hover:bg-rose/15"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-slate-100 p-6 md:p-7">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
