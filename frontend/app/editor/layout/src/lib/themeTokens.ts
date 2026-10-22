/** Shared theme CSS variable helpers for sections. */

export const THEME_PRIMARY_BG = "var(--primary-bg)";
export const THEME_PRIMARY_TEXT = "var(--primary-text)";
export const THEME_SECONDARY_BG = "var(--secondary-bg)";
export const THEME_SECONDARY_TEXT = "var(--secondary-text)";
export const THEME_HEADER_BG = "var(--header-bg)";
export const THEME_HEADER_TEXT = "var(--header-text)";
export const THEME_HERO_BG = "var(--hero-bg)";
export const THEME_ACCENT = "var(--blue-bg)";
export const THEME_BUTTON_BG = "var(--primary-bg)";
export const THEME_BUTTON_TEXT = "var(--primary-text)";
export const THEME_FONT_HEADING = "var(--font-heading)";
export const THEME_FONT_BODY = "var(--font-body)";
export const THEME_FONT_BUTTON = "var(--font-button, var(--font-body))";

const THEME_LOCKED_COLORS = [
  "#00cadd",
  "#0f766e",
  "#245c6e",
  "#17241f",
  "#0d1f2a",
  "#0f172a",
  "#141414",
  "#ffffff",
  "#fff",
];

/** Use the live theme token when the stored color is empty or a template default. */
export function resolveThemeColor(
  value: string | undefined,
  cssVar: string,
  extraLocked: string[] = [],
) {
  const raw = (value || "").trim();
  if (!raw || raw.startsWith("var(")) return cssVar;
  const locked = new Set(
    [...THEME_LOCKED_COLORS, ...extraLocked].map((color) => color.toLowerCase()),
  );
  return locked.has(raw.toLowerCase()) ? cssVar : raw;
}

export const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=Inter:wght@400;600;700&family=Lato:wght@400;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;600;700&family=Nunito:wght@400;600;700&family=Open+Sans:wght@400;600;700&family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Poppins:wght@400;600;700&family=Roboto:wght@400;500;700&family=Source+Sans+3:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&display=swap";

export function ensureThemeGoogleFontsLoaded() {
  if (typeof document === "undefined") return;
  const existing = document.getElementById("ai-builder-theme-google-fonts");
  if (existing) return;
  const link = document.createElement("link");
  link.id = "ai-builder-theme-google-fonts";
  link.rel = "stylesheet";
  link.href = GOOGLE_FONTS_HREF;
  document.head.appendChild(link);
}

/** Global stylesheet applied on editor + published site roots. */
/** Theme Color and Theme Font are live previews. Refresh reloads both from the template. */
export function withOriginalThemeColors(
  saved: Record<string, string> | undefined,
  original: Record<string, string> | undefined,
) {
  const next = { ...(saved || {}) };
  const source = original || {};
  for (const [key, value] of Object.entries(source)) {
    if (
      key.startsWith("--") &&
      !key.startsWith("--font") &&
      typeof value === "string" &&
      value
    ) {
      next[key] = value;
    }
  }
  const heading = source["--font-heading"];
  const body = source["--font-body"];
  const button = source["--font-button"] || body;
  if (typeof heading === "string" && heading) next["--font-heading"] = heading;
  if (typeof body === "string" && body) {
    next["--font-body"] = body;
    next.fontFamily = body;
  }
  if (typeof button === "string" && button) next["--font-button"] = button;
  return next;
}

export const SITE_THEME_GLOBAL_CSS = `
[data-site-theme-root] {
  font-family: var(--font-body);
  color: var(--secondary-text);
}
[data-site-theme-root] h1,
[data-site-theme-root] h2,
[data-site-theme-root] h3,
[data-site-theme-root] h4,
[data-site-theme-root] h5,
[data-site-theme-root] h6 {
  font-family: var(--font-heading);
}
[data-site-theme-root] a[class*="rounded-"][class*="px-"],
[data-site-theme-root] a[class*="rounded-"][class*="font-"],
[data-site-theme-root] button:not([data-editor-toolbar]):not([aria-label="Close"]):not([aria-label="Close panel"]) {
  font-family: var(--font-button, var(--font-body));
}
[data-site-theme-root] .theme-accent {
  color: var(--blue-bg);
}
[data-site-theme-root] .theme-accent-soft {
  background-color: color-mix(in srgb, var(--primary-bg) 12%, white);
  color: var(--primary-bg);
}
[data-site-theme-root] .hover\\:theme-soft:hover {
  background-color: color-mix(in srgb, var(--primary-bg) 8%, #f8fafc);
}
[data-site-theme-root] .theme-accent-border,
[data-site-theme-root] .theme-accent-border-l {
  border-color: var(--primary-bg);
}
[data-site-theme-root] .theme-btn {
  background-color: var(--primary-bg);
  color: var(--primary-text);
}
[data-site-theme-root] .theme-btn:hover {
  filter: brightness(0.92);
}
[data-site-theme-root] .hover\\:theme-btn:hover {
  background-color: var(--primary-bg);
}
[data-site-theme-root] .theme-surface-accent {
  background-color: var(--primary-bg);
  color: var(--primary-text);
}
[data-site-theme-root] .theme-dot-active {
  background-color: var(--primary-bg);
}
[data-site-theme-root] .theme-prose a {
  color: var(--blue-bg);
}
/* RealEstate template: remap hardcoded palette so every section/page follows Theme Color */
[data-site-theme-root] [class~="text-[#c44536]"],
[data-site-theme-root] [class*="text-[#c44536]/"],
[data-site-theme-root] [class~="text-[#a4472f]"],
[data-site-theme-root] [class*="text-[#a4472f]/"],
[data-site-theme-root] [class~="text-[#a45b42]"],
[data-site-theme-root] [class*="text-[#a45b42]/"],
[data-site-theme-root] [class~="text-[#b44e32]"],
[data-site-theme-root] [class*="text-[#b44e32]/"],
[data-site-theme-root] [class~="text-[#00cadd]"],
[data-site-theme-root] [class~="text-[#0f766e]"],
[data-site-theme-root] [class~="text-[#e9ad91]"] {
  color: var(--primary-bg);
}
[data-site-theme-root] [class~="hover:text-[#c44536]"]:hover,
[data-site-theme-root] [class~="hover:text-[#a4472f]"]:hover,
[data-site-theme-root] [class~="hover:text-[#a45b42]"]:hover,
[data-site-theme-root] [class~="hover:text-[#b44e32]"]:hover,
[data-site-theme-root] [class~="hover:bg-[#b44e32]"]:hover {
  color: var(--primary-bg);
}
[data-site-theme-root] [class*="group"]:hover [class*="group-hover:text-[#c44536]"],
[data-site-theme-root] [class*="group"]:hover [class*="group-hover:text-[#a4472f]"],
[data-site-theme-root] [class*="group"]:hover [class*="group-hover:text-[#a45b42]"],
[data-site-theme-root] [class*="group"]:hover [class*="group-hover:text-[#b44e32]"],
[data-site-theme-root] [class*="group"]:hover [class*="group-hover/"][class*="text-[#c44536]"] {
  color: var(--primary-bg);
}
[data-site-theme-root] [class~="text-[#141414]"],
[data-site-theme-root] [class*="text-[#141414]/"],
[data-site-theme-root] [class~="text-[#17241f]"],
[data-site-theme-root] [class*="text-[#17241f]/"] {
  color: var(--secondary-text);
}
[data-site-theme-root] [class~="bg-[#c44536]"],
[data-site-theme-root] [class*="bg-[#c44536]/"],
[data-site-theme-root] [class~="bg-[#141414]"],
[data-site-theme-root] [class*="bg-[#141414]/"],
[data-site-theme-root] [class~="bg-[#17241f]"],
[data-site-theme-root] [class*="bg-[#17241f]/"],
[data-site-theme-root] [class~="bg-[#00cadd]"],
[data-site-theme-root] [class~="bg-[#0f766e]"],
[data-site-theme-root] [class~="bg-[#a45b42]"],
[data-site-theme-root] [class~="bg-[#b44e32]"] {
  background-color: var(--primary-bg);
  color: var(--primary-text);
}
[data-site-theme-root] [class~="hover:bg-[#c44536]"]:hover,
[data-site-theme-root] [class~="hover:bg-[#141414]"]:hover,
[data-site-theme-root] [class~="hover:bg-[#17241f]"]:hover,
[data-site-theme-root] [class*="hover:bg-[#141414]/"]:hover,
[data-site-theme-root] [class*="hover:bg-[#c44536]/"]:hover {
  background-color: var(--primary-bg);
  color: var(--primary-text);
}
[data-site-theme-root] [class~="border-[#c44536]"],
[data-site-theme-root] [class*="border-[#c44536]/"],
[data-site-theme-root] [class~="hover:border-[#c44536]"]:hover,
[data-site-theme-root] [class*="hover:border-[#c44536]/"]:hover,
[data-site-theme-root] [class~="hover:border-[#141414]"]:hover,
[data-site-theme-root] [class*="decoration-[#c44536]"] {
  border-color: var(--primary-bg);
  text-decoration-color: var(--primary-bg);
}
[data-site-theme-root] [class~="border-[#141414]"],
[data-site-theme-root] [class*="border-[#141414]/"],
[data-site-theme-root] [class~="border-[#17241f]"],
[data-site-theme-root] [class*="border-[#17241f]/"] {
  border-color: color-mix(in srgb, var(--secondary-text) 18%, transparent);
}
[data-site-theme-root] [class~="bg-[#f8f6f1]"],
[data-site-theme-root] [class~="bg-[#faf8f4]"],
[data-site-theme-root] [class~="bg-[#f3efe8]"],
[data-site-theme-root] [class~="bg-[#eee9df]"],
[data-site-theme-root] [class~="bg-[#eee9e2]"],
[data-site-theme-root] [class~="bg-[#f7f4ee]"],
[data-site-theme-root] [class~="bg-[#ece8df]"],
[data-site-theme-root] [class~="bg-[#f2e3dc]"] {
  background-color: color-mix(in srgb, var(--primary-bg) 7%, var(--secondary-bg));
}
[data-site-theme-root] [class~="ring-[#a45b42]"],
[data-site-theme-root] [class*="ring-[#a45b42]/"],
[data-site-theme-root] [class*="focus-within:ring-[#a45b42]"] {
  --tw-ring-color: color-mix(in srgb, var(--primary-bg) 55%, transparent);
}
[data-site-theme-root] a[class*="rounded-full"][class*="bg-[#141414]"],
[data-site-theme-root] button[class*="rounded-full"][class*="bg-[#141414]"] {
  background-color: var(--primary-bg);
  color: var(--primary-text);
}
/* CoolFix: orange accent follows Theme Color primary, navy follows header */
.coolfix-theme [class~="text-[#ff6b00]"],
.coolfix-theme [class*="text-[#ff6b00]/"] {
  color: var(--primary-bg, #ff6b00) !important;
}
.coolfix-theme [class~="bg-[#ff6b00]"],
.coolfix-theme [class*="bg-[#ff6b00]/"] {
  background-color: var(--primary-bg, #ff6b00) !important;
}
.coolfix-theme [class~="border-[#ff6b00]"],
.coolfix-theme [class*="border-[#ff6b00]/"],
.coolfix-theme [class~="focus:border-[#ff6b00]"]:focus {
  border-color: var(--primary-bg, #ff6b00) !important;
}
.coolfix-theme [class~="hover:bg-[#e55f00]"]:hover,
.coolfix-theme [class~="hover:bg-[#ff6b00]"]:hover {
  background-color: color-mix(in srgb, var(--primary-bg, #ff6b00) 82%, black) !important;
}
.coolfix-theme [class~="hover:text-[#ff6b00]"]:hover,
.coolfix-theme [class*="group"]:hover [class*="group-hover:text-[#ff6b00]"] {
  color: var(--primary-bg, #ff6b00) !important;
}
.coolfix-theme [class~="text-[#0b2a5b]"],
.coolfix-theme [class~="text-[#0b1c3d]"] {
  color: var(--header-bg, #0b2a5b) !important;
}
.coolfix-theme [class~="bg-[#0b2a5b]"],
.coolfix-theme [class~="bg-[#041a33]"],
.coolfix-theme [class~="bg-[#10284d]"] {
  background-color: var(--header-bg, #0b2a5b) !important;
  color: var(--header-text, #ffffff);
}
.coolfix-theme svg [stroke="#ff6b00"] { stroke: var(--primary-bg, #ff6b00); }
.coolfix-theme svg [fill="#ff6b00"] { fill: var(--primary-bg, #ff6b00); }
.coolfix-theme svg [stroke="#0b2a5b"] { stroke: var(--header-bg, #0b2a5b); }
.coolfix-theme svg [fill="#0b2a5b"] { fill: var(--header-bg, #0b2a5b); }
/* Hair Atelier: Theme Fonts drive body and headings. Fallbacks are the original pair. */
.hair-atelier-root {
  font-family: var(--font-body, "Montserrat", Arial, Helvetica, sans-serif) !important;
}
.hair-atelier-root .font-heading,
.hair-atelier-root :is(h1, h2, h3, h4, h5, h6) {
  font-family: var(--font-heading, "Playfair Display", Georgia, serif) !important;
}
/* Hair Atelier: only the real gold classes follow Theme Color. Pseudo classes like after:bg stay on ::after. */
.hair-atelier-root [class~="text-[#e0a458]"],
.hair-atelier-root [class~="text-[#f0c48c]"],
.hair-atelier-root [class~="text-[#f5a524]"] {
  color: var(--primary-bg, #e0a458) !important;
}
.hair-atelier-root [class~="text-[#e0a458]/20"] {
  color: color-mix(in srgb, var(--primary-bg, #e0a458) 20%, transparent) !important;
}
.hair-atelier-root [class~="hover:text-[#e0a458]"]:hover,
.hair-atelier-root [class~="hover:text-[#f0c48c]"]:hover {
  color: var(--primary-bg, #e0a458) !important;
}
.hair-atelier-root [class*="group"]:hover [class~="group-hover:text-[#e0a458]"],
.hair-atelier-root [class*="group"]:hover [class~="group-hover:text-[#f0c48c]"],
.hair-atelier-root [class~="group/card"]:hover [class~="group-hover/card:text-[#f0c48c]"],
.hair-atelier-root [class~="group/contact"]:hover [class~="group-hover/contact:text-[#e0a458]"],
.hair-atelier-root [class*="group/post"]:hover [class~="group-hover/post:text-[#f0c48c]"] {
  color: var(--primary-bg, #e0a458) !important;
}
.hair-atelier-root [class*="group"]:hover [class~="group-hover:text-[#e0a458]/35"],
.hair-atelier-root [class~="group/card"]:hover [class~="group-hover/card:text-[#e0a458]/35"] {
  color: color-mix(in srgb, var(--primary-bg, #e0a458) 35%, transparent) !important;
}
.hair-atelier-root [class~="bg-[#e0a458]"],
.hair-atelier-root [class~="bg-[#f29a1f]"] {
  background-color: var(--primary-bg, #e0a458) !important;
}
.hair-atelier-root [class~="bg-[#e0a458]/5"] {
  background-color: color-mix(in srgb, var(--primary-bg, #e0a458) 5%, transparent) !important;
}
.hair-atelier-root [class~="bg-[#e0a458]/10"] {
  background-color: color-mix(in srgb, var(--primary-bg, #e0a458) 10%, transparent) !important;
}
.hair-atelier-root [class~="bg-[#c98a4b]/25"] {
  background-color: color-mix(in srgb, var(--primary-bg, #e0a458) 25%, transparent) !important;
}
.hair-atelier-root [class~="after:bg-[#e0a458]/60"]::after {
  background-color: color-mix(in srgb, var(--primary-bg, #e0a458) 60%, transparent) !important;
}
.hair-atelier-root [class~="hover:bg-[#e0a458]"]:hover,
.hair-atelier-root [class*="group"]:hover [class~="group-hover:bg-[#e0a458]"] {
  background-color: var(--primary-bg, #e0a458) !important;
}
.hair-atelier-root [class~="hover:text-black"]:hover,
.hair-atelier-root [class*="group"]:hover [class~="group-hover:text-black"] {
  color: #000000 !important;
}
.hair-atelier-root [class*="group"]:hover [class~="group-hover:text-black"] svg {
  stroke: #000000 !important;
}
.hair-atelier-root [class~="group/card"]:hover [class~="group-hover/card:bg-[#e0a458]"],
.hair-atelier-root .hair-contact-card:hover .hair-contact-icon,
.hair-atelier-root .hair-choose-card:hover .hair-choose-icon,
.hair-atelier-root .hair-quote-card:hover .hair-quote-icon {
  background-color: var(--primary-bg, #e0a458) !important;
}
.hair-atelier-root [class~="group/card"]:hover [class~="group-hover/card:text-black"],
.hair-atelier-root .hair-contact-card:hover .hair-contact-icon,
.hair-atelier-root .hair-choose-card:hover .hair-choose-icon,
.hair-atelier-root .hair-quote-card:hover .hair-quote-icon {
  color: #000000 !important;
}
.hair-atelier-root [class~="group/card"]:hover [class~="group-hover/card:text-black"] svg,
.hair-atelier-root .hair-contact-card:hover .hair-contact-icon svg,
.hair-atelier-root .hair-service-card:hover .hair-service-arrow svg,
.hair-atelier-root .hair-choose-card:hover .hair-choose-icon svg,
.hair-atelier-root .hair-quote-card:hover .hair-quote-icon svg {
  color: #000000 !important;
  stroke: #000000 !important;
}
.hair-atelier-root .hair-service-card:hover .hair-service-arrow {
  background-color: var(--primary-bg, #e0a458) !important;
  color: #000000 !important;
}
.hair-atelier-root [class~="border-[#e0a458]"],
.hair-atelier-root [class~="border-[#0e5c5c]"] {
  border-color: var(--primary-bg, #e0a458) !important;
}
.hair-atelier-root [class~="border-[#e0a458]/40"] {
  border-color: color-mix(in srgb, var(--primary-bg, #e0a458) 40%, transparent) !important;
}
.hair-atelier-root [class~="border-[#e0a458]/50"] {
  border-color: color-mix(in srgb, var(--primary-bg, #e0a458) 50%, transparent) !important;
}
.hair-atelier-root [class~="border-[#e0a458]/60"] {
  border-color: color-mix(in srgb, var(--primary-bg, #e0a458) 60%, transparent) !important;
}
.hair-atelier-root [class~="border-[#e0a458]/70"] {
  border-color: color-mix(in srgb, var(--primary-bg, #e0a458) 70%, transparent) !important;
}
.hair-atelier-root [class~="border-[#e0a458]/80"] {
  border-color: color-mix(in srgb, var(--primary-bg, #e0a458) 80%, transparent) !important;
}
.hair-atelier-root [class~="hover:border-[#e0a458]"]:hover,
.hair-atelier-root [class~="focus:border-[#e0a458]"]:focus {
  border-color: var(--primary-bg, #e0a458) !important;
}
.hair-atelier-root [class~="hover:border-[#e0a458]/40"]:hover {
  border-color: color-mix(in srgb, var(--primary-bg, #e0a458) 40%, transparent) !important;
}
.hair-atelier-root [class~="hover:border-[#e0a458]/70"]:hover {
  border-color: color-mix(in srgb, var(--primary-bg, #e0a458) 70%, transparent) !important;
}
@media (min-width: 1024px) {
  .hair-atelier-root [class~="lg:hover:border-[#e0a458]"]:hover {
    border-color: var(--primary-bg, #e0a458) !important;
  }
}
.hair-atelier-root [class~="focus-visible:outline-[#e0a458]"]:focus-visible {
  outline-color: var(--primary-bg, #e0a458) !important;
}
.hair-atelier-root [class*="from-[#e8b47a]"],
.hair-atelier-root [class*="from-[#e0a458]"],
.hair-atelier-root [class*="from-[#f0b866]"],
.hair-atelier-root [class*="from-[#f0c48c]"] {
  --tw-gradient-from: var(--primary-bg, #e0a458) !important;
}
.hair-atelier-root [class*="via-[#f0c48c]"],
.hair-atelier-root [class*="via-[#e8b47a]"],
.hair-atelier-root [class*="via-[#e0a458]"] {
  --tw-gradient-via: color-mix(in srgb, var(--primary-bg, #e0a458) 78%, white) !important;
}
.hair-atelier-root [class*="to-[#c98a4b]"],
.hair-atelier-root [class*="to-[#e8a850]"],
.hair-atelier-root [class*="to-[#e0a458]"],
.hair-atelier-root [class*="to-[#b8763a]"] {
  --tw-gradient-to: color-mix(in srgb, var(--primary-bg, #e0a458) 82%, black) !important;
}
.hair-atelier-root [class*="rgba(224,164,88"] {
  --tw-shadow-color: color-mix(in srgb, var(--primary-bg, #e0a458) 45%, transparent);
}
.hair-atelier-root [class*="bg-gradient-to-r"][class*="from-[#e8b47a]"],
.hair-atelier-root [class*="bg-gradient-to-r"][class*="from-[#c98a4b]"],
.hair-atelier-root [class*="bg-gradient-to-r"][class*="from-[#f0b866]"],
.hair-atelier-root [class*="bg-gradient-to-r"][class*="from-[#f0c48c]"] {
  background-image: linear-gradient(to right, var(--primary-bg, #e0a458), color-mix(in srgb, var(--primary-bg, #e0a458) 72%, white), color-mix(in srgb, var(--primary-bg, #e0a458) 78%, black)) !important;
}
.hair-atelier-root [class*="bg-gradient-to-br"][class*="from-[#e8b47a]"],
.hair-atelier-root [class*="bg-gradient-to-br"][class*="from-[#f0c48c]"] {
  background-image: linear-gradient(to bottom right, var(--primary-bg, #e0a458), color-mix(in srgb, var(--primary-bg, #e0a458) 72%, black)) !important;
}
.hair-atelier-root [class*="bg-gradient-to-r"][class*="to-[#e0a458]"] {
  background-image: linear-gradient(to right, transparent, var(--primary-bg, #e0a458)) !important;
}
.hair-atelier-root [class*="bg-gradient-to-l"][class*="to-[#e0a458]"] {
  background-image: linear-gradient(to left, transparent, var(--primary-bg, #e0a458)) !important;
}
.hair-atelier-root [class*="bg-gradient-to-r"][class*="text-black"],
.hair-atelier-root [class*="bg-gradient-to-br"][class*="text-black"] {
  color: var(--primary-text, #000000) !important;
}
/* Manager detail bodies (blog/service/event/…): restore heading hierarchy */
[data-site-theme-root] .manager-detail-prose h1 {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--secondary-text);
  margin: 1.6em 0 0.55em;
}
[data-site-theme-root] .manager-detail-prose h2 {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--secondary-text);
  margin: 1.7em 0 0.55em;
}
[data-site-theme-root] .manager-detail-prose h3 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.015em;
  color: var(--secondary-text);
  margin: 1.45em 0 0.45em;
}
[data-site-theme-root] .manager-detail-prose h4,
[data-site-theme-root] .manager-detail-prose h5,
[data-site-theme-root] .manager-detail-prose h6 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--secondary-text);
  margin: 1.25em 0 0.4em;
}
[data-site-theme-root] .manager-detail-prose p {
  font-size: 1.125rem;
  line-height: 1.8;
  margin: 0.75em 0;
}
[data-site-theme-root] .manager-detail-prose > :first-child {
  margin-top: 0;
}
[data-site-theme-root] .manager-detail-prose ul,
[data-site-theme-root] .manager-detail-prose ol {
  margin: 0.85em 0;
  padding-left: 1.25em;
}
[data-site-theme-root] .manager-detail-prose li {
  margin: 0.35em 0;
}
[data-site-theme-root]:has([data-section-type="Breadcrumb"]) [data-section-type]:not([data-section-type="Breadcrumb"]) [data-embedded-page-banner] {
  display: none !important;
}
/* MediCare: green brand follows Primary, navy follows Accent (--blue-bg). */
.medicare-theme [class~="text-[#00a859]"],
.medicare-theme [class~="text-[#00c9c9]"],
.medicare-theme [class~="text-[#00c5c5]"],
.medicare-theme [class~="text-[#0070ba]"] {
  color: var(--primary-bg, #00a859) !important;
}
.medicare-theme [class~="bg-[#00a859]"],
.medicare-theme [class~="bg-[#00c9c9]"],
.medicare-theme [class~="bg-[#00c5c5]"],
.medicare-theme [class~="bg-[#008d75]"] {
  background-color: var(--primary-bg, #00a859) !important;
}
.medicare-theme [class~="border-[#00a859]"],
.medicare-theme [class~="hover:border-[#00a859]"]:hover {
  border-color: var(--primary-bg, #00a859) !important;
}
.medicare-theme [class~="hover:bg-[#00a859]"]:hover,
.medicare-theme [class~="hover:bg-[#008f4c]"]:hover,
.medicare-theme [class~="hover:bg-[#00b0b0]"]:hover,
.medicare-theme .group\/card:hover [class~="group-hover/card:bg-[#00a859]"] {
  background-color: var(--primary-bg, #00a859) !important;
}
.medicare-theme .group\/card:hover [class~="group-hover/card:text-white"],
.medicare-theme .group\/card:hover [class~="group-hover/card:bg-[#00a859]"] {
  color: #ffffff !important;
}
.medicare-theme .group\/card:hover [class~="group-hover/card:bg-[#00a859]"] svg {
  color: #ffffff !important;
  stroke: #ffffff !important;
}
.medicare-theme [class~="hover:text-[#00a859]"]:hover,
.medicare-theme .group\/card:hover [class~="group-hover/card:text-[#00a859]"] {
  color: var(--primary-bg, #00a859) !important;
}
.medicare-theme [class~="bg-[#e6f7ef]"],
.medicare-theme [class~="bg-[#00a859]/10"] {
  background-color: color-mix(in srgb, var(--primary-bg, #00a859) 14%, white) !important;
}
.medicare-theme [class~="text-[#073260]"],
.medicare-theme [class~="text-[#043365]"],
.medicare-theme [class~="text-[#042a4d]"] {
  color: var(--blue-bg, #043365) !important;
}
.medicare-theme [class~="bg-[#073260]"],
.medicare-theme [class~="bg-[#043365]"],
.medicare-theme [class~="bg-[#042a4d]"],
.medicare-theme [class~="bg-[#032549]"],
.medicare-theme [class~="bg-[#032347]"] {
  background-color: var(--blue-bg, #043365) !important;
}
.medicare-theme [class~="bg-[#073260]/85"] {
  background-color: color-mix(in srgb, var(--blue-bg, #043365) 85%, transparent) !important;
}
.medicare-theme [class~="hover:bg-[#032347]"]:hover,
.medicare-theme [class~="hover:bg-[#042a4d]"]:hover {
  background-color: color-mix(in srgb, var(--blue-bg, #043365) 82%, black) !important;
}
.medicare-theme svg [stroke="#00a859"] { stroke: var(--primary-bg, #00a859); }
.medicare-theme svg [fill="#00a859"] { fill: var(--primary-bg, #00a859); }
/* MediCare: Theme Fonts override Tailwind font-sans. Original is Plus Jakarta Sans. */
.medicare-theme,
.medicare-theme .font-sans {
  font-family: var(--font-body, "Plus Jakarta Sans", Arial, Helvetica, sans-serif) !important;
}
.medicare-theme :is(h1, h2, h3, h4, h5, h6) {
  font-family: var(--font-heading, "Plus Jakarta Sans", Arial, Helvetica, sans-serif) !important;
}
.medicare-theme button,
.medicare-theme a {
  font-family: var(--font-button, var(--font-body, "Plus Jakarta Sans", Arial, Helvetica, sans-serif)) !important;
}
.rydora-theme,
.rydora-theme .font-sans {
  font-family: var(--font-body, "Manrope", Arial, Helvetica, sans-serif) !important;
}
.rydora-theme :is(h1, h2, h3, h4, h5, h6) {
  font-family: var(--font-heading, "Manrope", Arial, Helvetica, sans-serif) !important;
}
.rydora-theme button,
.rydora-theme a {
  font-family: var(--font-button, var(--font-body, "Manrope", Arial, Helvetica, sans-serif)) !important;
}
/* Rydora copper follows Theme Color. Original primary is #c0703a. */
.rydora-theme [class~="text-copper"],
.rydora-theme [class~="text-copper-light"],
.rydora-theme [class~="text-copper-dark"],
.rydora-theme [class~="text-[#c85a17]"],
.rydora-theme [class~="text-[#a8521f]"],
.rydora-theme [class~="text-[#b25724]"],
.rydora-theme [class~="text-[#b5683a]"],
.rydora-theme [class~="text-[#b8461f]"],
.rydora-theme [class~="text-[#b84518]"],
.rydora-theme [class~="text-[#9c4c1f]"],
.rydora-theme [class~="text-[#e5a881]"] {
  color: var(--primary-bg, #c0703a) !important;
}
.rydora-theme [class~="text-[#c85a17]/20"] {
  color: color-mix(in srgb, var(--primary-bg, #c0703a) 20%, transparent) !important;
}
.rydora-theme [class~="bg-copper"],
.rydora-theme [class~="bg-[#c85a17]"],
.rydora-theme [class~="bg-[#a8521f]"],
.rydora-theme [class~="bg-[#b25724]"],
.rydora-theme [class~="bg-[#b5683a]"],
.rydora-theme [class~="bg-[#b84518]"] {
  background-color: var(--primary-bg, #c0703a) !important;
}
.rydora-theme [class~="bg-[#140b06]"] {
  background-color: var(--header-bg, #140b06) !important;
}
.rydora-theme [class~="bg-[#140b06]/90"] {
  background-color: color-mix(in srgb, var(--header-bg, #140b06) 90%, transparent) !important;
}
.rydora-theme [class~="bg-[#faefe9]"],
.rydora-theme [class~="bg-[#f6e3d6]"],
.rydora-theme [class~="bg-[#f8e6da]"],
.rydora-theme [class~="bg-[#f5dccb]"],
.rydora-theme [class~="bg-[#fbe7dc]"],
.rydora-theme [class~="bg-[#fdeee4]"],
.rydora-theme [class~="bg-[#fbebe3]"],
.rydora-theme [class~="bg-[#faf3ee]"],
.rydora-theme [class~="bg-[#f3d9c7]"],
.rydora-theme [class~="bg-[#fcd8c4]"] {
  background-color: color-mix(in srgb, var(--primary-bg, #c0703a) 16%, white) !important;
}
.rydora-theme [class*="border-copper"],
.rydora-theme [class~="border-[#e2b99c]"],
.rydora-theme [class~="border-[#f0dccd]"],
.rydora-theme [class~="border-[#ead8cb]"] {
  border-color: color-mix(in srgb, var(--primary-bg, #c0703a) 55%, white) !important;
}
.rydora-theme [class~="hover:bg-copper"]:hover,
.rydora-theme [class~="hover:bg-[#b25724]"]:hover,
.rydora-theme [class~="hover:bg-[#9c4c1f]"]:hover,
.rydora-theme [class~="hover:bg-[#b04f14]"]:hover,
.rydora-theme [class~="hover:bg-[#a03b14]"]:hover,
.rydora-theme [class~="hover:bg-[#c85a17]/50"]:hover {
  background-color: var(--primary-bg, #c0703a) !important;
}
.rydora-theme [class~="hover:bg-[#fbdcd0]"]:hover,
.rydora-theme [class~="hover:bg-[#e9bfa2]"]:hover,
.rydora-theme [class~="hover:bg-[#f1d3bf]"]:hover {
  background-color: color-mix(in srgb, var(--primary-bg, #c0703a) 24%, white) !important;
}
.rydora-theme [class*="hover:text-copper"]:hover,
.rydora-theme [class~="hover:text-[#9c4c1f]"]:hover {
  color: var(--primary-bg, #c0703a) !important;
}
.rydora-theme [class~="after:bg-copper"]::after {
  background-color: var(--primary-bg, #c0703a) !important;
}
.rydora-theme a[class*="from-copper"],
.rydora-theme button[class*="from-copper"],
.rydora-theme a[class*="from-[#b8461f]"],
.rydora-theme button[class*="from-[#b8461f]"] {
  background-color: var(--primary-bg, #c0703a) !important;
  background-image: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--primary-bg, #c0703a) 78%, white),
    color-mix(in srgb, var(--primary-bg, #c0703a) 62%, black)
  ) !important;
  color: #ffffff !important;
}
.rydora-theme [class*="from-[#140b06]"] {
  --tw-gradient-from: color-mix(in srgb, var(--header-bg, #140b06) 90%, transparent) var(--tw-gradient-from-position) !important;
  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position)) !important;
}
.rydora-theme [class*="via-[#140b06]"] {
  --tw-gradient-via: color-mix(in srgb, var(--header-bg, #140b06) 70%, transparent) var(--tw-gradient-via-position) !important;
}
.rydora-theme [class*="focus:border-copper"]:focus,
.rydora-theme [class~="focus:border-[#b84518]"]:focus {
  border-color: var(--primary-bg, #c0703a) !important;
}
.rydora-theme [class*="focus:ring-copper"]:focus,
.rydora-theme [class~="focus:ring-[#b84518]"]:focus,
.rydora-theme [class*="focus:ring-[#c85a17]"]:focus {
  --tw-ring-color: var(--primary-bg, #c0703a) !important;
}
.rydora-theme [class~="group/card"]:hover [class~="group-hover/card:bg-[#b25724]"],
.rydora-theme [class~="group/item"]:hover [class~="group-hover/item:bg-[#a8521f]"] {
  background-color: var(--primary-bg, #c0703a) !important;
  color: #ffffff !important;
}
.rydora-theme [class~="group/card"]:hover [class~="group-hover/card:text-[#c85a17]"],
.rydora-theme [class~="group/card"]:hover [class~="group-hover/card:text-[#b25724]"],
.rydora-theme [class~="group/card"]:hover [class~="group-hover/card:text-[#c85a17]/40"] {
  color: var(--primary-bg, #c0703a) !important;
}
.rydora-theme [class~="group/step"]:hover [class~="group-hover/step:text-[#e9cdb5]"] {
  color: color-mix(in srgb, var(--primary-bg, #c0703a) 28%, white) !important;
}
.rydora-theme svg [fill="#d98a4e"],
.rydora-theme svg [fill="#a8521f"] {
  fill: var(--primary-bg, #c0703a);
}
/* Let the navbar pin to the editor canvas instead of scrolling away. */
.rydora-theme { overflow: visible !important; }
.rydora-theme [data-section-type="Header"] {
  position: relative;
  z-index: 120;
  height: 0;
  min-height: 0;
  overflow: visible;
  isolation: auto;
}
.rydora-theme [data-section-type="Banner"] section {
  height: calc(100vh - 5.5rem);
  min-height: calc(100vh - 5.5rem);
}
`.trim();
