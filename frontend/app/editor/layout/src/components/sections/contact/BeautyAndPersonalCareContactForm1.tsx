// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { type ReactNode, useState, type FormEvent, type MouseEvent, useEffect } from "react";
import NextImage, { type ImageProps } from "next/image";
import { useOptionalPreview } from "../../context/PreviewContext";
import { MotionConfig, motion, type Variants } from "framer-motion";

const IMAGE_BASE = "/beauty%20and%20personal%20care";

function hairSrc(src?: string) {
  const value = String(src || "").trim();
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  if (value.startsWith("/images/")) return `${IMAGE_BASE}${value}`;
  if (value.startsWith("images/")) return `${IMAGE_BASE}/${value}`;
  return value.replace(/ /g, "%20");
}

type HairImageProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"];
  preload?: boolean;
};

function HairImage({
  src,
  preload,
  alt,
  width,
  height,
  fill,
  ...rest
}: HairImageProps) {
  const resolved = typeof src === "string" ? hairSrc(src) : src;
  if (!resolved) return null;
  const numericWidth = typeof width === "number" ? width : Number(width);
  const numericHeight = typeof height === "number" ? height : Number(height);
  const sized =
    Number.isFinite(numericWidth) &&
    numericWidth > 0 &&
    Number.isFinite(numericHeight) &&
    numericHeight > 0;

  return (
    <NextImage
      src={resolved}
      alt={alt || ""}
      unoptimized
      {...rest}
      {...(fill
        ? { fill: true }
        : {
            width: sized ? numericWidth : 1200,
            height: sized ? numericHeight : 800,
          })}
      priority={Boolean(preload || rest.priority)}
    />
  );
}

type PreviewNav = {
  setCurrentPage: (page: string) => void;
  pageLinks?: { label?: string; href?: string; children?: PreviewNav["pageLinks"] }[];
};

const PAGE_LABELS: Record<string, string> = {
  about: "About Us",
  services: "Services",
  gallery: "Gallery",
  blogs: "Blogs",
  contact: "Contact Us",
  "get-a-quote": "Get a Quote",
  "thank-you": "Thank You",
};

const HAIR_SERVICE_SLUG_KEY = "hair-atelier-service-slug";
const HAIR_BLOG_SLUG_KEY = "hair-atelier-blog-slug";
const HAIR_BLOG_CATEGORY_KEY = "hair-atelier-blog-category";

function flatten(links: PreviewNav["pageLinks"] = []): NonNullable<PreviewNav["pageLinks"]> {
  return (links || []).flatMap((link) => [link, ...flatten(link.children || [])]);
}

function labelForSlug(preview: PreviewNav | null | undefined, slug: string, fallback: string) {
  const wanted = slug.trim().toLowerCase();
  const match = flatten(preview?.pageLinks).find((link) => {
    const href = String(link.href || "").trim().toLowerCase();
    const fromHref = href.startsWith("#page-") ? href.slice("#page-".length) : "";
    return fromHref === wanted || String(link.label || "").trim().toLowerCase() === fallback.toLowerCase();
  });
  return match?.label || fallback;
}

function pageLabelForHref(href: string) {
  const raw = String(href || "").trim();
  if (!raw || raw === "/" || raw === "#") return "Home";
  const path = raw.split("?")[0].split("#")[0].replace(/\/+$/, "");
  const parts = path.replace(/^\//, "").split("/").filter(Boolean);
  if (!parts.length) return "Home";
  if (parts[0] === "services") return "Services";
  if (parts[0] === "blogs") return "Blogs";
  return PAGE_LABELS[parts[0]] || "Home";
}

function scrollTemplateToTop() {
  const scrollContainer = document.querySelector<HTMLElement>("[data-template-scroll]");
  if (scrollContainer) {
    scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function navigateHairHref(href: string, preview?: PreviewNav | null) {
  const raw = String(href || "").trim();
  if (!preview || !raw) return false;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) return false;
  if (raw.startsWith("#") && raw !== "#") return false;

  const path = raw.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  const parts = path === "/" ? [] : path.replace(/^\//, "").split("/").filter(Boolean);

  if (parts[0] === "services" && parts[1]) {
    sessionStorage.setItem(HAIR_SERVICE_SLUG_KEY, decodeURIComponent(parts[1]));
    preview.setCurrentPage(labelForSlug(preview, "service-detail", "Service Detail"));
  } else if (parts[0] === "blogs" && parts[1] === "category" && parts[2]) {
    sessionStorage.setItem(HAIR_BLOG_CATEGORY_KEY, decodeURIComponent(parts[2]));
    sessionStorage.removeItem(HAIR_BLOG_SLUG_KEY);
    preview.setCurrentPage(labelForSlug(preview, "blogs", "Blogs"));
  } else if (parts[0] === "blogs" && parts[1]) {
    sessionStorage.setItem(HAIR_BLOG_SLUG_KEY, decodeURIComponent(parts[1]));
    sessionStorage.removeItem(HAIR_BLOG_CATEGORY_KEY);
    preview.setCurrentPage(labelForSlug(preview, "blog-detail", "Blog Detail"));
  } else {
    sessionStorage.removeItem(HAIR_BLOG_CATEGORY_KEY);
    const slug = parts[0] || "home";
    const fallback = !parts.length ? "Home" : PAGE_LABELS[slug] || slug;
    preview.setCurrentPage(slug === "home" ? labelForSlug(preview, "home", "Home") : labelForSlug(preview, slug, fallback));
  }

  window.dispatchEvent(new CustomEvent("hair-atelier-nav"));
  scrollTemplateToTop();
  return true;
}

type HairLinkProps = {
  href: string;
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: unknown;
};

function HairLink({ href, onClick, children, ...props }: HairLinkProps) {
  const preview = useOptionalPreview();
  return (
    <a
      href={href || "#"}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (navigateHairHref(String(href || ""), preview)) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

type EnquiryFormProps = {
  content: EnquiryFormContent;
  withDate?: boolean;
  messageRequired?: boolean;
  redirectTo?: string;
  className?: string;
};

type Values = { name: string; phone: string; email: string; date: string; service: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = { name: "", phone: "", email: "", date: "", service: "", message: "" };

const fieldIcons: Record<string, ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
    </>
  ),
  note: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M8 13h8M8 17h5" />
    </>
  ),
};

function FieldIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute left-4 h-4 w-4 text-[#e0a458] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {fieldIcons[name]}
    </svg>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-xs text-red-400">{message}</p> : null;
}

const inputClass =
  "w-full rounded-lg border bg-white/[0.04] py-3.5 pr-4 pl-11 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-[#e0a458] focus:bg-white/[0.06]";

function EnquiryForm({
  content,
  withDate = false,
  messageRequired = false,
  redirectTo = "/thank-you",
  className = "",
}: EnquiryFormProps) {
  const preview = useOptionalPreview();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmiting] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);

  const validate = (): Errors => {
    const found: Errors = {};
    if (!values.name.trim()) found.name = content.errors.name;
    if (!/^\+?[\d\s-]{8,15}$/.test(values.phone.trim())) found.phone = content.errors.phone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) found.email = content.errors.email;
    if (!values.service) found.service = content.errors.service;
    if (messageRequired && !values.message.trim()) found.message = content.errors.message;
    return found;
  };

  const update = (field: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const border = (field: keyof Values) => (errors[field] ? "border-red-400/70" : "border-white/10");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSubmiting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    navigateHairHref(redirectTo, preview);
  };

  const emailField = (
    <div>
      <label className="relative flex items-center">
        <span className="sr-only">{content.fields.email}</span>
        <FieldIcon name="mail" />
        <input
          type="email"
          autoComplete="email"
          placeholder={content.fields.email}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
          className={`${inputClass} ${border("email")}`}
        />
      </label>
      <FieldError message={errors.email} />
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="relative flex items-center">
            <span className="sr-only">{content.fields.name}</span>
            <FieldIcon name="user" />
            <input
              type="text"
              autoComplete="name"
              placeholder={content.fields.name}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={!!errors.name}
              className={`${inputClass} ${border("name")}`}
            />
          </label>
          <FieldError message={errors.name} />
        </div>

        <div>
          <label className="relative flex items-center">
            <span className="sr-only">{content.fields.phone}</span>
            <FieldIcon name="user" />
            <input
              type="tel"
              autoComplete="tel"
              placeholder={content.fields.phone}
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              className={`${inputClass} ${border("phone")}`}
            />
          </label>
          <FieldError message={errors.phone} />
        </div>

        {withDate && (
          <>
            {emailField}
            <label className="relative flex items-center">
              <span className="sr-only">{content.fields.date}</span>
              <FieldIcon name="calendar" />
              <input
                type={dateFocused || values.date ? "date" : "text"}
                placeholder={content.fields.date}
                value={values.date}
                onFocus={() => setDateFocused(true)}
                onBlur={() => setDateFocused(false)}
                onChange={(e) => update("date", e.target.value)}
                className={`${inputClass} ${border("date")} [color-scheme:dark]`}
              />
            </label>
          </>
        )}
      </div>

      {!withDate && emailField}

      <div>
        <label className="relative flex items-center">
          <span className="sr-only">{content.fields.service}</span>
          <FieldIcon name="scissors" />
          <select
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            aria-invalid={!!errors.service}
            className={`${inputClass} ${border("service")} appearance-none pr-10 ${values.service ? "text-white" : "text-white/50"}`}
          >
            <option value="" disabled>
              {content.fields.service}
            </option>
            {content.services.map((service) => (
              <option key={service} value={service} className="bg-[#141414] text-white">
                {service}
              </option>
            ))}
          </select>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute right-4 h-4 w-4 text-white/60" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </label>
        <FieldError message={errors.service} />
      </div>

      <div>
        <label className="relative flex">
          <span className="sr-only">{content.fields.message}</span>
          <FieldIcon name="note" className="top-4" />
          <textarea
            rows={5}
            placeholder={content.fields.message}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            className={`${inputClass} ${border("message")} resize-y`}
          />
        </label>
        <FieldError message={errors.message} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f0b866] via-[#f5c27a] to-[#e8a850] py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_-8px_rgba(240,184,102,0.7)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? content.submittingLabel : content.submitLabel}
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      {content.privacyNote && (
        <p className="flex items-start justify-center gap-2 px-4 text-center text-xs leading-relaxed text-white/65">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#e0a458]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {content.privacyNote}
        </p>
      )}
    </form>
  );
}

type Direction = "up" | "down" | "left" | "right" | "none";

const tags = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  aside: motion.aside,
  article: motion.article,
};

type Tag = keyof typeof tags;

const ease = [0.22, 1, 0.36, 1] as const;

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

function itemVariants(direction: Direction, distance: number, scale?: number): Variants {
  return {
    hidden: { opacity: 0, ...offset(direction, distance), ...(scale ? { scale } : {}) },
    show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.7, ease } },
  };
}

type BaseProps = {
  as?: Tag;
  className?: string;
  children?: ReactNode;
  id?: string;
};

type RevealProps = BaseProps & {
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  scale?: number;
  amount?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
};

function Reveal({
  as = "div",
  direction = "up",
  distance = 40,
  delay = 0,
  duration = 0.7,
  scale,
  amount = 0.2,
  immediate = false,
  className,
  children,
  id,
}: RevealProps) {
  const Component = tags[as];
  const target = { opacity: 1, x: 0, y: 0, scale: 1 };
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance), ...(scale ? { scale } : {}) }}
      {...(immediate ? { animate: target } : { whileInView: target, viewport: { once: true, amount } })}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = BaseProps & {
  stagger?: number;
  delay?: number;
  amount?: number;
  immediate?: boolean;
};

function Stagger({
  as = "div",
  stagger = 0.12,
  delay = 0,
  amount = 0.15,
  immediate = false,
  className,
  children,
  id,
}: StaggerProps) {
  const Component = tags[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <Component
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount } })}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = BaseProps & {
  direction?: Direction;
  distance?: number;
  scale?: number;
};

function StaggerItem({ as = "div", direction = "up", distance = 30, scale, className, children, id }: StaggerItemProps) {
  const Component = tags[as];
  return (
    <Component id={id} className={className} variants={itemVariants(direction, distance, scale)}>
      {children}
    </Component>
  );
}

function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const icons: Record<string, ReactNode> = {
  location: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  phone: (
    <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
};

const goldText =
  "bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent";

function Eyebrow({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}
    >
      {center && <span className="h-px w-10 bg-[#e0a458]" />}
      <p className="text-xs font-semibold tracking-[0.25em] text-[#e0a458] uppercase">
        {children}
      </p>
      <span className="h-px w-10 bg-[#e0a458]" />
    </div>
  );
}

function ContactInfoCards({
  data: infoCards,
}: SectionProps<"ContactInfoCards">) {
  return (
    <section className="border-b border-white/5 bg-black py-12">
      <Stagger
        immediate
        delay={0.3}
        className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10"
      >
        {infoCards.map((card) => {
          const body = (
            <>
              <span className="hair-contact-icon flex h-14 w-14 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition group-hover/card:bg-[#e0a458] group-hover/card:text-black">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[card.icon]}
                </svg>
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-white/80">
                {card.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </>
          );
          const cardClass =
            "hair-contact-card group/card flex h-full flex-col items-center rounded-xl border border-[#e0a458]/50 bg-gradient-to-br from-[#16110b] via-black to-black px-5 py-7 text-center transition duration-300 hover:-translate-y-1 hover:border-[#e0a458] hover:shadow-[0_0_30px_-10px_rgba(224,164,88,0.55)]";
          return (
            <StaggerItem key={card.title} distance={40}>
              {card.href ? (
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    card.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={cardClass}
                >
                  {body}
                </a>
              ) : (
                <div className={cardClass}>{body}</div>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

function ContactFormSection({
  data: form,
}: SectionProps<"ContactFormSection">) {
  const { badge, heading, description, image } = form;

  return (
    <section className="bg-black py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
        <Stagger>
          <StaggerItem direction="right">
            <Eyebrow>{badge}</Eyebrow>
          </StaggerItem>
          <StaggerItem
            as="h2"
            direction="right"
            className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl"
          >
            {heading.main} <span className={goldText}>{heading.highlight}</span>
          </StaggerItem>
          <StaggerItem
            as="p"
            direction="right"
            className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base"
          >
            {description}
          </StaggerItem>
          <StaggerItem>
            <EnquiryForm content={form} messageRequired className="mt-8" />
          </StaggerItem>
        </Stagger>

        <Reveal
          direction="left"
          distance={60}
          delay={0.2}
          className="relative min-h-80 overflow-hidden rounded-2xl border border-[#e0a458]/60 shadow-[0_0_40px_-15px_rgba(224,164,88,0.5)]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition duration-700 hover:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
}

function ContactMapSection({
  data: map,
}: SectionProps<"ContactMapSection">) {
  return (
    <section className="bg-black pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <Eyebrow center>{map.badge}</Eyebrow>
          <h2 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">
            {map.heading.main} <span className={goldText}>{map.heading.highlight}</span>
          </h2>
        </Reveal>

        <Reveal
          direction="none"
          scale={0.95}
          delay={0.15}
          className="mt-10 overflow-hidden rounded-2xl border border-[#e0a458]/60 shadow-[0_0_40px_-15px_rgba(224,164,88,0.5)]"
        >
          <iframe
            src="https://maps.google.com/maps?q=usa&t=&z=4&ie=UTF8&iwloc=&output=embed"
            title="USA Map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-80 w-full border-0 [filter:invert(90%)_hue-rotate(180deg)_grayscale(40%)_contrast(90%)] sm:h-96"
          />
        </Reveal>
      </div>
    </section>
  );
}

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap";

const FONT_CSS = `
.hair-atelier-root { font-family: var(--font-body, "Montserrat", Arial, Helvetica, sans-serif); color: #fff; }
.hair-atelier-root .font-heading { font-family: var(--font-heading, "Playfair Display", Georgia, serif); }
`;

let fontsReady = false;

function HairAtelierFrame({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (fontsReady || typeof document === "undefined") return;
    fontsReady = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.setAttribute("data-hair-atelier", "fonts");
    style.textContent = FONT_CSS;
    document.head.appendChild(style);
  }, []);

  return <div className="hair-atelier-root flex flex-col bg-black text-white">{children}</div>;
}

const Image = HairImage;

export default function HairAtelierContactForm1({ data }: SectionProps) {
  const raw = (data ?? {}) as any;
  const form = raw.form?.heading ? raw.form : raw;
  if (!form?.heading) return null;
  return (
    <HairAtelierFrame>
      <ContactFormSection data={form} />
    </HairAtelierFrame>
  );
}
