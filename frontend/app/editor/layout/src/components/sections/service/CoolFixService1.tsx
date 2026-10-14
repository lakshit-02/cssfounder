// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../../../types/section";
import { useOptionalPreview } from "../../context/PreviewContext";
function ArrowRightIcon() {
  return <svg className="h-4 w-4 transition group-hover/item:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}
function ChevronLeftIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>;
}
function ChevronRightIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;
}

const pad = (n: number) => String(n).padStart(2, "0");

function openServiceCardEditor(svc: { id?: string | number; title?: string; href?: string }) {
  const slug = String(svc.href || "").split("/").filter(Boolean).pop() || "";
  try {
    sessionStorage.setItem(
      "ai-builder-open-manager-item:Services",
      JSON.stringify({
        id: svc.id != null ? String(svc.id) : undefined,
        slug: slug || undefined,
        title: svc.title || "",
      }),
    );
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent("ai-builder-open-manager", {
      detail: { manager: "Services", cardOnly: true, preservePage: true },
    }),
  );
}

function ServiceSection({ data }: { data?: any }) {
  const preview = useOptionalPreview();
  const raw = data ?? {};
  const s = {
    badge: raw?.badge ?? "",
    heading: raw?.heading ?? {},
    description: raw?.description ?? "",
    readMoreLabel: raw?.readMoreLabel ?? "",
    list: Array.isArray(raw?.list) ? raw.list : [],
  };
  const perView = 4;
  const items = s.list;
  const maxIndex = Math.max(items.length - perView, 0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const safeIndex = Math.min(index, maxIndex);
  const goTo = (i: number) => setIndex(i < 0 ? maxIndex : i > maxIndex ? 0 : i);

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const t = setInterval(() => setIndex((p) => (Math.min(p, maxIndex) >= maxIndex ? 0 : p + 1)), 4000);
    return () => clearInterval(t);
  }, [paused, maxIndex]);

  return (
    <section className="relative overflow-hidden bg-[#f5f8fc] py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[36px] border-[#e6eef8]" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full border-[36px] border-[#e6eef8]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-0.5 w-8 bg-[#ff6b00]" />
            <span className="text-sm font-bold uppercase tracking-wider text-[#ff6b00]">{s.badge}</span>
            <span className="h-0.5 w-8 bg-[#ff6b00]" />
          </div>
          <h2 className="mb-3 text-3xl font-extrabold text-[#0b1c3d] sm:text-4xl lg:text-[40px]">
            {s.heading.main}{" "}
            <span className="text-[#ff6b00]">{s.heading.highlight}</span>
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">{s.description}</p>
        </div>

        {/* Carousel */}
        <div
          className="relative lg:px-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carousel"
        >
          <div className="overflow-hidden">
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
            >
              {items.slice(safeIndex, safeIndex + perView).map((svc, offset) => {
                const i = safeIndex + offset;
                return (
                  <div
                    key={svc.id}
                    className="group/item relative flex min-w-0 flex-col py-4"
                  >
                    <article className="flex flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgba(11,28,61,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,28,61,0.14)]">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={svc.image} alt={svc.title} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover/item:scale-110" />
                        <span className="absolute bottom-2 right-4 text-5xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">{pad(i + 1)}</span>
                      </div>
                      <div className="flex flex-1 gap-4 px-5 pb-6">
                        <div className="relative -mt-9 h-20 w-20 shrink-0">
                          <div className="absolute inset-x-0 bottom-0 top-8 border-2 border-t-0 border-[#1f6fd6]" />
                          <span className="absolute -left-1 top-8 h-2.5 w-2.5 bg-[#ff6b00]" />
                          <span className="absolute -right-1 top-8 h-2.5 w-2.5 bg-[#ff6b00]" />
                          <div className="relative z-10 mx-auto flex h-[68px] w-[68px] items-center justify-center bg-white text-[#0b1c3d] shadow-md transition group-hover/item:bg-[#ff6b00] group-hover/item:text-white">
                            <svg className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col pt-3">
                          <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
                            Service {pad(i + 1)}<span className="h-px w-8 bg-gray-300" />
                          </div>
                          <h3 className="mb-2 text-lg font-bold text-[#0b1c3d]">{svc.title}</h3>
                          <div className="mt-auto pt-2">
                            <button
                              type="button"
                              data-editor-no-inline="true"
                              onPointerDown={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                              }}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                const inEditor = Boolean(
                                  document.querySelector("[data-editor-live-surface]"),
                                );
                                if (inEditor) {
                                  openServiceCardEditor(svc);
                                  return;
                                }
                                const slug = String(svc.href || "").split("/").filter(Boolean).pop() || "";
                                if (slug) {
                                  try {
                                    sessionStorage.setItem("coolfix-service-slug", slug);
                                  } catch {
                                    /* ignore */
                                  }
                                  window.dispatchEvent(new CustomEvent("coolfix-service-slug", { detail: { slug } }));
                                }
                                preview?.setCurrentPage("Service Detail");
                              }}
                              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 underline underline-offset-4 transition group-hover/item:text-[#ff6b00]"
                            >
                              {s.readMoreLabel}
                              <ArrowRightIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <button type="button" onClick={() => goTo(safeIndex - 1)} aria-label="Previous"
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b1c3d] text-white shadow-lg overflow-hidden transition-colors hover:bg-[#ff6b00] lg:flex">
            <ChevronLeftIcon />
          </button>
          <button type="button" onClick={() => goTo(safeIndex + 1)} aria-label="Next"
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b1c3d] text-white shadow-lg overflow-hidden transition-colors hover:bg-[#ff6b00] lg:flex">
            <ChevronRightIcon />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === safeIndex ? "w-7 bg-[#ff6b00]" : "w-2.5 bg-gray-300 hover:bg-gray-400"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CoolFixService1({ data }: SectionProps) {
  return <ServiceSection data={data} />;
}
