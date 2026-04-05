"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "https://hassaan-panaversity-portfolio.vercel.app/", label: "Portfolio" },
  { href: "/support", label: "Support" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/docs", label: "Docs" },
];

/**
 * HASSAAN AI ARCHITECT — Navbar Component
 * Fully reactive for Dark/Light mode with semantic design tokens.
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border/50 bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link 
            href="/" 
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
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
                  className={`relative py-1 text-[15px] font-medium transition-colors duration-200 ${
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

            {/* Trust Dropdown */}
            <div className="relative" ref={trustRef}>
              <button
                onClick={() => setTrustOpen(!trustOpen)}
                onMouseEnter={() => setTrustOpen(true)}
                className={`relative py-1 text-[15px] font-medium transition-colors duration-200 ${
                  trustOpen || ["/security", "/privacy", "/status"].includes(pathname)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Trust ▾
                {["/security", "/privacy", "/status"].includes(pathname) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-[4px] h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {trustOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setTrustOpen(false)}
                    className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-[12px] p-2 shadow-float flex flex-col gap-1 z-50"
                  >
                    {[
                      { label: "Security", href: "/security" },
                      { label: "Privacy Policy", href: "/privacy" },
                      { label: "System Status", href: "/status" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`px-4 py-2 text-[14px] rounded-md transition-colors ${
                          pathname === item.href ? "bg-secondary text-primary font-medium" : "text-foreground hover:bg-secondary/60"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/support"
            className="hidden md:flex text-[14px] font-bold px-5 py-2.5 bg-secondary text-foreground hover:bg-border/40 transition-all rounded-xl border border-transparent hover:border-border"
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
              className="fixed inset-0 bg-background/40 z-[110] backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-background border-l border-border z-[120] p-8 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-serif text-xl tracking-tight text-foreground">Menu node</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-muted-foreground hover:text-foreground">
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[17px] font-bold tracking-tight py-2 ${pathname === item.href || (item.href === "/docs" && pathname.startsWith("/docs")) ? "text-primary" : "text-foreground hover:text-primary transition-colors"}`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="w-full h-[1px] bg-border my-4" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-bold">Protocol Nodes</span>
                
                {[
                  { label: "Security", href: "/security" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "System Status", href: "/status" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[16px] font-medium py-2 ${pathname === item.href ? "text-primary" : "text-foreground hover:text-primary transition-colors"}`}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="/support"
                  className="mt-8 flex text-[13px] justify-center font-bold px-5 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-2xl tracking-[0.2em] uppercase"
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
