import type { Metadata } from "next";
import { Brain, Zap, RefreshCw } from "lucide-react";
import { HabitLoopDiagram } from "@/components/HabitLoopDiagram";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Наука привычек",
  description: "Цикл привычки, дофамин и базальные ганглии — простыми словами.",
};

export default function SciencePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      <header className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Наука
        </p>
        <h1 className="font-serif text-4xl md:text-5xl">Как мозг превращает действие в привычку</h1>
        <p className="mt-5 text-zinc-600 dark:text-zinc-400">
          Здесь нет магии. Привычка — это нейронный шорткат, который мозг
          собирает, чтобы экономить энергию. Понимание этого механизма не
          сделает вас другим человеком, но даст инструменты — где нажать,
          чтобы повлиять на поведение.
        </p>
      </header>

      <MotionSection className="mb-12">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl">
          <RefreshCw className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Цикл привычки: сигнал → действие → награда
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Любая привычка состоит из трёх частей. Сначала появляется{" "}
          <strong>сигнал</strong> — что-то во внешней среде или внутри вас,
          что запускает действие (время дня, место, эмоция, предыдущая
          привычка). Затем следует <strong>действие</strong> — само поведение,
          которое мы привыкли называть привычкой. И, наконец,{" "}
          <strong>награда</strong> — то, что мозг записывает как «было полезно,
          повторим». Если награда стабильна, цикл закрепляется.
        </p>

        <div className="my-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
          <HabitLoopDiagram />
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          Charles Duhigg, автор книги «The Power of Habit», называет это
          «петлёй привычки». Чтобы создать привычку — спроектируйте все три
          части. Чтобы избавиться — поменяйте награду или уберите сигнал.
        </p>
      </MotionSection>

      <MotionSection className="mb-12">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl">
          <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Что происходит в мозге
        </h2>
        <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
          <p>
            За автоматизированные действия в мозге отвечает группа структур,
            которые называются <strong>базальными ганглиями</strong>. Это
            древняя часть мозга, расположенная глубоко под корой. Её работа —
            запоминать паттерны и проигрывать их, чтобы вам не нужно было
            каждый раз думать заново.
          </p>
          <p>
            Когда вы повторяете действие несколько раз, мозг переносит его из
            «осознанной» зоны (префронтальной коры, которая быстро устаёт) в
            базальные ганглии. С этого момента действие требует меньше
            внимания и меньше энергии. Именно поэтому опытный водитель ведёт
            машину и слушает радио — рулевое управление давно «переехало»
            вниз.
          </p>
        </div>
      </MotionSection>

      <MotionSection className="mb-12">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl">
          <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Дофамин: главный механизм закрепления
        </h2>
        <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
          <p>
            <strong>Дофамин</strong> часто называют «гормоном удовольствия»,
            но это не совсем точно. Дофамин — это нейромедиатор{" "}
            <em>ожидания</em>. Он выделяется не столько в момент награды,
            сколько в момент, когда мозг предсказывает: «вот сейчас будет
            хорошо».
          </p>
          <p>
            Эта система помогает закреплять полезные циклы: чем чаще ваш
            сигнал предсказывает приятную награду, тем сильнее ассоциация и
            тем меньше усилий нужно, чтобы запустить действие. Поэтому
            маленькие, гарантированно приятные награды (вкусный кофе после
            пробежки, спокойные пять минут после медитации, отметка в трекере)
            работают надёжнее, чем редкие, но «грандиозные» бонусы.
          </p>
        </div>
      </MotionSection>

      <MotionSection>
        <h2 className="mb-4 font-serif text-2xl">Почему привычки приживаются</h2>
        <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>· Сигнал стабилен.</strong> Одно и то же время, место или
            триггер.
          </li>
          <li>
            <strong>· Действие маленькое.</strong> Чем ниже барьер входа, тем
            быстрее автоматизация.
          </li>
          <li>
            <strong>· Награда видна.</strong> Мозг должен «получить за это
            галочку» — в ощущениях или явно.
          </li>
          <li>
            <strong>· Окружение работает на вас.</strong> Кроссовки у двери,
            книга на подушке, телефон в другой комнате.
          </li>
          <li>
            <strong>· Есть отслеживание.</strong> Сам факт регистрации
            закрепляет цикл — даже простая отметка в календаре.
          </li>
        </ul>

        <h2 className="mb-4 mt-12 font-serif text-2xl">Почему привычки ломаются</h2>
        <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>· Слишком большое действие.</strong> «Час каждое утро»
            требует осознанного усилия — а оно ограничено.
          </li>
          <li>
            <strong>· Награда отсроченная.</strong> Эффект через полгода не
            закрепляет цикл здесь и сейчас.
          </li>
          <li>
            <strong>· Сигнал размыт.</strong> «Когда-нибудь вечером» = никогда.
          </li>
          <li>
            <strong>· Два пропуска подряд.</strong> Не один — два. Сразу
            возвращайтесь после первого.
          </li>
          <li>
            <strong>· Поломка идентичности.</strong> «Я не такой человек»
            ломает любую привычку быстрее, чем плохое расписание.
          </li>
        </ul>
      </MotionSection>
    </div>
  );
}
