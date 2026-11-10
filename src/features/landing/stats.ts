import type { TemplateMeta } from "@/features/gallery/types";

type DemoSummary = Pick<TemplateMeta, "category">;

export function landingStats(demos: readonly DemoSummary[]): { demoCount: number; categoryCount: number } {
  return {
    demoCount: demos.length,
    categoryCount: new Set(demos.map((demo) => demo.category)).size,
  };
}
