"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, Github, Linkedin, MapPin, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

/**
 * HASSAAN AI ARCHITECT — Digital Resume v2.0
 * Apple Preview-style PDF Viewer with glass-apple chrome.
 * Falls back to the full text resume if no PDF is found at /resume.pdf.
 */

const PDF_PATH = "/resume.pdf";

export default function ResumePage() {
  return (
    <main
      className="h-screen overflow-hidden bg-bg-base transition-colors duration-700 flex flex-col"
      style={{ scrollbarWidth: "none" }}
    >
      {/* ── Glass-Apple Navigation Chrome ── */}
      <nav
        className="flex-shrink-0 h-20 flex items-center px-6 md:px-12 border-b border-white/5 z-[100]"
        style={{
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          background: "rgba(var(--color-bg-base-raw, 10 10 10) / 0.72)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.24)",
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link
            href="/"
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-text-muted hover:text-accent transition-all"
          >
            <div className="w-10 h-10 rounded-full glass-apple flex items-center justify-center group-hover:-translate-x-1 transition-transform drop-shadow-lg">
              <ArrowLeft size={16} />
            </div>
            Back to Hub
          </Link>

          <div className="flex items-center gap-6">
            <motion.a
              href="https://hassaan-resume.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.93 }}
              className="px-6 py-2.5 rounded-xl border border-white/10 glass-apple text-[9px] font-black uppercase tracking-widest text-text-primary hover:border-accent/40 transition-all flex items-center gap-3"
            >
              <Globe size={14} className="text-accent" />
              Live Version
            </motion.a>

            <motion.a
              href={PDF_PATH}
              download="Hassaan_Resume.pdf"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="btn-tactile px-8 py-3 bg-accent text-white rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 cursor-pointer"
              style={{
                boxShadow: "0 4px 24px rgba(var(--color-accent-raw, 99 102 241) / 0.45), 0 1px 0 rgba(255,255,255,0.12) inset",
                backdropFilter: "blur(12px)",
              }}
            >
              <Download size={14} />
              Download PDF
            </motion.a>
          </div>
        </div>
      </nav>

      {/* ── Integrated PDF Viewer ── */}
      <div className="flex-1 relative overflow-hidden">
        {/*
          Native <object> renders the PDF inside the browser's built-in PDF engine.
          No external libraries required. Chrome/Edge/Firefox/Safari all support this.
          The inner FallbackResume renders when /resume.pdf is not yet placed in /public.
        */}
        <object
          data={PDF_PATH}
          type="application/pdf"
          className="w-full h-full"
          aria-label="Hassaan's Professional Resume PDF"
          style={{ border: "none", display: "block" }}
        >
          {/* ── Fallback: beautifully-scrollable text resume ── */}
          <FallbackResume />
        </object>
      </div>
    </main>
  );
}

// ─── Fallback Resume (shown if /public/resume.pdf is absent) ───────────────────
function FallbackResume() {
  return (
    <div
      className="h-full overflow-y-auto selection:bg-accent/20 pb-24"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Hide webkit scrollbar inside fallback */}
      <style>{`
        .resume-fallback::-webkit-scrollbar { display: none; }
        .resume-fallback { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 pt-12 space-y-24">
        {/* Header */}
        <section className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start md:items-center"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-float relative group bg-bg-surface">
              <img 
                src="/profile.jpeg" 
                alt="Muhammad Hassaan" 
                className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-105 filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.5rem] pointer-events-none" />
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-black uppercase tracking-[0.4em] text-accent">
                Available for Collaboration
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-text-primary tracking-tighter leading-none glass-3d">
                Muhammad <br />
                <span className="italic text-accent">Hassaan.</span>
              </h1>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContactItem icon={<Mail size={18} />} label="Email" value="fiskyhere@gmail.com" />
            <ContactItem icon={<Github size={18} />} label="GitHub" value="github.com/Hassaanfisky" />
            <ContactItem icon={<Linkedin size={18} />} label="LinkedIn" value="linkedin.com/in/hassaan" />
            <ContactItem icon={<MapPin size={18} />} label="Location" value="Karachi, Pakistan" />
          </div>
        </section>

        {/* Experience */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-text-primary uppercase tracking-tight">Experience</h2>
            <div className="w-12 h-[2px] bg-accent/40" />
            <p className="text-sm text-text-muted font-serif italic mt-6 opacity-70">
              Forging the future of autonomous systems and multi-agent infrastructure.
            </p>
          </div>
          <div className="lg:col-span-2 space-y-12">
            <ExperienceCard
              company="Panaversity Ecosystem"
              role="AI Architect & Lead Developer"
              period="2024 — Present"
              desc="Leading the development of a 5-module autonomous ecosystem. Engineered multi-agent systems, real-time data connectors, and high-fidelity humanist interfaces."
            />
            <ExperienceCard
              company="Autonomous Solutions Inc"
              role="Full Stack Engineer"
              period="2022 — 2024"
              desc="Developed scalable cloud infrastructure for AI deployment. Optimized backend performance by 40% using Rust and Go microservices."
            />
          </div>
        </section>

        {/* Education */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-text-primary uppercase tracking-tight">Education</h2>
            <div className="w-12 h-[2px] bg-accent/40" />
          </div>
          <div className="lg:col-span-2 space-y-12">
            <ExperienceCard
              company="Panaversity Cloud Engineering"
              role="Post-Graduate Specialization"
              period="2023 — 2024"
              desc="Intensive focus on Generative AI, Cloud-Native architecture, and Multi-Agent Systems."
            />
          </div>
        </section>

        {/* Capabilities */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-text-primary uppercase tracking-tight">Capabilities</h2>
            <div className="w-12 h-[2px] bg-accent/40" />
          </div>
          <div className="lg:col-span-2 flex flex-wrap gap-4">
            {[
              "Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL",
              "Tailwind CSS", "Framer Motion", "Docker", "Kubernetes", "Multi-Agent Systems",
            ].map((skill) => (
              <span
                key={skill}
                className="px-6 py-3 rounded-2xl bg-bg-surface border border-white/5 text-[11px] font-bold uppercase tracking-widest text-text-secondary hover:text-accent hover:border-accent/40 transition-all cursor-crosshair"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-6 rounded-[1.5rem] bg-bg-surface border border-white/5 space-y-4 hover:shadow-float transition-all">
      <div className="text-accent">{icon}</div>
      <div className="space-y-1">
        <div className="text-[9px] font-black uppercase tracking-widest text-text-muted">{label}</div>
        <div className="text-xs font-bold text-text-primary truncate">{value}</div>
      </div>
    </div>
  );
}

function ExperienceCard({
  company, role, period, desc,
}: {
  company: string; role: string; period: string; desc: string;
}) {
  return (
    <div className="space-y-4 group">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-serif text-text-primary group-hover:text-accent transition-colors">
            {company}
          </h3>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">{role}</p>
        </div>
        <div className="text-[10px] font-bold text-accent/60 whitespace-nowrap pt-2">{period}</div>
      </div>
      <p className="text-base text-text-secondary/80 font-serif italic max-w-2xl leading-relaxed">{desc}</p>
    </div>
  );
}
