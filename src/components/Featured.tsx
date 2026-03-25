import { useState, useMemo } from "react";

const POINTS = 200;
const OPTION_LABELS = ["а", "б", "в", "г"];

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
      { term: "СТРАТЕГИЯ", definition: "Долгосрочный план действий организации, направленный на достижение её ключевых целей." },
      { term: "ПОЗИЦИОНИРОВАНИЕ", definition: "Формирование в сознании потребителей определённого образа продукта или компании относительно конкурентов." },
      { term: "ЦЕЛЕВОЙ РЫНОК", definition: "Конкретная группа потребителей, на которую направлены маркетинговые усилия компании." },
      { term: "ЦЕННОСТНОЕ ПРЕДЛОЖЕНИЕ", definition: "Описание выгод, которые компания обещает предоставить клиенту в обмен на его деньги или внимание." },
      { term: "СТРАТЕГИЧЕСКИЙ АЛЬЯНС", definition: "Соглашение о сотрудничестве между двумя и более компаниями для достижения взаимовыгодных целей." },
      { term: "ВЕРТИКАЛЬНАЯ ИНТЕГРАЦИЯ", definition: "Расширение контроля компании над смежными этапами производственной цепочки — вверх или вниз по цепочке." },
      { term: "ИННОВАЦИЯ", definition: "Внедрение нового или значительно улучшенного продукта, процесса или бизнес-модели, создающего ценность." },
      { term: "ЖИЗНЕННЫЙ ЦИКЛ ПРОДУКТА", definition: "Стадии развития продукта на рынке: выведение, рост, зрелость и спад продаж." },
      { term: "ПОРТФЕЛЬНЫЙ АНАЛИЗ", definition: "Метод оценки набора продуктов или бизнес-единиц компании с целью оптимального распределения ресурсов." },
      { term: "БАРЬЕРЫ ВХОДА", definition: "Факторы, затрудняющие выход новых компаний на определённый рынок." },
      { term: "ГОРИЗОНТАЛЬНАЯ ИНТЕГРАЦИЯ", definition: "Объединение компаний одного уровня производственной цепочки или одной отрасли для усиления позиций на рынке." },
      { term: "РЫНОЧНАЯ ДОЛЯ", definition: "Процент от общего объёма продаж на рынке, который приходится на конкретную компанию или продукт." },
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
      { term: "ТРАНСФОРМАЦИОННОЕ ЛИДЕРСТВО", definition: "Стиль руководства, при котором лидер вдохновляет сотрудников на изменения и личностный рост через общее видение." },
      { term: "СИТУАЦИОННОЕ ЛИДЕРСТВО", definition: "Подход, при котором руководитель меняет стиль управления в зависимости от готовности и зрелости подчинённого." },
      { term: "КОНФЛИКТ ИНТЕРЕСОВ", definition: "Ситуация, когда личные интересы сотрудника или руководителя вступают в противоречие с интересами организации." },
      { term: "КОМАНДООБРАЗОВАНИЕ", definition: "Процесс формирования эффективной рабочей группы через развитие доверия, взаимодействия и общих целей." },
      { term: "КОРПОРАТИВНАЯ КУЛЬТУРА", definition: "Совокупность ценностей, норм и поведенческих моделей, разделяемых сотрудниками организации." },
      { term: "СТИЛЬ УПРАВЛЕНИЯ", definition: "Устойчивая совокупность приёмов и методов воздействия руководителя на подчинённых." },
      { term: "ВЛАСТЬ", definition: "Способность одного человека влиять на поведение других людей в организации." },
      { term: "ЛИДЕР МНЕНИЙ", definition: "Человек, чьё мнение пользуется особым авторитетом и оказывает влияние на позицию окружающих." },
      { term: "ВОВЛЕЧЁННОСТЬ", definition: "Степень эмоциональной привязанности и интереса сотрудника к своей работе и организации." },
      { term: "ДИРЕКТИВНЫЙ СТИЛЬ", definition: "Стиль управления, при котором руководитель единолично принимает решения и жёстко контролирует их исполнение." },
      { term: "САМОМЕНЕДЖМЕНТ", definition: "Способность человека самостоятельно управлять своим временем, приоритетами и личной эффективностью." },
      { term: "НЕМАТЕРИАЛЬНАЯ МОТИВАЦИЯ", definition: "Методы стимулирования сотрудников без денежных выплат: признание, карьерный рост, гибкий график и другие." },
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
      { term: "SCRUM", definition: "Итеративный фреймворк управления проектами, в котором работа делится на короткие спринты с чёткими ролями." },
      { term: "КАНБАН", definition: "Метод визуального управления потоком задач с помощью карточек и ограничений на количество работ в процессе." },
      { term: "SLA", definition: "Соглашение об уровне сервиса — договор между поставщиком и клиентом, фиксирующий стандарты качества услуг." },
      { term: "ВОРОНКА ПРОДАЖ", definition: "Модель, описывающая путь потенциального клиента от первого контакта до совершения покупки." },
      { term: "АУДИТ", definition: "Независимая проверка деятельности организации для оценки соответствия установленным стандартам или требованиям." },
      { term: "ОПЕРАЦИОННЫЙ РИСК", definition: "Вероятность потерь из-за сбоев во внутренних процессах, действиях сотрудников или внешних событий." },
      { term: "СТАНДАРТИЗАЦИЯ", definition: "Установление единых правил, норм и требований к процессам, продуктам или услугам организации." },
      { term: "РЕИНЖИНИРИНГ", definition: "Фундаментальное переосмысление и радикальное перепроектирование бизнес-процессов для резкого улучшения показателей." },
      { term: "АУТСТАФФИНГ", definition: "Форма занятости, при которой сотрудник числится в штате одной компании, но работает в другой." },
      { term: "СПРИНТ", definition: "Фиксированный короткий период (обычно 1–4 недели), в течение которого команда выполняет запланированный объём работ." },
      { term: "БЭКЛОГ", definition: "Упорядоченный список задач и требований к продукту, из которого команда берёт работу в следующий спринт." },
      { term: "ЦИКЛ PDCA", definition: "Управленческий цикл непрерывного улучшения: планируй — делай — проверяй — действуй." },
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
      { term: "ДЕБИТОРСКАЯ ЗАДОЛЖЕННОСТЬ", definition: "Сумма долгов, которую должны выплатить компании её покупатели или партнёры за уже поставленные товары или услуги." },
      { term: "КРЕДИТОРСКАЯ ЗАДОЛЖЕННОСТЬ", definition: "Обязательства компании перед поставщиками и партнёрами за полученные, но ещё не оплаченные товары и услуги." },
      { term: "АМОРТИЗАЦИЯ", definition: "Постепенное перенесение стоимости основных средств на себестоимость продукции по мере их износа." },
      { term: "ВАЛОВАЯ ПРИБЫЛЬ", definition: "Разница между выручкой от продаж и прямыми затратами на производство товаров или услуг." },
      { term: "EBITDA", definition: "Прибыль компании до вычета процентов, налогов, износа и амортизации — показатель операционной эффективности." },
      { term: "ROI", definition: "Коэффициент возврата на инвестиции — отношение полученной прибыли к сумме вложенных средств." },
      { term: "СЕБЕСТОИМОСТЬ", definition: "Совокупность всех затрат предприятия на производство и реализацию единицы продукции или услуги." },
      { term: "ФАКТОРИНГ", definition: "Финансовая услуга, при которой компания уступает дебиторскую задолженность банку в обмен на немедленное финансирование." },
      { term: "ЛИЗИНГ", definition: "Долгосрочная аренда имущества с правом последующего выкупа, используемая для финансирования активов." },
      { term: "АКЦИЯ", definition: "Ценная бумага, удостоверяющая долю её владельца в капитале компании и право на часть прибыли." },
      { term: "ОБЛИГАЦИЯ", definition: "Долговая ценная бумага, по которой эмитент обязуется выплатить держателю номинальную стоимость и проценты." },
      { term: "ХЕДЖИРОВАНИЕ", definition: "Способ снижения финансовых рисков путём открытия противоположных позиций на связанных рынках." },
    ],
  },
  {
    id: "marketing",
    label: "Маркетинг",
    questions: [
      { term: "БРЕНД", definition: "Совокупность образов, ассоциаций и ценностей, которые потребители связывают с определённым продуктом или компанией." },
      { term: "СЕГМЕНТАЦИЯ", definition: "Разделение рынка на группы потребителей со схожими потребностями, характеристиками или поведением." },
      { term: "МАРКЕТИНГ-МИКС", definition: "Комплекс инструментов маркетинга: продукт, цена, место продажи и продвижение (4P)." },
      { term: "ЦЕЛЕВАЯ АУДИТОРИЯ", definition: "Группа людей, которым адресовано маркетинговое сообщение или предложение компании." },
      { term: "ЛОЯЛЬНОСТЬ", definition: "Устойчивая положительная привязанность клиента к бренду, выражающаяся в повторных покупках и рекомендациях." },
      { term: "КОНВЕРСИЯ", definition: "Доля посетителей или потенциальных клиентов, совершивших целевое действие: покупку, заявку, регистрацию." },
      { term: "RETENTION", definition: "Способность компании удерживать клиентов и обеспечивать их повторные покупки на протяжении времени." },
      { term: "CAC", definition: "Стоимость привлечения одного нового клиента — сумма всех маркетинговых и продажных затрат на единицу клиента." },
      { term: "LTV", definition: "Совокупная прибыль, которую компания получает от одного клиента за всё время сотрудничества с ним." },
      { term: "USP", definition: "Уникальное торговое предложение — конкретная выгода, отличающая продукт от конкурентов в глазах покупателя." },
      { term: "КОНТЕНТ-МАРКЕТИНГ", definition: "Стратегия продвижения через создание и распространение полезных материалов для привлечения и удержания аудитории." },
      { term: "ОМНИКАНАЛЬНОСТЬ", definition: "Интегрированный подход к продажам и коммуникациям через все каналы взаимодействия с клиентом одновременно." },
      { term: "НИШЕВОЙ МАРКЕТИНГ", definition: "Концентрация усилий на узком сегменте рынка с особыми потребностями, где конкуренция ниже." },
      { term: "ВИРУСНЫЙ МАРКЕТИНГ", definition: "Метод продвижения, при котором пользователи самостоятельно распространяют рекламное сообщение в своём окружении." },
      { term: "РЕПУТАЦИОННЫЙ МЕНЕДЖМЕНТ", definition: "Управление восприятием компании или бренда в глазах общества, клиентов и партнёров." },
      { term: "РЕБРЕНДИНГ", definition: "Изменение визуального образа, названия или позиционирования бренда с целью обновления его восприятия рынком." },
      { term: "ДИФФЕРЕНЦИАЦИЯ", definition: "Выделение продукта или компании на фоне конкурентов за счёт уникальных характеристик, важных для покупателя." },
      { term: "ЦЕНОВАЯ СТРАТЕГИЯ", definition: "Выбор подхода к установлению цен на продукты или услуги компании исходя из целей и рыночных условий." },
      { term: "КРОСС-ПРОДАЖИ", definition: "Предложение клиенту дополнительных товаров или услуг, связанных с уже приобретённым продуктом." },
      { term: "АПСЕЛЛ", definition: "Предложение клиенту перейти на более дорогой или расширенный вариант продукта вместо базового." },
    ],
  },
  {
    id: "hr",
    label: "Персонал",
    questions: [
      { term: "РЕКРУТИНГ", definition: "Процесс поиска, привлечения и отбора кандидатов для заполнения вакансий в организации." },
      { term: "ОНБОРДИНГ", definition: "Процесс введения нового сотрудника в должность: знакомство с командой, процессами и культурой компании." },
      { term: "АТТЕСТАЦИЯ", definition: "Периодическая оценка соответствия сотрудника занимаемой должности по заранее установленным критериям." },
      { term: "ГРЕЙДИРОВАНИЕ", definition: "Система классификации должностей по уровням сложности и ответственности для установления справедливой оплаты." },
      { term: "ТЕКУЧЕСТЬ КАДРОВ", definition: "Показатель, отражающий долю сотрудников, покинувших организацию за определённый период." },
      { term: "КОМПЕТЕНЦИЯ", definition: "Совокупность знаний, навыков и личных качеств, необходимых сотруднику для эффективного выполнения работы." },
      { term: "КАДРОВЫЙ РЕЗЕРВ", definition: "Группа сотрудников, целенаправленно подготавливаемых к замещению ключевых должностей в будущем." },
      { term: "PERFORMANCE REVIEW", definition: "Регулярная оценка результатов работы сотрудника по согласованным целям и компетенциям." },
      { term: "ГРЕЙД", definition: "Уровень должности в системе грейдирования, определяющий диапазон вознаграждения и требования к сотруднику." },
      { term: "HEADHUNTING", definition: "Целенаправленный поиск и переманивание ценных специалистов у конкурентов или других компаний." },
      { term: "OFFBOARDING", definition: "Процесс организованного увольнения сотрудника: передача дел, прощальное интервью и документальное оформление." },
      { term: "КОРПОРАТИВНОЕ ОБУЧЕНИЕ", definition: "Система развития знаний и навыков сотрудников, организованная и финансируемая работодателем." },
      { term: "WELL-BEING", definition: "Комплекс программ, направленных на поддержание физического, психологического и социального благополучия сотрудников." },
      { term: "EMPLOYER BRAND", definition: "Образ компании как привлекательного работодателя в глазах действующих и потенциальных сотрудников." },
      { term: "ШТАТНОЕ РАСПИСАНИЕ", definition: "Документ, закрепляющий перечень должностей в организации, их количество и размер должностных окладов." },
      { term: "РОТАЦИЯ КАДРОВ", definition: "Плановое перемещение сотрудников между различными должностями или подразделениями внутри организации." },
      { term: "НОРМИРОВАНИЕ ТРУДА", definition: "Установление обоснованных норм затрат времени и усилий на выполнение конкретных трудовых операций." },
      { term: "JOB OFFER", definition: "Официальное предложение о трудоустройстве, направляемое кандидату с указанием условий работы и вознаграждения." },
      { term: "СИСТЕМА МОТИВАЦИИ", definition: "Совокупность материальных и нематериальных инструментов, побуждающих сотрудников к достижению целей компании." },
      { term: "ИНДЕКСАЦИЯ ЗАРПЛАТ", definition: "Периодическое повышение размера оплаты труда сотрудников с учётом инфляции или рыночных изменений." },
    ],
  },
];

// Все термины по категориям для генерации неправильных вариантов
const allTermsByCat: Record<string, string[]> = Object.fromEntries(
  categories.map((c) => [c.id, c.questions.map((q) => q.term)])
);

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (seed * (i + 7) * 31337) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(catId: string, correctTerm: string, qIdx: number): string[] {
  const pool = allTermsByCat[catId].filter((t) => t !== correctTerm);
  const wrong = shuffle(pool, qIdx + 1).slice(0, 3);
  const opts = shuffle([correctTerm, ...wrong], qIdx + 13);
  return opts;
}

type Screen = "register" | "game";

interface QuestionState {
  selected: string | null;
  awarded: boolean;
}

export default function Featured() {
  const [screen, setScreen] = useState<Screen>("register");
  const [teamInputs, setTeamInputs] = useState(["", "", "", ""]);
  const [teams, setTeams] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  // state: {catId}-{qIdx} -> QuestionState
  const [qStates, setQStates] = useState<Record<string, QuestionState>>({});

  // Precompute options for all questions
  const optionsMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    categories.forEach((cat) => {
      cat.questions.forEach((q, i) => {
        map[`${cat.id}-${i}`] = buildOptions(cat.id, q.term, i);
      });
    });
    return map;
  }, []);

  const startGame = () => {
    const named = teamInputs.map((t, i) => t.trim() || `Группа ${i + 1}`);
    setTeams(named);
    setScores([0, 0, 0, 0]);
    setQStates({});
    setScreen("game");
  };

  const selectOption = (catId: string, qIdx: number, option: string) => {
    const key = `${catId}-${qIdx}`;
    if (qStates[key]?.selected) return; // уже выбрано
    setQStates((prev) => ({ ...prev, [key]: { selected: option, awarded: false } }));
  };

  const awardTeam = (catId: string, qIdx: number, teamIdx: number, pts: number) => {
    const key = `${catId}-${qIdx}`;
    if (qStates[key]?.awarded) return;
    setScores((prev) => prev.map((s, i) => (i === teamIdx ? s + pts : s)));
    setQStates((prev) => ({ ...prev, [key]: { ...prev[key], awarded: true } }));
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
            Введите название каждой группы — или оставьте поле пустым, мы назовём их автоматически.
          </p>

          <div className="flex flex-col gap-4 mb-12">
            {teamInputs.map((val, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-neutral-400 text-sm uppercase tracking-widest w-8 shrink-0">{i + 1}</span>
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
            const pts = POINTS;
            const key = `${activeCategory}-${i}`;
            const state = qStates[key];
            const options = optionsMap[key];
            const isCorrect = state?.selected === q.term;
            const isWrong = state?.selected && state.selected !== q.term;

            return (
              <div
                key={key}
                className={`border p-6 md:p-8 transition-colors duration-300 ${
                  isCorrect
                    ? "border-black bg-neutral-50"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >
                {/* Заголовок */}
                <div className="flex items-start justify-between mb-4 gap-4">
                  <p className="text-xs uppercase tracking-widest text-neutral-400">
                    {currentCat.label} · Задание {i + 1}
                  </p>
                  <span className="text-lg font-bold font-mono text-neutral-900 shrink-0">
                    {pts} баллов
                  </span>
                </div>

                {/* Определение */}
                <p className="text-lg md:text-xl text-neutral-800 mb-6 leading-relaxed">
                  «{q.definition}»
                </p>

                {/* Варианты ответов */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {options.map((opt, oi) => {
                    const isThis = state?.selected === opt;
                    const isRight = opt === q.term;
                    let style = "border-neutral-200 bg-white text-neutral-800 hover:border-black";
                    if (state?.selected) {
                      if (isRight) style = "border-black bg-black text-white";
                      else if (isThis && !isRight) style = "border-red-400 bg-red-50 text-red-700";
                      else style = "border-neutral-100 bg-neutral-50 text-neutral-400";
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => selectOption(activeCategory, i, opt)}
                        disabled={!!state?.selected}
                        className={`flex items-center gap-3 border px-4 py-3 text-left text-sm transition-all duration-200 cursor-pointer disabled:cursor-default ${style}`}
                      >
                        <span className="font-bold uppercase opacity-60 shrink-0 w-4">{OPTION_LABELS[oi]})</span>
                        <span className="font-medium">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* После правильного — начислить баллы */}
                {isCorrect && (
                  <div className={`border-t border-neutral-200 pt-5 transition-all duration-300`}>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
                      {state?.awarded ? "Баллы начислены" : `Начислить ${pts} баллов:`}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {teams.map((name, ti) => (
                        <button
                          key={ti}
                          onClick={() => awardTeam(activeCategory, i, ti, pts)}
                          disabled={state?.awarded}
                          className={`flex flex-col items-center border px-3 py-3 text-sm transition-all duration-200 cursor-pointer disabled:cursor-default ${
                            state?.awarded
                              ? "border-neutral-100 bg-neutral-50 text-neutral-400"
                              : "border-neutral-300 hover:bg-black hover:text-white hover:border-black"
                          }`}
                        >
                          <span className="font-semibold truncate w-full text-center text-xs uppercase tracking-wide">{name}</span>
                          <span className="font-mono font-bold text-lg mt-1">{scores[ti]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Неправильный ответ */}
                {isWrong && (
                  <p className="text-sm text-red-500 mt-2">
                    Неверно. Правильный ответ: <strong>{q.term}</strong>
                  </p>
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