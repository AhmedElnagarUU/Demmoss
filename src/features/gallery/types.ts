import { z } from "zod";
import { categorySlugs } from "./categories";

const bilingualText = z.object({ ar: z.string().min(1), en: z.string().min(1) });

export const templateMetaSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum(categorySlugs),
  variant: z.string().regex(/^[a-z0-9-]+$/),
  name: bilingualText,
  pitch: bilingualText,
  screenshot: z.string().min(1),
});

export type TemplateMeta = z.infer<typeof templateMetaSchema>;
