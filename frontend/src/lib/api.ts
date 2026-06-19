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

export async function askKunalAI(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const res = await fetch(`${API_BASE}/api/assistant/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
