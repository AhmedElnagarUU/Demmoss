"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { getLogisticsT } from "../messages";
import { trackEdit } from "../track";
import type { Content } from "../types";
import { useLogistics } from "./logistics-context";
import { BilingualField, PageHeader, Panel } from "./ui";

export function ContentPage() {
  const { store, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const content = store((state) => state.content);
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title={t("content.title")} intro={t("content.intro")} />
      {/* the form restarts from the saved content after a save or a reset */}
      <ContentForm
        key={JSON.stringify(content)}
        initial={content}
        saved={saved}
        onSaved={() => setSaved(true)}
        onEdited={() => setSaved(false)}
      />
    </div>
  );
}

type FormProps = { initial: Content; saved: boolean; onSaved: () => void; onEdited: () => void };

function ContentForm({ initial, saved, onSaved, onEdited }: FormProps) {
  const { store, config, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const updateContent = store((state) => state.updateContent);
  const [draft, setDraft] = useState(initial);

  function change(next: Content) {
    setDraft(next);
    onEdited();
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        updateContent(draft);
        trackEdit("content", config.slug, locale);
        onSaved();
      }}
      className="space-y-6"
    >
      <Panel title={t("content.hero")}>
        <BilingualField
          id="hero-title"
          label={t("content.heading")}
          value={draft.hero.title}
          onChange={(title) => change({ ...draft, hero: { ...draft.hero, title } })}
          t={t}
        />
        <BilingualField
          id="hero-subtitle"
          label={t("content.subtitle")}
          value={draft.hero.subtitle}
          onChange={(subtitle) => change({ ...draft, hero: { ...draft.hero, subtitle } })}
          t={t}
          multiline
        />
      </Panel>
      <Panel title={t("content.about")}>
        <BilingualField
          id="about-title"
          label={t("content.heading")}
          value={draft.about.title}
          onChange={(title) => change({ ...draft, about: { ...draft.about, title } })}
          t={t}
        />
        <BilingualField
          id="about-text"
          label={t("content.text")}
          value={draft.about.text}
          onChange={(text) => change({ ...draft, about: { ...draft.about, text } })}
          t={t}
          multiline
        />
      </Panel>
      <Panel title={t("content.contact")}>
        <BilingualField
          id="contact-title"
          label={t("content.heading")}
          value={draft.contact.title}
          onChange={(title) => change({ ...draft, contact: { ...draft.contact, title } })}
          t={t}
        />
        <BilingualField
          id="contact-text"
          label={t("content.text")}
          value={draft.contact.text}
          onChange={(text) => change({ ...draft, contact: { ...draft.contact, text } })}
          t={t}
          multiline
        />
      </Panel>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">{t("common.save")}</Button>
        {saved ? (
          <p role="status" className="font-semibold text-text">
            {t("common.saved")}
          </p>
        ) : null}
      </div>
    </form>
  );
}
