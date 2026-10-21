// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image, HealthLink as Link } from "../health-and-wellness/shared";
import { useOptionalPreview } from "../../context/PreviewContext";
import {
  filterMenuByHiddenPageLinks,
  isHiddenServicesPage,
} from "../../../lib/navVisibility";
type MedicareDataProps = { data?: any; limit?: number };

import React from "react";
import { ChevronRight, MapPin, Phone, Mail, ArrowUp } from "lucide-react";

function Footer({ data }: MedicareDataProps) {
  const preview = useOptionalPreview();
  if (!data?.contactInfo || !Array.isArray(data.quickLinks) || !Array.isArray(data.services) || !Array.isArray(data.socials)) return null;
  const servicesPageHidden = isHiddenServicesPage(preview?.pageLinks);
  const {
    description: aboutText,
    socials: socialLinks,
    contactInfo,
    copyright,
  } = data;
  const quickLinks = filterMenuByHiddenPageLinks(data.quickLinks, preview?.pageLinks);
  const servicesLinks = servicesPageHidden ? [] : data.services;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
        );
      case "instagram":
        return (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        );
      case "youtube":
        return (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
            <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3L10 15z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="w-full bg-[#032549] text-white pt-16 select-none font-sans">
      {/* ── Main Footer Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* ── Column 1: Brand Logo & About (Span 4) ── */}
          <div className="lg:col-span-4 flex flex-col pr-0 lg:pr-6">
            {/* Logo Image */}
            <Link href={data.logo?.href || "/"} className="inline-block mb-5">
              {data.logo?.src ? (
                <Image
                  src={data.logo.src}
                  alt={data.logo.alt || ""}
                  width={320}
                  height={80}
                  className="h-20 sm:h-[84px] w-auto object-contain"
                  priority
                />
              ) : null}
            </Link>

            <p className="text-slate-300 text-[13.5px] leading-relaxed mb-6 max-w-sm">
              {aboutText}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.platform}
                  className="w-11 h-11 rounded-full border border-slate-500/80 text-slate-200 hover:text-white hover:border-[#00a859] hover:bg-[#00a859] flex items-center justify-center transition-all duration-200"
                >
                  {renderSocialIcon(item.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* ── Grouped: Quick Links & Our Services (Span 5) ── */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-8">
            {/* ── Column 2: Quick Links ── */}
            <div>
              <div className="mb-5">
                <h4 className="text-[16px] font-bold text-white mb-2">
                  Quick Links
                </h4>
                <div className="w-7 h-[2px] bg-[#00a859] rounded-full" />
              </div>

              <ul className="space-y-2.5 text-[13.5px]">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-[#00c978] transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="leading-tight">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Column 3: Our Services ── */}
            {servicesLinks.length > 0 ? (
            <div>
              <div className="mb-5">
                <h4 className="text-[16px] font-bold text-white mb-2">
                  Our Services
                </h4>
                <div className="w-7 h-[2px] bg-[#00a859] rounded-full" />
              </div>

              <ul className="space-y-2.5 text-[13.5px]">
                {servicesLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-[#00c978] transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="leading-tight">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            ) : null}
          </div>

          {/* ── Column 4: Contact Information (Span 3) ── */}
          <div className="lg:col-span-3">
            <div className="mb-5">
              <h4 className="text-[16px] font-bold text-white mb-2">
                Contact Information
              </h4>
              <div className="w-7 h-[2px] bg-[#00a859] rounded-full" />
            </div>

            <div className="space-y-5 text-[13px]">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#008d75] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-[13.5px] leading-snug">
                    {contactInfo.address.title}
                  </p>
                  <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                    {contactInfo.address.value}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#008d75] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-[13.5px] leading-snug">
                    {contactInfo.phone.title}
                  </p>
                  <a
                    href={`tel:${contactInfo.phone.value.replace(/\s+/g, "")}`}
                    className="text-slate-200 hover:text-white font-medium"
                  >
                    {contactInfo.phone.value}
                  </a>
                  <p className="text-slate-400 text-[11.5px] mt-0.5">
                    {contactInfo.phone.timing}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#008d75] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-[13.5px] leading-snug">
                    {contactInfo.email.title}
                  </p>
                  <a
                    href={`mailto:${contactInfo.email.value}`}
                    className="text-slate-200 hover:text-white"
                  >
                    {contactInfo.email.value}
                  </a>
                  <p className="text-slate-400 text-[11.5px] mt-0.5">
                    {contactInfo.email.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Sub-Footer Bar ── */}
      <div className="border-t border-[#063564] bg-[#021d3a] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 flex items-center justify-center text-[14.5px] sm:text-[15px] text-slate-300 tracking-wide">
          {/* Copyright */}
          <div className="text-center">
            <span>{copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function MediCareFooter1({ data }: SectionProps) {
  if (!data) return null;
  return <Footer data={data as any} />;
}
