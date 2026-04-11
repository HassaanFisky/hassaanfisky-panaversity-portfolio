// e:/panaversity/hackathon-0/frontend/app/milestones/page.tsx
"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Award, Shield, Target } from "lucide-react";
import Link from "next/link";

/**
 * HASSAAN AI ARCHITECT — Achievements & Milestones
 * A high-fidelity "Coming Soon" page for missing routes.
 */
export default function MilestonesPage() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center pt-32 pb-20 overflow-hidden relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--accent-dim),transparent_50%)] opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="card-humanist p-20 flex flex-col items-center gap-12 bg-bg-surface/50 backdrop-blur-3xl shadow-float border-white/20"
        >
          <div className="w-24 h-24 rounded-[2rem] bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-lg animate-pulse">
            <Trophy size={48} strokeWidth={1.5} />
          </div>

          <div className="space-y-6">
            <div className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent">Status: Finalizing</div>
            <h1 className="text-5xl md:text-6xl font-serif text-text-primary tracking-tighter leading-tight glass-3d">
              The Trophy Case
            </h1>
            <p className="prose-editorial text-xl font-serif italic text-text-secondary opacity-70 max-w-lg mx-auto leading-relaxed">
              Every major milestone achieved during the Panaversity journey is being meticulously archived here.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full opacity-40">
            {[Star, Award, Shield, Target].map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-bg-base/30 border border-border-fine/40">
                <Icon size={24} />
                <div className="w-12 h-1 bg-border-fine/20 rounded-full" />
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="btn-tactile px-12 py-5 bg-text-primary text-bg-base rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-accent hover:-translate-y-1 transition-all shadow-float active:scale-95"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
