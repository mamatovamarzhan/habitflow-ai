"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Flame } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// localStorage schema for the tracker
type Habit = {
  id: string;
  name: string;
  emoji: string;
  // Set of YYYY-MM-DD strings marking completed days.
  done: string[];
};

const STORAGE_KEY = "habitflow:tracker:v1";
const MAX_HABITS = 5;
const WINDOW_DAYS = 30;

// Format helpers — keep local-time YYYY-MM-DD to avoid timezone surprises.
function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Generate the last N days, oldest -> newest.
function lastNDays(n: number): Date[] {
  const out: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(d);
  }
  return out;
}

function computeStreak(done: string[]): number {
  if (done.length === 0) return 0;
  const set = new Set(done);
  let streak = 0;
  const cur = new Date();
  cur.setHours(0, 0, 0, 0);
  // Walk backwards from today. If today is missing, the streak is 0.
  while (set.has(ymd(cur))) {
    streak++;
    cur.setDate(cur.getDate() - 1);
  }
  return streak;
}

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [mounted, setMounted] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("🌱");

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHabits(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }
  }, [habits, mounted]);

  const days = useMemo(() => lastNDays(WINDOW_DAYS), []);

  function addHabit(e: React.FormEvent) {
    e.preventDefault();
    const name = newName.trim();
    if (!name || habits.length >= MAX_HABITS) return;
    setHabits([
      ...habits,
      { id: `h-${Date.now()}`, name, emoji: newEmoji || "🌱", done: [] },
    ]);
    setNewName("");
    setNewEmoji("🌱");
  }

  function toggleDay(habitId: string, day: string) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id !== habitId
          ? h
          : {
              ...h,
              done: h.done.includes(day)
                ? h.done.filter((d) => d !== day)
                : [...h.done, day],
            }
      )
    );
  }

  function removeHabit(habitId: string) {
    if (!window.confirm("Удалить эту привычку из трекера?")) return;
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  }

  function resetAll() {
    if (!window.confirm("Очистить все привычки и историю?")) return;
    setHabits([]);
  }

  // Chart data: completions per day across all habits, last 7 days.
  const chartData = useMemo(() => {
    const last7 = days.slice(-7);
    return last7.map((d) => {
      const key = ymd(d);
      const count = habits.reduce(
        (acc, h) => acc + (h.done.includes(key) ? 1 : 0),
        0
      );
      return {
        label: d.toLocaleDateString("ru-RU", { weekday: "short" }),
        count,
      };
    });
  }, [days, habits]);

  if (!mounted) {
    return <div className="h-96 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />;
  }

  return (
    <div className="space-y-8">
      {/* Add habit form */}
      {habits.length < MAX_HABITS && (
        <form
          onSubmit={addHabit}
          className="flex flex-wrap items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/40"
        >
          <input
            type="text"
            value={newEmoji}
            onChange={(e) => setNewEmoji(e.target.value)}
            maxLength={2}
            aria-label="Эмодзи"
            className="w-12 rounded-lg border border-zinc-200 bg-transparent px-2 py-1.5 text-center text-lg dark:border-zinc-800"
          />
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Новая привычка (например, «Чтение 10 минут»)"
            className="flex-1 rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm dark:border-zinc-800"
            maxLength={60}
          />
          <button
            type="submit"
            disabled={!newName.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-emerald-400 dark:text-zinc-950"
          >
            <Plus className="h-4 w-4" />
            Добавить
          </button>
        </form>
      )}

      {habits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700">
          Добавьте свою первую привычку — например, «10 страниц книги».
        </div>
      ) : (
        <>
          {/* Habits grid */}
          <div className="space-y-3">
            {habits.map((h) => {
              const streak = computeStreak(h.done);
              return (
                <div
                  key={h.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{h.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-medium">{h.name}</h3>
                      <p className="flex items-center gap-1 text-xs text-zinc-500">
                        <Flame className="h-3 w-3 text-orange-500" />
                        Серия: {streak}{" "}
                        {streak === 1
                          ? "день"
                          : streak >= 2 && streak <= 4
                          ? "дня"
                          : "дней"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHabit(h.id)}
                      aria-label="Удалить привычку"
                      className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* 30-day grid — newest day on the right */}
                  <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(30,minmax(0,1fr))]">
                    {days.map((d) => {
                      const key = ymd(d);
                      const done = h.done.includes(key);
                      const isToday = key === ymd(new Date());
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleDay(h.id, key)}
                          aria-label={`${d.toLocaleDateString("ru-RU")}: ${done ? "отмечено" : "не отмечено"}`}
                          title={d.toLocaleDateString("ru-RU")}
                          className={`aspect-square rounded-md border transition ${
                            done
                              ? "border-emerald-600 bg-emerald-500 dark:border-emerald-400 dark:bg-emerald-400"
                              : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                          } ${isToday ? "ring-2 ring-emerald-500/40 dark:ring-emerald-400/40" : ""}`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weekly chart */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Активность за последние 7 дней
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(228 228 231 / 0.4)" />
                  <XAxis dataKey="label" stroke="currentColor" fontSize={12} />
                  <YAxis
                    allowDecimals={false}
                    stroke="currentColor"
                    fontSize={12}
                    domain={[0, habits.length]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgb(24 24 27)",
                      border: "1px solid rgb(63 63 70)",
                      borderRadius: 8,
                      color: "white",
                    }}
                  />
                  <Bar dataKey="count" fill="rgb(5 150 105)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Сбросить всё
          </button>
        </>
      )}
    </div>
  );
}
