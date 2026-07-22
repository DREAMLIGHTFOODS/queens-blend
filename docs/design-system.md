# Queen's Blend Design System

> **Version:** 1.0
> **Status:** Approved

---

# Purpose

The Queen's Blend Design System provides a consistent visual and interaction language for the website.

It ensures that every page, component, and experience feels like part of a single premium brand.

---

# Design Principles

Every interface should feel:

- Elegant
- Premium
- Natural
- Calm
- Spacious
- Timeless
- Trustworthy

Avoid unnecessary decoration.

Emphasize clarity and refinement.

---

# Brand Identity

## Primary Colors

Emerald Green

Used for:

- Primary buttons
- Navigation
- Links
- Highlights

Gold

Used for:

- Premium accents
- Dividers
- Icons
- Decorative details

Ivory

Primary page background.

Tea Brown

Supporting accents.

Charcoal

Primary text.

---

# Color Philosophy

Instead of assigning colors directly to components, use semantic tokens.

Example:

Background

Foreground

Primary

Secondary

Accent

Muted

Border

Ring

Destructive

Success

Warning

Info

Components should never know actual color values.

---

# OKLCH Token Structure

```
Brand
↓

Semantic Tokens

↓

Theme Tokens

↓

Components
```

No component should reference a raw color.

---

# Product Palette

Each tea family has a supporting accent.

Examples:

- Darjeeling
- Assam
- Nilgiri
- Green Tea
- Oolong
- White Tea
- Herbal
- Chamomile
- Mint
- Rose
- Saffron

The palette should be used sparingly to distinguish products while preserving overall brand consistency.

---

# Typography

## Font Families

Primary

Geist

Monospace

Geist Mono

---

# Type Scale

Display XL

Display

H1

H2

H3

H4

Lead

Body Large

Body

Small

Caption

Overline

Each level will have predefined:

- Size
- Weight
- Line height
- Letter spacing

---

# Spacing System

Spacing follows a consistent scale.

```
1
2
4
6
8
12
16
20
24
32
40
48
56
64
80
96
128
```

Avoid arbitrary spacing values.

---

# Layout

Container Width

Content Width

Section Padding

Grid Gap

Column Gap

Row Gap

Header Height

Footer Spacing

---

# Radius

Tokens:

```
xs
sm
md
lg
xl
2xl
full
```

Rounded corners should remain soft and consistent.

---

# Elevation

Levels:

```
0
1
2
3
4
5
```

Higher elevation indicates increased visual importance.

---

# Borders

Use subtle borders.

Avoid heavy outlines.

Borders should primarily define structure rather than decoration.

---

# Shadows

Shadows should be soft and natural.

Avoid dramatic drop shadows.

Prefer layered elevation rather than blur-heavy effects.

---

# Motion Philosophy

Motion should support understanding.

Animations should never distract from content.

---

# Motion Tokens

Fast

Normal

Slow

Enter

Exit

Hover

Press

Focus

---

# Animation Principles

Use motion for:

- Navigation
- Page transitions
- Hero elements
- Cards
- Buttons
- Modals

Avoid continuous or unnecessary animation.

---

# Responsive Design

Support:

- Mobile
- Tablet
- Laptop
- Desktop
- Wide screens

Layouts should adapt naturally without redesigning components.

---

# Accessibility

Target WCAG 2.2 AA where practical.

Requirements:

- Keyboard navigation
- Visible focus states
- Reduced motion support
- Sufficient contrast
- Semantic HTML
- Screen reader compatibility

---

# Icons

Use Lucide React.

Guidelines:

- Consistent stroke width
- Appropriate sizing
- Decorative icons hidden from assistive technologies
- Informative icons accompanied by accessible labels where needed

---

# Imagery

Preferred imagery:

- Tea estates
- Brewing rituals
- Product packaging
- Ingredients
- Lifestyle scenes

Images should feel authentic and high quality.

---

# Component Philosophy

Every component should:

- Use design tokens
- Be responsive
- Be reusable
- Be accessible
- Support light and dark themes
- Avoid page-specific styling

---

# Button Guidelines

Variants:

- Primary
- Secondary
- Outline
- Ghost
- Link

Sizes:

- Small
- Medium
- Large

States:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading

---

# Card Guidelines

Cards should:

- Use consistent padding
- Use shared radius tokens
- Use shared elevation tokens
- Avoid excessive decoration

---

# Forms

Inputs should:

- Be easy to scan
- Clearly indicate focus
- Provide accessible labels
- Display validation messages consistently

---

# Design Consistency Checklist

Before shipping a component, verify:

- Uses design tokens
- Matches typography scale
- Uses spacing scale
- Supports dark mode
- Is responsive
- Is keyboard accessible
- Meets accessibility requirements
- Avoids hardcoded values
- Uses shared components where possible

---

# Guiding Principle

Every page should feel like it belongs to the same carefully crafted brand experience.

Consistency is more valuable than novelty.
