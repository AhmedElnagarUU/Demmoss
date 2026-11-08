import Link from "next/link";
import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import { publicEnv } from "@/shared/env";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { Logo } from "@/shared/ui/logo";
import { siteShellT } from "../translate";
import { navItems } from "./nav-items";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = siteShellT(locale);
  const brand = publicEnv.NEXT_PUBLIC_BRAND_NAME;

  return (
    <footer className="mt-16 border-t border-white/5 bg-[#080808]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3 sm:px-6">
        <div className="flex flex-col gap-3">
          <Logo href={`/${locale}`} />
          <p className="max-w-xs text-sm leading-relaxed text-muted">{t("footer.value")}</p>
        </div>
        <nav aria-labelledby="footer-links-title">
          <h2 id="footer-links-title" className="text-[13px] font-semibold text-text">
            {t("footer.linksTitle")}
          </h2>
          <ul className="mt-4 flex flex-col gap-1">
            {navItems(locale).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block rounded-lg py-1 text-sm text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div id="contact" className="flex flex-col items-start gap-3 scroll-mt-24">
          <h2 className="text-[13px] font-semibold text-text">{t("footer.contactTitle")}</h2>
          <TrackedWhatsAppButton
            locale={locale}
            label={t("footer.whatsapp")}
            message={getT(locale)("common.whatsappMessage", { brand })}
            className="site-pill bg-primary text-on-primary hover:bg-primary-hover"
          />
        </div>
      </div>
      <div className="border-t border-white/5">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
          {t("footer.rights", { brand })}
        </p>
      </div>
    </footer>
  );
}
