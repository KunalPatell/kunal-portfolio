"use client";

import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { profile, resumeAction } from "@/lib/data";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CyberButton } from "@/components/CyberButton";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Magnetic } from "@/components/Magnetic";
import { TextScramble } from "@/components/TextScramble";
import { Typewriter } from "@/components/Typewriter";

export function Hero() {
  const resume = resumeAction();
  const roles = [
    "Data Scientist",
    "AI/ML Engineer",
    "Computer Vision & Face AI",
    "LLM, RAG & Agentic AI",
    "n8n & Python Automation"
  ];

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-16 bg-[#050505]">
      <AnimatedBackground />
      <div className="container-px relative z-10">
        <div className="max-w-4xl">
          {/* Live Availability Badge */}
          <div data-blur-in="subtle" className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>Available for AI/ML Roles &amp; Freelance Projects</span>
          </div>

          <br />

          <span data-blur-in="subtle" className="eyebrow">
            <Sparkles className="h-3.5 w-3.5 text-[#9ed8ff]" />
            AI Engineer &amp; Automation Specialist
          </span>

          <h1
            data-blur-in="strong"
            className="font-display mt-6 text-4xl font-bold leading-none tracking-widest sm:text-6xl md:text-7xl text-white uppercase"
          >
            <TextScramble text={profile.name} />
          </h1>

          <p
            data-blur-in
            className="mt-6 flex items-center gap-2 font-mono text-sm tracking-widest text-[#9ed8ff] uppercase"
          >
            <span className="text-[#cfae6e]">{"//"}</span>
            <Typewriter words={roles} />
          </p>

          <p
            data-blur-in="subtle"
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted"
          >
            {profile.subtitle}
          </p>

          <div data-blur-in className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <CyberButton href="#projects" icon={ArrowRight}>
                Projects
              </CyberButton>
            </Magnetic>
            <Magnetic>
              <CyberButton
                href={resume.href}
                external={resume.external}
                icon={Download}
              >
                {resume.label}
              </CyberButton>
            </Magnetic>
            <Magnetic>
              <CyberButton href="#contact" icon={Mail}>
                Contact
              </CyberButton>
            </Magnetic>
          </div>

          <div
            data-blur-in="strong"
            className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/5 pt-8"
          >
            {([
              { count: 13, suffix: "+", v: "AI Projects" },
              { count: 4, suffix: "", v: "Internships" },
              { label: "MSc", v: "AI & ML" },
            ] as { count?: number; suffix?: string; label?: string; v: string }[]).map((s) => (
              <div key={s.v} className="group">
                <div className="font-display text-xl font-bold text-[#cfae6e] group-hover:text-[#9ed8ff] transition-colors duration-300">
                  {s.count !== undefined ? (
                    <AnimatedCounter value={s.count} suffix={s.suffix} />
                  ) : (
                    s.label
                  )}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted font-mono">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hidden md:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/10 p-1">
          <div className="h-2 w-1 rounded-full bg-[#9ed8ff] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
