import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().trim().min(1).max(60),
  passwordHash: z.string().regex(/^[0-9a-f]{64}$/),
  businessName: z.string().trim().max(80).optional(),
});

export type Account = z.infer<typeof accountSchema>;
