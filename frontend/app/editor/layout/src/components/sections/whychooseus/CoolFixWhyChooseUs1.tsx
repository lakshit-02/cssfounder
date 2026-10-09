// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import type { SectionProps } from "../../../types/section";
const NAVY = "#0b2a5b";
const ORANGE = "#ff6b00";

function FeatureIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-10 w-10",
    "aria-hidden": true,
  };
  switch (name) {
    case "technician":
      return (
        <svg {...common} stroke={NAVY}>
          <path d="M15 19c0-5.5 4-9.5 9-9.5s9 4 9 9.5" fill={ORANGE} stroke={ORANGE} />
          <path d="M12.5 19h23" stroke={ORANGE} strokeWidth={2.6} />
          <path d="M16.5 19.5v2a7.5 7.5 0 0015 0v-2" />
          <path d="M8 42v-3c0-5.5 4.5-9.5 10-9.5h12c5.5 0 10 4 10 9.5v3z" />
          <path d="M19 29.5l5 5.5 5-5.5" />
          <path d="M17 42v-7M31 42v-7" stroke={ORANGE} />
        </svg>
      );
    case "acUnit":
      return (
        <svg {...common} stroke={NAVY}>
          <rect x="5" y="10" width="38" height="16" rx="3" />
          <path d="M9.5 21h29" />
          <path d="M34 15h4" stroke={ORANGE} />
          <g stroke={ORANGE}>
            <path d="M17 30.5c-1.8 1.8 1.8 3.2 0 5s1.8 3.2 0 5" />
            <path d="M24 30.5c-1.8 1.8 1.8 3.2 0 5s1.8 3.2 0 5" />
            <path d="M31 30.5c-1.8 1.8 1.8 3.2 0 5s1.8 3.2 0 5" />
          </g>
        </svg>
      );
    case "rupee":
      return (
        <svg {...common} stroke={NAVY}>
          <circle cx="26" cy="15" r="10" stroke={ORANGE} />
          <path d="M22 10.5h8M22 14h8M24 10.5c4.5 0 4.5 7 0 7h-2l6 4.5" stroke={ORANGE} strokeWidth={2} />
          <path d="M5 31h6v12H5" />
          <path d="M11 33l5-2.5h6.5a2.5 2.5 0 010 5H18" />
          <path d="M22 35.5l11-4a2.6 2.6 0 012.4 4.6L24 42H11" />
        </svg>
      );
    default:
      return null;
  }
}

function WhyChooseUsSection({ data }: { data?: any }) {
  const raw = data ?? {};
  const d = {
    badge: raw?.badge ?? "",
    heading: raw?.heading ?? {},
    list: Array.isArray(raw?.list) ? raw.list : [],
    image: raw?.image ?? "",
  };

  return (
    <section className="overflow-hidden bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:px-8">
        {/* Left: Text */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-0.5 w-12 bg-[#ff6b00]" />
            <span className="text-sm font-bold uppercase tracking-wider text-[#0b2a5b]">{d.badge}</span>
            <span className="h-0.5 w-12 bg-[#ff6b00]" />
          </div>
          <h2 className="mb-10 text-3xl font-extrabold leading-[1.15] tracking-tight text-[#0b2a5b] sm:text-4xl lg:text-[clamp(1.85rem,2.8vw,2.3rem)]">
            {d.heading.main}
            <br />
            {d.heading.middle}{" "}
            <span className="text-[#ff6b00]">{d.heading.highlight}</span>
          </h2>
          <div className="space-y-6">
            {d.list.map((item) => (
              <div key={item.title} className="group/item flex items-start gap-5">
                <span className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border-2 border-[#ff6b00]/70 bg-orange-50/60 transition group-hover/item:bg-orange-100">
                  <FeatureIcon name={item.icon} />
                </span>
                <div className="pt-1">
                  <h3 className="mb-1.5 text-lg font-bold text-[#0b2a5b] sm:text-xl">{item.title}</h3>
                  <p className="max-w-md text-[15px] leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image with decorative shapes */}
        <div className="relative mx-auto w-full max-w-[580px] pb-5 pl-3 pr-5 pt-3 sm:pb-6 sm:pr-6">
          <div className="absolute left-0 top-0 h-[55%] w-[60%] rounded-[28px] rounded-br-none bg-[#0b2a5b]" />
          <div className="absolute bottom-0 right-0 h-[60%] w-[55%] rounded-[28px] rounded-tl-none bg-[#ff6b00]" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] rounded-bl-[44px] rounded-tr-[44px] shadow-[0_18px_45px_rgba(11,28,61,0.18)]">
            <Image
              src={d.image}
              alt="AC technician at work"
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CoolFixWhyChooseUs1({ data }: SectionProps) {
  return <WhyChooseUsSection data={data} />;
}
