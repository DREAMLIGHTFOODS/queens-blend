import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export const siteConfig = {
  name: "Queen's Blend",

  shortName: "QB",

  description:
    "Premium tea crafted from the finest estates, delivering authentic taste, aroma, and timeless elegance in every cup.",

  url: "https://queensblend.com",

  ogImage: "/images/og-image.jpg",

  author: "Queen's Blend",

  email: "info@queensblend.com",

  phone: "+91-9876543210",

  address: "Darjeeling, West Bengal, India",

  navigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],

  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
  ],

  contact: {
    email: "info@queensblend.com",
    phone: "+91-9876543210",
    address: "Darjeeling, West Bengal, India",
    emailIcon: Mail,
    phoneIcon: Phone,
    addressIcon: MapPin,
  },
};

export type SiteConfig = typeof siteConfig;