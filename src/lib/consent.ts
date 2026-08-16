/*
 * Cookie-Consent-Status (TTDSG/DSGVO) — client-only helpers.
 * "granted"  → Google-Tracking (gtag, GTM, Attribution) darf laden
 * "denied"   → nur technisch Notwendiges + cookieloses Matomo
 * null       → noch keine Entscheidung → Banner anzeigen
 */

export type ConsentValue = "granted" | "denied";

const KEY = "fb-cookie-consent";
export const CONSENT_CHANGED_EVENT = "fb-consent-changed";
export const CONSENT_OPEN_EVENT = "fb-consent-open";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function setConsent(value: ConsentValue) {
  window.localStorage.setItem(KEY, value);

  // Google Consent Mode v2 live nachziehen, falls gtag bereits geladen ist
  // (z. B. Wechsel granted → denied über „Cookie-Einstellungen“).
  const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g === "function") {
    const state = value === "granted" ? "granted" : "denied";
    g("consent", "update", {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  }

  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT));
}

/* Banner erneut öffnen (Footer → „Cookie-Einstellungen“). */
export function openConsentBanner() {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
