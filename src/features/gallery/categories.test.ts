import { describe, expect, it } from "vitest";
import { categories, categorySlugs } from "./categories";

describe("gallery categories (shared by the gallery and the wizard)", () => {
  it("W2: every category has a unique slug and a name in Arabic and English", () => {
    const slugs = categories.map((category) => category.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const category of categories) {
      expect(category.name.ar.trim()).not.toBe("");
      expect(category.name.en.trim()).not.toBe("");
    }
  });

  it("W2: the slug list used for validation matches the categories shown", () => {
    expect([...categorySlugs]).toEqual(categories.map((category) => category.slug));
  });
});
