import { useState } from "react";

const POINTS = [200, 400, 600, 800, 1000];

const categories = [
  {
    id: "strategy",
    label: "Стратегия",
    questions: [
      { term: "МИССИЯ", definition: "Основная цель и смысл существования организации, выраженные в кратком утверждении." },
      { term: "VISION", definition: "Образ желаемого будущего компании — то, чем она стремится стать в долгосрочной перспективе." },
      { term: "SWOT-АНАЛИЗ", definition: "Метод оценки сильных и слабых сторон компании, а также возможностей и угроз внешней среды." },
      { term: "ДИВЕРСИФИКАЦИЯ", definition: "Расширение бизнеса за счёт выхода в новые рынки или добавления новых продуктов и услуг." },
      { term: "КОНКУРЕНТНОЕ ПРЕИМУЩЕСТВО", definition: "Совокупность факторов, которые выделяют компанию на фоне конкурентов и привлекают клиентов." },
      { term: "БЕНЧМАРКИНГ", definition: "Метод сравнения собственных показателей с лучшими практиками отрасли или конкурентами." },
      { term: "СИНЕРГИЯ", definition: "Эффект, при котором совместная работа нескольких элементов даёт результат больший, чем сумма их отдельных усилий." },
      { term: "АУТСОРСИНГ", definition: "Передача отдельных функций или процессов компании внешним исполнителям." },
    ],
  },
  {
    id: "leadership",
    label: "Лидерство",
    questions: [
      { term: "ДЕЛЕГИРОВАНИЕ", definition: "Передача части полномочий и задач от руководителя подчинённому с сохранением ответственности за результат." },
      { term: "МОТИВАЦИЯ", definition: "Внутреннее или внешнее побуждение человека к действию ради достижения определённых целей." },
      { term: "ХАРИЗМА", definition: "Личное обаяние и способность лидера вдохновлять и вести за собой людей без принуждения." },
      { term: "ЭМПАТИЯ", definition: "Способность руководителя понимать эмоции и потребности сотрудников, ставя себя на их место." },
      { term: "КОУЧИНГ", definition: "Метод развития сотрудников через вопросы и диалог, помогающий им самостоятельно найти решение." },
      { term: "ОБРАТНАЯ СВЯЗЬ", definition: "Информация о результатах работы сотрудника, передаваемая с целью улучшения его эффективности." },
      { term: "АВТОРИТЕТ", definition: "Признанное влияние руководителя, основанное на компетентности, опыте или личных качествах." },
      { term: "МЕНТОРСТВО", definition: "Процесс передачи опыта и знаний от более опытного сотрудника менее опытному." },
    ],
  },
  {
    id: "operations",
    label: "Процессы",
    questions: [
      { term: "KPI", definition: "Ключевые показатели эффективности — измеримые метрики, по которым оценивается достижение целей." },
      { term: "РЕГЛАМЕНТ", definition: "Документально закреплённый порядок выполнения процессов и правила поведения в организации." },
      { term: "БИЗНЕС-ПРОЦЕСС", definition: "Последовательность взаимосвязанных действий, направленных на создание определённого результата для клиента." },
      { term: "LEAN", definition: "Концепция бережливого производства, направленная на устранение потерь и повышение ценности для клиента." },
      { term: "AGILE", definition: "Гибкая методология управления проектами, основанная на итеративном подходе и быстрой адаптации к изменениям." },
      { term: "ДЕКОМПОЗИЦИЯ", definition: "Разбиение крупной задачи или цели на более мелкие, управляемые части." },
      { term: "УЗКОЕ МЕСТО", definition: "Этап процесса, который ограничивает общую производительность системы или потока работ." },
      { term: "АВТОМАТИЗАЦИЯ", definition: "Замена ручного труда машинами или программами для выполнения повторяющихся задач без участия человека." },
    ],
  },
  {
    id: "finance",
    label: "Финансы",
    questions: [
      { term: "ЛИКВИДНОСТЬ", definition: "Способность компании быстро превратить свои активы в деньги для погашения текущих обязательств." },
      { term: "РЕНТАБЕЛЬНОСТЬ", definition: "Показатель эффективности бизнеса, отражающий отношение прибыли к затратам или выручке." },
      { term: "ТОЧКА БЕЗУБЫТОЧНОСТИ", definition: "Объём продаж, при котором доходы компании равны расходам и прибыль равна нулю." },
      { term: "БЮДЖЕТ", definition: "Финансовый план организации на определённый период, отражающий ожидаемые доходы и расходы." },
      { term: "ОБОРОТНЫЙ КАПИТАЛ", definition: "Разница между текущими активами и текущими обязательствами, необходимая для операционной деятельности." },
      { term: "ИНВЕСТИЦИИ", definition: "Вложение средств в активы или проекты с целью получения дохода или прироста стоимости в будущем." },
      { term: "CASHFLOW", definition: "Движение денежных средств в компании — разница между поступлениями и выплатами за период." },
      { term: "ДИВИДЕНДЫ", definition: "Часть прибыли компании, распределяемая между акционерами пропорционально их доле в капитале." },
    ],
  },
];

type Screen = "register" | "game";

export default function Featured() {
  const [screen, setScreen] = useState<Screen>("register");
  const [teamInputs, setTeamInputs] = useState(["", "", "", ""]);
  const [teams, setTeams] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [revealed, setRevealed] = useState<Record<string, boolean[]>>(
    Object.fromEntries(categories.map((c) => [c.id, c.questions.map(() => false)]))
  );

  const startGame = () => {
    const named = teamInputs.map((t, i) => t.trim() || `Группа ${i + 1}`);
    setTeams(named);
    setScores([0, 0, 0, 0]);
    setScreen("game");
  };

  const toggle = (catId: string, i: number) => {
    setRevealed((prev) => ({
      ...prev,
      [catId]: prev[catId].map((v, idx) => (idx === i ? !v : v)),
    }));
  };

  const addPoints = (teamIdx: number, pts: number) => {
    setScores((prev) => prev.map((s, i) => (i === teamIdx ? s + pts : s)));
  };

  const currentCat = categories.find((c) => c.id === activeCategory)!;
  const maxScore = Math.max(...scores);

  if (screen === "register") {
    return (
      <div id="game" className="min-h-screen px-6 py-24 bg-white flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full">
          <p className="uppercase text-sm tracking-widest text-neutral-400 mb-3">Перед началом</p>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            Назовите свои группы
          </h2>
          <p className="text-neutral-500 text-lg mb-12">
            Введите название каждой группы — или оставьте поле пустым, и мы назовём их автоматически.
          </p>

          <div className="flex flex-col gap-4 mb-12">
            {teamInputs.map((val, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-neutral-400 text-sm uppercase tracking-widest w-8 shrink-0">
                  {i + 1}
                </span>
                <input
                  type="text"
                  value={val}
                  onChange={(e) =>
                    setTeamInputs((prev) => prev.map((v, idx) => (idx === i ? e.target.value : v)))
                  }
                  placeholder={`Группа ${i + 1}`}
                  maxLength={30}
                  className="flex-1 border border-neutral-300 px-4 py-3 text-base text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black transition-colors duration-200"
                />
              </div>
            ))}
          </div>

          <button
            onClick={startGame}
            className="bg-black text-white px-10 py-4 uppercase tracking-wide text-sm font-semibold hover:bg-neutral-800 transition-colors duration-300 cursor-pointer w-full"
          >
            Начать игру
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="game" className="min-h-screen px-6 py-24 bg-white">
      <div className="max-w-4xl mx-auto w-full">

        {/* Табло */}
        <div className="mb-12">
          <p className="uppercase text-sm tracking-widest text-neutral-400 mb-4">Счёт</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {teams.map((name, i) => (
              <div
                key={i}
                className={`border p-4 text-center transition-colors duration-300 ${
                  scores[i] === maxScore && maxScore > 0
                    ? "border-black bg-black text-white"
                    : "border-neutral-200 bg-white text-neutral-900"
                }`}
              >
                <p className="text-xs uppercase tracking-widest mb-1 opacity-60 truncate">{name}</p>
                <p className="text-3xl font-bold font-mono">{scores[i]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Категории */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-sm uppercase tracking-wide font-semibold border transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Вопросы */}
        <div className="flex flex-col gap-4">
          {currentCat.questions.map((q, i) => {
            const pts = POINTS[Math.min(i, POINTS.length - 1)];
            const isOpen = revealed[activeCategory][i];
            return (
              <div
                key={`${activeCategory}-${i}`}
                className="border border-neutral-200 p-6 md:p-8 hover:border-neutral-400 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-4 gap-4">
                  <p className="text-xs uppercase tracking-widest text-neutral-400">
                    {currentCat.label} · Задание {i + 1}
                  </p>
                  <span className="text-lg font-bold font-mono text-neutral-900 shrink-0">
                    {pts} баллов
                  </span>
                </div>

                <p className="text-lg md:text-xl text-neutral-800 mb-6 leading-relaxed">
                  «{q.definition}»
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                  <p
                    className={`font-mono text-xl md:text-2xl font-bold tracking-widest transition-all duration-300 ${
                      isOpen ? "text-neutral-900" : "text-neutral-200 select-none"
                    }`}
                  >
                    {isOpen
                      ? q.term
                      : "_ ".repeat(q.term.replace(/[\s-]/g, "").length).trim()}
                  </p>
                  <button
                    onClick={() => toggle(activeCategory, i)}
                    className="bg-black text-white px-5 py-2 text-sm uppercase tracking-wide hover:bg-neutral-700 transition-colors duration-300 cursor-pointer"
                  >
                    {isOpen ? "Скрыть" : "Показать ответ"}
                  </button>
                </div>

                {/* Начислить баллы */}
                {isOpen && (
                  <div className="border-t border-neutral-100 pt-4">
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
                      Начислить {pts} баллов команде:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {teams.map((name, ti) => (
                        <button
                          key={ti}
                          onClick={() => addPoints(ti, pts)}
                          className="border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-all duration-200 cursor-pointer"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-10">
          <p className="text-neutral-400 text-sm">
            {categories.reduce((acc, c) => acc + c.questions.length, 0)} терминов · {categories.length} категории
          </p>
          <button
            onClick={() => { setScreen("register"); setTeamInputs(["", "", "", ""]); }}
            className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors duration-200 underline cursor-pointer"
          >
            Начать заново
          </button>
        </div>
      </div>
    </div>
  );
}
