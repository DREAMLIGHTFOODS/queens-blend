# Queen's Blend Blueprint v1.0

> **Status:** Approved
> **Version:** 1.0
> **Last Updated:** July 2026

---

# Purpose

This blueprint defines the technical, architectural, and design direction for the Queen's Blend website.

Every implementation decision should align with this document.

The goals are:

- Maintainability
- Scalability
- Accessibility
- Performance
- Premium user experience
- Consistent design language

---

# Project Goals

The website should:

- Present Queen's Blend as a premium tea brand
- Educate visitors about tea
- Showcase products beautifully
- Build trust
- Be extremely fast
- Scale easily as the business grows

---

# Technology Stack

## Framework

- Next.js 16 (App Router)

## Language

- TypeScript (Strict Mode)

## UI

- React 19
- Tailwind CSS v4
- shadcn/ui

## Animation

- Framer Motion

## Theme

- next-themes

## Icons

- Lucide React

---

# Core Principles

## 1. Server Components First

Every component should be a Server Component unless client-side interactivity is required.

Benefits:

- Smaller JavaScript bundles
- Faster page loads
- Better SEO

---

## 2. Composition Over Inheritance

Components should be built from small reusable primitives.

Example hierarchy:

Tokens
↓

Primitive Components
↓

Composite Components
↓

Page Sections
↓

Pages

---

## 3. Configuration Over Hardcoding

Business information belongs in `config/`.

Examples:

- Navigation
- Contact details
- Social links
- SEO defaults
- Product metadata

---

## 4. Design Tokens

Colors, spacing, typography, shadows, radius, and motion should come from shared design tokens.

Avoid hardcoded values in components.

---

# Project Structure

```
app/
components/
config/
hooks/
lib/
public/
styles/
types/
docs/
design/
```

Each directory has a single responsibility.

---

# Styling Architecture

```
app/globals.css
        │
        ▼
styles/tokens.css
        ▼
styles/base.css
        ▼
styles/utilities.css
        ▼
styles/animations.css
        ▼
React Components
```

---

# Component Layers

## Primitive

- Container
- Section
- Stack
- Cluster
- Grid
- Surface
- Heading
- Text
- Button

---

## Layout

- Header
- Navigation
- Footer
- PageHeader

---

## Marketing

- Hero
- CTA
- Features
- Timeline
- Testimonials
- FAQ

---

## Product

- Tea Card
- Product Grid
- Product Hero
- Brewing Guide
- Product Gallery

---

# Folder Responsibilities

## app/

Routing and page composition only.

---

## components/

Reusable UI only.

---

## config/

Application configuration and business metadata.

---

## lib/

Utilities, helpers, and shared logic.

---

## hooks/

Reusable React hooks.

---

## styles/

Global styling foundation.

---

## public/

Production-ready assets.

---

## design/

Source design assets and working files.

---

## docs/

Project documentation.

---

# Performance Goals

Target:

- Lighthouse Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

Core Web Vitals:

- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

---

# Accessibility Goals

The project should:

- Support keyboard navigation
- Respect reduced motion
- Provide meaningful alt text
- Maintain accessible color contrast
- Use semantic HTML
- Follow WCAG 2.2 AA where practical

---

# SEO Goals

Every page should include:

- Title
- Description
- Open Graph metadata
- Twitter Card metadata
- Canonical URL
- Structured Data where appropriate

Additional deliverables:

- robots.ts
- sitemap.ts

---

# Development Workflow

1. Plan
2. Design
3. Implement
4. Review
5. Optimize
6. Document

No architectural changes should be introduced without updating the relevant documentation.

---

# Definition of Done

A feature is complete only when it:

- Meets the design system
- Is responsive
- Is accessible
- Passes TypeScript checks
- Passes ESLint
- Uses reusable components
- Avoids hardcoded values
- Includes appropriate documentation if introducing a new pattern

---

# Future Expansion

The architecture should support:

- New tea collections
- Seasonal campaigns
- Tea Guide articles
- Multi-language support
- E-commerce integration (if required in the future)
- Internationalization
- Analytics
- CMS integration

These capabilities should not require major architectural changes.

---

# Guiding Principle

> Build a timeless, maintainable, and elegant digital experience that reflects the quality of Queen's Blend products while remaining simple for future developers to extend.
