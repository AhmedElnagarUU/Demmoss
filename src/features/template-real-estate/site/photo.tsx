import type { LocalizedText } from "@/features/demo-engine/types";
import type { Locale } from "@/shared/i18n/config";
import { photoSrcSet, photoUrl } from "@/shared/ui/photo";

// One entry of a variant's photo list (photos.ts). `src` is the plain CDN address; sizes are chosen per slot here.
export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  // a person (agent, team member): offered for agent cards, not as a property photo
  portrait?: boolean;
};

const WIDTHS = [400, 800, 1200, 1800] as const;

export function findPhoto(photos: readonly Photo[], id: string | undefined): Photo | undefined {
  return photos.find((photo) => photo.id === id) ?? photos[0];
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
  if (!photo) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- the photo CDN already resizes and converts the image
    <img
      src={photoUrl(photo.src, 800)}
      srcSet={photoSrcSet(photo.src, WIDTHS)}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt[locale]}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
