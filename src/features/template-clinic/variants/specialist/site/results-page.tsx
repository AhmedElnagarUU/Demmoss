"use client";

import { useClinic } from "../../../context";
import { BeforeAfter } from "../../../site/before-after";
import { wrap, SectionHead } from "../../../site/site-ui";
import { getSpecialistT } from "../messages";

// Results: every visible before / after pair, one slider each.
export function ResultsPage() {
  const { store, locale } = useClinic();
  const st = getSpecialistT(locale);
  const allResults = store((state) => state.results);
  const results = allResults.filter((item) => item.visible);

  return (
    <div className={`${wrap} space-y-14 py-12`}>
      <SectionHead
        level={1}
        pill={st("nav.results")}
        title={st("results.title")}
        titleId="results-title"
        intro={st("results.intro")}
      />
      {results.length === 0 ? <p className="text-center text-muted">{st("results.empty")}</p> : null}
      {results.map((result) => (
        <BeforeAfter key={result.id} result={result} locale={locale} />
      ))}
    </div>
  );
}
