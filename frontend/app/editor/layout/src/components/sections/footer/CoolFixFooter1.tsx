// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import type { SectionProps } from "../../../types/section";
function SocialSvg({ name }: { name: string }) {
  if (name === "facebook") return <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>;
  if (name === "instagram") return <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2z" /></svg>;
  if (name === "youtube") return <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>;
  if (name === "whatsapp") return <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 10-7.85-4.52l-1.35 4.05 4.2-1.12A9 9 0 0012 21z" /></svg>;
  return null;
}

function ContactIcon({ name }: { name: string }) {
  if (name === "phone") return <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
  if (name === "mail") return <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
  return <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
}

function FooterSection({ data }: { data?: any }) {
  const raw = data ?? {};
  const f = {
    logo: raw?.logo ?? {},
    description: raw?.description ?? "",
    socials: Array.isArray(raw?.socials) ? raw.socials : [],
    titles: raw?.titles ?? {},
    quickLinks: Array.isArray(raw?.quickLinks) ? raw.quickLinks : [],
    services: Array.isArray(raw?.services) ? raw.services : [],
    contacts: Array.isArray(raw?.contacts) ? raw.contacts : [],
    copyright: raw?.copyright ?? "",
  };

  return (
    <footer className="bg-[#041a33] font-sans text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-4 py-12 sm:px-6 md:grid-cols-4 lg:gap-12 lg:px-8 lg:py-16">
        {/* Column 1: Logo + description + socials */}
        <div className="col-span-2 flex flex-col gap-5 pr-4 md:col-span-1">
          <Image className="h-12 w-auto object-contain sm:h-14 self-start" src={f.logo.src} alt={f.logo.alt} width={f.logo.width} height={f.logo.height} />
          <p className="text-[15px] leading-relaxed text-gray-400">{f.description}</p>
          <div className="h-1 w-8 bg-[#ff6b00]" />
          <div className="mt-2 flex flex-wrap gap-3">
            {f.socials.map((s) => (
              <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition hover:opacity-80 ${s.icon === "facebook" ? "bg-[#3b5998]" : s.icon === "instagram" ? "bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]" : s.icon === "youtube" ? "bg-[#ff0000]" : "bg-[#25D366]"}`}>
                <SocialSvg name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col">
          <h3 className="mb-2 text-[21px] font-bold text-white">{f.titles.quickLinks}</h3>
          <div className="mb-7 h-1 w-8 bg-[#ff6b00]" />
          <ul className="space-y-3.5">
            {f.quickLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="flex items-center gap-3 text-[15px] text-gray-400 transition hover:text-[#ff6b00]">
                  <span className="text-[#ff6b00] text-xl leading-none">›</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="flex flex-col">
          <h3 className="mb-2 text-[21px] font-bold text-white">{f.titles.services}</h3>
          <div className="mb-7 h-1 w-8 bg-[#ff6b00]" />
          <ul className="space-y-3.5">
            {f.services.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="flex items-center gap-3 text-[15px] text-gray-400 transition hover:text-[#ff6b00]">
                  <span className="text-[#ff6b00] text-xl leading-none">›</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="col-span-2 flex flex-col md:col-span-1">
          <h3 className="mb-2 text-[21px] font-bold text-white">{f.titles.contact}</h3>
          <div className="mb-7 h-1 w-8 bg-[#ff6b00]" />
          <div className="flex flex-col gap-5">
            {f.contacts.map((c, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff6b00] mt-0.5">
                  <ContactIcon name={c.icon} />
                </div>
                <div>
                  <span className="block font-bold text-white">{c.label}</span>
                  <span className="text-[15px] text-gray-400">{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gray-700/50 py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400">{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

export default function CoolFixFooter1({ data }: SectionProps) {
  return <FooterSection data={data} />;
}
