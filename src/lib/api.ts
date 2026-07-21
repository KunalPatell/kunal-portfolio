/**
 * Thin client for the FastAPI backend.
 * Falls back gracefully when the backend isn't running.
 */
/**
 * In production (Hugging Face Docker Space) the FastAPI backend serves the
 * static frontend, so the API lives at the same origin -> leave this empty.
 * For split local dev (Next on :3000, FastAPI on :8000), set
 * NEXT_PUBLIC_API_URL=http://localhost:8000 in frontend/.env.local.
 */
export const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export type ChatMessage = { role: "user" | "assistant"; content: string };

export type UserApiKeys = {
  groqKey: string;
  geminiKey: string;
  openaiKey: string;
};

export function getStoredApiKeys(): UserApiKeys {
  if (typeof window === "undefined") {
    return { groqKey: "", geminiKey: "", openaiKey: "" };
  }
  return {
    groqKey: localStorage.getItem("byok_groq_key") ?? "",
    geminiKey: localStorage.getItem("byok_gemini_key") ?? "",
    openaiKey: localStorage.getItem("byok_openai_key") ?? "",
  };
}

export function setStoredApiKeys(keys: Partial<UserApiKeys>): void {
  if (typeof window === "undefined") return;
  if (keys.groqKey !== undefined) localStorage.setItem("byok_groq_key", keys.groqKey.trim());
  if (keys.geminiKey !== undefined) localStorage.setItem("byok_gemini_key", keys.geminiKey.trim());
  if (keys.openaiKey !== undefined) localStorage.setItem("byok_openai_key", keys.openaiKey.trim());
}

export function getByokHeaders(): Record<string, string> {
  const keys = getStoredApiKeys();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (keys.groqKey) headers["x-groq-api-key"] = keys.groqKey;
  if (keys.geminiKey) headers["x-gemini-api-key"] = keys.geminiKey;
  if (keys.openaiKey) headers["x-openai-api-key"] = keys.openaiKey;
  return headers;
}

export async function askKunalAI(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const res = await fetch(`${API_BASE}/api/assistant/chat`, {
    method: "POST",
    headers: getByokHeaders(),
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) {
    throw new Error(`Assistant error (${res.status})`);
  }
  const data = (await res.json()) as { reply: string };
  return data.reply;
}

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new Error(detail?.detail || `Failed to send (${res.status})`);
  }
}

