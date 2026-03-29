import { Hero } from "@/components/Hero";
import { HackathonCard } from "@/components/HackathonCard";
import { hackathons } from "@/lib/hackathons";
import { MotionDiv, fadeUp, stagger } from "@/components/motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <Hero />
      
      <section id="hackathon-grid" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <MotionDiv 
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center"
          >
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-4">
              The Architecture
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary tracking-tight mb-6">
              The <span className="italic text-accent">Panaversity</span> Pipeline
            </h2>
            <p className="prose-editorial text-lg max-w-2xl mx-auto">
              A chronological evolution of intelligent systems: 
              from foundational interfaces to autonomous multi-agent ecosystems.
            </p>
          </MotionDiv>
          
          <MotionDiv 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {hackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </MotionDiv>
        </div>
      </section>

      <section className="py-32 bg-bg-elevated border-y border-border-fine relative overflow-hidden">
        {/* Subtle background detail */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,40 70,40 100,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <MotionDiv 
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-text-muted mb-6">
            Vision & Strategy
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-6 tracking-tight">
            Building the Infrastructure for Autonomy
          </h2>
          <p className="prose-editorial text-lg mb-10 max-w-2xl mx-auto">
            These milestones represent discrete steps in assembling a robust AI architecture 
            capable of deep reasoning, autonomous action, and resilient digital labor.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://github.com/Hassaanfisky" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-tactile px-8 py-4 bg-accent text-white rounded-lg font-bold text-[13px] uppercase tracking-widest hover:brightness-110 shadow-lg shadow-accent/20"
            >
              Explore Codebase
            </a>
            <button className="btn-tactile px-8 py-4 bg-white border border-border-fine text-text-primary rounded-lg font-bold text-[13px] uppercase tracking-widest hover:bg-bg-base">
              View Blueprint
            </button>
          </div>
        </MotionDiv>
      </section>
    </div>
  );
}

