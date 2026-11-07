"use client";

import type { Locale } from "@/shared/i18n/config";
import { useFineDiningStore } from "../store";
import { Section, SectionHeading } from "./section";
import { VisitDetails } from "./visit-details";

// Contact: address, hours, phone, WhatsApp, and a map remove the last friction before a visit.
export function ContactPage({ locale }: { locale: Locale }) {
  const contact = useFineDiningStore((state) => state.content.contact);

  return (
    <Section id="contact-title">
      <SectionHeading
        level={1}
        id="contact-title"
        title={contact.title[locale]}
        intro={contact.text[locale]}
      />
      <VisitDetails locale={locale} />
    </Section>
  );
}
