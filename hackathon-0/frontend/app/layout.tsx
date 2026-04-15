import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EcosystemNav } from "@/components/EcosystemNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { ActionDock } from "@/components/ActionDock";
import { WeatherOverlay } from "@/components/WeatherOverlay";
import { CompanionProvider } from "@/components/companion/CompanionContext";
import { CompanionShell } from "@/components/companion/CompanionShell";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

const lora = Lora({ 
  subsets: ["latin"], 
  variable: "--font-lora",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://panaversity-h0-portfolio.vercel.app"),
  title: "Hassaan AI Architect — Portfolio Hub",
  description: "Muhammad Hassaan Aslam — AI Architect building Digital FTEs, autonomous agents, and cloud-native AI systems through the Panaversity Fellowship.",
  keywords: ["AI Agent", "AI Architect", "Panaversity", "Hackathon", "Digital FTE", "Next.js", "Robotics", "Hassaan"],
  openGraph: {
    title: "Hassaan AI Architect — Portfolio Hub",
    description: "Five live projects exploring autonomous AI systems, robotics, and human-AI collaboration.",
    url: "https://panaversity-h0-portfolio.vercel.app",
    siteName: "Hassaan AI Architect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`} data-weather="clear">
        <body className="font-inter antialiased bg-bg-base text-text-primary min-h-screen relative">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {/*
             * CompanionProvider wraps ActionDock + CompanionShell so the
             * Framer Motion layoutId="companion-orb" FLIP morph can connect
             * the dock chat button to the companion window.
             */}
            <CompanionProvider>
              {/* Immersive Weather Environment Engine */}
              <WeatherOverlay />

              <Navbar />
              <main className="relative flex flex-col pt-16">
                {children}
              </main>

              {/* Action dock — chat button carries layoutId="companion-orb" */}
              <ActionDock isPortfolio={true} />
              <EcosystemNav />

              {/* Companion window (replaces old AiraAssistant mount) */}
              <CompanionShell
                platform="H0"
                context="Panaversity Portfolio Hub — Showcasing H0–H4 hackathon projects by Hassaan AI Architect."
                isPortfolio={true}
              />
            </CompanionProvider>

            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
