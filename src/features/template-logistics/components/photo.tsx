import type { LocalizedText } from "@/features/demo-engine/types";
import type { Locale } from "@/shared/i18n/config";
import { photoSrcSet, photoUrl } from "@/shared/ui/photo";

// One stock photo of a variant's photo list (variants/<variant>/photos.ts).
export type SitePhoto = { src: string; width: number; height: number; alt: LocalizedText };

type Props = {
  photo: SitePhoto;
  locale: Locale;
  // widths served by the photo CDN; `sizes` tells the browser which one fits the slot
  widths?: readonly number[];
  sizes?: string;
  priority?: boolean;
  className?: string;
};

// Photos come from the CDN already resized; they are never needed to read the page, so the page works without them.
export function Photo({
  photo,
  locale,
  widths = [480, 800, 1200],
  sizes = "100vw",
  priority = false,
  className = "",
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- the photo CDN resizes the image (srcSet), so next/image is not needed
    <img
      src={photoUrl(photo.src, widths[Math.min(1, widths.length - 1)] ?? 800)}
      srcSet={photoSrcSet(photo.src, widths)}
      sizes={sizes}
      alt={photo.alt[locale]}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
