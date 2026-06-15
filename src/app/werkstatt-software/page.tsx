import type { Metadata } from "next";
import { ArrowRight, FileWarning, Clock, PhoneOff } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/DashboardPreview";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { problems, pricing, company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Werkstattsoftware für KFZ-Meisterbetriebe",
  description:
    "Aufträge auf Zetteln, Mahnwesen per Hand, Termine am Telefon? Werkstatt ONE löst die täglichen Probleme von KFZ-Betrieben — TÜV-Reminder, Mahnwesen, Terminbuchung in einer Plattform.",
};

const icons = [FileWarning, Clock, PhoneOff];

const stats = [
  { value: pricing.savings, label: "gespart bei Pilotkunde KFZ-Kruse aus Ganderkesee" },
  { value: pricing.monthly, label: "pro Monat · monatlich kündbar" },
  { value: "1 Tag", label: "bis startklar" },
];

export default function WerkstattSoftwarePage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <Container className="relative">
          <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <p className="eyebrow">Werkstattsoftware</p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink-primary sm:text-5xl lg:text-6xl">
                Die Werkstattsoftware für{" "}
                <span className="text-brand-orange">KFZ-Meisterbetriebe.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-secondary">
                TÜV-Reminder, Mahnwesen, Terminbuchung, Rechnung — alles in einer
                Plattform. {pricing.trialDays} Tage kostenlos testen, monatlich
                kündbar. MUT:Zu-Förderung bis 2.500 € Zuschuss. Pilotkunde
                KFZ-Kruse spart 13 Stunden pro Woche.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={company.trialUrl} variant="primary" size="lg">
                  Kostenlos testen
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </ButtonLink>
                <ButtonLink href="/funktionen" variant="secondary" size="lg">
                  Funktionen entdecken
                </ButtonLink>
              </div>
            </div>
            <Reveal className="lg:pl-4">
              <DashboardPreview />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* problems */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Das Problem"
            title="Kommt Ihnen das bekannt vor?"
            lede="Die meisten KFZ-Betriebe kämpfen täglich mit denselben Problemen."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {problems.map((p, i) => {
              const Icon = icons[i];
              return (
                <div key={p.title} className="bg-surface-elevated p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-md border border-line bg-surface text-brand-orange">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-secondary">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* stats */}
      <section className="border-y border-line bg-surface-elevated">
        <Container>
          <dl className="grid grid-cols-1 divide-line sm:grid-cols-3 sm:divide-x">
            {stats.map((s, i) => (
              <div key={s.label} className={`py-10 ${i > 0 ? "sm:pl-10" : ""}`}>
                <dt className="font-mono text-kpi font-semibold tracking-tight text-brand-orange">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-ink-secondary">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CTABand
        title="Bereit für den nächsten Schritt?"
        body="Erfahren Sie, wie Werkstatt ONE diese Probleme für Betriebe wie Ihren löst."
      />
    </>
  );
}
