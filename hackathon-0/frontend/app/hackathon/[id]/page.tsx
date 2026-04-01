// e:/panaversity/hackathon-0/frontend/app/hackathon/[id]/page.tsx

import { notFound } from "next/navigation";
import { hackathons } from "@/lib/hackathons";
import { MoveLeft, Milestone, Layers, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HackathonDetail({ params }: PageProps) {
  const { id } = await params;
  const hackathon = hackathons.find((h) => h.id === parseInt(id));

  if (!hackathon) return notFound();

  const isComingSoon = hackathon.status === "coming-soon";

  return (
    <div className="min-h-screen bg-black pt-24 pb-32 px-4 selection:bg-cyan-400 selection:text-black">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-sm font-bold text-slate-500 hover:text-cyan-400 transition-colors group"
        >
          <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Hub</span>
        </Link>

        {/* Feature Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 font-mono">
                Project Manifest / {hackathon.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                {hackathon.title}
              </h1>
              <StatusBadge status={hackathon.status} />
            </div>

            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl">
              {hackathon.description}
            </p>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 font-mono">
                System Capabilities
              </h3>
              <div className="flex flex-wrap gap-3">
                {hackathon.tech.map((tech) => (
                  <div key={tech} className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-[#0f172a] border border-[#1e293b] text-sm text-slate-300 font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-1 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-[#1e293b] space-y-8 h-fit shadow-2xl">
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-widest font-mono">Awarded Points</div>
                <div className="text-3xl font-black text-cyan-400 font-mono tracking-tighter shadow-cyan-400/10 drop-shadow-sm">
                  {hackathon.points}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-cyan-400/10 rounded-2xl border border-cyan-400/20">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Verified Build</h5>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      Architecture audited by Panaversity AI Agent.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-400/10 rounded-2xl border border-blue-400/20">
                    <Layers className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Fullstack Compliance</h5>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      Strict adherence to Next.js 15 App Router spec.
                    </p>
                  </div>
                </div>
              </div>

              <Link 
                href={hackathon.url}
                target={hackathon.url !== "#" ? "_blank" : "_self"}
                className={`w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center space-x-3 transition-all ${
                  isComingSoon 
                    ? "bg-[#0f172a] text-slate-600 border border-[#1e293b] cursor-not-allowed" 
                    : "bg-white text-black hover:bg-cyan-400 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                }`}
              >
                <span>{isComingSoon ? "Build Locked" : "Access Project"}</span>
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Big Decorative Section Background */}
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-cyan-400/5 blur-[150px] rounded-full pointer-events-none" />
      </div>
    </div>
  );
}
