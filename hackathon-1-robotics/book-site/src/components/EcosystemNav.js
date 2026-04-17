import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext.js";
import clsx from "clsx";
import { useSession, signOut } from "../lib/auth-client.js";

const ECOSYSTEM_APPS = [
  {
    name: "Portfolio Hub",
    image: "https://panaversity-h0-portfolio.vercel.app/blueprint-footer.png",
    url: "https://panaversity-h0-portfolio.vercel.app",
    id: "H0",
  },
  {
    name: "Physical AI & Robotics",
    image: "https://panaversity-h0-portfolio.vercel.app/h1-thumb.png",
    url: "https://h1-robotics-textbook.vercel.app",
    id: "H1",
  },
  {
    name: "Evolution of To-Do",
    image: "https://panaversity-h0-portfolio.vercel.app/h2-thumb.png",
    url: "https://hassaanfisky-panaversity-todo-app.vercel.app",
    id: "H2",
  },
  {
    name: "LearnFlow Engine",
    image: "https://panaversity-h0-portfolio.vercel.app/h3-thumb.png",
    url: "https://learnflow-platform-h3.vercel.app",
    id: "H3",
  },
  {
    name: "AI Companion FTE",
    image: "https://panaversity-h0-portfolio.vercel.app/h4-thumb.png",
    url: "https://hassaanfisky-aira-digital-fte.vercel.app",
    id: "H4",
  },
];

export default function EcosystemNav() {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const user = session?.user ?? null;

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleSignIn = () => {
    if (typeof window !== "undefined") {
      window.location.href =
        "https://hassaanfisky-panaversity-todo-app.vercel.app/sign-in?redirect=" +
        encodeURIComponent(window.location.href);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsAuthOpen(false);
  };

  const isRTL = lang === "ur";

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "1.5rem",
          [isRTL ? "left" : "right"]: "1.5rem",
          zIndex: 10000,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: isRTL ? "flex-start" : "flex-end",
          }}
        >
          <button
            onClick={() => (user ? setIsAuthOpen(!isAuthOpen) : handleSignIn())}
            style={{
              width: "48px",
              height: "48px",
              background: "var(--glass-bg, rgba(250, 249, 246, 0.9))",
              backdropFilter: "blur(18px)",
              border: user ? "1px solid #D97757" : "1px solid var(--border)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 8px 24px -4px rgba(217,119,87,0.18)",
              transition: "all 0.2s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              if (!user)
                e.currentTarget.style.borderColor = "rgba(217,119,87,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              if (!user) e.currentTarget.style.borderColor = "var(--border)";
            }}
            title={
              user
                ? user.email
                : lang === "ur"
                  ? "سائن ان کریں"
                  : lang === "ro"
                    ? "Sign in karen"
                    : "Initialize Uplink"
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: "20px",
                height: "20px",
                color: user ? "#D97757" : "var(--text-secondary)",
              }}
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {user && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#10b981",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
            )}
          </button>

          {isAuthOpen && user && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                [isRTL ? "left" : "right"]: 0,
                width: "240px",
                background: "rgba(250, 249, 246, 0.98)",
                backdropFilter: "blur(24px)",
                border: "1px solid #E5E0D8",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 24px 48px -12px rgba(0,0,0,0.15)",
                zIndex: 10001,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "#D97757",
                  letterSpacing: "0.2em",
                  marginBottom: "12px",
                }}
              >
                UNIFIED SCHOLAR
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "13px",
                  color: "#2d2926",
                  wordBreak: "break-all",
                }}
              >
                {user.email}
              </div>
              <div
                style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}
              >
                ● Node Authenticated
              </div>
              <button
                onClick={handleSignOut}
                style={{
                  marginTop: "16px",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  background: "#fee2e2",
                  border: "1px solid #fecaca",
                  color: "#dc2626",
                  fontSize: "11px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={clsx("ecosystem-nav-container", isRTL && "rtl-nav")}>
        <div className={clsx("ecosystem-panel", active && "active")}>
          <div
            className="ecosystem-panel-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            <span>
              {isRTL
                ? "ایکو سسٹم گرڈ"
                : lang === "ro"
                  ? "Ecosystem Grid"
                  : "Ecosystem Grid"}
            </span>
            <span
              style={{ fontSize: "8px", opacity: 0.6, letterSpacing: "0.2em" }}
            >
              WIRED
            </span>
          </div>
          <div
            className="ecosystem-panel-items"
            style={{ direction: isRTL ? "rtl" : "ltr" }}
          >
            {ECOSYSTEM_APPS.map((app) => (
              <a
                key={app.id}
                href={app.url}
                className="ecosystem-item"
                style={{ gap: "1rem", padding: "12px" }}
              >
                <div
                  className="ecosystem-item-icon"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={app.image}
                    alt={app.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  className="ecosystem-item-label"
                  style={{ flex: 1, textAlign: isRTL ? "right" : "left" }}
                >
                  <span
                    className="ecosystem-item-name"
                    style={{ fontSize: "12px", fontWeight: "bold" }}
                  >
                    {app.name}
                  </span>
                  <span
                    className="ecosystem-item-id"
                    style={{ fontSize: "9px", fontStyle: "italic" }}
                  >
                    {app.id.toUpperCase()}{" "}
                    {isRTL ? "پروڈکشن نوڈ" : "Production Node"}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <button
          className={clsx("ecosystem-nav-trigger", active && "active")}
          onClick={() => setActive(!active)}
          aria-label="Toggle Ecosystem Hub"
          style={{ width: "56px", height: "56px" }}
        >
          <div className="ecosystem-nav-pulse" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        </button>
      </div>
    </>
  );
}
