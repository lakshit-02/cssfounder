// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
type MedicareDataProps = { data?: any; limit?: number };

import React from "react";

// Vector icons exact matching screenshot style
const renderStepIcon = (icon: string) => {
  switch (icon) {
    case "document":
      return (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 stroke-[#042a4d] fill-none stroke-[2.2]"
        >
          <path d="M14 6h14l10 10v24a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
          <path d="M28 6v10h10" />
          <line x1="18" y1="24" x2="30" y2="24" strokeLinecap="round" />
          <line x1="18" y1="30" x2="30" y2="30" strokeLinecap="round" />
          <line x1="18" y1="36" x2="26" y2="36" strokeLinecap="round" />
        </svg>
      );
    case "calendar":
      return (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 stroke-[#042a4d] fill-none stroke-[2.2]"
        >
          <rect x="8" y="10" width="32" height="28" rx="4" />
          <line x1="16" y1="6" x2="16" y2="12" strokeLinecap="round" />
          <line x1="32" y1="6" x2="32" y2="12" strokeLinecap="round" />
          <line x1="8" y1="18" x2="40" y2="18" />
          <circle cx="16" cy="26" r="1.5" className="fill-[#042a4d]" />
          <circle cx="24" cy="26" r="1.5" className="fill-[#042a4d]" />
          <circle cx="32" cy="26" r="1.5" className="fill-[#042a4d]" />
          <circle cx="16" cy="32" r="1.5" className="fill-[#042a4d]" />
          <circle cx="24" cy="32" r="1.5" className="fill-[#042a4d]" />
          <circle cx="32" cy="32" r="1.5" className="fill-[#042a4d]" />
        </svg>
      );
    case "doctor":
      return (
        <svg
          viewBox="0 0 48 48"
          className="w-7 h-7 stroke-[#042a4d] fill-none stroke-[2.2]"
        >
          <circle cx="24" cy="14" r="6" />
          <path d="M12 38v-4a7 7 0 0 1 7-7h10a7 7 0 0 1 7 7v4" />
          <path d="M21 28l3 4 3-4" />
          <path d="M24 32v6" />
        </svg>
      );
    default:
      return null;
  }
};

function HowItWorks({ data }: MedicareDataProps) {
  if (!data?.heading || !Array.isArray(data.list)) return null;
  const { badge, list: steps } = data;

  return (
    <section className="relative w-full pt-6 pb-12 lg:pt-10 lg:pb-16 bg-[#f7fbfd]/90 overflow-hidden select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* ── LEFT: Title & Badge Area (Span 4) ── */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
            <span className="text-[13px] font-bold text-[#00a859] tracking-wider">
              {badge}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[30px] sm:text-[36px] font-extrabold leading-[1.18] tracking-tight">
            <span className="text-[#042a4d] block">{data.heading.main}</span>
            <span className="text-[#00a859] block">{data.heading.highlight}</span>
          </h2>
        </div>

        {/* ── RIGHT: Connected Steps (Span 8) ── */}
        <div className="lg:col-span-8 relative">
          {/* Horizontal Connecting Dotted Line (Desktop only) */}
          <div className="hidden md:block absolute top-9 left-[15%] right-[15%] border-t-2 border-dotted border-sky-200/90 -z-0" />

          {/* Steps List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative z-10">
            {steps.map((step: any) => (
              <div
                key={step.stepNumber}
                className="flex flex-col items-center text-center group"
              >
                {/* Round Icon with Floating Number Badge */}
                <div className="relative mb-4">
                  {/* Outer circle icon wrapper */}
                  <div className="w-[74px] h-[74px] rounded-full bg-white shadow-[0_8px_24px_rgba(4,42,77,0.08)] border border-sky-100 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_12px_28px_rgba(4,42,77,0.12)]">
                    {renderStepIcon(step.icon)}
                  </div>

                  {/* Top-Right Green Number Badge */}
                  <div className="absolute top-0 right-0 w-[22px] h-[22px] rounded-full bg-[#00a859] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                    {step.stepNumber}
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-[16px] font-extrabold text-[#042a4d] mb-1.5 leading-snug">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-slate-500 text-[12.5px] sm:text-[13px] leading-relaxed max-w-[210px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediCareWorkingProcess1({ data }: SectionProps) {
  if (!data) return null;
  return <HowItWorks data={data as any} />;
}
