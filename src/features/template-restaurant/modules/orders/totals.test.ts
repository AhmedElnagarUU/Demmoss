import { describe, expect, it } from "vitest";
import type { Area } from "../areas/types";
import type { Offer } from "../offers/types";
import type { Menu } from "../../types";
import {
  minimumShortfall,
  nextOrderNumber,
  orderTotals,
  resolveCart,
  validateCheckout,
  type CheckoutInput,
} from "./totals";

const area: Area = { id: "olaya", name: { ar: "العليا", en: "Al Olaya" }, fee: 8, minOrder: 40 };
const text = (en: string) => ({ ar: en, en });

const menu: Menu = {
  categories: [{ id: "b", name: text("Burgers") }],
  items: [
    {
      id: "a",
      categoryId: "b",
      name: text("A"),
      description: text(""),
      price: 29.5,
      image: "",
      tags: [],
      available: true,
      featured: false,
    },
    {
      id: "gone",
      categoryId: "b",
      name: text("Gone"),
      description: text(""),
      price: 10,
      image: "",
      tags: [],
      available: false,
      featured: false,
    },
  ],
};
const offers: Offer[] = [
  { id: "o1", title: text("Deal"), description: text(""), price: 49, image: "", active: true },
  { id: "o2", title: text("Off"), description: text(""), price: 20, image: "", active: false },
];

const delivery: CheckoutInput = {
  type: "delivery",
  areaId: "olaya",
  address: "Olaya St",
  name: "Sara",
  phone: "966501234567",
  payment: "cash",
  note: "",
};

describe("R1: order totals", () => {
  it("pickup has no delivery fee", () => {
    expect(orderTotals([{ price: 29.5, qty: 2 }], "pickup", area)).toEqual({
      subtotal: 59,
      deliveryFee: 0,
      total: 59,
    });
  });

  it("delivery adds the fee of the chosen area", () => {
    expect(orderTotals([{ price: 29.5, qty: 2 }], "delivery", area)).toEqual({
      subtotal: 59,
      deliveryFee: 8,
      total: 67,
    });
  });

  it("delivery without an area adds no fee yet", () => {
    expect(orderTotals([{ price: 10, qty: 1 }], "delivery", undefined).deliveryFee).toBe(0);
  });

  it("does not drift with cents", () => {
    expect(orderTotals([{ price: 0.1, qty: 3 }], "pickup", undefined).subtotal).toBe(0.3);
  });
});

describe("R1: minimum order per area", () => {
  it("says how much is missing, only for delivery", () => {
    expect(minimumShortfall(25, "delivery", area)).toBe(15);
    expect(minimumShortfall(40, "delivery", area)).toBe(0);
    expect(minimumShortfall(25, "pickup", area)).toBe(0);
  });

  it("checkout rejects a delivery below the minimum but accepts the same cart for pickup", () => {
    const lines = [{ price: 25, qty: 1 }];
    expect(validateCheckout(delivery, { lines, areas: [area] }).minOrder).toBe(true);
    expect(validateCheckout({ ...delivery, type: "pickup" }, { lines, areas: [area] })).toEqual({});
  });
});

describe("R1: checkout validation", () => {
  const lines = [{ price: 50, qty: 1 }];

  it("accepts a complete delivery", () => {
    expect(validateCheckout(delivery, { lines, areas: [area] })).toEqual({});
  });

  it("needs a cart, a name, and a valid phone", () => {
    const errors = validateCheckout({ ...delivery, name: " ", phone: "12" }, { lines: [], areas: [area] });
    expect(errors).toMatchObject({ cart: true, name: true, phone: true });
  });

  it("delivery needs a known area and an address; pickup does not", () => {
    const errors = validateCheckout(
      { ...delivery, areaId: "nowhere", address: "" },
      { lines, areas: [area] },
    );
    expect(errors).toMatchObject({ area: true, address: true });
    expect(
      validateCheckout({ ...delivery, type: "pickup", areaId: "", address: "" }, { lines, areas: [area] }),
    ).toEqual({});
  });
});

describe("cart and order numbers", () => {
  it("the cart only keeps what can still be ordered, with today's price", () => {
    const lines = resolveCart(
      [
        { kind: "item", refId: "a", qty: 2 },
        { kind: "item", refId: "gone", qty: 1 },
        { kind: "item", refId: "missing", qty: 1 },
        { kind: "offer", refId: "o1", qty: 1 },
        { kind: "offer", refId: "o2", qty: 1 },
      ],
      menu,
      offers,
    );
    expect(lines.map((line) => [line.refId, line.price, line.qty])).toEqual([
      ["a", 29.5, 2],
      ["o1", 49, 1],
    ]);
  });

  it("order numbers start at 1001 and continue after the highest", () => {
    expect(nextOrderNumber([])).toBe(1001);
    expect(nextOrderNumber([{ number: 1004 }, { number: 1010 }, { number: 1002 }])).toBe(1011);
  });
});
