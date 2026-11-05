"use client";

import type { Locale } from "@/shared/i18n/config";
import { getFineDiningT } from "../messages";
import { useFineDiningStore } from "../store";
import { Section, SectionHeading } from "./section";
import { VisitDetails } from "./visit-details";

// Contact: address, hours, phone, WhatsApp, and a map remove the last friction before a visit.
export function ContactPage({ locale }: { locale: Locale }) {
  const t = getFineDiningT(locale);
  const contact = useFineDiningStore((state) => state.content.contact);

  return (
    <Section id="contact-title">
      <SectionHeading
        level={1}
        id="contact-title"
        locale={locale}
        eyebrow={t("contact.eyebrow")}
        title={contact.title[locale]}
      />
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted">{contact.text[locale]}</p>
      <VisitDetails locale={locale} />
    </Section>
  );
}
