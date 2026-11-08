import type { GuideContent } from "../types";
import { QuizLink } from "./quiz-link";

type Props = { content: GuideContent["comparison"]; quizLink: string };

export function ComparisonTable({ content, quizLink }: Props) {
  return (
    <>
      <div
        role="region"
        aria-label={content.caption}
        tabIndex={0}
        className="guide-card overflow-x-auto focus-visible:outline-2 focus-visible:outline-focus"
      >
        <table className="w-full min-w-[40rem] border-collapse text-start text-sm">
          <caption className="sr-only">{content.caption}</caption>
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="sticky start-0 w-32 bg-surface p-3 text-start font-semibold text-muted"
              >
                {content.rowHeader}
              </th>
              {content.columns.map((column) => (
                <th key={column.id} scope="col" className="p-3 text-start font-semibold text-text">
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-b-0">
                <th
                  scope="row"
                  className="sticky start-0 w-32 bg-surface p-3 text-start font-semibold text-text"
                >
                  {row.label}
                </th>
                {row.values.map((value, index) => (
                  <td key={content.columns[index]?.id ?? index} className="p-3 align-top text-muted">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <QuizLink label={quizLink} />
    </>
  );
}
