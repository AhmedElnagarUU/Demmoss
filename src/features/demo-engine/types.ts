import { z } from "zod";

export const localizedTextSchema = z.object({ ar: z.string(), en: z.string() });

export type LocalizedText = z.infer<typeof localizedTextSchema>;
