"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeartHandshake, Sparkles, Sprout, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Sparkles,
    title: "Thoughtful Intelligence",
    desc: "The specialist reads every message with nuance, drafting responses that are deeply contextual and empathetic.",
    color: "bg-[#FDF1E7] dark:bg-orange-900/20"
  },
  {
    icon: HeartHandshake,
    title: "Human in the Loop",
    desc: "Designed to collaborate. Your team retains full control while the system handles the repetitive inquiries.",
    color: "bg-[#EDF2EE] dark:bg-emerald-900/20"
  },
  {
    icon: Sprout,
    title: "Organic Growth",
    desc: "The system learns from your best agents, organically adapting to your unique voice and policies.",
    color: "bg-[#F4EDFA] dark:bg-purple-900/20"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.8 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

/**
 * HASSAAN AI ARCHITECT — Companion FTE Landing Node
 * Re-engineered for 100% Theme Fidelity. All surfaces use semantic tokens.
 */
export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/10">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 pt-32 pb-24 text-center">
        {/* Subtle Background Detail */}
        <div className="absolute inset-0 z-0 bg-texture opacity-60 pointer-events-none" />

        <motion.div 
          className="relative max-w-[800px] w-full z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-10">
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-muted-foreground px-5 py-2 border border-border bg-card/50 backdrop-blur-sm rounded-full shadow-sm">
              Autonomous Mastery Node v4.0
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="font-serif text-6xl md:text-8xl font-normal tracking-tight mb-10 text-foreground text-pretty leading-[1.05]"
          >
            Support that feels <br/>
            <span className="italic text-primary">beautifully human.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-lg md:text-2xl font-serif italic text-muted-foreground max-w-[650px] mx-auto mb-14 leading-relaxed text-pretty opacity-80"
          >
            The Companion FTE bridges the gap between efficiency and empathy. 
            Deploy intelligent agents that resolve tickets across all channels while preserving your brand's warmth.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/support"
              className="btn-primary group w-full sm:w-auto"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
            </Link>
            <Link
              href="/dashboard"
              className="btn-secondary w-full sm:w-auto"
            >
              View Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-40 border-t border-border/60">
        <div className="text-center mb-20">
          <div className="text-primary text-[11px] font-bold uppercase tracking-[0.4em] mb-4">Infrastructure</div>
          <h2 className="font-serif text-4xl text-foreground mb-6">Thoughtful architecture</h2>
          <p className="text-muted-foreground text-lg max-w-[550px] mx-auto font-serif italic opacity-70">Built with care to handle your most delicate customer interactions with precision and empathy.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="document-card p-12 flex flex-col items-center text-center group"
            >
              <div 
                className={`w-16 h-16 rounded-[24px] flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 ${color}`}
              >
                <Icon className="w-7 h-7 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4 tracking-tight">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed font-serif opacity-80">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
