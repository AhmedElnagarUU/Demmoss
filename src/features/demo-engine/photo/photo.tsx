"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { photoSrcSet, photoUrl } from "@/shared/ui/photo";
import type { LocalizedText } from "../types";

// One stock photo of a variant's photo list. `src` is the plain CDN address (see shared/ui/photo.ts).
export type PhotoData = { src: string; width: number; height: number; alt: LocalizedText };

type Props = {
  photo: PhotoData | undefined;
  locale: Locale;
  // widths served by the photo CDN; `sizes` (a CSS value) tells the browser which one fits the slot
  widths?: readonly number[];
  sizes?: string;
  priority?: boolean;
  className?: string;
  // show the alt text in a box when the photo cannot load; turn off inside a button that has its own aria-label
  fallback?: boolean;
};

// A stock photo served resized by the photo CDN. If it cannot load, a box with the alt text is shown instead.
// The caller owns the frame (size, aspect ratio, background); the photo fills it.
export function Photo({
  photo,
  locale,
  widths = [480, 800, 1200],
  sizes = "100vw",
  priority = false,
  className = "",
  fallback = true,
}: Props) {
  const [failedSrc, setFailedSrc] = useState("");
  if (!photo) return null;
  const alt = photo.alt[locale];

  if (fallback && failedSrc === photo.src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex size-full items-center justify-center bg-surface p-3 text-center text-sm text-muted"
      >
        {alt}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- the photo CDN resizes the image (srcSet), so next/image is not needed
    <img
      src={photoUrl(photo.src, widths[Math.min(1, widths.length - 1)] ?? 800)}
      srcSet={photoSrcSet(photo.src, widths)}
      sizes={sizes}
      alt={alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onError={() => setFailedSrc(photo.src)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
