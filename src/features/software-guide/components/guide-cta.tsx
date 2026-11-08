import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import type { GuideContent } from "../types";

type Props = { locale: Locale; content: GuideContent["cta"] };

export function GuideCta({ locale, content }: Props) {
  return (
    <section id="cta" aria-labelledby="cta-title" className="guide-anchor border-t border-border py-12">
      <div className="site-panel w-full p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-16 -top-24 size-64 rounded-full bg-primary/10 blur-3xl"
        />
        <h2 id="cta-title" className="site-display relative text-[clamp(1.75rem,4vw,2.25rem)] text-text">
          {content.title}
        </h2>
        <p className="relative mt-4 text-lg leading-relaxed text-muted">{content.text}</p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <LinkButton
            href={`/${locale}/start`}
            className="site-pill bg-primary text-on-primary hover:bg-primary-hover"
          >
            {content.startProject}
          </LinkButton>
          <LinkButton href={`/${locale}/demos`} variant="secondary" className="site-pill site-btn-ghost">
            {content.seeDemos}
          </LinkButton>
          <TrackedWhatsAppButton
            locale={locale}
            label={content.whatsapp}
            message={content.whatsappMessage}
            className="site-pill site-btn-ghost"
          />
        </div>
      </div>
    </section>
  );
}
