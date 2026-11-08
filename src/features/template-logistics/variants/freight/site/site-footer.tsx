"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getLogisticsT } from "../../../messages";
import { getFreightT } from "../messages";
import { FREIGHT_ROOT } from "../slug";
import { useFreightStore } from "../store";
import { BrandLogo } from "./brand";
import { InstagramIcon, LinkedInIcon, TelegramIcon, WhatsAppIcon } from "./icons";
import { container, rtlSafe } from "./styles";

const columnTitle = `mb-[18px] text-xs font-semibold uppercase tracking-[0.14em] text-bg/50 ${rtlSafe}`;
const footerLink =
  "text-[14.5px] text-bg/[0.85] transition-[color,padding] duration-200 hover:text-bg hover:ps-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";
const socialLink =
  "grid size-11 place-items-center rounded-full border border-bg/20 text-bg transition-[background-color,color,transform] duration-[250ms] hover:-translate-y-[3px] hover:bg-surface hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none";

// The dark footer of the source: the logo and social icons, then services, company and contacts.
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const shared = getLogisticsT(locale);
  const name = useFreightStore((state) => businessNameOf(state, locale));
  const settings = useFreightStore((state) => state.settings);
  const root = `/${locale}${FREIGHT_ROOT}`;

  const services = [
    { href: `${root}/services`, label: shared("services.air") },
    { href: `${root}/services`, label: shared("services.sea") },
    { href: `${root}/services`, label: shared("services.road") },
    { href: `${root}/services`, label: shared("services.customs") },
  ];
  const company = [
    { href: `${root}#about`, label: t("footer.about") },
    { href: `${root}#how`, label: t("footer.how") },
    { href: `${root}#pricing`, label: t("footer.pricing") },
    { href: `${root}#faq`, label: t("footer.faq") },
  ];
  const contacts = [
    { href: `${root}#contacts`, label: <span dir="ltr">{settings.phone}</span> },
    { href: `${root}#contacts`, label: <span dir="ltr">{t("contact.emailValue")}</span> },
    { href: `${root}#contacts`, label: settings.address[locale] },
  ];
  const socials = [
    { label: t("footer.telegram"), icon: <TelegramIcon /> },
    { label: t("footer.whatsapp"), icon: <WhatsAppIcon /> },
    { label: t("footer.linkedin"), icon: <LinkedInIcon /> },
    { label: t("footer.instagram"), icon: <InstagramIcon /> },
  ];

  return (
    <footer className="mt-[110px] overflow-x-clip bg-text pb-[30px] pt-20 text-bg">
      <div className={container}>
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 border-b border-bg/[0.12] pb-[50px] max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
          <div>
            <Link
              href={root}
              className="inline-flex max-w-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              <BrandLogo locale={locale} name={name} mutedClassName="text-bg/50" />
            </Link>
            <p className="my-5 max-w-[300px] text-sm text-bg/55">{t("footer.tagline")}</p>
            <div className="flex gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  aria-label={social.label}
                  className={socialLink}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={t("footer.services")}>
            <p className={columnTitle}>{t("footer.services")}</p>
            <ul className="space-y-[11px]">
              {services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.company")}>
            <p className={columnTitle}>{t("footer.company")}</p>
            <ul className="space-y-[11px]">
              {company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.contact")}>
            <p className={columnTitle}>{t("footer.contact")}</p>
            <ul className="space-y-[11px]">
              {contacts.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="flex flex-wrap justify-between gap-4 pt-[26px] text-[13px] text-bg/50">
          <span>{t("footer.rights", { name })}</span>
          <span>{t("footer.legal")}</span>
        </p>
      </div>
    </footer>
  );
}
