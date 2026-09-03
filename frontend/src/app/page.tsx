import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Resume } from "@/components/sections/Resume";
import { Skills } from "@/components/sections/Skills";
import { WhatICanBuild } from "@/components/sections/WhatICanBuild";
import { Experience } from "@/components/sections/Experience";
import { VentureStudio } from "@/components/sections/VentureStudio";
import { Projects } from "@/components/sections/Projects";
import { VisionSandbox } from "@/components/sections/VisionSandbox";
import { AtsMatcher } from "@/components/sections/AtsMatcher";
import { AIAssistant } from "@/components/sections/AIAssistant";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

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
      <Footer />
    </>
  );
}
