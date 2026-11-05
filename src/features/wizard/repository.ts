import "server-only";
import { connectDb } from "@/shared/db/connect";
import { LeadModel } from "./model";
import type { LeadInput } from "./types";

export async function insertLead(input: LeadInput): Promise<string> {
  await connectDb();
  const lead = await LeadModel.create(input);
  return lead.id;
}

export async function findLeads() {
  await connectDb();
  return LeadModel.find().sort({ createdAt: -1 }).lean();
}
