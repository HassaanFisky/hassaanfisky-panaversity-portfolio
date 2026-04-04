// e:/panaversity/hackathon-0/frontend/components/ThemeToggle.tsx

"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="h-7 w-12 rounded-full bg-gray-200" />;

  const isDark = resolvedTheme === "dark";
  
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative h-7 w-12 rounded-full transition-colors duration-300
        ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isDark ? "bg-[#38312E]" : "bg-[#E5E0D8]"}`}
      role="switch" aria-checked={isDark} aria-label="Toggle theme"
    >
      <span className={`absolute top-0.5 left-0.5 flex h-6 w-6 items-center
        justify-center rounded-full bg-white shadow-sm
        transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isDark ? "translate-x-5" : "translate-x-0"}`}
      >
        {isDark ? <Moon size={14} className="text-gray-800" /> : <Sun size={14} className="text-gray-500" />}
      </span>
    </button>
  );
}
