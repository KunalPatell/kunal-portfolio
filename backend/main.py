"""
Kunal Patel portfolio backend.

Responsibilities:
  1. Serve the "Ask Kunal AI" assistant   -> POST /api/assistant/chat
  2. Handle contact form submissions       -> POST /api/contact
  3. Serve the exported Next.js static site (single-container HF deploy)

Run locally:   uvicorn main:app --reload --port 8000
On HF Spaces:  the Dockerfile runs uvicorn on port 7860.
"""
from __future__ import annotations

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app import config
from app.routers import assistant, contact

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("kunal-ai")

app = FastAPI(
    title="Kunal Patel Portfolio API",
    description="Ask Kunal AI assistant + contact form, and serves the portfolio frontend.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS or ["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API routes (registered before the static mount so they take priority) ---
app.include_router(assistant.router)
app.include_router(contact.router)


@app.get("/api/health", tags=["meta"])
async def health() -> dict:
    return {"status": "ok", "ai_provider": config.active_provider()}


# --- Static frontend ---
if config.STATIC_DIR.exists():
    log.info("Serving static frontend from %s", config.STATIC_DIR)
    # html=True makes it serve index.html for directory paths (Next.js export).
    app.mount("/", StaticFiles(directory=str(config.STATIC_DIR), html=True), name="frontend")
else:
    log.warning(
        "Static dir %s not found. API is up; build the frontend "
        "(cd frontend && npm run build) or run `npm run dev` separately.",
        config.STATIC_DIR,
    )

    @app.get("/", tags=["meta"])
    async def root() -> dict:
        return {
            "message": "Kunal Patel portfolio API is running.",
            "frontend": "not built yet — see README",
            "docs": "/docs",
        }
