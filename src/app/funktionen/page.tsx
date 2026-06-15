import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { ModuleCard } from "@/components/ModuleCard";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { modules, moduleCategories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Funktionen",
  description:
    "Ein System für den ganzen Betrieb: Terminbuchung, Auftragserfassung, Mahnwesen, TÜV-Reminder, Lager, Banking, Buchhaltung, Controlling, Belegerkennung, Kommunikation und Personal.",
};

export default function FunktionenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Funktionen"
        title="Ein System statt zehn Insellösungen."
        lede="Vom ersten Anruf bis zur bezahlten Rechnung, vom Beleg bis zur Lohnabrechnung — Werkstatt ONE führt den gesamten Betrieb in einer Plattform zusammen. Kein Medienbruch, keine doppelte Datenpflege."
      />
      <Section>
        <Container>
          <div className="space-y-16">
            {moduleCategories.map((category) => {
              const items = modules.filter((m) => m.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category}>
                  <Reveal>
                    <h2 className="flex items-center gap-3 text-sm font-mono uppercase tracking-wider text-ink-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                      {category}
                    </h2>
                  </Reveal>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((m, i) => (
                      <Reveal key={m.slug} delay={(i % 3) * 60}>
                        <ModuleCard
                          module={m}
                          index={modules.indexOf(m)}
                          className="h-full"
                        />
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
      <CTABand />
    </>
  );
}
