import { describe, expect, it } from "vitest";
import { lastUnitProperties, propertyState, unitCounts } from "./availability";
import type { Property, Unit, UnitStatus } from "./types";

const unit = (id: string, status: UnitStatus): Unit => ({
  id,
  label: id,
  floor: 0,
  size: 100,
  price: 1_000_000,
  status,
});
const residence = (statuses: UnitStatus[]) => ({
  status: "available" as const,
  units: statuses.map((status, index) => unit(`u${index}`, status)),
});

describe("RE6, RE11: unit availability rules", () => {
  it("counts units by status", () => {
    expect(unitCounts(residence(["available", "reserved", "reserved", "sold"]).units)).toEqual({
      available: 1,
      reserved: 2,
      sold: 1,
      total: 4,
    });
  });

  it("a residence is available while any unit is available", () => {
    expect(propertyState(residence(["sold", "reserved", "available"]))).toBe("available");
  });

  it("with nothing free but some reserved units it is reserved", () => {
    expect(propertyState(residence(["sold", "reserved"]))).toBe("reserved");
  });

  it("when every unit is sold it is sold out", () => {
    expect(propertyState(residence(["sold", "sold"]))).toBe("sold_out");
  });

  it("a listing without units follows its own status", () => {
    expect(propertyState({ units: [], status: "available" })).toBe("available");
    expect(propertyState({ units: [], status: "reserved" })).toBe("reserved");
    expect(propertyState({ units: [], status: "closed" })).toBe("sold_out");
  });

  it("finds residences with exactly one free unit out of at least two", () => {
    const make = (id: string, statuses: UnitStatus[]) =>
      ({ id, ...residence(statuses) }) as unknown as Property;
    const found = lastUnitProperties([
      make("last", ["available", "sold"]),
      make("many", ["available", "available"]),
      make("single", ["available"]),
      make("none", ["sold", "sold"]),
    ]);
    expect(found.map((property) => property.id)).toEqual(["last"]);
  });
});
