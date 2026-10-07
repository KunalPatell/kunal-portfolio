import { NextRequest, NextResponse } from "next/server";
import { semanticOfflineAnswer } from "@/lib/api";

const SYSTEM_PROMPT = `
You are 'Kunal AI', the interactive AI assistant embedded in Kunal Patel's portfolio.
Kunal Patel is an AI Engineer, Data Scientist, and Automation Specialist with an MSc in AI & Machine Learning from Sardar Patel University.

Key Facts:
- Current Role: AI-ML Engineer at Capermint Technology (May 2026 - Present), building AI game engines, dynamic NPC behaviors, and optimizing FastAPI inference (-35% latency).
- Prior Roles:
  * AI Engineer at Elite Workforce Services (Dec 2025 - May 2026): Automated 40%+ manual processes, saved 120+ hrs/mo with n8n and LLM fallback gateways.
  * AI Automation Engineer at Sevenseed Technology (Dec 2024 - Nov 2025): Orchestrated JSON API automation pipelines across 7+ SaaS platforms, processing 5,000+ daily operational requests with 99.8% uptime.
- Major Platforms & Startups Built:
  1. Rakshak AI (5-in-1 AI Public Safety & Vision Suite, automatic FIR generation with BNS/IPC legal codes, safety mask PPE scanner, facial attendance).
  2. Sevenseed Ecosystem (Multi-agent AI venture studio with LangGraph, Groq LLaMA 3.3 70B, ChromaDB RAG, zero-cost BYOK).
  3. Comonk AI (32-panel AI career platform, ATS resume optimizer, voice mock interview simulator).
  4. Sevenforce (Autonomous 7-agent AI workforce dock and sales CRM).
  5. Breakdown Factor (Custom YOLOv8 best.pt structural defect scanner and BOQ estimator).
  6. AVP University (AVPU - AI cognitive tutor and adaptive assessment engine).
  7. Decode Forest Pharmacy (Prescription OCR scanner, drug interaction checker).
  8. AVP Charitable Trust (AI beneficiary matching and 80G tax PDF generator).
  9. AVP Emart (4-store price comparator across Amazon, Flipkart, Reliance, Snapdeal).
  10. LCB Face Matcher & Face Mask Detection (Biometric CV on Hugging Face).
- Contact: websitekunal@gmail.com, Phone: +91 84908 61586, Location: Ahmedabad, India.
- Live Demos: Render (https://sevenseed.onrender.com) and Hugging Face (https://huggingface.co/Kunalptl777).

Tone: Friendly, concise, professional, technically accurate. Refer to Kunal in the 3rd person. Include relevant metrics when applicable.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing 'message' field" }, { status: 400 });
    }

    const groqKey = req.headers.get("x-groq-api-key") || process.env.GROQ_API_KEY;
    const geminiKey = req.headers.get("x-gemini-api-key") || process.env.GEMINI_API_KEY;
    const openaiKey = req.headers.get("x-openai-api-key") || process.env.OPENAI_API_KEY;

    // 1. Try Groq LLaMA 3.3 70B
    if (groqKey) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...history.slice(-4),
              { role: "user", content: message },
            ],
            temperature: 0.3,
            max_tokens: 600,
          }),
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, provider: "groq" });
          }
        }
      } catch {}
    }

    // 2. Try Gemini 1.5 Flash
    if (geminiKey) {
      try {
        const geminiContents = [
          ...history.slice(-6).map((h: { role: string; content: string }) => ({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.content }],
          })),
          {
            role: "user",
            parts: [{ text: message }],
          },
        ];

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents: geminiContents,
              generationConfig: { temperature: 0.3, maxOutputTokens: 600 },
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply, provider: "gemini" });
          }
        }
      } catch {}
    }

    // 3. Try OpenAI GPT-4o-mini
    if (openaiKey) {
      try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...history.slice(-4),
              { role: "user", content: message },
            ],
            temperature: 0.3,
          }),
        });

        if (openaiRes.ok) {
          const data = await openaiRes.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, provider: "openai" });
          }
        }
      } catch {}
    }

    // 4. Grounded Zero-Downtime Semantic Engine
    const groundedAnswer = semanticOfflineAnswer(message);
    return NextResponse.json({ reply: groundedAnswer, provider: "grounded-rag" });
  } catch (err) {
    return NextResponse.json(
      {
        reply:
          "Kunal Patel is an AI Engineer specializing in multi-agent architectures, computer vision, and automation. You can reach out directly via websitekunal@gmail.com.",
        error: String(err),
      },
      { status: 200 }
    );
  }
}
