import type { z } from "zod";
import { agentsShape } from "../../modules/agents/types";
import { realEstateDataSchema } from "../../types";

// The agency stores the shared real estate data + its agents.
export const agencySchema = realEstateDataSchema.extend(agentsShape);

export type AgencyData = z.infer<typeof agencySchema>;
