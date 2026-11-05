import "server-only";
import { connectDb } from "@/shared/db/connect";
import { LeadModel } from "./model";
import type { LeadInput, LeadStatus } from "./types";

export async function insertLead(input: LeadInput): Promise<string> {
  await connectDb();
  const lead = await LeadModel.create(input);
  return lead.id;
}

export async function findLeads(status?: LeadStatus) {
  await connectDb();
  return LeadModel.find(status ? { status } : {})
    .sort({ createdAt: -1, _id: -1 })
    .lean();
}

export async function setLeadStatus(id: string, status: LeadStatus): Promise<void> {
  await connectDb();
  await LeadModel.updateOne({ _id: id }, { $set: { status } });
}

export async function setLeadNotes(id: string, notes: string): Promise<void> {
  await connectDb();
  await LeadModel.updateOne({ _id: id }, { $set: { notes } });
}

export async function countLeadsByStatus(): Promise<{ status: LeadStatus; count: number }[]> {
  await connectDb();
  const rows = await LeadModel.aggregate<{ _id: LeadStatus; count: number }>([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  return rows.map((row) => ({ status: row._id, count: row.count }));
}
