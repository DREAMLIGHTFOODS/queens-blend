/**
 * ============================================================================
 * Queen's Blend
 * File: components/layout/header/Header.tsx
 * Purpose: Main navigation header with logo and menu
 * ============================================================================
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAVIGATION } from "@/config/navigation";
import { SITE } from "@/config/site";
import { Container } from "@/components/core/layout/Container";
import { Cluster } from "@/components/core/layout/Cluster";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="border-border supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b bg-transparent backdrop-blur"
    >
      <Container size="xl">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
            onClick={closeMobileMenu}
          >
            <Image
              src="/images/logos/Queens_Blennd_Logo.png"
              alt={SITE.name}
              width={80}
              height={80}
              className="h-20 w-20"
            />
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>

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
        </div>

        <nav
          id="mobile-navigation"
          className={`overflow-hidden border-t transition-[max-height,opacity] duration-300 ease-out md:hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <ul className="flex flex-col py-3">
            {NAVIGATION.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-foreground hover:bg-muted focus-visible:ring-ring block rounded px-3 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  onClick={closeMobileMenu}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
