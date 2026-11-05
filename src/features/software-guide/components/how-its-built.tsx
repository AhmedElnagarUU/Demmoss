import type { GuideContent } from "../types";
import { GuideSection } from "./guide-section";
import { QuizLink } from "./quiz-link";

type Props = { content: GuideContent["howBuilt"]; quizLink: string };

export function HowItsBuilt({ content, quizLink }: Props) {
  return (
    <GuideSection id="how-built" title={content.title} tone="soft">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((part) => (
          <li key={part.id} className="rounded-control border border-border bg-bg p-5">
            <h3 className="font-bold">{part.title}</h3>
            <p className="mt-2">{part.text}</p>
          </li>
        ))}
      </ul>
      <QuizLink label={quizLink} />
    </GuideSection>
  );
}
