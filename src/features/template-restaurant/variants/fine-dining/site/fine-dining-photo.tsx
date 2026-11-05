import type { Locale } from "@/shared/i18n/config";
import { RestaurantPhoto } from "../../../restaurant-photo";
import { fineDiningPhotos } from "../photos";

type Props = { imageId: string; locale: Locale; sizes: string; priority?: boolean };

// A photo from Zaytouna's list, filling its parent.
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

// The round plate of the Verdant Table look.
export function Plate({ imageId, locale, sizes, priority, className = "" }: Props & { className?: string }) {
  return (
    <div
      className={`aspect-square overflow-hidden rounded-full border border-border shadow-[0_30px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <FineDiningPhoto imageId={imageId} locale={locale} sizes={sizes} {...(priority ? { priority } : {})} />
    </div>
  );
}
