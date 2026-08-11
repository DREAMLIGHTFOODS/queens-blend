"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/core/layout/Container";
import { Cluster } from "@/components/core/layout/Cluster";
import {
  NEW_ALL_PRODUCTS_LINK,
  NEW_NAVIGATION,
  NEW_PRODUCT_COLLECTIONS,
} from "@/config/new-navigation";
import { SITE } from "@/config/site";

export function NewHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

  const [isDesktopProductsOpen, setIsDesktopProductsOpen] = useState(false);
  const [isDesktopCategoriesOpen, setIsDesktopCategoriesOpen] = useState(false);

  const aboutIndex = NEW_NAVIGATION.findIndex((item) => item.title === "About");
  const navigationBeforeProducts =
    aboutIndex >= 0 ? NEW_NAVIGATION.slice(0, aboutIndex + 1) : NEW_NAVIGATION;
  const navigationAfterProducts = aboutIndex >= 0 ? NEW_NAVIGATION.slice(aboutIndex + 1) : [];

  const isProductsRoute = pathname === "/products" || pathname.startsWith("/products/");
  const activeCollectionId = pathname.match(/^\/products\/category\/([^/]+)\/?$/)?.[1] ?? null;

  const isNavItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
    setIsMobileCategoriesOpen(false);
    setIsDesktopProductsOpen(false);
    setIsDesktopCategoriesOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeAllMenus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="border-border supports-backdrop-filter:bg-background/70 sticky top-0 z-50 w-full overflow-visible border-b bg-transparent backdrop-blur"
    >
      <Container size="2xl">
        <div className="flex h-24 items-center justify-between">
          <Link
            href="/"
            className="relative z-30 block h-20 w-20 shrink-0"
            onClick={closeAllMenus}
            aria-label={`${SITE.name} home`}
          >
            <Image
              src="/images/logos/Queens_Blennd_Logo.png"
              alt={SITE.name}
              width={160}
              height={160}
              className="absolute top-0 left-0 h-40 w-40 max-w-none object-contain"
              priority
            />
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="new-mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev);
              if (isMobileMenuOpen) {
                setIsMobileProductsOpen(false);
                setIsMobileCategoriesOpen(false);
              }
            }}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>

          <nav className="hidden md:flex">
            <Cluster as="ul" gap="sm" className="list-none items-center">
              {navigationBeforeProducts.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`focus-visible:ring-ring rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                      isNavItemActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                    onClick={closeAllMenus}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}

              <li className="relative">
                <button
                  type="button"
                  className={`focus-visible:ring-ring inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                    isProductsRoute
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  aria-expanded={isDesktopProductsOpen}
                  onClick={() => {
                    setIsDesktopProductsOpen((prev) => !prev);
                    if (isDesktopProductsOpen) {
                      setIsDesktopCategoriesOpen(false);
                    }
                  }}
                  onMouseEnter={() => setIsDesktopProductsOpen(true)}
                >
                  Products
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>

                <div
                  className={`border-border bg-background absolute top-full right-0 mt-2 w-56 rounded-xl border p-2 shadow-xl transition-all ${
                    isDesktopProductsOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0"
                  }`}
                  onMouseLeave={() => {
                    setIsDesktopProductsOpen(false);
                    setIsDesktopCategoriesOpen(false);
                  }}
                >
                  <Link
                    href={NEW_ALL_PRODUCTS_LINK.href}
                    className={`focus-visible:ring-ring block rounded-lg px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                      pathname === NEW_ALL_PRODUCTS_LINK.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                    onClick={closeAllMenus}
                  >
                    {NEW_ALL_PRODUCTS_LINK.title}
                  </Link>

                  <div className="relative mt-1">
                    <button
                      type="button"
                      className={`focus-visible:ring-ring flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                        activeCollectionId ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                      aria-expanded={isDesktopCategoriesOpen}
                      onClick={() => setIsDesktopCategoriesOpen((prev) => !prev)}
                      onMouseEnter={() => setIsDesktopCategoriesOpen(true)}
                    >
                      Category
                      <ChevronDown className="h-4 w-4 -rotate-90" aria-hidden="true" />
                    </button>

                    <div
                      className={`border-border bg-background absolute top-0 left-full ml-2 w-56 rounded-xl border p-2 shadow-xl transition-all ${
                        isDesktopCategoriesOpen
                          ? "visible translate-x-0 opacity-100"
                          : "invisible -translate-x-1 opacity-0"
                      }`}
                    >
                      {NEW_PRODUCT_COLLECTIONS.map((category) => (
                        <Link
                          key={category.id}
                          href={category.href}
                          className={`focus-visible:ring-ring block rounded-lg px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                            activeCollectionId === category.id
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                          }`}
                          onClick={closeAllMenus}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              {navigationAfterProducts.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`focus-visible:ring-ring rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                      isNavItemActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                    onClick={closeAllMenus}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </Cluster>
          </nav>
        </div>

        <nav
          id="new-mobile-navigation"
          className={`md:hidden ${isMobileMenuOpen ? "pb-3" : "max-h-0 overflow-hidden"}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <ul className="space-y-1">
            {navigationBeforeProducts.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`focus-visible:ring-ring block rounded-lg px-3 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                    isNavItemActive(item.href) ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                  onClick={closeAllMenus}
                >
                  {item.title}
                </Link>
              </li>
            ))}

            <li>
              <button
                type="button"
                className={`focus-visible:ring-ring flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                  isProductsRoute ? "bg-primary/10 text-primary" : "hover:bg-muted"
                }`}
                onClick={() => setIsMobileProductsOpen((prev) => !prev)}
                aria-expanded={isMobileProductsOpen}
              >
                Products
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isMobileProductsOpen ? (
                <div className="mt-1 ml-3 space-y-1 border-l pl-3">
                  <Link
                    href={NEW_ALL_PRODUCTS_LINK.href}
                    className={`focus-visible:ring-ring block rounded-lg px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                      pathname === NEW_ALL_PRODUCTS_LINK.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                    onClick={closeAllMenus}
                  >
                    {NEW_ALL_PRODUCTS_LINK.title}
                  </Link>

                  <button
                    type="button"
                    className={`focus-visible:ring-ring flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                      activeCollectionId ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileCategoriesOpen((prev) => !prev)}
                    aria-expanded={isMobileCategoriesOpen}
                  >
                    Category
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isMobileCategoriesOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {isMobileCategoriesOpen ? (
                    <div className="ml-3 space-y-1 border-l pl-3">
                      {NEW_PRODUCT_COLLECTIONS.map((category) => (
                        <Link
                          key={category.id}
                          href={category.href}
                          className={`focus-visible:ring-ring block rounded-lg px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                            activeCollectionId === category.id
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                          }`}
                          onClick={closeAllMenus}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </li>

            {navigationAfterProducts.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`focus-visible:ring-ring block rounded-lg px-3 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                    isNavItemActive(item.href) ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                  onClick={closeAllMenus}
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
