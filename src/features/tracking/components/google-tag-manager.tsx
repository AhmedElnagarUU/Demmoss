import Script from "next/script";
import { publicEnv } from "@/shared/env";

// The owner's Google Tag Manager container (Google Analytics reports), on the public site and the demos, never the
// admin. Off when NEXT_PUBLIC_GTM_ID is empty, so local dev and tests never call Google.
export function GoogleTagManager() {
  const id = publicEnv.NEXT_PUBLIC_GTM_ID;
  if (!id) return null;

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() { window.dataLayer.push(arguments); };
window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
window.gtag("js", new Date());`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtm.js?id=${id}`} strategy="afterInteractive" />
    </>
  );
}
