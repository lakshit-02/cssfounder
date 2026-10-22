// @ts-nocheck
"use client";

import {
  ArrowRight,
  CalendarDays,
  Car,
  ChevronDown,
  CircleCheck,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User,
  type LucideIcon,
} from "lucide-react";
import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { AutomotiveImage as Image } from "../automotive/shared";

const carTypes = ["Hatchback", "Sedan", "SUV", "MUV / MPV", "Luxury", "Wedding Car"];
const durations = ["Few Hours", "1 Day", "2 - 3 Days", "1 Week", "1 Month+"];

function ContactForm({ data }: { data?: any }) {
  const [sent, setSent] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setFormKey((k) => k + 1);
  };

  if (!data) return null;
  const heading = data.heading || {};
  const form = data.form || {};

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_10px_40px_rgba(120,60,20,0.08)] sm:p-8">
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#a8521f]">
        <span className="h-px w-6 bg-[#a8521f]" />
        {data.badge}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-[34px]">
        {heading.main} <span className="text-[#a8521f]">{heading.highlight}</span>
      </h2>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-neutral-600">
        {data.description}
      </p>

      <form key={formKey} onSubmit={onSubmit} className="mt-6 grid gap-3.5 sm:grid-cols-2">
        <Field icon={User} name="name" placeholder={form.namePlaceholder} required />
        <Field icon={Phone} name="phone" type="tel" placeholder={form.phonePlaceholder} required />
        <Field
          icon={Mail}
          name="email"
          type="email"
          placeholder={form.emailPlaceholder}
          required
          className="sm:col-span-2"
        />
        <SelectField icon={Car} name="carType" placeholder={form.carTypePlaceholder} options={carTypes} />
        <SelectField
          icon={CalendarDays}
          name="duration"
          placeholder={form.durationPlaceholder}
          options={durations}
        />
        <Field icon={MapPin} name="pickup" placeholder={form.pickupPlaceholder} />
        <Field icon={MapPin} name="dropoff" placeholder={form.dropoffPlaceholder} />

        <label className="relative sm:col-span-2">
          <MessageCircle className="pointer-events-none absolute left-3.5 top-3.5 text-neutral-500" size={17} />
          <textarea
            name="message"
            rows={4}
            placeholder={form.messagePlaceholder}
            className="w-full resize-y rounded-lg border border-neutral-200 bg-white py-3 pl-10 pr-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-500 focus:border-copper focus:ring-2 focus:ring-copper/20"
          />
        </label>

        <button
          type="submit"
          className="flex items-center justify-center gap-3 rounded-lg bg-gradient-to-b from-[#b8461f] to-[#9c3812] py-3.5 text-[15px] font-semibold text-white shadow-md shadow-[#9c3812]/30 transition hover:brightness-110 sm:col-span-2"
        >
          {form.submitText}
          <ArrowRight size={18} />
        </button>

        {sent && (
          <p
            role="status"
            className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700 sm:col-span-2"
          >
            <CircleCheck size={18} />
            {form.successMessage}
          </p>
        )}
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-neutral-200 bg-white py-3 pl-10 pr-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-500 focus:border-copper focus:ring-2 focus:ring-copper/20";

function Field({
  icon: Icon,
  className = "",
  ...props
}: { icon: LucideIcon; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`relative ${className}`}>
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={17} />
      <input type="text" aria-label={props.placeholder} className={inputClass} {...props} />
    </label>
  );
}

function SelectField({
  icon: Icon,
  name,
  placeholder,
  options,
}: {
  icon: LucideIcon;
  name: string;
  placeholder: string;
  options: string[];
}) {
  const [value, setValue] = useState("");

  return (
    <label className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={17} />
      <select
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label={placeholder}
        className={`${inputClass} appearance-none pr-9 ${value ? "" : "text-neutral-500!"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-neutral-900">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600" size={17} />
    </label>
  );
}

const infoIcons = [Phone, Mail, MapPin, Clock];

export default function RydoraContactPage1({ data }) {
  const info = Array.isArray(data?.infoCards) && data.infoCards.length
    ? data.infoCards
    : [
        { title: "Call Us", lines: ["+1 0000000000", "Mon - Sat, 9:00 AM - 8:00 PM"] },
        { title: "Email Us", lines: ["info@xyz.com", "We reply within 24 hours"] },
        { title: "Visit Our Office", lines: ["123 Business Avenue,", "New York, NY 10001, USA"] },
        { title: "Working Hours", lines: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM"] },
      ];
  return (
    <section className="bg-white py-14 text-neutral-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-5 lg:grid-cols-2">
          <ContactForm data={data} />
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-[#faf3ee] p-6 sm:p-7">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#a8521f]">
                <span className="h-px w-6 bg-[#a8521f]" />
                Contact Information
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-[28px]">
                We&apos;re Always Here <span className="text-[#a8521f]">for You</span>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Reach out to us through any of the following channels. Our team is ready to assist you with bookings, inquiries, and support.
              </p>
              <ul className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {info.map((card, i) => {
                  const Icon = infoIcons[i] || Phone;
                  return (
                    <li
                      key={card.title || i}
                      className={`flex items-start gap-3.5 ${
                        i % 2 === 0 ? "sm:border-r sm:border-[#ead8cb] sm:pr-4" : ""
                      }`}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5dccb] text-[#b8461f]">
                        <Icon size={20} strokeWidth={2.2} />
                      </span>
                      <div className="text-[13px] leading-relaxed text-neutral-600">
                        <p className="text-sm font-bold text-neutral-900">{card.title}</p>
                        {(card.lines || []).map((line, j) => (
                          <p key={j} className={j === 0 ? "font-medium text-neutral-800" : ""}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl">
              <Image
                src={data?.image || "/automotive/images/showroom.jpg"}
                alt="Rydora car rentals showroom"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <iframe
            title="Rydora Car Rentals location"
            src={data?.mapUrl || "https://www.google.com/maps?q=New+York,+NY+10001,+USA&z=13&output=embed"}
            className="h-[300px] w-full sm:h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

