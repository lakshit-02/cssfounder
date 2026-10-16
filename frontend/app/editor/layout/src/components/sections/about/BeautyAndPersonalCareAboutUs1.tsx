// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import NextImage, { type ImageProps } from "next/image";
import { type MouseEvent, type ReactNode, useEffect } from "react";
import { useOptionalPreview } from "../../context/PreviewContext";
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
  diamond: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M12 21 8 9l4-6 4 6z" />
    </>
  ),
};

function AboutSection({ data }: SectionProps<"AboutUs">) {
  const { badge, heading, paragraphs, experience, images, features, cta } = data;

  return (
    <section className="bg-black py-8 lg:py-10">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-14 lg:px-10">
        <Reveal
          direction="right"
          distance={60}
          className="relative mx-auto w-full max-w-xl pt-6 pr-10 pb-14 pl-6 sm:pr-16"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#e0a458]/60">
            <Image
              src={images.main.src}
              alt={images.main.alt}
              width={images.main.width}
              height={images.main.height}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </div>

          <Reveal
            direction="none"
            scale={0.6}
            delay={0.45}
            className="absolute top-0 left-0 rounded-xl bg-gradient-to-br from-[#e8b47a] via-[#d9a066] to-[#b8763a] px-6 py-4 text-center text-black shadow-xl sm:px-8 sm:py-5"
          >
            <p className="text-2xl font-semibold sm:text-3xl">{experience.value}</p>
            <p className="mt-1 text-xs font-medium sm:text-sm">{experience.label}</p>
          </Reveal>

          <Reveal
            delay={0.3}
            distance={50}
            className="absolute right-0 bottom-0 w-[42%] overflow-hidden rounded-2xl border-2 border-[#e0a458]/70 shadow-2xl"
          >
            <Image
              src={images.secondary.src}
              alt={images.secondary.alt}
              width={images.secondary.width}
              height={images.secondary.height}
              sizes="(min-width: 1024px) 240px, 40vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </Reveal>
        </Reveal>

        <Stagger>
          <StaggerItem className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#e0a458]" />
            <p className="text-sm tracking-[0.3em] text-[#e0a458] uppercase">
              {badge}
            </p>
          </StaggerItem>

          <StaggerItem
            as="h2"
            className="mt-5 font-heading text-3xl leading-tight font-semibold sm:text-5xl lg:text-[40px] xl:text-5xl"
          >
            <span className="block text-white sm:whitespace-nowrap">
              {heading.main}
            </span>
            <span className="block bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-2 italic text-transparent sm:whitespace-nowrap">
              {heading.highlight}
            </span>
          </StaggerItem>

          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-white/85">
            {paragraphs.map((text) => (
              <StaggerItem as="p" key={text}>
                {text}
              </StaggerItem>
            ))}
          </div>

          <ul className="mt-8 space-y-6">
            {features.map((feature) => (
              <StaggerItem
                as="li"
                direction="left"
                key={feature.title}
                className="flex items-center gap-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e8b47a] to-[#b8763a] text-black">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons[feature.icon]}
                  </svg>
                </span>
                <span className="h-10 w-px shrink-0 bg-white/20" />
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm text-white/70">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </ul>

          <StaggerItem>
            <Link
              href={cta.href}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#c98a4b] via-[#e8b47a] to-[#b8763a] px-7 py-3.5 text-[15px] font-semibold text-black shadow-md transition hover:brightness-110"
            >
              {cta.label}
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
          </StaggerItem>
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
const Link = HairLink;

export default function HairAtelierAboutUs1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  return (
    <HairAtelierFrame>
      {raw.heading ? <AboutSection data={raw} /> : null}
    </HairAtelierFrame>
  );
}
