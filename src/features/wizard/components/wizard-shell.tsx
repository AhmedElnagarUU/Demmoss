import type { ReactNode } from "react";
import { TrackedLanguageSwitch } from "@/features/tracking/components/tracked-language-switch";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { Logo } from "@/shared/ui/logo";

export function WizardShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getT(locale);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4">
        {t("common.skipToContent")}
      </a>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Logo href={`/${locale}`} />
        <TrackedLanguageSwitch locale={locale} label={t("common.switchLanguage")} />
      </header>
      <main id="main" className="mx-auto flex max-w-xl flex-col gap-6 px-4 pb-16 pt-6">
        {children}
      </main>
    </>
  );
}
