# Analytics and notification rules

We track **key actions only**, **anonymously**, to learn what works. Owned by the `tracking` feature.

## How

- Client code calls one function: `track(event, data)` from `src/features/tracking`.
- It sends to `POST /api/track` with the anonymous visitor id (`demo:visitor-id` in localStorage).
- The server stores the event and creates a notification when the event is in the notify list.

## Privacy

- No raw IP addresses stored. Country comes from a host request header when available, otherwise `unknown`.
- Never send demo content, demo account names, or passwords. Only event name, template slug, page, and small metadata.
- Personal data is collected only where the visitor knowingly gives it: wizard (name, WhatsApp, optional email) and optional contact in feedback.

## Event list

Use these names exactly. Adding an event = update this table and `docs/04-data-and-tracking.md`.

| Event | When | Notifies admin |
|---|---|---|
| `page_view` | any page opened | no |
| `wizard_started` | wizard step 1 shown | no |
| `wizard_completed` | lead saved | yes (new lead) |
| `demo_opened` | template site opened | no |
| `demo_registered` | fake register | yes |
| `demo_login` | fake login | no |
| `demo_action` | booking/order/inquiry on a template site | yes |
| `content_edited` | content saved in a template dashboard | no |
| `language_switched` | AR/EN toggle | no |
| `demo_reset` | reset demo | no |
| `whatsapp_clicked` | any WhatsApp button | yes |
| `feedback_sent` | feedback saved | yes |

## Naming

- `snake_case`, `object_action` past tense. Template slug goes in the `template` field, not in the event name.
