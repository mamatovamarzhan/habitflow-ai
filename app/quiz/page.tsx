import type { Metadata } from "next";
import { Quiz } from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Какую привычку построить?",
  description: "Короткий тест из 6 вопросов — узнайте, с чего вам начать.",
};

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      <header className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Тест
        </p>
        <h1 className="font-serif text-4xl md:text-5xl">Какую привычку вам построить?</h1>
        <p className="mt-5 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Шесть коротких вопросов. Результат — одна или две конкретные
          привычки, которые подходят именно вам. Никаких данных не
          собирается, всё работает в браузере.
        </p>
      </header>

      <Quiz />
    </div>
  );
}
