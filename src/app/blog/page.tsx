import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Werkstatt-Wissen",
  description:
    "Praxiswissen für KFZ-Meisterbetriebe: Digitalisierung, TÜV-Erinnerungen, Mahnwesen, Terminplanung und mehr — aus dem Alltag echter Werkstätten.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Werkstatt-Wissen"
        lede="Praxiswissen für KFZ-Meisterbetriebe — Digitalisierung, Auslastung und Umsatz, ohne Berater-Sprech."
      />
      <Section pad="tight">
        <Container>
          {posts.length === 0 ? (
            <p className="max-w-prose text-ink-secondary">
              Die ersten Artikel erscheinen in Kürze.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-lg border border-line bg-surface-elevated p-6 transition-colors hover:border-brand-orange"
                >
                  <p className="font-mono text-xs text-ink-muted">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight text-ink-primary group-hover:text-brand-orange">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    {post.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-brand-orange">
                    Weiterlesen →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
