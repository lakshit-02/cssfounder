// @ts-nocheck
"use client";
import React from "react";
import type { SectionProps } from "../../../types/section";
import CoolFixGallery1 from "./CoolFixGallery1";

export default function CoolFixGalleryPage1({ data }: SectionProps) {
  return (
    <div className="bg-white">
      <CoolFixGallery1 data={data} />
    </div>
  );
}
