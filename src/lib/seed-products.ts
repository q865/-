/** Данные каталога для prisma/seed — единый источник наполнения. */

export type SeedCategory = {
  name: string;
  slug: string;
  sortOrder: number;
};

export type SeedProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  categorySlug: string;
  featured: boolean;
};

export const SEED_CATEGORIES: SeedCategory[] = [
  { name: "Гелевые композиции", slug: "gelevye-kompozicii", sortOrder: 1 },
  { name: "Гендер-пати", slug: "gender-pati", sortOrder: 2 },
  { name: "Выписка из роддома", slug: "vypiska", sortOrder: 3 },
  { name: "Дни рождения", slug: "dni-rozhdeniya", sortOrder: 4 },
  { name: "Свадьбы", slug: "svadby", sortOrder: 5 },
  { name: "Бизнес и мероприятия", slug: "biznes-i-meropriyatiya", sortOrder: 6 },
];

function desc(summary: string, includes: string): string {
  return `${summary} Что входит: ${includes} Доставка по Москве и области — по согласованию.`;
}

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    name: "Набор для гендер-пати",
    slug: "nabor-gender-pati",
    description: desc(
      "Композиция с секретным цветом для раскрытия пола малыша.",
      "связка из 15–20 шаров, ленты, надпись «Boy or Girl?», упаковка для транспортировки.",
    ),
    price: 4500,
    categorySlug: "gender-pati",
    featured: true,
  },
  {
    name: "Мини-набор гендер-пати",
    slug: "mini-nabor-gender-pati",
    description: desc(
      "Компактный вариант для домашней вечеринки или фотосессии.",
      "8–10 шаров, 1 фольгированный акцент, ленты в двух цветах.",
    ),
    price: 2800,
    categorySlug: "gender-pati",
    featured: false,
  },
  {
    name: "Гендер-бокс с сюрпризом",
    slug: "gender-box-surprise",
    description: desc(
      "Коробка с шарами и конфетти — эффектное раскрытие пола.",
      "коробка, 12–15 шаров с гелием, конфетти, ленты, инструкция по запуску.",
    ),
    price: 5200,
    categorySlug: "gender-pati",
    featured: true,
  },
  {
    name: "Оформление выписки «Небесная нежность»",
    slug: "vypiska-nebesnaya-nezhnost",
    description: desc(
      "Нежная композиция в голубых и белых тонах у роддома.",
      "связка 20 шаров, цифра «1», ленты, надпись «С днём рождения», крепление к автомобилю.",
    ),
    price: 5500,
    categorySlug: "vypiska",
    featured: true,
  },
  {
    name: "Выписка «Розовая нежность»",
    slug: "vypiska-rozovaya-nezhnost",
    description: desc(
      "Розово-белое оформление для торжественной встречи малыша.",
      "связка 18 шаров, мини-фонтан, ленты, надпись на заказ.",
    ),
    price: 4800,
    categorySlug: "vypiska",
    featured: false,
  },
  {
    name: "Набор «Малыш уже тут»",
    slug: "vypiska-malysh-uzhe-tut",
    description: desc(
      "Яркий комплект для фото у роддома и машины.",
      "связка, фольгированная надпись, 2 фигуры-акцента, ленты.",
    ),
    price: 4200,
    categorySlug: "vypiska",
    featured: true,
  },
  {
    name: "Фонтан из шаров",
    slug: "fontan-iz-sharov",
    description: desc(
      "Эффектная композиция-фонтан для фотозоны и зала.",
      "30–40 шаров на гелии, основание, ленты в выбранной палитре.",
    ),
    price: 3800,
    categorySlug: "gelevye-kompozicii",
    featured: true,
  },
  {
    name: "Букет из шаров",
    slug: "buket-iz-sharov",
    description: desc(
      "Яркий букет из фольгированных и гелевых шаров — отличный подарок.",
      "7–9 шаров, упаковка-стойка, ленты, открытка по желанию.",
    ),
    price: 2800,
    categorySlug: "gelevye-kompozicii",
    featured: false,
  },
  {
    name: "Связка из 10 шаров",
    slug: "svyazka-10-sharov",
    description: desc(
      "Универсальная связка для любого повода.",
      "10 латексных шаров с гелием, ленты, выбор цветовой гаммы.",
    ),
    price: 2200,
    categorySlug: "gelevye-kompozicii",
    featured: false,
  },
  {
    name: "Композиция «Облако шаров»",
    slug: "oblako-sharov",
    description: desc(
      "Плавное «облако» из шаров для потолка или фотозоны.",
      "15–25 шаров, монofilament, подбор оттенков под интерьер.",
    ),
    price: 6500,
    categorySlug: "gelevye-kompozicii",
    featured: true,
  },
  {
    name: "Цифра на день рождения",
    slug: "cifra-den-rozhdeniya",
    description: desc(
      "Большая цифра из гелевых шаров — любой возраст и цвет.",
      "цифра 80–100 см, 8–12 шаров-акцентов, ленты, крепление.",
    ),
    price: 3200,
    categorySlug: "dni-rozhdeniya",
    featured: true,
  },
  {
    name: "Фонтан на день рождения",
    slug: "fountain-den-rozhdeniya",
    description: desc(
      "Праздничный фонтан с цифрой и тематическими акцентами.",
      "цифра, 25–35 шаров, 2–3 фольгированных фигуры, ленты.",
    ),
    price: 5800,
    categorySlug: "dni-rozhdeniya",
    featured: true,
  },
  {
    name: "Тематический набор для детей",
    slug: "tematicheskiy-nabor-deti",
    description: desc(
      "Набор под любимого героя или хобби именинника.",
      "фольгированные фигуры, связка, ленты, подбор под тему.",
    ),
    price: 4500,
    categorySlug: "dni-rozhdeniya",
    featured: false,
  },
  {
    name: "Светящиеся шары на вечеринку",
    slug: "svetyashchiesya-shary",
    description: desc(
      "LED-шары для вечерней фотосессии и танцев.",
      "10 светящихся шаров, ленты, инструкция по включению.",
    ),
    price: 3600,
    categorySlug: "dni-rozhdeniya",
    featured: false,
  },
  {
    name: "Арка для свадьбы",
    slug: "arka-svadba",
    description: desc(
      "Романтическая арка из шаров для церемонии или фотозоны.",
      "арка 2–2,5 м, 80–120 шаров, ленты в палитре свадьбы, монтаж по согласованию.",
    ),
    price: 8900,
    categorySlug: "svadby",
    featured: true,
  },
  {
    name: "Свадебная фотозона",
    slug: "svadebnaya-fotozona",
    description: desc(
      "Фон для фото молодожёнов и гостей.",
      "фон 2×2 м, гирлянда из шаров, надпись «Mr & Mrs» или на заказ.",
    ),
    price: 7500,
    categorySlug: "svadby",
    featured: true,
  },
  {
    name: "Романтическая связка для молодожёнов",
    slug: "romanticheskaya-svyazka-svadba",
    description: desc(
      "Нежная связка для фотосессии и декора зала.",
      "15 шаров пастельных оттенков, ленты, 2 сердца из фольги.",
    ),
    price: 4200,
    categorySlug: "svadby",
    featured: false,
  },
  {
    name: "Сердце из шаров",
    slug: "serdtse-iz-sharov",
    description: desc(
      "Объёмное сердце — классика для свадьбы и годовщины.",
      "сердце 80–100 см, 40–60 шаров, подставка или подвес.",
    ),
    price: 6800,
    categorySlug: "svadby",
    featured: true,
  },
  {
    name: "Оформление витрины магазина",
    slug: "oformlenie-vitriny-magazina",
    description: desc(
      "Композиции для витрин: акцент на акцию и стиль бренда.",
      "связки, фольгированные элементы, надписи, монтаж в согласованное время.",
    ),
    price: 12000,
    categorySlug: "biznes-i-meropriyatiya",
    featured: true,
  },
  {
    name: "Оформление открытия магазина",
    slug: "otkrytie-magazina",
    description: desc(
      "Grand opening: арки, фонтаны и фотозоны у входа.",
      "арка или фонтан, цифры, welcome-зона, согласование с площадкой.",
    ),
    price: 15000,
    categorySlug: "biznes-i-meropriyatiya",
    featured: true,
  },
  {
    name: "Корпоративное оформление",
    slug: "korporativnoe-oformlenie",
    description: desc(
      "Декор офиса, конференц-зала или площадки мероприятия.",
      "welcome-зона, оформление сцены, фотозона, фирменные цвета.",
    ),
    price: 10000,
    categorySlug: "biznes-i-meropriyatiya",
    featured: true,
  },
  {
    name: "Промо-зона и презентация",
    slug: "promo-zona-prezentaciya",
    description: desc(
      "Оформление pop-up, стенда или зоны презентации.",
      "яркие связки, брендированные элементы, быстрый монтаж.",
    ),
    price: 8500,
    categorySlug: "biznes-i-meropriyatiya",
    featured: false,
  },
  {
    name: "Оформление детского праздника",
    slug: "oformlenie-detskogo-prazdnika",
    description: desc(
      "Полное оформление зала или дома для детского праздника.",
      "фонтан, цифра, фигуры, гирлянды, подбор под тему.",
    ),
    price: 7200,
    categorySlug: "dni-rozhdeniya",
    featured: false,
  },
  {
    name: "Набор «С новорождённым»",
    slug: "nabor-s-novorozhdennym",
    description: desc(
      "Подарочный набор для молодых родителей.",
      "связка, фольгированная надпись, 2–3 фигуры, упаковка.",
    ),
    price: 3500,
    categorySlug: "vypiska",
    featured: false,
  },
  {
    name: "Гирлянда из шаров",
    slug: "girlyanda-iz-sharov",
    description: desc(
      "Декоративная гирлянда для стены, входа или фотозоны.",
      "3–5 м гирлянды, 30–50 шаров, крепления, палитра на выбор.",
    ),
    price: 5500,
    categorySlug: "gelevye-kompozicii",
    featured: false,
  },
];
