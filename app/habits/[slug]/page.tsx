import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Clock, Gauge } from "lucide-react";
import { getAllHabitMetas, getHabitBySlug, getRelatedHabits } from "@/lib/habits";

// Pre-render every habit slug at build time.
export async function generateStaticParams() {
  return getAllHabitMetas().map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const habit = getHabitBySlug(params.slug);
  if (!habit) return { title: "Привычка не найдена" };
  return {
    title: habit.title,
    description: habit.summary,
  };
}

export default function HabitArticlePage({ params }: { params: { slug: string } }) {
  const habit = getHabitBySlug(params.slug);
  if (!habit) notFound();

  const related = getRelatedHabits(params.slug, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <Link
        href="/habits"
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Все привычки
      </Link>

      <div className="grid gap-10 md:grid-cols-[1fr_280px]">
        <article>
          <header className="mb-8">
            <div className="text-4xl">{habit.emoji}</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">{habit.title}</h1>
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">{habit.summary}</p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
                <Gauge className="h-3.5 w-3.5" /> {habit.difficulty}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
                <Clock className="h-3.5 w-3.5" /> {habit.time}
              </span>
            </div>
          </header>

          <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-emerald-700 dark:prose-a:text-emerald-400">
            <MDXRemote source={habit.body} />
          </div>
        </article>

        <aside className="space-y-5">
          <div className="sticky top-24 space-y-5">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
              <h3 className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
                Связанные привычки
              </h3>
              {related.length === 0 ? (
                <p className="text-sm text-zinc-500">Ничего пока нет.</p>
              ) : (
                <ul className="space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/habits/${r.slug}`}
                        className="flex items-start gap-3 text-sm hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <span className="text-xl" aria-hidden>{r.emoji}</span>
                        <span>
                          <span className="block font-medium">{r.title}</span>
                          <span className="block text-xs text-zinc-500">{r.time} · {r.difficulty}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href="/daily"
              className="block rounded-2xl border border-emerald-500/40 bg-emerald-50/40 p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-400/30 dark:bg-emerald-400/10"
            >
              <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Сигнатурная привычка
              </p>
              <p className="mt-1 font-serif text-lg">Привычка дня</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Тренируйте память на скороговорках и стихах — 1–2 минуты в день.
              </p>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
