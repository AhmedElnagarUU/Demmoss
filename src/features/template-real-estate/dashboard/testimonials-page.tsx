"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/shared/ui/button";
import { useRealEstate } from "../context";
import { getRealEstateT } from "../messages";
import type { Testimonial } from "../types";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { BilingualField, PageHeader, Panel, StatusBadge } from "@/features/demo-engine/ui";

const blank = {
  name: { ar: "", en: "" },
  context: { ar: "", en: "" },
  text: { ar: "", en: "" },
  visible: true,
};

// Dashboard: client stories shown on the site. Hidden ones stay saved but are not public.
export function TestimonialsPage() {
  const { store, config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const testimonials = store((state) => state.testimonials);
  const updateTestimonial = store((state) => state.updateTestimonial);
  const removeTestimonial = store((state) => state.removeTestimonial);
  const [editing, setEditing] = useState<Testimonial | "new" | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("testimonials.title")}
        intro={t("testimonials.intro")}
        action={editing ? null : <Button onClick={() => setEditing("new")}>{t("testimonials.add")}</Button>}
      />

      {editing ? (
        <TestimonialForm
          key={editing === "new" ? "new" : editing.id}
          testimonial={editing === "new" ? null : editing}
          onDone={() => setEditing(null)}
        />
      ) : null}

      <ul className="space-y-3">
        {testimonials.map((item) => {
          const name = item.name[locale];
          return (
            <li key={item.id} className="space-y-2 rounded-control border border-border bg-bg p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-bold text-text">{name}</p>
                <StatusBadge label={t(item.visible ? "testimonials.shown" : "testimonials.hidden")} />
              </div>
              <p className="text-text">{item.text[locale]}</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    updateTestimonial(item.id, { visible: !item.visible });
                    trackEdit("testimonials", config.slug, locale);
                  }}
                >
                  {t(item.visible ? "testimonials.hide" : "testimonials.show")}: {name}
                </Button>
                <Button
                  variant="secondary"
                  aria-label={`${t("common.edit")}: ${name}`}
                  onClick={() => setEditing(item)}
                >
                  {t("common.edit")}
                </Button>
                <Button
                  variant="secondary"
                  aria-label={`${t("common.remove")}: ${name}`}
                  onClick={() => {
                    removeTestimonial(item.id);
                    trackEdit("testimonials", config.slug, locale);
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

function TestimonialForm({ testimonial, onDone }: { testimonial: Testimonial | null; onDone: () => void }) {
  const { store, config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const addTestimonial = store((state) => state.addTestimonial);
  const updateTestimonial = store((state) => state.updateTestimonial);
  const [draft, setDraft] = useState(testimonial ?? blank);
  const [error, setError] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    const hasText = draft.text.ar.trim() !== "" || draft.text.en.trim() !== "";
    const hasName = draft.name.ar.trim() !== "" || draft.name.en.trim() !== "";
    if (!hasText || !hasName) {
      setError(true);
      return;
    }
    // an empty language copies the other one, so the site never shows a blank
    const fill = (text: { ar: string; en: string }) => ({
      ar: text.ar.trim() || text.en.trim(),
      en: text.en.trim() || text.ar.trim(),
    });
    const values = {
      name: fill(draft.name),
      context: fill(draft.context),
      text: fill(draft.text),
      visible: draft.visible,
    };
    if (testimonial) updateTestimonial(testimonial.id, values);
    else addTestimonial(values);
    trackEdit("testimonials", config.slug, locale);
    onDone();
  }

  return (
    <form onSubmit={submit} noValidate>
      <Panel title={t(testimonial ? "testimonials.editTitle" : "testimonials.addTitle")}>
        {error ? (
          <p role="alert" className="border-s-4 border-text ps-2 font-semibold text-text">
            {t("testimonials.error")}
          </p>
        ) : null}
        <BilingualField
          id="testimonial-name"
          label={t("testimonials.name")}
          value={draft.name}
          onChange={(name) => setDraft({ ...draft, name })}
          t={t}
        />
        <BilingualField
          id="testimonial-context"
          label={t("testimonials.context")}
          value={draft.context}
          onChange={(context) => setDraft({ ...draft, context })}
          t={t}
        />
        <BilingualField
          id="testimonial-text"
          label={t("testimonials.text")}
          value={draft.text}
          onChange={(text) => setDraft({ ...draft, text })}
          t={t}
          multiline
        />
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
