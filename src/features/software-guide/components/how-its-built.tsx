import type { GuideContent } from "../types";
import { QuizLink } from "./quiz-link";

type Props = { content: GuideContent["howBuilt"]; quizLink: string };

export function HowItsBuilt({ content, quizLink }: Props) {
  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2">
        {content.items.map((part) => (
          <li key={part.id} id={`part-${part.id}`} className="guide-card guide-anchor p-4">
            <h3 className="font-semibold text-text">{part.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted">{part.text}</p>
          </li>
        ))}
      </ul>
      <QuizLink label={quizLink} />
    </>
  );
}
