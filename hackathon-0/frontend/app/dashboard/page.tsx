"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ListChecks, AlertCircle, FileText, CheckCircle2, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/vault-stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { label: "Needs Action", value: stats?.needs_action, icon: <AlertCircle className="text-amber-500" />, color: "border-amber-500/20" },
    { label: "Pending Approval", value: stats?.pending_approval, icon: <FileText className="text-blue-500" />, color: "border-blue-500/20" },
    { label: "Active Plans", value: stats?.plans, icon: <LayoutDashboard className="text-purple-500" />, color: "border-purple-500/20" },
    { label: "Activities Completed", value: stats?.done, icon: <CheckCircle2 className="text-emerald-500" />, color: "border-emerald-500/20" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">AI Employee Orchestrator</h1>
            <p className="text-slate-400">Monitoring real-time vault activity and agent tasks</p>
          </div>
          <Link href="/">
            <Badge variant="outline" className="hover:bg-slate-800 transition-colors cursor-pointer px-4 py-1">
              Back to Portfolio
            </Badge>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, idx) => (
            <Card key={idx} className={`bg-slate-900/40 border ${card.color} backdrop-blur-sm`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">{card.label}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-9 w-16 bg-slate-800" />
                ) : (
                  <div className="text-3xl font-bold">{card.value ?? 0}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
          <Card className="lg:col-span-2 bg-slate-900/40 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <ListChecks className="text-emerald-500" /> Recent Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  [1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full bg-slate-800" />)
                ) : (
                  <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-lg">
                    System active. No new events detected in current session.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Master Orchestrator</span>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Operational</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Gmail Poller</span>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Filesystem Watcher</span>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-sm font-medium mb-2">Upcoming Briefing</h4>
                <div className="text-xs text-slate-400">Sunday, 8:00 PM EST</div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
