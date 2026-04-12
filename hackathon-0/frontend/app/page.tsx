// e:/panaversity/hackathon-0/frontend/app/page.tsx

import { Hero } from "@/components/Hero";
import { HackathonCard } from "@/components/HackathonCard";
import { hackathons } from "@/lib/hackathons";
import { MotionDiv, fadeUp, stagger } from "@/components/motion";
import { AiraAssistant } from "@/components/AiraAssistant";
import { RobotPulse } from "@/components/RobotPulse";

/**
 * HASSAAN AI ARCHITECT — Portfolio Hub Landing Page
 * Human-readable section headings. No jargon labels.
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-base transition-colors duration-500 selection:bg-accent/10">
      <Hero />

      {/* ── Ecosystem Status ─────────────────────────────────────────────────────
           Placed between Hero and the project grid so it reads as a contextual
           bridge: the user sees the name + tagline, then immediately understands
           the health and breadth of the ecosystem before diving into projects.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="relative pb-0 pt-0 overflow-hidden">
        {/* Edge-to-edge gradient fade from Hero → status panel */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent to-bg-base pointer-events-none" />

        <MotionDiv
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-40px" }}
          className="max-w-7xl mx-auto px-6 pb-16 pt-8"
        >
          <RobotPulse />
        </MotionDiv>
      </section>

      {/* ── Project Journey Section ─────────────────────────────────────────── */}
      <section id="hackathon-grid" className="py-24 md:py-40 relative">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg-base to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <MotionDiv
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-24 text-center"
          >
            <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent mb-6">
              My Work
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-text-primary tracking-tight mb-8 glass-3d">
              The <span className="italic text-accent">Project</span> Journey
            </h2>
            <p className="prose-editorial text-lg md:text-xl max-w-2xl mx-auto opacity-80 leading-relaxed font-serif italic text-text-secondary">
              Five projects built across the Panaversity Fellowship —
              from personal AI employees to autonomous multi-agent systems.
            </p>
          </MotionDiv>

          <MotionDiv
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {hackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* ── Philosophy / Vision Section ── */}
      <section className="py-40 bg-bg-surface border-y border-border-fine relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
          <svg className="w-full h-full text-text-primary" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,40 70,40 100,100" fill="none" stroke="currentColor" strokeWidth="0.2" />
          </svg>
        </div>

        <MotionDiv
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
          <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-text-muted mb-8">
            Vision &amp; Strategy
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-8 tracking-tight leading-tight glass-3d">
            Building the Infrastructure <br className="hidden md:block" /> for Autonomy
          </h2>
          <p className="prose-editorial text-lg md:text-xl mb-14 max-w-2xl mx-auto opacity-70 font-serif italic text-text-secondary">
            Every project represents a step toward building AI that reasons deeply,
            acts autonomously, and delivers real-world impact without human intervention.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://github.com/Hassaanfisky"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile px-10 py-5 bg-accent text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:brightness-110 shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              View on GitHub
            </a>
            <a
              href="#hackathon-grid"
              className="btn-tactile px-10 py-5 bg-bg-base border border-border-fine text-text-primary rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-bg-surface inline-flex items-center justify-center cursor-pointer transition-all hover:border-accent/30 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              View Projects
            </a>
          </div>
        </MotionDiv>
      </section>

      {/* ── AI Assistant ── */}
      <AiraAssistant
        platform="H0"
        context="Showcasing the complete Panaversity Project Journey from Phase I to Phase V. All systems built by Hassaan and AI."
      />
    </div>
  );
}
