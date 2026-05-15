import type { Metadata } from "next";
import { HabitTracker } from "@/components/HabitTracker";

export const metadata: Metadata = {
  title: "Трекер привычек",
  description: "Локальный трекер: до 5 привычек, 30-дневная сетка, графики — всё в браузере.",
};

export default function TrackerPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      <header className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Трекер
        </p>
        <h1 className="font-serif text-4xl md:text-5xl">Простой трекер привычек</h1>
        <p className="mt-5 max-w-2xl text-zinc-600 dark:text-zinc-400">
          До 5 привычек, 30 дней истории, счётчик серий и недельный график.
          Никаких аккаунтов, никаких отправок данных.
        </p>
        <p className="mt-3 inline-block rounded-lg bg-emerald-50/60 px-3 py-1.5 text-xs text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
          Ваши данные хранятся только в этом браузере. Ничего не загружается на сервер.
        </p>
      </header>

      <HabitTracker />
    </div>
  );
}
