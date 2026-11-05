import { describe, expect, it } from "vitest";
import ar from "@/shared/i18n/messages/ar.json";
import en from "@/shared/i18n/messages/en.json";

type Entries = Map<string, string>;

function flatten(node: unknown, prefix = "", into: Entries = new Map()): Entries {
  if (typeof node === "string") into.set(prefix, node);
  else if (typeof node === "object" && node !== null) {
    for (const [key, value] of Object.entries(node)) flatten(value, prefix ? `${prefix}.${key}` : key, into);
  } else into.set(prefix, String(node));
  return into;
}

function placeholders(text: string): string[] {
  return [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1] ?? "").sort();
}

// Every content source with { ar, en } versions is added here as it is created
// (Software Guide content, template seeds).
const sources = [{ name: "shared/i18n messages", ar: flatten(ar), en: flatten(en) }];

describe.each(sources)("Arabic and English stay complete: $name", ({ ar: arabic, en: english }) => {
  it("have exactly the same keys", () => {
    expect([...arabic.keys()].sort()).toEqual([...english.keys()].sort());
  });

  it("have no empty text", () => {
    const empty = [...arabic, ...english].filter(([, text]) => text.trim() === "").map(([key]) => key);
    expect(empty).toEqual([]);
  });

  it("use the same {placeholders} in both languages", () => {
    for (const [key, text] of english) {
      expect(placeholders(arabic.get(key) ?? ""), key).toEqual(placeholders(text));
    }
  });
});
