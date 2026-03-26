// e:/panaversity/hackathon-0/frontend/app/layout.tsx

import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = Roboto_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hassaan-panaversity-portfolio.vercel.app"),
  title: "Muhammad Hassaan Aslam | AI Agent Architect Portfolio Hub",
  description: "Senior AI Agent Architect specializing in Digital FTEs, robotics, and cloud-native AI systems. Exploring the future of GenAI through the Panaversity Fellowship.",
  keywords: ["AI Agent", "Architect", "Panaversity", "Hackathon", "Digital FTE", "Next.js", "Robotics", "Hassaan Aslam"],
  openGraph: {
    title: "Muhammad Hassaan Aslam | Portfolio Hub",
    description: "Welcome to my Panaversity Hackathon Portfolio Hub. Exploration of GenAI-native systems and architecture.",
    url: "https://hassaan-panaversity-portfolio.vercel.app",
    siteName: "Muhammad Hassaan Aslam Portfolio Hub",
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className={`${inter.variable} font-sans antialiased text-[var(--text-primary)] bg-[var(--bg-base)] min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="relative flex flex-col pt-16 selection:bg-cyan-400 selection:text-black">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
