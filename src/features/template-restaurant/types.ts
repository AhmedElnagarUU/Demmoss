import { z } from "zod";
import { accountSchema } from "@/features/demo-engine/fake-auth/types";
import { localizedTextSchema } from "@/features/demo-engine/types";

// Shared by both restaurant variants. Every visible text is { ar, en }.

export const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
export const dateKeySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

// day: 0 = Sunday ... 6 = Saturday. A day opens and closes on the same date (close is after open).
export const openingDaySchema = z.object({
  day: z.number().int().min(0).max(6),
  closed: z.boolean(),
  open: timeSchema,
  close: timeSchema,
});

export const settingsSchema = z.object({
  businessName: localizedTextSchema,
  // true once the owner edits the name in Settings; until then the name given at register wins
  nameEdited: z.boolean(),
  palette: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  address: localizedTextSchema,
  currency: z.string().regex(/^[A-Z]{3}$/),
  hours: z.array(openingDaySchema).length(7),
});

export const contentSchema = z.object({
  hero: z.object({ title: localizedTextSchema, subtitle: localizedTextSchema, image: z.string() }),
  about: z.object({ title: localizedTextSchema, text: localizedTextSchema, image: z.string() }),
  // "experience" for fine dining, "how it works" for fast food
  experience: z.object({
    title: localizedTextSchema,
    intro: localizedTextSchema,
    points: z
      .array(z.object({ title: localizedTextSchema, text: localizedTextSchema }))
      .min(1)
      .max(6),
  }),
  contact: z.object({ title: localizedTextSchema, text: localizedTextSchema }),
});

export const menuTags = ["new", "spicy", "vegetarian", "chef"] as const;
export const menuTagSchema = z.enum(menuTags);

export const menuCategorySchema = z.object({ id: z.string().min(1), name: localizedTextSchema });

export const menuItemSchema = z.object({
  id: z.string().min(1),
  categoryId: z.string().min(1),
  name: localizedTextSchema,
  description: localizedTextSchema,
  price: z.number().min(0),
  image: z.string(),
  tags: z.array(menuTagSchema),
  available: z.boolean(),
  featured: z.boolean(),
});

export const menuSchema = z.object({
  categories: z.array(menuCategorySchema),
  items: z.array(menuItemSchema),
});

export const reviewSchema = z.object({
  id: z.string().min(1),
  author: localizedTextSchema,
  rating: z.number().int().min(1).max(5),
  text: localizedTextSchema,
  visible: z.boolean(),
});

// The data both variants store. A variant adds its own module data with `.extend()`.
export const restaurantDataSchema = z.object({
  account: accountSchema.nullable(),
  settings: settingsSchema,
  content: contentSchema,
  menu: menuSchema,
  reviews: z.array(reviewSchema),
  dismissedTips: z.array(z.string()),
});

export type OpeningDay = z.infer<typeof openingDaySchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type Content = z.infer<typeof contentSchema>;
export type MenuTag = z.infer<typeof menuTagSchema>;
export type MenuCategory = z.infer<typeof menuCategorySchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type Menu = z.infer<typeof menuSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type RestaurantData = z.infer<typeof restaurantDataSchema>;
