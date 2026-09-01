export const SITE = {
  name: "The Queen's Blend",
  shortName: "Queen's Blend",
  company: "Dreamlight Foods",
  legalName: "Dreamlight Foods",
  tagline: "Premium Estate Tea Collection",
  description:
    "Discover premium estate-grown teas, signature blends, and tea gifting collections from Queen's Blend. Crafted with heritage, flavour, and care for every cup.",

  url: "https://thequeensblend.com",
  locale: "en-IN",
  currency: "INR",

  businessType: "Tea brand and specialty tea retailer",
  industry: "Tea and beverages",
  region: "Kolkata, West Bengal",
  country: "India",

  address: {
    line1: "26/3B Hindustan Park",
    city: "Kolkata",
    state: "West Bengal",
    postalCode: "700 029",
    country: "India",
    full: "26/3B Hindustan Park, Kolkata - 700 029, West Bengal, India",
  },

  phone: "+91 33 3151-5892",
  phoneHref: "+913331515892",
  email: "info@thequeensblend.com",
  supportEmail: "info@thequeensblend.com",

  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://x.com",
    linkedin: "https://linkedin.com",
  },

  logo: "/images/logos/Queens_Blennd_Logo.png",
  ogImage: "/images/og/og-image.png",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d921.4034815258897!2d88.36480776951718!3d22.518663937573024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277006bb0c4fd%3A0xa04853c297749dd4!2sTHE%20QUEEN'S%20BLEND!5e0!3m2!1sen!2sin!4v1787916431859!5m2!1sen!2sin",

  copyright: `© ${new Date().getFullYear()} The Queen's Blend. All rights reserved.`,
} as const;

export type SiteConfig = typeof SITE;
