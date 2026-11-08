"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getWarehousingT } from "../messages";
import { WAREHOUSING_ROOT } from "../slug";
import { useWarehousingStore } from "../store";
import { BrandMark } from "./brand";

const socials = [
  {
    key: "linkedin",
    path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2 3.77-2 4 0 4.77 2.6 4.77 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z",
  },
  {
    key: "facebook",
    path: "M14 8V6.5c0-.7.3-1 1-1h2V2h-3c-3 0-4.5 1.8-4.5 4.5V8H7v3.5h2.5V22H14V11.5h2.8L17.3 8z",
  },
  {
    key: "instagram",
    path: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.5 6a1 1 0 110 2 1 1 0 010-2z",
  },
  {
    key: "youtube",
    path: "M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z",
  },
] as const;

// The source's dark footer: logo and tagline with social icons, three link columns, and the copyright line.
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const name = useWarehousingStore((state) => businessNameOf(state, locale));
  const settings = useWarehousingStore((state) => state.settings);
  const root = `/${locale}${WAREHOUSING_ROOT}`;
  const link = "transition-colors hover:text-bg focus-visible:outline-2 focus-visible:outline-focus";
  const heading =
    "mb-4 text-xs font-bold uppercase tracking-[0.08em] text-bg rtl:normal-case rtl:tracking-normal";

  return (
    <footer className="bg-text pb-7 pt-16 text-[13px] text-bg/75">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-[34px] border-b border-bg/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link
              href={root}
              className="mb-3.5 flex items-center gap-[9px] text-[17px] font-bold uppercase tracking-[0.02em] text-bg rtl:normal-case rtl:tracking-normal"
            >
              <BrandMark />
              {name}
            </Link>
            <p className="max-w-[260px]">{t("footer.tagline")}</p>
            <ul className="mt-5 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.key}>
                  <a
                    href="#"
                    aria-label={t(`footer.social.${social.key}`)}
                    className="grid size-[38px] place-items-center rounded-full border border-bg/25 transition-colors hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-focus"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={heading}>{t("footer.company")}</h2>
            <ul className="space-y-2.5">
              <li>
                <Link href={`${root}#storage`} className={link}>
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href={`${root}/case-studies`} className={link}>
                  {t("nav.caseStudies")}
                </Link>
              </li>
              <li>
                <Link href={`${root}/quote`} className={link}>
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={heading}>{t("footer.services")}</h2>
            <ul className="space-y-2.5">
              <li>
                <Link href={`${root}#storage`} className={link}>
                  {t("storage.eyebrow")}
                </Link>
              </li>
              <li>
                <Link href={`${root}#tpl`} className={link}>
                  {t("process.eyebrow")}
                </Link>
              </li>
              <li>
                <Link href={`${root}#estimator`} className={link}>
                  {t("nav.pricing")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={heading}>{t("footer.contact")}</h2>
            <ul className="space-y-2.5">
              <li dir="ltr" className="text-start">
                {t("quoteSection.email")}
              </li>
              <li dir="ltr" className="text-start">
                {settings.phone}
              </li>
              <li>{settings.address[locale]}</li>
            </ul>
          </div>
        </div>
        <p className="flex flex-wrap justify-between gap-2 pt-[22px] text-xs text-bg/70">
          <span>{t("footer.rights", { name })}</span>
          <span>
            {t("footer.privacy")} · {t("footer.terms")} · {t("footer.credit")}
          </span>
        </p>
      </div>
    </footer>
  );
}
