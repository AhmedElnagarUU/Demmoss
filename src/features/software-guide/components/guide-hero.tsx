import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import type { GuideContent } from "../types";

type Props = { locale: Locale; content: GuideContent["hero"] };

export function GuideHero({ locale, content }: Props) {
  return (
    <section
      aria-labelledby="guide-title"
      className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 py-12 sm:py-20"
    >
      <h1 id="guide-title" className="text-3xl font-bold sm:text-5xl">
        {content.title}
      </h1>
      <p className="text-lg text-muted">{content.subtitle}</p>
      <div className="flex flex-wrap gap-3">
        <LinkButton href="#quiz">{content.findCta}</LinkButton>
        <LinkButton href={`/${locale}/demos`} variant="secondary">
          {content.demosCta}
        </LinkButton>
      </div>
    </section>
  );
}
