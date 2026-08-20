/**
 * ============================================================================
 * Queen's Blend
 * File: components/layout/footer/Footer.tsx
 * Purpose: Main footer with links, contact, and copyright
 * ============================================================================
 */

import Link from "next/link";
import Image from "next/image";
import { NAVIGATION } from "@/config/navigation";
import { SITE } from "@/config/site";
import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Cluster } from "@/components/core/layout/Cluster";
import { Divider } from "@/components/core/layout/Divider";

export function Footer() {
  return (
    <footer className="w-full bg-(--brand-emerald-dark) text-(--brand-ivory)">
      <Container size="2xl" className="py-16">
        <Stack gap="lg">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Brand */}
            <Stack gap="md">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/logos/Queens_Blennd_Logo.png"
                  alt={SITE.name}
                  width={144}
                  height={144}
                  className="h-36 w-36 object-contain"
                />
              </div>
              <p className="text-sm text-(--neutral-300)">{SITE.description}</p>
            </Stack>

            {/* Navigation Links */}
            <Stack gap="md">
              <h4 className="pl-6 text-sm font-semibold">Explore</h4>
              <ul className="space-y-2 text-sm">
                {NAVIGATION.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-(--neutral-300) transition-colors hover:text-(--brand-gold-light)"
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
              <div className="space-y-2 text-sm text-(--neutral-300)">
                <p>
                  Location: The Queen&apos;s Blend, 26/3B Hindustan Park, Kolkata - 700 029, West
                  Bengal, India
                </p>
                <p>Phone: +91 (33) 3151-5892</p>
                <p>Email: info@thequeensblend.com</p>
              </div>
            </Stack>
          </div>

          {/* Divider */}
          <Divider className="bg-(--neutral-300)" />

          {/* Bottom */}
          <div className="flex flex-col gap-4 text-sm text-(--neutral-300) md:flex-row md:items-center md:justify-between">
            <p>{SITE.copyright}</p>

            {/* Social Links Placeholder */}
            <Cluster gap="md" justify="end">
              <Link href="#" className="transition-colors hover:text-(--brand-gold-light)">
                Twitter
              </Link>
              <Link href="#" className="transition-colors hover:text-(--brand-gold-light)">
                Instagram
              </Link>
              <Link href="#" className="transition-colors hover:text-(--brand-gold-light)">
                LinkedIn
              </Link>
            </Cluster>
          </div>
        </Stack>
      </Container>
    </footer>
  );
}
