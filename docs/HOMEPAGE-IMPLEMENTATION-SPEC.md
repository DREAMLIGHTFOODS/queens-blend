# Homepage Implementation Specification - B2B

**Document Version:** 1.0
**Date:** August 31, 2026
**Status:** Ready for Development

---

## Executive Summary

This document provides exact specifications for the Queen's Blend homepage B2B repositioning. The homepage will maintain 3 existing sections and add 6 new sections to create a comprehensive B2B-focused experience that emphasizes bulk export capabilities, multiple format options, and partnership opportunities.

---

## Homepage Section Breakdown

### Section 1: HERO

**Component:** `Hero.tsx`
**Status:** ✅ **KEEP AS-IS - NO CHANGES**

```
Requirement:
- Keep existing hero component
- No content modifications
- No styling changes
- Remains as currently implemented
```

---

### Section 2: ABOUT PREVIEW SECTION

**Component:** `AboutPreviewSection.tsx`
**Status:** ✅ **UPDATE FOR B2B**

```
Current (B2C):
- Brand story/heritage
- Consumer-focused messaging
- Retail experience focus

Required Changes:
- Title: "Your Trusted Bulk Tea Exporter"
- Focus: Export capability, bulk supply expertise
- Message: Supply premium bulk tea to businesses at scale
- Key Points:
  ├─ Years of export experience
  ├─ Reliable bulk supply capability
  ├─ Multiple format options
  ├─ Quality assurance standards
  └─ Dedicated B2B support

CTA Text: "Learn More About Our Bulk Capabilities" or "Explore Business Solutions"

Character Count: 150-200 words (informative but concise)
Tone: Professional, B2B-oriented
```

---

### Section 3: STATS SECTION

**Component:** `StatsSection.tsx`
**Status:** ✅ **KEEP AS-IS - NO CHANGES**

```
Requirement:
- Keep existing stats section
- Current statistics are B2B-relevant:
  ├─ "50+ Tea Varieties" ✓ (relevant for B2B)
  ├─ "11 Format Options" ✓ (key B2B value prop)
  ├─ Years in business ✓ (trust signal)
  └─ Any other current stats ✓
- No modifications needed
```

---

### Section 4: WHAT WE SUPPLY (NEW)

**Component:** `WhatWeSupplySection.tsx` (NEW COMPONENT)
**Status:** ✅ **NEW - CREATE**

```
Purpose: Immediately communicate all bulk supply options to B2B buyers

Structure:
- Headline: "What We Supply - Bulk Tea for Every Business Need"
- Subheading: "Whether you're a cafe, retailer, brand, or distributor,
              we supply premium bulk tea in your choice of formats"

Content Format: Feature cards/grid (7 items with icons)

Items:
1. "50+ Tea Varieties"
   └─ Single origins + specialty blends available in bulk

2. "Loose Leaf Formats"
   └─ Metal tins (square & round), printed pouches

3. "Tea Bag Formats"
   └─ Single chamber, double chamber, triangular bags

4. "Convenience Formats"
   └─ Tea pods, premix tea (sweetened & unsweetened)

5. "Bulk Packaging"
   └─ Printed boxes, bulk pouches (all sizes 200g - 1kg)

6. "Private Label"
   └─ Custom branding for bulk orders

7. "Export Ready"
   └─ Compliance & international shipping support

Visual Style:
- Each item with icon/image
- Short descriptive text (1-2 lines)
- Professional, clean layout
- Color: Match existing design system

CTA (Optional): Link to /formats page for details
```

---

### Section 5: OUR CAPABILITIES (NEW)

**Component:** `OurCapabilitiesSection.tsx` (NEW COMPONENT)
**Status:** ✅ **NEW - CREATE**

```
Purpose: Showcase key B2B value propositions and differentiators

Structure:
- Headline: "Our Capabilities - Why Partner With Us?"
- Layout: 6 capability cards (2 columns × 3 rows OR 3 columns × 2 rows)

Capability Cards:

1. BULK EXPORT
   Icon: [Export/Ship icon]
   Description: "Export-grade tea with international shipping,
                compliance support, and documentation assistance"

2. FORMAT FLEXIBILITY
   Icon: [Formats icon]
   Description: "11 format options available for every tea variety.
                Mix and match according to your business needs"

3. PRIVATE LABEL
   Icon: [Custom/Branding icon]
   Description: "Custom branding for bulk orders. White label solutions
                with flexible minimum order quantities"

4. CONSISTENT SUPPLY
   Icon: [Quality/Supply icon]
   Description: "Reliable sourcing, rigorous quality assurance,
                and timely delivery every time"

5. COMPETITIVE PRICING
   Icon: [Price icon]
   Description: "Wholesale rates with volume discounts.
                Transparent pricing for bulk orders"

6. DEDICATED SUPPORT
   Icon: [Support/Contact icon]
   Description: "Dedicated B2B team for account management,
                custom solutions, and ongoing support"

Visual Style:
- Each card with icon at top
- Bold title
- 2-3 line description
- Consistent spacing and sizing
- Hover effects for interactivity

Color: Use primary brand colors for icons
```

---

### Section 6: FORMAT OPTIONS (NEW)

**Component:** `FormatOptionsSection.tsx` (NEW COMPONENT)
**Status:** ✅ **NEW - CREATE**

```
Purpose: Showcase all 11 format options and their bulk capabilities
This is a KEY USP - emphasize that ANY tea can be ordered in ANY format

Structure:
- Headline: "Format Options - Flexible Solutions for Your Business"
- Subheading: "Every tea variety available in multiple formats"
- Layout: Grid or carousel showing all 11 formats

11 Formats to Display:

1. Single Chamber Tea Bags
   Sizes: 25, 100
   Use Case: "Ideal for offices, hotels, cafes"
   Bulk: "✓ Available in bulk"

2. Double Chamber Tea Bags
   Sizes: 25, 100
   Use Case: "Premium tea bag option"
   Bulk: "✓ Available in bulk"

3. Triangular Tea Bags
   Sizes: 16, 32
   Use Case: "Premium visual presentation"
   Bulk: "✓ Available in bulk"

4. Tea Pods
   Sizes: 80, 144, 216
   Use Case: "Modern, convenient brewing"
   Bulk: "✓ Available in bulk"

5. Metal Tin Caddy - Square
   Sizes: 100g, 250g
   Use Case: "Premium gifting, retail display"
   Bulk: "✓ Available in bulk"

6. Metal Tin Caddy - Round
   Sizes: 100g, 250g
   Use Case: "Classic premium packaging"
   Bulk: "✓ Available in bulk"

7. Premix Tea
   Sizes: 14g, 22g, 27g
   Variants: Sweetened, Unsweetened
   Use Case: "Ready-to-serve convenience"
   Bulk: "✓ Available in bulk"

8. Printed Box
   Sizes: 200g, 500g, 1kg
   Use Case: "Bulk supply, private label"
   Bulk: "✓ Primary bulk format"

9. Printed Pouch
   Sizes: 250g, 500g, 1kg
   Use Case: "Flexible packaging, branding"
   Bulk: "✓ Primary bulk format"

10. Gift Box Collection
    Types: Festive, Corporate
    Use Case: "B2B gifting, corporate orders"
    Bulk: "✓ Available in bulk"

11. Tea Accessories
    Various items
    Use Case: "Complementary B2B offerings"
    Bulk: "✓ Available"

Visual Style Per Format Card:
- Format name & sizes
- Product image
- Brief description
- Use case bullet points
- "Available for all 50+ tea varieties" badge
- Link/button: "Available for all 50+ teas"

Layout Recommendation:
- Desktop: 5 columns (11 items wrap to 2-3 rows)
- Tablet: 3 columns
- Mobile: Scroll carousel or 2 columns

CTA: "Request Sample Packs" or "Explore All Formats"
```

---

### Section 7: TEA VARIETIES (REPURPOSE EXISTING)

**Component:** `FeaturedProducts.tsx` (REPURPOSED - NOT NEW)
**Status:** ✅ **UPDATE EXISTING - NO NEW COMPONENT NEEDED**

```
Current Component: FeaturedProducts.tsx
Requirement: Repurpose with updated text and badges for B2B context

Structure:
- Headline: "50+ Tea Varieties Available in Bulk"
- Subheading: "From single origins to specialty blends, all available
              in your choice of formats"
- Display: 6-8 featured teas (existing carousel/grid flow)

CHANGES TO EXISTING COMPONENT:

Keep These Elements:
├─ Product images
├─ Tea name
├─ Tea type/family
├─ Tasting notes
└─ Product carousel/grid layout

Add These Elements:
├─ Badge: "Available in [X] formats" (e.g., "Available in 9 formats")
├─ Badge: "Bulk pricing available"
└─ Text note: "All sizes available for bulk orders"

Change These Elements:
├─ CTA Button:
│  FROM: "Add to Cart" (B2C)
│  TO: "Request Quote" (B2B)
└─ Link destination: Link to bulk inquiry form or product page

Text Updates:
├─ Keep tasting notes and brew time (still relevant)
├─ Add format availability count
└─ Add bulk purchasing note

Example Product Card Update:
BEFORE:
├─ Image
├─ "Darjeeling Black"
├─ "Tasting notes: muscatel, floral, bright"
├─ Button: "Add to Cart"

AFTER:
├─ Image
├─ "Darjeeling Black"
├─ "Tasting notes: muscatel, floral, bright"
├─ Badge: "Available in 9 formats"
├─ "Bulk pricing available"
├─ Button: "Request Quote"

Note: This is NOT a new component - simply update the existing
FeaturedProducts.tsx with new text and badge elements
```

---

### Section 8: WHY PARTNER WITH US (NEW)

**Component:** `WhyPartnerWithUsSection.tsx` (NEW COMPONENT)
**Status:** ✅ **NEW - CREATE**

```
Purpose: Provide key reasons for B2B customers to partner with Queen's Blend

Structure:
- Headline: "Why Partner With Queen's Blend?"
- Layout: 8 benefit cards in grid (2×4 or 4×2)

Benefits to Display:

1. SCALE & CAPACITY
   Icon: [Scale/Growth icon]
   Description: "Ability to supply bulk orders of any size, multiple
                formats, and consistent quantities for ongoing partnerships"

2. QUALITY ASSURANCE
   Icon: [Quality/Checkmark icon]
   Description: "Premium estate teas with rigorous quality checks
                and consistent standards across all batches"

3. FORMAT FLEXIBILITY
   Icon: [Formats icon]
   Description: "11 format options per tea variety with no limits
                on customization or mix-and-match ordering"

4. PRIVATE LABEL READY
   Icon: [Branding icon]
   Description: "Custom branding, white label solutions, and flexible
                MOQ for your branded products"

5. COMPETITIVE PRICING
   Icon: [Money/Price icon]
   Description: "Transparent wholesale rates with volume-based discounts
                and long-term partnership benefits"

6. EXPORT EXPERTISE
   Icon: [International/Export icon]
   Description: "Compliance knowledge, international shipping experience,
                and documentation support"

7. RELIABLE SUPPLY
   Icon: [Reliability/Deliver icon]
   Description: "Consistent product availability, on-time delivery
                guarantees, and supply chain stability"

8. BUSINESS FOCUSED
   Icon: [Support icon]
   Description: "Dedicated B2B team, account management, custom solutions,
                and ongoing partnership support"

Visual Style:
- Each card with icon at top
- Bold benefit title (3-4 words)
- 2-3 line detailed description
- Consistent card sizing and spacing
- Professional, clean design
- Subtle hover effects

Color Scheme: Primary brand colors
```

---

### Section 9: BULK INQUIRY CTA (NEW)

**Component:** `BulkInquiryCTASection.tsx` (NEW COMPONENT)
**Status:** ✅ **NEW - CREATE**

```
Purpose: Strong call-to-action for bulk orders and partnership

Structure:
- Headline: "Ready to Partner With Us?"
- Two prominent CTAs or single main CTA

Option A (Two CTAs - Side by Side):
├─ Primary CTA: "Request Bulk Quote"
│  └─ Links to bulk inquiry form (/bulk-inquiry)
│  └─ Background: Primary brand color
│  └─ Size: Large, prominent
└─ Secondary CTA: "Become Our Partner"
   └─ Links to partnership page (/b2b-partner)
   └─ Background: Secondary color or outline style
   └─ Size: Large, prominent

Option B (Single CTA - Centered):
├─ Primary CTA: "Get Your Bulk Pricing Quote Today"
│  └─ Links to bulk inquiry form (/bulk-inquiry)
│  └─ Subtext: "Competitive wholesale pricing for bulk tea orders"
└─ Support: "Questions? Email us at b2b@thequeensblend.com"

Additional Info:
├─ Contact: "b2b@thequeensblend.com"
├─ Optional: Phone number (if available)
└─ Optional: "Response time: Usually within 24 hours"

Visual Style:
- Clear, spacious layout
- Large, readable text
- Prominent buttons with hover effects
- Contact information easy to read
- Mobile-friendly (stack CTAs on mobile)

Spacing:
- Top margin: Separate from previous section
- Button sizing: 60-80px height
- Padding: Generous internal spacing
- Bottom margin: Space before footer
```

---

## Section Order Summary

```
1. Hero (KEEP)
2. AboutPreviewSection (UPDATE)
3. StatsSection (KEEP)
4. WhatWeSupplySection (NEW)
5. OurCapabilitiesSection (NEW)
6. FormatOptionsSection (NEW)
7. FeaturedProducts (REPURPOSE EXISTING)
8. WhyPartnerWithUsSection (NEW)
9. BulkInquiryCTASection (NEW)
```

---

## Component Count

| Type           | Count          | Action                    |
| -------------- | -------------- | ------------------------- |
| Keep as-is     | 2              | No development needed     |
| Update         | 1              | Modify existing component |
| New components | 6              | Develop from scratch      |
| Repurpose      | 1              | Update existing component |
| **TOTAL**      | **9 sections** | **7 development tasks**   |

---

## Development Priority

### Priority 1 (Core B2B Value):

1. UpdateAboutPreviewSection (quick update)
2. WhatWeSupplySection (key USP)
3. FormatOptionsSection (showcase differentiator)
4. BulkInquiryCTASection (conversion)

### Priority 2 (Support Value):

5. OurCapabilitiesSection (trust building)
6. WhyPartnerWithUsSection (partnership angle)
7. Update FeaturedProducts (text + badges)

---

## Design Notes

### Visual Consistency:

- Use existing design system (colors, spacing, typography)
- Icons: Font Awesome or existing icon set
- Cards: Consistent sizing and spacing
- Hover effects: Subtle, professional
- Accessibility: WCAG 2.1 compliant

### Responsive Design:

- Mobile-first approach
- Tablet optimizations
- Desktop layouts
- Touch-friendly CTAs (min 48px height)

### Brand Colors:

- Use primary color for main CTAs
- Use secondary color for supporting elements
- Maintain contrast ratios for accessibility

---

## SEO Metadata (Homepage)

```typescript
Title: "Bulk Tea Exporter & Wholesaler | Premium Wholesale Tea Supplier"

Description: "Leading bulk tea exporter in India. Supply premium Darjeeling,
Assam, and specialty teas in multiple formats. Wholesale pricing, private
label available, export-ready. Contact for bulk quotes."

Keywords: [
  "bulk tea exporter",
  "tea exporter India",
  "wholesale tea supplier",
  "bulk tea supplier",
  "tea exporter west bengal",
  "premium tea exporter",
  // ... (30+ total keywords as per B2B strategy doc)
]

OpenGraph:
- Title: "Bulk Tea Exporter & Wholesaler"
- Description: "Premium bulk tea supply for businesses"
- Image: [B2B-focused hero image]
```

---

## Implementation Checklist

### Phase 1: Foundation

- [ ] Review and approve specifications
- [ ] Create new components
- [ ] Update existing components
- [ ] Set up forms for bulk inquiry

### Phase 2: Development

- [ ] Develop 6 new components
- [ ] Update AboutPreviewSection
- [ ] Update FeaturedProducts
- [ ] Add B2B CTAs and links

### Phase 3: Integration

- [ ] Integrate all sections into homepage
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test all CTAs and links
- [ ] Verify form submissions

### Phase 4: SEO & Content

- [ ] Update page metadata (title, description, keywords)
- [ ] Optimize all text for keywords
- [ ] Add structured data (BreadcrumbList, LocalBusiness)
- [ ] Verify mobile SEO

### Phase 5: Testing

- [ ] Functional testing (all buttons, forms, links)
- [ ] Visual testing (all screen sizes)
- [ ] SEO validation
- [ ] Performance testing
- [ ] Accessibility testing

### Phase 6: Launch

- [ ] Deploy to staging
- [ ] Final review
- [ ] Launch to production
- [ ] Monitor analytics

---

## Notes for Developers

1. **No Breaking Changes**: Keep existing Hero, Stats sections intact
2. **Reuse Components**: Use existing design components where possible
3. **Mobile First**: Ensure all new sections are mobile-responsive
4. **Accessibility**: Follow WCAG 2.1 guidelines
5. **Performance**: Keep component load times minimal
6. **Testing**: Test on real devices, not just browsers

---

**Document prepared for development. Ready to proceed with implementation.**
