import type { GuideContent } from "../types";
import { GuideSection } from "./guide-section";
import { QuizLink } from "./quiz-link";

type Props = { content: GuideContent["myths"]; quizLink: string };

export function Myths({ content, quizLink }: Props) {
  return (
    <GuideSection id="myths" title={content.title}>
      <ul className="grid gap-4 md:grid-cols-2">
        {content.items.map((item) => (
          <li key={item.id} className="flex flex-col gap-3 rounded-control border border-border bg-bg p-5">
            <p>
              <span className="font-bold text-muted">{content.mythLabel}: </span>
              {item.myth}
            </p>
            <p>
              <span className="font-bold text-primary">{content.truthLabel}: </span>
              {item.truth}
            </p>
          </li>
        ))}
      </ul>
      <QuizLink label={quizLink} />
    </GuideSection>
  );
}
