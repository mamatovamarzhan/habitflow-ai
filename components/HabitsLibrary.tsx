"use client";

// Client component: difficulty + time filter for the habits grid.
import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { HabitMeta } from "@/lib/habits";

type Difficulty = "all" | "лёгкая" | "средняя" | "сложная";
type TimeFilter = "all" | "short" | "medium" | "long";

// Parse the human-readable "time" string ("5 минут", "20 минут") to a rough bucket.
function bucketTime(t: string): "short" | "medium" | "long" {
  const minutes = parseInt(t, 10);
  if (!Number.isFinite(minutes)) return "medium";
  if (minutes <= 5) return "short";
  if (minutes <= 20) return "medium";
  return "long";
}

export function HabitsLibrary({ habits }: { habits: HabitMeta[] }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [time, setTime] = useState<TimeFilter>("all");

  const filtered = useMemo(() => {
    return habits.filter((h) => {
      if (difficulty !== "all" && h.difficulty !== difficulty) return false;
      if (time !== "all" && bucketTime(h.time) !== time) return false;
      return true;
    });
  }, [habits, difficulty, time]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/40 p-3 dark:border-zinc-800 dark:bg-zinc-900/30">
        <FilterGroup
          label="Сложность"
          value={difficulty}
          onChange={(v) => setDifficulty(v as Difficulty)}
          options={[
            { value: "all", label: "Любая" },
            { value: "лёгкая", label: "Лёгкая" },
            { value: "средняя", label: "Средняя" },
            { value: "сложная", label: "Сложная" },
          ]}
        />
        <FilterGroup
          label="Время"
          value={time}
          onChange={(v) => setTime(v as TimeFilter)}
          options={[
            { value: "all", label: "Любое" },
            { value: "short", label: "≤ 5 мин" },
            { value: "medium", label: "6–20 мин" },
            { value: "long", label: "> 20 мин" },
          ]}
        />
        <span className="ml-auto text-xs text-zinc-500">
          Найдено: {filtered.length}
        </span>
      </div>

      {/* Featured Daily category card */}
      <Link
        href="/daily"
        className="mb-6 flex items-center gap-4 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-50/50 to-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-emerald-400/30 dark:from-emerald-400/10 dark:to-zinc-900/30"
      >
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white dark:bg-emerald-400 dark:text-zinc-950">
          <CalendarDays className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            Категория: тренировка памяти
          </p>
          <h2 className="font-serif text-xl">Привычка дня</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Скороговорка или короткое стихотворение каждый день — 1–2 минуты.
          </p>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((h) => (
          <Link
            key={h.slug}
            href={`/habits/${h.slug}`}
            className="group flex h-full flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
          >
            <div className="text-3xl" aria-hidden>
              {h.emoji}
            </div>
            <h3 className="font-serif text-xl">{h.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{h.summary}</p>
            <div className="mt-auto flex flex-wrap gap-2 text-xs text-zinc-500">
              <span className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                {h.difficulty}
              </span>
              <span className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                {h.time}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          Под эти фильтры пока ничего нет. Сбросьте — попробуйте снова.
        </p>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wider text-zinc-500">{label}:</span>
      <div className="flex flex-wrap gap-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-full px-3 py-1 text-xs transition ${
              value === o.value
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
