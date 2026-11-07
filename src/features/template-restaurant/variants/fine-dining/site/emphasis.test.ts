import { describe, expect, it } from "vitest";
import { splitEmphasis } from "./emphasis";

describe("hero title accent word", () => {
  it("splits the starred word from the text around it, in English and Arabic", () => {
    expect(splitEmphasis("Seasons, set *simply* on the table")).toEqual({
      before: "Seasons, set ",
      accent: "simply",
      after: " on the table",
    });
    expect(splitEmphasis("مواسم تُقدَّم *ببساطة* على المائدة")).toEqual({
      before: "مواسم تُقدَّم ",
      accent: "ببساطة",
      after: " على المائدة",
    });
  });

  it("keeps a title without stars as plain text", () => {
    expect(splitEmphasis("Seasons on the table")).toEqual({
      before: "Seasons on the table",
      accent: "",
      after: "",
    });
  });

  it("ignores broken markers instead of showing a half accent", () => {
    expect(splitEmphasis("Seasons *simply on the table").accent).toBe("");
  });
});
