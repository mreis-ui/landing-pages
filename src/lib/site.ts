/*
 * Central content model for the Flowbyte Systems marketing site.
 * Single source of truth — pages import from here so copy stays consistent.
 */

export const company = {
  name: "Flowbyte Systems",
  product: "Werkstatt ONE",
  owner: "Mattis Kruse",
  role: "Inhaber / Geschäftsführer",
  street: "Auf dem Hohenborn 43",
  city: "27777 Ganderkesee",
  region: "Landkreis Oldenburg",
  phone: "0151 19653560",
  phoneHref: "+4915119653560",
  email: "info@flowbytesystems.com",
  vatId: "5712405837",
  classification: "IT-Dienstleistungen / Unternehmensberatung",
  domain: "flowbytesystems.com",
  demoUrl: "https://demo.flowbytesystems.com/login",
  trialUrl: "/kostenlos-testen",
} as const;

/* Marketing / CRM integration — ported 1:1 from the existing production site. */
export const integrations = {
  gtmId: "GTM-MDTTZXG5",
  googleAdsId: "AW-17943325984",
  conversionLabel: "AW-17943325984/JjkhCIrT7fUbEKDahexC",
  // Cloudflare Worker proxy → GoHighLevel (token stays server-side)
  ghlProxyUrl: "https://ghl-proxy.flowbytesystems.com/api/lead",
  // Direct GHL inbound webhook — used as fallback on localhost / file://
  ghlWebhookFallback:
    "https://services.leadconnectorhq.com/hooks/epcWZcMAjE6RqtFxTSBq/webhook-trigger/0f54a7ab-ea10-4713-8b10-eb497607cb3a",
  elevenLabsAgentId: "agent_9301kp5p12a7fnbrbdmtt99vvqnv",
  elevenLabsScript: "https://elevenlabs.io/convai-widget/index.js",
} as const;

export const pricing = {
  // Konkrete Preise bewusst offen gelassen (Abstimmung mit Mattis ausstehend).
  monthly: "Auf Anfrage",
  cycle: "pro Monat",
  cancel: "monatlich kündbar",
  trialDays: 30,
  onboarding: "1 Tag bis startklar",
  savings: "13 h / Woche",
} as const;

export type Plan = {
  name: string;
  price: string;
  cycle: string;
  tagline: string;
  features: string[];
  featured?: boolean;
  cta: string;
};

export const plans: Plan[] = [
  {
    name: "Starter",
    price: "Auf Anfrage",
    cycle: "",
    tagline: "Für den Einstieg in den digitalen Betrieb.",
    features: [
      "Online-Terminbuchung 24/7",
      "TÜV- & HU-Reminder",
      "Digitale Rechnungen",
      "Bis 2 Nutzer",
      "E-Mail-Support",
    ],
    cta: "Angebot anfragen",
  },
  {
    name: "Pro",
    price: "Auf Anfrage",
    cycle: "",
    tagline: "Der volle Funktionsumfang für wachsende Betriebe.",
    featured: true,
    features: [
      "Alle Starter-Funktionen",
      "Automatisches Mahnwesen",
      "Leihwagen-Verwaltung",
      "KI-Preisprognosen",
      "Bis 8 Nutzer",
      "Telefon-Support",
      "ERP-Anbindung (Profi32 u. a.)",
    ],
    cta: "Angebot anfragen",
  },
  {
    name: "Enterprise",
    price: "Individuell",
    cycle: "",
    tagline: "Für Multi-Standort-Betriebe mit eigenen Anforderungen.",
    features: [
      "Alle Pro-Funktionen",
      "Unbegrenzte Nutzer",
      "Multi-Standort",
      "Custom-Integrationen",
      "Dedizierter Ansprechpartner",
      "SLA-Garantie",
    ],
    cta: "Beratung anfragen",
  },
];

export const problems = [
  {
    title: "Aufträge auf Zetteln",
    body: "Handgeschriebene Aufträge gehen verloren, werden falsch gelesen oder vergessen. Mehrere Stunden pro Woche — verschwendet.",
  },
  {
    title: "Mahnwesen per Hand",
    body: "Offene Rechnungen stapeln sich, weil niemand Zeit hat, Mahnungen zu schreiben. Tausende Euro pro Jahr — zu spät oder gar nicht kassiert.",
  },
  {
    title: "Termine am Telefon",
    body: "Kunden rufen an, Sie stehen am Fahrzeug. Rückrufe vergessen. Konkurrenzbetrieb bekommt den Auftrag.",
  },
];

export type NavLink = { label: string; href: string };

export const nav: NavLink[] = [
  { label: "Funktionen", href: "/funktionen" },
  { label: "Lösungen", href: "/loesungen" },
  { label: "Referenzen", href: "/referenzen" },
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
  | "boxes";

export type Module = {
  slug: string;
  icon: IconName;
  name: string;
  tagline: string;
  short: string;
  /* detail page content */
  intro: string;
  benefits: { title: string; body: string }[];
  features: string[];
  metric: { value: string; label: string };
};

export const modules: Module[] = [
  {
    slug: "terminbuchung",
    icon: "calendar",
    name: "Online-Terminbuchung",
    tagline: "Kunden buchen selbst — 24/7.",
    short:
      "Kunden buchen selbst — 24/7. Automatische Bestätigung per SMS und E-Mail.",
    intro:
      "Schluss mit dem Telefon-Ping-Pong. Ihre Kunden buchen rund um die Uhr selbst einen Termin — passend zu Ihrer Auslastung, Ihren Bühnen und Ihren Mitarbeitern. Jede Buchung landet sofort in Ihrem Kalender, inklusive automatischer Bestätigung.",
    benefits: [
      {
        title: "Keine Anrufe mehr abarbeiten",
        body: "Das Buchungsportal nimmt Terminwünsche entgegen, während Sie an der Hebebühne stehen.",
      },
      {
        title: "Realistische Slots",
        body: "Slot-Limits und Kollisionsprüfung verhindern Doppelbelegungen und Leerlauf.",
      },
      {
        title: "Automatische Bestätigung",
        body: "Kunde bekommt sofort SMS und E-Mail — keine vergessenen Termine, weniger No-Shows.",
      },
    ],
    features: [
      "24/7 Selbstbuchung über Ihr eigenes Portal",
      "Bestätigung & Erinnerung per SMS und E-Mail",
      "Kapazitäts- & Bühnenplanung mit Kollisionsprüfung",
      "Mitarbeiter- und Abwesenheitsverwaltung",
      "Anbindung an Auftragserfassung & Dashboard",
    ],
    metric: { value: "24/7", label: "Buchbar ohne Personal" },
  },
  {
    slug: "auftragserfassung",
    icon: "clipboard",
    name: "Digitale Auftragserfassung",
    tagline: "Vom Check-in bis zur Übergabe — lückenlos.",
    short:
      "Vom Check-in bis zur Fahrzeugübergabe — lückenlos dokumentiert, nie wieder Zettel suchen.",
    intro:
      "Vom Check-in bis zur Fahrzeugübergabe vollständig digital. Schäden per Klick auf der Fahrzeugskizze dokumentieren, Unterschrift direkt auf dem Tablet, alles revisionssicher gespeichert. Nie wieder einen Auftragszettel suchen.",
    benefits: [
      {
        title: "Lückenlose Dokumentation",
        body: "Jeder Schritt wird festgehalten — vom Annahmeprotokoll bis zur Übergabe.",
      },
      {
        title: "Schadensskizze per Klick",
        body: "Bestehende Schäden auf der interaktiven Fahrzeugskizze markieren — rechtssicher dokumentiert.",
      },
      {
        title: "Digitale Unterschrift",
        body: "Kunde unterschreibt direkt auf dem Tablet, der Beleg ist sofort archiviert.",
      },
    ],
    features: [
      "Digitales Annahme- und Übergabeprotokoll",
      "Interaktive Fahrzeug-Schadensskizze",
      "Foto-Dokumentation am Fahrzeug",
      "Unterschrift auf Tablet / Touch-Gerät",
      "Revisionssichere Archivierung",
    ],
    metric: { value: "0", label: "Zettel zu suchen" },
  },
  {
    slug: "mahnwesen",
    icon: "bell-ring",
    name: "Automatisches Mahnwesen",
    tagline: "Das System mahnt — Sie kassieren.",
    short:
      "Überfällige Rechnungen? Das System mahnt automatisch in drei Eskalationsstufen.",
    intro:
      "Offene Posten kosten Liquidität. Werkstatt ONE erkennt überfällige Rechnungen automatisch und versendet Zahlungserinnerungen in mehreren Eskalationsstufen — per E-Mail, SMS oder Brief. Auf Wunsch bis zur Inkasso-Übergabe.",
    benefits: [
      {
        title: "Drei Eskalationsstufen",
        body: "Von der freundlichen Zahlungserinnerung bis zur letzten Mahnung — automatisch, mit passendem Ton.",
      },
      {
        title: "Mehrkanal-Versand",
        body: "E-Mail, SMS und PDF-Brief — einzeln oder parallel, je nach Kunde.",
      },
      {
        title: "Bessere Liquidität",
        body: "Konsequentes Nachfassen ohne manuelle Arbeit — Außenstände sinken spürbar.",
      },
    ],
    features: [
      "Automatische Erkennung überfälliger Rechnungen",
      "Zahlungserinnerung + 3 Mahnstufen mit Eskalation",
      "Versand per E-Mail, SMS und PDF-Brief",
      "Einzelversand für Sonderfälle",
      "Optionale Inkasso-Übergabe",
    ],
    metric: { value: "3", label: "Eskalationsstufen automatisch" },
  },
  {
    slug: "tuev-reminder",
    icon: "stamp",
    name: "TÜV / AU-Reminder",
    tagline: "Erinnern Sie automatisch — vor der Fälligkeit.",
    short:
      "Automatische Erinnerung an Ihre Kunden vor der Fälligkeit. Sie bekommen den Folgeauftrag.",
    intro:
      "Die Hauptuntersuchung ist der verlässlichste Folgeauftrag im Werkstattjahr — wenn der Kunde rechtzeitig erinnert wird. Werkstatt ONE überwacht alle Fälligkeiten und meldet sich automatisch bei Ihren Kunden, bevor der TÜV abläuft.",
    benefits: [
      {
        title: "Kein verpasster Folgeauftrag",
        body: "Das System kennt jede Fälligkeit und erinnert rechtzeitig — der Kunde kommt zu Ihnen zurück.",
      },
      {
        title: "Automatisch & persönlich",
        body: "Erinnerung per E-Mail oder SMS im Namen Ihrer Werkstatt — fühlt sich an wie persönlicher Service.",
      },
      {
        title: "Direkt zur Buchung",
        body: "Aus der Erinnerung heraus bucht der Kunde gleich seinen Termin.",
      },
    ],
    features: [
      "Automatische Überwachung aller HU/AU-Fälligkeiten",
      "Erinnerung per E-Mail und SMS",
      "Einzelversand für gezielte Ansprache",
      "Verknüpfung mit Online-Terminbuchung",
      "Historie & Versandnachweis je Fahrzeug",
    ],
    metric: { value: "100 %", label: "der Fälligkeiten im Blick" },
  },
  {
    slug: "dashboard",
    icon: "line-chart",
    name: "Echtzeit-Dashboard",
    tagline: "Umsatz, Auslastung, offene Posten — auf einen Blick.",
    short:
      "Umsatz, Auslastung, offene Posten — alles auf einen Blick. Auch vom Smartphone.",
    intro:
      "Führen Sie Ihren Betrieb mit Zahlen statt Bauchgefühl. Das Echtzeit-Dashboard zeigt Umsatz, Auslastung und offene Posten — auf dem Bildschirm im Büro und auf dem Smartphone unterwegs.",
    benefits: [
      {
        title: "Alles auf einen Blick",
        body: "Umsatz dieser Woche, offene Aufträge, Auslastung — die Kennzahlen, die zählen.",
      },
      {
        title: "Auch mobil",
        body: "Der Stand Ihres Betriebs in der Hosentasche — jederzeit, von überall.",
      },
      {
        title: "Frühwarnung",
        body: "Engpässe und Außenstände sehen Sie, bevor sie zum Problem werden.",
      },
    ],
    features: [
      "Umsatz-, Auslastungs- und OP-Kennzahlen in Echtzeit",
      "Mobil-optimiert fürs Smartphone",
      "Vergleich zur Vorwoche / zum Vormonat",
      "Rollenbasierte Ansichten fürs Team",
      "Business-Intelligence-Auswertungen",
    ],
    metric: { value: "87 %", label: "Auslastung im Blick (Beispiel)" },
  },
  {
    slug: "lager",
    icon: "boxes",
    name: "Lager & Einkauf",
    tagline: "Bestand im Griff, Bestellung automatisch.",
    short:
      "Effiziente Lagerverwaltung mit automatischer Bestandskontrolle und Bestellvorschlägen.",
    intro:
      "Teile, die fehlen, kosten doppelt: Zeit und Kunden. Die Lagerverwaltung behält Ihren Bestand im Blick, warnt bei Mindestmengen und schlägt Bestellungen automatisch vor — damit das richtige Teil da ist, wenn das Auto auf der Bühne steht.",
    benefits: [
      {
        title: "Automatische Bestandskontrolle",
        body: "Mindestmengen überwacht das System — Sie werden gewarnt, bevor ein Teil ausgeht.",
      },
      {
        title: "Bestellvorschläge",
        body: "Auf Basis von Verbrauch und Bestand schlägt Werkstatt ONE die nächste Bestellung vor.",
      },
      {
        title: "Weniger Kapitalbindung",
        body: "Kein totes Lager, keine Engpässe — der Bestand passt sich Ihrem echten Bedarf an.",
      },
    ],
    features: [
      "Lagerverwaltung mit Mindestmengen-Warnung",
      "Automatische Bestellvorschläge",
      "Verbrauchs- und Bestandsanalyse",
      "Anbindung an Auftragserfassung",
      "Inventur-Unterstützung",
    ],
    metric: { value: "Auto", label: "Bestellvorschläge" },
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Account erstellen",
    body: "In wenigen Minuten registriert. Keine Kreditkarte, kein Risiko — 30 Tage kostenlos testen.",
  },
  {
    step: "02",
    title: "Einrichten & loslegen",
    body: "Wir richten Werkstatt ONE mit Ihnen ein und übernehmen Ihre Daten. Persönliches Onboarding inklusive.",
  },
  {
    step: "03",
    title: "Betrieb digitalisiert",
    body: "Termine, Aufträge, Mahnwesen und TÜV-Reminder laufen — Sie gewinnen Zeit fürs Wesentliche.",
  },
];

export const testimonial = {
  quote:
    "Seit Werkstatt ONE spare ich mir rund 13 Stunden Verwaltungskram pro Woche.",
  author: "Christian Kruse",
  role: "KFZ-Meisterbetrieb Ganderkesee",
};

export const trustSignals = [
  "Keine Kreditkarte",
  "Monatlich kündbar",
  "Persönliches Onboarding",
  "DSGVO-konform",
];

export const dashboardKpis = [
  { label: "Umsatz diese Woche", value: "8.240 €", delta: "+12 % vs. Vorwoche", tone: "ok" },
  { label: "Offene Aufträge", value: "14", delta: "3 heute fällig", tone: "warn" },
  { label: "Auslastung", value: "87 %", delta: "Mo–Sa", tone: "info" },
] as const;

export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "Was kostet Werkstatt ONE?",
    a: "Werkstatt ONE ist monatlich kündbar, ohne lange Vertragsbindung. Den genauen Preis stimmen wir abhängig von Tarif und gewünschtem Funktionsumfang im persönlichen Gespräch mit Ihnen ab. Sie testen alle Funktionen 30 Tage kostenlos, ganz ohne Kreditkarte.",
  },
  {
    q: "Wie lange dauert die Einrichtung?",
    a: "In der Regel sind Sie an einem Tag startklar. Wir übernehmen die Einrichtung gemeinsam mit Ihnen, importieren Ihre bestehenden Daten und begleiten Sie mit einem persönlichen Onboarding.",
  },
  {
    q: "Kann ich meine bestehenden Daten übernehmen?",
    a: "Ja. Wir migrieren Ihre Stammdaten — Kunden, Fahrzeuge, offene Posten — aus Ihrem bisherigen System. Sie starten nicht bei null, sondern direkt mit Ihren echten Daten.",
  },
  {
    q: "Ist Werkstatt ONE DSGVO-konform?",
    a: "Ja. Werkstatt ONE ist DSGVO-konform aufgebaut, die Datenübertragung erfolgt SSL/TLS-verschlüsselt. Auf Wunsch stellen wir einen Auftragsverarbeitungsvertrag (AVV) bereit.",
  },
  {
    q: "Kann ich monatlich kündigen?",
    a: "Ja. Werkstatt ONE ist monatlich kündbar. Keine Mindestlaufzeit, keine versteckten Kosten — Sie bleiben, weil es sich lohnt, nicht weil ein Vertrag Sie hält.",
  },
  {
    q: "Brauche ich besondere Hardware?",
    a: "Nein. Werkstatt ONE läuft im Browser — auf PC, Tablet und Smartphone. Für die digitale Auftragserfassung empfiehlt sich ein Tablet, zwingend nötig ist es aber nicht.",
  },
  {
    q: "Für wen ist Werkstatt ONE gedacht?",
    a: "Für KFZ-Meisterbetriebe und Werkstätten, die Verwaltungsaufwand reduzieren und ihren Betrieb digitalisieren wollen. Entwickelt aus der Praxis einer Werkstatt in Ganderkesee — für Betriebe im Landkreis Oldenburg und darüber hinaus.",
  },
];

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
