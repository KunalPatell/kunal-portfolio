"""Runtime configuration, loaded from environment / .env."""
from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

# Project layout: backend/ and frontend/ are siblings.
BACKEND_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BACKEND_DIR.parent

# Where the exported Next.js site lives. The Dockerfile copies the build output
# to backend/static; locally it falls back to ../frontend/out.
_static_candidates = [
    BACKEND_DIR / "static",
    PROJECT_ROOT / "frontend" / "out",
]
STATIC_DIR = next((p for p in _static_candidates if p.exists()), _static_candidates[0])

# --- LLM provider (all optional; assistant works without any key) ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip()
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY", "").strip()

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")
MISTRAL_MODEL = os.getenv("MISTRAL_MODEL", "mistral-large-latest")

# --- Contact form delivery (optional) ---
# If unset, submissions are logged server-side and still return success.
CONTACT_FORWARD_EMAIL = os.getenv("CONTACT_FORWARD_EMAIL", "websitekunal@gmail.com")

# CORS origins for split local dev. "*" by default is fine for a public portfolio.
ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if o.strip()
]


def active_provider() -> str:
    if GEMINI_API_KEY:
        return "gemini"
    if OPENAI_API_KEY:
        return "openai"
    if GROQ_API_KEY:
        return "groq"
    if MISTRAL_API_KEY:
        return "mistral"
    return "offline"

