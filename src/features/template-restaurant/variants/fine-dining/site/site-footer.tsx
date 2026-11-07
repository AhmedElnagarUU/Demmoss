"use client";

import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { SocialIcon, type SocialName } from "./icons";
import { Plate } from "./fine-dining-photo";
import { container, displayFont, scriptFont } from "./styles";

const socials: SocialName[] = ["instagram", "facebook", "x"];

// The source footer: logo and tagline with social circles, contact and hours, the salad bowl with its two-line sign-off.
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const name = useFineDiningStore((state) => businessNameOf(state, locale));
  const address = useFineDiningStore((state) => state.settings.address[locale]);
  const phone = useFineDiningStore((state) => state.settings.phone);

  return (
    <footer className="relative bg-(--fd-deep) pb-[30px] pt-[70px]">
      <div className={container}>
        <div className="grid items-center gap-10 min-[1025px]:grid-cols-[1.2fr_1fr_1fr] max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
          <div>
            <p className={`${scriptFont} mb-2.5 block text-5xl`}>{name}</p>
            <p className="text-sm opacity-80">{t("footer.tagline")}</p>
            <div className="mt-3.5 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={t(`footer.${social}`)}
                  className="group grid size-[38px] place-items-center rounded-full border border-text/35 transition-colors duration-300 hover:border-primary hover:bg-primary focus-visible:outline-2 focus-visible:outline-focus"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className={`${displayFont} mb-2 text-xl text-(--fd-accent)`}>{t("footer.contact")}</h2>
            <p className="text-sm opacity-80">
              {address}
              <br />
              <span dir="ltr" className="inline-block">
                {phone}
              </span>
              <br />
              {t("footer.email")}
            </p>
            <h2 className={`${displayFont} mb-2 mt-3.5 text-xl text-(--fd-accent)`}>{t("footer.hours")}</h2>
            <p className="text-sm opacity-80">{t("footer.hoursLine")}</p>
          </div>
          <div className="flex items-center gap-4">
            <Plate
              imageId="footer-bowl"
              locale={locale}
              sizes="96px"
              frame="border-4 border-text"
              className="size-24 shrink-0"
            />
            <p>
              {t("footer.bowlFirst")} <br />
              {t("footer.bowlSecond")}
            </p>
          </div>
        </div>
        <p className="mt-[50px] text-center text-xs uppercase tracking-[0.1em] opacity-55 rtl:normal-case rtl:tracking-normal">
          {t("footer.rights", { year: String(new Date().getFullYear()), name })}
        </p>
      </div>
    </footer>
  );
}
