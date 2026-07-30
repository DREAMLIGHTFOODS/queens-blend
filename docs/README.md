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

## 4. Component Library (Planned)

**File**

component-library.md (to be added)

This document will catalog reusable components, their props, variants, and accessibility notes.

---

## 5. Coding Standards (Planned)

**File**

coding-standards.md (to be added)

This document will define implementation conventions and quality rules.

---

## 6. Deployment (Planned)

**File**

deployment.md (to be added)

This document will cover environment setup, release workflow, and production validation checks.

---

# Architecture Decision Records (ADR)

ADR files are planned under:

docs/adr/

When introduced, each ADR should record the decision, context, alternatives, and consequences.

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
