import { skillGroups } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section bg-[#050505] border-t border-white/5">
      <div className="container-px">
        <SectionHeading
          eyebrow="Skills"
          title={<>The toolkit behind the work</>}
          description="A blend of AI/ML depth, solid engineering, and automation know-how."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              data-blur-in
              style={{ transitionDelay: `${i * 100}ms` }}
              className="glass-card h-full p-6 hover:border-[#9ed8ff]/30 transition-all duration-300"
            >
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-[#9ed8ff] drop-shadow-[0_0_8px_rgba(158,216,255,0.2)]">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-white/70 transition-all duration-300 hover:border-[#9ed8ff]/40 hover:bg-[#9ed8ff]/5 hover:text-white"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

