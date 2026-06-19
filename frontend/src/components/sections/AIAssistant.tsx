"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Bot, User, Loader2 } from "lucide-react";
import { aiSuggestions, profile } from "@/lib/data";
import { askKunalAI, type ChatMessage } from "@/lib/api";
import { SectionHeading } from "@/components/SectionHeading";

const GREETING: ChatMessage = {
  role: "assistant",
  content: `Hi! I'm ${profile.name}'s AI assistant. Ask me about his projects, skills, experience, or background.`,
};

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);
    const history = messages.filter((m) => m !== GREETING);
    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await askKunalAI(trimmed, history);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setError(
        "The AI assistant backend is not reachable right now. Start FastAPI with `uvicorn main:app --reload --port 8000` from the backend folder to chat live."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="ask-ai" className="section bg-[#050505] border-t border-white/5">
      <div className="container-px">
        <SectionHeading
          eyebrow="Ask Kunal AI"
          title={
            <>
              Talk to my <span className="text-[#9ed8ff] drop-shadow-[0_0_8px_rgba(158,216,255,0.4)]">AI assistant</span>
            </>
          }
          description="Trained on Kunal's resume, projects, experience, and skills. Ask anything."
        />

        <div
          data-blur-in
          className="glass-card mx-auto flex max-w-3xl flex-col overflow-hidden hover:border-[#9ed8ff]/20 transition-all duration-300"
        >
          {/* header */}
          <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4 bg-white/[0.01]">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[#9ed8ff]/10 text-[#9ed8ff] border border-[#9ed8ff]/20 shadow-[0_0_10px_rgba(158,216,255,0.15)]">
              <Bot className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#050505] bg-emerald-400 animate-pulse" />
            </span>
            <div>
              <p className="font-mono text-xs font-semibold text-white uppercase tracking-wider">Kunal AI</p>
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Portfolio assistant</p>
            </div>
            <Sparkles className="ml-auto h-4 w-4 text-[#9ed8ff] drop-shadow-[0_0_5px_rgba(158,216,255,0.4)]" />
          </div>

          {/* messages */}
          <div ref={scrollRef} className="h-80 space-y-4 overflow-y-auto px-5 py-5 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${
                      m.role === "user"
                        ? "border-white/10 bg-white/[0.05] text-white"
                        : "border-[#9ed8ff]/20 bg-[#9ed8ff]/10 text-[#9ed8ff]"
                    }`}
                  >
                    {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </span>
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 font-mono text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#9ed8ff]/10 border border-[#9ed8ff]/20 text-white"
                        : "border border-white/5 bg-white/[0.02] text-white/80"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <div className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#9ed8ff]/20 bg-[#9ed8ff]/10 text-[#9ed8ff]">
                  <Bot className="h-4 w-4" />
                </span>
                <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white/50">
                  <Loader2 className="h-3 w-3 animate-spin text-[#9ed8ff]" />
                  Thinking…
                </div>
              </div>
            )}
          </div>

          {/* suggestions */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 px-5 pb-3">
              {aiSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-lg border border-[#9ed8ff]/15 bg-[#9ed8ff]/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#9ed8ff]/80 transition-all duration-300 hover:border-[#9ed8ff]/40 hover:bg-[#9ed8ff]/10 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p className="px-5 pb-2 font-mono text-[10px] text-[#cfae6e]">{error}</p>
          )}

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-3 border-t border-white/5 p-4 bg-white/[0.005]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Kunal's projects, skills, experience…"
              className="flex-1 rounded-xl border border-white/10 bg-[#080a0f] px-4 py-2.5 font-mono text-xs text-white outline-none transition-all placeholder:text-white/30 focus:border-[#9ed8ff]/40 focus:bg-[#0b0e14] focus:shadow-[0_0_15px_rgba(158,216,255,0.08)]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl bg-[#9ed8ff]/10 border border-[#9ed8ff]/30 text-[#9ed8ff] transition-all hover:scale-105 hover:bg-[#9ed8ff]/20 hover:border-[#9ed8ff]/50 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

