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

1. С телефона (мобильный интернет, без VPN) откройте `https://air-cloud-msk.ru` — страница должна открыться.
2. Проверьте с Pi: `npm run connectivity:check` — ожидается HTTP 200.
3. На VPS убедитесь, что включён bypass до Vercel (см. `docs/proxy-ru-vps.md`):
   - System Bypass IP `147.45.215.60`, **или**
   - заголовок `x-vercel-protection-bypass` в `/etc/nginx/snippets/vercel-bypass.conf`
4. Обновите nginx-конфиг из `deploy/nginx/air-cloud-msk.ru.conf` (буферизация + таймауты) и сделайте `nginx -t && systemctl reload nginx`.
5. В Вебмастере дождитесь повторной проверки или запросите переобход главной.

Пока робот не стабильно достучится до сервера, страницы **не попадут в поиск**.

### Favicon

`/favicon.ico` должен отдавать **200**. Если Вебмастер пишет «файл не найден» — нажмите перепроверку после деплоя (файл есть в `public/favicon.ico` и `src/app/favicon.ico`).

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
