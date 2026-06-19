"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { isPlaceholderUrl, profile } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      );
      const subject = encodeURIComponent(form.subject || "Portfolio contact");
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? `${err.message}. You can also email me directly at ${profile.email}.`
          : "Something went wrong."
      );
    }
  }

  const contactItems = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: Linkedin, label: "LinkedIn", value: "in/kunalpatell", href: profile.socials.linkedin },
    {
      icon: Github,
      label: "GitHub",
      value: isPlaceholderUrl(profile.socials.github) ? "Coming soon" : "View profile",
      href: isPlaceholderUrl(profile.socials.github) ? undefined : profile.socials.github,
    },
  ];

  return (
    <section id="contact" className="section bg-[#050505] border-t border-white/5">
      <div className="container-px">
        <SectionHeading
          eyebrow="Contact"
          title={<>Let&apos;s build something intelligent</>}
          description="Open to AI engineering roles, automation projects, and collaborations."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div data-blur-in className="space-y-4">
            {contactItems.map((c) => {
              const inner = (
                <div className="glass-card flex items-center gap-4 p-4 hover:border-[#9ed8ff]/30 transition-all duration-300">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#9ed8ff]/10 text-[#9ed8ff] border border-[#9ed8ff]/20 shadow-[0_0_10px_rgba(158,216,255,0.15)]">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#9ed8ff]/70">{c.label}</p>
                    <p className="truncate font-mono text-xs text-white uppercase tracking-wider mt-0.5">{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              );
            })}
          </div>

          <div data-blur-in style={{ transitionDelay: "100ms" }}>
            <form onSubmit={onSubmit} className="glass-card space-y-5 p-6 sm:p-8 hover:border-[#9ed8ff]/20 transition-all duration-300">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <input required value={form.name} onChange={update("name")} className="font-mono bg-[#080a0f] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-all placeholder:text-white/20 focus:border-[#9ed8ff]/40 focus:bg-[#0b0e14] w-full" placeholder="Your name" />
                </Field>
                <Field label="Email">
                  <input required type="email" value={form.email} onChange={update("email")} className="font-mono bg-[#080a0f] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-all placeholder:text-white/20 focus:border-[#9ed8ff]/40 focus:bg-[#0b0e14] w-full" placeholder="you@example.com" />
                </Field>
              </div>
              <Field label="Subject">
                <input required value={form.subject} onChange={update("subject")} className="font-mono bg-[#080a0f] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-all placeholder:text-white/20 focus:border-[#9ed8ff]/40 focus:bg-[#0b0e14] w-full" placeholder="What's this about?" />
              </Field>
              <Field label="Message">
                <textarea required value={form.message} onChange={update("message")} rows={5} className="font-mono bg-[#080a0f] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-all placeholder:text-white/20 focus:border-[#9ed8ff]/40 focus:bg-[#0b0e14] w-full resize-none" placeholder="Tell me a bit more…" />
              </Field>

              {status === "error" && (
                <p className="font-mono text-[10px] text-[#cfae6e]">{errorMsg}</p>
              )}
              {status === "sent" && (
                <p className="flex items-center gap-2 font-mono text-[10px] text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Your email app is opening with the message ready to send.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full h-11 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9ed8ff] border border-[#9ed8ff]/30 bg-[#9ed8ff]/5 rounded-xl hover:bg-[#9ed8ff]/10 hover:border-[#9ed8ff]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Field component to structure label & field inside form
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </span>
      {children}
    </label>
  );
}

