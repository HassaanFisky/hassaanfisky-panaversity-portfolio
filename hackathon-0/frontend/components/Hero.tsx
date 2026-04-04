"use client";

import { ArrowRight, Trophy, Database, Zap } from "lucide-react";
import { hackathons } from "@/lib/hackathons";
import { MotionDiv, fadeUp, stagger } from "./motion";
import { RobotPulse } from "./RobotPulse";

export function Hero() {
  const completedPoints = hackathons
    .filter((h) => h.status === "live")
    .reduce((acc, h) => acc + parseInt(h.points.split(" ")[0]), 0);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-bg-base">
      {/* Background Ornamentation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-20 left-10 w-64 h-64 border border-accent rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-accent rounded-full" />
      </div>

      <MotionDiv 
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-12"
      >
        <MotionDiv variants={fadeUp} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft border border-accent/10 text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4">
            <Zap size={12} fill="currentColor" />
            Engineering Autonomy
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif text-text-primary tracking-tight leading-[1.05] mb-8">
            Muhammad Hassaan Aslam
            <br />
            <span className="italic text-accent">AI Architect</span>
          </h1>
          
          <p className="prose-editorial text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Architecting high-fidelity <span className="text-text-primary font-bold">Digital FTEs</span> — 
            engineered for deep reasoning, zero-fatigue operation, and resilient agency.
          </p>
        </MotionDiv>

        <MotionDiv variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 mb-16">
          <button 
            onClick={() => document.getElementById("hackathon-grid")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-tactile group px-10 py-5 bg-accent text-white rounded-xl font-bold text-[14px] uppercase tracking-widest flex items-center gap-3 shadow-float shadow-accent/20"
          >
            <span>Explore Pipeline</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-8 px-8 py-4 bg-white/50 backdrop-blur-sm border border-border-fine rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-accent">
                <Trophy size={20} />
              </div>
              <div className="text-left">
                <div className="text-xl font-serif text-text-primary font-bold leading-none">{completedPoints}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mt-1">Total XP</div>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-border-fine" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success">
                <Database size={20} />
              </div>
              <div className="text-left">
                <div className="text-xl font-serif text-text-primary font-bold leading-none">5/5</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mt-1">Milestones</div>
              </div>
            </div>
          </div>
        </MotionDiv>

        {/* Robot Pulse - Live Heartbeat */}
        <MotionDiv 
            variants={fadeUp} 
            transition={{ delay: 0.8 }}
            className="flex justify-center"
        >
            <RobotPulse />
        </MotionDiv>
      </MotionDiv>

      {/* Hero Footnote */}
      <MotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-text-muted">Descent</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
      </MotionDiv>
    </section>
  );
}

