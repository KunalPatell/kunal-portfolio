"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <a href="#home" className="group flex items-center gap-2 font-mono text-sm font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#9ed8ff]/30 bg-[#9ed8ff]/15 text-[#9ed8ff] font-mono text-xs shadow-[0_0_10px_rgba(158,216,255,0.2)]">
            KP
          </span>
          <span className="hidden text-white/90 sm:block">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/70 transition-all duration-300 hover:bg-[#9ed8ff]/5 hover:text-[#9ed8ff]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#ask-ai"
            className="rounded-xl border border-[#9ed8ff]/30 bg-[#9ed8ff]/5 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-[#9ed8ff] hover:bg-[#9ed8ff]/10 hover:border-[#9ed8ff]/50 transition-all duration-300 shadow-[0_0_10px_rgba(158,216,255,0.15)] flex items-center gap-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#9ed8ff] drop-shadow-[0_0_4px_rgba(158,216,255,0.4)] animate-pulse" />
            Ask Kunal AI
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
    </header>
  );
}
