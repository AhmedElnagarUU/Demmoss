"use client";

import { useState, type FormEvent } from "react";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { BilingualField, PageHeader, Panel } from "@/features/demo-engine/ui";
import { Button } from "@/shared/ui/button";
import { useClinic } from "../context";
import { getClinicT } from "../messages";
import type { Content } from "../types";

// Dashboard: the main texts of the site, in Arabic and English.
export function ContentPage() {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const content = store((state) => state.content);
  const updateContent = store((state) => state.updateContent);
  const [draft, setDraft] = useState<Content>(content);
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    updateContent(draft);
    trackEdit("content", config.slug, locale);
    setSaved(true);
  }

  return (
    <form onSubmit={submit} onChange={() => setSaved(false)} className="space-y-6">
      <PageHeader title={t("content.title")} intro={t("content.intro")} />
      <Panel title={t("content.hero")}>
        <BilingualField id="hero-title" label={t("content.heroTitle")} value={draft.hero.title} onChange={(title) => setDraft({ ...draft, hero: { ...draft.hero, title } })} t={t} />
        <BilingualField id="hero-subtitle" label={t("content.heroSubtitle")} value={draft.hero.subtitle} onChange={(subtitle) => setDraft({ ...draft, hero: { ...draft.hero, subtitle } })} t={t} multiline />
      </Panel>
      <Panel title={t("content.about")}>
        <BilingualField id="about-title" label={t("content.aboutTitle")} value={draft.about.title} onChange={(title) => setDraft({ ...draft, about: { ...draft.about, title } })} t={t} />
        <BilingualField id="about-text" label={t("content.aboutText")} value={draft.about.text} onChange={(text) => setDraft({ ...draft, about: { ...draft.about, text } })} t={t} multiline />
      </Panel>
      <Panel title={t("content.contact")}>
        <BilingualField id="contact-title" label={t("content.contactTitle")} value={draft.contact.title} onChange={(title) => setDraft({ ...draft, contact: { ...draft.contact, title } })} t={t} />
        <BilingualField id="contact-text" label={t("content.contactText")} value={draft.contact.text} onChange={(text) => setDraft({ ...draft, contact: { ...draft.contact, text } })} t={t} multiline />
      </Panel>
      <div className="flex items-center gap-3">
        <Button type="submit">{t("common.save")}</Button>
        {saved ? (
          <p role="status" className="font-semibold">
            {t("common.saved")}
          </p>
        ) : null}
      </div>
    </form>
  );
}
