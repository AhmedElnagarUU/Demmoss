import type { LocalizedText } from "@/features/demo-engine/types";

// A stock photo of a variant's image library. Each variant keeps its own list (variants/<variant>/photos.ts);
// content and menu items store only the photo id. `source` is a full image URL from an allowed photo host (shared/ui/photo.ts).
export type LibraryPhoto = {
  id: string;
  source: string;
  width: number;
  height: number;
  alt: LocalizedText;
};

// An unknown id (for example a photo that was removed from the list) shows the first photo instead of nothing.
export function findPhoto(photos: readonly LibraryPhoto[], id: string): LibraryPhoto | undefined {
  return photos.find((photo) => photo.id === id) ?? photos[0];
}
