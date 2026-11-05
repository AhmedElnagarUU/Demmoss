import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeStorage } from "../../../../../tests/helpers/storage";
import { estimateStorage } from "../../modules/storage-rates/estimator";
import { fullWarehouseFacts, freePallets } from "../../modules/warehouses/availability";
import { afterHoursFacts } from "../../value-tips";

// The store reads window.localStorage when it is created, so a fake one is installed first.
const storage = createFakeStorage();
vi.stubGlobal("window", { localStorage: storage });
const { useWarehousingStore, WAREHOUSING_VERSION } = await import("./store");
const { createWarehousingSeed } = await import("./seed");
const { warehousingSchema } = await import("./data");

const state = () => useWarehousingStore.getState();

beforeEach(() => {
  storage.clear();
  state().resetDemo();
  state().setAccount(null);
});

describe("seed", () => {
  it("is valid and has a version", () => {
    expect(warehousingSchema.safeParse(createWarehousingSeed(new Date())).success).toBe(true);
    expect(WAREHOUSING_VERSION).toBeGreaterThanOrEqual(1);
  });

  it("L8: its sample estimates are what the estimator gives with the seed rates", () => {
    const seed = createWarehousingSeed(new Date());
    for (const quote of seed.quotes) {
      const estimate = quote.estimate;
      if (estimate?.kind !== "storage") continue;
      const result = estimateStorage(seed.storageRates, estimate);
      expect(result?.monthlyTotal).toBe(estimate.monthlyTotal);
    }
  });

  it("L11: shows the sample tips (a night quote and an almost full warehouse)", () => {
    const seed = createWarehousingSeed(new Date());
    expect(afterHoursFacts(seed.quotes, seed.settings).length).toBeGreaterThan(0);
    expect(fullWarehouseFacts(seed.warehouses).map((f) => f.label)).toEqual([
      { ar: "مركز الرياض", en: "Riyadh Hub" },
    ]);
  });
});

describe("L8: a quote keeps the estimator values", () => {
  it("stores pallets, months, picking and the monthly total with the quote", () => {
    const estimate = {
      kind: "storage" as const,
      pallets: 40,
      months: 6,
      ordersPerMonth: 300,
      insurance: false,
      monthlyTotal: 2598.4,
    };
    const id = state().addQuote({
      name: "Nada",
      company: "",
      phone: "+966 50 000 0009",
      email: "",
      service: "storage_picking",
      message: "",
      estimate,
    });
    expect(state().quotes[0]).toMatchObject({ id, status: "new", estimate });
  });
});

describe("L9, L10: warehouses, rates, case studies", () => {
  it("L9: editing occupied pallets changes the free spots the site shows", () => {
    const free = () =>
      freePallets(
        state().warehouses.find((w) => w.id === "riyadh") ?? { capacityPallets: 0, occupiedPallets: 0 },
      );
    expect(free()).toBe(340);
    state().updateWarehouse("riyadh", { occupiedPallets: 1000 });
    expect(free()).toBe(3200);
  });

  it("changed storage rates change the estimate", () => {
    const input = { pallets: 40, months: 3, ordersPerMonth: 0, insurance: false };
    const before = estimateStorage(state().storageRates, input)?.monthlyTotal;
    state().updateStorageRates({ palletPerMonth: 50 });
    const after = estimateStorage(state().storageRates, input)?.monthlyTotal;
    expect(before).toBe(1670);
    expect(after).toBe(2150);
  });

  it("L10: a case study can be added, hidden and removed", () => {
    const id = state().addCaseStudy({
      sector: { ar: "أ", en: "A" },
      title: { ar: "ب", en: "B" },
      text: { ar: "ج", en: "C" },
      metricValue: "-10%",
      metricLabel: { ar: "د", en: "D" },
      visible: true,
    });
    expect(state().caseStudies).toHaveLength(4);
    state().updateCaseStudy(id, { visible: false });
    expect(state().caseStudies.find((c) => c.id === id)?.visible).toBe(false);
    state().removeCaseStudy(id);
    expect(state().caseStudies).toHaveLength(3);
  });

  it("reset keeps the account", () => {
    const account = { name: "Sara", passwordHash: "a".repeat(64) };
    state().setAccount(account);
    state().updateStorageRates({ palletPerMonth: 99 });
    state().resetDemo();
    expect(state().account).toEqual(account);
    expect(state().storageRates.palletPerMonth).toBe(38);
  });
});
