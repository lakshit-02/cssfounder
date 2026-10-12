// @ts-nocheck
"use client";
import React from "react";
import type { SectionProps } from "../../../types/section";

const CONTACT_ICON_PATHS: Record<string, string[]> = {
  phone: ["M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"],
  envelope: ["M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"],
  location: [
    "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
    "M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  ],
  userCheck: [
    "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    "M16 11l2 2 4-4",
  ],
  calendar: ["M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"],
  settings: [
    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  ],
  acUnit: [
    "M3 5h18a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z",
    "M5 10h14M17 7.5h1",
    "M7 16c0 1.5-1 2-1 3.5M12 16c0 1.5-1 2-1 3.5M17 16c0 1.5-1 2-1 3.5",
  ],
  clipboardCheck: ["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"],
  arrowRight: ["M17 8l4 4m0 0l-4 4m4-4H3"],
  snowflake: [
    "M12 2v20M3.34 7l17.32 10M3.34 17L20.66 7",
    "M9 4l3 2 3-2M9 20l3-2 3 2",
    "M4.5 10.2l2.6-1.7-.1-3.2M19.5 13.8l-2.6 1.7.1 3.2",
    "M4.5 13.8l2.6 1.7-.1 3.2M19.5 10.2l-2.6-1.7.1-3.2",
  ],
};

function ContactSvg({
  name,
  className = "h-5 w-5",
  strokeWidth = 2,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  if (name === "navigation") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.7 2.3a1 1 0 00-1.05-.24l-18 7a1 1 0 00.08 1.9l7.6 2.02 2.02 7.6a1 1 0 001.9.08l7-18a1 1 0 00-.25-1.06z" />
      </svg>
    );
  }
  const paths = CONTACT_ICON_PATHS[name] || CONTACT_ICON_PATHS.phone;
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function FieldIcon({ name }: { name: string }) {
  return <ContactSvg name={name} className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" strokeWidth={2} />;
}


function ContactPageSection({ data }: { data?: any }) {
  const raw = (data ?? {}) as any;
  const c = {
    badge:       raw?.badge       ?? "",
    heading:     raw?.heading     ?? {},
    description: raw?.description ?? "",
    info:        Array.isArray(raw?.info) ? raw.info : [],
    image:       raw?.image       ?? "",
    form:        raw?.form        ?? {},
    map:         raw?.map         ?? {},
  };
  const { form, map } = c;
  const fields = form?.fields ?? {};

  return (
    <div className="bg-white">
      {/* Page Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f4f8fe] via-white to-[#f4f8fe] py-16 lg:py-20">
        <div className="pointer-events-none absolute -left-24 top-[46%] h-64 w-64 rounded-full bg-[#ffe3cf]/70" />

        <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:px-8">
          {/* Left: Info + image */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-0.5 w-10 bg-[#ff6b00]" />
              <span className="text-sm font-bold uppercase tracking-wider text-[#ff6b00]">{c.badge}</span>
            </div>
            <h2 className="mb-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-[#0b2a5b] sm:text-4xl lg:text-[42px]">
              {c.heading.main}<br />
              <span className="text-[#ff6b00]">{c.heading.highlight}</span> {c.heading.end}
            </h2>

            <div className="grid gap-8 sm:grid-cols-[1fr_minmax(200px,0.85fr)] sm:gap-6">
              <div>
                <p className="mb-8 text-[15px] leading-relaxed text-gray-600">{c.description}</p>
                <ul className="space-y-7">
                  {c.info.map((item: any) => (
                    <li key={item.id} className="flex gap-4">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-md ${item.color === "orange" ? "bg-[#ff6b00] shadow-orange-500/30" : "bg-[#0b2a5b] shadow-blue-900/30"}`}>
                        <ContactSvg name={item.icon || "phone"} />
                      </span>
                      <div className="pt-0.5">
                        <div className="mb-0.5 text-[17px] font-bold text-[#0b2a5b]">{item.title}</div>
                        <div className="text-[15px] font-medium text-gray-700">{item.value}</div>
                        {item.subText && <div className="mt-0.5 text-[13px] text-gray-500">{item.subText}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative image */}
              <div className="relative hidden min-h-[320px] pb-3 pl-3 pt-3 sm:block">
                <div className="absolute left-0 top-0 h-1/2 w-3/4 rounded-[28px] rounded-br-none bg-[#0b2a5b]" />
                <div className="absolute bottom-0 left-0 h-1/3 w-1/2 rounded-[22px] rounded-tr-none bg-[#ff6b00]" />
                <div className="relative h-full overflow-hidden rounded-[36px] rounded-br-[20px] rounded-tl-[60px] border-4 border-white shadow-[0_16px_40px_rgba(11,28,61,0.18)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt="Technician servicing an AC"
                    className="h-full w-full object-cover object-[60%_20%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_10px_40px_rgba(11,28,61,0.1)]">
            <div className="relative overflow-hidden bg-[#0b2a5b] px-6 py-6 sm:px-8">
              <ContactSvg name="snowflake" className="pointer-events-none absolute -right-4 top-1/2 h-36 w-36 -translate-y-1/2 text-white/15" strokeWidth={1.2} />
              <h3 className="relative mb-2 text-2xl font-extrabold text-white sm:text-[28px]">
                {form?.heading?.main} <span className="text-[#ff6b00]">{form?.heading?.highlight}</span>
              </h3>
              <p className="relative max-w-sm text-[13px] leading-relaxed text-gray-300">{form?.description}</p>
            </div>

            <form className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
              <label className="block space-y-1.5">
                <span className="text-xs font-bold text-[#0b2a5b]">{fields.name?.label} <span className="text-[#ff6b00]">*</span></span>
                <span className="relative block">
                  <FieldIcon name="userCheck" />
                  <input type="text" name="name" placeholder={fields.name?.placeholder} required
                    className="h-11 w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-[13px] outline-none focus:border-[#ff6b00]" />
                </span>
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-bold text-[#0b2a5b]">{fields.phone?.label} <span className="text-[#ff6b00]">*</span></span>
                <span className="relative block">
                  <FieldIcon name="phone" />
                  <input type="tel" name="phone" placeholder={fields.phone?.placeholder} required
                    className="h-11 w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-[13px] outline-none focus:border-[#ff6b00]" />
                </span>
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-bold text-[#0b2a5b]">{fields.email?.label} <span className="text-[#ff6b00]">*</span></span>
                <span className="relative block">
                  <FieldIcon name="envelope" />
                  <input type="email" name="email" placeholder={fields.email?.placeholder} required
                    className="h-11 w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-[13px] outline-none focus:border-[#ff6b00]" />
                </span>
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-bold text-[#0b2a5b]">{fields.date?.label}</span>
                <span className="relative block">
                  <FieldIcon name="calendar" />
                  <input type="date" name="date"
                    className="h-11 w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-[13px] text-gray-500 outline-none focus:border-[#ff6b00]" />
                </span>
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-bold text-[#0b2a5b]">{fields.serviceType?.label}</span>
                <span className="relative block">
                  <FieldIcon name="settings" />
                  <select name="serviceType" className="h-11 w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-[13px] text-gray-600 outline-none focus:border-[#ff6b00]">
                    <option value="">{fields.serviceType?.placeholder}</option>
                    {(fields.serviceType?.options ?? []).map((o: string) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </span>
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-bold text-[#0b2a5b]">{fields.acType?.label}</span>
                <span className="relative block">
                  <FieldIcon name="acUnit" />
                  <select name="acType" className="h-11 w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-[13px] text-gray-600 outline-none focus:border-[#ff6b00]">
                    <option value="">{fields.acType?.placeholder}</option>
                    {(fields.acType?.options ?? []).map((o: string) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </span>
              </label>
              <label className="block space-y-1.5 sm:col-span-2">
                <span className="text-xs font-bold text-[#0b2a5b]">{fields.message?.label} <span className="text-[#ff6b00]">*</span></span>
                <span className="relative block">
                  <FieldIcon name="clipboardCheck" />
                  <textarea name="message" rows={3} placeholder={fields.message?.placeholder} required
                    className="w-full resize-none rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-[13px] outline-none focus:border-[#ff6b00]" />
                </span>
              </label>
              <div className="flex gap-3 pt-1 sm:col-span-2">
                <button type="submit"
                  className="flex flex-[2] items-center justify-center gap-2 rounded-md bg-[#ff6b00] px-4 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition hover:bg-[#e55f00]">
                  {form?.submitBtn ?? "Send Message"} <ContactSvg name="arrowRight" className="h-4 w-4" />
                </button>
                <button type="reset"
                  className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-[#0b2a5b] transition hover:bg-gray-50">
                  {form?.resetBtn ?? "Reset"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="relative mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:mt-16 lg:px-8">
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_rgba(11,28,61,0.1)] lg:grid-cols-[1fr_300px]">
            <div className="relative h-[320px] lg:h-[300px]">
              <iframe
                title={map?.locationTitle ?? "Our Location"}
                src={`https://www.google.com/maps?q=${encodeURIComponent(map?.embedQuery ?? "Austin, TX")}&z=15&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <h3 className="mb-3 text-2xl font-bold text-[#0b2a5b]">{map?.cardTitle}</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">{map?.cardText}</p>
              <a href={map?.directionsUrl ?? "#"} target="_blank" rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 overflow-hidden rounded-full bg-[#ff6b00] px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-colors hover:bg-[#e55f00]">
                <ContactSvg name="navigation" className="h-4 w-4" />
                {map?.btnText ?? "Get Directions"}
                <ContactSvg name="arrowRight" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CoolFixContactPage1({ data }: SectionProps) {
  return <ContactPageSection data={data} />;
}
