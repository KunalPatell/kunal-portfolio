import { Github, Linkedin, Mail } from "lucide-react";
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
          {!isPlaceholderUrl(profile.socials.huggingface) ? <a aria-label="Hugging Face" href={profile.socials.huggingface} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#9ed8ff]">
            <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.967.01 2.553.003.585.006 1.965.006 2.553-.003.743-.01.993-.326 1.018-.846.012-.249.006-.824.006-1.18 0-.462.247-.692.684-.692s.684.23.684.692v1.173c0 .546-.3.834-.848.854a37 37 0 0 1-2.018.006c-.636 0-1.963 0-2.502-.006.126.3.364.55.702.738.411.23.953.376 1.57.424a1.14 1.14 0 0 1 .927 1.088c.01.552-.397.94-.88.94-.097 0-.2-.02-.303-.047-1.077-.282-2.057-.962-2.737-1.848a6.5 6.5 0 0 1-.77 1.066 6.8 6.8 0 0 1-2.035.782.95.95 0 0 1-.303.047c-.483 0-.89-.388-.88-.94a1.14 1.14 0 0 1 .928-1.088c.616-.048 1.159-.193 1.57-.424.337-.188.575-.438.702-.738-.54.006-1.866.006-2.502.006a37 37 0 0 1-2.018-.006c-.548-.02-.848-.308-.848-.854V9.431c0-.462.247-.692.684-.692s.684.23.684.692c0 .356-.006.931.006 1.18.025.52.275.836 1.018.846" />
            </svg>
          </a> : null}
        </div>
      </div>
    </footer>
  );
}
