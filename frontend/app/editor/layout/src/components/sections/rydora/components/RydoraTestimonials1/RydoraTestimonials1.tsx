"use client";

import React, { useState, useEffect } from "react";
import { LuChevronLeft, LuChevronRight, LuStar, LuUser } from "react-icons/lu";
import { Reveal } from "@/app/editor/layout/src/components/sections/rydora/addons/motion";

interface TestimonialItem {
  id: string;
  rating: number;
  name: string;
  role: string;
  quote: string;
}

interface TestimonialsData {
  badge: string;
  heading: { main: string; highlight: string };
  description: string;
  list: TestimonialItem[];
}

export default function Testimonials({ data }: { data?: TestimonialsData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeArrow, setActiveArrow] = useState<"prev" | "next">("next");
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive max index taaki end mein khaali space na bache
  const total = data?.list.length ?? 0;
  const maxIndex = Math.max(0, total - cardsPerView);

  // Ek baar mein 1 card peeche
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setActiveArrow("prev");
  };

  // Ek baar mein 1 card aage
  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setActiveArrow("next");
  };

  if (!data) return null;

  return (
    <section className="w-full bg-[#fbfbfa] py-10 sm:py-12 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <Reveal className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Heading & Controls */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch pr-0 lg:pr-6">
            <div>
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-4 h-[2px] bg-[#c85a17]" />
                <span className="text-xs font-bold tracking-wider text-[#c85a17] uppercase">
                  {data.badge}
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] leading-[1.2] tracking-tight mb-4">
                {data.heading.main} <br />
                <span className="text-[#c85a17]">{data.heading.highlight}</span>
              </h2>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#6b7280]">
                {data.description}
              </p>
            </div>

            {/* Navigation Buttons (1 click = 1 card slide) */}
            <div className="flex items-center gap-3 pt-8 lg:pt-12">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous card"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                  activeArrow === "prev"
                    ? "bg-[#c85a17] hover:bg-[#b04f14] text-white shadow-sm"
                    : "bg-[#fdeee4] hover:bg-[#fbdcd0] text-[#c85a17]"
                }`}
              >
                <LuChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next card"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                  activeArrow === "next"
                    ? "bg-[#c85a17] hover:bg-[#b04f14] text-white shadow-sm"
                    : "bg-[#fdeee4] hover:bg-[#fbdcd0] text-[#c85a17]"
                }`}
              >
                <LuChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Cards Viewport */}
          <div className="lg:col-span-8 overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-5"
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% / ${cardsPerView} + 20px / ${cardsPerView})))`,
              }}
            >
              {data.list.map((item) => (
                <div
                  key={item.id}
                  className="group/card w-full sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)] shrink-0 relative bg-[#fdfbf7] border border-[#f3eee7] rounded-2xl p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white hover:border-[#e9bf9f] hover:shadow-[0_16px_36px_rgba(178,87,36,0.14)] flex flex-col justify-between cursor-pointer"
                >
                  {/* Decorative Quote Mark */}
                  <span className="absolute top-5 right-5 text-4xl font-serif text-[#c85a17]/20 select-none pointer-events-none leading-none transition-all duration-300 group-hover/card:text-[#c85a17]/40 group-hover/card:scale-110">
                    “
                  </span>

                  <div>
                    {/* User Avatar Icon */}
                    <div className="w-12 h-12 rounded-full bg-[#fbe7dc] flex items-center justify-center mb-4 text-[#c85a17] transition-all duration-300 group-hover/card:bg-[#b25724] group-hover/card:text-white group-hover/card:scale-105 shadow-sm">
                      <LuUser className="w-6 h-6" />
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3 transition-transform duration-300 group-hover/card:translate-x-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <LuStar
                          key={i}
                          className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]"
                        />
                      ))}
                    </div>

                    {/* Author Details */}
                    <h3 className="text-base font-bold text-[#111827] transition-colors duration-300 group-hover/card:text-[#b25724]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6b7280] font-medium mb-4">
                      {item.role}
                    </p>

                    <hr className="border-t border-[#f2ede6] mb-4 transition-colors duration-300 group-hover/card:border-[#eeddcc]" />

                    {/* Testimonial Body */}
                    <p className="text-xs sm:text-[13px] leading-relaxed text-[#4b5563]">
                      {item.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? "w-6 bg-[#c85a17]"
                  : "w-2.5 bg-[#fcd8c4] hover:bg-[#c85a17]/50"
              }`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
