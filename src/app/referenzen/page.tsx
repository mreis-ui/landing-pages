import type { Metadata } from "next";
import { Quote, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { testimonial, company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Referenzen",
  description:
    "KFZ-Kruse aus Ganderkesee spart mit Werkstatt ONE rund 13 Stunden Verwaltung pro Woche. Die Erfolgsgeschichte unseres Pilotbetriebs.",
};

const caseStats = [
  { value: "13 h", label: "Verwaltung gespart / Woche" },
  { value: "100 %", label: "TÜV-Fälligkeiten erfasst" },
  { value: "1 Tag", label: "bis produktiv im Einsatz" },
];

const before = [
  "Termine per Telefon, Zettel und Kalenderbuch",
  "TÜV-Fälligkeiten gingen unter — Folgeaufträge verloren",
  "Mahnungen manuell, oft gar nicht verschickt",
  "Kein Überblick über Auslastung und offene Posten",
];

const after = [
  "Kunden buchen online, 24/7 — Bestätigung automatisch",
  "TÜV-Reminder holt Folgeaufträge automatisch zurück",
  "Mahnwesen läuft in drei Stufen von allein",
  "Echtzeit-Dashboard — auch unterwegs auf dem Smartphone",
];

export default function ReferenzenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Referenz · KFZ-Kruse"
        title="Wie ein Meisterbetrieb 13 Stunden pro Woche zurückgewinnt."
        lede="Werkstatt ONE ist nicht am Reißbuch entstanden, sondern im echten Betrieb: dem KFZ-Meisterbetrieb Kruse in Ganderkesee. Hier wurde jede Funktion unter realen Bedingungen erprobt."
      />

      {/* stat band */}
      <section className="border-b border-line bg-surface-elevated">
        <Container>
          <dl className="grid grid-cols-1 divide-line sm:grid-cols-3 sm:divide-x">
            {caseStats.map((s, i) => (
              <div key={s.label} className={`py-8 ${i > 0 ? "sm:pl-10" : ""}`}>
                <dt className="font-mono text-kpi font-semibold tracking-tight text-brand-orange">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-ink-secondary">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* quote */}
      <Section>
        <Container>
          <figure className="mx-auto max-w-3xl">
            <Quote className="h-8 w-8 text-brand-orange" strokeWidth={1.5} />
            <blockquote className="mt-5 text-balance text-2xl font-medium leading-snug text-ink-primary sm:text-3xl">
              „{testimonial.quote}"
            </blockquote>
            <figcaption className="mt-5 text-sm text-ink-secondary">
              <span className="font-semibold text-ink-primary">
                {testimonial.author}
              </span>{" "}
              · {testimonial.role}
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* before / after */}
      <Section pad="tight" className="border-y border-line bg-surface-elevated">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-lg border border-line bg-surface p-7">
                <p className="font-mono text-2xs uppercase tracking-wider text-ink-muted">
                  Vorher
                </p>
                <ul className="mt-5 space-y-3">
                  {before.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-base text-ink-secondary"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="h-full rounded-lg border border-line-strong bg-surface-elevated p-7 shadow-md">
                <p className="font-mono text-2xs uppercase tracking-wider text-brand-orange">
                  Mit Werkstatt ONE
                </p>
                <ul className="mt-5 space-y-3">
                  {after.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-3 text-base text-ink-primary"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-status-success"
                        strokeWidth={2.5}
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* narrative */}
      <Section>
        <Container>
          <div className="max-w-prose">
            <p className="eyebrow">Die Geschichte</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
              Aus dem Werkstattalltag heraus gebaut.
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-secondary">
              <p>
                Wie in vielen Meisterbetrieben fraß die Verwaltung bei KFZ-Kruse
                Zeit, die eigentlich am Fahrzeug gebraucht wurde: Termine am
                Telefon, TÜV-Erinnerungen aus dem Kopf, Mahnungen, die liegen
                blieben. Genau dort setzte Werkstatt ONE an.
              </p>
              <p>
                Schritt für Schritt zogen die Prozesse ins System — Terminbuchung,
                Auftragserfassung, Mahnwesen, TÜV-Reminder. Jede Funktion wurde im
                laufenden Betrieb getestet und so lange geschärft, bis sie im
                Alltag wirklich trägt. Das Ergebnis: rund 13 Stunden weniger
                Verwaltungskram pro Woche — Zeit, die zurück in die Werkstatt
                fließt.
              </p>
              <p>
                Was hier funktioniert, steht heute jedem Betrieb offen. Werkstatt
                ONE ist die Software, die im echten Betrieb entstanden ist — nicht
                am Reißbrett.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CTABand
        title="Ihr Betrieb als nächste Erfolgsgeschichte?"
        body="Sehen Sie in der Demo, was Werkstatt ONE für Ihren Betrieb tun kann."
      />
    </>
  );
}
