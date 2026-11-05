"use client";

import { useRealEstate } from "../../../context";
import { InquiryForm } from "../../../site/inquiry-form";
import { Eyebrow, Section, SectionTitle } from "../../../site/site-ui";
import { ViewingForm } from "../../../site/viewing-form";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";

// Contact: book a viewing (even without a chosen property), or ask a question / request a free valuation.
export function ContactPage() {
  const { locale } = useRealEstate();
  const t = getAgencyT(locale);
  const content = useAgencyStore((state) => state.content);
  const settings = useAgencyStore((state) => state.settings);

  return (
    <Section id="contact-title">
      <Eyebrow>{t("contact.eyebrow")}</Eyebrow>
      <SectionTitle id="contact-title" level={1} className="mb-4">
        {content.contact.title[locale]}
      </SectionTitle>
      <p className="mb-10 max-w-2xl text-lg text-muted">{content.contact.text[locale]}</p>

      <div className="grid gap-12 lg:grid-cols-2">
        <section className="space-y-5">
          <h2 id="contact-viewing-title" className="text-2xl font-semibold">
            {t("contact.viewingTitle")}
          </h2>
          <ViewingForm idPrefix="contact-viewing" titleId="contact-viewing-title" />
        </section>
        <div className="space-y-12">
          <section className="space-y-5">
            <h2 id="contact-inquiry-title" className="text-2xl font-semibold">
              {t("contact.inquiryTitle")}
            </h2>
            <InquiryForm
              kinds={["question", "valuation"]}
              idPrefix="contact-inquiry"
              titleId="contact-inquiry-title"
            />
          </section>
          <address className="space-y-1 rounded-control border border-border bg-surface p-6 not-italic">
            <h2 className="mb-2 text-xl font-semibold">{t("contact.visitTitle")}</h2>
            <p>{settings.address[locale]}</p>
            <p dir="ltr" className="text-start">
              {settings.phone}
            </p>
            <p>{settings.hours[locale]}</p>
          </address>
        </div>
      </div>
    </Section>
  );
}
