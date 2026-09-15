import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a message (at least 5 characters)." },
        { status: 400 }
      );
    }

    const inquiry = {
      name: name.trim(),
      email: email.trim(),
      subject: (subject || "Portfolio Inquiry").trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || "unknown",
      ip: req.headers.get("x-forwarded-for") || "unknown",
    };

    console.log("[PORTFOLIO CONTACT INQUIRY RECEIVED]:", JSON.stringify(inquiry, null, 2));

    // If RESEND_API_KEY is configured in environment, dispatch email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["websitekunal@gmail.com"],
            reply_to: inquiry.email,
            subject: `[Portfolio Inquiry] ${inquiry.subject} from ${inquiry.name}`,
            text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nSubject: ${inquiry.subject}\n\nMessage:\n${inquiry.message}`,
          }),
        });
      } catch (err) {
        console.error("[RESEND DELIVERY FAILED]:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully. Kunal will review and respond to your email promptly!",
        inquiryId: `inq_${Date.now()}`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[CONTACT ROUTE ERROR]:", err);
    return NextResponse.json(
      { error: "Failed to process contact submission. Please email websitekunal@gmail.com directly." },
      { status: 500 }
    );
  }
}
