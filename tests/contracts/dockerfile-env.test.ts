import { describe, expect, it } from "vitest";
import { publicEnvSchema } from "@/shared/env";
import { readProjectFile } from "../helpers/files";

// The Docker image bakes the public settings from the Dockerfile ARG defaults into every page. A bad value
// (e.g. a site URL without https://) would only fail inside the release build, so it is checked here first.
function dockerfileDefaults(): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const [, name = "", value = ""] of readProjectFile("Dockerfile").matchAll(
    /^ARG (NEXT_PUBLIC_[A-Z_]+)=(.*)$/gm,
  )) {
    defaults[name] = value.trim();
  }
  return defaults;
}

describe("release: the Dockerfile public settings are valid", () => {
  it("every NEXT_PUBLIC_ setting has a default that passes the app's env schema", () => {
    const result = publicEnvSchema.safeParse(dockerfileDefaults());
    expect(result.success ? [] : result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)).toEqual(
      [],
    );
  });
});
