import type { GuideContent } from "../types";
import { GuideSection } from "./guide-section";
import { QuizLink } from "./quiz-link";

type Props = { content: GuideContent["types"]; quizLink: string };

export function TypeCards({ content, quizLink }: Props) {
  const { labels } = content;
  return (
    <GuideSection id="types" title={content.title}>
      <p className="text-lg text-muted">{content.intro}</p>
      <div className="grid gap-6 md:grid-cols-2">
        {content.items.map((type) => {
          const rows: [string, string][] = [
            [labels.analogy, type.analogy],
            [labels.whatItDoes, type.whatItDoes],
            [labels.examples, type.examples],
            [labels.goodFor, type.goodFor],
            [labels.youManage, type.youManage],
            [labels.effort, type.effort],
          ];
          return (
            <article
              key={type.id}
              className="flex flex-col gap-4 rounded-control border border-border bg-bg p-6"
            >
              <h3 className="text-xl font-bold">{type.name}</h3>
              <p className="text-lg font-semibold">{type.oneLine}</p>
              <dl className="flex flex-col gap-3">
                {rows.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-sm font-semibold text-muted">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              {type.note ? (
                <p className="rounded-control bg-surface p-3 text-sm font-semibold">{type.note}</p>
              ) : null}
            </article>
          );
        })}
      </div>
      <QuizLink label={quizLink} />
    </GuideSection>
  );
}
