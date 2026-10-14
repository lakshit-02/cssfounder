// @ts-nocheck
"use client";
import React from "react";
import type { SectionProps } from "../../../types/section";
import { useOptionalPreview } from "../../context/PreviewContext";

function ArrowRightIcon() {
  return <svg className="h-3 w-3 text-[#ff6b00] transition group-hover/item:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}
const SERVICE_ICON_PATHS: Record<string, string[]> = {
  technician: [
    "M8 6.5a4 4 0 018 0",
    "M6.5 6.5h11",
    "M9 7v1.5a3 3 0 006 0V7",
    "M5.5 16.5v-.5a4 4 0 014-4h5a4 4 0 014 4v.5",
    "M10 12l2 2.5 2-2.5",
    "M7.2 19.5h9.6",
    "M7.2 19.5a2.3 2.3 0 10-2.4 2.2l.9-1.2-.9-1.2 1.4-1.1",
    "M16.8 19.5a2.3 2.3 0 112.4 2.2l-.9-1.2.9-1.2-1.4-1.1",
  ],
  acUnit: [
    "M3 5h18a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z",
    "M5 10h14M17 7.5h1",
    "M7 16c0 1.5-1 2-1 3.5M12 16c0 1.5-1 2-1 3.5M17 16c0 1.5-1 2-1 3.5",
  ],
  tools: [
    "M14.7 6.3a4 4 0 00-5.4 5.4l-6 6a1.4 1.4 0 002 2l6-6a4 4 0 005.4-5.4l-2.4 2.4-2-.6-.6-2 2.4-2.4z",
    "M15 15l4.5 4.5a1.4 1.4 0 002-2L17 13",
  ],
  snowflake: [
    "M12 2v20M3.34 7l17.32 10M3.34 17L20.66 7",
    "M9 4l3 2 3-2M9 20l3-2 3 2",
    "M4.5 10.2l2.6-1.7-.1-3.2M19.5 13.8l-2.6 1.7.1 3.2",
    "M4.5 13.8l2.6 1.7-.1 3.2M19.5 10.2l-2.6-1.7.1-3.2",
  ],
  gear: [
    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  ],
};

function openCoolFixServiceDetail(href?: string) {
  const slug = String(href || "").split("/").filter(Boolean).pop() || "";
  if (!slug || slug === "service-detail") return;
  try {
    sessionStorage.setItem("coolfix-service-slug", slug);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("coolfix-service-slug", { detail: { slug } }));
}

function openCoolFixServiceCardEditor(svc: { id?: string | number; title?: string; href?: string }) {
  const slug = String(svc.href || "").split("/").filter(Boolean).pop() || "";
  try {
    sessionStorage.setItem(
      "ai-builder-open-manager-item:Services",
      JSON.stringify({
        id: svc.id != null ? String(svc.id) : undefined,
        slug: slug && slug !== "service-detail" ? slug : undefined,
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

function ServiceIcon({ name }: { name?: string }) {
  const paths = SERVICE_ICON_PATHS[name || ""] || SERVICE_ICON_PATHS.technician;
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function ServicePageSection({ data }: { data?: any }) {
  const preview = useOptionalPreview();
  const raw = (data ?? {}) as any;
  const s = {
    badge:         raw?.badge         ?? "",
    heading:       raw?.heading       ?? {},
    description:   raw?.description   ?? "",
    readMoreLabel: raw?.readMoreLabel ?? "",
    list:          Array.isArray(raw?.productItems) && raw.productItems.length
      ? raw.productItems.map((item: any, index: number) => ({
          id: item?.id ?? index + 1,
          title: item?.title ?? "",
          image: item?.image ?? "",
          icon: item?.icon || "technician",
          href: item?.slug
            ? `/service-details/${item.slug}`
            : item?.href || "#",
        }))
      : Array.isArray(raw?.list) ? raw.list : [],
  };

  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-0.5 w-8 bg-[#ff6b00]" />
              <span className="text-sm font-bold uppercase tracking-wider text-[#ff6b00]">{s.badge}</span>
              <span className="h-0.5 w-8 bg-[#ff6b00]" />
            </div>
            <h2 className="mb-3 text-3xl font-extrabold text-[#0b1c3d] sm:text-4xl lg:text-[42px]">
              {s.heading.main} <span className="text-[#ff6b00]">{s.heading.highlight}</span>
            </h2>
            <p className="mx-auto max-w-xl text-gray-600">{s.description}</p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-4 gap-6">
            {s.list.map((svc: any, i: number) => (
              <div
                key={svc.id ?? i}
                className="group/item flex h-auto flex-col"
              >
                <article className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={svc.image} alt={svc.title} className="h-full w-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
                    <div className="absolute inset-0 bg-[#0b1c3d]/10 transition group-hover/item:bg-[#0b1c3d]/30" />
                    <span className="absolute bottom-2 right-4 text-5xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 gap-4 px-5 pb-6">
                    <div className="relative -mt-10 h-20 w-20 shrink-0">
                      <div className="absolute inset-x-0 bottom-0 top-10 border-2 border-t-0 border-[#1f6fd6]" />
                      <span className="absolute -left-1 top-9 h-2.5 w-2.5 bg-[#ff6b00]" />
                      <span className="absolute -right-1 top-9 h-2.5 w-2.5 bg-[#ff6b00]" />
                      <div className="relative z-10 mx-auto flex h-[60px] w-[60px] items-center justify-center bg-white text-[#0b1c3d] shadow-md transition group-hover/item:bg-[#ff6b00] group-hover/item:text-white">
                        <ServiceIcon name={svc.icon} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col pt-5">
                      <div className="mb-1 flex items-center gap-3 text-xs font-medium text-gray-500">
                        Service {String(i + 1).padStart(2, "0")}
                        <span className="h-px w-8 bg-gray-300" />
                      </div>
                      <h3 className="mb-2 text-[17px] font-bold leading-snug text-[#0b1c3d]">{svc.title}</h3>
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
                              openCoolFixServiceCardEditor(svc);
                              return;
                            }
                            openCoolFixServiceDetail(svc.href);
                            preview?.setCurrentPage("Service Detail");
                          }}
                          className="inline-flex items-center gap-2 text-[13px] font-bold text-gray-500 underline underline-offset-4 transition group-hover/item:text-[#ff6b00]"
                        >
                          {s.readMoreLabel}
                          <ArrowRightIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CoolFixServicePage1({ data }: SectionProps) {
  return <ServicePageSection data={data} />;
}
