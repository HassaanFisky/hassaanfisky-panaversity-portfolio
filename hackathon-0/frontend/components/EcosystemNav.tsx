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
  { name: "Portfolio Hub", icon: Layout, url: "https://panaversity-h0-portfolio.vercel.app", id: "h0" },
  { name: "Physical AI Robotics", icon: Book, url: "https://panaversity-h1-robotics.vercel.app", id: "h1" },
  { name: "Evolution of To-Do", icon: CheckSquare, url: "https://evolution-of-todo.vercel.app", id: "h2" },
  { name: "LearnFlow Platform", icon: Terminal, url: "https://hassaanfisky-panaversity-learnflow-x01rnwy17.vercel.app", id: "h3" },
  { name: "Course Companion", icon: Zap, url: "https://hassaanfisky-aira-digital-fte.vercel.app", id: "h4" },
];

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
            className="absolute bottom-16 left-0 w-64 bg-bg-base border border-border-fine rounded-2xl shadow-float overflow-hidden p-2"
          >
            <div className="px-3 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-accent border-b border-border-fine mb-2">
              Ecosystem Connectivity
            </div>
            <div className="space-y-1">
              {ECOSYSTEM_APPS.map((app) => (
                <a
                  key={app.id}
                  href={app.url}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-bg-surface transition-editorial group"
                >
                  <div className="w-8 h-8 rounded-md bg-white border border-border-fine flex items-center justify-center text-text-muted group-hover:text-accent transition-colors">
                    <app.icon size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-text-primary">{app.name}</span>
                    <span className="text-[9px] text-text-muted uppercase tracking-wider">{app.id.toUpperCase()} Node</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-tactile w-12 h-12 bg-white border border-border-fine rounded-full shadow-card flex items-center justify-center text-text-primary hover:text-accent group relative"
      >
        <Globe size={18} className={isOpen ? "rotate-180" : "animate-spin-slow"} style={{ animationDuration: '8s' }} />
        {/* Unread indicator / Notification */}
        <div className="absolute top-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-white animate-pulse" />
      </button>
    </div>
  );
}
