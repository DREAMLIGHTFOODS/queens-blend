# Queen's Blend Documentation

Welcome to the official documentation for the **Queen's Blend** website.

This directory contains the architectural decisions, design system, coding standards, and implementation guidelines that define the project.

> This documentation is the single source of truth for the project. All new development should follow these documents before introducing new patterns or structures.

---

# Documentation Structure

## 1. Blueprint

**File**

blueprint.md

**Purpose**

The master document for the project.

Contains:

- Product vision
- Technical stack
- Design philosophy
- Architecture overview
- Development roadmap
- Implementation phases

---

## 2. Architecture

**File**

architecture.md

Defines:

- Folder structure
- Project organization
- Component hierarchy
- Import conventions
- Naming conventions
- File responsibilities

---

## 3. Design System

**File**

design-system.md

Defines:

- Brand identity
- Color system
- OKLCH tokens
- Typography
- Spacing
- Radius
- Shadows
- Motion
- Responsive behavior
- Accessibility rules

---

## 4. Component Library

**File**

component-library.md

Documents every reusable component.

Examples:

- Container
- Section
- Surface
- Stack
- Grid
- Button
- Heading
- Text
- Hero
- Tea Card
- CTA
- Footer

Each component includes:

- Purpose
- Props
- Variants
- Usage
- Accessibility notes

---

## 5. Coding Standards

**File**

coding-standards.md

Defines:

- TypeScript conventions
- React patterns
- Next.js conventions
- Tailwind CSS usage
- File naming
- Import ordering
- Folder organization
- Performance guidelines

---

## 6. Deployment

**File**

deployment.md

Contains:

- Environment variables
- Build process
- Deployment checklist
- Performance verification
- SEO verification
- Accessibility verification

---

# Architecture Decision Records (ADR)

Located in:

docs/adr/

Each ADR documents an important architectural decision.

Example:

0001-nextjs-app-router.md

contains:

- Decision
- Context
- Alternatives
- Consequences

These records explain _why_ decisions were made, helping future contributors understand the reasoning behind the architecture.

---

# Development Workflow

Every feature should follow this sequence:

Blueprint
↓

Design System
↓

Foundation

↓

Primitive Components

↓

Composite Components

↓

Page Sections

↓

Pages

---

# Project Principles

Queen's Blend follows these principles:

- Premium user experience
- Accessibility by default
- Performance first
- Server Components by default
- Reusable component architecture
- Consistent design language
- Maintainable codebase

---

# Technology Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- next-themes

---

# Documentation Maintenance

Documentation should evolve with the project.

When introducing a new architectural pattern or reusable component:

1. Update the relevant documentation.
2. Document the rationale if it changes an architectural decision.
3. Keep examples aligned with the implementation.

The documentation should always reflect the current state of the project.
