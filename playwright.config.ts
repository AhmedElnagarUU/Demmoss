import { defineConfig, devices } from "@playwright/test";

export const E2E_PORT = 3100;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${E2E_PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "phone", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `node e2e/server.mjs ${E2E_PORT}`,
    url: `http://localhost:${E2E_PORT}/ar`,
    timeout: 180_000,
    reuseExistingServer: false,
    stdout: "pipe",
  },
});
