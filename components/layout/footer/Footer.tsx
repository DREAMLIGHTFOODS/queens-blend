/**
 * ============================================================================
 * Queen's Blend
 * File: components/layout/footer/Footer.tsx
 * Purpose: Main footer with links, contact, and copyright
 * ============================================================================
 */

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAVIGATION } from "@/config/navigation";
import {
  NEW_ALL_BUSINESS_LINK,
  NEW_ALL_PRODUCTS_LINK,
  NEW_BUSINESS_LINKS,
  NEW_PRODUCT_COLLECTIONS,
} from "@/config/new-navigation";
import { SITE } from "@/config/site";
import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Cluster } from "@/components/core/layout/Cluster";
import { Divider } from "@/components/core/layout/Divider";

export function Footer() {
  return (
    <footer className="w-full bg-(--brand-emerald-dark) text-(--brand-ivory)">
      <Container size="xl" className="py-14 md:py-16">
        <Stack gap="lg">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-6">
            {/* Brand */}
            <Stack gap="md" className="md:col-span-2">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/logos/Queens_Blennd_Logo.png"
                  alt={SITE.name}
                  width={240}
                  height={240}
                  className="h-60 w-60 object-contain"
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

            {/* Categories */}
            <Stack gap="md">
              <h4 className="pl-6 text-sm font-semibold">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={NEW_ALL_PRODUCTS_LINK.href}
                    className="text-(--neutral-300) transition-colors hover:text-(--brand-gold-light)"
                  >
                    {NEW_ALL_PRODUCTS_LINK.title}
                  </Link>
                </li>
                {NEW_PRODUCT_COLLECTIONS.map((category) => (
                  <li key={category.href}>
                    <Link
                      href={category.href}
                      className="text-(--neutral-300) transition-colors hover:text-(--brand-gold-light)"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Stack>

            <Stack gap="md">
              <h4 className="pl-6 text-sm font-semibold">Business</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={NEW_ALL_BUSINESS_LINK.href}
                    className="text-(--neutral-300) transition-colors hover:text-(--brand-gold-light)"
                  >
                    {NEW_ALL_BUSINESS_LINK.title}
                  </Link>
                </li>
                {NEW_BUSINESS_LINKS.map((item) => (
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
              <h4 className="pl-6 text-sm font-semibold">Contact</h4>
              <div className="space-y-2 pl-6 text-sm text-(--neutral-300)">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-(--brand-gold-light)"
                    aria-hidden="true"
                  />
                  <div>
                    <p>Dreamlight Foods</p>
                    <p>26/3B Hindusthan Park,</p>
                    <p>Kolkata - 700 029, West Bengal,</p>
                    <p>India</p>
                  </div>
                </div>
                <p>
                  <a
                    href="tel:+913331515892"
                    className="flex items-center gap-3 transition-colors hover:text-(--brand-gold-light)"
                  >
                    <Phone
                      className="h-4 w-4 shrink-0 text-(--brand-gold-light)"
                      aria-hidden="true"
                    />
                    <span>+91 (33) 3151-5892</span>
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:info@thequeensblend.com"
                    className="flex items-center gap-3 transition-colors hover:text-(--brand-gold-light)"
                  >
                    <Mail
                      className="h-4 w-4 shrink-0 text-(--brand-gold-light)"
                      aria-hidden="true"
                    />
                    <span>info@thequeensblend.com</span>
                  </a>
                </p>
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
