"use client";

import { AutomotiveImage as Image } from "@/app/editor/layout/src/components/sections/rydora/addons/shared";
import { AutomotiveLink as Link } from "@/app/editor/layout/src/components/sections/rydora/addons/shared";
import { useAutomotivePathname as usePathname } from "@/app/editor/layout/src/components/sections/rydora/addons/shared";
import { useOptionalPreview } from "@/app/editor/layout/src/components/context/PreviewContext";
import { filterMenuByHiddenPageLinks } from "@/app/editor/layout/src/lib/navVisibility";
import { useEffect, useRef, useState } from "react";

interface HeaderMenuLink {
  label: string;
  href: string;
}

interface HeaderData {
  logo: { src: string; alt: string };
  menu: HeaderMenuLink[];
  cta: { label: string; href: string; hrefMobile?: string };
}

export default function Navbar({ data }: { data?: HeaderData }) {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const preview = useOptionalPreview();
  const menu = filterMenuByHiddenPageLinks(
    Array.isArray(data?.menu) ? data.menu : [],
    preview?.pageLinks,
  );
  const linkPath = (href: string) => {
    const raw = String(href || "").trim().toLowerCase();
    if (
      !raw ||
      raw === "/" ||
      raw === "#" ||
      raw === "/home" ||
      raw === "home" ||
      raw === "#home" ||
      raw === "#page-home"
    ) {
      return "/";
    }
    const slug = raw.replace(/^#page-/, "").replace(/^\/+/, "").split(/[/?#]/)[0];
    if (!slug || slug === "home") return "/";
    if (slug === "blogs") return "/blog";
    if (slug === "about-us") return "/about";
    if (slug === "contact-us") return "/contact";
    return `/${slug}`;
  };
  const isActive = (href: string) => linkPath(href) === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>("[data-template-scroll]");
    const pin = () => {
      const header = headerRef.current;
      const top = scroller ? scroller.scrollTop : window.scrollY;
      setScrolled(top > 40);
      if (!header) return;
      const box = scroller
        ? scroller.getBoundingClientRect()
        : { top: 0, left: 0, width: window.innerWidth };
      header.style.position = "fixed";
      header.style.top = `${box.top}px`;
      header.style.left = `${box.left}px`;
      header.style.width = `${box.width}px`;
      header.style.right = "auto";
      header.style.zIndex = "300";
    };
    pin();
    scroller?.addEventListener("scroll", pin, { passive: true });
    window.addEventListener("resize", pin);
    return () => {
      scroller?.removeEventListener("scroll", pin);
      window.removeEventListener("resize", pin);
    };
  }, []);

  if (!data) return null;

  return (
    <header
      ref={headerRef}
      className={`z-[300] w-full transition-all duration-500 ease-out ${
        scrolled || open
          ? "border-b border-copper/25 bg-[#140b06]/90 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-all duration-500 ease-out sm:px-8 lg:px-12 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <Link href="/" className="shrink-0">
          <Image
            src={data.logo.src}
            alt={data.logo.alt}
            width={2172}
            height={724}
            priority
            className={`w-auto transition-all duration-500 ease-out ${
              scrolled ? "h-12 sm:h-14 lg:h-[58px]" : "h-14 sm:h-16 lg:h-[clamp(3.25rem,9vh,4.375rem)]"
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {menu.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative py-2 text-[15px] font-medium transition-colors ${
                isActive(link.href)
                  ? "text-copper-light after:absolute after:inset-x-0 after:-bottom-1 after:mx-auto after:h-[3px] after:w-full after:rounded-full after:bg-copper"
                  : "text-white/90 hover:text-copper-light"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={data.cta.href}
          className="hidden items-center gap-3 rounded-full border border-copper-light/60 bg-gradient-to-b from-copper-light to-copper-dark px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-black/30 transition hover:brightness-110 lg:inline-flex xl:px-7"
        >
          {data.cta.label}
          <ArrowRight />
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur lg:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="mx-5 rounded-2xl border border-white/10 bg-black/85 p-5 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {menu.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-base font-medium ${
                  isActive(link.href)
                    ? "text-copper-light"
                    : "text-white/90 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href={data.cta.hrefMobile ?? data.cta.href}
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-3 rounded-full bg-gradient-to-b from-copper-light to-copper-dark px-6 py-3 font-semibold text-white"
          >
            {data.cta.label}
            <ArrowRight />
          </Link>
        </div>
      )}
    </header>
  );
}

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
