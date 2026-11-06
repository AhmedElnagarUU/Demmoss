import "server-only";
import { createNotification } from "@/features/notifications/service";
import { checkRateLimit } from "@/shared/rate-limit";
import { findLeads, insertLead } from "./repository";
import type { LeadInput, LeadStatus } from "./types";

const leadRateLimit = { limit: 5, windowMs: 60 * 60 * 1000 };

export type SubmitLeadResult = { ok: true; id: string } | { ok: false; reason: "rate_limited" };

export async function submitLead(
  input: LeadInput,
  request: { clientKey: string | null; now: number },
): Promise<SubmitLeadResult> {
  if (
    request.clientKey &&
    !checkRateLimit(`lead:${request.clientKey}`, { ...leadRateLimit, now: request.now }).allowed
  ) {
    return { ok: false, reason: "rate_limited" };
  }
  const { id } = await createLead(input);
  return { ok: true, id };
}

export async function createLead(input: LeadInput): Promise<{ id: string }> {
  const id = await insertLead(input);
  await createNotification({
    type: "new_lead",
    title: `New lead: ${input.name} (${input.type})`,
    link: "/en/admin/leads",
  });
  return { id };
}

export async function listLeads(status?: LeadStatus) {
  return findLeads(status);
}

export { countLeadsByStatus, setLeadNotes, setLeadStatus } from "./repository";
