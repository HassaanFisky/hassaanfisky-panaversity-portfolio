export type Translation = typeof en;

export const en = {
  name: "English",
  short: "EN",
  dir: "ltr",
  ui: {
    network: "Member Area",
    uplink: "Sign In",
    architect: "Verified Member",
    terminate: "Sign Out",
    ecosystem: "Project Hub",
    status: "Status: Online",
    production: "Live",
    language: "Language",
    snow: "Weather Mode",
    companion: "AI Assistant",
    notebook: "Notes",
  },
  auth: {
    greeting: "Welcome! Sign in to access your dashboard and explore all projects.",
    signIn: "Sign in to continue",
    signInBtn: "Sign In",
    createAccount: "Create Account",
    alreadyHave: "Already have an account?",
    noAccount: "Don't have an account?",
    fullName: "Full Name",
    email: "Email Address",
    password: "Password",
  },
};

export const ur = {
  name: "اردو",
  short: "UR",
  dir: "rtl",
  ui: {
    network: "ممبر ایریا",
    uplink: "سائن ان",
    architect: "تصدیق شدہ ممبر",
    terminate: "سائن آؤٹ",
    ecosystem: "پروجیکٹ حب",
    status: "اسٹیٹس: آن لائن",
    production: "فعال",
    language: "زبان",
    snow: "موسمی موڈ",
    companion: "اے آئی اسسٹنٹ",
    notebook: "نوٹس",
  },
  auth: {
    greeting: "خوش آمدید! ڈیش بورڈ تک رسائی کے لیے سائن ان کریں۔",
    signIn: "جاری رکھنے کے لیے سائن ان کریں",
    signInBtn: "سائن ان",
    createAccount: "اکاؤنٹ بنائیں",
    alreadyHave: "پہلے سے اکاؤنٹ ہے؟",
    noAccount: "اکاؤنٹ نہیں ہے؟",
    fullName: "پورا نام",
    email: "ای میل",
    password: "پاسورڈ",
  },
};

export const ro = {
  name: "Roman Urdu",
  short: "RO",
  dir: "ltr",
  ui: {
    network: "Member Area",
    uplink: "Sign In",
    architect: "Verified Member",
    terminate: "Sign Out",
    ecosystem: "Project Hub",
    status: "Status: Online",
    production: "Live",
    language: "Zubaan",
    snow: "Mausam Mode",
    companion: "AI Assistant",
    notebook: "Notes",
  },
  auth: {
    greeting: "Khush Amdeed! Dashboard access ke liye sign in karein.",
    signIn: "Jaari rakhne ke liye sign in karein",
    signInBtn: "Sign In",
    createAccount: "Account Banayein",
    alreadyHave: "Pehle se account hai?",
    noAccount: "Account nahi hai?",
    fullName: "Poora Naam",
    email: "Email",
    password: "Password",
  },
};

export const dictionaries = {
  en,
  ur,
  ro,
};
