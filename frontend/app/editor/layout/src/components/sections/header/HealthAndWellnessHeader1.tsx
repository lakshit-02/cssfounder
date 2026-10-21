// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image, HealthLink as Link } from "../health-and-wellness/shared";
import { useOptionalPreview } from "../../context/PreviewContext";
import { filterMenuByHiddenPageLinks } from "../../../lib/navVisibility";
type MedicareDataProps = { data?: any; limit?: number };

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

function navSlug(href?: string, label?: string) {
  const raw = String(href || "").trim().toLowerCase();
  const fromHref = raw
    .replace(/^#page-/, "")
    .replace(/^\/+/, "")
    .split(/[/?#]/)[0];
  return fromHref || String(label || "").trim().toLowerCase();
}

/** Editor page list can add Thank You and Book Appointment. The MediCare navbar does not. */
function isMenuLink(link: { href?: string; label?: string }) {
  const slug = navSlug(link.href, link.label);
  const label = String(link.label || "").trim().toLowerCase();
  if (!label) return false;
  if (slug === "thank-you" || slug === "thankyou" || label === "thank you") return false;
  if (
    slug === "book-appointment" ||
    slug === "appointment" ||
    slug === "appointments" ||
    label === "book appointment" ||
    label === "appointments"
  ) {
    return false;
  }
  return true;
}

function pageKey(value?: string) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw || raw === "/" || raw === "#" || raw === "home" || raw === "#home" || raw === "#page-home") {
    return "home";
  }
  const slug = raw
    .replace(/^#page-/, "")
    .replace(/^#/, "")
    .replace(/^\/+/, "")
    .split(/[/?#]/)[0]
    .replace(/\s+/g, "-");
  if (!slug || slug === "home") return "home";
  if (slug === "teams" || slug === "our-team") return "team";
  if (slug === "our-services" || slug === "service") return "services";
  if (slug === "about-us") return "about";
  if (slug === "contact-us") return "contact";
  if (slug === "appointment" || slug === "appointments") return "book-appointment";
  return slug;
}

function isNavActive(href: string, label: string, currentPage: string) {
  const current = String(currentPage || "Home").trim().toLowerCase();
  const linkLabel = String(label || "").trim().toLowerCase();
  if (linkLabel && linkLabel === current) return true;
  const currentKey = pageKey(current);
  return pageKey(href) === currentKey || pageKey(linkLabel) === currentKey;
}

function Navbar({ data }: MedicareDataProps) {
  const preview = useOptionalPreview();
  const currentPage = preview?.currentPage || "Home";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!data) return null;
  const navLinks = filterMenuByHiddenPageLinks(
    (Array.isArray(data.menu) ? data.menu : []).filter(isMenuLink),
    preview?.pageLinks,
  );
  const ctaButton = data.cta || { label: "", href: "" };
  const logo = data.logo;

  return (
    <nav className="w-full bg-white shadow-sm border-b border-slate-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2.5 sm:px-8 md:px-10">
        <Link href={logo?.href || "/"} className="flex shrink-0 items-center">
          {logo?.src ? (
            <Image
              src={logo.src}
              alt={logo.alt || "MediCare Clinic Logo"}
              width={320}
              height={80}
              className="h-14 w-auto object-contain md:h-[62px]"
              priority
            />
          ) : null}
        </Link>

        <div className="hidden items-center gap-7 text-[15px] font-semibold md:flex">
          {navLinks.map((link) => {
            const isActive = isNavActive(link.href, link.label, currentPage);

            return (
              <Link
                key={link.label}
                href={link.href}
                className="relative py-2"
                style={{
                  color: isActive ? "var(--primary-bg, #0070ba)" : "#2d3748",
                  borderBottom: isActive
                    ? "3px solid var(--primary-bg, #0070ba)"
                    : "3px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {ctaButton.label ? (
            <Link
              href={ctaButton.href}
              className="hidden items-center gap-2 rounded-lg bg-[#043365] px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm md:inline-flex"
            >
              <span>{ctaButton.label}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          ) : null}

          <button
            className="rounded-lg p-2 text-[#043365] hover:bg-slate-100 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full z-50 flex w-full flex-col border-b border-slate-100 bg-white px-6 py-4 shadow-lg md:hidden">
          {navLinks.map((link) => {
            const isActive = isNavActive(link.href, link.label, currentPage);

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-slate-50 py-3 text-[16px] font-semibold last:border-none"
                style={{ color: isActive ? "var(--primary-bg, #0070ba)" : "#2d3748" }}
              >
                {link.label}
              </Link>
            );
          })}

          {ctaButton.label ? (
            <Link
              href={ctaButton.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="sm:hidden mt-4 inline-flex items-center justify-center gap-2 bg-[#043365] hover:bg-[#032347] text-white px-6 py-3.5 rounded-lg text-[15px] font-semibold shadow-sm"
            >
              <span>{ctaButton.label}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : null}
        </div>
      )}
    </nav>
  );
}

export default function MediCareHeader1({ data }: SectionProps) {
  if (!data) return null;
  return <Navbar data={data as any} />;
}
