// e:/panaversity/hackathon-0/frontend/components/ThemeToggle.tsx

"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="p-2 w-10 h-10" />;

  const isDark = theme === "dark" || theme === "system";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] text-white hover:text-cyan-400 transition-all flex items-center justify-center group"
    >
      <div className="relative w-5 h-5">
        <Sun className={`absolute inset-0 transition-all duration-300 ${isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`} />
        <Moon className={`absolute inset-0 transition-all duration-300 ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`} />
      </div>
    </button>
  );
}
