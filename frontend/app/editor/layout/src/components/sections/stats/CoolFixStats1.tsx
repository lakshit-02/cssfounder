// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import type { SectionProps } from "../../../types/section";
function StatsSection({ data }: { data?: any }) {
  const raw = data ?? {};
  const list = Array.isArray(raw?.list) ? raw.list : [];

  return (
    <section className="border-t border-gray-100 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {list.map((stat) => {
            const num = String(stat.value).replace(/[^0-9]/g, "");
            const symbol = String(stat.value).replace(/[0-9]/g, "");
            return (
              <div
                key={stat.label}
                className="relative flex flex-col items-center px-3 text-center lg:before:absolute lg:before:bottom-[12%] lg:before:left-0 lg:before:top-[28%] lg:before:w-px lg:before:bg-gray-200 lg:first:before:hidden"
              >
                <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#eaf2fd]">
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white">
                    <Image src={stat.icon} alt="" width={48} height={48} unoptimized className="h-12 w-12" />
                  </div>
                  <span className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#ff6b00] text-white shadow-sm">
                    <svg viewBox="0 0 12 12" className="h-3 w-3" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                      <path d="M6 1.5v9M1.5 6h9" />
                    </svg>
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
          })}
        </div>
      </div>
    </section>
  );
}

export default function CoolFixStats1({ data }: SectionProps) {
  return <StatsSection data={data} />;
}
