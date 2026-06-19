"""
LLM gateway for the assistant.

Tries Gemini, then OpenAI, depending on which API key is configured.
Falls back to the offline keyword retriever if no key is set or a call fails,
so the assistant never hard-errors.
"""
from __future__ import annotations

import logging

import httpx

from . import config
from .knowledge import SYSTEM_PROMPT, offline_answer

log = logging.getLogger("kunal-ai")

_TIMEOUT = httpx.Timeout(30.0)


async def _gemini(message: str, history: list[dict]) -> str:
    contents: list[dict] = []
    for turn in history[-8:]:
        role = "user" if turn.get("role") == "user" else "model"
        contents.append({"role": role, "parts": [{"text": turn.get("content", "")}]})
    contents.append({"role": "user", "parts": [{"text": message}]})

    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{config.GEMINI_MODEL}:generateContent?key={config.GEMINI_API_KEY}"
    )
    payload = {
        "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "contents": contents,
        "generationConfig": {"temperature": 0.6, "maxOutputTokens": 600},
    }
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        r = await client.post(url, json=payload)
        r.raise_for_status()
        data = r.json()
    return data["candidates"][0]["content"]["parts"][0]["text"].strip()


async def _openai(message: str, history: list[dict]) -> str:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for turn in history[-8:]:
        role = "user" if turn.get("role") == "user" else "assistant"
        messages.append({"role": role, "content": turn.get("content", "")})
    messages.append({"role": "user", "content": message})

    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        r = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {config.OPENAI_API_KEY}"},
            json={
                "model": config.OPENAI_MODEL,
                "messages": messages,
                "temperature": 0.6,
                "max_tokens": 600,
            },
        )
        r.raise_for_status()
        data = r.json()
    return data["choices"][0]["message"]["content"].strip()


async def _groq(message: str, history: list[dict]) -> str:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for turn in history[-8:]:
        role = "user" if turn.get("role") == "user" else "assistant"
        messages.append({"role": role, "content": turn.get("content", "")})
    messages.append({"role": "user", "content": message})

    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        r = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {config.GROQ_API_KEY}"},
            json={
                "model": config.GROQ_MODEL,
                "messages": messages,
                "temperature": 0.6,
                "max_tokens": 600,
            },
        )
        r.raise_for_status()
        data = r.json()
    return data["choices"][0]["message"]["content"].strip()


async def _mistral(message: str, history: list[dict]) -> str:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for turn in history[-8:]:
        role = "user" if turn.get("role") == "user" else "assistant"
        messages.append({"role": role, "content": turn.get("content", "")})
    messages.append({"role": "user", "content": message})

    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        r = await client.post(
            "https://api.mistral.ai/v1/chat/completions",
            headers={"Authorization": f"Bearer {config.MISTRAL_API_KEY}"},
            json={
                "model": config.MISTRAL_MODEL,
                "messages": messages,
                "temperature": 0.6,
                "max_tokens": 600,
            },
        )
        r.raise_for_status()
        data = r.json()
    return data["choices"][0]["message"]["content"].strip()


async def generate_reply(message: str, history: list[dict]) -> str:
    provider = config.active_provider()
    try:
        if provider == "gemini":
            return await _gemini(message, history)
        if provider == "openai":
            return await _openai(message, history)
        if provider == "groq":
            return await _groq(message, history)
        if provider == "mistral":
            return await _mistral(message, history)
    except Exception as exc:  # network, quota, malformed response, etc.
        log.warning("LLM provider '%s' failed, using offline answer: %s", provider, exc)

    return offline_answer(message)

