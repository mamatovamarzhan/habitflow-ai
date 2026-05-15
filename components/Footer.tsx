import Link from "next/link";
import { Sparkles, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>HabitFlow — маленькие привычки, большие результаты.</span>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/daily" className="hover:text-emerald-600 dark:hover:text-emerald-400">
            Привычка дня
          </Link>
          <Link href="/guide" className="hover:underline">
            21 день
          </Link>
          <Link href="/science" className="hover:underline">
            Наука
          </Link>
          <Link href="/habits" className="hover:underline">
            Привычки
          </Link>
          <Link href="/tools" className="hover:underline">
            Методы
          </Link>
        </nav>

        <a
          href="https://github.com/mamatovamarzhan/habitflow-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </footer>
  );
}
