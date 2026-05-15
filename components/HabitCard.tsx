import Link from "next/link";
import type { LucideIcon } from "lucide-react";

// Card used on /habits grid and homepage feature row.
export function HabitCard({
  href,
  title,
  description,
  icon: Icon,
  meta,
  highlight = false,
}: {
  href: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  meta?: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex h-full flex-col gap-3 rounded-2xl border p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${
        highlight
          ? "border-emerald-500/40 bg-emerald-50/40 dark:border-emerald-400/30 dark:bg-emerald-400/5"
          : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
      }`}
    >
      {Icon && (
        <div
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
            highlight
              ? "bg-emerald-600 text-white dark:bg-emerald-400 dark:text-zinc-950"
              : "bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-200 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      {meta && (
        <span className="mt-auto text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          {meta}
        </span>
      )}
    </Link>
  );
}
