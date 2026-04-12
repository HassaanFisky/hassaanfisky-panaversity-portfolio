// e:/panaversity/hackathon-0/frontend/app/hackathon/[id]/page.tsx

import { notFound } from "next/navigation";
import { hackathons } from "@/lib/hackathons";
import { MoveLeft, ExternalLink, ShieldCheck, Layers, Zap } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * HASSAAN AI ARCHITECT — Project Detail Page v2.0
 * Humanist design system — consistent with Portfolio Hub globals.
 */
export default async function HackathonDetail({ params }: PageProps) {
  const { id } = await params;
  const hackathon = hackathons.find((h) => h.id === parseInt(id));

  if (!hackathon) return notFound();

  const isComingSoon = hackathon.status === "coming-soon";

  return (
    <div className="min-h-screen bg-bg-base pt-28 pb-32 px-4 selection:bg-accent/10 transition-colors duration-500">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-dim),transparent_50%)] opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">

        {/* ── Back Navigation ── */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted hover:text-accent transition-colors group"
        >
          <MoveLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          Back to Portfolio
        </Link>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left — Primary Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Category label */}
            <div className="inline-flex items-center gap-2 text-[9px] font-black tracking-[0.4em] uppercase text-accent/80">
              <span className="w-8 h-[1px] bg-accent/40" />
              {hackathon.category}
            </div>

            {/* Title */}
            <div className="space-y-5">
              <h1 className="text-4xl md:text-6xl font-serif text-text-primary tracking-tight leading-tight glass-3d">
                {hackathon.title}
              </h1>
              <StatusBadge status={hackathon.status} />
            </div>

            {/* Description */}
            <p className="prose-editorial text-xl md:text-2xl font-serif italic text-text-secondary/80 leading-relaxed max-w-2xl">
              {hackathon.description}
            </p>

            {/* Tech Stack */}
            <div className="space-y-5">
              <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-text-muted">
                System Capabilities
              </div>
              <div className="flex flex-wrap gap-3">
                {hackathon.tech.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg-surface border border-border-fine text-[11px] font-bold text-text-secondary hover:border-accent/30 hover:text-accent transition-all duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {[
                {
                  icon: <ShieldCheck size={18} />,
                  title: "Verified Build",
                  body: "Architecture audited and signed off by the Panaversity AI Agent.",
                },
                {
                  icon: <Layers size={18} />,
                  title: "Fullstack Compliance",
                  body: "Strict adherence to Next.js 15 App Router spec and production standards.",
                },
                {
                  icon: <Zap size={18} />,
                  title: "Performance Optimized",
                  body: "GPU-composited animations, lazy-loaded assets, and edge-ready API routes.",
                },
                {
                  icon: <ExternalLink size={18} />,
                  title: "Live on Vercel",
                  body: "Deployed to production via Vercel with automatic CI/CD on every push.",
                },
              ].map((feat) => (
                <div
                  key={feat.title}
                  className="card-humanist p-7 flex items-start gap-5 hover:-translate-y-1 transition-transform duration-300 bg-bg-surface/60"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary mb-1">{feat.title}</h4>
                    <p className="text-[12px] text-text-muted leading-relaxed">{feat.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-humanist p-10 space-y-10 bg-bg-surface/70 backdrop-blur-xl sticky top-28">

              {/* Points badge */}
              <div className="space-y-2">
                <div className="text-[9px] font-bold text-text-muted uppercase tracking-widest">
                  Achievement Points
                </div>
                <div className="text-3xl font-serif font-black text-accent tracking-tighter">
                  {hackathon.points}
                </div>
              </div>

              <div className="w-full h-[1px] bg-border-fine" />

              {/* Status details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Status</span>
                  <StatusBadge status={hackathon.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Phase</span>
                  <span className="text-[11px] font-bold text-text-primary">{hackathon.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Stack</span>
                  <span className="text-[11px] font-bold text-text-primary">{hackathon.tech[0]}</span>
                </div>
              </div>

              <div className="w-full h-[1px] bg-border-fine" />

              {/* CTA */}
              <Link
                href={hackathon.url}
                target={isComingSoon ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-300 ${
                  isComingSoon
                    ? "bg-bg-elevated text-text-muted border border-border-fine cursor-not-allowed opacity-60"
                    : "bg-text-primary text-bg-base hover:bg-accent hover:text-white active:scale-95 shadow-float hover:shadow-2xl hover:shadow-accent/20"
                }`}
              >
                {isComingSoon ? "Build Locked" : "Launch Project"}
                {!isComingSoon && <ExternalLink size={14} />}
              </Link>

              <Link
                href="/"
                className="w-full py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-primary border border-border-fine hover:border-accent/30 flex items-center justify-center gap-2 transition-all duration-300"
              >
                <MoveLeft size={12} />
                All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
