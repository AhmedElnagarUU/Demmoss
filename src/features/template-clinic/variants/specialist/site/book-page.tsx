"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useClinic } from "../../../context";
import { BookingForm } from "../../../site/booking-form";
import { HoursList } from "../../../site/site-parts";
import { cardClasses, SectionHead, wrap } from "../../../site/site-ui";
import { getSpecialistT } from "../messages";

// Book: pick a treatment (optionally preselected by ?treatment=), a free day and time.
export function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookPageContent />
    </Suspense>
  );
}

function BookPageContent() {
  const treatmentId = useSearchParams().get("treatment") ?? undefined;
  const { store, locale } = useClinic();
  const st = getSpecialistT(locale);
  const doctor = store((state) => state.doctors[0]);
  const settings = store((state) => state.settings);

  return (
    <div className={`${wrap} py-12`}>
      <SectionHead
        level={1}
        pill={st("nav.book")}
        title={st("book.title")}
        titleId="book-title"
        intro={st("book.intro")}
      />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <BookingForm idPrefix="book-page" {...(treatmentId ? { initialTreatmentId: treatmentId } : {})} />
        <div className="space-y-6">
          <div className={cardClasses}>
            <h2 className="mb-3 text-lg font-medium">{st("book.hours")}</h2>
            {doctor ? <HoursList schedule={doctor.schedule} locale={locale} /> : null}
          </div>
          <div className={cardClasses}>
            <h2 className="mb-2 text-lg font-medium">{st("book.address")}</h2>
            <p className="text-muted">{settings.address[locale]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
