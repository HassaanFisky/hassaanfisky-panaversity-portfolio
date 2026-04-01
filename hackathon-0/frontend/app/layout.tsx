import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  metadataBase: new URL("https://hassaan-panaversity-portfolio.vercel.app"),
  title: "Muhammad Hassaan Aslam | High-Fidelity AI Architect",
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
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-inter antialiased bg-bg-base text-text-primary min-h-screen">
          <Navbar />
          <main className="relative flex flex-col pt-16">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}

