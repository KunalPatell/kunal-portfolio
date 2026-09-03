import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Michroma } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { Grain } from "@/components/Grain";
import { ScrollProgress } from "@/components/ScrollProgress";
import { EntranceAnimator } from "@/components/EntranceAnimator";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { GlowEffectInitializer } from "@/components/GlowEffectInitializer";
import { CustomCursor } from "@/components/CustomCursor";
import { StarCanvas } from "@/components/StarCanvas";
import { Preloader } from "@/components/Preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const description =
  "Portfolio of Kunal Patel - AI Engineer, Multi-Agent Architect & Automation Specialist building production multi-agent systems, computer vision models, and intelligent enterprise automation.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.socials.portfolio || "https://kunalpatel.dev"),
  title: {
    default: `${profile.name} | AI Engineer & Automation Specialist`,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: [
    "AI Engineer Portfolio",
    "Data Scientist Portfolio",
    "Machine Learning Engineer",
    "Multi-Agent AI",
    "LangGraph",
    "FastAPI",
    "Computer Vision",
    "YOLOv8",
    "n8n Automation",
    "Kunal Patel",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | AI Engineer & Automation Specialist`,
    description,
    type: "website",
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | AI Engineer`,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${michroma.variable} dark`}>
      <body>
        <SmoothScrollProvider>
          <Preloader />
          <GlowEffectInitializer />
          <CustomCursor />
          <StarCanvas />
          <EntranceAnimator />
          <ScrollProgress />
          <Grain />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
