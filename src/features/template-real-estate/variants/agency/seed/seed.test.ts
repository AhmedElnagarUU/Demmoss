import { describe, expect, it } from "vitest";
import { waitingInquiryFacts, waitingViewingFacts, hotPropertyFacts } from "../../../value-tips";
import { agencyAreas } from "../areas";
import { agencySchema } from "../data";
import { agencyPhotos } from "../photos";
import { createAgencySeed } from ".";

const arabicLetters = /[؀-ۿ]/;
const morning = new Date(2026, 10, 4, 0, 30);
const evening = new Date(2026, 10, 4, 23, 59);

describe("Hartwell & Co. Realty seed", () => {
  it("is valid for the store schema, at any time of the day", () => {
    expect(agencySchema.safeParse(createAgencySeed(morning)).success).toBe(true);
    expect(agencySchema.safeParse(createAgencySeed(evening)).success).toBe(true);
  });

  it("RE7: starts with sample activity so the dashboard is never empty", () => {
    const seed = createAgencySeed(evening);
    expect(seed.properties).toHaveLength(8);
    expect(seed.properties.filter((property) => property.purpose === "rent")).toHaveLength(3);
    expect(seed.viewings).toHaveLength(6);
    expect(seed.inquiries).toHaveLength(4);
    expect(seed.agents).toHaveLength(4);
    expect(new Set(seed.viewings.map((viewing) => viewing.status)).size).toBeGreaterThanOrEqual(4);
    expect(seed.account).toBeNull();
  });

  it("sample requests are never created in the future", () => {
    for (const now of [morning, evening]) {
      const seed = createAgencySeed(now);
      for (const entry of [...seed.viewings, ...seed.inquiries]) {
        expect(new Date(entry.createdAt).getTime()).toBeLessThan(now.getTime());
      }
    }
  });

  it("every photo, area, agent, and property reference points to something that exists", () => {
    const seed = createAgencySeed(morning);
    const photoIds = agencyPhotos.map((photo) => photo.id);
    const areaIds = agencyAreas.map((area) => area.id);
    for (const property of seed.properties) {
      expect(areaIds).toContain(property.area);
      expect(property.units).toEqual([]);
      for (const photo of property.photos) expect(photoIds).toContain(photo);
      expect(seed.agents.map((agent) => agent.id)).toContain(property.agentId);
    }
    for (const agent of seed.agents) {
      expect(agencyPhotos.find((photo) => photo.id === agent.photo)?.portrait).toBe(true);
    }
    const propertyIds = seed.properties.map((property) => property.id);
    for (const entry of [...seed.viewings, ...seed.inquiries]) {
      if (entry.propertyId) expect(propertyIds).toContain(entry.propertyId);
    }
  });

  it("RE12: the sample data already gives value tips", () => {
    const seed = createAgencySeed(morning);
    expect(waitingViewingFacts(seed.viewings, morning).length).toBeGreaterThan(0);
    expect(waitingInquiryFacts(seed.inquiries, morning).length).toBeGreaterThan(0);
    expect(hotPropertyFacts(seed.viewings, seed.properties).length).toBeGreaterThan(0);
  });

  it("mirrors the source design: its business, its eight listings and its four agents", () => {
    const seed = createAgencySeed(morning);
    expect(seed.settings.businessName.en).toBe("Hartwell & Co. Realty");
    expect(seed.properties.map((property) => property.title.en)).toEqual([
      "14 Alder Lane, Riverside",
      "8 Quay Street, Harbour District",
      "3 Cypress Court, Hillcrest",
      "27 Mill Yard, Old Town",
      "61 Birch Road, Riverside",
      "9 Laurel Heights, Hillcrest",
      "102 Dock Lofts, Harbour District",
      "40 Orchard Close, Old Town",
    ]);
    expect(seed.agents.map((agent) => agent.name.en)).toEqual([
      "Edward Hartwell",
      "James Calloway",
      "Matteo Marchetti",
      "Marcus Bell",
    ]);
    expect(seed.testimonials).toHaveLength(3);
  });

  it("has real Arabic and English content", () => {
    const seed = createAgencySeed(morning);
    for (const property of seed.properties) {
      expect(property.title.ar).toMatch(arabicLetters);
      expect(property.title.en).not.toMatch(arabicLetters);
      expect(property.description.ar).toMatch(arabicLetters);
    }
    expect(seed.settings.businessName.ar).toMatch(arabicLetters);
  });
});
