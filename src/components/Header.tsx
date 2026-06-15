"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav, company } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b transition-colors duration-200",
        scrolled
          ? "border-line bg-surface/85 backdrop-blur-md"
          : "border-transparent bg-surface",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label={`${company.product} — Startseite`} className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === pathname ||
                (item.href !== "/" &&
                  !item.href.startsWith("/#") &&
                  pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "text-ink-primary"
                      : "text-ink-secondary hover:text-ink-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ButtonLink href={company.demoUrl} variant="ghost" size="md">
              Anmelden
            </ButtonLink>
            <ButtonLink href={company.trialUrl} variant="primary" size="md">
              Kostenlos testen
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </ButtonLink>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-ink-primary lg:hidden"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <Container className="py-4">
            <nav className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-3 text-base text-ink-secondary hover:text-ink-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
              <ButtonLink href={company.demoUrl} variant="secondary" size="lg">
                Anmelden
              </ButtonLink>
              <ButtonLink href={company.trialUrl} variant="primary" size="lg">
                Kostenlos testen
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
