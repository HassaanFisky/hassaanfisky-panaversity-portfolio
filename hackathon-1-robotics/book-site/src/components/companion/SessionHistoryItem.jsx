import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Trash2 } from "lucide-react";

function formatDate(isoString) {
  const d   = new Date(isoString);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function SessionHistoryItem({ session, isActive, onSelect, onDelete }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      onClick={onSelect}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()   => setHovered(false)}
      style={{
        display:      "flex",
        alignItems:   "flex-start",
        gap:          "0.5rem",
        padding:      "0.625rem 0.75rem",
        borderRadius: "0.75rem",
        cursor:       "pointer",
        userSelect:   "none",
        border:       isActive ? "1px solid var(--accent-soft)" : "1px solid transparent",
        background:   isActive ? "var(--accent-soft)" : "transparent",
        color:        isActive ? "var(--accent)" : "var(--text-secondary)",
      }}
      className="group"
    >
      <MessageSquare size={13} style={{ marginTop: "0.125rem", flexShrink: 0, opacity: 0.7 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize:     "11px",
          fontWeight:   700,
          overflow:     "hidden",
          textOverflow: "ellipsis",
          whiteSpace:   "nowrap",
          lineHeight:   "1.35",
          margin:       0,
        }}>
          {session.title}
        </p>
        <p style={{
          fontSize:      "9px",
          color:         "var(--text-muted)",
          marginTop:     "0.125rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin:        0,
        }}>
          {formatDate(session.updatedAt)}
        </p>
      </div>
      {hovered && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1   }}
          transition={{ duration: 0.15 }}
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          aria-label="Delete session"
          style={{
            flexShrink:      0,
            width:           "1.25rem",
            height:          "1.25rem",
            borderRadius:    "0.25rem",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            color:           "var(--text-muted)",
            background:      "transparent",
            border:          "none",
            cursor:          "pointer",
            padding:         0,
            transition:      "color 0.15s, background 0.15s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.background = "rgba(248, 113, 113, 0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <Trash2 size={11} />
        </motion.button>
      )}
    </motion.div>
  );
}
