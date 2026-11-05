import { readFileSync } from "node:fs";
import mongoose from "mongoose";

// Reads what the app saved, straight from the test database started by e2e/server.mjs.
export async function withTestDatabase<T>(read: (db: mongoose.mongo.Db) => Promise<T>): Promise<T> {
  const connection = await mongoose.createConnection(readFileSync("e2e/.tmp/mongo-uri", "utf8")).asPromise();
  try {
    if (!connection.db) throw new Error("Test database not connected");
    return await read(connection.db);
  } finally {
    await connection.close();
  }
}
