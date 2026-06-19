import { Github, Linkedin, Mail, Globe } from "lucide-react";
import { isPlaceholderUrl, profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-[#050505] py-10">
      <div className="container-px flex flex-col items-center justify-between gap-6 text-sm text-muted sm:flex-row">
        <p>
          © {year} {profile.name}. Built with Next.js, FastAPI & a bit of AI.
        </p>
        <div className="flex items-center gap-5">
          {!isPlaceholderUrl(profile.socials.github) ? <a aria-label="GitHub" href={profile.socials.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#9ed8ff]">
            <Github className="h-5 w-5" />
          </a> : null}
          <a aria-label="LinkedIn" href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#9ed8ff]">
            <Linkedin className="h-5 w-5" />
          </a>
          <a aria-label="Email" href={`mailto:${profile.email}`} className="transition-colors hover:text-[#9ed8ff]">
            <Mail className="h-5 w-5" />
          </a>
          {!isPlaceholderUrl(profile.socials.portfolio) ? <a aria-label="Portfolio" href={profile.socials.portfolio} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#9ed8ff]">
            <Globe className="h-5 w-5" />
          </a> : null}
        </div>
      </div>
    </footer>
  );
}
