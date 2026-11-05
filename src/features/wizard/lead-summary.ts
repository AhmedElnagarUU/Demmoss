import { z } from "zod";

// What the result page needs to prefill WhatsApp. Kept in sessionStorage so the name never goes in the URL.
export const LEAD_SUMMARY_KEY = "wizard:lead-summary";

const leadSummarySchema = z.object({ name: z.string().max(80), idea: z.string().max(1000) });

export type LeadSummary = z.infer<typeof leadSummarySchema>;

export function parseLeadSummary(raw: string): LeadSummary | null {
  try {
    const parsed = leadSummarySchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
