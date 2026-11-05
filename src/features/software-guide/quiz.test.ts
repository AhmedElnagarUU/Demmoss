import { describe, expect, it } from "vitest";
import { fillPlaceholders, pickRecommendation } from "./quiz";

describe("pickRecommendation (SG5)", () => {
  it("SG5: the type with the most answers wins", () => {
    const result = pickRecommendation(["system", "system", "saas", "system", "profile"]);
    expect(result).toEqual({ type: "system", tied: ["system"], wizardType: "system" });
  });

  it("SG5: tie goes to the simpler type and reports both tied types", () => {
    const result = pickRecommendation(["saas", "functional", "saas", "functional", "profile"]);
    expect(result.type).toBe("functional");
    expect(result.tied).toEqual(["functional", "saas"]);
  });

  it("SG5: a tie between profile and the others picks profile", () => {
    expect(pickRecommendation(["system", "profile", "system", "profile", "saas"]).type).toBe("profile");
  });

  it("SG6: profile and functional lead to the business website in the wizard", () => {
    expect(pickRecommendation(["profile", "profile", "profile"]).wizardType).toBe("business");
    expect(pickRecommendation(["functional", "functional"]).wizardType).toBe("business");
  });

  it("SG6: system and saas keep their own wizard type", () => {
    expect(pickRecommendation(["system"]).wizardType).toBe("system");
    expect(pickRecommendation(["saas", "saas"]).wizardType).toBe("saas");
  });

  it("SG5: answering the same type everywhere is a clear win, not a tie", () => {
    expect(pickRecommendation(["saas", "saas", "saas", "saas", "saas"]).tied).toEqual(["saas"]);
  });

  it("SG5: no answers is rejected", () => {
    expect(() => pickRecommendation([])).toThrow();
  });
});

describe("fillPlaceholders", () => {
  it("SG5: fills {a} and {b} in the tie message and leaves unknown ones", () => {
    expect(fillPlaceholders("Between {a} and {b} {c}", { a: "X", b: "Y" })).toBe("Between X and Y {c}");
  });
});
