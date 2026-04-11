"use client";

import Link from "next/link";
import { ExternalLink, Clock, Sparkles, ChevronRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Hackathon } from "@/lib/hackathons";
import { MotionDiv, fadeUp } from "./motion";

interface HackathonCardProps {
  hackathon: Hackathon;
}

/**
 * HASSAAN AI ARCHITECT — Bento Project Card v3.0
 * High-fidelity Humanist redesign with Apple-tier depth and tactility.
 */
export function HackathonCard({ hackathon }: HackathonCardProps) {
  const isComingSoon = hackathon.status === "coming-soon";
  const phaseLabels = ["Phase I", "Phase II", "Phase III", "Phase IV", "Phase V"];
  const phaseLabel = phaseLabels[hackathon.id] ?? `Phase ${hackathon.id + 1}`;

  return (
    <MotionDiv variants={fadeUp} className="group h-full">
      <div className="card-bento h-full flex flex-col group/card relative">
        
        {/* Visual Background Accent (Mesh Overlay) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_0%,var(--accent),transparent_70%)]" />

        {/* Project Image Container */}
        <div className="relative h-64 -mt-4 -mx-4 mb-10 overflow-hidden rounded-[2rem] bg-bg-elevated/40 border border-white/5 transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-2xl">
          <img 
            src={hackathon.imageUrl} 
            alt={hackathon.title} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-60" />
          
          {/* Status Overlay */}
          <div className="absolute top-6 right-6 z-20">
            <StatusBadge status={hackathon.status} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow space-y-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[9px] font-black tracking-[0.4em] uppercase text-accent/80">
              <span className="w-8 h-[1px] bg-accent/40" />
              {phaseLabel}
            </div>
            <h3 className="text-3xl font-serif text-text-primary group-hover:text-accent transition-colors duration-500 leading-tight">
              {hackathon.title}
            </h3>
          </div>

          <p className="prose-editorial text-[14px] line-clamp-3 leading-relaxed font-serif italic text-text-secondary/80">
            {hackathon.description}
          </p>

          {/* Tech Stack - Pill style */}
          <div className="flex flex-wrap gap-2 pt-2">
            {hackathon.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-primary transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Achievement / Footer */}
        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent/80">
              <Clock size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-tighter text-accent/60 leading-none">{hackathon.points}</span>
              <span className="text-[7px] uppercase tracking-widest text-text-muted mt-1">Reward</span>
            </div>
          </div>

          <Link 
            href={hackathon.url}
            target="_blank"
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
              isComingSoon
                ? "bg-white/5 text-text-muted cursor-not-allowed opacity-50"
                : "bg-text-primary text-bg-base hover:bg-accent hover:text-white shadow-float group-hover:translate-x-1"
            }`}
          >
            {isComingSoon ? "Lock" : "Launch"}
            <ChevronRight size={14} className={isComingSoon ? "hidden" : "group-hover:translate-x-1 transition-transform"} />
          </Link>
        </div>

        {/* Interaction Glow */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>
    </MotionDiv>
  );
}
