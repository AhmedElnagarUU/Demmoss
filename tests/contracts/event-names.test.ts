import { describe, expect, it } from "vitest";
import { eventNames } from "@/features/tracking/types";
import { readProjectFile } from "../helpers/files";

describe("tracking events match the analytics rules", () => {
  it("the code accepts exactly the events listed in .claude/rules/analytics.md", () => {
    const documented = [
      ...readProjectFile(".claude/rules/analytics.md").matchAll(/^\| `([a-z_]+)` \|/gm),
    ].map((match) => match[1]);
    expect([...eventNames].sort()).toEqual(documented.sort());
  });
});
