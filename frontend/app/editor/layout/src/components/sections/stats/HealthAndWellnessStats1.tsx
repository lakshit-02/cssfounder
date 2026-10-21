// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
type MedicareDataProps = { data?: any; limit?: number };

import React from "react";

const statSvgProps = {
  viewBox: "0 0 56 56",
  fill: "none",
  stroke: "white",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-14 h-14 [filter:drop-shadow(8px_10px_0_rgba(0,0,0,0.12))]",
};

const renderStatIcon = (iconName: string) => {
  switch (iconName) {
    case "clipboard":
      return (
        <svg {...statSvgProps}>
          <rect x="9" y="7" width="34" height="44" rx="3" />
          <rect x="18" y="3" width="16" height="8" rx="2" />
          <rect x="14" y="15" width="24" height="31" rx="1" />
          <path d="M26 21h8M26 26h8M26 31h8M18 21h4M18 26h4M29 41h5" />
          <path d="M21 33v8M17 37h8" />
        </svg>
      );
    case "doctor":
      return (
        <svg {...statSvgProps}>
          <rect x="21" y="2" width="14" height="10" rx="1.5" />
          <path d="M28 4.5v5M25.5 7h5" />
          <path d="M21 12v5a7 7 0 0 0 14 0v-5" />
          <path d="M8 52V42a10 10 0 0 1 10-10h20a10 10 0 0 1 10 10v10" />
          <path d="M22 32l6 7 6-7M28 39v13" />
          <rect x="31" y="43" width="7" height="5" rx="1" />
          <path d="M19 32c-4 4-4 10 0 12" />
          <circle cx="21" cy="45.5" r="2" />
          <path d="M37 32v5a3 3 0 0 1-3 3" />
        </svg>
      );
    case "bed":
      return (
        <svg {...statSvgProps}>
          <path d="M6 48V22a10 10 0 0 1 10-10h2a10 10 0 0 1 10 10v4" />
          <circle cx="17" cy="26" r="4" />
          <rect x="6" y="32" width="44" height="7" rx="1" />
          <path d="M23 32v-3a4 4 0 0 1 4-4h14a6 6 0 0 1 6 6v1" />
          <path d="M6 44h44M50 32v16" />
          <circle cx="40" cy="12" r="6" />
          <path d="M40 9v6M37 12h6M36 17l-4 7" />
        </svg>
      );
    case "flask":
      return (
        <svg {...statSvgProps}>
          <path d="M14 8v28a4 4 0 0 0 8 0V8M24 8v28a4 4 0 0 0 8 0V8M34 8v28a4 4 0 0 0 8 0V8" />
          <path d="M12 8h12M22 8h12M32 8h12" />
          <path d="M4 18h48" />
          <path d="M4 18v30M52 18v30" />
          <path d="M4 44h48M2 48h52" />
        </svg>
      );
    default:
      return null;
  }
};

const featureSvgProps = {
  viewBox: "0 0 56 56",
  fill: "none",
  stroke: "#00a859",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-14 h-14",
};

const renderFeatureIcon = (iconName: string) => {
  switch (iconName) {
    case "tooth":
      return (
        <svg {...featureSvgProps}>
          <path d="M38 18c0-7-4-12-10-12-3 0-5 1.5-8 1.5S14 6 11 6C6 6 4 11 4 17c0 9 3 18 6 26 1.5 5 5.5 5 6.5 0l2-9c.8-3.5 2.5-5 4.5-5s3.7 1.5 4.5 5" />
          <path d="M36 20h6v6h6v6h-6v6h-6v-6h-6v-6h6z" />
        </svg>
      );
    case "wheelchair":
      return (
        <svg {...featureSvgProps}>
          <circle cx="24" cy="8" r="4" />
          <path d="M24 15v15h12l5 11h5M24 22h9" />
          <path d="M18 24A12 12 0 1 0 35 41" />
        </svg>
      );
    case "cosmetic":
      return (
        <svg {...featureSvgProps}>
          <path d="M13 8H8v40h5M43 8h5v40h-5" />
          <rect x="24" y="4" width="8" height="7" rx="1.5" />
          <path d="M28 11v3" />
          <rect x="21" y="14" width="14" height="14" rx="2" />
          <path d="M24 18h8M24 21.5h8M24 25h8" />
          <path d="M21 16l-5 8v8M35 16l5 8v8" />
          <rect x="22" y="29" width="5" height="19" rx="1" />
          <rect x="29" y="29" width="5" height="19" rx="1" />
          <path d="M22 38h5M29 38h5M20 51h7M29 51h7" />
        </svg>
      );
    default:
      return null;
  }
};

function AnimatedCounter({ value }: { value: string }) {
  const numMatch = value.match(/\d+/);
  if (!numMatch) return <>{value}</>;

  const num = parseInt(numMatch[0], 10);
  const prefix = value.slice(0, numMatch.index);
  const suffix = value.slice(numMatch.index! + numMatch[0].length);

  const [count, setCount] = React.useState(0);
  const [hasTriggered, setHasTriggered] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasTriggered]);

  React.useEffect(() => {
    if (!hasTriggered) return;

    let startTimestamp: number;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * num));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [num, hasTriggered]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function StatsSection({ data }: MedicareDataProps) {
  if (!data || !Array.isArray(data.list) || !Array.isArray(data.featureCards)) return null;
  const { list: counters, featureCards } = data;

  return (
    <section className="relative w-full pt-10 pb-12 md:pb-20 lg:pb-16 bg-[#00a859] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14">
        {/* ── Top 4 Statistics Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-8 md:pb-16">
          {counters.map((item) => (
            <div key={item.id} className="flex items-center gap-4 sm:gap-5">
              {/* Icon Container with subtle dropshadow */}
              <div className="shrink-0">{renderStatIcon(item.icon)}</div>

              {/* Number and Label */}
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none mb-1.5">
                  <AnimatedCounter value={item.value} />
                </span>
                <span className="text-emerald-100 text-[13px] sm:text-[14px] font-medium leading-tight">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Floating Feature Cards (Overlapping) ── */}
      <div className="relative md:absolute md:left-0 md:right-0 md:-bottom-14 z-20 mt-4 md:mt-0 -mb-16 md:mb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featureCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-[22px] p-7 sm:p-8 flex items-start gap-5 shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-slate-100 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Green Outline Medical Icon */}
                <div className="shrink-0 pt-0.5">
                  {renderFeatureIcon(card.icon)}
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <h3 className="text-[19px] sm:text-[20px] font-extrabold text-[#073260] mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediCareStats1({ data }: SectionProps) {
  if (!data) return null;
  return <StatsSection data={data as any} />;
}
