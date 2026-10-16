// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { useEffect, useRef, useState, type ReactNode } from "react";
import NextImage, { type ImageProps } from "next/image";
import { motion, MotionConfig, type Variants } from "framer-motion";

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

const icons: Record<string, React.ReactNode> = {
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 13.6c2.9.2 5 2.2 5 5" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
    </>
  ),
  star: (
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z" />
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" />
    </>
  ),
};

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

function CountUp({
  value,
  decimals,
  suffix,
}: {
  value: number;
  decimals: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 2000;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(value * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

function StatsSection({ data }: SectionProps<"Stats">) {
  const { badge, heading, description, background, list: stats } = data;

  return (
    <section className="relative overflow-hidden bg-black py-8 lg:py-10">
      <Image
        src={background.src}
        alt={background.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-10">
        <Stagger>
          <StaggerItem
            direction="none"
            scale={0.7}
            className="flex items-center justify-center gap-4"
          >
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-[#e0a458] sm:w-32" />
            <motion.span
              animate={{ rotate: [0, -12, 12, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.5 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458]"
            >
              <Icon name="scissors" className="h-5 w-5" />
            </motion.span>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-[#e0a458] sm:w-32" />
          </StaggerItem>

          <StaggerItem
            as="p"
            className="mt-6 text-xs tracking-[0.3em] text-white/80 uppercase sm:text-sm"
          >
            {badge}
          </StaggerItem>

          <StaggerItem
            as="h2"
            className="mt-3 font-heading text-3xl font-semibold sm:text-5xl"
          >
            <span className="text-white">{heading.main} </span>
            <span className="bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-1 italic text-transparent">
              {heading.highlight}
            </span>
          </StaggerItem>

          <StaggerItem
            as="p"
            className="mx-auto mt-5 max-w-2xl text-sm text-white/80 sm:text-base"
          >
            {description}
          </StaggerItem>
        </Stagger>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StaggerItem key={`stat-${index}-${stat.label ?? ""}`} distance={50}>
              <div className="flex h-full flex-col items-center rounded-xl border border-[#e0a458]/40 bg-black/55 px-6 py-8 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#e0a458]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458]">
                  <Icon name={stat.icon} className="h-6 w-6" />
                </span>
                <p className="mt-5 font-heading text-4xl font-bold text-[#f0c48c] lg:text-[42px]">
                  <CountUp
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-2 text-sm text-white/90">{stat.label}</p>
                <span className="mt-5 h-px w-10 bg-[#e0a458]" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
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

export default function HairAtelierStats1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  return (
    <HairAtelierFrame>
      {raw.list ? <StatsSection data={raw} /> : null}
    </HairAtelierFrame>
  );
}
