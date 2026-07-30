/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/Hero.tsx
 * Purpose: Landing page hero section with compelling headline and CTA
 * ============================================================================
 */

export function Hero() {
  return (
    <section className="from-background via-background to-muted relative -mt-20 h-screen w-full overflow-hidden bg-linear-to-br py-24 md:py-32 lg:py-40">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/Queen's blend Banner Video.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
