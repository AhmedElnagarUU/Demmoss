import { describe, expect, it } from "vitest";
import { passwordMatches } from "./password";

describe("C1: the admin password", () => {
  it("accepts the password from .env and rejects a wrong one", () => {
    expect(passwordMatches("correct horse battery staple", "correct horse battery staple")).toBe(true);
    expect(passwordMatches("correct horse battery stapl", "correct horse battery staple")).toBe(false);
    expect(passwordMatches("correct horse battery staple ", "correct horse battery staple")).toBe(false);
    expect(passwordMatches("", "correct horse battery staple")).toBe(false);
  });

  it("is case-sensitive and works with Arabic passwords", () => {
    expect(passwordMatches("Secret-Pass", "secret-pass")).toBe(false);
    expect(passwordMatches("كلمة-سر-قوية", "كلمة-سر-قوية")).toBe(true);
  });

  it("never matches when no password is configured", () => {
    expect(passwordMatches("", "")).toBe(false);
  });
});
