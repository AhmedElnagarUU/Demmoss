"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { getRestaurantT } from "../messages";
import type { Content } from "../types";
import { useRestaurant } from "./restaurant-context";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { BilingualField, PageHeader, Panel, SelectInput } from "@/features/demo-engine/ui";

export function ContentPage() {
  const { store, locale } = useRestaurant();
  const t = getRestaurantT(locale);
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

function ImagePicker({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (id: string) => void;
}) {
  const { config, locale } = useRestaurant();
  return (
    <SelectInput id={id} label={label} value={value} onChange={(event) => onChange(event.target.value)}>
      {config.photos.map((image) => (
        <option key={image.id} value={image.id}>
          {image.alt[locale]}
        </option>
      ))}
    </SelectInput>
  );
}

type FormProps = { initial: Content; saved: boolean; onSaved: () => void; onEdited: () => void };

function ContentForm({ initial, saved, onSaved, onEdited }: FormProps) {
  const { store, config, locale } = useRestaurant();
  const t = getRestaurantT(locale);
  const updateContent = store((state) => state.updateContent);
  const [draft, setDraft] = useState(initial);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        updateContent(draft);
        trackEdit("content", config.slug, locale);
        onSaved();
      }}
      onChange={onEdited}
      className="space-y-6"
    >
      <Panel title={t("content.hero")}>
        <BilingualField
          id="hero-title"
          label={t("content.heading")}
          value={draft.hero.title}
          onChange={(title) => setDraft({ ...draft, hero: { ...draft.hero, title } })}
          t={t}
        />
        <BilingualField
          id="hero-subtitle"
          label={t("content.subtitle")}
          value={draft.hero.subtitle}
          onChange={(subtitle) => setDraft({ ...draft, hero: { ...draft.hero, subtitle } })}
          t={t}
          multiline
        />
        <ImagePicker
          id="hero-image"
          label={t("content.image")}
          value={draft.hero.image}
          onChange={(image) => setDraft({ ...draft, hero: { ...draft.hero, image } })}
        />
      </Panel>

      <Panel title={t("content.about")}>
        <BilingualField
          id="about-title"
          label={t("content.heading")}
          value={draft.about.title}
          onChange={(title) => setDraft({ ...draft, about: { ...draft.about, title } })}
          t={t}
        />
        <BilingualField
          id="about-text"
          label={t("content.text")}
          value={draft.about.text}
          onChange={(text) => setDraft({ ...draft, about: { ...draft.about, text } })}
          t={t}
          multiline
        />
        <ImagePicker
          id="about-image"
          label={t("content.image")}
          value={draft.about.image}
          onChange={(image) => setDraft({ ...draft, about: { ...draft.about, image } })}
        />
      </Panel>

      <Panel title={t("content.experience")}>
        <BilingualField
          id="experience-title"
          label={t("content.heading")}
          value={draft.experience.title}
          onChange={(title) => setDraft({ ...draft, experience: { ...draft.experience, title } })}
          t={t}
        />
        <BilingualField
          id="experience-intro"
          label={t("content.introduction")}
          value={draft.experience.intro}
          onChange={(intro) => setDraft({ ...draft, experience: { ...draft.experience, intro } })}
          t={t}
          multiline
        />
        {draft.experience.points.map((point, index) => (
          <div key={index} className="space-y-3 border-s-4 border-border ps-4">
            <BilingualField
              id={`experience-point-${index}-title`}
              label={`${t("content.point", { number: String(index + 1) })}: ${t("content.heading")}`}
              value={point.title}
              onChange={(title) => setPoint(index, { ...point, title })}
              t={t}
            />
            <BilingualField
              id={`experience-point-${index}-text`}
              label={`${t("content.point", { number: String(index + 1) })}: ${t("content.text")}`}
              value={point.text}
              onChange={(text) => setPoint(index, { ...point, text })}
              t={t}
              multiline
            />
          </div>
        ))}
      </Panel>

      <Panel title={t("content.contact")}>
        <BilingualField
          id="contact-title"
          label={t("content.heading")}
          value={draft.contact.title}
          onChange={(title) => setDraft({ ...draft, contact: { ...draft.contact, title } })}
          t={t}
        />
        <BilingualField
          id="contact-text"
          label={t("content.text")}
          value={draft.contact.text}
          onChange={(text) => setDraft({ ...draft, contact: { ...draft.contact, text } })}
          t={t}
          multiline
        />
      </Panel>

      <div className="flex items-center gap-3">
        <Button type="submit">{t("common.save")}</Button>
        {saved ? (
          <p role="status" className="font-semibold text-text">
            {t("common.saved")}
          </p>
        ) : null}
      </div>
    </form>
  );

  function setPoint(index: number, point: Content["experience"]["points"][number]) {
    setDraft({
      ...draft,
      experience: {
        ...draft.experience,
        points: draft.experience.points.map((existing, position) => (position === index ? point : existing)),
      },
    });
  }
}
