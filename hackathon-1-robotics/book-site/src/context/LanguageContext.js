// src/context/LanguageContext.js
// HASSAAN AI ARCHITECT — Language System v3.0
// Strict 3-language implementation: English / Urdu / Roman Urdu
// Roman Urdu uses natural human-style transliteration (not machine-style)

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const languages = {
  en: {
    name: "English",
    short: "EN",
    dir: "ltr",
    chat: {
      title: "AI Robotics Guide",
      subtitle: "Knowledge Base v2.4",
      placeholder: "Ask me anything about robotics...",
      send: "Send",
      thinking: "Thinking...",
      greeting:
        "Hello! I am your Physical AI guide. How can I help you explore robotics today?",
      authRequired: "Please sign in to continue.",
      close: "Close",
    },
    snow: {
      enable: "Let it Snow",
      disable: "Stop Snow",
    },
    ui: {
      modules: "Modules",
      chapters: "Chapters",
      startReading: "Start Reading",
      backToTop: "Back to Top",
      language: "Language",
      theme: "Theme",
      companion: "AI Companion",
      openChat: "Open Chat",
    },
    notebook: {
      title: "Study Notebook",
      placeholder: "Jot down your notes here...",
      save: "Save",
      clear: "Clear",
      saved: "Saved!",
      chars: "characters",
      clearConfirm: "Clear all notes?",
    },
    home: {
      badge: "Physical AI — A Comprehensive Curriculum",
      title_p1: "Robotics that feels",
      title_p2: "beautifully human.",
      subtitle: "Bridging the gap between pure digital intelligence and the physical world. A modern textbook designed for the next generation of engineers.",
      btn_companion: "Meet Companion FTE",
      philosophy_title: "The Core Philosophy",
      philosophy_desc: "Physical AI is not just about making robots move. It's about designing a unified brain and body that adapts to our world.",
      curriculum_title: "Modern Curriculum",
      curriculum_desc: "A five-module journey through the state of the art in humanoid robotics and physical intelligence.",
      learn_more: "Learn More",
      features: [
        {
          title: "Tactile Dexterity",
          desc: "Understand how machines interact with their environment. From fine motor control to large-scale locomotion."
        },
        {
          title: "Shared Intelligence",
          desc: "The intersection of human empathy and mechanical precision. Designing systems that cooperate naturally."
        },
        {
          title: "Adaptive Perception",
          desc: "Sensory systems that process more than just data. Building machines that truly see the context around them."
        }
      ],
      modules: {
        m1: { title: "Foundations", desc: "Defining the bridge between software and silicon. The first steps into embodiment." },
        m2: { title: "Hardware Control", desc: "The mathematics of movement. Kinematics, dynamics, and real-time control loops." },
        m3: { title: "The ROS 2 Stack", desc: "Architecting the operating system of the future. Node communication and sensory integration." },
        m4: { title: "Human Interaction", desc: "Building intuitive interfaces. How humans and machines communicate in physical spaces." },
        m5: { title: "Future Horizons", desc: "Exploring the next decade of robotics research from the world's leading laboratories." }
      }
    },
  },

  ur: {
    name: "اردو",
    short: "UR",
    dir: "rtl",
    chat: {
      title: "روبوٹکس گائیڈ",
      subtitle: "نالج بیس v2.4",
      placeholder: "روبوٹکس کے بارے میں کچھ بھی پوچھیں...",
      send: "بھیجیں",
      thinking: "سوچ رہا ہوں...",
      greeting:
        "السلام علیکم! میں آپ کا فزیکل اے آئی گائیڈ ہوں۔ آج روبوٹکس میں کیا جاننا چاہتے ہیں؟",
      authRequired: "آگے بڑھنے کے لیے سائن ان کریں۔",
      close: "بند کریں",
    },
    snow: {
      enable: "برف گرائیں",
      disable: "برف روکیں",
    },
    ui: {
      modules: "ماڈیولز",
      chapters: "ابواب",
      startReading: "پڑھنا شروع کریں",
      backToTop: "اوپر جائیں",
      language: "زبان",
      theme: "تھیم",
      companion: "AI ساتھی",
      openChat: "چیٹ کھولیں",
    },
    notebook: {
      title: "مطالعہ نوٹ بک",
      placeholder: "یہاں اپنے نوٹس لکھیں...",
      save: "محفوظ کریں",
      clear: "صاف کریں",
      saved: "محفوظ ہو گیا!",
      chars: "حروف",
      clearConfirm: "کیا آپ تمام نوٹس صاف کرنا چاہتے ہیں؟",
    },
    home: {
      badge: "فزیکل اے آئی — ایک جامع نصاب",
      title_p1: "روبوٹکس جو محسوس ہو",
      title_p2: "خوبصورتی سے انسانی۔",
      subtitle: "خالص ڈیجیٹل ذہانت اور مادی دنیا کے درمیان فرق کو ختم کرنا۔ انجینئرز کی اگلی نسل کے لیے ڈیزائن کی گئی ایک جدید نصابی کتاب۔",
      btn_companion: "اے آئی ساتھی سے ملیں",
      philosophy_title: "بنیادی فلسفہ",
      philosophy_desc: "فزیکل اے آئی صرف روبوٹ کو حرکت دینے کے بارے میں نہیں ہے۔ یہ ایک متحد دماغ اور جسم کو ڈیزائن کرنے کے بارے میں ہے جو ہماری دنیا کے مطابق ڈھل سکے۔",
      curriculum_title: "جدید نصاب",
      curriculum_desc: "ہیومنائیڈ روبوٹکس اور فزیکل انٹیلیجنس میں جدید ترین ٹیکنالوجی کے ذریعے پانچ ماڈیولز کا سفر۔",
      learn_more: "مزید جانیں",
      features: [
        {
          title: "حسی مہارت",
          desc: "سمجھیں کہ مشینیں اپنے ماحول کے ساتھ کیسے تعامل کرتی ہیں۔ ٹھیک موٹر کنٹرول سے لے کر بڑے پیمانے پر نقل و حرکت تک۔"
        },
        {
          title: "مشترکہ ذہانت",
          desc: "انسانی ہمدردی اور میکانی درستگی کا ملاپ۔ ایسے سسٹم ڈیزائن کرنا جو قدرتی طور پر تعاون کریں۔"
        },
        {
          title: "انکولی ادراک",
          desc: "حسی نظام جو صرف ڈیٹا سے زیادہ پروسیس کرتے ہیں۔ ایسی مشینیں بنانا جو واقعی اپنے ارد گرد کے ماحول کو دیکھ سکیں۔"
        }
      ],
      modules: {
        m1: { title: "بنیادیں", desc: "سافٹ ویئر اور سلیکون کے درمیان پل کی تعریف۔ تجسیم کی طرف پہلا قدم۔" },
        m2: { title: "ہارڈ ویئر کنٹرول", desc: "حرکت کی ریاضی۔ حرکیات، ڈائنامکس، اور رئیل ٹائم کنٹرول لوپس۔" },
        m3: { title: "ROS 2 اسٹیک", desc: "مستقبل کے آپریٹنگ سسٹم کی فن تعمیر۔ نوڈ کمیونیکیشن اور حسی انضمام۔" },
        m4: { title: "انسانی تعامل", desc: "بدیہی انٹرفیس بنانا۔ انسان اور مشینیں مادی جگہوں میں کیسے بات چیت کرتے ہیں۔" },
        m5: { title: "مستقبل کے افق", desc: "دنیا کی معروف لیبارٹریوں سے روبوٹکس ریسرچ کی اگلی دہائی کی تلاش۔" }
      }
    },
  },

  ro: {
    name: "Roman Urdu",
    short: "RO",
    dir: "ltr",
    chat: {
      title: "Robotics Guide",
      subtitle: "Knowledge Base v2.4",
      placeholder: "Kuch bhi poochein robotics ke baare mein...",
      send: "Bhejen",
      thinking: "Soch raha hun...",
      greeting:
        "Assalam o Alaikum! Main aapka Physical AI guide hun. Aaj robotics mein kya seekhna chahte hain?",
      authRequired: "Aage badhne ke liye sign in karein.",
      close: "Band Karen",
    },
    snow: {
      enable: "Baraf Girain",
      disable: "Baraf Roken",
    },
    ui: {
      modules: "Modules",
      chapters: "Abwaab",
      startReading: "Parhna Shuru Karen",
      backToTop: "Upar Jayen",
      language: "Zubaan",
      theme: "Theme",
      companion: "AI Saathi",
      openChat: "Chat Kholen",
    },
    notebook: {
      title: "Study Notebook",
      placeholder: "Yahan apne notes likhein...",
      save: "Save Karen",
      clear: "Saaf Karen",
      saved: "Save ho gaya!",
      chars: "huroof",
      clearConfirm: "Saare notes saaf kar dein?",
    },
    home: {
      badge: "Physical AI — Ek Jame Curriculum",
      title_p1: "Robotics jo mehsoos ho",
      title_p2: "beautifully human.",
      subtitle: "Pure digital intelligence aur physical world ke darmiyan farq ko khatam karna. Engineers ki agli nasl ke liye design ki gayi ek modern textbook.",
      btn_companion: "Companion FTE se milein",
      philosophy_title: "Core Philosophy",
      philosophy_desc: "Physical AI sirf robots ko move karne ke baare mein nahi hai. Yeh ek unified brain aur body design karne ke baare mein hai.",
      curriculum_title: "Modern Curriculum",
      curriculum_desc: "Humanoid robotics aur physical intelligence mein state-of-the-art technology ke zariye 5 modules ka safar.",
      learn_more: "Mazeed Janien",
      features: [
        {
          title: "Tactile Dexterity",
          desc: "Samjhien ke machines apne environment ke sath kaise react karti hain. Fine motor control se locomotion tak."
        },
        {
          title: "Shared Intelligence",
          desc: "Human empathy aur mechanical precision ka milap. Aise systems jo naturally cooperate karein."
        },
        {
          title: "Adaptive Perception",
          desc: "Sensory systems jo sirf data nahi, context process karein. Machines jo apne mahol ko dekh sakein."
        }
      ],
      modules: {
        m1: { title: "Foundations", desc: "Software aur silicon ke darmiyan pul ki tareef. Embodiment ki taraf pehla qadam." },
        m2: { title: "Hardware Control", desc: "Movement ki maths. Kinematics, dynamics, aur real-time control loops." },
        m3: { title: "The ROS 2 Stack", desc: "Future operating system ki architecture. Node communication aur sensory integration." },
        m4: { title: "Human Interaction", desc: "Intuitive interfaces banana. Humans aur machines ki physical spaces mein baat-cheet." },
        m5: { title: "Future Horizons", desc: "Duniya ki barri labs se robotics research ki agli dehai ki talash." }
      }
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app_lang");
      if (saved && languages[saved]) {
        setLang(saved);
        applyLangAttributes(saved);
      } else {
        applyLangAttributes("en");
      }
    }
  }, []);

  const applyLangAttributes = (l) => {
    if (typeof document !== "undefined") {
      const langConfig = languages[l];
      document.documentElement.dir = langConfig?.dir || "ltr";
      document.documentElement.lang = l;

      // Apply RTL body class for Urdu font rendering
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

  const changeLanguage = (newLang) => {
    if (languages[newLang]) {
      setLang(newLang);
      applyLangAttributes(newLang);
      localStorage.setItem("app_lang", newLang);
      // Dispatch event so all components can react
      window.dispatchEvent(new CustomEvent("lang-change", { detail: { lang: newLang } }));
    }
  };

  const t = languages[lang];

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
