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

export const adminEnvSchema = z.object({
  ADMIN_EMAIL: z.email(),
  ADMIN_PASSWORD: z.string().min(8, "must be at least 8 characters"),
  SESSION_SECRET: z.string().min(32, "must be at least 32 characters"),
});

export type AdminEnv = z.infer<typeof adminEnvSchema>;

// Only admin code calls this, so the public site and the build work without admin settings.
export function getAdminEnv(): AdminEnv {
  return parseEnv(adminEnvSchema, {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET,
  });
}
