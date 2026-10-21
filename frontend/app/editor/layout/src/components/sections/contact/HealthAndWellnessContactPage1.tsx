// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image, useHealthRouter } from "../health-and-wellness/shared";
type MedicareDataProps = { data?: any; limit?: number };

import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  User,
  FileText,
  MessageSquare,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

function ContactSection({ data }: MedicareDataProps) {
  const router = useHealthRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agreed: false,
  });
  if (!data?.form || !data?.map || !Array.isArray(data.infoCards)) return null;
  const { badge, description, infoCards, form, map } = data;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }
    router.push("/thank-you");
  };

  const renderIcon = (iconName: string, colorClass: string) => {
    const props = { className: `w-6 h-6 ${colorClass}` };
    switch (iconName) {
      case "map-pin":
        return <MapPin {...props} />;
      case "mail":
        return <Mail {...props} />;
      case "phone":
        return <Phone {...props} />;
      case "clock":
        return <Clock {...props} />;
      default:
        return null;
    }
  };

  const getBgColor = (color: string) => {
    switch (color) {
      case "green":
        return "bg-[#00a859]";
      case "red":
        return "bg-[#8b2635]"; // Dark red in screenshot
      case "blue":
        return "bg-[#042a4d]"; // Navy blue in screenshot
      default:
        return "bg-[#00a859]";
    }
  };

  return (
    <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden select-none font-sans">
      {/* Background Soft Blobs */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-[#eef8fb]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-[#eef8fb]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14">
        {/* ── Top Header Text Area ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-[#00a859] rounded-full inline-block" />
            <span className="text-[14px] font-bold text-[#00a859] tracking-wider uppercase">
              {badge}
            </span>
            <span className="w-8 h-[2px] bg-[#00a859] rounded-full inline-block" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold leading-[1.18] tracking-tight mb-5">
            <span className="text-[#042a4d]">{data.heading.main}</span>{" "}
            <span className="text-[#00a859]">{data.heading.highlight}</span>
          </h2>

          <p className="text-slate-500 text-[15px] sm:text-[16px] leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* ── 4 Info Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {infoCards.map((card: any) => (
            <div
              key={card.id}
              className="bg-[#fcfdfd] border border-slate-100 rounded-[24px] p-6 flex items-start gap-4 transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-white ${getBgColor(
                  card.color,
                )}`}
              >
                {renderIcon(card.icon, "text-white")}
              </div>
              <div className="flex flex-col">
                <h3 className="text-[17px] font-bold text-[#042a4d] mb-1.5 leading-snug">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed whitespace-pre-line">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Form & Map Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* ── LEFT: Contact Form ── */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
              <h3 className="text-3xl sm:text-[34px] font-extrabold leading-tight tracking-tight">
                <span className="text-[#042a4d]">{form.heading?.main}</span>{" "}
                <span className="text-[#00a859]">{form.heading?.highlight}</span>
              </h3>
            </div>
            <p className="text-slate-500 text-[14.5px] leading-relaxed mb-8">
              {form.description}
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 flex-1 flex flex-col"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <User className="w-[18px] h-[18px] text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name*"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-[14px] text-slate-800 placeholder-slate-400 outline-none transition"
                  />
                </div>
                <div className="relative">
                  <Mail className="w-[18px] h-[18px] text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-[14px] text-slate-800 placeholder-slate-400 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <Phone className="w-[18px] h-[18px] text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number*"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-[14px] text-slate-800 placeholder-slate-400 outline-none transition"
                  />
                </div>
                <div className="relative">
                  <FileText className="w-[18px] h-[18px] text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Subject*"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-[14px] text-slate-800 placeholder-slate-400 outline-none transition"
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <MessageSquare className="w-[18px] h-[18px] text-slate-400 absolute left-4 top-4 pointer-events-none" />
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Your Message...*"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full h-full min-h-[120px] bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-4 pl-12 pr-4 text-[14px] text-slate-800 placeholder-slate-400 outline-none transition resize-none"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#00a859] hover:bg-[#008f4c] text-white font-bold text-[14.5px] px-8 py-3.5 rounded-xl transition duration-200 shadow-[0_4px_16px_rgba(0,168,89,0.25)] active:scale-[0.99]"
                >
                  <span>{data.form?.submitLabel || ""}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </form>
          </div>
          <div className="bg-[#f9fafa] border border-slate-100 rounded-[28px] overflow-hidden flex flex-col shadow-sm relative h-[500px] lg:h-auto">
            <div className="relative flex-1 w-full min-h-[300px]">
              {map.embedUrl ? (
              <iframe
                src={map.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
              ) : map.image ? (
                <Image src={map.image} alt={map.locationTitle || ""} fill className="object-cover" />
              ) : null}
              {map.mapsUrl ? (
              <a
                href={map.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 bg-white px-3 py-2 rounded-md shadow-md text-[13px] font-semibold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-colors z-10"
              >
                Open in Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
              ) : null}
            </div>

            {/* Bottom Address Banner */}
            <div className="bg-white p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f0f9f4] border border-[#d6efe3] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#00a859]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#042a4d] mb-0.5">
                    {map.locationTitle}
                  </h4>
                  <p className="text-[13px] text-slate-500 leading-tight whitespace-pre-line">
                    {map.locationAddress}
                  </p>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-[#00a859] hover:bg-[#008f4c] text-white font-bold text-[13.5px] px-5 py-3 rounded-xl transition duration-200 active:scale-[0.99] whitespace-nowrap"
              >
                <span>Get Directions</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediCareContactPage1({ data }: SectionProps) {
  if (!data) return null;
  return <ContactSection data={data as any} />;
}
