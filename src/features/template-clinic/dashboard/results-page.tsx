"use client";

import { useState, type FormEvent } from "react";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { formatNumber } from "@/features/demo-engine/format/format";
import { BilingualField, ErrorSummary, PageHeader, Panel, SelectInput, StatusBadge } from "@/features/demo-engine/ui";
import { Button } from "@/shared/ui/button";
import { useClinic } from "../context";
import { getClinicT } from "../messages";
import type { Result } from "../types";
import { fillText, hasText } from "./fill";

const blank = { title: { ar: "", en: "" }, caption: { ar: "", en: "" }, look: 0, visible: true };

// Dashboard: the before / after pairs on the site. Hidden ones stay saved.
export function ResultsPage() {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const results = store((state) => state.results);
  const setResults = store((state) => state.setResults);
  const [editing, setEditing] = useState<Result | "new" | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("results.title")}
        intro={t("results.intro")}
        action={editing ? null : <Button onClick={() => setEditing("new")}>{t("results.add")}</Button>}
      />
      {editing ? (
        <ResultForm key={editing === "new" ? "new" : editing.id} result={editing === "new" ? null : editing} onDone={() => setEditing(null)} />
      ) : null}
      <ul className="space-y-3">
        {results.map((item) => {
          const title = item.title[locale];
          return (
            <li key={item.id} className="space-y-2 rounded-control border border-border bg-bg p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-bold text-text">{title}</p>
                <StatusBadge label={t(item.visible ? "results.shown" : "results.hidden")} />
              </div>
              <p className="text-muted">{item.caption[locale]}</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setResults(results.map((entry) => (entry.id === item.id ? { ...entry, visible: !entry.visible } : entry)));
                    trackEdit("results", config.slug, locale);
                  }}
                >
                  {t(item.visible ? "results.hide" : "results.show")}: {title}
                </Button>
                <Button variant="secondary" aria-label={`${t("common.edit")}: ${title}`} onClick={() => setEditing(item)}>
                  {t("common.edit")}
                </Button>
                <Button
                  variant="secondary"
                  aria-label={`${t("common.remove")}: ${title}`}
                  onClick={() => {
                    setResults(results.filter((entry) => entry.id !== item.id));
                    trackEdit("results", config.slug, locale);
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

function ResultForm({ result, onDone }: { result: Result | null; onDone: () => void }) {
  const { store, config, locale } = useClinic();
  const t = getClinicT(locale);
  const results = store((state) => state.results);
  const setResults = store((state) => state.setResults);
  const [draft, setDraft] = useState(result ?? blank);
  const [error, setError] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!hasText(draft.title)) return setError(true);
    const values = { title: fillText(draft.title), caption: fillText(draft.caption), look: draft.look, visible: draft.visible };
    setResults(result ? results.map((item) => (item.id === result.id ? { ...values, id: item.id } : item)) : [...results, { ...values, id: crypto.randomUUID() }]);
    trackEdit("results", config.slug, locale);
    onDone();
  }

  return (
    <form onSubmit={submit} noValidate>
      <Panel title={t(result ? "results.editTitle" : "results.addTitle")}>
        {error ? <ErrorSummary text={t("results.error")} /> : null}
        <BilingualField id="result-title" label={t("results.resultTitle")} value={draft.title} onChange={(title) => setDraft({ ...draft, title })} t={t} />
        <BilingualField id="result-caption" label={t("results.caption")} value={draft.caption} onChange={(caption) => setDraft({ ...draft, caption })} t={t} />
        <SelectInput id="result-look" label={t("results.look")} value={String(draft.look)} onChange={(event) => setDraft({ ...draft, look: Number(event.target.value) })}>
          {[0, 1, 2].map((look) => (
            <option key={look} value={look}>
              {t("results.lookOption", { number: formatNumber(look + 1, locale) })}
            </option>
          ))}
        </SelectInput>
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
