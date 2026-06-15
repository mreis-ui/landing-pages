import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ModuleIcon } from "@/components/Icon";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { modules, company } from "@/lib/site";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const m = modules.find((x) => x.slug === params.slug);
  if (!m) return {};
  return {
    title: m.name,
    description: m.intro.slice(0, 155),
  };
}

export default function ModuleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const idx = modules.findIndex((m) => m.slug === params.slug);
  if (idx === -1) notFound();
  const m = modules[idx];
  const next = modules[(idx + 1) % modules.length];

  return (
    <>
      {/* header */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <Container className="relative py-16 sm:py-20">
          <Link
            href="/funktionen"
            className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Alle Funktionen
          </Link>

          <div className="mt-8 flex items-start gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-line bg-surface-elevated text-brand-orange shadow-sm">
              <ModuleIcon name={m.icon} className="h-6 w-6" />
            </span>
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-brand-orange">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow">Funktion</span>
              </div>
              <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink-primary sm:text-5xl">
                {m.name}
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-secondary">
            {m.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={company.trialUrl} variant="primary" size="lg">
              In der Demo ansehen
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </ButtonLink>
            <ButtonLink href="/kontakt" variant="secondary" size="lg">
              Beratung anfragen
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* benefits */}
      <Section>
        <Container>
          <p className="eyebrow">Was Sie davon haben</p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {m.benefits.map((b) => (
              <div key={b.title} className="bg-surface-elevated p-7">
                <h3 className="text-lg font-semibold text-ink-primary">
                  {b.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-secondary">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* features + metric */}
      <Section pad="tight" className="border-y border-line bg-surface-elevated">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Im Detail</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
                {m.tagline}
              </h2>
              <ul className="mt-8 space-y-4">
                {m.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-status-success"
                      strokeWidth={2.5}
                    />
                    <span className="text-base text-ink-secondary">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Reveal className="flex">
              <div className="flex w-full flex-col justify-center rounded-lg border border-line-strong bg-surface p-10 text-center">
                <span className="font-mono text-6xl font-semibold tracking-tight text-brand-orange">
                  {m.metric.value}
                </span>
                <span className="mt-3 text-sm text-ink-secondary">
                  {m.metric.label}
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* next module */}
      <Section pad="tight">
        <Container>
          <Link
            href={`/funktionen/${next.slug}`}
            className="group flex items-center justify-between rounded-lg border border-line bg-surface-elevated p-6 transition-colors hover:border-line-strong"
          >
            <div>
              <p className="font-mono text-2xs uppercase tracking-wider text-ink-muted">
                Nächste Funktion
              </p>
              <p className="mt-1 text-lg font-semibold text-ink-primary">
                {next.name}
              </p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-md border border-line text-ink-primary transition-colors group-hover:border-brand-orange group-hover:text-brand-orange">
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </span>
          </Link>
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
