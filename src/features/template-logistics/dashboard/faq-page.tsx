"use client";

import { useState } from "react";
import type { LocalizedText } from "@/features/demo-engine/types";
import { Button } from "@/shared/ui/button";
import { getLogisticsT } from "../messages";
import { trackEdit } from "@/features/demo-engine/track-edit";
import type { FaqItem } from "../types";
import { useLogistics } from "./logistics-context";
import { BilingualField, PageHeader, Panel } from "@/features/demo-engine/ui";

const emptyText: LocalizedText = { ar: "", en: "" };

export function FaqPage() {
  const { store, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const faq = store((state) => state.faq);

  return (
    <div className="space-y-6">
      <PageHeader title={t("faq.title")} intro={t("faq.intro")} />
      {faq.length === 0 ? <p className="text-muted">{t("faq.empty")}</p> : null}
      <ul className="space-y-4">
        {faq.map((item) => (
          // the form restarts from the saved item after a save or a reset
          <FaqEditor key={`${item.id}:${JSON.stringify(item)}`} item={item} />
        ))}
      </ul>
      <AddFaq />
    </div>
  );
}

function FaqEditor({ item }: { item: FaqItem }) {
  const { store, config, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const updateFaq = store((state) => state.updateFaq);
  const removeFaq = store((state) => state.removeFaq);
  const [question, setQuestion] = useState(item.question);
  const [answer, setAnswer] = useState(item.answer);

  return (
    <li>
      <Panel>
        <BilingualField
          id={`q-${item.id}`}
          label={t("faq.question")}
          value={question}
          onChange={setQuestion}
          t={t}
        />
        <BilingualField
          id={`a-${item.id}`}
          label={t("faq.answer")}
          value={answer}
          onChange={setAnswer}
          t={t}
          multiline
        />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              updateFaq(item.id, { question, answer });
              trackEdit("faq", config.slug, locale);
            }}
          >
            {t("faq.saveItem")}
          </Button>
          <Button
            variant="secondary"
            aria-label={`${t("faq.removeItem")}: ${item.question[locale]}`}
            onClick={() => {
              removeFaq(item.id);
              trackEdit("faq", config.slug, locale);
            }}
          >
            {t("faq.removeItem")}
          </Button>
        </div>
      </Panel>
    </li>
  );
}

function AddFaq() {
  const { store, config, locale } = useLogistics();
  const t = getLogisticsT(locale);
  const addFaq = store((state) => state.addFaq);
  const [question, setQuestion] = useState(emptyText);
  const [answer, setAnswer] = useState(emptyText);
  const canAdd =
    question.ar.trim() !== "" &&
    question.en.trim() !== "" &&
    answer.ar.trim() !== "" &&
    answer.en.trim() !== "";

  return (
    <Panel title={t("faq.addTitle")}>
      <BilingualField id="new-q" label={t("faq.question")} value={question} onChange={setQuestion} t={t} />
      <BilingualField
        id="new-a"
        label={t("faq.answer")}
        value={answer}
        onChange={setAnswer}
        t={t}
        multiline
      />
      <Button
        disabled={!canAdd}
        onClick={() => {
          addFaq(question, answer);
          trackEdit("faq", config.slug, locale);
          setQuestion(emptyText);
          setAnswer(emptyText);
        }}
      >
        {t("faq.add")}
      </Button>
    </Panel>
  );
}
