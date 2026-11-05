import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeStorage } from "../../../../../tests/helpers/storage";
import { calculateFreight } from "../../modules/rates/calculator";
import { currentStatus } from "../../modules/shipments/status";
import { stuckShipmentFacts } from "../../modules/shipments/tips";
import { findShipment } from "../../modules/shipments/tracking";
import { afterHoursFacts, staleQuoteFacts } from "../../value-tips";

// The store reads window.localStorage when it is created, so a fake one is installed first.
const storage = createFakeStorage();
vi.stubGlobal("window", { localStorage: storage });
const { useFreightStore, FREIGHT_VERSION } = await import("./store");
const { createFreightSeed } = await import("./seed");
const { freightSchema } = await import("./data");

const state = () => useFreightStore.getState();
const account = { name: "Sara", passwordHash: "a".repeat(64), businessName: "Dar Sara" };

beforeEach(() => {
  storage.clear();
  state().resetDemo();
  state().setAccount(null);
});

describe("seed", () => {
  it("is valid, has unique tracking numbers and quote ids, and a version", () => {
    const seed = createFreightSeed(new Date());
    expect(freightSchema.safeParse(seed).success).toBe(true);
    expect(new Set(seed.shipments.map((s) => s.trackingNumber)).size).toBe(seed.shipments.length);
    expect(new Set(seed.quotes.map((q) => q.id)).size).toBe(seed.quotes.length);
    expect(FREIGHT_VERSION).toBeGreaterThanOrEqual(1);
  });

  it("its sample quote estimates are what the calculator gives with the seed rates", () => {
    const seed = createFreightSeed(new Date());
    for (const quote of seed.quotes) {
      const estimate = quote.estimate;
      if (estimate?.kind !== "freight") continue;
      const origin = seed.rates.origins.find((o) => o.name.en === estimate.origin.en);
      const destination = seed.rates.destinations.find((d) => d.name.en === estimate.destination.en);
      const result = calculateFreight(seed.rates, {
        mode: estimate.mode,
        originId: origin?.id ?? "",
        destinationId: destination?.id ?? "",
        weightKg: estimate.weightKg,
        volumeCbm: estimate.volumeCbm,
      });
      expect([result?.minCost, result?.maxCost]).toEqual([estimate.minCost, estimate.maxCost]);
    }
  });

  it("L11: shows the sample tips (a night quote, a waiting quote, a shipment stuck in customs)", () => {
    const seed = createFreightSeed(new Date());
    expect(afterHoursFacts(seed.quotes, seed.settings).length).toBeGreaterThan(0);
    expect(staleQuoteFacts(seed.quotes, new Date()).length).toBeGreaterThan(0);
    expect(stuckShipmentFacts(seed.shipments, new Date()).map((f) => f.label)).toEqual(["JC-48190"]);
  });
});

describe("L2, L3: quotes", () => {
  const input = {
    name: "  Nada ",
    company: "",
    phone: "+966 50 000 0009",
    email: "",
    service: "air" as const,
    message: "",
    estimate: null,
  };

  it("a new quote arrives first, trimmed, with status new", () => {
    const id = state().addQuote(input);
    expect(state().quotes[0]).toMatchObject({ id, name: "Nada", status: "new" });
  });

  it("status follows new → quoted → won and ignores a forbidden jump", () => {
    const id = state().addQuote(input);
    state().setQuoteStatus(id, "won");
    expect(state().quotes[0]?.status).toBe("new");
    state().setQuoteStatus(id, "quoted");
    state().setQuoteStatus(id, "won");
    expect(state().quotes[0]?.status).toBe("won");
    state().setQuoteStatus(id, "lost");
    expect(state().quotes[0]?.status).toBe("won");
  });
});

describe("L4, L5: shipments", () => {
  it("moving a shipment adds an event that the tracking lookup shows", () => {
    const before = findShipment(state().shipments, "jc-48213");
    expect(before && currentStatus(before)).toBe("in_transit");
    state().moveShipmentStatus(before?.id ?? "", "customs", "Documents received");
    const after = findShipment(state().shipments, "JC-48213");
    expect(after && currentStatus(after)).toBe("customs");
    expect(after?.events.at(-1)?.note).toBe("Documents received");
  });

  it("a delivered shipment cannot move back", () => {
    state().moveShipmentStatus("ship-6", "booked");
    const delivered = findShipment(state().shipments, "JC-48107");
    expect(delivered && currentStatus(delivered)).toBe("delivered");
    expect(delivered?.events).toHaveLength(6);
  });

  it("adding a shipment gives the next tracking number, status booked", () => {
    state().addShipment({
      customer: " Noor ",
      origin: { ar: "شنغهاي", en: "Shanghai" },
      destination: { ar: "جدة", en: "Jeddah" },
      mode: "air",
      cargo: "Phones",
      eta: new Date().toISOString(),
    });
    expect(state().shipments[0]).toMatchObject({ trackingNumber: "JC-48245", customer: "Noor" });
    const added = state().shipments[0];
    expect(added && currentStatus(added)).toBe("booked");
  });
});

describe("L6: rates and reset", () => {
  it("updating a mode rate keeps the other modes", () => {
    state().updateModeRate("air", { ratePerKg: 20 });
    expect(state().rates.modes.find((m) => m.mode === "air")?.ratePerKg).toBe(20);
    expect(state().rates.modes.find((m) => m.mode === "sea")?.ratePerKg).toBe(1.2);
  });

  it("reset restores the seed and keeps the account; editing the name in settings marks it edited", () => {
    state().setAccount(account);
    state().updateSettings({ businessName: { ar: "س", en: "S" } });
    expect(state().settings.nameEdited).toBe(true);
    state().updateModeRate("air", { ratePerKg: 20 });
    state().resetDemo();
    expect(state().account).toEqual(account);
    expect(state().settings.nameEdited).toBe(false);
    expect(state().rates.modes.find((m) => m.mode === "air")?.ratePerKg).toBe(16);
  });
});
