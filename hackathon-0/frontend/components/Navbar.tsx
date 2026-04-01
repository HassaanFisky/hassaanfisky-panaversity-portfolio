"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { GitBranch, FileText } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 glass-nav transition-editorial">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group transition-editorial hover:scale-[1.02]">
          <Logo />
          <div className="flex flex-col">
            <span className="text-sm font-serif font-bold tracking-tight text-text-primary">Hassaan Aslam</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">AI Architect</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link href="#hackathon-grid" className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted hover:text-accent transition-colors">
            Portfolio
          </Link>
          <Link href="https://github.com/Hassaanfisky" target="_blank" className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted hover:text-accent transition-colors flex items-center gap-2">
            <GitBranch size={14} />
            Systems
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="btn-tactile hidden sm:flex items-center gap-2 px-5 py-2.5 bg-bg-elevated border border-border-fine text-text-primary rounded-lg font-bold text-[10px] uppercase tracking-widest hover:border-accent/30 hover:bg-white"
          >
            <FileText size={14} className="text-accent" />
            Dossier
          </a>
          <button className="btn-tactile px-5 py-2.5 bg-accent text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-accent/10">
            Enlist
          </button>
        </div>
      </div>
    </nav>
  );
}


