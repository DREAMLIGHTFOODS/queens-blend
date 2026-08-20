/**
 * ============================================================================
 * Queen's Blend
 * File: components/products/category/CategoryHero.tsx
 * Purpose: Hero section for category pages
 * ============================================================================
 */

"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { TEA_COLLECTIONS, type TeaCollectionId } from "@/data/products";

type HeroCategory = {
  id: TeaCollectionId;
  name: string;
  video: string;
};

const HERO_VIDEO = "/videos/Queen's blend Banner Video.mp4";

const HERO_CATEGORIES: HeroCategory[] = TEA_COLLECTIONS.map((collection) => ({
  id: collection.id,
  name: collection.name,
  video: `/videos/${collection.id}.mp4`,
}));

const HERO_INITIAL_CENTER_WIDTH = 320;
const HERO_INITIAL_CENTER_HEIGHT = 460;
const HERO_INITIAL_SIDE_WIDTH = 260;
const HERO_INITIAL_SIDE_HEIGHT = 405;

const HERO_INITIAL_CENTER_RADIUS = HERO_INITIAL_CENTER_WIDTH / 2;
const HERO_INITIAL_SIDE_RADIUS = HERO_INITIAL_SIDE_WIDTH / 2;
const SIDE_TO_CENTER_HEIGHT_SCALE = HERO_INITIAL_CENTER_HEIGHT / HERO_INITIAL_SIDE_HEIGHT;
const ACTIVE_CATEGORY_NAME_CLASS =
  "w-[min(80vw,1320px)] whitespace-nowrap text-center font-(family-name:--font-heading) text-[clamp(6rem,20vw,18rem)] font-normal leading-none tracking-tight antialiased";

export function CategoryHero({ collectionId }: { collectionId: TeaCollectionId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const activeIndex = useMemo(() => {
    const resolvedIndex = HERO_CATEGORIES.findIndex((category) => category.id === collectionId);
    return resolvedIndex >= 0 ? resolvedIndex : 0;
  }, [collectionId]);
  const [isLeftFocused, setIsLeftFocused] = useState(false);
  const [isRightFocused, setIsRightFocused] = useState(false);
  const [floatingLabel, setFloatingLabel] = useState({
    visible: false,
    text: "",
    x: HERO_INITIAL_CENTER_WIDTH / 2,
    y: HERO_INITIAL_CENTER_HEIGHT / 2,
  });
  const shouldReduceMotion = useReducedMotion();

  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

  const updateFloatingLabelFromEvent = (
    event: React.MouseEvent<HTMLButtonElement>,
    categoryName: string,
  ) => {
    if (!stickyRef.current) {
      return;
    }

    const stickyRect = stickyRef.current.getBoundingClientRect();
    const x = clamp(event.clientX - stickyRect.left, 56, stickyRect.width - 56);
    const y = clamp(event.clientY - stickyRect.top, 56, stickyRect.height - 56);

    setFloatingLabel({ visible: true, text: categoryName, x, y });
  };

  const updateFloatingLabelFromElement = (element: HTMLElement, categoryName: string) => {
    if (!stickyRef.current) {
      return;
    }

    const stickyRect = stickyRef.current.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const x = clamp(rect.left - stickyRect.left + rect.width / 2, 56, stickyRect.width - 56);
    const y = clamp(rect.top - stickyRect.top + rect.height / 2, 56, stickyRect.height - 56);

    setFloatingLabel({ visible: true, text: categoryName, x, y });
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const centerWidthRaw = useTransform(
    scrollYProgress,
    [0, 0.28, 0.62, 1],
    [HERO_INITIAL_CENTER_WIDTH, HERO_INITIAL_CENTER_WIDTH, 1040, 1420],
  );
  const centerHeightRaw = useTransform(
    scrollYProgress,
    [0, 0.28, 0.62, 1],
    [HERO_INITIAL_CENTER_HEIGHT, 900, 900, 900],
  );
  const centerRadiusRaw = useTransform(
    scrollYProgress,
    [0, 0.28, 0.62, 1],
    [HERO_INITIAL_CENTER_RADIUS, HERO_INITIAL_CENTER_RADIUS, 74, 28],
  );
  const centerYRaw = useTransform(scrollYProgress, [0, 1], [0, -110]);

  const sideWidthRaw = useTransform(
    scrollYProgress,
    [0, 0.48, 0.86, 1],
    [HERO_INITIAL_SIDE_WIDTH, 244, 130, 10],
  );
  const sideHeightRaw = useTransform(
    scrollYProgress,
    [0, 0.48, 0.86, 1],
    [HERO_INITIAL_SIDE_HEIGHT, 380, 210, 16],
  );
  const sideRadiusRaw = useTransform(
    scrollYProgress,
    [0, 0.48, 0.86, 1],
    [HERO_INITIAL_SIDE_RADIUS, 122, 65, 8],
  );
  const sideYRaw = useTransform(scrollYProgress, [0, 1], [0, -470]);

  const cueOpacityRaw = useTransform(scrollYProgress, [0, 0.62, 0.78], [1, 1, 0]);
  const cueYRaw = useTransform(scrollYProgress, [0, 0.78], [0, -34]);
  const cueColor = useTransform(scrollYProgress, [0, 0.01], ["#000000", "#ffffff"]);

  const centerWidth = useSpring(centerWidthRaw, { stiffness: 132, damping: 24, mass: 0.28 });
  const centerHeight = useSpring(centerHeightRaw, { stiffness: 132, damping: 24, mass: 0.28 });
  const centerRadius = useSpring(centerRadiusRaw, { stiffness: 136, damping: 24, mass: 0.26 });
  const centerY = useSpring(centerYRaw, { stiffness: 110, damping: 24, mass: 0.3 });

  const sideWidth = useSpring(sideWidthRaw, { stiffness: 96, damping: 24, mass: 0.34 });
  const sideHeight = useSpring(sideHeightRaw, { stiffness: 96, damping: 24, mass: 0.34 });
  const sideRadius = useSpring(sideRadiusRaw, { stiffness: 96, damping: 24, mass: 0.34 });
  const sideY = useSpring(sideYRaw, { stiffness: 92, damping: 22, mass: 0.34 });

  const cueOpacity = useSpring(cueOpacityRaw, { stiffness: 140, damping: 28, mass: 0.2 });
  const cueY = useSpring(cueYRaw, { stiffness: 140, damping: 28, mass: 0.2 });

  const activeCategory = HERO_CATEGORIES[activeIndex];
  const leftIndex = (activeIndex - 1 + HERO_CATEGORIES.length) % HERO_CATEGORIES.length;
  const rightIndex = (activeIndex + 1) % HERO_CATEGORIES.length;
  const leftCategory = HERO_CATEGORIES[leftIndex];
  const rightCategory = HERO_CATEGORIES[rightIndex];

  const navigateToCategory = (targetIndex: number) => {
    const targetCategory = HERO_CATEGORIES[targetIndex];
    if (!targetCategory) {
      return;
    }

    const query = searchParams?.toString();
    const href = query
      ? `/products/category/${targetCategory.id}?${query}`
      : `/products/category/${targetCategory.id}`;

    router.push(href);
  };

  return (
    <section ref={sectionRef} className="relative z-10 -mt-24 h-[220svh] w-full lg:h-[220vh]">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-svh items-center justify-center overflow-hidden md:h-screen md:max-h-screen lg:h-screen lg:max-h-screen"
      >
        <motion.div
          className="absolute bottom-1/2 left-0 z-20 hidden -translate-x-1/2 translate-y-1/2 overflow-hidden lg:flex"
          animate={{ scaleY: isLeftFocused ? SIDE_TO_CENTER_HEIGHT_SCALE : 1 }}
          whileHover={{ scaleY: SIDE_TO_CENTER_HEIGHT_SCALE }}
          transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.4 }}
          style={
            shouldReduceMotion
              ? {
                  width: HERO_INITIAL_SIDE_WIDTH,
                  height: HERO_INITIAL_SIDE_HEIGHT,
                  borderRadius: HERO_INITIAL_SIDE_RADIUS,
                }
              : {
                  width: sideWidth,
                  height: sideHeight,
                  borderRadius: sideRadius,
                  y: sideY,
                }
          }
        >
          <motion.button
            type="button"
            onClick={() => navigateToCategory(leftIndex)}
            onMouseEnter={(event) => updateFloatingLabelFromEvent(event, leftCategory.name)}
            onMouseLeave={() => setFloatingLabel((current) => ({ ...current, visible: false }))}
            onMouseMove={(event) => updateFloatingLabelFromEvent(event, leftCategory.name)}
            onFocusCapture={(event) => {
              setIsLeftFocused(true);
              updateFloatingLabelFromElement(event.currentTarget, leftCategory.name);
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsLeftFocused(false);
                setFloatingLabel((current) => ({ ...current, visible: false }));
              }
            }}
            className="group relative h-full w-full cursor-pointer overflow-hidden"
            style={{ borderRadius: shouldReduceMotion ? HERO_INITIAL_SIDE_RADIUS : sideRadius }}
            aria-label={`Show ${leftCategory.name} hero`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="relative z-0 size-auto min-h-screen min-w-screen object-cover"
              aria-hidden="true"
            >
              <source src={leftCategory.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 z-10 bg-black/25" aria-hidden="true" />
          </motion.button>
        </motion.div>

        <motion.p
          className={`pointer-events-none absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 ${ACTIVE_CATEGORY_NAME_CLASS} text-black`}
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: centerY,
                }
          }
          aria-hidden="true"
        >
          {activeCategory.name}
        </motion.p>

        <motion.div
          className="absolute top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={
            shouldReduceMotion
              ? {
                  width: HERO_INITIAL_CENTER_WIDTH,
                  height: HERO_INITIAL_CENTER_HEIGHT,
                  borderRadius: HERO_INITIAL_CENTER_RADIUS,
                }
              : {
                  width: centerWidth,
                  height: centerHeight,
                  borderRadius: centerRadius,
                  y: centerY,
                }
          }
        >
          <motion.button
            type="button"
            onClick={() => navigateToCategory(rightIndex)}
            className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden shadow-2xl"
            style={
              shouldReduceMotion
                ? { borderRadius: HERO_INITIAL_CENTER_RADIUS }
                : { borderRadius: centerRadius }
            }
            aria-label={`Show ${rightCategory.name} category`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="relative z-0 size-auto min-h-screen min-w-screen object-cover"
              key={activeCategory.id}
              aria-hidden="true"
            >
              <source src={activeCategory.video} type="video/mp4" />
            </video>

            <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
              <h1 className={`${ACTIVE_CATEGORY_NAME_CLASS} text-white`}>{activeCategory.name}</h1>
            </div>
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute right-0 bottom-1/2 z-20 hidden translate-x-1/2 translate-y-1/2 overflow-hidden lg:flex"
          animate={{ scaleY: isRightFocused ? SIDE_TO_CENTER_HEIGHT_SCALE : 1 }}
          whileHover={{ scaleY: SIDE_TO_CENTER_HEIGHT_SCALE }}
          transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.4 }}
          style={
            shouldReduceMotion
              ? {
                  width: HERO_INITIAL_SIDE_WIDTH,
                  height: HERO_INITIAL_SIDE_HEIGHT,
                  borderRadius: HERO_INITIAL_SIDE_RADIUS,
                }
              : {
                  width: sideWidth,
                  height: sideHeight,
                  borderRadius: sideRadius,
                  y: sideY,
                }
          }
        >
          <motion.button
            type="button"
            onClick={() => navigateToCategory(rightIndex)}
            onMouseEnter={(event) => updateFloatingLabelFromEvent(event, rightCategory.name)}
            onMouseLeave={() => setFloatingLabel((current) => ({ ...current, visible: false }))}
            onMouseMove={(event) => updateFloatingLabelFromEvent(event, rightCategory.name)}
            onFocusCapture={(event) => {
              setIsRightFocused(true);
              updateFloatingLabelFromElement(event.currentTarget, rightCategory.name);
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsRightFocused(false);
                setFloatingLabel((current) => ({ ...current, visible: false }));
              }
            }}
            className="group relative h-full w-full cursor-pointer overflow-hidden"
            style={{ borderRadius: shouldReduceMotion ? HERO_INITIAL_SIDE_RADIUS : sideRadius }}
            aria-label={`Show ${rightCategory.name} hero`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="relative z-0 size-auto min-h-screen min-w-screen object-cover"
              aria-hidden="true"
            >
              <source src={rightCategory.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 z-10 bg-black/25" aria-hidden="true" />
          </motion.button>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute top-0 left-0 z-90 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 px-3 text-center shadow-xl"
          animate={{
            x: floatingLabel.x,
            y: floatingLabel.y,
            opacity: floatingLabel.visible ? 1 : 0,
            scale: floatingLabel.visible ? 1 : 0.85,
          }}
          transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.32 }}
          aria-hidden="true"
        >
          <span className="font-(family-name:--font-heading) text-xl leading-tight text-white">
            {floatingLabel.text}
          </span>
        </motion.div>

        <motion.p
          className="text-foreground absolute bottom-0 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center gap-2 text-sm select-none"
          style={
            shouldReduceMotion
              ? {
                  color: cueColor,
                }
              : {
                  color: cueColor,
                  opacity: cueOpacity,
                  y: cueY,
                }
          }
        >
          Scroll to explore
          <i className="block h-10 w-px bg-current" aria-hidden="true" />
        </motion.p>
      </div>
    </section>
  );
}
