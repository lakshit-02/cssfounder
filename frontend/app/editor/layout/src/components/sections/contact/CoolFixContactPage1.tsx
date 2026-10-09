// @ts-nocheck
"use client";
import React from "react";
import type { SectionProps } from "../../../types/section";

function PhoneIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
}
function MailIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
}
function MapPinIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
}
function ArrowRightIcon() {
  return <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}
function SnowflakeIcon() {
  return <svg className="pointer-events-none absolute -right-4 top-1/2 h-36 w-36 -translate-y-1/2 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" /></svg>;
}

const iconMap: Record<string, React.ReactNode> = {
  phone:    <PhoneIcon />,
  envelope: <MailIcon />,
  mail:     <MailIcon />,
  location: <MapPinIcon />,
  "map-pin":<MapPinIcon />,
};


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
                        {iconMap[item.icon] ?? <PhoneIcon />}
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
              {/* Date */}
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.date?.label}</label>
                <input type="date" name="date"
                  className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-500 outline-none focus:border-[#ff6b00]" />
              </div>
              {/* Service Type */}
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.serviceType?.label}</label>
                <select name="serviceType" className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-600 outline-none focus:border-[#ff6b00]">
                  <option value="">{fields.serviceType?.placeholder}</option>
                  {(fields.serviceType?.options ?? []).map((o: string) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              {/* AC Type */}
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.acType?.label}</label>
                <select name="acType" className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-600 outline-none focus:border-[#ff6b00]">
                  <option value="">{fields.acType?.placeholder}</option>
                  {(fields.acType?.options ?? []).map((o: string) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              {/* Message */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">{fields.message?.label} *</label>
                <textarea name="message" rows={3} placeholder={fields.message?.placeholder} required
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              {/* Buttons */}
              <div className="flex gap-3 pt-1 sm:col-span-2">
                <button type="submit"
                  className="flex flex-[2] items-center justify-center gap-2 rounded-md bg-[#ff6b00] px-4 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition hover:bg-[#e55f00]">
                  {form?.submitBtn ?? "Send Message"} <ArrowRightIcon />
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
                <MapPinIcon />
                {map?.btnText ?? "Get Directions"}
                <ArrowRightIcon />
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
