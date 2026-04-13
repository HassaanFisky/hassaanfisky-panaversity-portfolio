"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { GitBranch, FileText, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

/**
 * HASSAAN AI ARCHITECT — Portfolio Hub Navbar
 * Human-readable navigation labels.
 */
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-20 bg-bg-base/80 backdrop-blur-xl border-b border-border-fine transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group transition-all duration-500 hover:scale-[1.02]">
          <Logo />
          <div className="flex flex-col">
            <span className="text-sm font-serif font-bold tracking-[0.1em] text-text-primary uppercase">HASSAAN</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">AI ARCHITECT</span>
          </div>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-10">
          {/* CHANGED: "Blueprint" → "Projects" */}
          <a
            href="#hackathon-grid"
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted hover:text-accent transition-colors"
          >
            Projects
          </a>
          <Link
            href="https://github.com/Hassaanfisky"
            target="_blank"
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted hover:text-accent transition-colors flex items-center gap-2"
          >
            <GitBranch size={12} className="opacity-50" />
            GitHub
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative z-[110]">
            <ThemeToggle />
          </div>
          
          {/* CHANGED: "Dossier" → "Resume" */}
          <Link 
            href="/resume" 
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-bg-surface border border-border-fine text-text-primary rounded-full font-bold text-[10px] uppercase tracking-widest hover:border-accent/40 hover:bg-bg-elevated dark:hover:bg-bg-base transition-all duration-300 shadow-sm"
          >
            <FileText size={14} className="text-accent" />
            Resume
          </Link>
          
          {/* AI Platform CTA — Globe icon with slow rotation for international/ecosystem feel */}
          <Link 
            href="https://frontend-ochre-mu-82.vercel.app"
            target="_blank"
            className="navbar-cta-primary px-6 py-2.5 bg-accent text-white rounded-full font-bold text-[10px] uppercase tracking-widest ring-1 ring-white/20 hover:brightness-110 hover:ring-white/40 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <Globe size={14} className="animate-globe-spin shrink-0" />
            AI Platform
          </Link>
        </div>
      </div>
    </nav>
  );
}
