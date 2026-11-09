# Analytics and notification rules

We track **key actions only**, **anonymously**, to learn what works. Owned by the `tracking` feature.

The data must answer the owner's marketing questions:
- **Who** uses the site (country, device, language, where they came from)?
- **How many** visitors, per day/week/month?
- **How many created a demo account**, and in which template?
- **What do they do** in each template (actions, edits, time), and where do they stop?

## How

- Client code calls one function: `track(event, data)` from `src/features/tracking`.
- It calls the `recordEventAction` Server Action with the anonymous visitor id (`demo:visitor-id` in localStorage).
- The server stores the event and creates a notification when the event is in the notify list.

## Privacy

- No raw IP addresses stored. Country comes from a host request header when available, otherwise `unknown`.
- Never send demo content, demo account names, or passwords. Only event name, template slug, page, and small metadata.
- Allowed `meta` keys: `kind`, `section`, `result`, `from`, `to`. Any other key or field is rejected by the schema.
- Personal data is collected only where the visitor knowingly gives it: wizard (name, WhatsApp, optional email) and optional contact in feedback.

## Google Tag Manager

- Public site and demos also load the owner's GTM container when `NEXT_PUBLIC_GTM_ID` is set; never the admin.
  Our own `track()` events are not sent to Google. See `docs/04-data-and-tracking.md`.

## Event list

Use these names exactly. Adding an event = update this table and `docs/04-data-and-tracking.md`.

| Event | When | Notifies admin |
|---|---|---|
| `page_view` | any page opened | no |
| `wizard_started` | wizard step 1 shown | no |
| `wizard_completed` | lead saved | yes (new lead, created by the wizard service) |
| `demo_opened` | template site opened | no |
| `demo_registered` | fake register | yes |
| `demo_login` | fake login | no |
| `demo_action` | booking/order/inquiry on a template site | yes |
| `content_edited` | content saved in a template dashboard | no |
| `language_switched` | AR/EN toggle | no |
| `demo_reset` | reset demo | no |
| `whatsapp_clicked` | any WhatsApp button | yes |
| `feedback_sent` | feedback saved | yes (created by the feedback service) |
| `guide_quiz_completed` | Software Guide quiz finished (`meta.result`: profile/functional/system/saas/tie) | no |

## Naming

- `snake_case`, `object_action` past tense. Template slug goes in the `template` field, not in the event name.
