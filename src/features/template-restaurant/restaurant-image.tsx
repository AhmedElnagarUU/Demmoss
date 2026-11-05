import Image from "next/image";
import type { Locale } from "@/shared/i18n/config";
import { findImage } from "./images";

type Props = { imageId: string; locale: Locale; className?: string; priority?: boolean };

// Library images are already small files, so Next's optimizer is skipped (it does not process SVG).
export function RestaurantImage({ imageId, locale, className = "", priority = false }: Props) {
  const image = findImage(imageId);
  return (
    <Image
      src={image.src}
      alt={image.alt[locale]}
      width={image.width}
      height={image.height}
      unoptimized
      priority={priority}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
