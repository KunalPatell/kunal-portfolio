import { Navbar, Footer, FloatingDock } from "@/components/layout";
import { Marquee } from "@/components/ui";
import {
  Hero,
  About,
  Resume,
  Skills,
  WhatICanBuild,
  Experience,
  VentureStudio,
  Projects,
  VisionSandbox,
  AtsMatcher,
  AIAssistant,
  Certifications,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <VentureStudio />
        <Projects />
        <VisionSandbox />
        <AtsMatcher />
        <Skills />
        <WhatICanBuild />
        <AIAssistant />
        <Resume />
        <Certifications />
        <Contact />
      </main>
      <FloatingDock />
      <Footer />
    </>
  );
}
