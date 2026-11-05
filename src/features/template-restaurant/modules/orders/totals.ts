import type { LocalizedText } from "@/features/demo-engine/types";
import { isValidPhone } from "@/features/demo-engine/format/phone";
import type { Menu } from "../../types";
import type { Area } from "../areas/types";
import type { Offer } from "../offers/types";
import type { CartLine, Order, OrderLine, OrderType, PaymentMethod } from "./types";

// Pure order rules: what the cart is worth, what delivery adds, and what a checkout needs.

export const FIRST_ORDER_NUMBER = 1001;

// A cart line with the name and price read from the menu or the offer right now.
export type PricedLine = OrderLine & { kind: CartLine["kind"]; refId: string; image: string };

const cents = (amount: number) => Math.round(amount * 100) / 100;

// Lines whose dish is gone, not available, or whose offer is off are dropped: they cannot be ordered.
export function resolveCart(cart: readonly CartLine[], menu: Menu, offers: readonly Offer[]): PricedLine[] {
  const lines: PricedLine[] = [];
  for (const line of cart) {
    if (line.kind === "item") {
      const item = menu.items.find((candidate) => candidate.id === line.refId);
      if (item?.available) {
        lines.push({
          kind: "item",
          refId: item.id,
          name: item.name,
          price: item.price,
          qty: line.qty,
          image: item.image,
        });
      }
    } else {
      const offer = offers.find((candidate) => candidate.id === line.refId);
      if (offer?.active) {
        lines.push({
          kind: "offer",
          refId: offer.id,
          name: offer.title,
          price: offer.price,
          qty: line.qty,
          image: offer.image,
        });
      }
    }
  }
  return lines;
}

export type OrderTotals = { subtotal: number; deliveryFee: number; total: number };

// Pickup has no fee. Delivery adds the fee of the chosen area.
export function orderTotals(
  lines: readonly Pick<OrderLine, "price" | "qty">[],
  type: OrderType,
  area: Area | undefined,
): OrderTotals {
  const subtotal = cents(lines.reduce((sum, line) => sum + line.price * line.qty, 0));
  const deliveryFee = type === "delivery" && area ? cents(area.fee) : 0;
  return { subtotal, deliveryFee, total: cents(subtotal + deliveryFee) };
}

// How much more the customer must add to reach the area's minimum (0 when reached, and always 0 for pickup).
export function minimumShortfall(subtotal: number, type: OrderType, area: Area | undefined): number {
  if (type !== "delivery" || !area) return 0;
  return Math.max(0, cents(area.minOrder - subtotal));
}

export function nextOrderNumber(orders: readonly Pick<Order, "number">[]): number {
  return orders.reduce((highest, order) => Math.max(highest, order.number), FIRST_ORDER_NUMBER - 1) + 1;
}

export type CheckoutInput = {
  type: OrderType;
  areaId: string;
  address: string;
  name: string;
  phone: string;
  payment: PaymentMethod;
  note: string;
};

export type CheckoutErrors = {
  cart?: true;
  area?: true;
  address?: true;
  name?: true;
  phone?: true;
  minOrder?: true;
};

type Context = { lines: readonly Pick<OrderLine, "price" | "qty">[]; areas: readonly Area[] };

export function validateCheckout(input: CheckoutInput, context: Context): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (context.lines.length === 0) errors.cart = true;
  if (input.name.trim() === "") errors.name = true;
  if (!isValidPhone(input.phone)) errors.phone = true;
  if (input.type === "delivery") {
    const area = context.areas.find((candidate) => candidate.id === input.areaId);
    if (!area) errors.area = true;
    if (input.address.trim() === "") errors.address = true;
    const { subtotal } = orderTotals(context.lines, input.type, area);
    if (area && minimumShortfall(subtotal, input.type, area) > 0) errors.minOrder = true;
  }
  return errors;
}

export function describeLines(lines: readonly OrderLine[], locale: keyof LocalizedText): string {
  return lines.map((line) => `${line.qty} × ${line.name[locale]}`).join(", ");
}
