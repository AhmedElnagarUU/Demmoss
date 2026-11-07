import { describe, expect, it } from "vitest";
import { propertyState } from "../../../availability";
import { realEstateDataSchema } from "../../../types";
import { lastUnitFacts, waitingViewingFacts } from "../../../value-tips";
import { developerAreas } from "../areas";
import { developerPhotos } from "../photos";
import { createDeveloperSeed } from ".";
import { seedTeam } from "./content";

const arabicLetters = /[؀-ۿ]/;
const morning = new Date(2026, 10, 4, 0, 30);
const evening = new Date(2026, 10, 4, 23, 59);

describe("Solenne Estates seed", () => {
  it("is valid for the store schema, at any time of the day", () => {
    expect(realEstateDataSchema.safeParse(createDeveloperSeed(morning)).success).toBe(true);
    expect(realEstateDataSchema.safeParse(createDeveloperSeed(evening)).success).toBe(true);
  });

  it("RE6: has six residences with units in every state", () => {
    const seed = createDeveloperSeed(morning);
    expect(seed.properties).toHaveLength(6);
    const states = new Set(seed.properties.map(propertyState));
    expect(states).toEqual(new Set(["available", "reserved"]));
    const unitStates = new Set(
      seed.properties.flatMap((property) => property.units.map((unit) => unit.status)),
    );
    expect(unitStates).toEqual(new Set(["available", "reserved", "sold"]));
    expect(seed.viewings.length).toBeGreaterThanOrEqual(5);
    expect(seed.account).toBeNull();
  });

  it("sample requests are never created in the future", () => {
    for (const now of [morning, evening]) {
      const seed = createDeveloperSeed(now);
      for (const entry of [...seed.viewings, ...seed.inquiries]) {
        expect(new Date(entry.createdAt).getTime()).toBeLessThan(now.getTime());
      }
    }
  });

  it("every photo, area, and unit reference points to something that exists", () => {
    const seed = createDeveloperSeed(morning);
    const photoIds = developerPhotos.map((photo) => photo.id);
    for (const property of seed.properties) {
      expect(developerAreas.map((area) => area.id)).toContain(property.area);
      for (const photo of property.photos) expect(photoIds).toContain(photo);
    }
    for (const member of seedTeam) expect(photoIds).toContain(member.photo);
    for (const entry of [...seed.viewings, ...seed.inquiries]) {
      if (!entry.unitId) continue;
      const owner = seed.properties.find((property) => property.id === entry.propertyId);
      expect(owner?.units.map((unit) => unit.id)).toContain(entry.unitId);
    }
  });

  it("RE12: the sample data already gives value tips", () => {
    const seed = createDeveloperSeed(morning);
    expect(lastUnitFacts(seed.properties).length).toBeGreaterThan(0);
    expect(waitingViewingFacts(seed.viewings, morning).length).toBeGreaterThan(0);
  });

  it("has real Arabic and English content", () => {
    const seed = createDeveloperSeed(morning);
    for (const property of seed.properties) {
      expect(property.title.ar).toMatch(arabicLetters);
      expect(property.title.en).not.toMatch(arabicLetters);
    }
  });
});
