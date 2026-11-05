"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { feedbackT } from "../translate";
import { FeedbackForm } from "./feedback-form";

// A native modal <dialog> gives focus trapping, Escape to close, and focus return to this button.
export function FeedbackButton({ locale }: { locale: Locale }) {
  const t = feedbackT(locale);
  const dialog = useRef<HTMLDialogElement>(null);
  const [formKey, setFormKey] = useState(0);

  function open() {
    setFormKey((key) => key + 1);
    dialog.current?.showModal();
  }

  function close() {
    dialog.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="fixed bottom-4 end-4 z-40 min-h-11 rounded-control bg-text px-4 text-sm font-semibold text-bg shadow-lg hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        {t("button")}
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="feedback-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-control border border-border bg-bg p-6 text-text backdrop:bg-black/50"
      >
        <h2 id="feedback-title" className="text-xl font-bold">
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 text-base text-muted">{t("intro")}</p>
        <FeedbackForm key={formKey} locale={locale} onClose={close} />
      </dialog>
    </>
  );
}
