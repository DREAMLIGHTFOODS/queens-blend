/**
 * ============================================================================
 * Queen's Blend
 * File: components/forms/ContactForm.tsx
 * Purpose: Contact form component with validation and submission
 * ============================================================================
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/core/layout/Stack";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });

  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.message ?? "Unable to submit your message right now.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: data.message ?? "Thank you for your message. We will get back to you shortly.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ type: "idle" });
      }, 5000);
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl" noValidate>
      <Stack gap="md">
        {/* Status Messages */}
        {status.type === "success" && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-800">{status.message}</p>
          </div>
        )}

        {status.type === "error" && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{status.message}</p>
          </div>
        )}

        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          suppressHydrationWarning
        />

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="border-border text-foreground placeholder-muted-foreground focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            disabled={status.type === "loading"}
            required
            suppressHydrationWarning
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="border-border text-foreground placeholder-muted-foreground focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            disabled={status.type === "loading"}
            required
            suppressHydrationWarning
          />
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            className="border-border text-foreground placeholder-muted-foreground focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            disabled={status.type === "loading"}
            required
            suppressHydrationWarning
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your inquiry..."
            rows={6}
            className="border-border text-foreground placeholder-muted-foreground focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            disabled={status.type === "loading"}
            required
            suppressHydrationWarning
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={status.type === "loading"}
          className="w-full"
          suppressHydrationWarning
        >
          {status.type === "loading" ? "Sending..." : "Send Message"}
        </Button>

        {/* Help Text */}
        <p className="text-muted-foreground text-center text-xs">
          We typically respond within 24 business hours.
        </p>
      </Stack>
    </form>
  );
}
