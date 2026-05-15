"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Flame,
  RefreshCw,
  Shuffle,
  Trash2,
  Trophy,
  BookOpen,
  Mic,
  Lightbulb,
} from "lucide-react";
import {
  ALL_ITEMS,
  DEFAULT_STATE,
  TOTAL_COUNT,
  effectiveStreak,
  getDayIndex,
  getItemById,
  getTodayKey,
  loadState,
  markMemorizedToday,
  pickRandomOther,
  saveState,
  type DailyItem,
  type DailyState,
} from "@/lib/daily";

// Renders the full daily-trainer interface. Everything is client-side: today's
// item, the streak state, and the history are all derived from localStorage +
// the current date.
export function DailyTrainer() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<DailyState>(DEFAULT_STATE);
  const [shownItem, setShownItem] = useState<DailyItem | null>(null);
  const [todayIndex, setTodayIndex] = useState(0);
  const [reviewItem, setReviewItem] = useState<DailyItem | null>(null);

  // Hydrate on mount — date and storage are browser-only.
  useEffect(() => {
    const idx = getDayIndex();
    setTodayIndex(idx);
    setShownItem(ALL_ITEMS[idx]);
    setState(loadState());
    setMounted(true);
  }, []);

  const today = mounted ? getTodayKey() : "";
  const streak = mounted ? effectiveStreak(state, today) : 0;
  const total = state.memorizedIds.length;
  const todayDone = state.lastCompletedDate === today;

  // The streak only counts the FIRST item of the day. If user is currently
  // viewing a random "other one", marking it as memorised still counts (we
  // don't punish exploration), but the daily item is the one tied to the date.
  const todaysItem = ALL_ITEMS[todayIndex];
  const viewingDaily = shownItem?.id === todaysItem?.id;

  function handleMemorised() {
    if (!shownItem) return;
    // Only the canonical daily item advances the streak. Other items add to
    // memorised list but don't move lastCompletedDate.
    const next = viewingDaily
      ? markMemorizedToday(state, shownItem.id, today)
      : {
          ...state,
          memorizedIds: state.memorizedIds.includes(shownItem.id)
            ? state.memorizedIds
            : [...state.memorizedIds, shownItem.id],
        };
    setState(next);
    saveState(next);
  }

  function handleAnother() {
    setShownItem((cur) =>
      cur ? pickRandomOther(ALL_ITEMS.findIndex((i) => i.id === cur.id)) : null
    );
  }

  function handleBackToToday() {
    setShownItem(todaysItem);
  }

  function handleReset() {
    if (!window.confirm("Сбросить весь прогресс? Это действие необратимо.")) return;
    setState(DEFAULT_STATE);
    saveState(DEFAULT_STATE);
  }

  // History list: most-recently-memorised first.
  const history = useMemo(
    () =>
      [...state.memorizedIds]
        .reverse()
        .map((id) => getItemById(id))
        .filter((x): x is DailyItem => Boolean(x)),
    [state.memorizedIds]
  );

  if (!mounted || !shownItem) {
    return (
      <div className="h-96 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
    );
  }

  return (
    <div className="space-y-10">
      {/* Stats row */}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatBox
          icon={<Flame className="h-5 w-5" />}
          label="Текущая серия"
          value={`${streak} ${pluralDays(streak)}`}
          accent
        />
        <StatBox
          icon={<Trophy className="h-5 w-5" />}
          label="Лучшая серия"
          value={`${state.longestStreak} ${pluralDays(state.longestStreak)}`}
        />
        <StatBox
          icon={<BookOpen className="h-5 w-5" />}
          label="Выучено"
          value={`${total} из ${TOTAL_COUNT}`}
        />
      </div>

      {/* Item card */}
      <AnimatePresence mode="wait">
        <motion.article
          key={shownItem.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10 dark:border-zinc-800 dark:bg-zinc-900/40"
        >
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
              {shownItem.type === "poem" ? <BookOpen className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
              {shownItem.type === "poem" ? "Стихотворение" : "Скороговорка"}
            </span>
            <span className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
              {difficultyLabel(shownItem.difficulty)}
            </span>
            {!viewingDaily && (
              <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300">
                просмотр — не в счёт серии
              </span>
            )}
          </div>

          <h2 className="font-serif text-2xl md:text-3xl">{shownItem.title}</h2>
          {shownItem.author && (
            <p className="mt-1 text-sm text-zinc-500">{shownItem.author}</p>
          )}

          <pre className="mt-6 whitespace-pre-wrap font-serif text-lg leading-relaxed md:text-xl">
            {shownItem.text}
          </pre>

          <p className="mt-6 text-sm italic text-zinc-600 dark:text-zinc-400">
            {shownItem.explanation}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleMemorised}
              disabled={todayDone && viewingDaily}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300"
            >
              <Check className="h-4 w-4" />
              {todayDone && viewingDaily ? "Сегодня уже отмечено" : "Я выучил это сегодня"}
            </button>
            <button
              type="button"
              onClick={handleAnother}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <Shuffle className="h-4 w-4" />
              Показать другое
            </button>
            {!viewingDaily && (
              <button
                type="button"
                onClick={handleBackToToday}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <RefreshCw className="h-4 w-4" />
                Вернуться к сегодняшнему
              </button>
            )}
          </div>
        </motion.article>
      </AnimatePresence>

      {/* How-to-memorise tips */}
      <aside className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
        <h3 className="flex items-center gap-2 font-semibold">
          <Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Как запоминать эффективно
        </h3>
        <ul className="mt-3 grid gap-2 text-sm text-zinc-600 md:grid-cols-2 dark:text-zinc-400">
          <li>· <strong>Прочитайте вслух</strong> 3–4 раза, проговаривая ритм.</li>
          <li>· <strong>Закройте текст</strong> и повторите по памяти — даже с ошибками.</li>
          <li>· <strong>Визуализируйте</strong> образы: представьте сцену, цвет, движение.</li>
          <li>· <strong>Повторите перед сном</strong> — сон укрепляет память (консолидация).</li>
          <li>· <strong>Интервальное повторение:</strong> вернитесь к выученному через 1, 3, 7 дней.</li>
          <li>· <strong>Не торопитесь</strong>: одно произведение в день — это и есть привычка.</li>
        </ul>
      </aside>

      {/* History */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <h3 className="font-serif text-2xl">История</h3>
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Сбросить прогресс
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Здесь будут появляться выученные произведения.
          </p>
        ) : (
          <ul className="grid gap-2 md:grid-cols-2">
            {history.map((it) => (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => setReviewItem(it)}
                  className="flex w-full items-start gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-left transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{it.title}</span>
                    <span className="block text-xs text-zinc-500">
                      {it.author ?? "Скороговорка"}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Review modal — click an item from history to re-read */}
      {reviewItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setReviewItem(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              {reviewItem.type === "poem" ? "Стихотворение" : "Скороговорка"}
            </p>
            <h4 className="mt-2 font-serif text-2xl">{reviewItem.title}</h4>
            {reviewItem.author && (
              <p className="mt-1 text-sm text-zinc-500">{reviewItem.author}</p>
            )}
            <pre className="mt-4 whitespace-pre-wrap font-serif text-lg leading-relaxed">
              {reviewItem.text}
            </pre>
            <p className="mt-4 text-sm italic text-zinc-500">{reviewItem.explanation}</p>
            <button
              type="button"
              onClick={() => setReviewItem(null)}
              className="mt-6 rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        accent
          ? "border-emerald-500/30 bg-emerald-50/40 dark:border-emerald-400/30 dark:bg-emerald-400/5"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40"
      }`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function difficultyLabel(d: DailyItem["difficulty"]): string {
  if (d === "easy") return "лёгкий";
  if (d === "medium") return "средний";
  return "сложный";
}

function pluralDays(n: number): string {
  // Russian plurals for "день"
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "день";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "дня";
  return "дней";
}
