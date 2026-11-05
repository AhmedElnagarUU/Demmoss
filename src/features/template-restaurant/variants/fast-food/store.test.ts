import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeStorage } from "../../../../../tests/helpers/storage";

// The store reads window.localStorage when it is created, so a fake one is installed first.
const storage = createFakeStorage();
vi.stubGlobal("window", { localStorage: storage });
const { useFastFoodStore } = await import("./store");

const account = { name: "Sara", passwordHash: "a".repeat(64), businessName: "Dar Sara" };
const store = () => useFastFoodStore.getState();

const pickup = {
  type: "pickup",
  areaId: "",
  address: "",
  name: "  Nada ",
  phone: "966500000009",
  payment: "cash",
  note: "",
} as const;
const delivery = { ...pickup, type: "delivery", areaId: "olaya", address: "Olaya St" } as const;

beforeEach(() => {
  storage.clear();
  store().resetDemo();
  store().setAccount(null);
  store().clearCart();
});

describe("R1: cart", () => {
  it("adding the same dish twice makes quantity 2; quantity zero removes the line", () => {
    store().addToCart("item", "classic");
    store().addToCart("item", "classic");
    expect(store().cart).toEqual([{ kind: "item", refId: "classic", qty: 2 }]);
    store().setCartQty("item", "classic", 0);
    expect(store().cart).toEqual([]);
  });
});

describe("R1, R2: placing an order", () => {
  it("a pickup order arrives first, numbered after the highest, status new, and empties the cart", () => {
    store().addToCart("item", "classic");
    store().addToCart("item", "classic");
    const id = store().placeOrder(pickup, new Date(2026, 10, 4, 12, 0));
    const first = store().orders[0];
    expect(first).toMatchObject({
      id,
      number: 1011,
      status: "new",
      name: "Nada",
      subtotal: 58,
      deliveryFee: 0,
      total: 58,
    });
    expect(store().cart).toEqual([]);
    expect(store().orders).toHaveLength(11);
  });

  it("a delivery adds the area fee and keeps the area name and address", () => {
    store().addToCart("item", "double");
    store().addToCart("item", "cheese-fries");
    store().placeOrder(delivery);
    expect(store().orders[0]).toMatchObject({
      subtotal: 57,
      deliveryFee: 8,
      total: 65,
      areaId: "olaya",
      address: "Olaya St",
    });
  });

  it("refuses an empty cart and a delivery below the area minimum, and keeps the cart", () => {
    expect(store().placeOrder(pickup)).toBeNull();
    store().addToCart("item", "fries");
    expect(store().placeOrder(delivery)).toBeNull();
    expect(store().orders).toHaveLength(10);
    expect(store().cart).toHaveLength(1);
  });

  it("R4: an order keeps the name and price it had, after the menu is edited", () => {
    store().addToCart("item", "classic");
    store().placeOrder(pickup);
    store().updateMenuItem("classic", { name: { ar: "جديد", en: "Renamed" }, price: 99 });
    store().removeMenuItem("classic");
    const line = store().orders[0]?.lines[0];
    expect(line).toEqual({ name: { ar: "كلاسيك سماش", en: "Classic Smash" }, price: 29, qty: 1 });
  });

  it("an offer is one cart line and one order line; removing the offer removes it from the cart", () => {
    store().addToCart("offer", "family-box");
    store().placeOrder(pickup);
    expect(store().orders[0]?.lines).toEqual([
      { name: { ar: "بوكس العائلة", en: "Family box" }, price: 139, qty: 1 },
    ]);
    store().addToCart("offer", "family-box");
    store().removeOffer("family-box");
    expect(store().cart).toEqual([]);
  });

  it("a dish that became unavailable cannot be ordered", () => {
    store().addToCart("item", "classic");
    store().updateMenuItem("classic", { available: false });
    expect(store().placeOrder(pickup)).toBeNull();
  });
});

describe("R3: order status", () => {
  it("follows the delivery path and ignores a forbidden jump", () => {
    store().addToCart("item", "double");
    store().addToCart("item", "cheese-fries");
    const id = store().placeOrder(delivery) ?? "";
    store().setOrderStatus(id, "completed");
    expect(store().orders[0]?.status).toBe("new");
    store().setOrderStatus(id, "preparing");
    store().setOrderStatus(id, "ready");
    expect(store().orders[0]?.status).toBe("preparing");
    store().setOrderStatus(id, "out_for_delivery");
    store().setOrderStatus(id, "completed");
    expect(store().orders[0]?.status).toBe("completed");
  });
});

describe("B2: offers and delivery areas", () => {
  it("a new offer is added first and can be turned off", () => {
    const id = store().addOffer({
      title: { ar: "عرض", en: "Deal" },
      description: { ar: "وصف", en: "About" },
      price: 20,
      image: "burger-hero",
      active: true,
    });
    expect(store().offers[0]?.id).toBe(id);
    store().setOfferActive(id, false);
    expect(store().offers[0]?.active).toBe(false);
  });

  it("areas can be added, changed, and removed", () => {
    const id = store().addArea({ name: { ar: "حي", en: "District" }, fee: 5, minOrder: 30 });
    store().updateArea(id, { fee: 7 });
    expect(store().areas.find((area) => area.id === id)?.fee).toBe(7);
    store().removeArea(id);
    expect(store().areas.some((area) => area.id === id)).toBe(false);
  });
});

describe("E3: reset", () => {
  it("restores the seed orders, offers, and cart and keeps the account", () => {
    store().setAccount(account);
    store().addToCart("item", "classic");
    store().placeOrder(pickup);
    store().resetDemo();
    expect(store().orders).toHaveLength(10);
    expect(store().cart).toEqual([]);
    expect(store().account).toEqual(account);
  });
});
