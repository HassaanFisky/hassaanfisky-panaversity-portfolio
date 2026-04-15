/**
 * CompanionShell — H1 Docusaurus morph engine.
 * Uses createPortal + layoutId="companion-orb" to morph from the ActionDock chat button.
 * SSR guard: returns null until mounted (createPortal needs document).
 */

import React, { useEffect, useState } from "react";
import { createPortal }               from "react-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useCompanion }               from "./CompanionContext";
import { useCompanionEvents }         from "./hooks/useCompanionEvents";
import { CompanionWindow }            from "./CompanionWindow";
import { useLanguage }                from "@site/src/context/LanguageContext";

const SPRING_MORPH = { type: "spring", stiffness: 380, damping: 30, mass: 1.1 };

export function CompanionShell({ platform, context }) {
  const { isOpen, open, close, toggle } = useCompanion();
  const { lang }                        = useLanguage();

  // Bridge existing event bus
  useCompanionEvents({ open, close, toggle });

  // SSR guard — createPortal requires document
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isRTL = lang === "ur";
  const side  = isRTL ? "left-10" : "right-10";

  return createPortal(
    <MotionConfig reducedMotion="user">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="companion-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
            style={{
              position:       "fixed",
              inset:          0,
              background:     "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(4px)",
              zIndex:         10000,
            }}
          />
        )}
      </AnimatePresence>

      {/* Companion window — carries the same layoutId as the ActionDock chat button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="companion-window"
            layoutId="companion-orb"
            transition={SPRING_MORPH}
            style={{
              position:   "fixed",
              zIndex:     10001,
              willChange: "transform, border-radius, width, height",
              transformOrigin: isRTL ? "bottom left" : "bottom right",
              /* Mobile: full-width bottom sheet */
              left:         0,
              right:        0,
              bottom:       0,
              borderRadius: "2rem 2rem 0 0",
              height:       "88vh",
              /* Glass window styling */
              backdropFilter:         "blur(40px) saturate(200%)",
              WebkitBackdropFilter:   "blur(40px) saturate(200%)",
              background:             "var(--glass-bg)",
              border:                 "0.8px solid var(--glass-border)",
              boxShadow:              "var(--shadow-widget)",
              display:                "flex",
              overflow:               "hidden",
            }}
            className="companion-window-responsive"
          >
            <CompanionWindow
              platform={platform}
              context={context}
              onClose={close}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>,
    document.body
  );
}
