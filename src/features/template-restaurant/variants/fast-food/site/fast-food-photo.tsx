import type { Locale } from "@/shared/i18n/config";
import { RestaurantPhoto } from "../../../restaurant-photo";
import { fastFoodPhotos } from "../photos";

type Props = { imageId: string; locale: Locale; sizes: string; priority?: boolean };

// A photo from Smash Lab's list, filling its parent.
export function FastFoodPhoto({ imageId, locale, sizes, priority }: Props) {
  return (
    <RestaurantPhoto
      photos={fastFoodPhotos}
      imageId={imageId}
      locale={locale}
      sizes={sizes}
      {...(priority ? { priority } : {})}
    />
  );
}
