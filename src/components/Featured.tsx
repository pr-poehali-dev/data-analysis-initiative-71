import { useState } from "react";

const questions = [
  {
    term: "ДЕЛЕГИРОВАНИЕ",
    definition: "Передача части полномочий и задач от руководителя подчинённому с сохранением ответственности за результат.",
    hint: "Д _ _ _ _ _ _ _ _ _ _ _",
  },
  {
    term: "МОТИВАЦИЯ",
    definition: "Внутреннее или внешнее побуждение человека к действию ради достижения определённых целей.",
    hint: "М _ _ _ _ _ _ _ _",
  },
  {
    term: "МИССИЯ",
    definition: "Основная цель и смысл существования организации, выраженные в кратком утверждении.",
    hint: "М _ _ _ _ _",
  },
];

export default function Featured() {
  const [revealed, setRevealed] = useState<boolean[]>(questions.map(() => false));

  const toggle = (i: number) => {
    setRevealed((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div id="game" className="min-h-screen px-6 py-24 bg-white flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <p className="uppercase text-sm tracking-widest text-neutral-400 mb-3">Как играть</p>
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
          Читай определение.<br />Угадывай термин.
        </h2>
        <p className="text-neutral-500 text-lg mb-16">
          Нажми «Показать ответ», чтобы проверить себя. Примеры заданий ниже — в полной версии их десятки.
        </p>

        <div className="flex flex-col gap-6">
          {questions.map((q, i) => (
            <div
              key={i}
              className="border border-neutral-200 p-6 md:p-8 hover:border-neutral-400 transition-colors duration-300"
            >
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
                Задание {i + 1}
              </p>
              <p className="text-lg md:text-xl text-neutral-800 mb-6 leading-relaxed">
                «{q.definition}»
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="font-mono text-xl md:text-2xl font-bold text-neutral-900 tracking-widest">
                  {revealed[i] ? q.term : q.hint}
                </p>
                <button
                  onClick={() => toggle(i)}
                  className="bg-black text-white px-5 py-2 text-sm uppercase tracking-wide hover:bg-neutral-700 transition-colors duration-300 cursor-pointer"
                >
                  {revealed[i] ? "Скрыть" : "Показать ответ"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
