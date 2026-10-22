// @ts-nocheck
"use client";

import { AutomotiveImage as Image } from "../automotive/shared";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Hero({ data }: { data?: any }) {
  const slides = (data?.slides && data.slides.length > 0)
    ? data.slides
    : (data?.image ? [data.image] : []);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <section className="relative isolate w-full h-screen min-h-screen overflow-hidden bg-black">
      {/* 3 Images Carousel */}
      {slides.map((slide, idx) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "1000ms" }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Subtle Bottom & Top Vignette Gradients */}
      <div className="absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous image"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-[#b25724] hover:scale-110 active:scale-95 border border-white/20"
      >
        <LuChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next image"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-[#b25724] hover:scale-110 active:scale-95 border border-white/20"
      >
        <LuChevronRight className="h-6 w-6" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? "w-8 bg-[#b25724]"
                : "w-2.5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
