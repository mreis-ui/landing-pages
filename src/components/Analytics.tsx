"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { integrations } from "@/lib/site";
import { getConsent, CONSENT_CHANGED_EVENT } from "@/lib/consent";

/*
 * Google Tag Manager + Google Ads (gtag) + first-party attribution.
 *
 * DSGVO/TTDSG: Alle Google-Skripte und die Attribution laden ERST nach
 * Einwilligung über den Cookie-Banner (Consent Mode v2, "basic mode").
 * Das selbst gehostete Matomo ist cookielos konfiguriert und läuft
 * einwilligungsfrei.
 */
export function Analytics() {
  const [consent, setConsentState] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setConsentState(getConsent());
    sync();
    window.addEventListener(CONSENT_CHANGED_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, sync);
  }, []);

  return (
    <>
      {consent === "granted" && (
        <>
          {/* Google Ads / gtag — Consent Mode v2: default denied, dann update
              granted (Skript lädt überhaupt erst nach Einwilligung). */}
          <Script
            id="gtag-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${integrations.googleAdsId}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied'
              });
              gtag('consent', 'update', {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
                analytics_storage: 'granted'
              });
              gtag('js', new Date());
              gtag('config', '${integrations.googleAdsId}', { 'allow_enhanced_conversions': true });
            `}
          </Script>

          {/* Google Tag Manager */}
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${integrations.gtmId}');
            `}
          </Script>

          {/* First-party attribution (gclid + utm_*, 90 Tage) — window.FLOWBYTE_ATTR */}
          <Script id="fb-attr" src="/tracking.js" strategy="afterInteractive" />
        </>
      )}

      {/* Self-hosted Matomo — cookielos, daher einwilligungsfrei.
          Lädt nur, wenn eine Site-ID konfiguriert ist. */}
      {integrations.matomoSiteId && (
        <Script id="matomo-init" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['disableCookies']);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="${integrations.matomoUrl}/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '${integrations.matomoSiteId}']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
      )}
    </>
  );
}
