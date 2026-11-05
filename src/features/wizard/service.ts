import "server-only";
import { createNotification } from "@/features/notifications/service";
import { findLeads, insertLead } from "./repository";
import type { LeadInput } from "./types";

export async function createLead(input: LeadInput): Promise<{ id: string }> {
  const id = await insertLead(input);
  await createNotification({
    type: "new_lead",
    title: `New lead: ${input.name} (${input.type})`,
    link: "/en/admin/leads",
  });
  return { id };
}

export async function listLeads() {
  return findLeads();
}
