# Queen's Blend Architecture

> **Version:** 1.0
> **Status:** Approved

---

# Purpose

This document defines the architecture of the Queen's Blend codebase.

The primary goals are:

- Predictability
- Maintainability
- Scalability
- Reusability
- Consistency

Every directory has a single, clearly defined responsibility.

---

# High-Level Architecture

```
Browser
    │
    ▼
Next.js App Router
    │
    ▼
Pages
    │
    ▼
Page Sections
    │
    ▼
Reusable Components
    │
    ▼
Design Tokens
```

The application follows a layered architecture where each layer depends only on the layer beneath it.

---

# Directory Structure

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

---

# app/

The `app/` directory contains routing and page composition.

Responsibilities:

- Routes
- Layouts
- Metadata
- API routes
- Error pages

Do **not** place reusable UI components here.

Example:

```
app/
├── (marketing)/
├── api/
├── layout.tsx
├── globals.css
├── robots.ts
├── sitemap.ts
└── not-found.tsx
```

---

# components/

Contains reusable UI.

```
components/
├── ui/
├── layout/
├── typography/
├── forms/
├── marketing/
├── product/
├── common/
├── animations/
└── providers/
```

### Rules

- One component per file
- Named exports
- No business logic
- Reusable by design
- Prefer composition over inheritance

---

# config/

Application configuration.

```
config/
├── animations.ts
├── contact.ts
├── navigation.ts
├── products.ts
├── seo.ts
├── site.ts
├── social.ts
└── theme.ts
```

Configuration should not be duplicated throughout the application.

---

# hooks/

Reusable React hooks.

Example:

```
useBreakpoint.ts
useIntersection.ts
useMediaQuery.ts
useMounted.ts
useScroll.ts
```

Rules:

- One hook per file
- Prefix with `use`
- Keep hooks focused on a single responsibility

---

# lib/

Shared utilities and helpers.

```
helpers.ts
constants.ts
utils.ts
validators.ts
```

No UI should live here.

---

# styles/

Global styling only.

```
tokens.css
base.css
utilities.css
animations.css
```

Component-specific CSS files are not used.

---

# public/

Production assets.

```
public/
├── favicon/
├── icons/
├── images/
├── logos/
├── og/
└── products/
```

Assets here are served directly by Next.js.

---

# design/

Source design assets.

Examples:

```
design/
├── packaging/
├── mockups/
├── hero/
├── illustrations/
├── tea-estates/
├── logos/
└── references/
```

These files are not served directly to users.

---

# docs/

Project documentation.

Contains:

- Vision
- Blueprint
- Architecture
- Design System
- ADRs

---

# types/

Shared TypeScript types.

```
common.ts
navigation.ts
product.ts
seo.ts
theme.ts
index.ts
```

Avoid redefining the same interfaces across the project.

---

# Component Hierarchy

```
Tokens
    ↓
Primitive Components
    ↓
Composite Components
    ↓
Page Sections
    ↓
Pages
```

---

# Import Rules

Allowed dependencies:

```
Pages
    ↓
Sections
    ↓
Components
    ↓
Hooks
    ↓
Config / Lib / Types
```

Lower layers must never import higher layers.

Example:

✅ `Hero` → `Button`

❌ `Button` → `Hero`

---

# Naming Conventions

Components:

```
ProductCard.tsx
Hero.tsx
Footer.tsx
```

Hooks:

```
useScroll.ts
useTheme.ts
```

Types:

```
product.ts
theme.ts
```

Config:

```
site.ts
navigation.ts
```

---

# Component Guidelines

A component should:

- Have one responsibility
- Be reusable
- Be typed
- Be accessible
- Accept only the props it needs
- Avoid hidden side effects

---

# Styling Guidelines

- Tailwind CSS v4
- Design tokens
- OKLCH color system
- Shared utility classes
- No inline styles
- No CSS Modules
- No component CSS files

---

# State Management

Use the simplest solution that fits:

1. Local component state
2. Context for shared UI state
3. Server data via Next.js

Avoid introducing global state libraries unless the application requirements justify them.

---

# Performance

Prefer:

- Server Components
- Static rendering where appropriate
- Optimized images
- Lazy loading
- Minimal client-side JavaScript

---

# Accessibility

Every feature should:

- Be keyboard accessible
- Support screen readers
- Respect reduced motion
- Use semantic HTML
- Maintain accessible color contrast

---

# Definition of a Good Component

A good component is:

- Reusable
- Predictable
- Accessible
- Typed
- Well documented
- Easy to test
- Independent of page-specific logic
