// @ts-nocheck
"use client";

import { AutomotiveImage as Image } from "../automotive/shared";
import { AutomotiveLink as Link } from "../automotive/shared";
import { Reveal, Stagger, StaggerItem } from "../automotive/motion";

export default function HowItWorks({ data }: { data?: any }) {
  if (!data) return null;

  return (
    <section id="how-it-works" className="bg-[#f5f3ef] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="relative isolate overflow-hidden rounded-2xl bg-black" y={40}>
          <Image
            src={data.image.src}
            alt={data.image.alt}
            fill
            sizes="(min-width: 1152px) 1100px, 100vw"
            className="-z-20 object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

          <Stagger className="max-w-xl px-6 pb-40 pt-12 sm:px-10 sm:pb-44 sm:pt-16 lg:pb-48" delay={0.2} stagger={0.12}>
            <StaggerItem as="p" className="flex items-center gap-2.5 text-[15px] font-medium text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#d98a4e" aria-hidden>
                <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2zm2.1 0h9.8l-1.2-3.6a.6.6 0 0 0-.6-.4H8.9a.6.6 0 0 0-.6.4L7.1 11zM6.5 15.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm11 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              {data.badge}
            </StaggerItem>
            <StaggerItem as="h2" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px]">
              {data.heading.main}
            </StaggerItem>
            <StaggerItem as="p" className="mt-4 text-[15px] leading-relaxed text-white/85 sm:text-base">
              {data.description}
            </StaggerItem>
            <StaggerItem>
              <Link
                href={data.cta.href}
                className="mt-7 inline-flex items-center rounded-full bg-gradient-to-b from-copper to-copper-dark px-6 py-2.5 text-[15px] font-medium text-white shadow-lg shadow-black/30 transition hover:brightness-110"
              >
                {data.cta.label}
              </Link>
            </StaggerItem>
          </Stagger>
        </Reveal>

        <Stagger
          as="ol"
          stagger={0.12}
          className="relative z-10 mx-auto -mt-28 grid max-w-[calc(100%-2rem)] grid-cols-1 gap-2 rounded-2xl bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:-mt-32 sm:max-w-[calc(100%-5rem)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {data.list.map((step, i) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="group/step relative overflow-hidden rounded-xl bg-[#f5f2ec] px-5 pb-6 pt-12 text-center"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-2 select-none text-[88px] font-bold leading-none text-[#efe3d4] transition-colors duration-300 group-hover/step:text-[#e9cdb5]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative text-lg font-semibold text-neutral-900">{step.title}</h3>
              <p className="relative mx-auto mt-2 max-w-[200px] text-[15px] leading-relaxed text-neutral-700">
                {step.text}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
