import { z } from "zod";
import { localizedTextSchema } from "@/features/demo-engine/types";

export const orderStatuses = [
  "new",
  "preparing",
  "ready",
  "out_for_delivery",
  "completed",
  "cancelled",
] as const;
export const orderStatusSchema = z.enum(orderStatuses);

export const orderTypes = ["pickup", "delivery"] as const;
export const orderTypeSchema = z.enum(orderTypes);

export const paymentMethods = ["cash", "card"] as const;
export const paymentSchema = z.enum(paymentMethods);

// An order keeps a snapshot of each line's name and price, so editing the menu never changes a past order.
export const orderLineSchema = z.object({
  name: localizedTextSchema,
  price: z.number().min(0),
  qty: z.number().int().min(1).max(99),
});

export const orderSchema = z.object({
  id: z.string().min(1),
  number: z.number().int().min(1),
  lines: z.array(orderLineSchema).min(1),
  type: orderTypeSchema,
  areaId: z.string().optional(),
  areaName: localizedTextSchema.optional(),
  address: z.string().max(200).optional(),
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(1).max(30),
  payment: paymentSchema,
  note: z.string().max(300).optional(),
  subtotal: z.number().min(0),
  deliveryFee: z.number().min(0),
  total: z.number().min(0),
  status: orderStatusSchema,
  createdAt: z.iso.datetime(),
});

// A cart line points to a menu item or an offer; the name and price are read when the order is placed.
export const cartLineSchema = z.object({
  kind: z.enum(["item", "offer"]),
  refId: z.string().min(1),
  qty: z.number().int().min(1).max(99),
});

export const ordersShape = {
  cart: z.array(cartLineSchema),
  orders: z.array(orderSchema),
};

export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type OrderType = z.infer<typeof orderTypeSchema>;
export type PaymentMethod = z.infer<typeof paymentSchema>;
export type OrderLine = z.infer<typeof orderLineSchema>;
export type Order = z.infer<typeof orderSchema>;
export type CartLine = z.infer<typeof cartLineSchema>;
export type OrdersData = { cart: CartLine[]; orders: Order[] };
