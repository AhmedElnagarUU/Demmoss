// A font loaded with next/font: its family is "'Name', 'Name Fallback'". The fallback is a local Arial face that also
// contains Arabic letters, so a stack like "var(--latin), var(--arabic)" renders Arabic in Arial and never reaches the
// Arabic font. fontStack lists every real font first and the fallbacks after them.
type LoadedFont = { style: { fontFamily: string } };

export function fontStack(fonts: readonly LoadedFont[], generic: string): string {
  const families = fonts.map((font) => font.style.fontFamily.split(",").map((name) => name.trim()));
  const realFonts = families.map((names) => names[0]);
  const fallbacks = families.flatMap((names) => names.slice(1));
  return [...realFonts, ...fallbacks, generic].join(", ");
}
