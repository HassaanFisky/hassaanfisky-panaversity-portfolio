"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext<any>(null);

export const languages = {
  en: {
    name: "English",
    short: "EN",
    dir: "ltr",
    ui: {
      network: "Network Identity",
      uplink: "Initialize Uplink",
      architect: "Verified Architect Node",
      terminate: "Terminate Session",
      ecosystem: "Ecosystem Grid",
      status: "Status: WIRED",
      production: "Production Node",
      language: "Language",
      snow: "Let it Snow",
      companion: "AI Companion",
      notebook: "Study Notebook",
    },
    auth: {
      greeting: "Global ecosystem verification is required. Connect your identity to access full functionality.",
    },
  },
  ur: {
    name: "اردو",
    short: "UR",
    dir: "rtl",
    ui: {
      network: "نیٹ ورک شناخت",
      uplink: "اپ لنک شروع کریں",
      architect: "تصدیق شدہ آرکیٹیکٹ نوڈ",
      terminate: "سیشن ختم کریں",
      ecosystem: "ایکو سسٹم گرڈ",
      status: "اسٹیٹس: وائرڈ",
      production: "پروڈکشن نوڈ",
      language: "زبان",
      snow: "برف گرائیں",
      companion: "اے آئی ساتھی",
      notebook: "مطالعہ نوٹ بک",
    },
    auth: {
      greeting: "عالمی ایکو سسٹم کی تصدیق درکار ہے۔ مکمل فنکشنلٹی تک رسائی کے لیے اپنی شناخت سے جڑیں۔",
    },
  },
  ro: {
    name: "Roman Urdu",
    short: "RO",
    dir: "ltr",
    ui: {
      network: "Network Identity",
      uplink: "Initialize Uplink",
      architect: "Verified Architect Node",
      terminate: "Terminate Session",
      ecosystem: "Ecosystem Grid",
      status: "Status: WIRED",
      production: "Production Node",
      language: "Zubaan",
      snow: "Baraf Girain",
      companion: "AI Saathi",
      notebook: "Study Notebook",
    },
    auth: {
      greeting: "Global ecosystem verification zaruri hai. Full functionality ke liye apni identity connect karein.",
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
