// e:/panaversity/hackathon-0/frontend/components/HackathonCard.tsx

import Link from "next/link";
import { ExternalLink, Milestone, Sparkles } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Hackathon } from "@/lib/hackathons";
import { MotionDiv, fadeUp } from "./motion";

interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const isComingSoon = hackathon.status === "coming-soon";

  return (
    <MotionDiv variants={fadeUp} className="group h-full">
      <div className="card-humanist p-8 flex flex-col h-full relative overflow-hidden group-hover:scale-[1.01] transition-editorial">
        {/* Decorative corner element */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent-soft rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Project Thumbnail */}
        <div className="relative w-full h-48 -mx-8 -mt-8 mb-8 overflow-hidden border-b border-border-fine">
          <img 
            src={hackathon.imageUrl} 
            alt={hackathon.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
        </div>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-2">
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
              Phase {hackathon.id === 0 ? "0" : hackathon.id === 1 ? "I" : hackathon.id === 2 ? "II" : hackathon.id === 3 ? "III" : "IV"}
            </div>
            <h3 className="text-2xl font-serif text-text-primary group-hover:text-accent transition-colors duration-300">
              {hackathon.title}
            </h3>
          </div>
          <StatusBadge status={hackathon.status} />
        </div>

        {/* Description */}
        <div className="flex-grow mb-8">
          <p className="prose-editorial text-sm line-clamp-3">
            {hackathon.description}
          </p>

          {/* Tech Stack */}
          <div className="mt-8 flex flex-wrap gap-2">
            {hackathon.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 rounded-full bg-bg-elevated border border-border-fine text-[10px] font-bold text-text-muted hover:text-accent hover:border-accent/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Value Metrics */}
        <div className="mb-10 p-4 rounded-xl bg-bg-elevated/50 border border-border-fine flex items-center justify-between group-hover:bg-accent-soft/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-border-fine flex items-center justify-center text-accent">
              <Milestone size={14} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Project Value</span>
          </div>
          <div className="flex items-center gap-1.5 text-accent font-bold font-lora">
            <Sparkles size={14} className="opacity-50" />
            <span className="text-sm">{hackathon.points} pts</span>
          </div>
        </div>

        {/* CTA */}
        <Link 
          href={hackathon.url}
          target="_self"
          className={`btn-tactile w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-[12px] uppercase tracking-[0.2em] transition-all duration-300 ${
            isComingSoon 
              ? "bg-bg-elevated text-text-muted cursor-not-allowed grayscale" 
              : "bg-accent text-white shadow-lg shadow-accent/10 hover:shadow-accent/20"
          }`}
        >
          <span>{isComingSoon ? "Awaiting Deployment" : "Detailed Brief"}</span>
          {!isComingSoon && <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
        </Link>
      </div>
    </MotionDiv>
  );
}

