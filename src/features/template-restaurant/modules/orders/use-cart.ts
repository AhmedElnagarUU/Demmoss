import { useMemo } from "react";
import type { OrderingStore } from "./orders-store";
import { resolveCart, type PricedLine } from "./totals";

// The cart as the customer sees it: only lines that can still be ordered, with today's names and prices.
export function useCartLines(store: OrderingStore): PricedLine[] {
  const cart = store((state) => state.cart);
  const menu = store((state) => state.menu);
  const offers = store((state) => state.offers);
  return useMemo(() => resolveCart(cart, menu, offers), [cart, menu, offers]);
}

export function cartCount(lines: readonly Pick<PricedLine, "qty">[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}
