"use client";

import { useState, type FormEvent } from "react";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { BilingualField, ErrorSummary, PageHeader, Panel } from "@/features/demo-engine/ui";
import { Button } from "@/shared/ui/button";
import { useClinic } from "../context";
import { getClinicT } from "../messages";
import type { Faq } from "../types";
import { fillText, hasText } from "./fill";

const blank = { question: { ar: "", en: "" }, answer: { ar: "", en: "" } };

// Dashboard: the questions shown on the site.
export function FaqPage() {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const faqs = store((state) => state.faqs);
  const setFaqs = store((state) => state.setFaqs);
  const [editing, setEditing] = useState<Faq | "new" | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("faq.title")}
        intro={t("faq.intro")}
        action={editing ? null : <Button onClick={() => setEditing("new")}>{t("faq.add")}</Button>}
      />
      {editing ? (
        <FaqForm key={editing === "new" ? "new" : editing.id} faq={editing === "new" ? null : editing} onDone={() => setEditing(null)} />
      ) : null}
      <ul className="space-y-3">
        {faqs.map((item) => {
          const question = item.question[locale];
          return (
            <li key={item.id} className="space-y-2 rounded-control border border-border bg-bg p-4">
              <p className="text-lg font-bold text-text">{question}</p>
              <p className="text-muted">{item.answer[locale]}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" aria-label={`${t("common.edit")}: ${question}`} onClick={() => setEditing(item)}>
                  {t("common.edit")}
                </Button>
                <Button
                  variant="secondary"
                  aria-label={`${t("common.remove")}: ${question}`}
                  onClick={() => {
                    setFaqs(faqs.filter((entry) => entry.id !== item.id));
                    trackEdit("faq", config.slug, locale);
                  }}
                >
                  {t("common.remove")}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FaqForm({ faq, onDone }: { faq: Faq | null; onDone: () => void }) {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const faqs = store((state) => state.faqs);
  const setFaqs = store((state) => state.setFaqs);
  const [draft, setDraft] = useState(faq ?? blank);
  const [error, setError] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!hasText(draft.question) || !hasText(draft.answer)) return setError(true);
    const values = { question: fillText(draft.question), answer: fillText(draft.answer) };
    setFaqs(faq ? faqs.map((item) => (item.id === faq.id ? { ...values, id: item.id } : item)) : [...faqs, { ...values, id: crypto.randomUUID() }]);
    trackEdit("faq", config.slug, locale);
    onDone();
  }

  return (
    <form onSubmit={submit} noValidate>
      <Panel title={t(faq ? "faq.editTitle" : "faq.addTitle")}>
        {error ? <ErrorSummary text={t("faq.error")} /> : null}
        <BilingualField id="faq-question" label={t("faq.question")} value={draft.question} onChange={(question) => setDraft({ ...draft, question })} t={t} />
        <BilingualField id="faq-answer" label={t("faq.answer")} value={draft.answer} onChange={(answer) => setDraft({ ...draft, answer })} t={t} multiline />
        <div className="flex flex-wrap gap-3">
          <Button type="submit">{t("common.save")}</Button>
          <Button variant="secondary" onClick={onDone}>
            {t("common.cancel")}
          </Button>
        </div>
      </Panel>
    </form>
  );
}
