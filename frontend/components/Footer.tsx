// e:/panaversity/hackathon-0/frontend/components/Footer.tsx

import Link from "next/link";
import { Code, Users, MessageSquare, Mail, Cpu } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[#1e293b] bg-black selection:bg-cyan-400 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-slate-400">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-1.5 rounded-lg bg-cyan-400">
                <Cpu className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Panaversity<span className="text-cyan-400">Hub</span>
              </span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed">
              Muhammad Hassaan Aslam. Senior AI Agent Architect. 
              Pioneering the future of Digital FTEs through Panaversity fellowship. 
              Engineering scalable, zero-fatigue AI intelligence systems.
            </p>
            <div className="flex items-center space-x-5">
              <Link href="https://github.com/Hassaanfisky" target="_blank" className="hover:text-cyan-400 transition-colors">
                <Code className="w-5 h-5" />
              </Link>
              <Link href="#" target="_blank" className="hover:text-cyan-400 transition-colors">
                <Users className="w-5 h-5" />
              </Link>
              <Link href="#" target="_blank" className="hover:text-cyan-400 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="mailto:hello@panaversity.hub" className="hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white font-mono">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#hackathons" className="hover:text-cyan-400 transition-colors">Hackathons</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Agent Library</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Skill Registry</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white font-mono">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-24 pt-8 border-t border-[#1e293b] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Muhammad Hassaan Aslam. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
            <span>Systems Online. Continuous Deployment Active.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
