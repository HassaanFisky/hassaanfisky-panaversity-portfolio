// e:/panaversity/hackathon-0/frontend/components/HackathonCard.tsx

import Link from "next/link";
import { ExternalLink, Milestone } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Hackathon } from "@/lib/hackathons";
import { MotionDiv, fadeUp } from "./motion";

interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const isComingSoon = hackathon.status === "coming-soon";

  return (
    <MotionDiv variants={fadeUp} className="group relative rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-card)] hover:border-[var(--border-muted)] hover:-translate-y-[1px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex flex-col h-full">
      {/* Card Header */}
      <div className="p-5 pb-4 flex items-start justify-between">
        <div className="space-y-1">
          <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)] font-medium">
            Hackathon {hackathon.id}
          </div>
          <h3 className="text-[15px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150">
            {hackathon.title}
          </h3>
        </div>
        <StatusBadge status={hackathon.status} />
      </div>

      {/* Card Content */}
      <div className="px-5 flex-grow">
        <p className="text-[13px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {hackathon.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {hackathon.tech.map((tech) => (
            <span key={tech} className="px-2 py-[2px] rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-mono">
              {tech}
            </span>
          ))}
        </div>

        {/* Points Info */}
        <div className="mt-6 p-3 rounded-[var(--radius-sm)] bg-[var(--accent-dim)] border border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[13px] text-[var(--text-secondary)]">
            <Milestone className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Project Value</span>
          </div>
          <span className="text-[13px] font-semibold text-[var(--accent)] font-mono">
            {hackathon.points} pts
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-4 mt-auto">
        <Link 
          href={hackathon.url}
          target={hackathon.url !== "#" ? "_blank" : "_self"}
          className={`w-full py-2 rounded-[var(--radius-sm)] flex items-center justify-center space-x-2 transition-all duration-150 ${
            isComingSoon 
              ? "bg-transparent border border-[var(--border-muted)] text-[var(--text-muted)] cursor-not-allowed text-[13px] font-medium" 
              : "bg-[var(--accent)] text-[#0A0A0A] text-[13px] font-medium shadow-sm hover:brightness-110 active:scale-[0.97]"
          }`}
        >
          <span>{isComingSoon ? "Locked" : "View Project"}</span>
          {!isComingSoon && <ExternalLink className="w-4 h-4" />}
        </Link>
      </div>

      {/* Background Decor */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-[var(--accent-dim)] blur-[60px] rounded-full group-hover:bg-[rgba(212,165,116,0.18)] transition-colors duration-300 pointer-events-none" />
    </MotionDiv>
  );
}
