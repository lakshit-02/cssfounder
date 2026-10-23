"use client";

import { AutomotiveImage as Image } from "@/app/editor/layout/src/components/sections/rydora/addons/shared";
import type { ReactNode } from "react";
import { Reveal, Stagger, StaggerItem } from "@/app/editor/layout/src/components/sections/rydora/addons/motion";

interface WhyChooseFeature {
  title: string;
  text: string;
  icon: string;
}

interface WhyChooseUsData {
  badge: string;
  heading: { main: string; highlight: string };
  description: string;
  image: { src: string; alt: string };
  leftFeatures: WhyChooseFeature[];
  rightFeatures: WhyChooseFeature[];
}

const iconMap: Record<string, ReactNode> = {
  FleetIcon: <FleetIcon />,
  BookingIcon: <BookingIcon />,
  ConciergeIcon: <ConciergeIcon />,
  FlexibleIcon: <FlexibleIcon />,
  PremiumIcon: <PremiumIcon />,
  ReadyIcon: <ReadyIcon />,
};

export default function WhyChooseUs({ data }: { data?: WhyChooseUsData }) {
  if (!data) return null;

  return (
    <section
      id="why-choose-us"
      className="bg-gradient-to-b from-white via-[#fdf9f6] to-white py-16 text-neutral-900 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-sm font-semibold text-[#a8521f]">
            <span className="h-0.5 w-10 bg-[#a8521f]" />
            {data.badge}
            <span className="h-0.5 w-10 bg-[#a8521f]" />
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px]">
            {data.heading.main} <span className="text-[#a8521f]">{data.heading.highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-neutral-600">
            {data.description}
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_250px_1fr] lg:gap-6">
          <FeatureList features={data.leftFeatures} />

          <Reveal className="relative mx-auto w-full max-w-[250px]" y={0} scale={0.88} duration={0.9}>
            <span className="absolute -left-2.5 top-1/2 h-24 w-1 -translate-y-1/2 rounded-full bg-[#a8521f]" />
            <span className="absolute -right-2.5 top-1/2 h-24 w-1 -translate-y-1/2 rounded-full bg-[#a8521f]" />
            <div className="rounded-[130px] border border-[#f0dccd] bg-gradient-to-b from-[#fdf3ec] to-white p-2.5 shadow-[0_18px_45px_rgba(168,82,31,0.16)]">
              <div className="relative aspect-[7/10] overflow-hidden rounded-[120px]">
                <Image
                  src={data.image.src}
                  alt={data.image.alt}
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <FeatureList features={data.rightFeatures} />
        </div>
      </div>
    </section>
  );
}

function FeatureList({ features }: { features: WhyChooseFeature[] }) {
  return (
    <Stagger as="ul" stagger={0.15} delay={0.2} className="divide-y divide-[#ece4de]">
      {features.map((f) => (
        <StaggerItem as="li" key={f.title} className="group/item flex items-start gap-6 py-7 first:pt-0 last:pb-0">
          <span className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border border-[#e2b99c] bg-white text-[#a8521f] shadow-[0_8px_20px_rgba(168,82,31,0.12)] transition duration-300 group-hover/item:bg-[#a8521f] group-hover/item:text-white">
            {iconMap[f.icon]}
          </span>
          <div className="pt-0.5">
            <h3 className="text-lg font-bold">{f.title}</h3>
            <p className="mt-1.5 max-w-[240px] text-sm leading-relaxed text-neutral-600">{f.text}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function Car({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const v = { vectorEffect: "non-scaling-stroke" as const };
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path {...v} fill="white" d="M4 9l3-6.5A2.5 2.5 0 0 1 9.3 1h9.4a2.5 2.5 0 0 1 2.3 1.5L24 9" />
      <rect {...v} fill="white" x="1" y="9" width="26" height="8" rx="2.5" />
      <path {...v} d="M5 17v3M23 17v3M11 13.5h6" />
      <circle {...v} cx="5.5" cy="13" r="1.3" />
      <circle {...v} cx="22.5" cy="13" r="1.3" />
    </g>
  );
}

function FleetIcon() {
  return (
    <IconFrame>
      <path d="M24 5l2.1 4.3 4.7.7-3.4 3.3.8 4.7L24 15.8 19.8 18l.8-4.7-3.4-3.3 4.7-.7z" />
      <Car x={10} y={21} />
    </IconFrame>
  );
}

function BookingIcon() {
  return (
    <IconFrame>
      <rect x="6" y="7" width="27" height="23" rx="2.5" />
      <path d="M6 13h27M10 10h.01M13 10h.01M16 10h.01M11 18h12M11 22h8" />
      <Car x={22} y={26} scale={0.68} />
    </IconFrame>
  );
}

function ConciergeIcon() {
  return (
    <IconFrame>
      <circle cx="24" cy="15" r="7" />
      <path d="M17.5 13c2-3 4.5-4 6.5-4s4.5 1 6.5 4" />
      <path d="M9 42c0-7.5 6.5-12 15-12s15 4.5 15 12" />
      <path d="M19.5 30.5L24 36l4.5-5.5" />
      <path d="M24 36l-1.6 6M24 36l1.6 6" />
    </IconFrame>
  );
}

function FlexibleIcon() {
  return (
    <IconFrame>
      <circle cx="30" cy="14" r="8.5" />
      <path d="M30 9.5V14l3 2" />
      <Car x={6} y={23} scale={0.85} />
    </IconFrame>
  );
}

function PremiumIcon() {
  return (
    <IconFrame>
      <path d="M24 4l8.5 3.2v5.6c0 5-3.6 8.3-8.5 10.2-4.9-1.9-8.5-5.2-8.5-10.2V7.2z" />
      <path d="M20.3 13.3l2.7 2.7 4.8-5" />
      <Car x={10} y={22} />
    </IconFrame>
  );
}

function ReadyIcon() {
  return (
    <IconFrame>
      <circle cx="24" cy="12.5" r="3" />
      <path d="M24 4v2.4M24 18.6V21M15.5 12.5h2.4M30.1 12.5h2.4M18 6.5l1.7 1.7M28.3 16.8l1.7 1.7M18 18.5l1.7-1.7M28.3 8.2L30 6.5" />
      <circle cx="24" cy="12.5" r="6" />
      <Car x={10} y={22} />
    </IconFrame>
  );
}
