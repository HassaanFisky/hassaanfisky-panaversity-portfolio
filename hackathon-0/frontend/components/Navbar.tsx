"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { GitBranch, FileText } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/70 backdrop-blur-md border-b border-[#E5E0D8]/50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group transition-all duration-500 hover:scale-[1.02]">
          <Logo />
          <div className="flex flex-col">
            <span className="text-sm font-serif font-bold tracking-[0.1em] text-[#38312E] uppercase">HASSAAN</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D97757]">AI ARCHITECT</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link href="#hackathon-grid" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A857D] hover:text-[#D97757] transition-colors">
            Portfolio
          </Link>
          <Link href="https://github.com/Hassaanfisky/hassaanfisky-panaversity-portfolio" target="_blank" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A857D] hover:text-[#D97757] transition-colors flex items-center gap-2">
            <GitBranch size={14} />
            Ecosystem
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/resume.pdf" 
            target="_blank"
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-[#F0EBE1] border border-[#E5E0D8] text-[#38312E] rounded-full font-bold text-[10px] uppercase tracking-widest hover:border-[#D97757]/30 hover:bg-white transition-all duration-300"
          >
            <FileText size={14} className="text-[#D97757]" />
            Dossier
          </Link>
          <Link 
            href="https://hassaanfisky-aira-digital-a7wtu46un-hassaans-projects-444.vercel.app"
            target="_blank"
            className="px-6 py-2.5 bg-[#D97757] text-white rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-[#D97757]/10 hover:brightness-110 active:scale-95 transition-all duration-300"
          >
            Launch CRM
          </Link>
        </div>
      </div>
    </nav>
  );
}


