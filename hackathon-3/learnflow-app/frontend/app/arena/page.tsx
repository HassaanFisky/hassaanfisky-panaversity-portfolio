"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FocusShield from "@/components/arena/FocusShield";
import ConceptSprint from "@/components/arena/ConceptSprint";
import ProgressionHUD from "@/components/arena/ProgressionHUD";
import PressureLayer from "@/components/arena/PressureLayer";

// The Arena Habit Engine
// Core Rule: Zero Clutter, 1 main action at a time.
export default function ArenaPage() {
  const [activeMode, setActiveMode] = useState<"SELECT" | "FOCUS" | "SPRINT">("SELECT");

  // Force strict Dark Mode for Arena
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      // Revert if they leave the arena
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F2EDE7] font-inter overflow-hidden relative selection:bg-[#E58A6D] selection:text-[#0B0F14]">
      {/* Subtle Grid + Particle Motion */}
      <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14]/50 to-[#0B0F14] pointer-events-none" />

      {/* Top HUD (Always visible) */}
      <ProgressionHUD setActiveMode={setActiveMode} />

      <main className="relative z-10 container mx-auto px-6 h-[calc(100vh-80px)] flex flex-col justify-center items-center">
        
        {/* State 1: Selection Mode */}
        {activeMode === "SELECT" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-2">The Habit Engine</h1>
              <p className="text-[#9C948A]">Choose your cognitive pressure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Focus Shield Trigger */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveMode("FOCUS")}
                className="group relative p-8 rounded-3xl border border-[#2E2B27] bg-[#1C1A17] hover:border-[#E58A6D]/50 text-left overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_-12px_rgba(229,138,109,0.15)] transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E58A6D] opacity-[0.03] rounded-bl-full group-hover:opacity-[0.08] transition-opacity" />
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E58A6D] animate-pulse" />
                  Focus Shield
                </h2>
                <p className="text-[#9C948A] text-sm leading-relaxed mb-6">
                  25-minute deep focus. Tab-tracking enabled. Extreme pressure.
                </p>
                <div className="text-xs uppercase tracking-wider text-[#E58A6D] font-semibold">Initiate Sequence →</div>
              </motion.button>

              {/* Concept Sprint Trigger */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveMode("SPRINT")}
                className="group relative p-8 rounded-3xl border border-[#2E2B27] bg-[#1C1A17] hover:border-[#96D1C7]/50 text-left overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_-12px_rgba(150,209,199,0.15)] transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#96D1C7] opacity-[0.03] rounded-bl-full group-hover:opacity-[0.08] transition-opacity" />
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#96D1C7] animate-pulse" />
                  Concept Sprint
                </h2>
                <p className="text-[#9C948A] text-sm leading-relaxed mb-6">
                  60-second rapid matching. Adaptive difficulty. Combo multipliers.
                </p>
                <div className="text-xs uppercase tracking-wider text-[#96D1C7] font-semibold">Initiate Sequence →</div>
              </motion.button>
            </div>

            {/* Daily Challenges Overlay */}
            <div className="mt-12">
              <PressureLayer />
            </div>
          </motion.div>
        )}

        {/* State 2: Focus Mode */}
        {activeMode === "FOCUS" && <FocusShield onExit={() => setActiveMode("SELECT")} />}

        {/* State 3: Sprint Mode */}
        {activeMode === "SPRINT" && <ConceptSprint onExit={() => setActiveMode("SELECT")} />}

      </main>
    </div>
  );
}
