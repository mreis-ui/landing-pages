import Script from "next/script";
import { integrations } from "@/lib/site";

/*
 * Google Tag Manager + Google Ads (gtag) + first-party attribution.
 * Ported 1:1 from the existing production funnel so ad tracking / enhanced
 * conversions keep working after the redesign.
 */
export function Analytics() {
  return (
    <>
      {/* Google Ads / gtag */}
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${integrations.googleAdsId}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
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

      {/* First-party attribution (gclid + utm_*, 90 days) — sets window.FLOWBYTE_ATTR */}
      <Script id="fb-attr" src="/tracking.js" strategy="afterInteractive" />
    </>
  );
}

export function GtmNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${integrations.gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
