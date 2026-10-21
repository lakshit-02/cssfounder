// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { HealthImage as Image, useHealthRouter } from "../health-and-wellness/shared";
type MedicareDataProps = { data?: any; limit?: number };

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  BriefcaseMedical,
  MessageSquare,
  Lock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

function AppointmentSection({ data }: MedicareDataProps) {
  const router = useHealthRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    department: "",
    message: "",
  });
  if (!data?.heading || !Array.isArray(data.departments) || !Array.isArray(data.list)) return null;
  const {
    badge,
    description,
    formTitle,
    image: doctorImage,
    departments,
    timeSlots,
    list: features,
  } = data;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/thank-you");
  };

  return (
    <section className="relative w-full pt-16 pb-8 lg:pt-20 lg:pb-10 bg-[#fbfdfd] overflow-hidden select-none font-sans">
      {/* Background Soft Blobs */}
      <div className="absolute top-10 left-[-100px] w-96 h-96 bg-[#e0f4f7]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-[-80px] w-96 h-96 bg-[#e4f7ee]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14">
        {/* ── Main Two Column Layout: Form Card & Doctor Image ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* ── LEFT: Header Text & Appointment Form Card (Span 7) ── */}
          <div className="lg:col-span-7 flex flex-col">
            {/* ── Top Header Text Area ── */}
            <div className="mb-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-[#00a859] rounded-full inline-block" />
                <span className="text-[14px] font-bold text-[#00a859] tracking-wider">
                  {badge}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold leading-[1.16] tracking-tight mb-4">
                <span className="text-[#042a4d]">{data.heading.main}</span>{" "}
                <span className="text-[#00a859]">{data.heading.highlight}</span>
              </h2>

              <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                {description}
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-[28px] p-6 sm:p-9 shadow-[0_12px_45px_rgba(4,42,77,0.06)] border border-slate-100 flex-1">
            <h3 className="text-xl sm:text-[22px] font-extrabold text-[#042a4d] mb-7">
              {formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Full Name*"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-800 placeholder-slate-400 outline-none transition"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-800 placeholder-slate-400 outline-none transition"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number & Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number*"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-800 placeholder-slate-400 outline-none transition"
                  />
                </div>

                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-700 outline-none transition"
                  />
                </div>
              </div>

              {/* Row 3: Preferred Time & Select Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3 pl-11 pr-10 text-[13.5px] text-slate-700 outline-none transition appearance-none cursor-pointer"
                  >
                    <option value="">Preferred Time*</option>
                    {timeSlots.map((slot: string, idx: number) => (
                      <option key={idx} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <BriefcaseMedical className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3 pl-11 pr-10 text-[13.5px] text-slate-700 outline-none transition appearance-none cursor-pointer"
                  >
                    <option value="">Select Department*</option>
                    {departments.map((dep: string, idx: number) => (
                      <option key={idx} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Row 4: Your Message */}
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-400 absolute left-4 top-4 pointer-events-none" />
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Your Message (Optional)"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#fbfcfd] border border-slate-200 focus:border-[#00a859] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-[13.5px] text-slate-800 placeholder-slate-400 outline-none transition resize-none"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full bg-[#00a859] hover:bg-[#008f4c] text-white font-bold text-[14.5px] py-3.5 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,168,89,0.25)] active:scale-[0.99] mt-2"
              >
                <span>{data.submitLabel || data.formTitle || ""}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Security Privacy Note */}
              <div className="flex items-start sm:items-center justify-center gap-2 pt-3 text-slate-600 text-[13px] font-medium bg-slate-50/50 py-2 rounded-lg mt-1 border border-slate-100/50">
                <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5 sm:mt-0" />
                <span className="leading-tight">
                  Your information is secure and will only be used to confirm
                  your appointment.
                </span>
              </div>
            </form>
          </div>
          {/* Close Left Column */}
          </div>

          {/* ── RIGHT: Doctor Patient Image & 3 Sub-Features (Span 5) ── */}
          <div className="lg:col-span-5 flex flex-col gap-8 h-full">
            {/* Image Container with Top-Left Navy & Bottom-Right Green Accents */}
            <div className="relative w-full flex-1 flex flex-col justify-center px-4 py-4 min-h-[400px]">
              
              {/* LARGE FADED BLOB BACKGROUND BEHIND EVERYTHING */}
              <div className="absolute -inset-6 sm:-inset-10 bg-[#eef8fb] rounded-[40px] rounded-tl-[100px] rounded-br-[100px] -z-20 pointer-events-none" />

              <div className="relative w-full h-full max-w-[460px] mx-auto rounded-[28px]">
                {/* 1. TOP-LEFT DARK NAVY ACCENT BLOCK */}
                <div className="absolute -top-5 -left-5 w-[42%] h-[42%] bg-[#042a4d] rounded-tl-[24px] rounded-br-[24px] rounded-tr-lg rounded-bl-lg -z-10 pointer-events-none" />

                {/* 2. BOTTOM-RIGHT EMERALD GREEN ACCENT BLOCK */}
                <div className="absolute -bottom-5 -right-4 w-[38%] h-[38%] bg-[#00a859] rounded-br-[24px] rounded-tl-[24px] rounded-tr-lg rounded-bl-lg -z-10 pointer-events-none" />

                {/* 3. TOP-RIGHT DOTS PATTERN */}
                <div className="absolute -top-7 -right-7 w-20 h-20 bg-[radial-gradient(#93c5fd_2px,transparent_2px)] [background-size:10px_10px] opacity-75 -z-10 pointer-events-none" />

                {/* MAIN CLINICAL CONSULTATION IMAGE */}
                <div className="relative z-10 w-full h-full rounded-[24px] overflow-hidden bg-slate-100 shadow-xl border-4 border-white">
                  <Image
                    src={doctorImage}
                    alt="Doctor Consultation"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediCareBookAppointment1({ data }: SectionProps) {
  if (!data) return null;
  return <AppointmentSection data={data as any} />;
}
