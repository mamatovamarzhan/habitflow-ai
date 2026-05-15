import type { Metadata } from "next";
import { DailyTrainer } from "@/components/DailyTrainer";

export const metadata: Metadata = {
  title: "Привычка дня",
  description:
    "Каждый день — новая скороговорка или короткое стихотворение. Тренируйте память небольшими порциями.",
};

export default function DailyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <header className="mb-10">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
          Сигнатурная фишка
        </p>
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">
          Привычка дня — память через малое
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-zinc-600 dark:text-zinc-400">
          <p>
            Каждый день вы получаете <strong>одно</strong> произведение —
            короткое стихотворение классика или скороговорку. Всего полтора-два
            минуты в день, но за месяц у вас в активной памяти появятся
            десятки новых строк.
          </p>
          <p>
            Зачем это нужно? Запоминание стихов тренирует рабочую память,
            укрепляет нейронные связи и улучшает речь. Исследования по
            нейропластичности показывают: регулярная работа с языком
            поддерживает когнитивные функции в любом возрасте — от подростка
            до пенсионера.
          </p>
          <p>
            Это идеальный пример «маленькой привычки»: усилие минимально,
            эффект кумулятивен, результат заметен через 30–60 дней.
          </p>
        </div>
      </header>

      <DailyTrainer />
    </div>
  );
}
