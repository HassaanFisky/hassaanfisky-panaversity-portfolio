import * as React from "react";
import { cn } from "@/lib/utils";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-[15px] h-[15px]", className)}>
        {/* Back square */}
        <div 
          className="absolute inset-0 rounded-[var(--radius-sm)] border border-[var(--border-active)] translate-x-[3px] translate-y-[3px]"
        />
        {/* Front square */}
        <div 
          className="absolute inset-0 rounded-[var(--radius-sm)] bg-[var(--accent)]"
        />
      </div>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon />
      <span 
        className="font-sans font-semibold text-[15px] text-[var(--text-primary)] tracking-[-0.02em]"
      >
        Evolution of To-Do
      </span>
    </div>
  );
}
