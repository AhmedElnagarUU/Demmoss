import type { CategorySlug } from "./categories";
import type { TemplateMeta } from "./types";

// Each template variant adds its meta here when it is built.
const catalog: readonly TemplateMeta[] = [];

export function getAllDemos(): readonly TemplateMeta[] {
  return catalog;
}

export function getDemosByCategory(category: CategorySlug): readonly TemplateMeta[] {
  return catalog.filter((demo) => demo.category === category);
}
