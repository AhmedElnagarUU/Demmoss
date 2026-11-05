import Link from "next/link";
import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import { publicEnv } from "@/shared/env";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { siteShellT } from "../translate";
import { navItems } from "./nav-items";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = siteShellT(locale);
  const brand = publicEnv.NEXT_PUBLIC_BRAND_NAME;

  return (
    <footer className="mt-12 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-text">{brand}</p>
          <p className="text-sm text-muted">{t("footer.value")}</p>
        </div>
        <nav aria-labelledby="footer-links-title">
          <h2 id="footer-links-title" className="text-sm font-bold text-text">
            {t("footer.linksTitle")}
          </h2>
          <ul className="mt-2 flex flex-col gap-1">
            {navItems(locale).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1 text-sm text-muted hover:text-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-sm font-bold text-text">{t("footer.contactTitle")}</h2>
          <TrackedWhatsAppButton
            locale={locale}
            label={t("footer.whatsapp")}
            message={getT(locale)("common.whatsappMessage", { brand })}
          />
        </div>
      </div>
      <p className="mx-auto max-w-5xl px-4 pb-8 text-sm text-muted">{t("footer.rights", { brand })}</p>
    </footer>
  );
}
