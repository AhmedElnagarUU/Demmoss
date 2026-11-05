import { z } from "zod";
import { localizedTextSchema } from "@/features/demo-engine/types";
import type { Property } from "../../types";

// Variant A (agency) only.
export const agentSchema = z.object({
  id: z.string().min(1),
  name: localizedTextSchema,
  role: localizedTextSchema,
  phone: z.string().trim().min(1).max(30),
  // a photo id from the agency photo list
  photo: z.string().min(1),
});

export const agentsShape = { agents: z.array(agentSchema) };

export type Agent = z.infer<typeof agentSchema>;
export type AgentsData = { agents: Agent[]; properties: Property[] };
