"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle2, Sparkles, Layout, Zap, ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LearnPage() {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      const { data } = await supabase
        .from('modules')
        .select('*')
        .order('order', { ascending: true });
      
      const standardModules = [
        { id: "m1", name: "Python Basics", slug: "syntax", description: "Learn variables, math, and making choices.", order: 1 },
        { id: "m2", name: "Advanced Logic", slug: "logic", description: "Master functions and recursive thinking.", order: 2 }
      ];

      setModules(data && data.length > 0 ? data : standardModules);
      setLoading(false);
    };

    fetchModules();
  }, []);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col font-sans text-text-primary selection:bg-accent/10">
      <header className="border-b border-border-fine bg-white/80 backdrop-blur-xl h-20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="p-2.5 hover:bg-bg-surface rounded-xl transition-all group border border-transparent hover:border-border-fine">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <h1 className="text-xl font-serif font-bold italic tracking-tight">Ecosystem Modules</h1>
          </div>
          <div className="p-2 bg-accent/5 rounded-lg border border-accent/10 text-accent">
            <Layout size={20} />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-20 space-y-16">
        <section className="text-center space-y-6">
           <h2 className="text-5xl font-serif font-bold italic tracking-tighter text-text-primary">Your Learning Journey</h2>
           <p className="text-xl font-serif italic text-text-secondary opacity-70">Pick a module to start your mastery sequence.</p>
        </section>

        {/* PHASE 2: Simple Module Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 rounded-3xl bg-white border border-border-fine animate-pulse" />
            ))
          ) : modules.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/learn/${module.slug}`} className="group block h-full">
                <div className="h-full bg-white border border-border-fine rounded-3xl p-10 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-500 relative flex flex-col justify-between">
                  <div className="space-y-6">
                     <div className="w-12 h-12 bg-bg-surface border border-border-fine rounded-xl flex items-center justify-center text-accent">
                        <BookOpen size={24} />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-2xl font-serif font-bold text-text-primary group-hover:text-accent transition-colors">{module.name}</h3>
                        <p className="text-sm text-text-secondary opacity-60 leading-relaxed">{module.description}</p>
                     </div>
                  </div>
                  <div className="pt-8 border-t border-border-fine flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.35em] text-text-muted">
                     <span>{module.order} Milestone</span>
                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}
