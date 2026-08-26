/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/StatsSection.tsx
 * Purpose: Share key brand milestones on the homepage
 * ============================================================================
 */

"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/core/layout/Container";
import { Grid } from "@/components/core/layout/Grid";
import { Surface } from "@/components/core/layout/Surface";

const stats = [
  { target: 10, label: "Countries" },
  { target: 150, label: "Blends" },
  { target: 100, label: "Clients" },
  { target: 20, label: "Years of Experience" },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let frameId = 0;

    const animate = () => {
      const startTime = performance.now();
      const duration = 1400;

      cancelAnimationFrame(frameId);

      const update = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setValues(stats.map((stat) => Math.round(stat.target * easedProgress)));

        if (progress < 1) {
          frameId = requestAnimationFrame(update);
        }
      };

      frameId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        cancelAnimationFrame(frameId);

        if (!entry.isIntersecting) {
          setValues(stats.map(() => 0));
          return;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValues(stats.map((stat) => stat.target));
          return;
        }

        setValues(stats.map(() => 0));
        animate();
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary relative w-full overflow-hidden py-16 md:py-20">
      <div
        className="bg-ring/15 pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <Container size="2xl">
        <div className="relative">
          <p className="text-ring mx-auto mb-8 w-fit text-center text-xs tracking-[0.24em] uppercase">
            Our Reach
          </p>
          <Grid columns={4} gap="md" minItemWidth="180px">
            {stats.map((stat, index) => (
              <Surface
                key={stat.label}
                className={`bg-secondary text-secondary-foreground border-ring reveal-up rounded-xl border p-6 text-center stagger-${Math.min(index + 1, 6)}`}
              >
                <p className="text-primary font-sans text-4xl leading-none font-semibold tracking-tight md:text-5xl">
                  {values[index]}+
                </p>
                <p className="text-secondary-foreground/80 mt-3 text-xs tracking-[0.18em] uppercase">
                  {stat.label}
                </p>
              </Surface>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
}
