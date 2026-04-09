"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext<any>(null);

export const languages = {
  en: {
    name: "English",
    short: "EN",
    dir: "ltr",
    ui: {
      network: "Member Area",
      uplink: "Connect Identity",
      architect: "Verified Member",
      terminate: "Sign Out",
      ecosystem: "Project Hub",
      status: "Status: Online",
      production: "Active",
      language: "Language",
      snow: "Snow Mode",
      companion: "AI Assistant",
      notebook: "Notes",
    },
    auth: {
      greeting: "Welcome to my portfolio. Please sign in to explore all projects and features.",
    },
  },
  ur: {
    name: "اردو",
    short: "UR",
    dir: "rtl",
    ui: {
      network: "ممبر ایریا",
      uplink: "شناخت جوڑیں",
      architect: "تصدیق شدہ ممبر",
      terminate: "سائن آؤٹ",
      ecosystem: "پروجیکٹ حب",
      status: "اسٹیٹس: آن لائن",
      production: "فعال",
      language: "زبان",
      snow: "برفانی موڈ",
      companion: "اے آئی اسسٹنٹ",
      notebook: "نوٹس",
    },
    auth: {
      greeting: "میرے پورٹ فولیو میں خوش آمدید۔ تمام پروجیکٹس دیکھنے کے لیے لاگ ان کریں۔",
    },
  },
  ro: {
    name: "Roman Urdu",
    short: "RO",
    dir: "ltr",
    ui: {
      network: "Member Area",
      uplink: "Identity Connect",
      architect: "Verified Member",
      terminate: "Sign Out",
      ecosystem: "Project Hub",
      status: "Status: Online",
      production: "Active",
      language: "Zubaan",
      snow: "Snow Mode",
      companion: "AI Assistant",
      notebook: "Notes",
    },
    auth: {
      greeting: "Welcome! Mere portfolio mein khush amdeed. Saare projects dekhne ke liye please sign-in karein.",
    },
  },
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app_lang");
      if (saved && languages[saved as keyof typeof languages]) {
        setLang(saved);
        applyLangAttributes(saved);
      } else {
        applyLangAttributes("en");
      }
    }
  }, []);

  const applyLangAttributes = (l: string) => {
    if (typeof document !== "undefined") {
      const langConfig = languages[l as keyof typeof languages];
      document.documentElement.dir = langConfig?.dir || "ltr";
      document.documentElement.lang = l;
      
      if (l === "ur") {
        document.body.classList.add("lang-ur");
        document.body.classList.remove("lang-ro", "lang-en");
      } else if (l === "ro") {
        document.body.classList.add("lang-ro");
        document.body.classList.remove("lang-ur", "lang-en");
      } else {
        document.body.classList.add("lang-en");
        document.body.classList.remove("lang-ur", "lang-ro");
      }
    }
  };

  const changeLanguage = (newLang: string) => {
    if (languages[newLang as keyof typeof languages]) {
      setLang(newLang);
      applyLangAttributes(newLang);
      localStorage.setItem("app_lang", newLang);
      window.dispatchEvent(new CustomEvent("lang-change", { detail: { lang: newLang } }));
    }
  };

  const t = languages[lang as keyof typeof languages];

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
