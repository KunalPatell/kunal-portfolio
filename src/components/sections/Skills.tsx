"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="container-px relative z-10">
        <SectionHeading
          eyebrow="Technical Proficiency"
          title={<>The toolkit behind the work</>}
          description="Hover over any skill to reveal experience length & number of production projects built."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              data-blur-in
              style={{ transitionDelay: `${i * 100}ms` }}
              className="glass-card flex flex-col justify-between p-6 hover:border-[#9ed8ff]/40 transition-all duration-500 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#9ed8ff] drop-shadow-[0_0_8px_rgba(158,216,255,0.2)]">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[10px] text-white/40 uppercase">
                    {group.skills.length} Stack Items
                  </span>
                </div>

                <div className="space-y-3.5">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="group/item relative">
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-white/80 group-hover/item:text-[#9ed8ff] transition-colors duration-200">
                          {skill.name}
                        </span>
                        <span className="text-[#cfae6e] font-semibold text-[11px]">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Animated Progress Meter */}
                      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#cfae6e] via-[#9ed8ff] to-[#38bdf8] shadow-[0_0_10px_rgba(158,216,255,0.5)]"
                        />
                      </div>

                      {/* Hover Tooltip Details */}
                      <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-white/40 opacity-70 group-hover/item:opacity-100 transition-opacity">
                        <span>Exp: {skill.experience}</span>
                        <span>Built: {skill.projectsBuilt}+ Projects</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


