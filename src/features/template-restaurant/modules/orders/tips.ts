import { toDateKey } from "@/features/demo-engine/format/dates";
import type { TipFact } from "../../value-tips";
import type { Order } from "./types";

// Orders from the website today (not cancelled). In a real project the same orders would come through a
// delivery app, which charges a commission. The count is real; no money amount is invented.
export function directOrderFacts(orders: readonly Order[], now: Date): TipFact[] {
  const today = toDateKey(now);
  const count = orders.filter(
    (order) => order.status !== "cancelled" && toDateKey(new Date(order.createdAt)) === today,
  ).length;
  if (count === 0) return [];
  return [{ id: `directOrders:${today}`, key: "directOrders", count }];
}

const activeStatuses: readonly Order["status"][] = ["preparing", "ready", "out_for_delivery"];

// The newest order that is being worked on: the customer can follow it live instead of calling.
export function orderTrackingFacts(orders: readonly Order[]): TipFact[] {
  const newest = [...orders]
    .filter((order) => activeStatuses.includes(order.status))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  if (!newest) return [];
  return [{ id: `orderTracking:${newest.id}`, key: "orderTracking", label: `#${newest.number}` }];
}
