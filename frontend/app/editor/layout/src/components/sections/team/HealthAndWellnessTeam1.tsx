// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image, HealthLink as Link, useHealthPathname } from "../health-and-wellness/shared";
type MedicareDataProps = { data?: any; limit?: number };

import React, { useState } from "react";
import { ArrowRight, Calendar, Plus } from "lucide-react";

function openMedicareTeamCard(doctor: {
  id?: string | number;
  slug?: string;
  name?: string;
}) {
  try {
    sessionStorage.setItem(
      "ai-builder-open-manager-item:Teams",
      JSON.stringify({
        id: doctor.id != null ? String(doctor.id) : undefined,
        slug: doctor.slug || undefined,
        title: doctor.name || "",
      }),
    );
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent("ai-builder-open-manager", {
      detail: { manager: "Teams", cardOnly: true, preservePage: true },
    }),
  );
}

function TeamSection({ limit, data }: MedicareDataProps) {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
  if (!data?.heading || !Array.isArray(data.list)) return null;
  const { badge, description, list: doctorsList } = data;

  const displayDoctors = (Array.isArray(doctorsList) ? doctorsList : [])
    .filter((doctor: { active?: boolean }) => doctor?.active !== false)
    .sort(
      (left: { order?: number }, right: { order?: number }) =>
        (Number(left?.order) || Number.MAX_SAFE_INTEGER) -
        (Number(right?.order) || Number.MAX_SAFE_INTEGER),
    );
  const visibleDoctors = limit ? displayDoctors.slice(0, limit) : displayDoctors;

  return (
    <section className="relative w-full pt-8 pb-10 lg:pt-12 lg:pb-14 bg-white overflow-hidden select-none">
      {/* ── Background Soft Plus & Dot Accents ── */}
      <div className="absolute top-10 left-6 text-sky-100/70 pointer-events-none -z-10">
        <Plus className="w-16 h-16 stroke-[3.5]" />
      </div>
      <div className="absolute top-16 left-36 w-20 h-16 bg-[radial-gradient(#bae6fd_2px,transparent_2px)] [background-size:8px_8px] opacity-70 -z-10" />

      <div className="absolute top-10 right-8 text-sky-100/70 pointer-events-none -z-10">
        <Plus className="w-16 h-16 stroke-[3.5]" />
      </div>
      <div className="absolute bottom-12 right-6 w-20 h-16 bg-[radial-gradient(#bae6fd_2px,transparent_2px)] [background-size:8px_8px] opacity-70 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14">
        {/* ── Heading Header Area ── */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-[#00a859] rounded-full inline-block" />
            <span className="text-[14px] font-bold text-[#00a859] tracking-wide">
              {badge}
            </span>
            <span className="w-8 h-[2px] bg-[#00a859] rounded-full inline-block" />
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold leading-[1.18] tracking-tight mb-4">
            <span className="text-[#073260]">{data.heading.main}</span>{" "}
            <span className="text-[#00a859]">{data.heading.highlight}</span>
          </h2>

          {/* Sub-text */}
          <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed">
            {description}
          </p>
        </div>

        {/* ── Doctors Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDoctors.map((doctor: any) => {
            const hovered = hoveredId === doctor.id;
            return (
            <div
              key={doctor.id}
              onMouseEnter={() => setHoveredId(doctor.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClickCapture={(event) => {
                if (!document.querySelector("[data-editor-live-surface]")) return;
                event.preventDefault();
                event.stopPropagation();
                openMedicareTeamCard(doctor);
              }}
              className="relative rounded-[26px] bg-white border-2 border-slate-100 transition-all duration-300 flex flex-col overflow-hidden"
              style={{
                borderColor: hovered ? "var(--blue-bg, #073260)" : undefined,
                boxShadow: hovered ? "0 16px 36px rgba(7,50,96,0.18)" : undefined,
              }}
            >
              <div className="p-3 pb-0">
                <div className="relative w-full aspect-[1/1.05] rounded-[20px] overflow-hidden bg-slate-100">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top transition-transform duration-500"
                    style={{ transform: hovered ? "scale(1.05)" : undefined }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  <div
                    className="absolute inset-x-3 bottom-3 z-10 flex justify-center transition-all duration-300 ease-out"
                    style={{
                      opacity: hovered ? 1 : 0,
                      transform: hovered ? "translateY(0)" : "translateY(12px)",
                    }}
                  >
                    <Link
                      href={doctor.appointmentLink || doctor.href || "/book-appointment"}
                      className="w-full py-2.5 px-4 bg-[#00b4d8] hover:bg-[#0096c7] text-white text-[13px] font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors"
                    >
                      <Calendar className="w-4 h-4 stroke-[2.2]" />
                      <span>Appointment Now</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className="p-5 flex items-center justify-between gap-3 transition-colors duration-300"
                style={{ backgroundColor: hovered ? "var(--blue-bg, #073260)" : "#ffffff" }}
              >
                <div className="min-w-0 flex-1">
                  <h3
                    className="text-[17px] font-bold leading-snug"
                    style={{ color: hovered ? "#ffffff" : "var(--blue-bg, #073260)" }}
                  >
                    {doctor.name}
                  </h3>
                  <p
                    className="text-[13px] font-medium"
                    style={{ color: hovered ? "#cbd5e1" : "#0090ff" }}
                  >
                    {doctor.specialty}
                  </p>
                </div>

                <Link
                  href={doctor.appointmentLink || doctor.href || "/book-appointment"}
                  aria-label={`View ${doctor.name} profile`}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm"
                  style={{
                    backgroundColor: hovered ? "#ffffff" : "var(--blue-bg, #073260)",
                    color: hovered ? "var(--blue-bg, #073260)" : "#ffffff",
                  }}
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function MediCareTeam1({ data }: SectionProps) {
  if (!data) return null;
  const path = useHealthPathname();
  return <TeamSection limit={path === "/" ? 4 : undefined} data={data as any} />;
}
