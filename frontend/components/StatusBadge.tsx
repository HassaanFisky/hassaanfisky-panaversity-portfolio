// e:/panaversity/hackathon-0/frontend/components/StatusBadge.tsx

import * as React from "react";

interface StatusBadgeProps {
  status: "live" | "coming-soon" | "wip";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const configs = {
    live: {
      label: "Live",
      bg: "rgba(61, 214, 140, 0.08)",
      text: "var(--success)",
      border: "rgba(61, 214, 140, 0.15)",
      dot: "bg-[var(--success)] animate-pulse"
    },
    wip: {
      label: "In Progress",
      bg: "rgba(212, 165, 116, 0.08)",
      text: "var(--accent)",
      border: "rgba(212, 165, 116, 0.15)",
      dot: "bg-[var(--accent)]"
    },
    "coming-soon": {
      label: "Coming Soon",
      bg: "var(--bg-elevated)",
      text: "var(--text-muted)",
      border: "var(--border-subtle)",
      dot: "bg-[var(--text-muted)]"
    }
  };

  const config = configs[status];

  return (
    <div 
      className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-sm)] text-[10px] font-bold tracking-[0.05em] border uppercase space-x-1.5 shadow-sm"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        borderColor: config.border
      }}
    >
      <span className={`w-1 h-1 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </div>
  );
}
