// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { type ReactNode, useEffect } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";

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
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
    </>
  ),
  diamond: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M12 21 8 9l4-6 4 6z" />
    </>
  ),
  "user-heart": (
    <>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" />
      <path d="M12 19.5s-2.5-1.5-2.5-3a1.25 1.25 0 0 1 2.5-.5 1.25 1.25 0 0 1 2.5.5c0 1.5-2.5 3-2.5 3z" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 20c-3-2-4.5-5-4.5-8.5C7.5 8 12 4 12 4s4.5 4 4.5 7.5C16.5 15 15 18 12 20z" />
      <path d="M12 20c-4 0-8-2.5-9-7 3 0 5 1 6.5 2.5M12 20c4 0 8-2.5 9-7-3 0-5 1-6.5 2.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 13.6c2.9.2 5 2.2 5 5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z" />
  ),
};

function WhyChooseSection({
  data,
}: SectionProps<"WhyChooseUs">) {
  const { badge, heading, description, list: features } = data;

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
              <path d="M6 3h12l4 6-10 12L2 9z" />
              <path d="M2 9h20" />
            </svg>
            {badge}
          </span>

          <h2 className="mt-6 font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            <span className="block text-white">{heading.main}</span>
            <span className="block bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-1 italic text-transparent">
              {heading.highlight}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {description}
          </p>
        </Reveal>

        <Stagger
          stagger={0.08}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title} scale={0.92}>
              <article className="hair-choose-card group/card flex h-full gap-4 rounded-xl border border-[#e0a458]/40 bg-gradient-to-br from-[#16110b] via-black to-black p-6 transition duration-300 hover:-translate-y-1 hover:border-[#e0a458] hover:shadow-[0_0_30px_-10px_rgba(224,164,88,0.55)]">
                <span className="hair-choose-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition group-hover/card:bg-[#e0a458] group-hover/card:text-black">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons[feature.icon]}
                  </svg>
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {feature.description}
                  </p>
                  <span className="mt-4 block h-0.5 w-6 bg-[#e0a458] transition-all duration-300 group-hover/card:w-12" />
                </div>
              </article>
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


export default function HairAtelierWhyChooseUs1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  return (
    <HairAtelierFrame>
      {raw.list ? <WhyChooseSection data={raw} /> : null}
    </HairAtelierFrame>
  );
}
