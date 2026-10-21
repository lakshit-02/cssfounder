// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image } from "../health-and-wellness/shared";
type MedicareDataProps = { data?: any; limit?: number };

import React from "react";
import { CheckCircle2, Play } from "lucide-react";

function About({ data }: MedicareDataProps) {
  if (!data?.heading || !data?.images) return null;
  const {
    badge,
    description,
    images,
    features,
    videoCard,
    quote,
  } = data;

  return (
    <section className="relative w-full py-10 lg:py-12 bg-white overflow-hidden select-none">
      {/* ── Background Soft Shapes & Dots Pattern ── */}
      <div className="absolute top-0 left-0 w-[45%] h-[80%] bg-[#f4f9fb] rounded-br-[120px] -z-20 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#f2fbf6] rounded-full blur-3xl -z-20 pointer-events-none" />

      {/* Dot Grids */}
      <div className="absolute top-[10%] left-[38%] w-24 h-24 bg-[radial-gradient(#93c5fd_2px,transparent_2px)] [background-size:12px_12px] opacity-60 -z-10" />
      <div className="absolute bottom-[5%] right-[5%] w-32 h-32 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:12px_12px] opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── LEFT: Overlapping Image Cards ── */}
        <div className="relative w-full flex flex-col items-start pt-6">
          {/* Top Big Image */}
          <div className="relative w-[80%] sm:w-[75%] aspect-[1.25/1] rounded-[24px] overflow-hidden shadow-xl z-10">
            <Image
              src={images.main1}
              alt="Medical Examination"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 90vw, 45vw"
              priority
            />
          </div>

          {/* Floating 'Dr. Kate Winslet' Card */}
          <div className="absolute top-[28%] right-[5%] sm:right-[15%] lg:-right-[5%] xl:right-[5%] z-30 bg-white rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-slate-50 py-3 px-4 flex items-center gap-4 min-w-[260px]">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-slate-100 shadow-sm">
              <Image
                src={images.doctorBadge.avatar}
                alt={images.doctorBadge.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-[14px] font-bold text-[#043365] leading-tight">
                {images.doctorBadge.name}
              </h4>
              <p className="text-[12px] text-slate-400 font-medium mt-0.5">
                {images.doctorBadge.specialty}
              </p>
            </div>
            <button className="bg-[#0f8bfd] hover:bg-[#0d7ce0] text-white text-[13px] font-semibold px-4 py-1.5 rounded-md transition-colors shadow-sm">
              {images.doctorBadge.buttonText}
            </button>
          </div>

          {/* Bottom Overlapping Surgery Photo */}
          <div className="relative -mt-20 sm:-mt-24 ml-auto w-[75%] sm:w-[65%] aspect-[1.3/1] z-20 right-0 sm:right-[5%] lg:-right-[10%] xl:-right-[5%]">
            {/* Green Rounded Accent Behind Top Right Corner */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#00a859] rounded-2xl -z-10" />

            <div className="w-full h-full rounded-[24px] overflow-hidden border-[6px] border-white shadow-2xl relative">
              <Image
                src={images.main2}
                alt="Surgical Operations"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 75vw, 38vw"
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Details, Checkpoints & Video Box ── */}
        <div className="flex flex-col justify-center">
          {/* Badge Accent */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#00a859] rounded-full inline-block" />
            <span className="text-[14px] font-bold text-[#043365] tracking-wide">
              {badge}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-[28px] sm:text-[36px] lg:text-[34px] xl:text-[42px] font-extrabold text-[#043365] leading-[1.2] tracking-tight mb-5">
            {data.heading.main} <br className="hidden sm:block" />
            <span className="text-[#043365]">With Our </span>
            <span className="text-[#00a859]">{data.heading.highlight}</span>
          </h2>

          {/* Description Paragraph */}
          <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-xl font-medium">
            {description}
          </p>

          {/* Features + Video Card Grid */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-10">
            {/* Checklist */}
            <div className="flex-1 space-y-4">
              {features.slice(0, 4).map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-[18px] h-[18px] text-white shrink-0 fill-[#0f8bfd]" />
                  <span className="text-[14px] font-medium text-slate-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Video Play Card */}
            <div className="relative w-full sm:w-[240px] aspect-[1.5/1] rounded-xl overflow-hidden shadow-lg group shrink-0">
              <Image
                src={videoCard.thumbnail}
                alt={videoCard.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#043365]/20 transition-colors group-hover:bg-[#043365]/30" />

              {/* Center Play Round Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                <Play className="w-5 h-5 text-[#043365] fill-current ml-1" />
              </div>

              {/* Bottom Navy Banner */}
              <div className="absolute bottom-0 inset-x-0 bg-[#043365] py-2.5 px-4 flex items-center gap-2 cursor-pointer">
                <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 text-white fill-current ml-0.5" />
                </div>
                <span className="text-[12px] font-semibold text-white tracking-wide">
                  {videoCard.title}
                </span>
              </div>
            </div>
          </div>

          {/* Doctor Quotation Footer */}
          <div className="flex items-center gap-5 mt-2">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
              <Image
                src={quote.avatar}
                alt={quote.author}
                fill
                className="object-cover bg-slate-100"
              />
            </div>
            <div className="w-[3px] h-12 bg-[#00a859] rounded-full shrink-0" />
            <div className="flex flex-col justify-center">
              <p className="text-slate-500 font-medium text-[14px] leading-snug mb-1">
                &ldquo; {quote.text} &rdquo;
              </p>
              <p className="text-[13px] font-bold text-[#043365]">
                {quote.author}
                <span className="text-slate-400 font-normal mx-1.5">-</span>
                <span className="text-slate-400 font-normal">{quote.role}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediCareAboutUs1({ data }: SectionProps) {
  if (!data) return null;
  return <About data={data as any} />;
}
