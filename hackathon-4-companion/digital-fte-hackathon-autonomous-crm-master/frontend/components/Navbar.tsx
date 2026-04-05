"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "https://panaversity-h0-portfolio.vercel.app/", label: "Portfolio" },
  { href: "/support", label: "Support" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/docs", label: "Docs" },
];

/**
 * HASSAAN AI ARCHITECT — Navbar Component
 * Fully reactive for Dark/Light mode with semantic design tokens.
 * Re-engineered CTA contrast to prevent 'White-on-White' failures in Dark Mode.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [trustOpen, setTrustOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (trustRef.current && !trustRef.current.contains(event.target as Node)) {
        setTrustOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link 
            href="/" 
            className="flex items-center gap-3 transition-opacity hover:opacity-80 group"
          >
            <div className="flex flex-col">
              <span className="text-sm font-serif font-bold tracking-[0.1em] text-foreground uppercase">HASSAAN</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">AI ARCHITECT</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href === "/docs" && pathname.startsWith("/docs"));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative py-1 text-[15px] font-medium tracking-tight transition-colors duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-[4px] h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/support"
            className="hidden md:flex text-[11px] font-bold px-6 py-2.5 bg-primary text-white hover:bg-primary/90 transition-all rounded-xl tracking-widest uppercase shadow-lg shadow-primary/20"
          >
            SUBMIT REQUEST
          </Link>
          <ThemeToggle />

          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/60 z-[110] backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-background border-l border-border z-[120] p-8 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-xl tracking-tight text-foreground italic">Navigation Hub</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-muted-foreground hover:text-foreground">
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[19px] font-bold tracking-tight py-1 ${pathname === item.href ? "text-primary" : "text-foreground"}`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="w-full h-[1px] bg-border my-6 opacity-30" />
                
                <Link
                  href="/support"
                  className="mt-4 flex text-[13px] justify-center font-bold px-6 py-5 bg-primary text-white hover:bg-primary/90 transition-all rounded-2xl tracking-[0.2em] uppercase shadow-lg shadow-primary/20"
                >
                  Submit Request
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
