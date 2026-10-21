// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image } from "../health-and-wellness/shared";
type MedicareDataProps = { data?: any; limit?: number };

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

function Testimonials({ data }: MedicareDataProps) {
  const testimonials = Array.isArray(data?.list) ? data.list : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeBtn, setActiveBtn] = useState<'prev' | 'next'>('next');
  const [cardsPerView, setCardsPerView] = useState(3);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data?.heading || !testimonials.length) return null;
  const { badge } = data;

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const prevSlide = () => {
    setActiveBtn('prev');
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const nextSlide = () => {
    setActiveBtn('next');
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section className="relative w-full py-10 lg:py-12 bg-gradient-to-b from-[#f0fbfb] via-[#f7fdfd] to-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14">
        {/* ── Top Header Row (Title & Navigation Arrows) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          {/* Left Title Area */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
              <span className="text-[13px] font-bold text-[#00a859] tracking-wide">
                {badge}
              </span>
              <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-[1.18] tracking-tight">
              <span className="text-[#073260] block">{data.heading.main}</span>
              <span className="text-[#00a859]">
                {data.heading.highlight}
              </span>
            </h2>
          </div>

          {/* Right Navigation Arrow Buttons */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous Testimonials"
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all ${
                activeBtn === 'prev'
                  ? 'bg-[#00a884] hover:bg-[#009373] text-white border-transparent'
                  : 'bg-white hover:bg-slate-50 text-[#073260] border border-slate-200/80'
              }`}
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              aria-label="Next Testimonials"
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all ${
                activeBtn === 'next'
                  ? 'bg-[#00a884] hover:bg-[#009373] text-white border-transparent'
                  : 'bg-white hover:bg-slate-50 text-[#073260] border border-slate-200/80'
              }`}
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* ── Smooth Slider Cards Container ── */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / cardsPerView)}% - ${currentIndex * (24 / cardsPerView)}px))`,
            }}
          >
            {testimonials.map((item: any) => (
              <div
                key={item.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 bg-white rounded-[24px] p-7 sm:p-8 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between"
              >
                <div>
                  {/* 5 Yellow Stars */}
                  <div className="flex items-center gap-1.5 mb-5 text-[#f59e0b]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 text-[14px] leading-relaxed mb-8">
                    {item.review}
                  </p>
                </div>

                {/* Patient Profile Info & Quote Symbol */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3.5">
                    {/* Patient Avatar */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-slate-100">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    {/* Name & City */}
                    <div>
                      <h4 className="text-[15px] font-bold text-[#073260] leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[12px] text-slate-400 font-medium">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Mint/Cyan Big Quote Icon */}
                  <div className="text-[#a7f3d0]/70 shrink-0">
                    <Quote className="w-9 h-9 fill-current rotate-180" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediCareTestimonials1({ data }: SectionProps) {
  if (!data) return null;
  return <Testimonials data={data as any} />;
}
