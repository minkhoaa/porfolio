import { NextRequest, NextResponse } from "next/server";

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: ContactRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, message } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: "Name is required" },
      { status: 400 }
    );
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: "Valid email is required" },
      { status: 400 }
    );
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: "Message is required" },
      { status: 400 }
    );
  }

  // Log to console — user will wire up email service later
  console.log("Contact form submission:", {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
