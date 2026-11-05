import type { LocalizedText } from "@/features/demo-engine/types";
import type { Locale } from "@/shared/i18n/config";
import { Photo as EnginePhoto } from "@/features/demo-engine/photo/photo";

// One entry of a variant's photo list (photos.ts). `src` is the plain CDN address; sizes are chosen per slot here.
export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
};

const WIDTHS = [400, 800, 1200] as const;

export function findPhoto(photos: readonly Photo[], id: string | undefined): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}

type Props = {
  photo: Photo | undefined;
  locale: Locale;
  // CSS sizes for the slot, e.g. "(min-width: 1024px) 33vw, 100vw"
  sizes: string;
  priority?: boolean;
  className?: string;
};

// The frame (aspect ratio, background) belongs to the caller, so the layout holds even before the photo loads.
export function SitePhoto({ photo, locale, sizes, priority = false, className = "" }: Props) {
  return (
    <EnginePhoto
      photo={photo}
      locale={locale}
      widths={WIDTHS}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
