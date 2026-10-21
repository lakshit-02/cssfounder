// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image } from "../health-and-wellness/shared";
type MedicareDataProps = { data?: any; limit?: number };

import React from "react";

const iconPaths: Record<string, React.ReactNode> = {
  target: (
    <>
      <circle cx="22" cy="26" r="17" />
      <circle cx="22" cy="26" r="10.5" />
      <circle cx="22" cy="26" r="4" />
      <path d="M22 26L38 10" />
      <path d="M34 14l1-6 5-5-1 6 6-1-5 5z" />
    </>
  ),
  eye: (
    <>
      <path d="M4 28s7-11 20-11 20 11 20 11-7 11-20 11S4 28 4 28z" />
      <circle cx="24" cy="28" r="7" />
      <path d="M24 24.5v7M20.5 28h7" />
      <path d="M24 6v5M13 9l2.5 4M35 9l-2.5 4M5 15l3.5 2.5M43 15l-3.5 2.5" />
    </>
  ),
  diamond: (
    <>
      <path d="M10 22l7-9h14l7 9-14 20z" />
      <path d="M10 22h28M17 13l3 9 4-9 4 9 3-9M20 22l4 20 4-20" />
      <path d="M24 3v5M11 6l3 3.5M37 6l-3 3.5M4 14h4M40 14h4" />
    </>
  ),
};

const renderIcon = (icon: string, green: boolean) => {
  if (!iconPaths[icon]) return null;
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-9 h-9"
      fill="none"
      stroke={green ? "#00a859" : "#042a4d"}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[icon]}
    </svg>
  );
};

function MissionVision({ data }: MedicareDataProps) {
  if (!data?.heading || !Array.isArray(data.list)) return null;
  const { badge, description, list: items, image } = data;

  return (
    <section className="relative w-full py-10 lg:py-12 bg-gradient-to-br from-[#f7fafd] via-white to-[#f3f8fc] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* ── LEFT: Text Content & Cards (Span 7) ── */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-3.5">
            <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
            <span className="text-[13px] font-bold text-[#00a859] tracking-wider">
              {badge}
            </span>
            <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold leading-[1.15] tracking-tight mb-4">
            <span className="text-[#042a4d] block">{data.heading.main}</span>
            <span className="text-[#00a859]">{data.heading.highlight}</span>
          </h2>

          {/* Intro Description */}
          <p className="text-slate-500 text-sm sm:text-[14.5px] leading-relaxed mb-8 max-w-xl">
            {description}
          </p>

          {/* 3 Information Cards */}
          <div className="space-y-4">
            {items.map((item: any) => {
              const isVision = item.title.toLowerCase() === "vision";

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-300 flex items-center gap-5 sm:gap-6"
                >
                  {/* Round Icon */}
                  <div
                    className={`w-[72px] h-[72px] rounded-full flex items-center justify-center shrink-0 ${
                      isVision ? "bg-[#e6f7ee]" : "bg-[#eaf3fc]"
                    }`}
                  >
                    {renderIcon(item.icon, isVision)}
                  </div>

                  <span className="hidden sm:block w-px self-stretch bg-slate-200 my-1" />

                  {/* Card Text */}
                  <div className="flex flex-col">
                    <h3
                      className={`text-[17px] font-bold mb-1.5 leading-snug ${
                        isVision ? "text-[#00a859]" : "text-[#042a4d]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-[13px] sm:text-[13.5px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Doctor Image With Proper Offset Background Cards ── */}
        <div className="lg:col-span-5 relative w-full flex justify-center py-10 px-6">
          <div className="relative w-full max-w-[480px]">
            {/* 1. TOP-RIGHT FADED LIGHT MINT GREEN SHAPE (Ab clearly visible hoga) */}
            <div className="absolute -top-7 -right-7 sm:-top-9 sm:-right-9 w-[60%] h-[55%] bg-[#d6f2e3] rounded-[36px] z-0 pointer-events-none" />

            {/* 2. BOTTOM-RIGHT DARK NAVY SOLID BLOCK */}
            <div className="absolute -bottom-8 -right-6 sm:-bottom-9 sm:-right-7 w-[42%] h-[40%] bg-[#042a4d] rounded-[28px] z-0 pointer-events-none" />

            {/* 3. MAIN DOCTOR IMAGE CONTAINER */}
            <div className="relative z-10 w-full aspect-[1/1.15] rounded-[34px] overflow-hidden bg-slate-100 shadow-2xl border-4 border-white">
              <Image
                src={image}
                alt="Medical Team Discussion"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediCareMissionAndVision1({ data }: SectionProps) {
  if (!data) return null;
  return <MissionVision data={data as any} />;
}
