"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Inbox, BarChart2, AlertCircle, RefreshCw, Clock, WifiOff, TrendingUp, TrendingDown, Minus, Sparkles, Zap, Terminal, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAriaAgent } from "@/lib/hooks/useAriaAgent";

interface Ticket {
  id: string;
  customer: string;
  channel: string;
  status: string;
  time: string;
  priority: "low" | "medium" | "high" | "critical";
  message?: string;
  timestamp?: number;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState({
    totalTickets: 0,
    needsAttention: 0,
    resolutionRate: "0%",
    avgResponseTime: "0 min",
  });

  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { analysis, isLoadingAnalysis, runAnalysis } = useAriaAgent();

  const clearTimers = useCallback(() => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = null;
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    const stored = localStorage.getItem("h4_tickets");
    if (stored) {
      try {
        const parsed: Ticket[] = JSON.parse(stored);
        const sorted = parsed.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setTickets(sorted);

        const attention = sorted.filter(t => t.priority === "critical" || t.priority === "high" || t.status === "Needs Review").length;
        const resolved = sorted.filter(t => t.status === "Resolved").length;
        const rate = sorted.length > 0 ? ((resolved / sorted.length) * 100).toFixed(1) : "100";

        setStats({
          totalTickets: sorted.length,
          needsAttention: attention,
          resolutionRate: `${rate}%`,
          avgResponseTime: "1.2 min" // Accelerated by AI
        });
      } catch (e) {
        console.error("Failed to parse tickets", e);
      }
    }
  }, []);

  // Trigger ARIA Intelligence Report after 2 seconds
  useEffect(() => {
    const t = setTimeout(() => { runAnalysis(); }, 2000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleManualWake = () => {
    clearTimers();
    const nextCount = retryCount + 1;
    setRetryCount(nextCount);
  };

  const handlePermanentRetry = () => {
    setError(null);
    setRetryCount(0);
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === "resolved") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    if (s === "in progress") return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    if (s === "needs review") return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    return "bg-bg-elevated text-text-secondary";
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-amber-400";
      case "low": return "bg-green-500";
      default: return "bg-gray-300";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "improving") return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    if (trend === "declining") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-text-muted" />;
  };

  return (
    <main className="min-h-screen bg-bg-base text-text-primary flex flex-col">
      <Navbar />

      <div className="max-w-[1200px] mx-auto w-full px-6 pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-text-primary mb-3">Dashboard</h1>
          <p className="text-lg text-text-secondary">A centralized view of your support operations.</p>
        </div>

        {error === "permanent" ? (
          <div className="glass-apple p-12 text-center flex flex-col items-center justify-center transform transition-all shadow-soft border-white/20 dark:border-white/10 rounded-3xl">
            <div className="w-16 h-16 bg-bg-surface rounded-full flex items-center justify-center mb-6">
              <WifiOff className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-serif mb-2">Unable to connect</h3>
            <p className="text-text-muted mb-8">Backend may be down. Check system status.</p>
            <div className="flex gap-4">
              <Link href="/status" className="px-6 py-2.5 rounded-full bg-bg-elevated font-bold text-sm tracking-widest uppercase hover:brightness-95 transition-all">Check Status →</Link>
              <button onClick={handlePermanentRetry} className="px-6 py-2.5 rounded-full bg-accent text-white font-bold text-sm tracking-widest uppercase shadow-md hover:scale-105 transition-all">Try Again</button>
            </div>
          </div>
        ) : countdown !== null ? (
          <div className="glass-apple p-12 text-center flex flex-col items-center justify-center transform transition-all shadow-soft border-white/20 dark:border-white/10 rounded-3xl">
            <div className="w-16 h-16 bg-bg-surface rounded-full flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-serif mb-2">Backend is waking up...</h3>
            <p className="text-text-muted mb-8 max-w-[400px]">
              Our server was sleeping to save resources.<br />
              It usually takes 20-40 seconds to wake up.<br />
              This is completely normal on free hosting.
            </p>
            <div className="w-full max-w-[300px] mb-8">
              <div className="text-sm font-medium text-text-primary mb-2">Retrying in {countdown} seconds...</div>
              <div className="w-full h-2 bg-border-fine rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 30) * 100}%` }}
                />
              </div>
            </div>
            <button onClick={handleManualWake} className="px-6 py-2.5 rounded-full bg-accent text-white font-bold text-sm tracking-widest uppercase shadow-md hover:scale-105 transition-all">Wake It Up →</button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* ── INSTANT STAT CARDS ── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-apple p-8 rounded-[2rem] shadow-soft border-white/20 dark:border-white/10">
                <div className="flex items-center gap-3 text-text-muted mb-4">
                  <Inbox className="w-5 h-5" />
                  <h3 className="font-medium">Total Tickets</h3>
                </div>
                <div className="text-5xl font-serif text-text-primary">{stats.totalTickets}</div>
              </div>
              <div className="glass-apple p-8 rounded-[2rem] shadow-soft border-white/20 dark:border-white/10">
                <div className="flex items-center gap-3 text-text-muted mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-medium">Needs Attention</h3>
                </div>
                <div className="text-5xl font-serif text-accent">{stats.needsAttention}</div>
              </div>
              <div className="glass-apple p-8 rounded-[2rem] shadow-soft border-white/20 dark:border-white/10">
                <div className="flex items-center gap-3 text-text-muted mb-4">
                  <BarChart2 className="w-5 h-5" />
                  <h3 className="font-medium">Resolution Rate</h3>
                </div>
                <div className="text-5xl font-serif text-emerald-600 dark:text-emerald-400">{stats.resolutionRate}</div>
              </div>
            </div>

            {/* ── AI AGENT TERMINAL LINK ── */}
            <Link 
              href="/dashboard/agents"
              className="glass-apple p-6 rounded-[2rem] flex items-center justify-between group hover:border-accent transition-all shadow-soft border border-white/20 dark:border-white/10 relative overflow-hidden"
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-14 h-14 bg-text-primary rounded-2xl flex items-center justify-center text-bg-base group-hover:bg-accent transition-colors shadow-lg">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-text-primary">Agent Operations Center</h3>
                  <p className="text-sm text-text-secondary">Command your Digital FTE roster directly.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest relative z-10">
                Manage Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* ── ARIA INTELLIGENCE REPORT ── */}
            {isLoadingAnalysis && (
              <div className="glass-apple rounded-[2rem] p-8 border-l-4 border-l-accent shadow-soft border-y border-r border-white/20 dark:border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                  <h2 className="text-xl font-serif">ARIA Intelligence Report</h2>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-bg-surface rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-bg-surface rounded animate-pulse w-1/2" />
                  <div className="h-4 bg-bg-surface rounded animate-pulse w-2/3" />
                </div>
              </div>
            )}

            {analysis && !isLoadingAnalysis && (
              <div className="glass-apple rounded-[2rem] p-8 border-l-4 border-l-accent shadow-soft border-y border-r border-white/20 dark:border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-serif">ARIA Intelligence Report</h2>
                  <div className="ml-auto flex items-center gap-2">
                    {getTrendIcon(analysis.weeklyTrend)}
                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted capitalize">{analysis.weeklyTrend}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">Top Issue Category</div>
                    <div className="text-lg font-serif capitalize">{analysis.topIssueCategory}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">AI Resolution Rate</div>
                    <div className="text-lg font-serif">{analysis.resolutionRatePercent}%</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">Avg Response Time</div>
                    <div className="text-lg font-serif">{analysis.avgResponseTimeMinutes} min</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">Agent Performance</div>
                    <div className="text-lg font-serif">{analysis.agentPerformanceScore} / 10</div>
                  </div>
                </div>
                <div className="space-y-3 border-t border-border-fine pt-5">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-accent mb-1">Critical Insight</div>
                    <p className="text-sm text-text-primary">{analysis.criticalInsight}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">Recommended Action</div>
                    <p className="text-sm text-text-secondary">{analysis.recommendedAction}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── TICKET TABLE ── */}
            <div className="glass-apple rounded-[2.5rem] overflow-hidden shadow-float border border-white/20 dark:border-white/10">
              <div className="p-6 md:p-8 border-b border-border-fine flex items-center justify-between">
                <h2 className="text-xl font-serif">Recent Inquiries</h2>
                <button
                  onClick={() => runAnalysis()}
                  className="p-2 text-text-muted hover:text-text-primary transition-colors"
                  title="Refresh"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoadingAnalysis ? "animate-spin" : ""}`} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-fine bg-bg-surface/50 backdrop-blur-sm">
                      <th className="px-8 py-4 font-medium text-sm text-text-muted uppercase tracking-widest">Customer</th>
                      <th className="px-8 py-4 font-medium text-sm text-text-muted uppercase tracking-widest">Channel</th>
                      <th className="px-8 py-4 font-medium text-sm text-text-muted uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 font-medium text-sm text-text-muted uppercase tracking-widest">Priority</th>
                      <th className="px-8 py-4 font-medium text-sm text-text-muted text-right uppercase tracking-widest">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-fine">
                    {tickets.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-text-muted font-serif italic">
                          No active tickets yet. Submit a test ticket in the Support view.
                        </td>
                      </tr>
                    ) : (
                    {tickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className={`hover:bg-bg-elevated transition-colors group ${ticket.priority === "critical" ? "bg-red-500/5" : ""}`}
                      >
                        <td className="px-8 py-5">
                          <div className="font-medium text-text-primary">{ticket.customer}</div>
                          <div className="text-xs text-text-muted mt-1 font-mono">{ticket.id}</div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="capitalize text-text-secondary">{ticket.channel}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            {ticket.status === "In Progress" && (
                              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            )}
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getPriorityDot(ticket.priority)}`} />
                            <span className="text-xs font-medium text-text-muted capitalize">{ticket.priority}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-text-muted text-sm text-right font-mono">
                          {ticket.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
