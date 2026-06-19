"use client";

import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Tilt } from "@/components/Tilt";

export function Projects() {
  return (
    <section id="projects" className="section bg-[#050505]">
      <div className="container-px">
        <SectionHeading
          eyebrow="Featured Projects"
          title={<>Things I&apos;ve built</>}
          description="Real AI systems — from public policing platforms to computer vision and automation pipelines."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <div
              key={project.title}
              data-blur-in
              style={{ transitionDelay: `${(i % 3) * 100}ms` }}
              className="h-full"
            >
              <Tilt className="h-full">
                <article className="group glass-card flex h-full flex-col overflow-hidden hover:border-[#9ed8ff]/30">
                  <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${project.accent}`}>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? `${project.title} project cover`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-background/40" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#080a0f]/80 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white/80 backdrop-blur-sm">
                      {project.category}
                    </span>
                    {project.status ? (
                      <span className="absolute right-4 top-4 rounded-full bg-background/60 px-2.5 py-1 text-[10px] font-mono text-[#9ed8ff] backdrop-blur-sm">
                        {project.status}
                      </span>
                    ) : null}
                    <ArrowUpRight className="absolute bottom-3 right-3 h-5 w-5 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#9ed8ff]" />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-mono text-sm uppercase tracking-wider text-white group-hover:text-[#9ed8ff] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-xs leading-relaxed text-muted">
                      {project.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {project.features.map((f) => (
                        <li
                          key={f}
                          className="rounded bg-white/[0.03] border border-white/5 px-2 py-0.5 text-[9px] font-mono text-white/60"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 border-t border-white/5 pt-4">
                      {project.techStack.map((t) => (
                        <span key={t} className="font-mono text-[10px] text-[#cfae6e]/80">
                          #{t.replace(/\s+/g, "")}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-4">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/70 transition-colors hover:text-[#9ed8ff]"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live Demo
                        </a>
                      ) : null}
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/50 transition-colors hover:text-white"
                        >
                          <Github className="h-3.5 w-3.5" />
                          Code
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
