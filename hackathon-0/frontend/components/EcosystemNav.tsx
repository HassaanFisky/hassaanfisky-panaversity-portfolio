"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

/**
 * HASSAAN AI ARCHITECT — Ecosystem Navigation
 * Human-readable labels. No jargon, no system terminology.
 */
const ECOSYSTEM_APPS = [
  { name: "Portfolio Hub", image: "/blueprint-footer.png", url: "https://panaversity-h0-portfolio.vercel.app", id: "H0" },
  { name: "Physical AI & Robotics", image: "/h1-thumb.png", url: "https://hackathon-1-robotics.vercel.app", id: "H1" },
  { name: "Evolution of To-Do", image: "/h2-thumb.png", url: "https://evolution-of-todo.vercel.app", id: "H2" },
  { name: "LearnFlow Engine", image: "/h3-thumb.png", url: "https://learnflow-platform-h3.vercel.app", id: "H3" },
  { name: "AI Companion FTE", image: "/h4-thumb.png", url: "https://frontend-ochre-mu-82.vercel.app", id: "H4" },
];

export function EcosystemNav() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Close this panel when any other panel opens
  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener("close-all-panels", close);
    return () => window.removeEventListener("close-all-panels", close);
  }, []);

  return (
    <>
      {/* ── Ecosystem grid — bottom left ── */}
      <div className={`fixed bottom-10 z-[10000] ${lang === "ur" ? "right-10" : "left-10"}`}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`absolute bottom-16 w-80 glass-apple rounded-2xl shadow-float overflow-hidden p-2 border-white/20 ${lang === "ur" ? "right-0 origin-bottom-right" : "left-0 origin-bottom-left"}`}
              dir={t.dir}
            >
              <div className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-accent border-b border-white/10 mb-2 flex items-center justify-between">
                <span>{t.ui.ecosystem}</span>
                <span className="text-[8px] opacity-60 text-emerald-400">● All Live</span>
              </div>
              <div className="space-y-1">
                {ECOSYSTEM_APPS.map((app) => (
                  <a
                    key={app.id}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/10 transition-all group border border-transparent hover:border-white/10"
                  >
                    <div className="relative w-11 h-11 rounded-lg bg-black/20 border border-white/10 flex items-center justify-center overflow-hidden transition-all shadow-inner">
                      <img 
                        src={app.image} 
                        alt={app.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/blueprint-footer.png";
                        }}
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-[11px] font-bold text-text-primary group-hover:text-accent transition-colors uppercase tracking-wider">{app.name}</span>
                      <span className="text-[8px] text-text-muted uppercase tracking-widest font-serif italic mt-0.5">{app.id} &bull; Live</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          id="ecosystem-toggle-btn"
          onClick={() => {
            const next = !isOpen;
            if (next) window.dispatchEvent(new CustomEvent("close-all-panels"));
            setIsOpen(next);
          }}
          className="w-16 h-16 glass-apple border-white/20 rounded-full shadow-float flex items-center justify-center text-text-primary hover:text-accent group relative transition-all active:scale-95 hover:scale-110"
          title={t.ui.ecosystem}
          aria-label={t.ui.ecosystem}
        >
          <motion.span
            animate={isOpen ? { rotate: 90 } : { rotate: [0, 360] }}
            transition={isOpen
              ? { duration: 0.3, ease: "easeOut" }
              : { duration: 30, repeat: Infinity, ease: "linear", type: "tween" }
            }
            style={{ display: "inline-flex" }}
          >
            <Globe size={24} strokeWidth={1.5} />
          </motion.span>
          <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-bg-base shadow-sm animate-pulse" />
        </button>
      </div>
    </>
  );
}

export default EcosystemNav;
