// @ts-nocheck
"use client";
import React from "react";
import type { SectionProps } from "../../../types/section";
const colors: Record<string, { iconBg: string; icon: string; corner: string; bar: string }> = {
  orange: { iconBg: "bg-orange-50", icon: "text-[#ff6b00]", corner: "bg-orange-200/70", bar: "bg-[#ff6b00]" },
  blue:   { iconBg: "bg-blue-50",   icon: "text-[#1f5fc9]", corner: "bg-blue-200/70",   bar: "bg-[#1f5fc9]" },
};

function HighlightIcon({ name }: { name: string }) {
  if (name === "phone")
    return <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
  if (name === "clock")
    return <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  if (name === "users")
    return <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
  return <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
}

export default function CoolFixHighlights1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  const d = {
    badge:       raw?.badge       ?? "",
    heading:     raw?.heading     ?? {},
    description: raw?.description ?? "",
    list:        Array.isArray(raw?.list) ? raw.list : [],
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f9fd] py-16 lg:py-24">
      <div className="pointer-events-none absolute left-8 top-16 hidden h-24 w-32 opacity-70 md:block"
        style={{ backgroundImage: "radial-gradient(#b9c8e2 1.5px, transparent 1.5px)", backgroundSize: "18px 18px" }} />
      <div className="pointer-events-none absolute -right-10 -top-28 h-96 w-96 rounded-full bg-[#eef3fb]" />
      <div className="pointer-events-none absolute -right-28 -top-44 h-80 w-80 rounded-full border-[28px] border-[#ff6b00]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#eef3fb]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-4">
            <span className="h-0.5 w-10 bg-[#ff6b00]" />
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#0b1c3d]">{d.badge}</span>
            <span className="h-0.5 w-10 bg-[#ff6b00]" />
          </div>
          <h2 className="mb-4 text-3xl font-extrabold text-[#0b1c3d] sm:text-4xl lg:text-[44px]">
            {d.heading.main} <span className="text-[#ff6b00]">{d.heading.highlight}</span>
          </h2>
          <p className="text-gray-600">{d.description}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {d.list.map((item: any) => {
            const c = colors[item.color as keyof typeof colors] ?? colors.orange;
            return (
              <div key={item.title}
                className="group/item relative flex items-center gap-4 overflow-hidden rounded-xl bg-white px-5 pb-10 pt-8 shadow-[0_8px_30px_rgba(11,28,61,0.07)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,28,61,0.12)]">
                <span className={`absolute right-0 top-0 h-8 w-8 ${c.corner}`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
                <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${c.iconBg} ${c.icon} transition group-hover/item:scale-110`}>
                  <HighlightIcon name={item.icon} />
                </span>
                <span className="h-16 w-px shrink-0 bg-gray-200" />
                <div>
                  <h3 className="mb-1 text-lg font-bold text-[#0b1c3d]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>
                <span className={`absolute bottom-0 left-1/2 h-1 w-16 -translate-x-1/2 rounded-t-full ${c.bar} transition-all group-hover/item:w-28`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
