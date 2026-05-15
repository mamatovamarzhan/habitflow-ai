import { Quote } from "lucide-react";

export function QuoteCard({
  text,
  author,
  source,
}: {
  text: string;
  author: string;
  source?: string;
}) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
      <Quote className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden />
      <blockquote className="font-serif text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
        {text}
      </blockquote>
      <figcaption className="mt-auto text-sm text-zinc-500 dark:text-zinc-400">
        — <span className="font-medium text-zinc-700 dark:text-zinc-300">{author}</span>
        {source && <span className="ml-1">· {source}</span>}
      </figcaption>
    </figure>
  );
}
