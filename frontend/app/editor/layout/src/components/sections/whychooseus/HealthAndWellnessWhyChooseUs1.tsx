// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image } from "../health-and-wellness/shared";
type MedicareDataProps = { data?: any; limit?: number };

import React from "react";

const handPaths = (
  <>
    <path d="M5 28h6v14H5z" />
    <path d="M11 30l6-3h8a3 3 0 0 1 0 6h-6" />
    <path d="M25 33l9-5a3 3 0 0 1 3.5 4.8L27 40H11" />
  </>
);

const iconPaths: Record<string, React.ReactNode> = {
  users: (
    <>
      <circle cx="24" cy="15" r="5.5" />
      <path d="M14 38v-3a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8v3z" />
      <circle cx="11.5" cy="19" r="4" />
      <path d="M14 28.5a6 6 0 0 0-9 5.2V36h9" />
      <circle cx="36.5" cy="19" r="4" />
      <path d="M34 28.5a6 6 0 0 1 9 5.2V36h-9" />
    </>
  ),
  "cross-hand": (
    <>
      <path d="M21 4h6v5h5v6h-5v5h-6v-5h-5V9h5z" />
      {handPaths}
    </>
  ),
  hospital: (
    <>
      <path d="M12 42V8h24v34M12 20H5v22h7M36 20h7v22h-7M3 42h42" />
      <path d="M24 11v7M20.5 14.5h7" />
      <path d="M17 24h4v4h-4zM27 24h4v4h-4zM17 31h4v4h-4zM27 31h4v4h-4z" />
      <path d="M8 26h1M8 32h1M39 26h1M39 32h1" />
    </>
  ),
  heart: (
    <>
      <path d="M24 41S5 30 5 17.5A9.5 9.5 0 0 1 24 13a9.5 9.5 0 0 1 19 4.5C43 30 24 41 24 41z" />
      <path d="M10 24h7l3-5 4 10 3-5h11" />
    </>
  ),
  shield: (
    <>
      <path d="M24 4l16 6v12c0 10-7 18-16 22C15 40 8 32 8 22V10z" />
      <path d="M17 24l5 5 9-10" />
    </>
  ),
  "hand-heart": (
    <>
      <circle cx="15" cy="10" r="3" />
      <circle cx="24" cy="8" r="3.5" />
      <circle cx="33" cy="10" r="3" />
      <path d="M10 21a5 5 0 0 1 10 0M18 19.5a6 6 0 0 1 12 0M28 21a5 5 0 0 1 10 0" />
      {handPaths}
    </>
  ),
};

const renderCardIcon = (icon: string, color: string) => {
  if (!iconPaths[icon]) return null;
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-10 h-10"
      fill="none"
      stroke={color === "green" ? "#00a859" : "#042a4d"}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[icon]}
    </svg>
  );
};

function WhyChooseUs({ data }: MedicareDataProps) {
  if (!data?.heading || !Array.isArray(data.list)) return null;
  const {
    badge,
    description,
    image: doctorImage,
    list: features,
  } = data;

  return (
    <section className="relative w-full py-10 lg:py-12 bg-gradient-to-br from-[#f7fafd] via-white to-[#f3f8fc] overflow-hidden select-none">
      {/* Background Soft Blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ecf9fb]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* ── LEFT: Doctor with Patient Image + Navy & Green Blocks (Span 4) ── */}
        <div className="lg:col-span-4 relative flex justify-center py-6 px-4">
          <div className="relative w-full max-w-[360px] lg:max-w-none">
            {/* 1. TOP-LEFT SOLID NAVY BLOCK */}
            <div className="absolute -top-6 -left-6 w-[55%] h-[45%] bg-[#042a4d] rounded-[28px] z-0 pointer-events-none" />

            {/* 2. BOTTOM-RIGHT SOLID EMERALD GREEN BLOCK */}
            <div className="absolute -bottom-6 -right-5 w-[48%] h-[38%] bg-[#00a859] rounded-[26px] z-0 pointer-events-none" />

            {/* 3. MAIN PATIENT & DOCTOR IMAGE */}
            <div className="relative z-10 w-full aspect-[1/1.22] rounded-[30px] overflow-hidden bg-slate-100 shadow-2xl border-4 border-white">
              <Image
                src={doctorImage}
                alt="Doctor with Elderly Patient"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 34vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Headings & 6 Feature Cards Grid (Span 8) ── */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
            <span className="text-[13px] font-bold text-[#00a859] tracking-wider uppercase">
              {badge}
            </span>
            <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-[1.18] tracking-tight mb-4">
            <span className="text-[#042a4d]">{data.heading.main}</span>{" "}
            <span className="text-[#00a859]">{data.heading.highlight}</span>
          </h2>

          {/* Intro Paragraph */}
          <p className="text-slate-500 text-sm sm:text-[14.5px] leading-relaxed mb-10 max-w-2xl">
            {description}
          </p>

          {/* 6 Feature Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((item: any) => {
              const isGreen = item.iconColor === "green";

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-[22px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                >
                  {/* Circular Icon Container */}
                  <div
                    className={`w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 transition-transform ${
                      isGreen ? "bg-[#e6f7ee]" : "bg-[#eaf3fc]"
                    }`}
                  >
                    {renderCardIcon(item.icon, item.iconColor)}
                  </div>

                  {/* Title */}
                  <h3 className="text-[16px] font-bold text-[#042a4d] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-[12.5px] sm:text-[13px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediCareWhyChooseUs1({ data }: SectionProps) {
  if (!data) return null;
  return <WhyChooseUs data={data as any} />;
}
