"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { photoSrcSet, photoUrl } from "@/shared/ui/photo";
import { findPhoto, type LibraryPhoto } from "./images";

type Props = {
  photos: readonly LibraryPhoto[];
  imageId: string;
  locale: Locale;
  // the width of the photo on screen, as a CSS `sizes` value, so the CDN sends a small file
  sizes: string;
  priority?: boolean;
};

const widths = [400, 800, 1200] as const;

// A stock photo served resized by the photo CDN. If it cannot load, a neutral box with the alt text is shown instead.
// The parent decides the size and the shape; the photo fills it.
export function RestaurantPhoto({ photos, imageId, locale, sizes, priority = false }: Props) {
  const photo = findPhoto(photos, imageId);
  const [failedId, setFailedId] = useState("");
  if (!photo) return null;
  const alt = photo.alt[locale];

  if (failedId === photo.id) {
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
    // eslint-disable-next-line @next/next/no-img-element -- the photo CDN already resizes and converts the image
    <img
      src={photoUrl(photo.source, 800)}
      srcSet={photoSrcSet(photo.source, widths)}
      sizes={sizes}
      alt={alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailedId(photo.id)}
      className="size-full object-cover"
    />
  );
}
