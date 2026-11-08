"use client";

import { matchesQuery } from "../guide-nav";
import { useGuideQuery } from "../hooks/use-guide-search";
import type { GuideContent } from "../types";

export function Glossary({ content }: { content: GuideContent["glossary"] }) {
  const query = useGuideQuery();
  const entries = content.items.filter((entry) => matchesQuery(query, entry.term, entry.definition));

  return (
    <>
      <dl className="guide-card divide-y divide-border">
        {entries.map((entry) => (
          <div key={entry.id} id={`term-${entry.id}`} className="guide-anchor p-4">
            <dt className="font-semibold text-text">{entry.term}</dt>
            <dd className="mt-1 text-base leading-relaxed text-muted">{entry.definition}</dd>
          </div>
        ))}
      </dl>
      {entries.length === 0 ? (
        <p role="status" className="text-muted">
          {content.noMatch}
        </p>
      ) : null}
    </>
  );
}
