/**
 * CompanionWindow — H1 Docusaurus two-pane window (sidebar + chat).
 * Desktop: animated inline sidebar (240px spring).
 * Mobile: absolute overlay drawer with swipe-to-dismiss.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CompanionSidebar }       from "./CompanionSidebar.jsx";
import { CompanionChat }          from "./CompanionChat.jsx";
import { useCompanionSessions }   from "./hooks/useCompanionSessions.js";
import { useLanguage }            from "@site/src/context/LanguageContext.js";

const SPRING_SIDEBAR = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 };

export function CompanionWindow({ platform, context, onClose }) {
  const { lang }  = useLanguage();
  const isRTL     = lang === "ur";
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    sessions, activeSession, activeSessionId,
    newSession, switchSession, deleteSession, updateActiveMessages,
  } = useCompanionSessions(platform);

  const sidebarInitialX = isRTL ? 240 : -240;

  const sidebarContent = (
    <CompanionSidebar
      sessions={sessions}
      activeSessionId={activeSessionId}
      onNewSession={newSession}
      onSelectSession={switchSession}
      onDeleteSession={deleteSession}
      onCollapse={() => setSidebarOpen(false)}
    />
  );

  return (
    <div
      style={{ display: "flex", width: "100%", height: "100%", overflow: "hidden" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Desktop inline sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            key="sidebar-desktop"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{    width: 0, opacity: 0 }}
            transition={SPRING_SIDEBAR}
            style={{
              display:    "none",
              height:     "100%",
              flexShrink: 0,
              overflow:   "hidden",
              borderRight: "0.8px solid var(--border-fine)",
              background: "var(--glass-bg)",
              willChange: "width, opacity",
            }}
            className="companion-sidebar-desktop"
          >
            <div style={{ width: "240px", height: "100%", flexShrink: 0 }}>
              {sidebarContent}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay drawer */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <>
            <motion.div
              key="sidebar-scrim"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                display:  "none",
                position: "absolute",
                inset:    0,
                background: "rgba(0,0,0,0.2)",
                zIndex:   1,
              }}
              className="companion-sidebar-scrim"
            />
            <motion.aside
              key="sidebar-mobile"
              initial={{ x: sidebarInitialX, opacity: 0 }}
              animate={{ x: 0,               opacity: 1 }}
              exit={  { x: sidebarInitialX,  opacity: 0 }}
              drag="x"
              dragConstraints={isRTL ? { left: 0, right: 240 } : { left: -240, right: 0 }}
              dragElastic={isRTL ? { right: 0.2 } : { left: 0.2 }}
              onDragEnd={(_, info) => {
                const shouldClose = isRTL
                  ? info.offset.x > 60 || info.velocity.x > 300
                  : info.offset.x < -60 || info.velocity.x < -300;
                if (shouldClose) setSidebarOpen(false);
              }}
              transition={SPRING_SIDEBAR}
              style={{
                display:    "none",
                position:   "absolute",
                top:        0,
                bottom:     0,
                [isRTL ? "right" : "left"]: 0,
                width:      "240px",
                zIndex:     2,
                background: "var(--bg)",
                borderRight: isRTL ? "none" : "0.8px solid var(--border-fine)",
                borderLeft:  isRTL ? "0.8px solid var(--border-fine)" : "none",
                overflow:   "hidden",
                willChange: "transform",
                boxShadow:  "0 4px 24px -4px rgba(0,0,0,0.2)",
              }}
              className="companion-sidebar-mobile"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CompanionChat
        platform={platform}
        context={context}
        session={activeSession}
        onUpdateMessages={updateActiveMessages}
        onClose={onClose}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
    </div>
  );
}
