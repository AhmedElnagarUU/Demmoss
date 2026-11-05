import type { Locale } from "@/shared/i18n/config";
import { recordEventAction } from "../actions";
import type { EventMeta, EventName } from "../types";
import { readOrCreateVisitorId, sourceOfFirstVisit } from "./visitor";

type TrackData = {
  locale: Locale;
  page?: string;
  template?: string;
  meta?: EventMeta;
};

// Never blocks the UI and never throws: tracking must not break the site.
export function track(name: EventName, data: TrackData): void {
  try {
    const { visitorId, isNew } = readOrCreateVisitorId(window.localStorage, () => crypto.randomUUID());
    const payload = {
      visitorId,
      name,
      locale: data.locale,
      page: data.page ?? window.location.pathname,
      template: data.template,
      meta: data.meta,
      source: isNew ? sourceOfFirstVisit(window.location.href, document.referrer) : undefined,
    };
    recordEventAction(payload).catch(() => undefined);
  } catch {
    // localStorage blocked or unavailable: skip tracking.
  }
}
