"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, X, Sparkles, Layers, CheckCircle2 } from "lucide-react";
import { projects, Project } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Tilt } from "@/components/Tilt";

const FILTERS = ["All", "AI / LLM", "Computer Vision", "Automation", "Data"];

function bucket(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("vision")) return "Computer Vision";
  if (c.includes("automation")) return "Automation";
  if (c.includes("data") || c.includes("analytics") || c.includes("intelligence") || c.includes("business"))
    return "Data";
  return "AI / LLM";
}

export function Projects() {
  const [active, setActive] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const shown = active === "All" ? projects : projects.filter((p) => bucket(p.category) === active);

  return (
    <section id="projects" className="section bg-[#050505] relative">
      <div className="container-px">
        <SectionHeading
          eyebrow="Featured Projects"
          title={<>Things I&apos;ve built</>}
          description="Real AI systems — from public policing platforms to computer vision and automation pipelines."
        />

        {/* Filter Tabs */}
        <div data-blur-in className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative rounded-lg border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 ${
                active === f
                  ? "border-[#9ed8ff]/50 bg-[#9ed8ff]/10 text-[#9ed8ff] shadow-[0_0_12px_rgba(158,216,255,0.2)]"
                  : "border-white/10 bg-white/[0.02] text-white/50 hover:border-[#9ed8ff]/30 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, i) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="h-full"
            >
              <Tilt className="h-full">
                <article 
                  onClick={() => setSelectedProject(project)}
                  className="group glass-card flex h-full flex-col overflow-hidden hover:border-[#9ed8ff]/40 cursor-pointer transition-all duration-300"
                >
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
                    <h3 className="font-mono text-sm uppercase tracking-wider text-white group-hover:text-[#9ed8ff] transition-colors duration-300 flex items-center justify-between">
                      <span>{project.title}</span>
                      <span className="text-[10px] text-white/30 font-normal group-hover:text-[#cfae6e]">Details &rarr;</span>
                    </h3>
                    <p className="mt-3 flex-1 text-xs leading-relaxed text-muted line-clamp-3">
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
                  </div>
                </article>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0d14] p-6 sm:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-5 top-5 rounded-full border border-white/10 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#9ed8ff]/30 bg-[#9ed8ff]/10 px-3 py-1 font-mono text-xs text-[#9ed8ff]">
                  {selectedProject.category}
                </span>
                {selectedProject.status && (
                  <span className="font-mono text-xs text-[#cfae6e]">
                    {selectedProject.status}
                  </span>
                )}
              </div>

              <h2 className="mt-4 font-mono text-2xl font-bold uppercase tracking-wider text-white">
                {selectedProject.title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {selectedProject.description}
              </p>

              {/* Key Features */}
              <div className="mt-6 border-t border-white/5 pt-6">
                <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#9ed8ff]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Key System Features
                </h4>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {selectedProject.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 font-mono text-xs text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#cfae6e]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6 border-t border-white/5 pt-6">
                <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#9ed8ff]">
                  <Layers className="h-4 w-4 text-[#9ed8ff]" />
                  Technology Stack
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/90">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 border-t border-white/5 pt-6">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#9ed8ff]/50 bg-[#9ed8ff]/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#9ed8ff] transition-all hover:bg-[#9ed8ff]/20 hover:shadow-[0_0_15px_rgba(158,216,255,0.3)]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Launch Live System
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-all hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" />
                    View Repository
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

