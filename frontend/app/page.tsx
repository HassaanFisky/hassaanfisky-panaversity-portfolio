import { Hero } from "@/components/Hero";
import { HackathonCard } from "@/components/HackathonCard";
import { hackathons } from "@/lib/hackathons";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-base)]">
      <Hero />
      
      <section id="hackathon-grid" className="py-24 bg-[var(--bg-base)] relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <MotionDiv 
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <div className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--text-muted)] mb-3">
              The Engine
            </div>
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight mb-4 text-[var(--text-primary)]">
              The <span style={{ color: "var(--accent)" }}>Panaversity</span> Pipeline
            </h2>
            <p className="text-[17px] text-[var(--text-secondary)] max-w-2xl font-medium leading-relaxed">
              Five hackathons traversing the evolution of intelligent software: 
              from foundational UI to autonomous, multi-agent AI ecosystems.
            </p>
          </MotionDiv>
          
          <MotionDiv 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {hackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </MotionDiv>
        </div>
      </section>

      <section className="py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
        <MotionDiv 
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <div className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--text-muted)] mb-4">
            Next Steps
          </div>
          <h2 className="text-[28px] font-semibold text-[var(--text-primary)] mb-5 tracking-tight">Build the Future of Digital Work</h2>
          <p className="text-[15px] text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
            These hackathons represent discrete milestones in assembling a robust, resilient AI architecture capable of autonomous reasoning and action. Join the journey.
          </p>
          <a href="https://github.com/Hassaanfisky" target="_blank" rel="noopener noreferrer" 
            className="inline-flex items-center justify-center px-6 py-3 text-[13px] font-medium text-[#0A0A0A] bg-[var(--accent)] rounded-[var(--radius-sm)] hover:brightness-110 active:scale-[0.97] transition-all duration-150 shadow-sm">
            Explore My GitHub
          </a>
        </MotionDiv>
      </section>
    </div>
  );
}
