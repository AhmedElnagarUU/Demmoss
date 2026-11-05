"use client";

import { useState, type FormEvent } from "react";
import { readOrCreateVisitorId } from "@/features/tracking/client/visitor";
import { track } from "@/features/tracking/client/track";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { createFeedbackAction } from "../actions";
import { feedbackT } from "../translate";
import type { FeedbackResult } from "../types";

type Props = { locale: Locale; onClose: () => void };
type Status = "idle" | "sending" | "sent";

const fieldClasses =
  "mt-1 w-full rounded-control border border-border bg-bg px-3 py-2 text-base text-text focus-visible:outline-2 focus-visible:outline-focus";

function visitorId(): string {
  try {
    return readOrCreateVisitorId(window.localStorage, () => crypto.randomUUID()).visitorId;
  } catch {
    return crypto.randomUUID();
  }
}

export function FeedbackForm({ locale, onClose }: Props) {
  const t = feedbackT(locale);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [failed, setFailed] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setErrors({});
    setFailed(false);

    let result: FeedbackResult;
    try {
      result = await createFeedbackAction({
        visitorId: visitorId(),
        message: data.get("message"),
        contact: data.get("contact"),
        page: window.location.pathname,
        locale,
      });
    } catch {
      setFailed(true);
      setStatus("idle");
      return;
    }

    if (result.ok) {
      track("feedback_sent", { locale });
      setStatus("sent");
      return;
    }
    setErrors(result.errors);
    setFailed(!result.errors.message && !result.errors.contact);
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4">
        <p role="status" className="text-base text-text">
          {t("thanks")}
        </p>
        <Button onClick={onClose}>{t("close")}</Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="feedback-message" className="text-sm font-semibold text-text">
          {t("message")}
        </label>
        <textarea
          id="feedback-message"
          name="message"
          required
          minLength={3}
          maxLength={1000}
          rows={4}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "feedback-message-error" : undefined}
          className={fieldClasses}
        />
        {errors.message && (
          <p id="feedback-message-error" role="alert" className="mt-1 text-sm text-danger">
            {t("errors.message")}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="feedback-contact" className="text-sm font-semibold text-text">
          {t("contact")}
        </label>
        <input
          id="feedback-contact"
          name="contact"
          type="text"
          maxLength={200}
          autoComplete="off"
          aria-describedby="feedback-contact-hint"
          className={fieldClasses}
        />
        <p id="feedback-contact-hint" className="mt-1 text-sm text-muted">
          {t("contactHint")}
        </p>
        {errors.contact && (
          <p role="alert" className="mt-1 text-sm text-danger">
            {t("errors.contact")}
          </p>
        )}
      </div>
      {failed && (
        <p role="alert" className="text-sm text-danger">
          {t("errors.generic")}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("send")}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          {t("close")}
        </Button>
      </div>
    </form>
  );
}
