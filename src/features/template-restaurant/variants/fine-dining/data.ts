import type { z } from "zod";
import { eventRequestsShape } from "../../modules/event-requests/types";
import { reservationsShape } from "../../modules/reservations/types";
import { restaurantDataSchema } from "../../types";

// Verdant Table stores the shared restaurant data + reservations + event requests.
export const fineDiningSchema = restaurantDataSchema.extend({
  ...reservationsShape,
  ...eventRequestsShape,
});

export type FineDiningData = z.infer<typeof fineDiningSchema>;
