import type { OrderStatus, OrderType } from "./types";

// new → preparing → ready (pickup) or out_for_delivery (delivery) → completed
// Any order that is not finished can be cancelled. Finished orders (completed, cancelled) never change.
// A status that can be moved to ("new" is only the starting point).
export type OrderTarget = Exclude<OrderStatus, "new">;

export function allowedOrderStatuses(from: OrderStatus, type: OrderType): readonly OrderTarget[] {
  switch (from) {
    case "new":
      return ["preparing", "cancelled"];
    case "preparing":
      return [type === "delivery" ? "out_for_delivery" : "ready", "cancelled"];
    case "ready":
    case "out_for_delivery":
      return ["completed", "cancelled"];
    case "completed":
    case "cancelled":
      return [];
  }
}

export function canMoveOrder(from: OrderStatus, to: OrderStatus, type: OrderType): boolean {
  return allowedOrderStatuses(from, type).some((target) => target === to);
}

// The steps a customer sees on the status page, in order. Cancelled is shown apart from the steps.
export function statusSteps(type: OrderType): readonly OrderStatus[] {
  return ["new", "preparing", type === "delivery" ? "out_for_delivery" : "ready", "completed"];
}
