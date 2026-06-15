import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { CTABand } from "@/components/CTABand";
import { faq, company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description:
    "Antworten zu Preis, Einrichtung, Datenmigration, DSGVO und Kündigung von Werkstatt ONE.",
};

// FAQ structured data for rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="FAQ"
        title="Häufige Fragen."
        lede="Alles Wichtige zu Preis, Einrichtung und Datenschutz. Ihre Frage ist nicht dabei? Schreiben Sie uns einfach."
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-lg border border-line">
            {faq.map((item) => (
              <details key={item.q} className="group bg-surface-elevated">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-lg font-medium text-ink-primary marker:hidden hover:bg-surface">
                  {item.q}
                  <Plus
                    className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-45 group-open:text-brand-orange"
                    strokeWidth={2}
                  />
                </summary>
                <div className="px-6 pb-6 text-base leading-relaxed text-ink-secondary">
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-base text-ink-secondary">
            Noch Fragen?{" "}
            <a
              href={`mailto:${company.email}`}
              className="font-medium text-brand-orange hover:text-brand-orange-hover"
            >
              {company.email}
            </a>{" "}
            oder{" "}
            <a
              href={`tel:${company.phoneHref}`}
              className="font-medium text-brand-orange hover:text-brand-orange-hover"
            >
              {company.phone}
            </a>
          </p>
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
