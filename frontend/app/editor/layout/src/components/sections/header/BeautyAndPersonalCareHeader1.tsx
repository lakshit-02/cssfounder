// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { useState, type MouseEvent, type ReactNode, useEffect } from "react";
import NextImage, { type ImageProps } from "next/image";
import { useOptionalPreview } from "../../context/PreviewContext";
import { AnimatePresence, motion } from "framer-motion";
import { filterMenuByHiddenPageLinks } from "../../../lib/navVisibility";

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
  portfolio: "Portfolio",
  projects: "Portfolio",
  teams: "Teams",
  team: "Teams",
};

function navKey(link: { href?: string; label?: string }) {
  const href = String(link.href || "").trim().toLowerCase();
  const label = String(link.label || "").trim().toLowerCase();
  let slug = "";
  if (href.startsWith("#page-")) slug = href.slice("#page-".length).split(/[/?#]/)[0];
  else if (href.startsWith("#") && href !== "#") slug = href.slice(1).split(/[/?]/)[0];
  else if (href && href !== "/" && href !== "#") {
    slug = href.replace(/^https?:\/\/[^/]+/i, "").replace(/^\/+/, "").split(/[/?#]/)[0];
  }
  const raw = slug || label;
  if (raw === "portfolio" || raw === "portfolios" || raw === "project" || raw === "projects") {
    return "portfolio";
  }
  if (raw === "team" || raw === "teams") return "team";
  return raw;
}

function hairMenuLinks(
  menu: { href?: string; label?: string; children?: unknown[] }[],
  pageLinks: PreviewNav["pageLinks"],
) {
  const filtered = filterMenuByHiddenPageLinks(menu, pageLinks);
  const flat = flatten(pageLinks).filter((link) => !link.hidden);
  if (!flat.length) return filtered;
  const open = new Set(flat.map((link) => navKey(link)));
  return filtered.filter((item) => {
    const key = navKey(item);
    if (key !== "portfolio" && key !== "team") return true;
    return open.has(key);
  });
}

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
  if (raw.toLowerCase().startsWith("#page-")) {
    const slug = raw.slice("#page-".length).split(/[/?#]/)[0].toLowerCase();
    return PAGE_LABELS[slug] || slug;
  }
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

function ArrowIcon() {
  return (
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
  );
}

function Navbar({ data }: SectionProps<"Header">) {
  const preview = useOptionalPreview();
  const [open, setOpen] = useState(false);
  const { logo, cta } = data;
  const links = hairMenuLinks(data.menu || [], preview?.pageLinks);
  const current = String(preview?.currentPage || "Home").trim().toLowerCase();

  const isActive = (href: string) => {
    const label = pageLabelForHref(href).trim().toLowerCase();
    if (current === "service detail" && label === "services") return true;
    if (current === "blog detail" && label === "blogs") return true;
    return current === label;
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-t-4 border-[#0e5c5c] bg-black"
    >
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ scale: 1.03 }}
          className="shrink-0"
        >
          <Link href={logo.href} onClick={() => setOpen(false)}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              preload
              className="h-auto w-44 sm:w-56"
            />
          </Link>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.07, delayChildren: 0.25 },
            },
          }}
          className="hidden items-center gap-10 lg:flex"
        >
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <motion.li
                key={link.href}
                variants={{
                  hidden: { opacity: 0, y: -12 },
                  show: { opacity: 1, y: 0 },
                }}
                className="relative"
              >
                <Link
                  href={link.href}
                  className={`relative py-2 text-[15px] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-[#e0a458]/60 after:transition-transform ${
                    active
                      ? "text-[#e0a458] after:scale-x-0"
                      : "text-white after:scale-x-0 hover:text-[#e0a458] hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute right-0 -bottom-1 left-0 h-0.5 bg-[#e0a458]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden lg:block"
        >
          <Link
            href={cta.href}
            className="group inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-[#c98a4b] via-[#e8b47a] to-[#b8763a] px-5 py-3 text-[15px] font-medium text-black shadow-md transition hover:brightness-110"
          >
            {cta.label}
            <ArrowIcon />
          </Link>
        </motion.div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-[#e0a458] transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-[#e0a458] transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-[#e0a458] transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-black lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                },
              }}
              className="flex flex-col px-6"
            >
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-white/10 py-3 ${
                      isActive(link.href) ? "text-[#e0a458]" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="px-6 pb-6">
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className="group mt-5 inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-[#c98a4b] via-[#e8b47a] to-[#b8763a] px-5 py-3 font-medium text-black"
              >
                {cta.label}
                <ArrowIcon />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
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

export default function HairAtelierHeader1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  return (
    <HairAtelierFrame>
      <Navbar data={raw} />
    </HairAtelierFrame>
  );
}
