import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import type { GuideContent } from "../types";

type Props = { locale: Locale; content: GuideContent["cta"] };

export function GuideCta({ locale, content }: Props) {
  return (
    <section aria-labelledby="cta-title" className="bg-surface">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 px-4 py-14 sm:py-20">
        <h2 id="cta-title" className="text-2xl font-bold sm:text-4xl">
          {content.title}
        </h2>
        <p className="text-lg text-muted">{content.text}</p>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={`/${locale}/start`}>{content.startProject}</LinkButton>
          <LinkButton href={`/${locale}/demos`} variant="secondary">
            {content.seeDemos}
          </LinkButton>
          <TrackedWhatsAppButton locale={locale} label={content.whatsapp} message={content.whatsappMessage} />
        </div>
      </div>
    </section>
  );
}
