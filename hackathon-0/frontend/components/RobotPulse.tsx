"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Zap } from "lucide-react";

const NODES = [
  { id: "H0", status: "Operational", color: "text-[#579D84]" },
  { id: "H1", status: "Active", color: "text-[#579D84]" },
  { id: "H2", status: "Live", color: "text-[#579D84]" },
  { id: "H3", status: "Ready", color: "text-[#579D84]" },
  { id: "H4", status: "Syncing", color: "text-accent" },
];

export function RobotPulse() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-10 py-5 bg-white border border-border-fine rounded-2xl shadow-card relative overflow-hidden group">
      {/* Pulse line background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline 
                points="0,50 10,50 15,30 25,70 30,50 100,50" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                className="text-accent animate-pulse"
            />
         </svg>
      </div>

      <div className="flex items-center gap-3 relative z-10 pr-6 border-r border-border-fine">
        <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center text-accent">
          <Activity size={14} className="animate-pulse" />
        </div>
        <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-primary">Ecosystem Heartbeat</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#579D84]">99.8% System Health</span>
        </div>
      </div>

      <div className="flex items-center gap-6 relative z-10">
        {NODES.map((node) => (
          <div key={node.id} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full bg-current ${node.color} animate-soft-pulse`} />
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-primary">{node.id}</span>
                <span className={`text-[8px] uppercase tracking-widest font-bold opacity-50`}>{node.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 relative z-10 pl-6 border-l border-border-fine opacity-50">
         <div className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-[#579D84]" />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Verified Hub</span>
         </div>
         <div className="flex items-center gap-2">
            <Zap size={12} className="text-accent" />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em]">1.2ms Latency</span>
         </div>
      </div>
    </div>
  );
}
