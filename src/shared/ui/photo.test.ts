import { describe, expect, it } from "vitest";
import { photoSrcSet, photoUrl } from "./photo";

describe("stock photos are requested at the size of their slot (design rule: sized images)", () => {
  it("asks Unsplash for the width, quality, and a modern format, dropping the design's original parameters", () => {
    const url = new URL(photoUrl("https://images.unsplash.com/photo-1500648767791?w=2000&q=100", 800));
    expect(url.searchParams.get("w")).toBe("800");
    expect(url.searchParams.get("auto")).toBe("format");
    expect(url.searchParams.get("q")).toBe("75");
  });

  it("asks Pexels for a compressed image at the width", () => {
    const url = new URL(photoUrl("https://images.pexels.com/photos/1/pexels-photo-1.jpeg", 640));
    expect(url.searchParams.get("w")).toBe("640");
    expect(url.searchParams.get("auto")).toBe("compress");
  });

  it("refuses hosts that are not approved", () => {
    expect(() => photoUrl("https://example.com/cat.jpg", 400)).toThrow(/not allowed/);
  });

  it("builds a srcset with one entry per width", () => {
    expect(photoSrcSet("https://images.unsplash.com/photo-1", [480, 960]).split(", ")).toHaveLength(2);
  });
});
