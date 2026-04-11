// e:/panaversity/hackathon-0/frontend/components/HackathonCard.tsx

import Link from "next/link";
import { ExternalLink, Clock, Sparkles } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Hackathon } from "@/lib/hackathons";
import { MotionDiv, fadeUp } from "./motion";

interface HackathonCardProps {
  hackathon: Hackathon;
}

/**
 * HASSAAN AI ARCHITECT — Project Card Component
 * Human-friendly labels. No jargon, no system terminology.
 */
export function HackathonCard({ hackathon }: HackathonCardProps) {
  const isComingSoon = hackathon.status === "coming-soon";

  const phaseLabels = ["Phase I", "Phase II", "Phase III", "Phase IV", "Phase V"];
  const phaseLabel = phaseLabels[hackathon.id] ?? `Phase ${hackathon.id + 1}`;

  return (
    <MotionDiv variants={fadeUp} className="group h-full">
      <div className="card-humanist p-10 flex flex-col h-full relative overflow-hidden group-hover:scale-[1.02] transition-editorial bg-bg-surface dark:bg-bg-elevated border-border-fine/50">
        
        {/* Project Thumbnail */}
        <div className="relative -mt-10 -mx-10 mb-10 h-72 overflow-hidden border-b border-border-fine/40 bg-bg-elevated/80 flex items-center justify-center p-4">
          {/* Blurred background echo */}
          <div className="absolute inset-0 opacity-[0.15] blur-xl grayscale">
            <img src={hackathon.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>

          <img 
            src={hackathon.imageUrl} 
            alt={hackathon.title} 
            className="relative z-10 w-full h-full object-contain transition-transform duration-[1.5s] group-hover:scale-105"
          />
          
          {/* Branding Overlay */}
          <div className="absolute top-6 left-6 flex flex-col items-start gap-1 z-20 drop-shadow-lg">
            <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 flex flex-col">
              <span className="text-[10px] font-serif font-bold tracking-[0.1em] text-white uppercase leading-none">HASSAAN</span>
              <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-white/80 leading-none mt-0.5">AI ARCHITECT</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-bg-base/30 via-transparent to-black/5 pointer-events-none" />
        </div>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-3">
            {/* CHANGED: "Protocol Phase" → clean Phase label */}
            <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-accent opacity-80">
              {phaseLabel}
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-text-primary group-hover:text-accent transition-colors duration-500 leading-[1.2] tracking-tight">
              {hackathon.title}
            </h3>
          </div>
          <StatusBadge status={hackathon.status} />
        </div>

        {/* Description */}
        <div className="flex-grow mb-10">
          <p className="prose-editorial text-[15px] line-clamp-4 leading-relaxed font-serif italic text-text-secondary opacity-90">
            {hackathon.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {hackathon.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-1.5 rounded-full bg-bg-base/30 border border-border-fine/40 text-[9px] font-bold tracking-[0.1em] text-text-muted hover:text-accent hover:border-accent/30 transition-all cursor-crosshair"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Points / Milestone */}
        <div className="mb-12 p-6 rounded-2xl bg-bg-elevated/40 border border-border-fine/40 flex items-center justify-between group-hover:bg-accent-soft/30 transition-colors shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-bg-base border border-border-fine/60 flex items-center justify-center text-accent/70 shadow-sm transition-transform group-hover:-rotate-6">
              <Clock size={18} strokeWidth={2.5} />
            </div>
            {/* CHANGED: "Milestone pts" → "Achievement Points" */}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/70">Achievement Points</span>
          </div>
          <div className="flex items-center gap-2 text-accent font-bold">
            <Sparkles size={16} className="opacity-40 animate-pulse" />
            <span className="text-lg tracking-tight font-serif">{hackathon.points}</span>
          </div>
        </div>

        {/* CTA Button — CHANGED: "Access Node Registry" → "View Project" / "Coming Soon" */}
        <Link 
          href={hackathon.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-tactile w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-[0.3em] transition-all duration-500 shadow-float border border-transparent ${
            isComingSoon 
              ? "bg-bg-elevated text-text-muted cursor-not-allowed grayscale pointer-events-none" 
              : "bg-accent text-white shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 active:translate-y-0"
          }`}
          aria-disabled={isComingSoon}
          tabIndex={isComingSoon ? -1 : 0}
        >
          <span>{isComingSoon ? "Coming Soon" : "View Project"}</span>
          {!isComingSoon && <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />}
        </Link>
      </div>
    </MotionDiv>
  );
}
