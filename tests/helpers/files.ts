import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export const projectRoot = path.resolve(import.meta.dirname, "../..");

export function listFiles(directory: string, extensions: string[]): string[] {
  const absolute = path.join(projectRoot, directory);
  return readdirSync(absolute, { recursive: true, encoding: "utf8" })
    .filter((file) => extensions.some((extension) => file.endsWith(extension)))
    .map((file) => path.join(directory, file));
}

export function readProjectFile(file: string): string {
  return readFileSync(path.join(projectRoot, file), "utf8");
}
