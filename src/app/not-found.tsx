import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-6xl font-semibold tracking-tight text-brand-orange">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
        Seite nicht gefunden.
      </h1>
      <p className="mt-3 max-w-md text-base text-ink-secondary">
        Diese Seite existiert nicht (mehr). Vielleicht hilft Ihnen einer dieser
        Wege weiter.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="primary" size="lg">
          Zur Startseite
        </ButtonLink>
        <ButtonLink href="/funktionen" variant="secondary" size="lg">
          Funktionen ansehen
        </ButtonLink>
      </div>
    </Container>
  );
}
