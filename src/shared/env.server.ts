import "server-only";
import { z } from "zod";
import { parseEnv } from "@/shared/env";

export const serverEnvSchema = z.object({
  MONGODB_URI: z.string().regex(/^mongodb(\+srv)?:\/\//, "must start with mongodb:// or mongodb+srv://"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

// Read on demand (not at import) so the app can be built without server secrets.
export function getServerEnv(): ServerEnv {
  return parseEnv(serverEnvSchema, { MONGODB_URI: process.env.MONGODB_URI });
}
