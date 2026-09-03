"use client";

import { useState } from "react";
import {
  ArrowRight,
  Download,
  Mail,
  Sparkles,
  Command,
  Copy,
  Check,
  Cpu,
  Bot,
  Terminal as TerminalIcon,
  Layers,
} from "lucide-react";
import { profile, resumeAction } from "@/lib/data";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CyberButton } from "@/components/CyberButton";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Magnetic } from "@/components/Magnetic";
import { TextScramble } from "@/components/TextScramble";
import { Typewriter } from "@/components/Typewriter";
import { sound } from "@/lib/sound";

export function Hero() {
  const resume = resumeAction();
  const [copied, setCopied] = useState(false);

  const roles = [
    "AI & Multi-Agent Engineer",
    "FastAPI & LLM Backend Architect",
    "YOLOv8 & Computer Vision Specialist",
    "n8n & Enterprise Automation Architect",
    "Data Scientist & AI Practitioner",
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24 pb-16 bg-[#050505] overflow-hidden">
      <AnimatedBackground />

      {/* Decorative cyber grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="container-px relative z-10">
        <div className="max-w-4xl">
          {/* Live Availability & HUD Status Badges */}
          <div data-blur-in="subtle" className="mb-5 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-400 backdrop-blur-md shadow-[0_0_15px_rgba(52,211,153,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Open to AI Engineering Roles &amp; High-Impact Projects</span>
            </div>

            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
                window.dispatchEvent(event);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-white/60 hover:text-white hover:border-[#9ed8ff]/40 transition-all"
            >
              <Command className="h-3 w-3 text-[#9ed8ff]" />
              <span>Press <kbd className="text-[#9ed8ff]">Ctrl+K</kbd> for Command Center</span>
            </button>
          </div>

          <span data-blur-in="subtle" className="eyebrow">
            <Sparkles className="h-3.5 w-3.5 text-[#9ed8ff]" />
            AI Engineer &amp; Automation Architect
          </span>

          <h1
            data-blur-in="strong"
            className="font-display mt-5 text-4xl font-bold leading-none tracking-widest sm:text-6xl md:text-7xl text-white uppercase"
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
            className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-muted font-normal"
          >
            {profile.subtitle}
          </p>

          {/* Quick Copy Contact Snippet */}
          <div data-blur-in="subtle" className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white/80">
              <span className="text-[#9ed8ff]">email:</span>
              <span>{profile.email}</span>
              <button
                onClick={handleCopyEmail}
                className="ml-1 p-1 hover:text-[#9ed8ff] transition-colors"
                title="Copy email address"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white/80">
              <span className="text-[#cfae6e]">location:</span>
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div data-blur-in className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <CyberButton href="#ventures" icon={Layers}>
                Explore Ventures
              </CyberButton>
            </Magnetic>
            <Magnetic>
              <CyberButton href="#projects" icon={ArrowRight}>
                View Projects
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
              <CyberButton href="#ats-matcher" icon={Sparkles}>
                ATS Matcher
              </CyberButton>
            </Magnetic>
          </div>

          {/* Social Links Bar */}
          <div data-blur-in="subtle" className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs text-white/70">
            <span className="text-muted uppercase text-[10px] tracking-widest mr-2">// CONNECT:</span>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 transition-all hover:border-[#9ed8ff]/50 hover:bg-[#9ed8ff]/10 hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:animate-ping" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 transition-all hover:border-[#9ed8ff]/50 hover:bg-[#9ed8ff]/10 hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 group-hover:animate-ping" />
              <span>LinkedIn</span>
            </a>
            <a
              href={profile.socials.huggingface}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 transition-all hover:border-[#9ed8ff]/50 hover:bg-[#9ed8ff]/10 hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 group-hover:animate-ping" />
              <span>HuggingFace</span>
            </a>
          </div>

          {/* High-Impact Numerical Stats Grid */}
          <div
            data-blur-in="strong"
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5 pt-8"
          >
            {profile.metrics.slice(0, 4).map((s) => (
              <div key={s.label} className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-[#9ed8ff]/30">
                <div className="font-display text-2xl font-bold text-[#cfae6e] group-hover:text-[#9ed8ff] transition-colors duration-300">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] font-semibold text-white/90 font-mono">
                  {s.label}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-muted font-mono mt-0.5">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted hidden md:block">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/10 p-1">
          <div className="h-1.5 w-1 rounded-full bg-[#9ed8ff] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
