// @ts-nocheck
"use client";

import React from "react";
import type { SectionProps } from "../../../types/section";
function ShieldCheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}
function CogIcon() {
  return (
    <svg className="relative z-10 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  "shield-check": <ShieldCheckIcon />,
  "users": <UsersIcon />,
  "star": <StarIcon />,
};

function SocialSvg({ name }: { name: string }) {
  if (name === "facebook")
    return <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>;
  if (name === "twitter")
    return <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>;
  if (name === "instagram")
    return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2z" /></svg>;
  if (name === "youtube")
    return <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>;
  return null;
}

function TopbarSection({ data }: { data?: any }) {
  const raw = data ?? {};
  const topbar = {
    tagline: raw?.tagline ?? "",
    highlights: Array.isArray(raw?.highlights) ? raw.highlights : [],
    socials: Array.isArray(raw?.socials) ? raw.socials : [],
  };
  return (
    <div className="relative hidden h-12 overflow-hidden bg-[#0b2a5b] text-white md:block">
      <div className="mx-auto flex h-full max-w-7xl items-stretch justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: tagline + highlights */}
        <div className="flex items-stretch gap-6 lg:gap-8">
          <div className="relative flex items-center gap-2 pr-6">
            <div
              className="absolute inset-y-0 right-0 w-screen bg-[#ff6b00]"
              style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)" }}
            />
            <CogIcon />
            <span className="relative z-10 text-xs font-semibold">{topbar.tagline}</span>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            {topbar.highlights.map((item, idx) => (
              <div key={item.label} className="flex items-center gap-3">
                {idx > 0 && <span className="h-4 w-px bg-white/30" />}
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <span className="text-[#ff6b00]">{iconMap[item.icon] ?? <ShieldCheckIcon />}</span>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: social icons */}
        <div className="flex items-center gap-2">
          {topbar.socials.map((s) => (
            <a
              key={s.icon}
              href={s.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#06183a] text-white overflow-hidden transition-colors hover:bg-[#ff6b00]"
            >
              <SocialSvg name={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CoolFixTopbar1({ data }: SectionProps) {
  return <TopbarSection data={data} />;
}
