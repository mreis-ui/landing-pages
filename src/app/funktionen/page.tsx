import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { ModuleCard } from "@/components/ModuleCard";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { modules } from "@/lib/site";

export const metadata: Metadata = {
  title: "Funktionen",
  description:
    "Sechs Module für KFZ-Meisterbetriebe: Online-Terminbuchung, digitale Auftragserfassung, automatisches Mahnwesen, TÜV/AU-Reminder, Echtzeit-Dashboard und Lagerverwaltung.",
};

export default function FunktionenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Funktionen"
        title="Ein System vom ersten Anruf bis zur bezahlten Rechnung."
        lede="Sechs Module, die ineinandergreifen — entwickelt aus dem echten Arbeitsalltag einer KFZ-Werkstatt. Keine Insellösungen, kein Medienbruch."
      />
      <Section>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 3) * 60}>
                <ModuleCard module={m} index={i} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <CTABand />
    </>
  );
}
