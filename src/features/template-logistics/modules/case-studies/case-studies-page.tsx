"use client";

import { useState } from "react";
import type { LocalizedText } from "@/features/demo-engine/types";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { BilingualField, PageHeader, Panel, TextInput } from "@/features/demo-engine/ui";
import { getLogisticsT } from "../../messages";
import { trackEdit } from "@/features/demo-engine/track-edit";
import type { CaseStudiesStore } from "./case-studies-store";
import type { CaseStudy } from "./types";

type Props = { store: CaseStudiesStore; slug: string; locale: Locale };

const emptyText: LocalizedText = { ar: "", en: "" };
const emptyCase: Omit<CaseStudy, "id"> = {
  sector: emptyText,
  title: emptyText,
  text: emptyText,
  metricValue: "",
  metricLabel: emptyText,
  visible: true,
};

function isComplete(item: Omit<CaseStudy, "id">): boolean {
  return [item.sector, item.title, item.text, item.metricLabel].every(
    (value) => value.ar.trim() !== "" && value.en.trim() !== "",
  );
}

export function CaseStudiesPage({ store, slug, locale }: Props) {
  const t = getLogisticsT(locale);
  const caseStudies = store((state) => state.caseStudies);

  return (
    <div className="space-y-6">
      <PageHeader title={t("caseStudies.title")} intro={t("caseStudies.intro")} />
      {caseStudies.length === 0 ? <p className="text-muted">{t("caseStudies.empty")}</p> : null}
      <ul className="space-y-4">
        {caseStudies.map((item) => (
          // the form restarts from the saved case study after a save or a reset
          <li key={`${item.id}:${JSON.stringify(item)}`}>
            <CaseStudyForm id={item.id} initial={item} store={store} slug={slug} locale={locale} />
          </li>
        ))}
      </ul>
      <CaseStudyForm initial={emptyCase} store={store} slug={slug} locale={locale} />
    </div>
  );
}

type FormProps = Props & { id?: string; initial: Omit<CaseStudy, "id"> };

// Edits one case study, or adds a new one when it has no id.
function CaseStudyForm({ id, initial, store, slug, locale }: FormProps) {
  const t = getLogisticsT(locale);
  const add = store((state) => state.addCaseStudy);
  const update = store((state) => state.updateCaseStudy);
  const remove = store((state) => state.removeCaseStudy);
  const [draft, setDraft] = useState(initial);
  const prefix = id ? `case-${id}` : "case-new";
  const patch = (change: Partial<Omit<CaseStudy, "id">>) => setDraft({ ...draft, ...change });

  return (
    <Panel title={id ? undefined : t("caseStudies.addTitle")}>
      <BilingualField
        id={`${prefix}-sector`}
        label={t("caseStudies.sector")}
        value={draft.sector}
        onChange={(sector) => patch({ sector })}
        t={t}
      />
      <BilingualField
        id={`${prefix}-title`}
        label={t("caseStudies.heading")}
        value={draft.title}
        onChange={(title) => patch({ title })}
        t={t}
      />
      <BilingualField
        id={`${prefix}-text`}
        label={t("caseStudies.text")}
        value={draft.text}
        onChange={(text) => patch({ text })}
        t={t}
        multiline
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          id={`${prefix}-metric`}
          label={t("caseStudies.metricValue")}
          dir="ltr"
          maxLength={12}
          value={draft.metricValue}
          onChange={(event) => patch({ metricValue: event.target.value })}
        />
        <label className="flex min-h-11 cursor-pointer items-center gap-3 self-end font-semibold text-text">
          <input
            type="checkbox"
            checked={draft.visible}
            onChange={(event) => patch({ visible: event.target.checked })}
            className="size-5 accent-primary"
          />
          {t("caseStudies.visible")}
        </label>
      </div>
      <BilingualField
        id={`${prefix}-metric-label`}
        label={t("caseStudies.metricLabel")}
        value={draft.metricLabel}
        onChange={(metricLabel) => patch({ metricLabel })}
        t={t}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          disabled={!isComplete(draft) || draft.metricValue.trim() === ""}
          onClick={() => {
            if (id) {
              update(id, draft);
            } else {
              add(draft);
              setDraft(emptyCase);
            }
            trackEdit("case-studies", slug, locale);
          }}
        >
          {id ? t("caseStudies.saveItem") : t("caseStudies.add")}
        </Button>
        {id ? (
          <Button
            variant="secondary"
            aria-label={`${t("caseStudies.removeItem")}: ${initial.title[locale]}`}
            onClick={() => {
              remove(id);
              trackEdit("case-studies", slug, locale);
            }}
          >
            {t("caseStudies.removeItem")}
          </Button>
        ) : null}
      </div>
    </Panel>
  );
}
