import { z } from "zod";
import { accountSchema } from "@/features/demo-engine/fake-auth/types";
import { localizedTextSchema } from "@/features/demo-engine/types";

// Shared by both real estate variants. Every visible text is { ar, en }. Prices are in SAR (rent = per year).

export const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
export const dateKeySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const purposes = ["sale", "rent"] as const;
export const purposeSchema = z.enum(purposes);

export const propertyTypes = ["apartment", "villa", "townhouse", "penthouse", "coastal"] as const;
export const propertyTypeSchema = z.enum(propertyTypes);

// "closed" = sold (for sale) or rented (for rent)
export const propertyStatuses = ["available", "reserved", "closed"] as const;
export const propertyStatusSchema = z.enum(propertyStatuses);

export const propertyFeatures = [
  "pool",
  "garden",
  "parking",
  "maid-room",
  "elevator",
  "majlis",
  "sea-view",
  "smart-home",
  "gym",
  "roof-terrace",
] as const;
export const propertyFeatureSchema = z.enum(propertyFeatures);

export const unitStatuses = ["available", "reserved", "sold"] as const;
export const unitStatusSchema = z.enum(unitStatuses);

export const unitSchema = z.object({
  id: z.string().min(1),
  label: z.string().trim().min(1).max(20),
  floor: z.number().int().min(0).max(200),
  size: z.number().positive().max(10000),
  price: z.number().int().positive(),
  status: unitStatusSchema,
});

export const propertySchema = z.object({
  id: z.string().min(1),
  title: localizedTextSchema,
  description: localizedTextSchema,
  purpose: purposeSchema,
  type: propertyTypeSchema,
  // an area id from the variant's area list
  area: z.string().min(1),
  price: z.number().int().positive(),
  bedrooms: z.number().int().min(0).max(20),
  bathrooms: z.number().int().min(0).max(20),
  size: z.number().positive().max(100000),
  features: z.array(propertyFeatureSchema),
  // photo ids from the variant's photo list; the first one is the cover
  photos: z.array(z.string().min(1)).min(1).max(8),
  featured: z.boolean(),
  // a small label on the card, e.g. "New" or "Open house" (agency design)
  tag: z.enum(["new", "openHouse"]).optional(),
  status: propertyStatusSchema,
  agentId: z.string().optional(),
  // developer residences only; empty for agency listings
  units: z.array(unitSchema),
});

export const viewingStatuses = ["new", "confirmed", "done", "cancelled", "no_show"] as const;
export const viewingStatusSchema = z.enum(viewingStatuses);

export const viewingSchema = z.object({
  id: z.string().min(1),
  propertyId: z.string().optional(),
  unitId: z.string().optional(),
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(1).max(30),
  date: dateKeySchema,
  time: timeSchema,
  note: z.string().max(300).optional(),
  status: viewingStatusSchema,
  createdAt: z.iso.datetime(),
});

export const inquiryKinds = ["question", "valuation", "brochure"] as const;
export const inquiryKindSchema = z.enum(inquiryKinds);
export const inquiryStatuses = ["new", "replied", "closed"] as const;
export const inquiryStatusSchema = z.enum(inquiryStatuses);

export const inquirySchema = z.object({
  id: z.string().min(1),
  propertyId: z.string().optional(),
  unitId: z.string().optional(),
  kind: inquiryKindSchema,
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(1).max(30),
  message: z.string().max(500),
  status: inquiryStatusSchema,
  createdAt: z.iso.datetime(),
});

export const testimonialSchema = z.object({
  id: z.string().min(1),
  name: localizedTextSchema,
  // e.g. "Bought in Al Malqa"
  context: localizedTextSchema,
  text: localizedTextSchema,
  visible: z.boolean(),
});

export const settingsSchema = z.object({
  businessName: localizedTextSchema,
  // true once the owner edits the name in Settings; until then the name given at register wins
  nameEdited: z.boolean(),
  palette: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  address: localizedTextSchema,
  hours: localizedTextSchema,
  // yearly interest rate (%) the mortgage calculator starts with
  mortgageRate: z.number().min(0).max(30),
});

export const contentSchema = z.object({
  hero: z.object({ title: localizedTextSchema, subtitle: localizedTextSchema }),
  about: z.object({ title: localizedTextSchema, text: localizedTextSchema }),
  contact: z.object({ title: localizedTextSchema, text: localizedTextSchema }),
});

export const realEstateDataSchema = z.object({
  account: accountSchema.nullable(),
  settings: settingsSchema,
  content: contentSchema,
  properties: z.array(propertySchema),
  viewings: z.array(viewingSchema),
  inquiries: z.array(inquirySchema),
  testimonials: z.array(testimonialSchema),
  dismissedTips: z.array(z.string()),
});

export type Purpose = z.infer<typeof purposeSchema>;
export type PropertyType = z.infer<typeof propertyTypeSchema>;
export type PropertyStatus = z.infer<typeof propertyStatusSchema>;
export type PropertyFeature = z.infer<typeof propertyFeatureSchema>;
export type UnitStatus = z.infer<typeof unitStatusSchema>;
export type Unit = z.infer<typeof unitSchema>;
export type Property = z.infer<typeof propertySchema>;
export type ViewingStatus = z.infer<typeof viewingStatusSchema>;
export type Viewing = z.infer<typeof viewingSchema>;
export type InquiryKind = z.infer<typeof inquiryKindSchema>;
export type InquiryStatus = z.infer<typeof inquiryStatusSchema>;
export type Inquiry = z.infer<typeof inquirySchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type Content = z.infer<typeof contentSchema>;
export type RealEstateData = z.infer<typeof realEstateDataSchema>;
