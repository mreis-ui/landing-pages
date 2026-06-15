import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { plans, company, pricing } from "@/lib/site";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Klare Preise, monatlich kündbar: Starter ab 199 €, Pro 349 €, Enterprise ab 699 €. 30 Tage kostenlos, MUT:Zu-Förderung bis 2.500 € (50 %).",
};

const priceFaq = [
  {
    q: "Gibt es Einrichtungskosten?",
    a: "Nein. Die Einrichtung und Datenmigration sind im Onboarding enthalten — keine versteckten Setup-Gebühren.",
  },
  {
    q: "Kann ich monatlich kündigen?",
    a: "Ja, alle Tarife sind monatlich kündbar. Keine Mindestlaufzeit.",
  },
  {
    q: "Wo liegen meine Daten?",
    a: "Auf Servern in Deutschland, DSGVO-konform und mit täglichen Backups.",
  },
  {
    q: "Lässt sich mein bestehendes System anbinden?",
    a: "Ja. Ab dem Pro-Tarif binden wir ERP-Systeme wie Profi32 an. In der Regel sind Sie an einem Tag startklar.",
  },
];

export default function PreisePage() {
  return (
    <>
      <PageHeader
        eyebrow="Preise"
        title="Klare Preise. Kein Risiko."
        lede={`Weniger als ein Tageslohn im Monat — und ${pricing.trialDays} Tage kostenlos getestet. Monatlich kündbar, keine Einrichtungsgebühr.`}
      >
        <div className="inline-flex items-center gap-2 rounded-md border border-brand-orange/30 bg-brand-orange-quiet px-4 py-2 text-sm text-ink-primary">
          <Sparkles className="h-4 w-4 text-brand-orange" strokeWidth={1.5} />
          <span>
            <strong>MUT:Zu-Förderung sichern</strong> — bis zu 2.500 € Zuschuss
            (50 %) für KFZ-Werkstätten
          </span>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <div className="grid items-stretch gap-4 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 70} className="flex">
                <div
                  className={cn(
                    "flex w-full flex-col rounded-lg border p-8",
                    plan.featured
                      ? "border-brand-orange bg-surface-elevated shadow-md ring-1 ring-brand-orange/20"
                      : "border-line bg-surface-elevated",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-ink-primary">
                      {plan.name}
                    </h3>
                    {plan.featured && (
                      <span className="rounded-pill bg-brand-orange px-2.5 py-0.5 font-mono text-2xs uppercase tracking-wider text-white">
                        Beliebt
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-ink-secondary">{plan.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="font-mono text-4xl font-semibold tracking-tight text-ink-primary">
                      {plan.price}
                    </span>
                    <span className="text-sm text-ink-muted">{plan.cycle}</span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-ink-secondary"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-status-success"
                          strokeWidth={2.5}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href={company.trialUrl}
                    variant={plan.featured ? "primary" : "secondary"}
                    size="lg"
                    className="mt-8 w-full"
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </ButtonLink>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-ink-muted">
            Alle Preise zzgl. MwSt. · {pricing.trialDays} Tage kostenlos testen ·
            keine Kreditkarte nötig
          </p>
        </Container>
      </Section>

      <Section pad="tight" className="border-y border-line bg-surface-elevated">
        <Container>
          <SectionHeading eyebrow="Preis-FAQ" title="Häufige Fragen zum Preis." />
          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {priceFaq.map((f) => (
              <div key={f.q}>
                <h3 className="text-base font-semibold text-ink-primary">{f.q}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-secondary">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-base text-ink-secondary">
            Weitere Fragen?{" "}
            <Link
              href="/faq"
              className="font-medium text-brand-orange hover:text-brand-orange-hover"
            >
              Zur ausführlichen FAQ
            </Link>
          </p>
        </Container>
      </Section>

      <CTABand
        title="Unsicher, welcher Tarif passt?"
        body="Wir beraten Sie ehrlich — und klären gleich, ob die MUT:Zu-Förderung für Sie infrage kommt."
      />
    </>
  );
}
