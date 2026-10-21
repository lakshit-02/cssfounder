// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { ArrowLeft } from "lucide-react";
import { HealthLink as Link } from "../health-and-wellness/shared";

const rays = [
  "M36 26l-10-10",
  "M26 60H12",
  "M36 94l-10 10",
  "M184 26l10-10",
  "M194 60h14",
  "M184 94l10 10",
];

export default function MediCareThankYouPage1({ data }: SectionProps) {
  const raw = (data ?? {}) as {
    titleMain?: string;
    titleHighlight?: string;
    subtitle?: string;
    description?: string;
    buttonLabel?: string;
  };
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#f4fbf9] via-white to-[#f1f8fb] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-24 top-16 h-[420px] w-[420px] rounded-full bg-[#e3f5ef] opacity-70" />
      <div className="pointer-events-none absolute -right-32 top-24 h-[480px] w-[480px] rounded-full bg-[#e8f4f8] opacity-80" />
      <div className="relative z-10 mx-auto max-w-[640px] px-4">
        <div className="rounded-[28px] border border-slate-100 bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(4,42,77,0.08)] sm:px-14 sm:py-14">
          <div className="relative mx-auto mb-8 h-[120px] w-[120px]">
            <svg
              viewBox="0 0 220 120"
              className="absolute left-1/2 top-0 h-[120px] w-[220px] -translate-x-1/2"
              fill="none"
              stroke="#00a859"
              strokeWidth="3"
              strokeLinecap="round"
            >
              {rays.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
            <div className="absolute inset-0 rounded-full bg-[#e3f7ee]" />
            <div className="absolute inset-[14px] rounded-full bg-[#c9efdc]" />
            <div className="absolute inset-[24px] flex items-center justify-center rounded-full bg-gradient-to-b from-[#16b86a] to-[#00a050] shadow-[0_8px_20px_rgba(0,168,89,0.35)]">
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
            <span className="text-[#042a4d]">{raw.titleMain || "Thank"}</span>{" "}
            <span className="text-[#00a859]">{raw.titleHighlight || "You!"}</span>
          </h1>
          <h2 className="mb-5 text-lg font-semibold text-[#042a4d] sm:text-[22px]">
            {raw.subtitle || "Your Message Has Been Sent Successfully"}
          </h2>
          <p className="mx-auto mb-9 max-w-[480px] text-[15px] leading-relaxed text-slate-500 sm:text-base">
            {raw.description ||
              "We appreciate you reaching out to us. Our team will get back to you as soon as possible. Your health and queries are important to us."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-lg bg-[#00a859] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(0,168,89,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#009a51]"
          >
            <ArrowLeft className="h-5 w-5" />
            {raw.buttonLabel || "Back to Home"}
          </Link>
        </div>
      </div>
    </section>
  );
}
