// @ts-nocheck
"use client";

import type { ComponentProps, ReactNode } from "react";
import NextImage from "next/image";
import { useOptionalPreview } from "../../../context/PreviewContext";

type AutomotiveImageProps = Omit<
  ComponentProps<typeof NextImage>,
  "src" | "alt" | "width" | "height" | "fill"
> & {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
};

type AutomotiveLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href?: string;
  children?: ReactNode;
};

const IMAGE_BASE = "/automotive";
const ASSET_BASE = "/rydora/assets";
const ASSET_MOVES = [
  ["cars/", "fleet/"],
  ["services/", "service/"],
  ["hero-car.jpg", "banner/hero-car.jpg"],
  ["page-banner.jpg", "banner/page-banner.jpg"],
  ["about-car.jpg", "about/about-car.jpg"],
  ["how-it-works.jpg", "process/how-it-works.jpg"],
  ["why-choose.jpg", "whychoose/why-choose.jpg"],
  ["footer-bg.jpg", "footer/footer-bg.jpg"],
  ["showroom.jpg", "contact/showroom.jpg"],
  ["logo-white.png", "main-logo/logo-white.png"],
  ["cars_", "gallery/cars_"],
];

function placeAsset(relative) {
  let next = relative.replace(/^\/+/, "");
  for (const [from, to] of ASSET_MOVES) {
    if (next.startsWith(from)) return `${to}${next.slice(from.length)}`;
  }
  return next;
}

export function automotiveSrc(src) {
  const value = String(src || "").trim();
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  let path = value;
  if (value.startsWith("assets/")) path = `${ASSET_BASE}/${placeAsset(value.slice("assets/".length))}`;
  else if (value.startsWith("/rydora/assets/")) path = `${ASSET_BASE}/${placeAsset(value.slice("/rydora/assets/".length))}`;
  else if (value.startsWith("/automotive/images/")) path = `${ASSET_BASE}/${placeAsset(value.slice("/automotive/images/".length))}`;
  else if (value.startsWith("/images/")) path = `${IMAGE_BASE}${value}`;
  return path.replace(/ /g, "%20");
}

export function AutomotiveImage({ src, alt, width, height, fill, ...rest }: AutomotiveImageProps) {
  const resolved = typeof src === "string" ? automotiveSrc(src) : src;
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

const PAGE_LABELS = {
  about: "About Us",
  portfolio: "Portfolio",
  services: "Services",
  gallery: "Gallery",
  blog: "Blogs",
  contact: "Contact Us",
  enquiry: "Enquiry",
};

function flatten(links = []) {
  return (links || []).flatMap((link) => [link, ...flatten(link.children || [])]);
}

function navSlug(value) {
  const raw = String(value || "").trim().toLowerCase();
  const slug = raw
    .replace(/^#page-/, "")
    .replace(/^\/+/, "")
    .split(/[/?#]/)[0]
    .replace(/\s+/g, "-");
  if (!slug || slug === "home" || slug === "#") return "home";
  if (slug === "blogs") return "blog";
  if (slug === "cars" || slug === "car") return "portfolio";
  if (slug === "about-us") return "about";
  if (slug === "contact-us") return "contact";
  return slug;
}

function labelForSlug(preview, slug, fallback) {
  const wanted = navSlug(slug);
  const match = flatten(preview?.pageLinks).find((link) => {
    const href = String(link.href || "").trim().toLowerCase();
    const fromHref = href.startsWith("#page-")
      ? href.slice("#page-".length)
      : href.startsWith("/")
        ? href.replace(/^\/+/, "").split(/[/?#]/)[0]
        : "";
    const label = String(link.label || "").trim();
    return navSlug(fromHref) === wanted || navSlug(label) === wanted || label.toLowerCase() === fallback.trim().toLowerCase();
  });
  return match?.label || fallback;
}

function scrollTemplateToTop() {
  const scrollContainer = document.querySelector("[data-template-scroll]");
  if (scrollContainer) {
    scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function navigateAutomotiveHref(href, preview) {
  const raw = String(href || "").trim();
  if (!preview || !raw) return false;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) return false;
  if (raw.toLowerCase().startsWith("#page-")) {
    const slug = raw.slice("#page-".length);
    const fallback = PAGE_LABELS[navSlug(slug)] || slug;
    preview.setCurrentPage(labelForSlug(preview, slug, fallback));
    scrollTemplateToTop();
    return true;
  }
  if (raw.startsWith("#") && raw !== "#") return false;
  const path = raw.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  const parts = path === "/" ? [] : path.replace(/^\//, "").split("/").filter(Boolean);
  const slug = parts[0] || "home";
  const fallback = !parts.length ? "Home" : PAGE_LABELS[navSlug(slug)] || slug;
  preview.setCurrentPage(labelForSlug(preview, slug, fallback));
  scrollTemplateToTop();
  return true;
}

export function AutomotiveLink({ href, onClick, children, ...props }: AutomotiveLinkProps) {
  const preview = useOptionalPreview();
  return (
    <a
      href={href || "#"}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (navigateAutomotiveHref(String(href || ""), preview)) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

export function useAutomotivePathname(): string {
  const preview = useOptionalPreview();
  const current = String(preview?.currentPage || "Home").trim().toLowerCase();
  if (!current || current === "home") return "/";
  const entry = Object.entries(PAGE_LABELS).find(([, label]) => label.toLowerCase() === current);
  if (entry) return `/${entry[0]}`;
  if (current.includes("about")) return "/about";
  if (current.includes("portfolio") || current.includes("car")) return "/portfolio";
  if (current.includes("service")) return "/services";
  if (current.includes("gallery")) return "/gallery";
  if (current.includes("blog")) return "/blog";
  if (current.includes("contact")) return "/contact";
  if (current.includes("enquir") || current.includes("inquir")) return "/enquiry";
  return "/";
}
