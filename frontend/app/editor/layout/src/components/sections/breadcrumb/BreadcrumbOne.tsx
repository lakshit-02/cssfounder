import type { CSSProperties } from "react";
import { SectionProps } from "../../../types/section";
import InlineRichText from "../../builder/InlineRichText";

const COOLFIX_CRUMB_IMAGE = "/services/images/page-header-bg.jpg";

export default function BreadcrumbOne({ data = {} }: SectionProps) {
  const title = String(data.title || "Page");
  const homeLabel = String(data.homeLabel || "Home");
  const parentLabel = String(data.parentLabel || "").trim();
  const pretitle = String(data.pretitle || "");
  const storedImage = String(data.backgroundImage || "").trim();
  const backgroundImage = storedImage || COOLFIX_CRUMB_IMAGE;
  const cssUrl = backgroundImage.replace(/"/g, "%22");

  return (
    <section
      className="cf-page-crumb relative border-b border-slate-200 bg-slate-50"
      style={
        {
          ["--cf-crumb-image" as string]: `url("${cssUrl}")`,
        } as CSSProperties
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={backgroundImage}
        alt=""
        data-editor-media
        data-editor-media-type="image"
        data-editor-media-role="background"
        data-editor-media-src={backgroundImage}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="relative z-[2] mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-8 md:px-8">
        {pretitle ? (
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] theme-accent"
            data-editor-inline-format-key="breadcrumb-one:pretitle"
          >
            <InlineRichText value={pretitle} formatKey="breadcrumb-one:pretitle" />
          </p>
        ) : null}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li data-editor-inline-format-key="breadcrumb-one:home-label">
              <InlineRichText value={homeLabel} formatKey="breadcrumb-one:home-label" />
            </li>
            {parentLabel ? (
              <>
                <li aria-hidden="true">/</li>
                <li data-editor-inline-format-key="breadcrumb-one:parent-label">
                  <InlineRichText
                    value={parentLabel}
                    formatKey="breadcrumb-one:parent-label"
                  />
                </li>
              </>
            ) : null}
            <li aria-hidden="true">/</li>
            <li
              className="font-semibold text-slate-900"
              data-editor-inline-format-key="breadcrumb-one:current-label"
            >
              <InlineRichText value={title} formatKey="breadcrumb-one:current-label" />
            </li>
          </ol>
        </nav>
        <h1
          className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl"
          data-editor-inline-format-key="breadcrumb-one:title"
        >
          <InlineRichText value={title} formatKey="breadcrumb-one:title" />
        </h1>
      </div>
    </section>
  );
}
