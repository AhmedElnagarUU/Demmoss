import { describe, expect, it } from "vitest";
import { orderTotals } from "../../../modules/orders/totals";
import { allowedOrderStatuses } from "../../../modules/orders/status";
import { afterHoursFacts } from "../../../value-tips";
import { fastFoodSchema } from "../data";
import { fastFoodPhotos } from "../photos";
import { createFastFoodSeed } from ".";

const arabicLetters = /[؀-ۿ]/;
const morning = new Date(2026, 10, 4, 0, 30);
const evening = new Date(2026, 10, 4, 23, 59);

describe("Smash Lab seed", () => {
  it("is valid for the store schema, at any time of the day", () => {
    expect(fastFoodSchema.safeParse(createFastFoodSeed(morning)).success).toBe(true);
    expect(fastFoodSchema.safeParse(createFastFoodSeed(evening)).success).toBe(true);
  });

  it("R2: starts with sample orders, offers, areas, and reviews so the dashboard is never empty", () => {
    const seed = createFastFoodSeed(evening);
    expect(seed.orders).toHaveLength(10);
    expect(new Set(seed.orders.map((order) => order.status)).size).toBeGreaterThanOrEqual(5);
    expect(seed.offers).toHaveLength(3);
    expect(seed.offers.filter((offer) => offer.active)).toHaveLength(2);
    expect(seed.areas).toHaveLength(4);
    expect(seed.reviews).toHaveLength(6);
    expect(seed.cart).toEqual([]);
    expect(seed.account).toBeNull();
  });

  it("sample orders are never in the future and numbers are unique", () => {
    for (const now of [morning, evening]) {
      const seed = createFastFoodSeed(now);
      for (const order of seed.orders)
        expect(new Date(order.createdAt).getTime()).toBeLessThan(now.getTime());
      expect(new Set(seed.orders.map((order) => order.number)).size).toBe(seed.orders.length);
    }
  });

  it("every sample order adds up and has a status that fits its type", () => {
    for (const order of createFastFoodSeed(evening).orders) {
      const area = createFastFoodSeed(evening).areas.find((item) => item.id === order.areaId);
      expect(orderTotals(order.lines, order.type, area)).toEqual({
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
      });
      if (order.type === "pickup") expect(order.status).not.toBe("out_for_delivery");
      if (order.type === "delivery") expect(order.status).not.toBe("ready");
      expect(order.type === "delivery" ? Boolean(order.areaId && order.address) : !order.areaId).toBe(true);
      expect(allowedOrderStatuses(order.status, order.type)).toBeDefined();
    }
  });

  it("R6: the sample data already contains an order that came while closed", () => {
    const seed = createFastFoodSeed(morning);
    expect(afterHoursFacts(seed.orders, seed.settings.hours).length).toBeGreaterThan(0);
  });

  it("R4: the menu has the planned categories, each dish in real Arabic and English, with a listed photo", () => {
    const { menu } = createFastFoodSeed(morning);
    expect(menu.categories.map((category) => category.id)).toEqual(["burgers", "sides", "shakes", "kids"]);
    const photoIds = new Set(fastFoodPhotos.map((photo) => photo.id));
    for (const item of menu.items) {
      expect(menu.categories.some((category) => category.id === item.categoryId)).toBe(true);
      expect(item.name.ar).toMatch(arabicLetters);
      expect(item.description.ar).toMatch(arabicLetters);
      expect(item.description.en).not.toMatch(arabicLetters);
      expect(item.price).toBeGreaterThan(0);
      expect(photoIds.has(item.image)).toBe(true);
    }
    expect(menu.items.filter((item) => item.featured).length).toBeGreaterThanOrEqual(3);
  });

  it("offers and content use listed photos and are written in both languages", () => {
    const seed = createFastFoodSeed(morning);
    const photoIds = new Set(fastFoodPhotos.map((photo) => photo.id));
    for (const offer of seed.offers) {
      expect(photoIds.has(offer.image)).toBe(true);
      expect(offer.title.ar).toMatch(arabicLetters);
    }
    expect(photoIds.has(seed.content.hero.image)).toBe(true);
    expect(photoIds.has(seed.content.about.image)).toBe(true);
    expect(seed.content.experience.points).toHaveLength(3);
    expect(seed.settings.businessName).toEqual({ ar: "سماش لاب", en: "Smash Lab" });
    expect(seed.settings.currency).toBe("SAR");
  });
});
