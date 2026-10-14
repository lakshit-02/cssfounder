// @ts-nocheck
"use client";
import React, { useState } from "react";
import type { SectionProps } from "../../../types/section";

/* ─── Icons ──────────────────────────────── */
function ArrowRightIcon() {
  return <svg className="h-5 w-5 transition group-hover/item:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}
function PlayIcon() {
  return <svg className="relative ml-0.5 h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>;
}
function ChevronRightIcon() {
  return <svg className="h-5 w-5 transition group-hover/item:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;
}

/* ─── WHY CHOOSE US icons ──────────────────── */
const NAVY   = "#0b2a5b";
const ORANGE = "#ff6b00";

function FeatureIcon({ name }: { name: string }) {
  const common = { viewBox: "0 0 48 48", fill: "none", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-10 w-10", "aria-hidden": true };
  if (name === "technician")
    return <svg {...common} stroke={NAVY}><path d="M15 19c0-5.5 4-9.5 9-9.5s9 4 9 9.5" fill={ORANGE} stroke={ORANGE} /><path d="M12.5 19h23" stroke={ORANGE} strokeWidth={2.6} /><path d="M16.5 19.5v2a7.5 7.5 0 0015 0v-2" /><path d="M8 42v-3c0-5.5 4.5-9.5 10-9.5h12c5.5 0 10 4 10 9.5v3z" /><path d="M19 29.5l5 5.5 5-5.5" /><path d="M17 42v-7M31 42v-7" stroke={ORANGE} /></svg>;
  if (name === "acUnit")
    return <svg {...common} stroke={NAVY}><rect x="5" y="10" width="38" height="16" rx="3" /><path d="M9.5 21h29" /><path d="M34 15h4" stroke={ORANGE} /><g stroke={ORANGE}><path d="M17 30.5c-1.8 1.8 1.8 3.2 0 5s1.8 3.2 0 5" /><path d="M24 30.5c-1.8 1.8 1.8 3.2 0 5s1.8 3.2 0 5" /><path d="M31 30.5c-1.8 1.8 1.8 3.2 0 5s1.8 3.2 0 5" /></g></svg>;
  if (name === "rupee")
    return <svg {...common} stroke={NAVY}><circle cx="26" cy="15" r="10" stroke={ORANGE} /><path d="M22 10.5h8M22 14h8M24 10.5c4.5 0 4.5 7 0 7h-2l6 4.5" stroke={ORANGE} strokeWidth={2} /><path d="M5 31h6v12H5" /><path d="M11 33l5-2.5h6.5a2.5 2.5 0 010 5H18" /><path d="M22 35.5l11-4a2.6 2.6 0 012.4 4.6L24 42H11" /></svg>;
  return null;
}

/* ─── Stat icon (uses stat-*.svg images) ───── */
function StatItem({ stat }: { stat: { icon: string; value: string; label: string } }) {
  const num    = String(stat.value).replace(/[^0-9]/g, "");
  const symbol = String(stat.value).replace(/[0-9]/g, "");
  return (
    <div className="relative flex flex-col items-center px-3 text-center lg:before:absolute lg:before:bottom-[12%] lg:before:left-0 lg:before:top-[28%] lg:before:w-px lg:before:bg-gray-200 lg:first:before:hidden">
      <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#eaf2fd]">
        <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={stat.icon} alt="" width={48} height={48} className="h-12 w-12" />
        </div>
        <span className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#ff6b00] text-white shadow-sm">
          <svg viewBox="0 0 12 12" className="h-3 w-3" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M6 1.5v9M1.5 6h9" /></svg>
        </span>
      </div>
      <div className="relative mt-5 text-[42px] font-extrabold leading-none tracking-tight sm:text-[50px]">
        <span className="text-[#0b2a5b]">{num}</span>
        <span className="text-[#ff6b00]">{symbol}</span>
      </div>
      <div className="mt-3 text-[14px] font-medium text-[#1f2937] sm:text-[16px]">{stat.label}</div>
      <div className="mt-4 flex h-[3px] w-16 overflow-hidden rounded-full bg-gray-200">
        <span className="w-[40%] bg-[#ff6b00]" />
      </div>
    </div>
  );
}

/* ─── Stat icons (same as CoolFixAbout1) ────── */
function AboutStatIcon({ icon }: { icon: string }) {
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

/* ─── About Us section (no CTA button) ──────── */
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

function AboutSection({ d }: { d: any }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const videoSrc = coolFixVideoSrc(d.videoUrl ?? "");
  return (
    <section className="overflow-hidden bg-white pt-8 pb-0 lg:pt-12 lg:pb-0">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-[#ff6b00]">{d.badge}</span>
            <span className="h-0.5 w-12 bg-[#ff6b00]" />
          </div>
          <h2 className="mb-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0b2a5b] sm:text-5xl lg:text-[54px]">
            {d.heading?.main}<br />
            {d.heading?.middle} <span className="text-[#ff6b00]">{d.heading?.highlight}</span>
          </h2>
          <p className="mb-8 leading-relaxed text-gray-600">{d.description}</p>

          {/* Inline stats — same layout as CoolFixAbout1 */}
          <div className="mb-8 flex flex-wrap items-center gap-y-6">
            {(d.stats ?? []).map((stat: any, idx: number) => (
              <div key={stat.label} className="flex items-center">
                {idx > 0 && <span className="mx-6 hidden h-16 w-px bg-gray-200 sm:block" />}
                <div className="flex items-center gap-4 pr-6 sm:pr-0">
                  <AboutStatIcon icon={stat.icon} />
                  <span className="h-16 w-px bg-gray-200" />
                  <div>
                    <div className="text-[26px] font-extrabold leading-tight text-[#0b2a5b]">{stat.value}</div>
                    <div className="mt-1 text-sm text-gray-700">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="leading-relaxed text-gray-600">{d.goal}</p>
        </div>

        <div className="relative mx-auto aspect-[1.1] w-full max-w-[560px]">
          <div className="absolute right-[2%] top-0 h-[30%] w-[56%] rounded-tl-md rounded-br-[28px] bg-[#1f4fa3]" />
          <div className="absolute left-0 top-[47%] h-[36%] w-[26%] rounded-bl-md bg-[#1f4fa3]" />
          <div className="absolute right-[1%] top-[46%] h-[24%] w-[6%] rounded-r-xl bg-[#ff6b00]" />
          <div className="absolute -right-[6%] top-[24%] hidden h-[22%] w-[15%] opacity-70 sm:block"
            style={{ backgroundImage: "radial-gradient(#9db8e3 1.6px, transparent 1.6px)", backgroundSize: "13px 13px" }} />
          {/* Main image */}
          <div className="absolute left-[4%] top-[6.5%] h-[68%] w-[88%] overflow-hidden rounded-2xl border-[6px] border-white shadow-[0_12px_35px_rgba(11,28,61,0.18)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.image.main} alt="AC technician repairing an air conditioner" className="h-full w-full object-cover" />
          </div>
          {/* Secondary image + play */}
          <div className="absolute bottom-0 right-[3%] h-[47%] w-[62%] overflow-hidden rounded-2xl border-[6px] border-white shadow-[0_16px_40px_rgba(11,28,61,0.25)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.image.secondary} alt="AC technician smiling" className="h-full w-full object-cover" />
            <button
              type="button"
              aria-label="Play video"
              data-editor-no-inline
              className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (videoSrc) setVideoOpen(true);
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
      {videoOpen && videoSrc ? <VideoLightbox src={videoSrc} onClose={() => setVideoOpen(false)} /> : null}
    </section>
  );
}

/* ─── Stats section ──────────────────────────── */
function StatsSection({ d }: { d: any }) {
  return (
    <section className="border-t border-gray-100 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {(d.list ?? []).map((stat: any) => <StatItem key={stat.label} stat={stat} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── WhyChooseUs section ───────────────────── */
function WhyChooseUsSection({ d }: { d: any }) {
  return (
    <section className="overflow-hidden bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-0.5 w-12 bg-[#ff6b00]" />
            <span className="text-sm font-bold uppercase tracking-wider text-[#0b2a5b]">{d.badge}</span>
            <span className="h-0.5 w-12 bg-[#ff6b00]" />
          </div>
          <h2 className="mb-10 text-3xl font-extrabold leading-[1.15] tracking-tight text-[#0b2a5b] sm:text-4xl">
            {d.heading?.main}<br />
            {d.heading?.middle} <span className="text-[#ff6b00]">{d.heading?.highlight}</span>
          </h2>
          <div className="space-y-6">
            {(d.list ?? []).map((item: any) => (
              <div key={item.title} className="group/item flex items-start gap-5">
                <span className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border-2 border-[#ff6b00]/70 bg-orange-50/60 transition group-hover/item:bg-orange-100">
                  <FeatureIcon name={item.icon} />
                </span>
                <div className="pt-1">
                  <h3 className="mb-1.5 text-lg font-bold text-[#0b2a5b] sm:text-xl">{item.title}</h3>
                  <p className="max-w-md text-[15px] leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[580px] pb-5 pl-3 pr-5 pt-3 sm:pb-6 sm:pr-6">
          <div className="absolute left-0 top-0 h-[55%] w-[60%] rounded-[28px] rounded-br-none bg-[#0b2a5b]" />
          <div className="absolute bottom-0 right-0 h-[60%] w-[55%] rounded-[28px] rounded-tl-none bg-[#ff6b00]" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] rounded-bl-[44px] rounded-tr-[44px] shadow-[0_18px_45px_rgba(11,28,61,0.18)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.image} alt="AC technician at work" className="h-full w-full object-cover object-[center_20%]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Steps section ─────────────────────────── */
function StepsSection({ d }: { d: any }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mb-4 flex items-center justify-center gap-4">
        <span className="h-0.5 w-10 bg-[#ff6b00]" />
        <span className="text-sm font-semibold uppercase tracking-widest text-gray-600">{d.badge}</span>
        <span className="h-0.5 w-10 bg-[#ff6b00]" />
      </div>
      <h2 className="mb-12 text-3xl font-bold text-[#0b1c3d] sm:text-4xl">
        {d.heading?.main} <span className="text-[#ff6b00]">{d.heading?.highlight}</span>
      </h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-0 lg:grid-cols-4">
        {(d.list ?? []).map((step: any, index: number) => (
          <div key={step.id} className="group/item relative flex flex-col items-center px-1 sm:px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={step.image} alt={step.title}
              className="-mb-3 h-[90px] w-[90px] transition duration-300 group-hover/item:-translate-y-1 sm:h-[150px] sm:w-[150px]" />
            <h3 className="mb-1 text-[15px] font-bold leading-tight text-[#0b1c3d] sm:text-lg">{step.title}</h3>
            <p className="max-w-[190px] text-[13px] leading-snug text-gray-500 sm:text-[15px]">{step.description}</p>
            {index < (d.list ?? []).length - 1 && (
              <div className="absolute inset-y-6 right-0 hidden w-px bg-gray-200 lg:block">
                <svg className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 bg-white py-1 text-[#0b1c3d]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Main Export ──────────────────────────────
   Exact match of coolfix about page:
   PageBanner → About (no CTA) → Stats → WhyChooseUs → Steps
──────────────────────────────────────────────── */
export default function CoolFixAboutPage1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  const about = raw.about ?? raw;
  return (
    <div className="bg-white">
      <AboutSection d={about ?? { heading: {}, stats: [], image: {} }} />
    </div>
  );
}
