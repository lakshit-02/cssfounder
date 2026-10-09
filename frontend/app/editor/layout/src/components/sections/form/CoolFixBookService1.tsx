// @ts-nocheck
"use client";
import React from "react";
import type { SectionProps } from "../../../types/section";

function ArrowRightIcon() {
  return <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}
function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
}
function CalendarIcon() {
  return <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
}
function WrenchIcon() {
  return <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>;
}
function ShieldIcon() {
  return <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
}
function SettingsIcon() {
  return <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" /></svg>;
}
function TruckIcon() {
  return <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>;
}
function HeartIcon() {
  return <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
}
function SnowflakeIcon() {
  return <svg className="pointer-events-none absolute -right-6 top-1/2 h-40 w-40 -translate-y-1/2 text-white/10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" /></svg>;
}
function AcUnitIcon({ className = "h-16 w-16" }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" /></svg>;
}
function SupportIcon() {
  return <svg className="h-16 w-16 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>;
}

const featureIconMap: Record<string, React.ReactNode> = {
  calendarDays: <CalendarIcon />,
  worker:       <WrenchIcon />,
  settings:     <SettingsIcon />,
  truck:        <TruckIcon />,
  shieldCheck:  <ShieldIcon />,
  rupee:        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  thumbsUp:     <HeartIcon />,
};


function BookServiceSection({ data }: { data?: any }) {
  const raw = (data ?? {}) as any;
  const b = {
    badge:          raw?.badge          ?? "",
    heading:        raw?.heading        ?? {},
    description:    raw?.description    ?? "",
    image:          raw?.image          ?? "",
    featuresLeft:   Array.isArray(raw?.featuresLeft) ? raw.featuresLeft : [],
    helpBadge:      raw?.helpBadge      ?? {},
    featuresBottom: Array.isArray(raw?.featuresBottom) ? raw.featuresBottom : [],
    form:           raw?.form           ?? {},
  };
  const { form } = b;
  const fields = form?.fields ?? {};

  return (
    <div className="bg-white">
      {/* Page Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f8fc] to-white py-16 md:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_520px]">

            {/* Left col: text + image + help badge + bottom features */}
            <div className="relative flex flex-col lg:min-h-[640px]">

              {/* Background image (desktop) */}
              <div className="absolute -right-28 bottom-16 left-[30%] top-0 hidden lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.image} alt="Technician servicing a split AC"
                  className="h-full w-full object-cover object-[45%_center]" />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#f6f8fc] via-[#f6f8fc]/70 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f6f8fc] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Text content */}
              <div className="relative z-10 lg:max-w-[360px]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-0.5 w-10 bg-[#ff6b00]" />
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff6b00]">{b.badge}</span>
                </div>
                <h2 className="mb-5 text-[34px] font-extrabold leading-[1.15] text-[#0b1c3d] sm:text-4xl xl:text-[42px]">
                  {b.heading.main}<br />
                  <span className="whitespace-nowrap">
                    <span className="text-[#ff6b00]">{b.heading.highlight}</span> {b.heading.end}
                  </span>
                </h2>
                <p className="mb-9 text-[15px] leading-relaxed text-gray-500">{b.description}</p>

                <ul className="space-y-6">
                  {b.featuresLeft.map((f: any) => (
                    <li key={f.title} className="flex items-center gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff1e8] text-[#ff6b00]">
                        {featureIconMap[f.icon] ?? <CalendarIcon />}
                      </span>
                      <div>
                        <h4 className="mb-0.5 text-[16px] font-bold text-[#0b1c3d]">{f.title}</h4>
                        <p className="text-[13px] text-gray-500">{f.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile image */}
              <div className="relative mt-8 h-72 overflow-hidden rounded-2xl sm:h-96 lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.image} alt="Technician servicing a split AC"
                  className="h-full w-full object-cover" />
              </div>

              {/* Help badge */}
              <div className="relative z-10 mx-4 mt-6 overflow-hidden rounded-2xl bg-[#0b1c3d] p-6 shadow-[0_18px_40px_rgba(11,28,61,0.3)] sm:mx-8 sm:p-7 lg:mx-0 lg:ml-[14%] lg:mt-auto lg:max-w-[480px]">
                <AcUnitIcon className="pointer-events-none absolute -right-6 top-1/2 h-40 w-40 -translate-y-1/2 text-white/10" />
                <div className="relative flex items-center gap-5">
                  <SupportIcon />
                  <div>
                    <h4 className="text-xl font-bold text-white">{b.helpBadge.title}</h4>
                    <p className="mb-4 text-sm text-gray-300">{b.helpBadge.subtitle}</p>
                    <a href={`tel:${(b.helpBadge.phone ?? "").replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#ff6b00] px-5 py-2.5 text-[15px] font-bold text-white shadow-md shadow-orange-500/25 transition-colors hover:bg-[#e55f00]">
                      <PhoneIcon /> {b.helpBadge.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right col: form */}
            <div className="relative z-10 self-start overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_10px_40px_rgba(11,28,61,0.12)]">
              <div className="relative overflow-hidden bg-[#0b1c3d] px-6 py-6 sm:px-8">
                <SnowflakeIcon />
                <h3 className="relative mb-2 text-2xl font-extrabold text-white sm:text-[28px]">
                  {form?.heading?.main} <span className="text-[#ff6b00]">{form?.heading?.highlight}</span>
                </h3>
                <p className="relative max-w-sm text-[13px] leading-relaxed text-gray-300">{form?.description}</p>
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
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.email?.label} *</label>
                  <input type="email" name="email" placeholder={fields.email?.placeholder} required
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
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.acType?.label} *</label>
                  <select name="acType" required className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-600 outline-none focus:border-[#ff6b00]">
                    <option value="">{fields.acType?.placeholder}</option>
                    {(fields.acType?.options ?? []).map((o: string) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {/* Date */}
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.date?.label} *</label>
                  <input type="date" name="date" required
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-500 outline-none focus:border-[#ff6b00]" />
                </div>
                {/* Time */}
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.time?.label} *</label>
                  <select name="time" required className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-600 outline-none focus:border-[#ff6b00]">
                    <option value="">{fields.time?.placeholder}</option>
                    {(fields.time?.options ?? []).map((o: string) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.address?.label} *</label>
                  <input type="text" name="address" placeholder={fields.address?.placeholder} required
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#ff6b00]" />
                </div>
                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.notes?.label}</label>
                  <textarea name="notes" rows={3} placeholder={fields.notes?.placeholder}
                    className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
                </div>
                {/* Submit */}
                <button type="submit"
                  className="flex items-center justify-center gap-2 rounded-md bg-[#ff6b00] px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition hover:bg-[#e55f00] sm:col-span-2">
                  {form?.submitBtn ?? "Book a Service"} <ArrowRightIcon />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom feature strip */}
          <div className="mt-14 grid grid-cols-2 gap-y-8 gap-x-2 border-t border-gray-100 pt-10 sm:gap-8 lg:grid-cols-4 lg:gap-0">
            {b.featuresBottom.map((f: any) => (
              <div key={f.title}
                className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left sm:gap-4 lg:justify-center lg:border-l lg:border-gray-200 lg:px-4 lg:first:border-l-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#ff6b00]/70 text-[#ff6b00] sm:h-14 sm:w-14">
                  {featureIconMap[f.icon] ?? <ShieldIcon />}
                </span>
                <div>
                  <h4 className="mb-0.5 text-[14px] font-bold text-[#0b1c3d] sm:text-[15px]">{f.title}</h4>
                  <p className="text-[12px] text-gray-500 sm:text-[13px]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CoolFixBookService1({ data }: SectionProps) {
  return <BookServiceSection data={data} />;
}
