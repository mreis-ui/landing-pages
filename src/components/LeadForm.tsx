"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { integrations } from "@/lib/site";

/*
 * Lead capture form — ports the production GoHighLevel flow 1:1:
 *  - fires the Google Ads conversion + GTM dataLayer event + enhanced conversions
 *  - merges first-party attribution (window.FLOWBYTE_ATTR) + gclid / utm_funnel
 *  - POSTs to the Cloudflare Worker proxy (token stays server-side)
 *  - optionally launches the ElevenLabs voice-AI agent on KI-consent
 */

type Status = "idle" | "submitting" | "ok" | "error";

const inputCls =
  "w-full rounded-md border border-line bg-surface-elevated px-3.5 py-2.5 text-base text-ink-primary placeholder:text-ink-muted focus:border-brand-orange focus-visible:outline-none";
const labelCls = "block text-sm font-medium text-ink-primary";

function getProxyUrl() {
  if (typeof window === "undefined") return integrations.ghlProxyUrl;
  const local =
    window.location.hostname === "localhost" ||
    window.location.protocol === "file:";
  return local ? integrations.ghlWebhookFallback : integrations.ghlProxyUrl;
}

function launchVoiceAgent() {
  if (document.querySelector("elevenlabs-convai")) return;
  const s = document.createElement("script");
  s.src = integrations.elevenLabsScript;
  s.async = true;
  document.body.appendChild(s);
  const widget = document.createElement("elevenlabs-convai");
  widget.setAttribute("agent-id", integrations.elevenLabsAgentId);
  document.body.appendChild(widget);
  window.gtag?.("event", "ki_agent_started", { page: "decision" });
}

export function LeadForm({
  source = "Landing Page",
  stageTag = "stage_decision",
  withMessage = false,
  withConsent = false,
  submitLabel = "Absenden",
}: {
  source?: string;
  stageTag?: string;
  withMessage?: boolean;
  withConsent?: boolean;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    // honeypot
    if (data.company_website) {
      setStatus("ok");
      return;
    }

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    if (!name || !email) {
      setStatus("error");
      setError("Bitte Name und E-Mail ausfüllen.");
      return;
    }
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ").slice(1).join(" ") || "";
    const kiConsent = withConsent ? form.ki_consent?.checked === true : false;

    // ── Google Ads conversion + GTM + enhanced conversions ──
    try {
      window.gtag?.("event", "conversion", {
        send_to: integrations.conversionLabel,
        event_callback: function () {},
      });
      window.dataLayer?.push({
        event: "Formular_abgeschickt",
        user_email: email,
        user_name: name,
        company: data.company || "",
        phone: data.phone || "",
        ki_consent: kiConsent,
      });
      window.gtag?.("set", "user_data", {
        email,
        phone_number: data.phone || "",
        address: { first_name: firstName, last_name: lastName },
      });
    } catch {
      /* tracking must never block the lead */
    }

    // ── Attribution ──
    const attr = (typeof window !== "undefined" && window.FLOWBYTE_ATTR) || {};
    let gclid = attr.gclid || "";
    let funnelStage = "decision";
    try {
      const p = new URLSearchParams(window.location.search);
      gclid = p.get("gclid") || sessionStorage.getItem("gclid") || gclid;
      funnelStage =
        p.get("utm_funnel") || sessionStorage.getItem("utm_funnel") || "decision";
    } catch {
      /* ignore */
    }

    const tags = kiConsent
      ? `src_google_ads,${stageTag},optin_ki_call_consent`
      : `src_google_ads,${stageTag},synthflow_disabled`;

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: data.phone || "",
      company: data.company || "",
      message: data.message || "",
      ki_consent: kiConsent,
      gclid,
      utm_source: attr.utm_source || "",
      utm_medium: attr.utm_medium || "",
      utm_campaign: attr.utm_campaign || "",
      utm_content: attr.utm_content || "",
      utm_term: attr.utm_term || "",
      ads_campaign_name: attr.ads_campaign_name || "",
      ads_ad_group_name: attr.ads_ad_group_name || "",
      first_landing_page: attr.first_landing_page || "",
      first_touch_at: attr.first_touch_at || "",
      source,
      funnel_stage: funnelStage,
      tags,
    };

    try {
      await fetch(getProxyUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // The lead may still have been created (fire-and-forget proxy); show success
      // but log for diagnostics.
      console.error("Lead submission:", err);
    }

    // Fire-and-forget: interne E-Mail-Benachrichtigung an info@ via n8n.
    // Darf den Lead niemals blockieren — Fehler werden ignoriert.
    try {
      fetch(integrations.leadNotifyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* ignore */
    }

    setConsentGiven(kiConsent);
    setStatus("ok");
    if (kiConsent) launchVoiceAgent();
    form.reset();
  }

  if (status === "ok") {
    return (
      <div className="rounded-lg border border-line bg-surface-elevated p-8 text-center">
        <CheckCircle2
          className="mx-auto h-10 w-10 text-status-success"
          strokeWidth={1.5}
        />
        <h3 className="mt-4 text-xl font-semibold text-ink-primary">
          {consentGiven ? "Ihre KI-Beratung startet gleich." : "Nachricht ist raus."}
        </h3>
        <p className="mt-2 text-base text-ink-secondary">
          {consentGiven
            ? "Der KI-Assistent meldet sich unten rechts. Andernfalls rufen wir Sie persönlich zurück."
            : "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-line bg-surface-elevated p-6 sm:p-8"
    >
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="lf-name" className={labelCls}>
            Name <span className="text-brand-orange">*</span>
          </label>
          <input id="lf-name" name="name" required className={`mt-1.5 ${inputCls}`} />
        </div>
        <div>
          <label htmlFor="lf-email" className={labelCls}>
            E-Mail <span className="text-brand-orange">*</span>
          </label>
          <input
            id="lf-email"
            name="email"
            type="email"
            required
            className={`mt-1.5 ${inputCls}`}
          />
        </div>
        <div>
          <label htmlFor="lf-phone" className={labelCls}>
            Telefon
          </label>
          <input id="lf-phone" name="phone" type="tel" className={`mt-1.5 ${inputCls}`} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lf-company" className={labelCls}>
            Betrieb / Unternehmen
          </label>
          <input id="lf-company" name="company" className={`mt-1.5 ${inputCls}`} />
        </div>
        {withMessage && (
          <div className="sm:col-span-2">
            <label htmlFor="lf-message" className={labelCls}>
              Nachricht
            </label>
            <textarea
              id="lf-message"
              name="message"
              rows={5}
              className={`mt-1.5 resize-y ${inputCls}`}
              placeholder="Erzählen Sie uns kurz von Ihrem Betrieb und Ihrer Herausforderung."
            />
          </div>
        )}
      </div>

      {withConsent && (
        <label className="mt-5 flex items-start gap-3 text-sm text-ink-secondary">
          <input
            type="checkbox"
            name="ki_consent"
            className="mt-1 h-4 w-4 accent-brand-orange"
          />
          <span>
            Ich möchte eine <strong className="text-ink-primary">kostenlose KI-Beratung</strong>{" "}
            in Anspruch nehmen und stimme der Verarbeitung meiner Daten gemäß
            Datenschutzerklärung zu.
          </span>
        </label>
      )}

      {status === "error" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-status-danger">
          <AlertCircle className="h-4 w-4" strokeWidth={2} />
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Wird gesendet…" : submitLabel}
          {status !== "submitting" && <ArrowRight className="h-4 w-4" strokeWidth={2} />}
        </Button>
        <p className="text-xs text-ink-muted">
          Mit dem Absenden stimmen Sie der Verarbeitung gemäß unserer{" "}
          <a href="/datenschutz" className="underline hover:text-ink-secondary">
            Datenschutzerklärung
          </a>{" "}
          zu.
        </p>
      </div>
    </form>
  );
}
