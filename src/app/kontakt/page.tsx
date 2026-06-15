import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { LeadForm } from "@/components/LeadForm";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Bereit für den nächsten Schritt? Erzählen Sie uns von Ihrem Betrieb — wir melden uns innerhalb von 24 Stunden.",
};

const details = [
  {
    icon: MapPin,
    label: "Adresse",
    value: `${company.street}\n${company.city}`,
  },
  { icon: Phone, label: "Telefon", value: company.phone, href: `tel:${company.phoneHref}` },
  { icon: Mail, label: "E-Mail", value: company.email, href: `mailto:${company.email}` },
  { icon: Clock, label: "Antwortzeit", value: "Innerhalb von 24 Stunden" },
];

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Bereit für den nächsten Schritt?"
        lede="Erzählen Sie uns von Ihrer Herausforderung. Wir zeigen Ihnen, wie vergleichbare Betriebe ähnliche Probleme gelöst haben — unverbindlich, in 4 bis 8 Wochen umsetzbar."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <p className="eyebrow">So erreichen Sie uns</p>
              <dl className="mt-8 space-y-6">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-line bg-surface-elevated text-brand-orange">
                      <d.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <dt className="text-sm text-ink-muted">{d.label}</dt>
                      <dd className="mt-0.5 whitespace-pre-line text-base font-medium text-ink-primary">
                        {d.href ? (
                          <a href={d.href} className="hover:text-brand-orange">
                            {d.value}
                          </a>
                        ) : (
                          d.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-10 rounded-lg border border-line bg-surface-elevated p-6">
                <p className="font-mono text-2xs uppercase tracking-wider text-ink-muted">
                  Lieber direkt loslegen?
                </p>
                <a
                  href={company.trialUrl}
                  className="mt-2 inline-block text-base font-medium text-brand-orange hover:text-brand-orange-hover"
                >
                  Kostenlos testen → 30 Tage gratis
                </a>
              </div>
            </div>

            <LeadForm
              source="Landing Page - Kontakt"
              stageTag="stage_consideration"
              withMessage
              submitLabel="Nachricht senden"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
