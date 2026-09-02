/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/Hero.tsx
 * Purpose: Landing page hero section with compelling headline and CTA
 * ============================================================================
 */

"use client";

import Image from "next/image";
import { useState } from "react";

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative -mt-24 h-screen min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        onPlaying={() => setIsPlaying(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <source src="/videos/hero-banner.mp4" type="video/mp4" />
      </video>
      {/* Keep poster visible until playback starts to avoid hard flicker. */}
      <Image
        src="/images/og/og-image.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        priority
        className={`pointer-events-none object-cover transition-opacity duration-500 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />
    </section>
  );
}
