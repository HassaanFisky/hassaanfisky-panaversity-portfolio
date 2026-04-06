// src/theme/Root.js
// HASSAAN AI ARCHITECT — Root Layout Wrapper v3.0
// Fixed: Removed standalone <ChatWidget /> — it now lives inside ActionDock
// to prevent duplicate widget instances. ActionDock is the single source of truth
// for the chat panel.

import React from "react";
import { LanguageProvider } from "@site/src/context/LanguageContext";
import EcosystemNav from "@site/src/components/EcosystemNav";
import ActionDock from "@site/src/components/ActionDock/ActionDock";
import SnowOverlay from "@site/src/components/SnowOverlay";

/**
 * Root Layout Wrapper — HASSAAN AI ARCHITECT
 * Globally injects core AI ecosystem services.
 *
 * Z-Index Hierarchy:
 *   10002 — Lang dropdown
 *   10001 — ActionDock
 *   10000 — EcosystemNav
 *    9000 — ChatWidget (rendered inside ActionDock)
 *  999999 — SnowOverlay (particles, inert)
 */
export default function Root({ children }) {
  return (
    <LanguageProvider>
      {/* 1. Core Content */}
      {children}

      {/* 2. Global Navigation Hub (bottom-left) */}
      <EcosystemNav />

      {/* 3. Action Dock with embedded Chat (right, vertical) */}
      <ActionDock />

      {/* 4. Snow FX (canvas, pointer-events: none) */}
      <SnowOverlay />
    </LanguageProvider>
  );
}
