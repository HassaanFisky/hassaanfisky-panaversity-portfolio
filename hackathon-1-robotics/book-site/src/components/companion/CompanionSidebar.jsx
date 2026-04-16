import React from "react";
import { PlusCircle, PanelLeftClose } from "lucide-react";
import { SessionHistoryItem } from "./SessionHistoryItem.jsx";

export function CompanionSidebar({
  sessions, activeSessionId, onNewSession, onSelectSession, onDeleteSession, onCollapse,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", padding: "1rem 0", overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "0 1rem 0.75rem",
        flexShrink:     0,
        borderBottom:   "0.8px solid var(--border-fine)",
      }}>
        <span style={{
          fontSize:      "9px",
          fontWeight:    700,
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color:         "var(--accent)",
        }}>
          Chats
        </span>
        <button
          onClick={onCollapse}
          aria-label="Collapse sidebar"
          style={{
            width:          "1.75rem",
            height:         "1.75rem",
            borderRadius:   "0.5rem",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            color:          "var(--text-muted)",
            background:     "transparent",
            border:         "none",
            cursor:         "pointer",
            transition:     "color 0.2s, background 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
            e.currentTarget.style.background = "var(--bg-elevated)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <PanelLeftClose size={14} />
        </button>
      </div>

      {/* New Chat button */}
      <div style={{ padding: "0.75rem 0.75rem 0", flexShrink: 0 }}>
        <button
          onClick={onNewSession}
          style={{
            width:          "100%",
            display:        "flex",
            alignItems:     "center",
            gap:            "0.5rem",
            padding:        "0.625rem 0.75rem",
            borderRadius:   "0.75rem",
            border:         "1px dashed var(--border)",
            color:          "var(--text-muted)",
            background:     "transparent",
            cursor:         "pointer",
            fontSize:       "10px",
            fontWeight:     700,
            textTransform:  "uppercase",
            letterSpacing:  "0.1em",
            transition:     "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
            e.currentTarget.style.background = "var(--accent-soft)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <PlusCircle size={14} /> New Chat
        </button>
      </div>

      {/* Session list */}
      <div style={{
        flex:       1,
        overflowY:  "auto",
        marginTop:  "0.75rem",
        padding:    "0 0.75rem",
        display:    "flex",
        flexDirection: "column",
        gap:        "0.25rem",
        msOverflowStyle: "none",
        scrollbarWidth:  "none",
      }}
        className="scrollbar-hide"
      >
        {sessions.map((session) => (
          <SessionHistoryItem
            key={session.id}
            session={session}
            isActive={session.id === activeSessionId}
            onSelect={() => onSelectSession(session.id)}
            onDelete={() => onDeleteSession(session.id)}
          />
        ))}
      </div>
    </div>
  );
}
