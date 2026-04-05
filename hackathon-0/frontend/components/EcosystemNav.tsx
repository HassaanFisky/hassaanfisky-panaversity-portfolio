// e:/panaversity/hackathon-0/frontend/components/EcosystemNav.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Globe, 
  Book, 
  CheckSquare, 
  Zap, 
  MessageSquare, 
  Layout,
  Terminal,
  ChevronUp
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ECOSYSTEM_APPS = [
  { name: "Portfolio Hub", image: "/blueprint-footer.png", url: "https://panaversity-h0-portfolio.vercel.app", id: "h0" },
  { name: "Robotics Textbook", image: "/h1-thumb.png", url: "https://panaversity-h1-robotics.vercel.app", id: "h1" },
  { name: "Todo Evolution", image: "/h2-thumb.png", url: "https://evolution-of-todo.vercel.app", id: "h2" },
  { name: "LearnFlow Engine", image: "/h3-thumb.png", url: "https://learnflow-platform-h3.vercel.app", id: "h3" },
  { name: "Companion FTE", image: "/h4-thumb.png", url: "https://digital-fte-crm.vercel.app", id: "h4" },
];

/**
 * HASSAAN AI ARCHITECT — Ecosystem Connectivity Hub
 * v2.1: Re-engineered for high-contrast accessibility and premium visibility.
 */
export function EcosystemNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="fixed bottom-8 left-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 left-0 w-72 bg-bg-surface/95 backdrop-blur-2xl border border-border-fine rounded-[2rem] shadow-float overflow-hidden p-3"
          >
            <div className="px-4 py-3 flex items-center justify-between border-b border-border-fine/40 mb-3 bg-accent/5 rounded-t-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Ecosystem Node Map</span>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
            
            <div className="space-y-1.5">
              {ECOSYSTEM_APPS.map((app) => (
                <a
                  key={app.id}
                  href={app.url}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-bg-elevated transition-editorial group"
                >
                  <div className="relative w-12 h-12 rounded-xl bg-bg-base border border-border-fine flex items-center justify-center overflow-hidden transition-all group-hover:border-accent/30 shadow-sm">
                    <img 
                      src={app.image} 
                      alt={app.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-text-primary group-hover:text-accent transition-colors tracking-tight">{app.name}</span>
                    <span className="text-[9px] text-text-muted/80 uppercase tracking-[0.2em] font-serif italic">{app.id.toUpperCase()} Production Node</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-tactile w-14 h-14 bg-bg-surface border border-border-fine rounded-full shadow-card flex items-center justify-center text-text-primary hover:text-accent group relative overflow-visible transition-all hover:scale-105 active:scale-95"
      >
        <Globe size={22} className={isOpen ? "rotate-180" : "animate-spin-slow"} style={{ animationDuration: '10s' }} />
        {/* Unread indicator with high visibility */}
        <div className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full border-2 border-bg-surface shadow-md animate-pulse z-10" />
      </button>
    </div>
  );
}
