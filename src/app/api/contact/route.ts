import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format." },
        { status: 400 }
      );
    }

    // In a full production setup with Resend or SendGrid, send email here.
    // For now, log the validated contact transmission and simulate fast backend persistence.
    console.log(`[Contact API] Received dispatch from ${name} <${email}>: "${message.substring(0, 60)}..."`);

    return NextResponse.json(
      {
        ok: true,
        message: "Transmission received. Maaz will review and respond shortly.",
        timestamp: new Date().toISOString(),
        recipient: "maazkhan96271@gmail.com",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { ok: false, error: "Internal transmission error. Please try again." },
      { status: 500 }
    );
  }
}
