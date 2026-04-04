// e:/panaversity/hackathon-0/frontend/components/Footer.tsx
"use client";

import Link from "next/link";
import {
  GitBranch,
  Send,
  Globe,
  Briefcase,
  Sparkles,
  Binary,
} from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="backdrop-blur-xl bg-white/40 border-t border-white/20 shadow-[0_-8px_32px_rgba(0,0,0,0.05)] py-32 transition-editorial relative z-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          {/* Brand/Identity Column */}
          <div className="md:col-span-2 space-y-12">
            <Link
              href="/"
              className="hover:opacity-80 transition-editorial block"
            >
              <Logo />
            </Link>
            <p className="prose-editorial text-xl max-w-md leading-relaxed text-text-secondary">
              The revolution is... Architecting high-fidelity{" "}
              <span className="text-text-primary font-bold">Digital FTEs</span>{" "}
              — engineered for deep reasoning and resilient agency in the age of
              autonomous systems.
            </p>
            <div className="flex items-center gap-8">
              {[
                {
                  icon: <GitBranch size={18} />,
                  href: "https://github.com/Hassaanfisky",
                },
                {
                  icon: <Globe size={18} />,
                  href: "https://www.facebook.com/panaversity/",
                },
                { icon: <Send size={18} />, href: "/" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-border-fine flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 hover:shadow-float transition-editorial"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              Protocol
            </h4>
            <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-text-primary">
              <FooterLink href="#hackathon-grid" label="Architecture" />
              <FooterLink href="https://github.com/HassaanFisky" label="Skill Library" />
              <FooterLink href="https://hassaanfisky-panaversity-learnflow.vercel.app" label="Benchmarking" />
              <FooterLink href="https://panaversity.org/hackathons" label="Ethical Framework" />
            </ul>
          </div>

          {/* Institutional Links */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              Institutional
            </h4>
            <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-text-primary">
              <FooterLink href="#hackathon-grid" label="Philosophy" />
              <FooterLink href="#hackathon-grid" label="Case Studies" />
              <FooterLink href="https://github.com/HassaanFisky" label="The Blueprint" />
              <FooterLink href="mailto:hassaanfisky@gmail.com" label="Connect" />
            </ul>
          </div>
        </div>

        {/* System Meta-data Section */}
        <div className="pt-16 border-t border-border-fine flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted">
              &copy; 2026 Muhammad Hassaan Aslam &bull; All Rights Reserved.
            </div>
            <div className="flex items-center gap-6 opacity-30 select-none">
              <Binary size={14} className="text-text-muted" />
              <div className="h-[1px] w-8 bg-border-fine" />
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-text-muted">
                High-Fidelity Humanist
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-2.5 bg-bg-base border border-border-fine rounded-full">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-success/40" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted">
              Node Status: Operational
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
        className="hover:text-accent transition-editorial relative group"
      >
        <span>{label}</span>
        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </Link>
    </li>
  );
}
