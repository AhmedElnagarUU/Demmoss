import { describe, expect, it } from "vitest";
import { listFiles, readProjectFile } from "../helpers/files";

const physicalClass = [
  /^(m[lr]|p[lr]|left|right|scroll-m[lr]|scroll-p[lr])-/,
  /^text-(left|right)$/,
  /^(rounded-[lr]|rounded-[tb][lr]|border-[lr])(-|$)/,
  /^(float|clear)-(left|right)$/,
];

function physicalClassesIn(source: string): string[] {
  return source
    .split(/[\s"'`{}()<>,;]+/)
    .map((token) => (token.split(":").pop() ?? "").replace(/^[!-]+/, ""))
    .filter((token) => physicalClass.some((pattern) => pattern.test(token)));
}

describe("RTL: only logical direction classes (i18n-rtl rule)", () => {
  it("finds no ml-/mr-/pl-/pr-/left-/right-/text-left/text-right in src", () => {
    const offenders = listFiles("src", [".ts", ".tsx", ".css"])
      .filter((file) => !file.endsWith(".test.ts"))
      .flatMap((file) => physicalClassesIn(readProjectFile(file)).map((cls) => `${file}: ${cls}`));
    expect(offenders).toEqual([]);
  });

  it("detects physical classes, including with variants (guards this check itself)", () => {
    expect(physicalClassesIn(`className="ms-4 md:ml-2 -mr-1 text-left rounded-r-lg start-0"`)).toEqual([
      "ml-2",
      "mr-1",
      "text-left",
      "rounded-r-lg",
    ]);
  });
});
