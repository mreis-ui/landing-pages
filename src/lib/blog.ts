import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/*
 * Blog-Inhalte: Markdown-Dateien unter content/blog/, gepflegt über den
 * Website-Admin (Decap). Wird ausschließlich zur Build-Zeit gelesen (SSG).
 * Beiträge mit draft: true erscheinen nirgends — weder Liste noch Detailseite.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO-Datum YYYY-MM-DD */
  date: string;
  author: string;
  keywords: string[];
  cover?: string;
  body: string;
};

function isoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "").slice(0, 10);
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = String(data.slug || file.replace(/\.md$/, ""));
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: isoDate(data.date),
        author: String(data.author ?? "Flowbyte Systems"),
        keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
        cover: data.cover ? String(data.cover) : undefined,
        body: content,
        draft: data.draft === true,
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ draft: _draft, ...post }) => post);
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
