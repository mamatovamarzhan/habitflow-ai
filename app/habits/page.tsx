import type { Metadata } from "next";
import { HabitsLibrary } from "@/components/HabitsLibrary";
import { getAllHabitMetas } from "@/lib/habits";

export const metadata: Metadata = {
  title: "Библиотека привычек",
  description:
    "Готовые сценарии полезных привычек: с чего начать, как отслеживать, чего ждать.",
};

export default function HabitsPage() {
  const habits = getAllHabitMetas();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <header className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Библиотека
        </p>
        <h1 className="font-serif text-4xl md:text-5xl">Полезные привычки и как их строить</h1>
        <p className="mt-5 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Каждая статья — короткий, но содержательный гид: зачем эта
          привычка нужна, как начать с малого, как не сорваться и какие
          научные данные за ней стоят.
        </p>
      </header>

      <HabitsLibrary habits={habits} />
    </div>
  );
}
