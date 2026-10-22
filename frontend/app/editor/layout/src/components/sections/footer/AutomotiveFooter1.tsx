// @ts-nocheck
"use client";

import { AutomotiveImage as Image } from "../automotive/shared";
import { AutomotiveLink as Link } from "../automotive/shared";
import type { ReactNode } from "react";
import { Stagger, StaggerItem } from "../automotive/motion";
import { useOptionalPreview } from "../../context/PreviewContext";
import {
  filterMenuByHiddenPageLinks,
  isHiddenServicesPage,
} from "../../../lib/navVisibility";

const iconMap: Record<string, ReactNode> = {
  PinIcon: <PinIcon />,
  PhoneIcon: <PhoneIcon />,
  MailIcon: <MailIcon />,
  ClockIcon: <ClockIcon />,
  FacebookIcon: <FacebookIcon />,
  InstagramIcon: <InstagramIcon />,
  XIcon: <XIcon />,
  LinkedInIcon: <LinkedInIcon />,
};

export default function Footer({ data }: { data?: any }) {
  const preview = useOptionalPreview();
  if (!data) return null;
  const servicesPageHidden = isHiddenServicesPage(preview?.pageLinks);
  const quickLinks = filterMenuByHiddenPageLinks(
    Array.isArray(data.quickLinks?.list) ? data.quickLinks.list : [],
    preview?.pageLinks,
  );

  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden bg-[#140b06] text-white"
    >
      <Image
        src={data.bgImage}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-right"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#140b06]/90 via-[#140b06]/70 to-transparent" />

      <Stagger stagger={0.12} className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 pb-12 pt-16 sm:px-8 lg:grid-cols-[1.25fr_0.9fr_1fr_1.2fr] lg:gap-8 lg:px-12 lg:pt-20">
        <StaggerItem className="col-span-2 sm:col-span-1 lg:col-span-1">
          <Link href="/" className="inline-block">
            <Image
              src={data.logo.src}
              alt={data.logo.alt}
              width={2172}
              height={724}
              className="h-14 w-auto sm:h-16 lg:h-[70px]"
            />
          </Link>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/85">
            {data.description}
          </p>
          <div className="mt-7 flex gap-3">
            {data.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-copper/70 text-white transition hover:bg-copper hover:text-white"
              >
                {iconMap[s.icon]}
              </a>
            ))}
          </div>
        </StaggerItem>

        <FooterColumn title={data.quickLinks.title}>
          {quickLinks.map((l) => (
            <FooterLink key={l.label} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>

        {servicesPageHidden ? null : (
          <FooterColumn title={data.services.title}>
            {data.services.list.map((label) => (
              <FooterLink key={label} href="/services">
                {label}
              </FooterLink>
            ))}
          </FooterColumn>
        )}

        <FooterColumn
          title={data.contact.title}
          className="col-span-2 sm:col-span-1 lg:col-span-1"
        >
          {data.contact.list.map((c, i) => (
            <li
              key={i}
              className="flex items-center gap-4 text-[15px] leading-relaxed text-white/90"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b5683a] text-white">
                {iconMap[c.icon]}
              </span>
              <span dangerouslySetInnerHTML={{ __html: c.html }} />
            </li>
          ))}
        </FooterColumn>
      </Stagger>

      <div className="border-t border-copper/40">
        <div className="mx-auto text-center flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-white/85 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p className="">{data.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <StaggerItem className={className}>
      <h3 className="text-xl font-bold">{title}</h3>
      <span className="mt-3 block h-0.5 w-10 bg-copper" />
      <ul className="mt-6 space-y-3.5">{children}</ul>
    </StaggerItem>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group/link flex items-center gap-3 text-[15px] text-white/90 transition hover:text-copper-light"
      >
        <svg
          className="text-copper-light transition group-hover/link:translate-x-0.5"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
        {children}
      </Link>
    </li>
  );
}

function PinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2.4V17h16V7.4l-8 5-8-5zM5.6 7l6.4 4 6.4-4H5.6z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14 8.5V6.8c0-.8.5-1.3 1.3-1.3H17V2.2C16.6 2.1 15.4 2 14.1 2 11.3 2 9.6 3.7 9.6 6.6v1.9H6.8V12h2.8v10H14V12h2.8l.5-3.5H14z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.9 21H3.3V9h3.6v12zM5.1 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM21 21h-3.6v-5.8c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1V21H9.6V9H13v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5V21z" />
    </svg>
  );
}
