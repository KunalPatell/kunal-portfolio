"use client";

import { motion } from "framer-motion";

/**
 * Animated AI-inspired hero backdrop: drifting gradient orbs + subtle grid.
 * Pure CSS/SVG + framer-motion — no canvas, keeps it lightweight.
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      {/* glow orbs */}
      <motion.div
        className="absolute -top-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-electric/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 right-1/4 h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[120px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
