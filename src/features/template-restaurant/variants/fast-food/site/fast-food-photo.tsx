import type { Locale } from "@/shared/i18n/config";
import { RestaurantPhoto } from "../../../restaurant-photo";
import { fastFoodPhotos } from "../photos";

type Props = { imageId: string; locale: Locale; sizes: string; priority?: boolean; className?: string };

// A photo from Smash Lab's list, filling its parent. Extra classes go on the wrapper (e.g. hover zoom).
export function FastFoodPhoto({ imageId, locale, sizes, priority, className }: Props) {
  return (
    <div className={className ? `h-full w-full ${className}` : "h-full w-full"}>
      <RestaurantPhoto
        photos={fastFoodPhotos}
        imageId={imageId}
        locale={locale}
        sizes={sizes}
        {...(priority ? { priority } : {})}
      />
    </div>
  );
}
