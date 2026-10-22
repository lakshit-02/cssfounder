// @ts-nocheck
"use client";

import { AutomotiveImage as Image } from "../automotive/shared";
import { AutomotiveLink as Link } from "../automotive/shared";
import { useRef, useState } from "react";
import { useAutomotivePathname } from "../automotive/shared";
import { useOptionalPreview } from "../../context/PreviewContext";

function openRydoraPortfolioCard(car) {
  try {
    sessionStorage.setItem(
      "ai-builder-open-manager-item:Portfolio",
      JSON.stringify({
        id: car?.id || "",
        slug: car?.slug || "",
        title: car?.name || car?.title || "",
      }),
    );
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent("ai-builder-open-manager", {
      detail: { manager: "Portfolio", cardOnly: true, preservePage: true },
    }),
  );
}
import { LuUsers, LuCog, LuArrowRight } from "react-icons/lu";
import { Reveal } from "../automotive/motion";

export default function PopularCars({
  data,
  isGrid,
}: { data?: any }) {
  const path = useAutomotivePathname();
  const preview = useOptionalPreview();
  if (isGrid == null) isGrid = path === "/portfolio" || path === "/cars";
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeArrow, setActiveArrow] = useState<"prev" | "next">("next");

  const scroll = (dir: 1 | -1) => {
    setActiveArrow(dir === 1 ? "next" : "prev");
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : track.clientWidth;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!data) return null;

  return (
    <section id="cars" className="relative overflow-hidden bg-white py-10 text-neutral-900 sm:py-12">
      <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[620px] rounded-full bg-[#f6e7dc]/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-3 text-sm font-medium text-copper-dark">
              <span className="h-px w-10 bg-copper" />
              {data.badge}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[44px]">
              {data.heading.main} <span className="text-[#a8521f]">{data.heading.highlight}</span>
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              {data.description}
            </p>
          </div>

          {!isGrid && (
            <div className="hidden shrink-0 gap-3 sm:flex">
              <button
                type="button"
                aria-label="Previous cars"
                onClick={() => scroll(-1)}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition shadow-sm ${
                  activeArrow === "prev"
                    ? "bg-gradient-to-b from-copper-light to-copper-dark text-white shadow-copper/30 hover:brightness-110"
                    : "border border-neutral-200 bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                }`}
              >
                <LuArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Next cars"
                onClick={() => scroll(1)}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition shadow-sm ${
                  activeArrow === "next"
                    ? "bg-gradient-to-b from-copper-light to-copper-dark text-white shadow-copper/30 hover:brightness-110"
                    : "border border-neutral-200 bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                }`}
              >
                <LuArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.15} y={40}>
        <div
          ref={trackRef}
          className={
            isGrid
              ? "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              : "-mx-2 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }
        >
          {[...data.list]
            .filter((car) => car?.hidden !== true && car?.active !== false)
            .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
            .map((car) => (
            <article
              key={car.id || car.name}
              onClick={(event) => {
                const live = Boolean(
                  document.querySelector("[data-editor-live-surface]"),
                );
                if (!live || preview?.isPreview) return;
                event.preventDefault();
                event.stopPropagation();
                openRydoraPortfolioCard(car);
              }}
              data-card={!isGrid ? "" : undefined}
              className={
                isGrid
                  ? "flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white bg-white shadow-[0_8px_30px_rgba(120,60,20,0.10)]"
                  : "w-full shrink-0 flex cursor-pointer flex-col snap-center overflow-hidden rounded-2xl border border-white bg-white shadow-[0_8px_30px_rgba(120,60,20,0.10)] sm:w-[calc((100%-20px)/2)] sm:snap-start lg:w-[calc((100%-60px)/4)] lg:max-[1179px]:w-[calc((100%-40px)/3)]"
              }
            >
              <div className="relative shrink-0 aspect-[4/3] bg-gradient-to-br from-[#fbf3ee] via-white to-[#f7e9df]">
                <div className="absolute -right-10 -top-10 h-32 w-40 rotate-12 rounded-3xl bg-[#f3dccd]/50" />
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 82vw"
                  className="object-contain p-3 mix-blend-multiply"
                />
              </div>

              <div className="bg-white px-5 pb-5 pt-3 flex flex-1 flex-col lg:px-4 xl:px-5">
                {car.status ? (
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#b25724]">
                    {car.status}
                  </p>
                ) : null}
                <h3 className="text-lg font-bold text-neutral-900">{car.name}</h3>
                {car.category && car.category !== car.transmission ? (
                  <p className="mt-1 text-[12px] font-medium text-neutral-500">{car.category}</p>
                ) : null}
                {car.desc && !String(car.desc).includes("Seats |") ? (
                  <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600">{car.desc}</p>
                ) : null}
                {car.location ? (
                  <p className="mt-1 text-[12px] text-neutral-500">{car.location}</p>
                ) : null}

                <div className="mt-3 mb-5 flex items-center justify-start gap-4 whitespace-nowrap text-[13px] font-medium text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <LuUsers className="h-4 w-4 text-[#b25724]" />
                    {car.seats} Seats
                  </span>
                  <span className="h-4 w-px bg-neutral-300" />
                  <span className="flex items-center gap-1.5">
                    <LuCog className="h-4 w-4 text-[#b25724]" />
                    {car.transmission}
                  </span>
                </div>

                <div className="mt-auto">
                  <Link
                    href={data.cta.href}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#b25724] py-3 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#9c4c1f]"
                  >
                    Enquire Now
                    <LuArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        </Reveal>

        {!isGrid && (
          <div className="flex justify-center gap-3 sm:hidden">
            <button
              type="button"
              aria-label="Previous cars"
              onClick={() => scroll(-1)}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition shadow-sm ${
                activeArrow === "prev"
                  ? "bg-gradient-to-b from-copper-light to-copper-dark text-white shadow-copper/30 hover:brightness-110"
                  : "border border-neutral-200 bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              <LuArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next cars"
              onClick={() => scroll(1)}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition shadow-sm ${
                activeArrow === "next"
                  ? "bg-gradient-to-b from-copper-light to-copper-dark text-white shadow-copper/30 hover:brightness-110"
                  : "border border-neutral-200 bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              <LuArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
