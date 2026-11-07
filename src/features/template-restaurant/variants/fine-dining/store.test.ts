import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeStorage } from "../../../../../tests/helpers/storage";

// The store reads window.localStorage when it is created, so a fake one is installed first.
const storage = createFakeStorage();
vi.stubGlobal("window", { localStorage: storage });
const { useFineDiningStore, FINE_DINING_VERSION } = await import("./store");
const { createFineDiningSeed } = await import("./seed");

const account = { name: "Sara", passwordHash: "a".repeat(64), businessName: "Dar Sara" };
const actions = () => useFineDiningStore.getState();
const data = () => useFineDiningStore.getState();

const request = {
  date: "2026-11-10",
  time: "19:30",
  guests: 4,
  name: "  Nada  ",
  phone: "966500000009",
};

beforeEach(() => {
  storage.clear();
  actions().resetDemo();
  actions().setAccount(null);
});

describe("R2: reservations", () => {
  it("a new reservation arrives first with status new", () => {
    const id = actions().addReservation(request, new Date(2026, 10, 4, 12, 0));
    const first = data().reservations[0];
    expect(first).toMatchObject({ id, status: "new", name: "Nada", guests: 4, time: "19:30" });
    expect(data().reservations).toHaveLength(9);
  });

  it("status follows new → confirmed → seated and ignores a forbidden jump", () => {
    const id = actions().addReservation(request);
    actions().setReservationStatus(id, "seated");
    expect(data().reservations[0]?.status).toBe("new");
    actions().setReservationStatus(id, "confirmed");
    actions().setReservationStatus(id, "seated");
    expect(data().reservations[0]?.status).toBe("seated");
    actions().setReservationStatus(id, "confirmed");
    expect(data().reservations[0]?.status).toBe("seated");
  });

  it("a confirmed reservation can be marked no-show", () => {
    const id = actions().addReservation(request);
    actions().setReservationStatus(id, "confirmed");
    actions().setReservationStatus(id, "no_show");
    expect(data().reservations[0]?.status).toBe("no_show");
  });
});

describe("R2: event requests", () => {
  it("a request goes new → replied → booked, and cannot skip the reply", () => {
    const id = actions().addEventRequest({
      type: "birthday",
      date: "2026-12-01",
      guests: 15,
      name: "Maha",
      phone: "966500000010",
      details: "",
    });
    actions().setEventRequestStatus(id, "booked");
    expect(data().eventRequests[0]?.status).toBe("new");
    actions().setEventRequestStatus(id, "replied");
    actions().setEventRequestStatus(id, "booked");
    expect(data().eventRequests[0]?.status).toBe("booked");
  });
});

describe("R4: the owner edits the menu", () => {
  it("changing a dish in Arabic and English is kept", () => {
    actions().updateMenuItem("whipped-feta", {
      name: { ar: "فيتا بالعسل", en: "Honey feta" },
      price: 35,
    });
    expect(data().menu.items.find((item) => item.id === "whipped-feta")).toMatchObject({
      name: { ar: "فيتا بالعسل", en: "Honey feta" },
      price: 35,
    });
  });

  it("an unavailable dish stays in the menu but is marked unavailable", () => {
    actions().updateMenuItem("fire-roasted-lamb", { available: false });
    expect(data().menu.items.find((item) => item.id === "fire-roasted-lamb")?.available).toBe(false);
  });

  it("deleting a category deletes its dishes", () => {
    actions().removeMenuCategory("desserts");
    expect(data().menu.categories.some((category) => category.id === "desserts")).toBe(false);
    expect(data().menu.items.some((item) => item.categoryId === "desserts")).toBe(false);
  });

  it("a new dish gets its own id", () => {
    const id = actions().addMenuItem({
      categoryId: "mains",
      name: { ar: "طبق", en: "Dish" },
      description: { ar: "", en: "" },
      price: 10,
      image: "dish-lamb",
      tags: [],
      available: true,
      featured: false,
    });
    expect(data().menu.items.some((item) => item.id === id)).toBe(true);
  });
});

describe("R5: personalization", () => {
  it("choosing a palette does not count as editing the name", () => {
    actions().updateSettings({ palette: "wine" });
    expect(data().settings).toMatchObject({ palette: "wine", nameEdited: false });
  });

  it("editing the name in Settings is remembered", () => {
    actions().updateSettings({ businessName: { ar: "دار سارة", en: "Sara House" } });
    expect(data().settings).toMatchObject({ nameEdited: true, businessName: { en: "Sara House" } });
  });
});

describe("Tips can be dismissed once", () => {
  it("a dismissed tip is stored a single time", () => {
    actions().dismissTip("afterHours:res-6");
    actions().dismissTip("afterHours:res-6");
    expect(data().dismissedTips).toEqual(["afterHours:res-6"]);
  });
});

describe("E3: reset demo keeps the account", () => {
  it("restores the seed data and keeps the registered account", () => {
    actions().setAccount(account);
    actions().addReservation(request);
    actions().updateMenuItem("whipped-feta", { price: 1 });
    actions().resetDemo();
    expect(data().account).toEqual(account);
    expect(data().reservations).toHaveLength(8);
    expect(data().menu.items.find((item) => item.id === "whipped-feta")?.price).toBe(42);
  });
});

describe("E2: saved data from an older version is replaced by the seed, keeping the account", () => {
  it("resets to the seed when the saved version is old", async () => {
    storage.setItem(
      "demo:restaurant-fine-dining",
      JSON.stringify({
        state: { ...createFineDiningSeed(new Date()), account, reservations: [] },
        version: FINE_DINING_VERSION - 1,
      }),
    );
    await useFineDiningStore.persist.rehydrate();
    expect(data().account).toEqual(account);
    expect(data().reservations).toHaveLength(8);
  });

  it("keeps saved data of the current version", async () => {
    storage.setItem(
      "demo:restaurant-fine-dining",
      JSON.stringify({
        state: { ...createFineDiningSeed(new Date()), account, reservations: [] },
        version: FINE_DINING_VERSION,
      }),
    );
    await useFineDiningStore.persist.rehydrate();
    expect(data().reservations).toEqual([]);
  });
});
