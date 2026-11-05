import { describe, expect, it } from "vitest";
import { listFiles, readProjectFile } from "../helpers/files";

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

// Every ar.json in src/ must have an en.json next to it (messages, guide content, seeds), and the reverse.
const arabicFiles = listFiles("src", ["ar.json"]);
const englishFiles = listFiles("src", ["en.json"]);

const sources = arabicFiles.map((arFile) => {
  const enFile = arFile.replace(/ar\.json$/, "en.json");
  return {
    name: arFile,
    ar: flatten(JSON.parse(readProjectFile(arFile))),
    en: flatten(englishFiles.includes(enFile) ? JSON.parse(readProjectFile(enFile)) : {}),
  };
});

it("every en.json has an ar.json next to it", () => {
  const missing = englishFiles.filter((file) => !arabicFiles.includes(file.replace(/en\.json$/, "ar.json")));
  expect(missing).toEqual([]);
});

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
