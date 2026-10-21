"use client";

import NextImage, { type ImageProps } from "next/image";
import { useOptionalPreview } from "../../context/PreviewContext";
import type { MouseEvent, ReactNode } from "react";

const IMAGE_BASE = "/health%20and%20wellness";

export function healthSrc(src?: string) {
  const value = String(src || "").trim();
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  let path = value;
  if (value.startsWith("/images/")) path = `${IMAGE_BASE}${value}`;
  else if (value.startsWith("images/")) path = `${IMAGE_BASE}/${value}`;
  return path.replace(/ /g, "%20");
}

type HealthImageProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"];
};

export function HealthImage({
  src,
  alt,
  width,
  height,
  fill,
  ...rest
}: HealthImageProps) {
  const resolved = typeof src === "string" ? healthSrc(src) : src;
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
    />
  );
}

const PAGE_LABELS: Record<string, string> = {
  about: "About Us",
  services: "Our Services",
  team: "Our Team",
  faq: "FAQ",
  contact: "Contact Us",
  "book-appointment": "Book Appointment",
  appointment: "Book Appointment",
  "thank-you": "Thank You",
};

type PreviewNav = {
  setCurrentPage: (page: string) => void;
  pageLinks?: { label?: string; href?: string; children?: PreviewNav["pageLinks"] }[];
};

function flatten(links: PreviewNav["pageLinks"] = []): NonNullable<PreviewNav["pageLinks"]> {
  return (links || []).flatMap((link) => [link, ...flatten(link.children || [])]);
}

function navSlug(value: string) {
  const raw = value.trim().toLowerCase();
  const slug = raw
    .replace(/^#page-/, "")
    .replace(/^\/+/, "")
    .split(/[/?#]/)[0]
    .replace(/\s+/g, "-");
  if (!slug || slug === "home" || slug === "#") return "home";
  if (slug === "teams" || slug === "our-team") return "team";
  if (slug === "service" || slug === "our-services") return "services";
  if (slug === "about-us") return "about";
  if (slug === "contact-us") return "contact";
  if (slug === "appointment" || slug === "appointments") return "book-appointment";
  return slug;
}

function labelForSlug(preview: PreviewNav | null | undefined, slug: string, fallback: string) {
  const wanted = navSlug(slug);
  const match = flatten(preview?.pageLinks).find((link) => {
    const href = String(link.href || "").trim().toLowerCase();
    const fromHref = href.startsWith("#page-")
      ? href.slice("#page-".length)
      : href.startsWith("/")
        ? href.replace(/^\/+/, "").split(/[/?#]/)[0]
        : "";
    const label = String(link.label || "").trim();
    return (
      navSlug(fromHref) === wanted ||
      navSlug(label) === wanted ||
      label.toLowerCase() === fallback.trim().toLowerCase()
    );
  });
  return match?.label || fallback;
}

function scrollTemplateToTop() {
  const scrollContainer = document.querySelector<HTMLElement>("[data-template-scroll]");
  if (scrollContainer) {
    scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function navigateHealthHref(href: string, preview?: PreviewNav | null) {
  const raw = String(href || "").trim();
  if (!preview || !raw) return false;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) return false;

  if (raw.toLowerCase().startsWith("#page-")) {
    const slug = raw.slice("#page-".length);
    const fallback = PAGE_LABELS[navSlug(slug)] || PAGE_LABELS[slug] || slug;
    preview.setCurrentPage(labelForSlug(preview, slug, fallback));
    scrollTemplateToTop();
    return true;
  }
  if (raw.startsWith("#") && raw !== "#") return false;

  const path = raw.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  const parts = path === "/" ? [] : path.replace(/^\//, "").split("/").filter(Boolean);
  const slug = parts[0] || "home";
  const fallback = !parts.length ? "Home" : PAGE_LABELS[slug] || slug;
  preview.setCurrentPage(
    slug === "home" ? labelForSlug(preview, "home", "Home") : labelForSlug(preview, slug, fallback),
  );
  scrollTemplateToTop();
  return true;
}

type HealthLinkProps = {
  href: string;
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: unknown;
};

export function HealthLink({ href, onClick, children, ...props }: HealthLinkProps) {
  const preview = useOptionalPreview();
  return (
    <a
      href={href || "#"}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (navigateHealthHref(String(href || ""), preview)) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

export function useHealthPathname() {
  const preview = useOptionalPreview();
  const current = String(preview?.currentPage || "Home").trim().toLowerCase();
  if (!current || current === "home") return "/";
  const entry = Object.entries(PAGE_LABELS).find(([, label]) => label.toLowerCase() === current);
  if (entry) return entry[0] === "appointment" ? "/book-appointment" : `/${entry[0]}`;
  if (current.includes("about")) return "/about";
  if (current.includes("service")) return "/services";
  if (current.includes("team")) return "/team";
  if (current.includes("faq")) return "/faq";
  if (current.includes("contact")) return "/contact";
  if (current.includes("appointment") || current.includes("book")) return "/book-appointment";
  if (current.includes("thank")) return "/thank-you";
  return "/";
}

export function useHealthRouter() {
  const preview = useOptionalPreview();
  return {
    push(href: string) {
      navigateHealthHref(href, preview);
    },
  };
}
