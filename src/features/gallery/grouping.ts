import type { Category, CategorySlug } from "./categories";
import type { TemplateMeta } from "./types";

export type DemoGroup = { category: Category; demos: readonly TemplateMeta[] };

// Groups follow the category order; categories without demos are left out.
export function groupDemosByCategory(
  demos: readonly TemplateMeta[],
  categories: readonly Category[],
): DemoGroup[] {
  return categories
    .map((category) => ({ category, demos: demos.filter((demo) => demo.category === category.slug) }))
    .filter((group) => group.demos.length > 0);
}

export function filterByCategory(groups: readonly DemoGroup[], slug: CategorySlug | undefined): DemoGroup[] {
  if (!slug) return [...groups];
  return groups.filter((group) => group.category.slug === slug);
}
