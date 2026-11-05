"use client";

import Link from "next/link";
import { track } from "@/features/tracking/client/track";
import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { buttonClasses } from "@/shared/ui/button-styles";
import { getEngineT } from "../messages";
import type { EngineStore } from "../storage/create-template-store";
import { setSessionFlag, useSessionFlag } from "../storage/session-flag";

type Props = {
  store: EngineStore;
  slug: string;
  templateName: string;
  locale: Locale;
  dashboardHref: string;
};

export function DemoBanner({ store, slug, templateName, locale, dashboardHref }: Props) {
  const t = getEngineT(locale);
  const dismissKey = `demo:banner-dismissed:${slug}`;
  const dismissed = useSessionFlag(dismissKey);
  const resetDemo = store((state) => state.resetDemo);

  if (dismissed) return null;

  function reset() {
    resetDemo();
    track("demo_reset", { locale, template: slug });
  }

  return (
    <div role="region" aria-label={t("banner.text")} className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 text-sm">
        <p className="grow font-semibold text-text">{t("banner.text")}</p>
        <Link href={dashboardHref} className={buttonClasses("secondary")}>
          {t("banner.openDashboard")}
        </Link>
        <TrackedWhatsAppButton
          locale={locale}
          template={slug}
          label={t("banner.whatsapp")}
          message={t("banner.whatsappMessage", { template: templateName })}
        />
        <Button variant="secondary" onClick={reset}>
          {t("banner.reset")}
        </Button>
        <Button
          variant="secondary"
          aria-label={t("banner.dismiss")}
          onClick={() => setSessionFlag(dismissKey, true)}
        >
          ×
        </Button>
      </div>
    </div>
  );
}
