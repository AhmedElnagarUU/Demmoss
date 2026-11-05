import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { afterAll, afterEach, beforeAll } from "vitest";
import { connectDb, disconnectDb } from "@/shared/db/connect";

// Starts a real, empty MongoDB in memory for the test file and clears it after each test.
export function setupTestDatabase(): void {
  let server: MongoMemoryServer | undefined;

  beforeAll(async () => {
    server = await MongoMemoryServer.create();
    process.env.MONGODB_URI = server.getUri();
    await connectDb();
    await Promise.all(Object.values(mongoose.models).map((model) => model.init()));
  });

  afterEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map((c) => c.deleteMany({})));
  });

  afterAll(async () => {
    await disconnectDb();
    await server?.stop();
  });
}
