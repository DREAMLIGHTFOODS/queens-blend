/**
 * ============================================================================
 * Queen's Blend
 * File: components/layout/header/Header.tsx
 * Purpose: Main navigation header with logo and menu
 * ============================================================================
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { NAVIGATION } from "@/config/navigation";
import { SITE } from "@/config/site";
import { Container } from "@/components/core/layout/Container";
import { Cluster } from "@/components/core/layout/Cluster";

export function Header() {
  return (
    <header className="border-border supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b bg-transparent backdrop-blur">
      <Container size="2xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Image
              src="/images/logos/Queens_Blennd_Logo.png"
              alt={SITE.name}
              width={80}
              height={80}
              className="h-20 w-20"
            />
            {/* <span className="hidden font-bold sm:inline">{SITE.name}</span>
            <span className="hidden font-bold sm:hidden">{SITE.shortName}</span> */}
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex">
            <Cluster gap="md" as="ul" className="list-none">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground hover:text-primary focus-visible:ring-ring rounded px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </Cluster>
          </nav>

          {/* CTA Button */}
          {/* <Button size="sm" variant="default" asChild className="hidden sm:flex">
            <Link href="/#shop">Shop Now</Link>
          </Button> */}
        </div>
      </Container>
    </header>
  );
}
