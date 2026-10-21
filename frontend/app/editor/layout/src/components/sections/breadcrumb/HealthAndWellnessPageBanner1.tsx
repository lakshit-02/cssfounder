// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image, HealthLink as Link, useHealthPathname } from "../health-and-wellness/shared";
type MedicareDataProps = { data?: any; limit?: number };

import React from "react";
import { ChevronRight, Phone } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  bgImage?: string;
  phone?: string;
}

function PageBanner({
  title,
  breadcrumbs,
  bgImage,
  phone,
}: PageBannerProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden flex items-center justify-center font-sans select-none">
      {/* Background Image */}
      {bgImage ? (
        <Image
          src={bgImage}
          alt={title || "Banner Background"}
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority
        />
      ) : null}

      {/* Dark Blue Overlay */}
      <div className="absolute inset-0 bg-[#073260]/85" />



      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-[-20px]">
        <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
          {title}
        </h1>
        <div className="flex items-center justify-center text-[15px] font-bold">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-white stroke-[3]" />
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-[#00c5c5] hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Floating Bottom Right Phone Badge */}
      <div className="absolute bottom-0 right-6 sm:right-16 md:right-32 lg:right-48 z-20 flex items-end">
        {/* Left Inverted Curve */}
        <svg
          className="w-8 h-8 text-white translate-x-[1px]"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M32 32V0C32 17.673 17.673 32 0 32H32Z" />
        </svg>

        <div className="bg-white px-3 pt-3 pb-0 rounded-t-[40px] relative">
          {phone ? (
          <a
            href={`tel:${String(phone).replace(/\s+/g, "")}`}
            className="flex items-center gap-3 bg-[#00c9c9] hover:bg-[#00b0b0] text-white px-6 py-[14px] rounded-full transition-colors relative z-10"
          >
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-[18px] h-[18px] text-[#073260] fill-current" />
            </div>
            <span className="font-semibold text-[17px] tracking-wide pr-2">
              {phone}
            </span>
          </a>
          ) : null}
        </div>

        {/* Right Inverted Curve */}
        <svg
          className="w-8 h-8 text-white -translate-x-[1px]"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M0 32V0C0 17.673 14.327 32 32 32H0Z" />
        </svg>
      </div>
    </div>
  );
}

export default function MediCarePageBanner1({ data }: SectionProps) {
  const path = useHealthPathname();
  const raw = (data ?? {}) as {
    title?: string;
    phone?: string;
    breadcrumbs?: { label: string; href?: string }[];
    bgImage?: string;
    image?: string;
    pages?: Record<string, { title?: string; phone?: string; breadcrumbs?: { label: string; href?: string }[]; bgImage?: string; image?: string }>;
  };
  const pageKey = path.replace(/^\//, "");
  const fromPage = raw.pages?.[pageKey] || raw.pages?.[pageKey === "teams" ? "team" : pageKey];
  const title = (raw.title && String(raw.title).trim()) || fromPage?.title || "";
  const phone = (raw.phone && String(raw.phone).trim()) || fromPage?.phone || "";
  const breadcrumbs =
    (Array.isArray(raw.breadcrumbs) && raw.breadcrumbs.length ? raw.breadcrumbs : null) ||
    fromPage?.breadcrumbs ||
    (title ? [{ label: "Home", href: "/" }, { label: title }] : []);
  return (
    <PageBanner
      title={title}
      phone={phone}
      breadcrumbs={breadcrumbs}
      bgImage={raw.bgImage || raw.image || fromPage?.bgImage || fromPage?.image}
    />
  );
}
