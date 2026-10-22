// @ts-nocheck
"use client";

import { AutomotiveImage as Image } from "../automotive/shared";
import { AutomotiveLink as Link } from "../automotive/shared";
import { Reveal, Stagger, StaggerItem } from "../automotive/motion";
import { useAutomotivePathname } from "../automotive/shared";

const iconMap: Record<string, React.ReactNode> = {
  CarFrontIcon: <CarFrontIcon />,
  ChauffeurIcon: <ChauffeurIcon />,
};

export default function About({
  data,
  hideButton,
}: { data?: any }) {
  const path = useAutomotivePathname();
  if (hideButton == null) hideButton = path === "/about";
  if (!data) return null;

  return (
    <section id="about" className="bg-white py-10 text-neutral-900 sm:py-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-12">
        <Reveal x={-40} y={0}>
          <p className="flex items-center gap-3 text-sm font-medium text-neutral-800">
            <SmallCarIcon />
            <span className="h-px w-10 bg-copper" />
            {data.badge}
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[52px]">
            {data.heading.main}
            <span className="block text-[#a8521f]">{data.heading.highlight}</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
            {data.description}
          </p>

          <Stagger className="mt-7 grid gap-4 sm:grid-cols-2" delay={0.3} stagger={0.15}>
            {data.list.map((h) => (
              <StaggerItem
                key={h.title}
                className="rounded-2xl border border-neutral-200/80 bg-gradient-to-br from-white to-[#fdf6f1] p-5 shadow-[0_6px_24px_rgba(120,60,20,0.06)] transition-shadow hover:shadow-[0_14px_34px_rgba(120,60,20,0.12)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6e3d6] text-[#a8521f]">
                  {iconMap[h.icon]}
                </span>
                <h3 className="mt-4 text-lg font-bold">{h.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">
                  {h.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          {!hideButton && (
            <Link
              href={data.cta.href}
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-copper to-copper-dark px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-copper/25 transition hover:brightness-110"
            >
              {data.cta.label}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          )}
        </Reveal>

        <Reveal
          x={40}
          y={0}
          delay={0.15}
          className="group/photo relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] lg:aspect-auto lg:h-full lg:min-h-[480px]"
        >
          <Image
            src={data.image.src}
            alt={data.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover/photo:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
}

function SmallCarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#a8521f" aria-hidden>
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2zm2.1 0h9.8l-1.2-3.6a.6.6 0 0 0-.6-.4H8.9a.6.6 0 0 0-.6.4L7.1 11zM6.5 15.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm11 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>
  );
}

function CarFrontIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 11l1.6-4.2A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3L19 11" />
      <rect x="3" y="11" width="18" height="6" rx="2" />
      <path d="M5 17v2M19 17v2M7 14h.01M17 14h.01M10 14h4" />
    </svg>
  );
}

function ChauffeurIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6 6.5C6 5 8.7 3.5 12 3.5S18 5 18 6.5V8H6V6.5z" />
      <rect x="5" y="8" width="14" height="1.6" rx=".8" />
      <path d="M8 10.5h8a4 4 0 0 1-8 0z" />
      <path d="M4 21c0-3.6 2.6-6 6-6.4l2 2.4 2-2.4c3.4.4 6 2.8 6 6.4v.5H4V21z" />
    </svg>
  );
}
