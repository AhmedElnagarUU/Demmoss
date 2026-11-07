import { describe, expect, it } from "vitest";
import { dateKeyFromNow } from "@/features/demo-engine/format/dates";
import { afterHoursFacts } from "../../../value-tips";
import { fineDiningSchema } from "../data";
import { createFineDiningSeed } from ".";

const arabicLetters = /[؀-ۿ]/;
const morning = new Date(2026, 10, 4, 0, 30);
const evening = new Date(2026, 10, 4, 23, 59);

describe("Verdant Table seed", () => {
  it("is valid for the store schema, at any time of the day", () => {
    expect(fineDiningSchema.safeParse(createFineDiningSeed(morning)).success).toBe(true);
    expect(fineDiningSchema.safeParse(createFineDiningSeed(evening)).success).toBe(true);
  });

  it("R2: starts with sample activity so the dashboard is never empty", () => {
    const seed = createFineDiningSeed(evening);
    expect(seed.reservations).toHaveLength(8);
    expect(seed.eventRequests).toHaveLength(2);
    expect(seed.reviews).toHaveLength(6);
    expect(new Set(seed.reservations.map((reservation) => reservation.status)).size).toBeGreaterThanOrEqual(
      4,
    );
    expect(seed.reservations.filter((reservation) => reservation.occasion)).toHaveLength(2);
    expect(seed.account).toBeNull();
  });

  it("sample dates are relative to today and never in the future when created", () => {
    for (const now of [morning, evening]) {
      const seed = createFineDiningSeed(now);
      const tomorrow = seed.reservations.find((reservation) => reservation.id === "res-5");
      expect(tomorrow?.date).toBe(dateKeyFromNow(now, 1));
      for (const entry of [...seed.reservations, ...seed.eventRequests]) {
        expect(new Date(entry.createdAt).getTime()).toBeLessThan(now.getTime());
      }
    }
  });

  it("R6: the sample data already contains a request that came while closed", () => {
    const seed = createFineDiningSeed(morning);
    expect(afterHoursFacts(seed.reservations, seed.settings.hours).length).toBeGreaterThan(0);
  });

  it("every reservation slot is inside the opening hours", () => {
    const seed = createFineDiningSeed(morning);
    for (const slot of seed.reservationSettings.slots) {
      expect(slot >= "11:00" && slot < "23:30").toBe(true);
    }
  });

  it("R4: the menu has the planned courses, each dish in real Arabic and English", () => {
    const { menu } = createFineDiningSeed(morning);
    expect(menu.categories.map((category) => category.id)).toEqual(["small", "mains", "garden", "desserts"]);
    for (const category of menu.categories) {
      expect(menu.items.some((item) => item.categoryId === category.id)).toBe(true);
    }
    for (const item of menu.items) {
      expect(menu.categories.some((category) => category.id === item.categoryId)).toBe(true);
      expect(item.name.en.length).toBeGreaterThan(0);
      expect(item.name.ar).toMatch(arabicLetters);
      expect(item.description.ar).toMatch(arabicLetters);
      expect(item.description.en).not.toMatch(arabicLetters);
      expect(item.price).toBeGreaterThan(0);
    }
    expect(menu.items.filter((item) => item.featured).length).toBeGreaterThanOrEqual(3);
  });

  it("the site content is written in both languages", () => {
    const { content, settings } = createFineDiningSeed(morning);
    expect(content.hero.title.ar).toMatch(arabicLetters);
    expect(content.hero.title.en).not.toMatch(arabicLetters);
    expect(content.experience.points).toHaveLength(3);
    expect(settings.businessName).toEqual({ ar: "فيردانت تيبل", en: "Verdant Table" });
  });

  it("R4: the three signature dishes are the featured ones of the source design", () => {
    const { menu } = createFineDiningSeed(morning);
    expect(
      menu.items
        .filter((item) => item.featured)
        .map((item) => item.id)
        .sort(),
    ).toEqual(["fire-roasted-lamb", "garden-harvest-salad", "saffron-tagliolini"]);
  });
});
