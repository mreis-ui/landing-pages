import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { company, footerSections } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line-strong bg-surface-elevated">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-secondary">
              Werkstattsoftware für KFZ-Meisterbetriebe. Von einer Werkstatt aus
              Ganderkesee, für Betriebe im Landkreis Oldenburg und darüber hinaus.
            </p>
            <div className="mt-6 space-y-2 text-sm text-ink-secondary">
              <a
                href={`tel:${company.phoneHref}`}
                className="flex items-center gap-2 hover:text-ink-primary"
              >
                <Phone className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-2 hover:text-ink-primary"
              >
                <Mail className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
                {company.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
                {company.street}, {company.city}
              </p>
            </div>
          </div>

          {footerSections.map((sec) => (
            <div key={sec.title}>
              <h3 className="eyebrow">{sec.title}</h3>
              <ul className="mt-4 space-y-3">
                {sec.links.map((l) => (
                  <li key={l.href + l.label}>
                    {l.href.startsWith("http") ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink-secondary hover:text-ink-primary"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-sm text-ink-secondary hover:text-ink-primary"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name} · {company.product}
          </p>
          <p className="font-mono">Made in Ganderkesee · {company.region}</p>
        </div>
      </Container>
    </footer>
  );
}
