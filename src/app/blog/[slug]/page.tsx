import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/Prose";
import { company } from "@/lib/site";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://${company.domain}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const html = marked.parse(post.body, { async: false }) as string;

  return (
    <Section pad="tight">
      <Container>
        <article className="mx-auto max-w-prose">
          <header>
            <p className="font-mono text-xs text-ink-muted">
              {formatDate(post.date)} · {post.author}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-primary [text-wrap:balance]">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-secondary">
              {post.description}
            </p>
          </header>
          <Prose className="mt-10">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Prose>
          <footer className="mt-14 border-t border-line pt-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-brand-orange hover:text-brand-orange-hover"
            >
              ← Alle Artikel
            </Link>
          </footer>
        </article>
      </Container>
    </Section>
  );
}
