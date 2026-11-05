import { describe, expect, it } from "vitest";
import { readOrCreateVisitorId, sourceOfFirstVisit, VISITOR_ID_KEY } from "./visitor";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
  };
}

describe("T1: a visitor is counted once (anonymous id in the browser)", () => {
  it("creates the id on the first visit and reuses it afterwards", () => {
    const storage = memoryStorage();
    let created = 0;
    const createId = () => `id-${++created}`;

    expect(readOrCreateVisitorId(storage, createId)).toEqual({ visitorId: "id-1", isNew: true });
    expect(readOrCreateVisitorId(storage, createId)).toEqual({ visitorId: "id-1", isNew: false });
    expect(storage.getItem(VISITOR_ID_KEY)).toBe("id-1");
  });
});

describe("T1: where visitors come from (first visit)", () => {
  it("reads the campaign from UTM parameters and keeps an external referrer", () => {
    const source = sourceOfFirstVisit(
      "https://agency.example/ar?utm_source=instagram&utm_medium=social&utm_campaign=ramadan",
      "https://l.instagram.com/",
    );
    expect(source).toEqual({
      utmSource: "instagram",
      utmMedium: "social",
      utmCampaign: "ramadan",
      referrer: "https://l.instagram.com/",
    });
  });

  it("ignores navigation inside our own site", () => {
    expect(sourceOfFirstVisit("https://agency.example/en/demos", "https://agency.example/en")).toEqual({});
  });
});
