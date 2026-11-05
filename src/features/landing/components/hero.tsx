import type { Locale } from "@/shared/i18n/config";
import { LinkButton } from "@/shared/ui/link-button";
import { landingT } from "../translate";

export function Hero({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-14 sm:py-20">
      <h1 className="max-w-3xl text-3xl font-bold leading-tight text-text sm:text-5xl">{t("hero.title")}</h1>
      <p className="max-w-2xl text-lg text-muted">{t("hero.subtitle")}</p>
      <div className="flex flex-wrap gap-3">
        <LinkButton href={`/${locale}/start`}>{t("hero.start")}</LinkButton>
        <LinkButton href={`/${locale}/demos`} variant="secondary">
          {t("hero.demos")}
        </LinkButton>
      </div>
    </section>
  );
}
