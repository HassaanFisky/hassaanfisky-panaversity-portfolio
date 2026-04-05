"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { GitBranch, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

/**
 * HASSAAN AI ARCHITECT — Portfolio Hub Navbar
 * Re-engineered with ThemeToggle and semantic design tokens.
 */
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-bg-base/80 backdrop-blur-md border-b border-border-fine transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group transition-all duration-500 hover:scale-[1.02]">
          <Logo />
          <div className="flex flex-col">
            <span className="text-sm font-serif font-bold tracking-[0.1em] text-text-primary uppercase">HASSAAN</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">AI ARCHITECT</span>
          </div>
        </Link>

        {/* Desktop Navigation Protocol */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="#hackathon-grid" className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted hover:text-accent transition-colors">
            Blueprint
          </Link>
          <Link href="https://github.com/Hassaanfisky" target="_blank" className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted hover:text-accent transition-colors flex items-center gap-2">
            <GitBranch size={12} className="opacity-50" />
            Ecosystem
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          
          <Link 
            href="/resume.pdf" 
            target="_blank"
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-bg-surface border border-border-fine text-text-primary rounded-full font-bold text-[10px] uppercase tracking-widest hover:border-accent/40 hover:bg-bg-elevated dark:hover:bg-bg-base transition-all duration-300 shadow-sm"
          >
            <FileText size={14} className="text-accent" />
            Dossier
          </Link>
          
          <Link 
            href="https://digital-fte-crm.vercel.app"
            target="_blank"
            className="px-6 py-2.5 bg-accent text-white rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-accent/10 hover:brightness-110 active:scale-95 transition-all duration-300"
          >
            Launch CRM
          </Link>
        </div>
      </div>
    </nav>
  );
}
