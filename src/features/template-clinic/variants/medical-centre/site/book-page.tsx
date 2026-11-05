"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BookingForm } from "../../../site/booking-form";
import { SectionHead, wrap } from "../../../site/site-ui";
import { useClinic } from "../../../context";
import { getCentreT } from "../messages";

// Book: choose a doctor (optionally preselected by ?doctor=), a service, a free day and time from the doctor's schedule.
export function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookPageContent />
    </Suspense>
  );
}

function BookPageContent() {
  const doctorId = useSearchParams().get("doctor") ?? undefined;
  const { locale } = useClinic();
  const t = getCentreT(locale);

  return (
    <div className={`${wrap} max-w-3xl py-12`}>
      <SectionHead
        level={1}
        pill={t("nav.book")}
        title={t("book.title")}
        titleId="book-title"
        intro={t("book.intro")}
      />
      <BookingForm idPrefix="book-page" {...(doctorId ? { initialDoctorId: doctorId } : {})} />
      <p className="mt-4 text-center text-sm text-muted">{t("book.hint")}</p>
    </div>
  );
}
