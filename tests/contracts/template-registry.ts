import type { z } from "zod";
import type { DemoData } from "@/features/demo-engine/storage/restore";

// The template contract test (template-contract.test.ts) checks every variant in the gallery catalog.
// To check a new variant, add one line here: its slug and a loader for what the contract needs.
// A variant listed in the catalog but missing here fails the test, so a template cannot skip the contract.
export type TemplateParts = {
  // the Zustand store hook (read through its persist API only)
  store: {
    persist: { getOptions: () => { name?: string; version?: number } };
    getState: () => DemoData & { setAccount: (account: DemoData["account"]) => void; resetDemo: () => void };
  };
  schema: z.ZodType<DemoData>;
  createSeed: (now: Date) => DemoData;
};

export const templateRegistry: Record<string, () => Promise<TemplateParts>> = {
  "restaurant-fine-dining": async () => {
    const { fineDiningSchema } = await import("@/features/template-restaurant/variants/fine-dining/data");
    const { createFineDiningSeed } = await import("@/features/template-restaurant/variants/fine-dining/seed");
    const { useFineDiningStore } = await import("@/features/template-restaurant/variants/fine-dining/store");
    return { store: useFineDiningStore, schema: fineDiningSchema, createSeed: createFineDiningSeed };
  },
  "restaurant-fast-food": async () => {
    const { fastFoodSchema } = await import("@/features/template-restaurant/variants/fast-food/data");
    const { createFastFoodSeed } = await import("@/features/template-restaurant/variants/fast-food/seed");
    const { useFastFoodStore } = await import("@/features/template-restaurant/variants/fast-food/store");
    return { store: useFastFoodStore, schema: fastFoodSchema, createSeed: createFastFoodSeed };
  },
  "real-estate-agency": async () => {
    const { agencySchema } = await import("@/features/template-real-estate/variants/agency/data");
    const { createAgencySeed } = await import("@/features/template-real-estate/variants/agency/seed");
    const { useAgencyStore } = await import("@/features/template-real-estate/variants/agency/store");
    return { store: useAgencyStore, schema: agencySchema, createSeed: createAgencySeed };
  },
  "real-estate-developer": async () => {
    const { realEstateDataSchema } = await import("@/features/template-real-estate/types");
    const { createDeveloperSeed } = await import("@/features/template-real-estate/variants/developer/seed");
    const { useDeveloperStore } = await import("@/features/template-real-estate/variants/developer/store");
    return { store: useDeveloperStore, schema: realEstateDataSchema, createSeed: createDeveloperSeed };
  },
  "logistics-freight": async () => {
    const { freightSchema } = await import("@/features/template-logistics/variants/freight/data");
    const { createFreightSeed } = await import("@/features/template-logistics/variants/freight/seed");
    const { useFreightStore } = await import("@/features/template-logistics/variants/freight/store");
    return { store: useFreightStore, schema: freightSchema, createSeed: createFreightSeed };
  },
  "logistics-warehousing": async () => {
    const { warehousingSchema } = await import("@/features/template-logistics/variants/warehousing/data");
    const { createWarehousingSeed } = await import("@/features/template-logistics/variants/warehousing/seed");
    const { useWarehousingStore } = await import("@/features/template-logistics/variants/warehousing/store");
    return { store: useWarehousingStore, schema: warehousingSchema, createSeed: createWarehousingSeed };
  },
};
