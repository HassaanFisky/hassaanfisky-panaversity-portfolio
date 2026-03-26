// e:/panaversity/hackathon-0/frontend/components/Navbar.tsx

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-[56px] backdrop-blur-xl bg-[rgba(10,10,10,0.75)] border-b border-[var(--border-subtle)] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative">
        <Link href="/" className="flex items-center group">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
          <Link href="#hackathons" className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150">
            Projects
          </Link>
          <Link href="https://github.com/Hassaanfisky" target="_blank" className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150">
            GitHub
          </Link>
        </div>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

