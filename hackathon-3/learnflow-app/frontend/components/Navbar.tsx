"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, User, BookOpen, Terminal, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/learn", label: "Knowledge Nodes", icon: BookOpen },
  { href: "/practice", label: "Mastery Flow", icon: Terminal },
  { href: "/teacher", label: "Faculty Protocol", icon: ShieldCheck },
];

/**
 * HASSAAN AI ARCHITECT — LearnFlow Navbar
 * Corrected for 100% theme fidelity and visibility.
 */
export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-bg-base/80 backdrop-blur-xl border-b border-border-fine flex items-center transition-editorial">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-editorial">
          <Logo />
          <div className="flex flex-col">
            <span className="text-sm font-serif font-bold tracking-[0.1em] text-text-primary uppercase">HASSAAN</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">AI ARCHITECT</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 relative group py-2 flex items-center gap-2",
                pathname === link.href 
                  ? "text-accent" 
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              <link.icon size={14} className={cn("transition-colors", pathname === link.href ? "text-accent" : "opacity-30 group-hover:opacity-80")} />
              {link.label}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-[1.5px] bg-accent transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left",
                pathname === link.href && "scale-x-100"
              )} />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/progress" className={cn(
              "p-2 rounded-xl border transition-editorial",
              pathname === "/progress" ? "bg-accent/5 border-accent/20 text-accent" : "border-transparent text-text-muted hover:text-text-primary"
            )}>
              <User size={18} strokeWidth={2.5} />
            </Link>
            <ThemeToggle />
          </div>
          <button className="btn-tactile px-6 py-2.5 bg-accent text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl shadow-lg shadow-accent/10 hover:brightness-110 active:scale-95 transition-all duration-300">
            Current Session
          </button>
          <button className="lg:hidden text-text-muted">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
