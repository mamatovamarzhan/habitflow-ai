// Reads MDX habit articles from /content/habits at build time.
// Each file has frontmatter (title, summary, difficulty, time, category, etc.)
// and an MDX body that is rendered inside /habits/[slug] via next-mdx-remote/rsc.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type HabitMeta = {
  slug: string;
  title: string;
  summary: string;
  difficulty: "лёгкая" | "средняя" | "сложная";
  time: string;     // "5 минут", "20 минут", etc.
  category: string; // e.g. "morning", "mind"
  emoji: string;
};

export type HabitArticle = HabitMeta & {
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "habits");

function readAll(): HabitArticle[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const parsed = matter(raw);
      const data = parsed.data as Omit<HabitMeta, "slug">;
      return {
        slug,
        title: data.title,
        summary: data.summary,
        difficulty: data.difficulty,
        time: data.time,
        category: data.category,
        emoji: data.emoji,
        body: parsed.content,
      } satisfies HabitArticle;
    })
    .sort((a, b) => a.title.localeCompare(b.title, "ru"));
}

export function getAllHabits(): HabitArticle[] {
  return readAll();
}

export function getAllHabitMetas(): HabitMeta[] {
  return readAll().map(({ body, ...meta }) => meta);
}

export function getHabitBySlug(slug: string): HabitArticle | undefined {
  return readAll().find((h) => h.slug === slug);
}

export function getRelatedHabits(slug: string, limit = 3): HabitMeta[] {
  const all = readAll();
  const current = all.find((h) => h.slug === slug);
  if (!current) return [];
  // Prefer same category, then anything else.
  const sameCat = all.filter((h) => h.slug !== slug && h.category === current.category);
  const others = all.filter((h) => h.slug !== slug && h.category !== current.category);
  return [...sameCat, ...others].slice(0, limit).map(({ body, ...m }) => m);
}
