// Starts an in-memory MongoDB and the production Next.js server for E2E tests.
// Run after `next build` (npm run e2e does both); it serves .next/standalone like the Docker image.
import { spawn } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { MongoMemoryServer } from "mongodb-memory-server";

// TEST admin for the E2E journeys (see e2e/helpers/admin.ts). Never real credentials.
const admin = JSON.parse(readFileSync("e2e/helpers/admin-credentials.json", "utf8"));

const port = process.argv[2] ?? "3100";
// E2E_MONGODB_URI lets a developer use their own local MongoDB instead of the in-memory one.
const mongo = process.env.E2E_MONGODB_URI ? null : await MongoMemoryServer.create();
const mongoUri = process.env.E2E_MONGODB_URI ?? mongo.getUri("e2e");

mkdirSync("e2e/.tmp", { recursive: true });
writeFileSync("e2e/.tmp/mongo-uri", mongoUri);

// Same server as the Docker image: the standalone build plus its static files and public folder.
cpSync("public", ".next/standalone/public", { recursive: true });
cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });

const next = spawn(process.execPath, [".next/standalone/server.js"], {
  stdio: "inherit",
  env: {
    ...process.env,
    PORT: port,
    HOSTNAME: "localhost",
    MONGODB_URI: mongoUri,
    ADMIN_EMAIL: admin.email,
    ADMIN_PASSWORD: admin.password,
    SESSION_SECRET: admin.sessionSecret,
    // All E2E tests share one localhost address, so the per-client limits would block later tests.
    RATE_LIMIT_DISABLED: "true",
    // Skip the developer's .env files: the test admin above must win over their values.
    __NEXT_PROCESSED_ENV: "true",
  },
});

async function stop() {
  next.kill();
  await mongo?.stop();
  process.exit(0);
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
next.on("exit", (code) => {
  void Promise.resolve(mongo?.stop()).then(() => process.exit(code ?? 1));
});
