import type { Locale } from "@/shared/i18n/config";
import { RestaurantPhoto } from "../../../restaurant-photo";
import { fineDiningPhotos } from "../photos";

type Props = { imageId: string; locale: Locale; sizes: string; priority?: boolean };

// A photo from the Verdant Table list, filling its parent.
export function FineDiningPhoto({ imageId, locale, sizes, priority }: Props) {
  return (
    <RestaurantPhoto
      photos={fineDiningPhotos}
      imageId={imageId}
      locale={locale}
      sizes={sizes}
      {...(priority ? { priority } : {})}
    />
  );
}

// The round plate of the source (.plate): a circle with a deep double shadow and a faint cream ring.
// `frame` replaces the ring (the gallery plates use a thick cream border).
export function Plate({
  imageId,
  locale,
  sizes,
  priority,
  className = "",
  frame = "border border-text/15",
}: Props & { className?: string; frame?: string }) {
  return (
    <div
      className={`aspect-square overflow-hidden rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.45),0_8px_20px_rgba(0,0,0,0.35)] ${frame} ${className}`}
    >
      <FineDiningPhoto imageId={imageId} locale={locale} sizes={sizes} {...(priority ? { priority } : {})} />
    </div>
  );
}

// A small round photo with a gold ring (the chefs and the signature dishes).
export function RoundPhoto({
  imageId,
  locale,
  sizes,
  className = "",
}: Omit<Props, "priority"> & { className?: string }) {
  return (
    <div className={`shrink-0 overflow-hidden rounded-full border border-primary ${className}`}>
      <FineDiningPhoto imageId={imageId} locale={locale} sizes={sizes} />
    </div>
  );
}
