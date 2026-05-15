"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

// Ordered so "Daily" appears first and stands out — it is the signature feature.
const NAV_ITEMS = [
  { href: "/daily",   label: "Привычка дня", highlight: true },
  { href: "/guide",   label: "21 день" },
  { href: "/science", label: "Наука" },
  { href: "/habits",  label: "Привычки" },
  { href: "/tools",   label: "Методы" },
  { href: "/quiz",    label: "Тест" },
  { href: "/tracker", label: "Трекер" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/70 backdrop-blur-md dark:border-zinc-800/70 dark:bg-zinc-950/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span>HabitFlow</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition ${
                    item.highlight
                      ? "bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:hover:bg-emerald-400/20"
                      : active
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {item.highlight && (
                    <span className="daily-pulse h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800"
            onClick={() => setOpen((v) => !v)}
            aria-label="Открыть меню"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                    item.highlight
                      ? "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                      : pathname === item.href
                      ? "bg-zinc-100 dark:bg-zinc-900"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {item.highlight && (
                    <span className="daily-pulse h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
