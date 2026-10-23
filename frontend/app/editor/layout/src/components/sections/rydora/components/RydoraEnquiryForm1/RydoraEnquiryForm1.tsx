"use client";

import React, { useState } from "react";
import { AutomotiveImage as Image } from "@/app/editor/layout/src/components/sections/rydora/addons/shared";
import {
  User,
  Phone,
  Mail,
  Car,
  MapPin,
  Calendar,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Tag,
  Headphones,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

interface EnquiryFeature {
  title: string;
  description: string;
  icon: string;
}

interface EnquiryFormFields {
  namePlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  carTypePlaceholder: string;
  durationPlaceholder: string;
  pickupPlaceholder: string;
  dropoffPlaceholder: string;
  pickupDatePlaceholder: string;
  returnDatePlaceholder: string;
  messagePlaceholder: string;
  submitText: string;
  privacyText: string;
}

interface EnquiryData {
  badge: string;
  heading: { main: string; middle: string; highlight: string };
  description: string;
  image: { src: string; alt: string };
  list: EnquiryFeature[];
  form: EnquiryFormFields;
}

const featureIcons: Record<string, LucideIcon> = { Car, Tag, Headphones, ShieldCheck };

export default function CarRentalEnquiry({ data }: { data?: EnquiryData }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carType: "",
    rentalDuration: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    returnDate: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enquiry Form Submitted:", formData);
  };

  if (!data) return null;

  return (
    <section className="w-full bg-[#fbfbfa] py-16 px-5 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Heading & Enquiry Form */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#b84518]" />
              <span className="text-xs font-bold tracking-wider text-[#b84518] uppercase">
                {data.badge}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111827] tracking-tight leading-[1.15] mb-3">
              {data.heading.main} <br />
              {data.heading.middle} <span className="text-[#b84518]">{data.heading.highlight}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm leading-relaxed text-[#6b7280] mb-8 max-w-lg">
              {data.description}
            </p>

            {/* Form Card */}
            <div className="bg-white border border-[#efe9e1] rounded-2xl p-6 sm:p-7 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <User className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder={data.form.namePlaceholder}
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-[13px] bg-white border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#b84518] focus:ring-1 focus:ring-[#b84518] placeholder:text-[#9ca3af] text-[#111827] transition"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder={data.form.phonePlaceholder}
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-[13px] bg-white border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#b84518] focus:ring-1 focus:ring-[#b84518] placeholder:text-[#9ca3af] text-[#111827] transition"
                    />
                  </div>
                </div>

                {/* Row 2: Email Address */}
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    placeholder={data.form.emailPlaceholder}
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-[13px] bg-white border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#b84518] focus:ring-1 focus:ring-[#b84518] placeholder:text-[#9ca3af] text-[#111827] transition"
                  />
                </div>

                {/* Row 3: Select Car Type & Rental Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Car className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      required
                      value={formData.carType}
                      onChange={(e) =>
                        setFormData({ ...formData, carType: e.target.value })
                      }
                      className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-[13px] bg-white border border-[#e5e0d8] rounded-lg appearance-none focus:outline-none focus:border-[#b84518] focus:ring-1 focus:ring-[#b84518] text-[#374151] cursor-pointer transition"
                    >
                      <option value="">{data.form.carTypePlaceholder}</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV / Luxury SUV</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="luxury">Luxury Car</option>
                      <option value="van">Passenger Van</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#9ca3af] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      required
                      value={formData.rentalDuration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rentalDuration: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-[13px] bg-white border border-[#e5e0d8] rounded-lg appearance-none focus:outline-none focus:border-[#b84518] focus:ring-1 focus:ring-[#b84518] text-[#374151] cursor-pointer transition"
                    >
                      <option value="">{data.form.durationPlaceholder}</option>
                      <option value="daily">Daily Rental (1-3 Days)</option>
                      <option value="weekly">Weekly Rental</option>
                      <option value="monthly">Monthly Subscription</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#9ca3af] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Row 4: Pickup Location & Drop-off Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder={data.form.pickupPlaceholder}
                      required
                      value={formData.pickupLocation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pickupLocation: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-[13px] bg-white border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#b84518] focus:ring-1 focus:ring-[#b84518] placeholder:text-[#9ca3af] text-[#111827] transition"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder={data.form.dropoffPlaceholder}
                      required
                      value={formData.dropoffLocation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dropoffLocation: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-[13px] bg-white border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#b84518] focus:ring-1 focus:ring-[#b84518] placeholder:text-[#9ca3af] text-[#111827] transition"
                    />
                  </div>
                </div>

                {/* Row 5: Pickup Date & Return Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                      }}
                      placeholder={data.form.pickupDatePlaceholder}
                      required
                      value={formData.pickupDate}
                      onChange={(e) =>
                        setFormData({ ...formData, pickupDate: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-[13px] bg-white border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#b84518] focus:ring-1 focus:ring-[#b84518] placeholder:text-[#9ca3af] text-[#111827] transition"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                      }}
                      placeholder={data.form.returnDatePlaceholder}
                      required
                      value={formData.returnDate}
                      onChange={(e) =>
                        setFormData({ ...formData, returnDate: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-[13px] bg-white border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#b84518] focus:ring-1 focus:ring-[#b84518] placeholder:text-[#9ca3af] text-[#111827] transition"
                    />
                  </div>
                </div>

                {/* Row 6: Message */}
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-3.5 pointer-events-none" />
                  <textarea
                    rows={3}
                    placeholder={data.form.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-[13px] bg-white border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#b84518] focus:ring-1 focus:ring-[#b84518] placeholder:text-[#9ca3af] text-[#111827] resize-none transition"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#b84518] hover:bg-[#a03b14] active:scale-[0.99] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <span>{data.form.submitText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Privacy Footer */}
              <div className="flex items-center justify-center gap-2 mt-4 text-[#6b7280]">
                <ShieldCheck className="w-4 h-4 text-[#b84518]" />
                <span className="text-[11px] font-medium text-center">
                  {data.form.privacyText}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Car Card + Feature Bar */}
          <div className="lg:col-span-6 flex flex-col rounded-3xl overflow-hidden shadow-sm bg-[#1a1715]">
            {/* Top Car Image with Scenic Mountain / Sunset Background */}
            <div className="relative w-full h-[380px] sm:h-[450px] lg:h-full min-h-[360px]">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Bottom 4 Feature Items Card */}
            <div className="bg-[#1b1715] border-t border-white/10 px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white">
              {data.list.map((feature) => {
                const Icon = featureIcons[feature.icon] ?? Car;
                return (
                  <div key={feature.title} className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2.5 text-[#e5a881]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold leading-snug">{feature.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-tight">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
