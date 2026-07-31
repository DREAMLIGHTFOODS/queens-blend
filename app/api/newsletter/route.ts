import { z } from "zod";
import { NextResponse } from "next/server";

import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const newsletterSchema = z.object({
  email: z.string().trim().email().max(120),
  website: z.string().optional().default(""),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = checkRateLimit(`newsletter:${ip}`, {
    windowMs: 10 * 60 * 1000,
    max: 8,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many requests. Please try again shortly.",
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

  const parsed = newsletterSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please enter a valid email address.",
      },
      { status: 400 },
    );
  }

  // Honeypot field for basic bot mitigation.
  if (parsed.data.website.trim().length > 0) {
    return NextResponse.json(
      {
        ok: true,
        message: "Thanks for subscribing.",
      },
      { status: 200 },
    );
  }

  // Placeholder for downstream delivery integration (ESP, CRM, queue).
  return NextResponse.json(
    {
      ok: true,
      message: "You are subscribed. Welcome to the Queen's Blend journal.",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
