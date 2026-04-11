"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

/**
 * Custom 404 Page — theme-aware glassmorphism design.
 * Shows when any route is not found in the application.
 */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--accent-dim),transparent_60%)] opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* Big 404 */}
        <div className="text-[10rem] md:text-[14rem] font-serif font-black text-text-primary leading-none tracking-tighter opacity-[0.06] select-none mb-4">
          404
        </div>

        {/* Glass card */}
        <div className="glass-apple rounded-3xl p-12 border border-border-fine shadow-float -mt-24 relative">
          <div className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent mb-6">
            Page Not Found
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-text-primary tracking-tight mb-5 leading-tight">
            This page doesn&apos;t exist yet
          </h1>
          <p className="prose-editorial text-base md:text-lg text-text-secondary mb-10 font-serif italic opacity-80">
            The page you&apos;re looking for may have moved or never existed. 
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-tactile inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.3em] hover:brightness-110 shadow-lg shadow-accent/20 hover:-translate-y-0.5 transition-all"
            >
              <Home size={16} strokeWidth={2.5} />
              Go back home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-tactile inline-flex items-center justify-center gap-3 px-8 py-4 bg-bg-surface border border-border-fine text-text-primary rounded-2xl font-bold text-[11px] uppercase tracking-[0.3em] hover:border-accent/40 hover:bg-bg-elevated transition-all"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              Go back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
