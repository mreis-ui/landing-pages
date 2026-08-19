/*
 * Central content model for the Flowbyte Systems marketing site.
 * Single source of truth — pages import from here so copy stays consistent.
 *
 * Redaktionelle Inhalte (Texte, Preise, Kontakt-/GmbH-Daten, FAQ, Module)
 * liegen als JSON unter /content und werden über den geschützten
 * Admin-Bereich gepflegt. Technische Konfiguration (Tracking-IDs,
 * Navigation, URLs) bleibt bewusst hier im Code.
 */

import unternehmenJson from "../../content/unternehmen.json";
import preiseJson from "../../content/preise.json";
import startseiteJson from "../../content/startseite.json";
import moduleJson from "../../content/module.json";
import faqJson from "../../content/faq.json";

export const company = {
  ...unternehmenJson,
  domain: "flowbytesystems.com",
  demoUrl: "https://demo.flowbytesystems.com/login",
  trialUrl: "/kostenlos-testen",
};

/* Marketing / CRM integration — ported 1:1 from the existing production site. */
export const integrations = {
  gtmId: "GTM-MDTTZXG5",
  googleAdsId: "AW-17943325984",
  conversionLabel: "AW-17943325984/JjkhCIrT7fUbEKDahexC",
  // Cloudflare Worker proxy → GoHighLevel (token stays server-side)
  ghlProxyUrl: "https://ghl-proxy.flowbytesystems.com/api/lead",
  // n8n-Webhook → interne E-Mail-Benachrichtigung an info@ (zusätzlich zu GHL)
  leadNotifyUrl: "https://n8n.flowbytesystems.com/webhook/website-lead",
  // Direct GHL inbound webhook — used as fallback on localhost / file://
  ghlWebhookFallback:
    "https://services.leadconnectorhq.com/hooks/epcWZcMAjE6RqtFxTSBq/webhook-trigger/0f54a7ab-ea10-4713-8b10-eb497607cb3a",
  elevenLabsAgentId: "agent_9301kp5p12a7fnbrbdmtt99vvqnv",
  elevenLabsScript: "https://elevenlabs.io/convai-widget/index.js",
  // Self-hosted Matomo (cookieless / consent-free Webanalyse).
  // Eigene Subdomain — muss auf den Matomo-Container geroutet werden (siehe Infra).
  matomoUrl: "https://analytics.flowbytesystems.com",
  // TODO(Matomo): Site-ID der in Matomo neu angelegten Website "flowbytesystems.com".
  // Solange leer, wird KEIN Matomo-Tracker geladen (no-op, bricht den Build nicht).
  matomoSiteId: "",
} as const;

export const pricing = preiseJson.pricing;

export type Plan = {
  name: string;
  price: string;
  cycle: string;
  tagline: string;
  features: string[];
  featured?: boolean;
  cta: string;
};

export const plans = preiseJson.plans as unknown as Plan[];

export const problems = startseiteJson.problems;

export type NavLink = { label: string; href: string };

export const nav: NavLink[] = [
  { label: "Funktionen", href: "/funktionen" },
  { label: "Lösungen", href: "/loesungen" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Blog", href: "/blog" },
  { label: "Preise", href: "/preise" },
  { label: "Vision", href: "/vision" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export type IconName =
  | "calendar"
  | "clipboard"
  | "bell-ring"
  | "stamp"
  | "line-chart"
  | "boxes"
  | "landmark"
  | "calculator"
  | "trending-up"
  | "scan-line"
  | "messages-square"
  | "users";

export type ModuleCategory =
  | "Werkstatt-Betrieb"
  | "Finanzen & Buchhaltung"
  | "Auswertung & Controlling"
  | "Dokumente & Kommunikation"
  | "Personal";

export const moduleCategories: ModuleCategory[] = [
  "Werkstatt-Betrieb",
  "Finanzen & Buchhaltung",
  "Auswertung & Controlling",
  "Dokumente & Kommunikation",
  "Personal",
];

export type Module = {
  slug: string;
  icon: IconName;
  name: string;
  category: ModuleCategory;
  /* not yet generally available — shown with an "in Entwicklung" badge */
  status?: "soon";
  tagline: string;
  short: string;
  /* detail page content */
  intro: string;
  benefits: { title: string; body: string }[];
  features: string[];
  metric: { value: string; label: string };
};

export const modules = moduleJson.modules as unknown as Module[];

export const howItWorks = startseiteJson.howItWorks;

export const testimonial = startseiteJson.testimonial;

export const trustSignals = startseiteJson.trustSignals;

export type DashboardKpi = {
  label: string;
  value: string;
  delta: string;
  tone: "ok" | "warn" | "info";
};

export const dashboardKpis = startseiteJson.dashboardKpis as unknown as DashboardKpi[];

export type FaqItem = { q: string; a: string };

export const faq = faqJson.items as unknown as FaqItem[];

export const footerSections = [
  {
    title: "Produkt",
    links: [
      { label: "Funktionen", href: "/funktionen" },
      { label: "Preise", href: "/preise" },
      { label: "Referenzen", href: "/referenzen" },
      { label: "Kostenlos testen", href: company.trialUrl },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Vision", href: "/vision" },
      { label: "Lösungen", href: "/loesungen" },
      { label: "FAQ", href: "/faq" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];
