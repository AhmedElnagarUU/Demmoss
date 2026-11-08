import type { GuideContent } from "../types";

export function GuideFacts({ content }: { content: GuideContent["facts"] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {content.items.map((fact) => (
        <li key={fact.id} className="guide-card p-4 text-base leading-relaxed text-muted">
          {fact.text}
        </li>
      ))}
    </ul>
  );
}
