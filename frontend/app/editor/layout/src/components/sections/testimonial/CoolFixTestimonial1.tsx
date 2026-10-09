// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../../../types/section";
function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return dir === "left"
    ? <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
    : <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}
function QuoteIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>;
}
function GoogleIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>;
}

function coolFixVideoSrc(url: string) {
  if (!url) return "";
  if (url === "/air-conditioner.webm") return "/services/air-conditioner.webm";
  return url;
}

function TestimonialsSection({ data }: { data?: any }) {
  const raw = data ?? {};
  const d = {
    badge: raw?.badge ?? "",
    heading: raw?.heading ?? {},
    image: raw?.image ?? "",
    videoUrl: raw?.videoUrl ?? "",
    source: raw?.source ?? "",
    list: Array.isArray(raw?.list) ? raw.list : [],
  };
  const items = d.list;
  const count = items.length;
  const [current, setCurrent] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const videoSrc = coolFixVideoSrc(d.videoUrl);
  const [paused, setPaused] = useState(false);
  const review = items[current];

  const goTo = (i: number) => setCurrent((i + count) % count);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % count), 6000);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    <section className="bg-white py-8 pb-16 lg:py-10 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl bg-[#e9effc] lg:grid-cols-[1fr_1.15fr]">
          {/* Left: image */}
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl sm:min-h-[400px]">
            <Image src={d.image} alt="AC technician" fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
            <button
              type="button"
              aria-label="Play video"
              data-editor-no-inline
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (videoSrc) setVideoOpen(true);
              }}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-white/30" />
              <span className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/60 transition hover:scale-105">
                <span className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-xl">
                  <svg className="ml-1 h-7 w-7 text-[#ff6b00]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
            </button>
          </div>

          {/* Right: reviews */}
          <div
            className="flex flex-col justify-center p-6 sm:p-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
              <span className="text-sm font-semibold text-[#0b1c3d]">{d.badge}</span>
            </div>
            <h2 className="mb-6 max-w-xl text-2xl font-extrabold leading-[1.2] text-[#0b1c3d] sm:text-4xl lg:text-[42px] tracking-tight">
              {d.heading.main}{" "}
              <span className="text-[#ff6b00]">{d.heading.highlight}</span>
            </h2>

            <div className="flex gap-5 rounded-2xl bg-[#0d2b66] p-5 sm:gap-7 sm:p-7" aria-roledescription="carousel">
              {/* Left strip */}
              <div className="hidden w-14 shrink-0 flex-col items-center gap-5 rounded-full border border-white/25 py-2 sm:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <QuoteIcon />
                </span>
                <span className="flex rotate-180 items-center gap-2 pb-2 font-semibold text-white [writing-mode:vertical-rl]">
                  {d.source}
                  <GoogleIcon />
                </span>
              </div>

              {/* Review content */}
              <div className="flex min-w-0 flex-1 flex-col">
                {review && (
                  <p key={review.id} className="min-h-28 leading-relaxed text-white/90 sm:text-[17px]" aria-live="polite">
                    {review.quote}
                  </p>
                )}
                <div className="my-5 h-px bg-white/15" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {review && (
                    <div key={review.id} className="flex items-center gap-3 rounded-xl bg-white py-2 pl-2 pr-5">
                      <Image src={review.avatar} alt={review.name} width={44} height={44} className="h-11 w-11 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-[#0b1c3d]">{review.name}</div>
                        <div className="text-xs text-gray-500">{review.role}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => goTo(current - 1)} aria-label="Previous review"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0b1c3d] overflow-hidden transition-colors hover:bg-[#ff6b00] hover:text-white">
                      <ArrowIcon dir="left" />
                    </button>
                    <button type="button" onClick={() => goTo(current + 1)} aria-label="Next review"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff6b00] text-white overflow-hidden transition-colors hover:bg-white hover:text-[#0b1c3d]">
                      <ArrowIcon dir="right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {videoOpen && videoSrc ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
          data-editor-no-inline
          onClick={() => setVideoOpen(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              aria-label="Close video"
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b2a5b] shadow-md"
              onClick={() => setVideoOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <video src={videoSrc} controls autoPlay className="max-h-[80vh] w-full rounded-lg bg-black" />
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default function CoolFixTestimonial1({ data }: SectionProps) {
  return <TestimonialsSection data={data} />;
}
