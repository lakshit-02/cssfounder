// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { useCallback, useRef, useState, type ReactNode, useEffect } from "react";
import NextImage, { type ImageProps } from "next/image";
import { AnimatePresence, motion, type Variants, MotionConfig } from "framer-motion";

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

type GalleryImage = { src: string; alt: string };

function Arrow({ direction, className = "h-4 w-4" }: { direction: "left" | "right"; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} />
    </svg>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const image = images[index];
  const prev = useCallback(() => onChange((index - 1 + images.length) % images.length), [index, images.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % images.length), [index, images.length, onChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#e0a458] text-white transition hover:bg-[#e0a458] hover:text-black"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#e0a458] bg-black/50 text-white transition hover:bg-[#e0a458] hover:text-black sm:left-6"
      >
        <Arrow direction="left" className="h-5 w-5" />
      </button>

      <motion.figure
        className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-[4/3] w-full max-h-[78vh] overflow-hidden rounded-xl border border-[#e0a458]/60">
          <AnimatePresence initial={false}>
            <motion.div
              key={image.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.figure>

      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#e0a458] bg-black/50 text-white transition hover:bg-[#e0a458] hover:text-black sm:right-6"
      >
        <Arrow direction="right" className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

const gridEase = [0.22, 1, 0.36, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: gridEase } },
};

function GalleryGrid({ data }: SectionProps<"GalleryPage">) {
  const { badge, heading, description, perPage, list: images } = data;
  const totalPages = Math.ceil(images.length / perPage);
  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const start = (page - 1) * perPage;
  const pageImages = images.slice(start, start + perPage);

  const goToPage = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    setPage(next);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const changeLightbox = useCallback(
    (index: number) => {
      setLightboxIndex(index);
      setPage(Math.floor(index / perPage) + 1);
    },
    [perPage],
  );

  return (
    <section className="bg-black py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#e0a458]" />
            <p className="text-xs font-semibold tracking-[0.3em] text-[#e0a458] uppercase sm:text-sm">
              {badge}
            </p>
            <span className="h-px w-12 bg-[#e0a458]" />
          </div>

          <h2 className="mt-5 font-heading text-4xl font-semibold sm:text-5xl">
            <span className="text-white">{heading.main} </span>
            <span className="bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent">
              {heading.highlight}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            {description}
          </p>
        </Reveal>

        <motion.div
          key={page}
          ref={gridRef}
          className="mt-12 grid scroll-mt-28 grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {pageImages.map((image, i) => (
            <motion.div key={image.src} variants={gridItemVariants}>
              <button
                type="button"
                onClick={() => setLightboxIndex(start + i)}
                aria-label={`Open ${image.alt}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#e0a458]/50 shadow-[0_0_20px_-10px_rgba(224,164,88,0.5)] transition lg:hover:border-[#e0a458] focus-visible:outline-2 focus-visible:outline-[#e0a458]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition duration-700 lg:group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition duration-300 lg:group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e0a458] bg-black/40 text-[#e0a458]">
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
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
                    </svg>
                  </span>
                </span>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {totalPages > 1 && (
          <nav
            aria-label="Gallery pagination"
            className="mt-12 flex items-center justify-center gap-2 sm:gap-3"
          >
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e0a458] text-white transition hover:bg-[#e0a458] hover:text-black disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-white"
            >
              <Arrow direction="left" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Page ${n}`}
                aria-current={n === page ? "page" : undefined}
                onClick={() => goToPage(n)}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  n === page ? "text-black" : "text-white hover:text-[#e0a458]"
                }`}
              >
                {n === page && (
                  <motion.span
                    layoutId="gallery-page"
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f0c48c] to-[#c98a4b] shadow-[0_0_15px_-3px_rgba(224,164,88,0.7)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{n}</span>
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e0a458] text-white transition hover:bg-[#e0a458] hover:text-black disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-white"
            >
              <Arrow direction="right" />
            </button>
          </nav>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={closeLightbox}
            onChange={changeLightbox}
          />
        )}
      </AnimatePresence>
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

export default function HairAtelierGalleryPage1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  const gallery = raw.gallery?.list ? raw.gallery : raw;
  if (!gallery?.list) return null;
  return (
    <HairAtelierFrame>
      <GalleryGrid data={gallery} />
    </HairAtelierFrame>
  );
}
