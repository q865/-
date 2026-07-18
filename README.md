# Воздушное облако — сайт-каталог гелевых шаров

Каталог композиций из гелевых шаров с админ-панелью, формой заявки и заказом через мессенджеры.

**Сайт:** https://air-cloud-msk.ru  
**Админка:** https://air-cloud-msk.ru/admin/login  
**Репозиторий:** https://github.com/q865/-

---

## Стек

| Компонент | Технология |
|-----------|------------|
| Сайт | Next.js 16, TypeScript, Tailwind CSS v4 |
| База данных | PostgreSQL (Neon) |
| ORM | Prisma 7 |
| Авторизация админки | NextAuth v5 (Credentials) |
| Хостинг | Vercel |
| Фото из админки | Vercel Blob |
| Домен | Jino → DNS на Vercel |

---

## Страницы сайта

| URL | Описание |
|-----|----------|
| `/` | Главная: hero, категории, популярные товары, FAQ |
| `/catalog` | Каталог с поиском, сортировкой и фильтром по категориям |
| `/product/[slug]` | Карточка товара |
| `/services` | Услуги для бизнеса (витрины, открытия, корпоративы) |
| `/how-to-order` | Как оформить заказ |
| `/contacts` | Контакты и форма заявки |
| `/admin` | Админ-панель (требует входа) |

---

## Локальный запуск

### 1. Зависимости

```bash
npm install
```

### 2. Переменные окружения

Скопируйте `.env.example` в `.env` и заполните:

```bash
cp .env.example .env
```

| Переменная | Описание |
|------------|----------|
| `DATABASE_URL` | PostgreSQL connection string (Neon или локальный Docker) |
| `AUTH_SECRET` | Секрет сессии: `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Email для входа в админку |
| `ADMIN_PASSWORD` | Пароль админки |
| `NEXTAUTH_URL` | `http://localhost:3000` локально |
| `BLOB_READ_WRITE_TOKEN` | Токен Vercel Blob (опционально локально; без него фото пишутся в `public/uploads/`) |
| `YANDEX_VERIFICATION` | Код верификации Яндекс Вебмастера (опционально) |
| `GOOGLE_VERIFICATION` | Код верификации Google Search Console (опционально) |

### 3. База данных

```bash
npm run db:push    # применить схему
npm run db:seed    # категории, 25 товаров, настройки сайта
```

### 4. Запуск

```bash
npm run dev
```

- Сайт: http://localhost:3000  
- Админка: http://localhost:3000/admin/login  

---

## Деплой на Vercel (production)

### 1. База Neon

1. Создайте проект на [neon.tech](https://neon.tech)
2. Скопируйте **connection string** (pooler, порт 6543)
3. Добавьте в Vercel → Project → Settings → Environment Variables как `DATABASE_URL`

### 2. Vercel Blob (фото из админки)

1. Vercel → Project → **Storage** → Create → **Blob**
2. Переменная `BLOB_READ_WRITE_TOKEN` подключится автоматически
3. Без Blob загрузка фото на проде **не сохраняется** между деплоями

### 3. Остальные переменные на Vercel

| Переменная | Production |
|------------|------------|
| `AUTH_SECRET` | Случайная строка (`openssl rand -base64 32`) |
| `ADMIN_EMAIL` | `admin@air-cloud-msk.ru` |
| `ADMIN_PASSWORD` | Сильный пароль (не `admin123`) |
| `NEXTAUTH_URL` | `https://air-cloud-msk.ru` |
| `YANDEX_VERIFICATION` | Код из meta-тега [Яндекс Вебмастера](https://webmaster.yandex.ru) (опционально) |
| `GOOGLE_VERIFICATION` | Код из meta-тега [Google Search Console](https://search.google.com/search-console) (опционально) |

### 4. Деплой

Репозиторий подключён к Vercel — push в `main` деплоит автоматически.

```bash
git push origin main
# или вручную:
vercel deploy --prod
```

После первого деплоя с `DATABASE_URL`:

```bash
DATABASE_URL="..." npm run db:seed
```

(или seed выполняется при `vercel-build`, если схема уже есть)

### 5. DNS (Jino)

Подробная пошаговая инструкция с картинками полей: **[docs/dns-jino.md](docs/dns-jino.md)**

В панели **Jino → Домены → air-cloud-msk.ru → DNS** должно быть:

| Тип | Имя (хост) | Значение |
|-----|------------|----------|
| A | `air-cloud-msk.ru` (или `@`) | `64.29.17.1` |
| A | `air-cloud-msk.ru` (или `@`) | `216.198.79.1` |
| CNAME | `www` | `cname.vercel-dns.com` |

**Удалить**, если есть:

- `*.air-cloud-msk.ru` → A (wildcard)
- `www` → A (любой IP) — для www только CNAME
- `air-cloud-msk.ru` → A → `81.177.141.15` (старый IP Jino)

Проверка после правок (подождите 15–60 мин):

```bash
npm run dns:check
```

В Vercel → Settings → Domains: `air-cloud-msk.ru` и `www.air-cloud-msk.ru` — статус **Valid**.

### 6. Поисковая индексация (Яндекс, Google)

Сайт не появится в поиске сам по себе — нужно зарегистрировать его в вебмастерах и отправить sitemap.

Пошаговая инструкция: **[docs/yandex-seo.md](docs/yandex-seo.md)**

Кратко:
1. [Яндекс Вебмастер](https://webmaster.yandex.ru) → добавить сайт → подтвердить через `YANDEX_VERIFICATION` в Vercel
2. Отправить sitemap: `https://air-cloud-msk.ru/sitemap.xml`
3. [Google Search Console](https://search.google.com/search-console) → то же с `GOOGLE_VERIFICATION`
4. Добавить ссылку `https://air-cloud-msk.ru` в VK и Telegram

Проверка: `site:air-cloud-msk.ru` в Яндексе (первые страницы — через 3–14 дней).

---

## Админ-панель — инструкция

### Вход

1. Откройте https://air-cloud-msk.ru/admin/login  
2. Email и пароль — из переменных `ADMIN_EMAIL` / `ADMIN_PASSWORD` на Vercel  
   (Vercel → Project → Settings → Environment Variables)

### Обзор (`/admin`)

Сводка: количество товаров, категорий, последние заявки.

### Товары (`/admin/products`)

- **Добавить** — кнопка «Новый товар»
- **Название** — отображается в каталоге
- **Slug** — URL (`/product/nazvanie-tovara`), генерируется из названия
- **Цена** — в рублях, на сайте показывается «от X ₽»
- **Категория** — выберите из списка
- **Фото** — загрузите JPG/PNG/WebP до 5 МБ (сохраняется в Vercel Blob)
- **Хит** — показывает бейдж «Хит» и приоритет на главной
- **Опубликован** — скрывает товар с сайта, если выключен

### Категории (`/admin/categories`)

- Название, slug, порядок сортировки (`sortOrder`)
- Slug используется в URL: `/catalog?category=gender-pati`

### Заявки (`/admin/orders`)

Заявки с формы на странице «Контакты»: имя, телефон, комментарий.

### Настройки (`/admin/settings`)

Редактируется **без кода**:

| Поле | Где видно |
|------|-----------|
| Название сайта | Шапка, подвал, title |
| Заголовок hero | Большой текст на главной (до 80 символов) |
| Подзаголовок hero | Текст под заголовком (до 200 символов, 1–2 предложения) |
| Telegram / VK / MAX | Кнопки заказа и контакты |
| Телефон | Шапка, контакты, кнопка «Позвонить» |
| SEO заголовок / описание | Поисковики, вкладка браузера |

**Совет:** не используйте длинные списки в hero — текст обрезается на телефоне.

---

## Как редактировать контент

### Без кода (админка)

- Товары, цены, фото → **Товары**
- Контакты, hero, SEO → **Настройки**
- Заявки клиентов → **Заявки**

### В коде (GitHub)

| Что | Файл |
|-----|------|
| FAQ, блоки «Почему мы», SEO-тексты внизу главной | `src/lib/home-content.ts` |
| Услуги для бизнеса | `src/lib/services-content.ts` |
| Дефолты настроек (при seed) | `src/lib/constants/defaults.ts` |
| Seed-товары (25 позиций) | `src/lib/seed-products.ts` |
| Название бренда, домен | `src/lib/site-config.ts` |
| Portfolio-фото (локальные) | `public/uploads/portfolio/{slug}.jpg` |

После изменения seed-файлов:

```bash
npm run db:seed
```

---

## Фото товаров — два способа

### 1. Через админку (рекомендуется на проде)

1. Товары → редактировать → «Загрузить фото»
2. Файл сохраняется в **Vercel Blob**
3. URL записывается в базу автоматически

**Требуется:** `BLOB_READ_WRITE_TOKEN` на Vercel.

### 2. Portfolio в репозитории (для стартового наполнения)

Фото лежат в git:

```
public/uploads/portfolio/nabor-gender-pati.jpg
public/uploads/portfolio/fontan-iz-sharov.jpg
...
```

Имена файлов = slug товара. Скрипт загрузки:

```bash
npm run portfolio:download
```

Эти фото используются как fallback, если у товара нет своих upload-фото.

---

## Контакты бизнеса (по умолчанию)

- **Telegram:** https://t.me/air_cloud_msk  
- **VK:** https://vk.ru/vozdushnyesharymsk  
- **Телефон:** +7 (965) 295-59-56  
- **MAX:** добавьте ссылку в админке → Настройки  

---

## Частые проблемы

### Фото не загружаются в админке

- На Vercel: проверьте **Storage → Blob** и `BLOB_READ_WRITE_TOKEN`
- Формат: JPEG, PNG, WebP, GIF; максимум 5 МБ
- После загрузки нажмите **Сохранить** на форме товара

### Сайт не открывается из России (нужен VPN)

Vercel иногда режут российские провайдеры. Сначала `npm run dns:check`, затем при необходимости — **VPS-прокси** в РФ.

Подробная настройка: [docs/proxy-ru-vps.md](docs/proxy-ru-vps.md). Проверка: `npm run connectivity:check`

### Сайт не открывается по домену

- DNS должен указывать на Vercel — см. [docs/dns-jino.md](docs/dns-jino.md)
- `npm run dns:check` покажет, что не так
- Подождите 15–60 минут после смены DNS
- Временно: https://air-cloud-msk.vercel.app

### Не могу войти в админку

- Пароль берётся из Vercel env `ADMIN_PASSWORD`, не из локального `.env`
- Локальный `admin123` работает только при локальном `.env`

### Текст на главной обрезан

- Сократите hero в **Настройки** (до 200 символов в подзаголовке)
- Или выполните `npm run db:seed` — подтянет эталонные тексты из `defaults.ts`

---

## Скрипты

```bash
npm run dev          # локальный сервер
npm run build        # production-сборка
npm run db:push      # схема БД
npm run db:seed      # наполнение данными
npm run portfolio:download  # скачать portfolio-фото
npm run dns:check    # проверить DNS (Vercel или VPS)
npm run connectivity:check  # сайт открывается через прокси
npm run lint         # ESLint
```

| Файл в `scripts/` | Назначение |
|-------------------|------------|
| `setup-vps-proxy.sh` | Nginx + bypass на VPS (запускать на сервере) |
| `check-dns.mjs` | `npm run dns:check` |
| `check-connectivity.mjs` | `npm run connectivity:check` |
| `download-portfolio-images.mjs` | `npm run portfolio:download` |

---

## Структура проекта

```
src/
  app/              # страницы Next.js (App Router)
  components/       # UI-компоненты
  lib/              # бизнес-логика, queries, контент
  generated/prisma/ # Prisma client
prisma/
  schema.prisma     # модели БД
  seed.ts           # seed-скрипт
deploy/nginx/       # конфиги VPS-прокси
docs/               # DNS, VPS-прокси, SEO
public/
  brand/            # логотип
  uploads/portfolio/ # portfolio-фото (в git)
```

---

## Лицензия

Private project. All rights reserved.
