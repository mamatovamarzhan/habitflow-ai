import Link from "next/link";
import {
  ArrowRight,
  Brain,
  BookOpen,
  Sparkles,
  ListChecks,
  CalendarDays,
} from "lucide-react";
import { HabitCard } from "@/components/HabitCard";
import { QuoteCard } from "@/components/QuoteCard";
import { MotionSection } from "@/components/MotionSection";
import { DailyPreview } from "@/components/DailyPreview";
import { QUOTES } from "@/lib/quotes";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1 text-xs uppercase tracking-wider text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Гид по привычкам
          </p>
          <h1 className="font-serif text-4xl leading-tight md:text-6xl">
            Маленькие привычки.<br />
            <span className="text-emerald-600 dark:text-emerald-400">
              Замечательные результаты.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            HabitFlow — спокойный, обстоятельный гид по тому, как формировать
            устойчивые привычки. Наука, проверенные методы и одна тренировка
            памяти каждый день.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Начать с 21-дневного гида
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/science"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Узнать науку
            </Link>
          </div>
        </div>

        <DailyPreview />
      </section>

      {/* Features */}
      <MotionSection className="grid gap-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <HabitCard
          href="/daily"
          title="Привычка дня"
          description="Скороговорка или стихотворение каждый день — тренировка памяти в одну минуту."
          icon={CalendarDays}
          meta="Сигнатурная фишка"
          highlight
        />
        <HabitCard
          href="/guide"
          title="21 день"
          description="Пошаговый гид: что делать, чего ждать и какие подводные камни — на каждой неделе."
          icon={ListChecks}
          meta="Пошагово"
        />
        <HabitCard
          href="/science"
          title="Наука"
          description="Как мозг формирует привычки: цикл «сигнал–действие–награда» и роль дофамина."
          icon={Brain}
          meta="Объяснимо"
        />
        <HabitCard
          href="/habits"
          title="Библиотека"
          description="Готовые сценарии: утренний ритуал, медитация, чтение, спорт и другие."
          icon={BookOpen}
          meta="Подробные статьи"
        />
      </MotionSection>

      {/* Quotes */}
      <MotionSection className="py-16">
        <h2 className="mb-8 font-serif text-3xl md:text-4xl">
          Что говорят те, кто изучает привычки
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {QUOTES.map((q) => (
            <QuoteCard key={q.author} text={q.text} author={q.author} source={q.source} />
          ))}
        </div>
      </MotionSection>

      {/* CTA */}
      <MotionSection className="my-16 rounded-3xl border border-zinc-200 bg-gradient-to-br from-emerald-50/60 to-white p-10 text-center md:p-16 dark:border-zinc-800 dark:from-emerald-400/10 dark:to-zinc-900/40">
        <h2 className="font-serif text-3xl md:text-5xl">Готовы начать?</h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
          Не нужно перестраивать всю жизнь. Достаточно одной маленькой
          привычки — и одного дня, чтобы её начать.
        </p>
        <Link
          href="/guide"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300"
        >
          Открыть 21-дневный гид
          <ArrowRight className="h-4 w-4" />
        </Link>
      </MotionSection>
    </div>
  );
}
