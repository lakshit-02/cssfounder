// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image, HealthLink as Link } from "../health-and-wellness/shared";
type MedicareDataProps = { data?: any; limit?: number };

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

function HeroSection({ data }: MedicareDataProps) {
  const slides = Array.isArray(data?.slides) ? data.slides : [];
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  if (!slides.length) return null;

  return (
    <section
      className="relative w-full h-[calc(100vh-120px)] min-h-[480px] max-h-[650px] overflow-hidden bg-slate-100 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-full shrink-0">
            {/* Background Medical Image */}
            <Image
              src={slide.image.src}
              alt={slide.badge}
              fill
              priority={slide.id === 1}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 sm:via-white/70 to-transparent" />

            <div className="relative z-10 max-w-7xl h-full mx-auto px-4 sm:px-8 md:px-14 flex items-center">
              <div className="max-w-xl py-8">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-6 h-[3px] bg-[#00a859] rounded-full inline-block" />
                  <span className="text-sm md:text-[15px] font-medium text-slate-700">
                    {slide.badge}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
                  <span className="text-[#043365] block">
                    {slide.heading.main}
                  </span>
                  <span className="text-[#00a859] block">
                    {slide.heading.highlight}
                  </span>
                </h1>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-7 max-w-lg">
                  {slide.description}
                </p>

                <Link
                  href={slide.button.href}
                  className="inline-flex items-center gap-3 bg-[#043365] hover:bg-[#032347] text-white font-medium text-sm sm:text-[15px] px-6 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>{slide.button.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg border border-slate-200 hover:scale-105 active:scale-95 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg border border-slate-200 hover:scale-105 active:scale-95 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-3 h-3 bg-[#043365] scale-110"
                : "w-2.5 h-2.5 bg-white/80 hover:bg-white shadow-sm"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default function MediCareHeroBanner1({ data }: SectionProps) {
  if (!data) return null;
  return <HeroSection data={data as any} />;
}
