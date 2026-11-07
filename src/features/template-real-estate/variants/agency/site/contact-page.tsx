"use client";

import { useRealEstate } from "../../../context";
import { InquiryForm } from "../../../site/inquiry-form";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";
import { OfficeInfo } from "./office-info";
import { container, h2Small, sectionPad } from "./styles";
import { ViewingCard } from "./viewing-card";

// Contact: book a viewing (even without a chosen property), ask a question or request a free valuation, and find the office.
export function ContactPage() {
  const { locale } = useRealEstate();
  const t = getAgencyT(locale);
  const content = useAgencyStore((state) => state.content);

  return (
    <section className={`${sectionPad} overflow-x-clip`}>
      <div
        className={`${container} grid grid-cols-[1.1fr_1fr] gap-[60px] max-[1024px]:grid-cols-1 max-[1024px]:gap-10`}
      >
        <ViewingCard level={1} idPrefix="contact-viewing" intro={content.contact.text[locale]} />
        <div className="space-y-12">
          <OfficeInfo />
          <section className="rounded-[28px] bg-surface p-[42px] max-[640px]:px-5 max-[640px]:py-[26px]">
            <h2 id="contact-inquiry-title" className={`${h2Small} mb-[30px]`}>
              {t("contact.inquiryTitle")}
            </h2>
            <InquiryForm
              kinds={["question", "valuation"]}
              idPrefix="contact-inquiry"
              titleId="contact-inquiry-title"
            />
          </section>
        </div>
      </div>
    </section>
  );
}
