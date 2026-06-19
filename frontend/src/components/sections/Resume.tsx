"use client";

import { Download, FileText, GraduationCap, Award } from "lucide-react";
import { resume, resumeAction } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { CyberButton } from "@/components/CyberButton";

const sectionIcon: Record<string, typeof FileText> = {
  Education: GraduationCap,
  Experience: FileText,
  Certifications: Award,
};

export function Resume() {
  const action = resumeAction();

  return (
    <section id="resume" className="section bg-[#050505] border-t border-white/5">
      <div className="container-px">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Resume"
            title={<>A snapshot of the journey</>}
            description="ATS-friendly summary of education, internships, certifications, and practical AI work."
          />
          <div data-blur-in="subtle" className="mb-14">
            <CyberButton
              href={action.href}
              external={action.external}
              icon={Download}
            >
              {action.label}
            </CyberButton>
          </div>
        </div>

        {!action.external ? (
          <div data-blur-in className="-mt-8 mb-8 text-xs font-mono text-muted">
            {action.note}
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-3">
          {resume.map((sec, i) => {
            const Icon = sectionIcon[sec.title] ?? FileText;
            return (
              <div
                key={sec.title}
                data-blur-in
                style={{ transitionDelay: `${i * 100}ms` }}
                className="glass-card h-full p-6 hover:border-[#9ed8ff]/30 transition-all duration-300"
              >
                <div className="mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                  <Icon className="h-5 w-5 text-[#9ed8ff] drop-shadow-[0_0_8px_rgba(158,216,255,0.3)]" />
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-white">
                    {sec.title}
                  </h3>
                </div>
                <ul className="space-y-6">
                  {sec.items.map((item, j) => (
                    <li key={j} className="group/item">
                      <p className="text-xs font-mono uppercase tracking-wider text-white group-hover/item:text-[#9ed8ff] transition-colors duration-300">
                        {item.primary}
                      </p>
                      {item.secondary ? (
                        <p className="mt-1 text-xs text-[#cfae6e] font-mono">{item.secondary}</p>
                      ) : null}
                      {item.meta ? (
                        <p className="mt-1 text-[11px] text-white/40 font-mono uppercase tracking-widest">{item.meta}</p>
                      ) : null}
                      {item.points ? (
                        <ul className="mt-3 list-inside list-disc space-y-1.5 text-xs text-white/60">
                          {item.points.map((pt) => (
                            <li key={pt} className="leading-relaxed pl-1 marker:text-[#9ed8ff]/70">
                              <span className="-ml-1">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

