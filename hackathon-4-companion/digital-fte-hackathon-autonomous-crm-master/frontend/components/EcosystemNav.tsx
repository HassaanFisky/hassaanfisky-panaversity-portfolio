"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Globe, 
  Book, 
  CheckSquare, 
  Zap, 
  Layout,
  Terminal
} from "lucide-react";

const ECOSYSTEM_APPS = [
  { name: "Portfolio Hub", image: "https://raw.githubusercontent.com/Hassaanfisky/hassaanfisky-panaversity-portfolio/main/public/blueprint-footer.png", url: "https://panaversity-h0-portfolio.vercel.app", id: "h0" },
  { name: "Physical AI & Robotics", image: "https://panaversity-h1-robotics.vercel.app/h1-thumb.png", url: "https://panaversity-h1-robotics.vercel.app", id: "h1" },
  { name: "Evolution of Todo", image: "https://evolution-of-todo.vercel.app/h2-thumb.png", url: "https://evolution-of-todo.vercel.app", id: "h2" },
  { name: "LearnFlow Engine", image: "https://hassaanfisky-panaversity-learnflow.vercel.app/h2-thumb.png", url: "https://hassaanfisky-panaversity-learnflow.vercel.app", id: "h3" },
  { name: "Companion FTE", image: "https://hassaanfisky-aira-digital-fte.vercel.app/h4-thumb.png", url: "https://hassaanfisky-aira-digital-fte.vercel.app", id: "h4" },
];

export default function EcosystemNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 left-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 left-0 w-64 bg-[#FAF9F6] border border-[#E5E0D8] rounded-2xl shadow-xl overflow-hidden p-2"
          >
            <div className="px-3 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#D97757] border-b border-[#E5E0D8] mb-2">
              Ecosystem Connectivity
            </div>
            <div className="space-y-1">
              {ECOSYSTEM_APPS.map((app) => (
                <a
                  key={app.id}
                  href={app.url}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F0EBE1] transition-all group"
                >
                  <div className="relative w-8 h-8 rounded-md bg-white border border-[#E5E0D8] flex items-center justify-center overflow-hidden transition-colors">
                    <img 
                      src={app.image} 
                      alt={app.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-[#2D2926]">{app.name}</span>
                    <span className="text-[9px] text-[#8A857D] uppercase tracking-wider">{app.id.toUpperCase()} Node</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-white border border-[#E5E0D8] rounded-full shadow-lg flex items-center justify-center text-[#2D2926] hover:text-[#D97757] group relative transition-all active:scale-95"
      >
        <Globe size={18} className={isOpen ? "rotate-180" : "animate-pulse"} />
        <div className="absolute top-0 right-0 w-3 h-3 bg-[#D97757] rounded-full border-2 border-white" />
      </button>
    </div>
  );
}
