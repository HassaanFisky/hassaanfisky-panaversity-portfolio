import * as React from "react";

export function Logo() {
  return (
    <div className="flex items-center gap-3 group transition-editorial">
      <div className="w-8 h-8 rounded-xl bg-accent-soft flex items-center justify-center border border-accent/20 shadow-sm transition-editorial group-hover:bg-white group-hover:border-accent group-hover:scale-105">
        <span className="text-accent font-serif font-bold text-lg italic">A</span>
      </div>
      <span className="font-serif font-bold text-[18px] text-text-primary tracking-tight">
        Panaversity
      </span>
    </div>
  );
}

