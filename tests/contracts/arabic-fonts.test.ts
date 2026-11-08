import { describe, expect, it } from "vitest";
import { listFiles, readProjectFile } from "../helpers/files";

// next/font gives every font an Arial-based "<Name> Fallback" face, and Arial has Arabic letters. A stack built from
// the font CSS variables ("var(--latin), var(--arabic)") therefore renders Arabic in Arial. Template font files build
// their stacks with fontStack (demo-engine/fonts/font-stack.ts), which lists every real font before the fallbacks.
function stackProblems(file: string, source: string): string[] {
  const problems: string[] = [];
  if (!source.includes("fontStack(")) problems.push(`${file}: builds no stack with fontStack`);
  if (/["'`][^"'`]*var\(--[^"'`]*,[^"'`]*var\(--/.test(source))
    problems.push(`${file}: stack of font variables`);
  return problems;
}

describe("i18n-rtl: Arabic text uses the template's Arabic font", () => {
  it("every next/font file builds its font stacks with fontStack", () => {
    const offenders = listFiles("src", [".ts", ".tsx"])
      .filter((file) => !file.endsWith(".test.ts"))
      .filter((file) => readProjectFile(file).includes("next/font/google"))
      .flatMap((file) => stackProblems(file, readProjectFile(file)));
    expect(offenders).toEqual([]);
  });

  it("flags a stack made of font variables (guards this check itself)", () => {
    expect(stackProblems("a.ts", `const s = "var(--latin), var(--arabic), sans-serif";`)).toEqual([
      "a.ts: builds no stack with fontStack",
      "a.ts: stack of font variables",
    ]);
    expect(stackProblems("b.ts", `const s = fontStack([latin, arabic], "sans-serif");`)).toEqual([]);
  });
});
