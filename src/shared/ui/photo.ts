// Stock photos are served by the photo host's CDN (resized and in a modern format), not stored in the repo.
// Keep every photo URL of a template in one list, so moving to self-hosted files later is one change.

const unsplashHost = "images.unsplash.com";
const pexelsHost = "images.pexels.com";

export const allowedPhotoHosts = [unsplashHost, pexelsHost] as const;

export function photoUrl(source: string, width: number): string {
  const url = new URL(source);
  url.search = "";
  if (url.host === unsplashHost) {
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", "75");
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  if (url.host === pexelsHost) {
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
    url.searchParams.set("w", String(width));
    return url.toString();
  }
  throw new Error(`Photo host not allowed: ${url.host} (allowed: ${allowedPhotoHosts.join(", ")})`);
}

export function photoSrcSet(source: string, widths: readonly number[]): string {
  return widths.map((width) => `${photoUrl(source, width)} ${width}w`).join(", ");
}
