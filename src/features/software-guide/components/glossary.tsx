import type { GuideContent } from "../types";
import { GuideSection } from "./guide-section";

export function Glossary({ content }: { content: GuideContent["glossary"] }) {
  return (
    <GuideSection id="glossary" title={content.title} tone="soft">
      <dl className="grid gap-4 sm:grid-cols-2">
        {content.items.map((entry) => (
          <div key={entry.id} className="rounded-control border border-border bg-bg p-5">
            <dt className="font-bold">{entry.term}</dt>
            <dd className="mt-1">{entry.definition}</dd>
          </div>
        ))}
      </dl>
    </GuideSection>
  );
}
