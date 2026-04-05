"use client";

import { ArrowRight, Trophy, Database, Zap } from "lucide-react";
import { hackathons } from "@/lib/hackathons";
import { MotionDiv, fadeUp, stagger } from "./motion";
import { RobotPulse } from "./RobotPulse";

/**
 * HASSAAN AI ARCHITECT — Portfolio Hero Node
 * v2.1: Re-engineered with high-contrast tactile buttons and heartbeat visibility.
 */
export function Hero() {
  const completedPoints = hackathons
    .filter((h) => h.status === "live")
    .reduce((acc, h) => acc + parseInt(h.points.split(" ")[0]), 0);

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-24 md:pb-32 overflow-hidden bg-bg-base transition-colors duration-500">
      {/* Background Ornamentation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-[0.04] dark:opacity-[0.1]">
        <div className="absolute top-24 left-12 w-64 h-64 border border-accent rounded-full animate-pulse blur-[1px]" />
        <div className="absolute bottom-24 right-12 w-96 h-96 border border-accent rounded-full blur-[1px]" />
      </div>

      <MotionDiv 
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-6xl mx-auto text-center px-6 space-y-16 md:space-y-24"
      >
        <MotionDiv variants={fadeUp} className="space-y-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-accent/5 border border-accent/30 text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 shadow-sm backdrop-blur-sm">
            <Zap size={14} fill="currentColor" />
            Engineering Autonomy 4.0
          </div>
          
          <h1 className="text-6xl md:text-9xl font-serif text-text-primary tracking-tight leading-[1.05] mb-12">
            Muhammad Hassaan Aslam
            <br />
            <span className="italic text-accent">AI Architect</span>
          </h1>
          
          <p className="prose-editorial text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed text-text-secondary/90 font-serif italic mb-16">
            Architecting high-fidelity <span className="text-text-primary font-bold not-italic">Digital FTEs</span> — 
            engineered for deep reasoning, zero-fatigue operation, and resilient agency.
          </p>
        </MotionDiv>

        <MotionDiv variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <button 
            onClick={() => document.getElementById("hackathon-grid")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-tactile group px-12 py-6 bg-accent text-white rounded-3xl font-bold text-[14px] uppercase tracking-widest flex items-center gap-4 shadow-float shadow-accent/20 transition-all hover:-translate-y-1 active:translate-y-0 border border-transparent hover:border-white/10"
          >
            <span>Explore Blueprint</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
          
          <div className="flex items-center gap-10 px-10 py-5 bg-bg-surface/80 backdrop-blur-xl border border-border-fine rounded-3xl shadow-soft">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-sm transition-transform hover:scale-110">
                <Trophy size={24} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <div className="text-3xl font-serif text-text-primary font-bold leading-none tracking-tight">{completedPoints}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted mt-2">Total XP</div>
              </div>
            </div>
            
            <div className="h-10 w-[1px] bg-border-fine" />
            
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent/70 shadow-sm transition-transform hover:scale-110">
                <Database size={24} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <div className="text-3xl font-serif text-text-primary font-bold leading-none tracking-tight">5/5</div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted mt-2">Registry</div>
              </div>
            </div>
          </div>
        </MotionDiv>

        {/* Ecosystem Heartbeat Node */}
        <MotionDiv 
            variants={fadeUp} 
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-6 pt-10"
        >
            <div className="px-4 py-2 bg-bg-elevated/40 backdrop-blur-sm border border-border-fine/40 rounded-full flex items-center gap-3">
              <RobotPulse />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-text-muted">Node Registry Pulse</span>
            </div>
        </MotionDiv>
      </MotionDiv>

      {/* Hero Footnote */}
      <MotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-text-muted/60">Blueprint Descent</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent opacity-50" />
      </MotionDiv>
    </section>
  );
}
