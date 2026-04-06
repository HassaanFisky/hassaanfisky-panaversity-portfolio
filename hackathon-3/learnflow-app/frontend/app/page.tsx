"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MotionDiv, fadeUp, stagger } from "@/components/motion";
import { 
  ArrowRight, 
  Sparkles, 
  Zap,
  PlayCircle,
  Layout,
  Star,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Target
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LandingPage() {
  const [user, setUser] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      try {
        // Fetch Modules
        const modRes = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/modules?select=*&order=order.asc`, {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""}`,
          },
        });
        const modData = await modRes.json();
        setModules(modData || []);

        if (session?.user) {
          // Fetch Mastery Score / Progress
          const progRes = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/progress?user_id=eq.${session.user.id}&select=*`, {
            headers: {
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""}`,
            },
          });
          const progData = await progRes.json();
          if (progData && progData.length > 0) {
            setProgress(progData[0]);
          }
        }
      } catch (err) {
        console.error("Data error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndData();
  }, []);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col font-sans selection:bg-accent/10">
      <Navbar />

      <main className="flex-1">
        {/* PHASE 2: Landing — Simple, Visual, High-Conversion */}
        <section className="relative pt-40 pb-20 overflow-hidden px-6">
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <MotionDiv 
              variants={stagger}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center gap-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent-soft border border-accent/10 backdrop-blur-md">
                <Sparkles size={14} className="text-accent animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  Learn AI Development • Simple & Fast
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-serif tracking-tighter text-text-primary max-w-4xl leading-[0.95]">
                Master the Future of <br />
                <span className="text-accent italic font-normal">Artificial intelligence.</span>
              </h1>

              <p className="max-w-xl text-xl md:text-2xl font-serif italic text-text-secondary leading-relaxed opacity-80">
                Go from zero to building autonomous agents. Beginner friendly, zero jargon, 100% functional.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                <Link
                  href={user ? "/learn" : "https://panaversity-h0-portfolio.vercel.app/auth"}
                  className="btn-tactile bg-text-primary text-white font-bold text-[14px] uppercase tracking-[0.25em] px-14 py-6 rounded-2xl shadow-float flex items-center gap-4 w-full sm:w-auto justify-center group"
                >
                  Start Learning <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-4 text-text-muted text-[11px] font-bold uppercase tracking-[0.2em] px-6">
                   <CheckCircle2 size={16} className="text-emerald-500" /> Free Portfolio Node
                </div>
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* PHASE 2: Student Dashboard (Wired to Progress) */}
        {user && (
          <section className="py-20 bg-bg-surface/30 px-6 border-y border-border-fine">
            <div className="max-w-7xl mx-auto">
              <MotionDiv
                variants={fadeUp}
                initial="initial"
                animate="animate"
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif text-text-primary tracking-tight">Welcome Back, Architect.</h2>
                    <p className="text-text-secondary opacity-70">Pick up exactly where you left off in your mastery journey.</p>
                  </div>
                  
                  <div className="bg-white rounded-3xl p-10 border border-border-fine shadow-card space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-accent-soft flex items-center justify-center text-accent shadow-sm">
                           <Layout size={20} />
                         </div>
                         <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Mastery Progress</span>
                            <span className="block text-2xl font-serif font-bold text-text-primary">{progress?.mastery_score || 0}%</span>
                         </div>
                      </div>
                      <Link href="/progress" className="text-accent">
                         <ArrowUpRight size={24} />
                      </Link>
                    </div>

                    <div className="h-4 w-full bg-bg-base rounded-full overflow-hidden border border-border-fine relative">
                      <div 
                        className="absolute h-full bg-accent transition-all duration-1000"
                        style={{ width: `${progress?.mastery_score || 10}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="/learn"
                        className="btn-tactile bg-accent text-white font-bold text-[10px] uppercase tracking-[0.2em] w-full py-5 rounded-xl flex items-center justify-center gap-2 group"
                      >
                        <PlayCircle size={16} /> Continue
                      </Link>
                      <Link
                        href="/arena"
                        className="btn-tactile bg-[#141210] text-[#E58A6D] border border-[#2E2B27] font-bold text-[10px] uppercase tracking-[0.2em] w-full py-5 rounded-xl flex items-center justify-center gap-2 group hover:border-[#E58A6D]"
                      >
                        <Target size={16} className="group-hover:animate-pulse" /> The Arena
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <StatCard icon={<Star size={18} />} label="Streak" value="5 Days" />
                  <StatCard icon={<Clock size={18} />} label="Focus" value="12h" />
                  <StatCard icon={<CheckCircle2 size={18} />} label="Modules" value={`${modules.length}`} />
                  <StatCard icon={<Zap size={18} />} label="Uplink" value="WIRED" />
                </div>
              </MotionDiv>
            </div>
          </section>
        )}

        {/* PHASE 2: Modules Grid — Clean & Goal-Oriented */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <MotionDiv
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <h2 className="text-5xl font-serif text-text-primary tracking-tight">Mastery Modules</h2>
              <p className="text-xl font-serif italic text-text-secondary opacity-70">Step-by-step blueprints for building the future.</p>
            </MotionDiv>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-64 rounded-3xl bg-white border border-border-fine animate-pulse" />
                ))
              ) : modules.map((module, i) => (
                <MotionDiv
                  key={module.id}
                  variants={fadeUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/learn/${module.slug}`} className="group block h-full">
                    <div className="h-full bg-white border border-border-fine rounded-3xl p-10 shadow-card hover:shadow-float transition-editorial group-hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden">
                       <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-bg-surface border border-border-fine flex items-center justify-center text-accent font-bold text-xs">
                               0{i + 1}
                            </div>
                            {progress?.completed_modules?.includes(module.id) && (
                              <CheckCircle2 size={20} className="text-emerald-500" />
                            )}
                          </div>
                          <div className="space-y-3">
                             <h3 className="text-2xl font-serif font-bold text-text-primary group-hover:text-accent transition-colors">{module.name}</h3>
                             <p className="text-sm prose-editorial text-text-secondary opacity-70 line-clamp-2">{module.description}</p>
                          </div>
                       </div>
                       <div className="pt-10 flex items-center justify-between mt-10 border-t border-border-fine">
                          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted group-hover:text-accent">Start Module</span>
                          <ArrowRight size={16} className="text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                       </div>
                    </div>
                  </Link>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-bg-surface/50 border-t border-border-fine px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col gap-2 scale-75 origin-left">
             <span className="font-serif font-bold text-4xl">LearnFlow</span>
             <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-text-muted">Part of Panaversity</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted opacity-40">Architected by Hassaan & AI • 2026</span>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-white border border-border-fine rounded-2xl p-6 shadow-sm flex flex-col items-center text-center gap-3">
      <div className="text-accent/50">{icon}</div>
      <div>
        <span className="block text-[9px] font-bold uppercase tracking-widest text-text-muted">{label}</span>
        <span className="block text-xl font-serif text-text-primary">{value}</span>
      </div>
    </div>
  );
}
