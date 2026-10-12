// @ts-nocheck
"use client";
import React, { useState } from "react";
import type { SectionProps } from "../../../types/section";


function ChevronRightIcon() {
  return <svg className="h-4 w-4 shrink-0 transition group-hover/item:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;
}
function ArrowRightIcon() {
  return <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}
function PhoneIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
}
function HeadsetIcon() {
  return <svg className="h-12 w-12 shrink-0 text-[#ff6b00]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>;
}

function ServiceDetailPageSection({ data }: { data?: any }) {
  const raw = (data ?? {}) as any;
  const sidebar = raw?.sidebar ?? { assistance: {} };
  const items   = Array.isArray(raw?.items) ? raw.items : [];
  const [currentSlug, setCurrentSlug] = useState(() => {
    if (typeof window === "undefined") return items[0]?.slug ?? "";
    try {
      const saved = sessionStorage.getItem("coolfix-service-slug") || "";
      if (items.some((item: { slug?: string }) => item.slug === saved)) return saved;
    } catch {
      /* ignore */
    }
    return items[0]?.slug ?? "";
  });
  React.useEffect(() => {
    const onPick = (event: Event) => {
      const slug = (event as CustomEvent<{ slug?: string }>).detail?.slug || "";
      if (items.some((item: { slug?: string }) => item.slug === slug)) {
        setCurrentSlug(slug);
      }
    };
    window.addEventListener("coolfix-service-slug", onPick);
    return () => window.removeEventListener("coolfix-service-slug", onPick);
  }, [items]);
  const current = items.find((item: any) => item.slug === currentSlug) ?? items[0];
  if (!current) return null;
  const { hero, sections } = current;
  const { assistance } = sidebar;

  return (
    <div className="bg-white">
      {/* Page Banner */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8 xl:gap-10">

          {/* Sidebar */}
          <aside className="order-2 flex flex-col gap-6 lg:order-1">
            {/* Services list */}
            <div className="rounded-xl bg-[#0b2a5b] p-4 shadow-[0_10px_30px_rgba(11,28,61,0.18)] sm:p-5">
              <h3 className="mb-5 text-[22px] font-bold text-white">
                {sidebar.title}
                <span className="mt-2 block h-[3px] w-10 rounded bg-[#ff6b00]" />
              </h3>
              <ul className="space-y-2">
                {items.map((svc: any) => (
                  <li key={svc.slug}>
                    <button type="button" onClick={() => setCurrentSlug(svc.slug)}
                      className={`group/item flex w-full items-center gap-3 rounded-md border px-3 py-3 text-[13px] font-medium transition ${
                        svc.slug === currentSlug
                          ? "border-[#ff6b00] bg-[#ff6b00] text-white shadow-md shadow-orange-500/30"
                          : "border-white/10 text-white hover:border-[#ff6b00]/60 hover:bg-white/5"
                      }`}>
                      <span className="flex-1 text-left">{svc.label}</span>
                      <ChevronRightIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assistance card */}
            <div className="rounded-xl bg-[#0b2a5b] p-6 shadow-[0_10px_30px_rgba(11,28,61,0.18)]">
              <div className="mb-5 flex items-start gap-3">
                <HeadsetIcon />
                <div>
                  <h3 className="text-lg font-bold text-white">{assistance.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-gray-300">{assistance.description}</p>
                </div>
              </div>
              <a href={`tel:${(assistance.phone ?? "").replace(/\s/g, "")}`}
                className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#ff6b00]">
                  <PhoneIcon />
                </span>
                <span className="text-xl font-bold text-white">{assistance.phone}</span>
              </a>
              <a href={assistance.btnLink ?? "#page-contact"}
                className="inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#ff6b00] px-7 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/30 transition-colors hover:bg-[#e55f00]">
                {assistance.btnText}
                <ArrowRightIcon />
              </a>
            </div>
          </aside>

          {/* Main content */}
          <div className="order-1 lg:order-2">
            {/* Hero banner */}
            <div className="relative flex min-h-[380px] overflow-hidden rounded-xl bg-[#0b2a5b] sm:min-h-[400px]">
              <div className="absolute inset-y-0 right-0 w-full sm:w-[62%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hero.image} alt={current.label}
                  className="h-full w-full object-cover object-[center_28%]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b2a5b] via-[#0b2a5b]/50 to-transparent" />
              </div>
              <div className="absolute inset-0 bg-[#0b2a5b]/40 sm:hidden" />

              <div className="relative z-10 flex max-w-[400px] flex-col justify-center px-6 py-10 sm:px-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">{hero.badge}</span>
                  <span className="h-px w-10 bg-white/70" />
                </div>
                <h2 className="mb-4 text-[34px] font-extrabold leading-[1.1] text-white sm:text-[44px]">
                  {hero.heading.main}<br />
                  <span className="text-[#ff6b00]">{hero.heading.highlight}</span>
                </h2>
                <p className="mb-7 max-w-[260px] text-[15px] leading-snug text-gray-200">{hero.subtitle}</p>
                <ul className="grid grid-cols-4 gap-3">
                  {(hero.features ?? []).map((f: any) => (
                    <li key={f.label} className="flex flex-col items-center gap-2 text-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                      </span>
                      <span className="text-[11px] font-semibold leading-tight text-white">{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sections */}
            <div className="mt-9 space-y-8">
              {(sections ?? []).map((sec: any) => (
                <article key={sec.title}>
                  <h3 className="text-[22px] font-bold text-[#0b2a5b] sm:text-2xl">{sec.title}</h3>
                  <span className="mt-2 block h-[3px] w-10 rounded bg-[#ff6b00]" />
                  <p className="mt-4 text-[15px] leading-relaxed text-gray-500">{sec.text}</p>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default function CoolFixServiceDetailPage1({ data }: SectionProps) {
  return <ServiceDetailPageSection data={data} />;
}
