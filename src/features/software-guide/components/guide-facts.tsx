import type { GuideContent } from "../types";
import { GuideSection } from "./guide-section";

export function GuideFacts({ content }: { content: GuideContent["facts"] }) {
  return (
    <GuideSection id="why" title={content.title} tone="soft">
      <ul className="grid gap-4 sm:grid-cols-2">
        {content.items.map((fact) => (
          <li key={fact.id} className="rounded-control border border-border bg-bg p-5 text-base">
            {fact.text}
          </li>
        ))}
      </ul>
    </GuideSection>
  );
}
