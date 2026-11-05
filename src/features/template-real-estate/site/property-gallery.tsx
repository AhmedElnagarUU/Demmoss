"use client";

import { useState } from "react";
import { useRealEstate } from "../context";
import { getRealEstateT } from "../messages";
import type { Property } from "../types";
import { findPhoto, SitePhoto } from "./photo";

// Main photo + thumbnails. The frame keeps its size before the photo loads.
export function PropertyGallery({ property }: { property: Property }) {
  const { config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const [index, setIndex] = useState(0);
  const photos = property.photos.map((id) => findPhoto(config.photos, id));
  const current = photos[index] ?? photos[0];

  return (
    <div className="space-y-3">
      <div className="aspect-4/3 overflow-hidden rounded-control bg-surface">
        <SitePhoto photo={current} locale={locale} sizes="(min-width: 1024px) 60vw, 100vw" priority />
      </div>
      {photos.length > 1 ? (
        <ul className="grid grid-cols-4 gap-3">
          {photos.map((photo, position) => (
            <li key={`${photo?.id}-${position}`}>
              <button
                type="button"
                aria-label={t("gallery.show", { number: String(position + 1) })}
                aria-pressed={position === index}
                onClick={() => setIndex(position)}
                className="block aspect-4/3 w-full overflow-hidden rounded-control border-2 border-transparent bg-surface aria-pressed:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <SitePhoto photo={photo} locale={locale} sizes="20vw" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
