import { TrackedLanguageSwitch } from "@/features/tracking/components/tracked-language-switch";
import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import { publicEnv } from "@/shared/env";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { Logo } from "@/shared/ui/logo";

// Temporary home until the landing page is built in phase 2 (docs/features/landing.md).
export function LandingPlaceholder({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const brand = publicEnv.NEXT_PUBLIC_BRAND_NAME;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4">
        {t("common.skipToContent")}
      </a>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Logo href={`/${locale}`} />
        <TrackedLanguageSwitch locale={locale} label={t("common.switchLanguage")} />
      </header>
      <main id="main" className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 py-16">
        <h1 className="text-3xl font-bold sm:text-5xl">{t("home.title")}</h1>
        <p className="text-lg text-muted">{t("home.subtitle")}</p>
        <p className="text-base text-muted">{t("home.comingSoon")}</p>
        <TrackedWhatsAppButton
          locale={locale}
          label={t("common.whatsapp")}
          message={t("common.whatsappMessage", { brand })}
        />
      </main>
    </>
  );
}
