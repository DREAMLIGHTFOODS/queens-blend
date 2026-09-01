# Dual-Intent Page Architecture for Queen's Blend

**Date:** August 31, 2026
**Strategy:** Single System, Dual Audiences
**Principle:** "One URL serves both B2C and B2B without friction"

---

## Executive Summary

Instead of maintaining separate B2C and B2B systems, build **shared pages that naturally serve both audiences** through contextual CTAs and progressive disclosure. This approach:

✅ Maintains current B2C functionality (zero breaking changes)
✅ Adds B2B conversion paths without complexity
✅ Improves SEO by consolidating authority
✅ Reduces maintenance overhead
✅ Keeps single product data source
✅ Provides clean UX for both audiences

---

## Core Architecture Model

### How It Works

```
┌─────────────────────────────────────┐
│      Page URL (Single Source)       │
│    e.g., /tea/darjeeling-black      │
└─────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
    B2C CONTENT              B2B CONTENT
  (Existing sections)     (New contextual)
        │                       │
    Product Info          Bulk Supply
    Taste Notes           Custom Options
    Brewing Guide         Private Label
    Reviews               Formats Available
    Tasting Notes         MOQ / Pricing
    [Shop Now] CTA        [Request Quote] CTA
        │                       │
        └───────────┬───────────┘
                    │
            User self-selects
            their journey
```

### Key Principle: No Forced Choice

**Don't ask:** "Are you B2C or B2B?"
**Instead:** Provide two natural conversion paths and let users choose their action.

---

## Homepage Architecture (Example)

Current homepage serves 100% B2C. New approach adds B2B sections **below** B2C content:

```
1. HERO
   ├─ Tagline: "Exceptional Tea. Crafted for Every Moment."
   ├─ Subtext: "Premium tea for tea lovers, hospitality, and businesses"
   └─ CTAs: [Explore Our Teas] [Partner With Us]

2. ABOUT PREVIEW (B2C Focus)
   └─ Keep current B2C heritage messaging

3. STATS SECTION
   └─ Keep current stats (relevant to both)

4. FEATURED PRODUCTS (B2C Focus)
   └─ "Premium Teas for Tea Lovers"
   └─ [Shop Now] CTA

5. FEATURES SECTION (B2C Focus)
   └─ Keep current features

6. CTA SECTION (B2C Focus)
   └─ Keep current CTA

────────────────────────────────────────
NEW SECTIONS ADDED BELOW
────────────────────────────────────────

7. TEA SOLUTIONS FOR BUSINESS (B2B Section - NEW)
   ├─ Headline: "Exceptional Tea for Hotels, Cafés, Restaurants & More"
   ├─ Content: Hotels, Cafés, Restaurants, Retail, Corporate, Distributors
   ├─ Key Value Props: Bulk Supply, Format Flexibility, Private Label
   └─ CTA: [Explore Business Solutions]

8. CUSTOM & PRIVATE LABEL (B2B Section - NEW)
   ├─ Headline: "Your Brand. Your Blend. Your Tea."
   ├─ Content: White label, custom blending, MOQ options
   └─ CTA: [Create Your Custom Blend]

9. WHY PARTNER WITH QUEEN'S BLEND (B2B Section - NEW)
   ├─ Key Benefits: Scale, Quality, Export Expertise, Support
   └─ CTA: [Request a Business Quote]

10. FINAL CTA (Combined - UPDATED)
    ├─ "Let's Talk Tea"
    └─ [Explore Tea] [Request a Business Quote]
```

**Result:** Existing B2C homepage works perfectly. B2B users scroll down to see partnership options.

---

## Product Page Architecture (Example: /tea/darjeeling-black)

### Current Structure (B2C)

```
Hero/Product Image
↓
Product Name & Overview
↓
Taste Profile, Origin, Details
↓
Brewing Instructions
↓
Customer Reviews
↓
Related Products
↓
[Shop Now] CTA
```

### New Structure (Dual-Intent)

```
Hero/Product Image
↓
Product Name & Overview
↓
Taste Profile, Origin, Details
↓
Brewing Instructions
↓
Customer Reviews
↓
Related Products
↓
[Shop Now] CTA           ← B2C path ends here

───────────────────────────── DIVIDER ──────────────────────
            TEA FOR BUSINESS
───────────────────────────────────────────────────────────

Headline: "Darjeeling Black Tea for Your Business"
↓
Available Formats: Tea Bags, Loose Leaf, Custom Packaging
↓
Use Cases: Hotels, Cafés, Restaurants, Retail, Private Label
↓
Key Info: Bulk Supply, Competitive Pricing, MOQ, Export Ready
↓
[Request a Business Quote] CTA     ← B2B path
```

**No changes to B2C path.** B2B content is additive below.

---

## URL Structure (Single Source, Dual Intent)

### Shared Product/Category Pages

```
/                                      (Homepage - Dual intent)
/tea                                   (Tea category - Dual intent)
/tea/darjeeling                        (Darjeeling category - Dual intent)
/tea/darjeeling-black                  (Product page - Dual intent)
/tea/assam                             (Product - Dual intent)
/tea/green-tea                         (Product - Dual intent)
/tea/black-tea                         (Product - Dual intent)
/tea/white-tea                         (Product - Dual intent)
/tea/oolong-tea                        (Product - Dual intent)
/tea/herbal-tea                        (Product - Dual intent)
/tea/flavoured-tea                     (Product - Dual intent)
/tea/tea-bags                          (Format page - Dual intent)
/tea/loose-leaf                        (Format page - Dual intent)
/tea/premix-tea                        (Format page - Dual intent)
/tea/gift-sets                         (Category - Dual intent)

/about                                 (About page - Can add B2B section)
/contact                               (Contact page - Can add B2B inquiry)
/products                              (Product listing - Dual intent)
```

### Specialist B2B Pages (Only for Unique Search Intent)

```
/business                              (B2B landing - Introduction)
/business/horeca                       (Hotels/Restaurants/Cafés - Specialist)
/business/private-label                (Private label - Specialist)
/business/bulk-supply                  (Bulk supply details - Specialist)
/business/custom-blending              (Custom blending - Specialist)
/business/export                       (Export & international - Specialist)
/business/contact                      (B2B inquiry form)
```

**Principle:** Generic product/category pages are dual-intent shared. Only specialist pages are separate B2B.

---

## Component Architecture (No Breaking Changes)

### Homepage Structure (Updated, No Deletions)

```
app/(marketing)/page.tsx

Components Used:
├─ Hero (KEEP - already inclusive)
├─ AboutPreviewSection (KEEP - B2C focused)
├─ StatsSection (KEEP - relevant to both)
├─ FeaturesSection (KEEP - B2C)
├─ FeaturedProducts (KEEP - B2C)
├─ CTASection (KEEP - B2C)
│
├─ TeaSolutionsForBusiness (ADD - B2B section)
├─ CustomPrivateLabelSection (ADD - B2B section)
├─ WhyPartnerSection (ADD - B2B section)
└─ FinalCTA (REPLACE - combine B2C + B2B)
```

**Result:** Existing components untouched. New components added below. Zero breaking changes.

### Product Page Structure (Example: /tea/[slug]/page.tsx)

```
Components Used:
├─ ProductHero (KEEP - shows product image/info)
├─ ProductDetails (KEEP - taste, origin, brewing)
├─ ProductReviews (KEEP - customer reviews)
├─ RelatedProducts (KEEP - suggestions)
├─ ConsumerCTA (KEEP - [Shop Now])
│
├─ ProductForBusinessSection (ADD - formats, use cases)
├─ BusinessCTA (ADD - [Request Quote])
├─ FAQ (KEEP - can serve both)
└─ SimilarProducts (KEEP)
```

**Result:** Existing product page works perfectly. B2B section added below. No changes to B2C experience.

---

## Implementation Strategy (Zero Breaking Changes)

### Phase 1: Planning & Setup (Current)

- [x] Define dual-intent architecture
- [x] Identify pages that need B2B sections
- [x] Plan component structure
- [x] Update SEO strategy for both audiences

### Phase 2: Homepage Enhancement (No Deletions)

- Add 3 new B2B-focused sections below existing content
- Update final CTA to include B2B option
- No changes to existing sections
- Test B2C path still works perfectly

### Phase 3: Product Pages Enhancement (No Deletions)

- Add B2B section below each product page
- Keep all B2C content exactly as-is
- Add [Request Quote] button for B2B path
- Test B2C checkout still works

### Phase 4: Specialist B2B Pages (New Routes)

- Create `/business` routes
- These are genuinely new pages, not replacements
- No conflicts with existing site

### Phase 5: Navigation & Header (Minor Update)

- Add B2B navigation option (if needed)
- Keep existing navigation working
- Header can show "Shop Tea" + "Business Solutions"

---

## SEO Strategy: Dual Audiences, Single URL

### Consumer Intent Keywords (B2C Sections)

```
Primary:
- "buy tea online"
- "premium tea online"
- "Darjeeling tea"
- "Assam tea"
- "green tea"
- "tea bags"
- "tea gifts"
- "loose leaf tea"

Secondary:
- "premium estate tea"
- "specialty tea India"
- "organic tea"
- "tea blends"
- "tea subscription"
- "herbal tea online"
```

**Placement:** Hero, featured products, product descriptions, reviews

### Business Intent Keywords (B2B Sections)

```
Primary:
- "bulk tea supplier"
- "tea exporter India"
- "wholesale tea"
- "tea for hotels"
- "private label tea"
- "bulk tea bags"
- "custom tea blending"

Secondary:
- "tea supplier HORECA"
- "bulk Darjeeling tea"
- "corporate tea gifts"
- "tea for restaurants"
- "tea export"
- "white label tea"
```

**Placement:** B2B sections below B2C, specialist /business pages

### Example: /tea/darjeeling-black (Meta Tags)

```
Title: "Darjeeling Black Tea | Premium Quality | Queen's Blend"
Meta: "Premium Darjeeling black tea online. Single-origin from
       Himalayan estates. Shop premium tea or request bulk supply."
Keywords:
- darjeeling black tea (B2C intent)
- buy darjeeling tea online (B2C intent)
- premium darjeeling tea (B2C intent)
- bulk darjeeling tea (B2B intent)
- darjeeling tea exporter (B2B intent)
- darjeeling tea wholesale (B2B intent)
```

**Result:** One page, both audiences, Google understands topical relevance.

---

## Content Organization (Both Audiences)

### Consumer-Focused Sections (Existing)

- Hero
- Product Overview
- Taste & Origin Details
- Brewing Instructions
- Customer Reviews
- Related Products
- Social Proof
- Trust Signals

### Business-Focused Sections (New - Below B2C Content)

- Formats Available
- Bulk Supply Details
- Custom Options
- Private Label Info
- Pricing & MOQ
- Export & Compliance
- Dedicated Support
- Case Studies / Testimonials

### Shared Sections (Both Benefit)

- About (heritage + reliability)
- Stats (reach, experience, customers)
- FAQs (can address both)
- Newsletter (both audiences welcome)

---

## UX Pattern: Contextual CTAs

### Pattern 1: Clear Separation (Below B2C Content)

```
──────────────────────────
✓ B2C Content Ends Here
──────────────────────────

──────────────────────────
  LOOKING FOR BULK SUPPLY?
──────────────────────────

[Request a Business Quote]
```

### Pattern 2: Inline Options (At Key Points)

```
Reviews Section
     ↓
[Shop Now]  |  [Need Bulk? Request Quote]
```

### Pattern 3: Smart Navigation

```
Header: [Shop Tea]  [Business Solutions]
```

Each links to appropriate section for first-time visitors.

### Pattern 4: Confirmation Flow

```
Product Added to Cart
    ↓
"For Business? Request custom quantities" [→]
```

---

## Data Architecture (Single Source of Truth)

### Product Catalog Structure (Remains Unchanged)

```json
{
  "id": "darjeeling-black-001",
  "name": "Darjeeling Black Tea",
  "slug": "darjeeling-black",

  "b2c": {
    "description": "Premium Darjeeling for tea enthusiasts",
    "shortDescription": "A floral and muscatel Darjeeling",
    "keywords": ["premium tea", "buy darjeeling", "loose leaf"],
    "shopCTA": "Shop Now",
    "images": {
      "heroImage": "/images/darjeeling-hero.jpg",
      "productImage": "/images/darjeeling-product.jpg"
    }
  },

  "b2b": {
    "businessDescription": "Bulk Darjeeling supply for hotels and cafés",
    "keywords": ["bulk tea supplier", "darjeeling wholesale"],
    "formats": ["tea-bags", "loose-leaf", "custom"],
    "minimumOrderQuantity": "10kg",
    "businessCTA": "Request Quote",
    "useCases": ["hotels", "restaurants", "retail"]
  },

  "shared": {
    "tastingNotes": "Muscatel, floral, bright",
    "origin": "Darjeeling, India",
    "brewTime": "3-4 minutes",
    "temperature": "85-90°C"
  }
}
```

**Key Insight:** Single product record serves both audiences. Metadata separated by intent.

---

## Implementation Checklist

### No Breaking Changes

- [x] Keep all existing pages exactly as-is
- [x] Keep all existing components
- [x] Keep all existing routes
- [x] Keep current checkout flow
- [x] Keep current product listing

### Homepage Addition

- [ ] Add TeaSolutionsForBusiness section component
- [ ] Add CustomPrivateLabelSection component
- [ ] Add WhyPartnerSection component
- [ ] Update final CTA to include B2B option
- [ ] Test B2C user flow unchanged

### Product Pages Addition

- [ ] Add "For Business" section below B2C content
- [ ] Add format availability info
- [ ] Add [Request Quote] CTA
- [ ] Add use case labels
- [ ] Test product checkout still works

### Data Enhancement

- [ ] Add B2B metadata to product catalog
- [ ] Add business keywords to each product
- [ ] Add format availability mapping
- [ ] Add use case categories

### SEO Optimization

- [ ] Review metadata for dual-intent keywords
- [ ] Update descriptions for both audiences
- [ ] Create specialist /business pages for unique searches
- [ ] Submit updated sitemap to Google
- [ ] Monitor search rankings for both keywords

---

## Success Metrics

### B2C Metrics (Should Improve or Stay Same)

- E-commerce conversion rate
- Average order value
- Product page bounce rate
- Time on site (B2C users)
- Shopping cart completion

### B2B Metrics (New)

- Quote request submissions
- B2B lead quality
- Business inquiry response rate
- B2B conversion rate
- Partnership inquiries

### Shared Metrics

- Overall traffic (should increase)
- SEO rankings (consolidation benefit)
- Page authority
- Bounce rate (track separately)

---

## Final Architecture Diagram

```
┌────────────────────────────────────────┐
│      QUEEN'S BLEND WEBSITE             │
│      Dual-Intent Architecture          │
└────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
    HOMEPAGE     PRODUCTS     SPECIALIST
        │           │           │
        │       ┌───┴───┐       │
        │       │       │       │
       B2C     B2C     B2B    /business/
        +      +      +       horeca
       B2B     B2B     -      private-label
                              custom-blend
                              export
```

---

## Key Principles (Remember)

1. ✅ **Zero Breaking Changes** - Existing B2C works perfectly
2. ✅ **Single Data Source** - One product catalog, dual metadata
3. ✅ **Natural Segmentation** - No forced choice, contextual CTAs
4. ✅ **Better SEO** - One authoritative page per topic
5. ✅ **Clean UX** - Users naturally find their path
6. ✅ **Maintainable** - Clear component structure
7. ✅ **Scalable** - Easy to add new content for either audience

---

**Status:** Architecture validated. Ready for implementation without breaking changes.
