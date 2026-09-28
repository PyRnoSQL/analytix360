import { useSyncExternalStore } from "react";
import { getLang, setLang, subscribe } from "./translator";

const OPTIONS = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
] as const;

export function LanguageToggle({ className = "" }: { className?: string }) {
  const lang = useSyncExternalStore(subscribe, getLang, getLang);
  return (
    <div
      data-no-translate
      role="group"
      aria-label="Language / Langue"
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-xs font-bold ${className}`}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          title={o.name}
          aria-pressed={lang === o.code}
          onClick={() => void setLang(o.code)}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            lang === o.code ? "bg-brand text-white" : "text-slate-500 hover:text-navy"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
