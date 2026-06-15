import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { company, trustSignals } from "@/lib/site";

export function CTABand({
  title = "Starten Sie jetzt. Kostenlos. Ohne Risiko.",
  body = "Alle Funktionen. Keine Kreditkarte. Danach entscheiden Sie.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-y border-line-strong bg-surface-elevated">
      <Container className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-ink-secondary">{body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={company.trialUrl} variant="primary" size="lg">
              Kostenlos testen
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </ButtonLink>
            <ButtonLink href="/kontakt" variant="secondary" size="lg">
              Beratung anfragen
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {trustSignals.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-secondary"
              >
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-status-success"
                  strokeWidth={2.5}
                />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
