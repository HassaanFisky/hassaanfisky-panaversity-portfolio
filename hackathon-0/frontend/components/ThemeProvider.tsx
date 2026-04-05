"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * HASSAAN AI ARCHITECT — Theme Node Wrapper
 * Re-engineered for 100% build stability on Vercel.
 * Eliminating direct type imports to resolve package boundary issues.
 */
export function ThemeProvider({ children, ...props }: any) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem 
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
