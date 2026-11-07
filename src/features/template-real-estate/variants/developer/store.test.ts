import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeStorage } from "../../../../../tests/helpers/storage";

const storage = createFakeStorage();
vi.stubGlobal("window", { localStorage: storage });
const { useDeveloperStore } = await import("./store");
const { propertyState, unitCounts } = await import("../../availability");

const account = { name: "Sara", passwordHash: "a".repeat(64) };
const store = () => useDeveloperStore.getState();
const residence = (id: string) => {
  const found = store().properties.find((property) => property.id === id);
  if (!found) throw new Error(`missing ${id}`);
  return found;
};

beforeEach(() => {
  storage.clear();
  store().resetDemo();
  store().setAccount(null);
});

describe("RE11: unit availability edited in the dashboard", () => {
  it("setting the last free unit to reserved makes the residence reserved, then sold makes it sold out", () => {
    expect(propertyState(residence("skyline-penthouse"))).toBe("available");
    store().setUnitStatus("skyline-penthouse", "sp-1", "reserved");
    expect(propertyState(residence("skyline-penthouse"))).toBe("reserved");
    store().setUnitStatus("skyline-penthouse", "sp-1", "sold");
    store().setUnitStatus("skyline-penthouse", "sp-2", "sold");
    expect(propertyState(residence("skyline-penthouse"))).toBe("sold_out");
  });

  it("freeing a unit makes a sold out residence available again", () => {
    store().setUnitStatus("skyline-penthouse", "sp-1", "sold");
    store().setUnitStatus("skyline-penthouse", "sp-2", "sold");
    store().setUnitStatus("skyline-penthouse", "sp-2", "available");
    expect(unitCounts(residence("skyline-penthouse").units).available).toBe(1);
    expect(propertyState(residence("skyline-penthouse"))).toBe("available");
  });

  it("adds, reprices, and removes a unit of one residence only", () => {
    const other = residence("cedar-hollow-villa").units.length;
    const id = store().addUnit("driftline-residence", {
      label: "D-05",
      floor: 0,
      size: 470,
      price: 3_900_000,
      status: "available",
    });
    expect(residence("driftline-residence").units.at(-1)).toMatchObject({ id, label: "D-05" });
    store().updateUnit("driftline-residence", id, { price: 3_850_000 });
    expect(residence("driftline-residence").units.at(-1)?.price).toBe(3_850_000);
    store().removeUnit("driftline-residence", id);
    expect(residence("driftline-residence").units.some((unit) => unit.id === id)).toBe(false);
    expect(residence("cedar-hollow-villa").units).toHaveLength(other);
  });

  it("removing a residence removes its units with it", () => {
    store().removeProperty("cedar-hollow-villa");
    expect(store().properties.some((property) => property.units.some((unit) => unit.id === "ch-1"))).toBe(
      false,
    );
  });

  it("reset restores the seed units and keeps the account", () => {
    store().setAccount(account);
    store().setUnitStatus("cedar-hollow-villa", "ch-1", "sold");
    store().resetDemo();
    expect(residence("cedar-hollow-villa").units.find((unit) => unit.id === "ch-1")?.status).toBe(
      "available",
    );
    expect(store().account).toEqual(account);
  });
});

describe("RE3: viewing of a unit", () => {
  it("keeps the chosen unit with the viewing request", () => {
    const id = store().addViewing({
      propertyId: "cedar-hollow-villa",
      unitId: "ch-2",
      name: "Nada",
      phone: "966500000009",
      date: "2026-11-10",
      time: "12:00",
    });
    expect(store().viewings[0]).toMatchObject({ id, unitId: "ch-2", status: "new" });
  });
});
