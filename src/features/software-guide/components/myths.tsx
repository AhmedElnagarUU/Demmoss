import type { GuideContent } from "../types";
import { QuizLink } from "./quiz-link";

type Props = { content: GuideContent["myths"]; quizLink: string };

export function Myths({ content, quizLink }: Props) {
  return (
    <>
      <ul className="flex flex-col gap-3">
        {content.items.map((item) => (
          <li key={item.id}>
            <details id={`myth-${item.id}`} className="guide-card guide-anchor group">
              <summary className="flex min-h-11 cursor-pointer list-none items-start gap-3 p-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
                <span className="text-base leading-relaxed text-text">
                  <span className="font-semibold text-muted">{content.mythLabel}: </span>
                  {item.myth}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="ms-auto mt-1.5 size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="border-t border-border px-4 py-3 text-base leading-relaxed text-text">
                <span className="font-semibold text-primary">{content.truthLabel}: </span>
                {item.truth}
              </p>
            </details>
          </li>
        ))}
      </ul>
      <QuizLink label={quizLink} />
    </>
  );
}
