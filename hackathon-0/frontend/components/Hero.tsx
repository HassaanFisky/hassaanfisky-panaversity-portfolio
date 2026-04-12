// e:/panaversity/hackathon-0/frontend/components/Hero.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Trophy, Layers } from "lucide-react";
import { hackathons } from "@/lib/hackathons";
import { MotionDiv, fadeUp, stagger } from "./motion";

/**
 * HASSAAN AI ARCHITECT — Portfolio Hero
 * High-Fidelity Humanist design with Glass-3D Typography.
 */
export function Hero() {
  const completedPoints = hackathons
    .filter((h) => h.status === "live")
    .reduce(
      (acc, h) => acc + parseInt(h.points.replace(/,/g, "").split(" ")[0]),
      0,
    );

  return (
    <section className="weather-hero min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-24 md:pb-32 overflow-hidden bg-transparent transition-colors duration-500">
      {/* Background ambient elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-dim),transparent_50%)] opacity-30" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] animate-pulse"
          style={{ willChange: "opacity" }}
        />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <MotionDiv
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-6xl mx-auto text-center px-6 space-y-16 md:space-y-24"
      >
        <MotionDiv variants={fadeUp} className="space-y-10">
          {/* ── Live status pill — clean, minimal, no nested panels ── */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-apple border border-accent/30 text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6 shadow-float">
            {/* Ping dot — GPU-composited, zero JS */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                style={{ willChange: "opacity, transform" }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </span>
            All Projects Live &bull; Systems Ready
          </div>

          <h1 className="text-7xl md:text-[11rem] font-serif text-text-primary tracking-tighter leading-[0.85] mb-12 glass-3d">
            Muhammad
            <br />
            <span className="italic text-accent font-normal px-4">Hassaan</span>
            <br />
            Aslam
          </h1>

          <p className="prose-editorial text-xl md:text-3xl max-w-4xl mx-auto leading-tight text-text-secondary/80 font-serif italic mb-16 px-4">
            Building high-fidelity{" "}
            <span className="text-text-primary font-black not-italic border-b-2 border-accent/40">
              AI Systems
            </span>{" "}
            &mdash; designed for deep reasoning, full autonomy, and real-world
            impact.
          </p>
        </MotionDiv>

        <MotionDiv
          variants={fadeUp}
          className="flex flex-col xl:flex-row items-center justify-center gap-12"
        >
          <div className="flex flex-col sm:flex-row items-center gap-8 w-full xl:w-auto">
            <button
              id="hero-view-projects-btn"
              onClick={() =>
                document
                  .getElementById("hackathon-grid")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative px-14 py-7 bg-text-primary text-bg-base rounded-3xl font-black text-[13px] uppercase tracking-[0.4em] flex items-center gap-5 shadow-float transition-all hover:-translate-y-2 hover:bg-accent active:scale-95 active:translate-y-0 overflow-hidden w-full sm:w-auto text-center"
              style={{ willChange: "transform" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">View My Projects</span>
              <ArrowRight
                className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300"
                strokeWidth={3}
              />
            </button>

            <Link
              href="/resume"
              className="group px-10 py-5 rounded-3xl glass-apple border border-white/10 text-[11px] font-black uppercase tracking-[0.3em] text-text-muted hover:text-text-primary transition-all flex items-center gap-4 hover:border-white/20 w-full sm:w-auto justify-center"
            >
              Explore Resume
              <div className="w-8 h-[1px] bg-accent/40 group-hover:w-12 transition-all duration-300" />
            </Link>
          </div>

          {/* Stats chip */}
          <div className="flex items-center gap-10 sm:gap-12 px-8 sm:px-10 py-5 sm:py-6 glass-apple border-white/20 rounded-[2rem] shadow-float shrink-0">
            <div className="flex items-center gap-4 sm:gap-5 group">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
                style={{ willChange: "transform" }}
              >
                <Trophy size={24} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <div className="text-3xl sm:text-4xl font-serif text-text-primary font-black leading-none tracking-tighter">
                  {completedPoints.toLocaleString()}
                </div>
                <div className="text-[9px] uppercase tracking-[0.4em] font-black text-text-muted mt-2">
                  Total Points
                </div>
              </div>
            </div>

            <div className="h-10 sm:h-12 w-[1px] bg-border-fine/50" />

            <div className="flex items-center gap-4 sm:gap-5 group">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent/70 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                style={{ willChange: "transform" }}
              >
                <Layers size={24} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <div className="text-3xl sm:text-4xl font-serif text-text-primary font-black leading-none tracking-tighter">
                  5/5
                </div>
                <div className="text-[9px] uppercase tracking-[0.4em] font-black text-text-muted mt-2">
                  Projects Live
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>

        {/* Scroll indicator */}
        <MotionDiv
          variants={fadeUp}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-8 pt-12"
        >
          <div
            className="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-pointer"
            onClick={() =>
              document
                .getElementById("hackathon-grid")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="text-[8px] tracking-[0.6em] uppercase font-black text-text-muted">
              Scroll to explore
            </span>
            <div
              className="w-[2px] h-20 bg-gradient-to-b from-accent to-transparent animate-bounce"
              style={{ willChange: "transform" }}
            />
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}
