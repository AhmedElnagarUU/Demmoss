"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { feedbackT } from "../translate";
import { FeedbackForm } from "./feedback-form";

type Props = { locale: Locale; tone?: "brand" };

// A native modal <dialog> gives focus trapping, Escape to close, and focus return to this button.
export function FeedbackButton({ locale, tone }: Props) {
  const t = feedbackT(locale);
  const dialog = useRef<HTMLDialogElement>(null);
  const [formKey, setFormKey] = useState(0);
  const brandTone = tone === "brand";

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
        className={`fixed bottom-4 end-4 z-40 min-h-11 px-4 text-sm font-semibold shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
          brandTone
            ? "site-pill bg-primary text-on-primary hover:bg-primary-hover"
            : "rounded-control bg-text text-bg hover:bg-muted"
        }`}
      >
        {t("button")}
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="feedback-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border border-border bg-[#0a0f0c] p-6 text-text backdrop:bg-black/70"
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
