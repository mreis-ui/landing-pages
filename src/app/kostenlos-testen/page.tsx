import type { Metadata } from "next";
import { Check, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Kostenlos testen",
  description:
    "Werkstatt ONE live ansehen. Unverbindliches Erstgespräch — wir schauen gemeinsam, was Ihr Betrieb braucht. Keine Kreditkarte, monatlich kündbar.",
};

const trust = [
  "Unverbindlich",
  "Persönliches Erstgespräch",
  "DSGVO-konform · Made in Germany",
  "Auf Ihren Betrieb zugeschnitten",
];

export default function KostenlosTestenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kostenlos testen"
        title="Werkstatt ONE live ansehen."
        lede="Unverbindliches Erstgespräch. Wir schauen gemeinsam, was Ihr Betrieb braucht — und wie schnell sich die Umstellung rechnet."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div>
              <ul className="space-y-4">
                {trust.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-status-success"
                      strokeWidth={2.5}
                    />
                    <span className="text-base text-ink-secondary">{t}</span>
                  </li>
                ))}
              </ul>

              <figure className="mt-10 rounded-lg border border-line bg-surface-elevated p-6">
                <Quote className="h-6 w-6 text-brand-orange" strokeWidth={1.5} />
                <blockquote className="mt-3 text-base leading-relaxed text-ink-primary">
                  „Seit Werkstatt ONE spare ich mir rund 13 Stunden Verwaltungskram
                  pro Woche. Abends ist der Schreibtisch leer. Hätte ich das mal
                  früher gehabt."
                </blockquote>
                <figcaption className="mt-3 text-sm text-ink-secondary">
                  <span className="font-semibold text-ink-primary">
                    Christian Kruse
                  </span>{" "}
                  · KFZ-Meisterbetrieb Ganderkesee
                </figcaption>
              </figure>
            </div>

            <div>
              <p className="mb-5 text-base text-ink-secondary">
                Tragen Sie kurz Ihre Daten ein — wir melden uns für ein
                persönliches Gespräch.
              </p>
              <LeadForm
                source="Landing Page - Decision"
                stageTag="stage_decision"
                withConsent
                submitLabel="Demo anfragen"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
