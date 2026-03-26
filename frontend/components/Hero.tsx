// e:/panaversity/hackathon-0/frontend/components/Hero.tsx

"use client";

import { ArrowRight, Trophy, Users } from "lucide-react";
import { hackathons } from "@/lib/hackathons";
import { MotionDiv, fadeUp, stagger } from "./motion";

export function Hero() {
  const completedPoints = hackathons
    .filter((h) => h.status === "live")
    .reduce((acc, h) => acc + parseInt(h.points.split(" ")[0]), 0);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-[var(--bg-base)]">
      {/* Radial Gradients */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 900px 600px at 50% -100px, rgba(212,165,116,0.08), transparent 70%),
            radial-gradient(ellipse 600px 400px at 80% 80%, rgba(61,214,140,0.04), transparent 60%),
            var(--bg-base)`
        }}
      />

      {/* Noise Texture */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.035]">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)"/>
      </svg>

      {/* Hero Content */}
      <MotionDiv 
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-8"
      >
        <MotionDiv variants={fadeUp} className="space-y-4">
          <h1 className="text-[52px] font-semibold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)]">
            Muhammad Hassaan Aslam
            <br />
            <span style={{ color: "var(--accent)" }}>AI Agent Architect</span>
          </h1>
          <p className="max-w-xl mx-auto text-[15px] text-[var(--text-secondary)] font-medium">
            Building Digital FTEs — 168 hours/week. 
            <span style={{ color: "var(--accent)" }}> Zero fatigue.</span>
          </p>
        </MotionDiv>

        <MotionDiv variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button 
            onClick={() => document.getElementById("hackathon-grid")?.scrollIntoView({ behavior: "smooth" })}
            className="group px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--accent)] text-[#0A0A0A] font-medium text-[13px] hover:brightness-110 active:scale-[0.97] transition-all duration-150 flex items-center space-x-2"
          >
            <span>Explore My Progress</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center space-x-6 px-4 py-2 rounded-[var(--radius-sm)] bg-transparent border border-[var(--border-muted)] text-[var(--text-primary)] transition-all duration-150">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-[var(--accent)]" />
              <div className="text-left">
                <div className="text-[13px] font-bold font-mono">{completedPoints}+</div>
                <div className="text-[11px] uppercase tracking-[0.02em] font-medium text-[var(--text-muted)]">Total XP</div>
              </div>
            </div>
            <div className="h-4 w-[1px] bg-[var(--border-subtle)]" />
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-[var(--success)]" />
              <div className="text-left">
                <div className="text-[13px] font-bold font-mono">5/5</div>
                <div className="text-[11px] uppercase tracking-[0.02em] font-medium text-[var(--text-muted)]">Hackathons</div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>

      {/* Hero Footnote */}
      <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-[11px] tracking-[0.08em] uppercase font-medium text-[var(--text-muted)] mb-2">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--border-active)] to-transparent" />
      </MotionDiv>
    </section>
  );
}
