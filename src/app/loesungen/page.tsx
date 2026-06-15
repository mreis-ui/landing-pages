import type { Metadata } from "next";
import { CloudCog, Brain, Network, BarChart3, Workflow } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Lösungen",
  description:
    "Von Cloud-Migration über KI-gestützte Prognosen bis zur vollautomatischen Prozesssteuerung — wir bringen Ihren Betrieb auf das nächste Level.",
};

const solutions = [
  {
    icon: CloudCog,
    title: "Cloud-Analytics-Modernisierung",
    body: "Wir heben Ihre Daten aus Excel und Altsystemen in eine skalierbare Cloud-Umgebung. ETL-Pipelines, saubere Datenmodelle und DSGVO-konforme Speicherung — inklusive Migration und Schulung Ihres Teams.",
  },
  {
    icon: Brain,
    title: "Beschleunigung der Datenwissenschaft",
    body: "Vom Problem zum produktiven Modell: Wir entwickeln Use-Cases mit direktem ROI. Prototypen, MVPs und Monitoring für Teilebedarf, Rückläufer-Prognosen und Auslastungsoptimierung.",
  },
  {
    icon: Network,
    title: "Nahtlose Integration",
    body: "Nahtlose Integration in Ihre bestehende IT-Landschaft. Wir verbinden Teileportale, Finanzsysteme und Kommunikationskanäle zu einem durchgängigen Datenfluss — revisionssicher und wartbar.",
  },
  {
    icon: BarChart3,
    title: "Datengestützte Entscheidungen",
    body: "Transparente Kennzahlen statt Bauchgefühl. Echtzeit-Dashboards, Alerts und rollenbasierte Reports für Ihr gesamtes Team.",
  },
];

export default function LoesungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Lösungen"
        title="Das neue Zeitalter der beschleunigten Analytik."
        lede="Von Cloud-Migration über KI-gestützte Prognosen bis zur vollautomatischen Prozesssteuerung — wir bringen Ihren Betrieb auf das nächste Level."
      />

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {solutions.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 80}>
                <div className="flex h-full flex-col rounded-lg border border-line bg-surface-elevated p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-md border border-line bg-surface text-brand-orange">
                    <s.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-secondary">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-surface-elevated">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-md border border-line bg-surface text-brand-orange">
                <Workflow className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
                Prozesse automatisieren, Team entlasten.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-secondary">
                Belege prüfen, Erinnerungen versenden, Termine buchen,
                Genehmigungen einholen — vollautomatisch. Wir eliminieren
                Medienbrüche und manuelle Routinen. Ihr Team gewinnt Zeit für
                wertschöpfende Aufgaben, während Workflows im Hintergrund laufen.
              </p>
              <div className="mt-8">
                <ButtonLink href="/kontakt" variant="primary" size="lg">
                  Jetzt beraten lassen
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </ButtonLink>
              </div>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
              {[
                "Belegprüfung & Dokumentenverarbeitung",
                "Automatische Erinnerungen (TÜV, Mahnung, Termin)",
                "Self-Service-Terminbuchung rund um die Uhr",
                "Freigabe- und Genehmigungs-Workflows",
                "Durchgängiger Datenfluss ohne Medienbruch",
              ].map((row) => (
                <li
                  key={row}
                  className="bg-surface-elevated px-6 py-4 text-base text-ink-secondary"
                >
                  {row}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
