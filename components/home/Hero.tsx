/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/Hero.tsx
 * Purpose: Landing page hero section with compelling headline and CTA
 * ============================================================================
 */

export function Hero() {
  return (
    <section className="relative -mt-20 h-screen min-h-screen w-full overflow-hidden">
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

      {/* Atmospheric overlays */}
      {/* <div className="reveal-fade absolute inset-0 bg-[linear-gradient(120deg,color-mix(in_oklch,var(--background)_12%,transparent),color-mix(in_oklch,var(--primary)_26%,transparent))]" />
      <div className="reveal-fade stagger-1 absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,color-mix(in_oklch,var(--secondary)_44%,transparent),transparent_48%)]" />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/30 to-black/35" /> */}

      {/* <Container
        size="2xl"
        className="relative z-10 flex min-h-[92vh] items-end py-16 md:items-center"
      >
        <div className="max-w-3xl space-y-8 text-white md:space-y-10">
          <p className="reveal-up text-xs tracking-[0.22em] text-white/85 uppercase">
            Estate Crafted Since 1988
          </p>

          <h1 className="reveal-up stagger-1 font-(family-name:--font-heading) text-5xl leading-[0.95] tracking-tight text-balance md:text-6xl lg:text-7xl">
            A Quiet Ritual of
            <span className="text-secondary block">Luxury Tea</span>
          </h1>

          <p className="reveal-up stagger-2 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Discover rare estate leaves, hand-finished blends, and a tasting experience shaped by
            craft, provenance, and patience.
          </p>

          <div className="reveal-up stagger-3 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/products">Explore Collections</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/60 bg-white/10 px-8 text-white hover:bg-white/20"
            >
              <Link href="/tea-guide">Read The Tea Guide</Link>
            </Button>
          </div>

          <div className="reveal-up stagger-4 grid max-w-2xl grid-cols-2 gap-3 border-t border-white/30 pt-6 text-sm md:grid-cols-4">
            <div>
              <p className="text-xl font-semibold">40+</p>
              <p className="text-white/75">Single-estate teas</p>
            </div>
            <div>
              <p className="text-xl font-semibold">12</p>
              <p className="text-white/75">Tea regions</p>
            </div>
            <div>
              <p className="text-xl font-semibold">100%</p>
              <p className="text-white/75">Small-batch packed</p>
            </div>
            <div>
              <p className="text-xl font-semibold">24h</p>
              <p className="text-white/75">Dispatch promise</p>
            </div>
          </div>
        </div>
      </Container> */}
    </section>
  );
}
