import type { GuideContent } from "../types";
import { QuizLink } from "./quiz-link";

type Props = { content: GuideContent["types"]; quizLink: string };

export function TypeCards({ content, quizLink }: Props) {
  const { labels } = content;
  return (
    <>
      <div className="flex flex-col gap-5">
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
            <article id={type.id} key={type.id} className="guide-card guide-anchor flex flex-col gap-4 p-5">
              <h3 className="text-xl font-semibold text-text">{type.name}</h3>
              <p className="text-base font-medium text-primary">{type.oneLine}</p>
              <dl className="flex flex-col gap-3">
                {rows.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-sm font-semibold text-muted">{label}</dt>
                    <dd className="text-base leading-relaxed text-text">{value}</dd>
                  </div>
                ))}
              </dl>
              {type.note ? (
                <p className="rounded-lg border border-primary/20 bg-primary/10 p-3 text-sm font-medium text-primary">
                  {type.note}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
      <QuizLink label={quizLink} />
    </>
  );
}
