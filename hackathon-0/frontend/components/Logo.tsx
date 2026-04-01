import * as React from "react";

export function Logo() {
  return (
    <div className="flex items-center gap-3 group transition-editorial">
      <div className="relative w-7 h-7 flex items-center justify-center">
        {/* Abstract Architectural Mark */}
        <div className="absolute inset-0 border border-border-fine rounded-lg transform rotate-45 transition-editorial group-hover:rotate-90 group-hover:border-accent/40" />
        <div className="absolute inset-[6px] bg-accent rounded-sm shadow-lg shadow-accent/20 transition-editorial group-hover:scale-110" />
      </div>
      <span className="font-serif font-bold text-[18px] text-text-primary tracking-tight">
        Panaversity
      </span>
    </div>
  );
}

