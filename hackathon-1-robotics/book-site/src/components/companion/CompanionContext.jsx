/**
 * CompanionContext — Shared open/close state for the H1 Companion System.
 * Wrap the entire app tree with <CompanionProvider> in Root.js.
 * No "use client" needed — Docusaurus doesn't use Next.js App Router.
 */

import React, { createContext, useContext, useState, useCallback } from "react";

const CompanionContext = createContext(null);

export function CompanionProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const open   = useCallback(() => setIsOpen(true), []);
  const close  = useCallback(() => setIsOpen(false), []);

  return (
    <CompanionContext.Provider value={{ isOpen, toggle, open, close }}>
      {children}
    </CompanionContext.Provider>
  );
}

export function useCompanion() {
  const ctx = useContext(CompanionContext);
  if (!ctx) {
    throw new Error("useCompanion must be used within a <CompanionProvider>.");
  }
  return ctx;
}
