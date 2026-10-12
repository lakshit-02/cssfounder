// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import type { SectionProps } from "../../../types/section";
import { useOptionalPreview } from "../../context/PreviewContext";
import { filterMenuByHiddenPageLinks } from "../../../lib/navVisibility";
/* ─── Icons ──────────────────────────────────────── */
const PhoneIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);
const MailIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
const MapPinIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 3v4M16 3v4M3 10h14" />
    <path d="M11 21H5a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v3" />
    <path d="M17.5 22a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
    <path d="M17.5 15.5v2l1.3 1" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg className="hidden h-4 w-4 sm:block" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);
const ChevronDownIcon = ({ open }: { open?: boolean }) => (
  <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);
const MenuBarsIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const CloseIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const HomeIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
  </svg>
);

const contactIconMap: Record<string, React.ReactNode> = {
  phone:     <PhoneIcon />,
  phoneFill: <PhoneIcon />,
  mail:      <MailIcon />,
  "map-pin": <MapPinIcon />,
  pin:       <MapPinIcon />,
  location:  <MapPinIcon />,
};

const tones: Record<string, { bg: string; hover: string }> = {
  orange: { bg: "bg-[#fde8dc] text-[#ff6b00]", hover: "group-hover/item:bg-[#ff6b00] group-hover/item:text-white" },
  blue:   { bg: "bg-[#dde8fa] text-[#1d5fd1]", hover: "group-hover/item:bg-[#1d5fd1] group-hover/item:text-white" },
};

const tabClip = { clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" };

const COOLFIX_PAGE_HREFS: Record<string, string> = {
  home: "#",
  "about us": "#page-about",
  "our services": "#page-services",
  gallery: "#page-gallery",
  "get a quote": "#page-get-a-quote",
  "contact us": "#page-contact",
  "book a service": "#page-book-service",
};

const COOLFIX_ACTIVE_LABELS: Record<string, string[]> = {
  home: ["home"],
  "about us": ["about", "about us"],
  "our services": ["services", "our services", "service", "service detail"],
  gallery: ["gallery"],
  "get a quote": ["get a quote", "get-a-quote"],
  "contact us": ["contact", "contact us"],
  "book a service": ["book service", "book a service", "book-service"],
};

function withCoolFixHref<T extends { label?: string; href?: string }>(link: T): T {
  const href = COOLFIX_PAGE_HREFS[String(link?.label || "").trim().toLowerCase()];
  return href ? { ...link, href } : link;
}

const COOLFIX_LOGO = "/services/images/coolfix-logo.png";

function resolveHeader(data: any) {
  const logo = data?.logo ?? {};
  const rawSrc = typeof logo === "string" ? logo : logo.src ?? "";
  const logoSrc =
    typeof rawSrc === "string" && (rawSrc.startsWith("/") || rawSrc.startsWith("http"))
      ? rawSrc.replace(/ /g, "%20")
      : COOLFIX_LOGO;
  const logoAlt: string = typeof logo === "string" ? "CoolFix" : logo.alt ?? "CoolFix";
  const contacts = Array.isArray(data?.contacts) ? data.contacts : [];
  const menu = (Array.isArray(data?.menu) ? data.menu : []).flatMap((item: any) => {
    const link = withCoolFixHref(item);
    if (!link || typeof link !== "object") return [];
    const label = String(link.label || "").trim().toLowerCase();
    const href = String(link.href || "").trim().toLowerCase();
    if (label === "service" || label === "services") return [];
    if (
      label === "blog" ||
      label === "blogs" ||
      label === "team" ||
      label === "teams" ||
      href === "#page-blog" ||
      href === "#page-blogs" ||
      href === "#page-team" ||
      href === "#page-teams"
    ) {
      return [];
    }
    const { children: _children, ...rest } = link;
    return [rest];
  });
  const cta = data?.cta ? withCoolFixHref(data.cta) : {};
  return { logoSrc, logoAlt, contacts, menu, cta };
}

/* ─── Component ─────────────────────────────────── */
function CoolFixHeaderSection({ data }: { data?: any }) {
  const { logoSrc, logoAlt, contacts, menu: sourceMenu, cta } = resolveHeader(data);
  const preview = useOptionalPreview();
  const menu = filterMenuByHiddenPageLinks(sourceMenu, preview?.pageLinks);
  const currentPage = String(preview?.currentPage || "Home").trim().toLowerCase();
  const [menuOpen, setMenuOpen]         = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navPinned, setNavPinned] = useState(false);
  const [pinBox, setPinBox] = useState<{ top: number; left: number; width: number } | null>(null);
  const navSlotRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>("[data-template-scroll]");
    const update = () => {
      const slot = navSlotRef.current;
      if (!slot) return;
      const slotRect = slot.getBoundingClientRect();
      const scrollerScrolls =
        !!scroller && scroller.scrollHeight > scroller.clientHeight + 8;
      const bounds = scrollerScrolls
        ? scroller.getBoundingClientRect()
        : { top: 0, left: 0, width: window.innerWidth };
      setNavPinned(slotRect.top <= bounds.top + 1);
      setPinBox({ top: bounds.top, left: bounds.left, width: bounds.width });
    };
    update();
    scroller?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      scroller?.removeEventListener("scroll", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const isActiveLink = (label?: string) => {
    const key = String(label || "").trim().toLowerCase();
    const aliases = COOLFIX_ACTIVE_LABELS[key] || [key];
    return aliases.includes(currentPage);
  };

  return (
    <header className="w-full bg-white shadow-sm">

      {/* ── TOP BAR: Logo + 3 Contacts ── */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          {/* Logo */}
          <a href="#" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={logoAlt}
              className="h-12 w-auto object-contain sm:h-14"
            />
          </a>

          {/* Contacts — always visible */}
          <div className="flex flex-1 items-center justify-around">
            <span className="h-12 w-px bg-gray-200" />
            {contacts.map((c: any, idx: number) => {
              const tone = tones[c.tone ?? "orange"] ?? tones.orange;
              return (
                <React.Fragment key={c.label ?? idx}>
                  {idx > 0 && <span className="h-12 w-px bg-gray-200" />}
                  <a href={c.href ?? "#"} className="group/item flex items-center gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition ${tone.bg} ${tone.hover}`}>
                      {contactIconMap[c.icon] ?? <PhoneIcon />}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-gray-500">{c.label}</span>
                      <span className="block text-lg font-bold text-[#0b1c3d]">{c.value}</span>
                    </span>
                  </a>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── NAVBAR: hangs over the banner, sticks on scroll ── */}
      <div ref={navSlotRef} className="relative z-[80] h-8">
        <div
          className="z-[80]"
          style={
            navPinned && pinBox
              ? { position: "fixed", top: pinBox.top, left: pinBox.left, width: pinBox.width }
              : { position: "absolute", left: 0, right: 0, top: 0 }
          }
        >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[60px] items-center justify-between rounded-xl border border-gray-100 bg-white px-3 shadow-[0_8px_30px_rgba(11,28,61,0.10)]">

            {/* Desktop nav links — always visible in editor */}
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {menu.map((link: any) => {
                const isActive = isActiveLink(link.label);
                const isHome = String(link.label || "").trim().toLowerCase() === "home" || link.icon === "home";
                const hasChildren = Array.isArray(link.children) && link.children.length > 0;
                return (
                  <li key={link.label} className="group/item relative">
                    <a
                      href={link.href ?? "#"}
                      style={isActive ? tabClip : undefined}
                      className={
                        isActive
                          ? "flex h-10 items-center gap-2 rounded-l-md bg-[#ff6b00] pl-4 pr-9 text-[15px] font-semibold text-white"
                          : "flex h-10 items-center gap-1 px-3 text-[15px] font-semibold text-[#0b1c3d] transition hover:text-[#ff6b00]"
                      }
                    >
                      {isHome && isActive && <HomeIcon />}
                      {link.label}
                      {hasChildren && <ChevronDownIcon />}
                    </a>

                    {/* Dropdown */}
                    {hasChildren && (
                      <ul className="invisible absolute left-0 top-full z-50 min-w-[200px] translate-y-2 rounded-md border-t-2 border-[#ff6b00] bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100">
                        {link.children.map((child: any) => (
                          <li key={child.label}>
                            <a
                              href={child.href ?? "#"}
                              className="block px-5 py-2 text-sm font-medium text-[#0b1c3d] transition hover:bg-orange-50 hover:pl-6 hover:text-[#ff6b00]"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Mobile hamburger — hidden in editor */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="hidden h-10 w-10 items-center justify-center rounded-md bg-[#0b1c3d] text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuBarsIcon />}
            </button>

            {/* CTA Button */}
            <a
              href={cta?.href ?? "#"}
              className="flex h-10 items-center gap-2 rounded-full bg-[#ff6b00] px-4 text-sm font-semibold text-white shadow-md shadow-orange-500/30 transition hover:bg-[#e55f00] sm:h-11 sm:gap-3 sm:px-5 sm:text-[15px]"
            >
              <CalendarIcon />
              {cta?.label ?? "Book a Service"}
              <ArrowRightIcon />
            </a>
          </div>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div className="mt-1 rounded-xl border border-gray-100 bg-white shadow-lg lg:hidden">
              <ul className="px-4 py-2">
                {menu.map((link: any) => {
                  const hasChildren = Array.isArray(link.children) && link.children.length > 0;
                  const expanded = openDropdown === link.label;
                  return (
                    <li key={link.label} className="border-b border-gray-100 last:border-0">
                      <div className="flex items-center justify-between">
                        <a
                          href={link.href ?? "#"}
                          onClick={() => !hasChildren && setMenuOpen(false)}
                          className="flex-1 py-3 text-[15px] font-semibold text-[#0b1c3d]"
                        >
                          {link.label}
                        </a>
                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() => setOpenDropdown(expanded ? null : link.label)}
                            className="p-2"
                          >
                            <ChevronDownIcon open={expanded} />
                          </button>
                        )}
                      </div>
                      {hasChildren && expanded && (
                        <ul className="mb-2 ml-3 rounded-xl bg-gray-50 px-3 py-1">
                          {link.children.map((child: any) => (
                            <li key={child.label}>
                              <a
                                href={child.href ?? "#"}
                                onClick={() => setMenuOpen(false)}
                                className="block py-2 text-sm font-medium text-[#0b1c3d] hover:text-[#ff6b00]"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        </div>
      </div>

    </header>
  );
}

export default function CoolFixHeader1({ data }: SectionProps) {
  return <CoolFixHeaderSection data={data} />;
}
