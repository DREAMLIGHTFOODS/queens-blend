/**
 * ============================================================================
 * Queen's Blend
 * File: components/about/AboutHero.tsx
 * Purpose: Hero section for About page
 * ============================================================================
 */

"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const ABOUT_HERO_BANNERS = [
  "/images/hero/AboutUs_Banner_Origin.png",
  "/images/hero/AboutUs_Banner_Plucking.png",
  "/images/hero/AboutUs_Banner_Crafting.png",
  "/images/hero/AboutUs_Banner_Blending.png",
  "/images/hero/AboutUs_Banner_Brewing.png",
];

export function AboutHero() {
  return (
    <section className="relative -mt-24 h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={900}
        className="absolute inset-0 z-0 h-full w-full"
      >
        {ABOUT_HERO_BANNERS.map((banner) => (
          <SwiperSlide key={banner}>
            <div className="relative h-screen w-full">
              <Image
                src={banner}
                alt="Queen's Blend About banner"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="absolute inset-0 z-10 bg-black/40" aria-hidden="true" /> */}

      {/* <Container size="xl" className="relative z-20 flex h-full items-center">
        <Stack gap="lg" align="center" className="text-center">
          <div className="reveal-up inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs tracking-[0.16em] text-white uppercase backdrop-blur-sm">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Our Story
          </div>

          <h1 className="reveal-up stagger-1 font-(family-name:--font-heading) text-4xl leading-tight tracking-tight text-balance text-white md:text-6xl">
            A Heritage of Craft,
            <span className="text-secondary block">Steeped With Intention</span>
          </h1>

          <p className="reveal-up stagger-2 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Queen&apos;s Blend was built to preserve provenance, honor estate growers, and turn tea
            drinking into a calm, meaningful ritual.
          </p>

          <div className="reveal-up stagger-3 inline-flex items-center gap-2 text-sm text-white/85">
            <Leaf className="text-secondary h-4 w-4" aria-hidden="true" />
            Sourced directly from trusted estates across India and beyond
          </div>
        </Stack>
      </Container> */}
    </section>
  );
}
