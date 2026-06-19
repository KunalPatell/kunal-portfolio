import { Briefcase } from "lucide-react";
import { experiences } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section bg-[#050505] border-t border-white/5">
      <div className="container-px">
        <SectionHeading
          eyebrow="Experience"
          title={<>Where I&apos;ve applied AI</>}
          description="Hands-on internships building LLM agents, automation pipelines, and ML models."
        />

        <div className="relative ml-4 border-l border-white/10 pl-8 space-y-12">
          {/* Vertical timeline line with gradient glow */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#9ed8ff] via-[#cfae6e]/40 to-transparent" />

          {experiences.map((exp, i) => (
            <div
              key={exp.role + exp.company}
              data-blur-in
              style={{ transitionDelay: `${i * 100}ms` }}
              className="relative"
            >
              {/* Glowing timeline node */}
              <span className="absolute -left-[45px] top-1.5 grid h-[26px] w-[26px] place-items-center rounded-full border border-[#9ed8ff]/40 bg-[#080a0f] text-[#9ed8ff] shadow-[0_0_10px_rgba(158,216,255,0.4)] transition-all duration-300 hover:scale-110 hover:border-[#9ed8ff] hover:shadow-[0_0_15px_rgba(158,216,255,0.8)]">
                <Briefcase className="h-3 w-3" />
              </span>

              {/* Experience details card */}
              <div className="glass-card p-6 hover:border-[#9ed8ff]/30 transition-all duration-300">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-white">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-[10px] text-[#cfae6e] uppercase tracking-widest">
                    {exp.company}
                  </span>
                </div>
                
                <ul className="mt-5 flex flex-wrap gap-2">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

