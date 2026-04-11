import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google"; // CHANGED: Added Lora
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // CHANGED: Standardized variable name
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora", // CHANGED: Added Lora font
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "HASSAAN AI ARCHITECT",
  description: "A world-class editorial task manager for the modern scholar.",
  icons: { icon: "/favicon.ico" },
};

import { ActionDock } from "@/components/ActionDock";
import { SnowOverlay } from "@/components/SnowOverlay";
import { LanguageProvider } from "@/context/LanguageContext";
import { EcosystemNav } from "@/components/EcosystemNav";
import { AiraAssistant } from "@/components/AiraAssistant";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LanguageProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
        <body className="font-inter antialiased bg-bg-base text-text-primary min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ActionDock />
            <SnowOverlay />
            <EcosystemNav />
            <AiraAssistant 
              platform="H2" 
              context="Your task stack is optimized. Syncing with the global learning protocol." 
            />
            <Toaster 
              richColors 
              position="top-right" 
              closeButton 
              toastOptions={{
                className: 'border-fine shadow-card font-inter text-[13px]',
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}


