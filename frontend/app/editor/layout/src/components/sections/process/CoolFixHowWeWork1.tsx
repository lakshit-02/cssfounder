// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import type { SectionProps } from "../../../types/section";
function StepsSection({ data }: { data?: any }) {
  const raw = data ?? {};
  const d = {
    badge: raw?.badge ?? "",
    heading: raw?.heading ?? {},
    list: Array.isArray(raw?.list) ? raw.list : [],
  };
  const steps = d.list;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mb-4 flex items-center justify-center gap-4">
        <span className="h-0.5 w-10 bg-[#ff6b00]" />
        <span className="text-sm font-semibold uppercase tracking-widest text-gray-600">{d.badge}</span>
        <span className="h-0.5 w-10 bg-[#ff6b00]" />
      </div>
      <h2 className="mb-12 text-3xl font-bold text-[#0b1c3d] sm:text-4xl">
        {d.heading.main}{" "}
        <span className="text-[#ff6b00]">{d.heading.highlight}</span>
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-0 lg:grid-cols-4">
        {steps.map((step, idx) => (
          <div key={step.id} className="group/item relative flex flex-col items-center px-1 sm:px-4">
            <Image
              src={step.image}
              alt={step.title}
              width={160}
              height={160}
              unoptimized={step.image.endsWith(".svg") || step.image.endsWith(".png")}
              className="-mb-3 h-[90px] w-[90px] transition duration-300 group-hover/item:-translate-y-1 sm:h-[150px] sm:w-[150px]"
            />
            <h3 className="mb-1 text-[15px] font-bold leading-tight text-[#0b1c3d] sm:text-lg">{step.title}</h3>
            <p className="max-w-[190px] text-[13px] leading-snug text-gray-500 sm:text-[15px]">{step.description}</p>

            {idx < steps.length - 1 && (
              <div className="absolute inset-y-6 right-0 hidden w-px bg-gray-200 lg:block">
                <svg className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 bg-white py-1 text-[#0b1c3d]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CoolFixHowWeWork1({ data }: SectionProps) {
  return <StepsSection data={data} />;
}
