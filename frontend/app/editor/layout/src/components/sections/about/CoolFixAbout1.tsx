// @ts-nocheck
"use client";

import React, { useState } from "react";
import type { SectionProps } from "../../../types/section";

function ArrowRightIcon() {
  return (
    <svg className="h-5 w-5 transition group-hover/item:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="relative ml-0.5 h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function StatIcon({ icon }: { icon: string }) {
  const paths =
    icon === "snowflake"
      ? [
          "M12 2v20M3.34 7l17.32 10M3.34 17L20.66 7",
          "M9 4l3 2 3-2M9 20l3-2 3 2",
          "M4.5 10.2l2.6-1.7-.1-3.2M19.5 13.8l-2.6 1.7.1 3.2",
          "M4.5 13.8l2.6 1.7-.1 3.2M19.5 10.2l-2.6-1.7.1-3.2",
        ]
      : [
          "M8 6.5a4 4 0 018 0",
          "M6.5 6.5h11",
          "M9 7v1.5a3 3 0 006 0V7",
          "M5.5 16.5v-.5a4 4 0 014-4h5a4 4 0 014 4v.5",
          "M10 12l2 2.5 2-2.5",
          "M7.2 19.5h9.6",
          "M7.2 19.5a2.3 2.3 0 10-2.4 2.2l.9-1.2-.9-1.2 1.4-1.1",
          "M16.8 19.5a2.3 2.3 0 112.4 2.2l-.9-1.2.9-1.2-1.4-1.1",
        ];
  return (
    <svg className="h-14 w-14 shrink-0 text-[#1f4fa3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function coolFixVideoSrc(url: string) {
  if (!url) return "";
  if (url === "/air-conditioner.webm") return "/services/air-conditioner.webm";
  return url;
}

function VideoLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
      data-editor-no-inline
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          aria-label="Close video"
          className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b2a5b] shadow-md"
          onClick={onClose}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <video src={src} controls autoPlay className="max-h-[80vh] w-full rounded-lg bg-black" />
      </div>
    </div>
  );
}

function AboutSection({ data }: { data?: any }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const raw = data ?? {};
  const about = {
    badge:       raw?.badge       ?? "",
    heading:     raw?.heading     ?? {},
    description: raw?.description ?? "",
    stats:       Array.isArray(raw?.stats) ? raw.stats : [],
    goal:        raw?.goal        ?? "",
    image:       raw?.image       ?? {},
    videoUrl:    raw?.videoUrl    ?? "",
    cta:         raw?.cta         ?? {},
  };

  return (
    <section id="about" className="overflow-hidden bg-white pt-8 pb-0 lg:pt-12 lg:pb-0">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* ── LEFT: Text content ── */}
        <div>
          {/* Badge */}
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-[#ff6b00]">{about.badge}</span>
            <span className="h-0.5 w-12 bg-[#ff6b00]" />
          </div>

          {/* Heading */}
          <h2 className="mb-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0b2a5b] sm:text-5xl lg:text-[54px]">
            {about.heading.main}
            <br />
            {about.heading.middle}{" "}
            <span className="text-[#ff6b00]">{about.heading.highlight}</span>
          </h2>

          {/* Description */}
          <p className="mb-8 leading-relaxed text-gray-600">{about.description}</p>

          {/* Stats */}
          <div className="mb-8 flex flex-wrap items-center gap-y-6">
            {about.stats.map((stat: any, idx: number) => (
              <div key={stat.label} className="flex items-center">
                {idx > 0 && <span className="mx-6 hidden h-16 w-px bg-gray-200 sm:block" />}
                <div className="flex items-center gap-4 pr-6 sm:pr-0">
                  <StatIcon icon={stat.icon} />
                  <span className="h-16 w-px bg-gray-200" />
                  <div>
                    <div className="text-[26px] font-extrabold leading-tight text-[#0b2a5b]">{stat.value}</div>
                    <div className="mt-1 text-sm text-gray-700">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Goal text */}
          <p className="mb-8 leading-relaxed text-gray-600">{about.goal}</p>

          {/* CTA button */}
          <a
            href={about.cta.href ?? "#"}
            className="group/item inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#ff6b00] px-9 py-3.5 font-bold text-white shadow-lg shadow-orange-500/30 transition-colors hover:bg-[#e55f00]"
          >
            {about.cta.label}
            <ArrowRightIcon />
          </a>
        </div>

        {/* ── RIGHT: Images with decorative shapes ── */}
        <div className="relative mx-auto aspect-[1.1] w-full max-w-[560px]">
          {/* Decorative blue shapes */}
          <div className="absolute right-[2%] top-0 h-[30%] w-[56%] rounded-tl-md rounded-br-[28px] bg-[#1f4fa3]" />
          <div className="absolute left-0 top-[47%] h-[36%] w-[26%] rounded-bl-md bg-[#1f4fa3]" />
          <div className="absolute right-[1%] top-[46%] h-[24%] w-[6%] rounded-r-xl bg-[#ff6b00]" />
          <div
            className="absolute -right-[6%] top-[24%] hidden h-[22%] w-[15%] opacity-70 sm:block"
            style={{ backgroundImage: "radial-gradient(#9db8e3 1.6px, transparent 1.6px)", backgroundSize: "13px 13px" }}
          />

          {/* Main image */}
          <div className="absolute left-[4%] top-[6.5%] h-[68%] w-[88%] overflow-hidden rounded-2xl border-[6px] border-white shadow-[0_12px_35px_rgba(11,28,61,0.18)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={about.image.main}
              alt="AC technician repairing an air conditioner"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Secondary image with play button */}
          <div className="absolute bottom-0 right-[3%] h-[47%] w-[62%] overflow-hidden rounded-2xl border-[6px] border-white shadow-[0_16px_40px_rgba(11,28,61,0.25)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={about.image.secondary}
              alt="AC technician smiling"
              className="h-full w-full object-cover"
            />
            {/* Play button */}
            <button
              type="button"
              aria-label="Play video"
              data-editor-no-inline
              className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (coolFixVideoSrc(about.videoUrl)) setVideoOpen(true);
              }}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-[#ff6b00]/40" />
              <span className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#ff6b00] text-white ring-4 ring-white/70 transition hover:scale-110 sm:h-14 sm:w-14">
                <PlayIcon />
              </span>
            </button>
          </div>
        </div>

      </div>
      {videoOpen && coolFixVideoSrc(about.videoUrl) ? (
        <VideoLightbox src={coolFixVideoSrc(about.videoUrl)} onClose={() => setVideoOpen(false)} />
      ) : null}
    </section>
  );
}

export default function CoolFixAbout1({ data }: SectionProps) {
  return <AboutSection data={data} />;
}
