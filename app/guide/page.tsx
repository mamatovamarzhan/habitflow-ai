import type { Metadata } from "next";
import { CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "21 день: пошаговый гид",
  description: "Три фазы по неделе: что делать, чего ждать и какие ошибки чаще всего ломают новую привычку.",
};

type Phase = {
  range: string;
  title: string;
  intro: string;
  doNext: string[];
  expect: string[];
  pitfalls: string[];
  checklist: string[];
};

const PHASES: Phase[] = [
  {
    range: "Дни 1–7",
    title: "Фаза 1. Маленький старт",
    intro:
      "На первой неделе главная задача — не «выработать привычку», а просто появиться. Запустить новое поведение в таком крошечном объёме, чтобы пропустить его было сложнее, чем выполнить.",
    doNext: [
      "Выберите ОДНУ привычку. Не три, не пять — одну.",
      "Сократите её до «двухминутной версии»: 1 страница книги, 1 минута медитации, 5 приседаний.",
      "Привяжите к существующей привычке: «после того как я налью кофе, я…».",
      "Отмечайте выполнение — крестик в календаре, заметка, чекбокс в трекере.",
    ],
    expect: [
      "Лёгкое сопротивление в первые 2–3 дня — это нормально.",
      "Ощущение «это слишком мало, чтобы дать эффект». Так и должно быть.",
      "Желание добавить ещё привычек. Не поддавайтесь.",
    ],
    pitfalls: [
      "Слишком амбициозный старт. «Час йоги каждое утро» проваливается в 90% случаев.",
      "Отсутствие чёткого триггера: «когда-нибудь утром» = никогда.",
      "Перфекционизм: пропустили день — значит «всё, провалил». Просто продолжайте.",
    ],
    checklist: [
      "Выбрана одна привычка",
      "Сформулирована двухминутная версия",
      "Подобран триггер (после чего я её делаю)",
      "Есть способ отмечать выполнение",
    ],
  },
  {
    range: "Дни 8–14",
    title: "Фаза 2. Закрепление",
    intro:
      "Вторая неделя — самая опасная. Новизна ушла, а результата ещё не видно. Здесь привычки чаще всего тихо умирают. Задача — пройти эту впадину, удерживая объём минимальным.",
    doNext: [
      "Сохраняйте двухминутную версию. Не увеличивайте.",
      "Заведите ритуал «возврата»: если пропустили один день — обязательно сделайте на следующий.",
      "Подключите идентичность: «я человек, который читает каждый день», а не «я учусь читать».",
      "Сделайте окружение проще: книга на подушке, кроссовки у двери, приложение на первом экране.",
    ],
    expect: [
      "Скуку и сомнения — особенно на 9–11 день.",
      "Один-два пропущенных дня. Это часть процесса, а не провал.",
      "Ощущение «уже автоматически» — у некоторых на этой неделе появляется впервые.",
    ],
    pitfalls: [
      "Желание удвоить объём, чтобы «нагнать». Это убивает привычку.",
      "Два пропуска подряд — критическая ситуация. Не допускайте.",
      "Сравнение с чужими успехами. Чужой 60-й день не отменяет вашего 10-го.",
    ],
    checklist: [
      "Прошли всю неделю без пропуска двух дней подряд",
      "Сформулировали идентичность (кто я, когда делаю эту привычку)",
      "Упростили окружение (минимум барьеров)",
      "Не увеличивали объём «потому что легко»",
    ],
  },
  {
    range: "Дни 15–21",
    title: "Фаза 3. Расширение",
    intro:
      "К третьей неделе привычка становится «маленьким, но своим». Теперь можно осторожно увеличивать объём — но только если двухминутная версия уже идёт легко. Цель — выйти из 21 дня с поведением, которое можно поддерживать годами.",
    doNext: [
      "Аккуратно увеличьте объём: с 1 страницы до 5, с 1 минуты до 5, с 5 приседаний до 15.",
      "Зафиксируйте, что именно вас вознаграждает: вкус кофе после, ощущение чистоты, отметка в трекере.",
      "Подумайте, какую следующую привычку вы прикрепите к этой (стекирование).",
      "Сделайте ретроспективу: что мешало? что помогало? что унесёте дальше?",
    ],
    expect: [
      "Привычка ощущается уже как часть дня, а не как задача.",
      "Желание усложнить — это хороший знак, но темп должен оставаться спокойным.",
      "Понимание, что 21 день — это не финиш, а первая стабильная база.",
    ],
    pitfalls: [
      "Резкий скачок объёма. Лучше +20%, чем +200%.",
      "Снятие триггера: «я уже привык, обойдусь без напоминания» — частая причина откатов.",
      "Бросить отмечать. Чекбокс продолжает работать даже на 100-й день.",
    ],
    checklist: [
      "Объём увеличен постепенно",
      "Привычка прикреплена к понятному вознаграждению",
      "Найден кандидат на следующую привычку",
      "Проведена короткая ретроспектива",
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <header className="mb-12">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1 text-xs uppercase tracking-wider text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" /> Пошаговый гид
        </p>
        <h1 className="font-serif text-4xl md:text-5xl">21 день: от старта до устойчивой привычки</h1>
        <p className="mt-5 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Не магические три недели, а реалистичный путь через три фазы. На
          каждой — что делать, чего ждать, и какие ошибки ломают новую
          привычку чаще всего.
        </p>
      </header>

      <div className="space-y-16">
        {PHASES.map((phase, i) => (
          <MotionSection key={phase.range} delay={i * 0.05}>
            <article className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-10 dark:border-zinc-800 dark:bg-zinc-900/40">
              <p className="text-sm uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {phase.range}
              </p>
              <h2 className="mt-1 font-serif text-2xl md:text-3xl">{phase.title}</h2>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">{phase.intro}</p>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <Block title="Что делать" items={phase.doNext} />
                <Block title="Чего ждать" items={phase.expect} />
                <Block title="Подводные камни" items={phase.pitfalls} warning />
              </div>

              <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-950/40">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Чек-лист фазы
                </h3>
                <ul className="space-y-2">
                  {phase.checklist.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </MotionSection>
        ))}
      </div>
    </div>
  );
}

function Block({
  title,
  items,
  warning = false,
}: {
  title: string;
  items: string[];
  warning?: boolean;
}) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
        {warning && <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        {items.map((it) => (
          <li key={it}>· {it}</li>
        ))}
      </ul>
    </div>
  );
}
