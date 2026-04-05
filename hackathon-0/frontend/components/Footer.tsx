// e:/panaversity/hackathon-0/frontend/components/Footer.tsx
"use client";

import Link from "next/link";
import {
  GitBranch,
  Send,
  Globe,
  Binary,
} from "lucide-react";
import { Logo } from "./Logo";

/**
 * HASSAAN AI ARCHITECT — Portfolio Footer Node
 * v2.1: Re-engineered for maximum accessibility and high-contrast visibility.
 */
export function Footer() {
  return (
    <footer className="backdrop-blur-xl bg-bg-surface/90 border-t border-border-fine shadow-[0_-8px_48px_rgba(0,0,0,0.04)] py-32 transition-colors duration-500 relative z-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          {/* Brand/Identity Column */}
          <div className="md:col-span-2 space-y-12">
            <Link
              href="/"
              className="hover:opacity-80 transition-editorial block group"
            >
              <Logo />
              <div className="mt-6 flex flex-col">
                <span className="text-xl font-serif font-bold tracking-[0.1em] text-text-primary uppercase">HASSAAN</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">AI ARCHITECT</span>
              </div>
            </Link>
            <p className="prose-editorial text-xl md:text-2xl max-w-md leading-relaxed text-text-secondary font-serif italic opacity-95">
               Architecting high-fidelity <span className="text-text-primary font-bold not-italic">Digital FTEs</span> — 
               engineered for deep reasoning and zero-fatigue operation in the age of autonomy.
            </p>
            <div className="flex items-center gap-6">
              {[
                {
                  icon: <GitBranch size={20} />,
                  href: "https://github.com/Hassaanfisky",
                  label: "GitHub"
                },
                {
                  icon: <Globe size={20} />,
                  href: "https://www.facebook.com/panaversity/",
                  label: "Panaversity"
                },
                { icon: <Send size={20} />, href: "mailto:hassaanfisky@gmail.com", label: "Email" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 rounded-2xl border border-border-fine flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-all hover:bg-bg-elevated shadow-sm hover:shadow-md"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Core Protocol Links */}
          <div className="space-y-12">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
              Core Protocol
            </h4>
            <ul className="space-y-8 text-[13px] font-bold uppercase tracking-[0.2em] text-text-primary">
              <FooterLink href="#hackathon-grid" label="Architecture" />
              <FooterLink href="https://github.com/HassaanFisky" label="Skill Library" />
              <FooterLink href="https://learnflow-platform-h3.vercel.app" label="Node Registry" />
              <FooterLink href="https://panaversity.org/hackathons" label="Ethical Framework" />
            </ul>
          </div>

          {/* Strategic Links */}
          <div className="space-y-12">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
              Strategic
            </h4>
            <ul className="space-y-8 text-[13px] font-bold uppercase tracking-[0.2em] text-text-primary">
              <FooterLink href="#hackathon-grid" label="Philosophy" />
              <FooterLink href="#hackathon-grid" label="Case Studies" />
              <FooterLink href="https://github.com/HassaanFisky" label="The Blueprint" />
              <FooterLink href="mailto:hassaanfisky@gmail.com" label="Intelligence Hub" />
            </ul>
          </div>
        </div>

        {/* System Meta-data Section */}
        <div className="pt-20 border-t border-border-fine/60 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted">
              &copy; 2026 Muhammad Hassaan Aslam &bull; All Rights Reserved.
            </div>
            <div className="flex items-center gap-8 opacity-60 select-none">
              <Binary size={16} className="text-text-muted" />
              <div className="h-[1px] w-12 bg-border-fine" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted">
                High-Fidelity Humanist
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5 px-8 py-3 bg-bg-base/80 backdrop-blur-md border border-border-fine rounded-full shadow-soft group hover:border-accent/30 transition-all">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-success/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted group-hover:text-text-primary transition-colors">
              Node Registry: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-text-secondary hover:text-accent transition-colors relative group py-2"
      >
        <span>{label}</span>
        <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </Link>
    </li>
  );
}
