import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { EcosystemNav } from "@/components/EcosystemNav";

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
  title: "HASSAAN AI ARCHITECT",
  description: "AI-powered Python learning with real-time feedback and adaptive exercises.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      <body className="font-inter antialiased bg-bg-base text-text-primary min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          {children}
          <EcosystemNav />
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            theme="light"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}