/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/Hero.tsx
 * Purpose: Landing page hero section with compelling headline and CTA
 * ============================================================================
 */

export function Hero() {
  return (
    <section className="relative -mt-24 h-screen min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/og/og-image.png"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/Queen's blend Banner Video.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
