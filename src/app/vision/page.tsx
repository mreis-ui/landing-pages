import type { Metadata } from "next";
import { Handshake, Wrench, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { CTABand } from "@/components/CTABand";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "Digitalisierung, die funktioniert. Wir verbinden technisches Fachwissen mit praktischer Umsetzungskompetenz — für den Mittelstand.",
};

const values = [
  {
    icon: Handshake,
    title: "Echte Partnerschaft",
    body: "Wir hören zu und lösen Probleme maßgeschneidert — keine Software von der Stange, sondern Lösungen für Ihren Betrieb.",
  },
  {
    icon: Wrench,
    title: "Hands-on-Mentalität",
    body: "Klare Kommunikation und verlässliche Begleitung, auch nach dem Go-Live. Wir lassen Sie nicht mit der Technik allein.",
  },
  {
    icon: Target,
    title: "Ergebnisorientiert",
    body: "Wir verbinden technisches Fachwissen mit praktischer Umsetzungskompetenz — und messen uns am Ergebnis für Ihren Betrieb.",
  },
];

export default function VisionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Unsere Mission"
        title="Digitalisierung, die funktioniert."
        lede="Wir begleiten mittelständische Betriebe auf dem Weg in die digitale Zukunft — mit durchdachten IT-Lösungen und intelligenter Automatisierung, die echte Prozesse verbessern."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <SectionHeading
              eyebrow="Technologie als Werkzeug"
              title="Technik soll dienen — nicht Selbstzweck sein."
            />
            <div className="max-w-prose text-lg leading-relaxed text-ink-secondary">
              <p>
                Technologie sollte einem praktischen Zweck dienen, nicht ihrer
                selbst willen existieren. Wir bauen passgenaue Lösungen — von der
                intelligenten Terminplanung bis zur umfassenden digitalen
                Transformation — und begleiten unsere Kunden über den gesamten
                Weg ihrer Digitalisierung.
              </p>
              <p className="mt-4">
                Werkstatt ONE ist aus genau dieser Haltung entstanden: nah an der
                Werkstatt, gebaut für den echten Arbeitsalltag — nicht am
                Reißbrett.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-surface-elevated">
        <Container>
          <SectionHeading eyebrow="Werte" title="Worauf es uns ankommt." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="bg-surface-elevated p-8">
                <span className="grid h-11 w-11 place-items-center rounded-md border border-line bg-surface text-brand-orange">
                  <v.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-primary">
                  {v.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-secondary">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-prose">
            <p className="eyebrow">Das Team</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
              Erfahrung aus Entwicklung, Integration und Beratung.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-secondary">
              Hinter {company.name} steht Erfahrung in IT-Entwicklung,
              Systemintegration und Unternehmensberatung über mehrere Branchen
              hinweg. Wir verbinden technische Tiefe mit dem Blick für den
              betriebswirtschaftlichen Nutzen — und übersetzen beides in Software,
              die im Werkstattalltag besteht.
            </p>
          </div>
        </Container>
      </Section>

      <CTABand
        title="Lassen Sie uns gemeinsam Ihren Betrieb digitalisieren."
        body="Unverbindlich, ehrlich, auf Augenhöhe. Erzählen Sie uns von Ihrem Betrieb."
      />
    </>
  );
}
