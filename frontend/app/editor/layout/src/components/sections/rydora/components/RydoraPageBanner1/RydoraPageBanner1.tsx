"use client";

import { AutomotiveImage as Image, AutomotiveLink as Link, useAutomotivePathname } from "@/app/editor/layout/src/components/sections/rydora/addons/shared";
import { Reveal } from "@/app/editor/layout/src/components/sections/rydora/addons/motion";

interface Crumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
}

interface PageBannerPage {
  title?: string;
  breadcrumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
}

interface PageBannerData {
  title?: string;
  breadcrumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  bgImage?: string;
  pages?: Record<string, PageBannerPage>;
}

function PageBanner({
  title,
  breadcrumbs = [{ label: "Home", href: "/" }, { label: title }],
  image = "assets/banner/page-banner.jpg",
  imageAlt = "",
}: PageBannerProps) {
  return (
    <section className="relative isolate flex min-h-[340px] items-end overflow-hidden bg-black sm:min-h-[400px]">
      <Reveal className="absolute inset-0 -z-20" y={0} scale={1.1} duration={1.6}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
      </Reveal>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
      <div className="absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-black/70 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-36 sm:px-8 sm:pb-20 lg:px-12">
        <Reveal as="div" delay={0.2} y={20}>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-white/90">
            <li aria-hidden className="mr-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#d98a4e">
                <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2zm2.1 0h9.8l-1.2-3.6a.6.6 0 0 0-.6-.4H8.9a.6.6 0 0 0-.6.4L7.1 11z" />
              </svg>
            </li>
            {breadcrumbs.map((crumb, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {crumb.href && !last ? (
                    <Link href={crumb.href} className="transition hover:text-copper-light">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined}>{crumb.label}</span>
                  )}
                  {!last && <span className="text-white/60">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>
        </Reveal>

        <Reveal as="h1" delay={0.35} className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </Reveal>
      </div>
    </section>
  );
}


const PAGE_TITLES: Record<string, string> = {
  "/about": "About Us",
  "/portfolio": "Portfolio",
  "/cars": "Portfolio",
  "/services": "Services",
  "/gallery": "Gallery",
  "/blog": "Blogs",
  "/contact": "Contact Us",
  "/enquiry": "Enquiry",
};

export default function RydoraPageBanner1({ data }: { data?: PageBannerData }) {
  const path = useAutomotivePathname();
  const pageKey = path.replace(/^\//, "");
  const fromPage = data?.pages?.[pageKey];
  const title = fromPage?.title || data?.title || PAGE_TITLES[path] || "Rydora";
  return (
    <PageBanner
      title={title}
      breadcrumbs={fromPage?.breadcrumbs || data?.breadcrumbs}
      image={fromPage?.image || data?.image || data?.bgImage}
      imageAlt={fromPage?.imageAlt || data?.imageAlt || title}
    />
  );
}
