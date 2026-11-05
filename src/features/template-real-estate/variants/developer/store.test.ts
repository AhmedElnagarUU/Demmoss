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
    expect(propertyState(residence("shati-sky-residence"))).toBe("available");
    store().setUnitStatus("shati-sky-residence", "sk-1", "reserved");
    expect(propertyState(residence("shati-sky-residence"))).toBe("reserved");
    store().setUnitStatus("shati-sky-residence", "sk-1", "sold");
    store().setUnitStatus("shati-sky-residence", "sk-2", "sold");
    expect(propertyState(residence("shati-sky-residence"))).toBe("sold_out");
  });

  it("freeing a unit makes a sold out residence available again", () => {
    store().setUnitStatus("shati-sky-residence", "sk-1", "sold");
    store().setUnitStatus("shati-sky-residence", "sk-2", "sold");
    store().setUnitStatus("shati-sky-residence", "sk-2", "available");
    expect(unitCounts(residence("shati-sky-residence").units).available).toBe(1);
    expect(propertyState(residence("shati-sky-residence"))).toBe("available");
  });

  it("adds, reprices, and removes a unit of one residence only", () => {
    const other = residence("hada-ridge-villa").units.length;
    const id = store().addUnit("obhur-driftline", {
      label: "D-05",
      floor: 0,
      size: 470,
      price: 3_900_000,
      status: "available",
    });
    expect(residence("obhur-driftline").units.at(-1)).toMatchObject({ id, label: "D-05" });
    store().updateUnit("obhur-driftline", id, { price: 3_850_000 });
    expect(residence("obhur-driftline").units.at(-1)?.price).toBe(3_850_000);
    store().removeUnit("obhur-driftline", id);
    expect(residence("obhur-driftline").units.some((unit) => unit.id === id)).toBe(false);
    expect(residence("hada-ridge-villa").units).toHaveLength(other);
  });

  it("removing a residence removes its units with it", () => {
    store().removeProperty("hada-ridge-villa");
    expect(store().properties.some((property) => property.units.some((unit) => unit.id === "hr-1"))).toBe(
      false,
    );
  });

  it("reset restores the seed units and keeps the account", () => {
    store().setAccount(account);
    store().setUnitStatus("hada-ridge-villa", "hr-1", "sold");
    store().resetDemo();
    expect(residence("hada-ridge-villa").units.find((unit) => unit.id === "hr-1")?.status).toBe("available");
    expect(store().account).toEqual(account);
  });
});

describe("RE3: viewing of a unit", () => {
  it("keeps the chosen unit with the viewing request", () => {
    const id = store().addViewing({
      propertyId: "hada-ridge-villa",
      unitId: "hr-2",
      name: "Nada",
      phone: "966500000009",
      date: "2026-11-10",
      time: "12:00",
    });
    expect(store().viewings[0]).toMatchObject({ id, unitId: "hr-2", status: "new" });
  });
});
