import type { GuideContent } from "../types";
import { GuideSection } from "./guide-section";
import { QuizLink } from "./quiz-link";

type Props = { content: GuideContent["rentOrBuild"]; quizLink: string };

export function RentOrBuild({ content, quizLink }: Props) {
  const choices = [content.rent, content.build, content.mix];
  return (
    <GuideSection id="rent-or-build" title={content.title}>
      <p className="text-lg text-muted">{content.text}</p>
      <ul className="grid gap-4 md:grid-cols-3">
        {choices.map((choice) => (
          <li key={choice.label} className="rounded-control border border-border bg-bg p-5">
            <p className="font-bold">{choice.label}</p>
            <p className="mt-2">{choice.text}</p>
          </li>
        ))}
      </ul>
      <QuizLink label={quizLink} />
    </GuideSection>
  );
}
