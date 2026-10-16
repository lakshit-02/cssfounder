// @ts-nocheck
"use client";

import { useEffect, useState, type MouseEvent, type ReactNode, Fragment, useCallback } from "react";
import type { SectionProps } from "../../../types/section";
import NextImage, { type ImageProps } from "next/image";
import { useOptionalPreview } from "../../context/PreviewContext";
import { MotionConfig, motion, type Variants, AnimatePresence } from "framer-motion";

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

type PreviewNav = {
  setCurrentPage: (page: string) => void;
  pageLinks?: { label?: string; href?: string; children?: PreviewNav["pageLinks"] }[];
};

const PAGE_LABELS: Record<string, string> = {
  about: "About Us",
  services: "Services",
  gallery: "Gallery",
  blogs: "Blogs",
  contact: "Contact Us",
  "get-a-quote": "Get a Quote",
  "thank-you": "Thank You",
};

const HAIR_SERVICE_SLUG_KEY = "hair-atelier-service-slug";
const HAIR_BLOG_SLUG_KEY = "hair-atelier-blog-slug";
const HAIR_BLOG_CATEGORY_KEY = "hair-atelier-blog-category";

function flatten(links: PreviewNav["pageLinks"] = []): NonNullable<PreviewNav["pageLinks"]> {
  return (links || []).flatMap((link) => [link, ...flatten(link.children || [])]);
}

function labelForSlug(preview: PreviewNav | null | undefined, slug: string, fallback: string) {
  const wanted = slug.trim().toLowerCase();
  const match = flatten(preview?.pageLinks).find((link) => {
    const href = String(link.href || "").trim().toLowerCase();
    const fromHref = href.startsWith("#page-") ? href.slice("#page-".length) : "";
    return fromHref === wanted || String(link.label || "").trim().toLowerCase() === fallback.toLowerCase();
  });
  return match?.label || fallback;
}

function pageLabelForHref(href: string) {
  const raw = String(href || "").trim();
  if (!raw || raw === "/" || raw === "#") return "Home";
  const path = raw.split("?")[0].split("#")[0].replace(/\/+$/, "");
  const parts = path.replace(/^\//, "").split("/").filter(Boolean);
  if (!parts.length) return "Home";
  if (parts[0] === "services") return "Services";
  if (parts[0] === "blogs") return "Blogs";
  return PAGE_LABELS[parts[0]] || "Home";
}

function scrollTemplateToTop() {
  const scrollContainer = document.querySelector<HTMLElement>("[data-template-scroll]");
  if (scrollContainer) {
    scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function navigateHairHref(href: string, preview?: PreviewNav | null) {
  const raw = String(href || "").trim();
  if (!preview || !raw) return false;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) return false;
  if (raw.startsWith("#") && raw !== "#") return false;

  const path = raw.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  const parts = path === "/" ? [] : path.replace(/^\//, "").split("/").filter(Boolean);

  if (parts[0] === "services" && parts[1]) {
    sessionStorage.setItem(HAIR_SERVICE_SLUG_KEY, decodeURIComponent(parts[1]));
    preview.setCurrentPage(labelForSlug(preview, "service-detail", "Service Detail"));
  } else if (parts[0] === "blogs" && parts[1] === "category" && parts[2]) {
    sessionStorage.setItem(HAIR_BLOG_CATEGORY_KEY, decodeURIComponent(parts[2]));
    sessionStorage.removeItem(HAIR_BLOG_SLUG_KEY);
    preview.setCurrentPage(labelForSlug(preview, "blogs", "Blogs"));
  } else if (parts[0] === "blogs" && parts[1]) {
    sessionStorage.setItem(HAIR_BLOG_SLUG_KEY, decodeURIComponent(parts[1]));
    sessionStorage.removeItem(HAIR_BLOG_CATEGORY_KEY);
    preview.setCurrentPage(labelForSlug(preview, "blog-detail", "Blog Detail"));
  } else {
    sessionStorage.removeItem(HAIR_BLOG_CATEGORY_KEY);
    const slug = parts[0] || "home";
    const fallback = !parts.length ? "Home" : PAGE_LABELS[slug] || slug;
    preview.setCurrentPage(slug === "home" ? labelForSlug(preview, "home", "Home") : labelForSlug(preview, slug, fallback));
  }

  window.dispatchEvent(new CustomEvent("hair-atelier-nav"));
  scrollTemplateToTop();
  return true;
}

type HairLinkProps = {
  href: string;
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: unknown;
};

function HairLink({ href, onClick, children, ...props }: HairLinkProps) {
  const preview = useOptionalPreview();
  return (
    <a
      href={href || "#"}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (navigateHairHref(String(href || ""), preview)) event.preventDefault();
      }}
    >
      {children}
    </a>
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

type Breadcrumb = { label: string; href?: string };

type PageBannerProps = {
  title: string;
  breadcrumbs: Breadcrumb[];
  image?: { src: string; alt: string };
};

function PageBanner({ title, breadcrumbs, image }: PageBannerProps) {
  return (
    <section className="relative z-10 mb-8 overflow-hidden border-b border-[#e0a458]/40 bg-black shadow-[0_15px_40px_-15px_rgba(224,164,88,0.4)] lg:mb-10">
      {image && (
        <>
          <Image src={image.src} alt={image.alt} fill preload sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/75" />
        </>
      )}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[#c98a4b]/25 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#3a2510]/40 via-transparent to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center sm:py-24 lg:py-28">
        <Reveal as="h1" immediate distance={30} className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </Reveal>

        <Reveal immediate delay={0.2} distance={20} className="mt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur-sm">
            {breadcrumbs.map((crumb, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-2.5">
                  {i > 0 && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 text-white/50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  )}
                  {crumb.href && !last ? (
                    <Link href={crumb.href} className="text-white/85 transition hover:text-[#e0a458]">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined} className="text-[#e0a458]">
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        </Reveal>
      </div>
    </section>
  );
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

const icons: Record<string, ReactNode> = {
  scissors: (
    <>
      <circle cx="7" cy="18" r="3" />
      <circle cx="17" cy="18" r="3" />
      <path d="M8.7 15.5 17.5 3M15.3 15.5 6.5 3" />
      <circle cx="12" cy="10" r="0.6" fill="currentColor" />
    </>
  ),
  diamond: (
    <>
      <path d="M6 4h12l4 5-10 12L2 9z" />
      <path d="M2 9h20M10 4 8 9l4 12 4-12-2-5M8 9l-2-5M16 9l2-5" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 4c-1.8 2.2-2.8 4.6-2.8 7.2 0 2.7 1.2 5.2 2.8 6.8 1.6-1.6 2.8-4.1 2.8-6.8C14.8 8.6 13.8 6.2 12 4z" />
      <path d="M9.6 8.6C7.6 8 5.6 8.2 4.5 8.8c.1 4.6 3 8.4 7.5 9.2M14.4 8.6c2-.6 4-.4 5.1.2-.1 4.6-3 8.4-7.5 9.2" />
      <path d="M4.6 12.2C3.4 12.4 2.5 12.8 2 13.3 3 16.4 6.5 18.5 12 18.5s9-2.1 10-5.2c-.5-.5-1.4-.9-2.6-1.1" />
      <path d="M8 21h8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  chat: (
    <>
      <path d="M16.5 7.6A6.5 6.5 0 0 1 21 16l1 3.4-3.4-1a6.5 6.5 0 0 1-6.9-.8" />
      <path d="M15 10.5a6.5 6.5 0 0 1-9.6 5.7L2 17.3l1.1-3.4A6.5 6.5 0 1 1 15 10.5z" />
      <path d="M5.8 10.5h.01M8.5 10.5h.01M11.2 10.5h.01" strokeWidth={2.2} />
    </>
  ),
  dryer: (
    <>
      <path d="M14 3a5 5 0 0 1 0 10h-3.5l-1 8H6.5l.9-8.2A2.5 2.5 0 0 1 5 10.3V5.5A2.5 2.5 0 0 1 7.5 3z" />
      <circle cx="14" cy="8" r="2" />
      <path d="M5 6.5H3M5 9.5H3" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 13.5a4.5 4.5 0 0 0 8 0" />
      <path d="M9 9.5h.01M15 9.5h.01" strokeWidth={2.4} />
    </>
  ),
  sparkles: (
    <>
      <path d="M10 3c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5C7.4 8.9 9.4 6.9 10 3z" />
      <path d="M18 14c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3z" />
    </>
  ),
  drop: (
    <>
      <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z" />
      <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7" r="1" />
      <circle cx="14.5" cy="7" r="1" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  face: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01M15 10h.01M9.5 15c1.5 1 3.5 1 5 0" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c0 9-5 15-12 15a5 5 0 0 1-4-2C4 9 11 4 20 4z" />
      <path d="M4 20c3-5 7-8 11-10" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
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
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

function Eyebrow({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}
    >
      <p className="text-xs font-semibold tracking-[0.25em] text-[#e0a458] uppercase">
        {children}
      </p>
      <span className="h-px w-10 bg-[#e0a458]" />
    </div>
  );
}

const goldText =
  "bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent";

type ServiceDetailsProps = {
  service: ServiceDetail;
  overviewBadge: string;
  processBadge: string;
};

function ServiceDetails({ service, overviewBadge, processBadge }: ServiceDetailsProps) {
  const { overview, process } = service;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const changeLightbox = useCallback(
    (index: number) => setLightboxIndex(index),
    [],
  );

  return (
    <>
      <section className="bg-black pt-8 pb-16 lg:pt-10 lg:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          <Reveal
            direction="right"
            distance={60}
            className="relative mx-auto w-full max-w-lg pt-4 pr-14 pb-10 pl-4 sm:pr-24"
          >
            <Reveal
              direction="right"
              distance={30}
              delay={0.3}
              className="absolute top-8 bottom-16 left-0 w-1/2 rounded-l-xl border-y border-l border-[#e0a458]/70"
            />
            <div className="relative overflow-hidden rounded-xl border border-[#e0a458]/70">
              <Image
                src={overview.images.main.src}
                alt={overview.images.main.alt}
                width={900}
                height={1000}
                preload
                sizes="(min-width: 1024px) 480px, 100vw"
                className="aspect-[9/10] h-auto w-full object-cover"
              />
            </div>
            <Reveal
              delay={0.35}
              distance={50}
              className="absolute right-0 bottom-0 w-[45%] overflow-hidden rounded-xl border-2 border-[#e0a458]/80 shadow-2xl"
            >
              <Image
                src={overview.images.secondary.src}
                alt={overview.images.secondary.alt}
                width={600}
                height={700}
                sizes="(min-width: 1024px) 220px, 45vw"
                className="aspect-[6/7] h-auto w-full object-cover"
              />
            </Reveal>
          </Reveal>

          <Stagger>
            <StaggerItem direction="left">
              <Eyebrow>{overviewBadge}</Eyebrow>
            </StaggerItem>
            <StaggerItem
              as="h2"
              direction="left"
              className="mt-4 font-heading text-4xl leading-tight font-semibold text-white sm:text-5xl"
            >
              <span className="block">{overview.heading.main}</span>
              <span className="block">
                {overview.heading.middle}{" "}
                <span className={goldText}>{overview.heading.highlight}</span>
              </span>
            </StaggerItem>
            <StaggerItem
              as="p"
              direction="left"
              className="mt-5 text-[15px] leading-relaxed text-white/80"
            >
              {overview.description}
            </StaggerItem>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {overview.highlights.map((item) => (
                <StaggerItem key={item.title} scale={0.9} distance={20}>
                  <div className="group flex h-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#e0a458]/70">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition group-hover:bg-[#e0a458] group-hover:text-black">
                      <Icon name={item.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/65">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      <section className="bg-black pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="text-center">
            <Eyebrow center>{processBadge}</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-5xl">
              {process.heading.main}{" "}
              <span className={goldText}>{process.heading.highlight}</span>
            </h2>
          </Reveal>

          <Stagger
            as="ol"
            stagger={0.15}
            className="mt-12 grid grid-cols-2 gap-4 sm:gap-10 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-4"
          >
            {process.steps.map((step, i) => (
              <Fragment key={step.title}>
                {i > 0 && (
                  <StaggerItem
                    as="li"
                    direction="right"
                    distance={20}
                    className="hidden items-start pt-5 text-[#e0a458] lg:flex"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-6 w-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12h19M16 7l5 5-5 5" />
                    </svg>
                  </StaggerItem>
                )}
                <StaggerItem
                  as="li"
                  className="group flex flex-col items-center text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition group-hover:bg-[#e0a458] group-hover:text-black">
                    <Icon name={step.icon} className="h-7 w-7" />
                  </span>
                  <span className="mt-3 font-heading text-2xl font-bold text-[#e0a458]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-white/75">
                    {step.description}
                  </p>
                </StaggerItem>
              </Fragment>
            ))}
          </Stagger>

          <Stagger
            stagger={0.1}
            className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {process.images.map((image, index) => (
              <StaggerItem key={image.src} scale={0.88} distance={20}>
                <button
                  type="button"
                  aria-label={`Open image`}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#e0a458]/60 shadow-[0_0_20px_-10px_rgba(224,164,88,0.5)] transition lg:hover:border-[#e0a458]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
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
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={process.images}
            index={lightboxIndex}
            onClose={closeLightbox}
            onChange={changeLightbox}
          />
        )}
      </AnimatePresence>
    </>
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
const Link = HairLink;

export default function HairAtelierServiceDetailPage1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  const details = raw.serviceDetails || raw.services?.serviceDetails || {};
  const list = Array.isArray(details.list) ? details.list : [];
  const [slug, setSlug] = useState(list[0]?.slug || "");

  useEffect(() => {
    const read = () => {
      const saved = sessionStorage.getItem(HAIR_SERVICE_SLUG_KEY) || "";
      if (list.some((item) => item.slug === saved)) setSlug(saved);
    };
    read();
    window.addEventListener("hair-atelier-nav", read);
    return () => window.removeEventListener("hair-atelier-nav", read);
  }, [list]);

  const service = list.find((item) => item.slug === slug) || list[0];
  if (!service) return null;

  return (
    <HairAtelierFrame>
      <main className="flex-1 bg-black">
        <PageBanner
          title={details.bannerTitle || "Service Details"}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />
        <ServiceDetails
          service={service}
          overviewBadge={details.overviewBadge}
          processBadge={details.processBadge}
        />
      </main>
    </HairAtelierFrame>
  );
}
