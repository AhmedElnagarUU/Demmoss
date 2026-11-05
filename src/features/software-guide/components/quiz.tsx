"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@/features/tracking/client/track";
import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { LinkButton } from "@/shared/ui/link-button";
import { fillPlaceholders, pickRecommendation, type Recommendation } from "../quiz";
import type { GuideContent, GuideType } from "../types";
import { GuideSection } from "./guide-section";

type Props = {
  locale: Locale;
  content: GuideContent["quiz"];
  typeNames: Record<GuideType, string>;
};

export function Quiz({ locale, content, typeNames }: Props) {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);

  const allAnswered = content.questions.every((question) => picked[question.id]);

  useEffect(() => {
    if (recommendation) resultHeading.current?.focus();
  }, [recommendation]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!allAnswered) return;
    const answers = content.questions.flatMap((question) => {
      const option = question.options.find((candidate) => candidate.id === picked[question.id]);
      return option ? [option.type] : [];
    });
    const result = pickRecommendation(answers);
    setRecommendation(result);
    track("guide_quiz_completed", {
      locale,
      meta: { result: result.tied.length > 1 ? "tie" : result.type },
    });
  }

  function restart() {
    setPicked({});
    setRecommendation(null);
  }

  return (
    <GuideSection id="quiz" title={content.title}>
      <p className="text-lg text-muted">{content.intro}</p>
      {recommendation ? (
        <QuizResult
          locale={locale}
          content={content}
          typeNames={typeNames}
          recommendation={recommendation}
          headingRef={resultHeading}
          onRestart={restart}
        />
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-6">
          {content.questions.map((question, index) => (
            <fieldset
              key={question.id}
              className="flex flex-col gap-3 rounded-control border border-border p-5"
            >
              <legend className="px-2 font-bold">
                <span className="block text-sm font-semibold text-muted">
                  {fillPlaceholders(content.questionCount, {
                    number: String(index + 1),
                    total: String(content.questions.length),
                  })}
                </span>
                {question.text}
              </legend>
              {question.options.map((option) => (
                <label
                  key={option.id}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-border px-4 py-2 has-[:checked]:border-primary has-[:checked]:bg-surface has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={picked[question.id] === option.id}
                    onChange={() => setPicked((current) => ({ ...current, [question.id]: option.id }))}
                    className="size-5 accent-primary"
                  />
                  <span>{option.text}</span>
                </label>
              ))}
            </fieldset>
          ))}
          <div className="flex flex-col items-start gap-2">
            <Button type="submit" disabled={!allAnswered}>
              {content.submit}
            </Button>
            {allAnswered ? null : <p className="text-sm text-muted">{content.incomplete}</p>}
          </div>
        </form>
      )}
    </GuideSection>
  );
}

type ResultProps = {
  locale: Locale;
  content: GuideContent["quiz"];
  typeNames: Record<GuideType, string>;
  recommendation: Recommendation;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
};

function QuizResult({ locale, content, typeNames, recommendation, headingRef, onRestart }: ResultProps) {
  const [first, second] = recommendation.tied;
  const isTie = recommendation.tied.length > 1 && first && second;
  const names: Record<string, string> = isTie ? { a: typeNames[first], b: typeNames[second] } : {};
  const result = isTie ? content.results.tie : content.results[recommendation.type];

  return (
    <div
      className="flex flex-col items-start gap-4 rounded-control border border-primary bg-surface p-6"
      aria-live="polite"
    >
      <p className="text-sm font-semibold text-muted">{content.resultLabel}</p>
      <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-bold focus:outline-none">
        {fillPlaceholders(result.title, names)}
      </h3>
      <p className="text-lg">{result.why}</p>
      <div className="flex flex-wrap gap-3">
        <LinkButton href={`/${locale}/start?type=${recommendation.wizardType}`}>
          {content.startProject}
        </LinkButton>
        <LinkButton href={`/${locale}/demos`} variant="secondary">
          {content.seeDemos}
        </LinkButton>
        {isTie ? (
          <TrackedWhatsAppButton
            locale={locale}
            label={content.whatsapp}
            message={fillPlaceholders(content.whatsappMessage, names)}
          />
        ) : null}
        <Button variant="secondary" onClick={onRestart}>
          {content.restart}
        </Button>
      </div>
    </div>
  );
}
