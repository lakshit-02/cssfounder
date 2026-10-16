// @ts-nocheck
"use client";

import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import type { SectionProps } from "../../../types/section";
import NextImage, { type ImageProps } from "next/image";
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

type IconProps = { className?: string };

const base = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function CalendarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function SearchIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.2} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function LongArrowIcon({ className = "h-4 w-6" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} className={className}>
      <path d="M2 12h19M16 7l5 5-5 5" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CrownIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} className={className}>
      <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" />
      <path d="M5 19h14" />
    </svg>
  );
}

function DocumentIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.6} className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  );
}

function TagIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} className={className}>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
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

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

const formatBlogDate = (date: string) => dateFormatter.format(new Date(date));

function openHairBlogCard(post: { slug?: string; title?: string }) {
  const slug = String(post.slug || "").trim();
  try {
    sessionStorage.setItem(
      "ai-builder-open-manager-item:Blogs",
      JSON.stringify({
        href: slug ? `#page-blog-${slug}` : undefined,
        slug: slug || undefined,
        title: post.title || "",
      }),
    );
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent("ai-builder-open-manager", {
      detail: { manager: "Blogs", cardOnly: true, preservePage: true },
    }),
  );
}

function BlogCard({ post, readMoreLabel }: { post: BlogPost; readMoreLabel: string }) {
  const href = `/blogs/${post.slug}`;

  return (
    <StaggerItem distance={50}>
    <article
      data-editor-no-inline="true"
      className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-[#e0a458]/60 bg-[#121110] shadow-[0_0_25px_-12px_rgba(224,164,88,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#e0a458]"
      onClickCapture={(event) => {
        if (!document.querySelector("[data-editor-live-surface]")) return;
        event.preventDefault();
        event.stopPropagation();
        openHairBlogCard(post);
      }}
    >
      <Link href={href} className="relative block aspect-video overflow-hidden">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover/card:scale-110"
        />
        <span className="absolute top-4 left-4 rounded-full bg-[#f29a1f] px-3.5 py-1 text-xs font-semibold text-black">
          {post.tag}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 text-xs text-white/70">
          <CalendarIcon className="h-4 w-4 text-[#e0a458]" />
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
        </p>

        <h3 className="mt-3 text-lg font-semibold text-white transition group-hover/card:text-[#f0c48c]">
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{post.excerpt}</p>

        <div className="mt-4 border-t border-white/10 pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#e0a458] transition hover:text-[#f0c48c]"
          >
            {readMoreLabel}
            <LongArrowIcon className="h-4 w-6 transition-transform group-hover/card:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
    </StaggerItem>
  );
}

function Widget({ title, children }: { title: string; children: ReactNode }) {
  return (
    <StaggerItem
      direction="left"
      className="rounded-xl border border-white/10 bg-[#0f0e0d] p-5"
    >
      <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
      <span className="mt-2 mb-4 block h-0.5 w-8 bg-[#e0a458]" />
      {children}
    </StaggerItem>
  );
}

function BlogSidebar({
  data: sidebar,
  posts,
  currentSlug,
}: SectionProps<"BlogSidebar"> & {
  posts: BlogPost[];
  currentSlug?: string;
}) {
  const recent = posts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, sidebar.recentCount);
  const categories = (Array.isArray(sidebar?.categories) ? sidebar.categories : [])
    .map((name) => ({ name, posts: posts.filter((post) => post.category === name) }))
    .filter((category) => category.posts.length > 0);
  const { cta } = sidebar;

  return (
    <Stagger
      as="aside"
      stagger={0.15}
      delay={0.2}
      immediate
      className="space-y-6"
    >
      <Widget title={sidebar.recentTitle}>
        <ul className="space-y-4">
          {recent.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blogs/${post.slug}`}
                className="group/post flex items-center gap-3"
              >
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#e0a458]/40">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="64px"
                    className="object-cover transition duration-500 group-hover/post:scale-110"
                  />
                </span>
                <span className="min-w-0">
                  <span className="line-clamp-2 font-heading text-sm leading-snug font-semibold text-white transition group-hover/post:text-[#f0c48c]">
                    {post.title}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-xs text-white/60">
                    <CalendarIcon className="h-3.5 w-3.5 text-[#e0a458]" />
                    <time dateTime={post.date}>
                      {formatBlogDate(post.date)}
                    </time>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Widget>

      <Widget title={sidebar.categoriesTitle}>
        <ul className="divide-y divide-white/10">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={`/blogs/category/${category.name.toLowerCase().replace(/ /g, "-")}`}
                className="group/cat flex w-full items-center justify-between py-3 text-left text-sm text-white/85 transition hover:text-[#e0a458]"
              >
                <span className="flex items-center gap-2">{category.name}</span>
                <ChevronRightIcon className="h-4 w-4 text-white/40 transition group-hover/cat:translate-x-1 group-hover/cat:text-[#e0a458]" />
              </Link>
            </li>
          ))}
        </ul>
      </Widget>

      <StaggerItem
        direction="left"
        className="relative overflow-hidden rounded-xl border border-[#e0a458]/60 bg-[#0f0e0d] p-6 shadow-[0_0_30px_-12px_rgba(224,164,88,0.5)]"
      >
        <Image
          src={cta.image.src}
          alt={cta.image.alt}
          fill
          sizes="320px"
          className="object-cover object-right opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="relative max-w-[70%]">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#e0a458] uppercase">
            <CrownIcon />
            {cta.badge}
          </p>
          <h3 className="mt-3 font-heading text-2xl leading-tight font-semibold text-white">
            {cta.heading.main}
            <span className="block bg-gradient-to-r from-[#e8b47a] to-[#c98a4b] bg-clip-text text-transparent">
              {cta.heading.highlight}
            </span>
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-white/80">
            {cta.description}
          </p>
          <Link
            href={cta.button.href}
            className="group/cta mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f0b866] to-[#e8a850] px-5 py-2.5 text-xs font-semibold text-black transition hover:brightness-110"
          >
            {cta.button.label}
            <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </div>
      </StaggerItem>
    </Stagger>
  );
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

function splitTitle(title: string, highlight: string) {
  return title.endsWith(highlight)
    ? [title.slice(0, -highlight.length).trim(), highlight]
    : [title, ""];
}

export default function HairAtelierBlogDetailPage1({ data }: SectionProps) {
  const raw = (data ?? {}) as {
    bannerTitle?: string;
    blog?: {
      sidebar?: unknown;
      posts?: Array<{
        slug: string;
        title: string;
        titleHighlight: string;
        date: string;
        image: { src: string; alt: string };
        content: {
          intro: string;
          sections: { heading: string; body: string }[];
          conclusionHeading: string;
          conclusion: string;
        };
      }>;
    };
  };
  const blog = raw.blog || {};
  const posts = Array.isArray(blog.posts) ? blog.posts : [];
  const [slug, setSlug] = useState(posts[0]?.slug || "");

  useEffect(() => {
    const read = () => {
      const saved = sessionStorage.getItem(HAIR_BLOG_SLUG_KEY) || "";
      if (posts.some((post) => post.slug === saved)) setSlug(saved);
    };
    read();
    window.addEventListener("hair-atelier-nav", read);
    return () => window.removeEventListener("hair-atelier-nav", read);
  }, [posts]);

  const post = posts.find((item) => item.slug === slug) || posts[0];
  if (!post) return null;

  const bannerTitle = raw.bannerTitle || "Blog Detail";
  const [titleStart, titleEnd] = splitTitle(post.title, post.titleHighlight);
  const { intro, sections, conclusionHeading, conclusion } = post.content;

  return (
    <HairAtelierFrame>
      <main className="flex-1 bg-black">
        <PageBanner
          title={bannerTitle}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/blogs" },
            { label: bannerTitle },
          ]}
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-8 lg:grid-cols-[1fr_320px] lg:gap-12 lg:px-10 lg:py-10">
          <article>
            <Reveal as="h1" immediate className="font-heading text-4xl leading-tight font-semibold text-white sm:text-5xl">
              {titleStart}
              {titleEnd ? (
                <span className="block bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent">
                  {titleEnd}
                </span>
              ) : null}
            </Reveal>
            <Reveal as="p" immediate delay={0.15} distance={20} className="mt-4 flex items-center gap-2 text-sm text-white/70">
              <CalendarIcon className="h-4 w-4 text-[#e0a458]" />
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            </Reveal>
            <Reveal immediate delay={0.25} direction="none" scale={0.95} className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl border border-[#e0a458]/60">
              <Image src={post.image.src} alt={post.image.alt} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
            </Reveal>
            <Reveal as="p" distance={30} className="mt-8 text-[15px] leading-relaxed text-white/85">
              {intro}
            </Reveal>
            {sections.map((section, index) => (
              <Reveal as="section" key={section.heading} distance={30} className="mt-8">
                <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
                  <span className="text-white">{index + 1}. </span>
                  <span className="bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent">
                    {section.heading}
                  </span>
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/85">{section.body}</p>
              </Reveal>
            ))}
            <Reveal as="section" distance={30} className="mt-10">
              <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">{conclusionHeading}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/85">{conclusion}</p>
            </Reveal>
          </article>
          <BlogSidebar data={blog.sidebar} posts={posts} currentSlug={post.slug} />
        </div>
      </main>
    </HairAtelierFrame>
  );
}
