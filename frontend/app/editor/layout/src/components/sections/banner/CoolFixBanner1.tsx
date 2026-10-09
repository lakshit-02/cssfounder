// @ts-nocheck
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../../../types/section";
function ArrowRightIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}
function CalendarIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3v4M16 3v4M3 10h14" />
      <path d="M11 21H5a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v3" />
      <path d="M17.5 22a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
      <path d="M17.5 15.5v2l1.3 1" />
    </svg>
  );
}
function FileTextIcon() {
  return <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
}
function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return dir === "left"
    ? <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
    : <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;
}

function BannerSection({ data }: { data?: any }) {
  const raw = data ?? {};
  const slides = Array.isArray(raw?.slides) ? raw.slides : [];
  const count = slides.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => setCurrent((i + count) % count), [count]);

  useEffect(() => {
    if (paused || !count) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % count), 5000);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    <section
      className="relative h-[580px] w-full overflow-hidden bg-[#f3f7fc] md:h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((slide, idx) => {
        const active = idx === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${active ? "z-10 opacity-100" : "z-0 opacity-0"}`}
            aria-hidden={!active}
          >
            <div className="absolute inset-y-0 right-0 w-full md:w-[60%]">
              <Image
                src={slide.image.src}
                alt={slide.heading.highlight}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className={`object-cover object-top transition-transform duration-[6000ms] ease-out ${active ? "scale-105" : "scale-100"}`}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#f3f7fc] from-40% via-[#f3f7fc]/70 via-50% to-transparent to-60% max-md:from-[#f3f7fc]/95 max-md:via-[#f3f7fc]/80 max-md:to-[#f3f7fc]/50" />

            {/* Content */}
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 pt-28 pb-16 sm:px-6 lg:px-8 md:pt-32">
              <div className={`max-w-[560px] w-full transition-all delay-200 duration-700 ${active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
                {/* Badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#ff6b00]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#0b1c3d]">{slide.badge}</span>
                </div>

                {/* Heading — three stacked lines, orange middle line */}
                <h1 className="mb-5 text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-[#0b1c3d] sm:text-5xl md:text-[3.35rem]">
                  <span className="block">{slide.heading.main}</span>
                  <span className="block text-[#ff6b00]">{slide.heading.highlight}</span>
                  <span className="block">{slide.heading.end}</span>
                </h1>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={slide.primaryBtn.href}
                    tabIndex={active ? 0 : -1}
                    className="flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-[#ff6b00] bg-[#ff6b00] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-colors hover:bg-[#e55f00] sm:w-auto"
                  >
                    <CalendarIcon />
                    {slide.primaryBtn.label}
                    <ArrowRightIcon />
                  </a>
                  {slide.secondaryBtn && (
                    <a
                      href={slide.secondaryBtn.href}
                      tabIndex={active ? 0 : -1}
                      className="flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-[#0b2a5b] bg-white px-6 py-3.5 text-base font-semibold text-[#0b2a5b] transition-colors hover:bg-[#0b2a5b] hover:text-white sm:w-auto"
                    >
                      <FileTextIcon />
                      {slide.secondaryBtn.label}
                      <ArrowRightIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev/Next buttons */}
      <button type="button" onClick={() => goTo(current - 1)} aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b1c3d] text-white shadow-lg overflow-hidden transition-colors hover:bg-[#ff6b00] md:flex">
        <ChevronIcon dir="left" />
      </button>
      <button type="button" onClick={() => goTo(current + 1)} aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b1c3d] text-white shadow-lg overflow-hidden transition-colors hover:bg-[#ff6b00] md:flex">
        <ChevronIcon dir="right" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-[#ff6b00]" : "w-2.5 bg-[#0b1c3d]/30 hover:bg-[#0b1c3d]/60"}`} />
        ))}
      </div>
    </section>
  );
}

export default function CoolFixBanner1({ data }: SectionProps) {
  const raw = data as { slides?: any[] } | undefined;
  const slides = raw?.slides ?? [];
  return <BannerSection data={{ slides }} />;
}
