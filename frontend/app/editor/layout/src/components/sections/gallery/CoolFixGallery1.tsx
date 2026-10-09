// @ts-nocheck
"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import type { SectionProps } from "../../../types/section";

function GallerySection({ data }: { data?: any }) {
  const raw = (data ?? {}) as any;
  const d = {
    badge:         raw?.badge         ?? "",
    heading:       raw?.heading       ?? {},
    description:   raw?.description   ?? "",
    photos:        Array.isArray(raw?.photos) ? raw.photos : [],
    initialCount:  raw?.initialCount  ?? 9,
    loadMoreCount: raw?.loadMoreCount ?? 3,
    loadMoreBtn:   raw?.loadMoreBtn   ?? "",
  };

  const [visibleCount, setVisibleCount] = useState(d.initialCount);
  const [selected, setSelected]         = useState<number | null>(null);
  const photos  = d.photos.slice(0, visibleCount);
  const hasMore = visibleCount < d.photos.length;
  const close   = () => setSelected(null);
  const prev    = () => setSelected((s) => s === null ? s : (s - 1 + photos.length) % photos.length);
  const next    = () => setSelected((s) => s === null ? s : (s + 1) % photos.length);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-0.5 w-10 bg-[#ff6b00]" />
            <span className="text-[13px] font-semibold uppercase tracking-widest text-[#ff6b00]">{d.badge}</span>
            <span className="h-0.5 w-10 bg-[#ff6b00]" />
          </div>
          <h2 className="mb-4 text-4xl font-bold text-[#0b1c3d] md:text-[42px]">
            {d.heading.main} <span className="text-[#ff6b00]">{d.heading.highlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-[15px] text-gray-500">{d.description}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-12">
          {photos.map((photo: any, idx: number) => {
            const src = typeof photo === "string" ? photo : photo?.src || photo?.image || photo?.url || "";
            return (
            <button type="button" key={idx} onClick={() => setSelected(idx)}
              className="group/item relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-lg border border-gray-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Gallery ${idx + 1}`}
                className="h-full w-full object-cover transition duration-500 group-hover/item:scale-110" />
              <div className="absolute inset-0 bg-[#0b1c3d]/0 transition duration-300 group-hover/item:bg-[#0b1c3d]/20" />
            </button>
            );
          })}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center">
            <button type="button"
              onClick={() => setVisibleCount((c) => Math.min(c + d.loadMoreCount, d.photos.length))}
              className="rounded-full bg-[#ff6b00] px-8 py-3.5 text-[15px] font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-[#e65c00]">
              {d.loadMoreBtn}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected !== null && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={close} role="dialog" aria-modal="true">
          <button type="button" onClick={close} aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#ff6b00]">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#ff6b00]">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="relative h-[85vh] w-full md:w-[85vw]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={typeof photos[selected] === "string" ? photos[selected] : photos[selected]?.src || photos[selected]?.image || ""} alt={`Gallery ${selected + 1}`}
              className="h-full w-full rounded-lg object-contain" />
          </div>
          <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#ff6b00]">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80">
            {selected + 1} / {photos.length}
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}

export default function CoolFixGallery1({ data }: SectionProps) {
  return <GallerySection data={data} />;
}
