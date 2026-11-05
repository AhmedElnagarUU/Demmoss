import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "server-only": path.resolve(import.meta.dirname, "tests/helpers/server-only.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    hookTimeout: 120_000,
    env: {
      NEXT_PUBLIC_BRAND_NAME: "Test Brand",
      NEXT_PUBLIC_WHATSAPP_NUMBER: "966500000000",
      NEXT_PUBLIC_DEFAULT_LOCALE: "ar",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    },
  },
});
