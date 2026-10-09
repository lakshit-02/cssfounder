// @ts-nocheck
"use client";
import React from "react";
import type { SectionProps } from "../../../types/section";

function ArrowRightIcon() {
  return <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}
function LockIcon() {
  return <svg className="h-3.5 w-3.5 shrink-0 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>;
}
function HeadsetIcon() {
  return (
    <svg className="mb-1 h-7 w-7 text-[#ff6b00]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12V9a7 7 0 00-14 0v3" />
      <path d="M5 12h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2z" />
      <path d="M19 12h-2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2z" />
      <path d="M17 18v1a2 2 0 01-2 2h-2" />
    </svg>
  );
}

function SnowflakeIcon() {
  return (
    <svg className="pointer-events-none absolute -right-4 top-1/2 h-36 w-36 -translate-y-1/2 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2v20M3.34 7l17.32 10M3.34 17L20.66 7" />
      <path d="M9 4l3 2 3-2M9 20l3-2 3 2" />
      <path d="M4.5 10.2l2.6-1.7-.1-3.2M19.5 13.8l-2.6 1.7.1 3.2" />
      <path d="M4.5 13.8l2.6 1.7-.1 3.2M19.5 10.2l-2.6-1.7.1-3.2" />
    </svg>
  );
}

const QUOTE_ICON_PATHS: Record<string, string[]> = {
  clipboardCheck: ["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"],
  shieldCheck: ["M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"],
  technician: ["M8 6.5a4 4 0 018 0", "M6.5 6.5h11", "M9 7v1.5a3 3 0 006 0V7", "M5.5 16.5v-.5a4 4 0 014-4h5a4 4 0 014 4v.5", "M10 12l2 2.5 2-2.5", "M7.2 19.5h9.6", "M7.2 19.5a2.3 2.3 0 10-2.4 2.2l.9-1.2-.9-1.2 1.4-1.1", "M16.8 19.5a2.3 2.3 0 112.4 2.2l-.9-1.2.9-1.2-1.4-1.1"],
  gear: ["M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"],
  stopwatch: ["M12 21a8 8 0 100-16 8 8 0 000 16z", "M12 9v4l2.5 1.5M10 2h4M12 2v3M18.5 5.5l1.5 1.5"],
  rupee: ["M12 21a9 9 0 100-18 9 9 0 000 18z", "M8.5 7.5h7M8.5 10.5h7M11 7.5c3.5 0 3.5 6 0 6H8.5l5.5 4"],
  handshake: ["M11 17l2 2a1 1 0 103-3", "M14 14l2.5 2.5a1 1 0 103-3l-3.88-3.88a3 3 0 00-4.24 0l-.88.88a1 1 0 11-3-3l2.81-2.81a5.79 5.79 0 017.06-.87l.47.28a2 2 0 001.42.25L21 4", "M21 3l1 11h-2", "M3 3L2 14l6.5 6.5a1 1 0 103-3", "M3 4h8"],
};

function FeatureIcon({ name }: { name: string }) {
  const paths = QUOTE_ICON_PATHS[name] || QUOTE_ICON_PATHS.clipboardCheck;
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function GetQuoteSection({ data }: { data?: any }) {
  const raw = (data ?? {}) as any;
  const q = {
    badge:          raw?.badge          ?? "",
    heading:        raw?.heading        ?? {},
    description:    raw?.description    ?? "",
    featuresTop:    Array.isArray(raw?.featuresTop) ? raw.featuresTop : [],
    image:          raw?.image          ?? "",
    helpBadge:      raw?.helpBadge      ?? {},
    featuresBottom: Array.isArray(raw?.featuresBottom) ? raw.featuresBottom : [],
    form:           raw?.form           ?? {},
  };
  const { form } = q;
  const fields = form?.fields ?? {};

  return (
    <div className="bg-white">
      {/* Page Banner */}
      <section className="relative overflow-hidden bg-white pt-14 md:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-0 xl:grid-cols-[minmax(0,1fr)_480px]">

            {/* Left col */}
            <div className="flex flex-col">
              <div className="lg:pr-12">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-0.5 w-8 bg-[#ff6b00]" />
                  <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#ff6b00]">{q.badge}</span>
                  <span className="h-0.5 w-8 bg-[#ff6b00]" />
                </div>
                <h2 className="mb-5 text-[32px] font-extrabold leading-[1.15] text-[#0b2a5b] sm:text-4xl xl:text-[44px]">
                  {q.heading.main}<br />
                  <span className="text-[#ff6b00]">{q.heading.highlight}</span>
                </h2>
                <p className="mb-8 max-w-[560px] text-[15px] leading-relaxed text-gray-500">{q.description}</p>

                {/* Top features */}
                <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {q.featuresTop.map((f: any) => (
                    <li key={f.label} className="flex flex-col items-center gap-3 text-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1e8] text-[#ff6b00]">
                        <FeatureIcon name={f.icon} />
                      </span>
                      <span className="max-w-[110px] text-sm font-bold leading-snug text-[#0b2a5b]">{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image — top 480px of the portrait: AC, hands, and face. */}
              <div className="relative -mx-4 mt-8 aspect-[680/400] overflow-hidden sm:-mx-6 lg:-mr-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={q.image} alt="Technician servicing a split AC"
                  className="absolute inset-0 h-full w-full object-cover object-top" />

                {/* Help badge circle */}
                <div className="absolute bottom-6 right-6 flex h-[146px] w-[146px] flex-col items-center justify-center rounded-full border-2 border-[#ff6b00] bg-white text-center shadow-[0_10px_30px_rgba(11,28,61,0.25)] lg:right-20">
                  <HeadsetIcon />
                  <span className="text-[15px] font-bold leading-tight text-[#0b2a5b]">{q.helpBadge.title}</span>
                  <span className="text-[11px] text-gray-500">{q.helpBadge.subtitle}</span>
                  <a href={`tel:${(q.helpBadge.phone ?? "").replace(/\s/g, "")}`}
                    className="whitespace-nowrap text-[13px] font-extrabold text-[#ff6b00]">
                    {q.helpBadge.phone}
                  </a>
                </div>
              </div>

              {/* Bottom features strip */}
              <div className="-mx-4 bg-[#eef4fc] px-4 py-6 sm:-mx-6 sm:px-6 lg:-mr-10 lg:pr-20">
                <ul className="ml-auto grid max-w-[760px] grid-cols-2 gap-y-5 sm:grid-cols-4">
                  {q.featuresBottom.map((f: any) => (
                    <li key={f.label} className="flex items-center justify-center gap-3 px-3 sm:border-l sm:border-[#c9d6ea] sm:first:border-l-0">
                      <span className="text-[#0b2a5b]"><FeatureIcon name={f.icon} /></span>
                      <span className="max-w-[90px] text-[13px] font-bold leading-tight text-[#0b2a5b]">{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right col: form */}
            <div className="relative z-10 mb-10 self-start overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_14px_44px_rgba(11,28,61,0.14)] lg:mb-6">
              <div className="relative overflow-hidden bg-[#0b2a5b] px-6 py-7 sm:px-8">
                <SnowflakeIcon />
                <h3 className="relative mb-2 text-2xl font-extrabold text-white sm:text-[30px]">
                  {form?.heading?.main} <span className="text-[#ff6b00]">{form?.heading?.highlight}</span>
                </h3>
                <p className="relative max-w-xs text-[13px] leading-relaxed text-gray-300">{form?.description}</p>
              </div>

              <form className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.name?.label} *</label>
                  <input type="text" name="name" placeholder={fields.name?.placeholder} required
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#ff6b00]" />
                </div>
                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.phone?.label} *</label>
                  <input type="tel" name="phone" placeholder={fields.phone?.placeholder} required
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#ff6b00]" />
                </div>
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.email?.label}</label>
                  <input type="email" name="email" placeholder={fields.email?.placeholder}
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#ff6b00]" />
                </div>
                {/* Service Type */}
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.serviceType?.label} *</label>
                  <select name="serviceType" required className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-600 outline-none focus:border-[#ff6b00]">
                    <option value="">{fields.serviceType?.placeholder}</option>
                    {(fields.serviceType?.options ?? []).map((o: string) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {/* AC Type */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.acType?.label}</label>
                  <select name="acType" className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-600 outline-none focus:border-[#ff6b00]">
                    <option value="">{fields.acType?.placeholder}</option>
                    {(fields.acType?.options ?? []).map((o: string) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {/* Date */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.date?.label}</label>
                  <input type="date" name="date"
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-500 outline-none focus:border-[#ff6b00]" />
                </div>
                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.address?.label}</label>
                  <input type="text" name="address" placeholder={fields.address?.placeholder}
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#ff6b00]" />
                </div>
                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.message?.label}</label>
                  <textarea name="message" rows={3} placeholder={fields.message?.placeholder}
                    className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
                </div>
                {/* Submit */}
                <button type="submit"
                  className="flex items-center justify-center gap-3 rounded-full bg-[#ff6b00] px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#e55f00] sm:col-span-2">
                  {form?.submitBtn ?? "Get a Free Quote"}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#ff6b00]">
                    <ArrowRightIcon />
                  </span>
                </button>
                {/* Privacy text */}
                <p className="flex items-center justify-center gap-2 text-center text-[11px] text-gray-500 sm:col-span-2">
                  <LockIcon />
                  {form?.privacyText ?? "Your information is safe with us."}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CoolFixGetQuote1({ data }: SectionProps) {
  return <GetQuoteSection data={data} />;
}
