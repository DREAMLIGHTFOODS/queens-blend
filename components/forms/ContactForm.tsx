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
      // Validate form data
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setStatus({
          type: "error",
          message: "All fields are required.",
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setStatus({
          type: "error",
          message: "Please enter a valid email address.",
        });
        return;
      }

      // Simulate API call
      // In production, this would send data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus({
        type: "success",
        message:
          "Thank you for your message! We'll get back to you within 24 hours. Check your email for confirmation.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
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
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
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
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" size="lg" disabled={status.type === "loading"} className="w-full">
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
