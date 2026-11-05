"use client";

import type { Locale } from "@/shared/i18n/config";
import { Photo } from "@/features/demo-engine/photo/photo";
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

// A photo of the variant's library, picked by id; an unknown id shows the first photo.
export function RestaurantPhoto({ photos, imageId, locale, sizes, priority = false }: Props) {
  const photo = findPhoto(photos, imageId);
  return (
    <Photo
      photo={photo ? { ...photo, src: photo.source } : undefined}
      locale={locale}
      widths={widths}
      sizes={sizes}
      priority={priority}
    />
  );
}
