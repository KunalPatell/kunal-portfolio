"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Terminal as TerminalIcon, Key } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { TerminalModal } from "@/components/TerminalModal";
import { APIKeyManager } from "@/components/APIKeyManager";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [byokOpen, setByokOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl"
            : "border-b border-transparent"
        )}
      >
        <nav className="container-px flex h-16 items-center justify-between gap-4">
          <a href="#home" className="group flex items-center gap-2.5 font-mono text-sm font-bold shrink-0">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#9ed8ff]/30 bg-[#9ed8ff]/15 text-[#9ed8ff] font-mono text-xs shadow-[0_0_10px_rgba(158,216,255,0.2)]">
              KP
            </span>
            <span className="hidden text-white/90 sm:block">
              {profile.name}
            </span>
          </a>

          {/* Floating Minimalist Center Navigation */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-white/70 transition-all duration-300 hover:bg-[#9ed8ff]/10 hover:text-[#9ed8ff]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Compact Sleek Action Controls */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => setByokOpen(true)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-300"
              title="Add personal API keys (Groq, Gemini, OpenAI) for free unlimited access"
            >
              <Key className="h-3.5 w-3.5 text-violet-400" />
            </button>

            <button
              onClick={() => setTerminalOpen(true)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
              title="Open Developer Terminal CLI"
            >
              <TerminalIcon className="h-3.5 w-3.5" />
            </button>

            <a
              href="#ask-ai"
              className="rounded-lg border border-[#9ed8ff]/30 bg-[#9ed8ff]/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[#9ed8ff] hover:bg-[#9ed8ff]/20 hover:border-[#9ed8ff]/50 transition-all duration-300 shadow-[0_0_10px_rgba(158,216,255,0.15)] flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#9ed8ff] drop-shadow-[0_0_4px_rgba(158,216,255,0.4)] animate-pulse" />
              Ask AI
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl md:hidden"
            >
              <ul className="container-px flex flex-col py-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 font-mono text-xs uppercase tracking-wider text-white/80 hover:bg-[#9ed8ff]/5 hover:text-[#9ed8ff]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
        <APIKeyManager isOpen={byokOpen} onClose={() => setByokOpen(false)} />
      </header>
    </>
  );
}
