/**
 * ============================================================================
 * Queen's Blend
 * File: components/layout/footer/Footer.tsx
 * Purpose: Main footer with links, contact, and copyright
 * ============================================================================
 */

import Link from "next/link";
import { NAVIGATION } from "@/config/navigation";
import { SITE } from "@/config/site";
import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Cluster } from "@/components/core/layout/Cluster";
import { Divider } from "@/components/core/layout/Divider";

export function Footer() {
  return (
    <footer className="w-full bg-muted text-foreground">
      <Container size="2xl" className="py-16">
        <Stack gap="lg">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Brand */}
            <Stack gap="md">
              <div>
                <h3 className="text-lg font-bold text-primary">
                  <span className="mr-2">🍵</span>
                  {SITE.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">{SITE.description}</p>
            </Stack>

            {/* Navigation Links */}
            <Stack gap="md">
              <h4 className="text-sm font-semibold">Explore</h4>
              <ul className="space-y-2 text-sm">
                {NAVIGATION.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Stack>

            {/* Contact Info */}
            <Stack gap="md">
              <h4 className="text-sm font-semibold">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: info@queensblend.com</p>
                <p>Phone: +91 (XXX) XXX-XXXX</p>
                <p>Location: India</p>
              </div>
            </Stack>
          </div>

          {/* Divider */}
          <Divider className="bg-border" />

          {/* Bottom */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
            <p>{SITE.copyright}</p>

            {/* Social Links Placeholder */}
            <Cluster gap="md" justify="end">
              <Link href="#" className="hover:text-foreground transition-colors">
                Twitter
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Instagram
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                LinkedIn
              </Link>
            </Cluster>
          </div>
        </Stack>
      </Container>
    </footer>
  );
}
