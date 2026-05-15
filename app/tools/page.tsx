import type { Metadata } from "next";
import { Layers, Timer, Target, User, Home } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Методы и техники",
  description:
    "Habit Stacking, Two-Minute Rule, Implementation Intentions, Identity-Based Habits, Environment Design.",
};

const TOOLS = [
  {
    icon: Layers,
    title: "Стек привычек (Habit Stacking)",
    summary:
      "Приклейте новую привычку к старой. Формула: «После того как [старая привычка], я [новая привычка]».",
    body:
      "Метод популяризировал James Clear. Старая привычка работает как готовый, надёжный сигнал — её триггер уже встроен в день. Вы получаете «бесплатный» якорь для нового поведения.",
    example:
      "Пример: «После того как я налью утренний кофе, я открою тетрадь и запишу одну фразу о благодарности».",
  },
  {
    icon: Timer,
    title: "Правило двух минут (Two-Minute Rule)",
    summary:
      "Любая новая привычка должна начинаться с версии длиной максимум 2 минуты.",
    body:
      "Цель — не результат, а появление. Мы тренируем сам факт того, что вы делаете это действие, а не его объём. Через 1–2 недели объём можно увеличивать, но в первые дни — только 2 минуты.",
    example:
      "Пример: вместо «читать 30 минут» — «прочитать одну страницу». Вместо «бегать 5 км» — «надеть кроссовки и выйти за дверь».",
  },
  {
    icon: Target,
    title: "Намерения исполнения (Implementation Intentions)",
    summary: "Чёткая формула: «Я сделаю [что] в [когда] в [где]».",
    body:
      "Психолог Peter Gollwitzer показал в серии исследований: люди, которые заранее формулируют, КОГДА и ГДЕ они выполнят действие, делают это значительно чаще тех, у кого есть только общее намерение.",
    example:
      "Пример: вместо «надо начать медитировать» — «Я буду медитировать 5 минут в 7:30 утра, сидя на стуле у окна».",
  },
  {
    icon: User,
    title: "Привычки на основе идентичности",
    summary: "Меняйте не действие, а представление о себе.",
    body:
      "Самые устойчивые привычки те, что встроены в идентичность. «Я бегаю» — действие. «Я бегун» — идентичность. Каждый раз, когда вы выходите на пробежку, вы голосуете за этого человека. Привычка перестаёт быть задачей и становится подтверждением того, кто вы есть.",
    example:
      "Пример: не «я хочу бросить курить», а «я не курю — я не такой человек». Маленький сдвиг в формулировке меняет внутреннюю опору.",
  },
  {
    icon: Home,
    title: "Дизайн окружения (Environment Design)",
    summary:
      "Сделайте полезное действие очевидным и лёгким, вредное — невидимым и трудным.",
    body:
      "Сила воли — ограниченный ресурс. Окружение работает 24/7. Лёгкие изменения пространства — рабочее место, видимые предметы, расположение телефона — часто дают больший эффект, чем мотивация.",
    example:
      "Пример: кроссовки рядом с кроватью, книга на подушке, телефон — в другой комнате во время работы, фрукты на столе вместо печенья.",
  },
] as const;

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <header className="mb-12">
        <p className="mb-2 text-sm uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Методы
        </p>
        <h1 className="font-serif text-4xl md:text-5xl">Пять техник, которые реально работают</h1>
        <p className="mt-5 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Это не «лайфхаки» из соцсетей, а методы, основанные на исследованиях
          поведенческой психологии. Каждый — с понятной формулой и примером.
        </p>
      </header>

      <div className="space-y-6">
        {TOOLS.map((t, i) => (
          <MotionSection key={t.title} delay={i * 0.04}>
            <article className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl">{t.title}</h2>
                  <p className="mt-2 text-zinc-700 dark:text-zinc-300">{t.summary}</p>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{t.body}</p>
                  <p className="mt-4 rounded-lg bg-emerald-50/60 px-4 py-3 text-sm text-zinc-700 dark:bg-emerald-400/10 dark:text-zinc-300">
                    {t.example}
                  </p>
                </div>
              </div>
            </article>
          </MotionSection>
        ))}
      </div>
    </div>
  );
}
