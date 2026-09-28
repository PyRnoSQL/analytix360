import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Lock,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { NAV_ITEMS } from "@/config/constants";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageToggle } from "../../i18n/LanguageToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "border-b border-slate-100 bg-white/95 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Analytix Engineering SARL"
            className={`h-12 w-auto transition-all duration-300 ${
              isTransparent ? "brightness-0 invert" : ""
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? isTransparent
                      ? "bg-white/10 text-white"
                      : "bg-brand/5 text-brand"
                    : isTransparent
                      ? "text-white/80 hover:text-white"
                      : "text-navy hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div
            className={`mx-2 h-6 w-px ${
              isTransparent ? "bg-white/15" : "bg-slate-200"
            }`}
          />

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/portal"
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  isTransparent
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : "bg-brand text-white hover:bg-brand/90"
                }`}
              >
                <LayoutDashboard size={14} /> Portal
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    isTransparent
                      ? "text-white/70 hover:text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Settings size={14} /> Admin
                </Link>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                isTransparent
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-brand text-white hover:bg-brand/90"
              }`}
            >
              <Lock size={14} /> Client Portal
            </Link>
          )}
          <LanguageToggle className="ml-2" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`rounded-lg p-2 md:hidden ${
            isTransparent ? "text-white" : "text-navy"
          }`}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-slate-50 md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-slate-100" />
              <Link
                to={user ? "/portal" : "/login"}
                className="flex items-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white"
              >
                <Lock size={14} /> {user ? "Portal" : "Client Portal"}
              </Link>
              <LanguageToggle className="mt-2 self-start" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
