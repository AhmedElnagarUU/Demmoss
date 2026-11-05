import type { VisitorSource } from "../types";

export const VISITOR_ID_KEY = "demo:visitor-id";

type KeyValueStorage = Pick<Storage, "getItem" | "setItem">;

export function readOrCreateVisitorId(
  storage: KeyValueStorage,
  createId: () => string,
): { visitorId: string; isNew: boolean } {
  const saved = storage.getItem(VISITOR_ID_KEY);
  if (saved) return { visitorId: saved, isNew: false };
  const visitorId = createId();
  storage.setItem(VISITOR_ID_KEY, visitorId);
  return { visitorId, isNew: true };
}

export function sourceOfFirstVisit(url: string, referrer: string): VisitorSource {
  const params = new URL(url).searchParams;
  const source: VisitorSource = {};
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  if (utmSource) source.utmSource = utmSource.slice(0, 100);
  if (utmMedium) source.utmMedium = utmMedium.slice(0, 100);
  if (utmCampaign) source.utmCampaign = utmCampaign.slice(0, 100);
  if (referrer && new URL(referrer).host !== new URL(url).host) source.referrer = referrer.slice(0, 300);
  return source;
}
