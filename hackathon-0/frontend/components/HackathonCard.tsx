// e:/panaversity/hackathon-0/frontend/components/HackathonCard.tsx

import Link from "next/link";
import { ExternalLink, Milestone, Sparkles } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Hackathon } from "@/lib/hackathons";
import { MotionDiv, fadeUp } from "./motion";

interface HackathonCardProps {
  hackathon: Hackathon;
}

/**
 * HASSAAN AI ARCHITECT — Hackathon Node Component
 * Re-engineered for 100% Image Fidelity and Unified Branding.
 * The image now perfectly fills the card width with zero gaps.
 */
export function HackathonCard({ hackathon }: HackathonCardProps) {
  const isComingSoon = hackathon.status === "coming-soon";

  return (
    <MotionDiv variants={fadeUp} className="group h-full">
      <div className="card-humanist p-10 flex flex-col h-full relative overflow-hidden group-hover:scale-[1.02] transition-editorial bg-bg-surface/50 backdrop-blur-sm shadow-soft border-border-fine/50">
        
        {/* Project Thumbnail — Corrected for Full-Width Fidelity */}
        <div className="relative -mt-10 -mx-10 mb-10 h-64 overflow-hidden border-b border-border-fine/40 bg-bg-base/30">
          <img 
            src={hackathon.imageUrl} 
            alt={hackathon.title} 
            className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100 grayscale-[10%] group-hover:grayscale-0"
          />
          
          {/* Universal Branding Overlay — Senior Architect Insignia */}
          <div className="absolute top-6 left-6 flex flex-col pointer-events-none drop-shadow-md">
            <span className="text-[11px] font-serif font-bold tracking-[0.1em] text-white uppercase opacity-90 leading-none">HASSAAN</span>
            <span className="text-[7.5px] font-bold uppercase tracking-[0.3em] text-white/80 leading-none mt-1">AI ARCHITECT</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-bg-base/40 via-transparent to-black/10 pointer-events-none" />
          
          {/* Subtle corner detail */}
          <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
             <Sparkles size={16} className="text-white/40 font-bold" />
          </div>
        </div>
        
        {/* Header content */}
        <div className="flex items-start justify-between mb-10">
          <div className="space-y-3">
            <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-accent opacity-80">
              Protocol Phase {hackathon.id === 0 ? "O" : hackathon.id === 1 ? "I" : hackathon.id === 2 ? "II" : hackathon.id === 3 ? "III" : "IV"}
            </div>
            <h3 className="text-3xl font-serif text-text-primary group-hover:text-accent transition-colors duration-500 leading-[1.2] tracking-tight">
              {hackathon.title}
            </h3>
          </div>
          <StatusBadge status={hackathon.status} />
        </div>

        {/* Description body */}
        <div className="flex-grow mb-10">
          <p className="prose-editorial text-[15px] line-clamp-4 leading-relaxed font-serif italic text-text-secondary opacity-90">
            {hackathon.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            {hackathon.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-1.5 rounded-full bg-bg-base/50 border border-border-fine/60 text-[9px] font-bold tracking-[0.1em] text-text-muted hover:text-accent hover:border-accent/30 transition-all cursor-crosshair opacity-80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Value Metrics Grid */}
        <div className="mb-12 p-6 rounded-2xl bg-bg-elevated/40 border border-border-fine/40 flex items-center justify-between group-hover:bg-accent-soft/30 transition-colors shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-bg-base border border-border-fine/60 flex items-center justify-center text-accent/70 shadow-sm transition-transform group-hover:-rotate-6">
              <Milestone size={18} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/70">Milestone pts</span>
          </div>
          <div className="flex items-center gap-2 text-accent font-bold font-lora">
            <Sparkles size={16} className="opacity-40 animate-pulse" />
            <span className="text-lg tracking-tight font-serif">{hackathon.points}</span>
          </div>
        </div>

        {/* Action Protocol CTA */}
        <Link 
          href={hackathon.url}
          target="_self"
          className={`btn-tactile w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-[0.3em] transition-all duration-500 shadow-float border border-transparent ${
            isComingSoon 
              ? "bg-bg-elevated text-text-muted cursor-not-allowed grayscale" 
              : "bg-accent text-white shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 active:translate-y-0"
          }`}
        >
          <span>{isComingSoon ? "Awaiting Core Sync" : "Access Node Registry"}</span>
          {!isComingSoon && <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />}
        </Link>
      </div>
    </MotionDiv>
  );
}
