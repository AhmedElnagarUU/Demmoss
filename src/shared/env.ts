import { z } from "zod";
import { locales } from "@/shared/i18n/config";

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_BRAND_NAME: z.string().min(1),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .regex(/^\d{8,15}$/, "digits only, with the country code and no +, e.g. 966500000000"),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(locales),
  NEXT_PUBLIC_SITE_URL: z.url(),
  // Google Tag Manager container id. Empty = no Google tags (local dev, tests).
  NEXT_PUBLIC_GTM_ID: z
    .string()
    .regex(/^GTM-[A-Z0-9]+$/, "a Google Tag Manager id like GTM-ABC1234, or leave empty")
    .optional(),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

export function parseEnv<T extends z.ZodType>(
  schema: T,
  values: Record<string, string | undefined>,
): z.infer<T> {
  const result = schema.safeParse(values);
  if (!result.success) {
    const problems = result.error.issues.map((issue) => `  ${issue.path.join(".")}: ${issue.message}`);
    throw new Error(`Invalid environment variables (see .env.example):\n${problems.join("\n")}`);
  }
  return result.data;
}

// Each NEXT_PUBLIC_ variable is read by its full name so Next.js can inline it in the browser bundle.
export const publicEnv: PublicEnv = parseEnv(publicEnvSchema, {
  NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || undefined,
});
