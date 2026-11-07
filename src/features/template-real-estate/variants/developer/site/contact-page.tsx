"use client";

import { useRealEstate } from "../../../context";
import { InquiryForm } from "../../../site/inquiry-form";
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";
import { ContactSection } from "./contact-section";
import { container, rtlSafe } from "./styles";

// Contact: a private viewing of any residence (the home form), or a brochure / question for the sales team.
export function ContactPage() {
  const { locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const content = useDeveloperStore((state) => state.content);

  return (
    <>
      <ContactSection headingLevel={1} />
      <section aria-labelledby="contact-inquiry-title" className="bg-bg pb-[140px] max-[640px]:pb-[90px]">
        <div className={container}>
          <p className="mb-10 max-w-2xl text-sm leading-[1.9] text-muted">{content.contact.text[locale]}</p>
          <h2
            id="contact-inquiry-title"
            className={`mb-10 text-[clamp(22px,2.6vw,32px)] font-extralight uppercase leading-[1.2] tracking-[0.14em] rtl:font-light ${rtlSafe}`}
          >
            {t("contact.inquiryTitle")}
          </h2>
          <div className="max-w-2xl">
            <InquiryForm
              kinds={["brochure", "question"]}
              idPrefix="contact-inquiry"
              titleId="contact-inquiry-title"
            />
          </div>
        </div>
      </section>
    </>
  );
}
