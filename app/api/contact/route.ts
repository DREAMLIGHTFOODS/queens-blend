import { z } from "zod";
import { NextResponse } from "next/server";

import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
  website: z.string().optional().default(""),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = checkRateLimit(`contact:${ip}`, {
    windowMs: 15 * 60 * 1000,
    max: 5,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many requests. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfterSeconds),
        },
      },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid request payload.",
      },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the form fields and try again.",
      },
      { status: 400 },
    );
  }

  // Honeypot field for basic bot mitigation.
  if (parsed.data.website.trim().length > 0) {
    return NextResponse.json(
      {
        ok: true,
        message: "Thanks, your message has been received.",
      },
      { status: 200 },
    );
  }

  // Placeholder for downstream delivery integration (email, CRM, queue).
  return NextResponse.json(
    {
      ok: true,
      message: "Thank you for contacting us. We will reply within 24 business hours.",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
