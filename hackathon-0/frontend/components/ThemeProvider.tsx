"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * HASSAAN AI ARCHITECT — Theme Node Wrapper
 * Re-engineered for Next.js 15 + next-themes compatibility.
 */
export function ThemeProvider({ children, ...props }: any) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
