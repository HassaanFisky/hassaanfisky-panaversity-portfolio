"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckCircle2,
  FileText,
  Settings,
  Globe,
  ChevronRight,
  LogOut,
  User,
  Activity,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { hackathons } from "@/lib/hackathons";

/**
 * HASSAAN AI ARCHITECT — Member Dashboard
 * Humanized experience with real-time project health checks and milestone tracking.
 */
export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "settings">("overview");
  const [statuses, setStatuses] = useState<Record<string, "Checking" | "Online" | "Offline">>({});

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  // Real-time health checks
  useEffect(() => {
    if (activeTab === "overview") {
      const checkStatus = async (name: string, url: string) => {
        setStatuses(prev => ({ ...prev, [name]: "Checking" }));
        try {
          // Use no-cors to bypass CORS for status checking
          await fetch(url, { mode: 'no-cors', cache: 'no-store' });
          setStatuses(prev => ({ ...prev, [name]: "Online" }));
        } catch (e) {
          setStatuses(prev => ({ ...prev, [name]: "Offline" }));
        }
      };

      const projects = [
        { name: "Portfolio Hub", url: "https://panaversity-h0-portfolio.vercel.app" },
        { name: "Physical AI & Robotics", url: "https://hackathon-1-robotics.vercel.app" },
        { name: "Evolution of To-Do", url: "https://evolution-of-todo.vercel.app" },
        { name: "LearnFlow Engine", url: "https://learnflow-platform-h3.vercel.app" },
        { name: "AI Companion FTE", url: "https://frontend-ochre-mu-82.vercel.app" },
      ];

      projects.forEach(p => checkStatus(p.name, p.url));
    }
  }, [activeTab]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-full border-[3px] border-accent/20 border-t-accent animate-spin" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold animate-pulse">Confirming Member Identity...</span>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user;
  const liveProjects = hackathons.filter((h) => h.status === "live").length;

  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24 transition-colors duration-500 selection:bg-accent/10">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Dashboard Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="px-5 py-1.5 rounded-full bg-accent text-[9px] font-black uppercase tracking-[0.4em] text-white shadow-lg shadow-accent/20">
                 Authorized Member
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary tracking-tighter leading-none glass-3d">
              Welcome, <span className="italic text-accent">{user.name?.split(" ")[0] || "Hassaan"}</span>
            </h1>
            <p className="text-text-secondary text-lg font-serif italic opacity-70">
              Accessing the complete Panaversity Ecosystem Portfolio.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group px-8 py-5 bg-bg-surface border border-border-fine text-text-primary rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:border-accent/40 transition-all shadow-sm flex items-center gap-3"
            >
              Back to Home
            </Link>
            <button
              onClick={async () => { await signOut(); router.push("/"); }}
              className="px-8 py-5 bg-red-500 text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center gap-3 shadow-lg shadow-red-500/20 active:scale-95"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </motion.div>

        {/* ── Humanized Tab Navigation ── */}
        <div className="flex gap-4 mb-16 border-b border-border-fine pb-6 overflow-x-auto no-scrollbar">
          {(["overview", "projects", "settings"] as const).map((tab) => {
            const icons = { overview: <LayoutDashboard size={16} />, projects: <Globe size={16} />, settings: <Settings size={16} /> };
            const labels = { overview: "Ecosystem Health", projects: "All Projects", settings: "Account Settings" };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-4 px-8 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-accent text-white shadow-xl shadow-accent/20"
                    : "text-text-muted hover:text-text-primary hover:bg-bg-surface border border-transparent hover:border-border-fine"
                }`}
              >
                {icons[tab]} {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* ── Overview Tab (Humanized: Hub Activity) ── */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  label: "Online Platforms",
                  value: liveProjects,
                  icon: <CheckCircle2 className="text-emerald-500" size={24} />,
                  color: "border-emerald-500/10 bg-emerald-500/5",
                },
                {
                  label: "In Production",
                  value: hackathons.length,
                  icon: <Activity className="text-blue-500" size={24} />,
                  color: "border-blue-500/10 bg-blue-500/5",
                },
                {
                  label: "Total Milestones",
                  value: hackathons.length * 4,
                  icon: <FileText className="text-accent" size={24} />,
                  color: "border-accent/10 bg-accent/5",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`card-humanist p-10 border ${stat.color} flex items-center justify-between shadow-float relative overflow-hidden group`}
                >
                  <div className="relative z-10">
                    <div className="text-5xl font-serif font-black text-text-primary tracking-tighter mb-1">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-text-muted font-bold">{stat.label}</div>
                  </div>
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-bg-base border border-border-fine flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-12">
                    {stat.icon}
                  </div>
                  {/* Glass background echo */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            {/* Health checks grid */}
            <div className="card-humanist p-12 bg-bg-surface/30 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                     <Activity size={24} strokeWidth={2.5} />
                   </div>
                   <div>
                     <h2 className="text-2xl font-serif font-bold text-text-primary">Ecosystem Connectivity</h2>
                     <p className="text-sm text-text-muted font-serif italic mt-0.5">Real-time verification of all deployed systems.</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Master Link: Verified</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "Portfolio Hub", url: "https://panaversity-h0-portfolio.vercel.app" },
                  { name: "Physical AI & Robotics", url: "https://hackathon-1-robotics.vercel.app" },
                  { name: "Evolution of To-Do", url: "https://evolution-of-todo.vercel.app" },
                  { name: "LearnFlow Engine", url: "https://learnflow-platform-h3.vercel.app" },
                  { name: "AI Companion FTE", url: "https://frontend-ochre-mu-82.vercel.app" },
                ].map((service) => (
                  <a
                    key={service.name}
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center py-6 px-8 rounded-[2rem] bg-bg-base/40 border border-border-fine/40 hover:border-accent/60 hover:bg-bg-base transition-all group shadow-sm hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1"
                  >
                    <div className="flex flex-col">
                      <span className="text-base font-serif font-bold text-text-secondary group-hover:text-accent transition-colors">{service.name}</span>
                      <span className="text-[9px] text-text-muted uppercase tracking-widest mt-1 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        View Project <ArrowUpRight size={10} />
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border transition-all ${
                        statuses[service.name] === "Online" 
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                          : statuses[service.name] === "Offline"
                          ? "bg-red-500/10 text-red-500 border-red-500/20 shadow-lg shadow-red-500/10 animate-bounce"
                          : "bg-bg-elevated text-text-muted border-border-fine animate-pulse"
                      }`}>
                        {statuses[service.name] || "Verifying..."}
                      </span>
                      <ChevronRight size={16} className="text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-2" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Projects Tab (Humanized: The Journey) ── */}
        {activeTab === "projects" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {hackathons.map((h) => (
              <a
                key={h.id}
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-humanist p-10 flex items-center gap-10 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-700 group hover:-translate-y-2 bg-bg-surface/50 border-white/5"
              >
                <div className="w-24 h-24 rounded-3xl bg-bg-elevated border border-border-fine overflow-hidden flex-shrink-0 shadow-inner relative">
                  <img src={h.imageUrl} alt={h.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100" onError={(e) => { (e.target as HTMLImageElement).src = "/blueprint-footer.png"; }} />
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">{h.category}</span>
                    <span className="w-1 h-1 rounded-full bg-border-fine" />
                    <span className={`text-[8px] font-bold uppercase tracking-widest ${h.status === "live" ? "text-emerald-500" : "text-amber-500"}`}>
                      {h.status === "live" ? "Live" : "Building"}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-text-primary text-2xl leading-tight group-hover:text-accent transition-colors tracking-tight">{h.title}</h3>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="px-3 py-1 bg-accent/10 rounded-lg text-accent text-[8px] font-black uppercase tracking-widest">
                       {h.points}
                    </div>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-border-fine flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent transition-all">
                   <ArrowUpRight size={20} />
                </div>
              </a>
            ))}
          </motion.div>
        )}

        {/* ── Settings Tab (Humanized: Account) ── */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Account Profile Card */}
            <div className="card-humanist p-12 bg-bg-surface/50 backdrop-blur-xl">
              <div className="flex items-center gap-10 mb-12">
                <div className="w-24 h-24 rounded-[2rem] bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-float">
                  <User size={40} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                   <h2 className="text-3xl font-serif font-bold text-text-primary">Account Intelligence</h2>
                   <p className="text-sm text-text-muted font-serif italic">Management of your ecosystem member profile.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2 p-8 rounded-3xl bg-bg-base/30 border border-border-fine/40">
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Display Name</span>
                  <div className="text-lg font-serif font-bold text-text-primary">{user.name || "Member"}</div>
                </div>
                <div className="space-y-2 p-8 rounded-3xl bg-bg-base/30 border border-border-fine/40">
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Email Identity</span>
                  <div className="text-lg font-serif font-bold text-text-primary">{user.email}</div>
                </div>
                <div className="space-y-2 p-8 rounded-3xl bg-bg-base/30 border border-border-fine/40">
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Membership Tier</span>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-serif font-bold text-emerald-500">Verified Architect</span>
                    <Sparkles size={14} className="text-accent animate-pulse" />
                  </div>
                </div>
                <div className="flex items-center justify-center p-8">
                   <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline decoration-accent/40 underline-offset-8">Update Security Protocol</button>
                </div>
              </div>
            </div>

            {/* Account termination / Sign out */}
            <div className="card-humanist p-12 border-red-500/10 bg-red-500/[0.02]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="space-y-3">
                  <h2 className="text-2xl font-serif font-bold text-red-500">End Current Session</h2>
                  <p className="text-sm text-text-muted font-serif italic max-w-md">Your terminal session will be archived, and you will be returned to the public interface.</p>
                </div>
                <button
                  onClick={async () => { await signOut(); router.push("/"); }}
                  className="px-14 py-6 bg-red-500 text-white rounded-[2rem] font-bold text-[11px] uppercase tracking-[0.4em] hover:brightness-110 transition-all shadow-2xl shadow-red-500/20 active:scale-95"
                >
                  Confirm Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
