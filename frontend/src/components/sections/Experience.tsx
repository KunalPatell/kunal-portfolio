"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import { experiences } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section bg-[#050505] border-t border-white/5 relative">
      <div className="container-px relative z-10">
        <SectionHeading
          eyebrow="Career History"
          title={<>Where I&apos;ve applied AI</>}
          description="Hands-on roles building AI models, automation workflows, and production software."
        />

        <div className="relative ml-4 md:ml-8 border-l border-white/10 pl-6 md:pl-10 space-y-10">
          {/* Vertical glowing timeline bar */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-[#cfae6e] via-[#9ed8ff] to-[#38bdf8] shadow-[0_0_12px_rgba(158,216,255,0.6)]"
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              {/* Glowing timeline icon node */}
              <span className="absolute -left-[35px] md:-left-[51px] top-1.5 grid h-7 w-7 md:h-8 md:w-8 place-items-center rounded-full border border-[#9ed8ff]/50 bg-[#080a0f] text-[#9ed8ff] shadow-[0_0_12px_rgba(158,216,255,0.5)] transition-all duration-300 hover:scale-110 hover:border-[#9ed8ff]">
                <Briefcase className="h-3.5 w-3.5" />
              </span>

              {/* Experience Details Card */}
              <div className="glass-card p-6 hover:border-[#9ed8ff]/40 transition-all duration-300 group">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="font-mono text-base font-bold uppercase tracking-wider text-white group-hover:text-[#9ed8ff] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs font-mono text-[#cfae6e]">
                      <Building2 className="h-3.5 w-3.5 text-[#cfae6e]/70" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-lg border border-[#9ed8ff]/15 bg-[#9ed8ff]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#9ed8ff]/90 transition-all duration-300 hover:bg-[#9ed8ff]/10 hover:border-[#9ed8ff]/30 hover:text-white"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


