"use client";

import { useClinic } from "../../../context";
import { FaqList, PriceTable } from "../../../site/site-parts";
import { Block, SectionHead, wrap } from "../../../site/site-ui";
import { getSpecialistT } from "../messages";

// Prices & FAQ: the full price list straight from the dashboard, how payment works, and the questions that stop a booking.
export function PricesPage() {
  const { store, locale } = useClinic();
  const st = getSpecialistT(locale);
  const treatments = store((state) => state.treatments);
  const faqs = store((state) => state.faqs);

  return (
    <>
      <div className={`${wrap} pt-12`}>
        <SectionHead level={1} pill={st("nav.prices")} title={st("prices.title")} titleId="prices-title" intro={st("prices.intro")} />
        <PriceTable treatments={treatments} locale={locale} />
      </div>
      <div className="py-12">
        <Block titleId="payment-title" tone="soft">
          <SectionHead pill={st("prices.paymentPill")} title={st("prices.paymentTitle")} titleId="payment-title" intro={st("prices.paymentText")} />
        </Block>
      </div>
      <Block titleId="faq-title">
        <SectionHead pill={st("prices.faqPill")} title={st("prices.faqTitle")} titleId="faq-title" />
        <FaqList faqs={faqs} locale={locale} />
      </Block>
    </>
  );
}
