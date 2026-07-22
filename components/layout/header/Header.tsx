/**
 * ============================================================================
 * Queen's Blend
 * File: components/layout/header/Header.tsx
 * Purpose: Main navigation header with logo and menu
 * ============================================================================
 */

"use client";

import Link from "next/link";
import { NAVIGATION } from "@/config/navigation";
import { SITE } from "@/config/site";
import { Container } from "@/components/core/layout/Container";
import { Cluster } from "@/components/core/layout/Cluster";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container size="2xl" className="py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-primary transition-opacity hover:opacity-80"
          >
            <span className="text-2xl">🍵</span>
            <span className="hidden sm:inline">{SITE.name}</span>
            <span className="sm:hidden">{SITE.shortName}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex">
            <Cluster gap="md" as="ul" className="list-none">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-3 py-2"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </Cluster>
          </nav>

          {/* CTA Button */}
          <Button size="sm" variant="default" asChild className="hidden sm:flex">
            <Link href="/#shop">Shop Now</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
