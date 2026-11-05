import { describe, expect, it } from "vitest";
import { categories } from "./categories";
import { filterByCategory, groupDemosByCategory } from "./grouping";
import type { TemplateMeta } from "./types";

function demo(category: TemplateMeta["category"], variant: string): TemplateMeta {
  return {
    slug: `${category}-${variant}`,
    category,
    variant,
    name: { ar: variant, en: variant },
    pitch: { ar: "x", en: "x" },
    screenshot: "/x.webp",
  };
}

const demos = [demo("clinic", "dental"), demo("restaurant", "fine-dining"), demo("restaurant", "fast-food")];

describe("gallery grouping", () => {
  it("G1: groups demos by category in category order and hides categories without demos", () => {
    const groups = groupDemosByCategory(demos, categories);
    expect(groups.map((group) => group.category.slug)).toEqual(["restaurant", "clinic"]);
    expect(groups[0]?.demos.map((item) => item.slug)).toEqual([
      "restaurant-fine-dining",
      "restaurant-fast-food",
    ]);
  });

  it("G1: an empty catalog gives no groups", () => {
    expect(groupDemosByCategory([], categories)).toEqual([]);
  });

  it("G2: filtering by a category keeps only that category with both variants", () => {
    const groups = filterByCategory(groupDemosByCategory(demos, categories), "restaurant");
    expect(groups).toHaveLength(1);
    expect(groups[0]?.demos).toHaveLength(2);
  });

  it("G2: no filter keeps everything, a category without demos gives nothing", () => {
    const groups = groupDemosByCategory(demos, categories);
    expect(filterByCategory(groups, undefined)).toHaveLength(2);
    expect(filterByCategory(groups, "fitness")).toEqual([]);
  });
});
