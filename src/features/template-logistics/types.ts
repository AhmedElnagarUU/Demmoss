import { z } from "zod";
import { accountSchema } from "@/features/demo-engine/fake-auth/types";
import { localizedTextSchema } from "@/features/demo-engine/types";

// Shared by both logistics variants. Every visible text is { ar, en }.
export const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

export const settingsSchema = z.object({
  businessName: localizedTextSchema,
  // true once the owner edits the name in Settings; until then the name given at register wins
  nameEdited: z.boolean(),
  palette: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  address: localizedTextSchema,
  currency: z.string().regex(/^[A-Z]{3}$/),
  // office hours Sunday to Thursday; Friday and Saturday are the weekend
  officeOpen: timeSchema,
  officeClose: timeSchema,
});

export const contentSchema = z.object({
  hero: z.object({ title: localizedTextSchema, subtitle: localizedTextSchema }),
  about: z.object({ title: localizedTextSchema, text: localizedTextSchema }),
  contact: z.object({ title: localizedTextSchema, text: localizedTextSchema }),
});

export const transportModes = ["air", "sea", "road", "rail"] as const;
export const transportModeSchema = z.enum(transportModes);

export const serviceKeys = [
  "air",
  "sea",
  "road",
  "rail",
  "customs",
  "not_sure",
  "storage",
  "storage_picking",
  "full_3pl",
  "returns",
] as const;
export const serviceKeySchema = z.enum(serviceKeys);

export const quoteStatuses = ["new", "quoted", "won", "lost"] as const;
export const quoteStatusSchema = z.enum(quoteStatuses);

export const freightEstimateSchema = z.object({
  kind: z.literal("freight"),
  mode: transportModeSchema,
  origin: localizedTextSchema,
  destination: localizedTextSchema,
  weightKg: z.number().min(0),
  volumeCbm: z.number().min(0),
  minCost: z.number().min(0),
  maxCost: z.number().min(0),
});

export const storageEstimateSchema = z.object({
  kind: z.literal("storage"),
  pallets: z.number().int().min(1),
  months: z.number().int().min(1),
  ordersPerMonth: z.number().int().min(0),
  insurance: z.boolean(),
  monthlyTotal: z.number().min(0),
});

export const estimateSchema = z.discriminatedUnion("kind", [freightEstimateSchema, storageEstimateSchema]);

export const quoteSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1).max(80),
  company: z.string().trim().max(80),
  phone: z.string().trim().min(1).max(30),
  email: z.string().trim().max(120),
  service: serviceKeySchema,
  message: z.string().max(600),
  status: quoteStatusSchema,
  createdAt: z.iso.datetime(),
  estimate: estimateSchema.nullable(),
});

export const faqItemSchema = z.object({
  id: z.string().min(1),
  question: localizedTextSchema,
  answer: localizedTextSchema,
});

export const testimonialSchema = z.object({
  id: z.string().min(1),
  author: localizedTextSchema,
  role: localizedTextSchema,
  text: localizedTextSchema,
  visible: z.boolean(),
});

// The data both variants store. A variant adds its own module data with `.extend()`.
export const logisticsDataSchema = z.object({
  account: accountSchema.nullable(),
  settings: settingsSchema,
  content: contentSchema,
  quotes: z.array(quoteSchema),
  faq: z.array(faqItemSchema),
  testimonials: z.array(testimonialSchema),
  dismissedTips: z.array(z.string()),
});

export type Settings = z.infer<typeof settingsSchema>;
export type Content = z.infer<typeof contentSchema>;
export type TransportMode = z.infer<typeof transportModeSchema>;
export type ServiceKey = z.infer<typeof serviceKeySchema>;
export type QuoteStatus = z.infer<typeof quoteStatusSchema>;
export type FreightEstimate = z.infer<typeof freightEstimateSchema>;
export type StorageEstimate = z.infer<typeof storageEstimateSchema>;
export type Estimate = z.infer<typeof estimateSchema>;
export type Quote = z.infer<typeof quoteSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type LogisticsData = z.infer<typeof logisticsDataSchema>;
