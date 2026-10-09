// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import type { SectionProps } from "../../../types/section";
function PhoneIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
}
function ArrowRightIcon() {
  return <svg className="h-5 w-5 transition group-hover/item:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}

function CTASection({ data }: { data?: any }) {
  const raw = data ?? {};
  const c = {
    badge: raw?.badge ?? "",
    heading: raw?.heading ?? {},
    description: raw?.description ?? "",
    image: raw?.image ?? "",
    primaryBtn: raw?.primaryBtn ?? {},
    secondaryBtn: raw?.secondaryBtn ?? {},
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0b1c3d]">
      <Image src={c.image} alt="" fill sizes="100vw" className="object-cover object-[70%_center]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c3d] from-25% via-[#0b1c3d]/85 via-50% to-[#0b1c3d]/30 max-lg:to-[#0b1c3d]/80" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-12">
        <div className="max-w-2xl text-white">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-0.5 w-10 bg-[#ff6b00]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-200">{c.badge}</span>
          </div>
          <h2 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[40px]">
            {c.heading.main}
            <br />
            <span className="text-[#ff6b00]">{c.heading.highlight}</span>
          </h2>
          <p className="max-w-md text-gray-200 sm:text-lg">{c.description}</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href={c.primaryBtn.href}
            className="flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full bg-[#ff6b00] px-8 py-4 font-bold text-white shadow-lg shadow-orange-500/30 transition-colors hover:bg-[#e55f00]"
          >
            <PhoneIcon />
            {c.primaryBtn.label}
          </a>
          <a
            href={c.secondaryBtn.href}
            className="group/item flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full border-2 border-white px-8 py-4 font-bold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0b1c3d]"
          >
            {c.secondaryBtn.label}
            <ArrowRightIcon />
          </a>
        </div>
      </div>
      <span className="absolute bottom-0 right-[6%] hidden h-1.5 w-[4%] bg-[#ff6b00] md:block" />
    </section>
  );
}

export default function CoolFixCTA1({ data }: SectionProps) {
  return <CTASection data={data} />;
}
