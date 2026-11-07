// A hero title may mark one accent word with stars, like "Seasons, set *simply* on the table".
// The source design shows that word in gold italic. Without stars the whole title is plain.
export function splitEmphasis(text: string): { before: string; accent: string; after: string } {
  const match = /^([^*]*)\*([^*]+)\*([^*]*)$/.exec(text);
  if (!match) return { before: text, accent: "", after: "" };
  return { before: match[1] ?? "", accent: match[2] ?? "", after: match[3] ?? "" };
}
