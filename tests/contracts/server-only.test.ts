import { describe, expect, it } from "vitest";
import { listFiles, readProjectFile } from "../helpers/files";

const serverFiles = /(^|\/)(model|repository|service)\.ts$/;

describe("database code never reaches the browser (code rule 5)", () => {
  it('model.ts, repository.ts, and service.ts start with import "server-only"', () => {
    const missing = listFiles("src/features", [".ts"])
      .filter((file) => serverFiles.test(file))
      .filter((file) => !readProjectFile(file).startsWith('import "server-only";'));
    expect(missing).toEqual([]);
  });

  it('actions.ts files are Server Actions ("use server")', () => {
    const missing = listFiles("src/features", ["actions.ts"]).filter(
      (file) => !readProjectFile(file).startsWith('"use server";'),
    );
    expect(missing).toEqual([]);
  });
});
