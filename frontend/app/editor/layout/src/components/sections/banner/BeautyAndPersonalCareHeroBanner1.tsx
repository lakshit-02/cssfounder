// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from "react";
import NextImage, { type ImageProps } from "next/image";
import { useOptionalPreview } from "../../context/PreviewContext";
import { motion, type Variants } from "framer-motion";

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

const textContainer: Variants = {
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.35 } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

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

function HeroSection({ data }: SectionProps<"HeroBanner">) {
  const { slides, autoplayInterval } = data;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => setCurrent((index + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo(current + 1), autoplayInterval);
    return () => clearInterval(timer);
  }, [current, paused, autoplayInterval, goTo]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-black min-h-[550px] sm:min-h-[650px] lg:min-h-[750px] h-[100vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => {
        const active = index === current;
        return (
          <div
            key={slide.id}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              preload={index === 0}
              sizes="100vw"
              className={`object-cover object-[70%_center] transition-transform duration-[7000ms] ease-out ${
                active ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent md:via-black/40" />

            <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
              <motion.div
                className="max-w-xl"
                initial="hidden"
                animate={active ? "show" : "hidden"}
                variants={textContainer}
              >
                <motion.span
                  variants={lineGrow}
                  className="mb-5 block h-0.5 w-10 origin-left bg-[#e0a458]"
                />
                <motion.p
                  variants={textItem}
                  className="mb-5 text-xs tracking-[0.3em] text-white/90 uppercase sm:text-sm"
                >
                  {slide.badge}
                </motion.p>
                <h1 className="font-serif text-4xl leading-[1.05] uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
                  <motion.span variants={textItem} className="block text-white">
                    {slide.heading.main}
                  </motion.span>
                  <motion.span
                    variants={textItem}
                    className="block bg-gradient-to-r from-[#c98a4b] via-[#f0c48c] to-[#b8763a] bg-clip-text text-transparent"
                  >
                    {slide.heading.highlight}
                  </motion.span>
                </h1>
                <motion.p
                  variants={textItem}
                  className="mt-6 max-w-md text-base leading-relaxed text-white/90 sm:text-lg"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  variants={textItem}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 inline-block"
                >
                  <Link
                    href={slide.cta.href}
                    tabIndex={active ? 0 : -1}
                    className="group inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-[#c98a4b] via-[#e8b47a] to-[#b8763a] px-6 py-3 text-sm font-medium text-black shadow-md transition hover:brightness-110"
                  >
                    {slide.cta.label}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute top-1/2 right-3 z-10 flex -translate-y-1/2 flex-col gap-3 sm:right-6 sm:gap-5 lg:right-10"
      >
        <motion.button
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo(current - 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0a458] bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-[#e0a458] hover:text-black sm:h-12 sm:w-12"
        >
          <Chevron direction="left" />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Next slide"
          onClick={() => goTo(current + 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0a458] bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-[#e0a458] hover:text-black sm:h-12 sm:w-12"
        >
          <Chevron direction="right" />
        </motion.button>
      </motion.div>

      <div className="absolute bottom-10 left-0 z-10 w-full">
        <div className="mx-auto flex max-w-7xl gap-3 px-6 lg:px-10">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current}
              onClick={() => goTo(index)}
              className="py-2"
            >
              <span className="relative block h-0.5 w-8 overflow-hidden bg-white/25 transition-colors hover:bg-white/50">
                {index === current && (
                  <motion.span
                    key={`${current}-${paused}`}
                    className="absolute inset-0 origin-left bg-[#e0a458]"
                    initial={{ scaleX: paused ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: paused ? 0 : autoplayInterval / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </span>
            </button>
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
const Link = HairLink;

export default function HairAtelierHeroBanner1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  return (
    <HairAtelierFrame>
      {raw.slides ? <HeroSection data={raw} /> : null}
    </HairAtelierFrame>
  );
}
