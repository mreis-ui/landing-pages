"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getConsent,
  setConsent,
  CONSENT_OPEN_EVENT,
} from "@/lib/consent";

/*
 * Cookie-Banner (TTDSG/DSGVO): blockiert kein Bedienen der Seite, aber
 * Google-Tracking lädt erst nach „Alle akzeptieren“. „Nur notwendige“
 * ist gleichrangig bedienbar (kein Dark Pattern). Wiederaufruf über
 * „Cookie-Einstellungen“ im Footer.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
    const open = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  if (!visible) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einwilligung"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line-strong bg-surface-elevated shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center">
        <p className="flex-1 text-sm leading-relaxed text-ink-secondary">
          Wir nutzen Cookies für Werbe-Messung (Google). Unsere Reichweiten-
          Statistik läuft cookielos und braucht keine Einwilligung. Details:{" "}
          <Link href="/cookies" className="underline hover:text-ink-primary">
            Cookie-Richtlinie
          </Link>{" "}
          &{" "}
          <Link href="/datenschutz" className="underline hover:text-ink-primary">
            Datenschutz
          </Link>
          . Ihre Auswahl können Sie jederzeit über „Cookie-Einstellungen“ im
          Footer ändern.
        </p>
        <div className="flex shrink-0 flex-col-reverse gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-lg border border-line-strong px-5 py-2.5 text-sm font-medium text-ink-primary hover:bg-surface-sunken"
          >
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-orange-hover"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

/* Footer-Link zum Wiederöffnen des Banners. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT))
      }
      className="text-sm text-ink-secondary hover:text-ink-primary"
    >
      Cookie-Einstellungen
    </button>
  );
}
