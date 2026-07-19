# Поисковая индексация air-cloud-msk.ru

Сайт технически готов к индексации: `robots.txt` разрешает обход, `sitemap.xml` содержит все страницы, meta-теги `index: true`. Если сайт не находится в Яндексе — его ещё **не добавили в индекс**. Ниже пошаговая инструкция.

**Проверка сейчас:** в Яндексе введите `site:air-cloud-msk.ru` — если 0 результатов, индексации ещё нет.

---

## Чеклист (сделать по порядку)

- [ ] Зарегистрировать сайт в [Яндекс Вебмастер](https://webmaster.yandex.ru)
- [ ] Подтвердить владение доменом (meta-тег или HTML-файл)
- [ ] Отправить sitemap: `https://air-cloud-msk.ru/sitemap.xml`
- [ ] Запросить переобход главной и каталога
- [ ] Зарегистрировать сайт в [Google Search Console](https://search.google.com/search-console)
- [ ] Добавить ссылку на сайт в VK и Telegram
- [ ] Через 1–2 недели проверить `site:air-cloud-msk.ru`

---

## Два сайта в Вебмастере (www и без www)

Яндекс считает `https://air-cloud-msk.ru` и `https://www.air-cloud-msk.ru` **разными** сайтами.
Главный — **без www**. `www` должен только редиректить (301) на основной.

### В Вебмастере (сделать сейчас)

1. Откройте **`https://air-cloud-msk.ru`** (не www) — это рабочий сайт.
2. У **www**-записи: либо удалите сайт, либо в настройках укажите главное зеркало `https://air-cloud-msk.ru` (склеивание зеркал).
3. На основном сайте нажмите **«Подключить»** у «Обход по счётчикам Метрики» и выберите счётчик `110860180`.
4. **Информация о сайте → Регион** → Москва / Московская область.
5. Ошибка «Не удалось подключиться» — дождитесь перепроверки после стабильного доступа; при необходимости запросите переобход главной.

### На VPS (обязательно, если www открывается как отдельный сайт)

Сейчас на проде `https://www...` иногда отдаёт **200** вместо редиректа — так Яндекс и видит «два сайта». В репозитории уже правильный nginx (`deploy/nginx/air-cloud-msk.ru.conf`). Обновите на VPS:

```bash
scp deploy/nginx/air-cloud-msk.ru.conf root@147.45.215.60:/etc/nginx/sites-available/air-cloud-msk.ru
ssh root@147.45.215.60 'nginx -t && systemctl reload nginx'
curl -sI https://www.air-cloud-msk.ru/ | head -5
# ожидается: HTTP/1.1 301 … Location: https://air-cloud-msk.ru/
```

Дополнительно Next.js редиректит www → apex по `Host` и `X-Forwarded-Host` (см. `next.config.ts`).

---

## Шаг 1 — Яндекс Вебмастер

### 1.1 Добавить сайт

1. Откройте [webmaster.yandex.ru](https://webmaster.yandex.ru) и войдите под Яндекс-аккаунтом.
2. Нажмите **«Добавить сайт»**.
3. Введите: `https://air-cloud-msk.ru`
4. Нажмите **«Добавить»**.

### 1.2 Подтвердить владение

Яндекс предложит способы подтверждения. Рекомендуем **meta-тег**:

1. В Вебмастере выберите способ **«Meta-тег»**.
2. Скопируйте **только значение** `content` из тега, например:
   ```html
   <meta name="yandex-verification" content="abc123def456" />
   ```
   Нужна строка `abc123def456` (без кавычек и тегов).
3. В **Vercel → Project → Settings → Environment Variables** добавьте:

   | Переменная | Значение |
   |------------|----------|
   | `YANDEX_VERIFICATION` | `abc123def456` |

4. Передеплойте сайт (`git push` или `vercel deploy --prod`).
5. В Вебмастере нажмите **«Проверить»**.

**Альтернатива — HTML-файл:** скачайте файл из Вебмастера (например `yandex_abc123.html`) и положите в папку `public/` репозитория, затем задеплойте. Файл будет доступен по `https://air-cloud-msk.ru/yandex_abc123.html`.

**Альтернатива — DNS:** добавьте TXT-запись в [Jino DNS](https://old-cp.jino.ru/domains/air-cloud-msk.ru/dns/) — Вебмастер покажет точное имя и значение.

### 1.3 Отправить sitemap

1. В Вебмастере: **Индексирование → Файлы Sitemap**.
2. Нажмите **«Добавить»**.
3. URL: `https://air-cloud-msk.ru/sitemap.xml`
4. Дождитесь статуса «Обработан» (обычно несколько часов).

### 1.4 Запросить переобход

1. **Индексирование → Переобход страниц**.
2. Отправьте URL:
   - `https://air-cloud-msk.ru/`
   - `https://air-cloud-msk.ru/catalog`
   - `https://air-cloud-msk.ru/contacts`

Лимит переобходов ограничен — начните с главной.

### 1.5 Что смотреть через 1–2 недели

- **Индексирование → Страницы в поиске** — число должно стать > 0
- **Диагностика → Проблемы индексирования** — не должно быть критических ошибок
- В поиске Яндекса: `site:air-cloud-msk.ru`

---

## Шаг 2 — Google Search Console

1. Откройте [search.google.com/search-console](https://search.google.com/search-console).
2. **Добавить ресурс** → тип **«Домен»** или **«Префикс URL»** → `https://air-cloud-msk.ru`
3. Подтверждение через meta-тег:
   - Скопируйте значение `content` из тега `google-site-verification`
   - Добавьте в Vercel env: `GOOGLE_VERIFICATION=ваш_код`
   - Передеплойте, нажмите **«Проверить»** в Search Console
4. **Файлы Sitemap → Добавить** → `https://air-cloud-msk.ru/sitemap.xml`
5. **Проверка URL** → введите `https://air-cloud-msk.ru/` → **Запросить индексирование**

Google часто индексирует быстрее Яндекса — проверяйте `site:air-cloud-msk.ru` в Google тоже.

---

## Шаг 3 — Ссылки с VK и Telegram

Поисковые роботы находят сайты через внешние ссылки. Сейчас VK-группа ведёт только на Telegram — добавьте ссылку на сайт.

### VK ([vk.ru/vozdushnyesharymsk](https://vk.ru/vozdushnyesharymsk))

1. **Управление сообществом → Информация → Описание** — добавьте в конец:
   ```
   Сайт: https://air-cloud-msk.ru
   ```
2. **Закреплённый пост** — создайте или отредактируйте:
   ```
   🎈 Каталог композиций из гелевых шаров — https://air-cloud-msk.ru
   Гендер-пати, выписка, дни рождения, свадьбы. Заказ через сайт, Telegram или по телефону +7 (965) 295-59-56
   ```
3. В разделе **Ссылки** сообщества (если есть) — добавьте `https://air-cloud-msk.ru`

### Telegram ([t.me/air_cloud_msk](https://t.me/air_cloud_msk))

1. **Настройки канала → Описание** — добавьте:
   ```
   Сайт: https://air-cloud-msk.ru
   ```
2. **Закреплённое сообщение** — аналогичный текст со ссылкой на сайт.

---

## Переменные окружения (Vercel)

| Переменная | Описание |
|------------|----------|
| `YANDEX_VERIFICATION` | Код из meta-тега Яндекс Вебмастера (`content`) |
| `GOOGLE_VERIFICATION` | Код из meta-тега Google Search Console (`content`) |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | Номер счётчика Яндекс Метрики (только цифры) |

После добавления переменных нужен передеплой. Meta-теги появятся в `<head>` всех страниц автоматически. Метрика подключается на публичных страницах через `SiteShell` (админка без счётчика).

Проверка:

```bash
curl -sS https://air-cloud-msk.ru/ | grep -E 'yandex-verification|google-site-verification|mc\.yandex|ym\('
```

---

## Яндекс Метрика

1. [metrika.yandex.ru](https://metrika.yandex.ru) → **Добавить счётчик**.
2. Адрес сайта: `https://air-cloud-msk.ru`
3. Скопируйте **номер счётчика** (например `12345678`).
4. В Vercel → Environment Variables → `NEXT_PUBLIC_YANDEX_METRIKA_ID` = номер.
5. Redeploy production.
6. В Метрике: **Настройки → Код счётчика** → проверка установки (или «Онлайн» после визита).

Код счётчика уже в репозитории — вручную вставлять HTML не нужно.

---

## Диагностика Вебмастера: «ошибка сервера»

Если в **Оптимизация сайта → Диагностика** висит
«Не удалось подключиться из-за ошибки сервера»:

### Сначала техника (уже на VPS)

1. С телефона (мобильный интернет, без VPN) откройте `https://air-cloud-msk.ru` — должна открыться.
2. С Pi: `npm run connectivity:check` — HTTP 200.
3. Bypass до Vercel (см. `docs/proxy-ru-vps.md` §5):
   - System Bypass IP `147.45.215.60` (только Pro), **или**
   - `x-vercel-protection-bypass` в `/etc/nginx/snippets/vercel-bypass.conf` + тот же секрет в Vercel → Deployment Protection
4. Для ботов на VPS включён **microcache HTML 60с** (`conf.d/bot-proxy-cache.conf`) + локальные `robots.txt` / `favicon.ico`.

### Что сделать в Вебмастере

1. Работайте только с **`https://air-cloud-msk.ru`** (не www).
2. В карточке ошибки нажмите **«Перепроверить»** (если есть) или дождитесь конца «Проверяем…».
3. **Индексирование → Переобход страниц** → отправьте:
   - `https://air-cloud-msk.ru/`
   - `https://air-cloud-msk.ru/catalog`
4. **Индексирование → Файлы Sitemap** — `https://air-cloud-msk.ru/sitemap.xml` в статусе «Обработан».
5. Регион: Москва / Московская область. Обход по Метрике — подключён.

### Критерий успеха

- В логах VPS (`/var/log/nginx/access.log`) запросы с `YandexBot` / IP Яндекса → **200** (не 403/502/504).
- В диагностике ошибка уходит в «Исправлено» (часто **часы–2 суток** после фикса — UI отстаёт).
- Позже: `site:air-cloud-msk.ru` > 0.

Пока робот нестабильно достучится до сервера, страницы **не попадут в поиск**.

### Favicon

`/favicon.ico` должен отдавать **200**. Если Вебмастер пишет «файл не найден» — нажмите перепроверку (файл отдаётся с VPS).

### Регион сайта

В Вебмастере: **Информация о сайте → Регион** → **Москва и Московская область** (или Москва). Это рекомендация в диагностике, не ошибка сервера.

---

## Ожидаемые сроки

| Этап | Срок |
|------|------|
| Регистрация в Вебмастере + sitemap | сегодня |
| Первые страницы в `site:air-cloud-msk.ru` | 3–14 дней |
| Поиск по бренду «Воздушное облако» | 1–4 недели |
| Конкурентные запросы («гелевые шары москва») | месяцы |

По общим запросам сайт не появится в топе сразу — это нормально для нового домена. Сначала он найдётся по **домену** и **названию бренда**.

---

## Что уже настроено в коде

| Файл | Что делает |
|------|------------|
| `src/app/robots.ts` | Разрешает индексацию, указывает sitemap |
| `src/app/sitemap.ts` | Генерирует sitemap из статических страниц и товаров (без `?category=`) |
| `src/app/layout.tsx` | `index: true`, Open Graph, verification meta |
| `src/components/analytics/yandex-metrika.tsx` | Счётчик Метрики (`NEXT_PUBLIC_YANDEX_METRIKA_ID`) |
| `public/favicon.ico` | Favicon для роботов и браузеров |
| `src/lib/seo.ts` | JSON-LD: LocalBusiness, WebSite, FAQ, ProductList |

Менять `robots.txt` не нужно — боты уже получают HTTP 200.

---

## Проверка индексации

```bash
# Доступность для роботов
npm run connectivity:check

# Sitemap
curl -sS https://air-cloud-msk.ru/sitemap.xml | head -20

# Meta-теги верификации (после настройки env)
curl -sS https://air-cloud-msk.ru/ | grep verification
```

В браузере:

- Яндекс: `site:air-cloud-msk.ru`
- Google: `site:air-cloud-msk.ru`
- Бренд: `воздушное облако шары москва`
