"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Zap } from "lucide-react";

const NODES = [
  { id: "H0", label: "Portfolio",  status: "Operational", color: "#579D84" },
  { id: "H1", label: "Robotics",   status: "Active",      color: "#579D84" },
  { id: "H2", label: "TodoStack",  status: "Live",        color: "#579D84" },
  { id: "H3", label: "LearnFlow",  status: "Ready",       color: "#579D84" },
  { id: "H4", label: "AIRA",       status: "Syncing",     color: "var(--accent)" },
];

/**
 * Ecosystem Heartbeat Panel — System Status Overview
 *
 * Placed above the "Project Journey" section in page.tsx.
 * Fully responsive: stacks gracefully on mobile, one-line on desktop.
 * All animations are CSS-only or GPU-composited (opacity/transform only).
 */
export function RobotPulse() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-bg-surface border border-border-fine rounded-2xl shadow-card overflow-hidden"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Subtle pulse EKG line — pure CSS, zero JS */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
          <polyline
            points="0,30 60,30 80,10 100,50 120,30 400,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border-fine">

        {/* ── Heartbeat label ── */}
        <div className="flex items-center gap-3 px-5 sm:px-6 py-4 sm:pr-8 shrink-0">
          <div className="w-8 h-8 rounded-full bg-accent/8 border border-accent/15 flex items-center justify-center text-accent shrink-0">
            <Activity size={14} style={{ willChange: "opacity" }} className="animate-pulse" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary whitespace-nowrap">
              Ecosystem Heartbeat
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
              99.8% System Health
            </span>
          </div>
        </div>

        {/* ── Node status indicators ── */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 sm:px-6 py-4 flex-1">
          {NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Animated status dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: node.color, willChange: "opacity, transform" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: node.color }}
                />
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-primary leading-none">{node.id}</span>
                <span className="text-[8px] uppercase tracking-wider font-bold text-text-muted leading-none mt-0.5">
                  {node.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Verified + latency chips ── */}
        <div className="flex items-center gap-5 px-5 sm:px-6 py-4 shrink-0 opacity-60">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <ShieldCheck size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-text-muted">
              Verified Hub
            </span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Zap size={12} className="text-accent shrink-0" />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-text-muted">
              1.2ms Latency
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
