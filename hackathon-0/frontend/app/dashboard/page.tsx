"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  FileText,
  Settings,
  Globe,
  ChevronRight,
  LogOut,
  User,
  Activity,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { hackathons } from "@/lib/hackathons";

/**
 * HASSAAN AI ARCHITECT — Dashboard Page
 * Post-login experience with real-time project health checks.
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
        { name: "AI Companion FTE", url: "https://hassaanfisky-aira-digital-fte.vercel.app" },
      ];

      projects.forEach(p => checkStatus(p.name, p.url));
    }
  }, [activeTab]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <span className="text-[11px] uppercase tracking-widest text-text-muted font-bold">Checking Credentials...</span>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user;
  const liveProjects = hackathons.filter((h) => h.status === "live").length;

  return (
    <div className="min-h-screen bg-bg-base pt-24 pb-20 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent mb-2">Member Portal</div>
            <h1 className="text-3xl md:text-4xl font-serif text-text-primary tracking-tight">
              Welcome, <span className="text-accent italic">{user.name || "Member"}</span>
            </h1>
            <p className="text-text-muted text-sm mt-1">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 bg-bg-surface border border-border-fine text-text-primary rounded-xl font-bold text-[10px] uppercase tracking-widest hover:border-accent/40 transition-all shadow-sm"
            >
              ← Back to Home
            </Link>
            <button
              onClick={async () => { await signOut(); router.push("/"); }}
              className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center gap-2"
            >
              <LogOut size={14} /> Finish Session
            </button>
          </div>
        </motion.div>

        {/* ── Tab Nav ── */}
        <div className="flex gap-2 mb-10 border-b border-border-fine pb-4">
          {(["overview", "projects", "settings"] as const).map((tab) => {
            const icons = { overview: <LayoutDashboard size={15} />, projects: <Globe size={15} />, settings: <Settings size={15} /> };
            const labels = { overview: "Activity", projects: "My Projects", settings: "Account" };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "text-text-muted hover:text-text-primary hover:bg-bg-surface"
                }`}
              >
                {icons[tab]} {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* ── Overview Tab ── */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: "Live Projects",
                  value: liveProjects,
                  icon: <CheckCircle2 className="text-emerald-500" size={22} />,
                  color: "border-emerald-500/20 bg-emerald-500/5",
                },
                {
                  label: "Building",
                  value: hackathons.filter((h) => h.status === "wip" || h.status === "coming-soon").length,
                  icon: <Activity className="text-amber-500" size={22} />,
                  color: "border-amber-500/20 bg-amber-500/5",
                },
                {
                  label: "Accomplishments",
                  value: hackathons.length,
                  icon: <FileText className="text-blue-500" size={22} />,
                  color: "border-blue-500/20 bg-blue-500/5",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`card-humanist p-8 border ${stat.color} flex items-center gap-6 shadow-soft`}
                >
                  <div className="w-12 h-12 rounded-xl bg-bg-base border border-border-fine flex items-center justify-center shadow-sm">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-black text-text-primary">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-text-muted font-bold mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* System status — Real-time health checks */}
            <div className="card-humanist p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
                  <Activity size={20} className="text-accent" />
                  Ecosystem Status
                </h2>
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Live Updates</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Portfolio Hub", url: "https://panaversity-h0-portfolio.vercel.app" },
                  { name: "Physical AI & Robotics", url: "https://hackathon-1-robotics.vercel.app" },
                  { name: "Evolution of To-Do", url: "https://evolution-of-todo.vercel.app" },
                  { name: "LearnFlow Engine", url: "https://learnflow-platform-h3.vercel.app" },
                  { name: "AI Companion FTE", url: "https://hassaanfisky-aira-digital-fte.vercel.app" },
                ].map((service) => (
                  <a
                    key={service.name}
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center py-4 px-6 rounded-2xl bg-bg-surface/50 border border-border-fine/40 hover:border-accent/40 hover:bg-bg-surface transition-all group"
                  >
                    <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">{service.name}</span>
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${
                        statuses[service.name] === "Online" 
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                          : statuses[service.name] === "Offline"
                          ? "bg-red-500/10 text-red-500 border-red-500/20 shadow-lg shadow-red-500/5 animate-pulse"
                          : "bg-bg-elevated text-text-muted border-border-fine animate-pulse"
                      }`}>
                        {statuses[service.name] || "Checking..."}
                      </span>
                      <ChevronRight size={16} className="text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Projects Tab ── */}
        {activeTab === "projects" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {hackathons.map((h) => (
              <a
                key={h.id}
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-humanist p-8 flex items-center gap-6 hover:scale-[1.01] transition-editorial group"
              >
                <div className="w-16 h-16 rounded-2xl bg-bg-elevated border border-border-fine overflow-hidden flex-shrink-0 shadow-inner">
                  <img src={h.imageUrl} alt={h.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" onError={(e) => { (e.target as HTMLImageElement).src = "/blueprint-footer.png"; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-accent mb-1">{h.category}</div>
                  <h3 className="font-serif font-bold text-text-primary text-base leading-tight mb-1 group-hover:text-accent transition-colors">{h.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border ${h.status === "live" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : h.status === "wip" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-border-fine/20 text-text-muted border-border-fine"}`}>
                      {h.status === "live" ? "Live" : h.status === "wip" ? "In Progress" : "Coming Soon"}
                    </span>
                    <span className="text-[9px] text-accent font-bold">{h.points}</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0" />
              </a>
            ))}
          </motion.div>
        )}

        {/* ── Settings Tab ── */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Account info */}
            <div className="card-humanist p-8">
              <h2 className="text-lg font-serif font-bold text-text-primary mb-6 flex items-center gap-2">
                <User size={20} className="text-accent" />
                Account Settings
              </h2>
              <div className="space-y-5">
                <div className="flex items-center justify-between py-5 border-b border-border-fine/40">
                  <span className="text-sm font-medium text-text-muted">Display Name</span>
                  <span className="text-sm font-bold text-text-primary">{user.name || "Not set"}</span>
                </div>
                <div className="flex items-center justify-between py-5 border-b border-border-fine/40">
                  <span className="text-sm font-medium text-text-muted">Email Address</span>
                  <span className="text-sm font-bold text-text-primary">{user.email}</span>
                </div>
                <div className="flex items-center justify-between py-5">
                  <span className="text-sm font-medium text-text-muted">Membership Status</span>
                  <span className="px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Verified</span>
                </div>
              </div>
            </div>

            {/* Dashboard Preferences */}
            <div className="card-humanist p-8">
              <h2 className="text-lg font-serif font-bold text-text-primary mb-6 flex items-center gap-2">
                <Settings size={20} className="text-accent" />
                Preferences
              </h2>
              <div className="space-y-4 text-sm text-text-secondary leading-relaxed font-serif italic">
                <p>Personalize your experience through the global interface controls:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Use the <strong>Theme Toggle</strong> in the top navigation to switch between dark and light modes.</li>
                  <li>Adjust the <strong>Weather Mode</strong> in the upper-right corner for specialized environment animations.</li>
                  <li>Change your <strong>Preferred Language</strong> using the dock menu at the bottom of the screen.</li>
                </ul>
              </div>
            </div>

            {/* Session Management */}
            <div className="card-humanist p-8 border-red-500/20 bg-red-500/5">
              <h2 className="text-lg font-serif font-bold text-red-500 mb-4">Log Out</h2>
              <p className="text-sm text-text-muted mb-8 italic">Ending your session will return you to the public portfolio landing page.</p>
              <button
                onClick={async () => { await signOut(); router.push("/"); }}
                className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-red-500 text-white hover:brightness-110 font-bold text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                <LogOut size={16} /> Finish Session
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
