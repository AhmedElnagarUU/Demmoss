"use client";

import { phoneDigits } from "@/features/demo-engine/format/phone";
import { whatsappUrl } from "@/shared/ui/whatsapp";
import { combinedSchedule } from "../../../booking";
import { useClinic } from "../../../context";
import { FaqList, HoursList } from "../../../site/site-parts";
import { Block, cardClasses, SectionHead, softButton, wrap } from "../../../site/site-ui";
import { getCentreT } from "../messages";

// Contact: address, phone, WhatsApp, the centre's hours (from its doctors' schedules), and common questions.
export function ContactPage() {
  const { store, locale } = useClinic();
  const t = getCentreT(locale);
  const content = store((state) => state.content);
  const settings = store((state) => state.settings);
  const doctors = store((state) => state.doctors);
  const faqs = store((state) => state.faqs);

  return (
    <>
      <div className={`${wrap} py-12`}>
        <SectionHead
          level={1}
          pill={t("contact.pill")}
          title={content.contact.title[locale]}
          titleId="contact-title"
          intro={content.contact.text[locale]}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className={`${cardClasses} space-y-4`}>
            <h2 className="text-lg font-medium">{t("contact.visit")}</h2>
            <p className="text-muted">{settings.address[locale]}</p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:+${phoneDigits(settings.phone)}`} className={softButton} dir="ltr">
                {t("contact.call")}: {settings.phone}
              </a>
              <a
                href={whatsappUrl(settings.whatsapp, t("contact.whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className={softButton}
              >
                {t("contact.whatsapp")}
              </a>
            </div>
          </div>
          <div className={cardClasses}>
            <h2 className="mb-3 text-lg font-medium">{t("contact.hours")}</h2>
            <HoursList schedule={combinedSchedule(doctors)} locale={locale} />
          </div>
        </div>
      </div>
      <Block titleId="faq-title" tone="soft">
        <SectionHead pill={t("contact.faqPill")} title={t("contact.faqTitle")} titleId="faq-title" />
        <FaqList faqs={faqs} locale={locale} />
      </Block>
    </>
  );
}
