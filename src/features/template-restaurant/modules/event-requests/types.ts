import { z } from "zod";
import { dateKeySchema } from "../../types";

export const eventRequestStatuses = ["new", "replied", "booked", "closed"] as const;
export const eventRequestStatusSchema = z.enum(eventRequestStatuses);

export const eventTypes = ["birthday", "business", "engagement", "family", "other"] as const;
export const eventTypeSchema = z.enum(eventTypes);

export const eventBudgets = ["under_5000", "5000_10000", "over_10000"] as const;
export const eventBudgetSchema = z.enum(eventBudgets);

export const eventRequestSchema = z.object({
  id: z.string().min(1),
  type: eventTypeSchema,
  date: dateKeySchema,
  guests: z.number().int().min(4).max(60),
  budget: eventBudgetSchema.optional(),
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(1).max(30),
  details: z.string().max(600),
  status: eventRequestStatusSchema,
  createdAt: z.iso.datetime(),
});

export const eventRequestsShape = { eventRequests: z.array(eventRequestSchema) };

export type EventRequestStatus = z.infer<typeof eventRequestStatusSchema>;
export type EventType = z.infer<typeof eventTypeSchema>;
export type EventBudget = z.infer<typeof eventBudgetSchema>;
export type EventRequest = z.infer<typeof eventRequestSchema>;
export type EventRequestsData = { eventRequests: EventRequest[] };
