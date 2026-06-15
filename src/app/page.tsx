import Link from "next/link";
import { ArrowRight, Check, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/DashboardPreview";
import { ModuleCard } from "@/components/ModuleCard";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import {
  modules,
  howItWorks,
  testimonial,
  pricing,
  company,
} from "@/lib/site";

const heroStats = [
  { value: pricing.savings, label: "gespart bei Pilotkunde KFZ-Kruse" },
  { value: `${pricing.trialDays} Tage`, label: "kostenlos testen" },
  { value: "6 Module", label: "in einer Plattform" },
  { value: "1 Tag", label: "bis startklar" },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <Container className="relative">
          <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <p className="text-sm font-medium text-ink-secondary">
                Aus der Werkstatt, für die Werkstatt
              </p>

              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink-primary sm:text-5xl lg:text-6xl">
                Werkstattsoftware für{" "}
                <span className="text-brand-orange">KFZ-Meisterbetriebe.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-secondary">
                TÜV-Reminder, Mahnwesen, Terminbuchung — alles in einer
                Plattform. Von einer Werkstatt aus Ganderkesee, für KFZ-Betriebe
                im {company.region}. {pricing.trialDays} Tage kostenlos testen,
                monatlich kündbar.
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

        {/* stat band */}
        <div className="border-t border-line bg-surface-elevated/60">
          <Container>
            <dl className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
              {heroStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-2 py-6 ${i % 2 === 1 ? "lg:pl-8" : ""} ${
                    i < 2 ? "border-b border-line lg:border-b-0" : ""
                  } ${i > 0 ? "lg:pl-8" : ""}`}
                >
                  <dt className="font-mono text-2xl font-semibold tracking-tight text-ink-primary">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-sm text-ink-secondary">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ----------------------------------------------------------- FUNKTIONEN */}
      <Section id="features">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Funktionen"
              title="Alles, was den Betrieb am Laufen hält — in einer Plattform."
              lede="Sechs Module, die ineinandergreifen. Kein Insellösungs-Chaos, kein Medienbruch — ein System vom ersten Anruf bis zur bezahlten Rechnung."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 3) * 60}>
                <ModuleCard module={m} index={i} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- HOW IT WORKS */}
      <Section id="how" className="border-y border-line bg-surface-elevated">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="So funktioniert's"
              title="In drei Schritten digital."
              lede="Kein monatelanges IT-Projekt. Sie sind in der Regel an einem Tag startklar."
            />
          </Reveal>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <Reveal
                as="li"
                key={step.step}
                delay={i * 90}
                className="bg-surface-elevated p-8"
              >
                <span className="font-mono text-3xl font-semibold text-brand-orange">
                  {step.step}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-secondary">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- PRICING */}
      <Section id="preise">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Preise"
                title="Faire, transparente Konditionen."
                lede="Monatlich kündbar, ohne lange Vertragsbindung und ohne Modulgebühren-Dschungel. Den passenden Tarif stimmen wir gemeinsam im persönlichen Gespräch ab."
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-lg border border-line-strong bg-surface-elevated p-8 shadow-md">
                <ul className="space-y-3">
                  {[
                    "Alle sechs Module aus einer Hand",
                    `${pricing.trialDays} Tage kostenlos testen, ohne Kreditkarte`,
                    "Monatlich kündbar, keine lange Vertragsbindung",
                    "Persönliches Onboarding & Datenmigration",
                    "DSGVO-konform, SSL-verschlüsselt",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-base text-ink-secondary"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-status-success"
                        strokeWidth={2.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={company.trialUrl} variant="primary" size="lg">
                    {pricing.trialDays} Tage testen
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </ButtonLink>
                  <ButtonLink href="/preise" variant="secondary" size="lg">
                    Tarife ansehen
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- TESTIMONIAL */}
      <Section id="testimonial" className="border-t border-line bg-surface-elevated">
        <Container>
          <Reveal as="figure" className="mx-auto max-w-3xl text-center">
            <Quote
              className="mx-auto h-8 w-8 text-brand-orange"
              strokeWidth={1.5}
              aria-hidden
            />
            <blockquote className="mt-6 text-balance text-2xl font-medium leading-snug text-ink-primary sm:text-3xl">
              „{testimonial.quote}"
            </blockquote>
            <figcaption className="mt-6 text-sm text-ink-secondary">
              <span className="font-semibold text-ink-primary">
                {testimonial.author}
              </span>{" "}
              · {testimonial.role}
            </figcaption>
            <Link
              href="/referenzen"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange hover:text-brand-orange-hover"
            >
              Die ganze Geschichte lesen
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Reveal>
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
