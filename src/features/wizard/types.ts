import { z } from "zod";
import { categorySlugs } from "@/features/gallery/categories";
import { locales } from "@/shared/i18n/config";

export const leadTypes = ["business", "system", "saas", "other"] as const;
export type LeadType = (typeof leadTypes)[number];

export const leadStatuses = ["new", "contacted", "won", "lost"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const fieldOther = "other";
export const leadFields = [...categorySlugs, fieldOther] as const;

const idea = z.string().trim().min(10).max(1000);

// Spaces, dashes and brackets are allowed when typing; the saved number has digits and an optional leading +.
const whatsapp = z
  .string()
  .transform((value) => value.replace(/[\s\-()]/g, ""))
  .pipe(z.string().regex(/^\+?\d{8,15}$/));

const contact = {
  name: z.string().trim().min(2).max(80),
  whatsapp,
  email: z.email().max(200).optional(),
  locale: z.enum(locales),
  visitorId: z.uuid(),
};

const businessLead = z
  .object({
    type: z.literal("business"),
    field: z.enum(leadFields),
    idea: z.string().trim().max(1000).optional(),
    ...contact,
  })
  .refine((lead) => lead.field !== fieldOther || (lead.idea ?? "").length >= 10, {
    path: ["idea"],
    message: "Describe your field in at least 10 characters",
  });

function ideaLead<T extends "system" | "saas" | "other">(type: T) {
  return z.object({ type: z.literal(type), idea, ...contact });
}

export const leadInputSchema = z.discriminatedUnion("type", [
  businessLead,
  ideaLead("system"),
  ideaLead("saas"),
  ideaLead("other"),
]);

export type LeadInput = z.infer<typeof leadInputSchema>;

export type LeadField = "type" | "field" | "idea" | "name" | "whatsapp" | "email" | "locale" | "visitorId";
export type LeadFieldErrors = Partial<Record<LeadField, string>>;

const leadFieldNames: readonly string[] = [
  "type",
  "field",
  "idea",
  "name",
  "whatsapp",
  "email",
  "locale",
  "visitorId",
];

// The first problem of each field, so the form can show it next to that field.
export function fieldErrorsOf(error: z.ZodError): LeadFieldErrors {
  const errors: LeadFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && leadFieldNames.includes(field)) {
      errors[field as LeadField] ??= issue.message;
    }
  }
  return errors;
}

export type CreateLeadResult =
  { ok: true; id: string } | { ok: false; errors: LeadFieldErrors } | { ok: false; rateLimited: true };

export function isLeadType(value: string | undefined | null): value is LeadType {
  return leadTypes.some((type) => type === value);
}

export function isLeadField(value: string | undefined | null): value is (typeof leadFields)[number] {
  return leadFields.some((field) => field === value);
}
