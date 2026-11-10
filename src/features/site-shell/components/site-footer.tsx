import Link from "next/link";
import { TrackedWhatsAppButton } from "@/features/tracking/components/tracked-whatsapp-button";
import { publicEnv } from "@/shared/env";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { Logo } from "@/shared/ui/logo";
import { siteShellT } from "../translate";
import { navItems } from "./nav-items";

const linkClass =
  "inline-block rounded-lg py-1 text-sm text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = siteShellT(locale);
  const common = getT(locale);
  const brand = publicEnv.NEXT_PUBLIC_BRAND_NAME;

  return (
    <footer className="mt-20 border-t border-white/[0.08]">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-12">
        <div className="flex flex-col gap-4">
          <Logo href={`/${locale}`} />
          <p className="max-w-xs text-sm leading-relaxed text-muted">{t("footer.value")}</p>
        </div>
        <nav aria-labelledby="footer-links-title">
          <h2 id="footer-links-title" className="font-mono-label text-faint">
            {t("footer.siteTitle")}
          </h2>
          <ul className="mt-5 flex flex-col gap-1">
            {navItems(locale).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div id="contact" className="scroll-mt-24">
          <h2 className="font-mono-label text-faint">{t("footer.contactTitle")}</h2>
          <ul className="mt-5 flex flex-col items-start gap-1">
            <li>
              <Link href={`/${locale}/start`} className={linkClass}>
                {t("footer.startProject")}
              </Link>
            </li>
            <li className="pt-2">
              <TrackedWhatsAppButton
                locale={locale}
                label={t("footer.whatsapp")}
                message={common("common.whatsappMessage", { brand })}
                className="studio-pill"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.08]">
        <div className="mx-auto max-w-[1320px] px-5 py-6 sm:px-8 lg:px-12">
          <p className="text-xs text-muted">
            {t("footer.rights", { brand, year: String(new Date().getFullYear()) })}
          </p>
        </div>
      </div>
    </footer>
  );
}
