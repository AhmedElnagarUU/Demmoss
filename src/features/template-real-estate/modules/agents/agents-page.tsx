"use client";

import { useState, type FormEvent } from "react";
import type { HydratableStore } from "@/features/demo-engine/storage/use-hydrated";
import { Button } from "@/shared/ui/button";
import { useRealEstate } from "../../context";
import { BilingualField, ErrorSummary, PageHeader, Panel, SelectInput, TextInput } from "../../dashboard/ui";
import { trackEdit } from "../../dashboard/track-edit";
import { getRealEstateT } from "../../messages";
import type { AgentsActions } from "./store-slice";
import type { Agent } from "./types";

export type AgentsStore = HydratableStore & (<T>(selector: (state: { agents: Agent[] } & AgentsActions) => T) => T);

const blank = { name: { ar: "", en: "" }, role: { ar: "", en: "" }, phone: "", photo: "" };

// Dashboard (agency only): the agents shown on the site and on their properties.
export function AgentsPage({ store }: { store: AgentsStore }) {
  const { config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const agents = store((state) => state.agents);
  const removeAgent = store((state) => state.removeAgent);
  const [editing, setEditing] = useState<Agent | "new" | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("agents.title")}
        intro={t("agents.intro")}
        action={editing ? null : <Button onClick={() => setEditing("new")}>{t("agents.add")}</Button>}
      />

      {editing ? (
        <AgentForm
          key={editing === "new" ? "new" : editing.id}
          store={store}
          agent={editing === "new" ? null : editing}
          onDone={() => setEditing(null)}
        />
      ) : null}

      <ul className="space-y-3">
        {agents.map((agent) => {
          const name = agent.name[locale];
          return (
            <li
              key={agent.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-control border border-border bg-bg p-4"
            >
              <div>
                <p className="text-lg font-bold text-text">{name}</p>
                <p className="text-muted">
                  {agent.role[locale]} · <span dir="ltr">{agent.phone}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" aria-label={`${t("common.edit")}: ${name}`} onClick={() => setEditing(agent)}>
                  {t("common.edit")}
                </Button>
                <Button
                  variant="secondary"
                  aria-label={`${t("common.remove")}: ${name}`}
                  onClick={() => {
                    removeAgent(agent.id);
                    trackEdit("agents", config.slug, locale);
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

function AgentForm({ store, agent, onDone }: { store: AgentsStore; agent: Agent | null; onDone: () => void }) {
  const { config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const addAgent = store((state) => state.addAgent);
  const updateAgent = store((state) => state.updateAgent);
  const portraits = config.photos.filter((photo) => photo.portrait);
  const [draft, setDraft] = useState(agent ?? { ...blank, photo: portraits[0]?.id ?? "" });
  const [error, setError] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    const named = draft.name.ar.trim() !== "" || draft.name.en.trim() !== "";
    if (!named || !draft.phone.trim()) {
      setError(true);
      return;
    }
    const fill = (text: { ar: string; en: string }) => ({
      ar: text.ar.trim() || text.en.trim(),
      en: text.en.trim() || text.ar.trim(),
    });
    const values = { name: fill(draft.name), role: fill(draft.role), phone: draft.phone.trim(), photo: draft.photo };
    if (agent) updateAgent(agent.id, values);
    else addAgent(values);
    trackEdit("agents", config.slug, locale);
    onDone();
  }

  return (
    <form onSubmit={submit} noValidate>
      <Panel title={t(agent ? "agents.editTitle" : "agents.addTitle")}>
        {error ? <ErrorSummary text={t("agents.error")} /> : null}
        <BilingualField
          id="agent-name"
          label={t("agents.name")}
          value={draft.name}
          onChange={(name) => setDraft({ ...draft, name })}
          t={t}
        />
        <BilingualField
          id="agent-role"
          label={t("agents.role")}
          value={draft.role}
          onChange={(role) => setDraft({ ...draft, role })}
          t={t}
        />
        <TextInput
          id="agent-phone"
          label={t("agents.phone")}
          inputMode="tel"
          dir="ltr"
          value={draft.phone}
          onChange={(event) => setDraft({ ...draft, phone: event.target.value })}
        />
        <SelectInput
          id="agent-photo"
          label={t("agents.photo")}
          value={draft.photo}
          onChange={(event) => setDraft({ ...draft, photo: event.target.value })}
        >
          {portraits.map((photo) => (
            <option key={photo.id} value={photo.id}>
              {photo.alt[locale]}
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
