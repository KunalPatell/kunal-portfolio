"""Ask Kunal AI — chat endpoint."""
from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel, Field

from .. import config
from ..llm import generate_reply

router = APIRouter(prefix="/api/assistant", tags=["assistant"])


class Turn(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    history: list[Turn] = Field(default_factory=list)


class ChatResponse(BaseModel):
    reply: str
    provider: str


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    history = [t.model_dump() for t in req.history]
    reply = await generate_reply(req.message, history)
    return ChatResponse(reply=reply, provider=config.active_provider())
