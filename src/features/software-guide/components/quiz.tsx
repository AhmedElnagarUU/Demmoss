"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@/features/tracking/client/track";
import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { LinkButton } from "@/shared/ui/link-button";
import { fillPlaceholders, pickRecommendation, type Recommendation } from "../quiz";
import type { GuideContent, GuideType } from "../types";

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
    <>
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
            <fieldset key={question.id} className="guide-card flex flex-col gap-3 p-5">
              <legend className="px-2 font-semibold text-text">
                <span className="block text-sm font-medium text-muted">
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
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-border bg-bg/40 px-4 py-2 text-text transition-colors hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus"
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
            <Button type="submit" disabled={!allAnswered} className="site-pill">
              {content.submit}
            </Button>
            {allAnswered ? null : <p className="text-sm text-muted">{content.incomplete}</p>}
          </div>
        </form>
      )}
    </>
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
    <div className="site-panel flex flex-col items-start gap-4 p-6" aria-live="polite">
      <p className="text-sm font-semibold text-muted">{content.resultLabel}</p>
      <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-text focus:outline-none">
        {fillPlaceholders(result.title, names)}
      </h3>
      <p className="text-lg leading-relaxed text-muted">{result.why}</p>
      <div className="flex flex-wrap gap-3">
        <LinkButton
          href={`/${locale}/start?type=${recommendation.wizardType}`}
          className="site-pill bg-primary text-on-primary hover:bg-primary-hover"
        >
          {content.startProject}
        </LinkButton>
        <LinkButton href={`/${locale}/demos`} variant="secondary" className="site-pill site-btn-ghost">
          {content.seeDemos}
        </LinkButton>
        {isTie ? (
          <TrackedWhatsAppButton
            locale={locale}
            label={content.whatsapp}
            message={fillPlaceholders(content.whatsappMessage, names)}
            className="site-pill"
          />
        ) : null}
        <Button variant="secondary" onClick={onRestart} className="site-pill">
          {content.restart}
        </Button>
      </div>
    </div>
  );
}
