import type { SetData } from "../../shared-slice";
import type { RestaurantData } from "../../types";
import type { AreasData } from "../areas/types";
import type { OffersData } from "../offers/types";
import { canMoveOrder } from "./status";
import {
  minimumShortfall,
  nextOrderNumber,
  orderTotals,
  resolveCart,
  validateCheckout,
  type CheckoutInput,
} from "./totals";
import type { CartLine, Order, OrdersData, OrderStatus } from "./types";

// Everything placing an order reads: the menu, the offers, the areas, and the cart.
export type OrderingData = RestaurantData & OrdersData & OffersData & AreasData;

export type OrdersActions = {
  addToCart: (kind: CartLine["kind"], refId: string) => void;
  setCartQty: (kind: CartLine["kind"], refId: string, qty: number) => void;
  clearCart: () => void;
  // Returns the new order's id, or null when the cart or the checkout is not valid.
  placeOrder: (input: CheckoutInput, now?: Date) => string | null;
  setOrderStatus: (id: string, status: OrderStatus) => void;
};

const MAX_QTY = 99;
const sameLine = (kind: CartLine["kind"], refId: string) => (line: CartLine) =>
  line.kind === kind && line.refId === refId;

export function createOrdersActions(set: SetData<OrderingData>, get: () => OrderingData): OrdersActions {
  return {
    addToCart: (kind, refId) =>
      set((state) => {
        const known = state.cart.find(sameLine(kind, refId));
        if (!known) return { cart: [...state.cart, { kind, refId, qty: 1 }] };
        return {
          cart: state.cart.map((line) =>
            sameLine(kind, refId)(line) ? { ...line, qty: Math.min(MAX_QTY, line.qty + 1) } : line,
          ),
        };
      }),

    // A quantity of zero (or less) removes the line.
    setCartQty: (kind, refId, qty) =>
      set((state) => ({
        cart:
          qty <= 0
            ? state.cart.filter((line) => !sameLine(kind, refId)(line))
            : state.cart.map((line) =>
                sameLine(kind, refId)(line) ? { ...line, qty: Math.min(MAX_QTY, Math.floor(qty)) } : line,
              ),
      })),

    clearCart: () => set({ cart: [] }),

    placeOrder: (input, now = new Date()) => {
      const state = get();
      const lines = resolveCart(state.cart, state.menu, state.offers);
      if (Object.keys(validateCheckout(input, { lines, areas: state.areas })).length > 0) return null;

      const area =
        input.type === "delivery" ? state.areas.find((item) => item.id === input.areaId) : undefined;
      const totals = orderTotals(lines, input.type, area);
      if (minimumShortfall(totals.subtotal, input.type, area) > 0) return null;

      const note = input.note.trim();
      const order: Order = {
        id: crypto.randomUUID(),
        number: nextOrderNumber(state.orders),
        lines: lines.map((line) => ({ name: line.name, price: line.price, qty: line.qty })),
        type: input.type,
        ...(area ? { areaId: area.id, areaName: area.name, address: input.address.trim() } : {}),
        name: input.name.trim(),
        phone: input.phone.trim(),
        payment: input.payment,
        ...(note ? { note } : {}),
        ...totals,
        status: "new",
        createdAt: now.toISOString(),
      };
      set({ orders: [order, ...state.orders], cart: [] });
      return order.id;
    },

    // Only the allowed paths change a status; anything else is ignored.
    setOrderStatus: (id, status) =>
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === id && canMoveOrder(order.status, status, order.type) ? { ...order, status } : order,
        ),
      })),
  };
}
