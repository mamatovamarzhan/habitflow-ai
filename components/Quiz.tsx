"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

// Each answer adds points to one or more "tags". After all questions we pick
// the top-scoring tags and map them to recommended habits (or to /daily for
// focus/memory/language signals).
type Tag = "morning" | "calm" | "energy" | "mind" | "focus" | "memory" | "language";

type Question = {
  id: string;
  text: string;
  options: { label: string; tags: Tag[] }[];
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Когда у вас сейчас больше всего энергии?",
    options: [
      { label: "Утром, особенно в первый час", tags: ["morning", "energy"] },
      { label: "Днём после обеда", tags: ["focus"] },
      { label: "Вечером", tags: ["calm", "mind"] },
      { label: "Энергии стабильно мало", tags: ["calm", "energy"] },
    ],
  },
  {
    id: "q2",
    text: "Что вам сейчас сложнее всего?",
    options: [
      { label: "Сосредоточиться на чём-то одном", tags: ["focus", "memory"] },
      { label: "Просто отдохнуть, перестать думать", tags: ["calm"] },
      { label: "Двигаться, не сидеть весь день", tags: ["energy"] },
      { label: "Узнавать что-то новое", tags: ["mind", "language"] },
    ],
  },
  {
    id: "q3",
    text: "Если бы у вас было 10 свободных минут в день — на что бы вы их потратили?",
    options: [
      { label: "Тишина, дыхание, осознанность", tags: ["calm"] },
      { label: "Прочитать пару страниц книги", tags: ["mind"] },
      { label: "Размяться, подвигаться", tags: ["energy"] },
      { label: "Выучить что-то на память — стих, фразу, скороговорку", tags: ["memory", "language", "focus"] },
    ],
  },
  {
    id: "q4",
    text: "Какое утверждение про вас ближе?",
    options: [
      { label: "Хочу собраннее начинать день", tags: ["morning"] },
      { label: "Хочу спокойнее на него реагировать", tags: ["calm"] },
      { label: "Хочу больше двигаться", tags: ["energy"] },
      { label: "Хочу тренировать внимание и память", tags: ["focus", "memory"] },
    ],
  },
  {
    id: "q5",
    text: "Какой из этих результатов вы бы хотели через 2 месяца?",
    options: [
      { label: "Стабильное утреннее настроение", tags: ["morning", "calm"] },
      { label: "Прочитать 2–3 книги", tags: ["mind"] },
      { label: "Лучшую физическую форму", tags: ["energy"] },
      { label: "Знать наизусть десятки строк русской классики", tags: ["memory", "language"] },
    ],
  },
  {
    id: "q6",
    text: "Сколько минут в день вы готовы выделить ПОСТОЯННО?",
    options: [
      { label: "1–2 минуты", tags: ["memory", "language", "focus"] },
      { label: "5–10 минут", tags: ["calm", "morning"] },
      { label: "15–20 минут", tags: ["mind"] },
      { label: "Полчаса и больше", tags: ["energy"] },
    ],
  },
];

// Mapping from a tag to a recommended habit (slug must exist in /content/habits).
const TAG_TO_HABIT: Record<Tag, { slug: string; title: string; reason: string }> = {
  morning: {
    slug: "morning-routine",
    title: "Утренний ритуал",
    reason: "Утром у вас больше всего ресурса — закрепите его одной маленькой привычкой.",
  },
  calm: {
    slug: "meditation",
    title: "Короткая медитация",
    reason: "Тренирует возвращение внимания в момент — снижает фоновую тревогу.",
  },
  energy: {
    slug: "regular-exercise",
    title: "Регулярное движение",
    reason: "Любое движение каждый день полезнее редких подвигов в спортзале.",
  },
  mind: {
    slug: "reading-daily",
    title: "Ежедневное чтение",
    reason: "Десять страниц в день — это книга в неделю и заметная разница в мышлении.",
  },
  focus: {
    slug: "reading-daily",
    title: "Ежедневное чтение",
    reason: "Тренирует длительное внимание — навык, который страдает первым в эпоху ленты.",
  },
  memory: {
    slug: "daily",
    title: "Привычка дня",
    reason: "Одна скороговорка или стих в день укрепляют рабочую память и нейропластичность.",
  },
  language: {
    slug: "daily",
    title: "Привычка дня",
    reason: "Стихи и скороговорки — компактный способ тренировать дикцию и владение языком.",
  },
};

type Result = { tag: Tag; score: number; rec: typeof TAG_TO_HABIT[Tag] };

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Tag[][]>([]);
  const [finished, setFinished] = useState(false);

  const current = QUESTIONS[step];
  const progress = ((step + (finished ? 1 : 0)) / QUESTIONS.length) * 100;

  function handlePick(tags: Tag[]) {
    const next = [...answers, tags];
    setAnswers(next);
    if (step === QUESTIONS.length - 1) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  }

  function handleBack() {
    if (step === 0) return;
    setStep(step - 1);
    setAnswers(answers.slice(0, -1));
  }

  function handleReset() {
    setStep(0);
    setAnswers([]);
    setFinished(false);
  }

  function computeResults(): Result[] {
    const scores = new Map<Tag, number>();
    for (const tagSet of answers) {
      for (const t of tagSet) {
        scores.set(t, (scores.get(t) ?? 0) + 1);
      }
    }
    const ranked = Array.from(scores.entries())
      .map(([tag, score]) => ({ tag, score, rec: TAG_TO_HABIT[tag] }))
      .sort((a, b) => b.score - a.score);

    // Deduplicate by recommended slug — different tags may share a habit.
    const seen = new Set<string>();
    const unique: Result[] = [];
    for (const r of ranked) {
      if (seen.has(r.rec.slug)) continue;
      seen.add(r.rec.slug);
      unique.push(r);
      if (unique.length >= 3) break;
    }
    return unique;
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-10 dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Вопрос {step + 1} из {QUESTIONS.length}
            </p>
            <h2 className="mt-2 font-serif text-2xl md:text-3xl">{current.text}</h2>
            <div className="mt-6 grid gap-3">
              {current.options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => handlePick(o.tags)}
                  className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left text-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-emerald-400"
                >
                  {o.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-900"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Назад
              </button>
              <span className="text-xs text-zinc-500">
                {answers.length} / {QUESTIONS.length}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-50/40 p-6 md:p-10 dark:border-emerald-400/30 dark:bg-emerald-400/5">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" /> Ваш результат
              </p>
              <h2 className="mt-2 font-serif text-3xl">Привычки, которые подойдут вам</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                По вашим ответам мы выделили {Math.min(3, computeResults().length)} направления.
                Начните с одного — самого верхнего.
              </p>
            </div>

            <ol className="space-y-3">
              {computeResults().map((r, i) => {
                const href = r.rec.slug === "daily" ? "/daily" : `/habits/${r.rec.slug}`;
                return (
                  <li key={r.rec.slug}>
                    <Link
                      href={href}
                      className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl">{r.rec.title}</h3>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{r.rec.reason}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 self-center text-zinc-400" />
                    </Link>
                  </li>
                );
              })}
            </ol>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Пройти тест ещё раз
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
