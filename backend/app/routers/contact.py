"""Contact form endpoint.

Without an email integration configured this logs the submission server-side
and returns success (so the form is fully functional out of the box). Wire up
your preferred delivery (SMTP, Resend, a webhook, etc.) inside `deliver()`.
"""
from __future__ import annotations

import logging

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr, Field

from .. import config

log = logging.getLogger("kunal-ai.contact")

router = APIRouter(prefix="/api/contact", tags=["contact"])


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=1, max_length=200)
    message: str = Field(min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    ok: bool
    message: str


async def deliver(payload: ContactRequest) -> None:
    """Hook for real delivery. Default: structured server-side log."""
    log.info(
        "Contact submission -> forward_to=%s | from=%s <%s> | subject=%s | message=%s",
        config.CONTACT_FORWARD_EMAIL,
        payload.name,
        payload.email,
        payload.subject,
        payload.message,
    )


@router.post("", response_model=ContactResponse)
@router.post("/", response_model=ContactResponse, include_in_schema=False)
async def submit(payload: ContactRequest) -> ContactResponse:
    await deliver(payload)
    return ContactResponse(
        ok=True,
        message=(
            "Message captured by the portfolio backend. In v1, configure an email "
            "provider or use the direct email fallback for delivery."
        ),
    )
