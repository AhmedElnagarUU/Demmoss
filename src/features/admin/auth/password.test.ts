import { execFileSync } from "node:child_process";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("C1: the admin password", () => {
  it("accepts the right password and rejects a wrong one", () => {
    const stored = hashPassword("correct horse battery staple");
    expect(verifyPassword("correct horse battery staple", stored)).toBe(true);
    expect(verifyPassword("correct horse battery stapl", stored)).toBe(false);
    expect(verifyPassword("", stored)).toBe(false);
  });

  it("uses a new salt each time, so two hashes of one password differ", () => {
    expect(hashPassword("same")).not.toBe(hashPassword("same"));
  });

  it("rejects a stored value that is not in the scrypt$salt$hash format", () => {
    expect(verifyPassword("anything", "")).toBe(false);
    expect(verifyPassword("anything", "bcrypt$abc$def")).toBe(false);
    expect(verifyPassword("anything", "scrypt$abcd")).toBe(false);
    expect(verifyPassword("anything", "scrypt$abcd$ef")).toBe(false);
  });

  it("accepts a hash made by scripts/hash-password.mjs (the one the owner puts in .env)", () => {
    const script = path.resolve(import.meta.dirname, "../../../../scripts/hash-password.mjs");
    const stored = execFileSync("node", [script, "from the script"], { encoding: "utf8" }).trim();
    expect(verifyPassword("from the script", stored)).toBe(true);
    expect(verifyPassword("something else", stored)).toBe(false);
  });
});
