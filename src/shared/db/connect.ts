import "server-only";
import mongoose from "mongoose";
import { getServerEnv } from "@/shared/env.server";

const cache = globalThis as unknown as { mongooseConnection?: Promise<typeof mongoose> };

export function connectDb(): Promise<typeof mongoose> {
  cache.mongooseConnection ??= mongoose
    .connect(getServerEnv().MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .catch((error: unknown) => {
      cache.mongooseConnection = undefined;
      throw error;
    });
  return cache.mongooseConnection;
}

export async function disconnectDb(): Promise<void> {
  cache.mongooseConnection = undefined;
  await mongoose.disconnect();
}
