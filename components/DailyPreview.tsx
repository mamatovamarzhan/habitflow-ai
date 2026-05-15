"use client";

// Small "today's daily" widget rendered on the homepage hero area.
// Renders client-side so the date computation always reflects the visitor's day.
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getTodaysItem, type DailyItem } from "@/lib/daily";

export function DailyPreview() {
  const [item, setItem] = useState<DailyItem | null>(null);

  useEffect(() => {
    setItem(getTodaysItem());
  }, []);

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/80 to-white p-6 dark:border-emerald-400/30 dark:from-emerald-400/10 dark:to-zinc-900/40">
      <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
        <Sparkles className="h-4 w-4" />
        Привычка дня
      </div>

      <h2 className="mt-3 font-serif text-2xl leading-tight md:text-3xl">
        Учи новое произведение каждый день
      </h2>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Скороговорка или короткое стихотворение — одна минута сегодня,
        тренированная память через месяц.
      </p>

      {item ? (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            {item.type === "poem" ? "Сегодняшнее стихотворение" : "Сегодняшняя скороговорка"}
          </p>
          <p className="mt-1 font-serif text-base font-medium">{item.title}</p>
          {item.author && (
            <p className="text-sm text-zinc-500">— {item.author}</p>
          )}
        </div>
      ) : (
        <div className="mt-4 h-20 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
      )}

      <Link
        href="/daily"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300"
      >
        Открыть привычку дня
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
