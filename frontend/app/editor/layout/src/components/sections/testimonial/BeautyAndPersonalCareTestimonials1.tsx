// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import NextImage, { type ImageProps } from "next/image";
import { MotionConfig, motion, type Variants } from "framer-motion";

const IMAGE_BASE = "/beauty%20and%20personal%20care";

function hairSrc(src?: string) {
  const value = String(src || "").trim();
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  if (value.startsWith("/images/")) return `${IMAGE_BASE}${value}`;
  if (value.startsWith("images/")) return `${IMAGE_BASE}/${value}`;
  return value.replace(/ /g, "%20");
}

type HairImageProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"];
  preload?: boolean;
};

function HairImage({
  src,
  preload,
  alt,
  width,
  height,
  fill,
  ...rest
}: HairImageProps) {
  const resolved = typeof src === "string" ? hairSrc(src) : src;
  if (!resolved) return null;
  const numericWidth = typeof width === "number" ? width : Number(width);
  const numericHeight = typeof height === "number" ? height : Number(height);
  const sized =
    Number.isFinite(numericWidth) &&
    numericWidth > 0 &&
    Number.isFinite(numericHeight) &&
    numericHeight > 0;

  return (
    <NextImage
      src={resolved}
      alt={alt || ""}
      unoptimized
      {...rest}
      {...(fill
        ? { fill: true }
        : {
            width: sized ? numericWidth : 1200,
            height: sized ? numericHeight : 800,
          })}
      priority={Boolean(preload || rest.priority)}
    />
  );
}

type Direction = "up" | "down" | "left" | "right" | "none";

const tags = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  aside: motion.aside,
  article: motion.article,
};

type Tag = keyof typeof tags;

const ease = [0.22, 1, 0.36, 1] as const;

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

function itemVariants(direction: Direction, distance: number, scale?: number): Variants {
  return {
    hidden: { opacity: 0, ...offset(direction, distance), ...(scale ? { scale } : {}) },
    show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.7, ease } },
  };
}

type BaseProps = {
  as?: Tag;
  className?: string;
  children?: ReactNode;
  id?: string;
};

type RevealProps = BaseProps & {
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  scale?: number;
  amount?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
};

function Reveal({
  as = "div",
  direction = "up",
  distance = 40,
  delay = 0,
  duration = 0.7,
  scale,
  amount = 0.2,
  immediate = false,
  className,
  children,
  id,
}: RevealProps) {
  const Component = tags[as];
  const target = { opacity: 1, x: 0, y: 0, scale: 1 };
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance), ...(scale ? { scale } : {}) }}
      {...(immediate ? { animate: target } : { whileInView: target, viewport: { once: true, amount } })}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = BaseProps & {
  stagger?: number;
  delay?: number;
  amount?: number;
  immediate?: boolean;
};

function Stagger({
  as = "div",
  stagger = 0.12,
  delay = 0,
  amount = 0.15,
  immediate = false,
  className,
  children,
  id,
}: StaggerProps) {
  const Component = tags[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <Component
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount } })}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = BaseProps & {
  direction?: Direction;
  distance?: number;
  scale?: number;
};

function StaggerItem({ as = "div", direction = "up", distance = 30, scale, className, children, id }: StaggerItemProps) {
  const Component = tags[as];
  return (
    <Component id={id} className={className} variants={itemVariants(direction, distance, scale)}>
      {children}
    </Component>
  );
}

function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const breakpoints = [
  { query: "(min-width: 1024px)", perView: 3 },
  { query: "(min-width: 768px)", perView: 2 },
];

function subscribe(callback: () => void) {
  const lists = breakpoints.map((bp) => window.matchMedia(bp.query));
  lists.forEach((list) => list.addEventListener("change", callback));
  return () =>
    lists.forEach((list) => list.removeEventListener("change", callback));
}

function getPerView() {
  return (
    breakpoints.find((bp) => window.matchMedia(bp.query).matches)?.perView ?? 1
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex gap-0.5 text-[#f5a524]"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i < count ? "" : "opacity-25"}`}
          fill="currentColor"
        >
          <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialsSection({
  data,
}: SectionProps<"Testimonials">) {
  const { badge, heading, description, autoplayInterval, list: testimonials } = data;
  const perView = useSyncExternalStore(subscribe, getPerView, () => 3);
  const maxIndex = Math.max(testimonials.length - perView, 0);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const current = Math.min(index, maxIndex);

  const goTo = useCallback(
    (next: number) =>
      setIndex(next > maxIndex ? 0 : next < 0 ? maxIndex : next),
    [maxIndex],
  );

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const timer = setInterval(() => goTo(current + 1), autoplayInterval);
    return () => clearInterval(timer);
  }, [current, paused, maxIndex, autoplayInterval, goTo]);

  const onTouchEnd = (endX: number) => {
    if (touchStartX.current === null) return;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 50) goTo(current + (delta < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <section className="bg-black py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#e0a458] px-5 py-2 text-xs font-semibold tracking-[0.2em] text-[#e0a458] uppercase">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12z" />
              <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
            </svg>
            {badge}
          </span>

          <h2 className="mt-6 font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            <span className="block text-white">{heading.main}</span>
            <span className="block bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-1 italic text-transparent">
              {heading.highlight}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.15} distance={50}>
          <div
            className="relative mt-12 sm:px-16"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => goTo(current - 1)}
              className="absolute top-1/2 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0a458] bg-black/50 text-white backdrop-blur transition hover:bg-[#e0a458] hover:text-black sm:left-0 sm:h-12 sm:w-12"
            >
              <Chevron direction="left" />
            </button>

            <div
              className="overflow-hidden py-4"
              onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
            >
              <div
                className="-mx-3 flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translateX(-${(current * 100) / perView}%)`,
                }}
              >
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="w-full shrink-0 px-3 md:w-1/2 lg:w-1/3"
                  >
                    <article className="flex h-full flex-col rounded-2xl border border-[#e0a458]/50 bg-gradient-to-br from-[#1f170e] via-[#0d0a06] to-black p-7 shadow-[0_0_25px_-10px_rgba(224,164,88,0.45)] transition duration-300 hover:border-[#e0a458]">
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e0a458] font-heading text-3xl leading-none text-[#e0a458]">
                          &ldquo;
                        </span>
                        <Stars count={item.rating} />
                      </div>

                      <p className="mt-6 flex-1 text-[15px] leading-relaxed text-white/85">
                        &ldquo;{item.quote}&rdquo;
                      </p>

                      <div className="mt-6 flex items-center gap-3">
                        <span className="h-0.5 w-10 bg-[#e0a458]" />
                        <span className="h-px flex-1 bg-white/10" />
                      </div>

                      <div className="mt-5 flex items-center gap-4">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-full border-2 border-[#e0a458] object-cover"
                        />
                        <div>
                          <p className="font-heading text-lg font-semibold text-white">
                            {item.name}
                          </p>
                          <p className="text-sm text-white/65">{item.role}</p>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => goTo(current + 1)}
              className="absolute top-1/2 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0a458] bg-black/50 text-white backdrop-blur transition hover:bg-[#e0a458] hover:text-black sm:right-0 sm:h-12 sm:w-12"
            >
              <Chevron direction="right" />
            </button>
          </div>
        </Reveal>

        <div className="mt-8 flex items-center justify-center gap-2.5">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === current
                  ? "w-6 bg-[#e0a458]"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap";

const FONT_CSS = `
.hair-atelier-root { font-family: var(--font-body, "Montserrat", Arial, Helvetica, sans-serif); color: #fff; }
.hair-atelier-root .font-heading { font-family: var(--font-heading, "Playfair Display", Georgia, serif); }
`;

let fontsReady = false;

function HairAtelierFrame({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (fontsReady || typeof document === "undefined") return;
    fontsReady = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.setAttribute("data-hair-atelier", "fonts");
    style.textContent = FONT_CSS;
    document.head.appendChild(style);
  }, []);

  return <div className="hair-atelier-root flex flex-col bg-black text-white">{children}</div>;
}

const Image = HairImage;

export default function HairAtelierTestimonials1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  return (
    <HairAtelierFrame>
      {raw.list ? <TestimonialsSection data={raw} /> : null}
    </HairAtelierFrame>
  );
}
