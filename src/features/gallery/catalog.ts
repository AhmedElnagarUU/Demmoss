import type { CategorySlug } from "./categories";
import { fineDiningMeta } from "@/features/template-restaurant/variants/fine-dining/meta";
import { fastFoodMeta } from "@/features/template-restaurant/variants/fast-food/meta";
import type { TemplateMeta } from "./types";

// Each template variant adds its meta here when it is built.
const catalog: readonly TemplateMeta[] = [fineDiningMeta, fastFoodMeta];

export function getAllDemos(): readonly TemplateMeta[] {
  return catalog;
}

export function getDemosByCategory(category: CategorySlug): readonly TemplateMeta[] {
  return catalog.filter((demo) => demo.category === category);
}
