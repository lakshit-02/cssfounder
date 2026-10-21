// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image, HealthLink as Link } from "../health-and-wellness/shared";
type MedicareDataProps = { data?: any; limit?: number };

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Phone, ArrowRight } from "lucide-react";

function FAQSection({ data }: MedicareDataProps) {
  const faqs = Array.isArray(data?.list) ? data.list : [];
  const contactBox = data?.contactBox;
  const doctorImage = data?.image;

  const [openId, setOpenId] = useState<string>("01");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  if (!data?.heading || !contactBox || !faqs.length) return null;
  const { badge, description } = data;

  return (
    <section className="relative w-full py-8 lg:py-10 bg-white overflow-hidden select-none">
      {/* Background Soft Shape (Mint Green behind right side) */}
      <div className="absolute top-[10%] right-[-10%] w-[45%] h-[85%] bg-[#edfbf5] rounded-l-[120px] -z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* ── LEFT: FAQ Accordion Column ── */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
            <span className="text-[13px] font-bold text-[#00a859] tracking-wider uppercase">
              {badge}
            </span>
            <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
          </div>

          {/* Heading */}
          <h2 className="text-[32px] sm:text-4xl md:text-[44px] font-extrabold leading-[1.15] tracking-tight mb-4">
            <span className="text-[#043365]">{data.heading.main}</span>{" "}
            <span className="text-[#00a859]">{data.heading.highlight}</span>
          </h2>

          {/* Description */}
          <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-xl">
            {description}
          </p>

          {/* Accordion Items List */}
          <div className="space-y-3.5">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-[#f4fdf8] border-emerald-100 shadow-[0_4px_20px_rgba(0,168,89,0.05)]"
                      : "bg-[#f4f9fb] border-slate-100/60 hover:bg-slate-50"
                  }`}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full py-4 px-5 flex items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      {/* Number Badge */}
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 transition-colors ${
                          isOpen
                            ? "bg-[#00a859] text-white shadow-sm"
                            : "bg-[#e5f0f6] text-[#043365]"
                        }`}
                      >
                        {faq.id}
                      </span>

                      {/* Question Text */}
                      <span className="text-[15px] sm:text-[16px] font-bold text-[#043365]">
                        {faq.question}
                      </span>
                    </div>

                    {/* Chevron Icon */}
                    <div className="text-[#043365] shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer (Smooth Grid Animation) */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-5 mb-5 pt-4 pl-[52px] border-t border-emerald-100/60">
                        <p className="text-slate-500 text-[14px] leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Doctor Image + Overlapping Floating CTA ── */}
        <div className="lg:col-span-5 relative w-full flex flex-col items-center">
          {/* Background Subtle Dots */}
          <div className="absolute top-12 -left-6 w-16 h-24 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:10px_10px] opacity-70 -z-10" />

          {/* Main Doctor Image Container */}
          <div className="relative w-full aspect-[1/1.12] rounded-[36px] overflow-hidden bg-slate-100 shadow-xl border-4 border-white">
            <Image
              src={doctorImage}
              alt="Doctor On Call"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {/* Floating Bottom Card: Contact & Appointment */}
          <div className="absolute -bottom-6 inset-x-4 sm:inset-x-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.1)] border border-slate-100 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 z-20">
            {/* Phone Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00a859] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Phone className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 leading-tight">
                  {contactBox.label}
                </p>
                <a
                  href={`tel:${contactBox.phone.replace(/\s+/g, "")}`}
                  className="text-[13px] sm:text-[14px] font-extrabold text-[#073260] hover:text-[#00a859] transition-colors"
                >
                  {contactBox.phone}
                </a>
              </div>
            </div>
            <div className="hidden sm:block w-[1px] h-8 bg-slate-200" />
            <Link
              href={contactBox.btnLink || "/contact"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00a859] hover:bg-[#008f4c] text-white text-[13px] font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0"
            >
              <span>{contactBox.btnText}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediCareFaq1({ data }: SectionProps) {
  if (!data) return null;
  return <FAQSection data={data as any} />;
}
