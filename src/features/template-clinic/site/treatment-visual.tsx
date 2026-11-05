import type { Locale } from "@/shared/i18n/config";
import type { Treatment } from "../types";
import { findPhoto, SitePhoto, type Photo } from "./photo";

// A treatment's picture: its photo, or a drawn implant when it has none.
export function TreatmentVisual({
  treatment,
  photos,
  locale,
  sizes,
}: {
  treatment: Treatment;
  photos: readonly Photo[];
  locale: Locale;
  sizes: string;
}) {
  const photo = findPhoto(photos, treatment.photo);
  if (photo) return <SitePhoto photo={photo} locale={locale} sizes={sizes} />;
  return (
    <svg
      viewBox="0 0 300 370"
      aria-hidden="true"
      className="size-full bg-surface"
      preserveAspectRatio="xMidYMid slice"
    >
      <ellipse cx="150" cy="300" rx="70" ry="10" fill="currentColor" opacity=".12" />
      <path d="M122 70h56l8 40h-72z" fill="#f4f4f0" stroke="#c9cdbf" strokeWidth="3" />
      <path d="M114 110h72l-4 36h-64z" fill="#e9ecdf" stroke="#c9cdbf" strokeWidth="3" />
      <rect x="136" y="146" width="28" height="22" fill="#6c7a50" />
      <path d="M120 168h60l-6 100-24 28-24-28z" fill="#8aa05a" />
      <g stroke="#53623a" strokeWidth="3" opacity=".6">
        <path d="M121 184h58M123 200h54M125 216h50M127 232h46M130 248h40M135 264h30" />
      </g>
    </svg>
  );
}
