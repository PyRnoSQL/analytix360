import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Receipt,
  BookOpen,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/navigation/Navbar";

const sidebarItems = [
  { path: "/portal", icon: LayoutDashboard, label: "Overview", exact: true },
  { path: "/portal/invoices", icon: Receipt, label: "Invoices & Payments" },
  { path: "/portal/training", icon: BookOpen, label: "Training" },
  { path: "/portal/documents", icon: FileText, label: "Documents" },
  { path: "/portal/messages", icon: MessageSquare, label: "Messages" },
  { path: "/portal/settings", icon: Settings, label: "Settings" },
];

export function PortalLayout() {
  const { profile, signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex pt-20" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside className="hidden w-60 flex-shrink-0 flex-col bg-navy md:flex">
          <div className="border-b border-white/5 p-5">
            <p className="text-sm font-bold text-white">Welcome back</p>
            <p className="mt-1 text-xs text-white/40">
              {profile?.email ?? "user@company.cm"}
            </p>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {sidebarItems.map((item) => {
              const active = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand/15 text-sky"
                      : "text-white/50 hover:text-white/70"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3">
            <button
              onClick={signOut}
              className="flex w-full items-center gap-2.5 rounded-lg bg-rose/10 px-3 py-2.5 text-sm font-medium text-rose/70 transition-colors hover:bg-rose/15"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-100 p-6 md:p-8">
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
