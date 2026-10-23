"use client";

import { AutomotiveImage as Image } from "@/app/editor/layout/src/components/sections/rydora/addons/shared";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/app/editor/layout/src/components/sections/rydora/addons/motion";

interface BrandItem {
  name: string;
  logo: string;
}

interface BrandsData {
  badge: string;
  heading: { main: string; highlight: string };
  description: string;
  list: BrandItem[];
}

export default function Brands({ data }: { data?: BrandsData }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const total = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth - 0.05));
    setPages(total);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
    setPage(Math.round(ratio * (total - 1)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const target = pages > 1 ? (maxScroll * index) / (pages - 1) : 0;
    track.scrollTo({ left: target, behavior: "smooth" });
  };

  const step = (dir: 1 | -1) => goTo(Math.min(pages - 1, Math.max(0, page + dir)));

  if (!data) return null;

  return (
    <section id="brands" className="bg-[#fcfbf9] py-10 text-neutral-900 sm:py-12">
      <Reveal className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-3 text-sm font-semibold text-[#a8521f]">
              <span className="h-px w-10 bg-copper" />
              {data.badge}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[44px]">
              {data.heading.main} <span className="text-[#a8521f]">{data.heading.highlight}</span>
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600">
              {data.description}
            </p>
          </div>

          <div className="hidden shrink-0 gap-3 sm:flex">
            <ArrowButton label="Previous brands" onClick={() => step(-1)} disabled={page === 0} flip />
            <ArrowButton label="Next brands" onClick={() => step(1)} disabled={page >= pages - 1} />
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={measure}
          className="-mx-2 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 py-2 [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {data.list.map((brand) => (
            <div
              key={brand.name}
              className="flex aspect-[11/10] w-[calc((100%-24px)/3)] shrink-0 snap-start items-center justify-center rounded-xl border border-neutral-200/80 bg-white shadow-[0_4px_18px_rgba(120,60,20,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(120,60,20,0.12)] sm:w-[calc((100%-48px)/4)] md:w-[calc((100%-80px)/6)] lg:w-[calc((100%-112px)/8)]"
            >
              <Image
                src={`assets/brands/${brand.logo}.svg`}
                alt={brand.name}
                width={64}
                height={64}
                unoptimized
                className="h-1/2 w-1/2 object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-7 flex justify-center gap-2.5">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === page ? "bg-[#a8521f]" : "bg-[#f3d9c7] hover:bg-[#e9bfa2]"
              }`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ArrowButton({
  label,
  onClick,
  disabled,
  flip = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8e6da] text-[#a8521f] transition hover:bg-[#f1d3bf] disabled:opacity-50"
    >
      <svg className={flip ? "rotate-180" : ""} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
}
