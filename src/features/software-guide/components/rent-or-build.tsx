import type { GuideContent } from "../types";
import { QuizLink } from "./quiz-link";

type Props = { content: GuideContent["rentOrBuild"]; quizLink: string };

export function RentOrBuild({ content, quizLink }: Props) {
  const choices = [content.rent, content.build, content.mix];
  return (
    <>
      <ul className="flex flex-col gap-3">
        {choices.map((choice) => (
          <li key={choice.label} className="guide-card p-4">
            <p className="font-semibold text-primary">{choice.label}</p>
            <p className="mt-1 text-base leading-relaxed text-muted">{choice.text}</p>
          </li>
        ))}
      </ul>
      <QuizLink label={quizLink} />
    </>
  );
}
